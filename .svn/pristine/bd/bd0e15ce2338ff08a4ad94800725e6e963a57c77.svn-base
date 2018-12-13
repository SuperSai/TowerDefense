/*
* 战斗管理类;
*/
class BattleManager extends Laya.EventDispatcher {

    private _hallScene: HallScene;
    private _model: BattleModel;
    private _oldMonsters: any;
    private _maxSection = 10;
    /** 最大关卡 */
    private _maxBarrier: number = 120;
    /** 已经加载过的怪物 */
    private _oldMonsterDic: TSDictionary<number, number>;

    public setup(): void {
        let self = this;
        self._model = new BattleModel();
        self._model.attackValueBuff = BuffController.getInstance().getBuffValueById(BuffSheet.ATTACK_VALUE_INCREASE);
        self._model.critRateBuff = BuffController.getInstance().getBuffValueById(BuffSheet.CRIT_RATE_INCREASE);
    }

    public startBattle(): void {
        let self = this;
        if (!TimerManager.Instance.isExists(self.onEnterFrame, self)) {
            TimerManager.Instance.doFrame(2, 0, self.onEnterFrame, self);
        }
    }

    private onEnterFrame(): void {
        let self = this;
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
    }

    /** 怪物当前状态 */
    private doMonsterState(): void {
        let self = this;
        petLoop: for (let index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
            let element: Laya.Box = self._hallScene.carparkList.getCell(index);
            if (element) {
                let hero = <MonsterSprite>element.getChildByName('car');
                if (hero && hero.isAtkEnabled()) {
                    hero.setAtkAccelerate(HallManager.Instance.hallData.userAcceValue);//是否启动加速
                    if (HallManager.Instance.hallData.gameStatus > 0) {
                        const originAttakValue: number = hero.getAtkValue();
                        let heroAttackValue: number = originAttakValue * (1 + self._model.attackValueBuff);
                        //森林王加成
                        let kingLevel: number = userData.getKingLevel();
                        let kingVO: KindLevelConfigVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
                        self._model.kingDoubleAdd = 0;
                        if (kingVO) {
                            let atkAdd: number = kingVO.shatk * kingLevel;
                            self._model.kingDoubleAdd = kingVO.crit * kingLevel;
                            heroAttackValue += originAttakValue * (atkAdd);
                        }
                        let random: number = Math.random();
                        self._model.livingIndex = 0;
                        for (let mIndex = 0; mIndex < HallManager.Instance.hallData.monsterArray.length; mIndex++) {
                            let monsterSp = HallManager.Instance.hallData.monsterArray[HallManager.Instance.hallData.monsterArray.length - 1 - mIndex];
                            let curRate: number = 1;
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
                        };
                    }
                }
            }
        }
    }

    /** 英雄攻击 */
    public doPetAttack(pet: MonsterSprite, monster: MonsterSprite, attackValue: number): void {
        let self = this;
        //触发攻击技能
        let petButtle: Buttle = ObjectPool.pop(Buttle, "Buttle");
        petButtle.alpha = 1;
        petButtle.scaleX = petButtle.scaleY = 0.6;
        self._hallScene.roadView.addChild(petButtle);
        petButtle.zOrder = monster.zOrder + 1;
        petButtle.setBulletType(pet);
        let effectPos: Laya.Point = self._hallScene.roadView.globalToLocal(pet.localToGlobal(new Laya.Point(0, 0)));
        petButtle.pos(effectPos.x + 20, effectPos.y + 30);
        petButtle.rotation = ObjectUtils.getAngle(effectPos, new Laya.Point(monster.x, monster.y));
        petButtle.attackTarget(monster, (_skillId: number) => {
            let skillCfg: any = null;
            let isDoubleHurt: boolean = false;
            let isSkillTrigger: boolean = false;
            if (_skillId > 0) {
                skillCfg = GlobleData.getData(GlobleData.SkillConfigVO, _skillId);
                if (skillCfg) {
                    const critRate: number = (skillCfg.triggerPro + self._model.kingDoubleAdd) * (1 + self._model.critRateBuff);
                    isDoubleHurt = Math.random() < critRate;
                    isSkillTrigger = Math.random() < userData.getSkillAdditionProbability(_skillId);
                }
            }
            //击中回调
            monster.updateBlood(attackValue, 0, isDoubleHurt);
            //是否buff效果
            self.doMonsterBuff(skillCfg, monster, isSkillTrigger, attackValue);
        });
    }

