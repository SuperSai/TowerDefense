var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 战斗管理类;
*/
var BattleManager = /** @class */ (function (_super) {
    __extends(BattleManager, _super);
    function BattleManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._maxSection = 10;
        /** 最大关卡 */
        _this._maxBarrier = 120;
        return _this;
    }
    BattleManager.prototype.setup = function () {
        var self = this;
        self._model = new BattleModel();
        self._model.attackValueBuff = BuffController.getInstance().getBuffValueById(BuffSheet.ATTACK_VALUE_INCREASE);
        self._model.critRateBuff = BuffController.getInstance().getBuffValueById(BuffSheet.CRIT_RATE_INCREASE);
    };
    BattleManager.prototype.startBattle = function () {
        var self = this;
        if (!TimerManager.Instance.isExists(self.onEnterFrame, self)) {
            TimerManager.Instance.doFrame(2, 0, self.onEnterFrame, self);
        }
    };
    BattleManager.prototype.onEnterFrame = function () {
        var self = this;
        //怪物状态
        self.doMonsterState();
        //森林王状态
        self.doKingPetState();
        //执行当场游戏的状态
        self.doGameState();
        //上传数据
        self.doDataToServerAndSave();
        //刷新广告
        self.doRefreshAdv();
    };
    /** 怪物当前状态 */
    BattleManager.prototype.doMonsterState = function () {
        var self = this;
        petLoop: for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
            var element = self._hallScene.carparkList.getCell(index);
            if (element) {
                var hero = element.getChildByName('car');
                if (hero && hero.isAtkEnabled()) {
                    hero.setAtkAccelerate(HallManager.Instance.hallData.userAcceValue); //是否启动加速
                    if (HallManager.Instance.hallData.gameStatus > 0) {
                        var originAttakValue = hero.getAtkValue();
                        var heroAttackValue = originAttakValue * (1 + self._model.attackValueBuff);
                        //森林王加成
                        var kingLevel = userData.getKingLevel();
                        var kingVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
                        self._model.kingDoubleAdd = 0;
                        if (kingVO) {
                            var atkAdd = kingVO.shatk * kingLevel;
                            self._model.kingDoubleAdd = kingVO.crit * kingLevel;
                            heroAttackValue += originAttakValue * (atkAdd);
                        }
                        var random = Math.random();
                        self._model.livingIndex = 0;
                        for (var mIndex = 0; mIndex < HallManager.Instance.hallData.monsterArray.length; mIndex++) {
                            var monsterSp = HallManager.Instance.hallData.monsterArray[HallManager.Instance.hallData.monsterArray.length - 1 - mIndex];
                            var curRate = 1;
                            if (monsterSp && monsterSp.isLiving()) {
                                self._model.livingIndex++;
                                if (self._model.livingCount > 0 && self._model.livingIndex > 0) {
                                    curRate = Math.pow(self._model.livingIndex, 3) / Math.pow(self._model.livingCount, 3);
                                }
                                if (random <= curRate) {
                                    if (hero) {
                                        if (hero.anim && monsterSp) {
                                            hero.anim.scaleX = monsterSp.targetIndex == 4 ? -1 : monsterSp.scaleX;
                                        }
                                        hero.playAnimation(1, hero, monsterSp, heroAttackValue);
                                        break petLoop;
                                    }
                                }
                            }
                        }
                        ;
                    }
                }
            }
        }
    };
    /** 英雄攻击 */
    BattleManager.prototype.doPetAttack = function (pet, monster, attackValue) {
        var self = this;
        //触发攻击技能
        var petButtle = ObjectPool.pop(Bullet, "Buttle");
        petButtle.alpha = 1;
        petButtle.scaleX = petButtle.scaleY = 0.6;
        self._hallScene.roadView.addChild(petButtle);
        petButtle.zOrder = monster.zOrder + 1;
        petButtle.setBulletType(pet);
        var effectPos = self._hallScene.roadView.globalToLocal(pet.localToGlobal(new Laya.Point(0, 0)));
        petButtle.pos(effectPos.x + 20, effectPos.y + 30);
        petButtle.rotation = ObjectUtils.getAngle(effectPos, new Laya.Point(monster.x, monster.y));
        petButtle.attackTarget(monster, function (_skillId) {
            var skillCfg = null;
            var isDoubleHurt = false;
            var isSkillTrigger = false;
            if (_skillId > 0) {
                skillCfg = GlobleData.getData(GlobleData.SkillConfigVO, _skillId);
                if (skillCfg) {
                    var critRate = (skillCfg.triggerPro + self._model.kingDoubleAdd) * (1 + self._model.critRateBuff);
                    isDoubleHurt = Math.random() < critRate;
                    isSkillTrigger = Math.random() < userData.getSkillAdditionProbability(_skillId);
                }
            }
            //击中回调
            monster.updateBlood(attackValue, 0, isDoubleHurt);
            //是否buff效果
            self.doMonsterBuff(skillCfg, monster, isSkillTrigger, attackValue);
        });
    };
    /** 怪物BUFF效果 */
    BattleManager.prototype.doMonsterBuff = function (skillCfg, monster, isSkillTrigger, attackValue) {
        var self = this;
        if (skillCfg && isSkillTrigger) {
            if (skillCfg.reduceSpeed > 0) { //减速
                monster.reduceMoveSpeed(skillCfg.reduceSpeed, skillCfg.reduceSpeedTime);
            }
            if (skillCfg.twoInjury > 0) { //二次伤害
                monster.showDrug(attackValue, skillCfg.twoInjury);
            }
            if (skillCfg.attackTwo > 0) { //雷电连击
                var lineNum = 0;
                for (var k = 0, len = HallManager.Instance.hallData.monsterArray.length; k < len; k++) {
                    var monsterItem = HallManager.Instance.hallData.monsterArray[k];
                    if (monster == monsterItem) {
                        lineNum = skillCfg.attackTwo;
                    }
                    else if (monsterItem && lineNum > 0 && monsterItem.isLiving()) {
                        lineNum--;
                        var effectSp2 = Laya.Pool.getItemByClass(userData.MONSTER_BULLET, Bullet);
                        self._hallScene.roadView.addChild(effectSp2);
                        effectSp2.zOrder = monster.zOrder;
                        effectSp2.pos(monster.x, monster.y - 30);
                        effectSp2.joinTarget(new Laya.Point(monsterItem.x, monsterItem.y - 30));
                        monsterItem.updateBlood(attackValue);
                        monster = monsterItem;
                    }
                }
            }
        }
    };
    /** 森林王英雄的攻击处理 */
    BattleManager.prototype.doKingPetState = function () {
        var self = this;
        if (HallManager.Instance.hallData.gameStatus > 0) {
            var kingPet = self._hallScene.spMountGuard;
            if (kingPet && kingPet.isAtkEnabled()) {
                kingPet.setAtkAccelerate(HallManager.Instance.hallData.userAcceValue); //是否启动加速
                if (HallManager.Instance.hallData.monsterArray && HallManager.Instance.hallData.gameStatus > 0) {
                    var atkValue = kingPet.getAtkValue();
                    //森林王专属
                    var kingLevel = userData.getKingLevel();
                    var kingVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
                    if (kingVO) {
                        atkValue = kingVO.attack;
                        kingPet.setAtkSpeedValue(kingVO.interval);
                    }
                    var random = Math.random();
                    for (var mIndex = 0, len = HallManager.Instance.hallData.monsterArray.length; mIndex < len; mIndex++) {
                        var monsterSp = HallManager.Instance.hallData.monsterArray[len - 1 - mIndex];
                        var curRate = 1;
                        if (monsterSp && monsterSp.isLiving()) {
                            self._model.livingIndex++;
                            if (self._model.livingCount > 0 && self._model.livingIndex > 0) {
                                curRate = Math.pow(self._model.livingIndex, 3) / Math.pow(self._model.livingCount, 3);
                            }
                            if (random <= curRate) {
                                kingPet.playAnimation(1, kingPet, monsterSp, atkValue);
                                break;
                            }
                        }
                    }
                    ;
                }
            }
        }
    };
    /** 执行当场游戏的状态 */
    BattleManager.prototype.doGameState = function () {
        var self = this;
        if (HallManager.Instance.hallData.gameStatus > 0) {
            var imgDest = self._hallScene.imgDestination;
            var isAllDeath = true; //是否所有怪物已被消灭
            self._model.livingCount = 0;
            if (HallManager.Instance.hallData.monsterArray && imgDest) {
                var sprintArea = new Laya.Rectangle(imgDest.x, imgDest.y, imgDest.width, imgDest.height);
                for (var index = 0; index < HallManager.Instance.hallData.monsterArray.length; index++) {
                    var monsterSp = HallManager.Instance.hallData.monsterArray[index];
                    if (HallManager.Instance.hallData.gameStatus > 0 && monsterSp) {
                        if (!monsterSp.isDeath()) {
                            isAllDeath = false;
                            self._model.livingCount++;
                            monsterSp.setMoveAccelerate(HallManager.Instance.hallData.userAcceValue); //是否启动加速
                            if (sprintArea.contains(monsterSp.x + 30, monsterSp.y - 10)) {
                                HallManager.Instance.hallData.gameStatus = 0;
                                //停止并移除所有怪物
                                self.removeAllMonster();
                                BattleManager.Instance.event(BattleEventsConst.BATTLE_NO_CLEARANC);
                                break;
                            }
                        }
                    }
                }
                ;
            }
            //消灭所有怪物，通关
            if (isAllDeath && HallManager.Instance.hallData.monsterArray.length <= 0) {
                HallManager.Instance.hallData.gameStatus = 0;
                //停止并移除所有怪物
                self.removeAllMonster();
                BattleManager.Instance.event(BattleEventsConst.BATTLE_CLEARANC);
            }
        }
    };
    /** 保存缓存数据并上传服务器 */
    BattleManager.prototype.doDataToServerAndSave = function () {
        var self = this;
        if (self._model.saveTime > 1000) {
            self._model.saveTime = 0;
            if (userData) {
                userData.saveLocal(true);
            }
        }
        self._model.saveTime++;
    };
    /** 刷新广告Banner */
    BattleManager.prototype.doRefreshAdv = function () {
        var self = this;
        if (self._model.refreshAdvTime > 60 * 180) {
            self._model.refreshAdvTime = 0;
            // CommonFun.showBannerAd(false, self.mainView.y);
        }
        self._model.refreshAdvTime++;
    };
    /** 创建英雄 */
    BattleManager.prototype.createPet = function (iKind, isBackward) {
        if (isBackward === void 0) { isBackward = false; }
        var self = this;
        if (self.hallScene.carparkList) {
            return HallManager.Instance.createPet(self.hallScene.carparkList, iKind, isBackward);
        }
        return null;
    };
    /** 英雄加速 */
    BattleManager.prototype.doPetAccelerate = function (petList) {
        if (!petList)
            return;
        for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
            var element = petList.getCell(index);
            if (element) {
                var carParkSp = element.getChildByName('car');
                if (carParkSp && carParkSp.isLiving()) {
                    carParkSp.setAtkAccelerate(HallManager.Instance.hallData.userAcceValue);
                }
            }
        }
    };
    /** 怪物加速 */
    BattleManager.prototype.doMonsterAccelerate = function () {
        if (HallManager.Instance.hallData.monsterArray) {
            for (var index = 0; index < HallManager.Instance.hallData.monsterArray.length; index++) {
                var monsterSp = HallManager.Instance.hallData.monsterArray[index];
                if (monsterSp && monsterSp.isLiving()) {
                    monsterSp.setMoveAccelerate(HallManager.Instance.hallData.userAcceValue);
                }
            }
        }
    };
    /** 检查土地是否开放 */
    BattleManager.prototype.checkLandIsOpen = function (list, lockIndex) {
        if (!list)
            return;
        for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
            var element = list.getCell(index);
            if (element) {
                var carParkSp = element.getChildByName('car');
                if (carParkSp) {
                    carParkSp.setLock(index >= lockIndex, index);
                }
            }
        }
    };
    /** 移除所有怪物 */
    BattleManager.prototype.removeAllMonster = function () {
        var self = this;
        var _loop_1 = function (i) {
            var monsterItem = HallManager.Instance.hallData.monsterArray[i];
            monsterItem.stopMoveAction();
            monsterItem.clearBornDelayFun();
            if (monsterItem.parent) {
                monsterItem.timerOnce(900, self, function () {
                    monsterItem.removeSelf();
                });
            }
        };
        for (var i = 0; i < HallManager.Instance.hallData.monsterArray.length; i++) {
            _loop_1(i);
        }
        HallManager.Instance.hallData.monsterArray = [];
    };
    /** 获取需要开始加载的英雄数据 */
    BattleManager.prototype.getStartLoadPetData = function () {
        var self = this;
        var resList = [];
        var oldIdDic = new TSDictionary();
        for (var i = 0, len = userData.parkcarInfoArray.length; i < len; i++) {
            var item = userData.parkcarInfoArray[i];
            if (item && item.carId !== 0 && !oldIdDic.ContainsKey(item.carId)) {
                oldIdDic.Add(item.carId, item.carId);
                var pet = self.getMonsterItem(item.carId);
                if (pet) {
                    var resUrl = PathConfig.MonsterUrl.replace("{0}", pet.modelImgUrl);
                    resList.push({ url: resUrl, type: Laya.Loader.ATLAS });
                }
            }
        }
        //第一次进入游戏第一波的怪物数据
        var monsters = self.getPreloadingMonsters(self.getBarrierSectionConfig(self.getStoragePassStage, self.getStroageSection));
        if (monsters && monsters.length > 0) {
            resList = resList.concat(monsters);
        }
        oldIdDic.clear();
        oldIdDic = null;
        return resList;
    };
    /** 获取需要预加载关卡的怪物数据 */
    BattleManager.prototype.getPreloadingMonsters = function (stageSectionCfg) {
        var self = this;
        var resList = [];
        if (stageSectionCfg) {
            if (!self._oldMonsterDic) {
                self._oldMonsterDic = new TSDictionary();
            }
            for (var i = 1; i < 3; i++) {
                var pet = self.getMonsterItem(stageSectionCfg["mId" + i]);
                if (pet && !self._oldMonsterDic.ContainsKey(pet.id)) {
                    var resUrl = PathConfig.MonsterUrl.replace("{0}", pet.modelImgUrl);
                    resList.push({ url: resUrl, type: Laya.Loader.ATLAS });
                    self._oldMonsterDic.Add(pet.id, pet.id);
                }
            }
        }
        return resList;
    };
    /** 预加载下一关卡怪物 */
    BattleManager.prototype.preloadingNextMonsters = function (level, section, callback) {
        if (callback === void 0) { callback = null; }
        var self = this;
        if (!self._oldMonsters) {
            self._oldMonsters = {};
            self._oldMonsters.level = level;
            self._oldMonsters.section = section;
        }
        else { //防止加载重复的章节
            if (self._oldMonsters.level == level && self._oldMonsters.section == section) {
                return;
            }
        }
        if (section > 6) { //如果是当前章节是最大，那么就预加载下一关的第一章怪物
            section = 1;
            level += 1;
        }
        self._oldMonsters.level = level;
        self._oldMonsters.section = section;
        var monstersData = self.getBarrierSectionConfig(level, section);
        var monsters = self.getPreloadingMonsters(monstersData);
        if (!monsters || monsters.length < 1)
            return;
        Laya.loader.load(monsters, Handler.create(null, function (_res) {
            callback && callback();
        }));
    };
    Object.defineProperty(BattleManager.prototype, "getStoragePassStage", {
        /** 获取缓存中的关卡 */
        get: function () {
            var self = this;
            var level = Math.min(userData.getPassStage(), self._maxBarrier);
            if (level > self._maxBarrier)
                level = 1;
            return level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BattleManager.prototype, "getStroageSection", {
        /** 获取缓存中的章节 */
        get: function () {
            var self = this;
            var section = userData.getPassSection();
            if (section > self._maxSection) {
                section = self._maxSection;
            }
            return section;
        },
        enumerable: true,
        configurable: true
    });
    /** 获取类型(怪物配置) */
    BattleManager.prototype.getType = function (_cardId) {
        var typeRadix = 100;
        if (_cardId > 0) {
            var mType = Math.floor(_cardId / typeRadix);
            return mType;
        }
        return 0;
    };
    /** 获取级别(怪物配置) */
    BattleManager.prototype.getLevel = function (_cardId) {
        var typeRadix = 100;
        if (_cardId > typeRadix) {
            var mNo = _cardId - this.getType(_cardId) * typeRadix;
            return mNo;
        }
        return 0;
    };
    /** 获取单个数据 */
    BattleManager.prototype.getMonsterItem = function (monsterId) {
        return GlobleData.getData(GlobleData.MonsterVO, monsterId);
    };
    /** 根据类型来获取所有数据 */
    BattleManager.prototype.getAllMonsterByType = function (type) {
        return GlobleData.getDataByCondition(GlobleData.MonsterVO, function (item) {
            return item.type == type;
        });
    };
    /** 获取最新可解锁英雄 */
    BattleManager.prototype.getUnLockMonster = function (type, unlockId) {
        var self = this;
        var allMonster = self.getAllMonsterByType(type);
        var monster = null;
        for (var i = 0, len = allMonster.length; i < len; i++) {
            var item = allMonster[i];
            if (unlockId < item.unLockId)
                break;
            monster = item;
        }
        return monster;
    };
    /** 获取最新开锁(可购买)的前后n个精灵配置 */
    BattleManager.prototype.getPreMonster = function (monsterId, index) {
        var self = this;
        var monsterType = BattleManager.Instance.getType(monsterId);
        var unlockMonsterLevel = BattleManager.Instance.getLevel(monsterId);
        var unlockMonster = BattleManager.Instance.getUnLockMonster(monsterType, unlockMonsterLevel);
        var monsterCfg = null;
        if (unlockMonster) {
            var monsterLevel = BattleManager.Instance.getLevel(unlockMonster.id) + index;
            if (monsterLevel > BattleManager.Instance.model.monsterMaxLevel) {
                monsterLevel = BattleManager.Instance.model.monsterMaxLevel;
            }
            else if (monsterLevel < 0) {
                monsterLevel = 0;
            }
            var newMonsterId = monsterType * 100 + monsterLevel;
            monsterCfg = self.getMonsterItem(newMonsterId);
        }
        return monsterCfg;
    };
    /** 获取英雄价格 */
    BattleManager.prototype.getMonsterPrice = function (price, buyTimes) {
        if (buyTimes > 0) {
            return price * Math.pow(1.175, buyTimes);
        }
        return price;
    };
    /** 获取钻石价格 */
    BattleManager.prototype.getMonsterDiamondPrice = function (monsterId, buyTimes) {
        var self = this;
        var monsterLevel = BattleManager.Instance.getLevel(monsterId);
        if (monsterLevel < 1) {
            return self._model.monsterBaseDiamondPrice;
        }
        if (monsterId > 1000) {
            monsterLevel += 30; //进化后的
        }
        var monsterPrice = self._model.monsterBaseDiamondPrice;
        ;
        // 31级前：买的次数递增：=原价*1.25^(n-1)；成本递增：上一级车*1.085。
        // 31级后（含31级）：买的次数递增：=原价*1.25^(n-1)；成本递增：上一级车*1.045
        var foreLevel = 30;
        if (monsterLevel > foreLevel) {
            monsterPrice = monsterPrice * Math.pow(1.085, (monsterLevel - 1)) * Math.pow(1.045, (monsterLevel - foreLevel));
        }
        else {
            monsterPrice = monsterPrice * Math.pow(1.085, (monsterLevel - 1));
        }
        if (buyTimes > 0) {
            monsterPrice = monsterPrice * Math.pow(1.25, buyTimes);
        }
        monsterPrice = Math.ceil(monsterPrice); //四舍五入
        return monsterPrice;
    };
    /** 获取关卡配置信息 */
    BattleManager.prototype.getBarrierSectionConfig = function (id, sectionId) {
        if (sectionId === void 0) { sectionId = 0; }
        var self = this;
        var barrierSectionId = id.toString();
        var barrierArr = null;
        if (sectionId > 0) {
            barrierSectionId = barrierSectionId + '_' + sectionId;
        }
        else {
            barrierArr = [];
        }
        if (!self._model.barrierConfigDic) {
            self._model.barrierConfigDic = new TSDictionary();
        }
        else if (self._model.barrierConfigDic.ContainsKey(barrierSectionId)) {
            return self._model.barrierConfigDic.TryGetValue(barrierSectionId);
        }
        var barrierConfigs = GlobleData.getAllValue(GlobleData.BarrierConfigVO);
        for (var i = 0, len = barrierConfigs.length; i < len; i++) {
            var barrier = barrierConfigs[i];
            if (sectionId > 0) {
                if (barrier.id == barrierSectionId) { //关卡章节
                    self._model.barrierConfigDic.Add(barrier.id, barrier);
                    return barrier;
                }
            }
            else if (barrier.id) {
                var stageId = barrier.id; //关卡
                stageId = stageId.substr(0, stageId.indexOf('_')); //取出关卡id
                if (stageId == barrierSectionId) {
                    barrierArr.push(barrier);
                }
            }
        }
        if (barrierArr && barrierArr.length > 0) {
            self._model.barrierConfigDic.Add(barrierSectionId, barrierArr);
            return barrierArr;
        }
        return null;
    };
    /** 获取每关最大收益 */
    BattleManager.prototype.getBarrierIncome = function (id) {
        var self = this;
        if (!self._model.barrierIncomeReordDic) {
            self._model.barrierIncomeReordDic = new TSDictionary();
        }
        else if (self._model.barrierIncomeReordDic.ContainsKey(id)) {
            return self._model.barrierIncomeReordDic.TryGetValue(id);
        }
        var income = 0;
        var barriers = self.getBarrierSectionConfig(id);
        if (barriers) {
            barriers.forEach(function (element) {
                income += element.earnings * 10;
            });
        }
        self._model.barrierIncomeReordDic.Add(id, income);
        return income;
    };
    /** 获取每关对应的解锁坑位 */
    BattleManager.prototype.getBarrierSeatNum = function (id) {
        var self = this;
        var barrierConfigVO = self.getBarrierSectionConfig(id, 1);
        if (barrierConfigVO && barrierConfigVO.seatNum) {
            return barrierConfigVO.seatNum;
        }
        return 3;
    };
    /** 关卡奖励金币换算 */
    BattleManager.prototype.getBarrierRewardToGold = function (stage, gold) {
        return gold * this.getBarrierIncome(stage) * 0.04;
    };
    Object.defineProperty(BattleManager.prototype, "hallScene", {
        get: function () { return this._hallScene; },
        set: function (value) { this._hallScene = value; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(BattleManager.prototype, "model", {
        get: function () {
            return this._model;
        },
        set: function (value) {
            this._model = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BattleManager.prototype, "maxBarrier", {
        /** 最大关卡 */
        get: function () {
            return this._maxBarrier;
        },
        set: function (value) {
            this._maxBarrier = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BattleManager, "Instance", {
        get: function () {
            if (BattleManager._instance == null) {
                BattleManager._instance = new BattleManager();
            }
            return BattleManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return BattleManager;
}(Laya.EventDispatcher));
//# sourceMappingURL=BattleManager.js.map