    /** 怪物BUFF效果 */
    private doMonsterBuff(skillCfg: any, monster: MonsterSprite, isSkillTrigger: boolean, attackValue: number): void {
        let self = this;
        if (skillCfg && isSkillTrigger) {
            if (skillCfg.reduceSpeed > 0) {//减速
                monster.reduceMoveSpeed(skillCfg.reduceSpeed, skillCfg.reduceSpeedTime);
            }
            if (skillCfg.twoInjury > 0) {//二次伤害
                monster.showDrug(attackValue, skillCfg.twoInjury);
            }
            if (skillCfg.attackTwo > 0) {//雷电连击
                let lineNum: number = 0;
                for (let k: number = 0, len: number = HallManager.Instance.hallData.monsterArray.length; k < len; k++) {
                    let monsterItem: MonsterSprite = HallManager.Instance.hallData.monsterArray[k];
                    if (monster == monsterItem) {
                        lineNum = skillCfg.attackTwo;
                    } else if (monsterItem && lineNum > 0 && monsterItem.isLiving()) {
                        lineNum--;
                        let effectSp2: Buttle = Laya.Pool.getItemByClass(userData.MONSTER_BULLET, Buttle);
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
    }

    /** 森林王英雄的攻击处理 */
    private doKingPetState(): void {
        let self = this;
        if (HallManager.Instance.hallData.gameStatus > 0) {
            let kingPet: MonsterSprite = <MonsterSprite>self._hallScene.spMountGuard;
            if (kingPet && kingPet.isAtkEnabled()) {
                kingPet.setAtkAccelerate(HallManager.Instance.hallData.userAcceValue);//是否启动加速
                if (HallManager.Instance.hallData.monsterArray && HallManager.Instance.hallData.gameStatus > 0) {
                    let atkValue: number = kingPet.getAtkValue();
                    //森林王专属
                    let kingLevel: number = userData.getKingLevel();
                    let kingVO: KindLevelConfigVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
                    if (kingVO) {
                        atkValue = kingVO.attack;
                        kingPet.setAtkSpeedValue(kingVO.interval);
                    }
                    let random: number = Math.random();
                    for (var mIndex = 0, len: number = HallManager.Instance.hallData.monsterArray.length; mIndex < len; mIndex++) {
                        let monsterSp = HallManager.Instance.hallData.monsterArray[len - 1 - mIndex];
                        let curRate: number = 1;
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
                    };
                }
            }
        }
    }

    /** 执行当场游戏的状态 */
    private doGameState(): void {
        let self = this;
        if (HallManager.Instance.hallData.gameStatus > 0) {
            let imgDest: Laya.Image = self._hallScene.imgDestination;
            let isAllDeath: boolean = true; //是否所有怪物已被消灭
            self._model.livingCount = 0;
            if (HallManager.Instance.hallData.monsterArray && imgDest) {
                let sprintArea: Laya.Rectangle = new Laya.Rectangle(imgDest.x, imgDest.y, imgDest.width, imgDest.height);
                for (let index = 0; index < HallManager.Instance.hallData.monsterArray.length; index++) {
                    let monsterSp: MonsterSprite = HallManager.Instance.hallData.monsterArray[index];
                    if (HallManager.Instance.hallData.gameStatus > 0 && monsterSp) {
                        if (!monsterSp.isDeath()) {
                            isAllDeath = false;
                            self._model.livingCount++;
                            monsterSp.setMoveAccelerate(HallManager.Instance.hallData.userAcceValue);//是否启动加速
                            if (sprintArea.contains(monsterSp.x + 30, monsterSp.y - 10)) {
                                HallManager.Instance.hallData.gameStatus = 0;
                                //停止并移除所有怪物
                                self.removeAllMonster();
                                BattleManager.Instance.event(BattleEventsConst.BATTLE_NO_CLEARANC);
                                break;
                            }
                        }
                    }
                };
            }
            //消灭所有怪物，通关
            if (isAllDeath && HallManager.Instance.hallData.monsterArray.length <= 0) {
                HallManager.Instance.hallData.gameStatus = 0;
                //停止并移除所有怪物
                self.removeAllMonster();
                BattleManager.Instance.event(BattleEventsConst.BATTLE_CLEARANC);
            }
        }
    }

    /** 保存缓存数据并上传服务器 */
    private doDataToServerAndSave(): void {
        let self = this;
        if (self._model.saveTime > 1000) {
            self._model.saveTime = 0;
            if (userData) {
                userData.saveLocal(true);
            }
        }
        self._model.saveTime++;
    }

    /** 刷新广告Banner */
    private doRefreshAdv(): void {
        let self = this;
        if (self._model.refreshAdvTime > 60 * 180) {
            self._model.refreshAdvTime = 0;
            // CommonFun.showBannerAd(false, self.mainView.y);
        }
        self._model.refreshAdvTime++;
    }

    /** 创建英雄 */
    public createPet(iKind: number, isBackward: boolean = false): MonsterSprite {
        let self = this;
        if (self.hallScene.carparkList) {
            return HallManager.Instance.createPet(self.hallScene.carparkList, iKind, isBackward);
        }
        return null;
    }

    /** 英雄加速 */
    public doPetAccelerate(petList: Laya.List): void {
        if (!petList) return;
        for (let index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
            let element = petList.getCell(index);
            if (element) {
                let carParkSp = element.getChildByName('car') as MonsterSprite;
                if (carParkSp && carParkSp.isLiving()) {
                    carParkSp.setAtkAccelerate(HallManager.Instance.hallData.userAcceValue);
                }
            }
        }
    }

    /** 怪物加速 */
    public doMonsterAccelerate(): void {
        if (HallManager.Instance.hallData.monsterArray) {
            for (var index = 0; index < HallManager.Instance.hallData.monsterArray.length; index++) {
                var monsterSp = HallManager.Instance.hallData.monsterArray[index];
                if (monsterSp && monsterSp.isLiving()) {
                    monsterSp.setMoveAccelerate(HallManager.Instance.hallData.userAcceValue);
                }
            }
        }
    }

    /** 检查土地是否开放 */
    public checkLandIsOpen(list: Laya.List, lockIndex: number): void {
        if (!list) return;
        for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
            var element = list.getCell(index);
            if (element) {
                let carParkSp = element.getChildByName('car') as MonsterSprite;
                if (carParkSp) {
                    carParkSp.setLock(index >= lockIndex, index);
                }
            }
        }
    }

    /** 移除所有怪物 */
    private removeAllMonster(): void {
        let self = this;
        for (let i: number = 0; i < HallManager.Instance.hallData.monsterArray.length; i++) {
            let monsterItem: MonsterSprite = HallManager.Instance.hallData.monsterArray[i];
            monsterItem.stopMoveAction();
            monsterItem.clearBornDelayFun();
            if (monsterItem.parent) {
                monsterItem.timerOnce(900, self, () => {
                    monsterItem.removeSelf();
                });
            }
        }
        HallManager.Instance.hallData.monsterArray = [];
    }

    /** 获取需要开始加载的英雄数据 */
    public getStartLoadPetData(): any[] {
        let self = this;
        let resList: any[] = [];
        let oldIdDic: TSDictionary<number, number> = new TSDictionary<number, number>();
        for (let i: number = 0, len: number = userData.parkcarInfoArray.length; i < len; i++) {
            let item = userData.parkcarInfoArray[i];
            if (item && item.carId !== 0 && !oldIdDic.ContainsKey(item.carId)) {
                oldIdDic.Add(item.carId, item.carId);
                let pet: any = self.getMonsterItem(item.carId);
                if (pet) {
                    let resUrl: string = PathConfig.MonsterUrl.replace("{0}", pet.modelImgUrl);
                    resList.push({ url: resUrl, type: Laya.Loader.ATLAS });
                }
            }
        }
        //第一次进入游戏第一波的怪物数据
        let monsters: any[] = self.getPreloadingMonsters(self.getBarrierSectionConfig(self.getStoragePassStage, self.getStroageSection));
        if (monsters && monsters.length > 0) {
            resList = resList.concat(monsters);
        }
        oldIdDic.clear();
        oldIdDic = null;
        return resList;
    }

    /** 获取需要预加载关卡的怪物数据 */
    public getPreloadingMonsters(stageSectionCfg: any): any[] {
        let self = this;
        let resList: any[] = [];
        if (stageSectionCfg) {
            if (!self._oldMonsterDic) {
                self._oldMonsterDic = new TSDictionary<number, number>();
            }
            for (let i: number = 1; i < 3; i++) {
                let pet: any = self.getMonsterItem(stageSectionCfg["mId" + i]);
                if (pet && !self._oldMonsterDic.ContainsKey(pet.id)) {
                    let resUrl: string = PathConfig.MonsterUrl.replace("{0}", pet.modelImgUrl);
                    resList.push({ url: resUrl, type: Laya.Loader.ATLAS });
                    self._oldMonsterDic.Add(pet.id, pet.id);
                }
            }
        }
        return resList;
    }

    /** 预加载下一关卡怪物 */
    public preloadingNextMonsters(level: number, section: number, callback: Function = null): void {
        let self = this;
        if (!self._oldMonsters) {
            self._oldMonsters = {};
            self._oldMonsters.level = level;
            self._oldMonsters.section = section;
        } else {    //防止加载重复的章节
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
        let monstersData: any = self.getBarrierSectionConfig(level, section);
        let monsters: any[] = self.getPreloadingMonsters(monstersData);
        if (!monsters || monsters.length < 1) return;
        Laya.loader.load(monsters, Handler.create(null, (_res: any) => {
            callback && callback();
        }));
    }

    /** 获取缓存中的关卡 */
    private get getStoragePassStage(): number {
        let self = this;
        let level: number = Math.min(userData.getPassStage(), self._maxBarrier);
        if (level > self._maxBarrier) level = 1;
        return level;
    }

    /** 获取缓存中的章节 */
    private get getStroageSection(): number {
        let self = this;
        let section: number = userData.getPassSection()
        if (section > self._maxSection) {
            section = self._maxSection;
        }
        return section;
    }

    /** 获取类型(怪物配置) */
    public getType(_cardId: number): number {
        let typeRadix: number = 100;
        if (_cardId > 0) {
            let mType: number = Math.floor(_cardId / typeRadix);
            return mType;
        }
        return 0;
    }

    /** 获取级别(怪物配置) */
    public getLevel(_cardId: number): number {
        let typeRadix: number = 100;
        if (_cardId > typeRadix) {
            let mNo: number = _cardId - this.getType(_cardId) * typeRadix;
            return mNo;
        }
        return 0;
    }

    /** 获取单个数据 */
    public getMonsterItem(monsterId: number): MonsterVO {
        return GlobleData.getData(GlobleData.MonsterVO, monsterId);
    }

    /** 根据类型来获取所有数据 */
    public getAllMonsterByType(type: number): MonsterVO[] {
        return GlobleData.getDataByCondition(GlobleData.MonsterVO, (item: MonsterVO) => {
            return item.type == type;
        });
    }

    /** 获取最新可解锁英雄 */
    public getUnLockMonster(type: number, unlockId: number): MonsterVO {
        let self = this;
        let allMonster: MonsterVO[] = self.getAllMonsterByType(type);
        let monster: MonsterVO = null;
        for (let i: number = 0, len: number = allMonster.length; i < len; i++) {
            let item: MonsterVO = allMonster[i];
            if (unlockId < item.unLockId) break;
            monster = item;
        }
        return monster;
    }

    /** 获取最新开锁(可购买)的前后n个精灵配置 */
    public getPreMonster(monsterId: number, index: number): MonsterVO {
        let self = this;
        let monsterType: number = BattleManager.Instance.getType(monsterId);
        let unlockMonsterLevel: number = BattleManager.Instance.getLevel(monsterId);
        let unlockMonster: any = BattleManager.Instance.getUnLockMonster(monsterType, unlockMonsterLevel);
        let monsterCfg: any = null;
        if (unlockMonster) {
            let monsterLevel: number = BattleManager.Instance.getLevel(unlockMonster.id) + index;
            if (monsterLevel > BattleManager.Instance.model.monsterMaxLevel) {
                monsterLevel = BattleManager.Instance.model.monsterMaxLevel;
            } else if (monsterLevel < 0) {
                monsterLevel = 0;
            }
            let newMonsterId: number = monsterType * 100 + monsterLevel;
            monsterCfg = self.getMonsterItem(newMonsterId);
        }
        return monsterCfg;
    }

    /** 获取英雄价格 */
    public getMonsterPrice(price: any, buyTimes: number): number {
        if (buyTimes > 0) {
            return price * Math.pow(1.175, buyTimes);
        }
        return price;
    }

    /** 获取钻石价格 */
    public getMonsterDiamondPrice(monsterId: number, buyTimes: number): number {
        let self = this;
        let monsterLevel: number = BattleManager.Instance.getLevel(monsterId);
        if (monsterLevel < 1) {
            return self._model.monsterBaseDiamondPrice;
        }
        if (monsterId > 1000) {
            monsterLevel += 30; //进化后的
        }
        let monsterPrice = self._model.monsterBaseDiamondPrice;;
        // 31级前：买的次数递增：=原价*1.25^(n-1)；成本递增：上一级车*1.085。
        // 31级后（含31级）：买的次数递增：=原价*1.25^(n-1)；成本递增：上一级车*1.045
        let foreLevel = 30;
        if (monsterLevel > foreLevel) {
            monsterPrice = monsterPrice * Math.pow(1.085, (monsterLevel - 1)) * Math.pow(1.045, (monsterLevel - foreLevel));
        } else {
            monsterPrice = monsterPrice * Math.pow(1.085, (monsterLevel - 1));
        }
        if (buyTimes > 0) {
            monsterPrice = monsterPrice * Math.pow(1.25, buyTimes);
        }
        monsterPrice = Math.ceil(monsterPrice); //四舍五入
        return monsterPrice;
    }

    /** 获取关卡配置信息 */
    public getBarrierSectionConfig(id: number, sectionId: number = 0): any {
        let self = this;
        let barrierSectionId: string = id.toString();
        let barrierArr: any[] = null;
        if (sectionId > 0) {
            barrierSectionId = barrierSectionId + '_' + sectionId;
        } else {
            barrierArr = [];
        }
        if (!self._model.barrierConfigDic) {
            self._model.barrierConfigDic = new TSDictionary<string, any>();
        } else if (self._model.barrierConfigDic.ContainsKey(barrierSectionId)) {
            return self._model.barrierConfigDic.TryGetValue(barrierSectionId);
        }
        let barrierConfigs: BarrierConfigVO[] = GlobleData.getAllValue(GlobleData.BarrierConfigVO);
        for (let i: number = 0, len: number = barrierConfigs.length; i < len; i++) {
            let barrier: BarrierConfigVO = barrierConfigs[i];
            if (sectionId > 0) {
                if (barrier.id == barrierSectionId) {//关卡章节
                    self._model.barrierConfigDic.Add(barrier.id, barrier);
                    return barrier;
                }
            } else if (barrier.id) {
                let stageId: string = barrier.id;//关卡
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
    }

    /** 获取每关最大收益 */
    public getBarrierIncome(id: number): number {
        let self = this;
        if (!self._model.barrierIncomeReordDic) {
            self._model.barrierIncomeReordDic = new TSDictionary<number, any>();
        } else if (self._model.barrierIncomeReordDic.ContainsKey(id)) {
            return self._model.barrierIncomeReordDic.TryGetValue(id);
        }
        let income: number = 0;
        let barriers = self.getBarrierSectionConfig(id);
        if (barriers) {
            barriers.forEach(element => {
                income += element.earnings * 10;
            });
        }
        self._model.barrierIncomeReordDic.Add(id, income);
        return income;
    }

    /** 获取每关对应的解锁坑位 */
    public getBarrierSeatNum(id: number): number {
        let self = this;
        let barrierConfigVO = self.getBarrierSectionConfig(id, 1);
        if (barrierConfigVO && barrierConfigVO.seatNum) {
            return barrierConfigVO.seatNum;
        }
        return 3;
    }

    /** 关卡奖励金币换算 */
    public getBarrierRewardToGold(stage: number, gold: number): number {
        return gold * this.getBarrierIncome(stage) * 0.04;
    }

    set hallScene(value: HallScene) { this._hallScene = value; }
    get hallScene(): HallScene { return this._hallScene };

    public get model(): BattleModel {
        return this._model;
    }
    public set model(value: BattleModel) {
        this._model = value;
    }
    /** 最大关卡 */
    public get maxBarrier(): number {
        return this._maxBarrier;
    }
    public set maxBarrier(value: number) {
        this._maxBarrier = value;
    }


    private static _instance: BattleManager;
    public static get Instance(): BattleManager {
        if (BattleManager._instance == null) {
            BattleManager._instance = new BattleManager();
        }
        return BattleManager._instance;
    }
}