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
 * terry 2018/10/24;
 * 怪物精灵
 */
var MonsterSprite = /** @class */ (function (_super) {
    __extends(MonsterSprite, _super);
    function MonsterSprite() {
        var _this = _super.call(this) || this;
        _this.monsterId = 0;
        _this.monsterStage = 0; //0未停车/1在车位/2在跑道/3拖动/4宝箱
        _this.parkIndex = -1; //车位编号
        _this._boxEffectNode = null; //宝箱掉落效果
        _this._isLock = false; //是否上锁
        _this._isLight = false; //是否高亮
        _this.animPreKey = ''; //独立动作名前缀
        _this._state = -1; //默认0步行，1为攻击
        _this._moveLoopFun = null; //移动函数
        _this._moveSpeedRatio = 1; //移动速度倍率
        _this._moveAccelerate = 1; //移动速度加速
        _this._moveBaseSpeed = 1; //基础移动速度
        _this._atkAccelerate = 1; //攻击加速
        _this._aniStandFrameStart = 0; //站立
        _this.yun_key = "yun_img"; //缓存池管理
        _this.yun_key_acce = "yun_img_acce"; //加速度
        _this.bornDelayFun = null; //出生延迟函数
        _this.curBlood = 1; //当前血量
        _this.maxBlood = 1; //最大血量
        _this.preHurtBlood = 0; //预扣血量，攻击时恢复为当前血量
        _this._isDeath = false; //是否死亡
        _this.money = 0; //可掉落金钱
        _this.atkValue = 1; //攻击力
        _this.atkSpeedValue = 1; //攻击速度
        _this.skillId = 0; //技能id
        _this._isAtkEnabled = true; //是否有攻击能力
        _this.dropMoneyFun = null; //掉落金币回调
        _this.calcuteNextMovePosFun = null; //计算下一步移动坐标
        _this._level = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
        _this._isLoadComplete = false;
        return _this;
    }
    //出生
    MonsterSprite.prototype.setBornDelayFun = function (parentNode, _delayTime, _callback) {
        var that = this;
        if (that.bornDelayFun == null) {
            that._parentNode = parentNode;
            that.bornDelayFun = function () {
                _callback && _callback();
                if (that.bornDelayFun) {
                    that.bornDelayFun = null;
                }
            };
            that.timerOnce(_delayTime, that, that.bornDelayFun);
        }
    };
    MonsterSprite.prototype.clearBornDelayFun = function () {
        var that = this;
        if (that.bornDelayFun) {
            that.clearTimer(that, that.bornDelayFun);
            that.bornDelayFun = null;
        }
    };
    //设置车类型
    MonsterSprite.prototype.setKind = function (id, $index) {
        if ($index === void 0) { $index = -1; }
        var self = this;
        if (self.isLock())
            return;
        self.monsterId = id;
        if ($index >= 0) {
            self.parkIndex = $index; //-1默认不设置
        }
        self._monsterInfo = BattleManager.Instance.getMonsterItem(this.monsterId);
        if (self._monsterInfo) {
            //属性设置
            self.atkValue = MathUtils.parseStringNum(self._monsterInfo.atk);
            self.atkSpeedValue = self._monsterInfo.ias;
            self.skillId = self._monsterInfo.ability;
            self._moveBaseSpeed = self._monsterInfo.mMoveSpeed;
            var aniPath_1 = self._monsterInfo.modelImgUrl;
            var aniFrameKey_1 = self._monsterInfo.modelImgKey;
            self.animPreKey = aniPath_1 + "/" + aniFrameKey_1;
            var anim_1 = self.getChildByName(MonsterSprite.roleKey);
            if (anim_1 == null) {
                //创建动画实例
                anim_1 = Laya.Pool.getItemByClass(userData.ANIMATION_POOL_NAME, Laya.Animation);
                anim_1.name = MonsterSprite.roleKey;
                anim_1.pivot(self._monsterInfo.pivotX, self._monsterInfo.pivotY);
                self.addChild(anim_1);
            }
            // 加载动画图集,加载成功后执行回调方法
            var aniAtlas = PathConfig.MonsterUrl.replace("{0}", aniPath_1);
            self._isLoadComplete = false;
            anim_1.loadAtlas(aniAtlas, Handler.create(self, function () {
                //创建动画模板dizziness
                self._aniStandFrameStart = self._monsterInfo.modelImgWait - (self._monsterInfo.modelImgWait - self._monsterInfo.modelImgAtk);
                if (self._monsterInfo.type == MONSTER_TYPE.MONSTER || self._monsterInfo.type == MONSTER_TYPE.BOSS) {
                    self._aniStandFrameStart = 0;
                }
                Laya.Animation.createFrames(AnimationUtils.heroAniUrls(aniFrameKey_1, self._aniStandFrameStart, self._monsterInfo.modelImgWait, aniPath_1 + '/', true), (self.animPreKey + MonsterSprite.standAnimKey));
                Laya.Animation.createFrames(AnimationUtils.heroAniUrls(aniFrameKey_1, 0, self._monsterInfo.modelImgAtk, aniPath_1 + '/'), (self.animPreKey + MonsterSprite.atkAnimKey));
                //设置坐标
                if (anim_1.frames) {
                    var aniGraphics = anim_1.frames[1];
                    if (aniGraphics) {
                        var aniBounds = aniGraphics.getBounds();
                        if (self._monsterInfo.type == MONSTER_TYPE.HERO || self._monsterInfo.type == MONSTER_TYPE.SUPER_HERO) { //英雄
                            anim_1.scaleX = -1;
                            var heroPos = self.getChildByName('heroPos');
                            if (heroPos) {
                                anim_1.pos(heroPos.x, heroPos.y);
                            }
                        }
                        else if (self._monsterInfo.type == MONSTER_TYPE.BOSS_HERO) { //守护
                            anim_1.pos((self.width - aniBounds.width) / 2, (self.height - aniBounds.width) / 2 - 60);
                        }
                        else { //敌人
                            anim_1.pos(0, 0);
                        }
                    }
                }
                self._isLoadComplete = true;
                //重置状态
                self._state = -1;
                //播放站立动画
                self.playAnimation(0);
            }));
        }
        if (self.monsterId > 0) {
            self.setStage(1);
        }
        else {
            self.setStage(0);
        }
    };
    //状态
    MonsterSprite.prototype.playAnimation = function (state, hero, monster, attackValue) {
        if (state === void 0) { state = 0; }
        if (hero === void 0) { hero = null; }
        if (monster === void 0) { monster = null; }
        if (attackValue === void 0) { attackValue = 0; }
        var self = this;
        if (self._state == state || !self._isLoadComplete) {
            return;
        }
        self._state = state;
        var animName = (self.animPreKey + MonsterSprite.standAnimKey);
        var isLoop = true;
        var aniInterval = 100 * self._atkAccelerate;
        if (self._state == 1) {
            animName = (self.animPreKey + MonsterSprite.atkAnimKey);
            isLoop = false;
            aniInterval = aniInterval / 4;
            //自动复位站立
            if (hero) {
                self.timerOnce(aniInterval * hero.monsterInfo.modelImgAtk, self, function () {
                    self.playAnimation(0);
                });
                //攻击回调
                self.timerOnce(aniInterval * 10, self, self.onAttack, [hero, monster, attackValue]);
            }
            //暂停攻击能力
            if (self.atkSpeedValue > 0) {
                self._isAtkEnabled = false;
                var buff = 1 / (1 + BuffController.getInstance().getBuffValueById(BuffSheet.ATTACK_SPEED_INCREASE));
                self.timerOnce(self.atkSpeedValue * 1000 * (self._atkAccelerate * buff), self, function () {
                    //恢复攻击能力
                    self._isAtkEnabled = true;
                });
            }
        }
        //英雄
        var roleAni = self.getChildByName(MonsterSprite.roleKey);
        if (roleAni) {
            roleAni.interval = aniInterval;
            if (animName == (self.animPreKey + MonsterSprite.standAnimKey)) {
                roleAni.play(self._aniStandFrameStart, isLoop, animName);
            }
            else {
                roleAni.play(0, isLoop, animName);
            }
        }
    };
    MonsterSprite.prototype.onAttack = function (hero, monster, attackValue) {
        BattleManager.Instance.doPetAttack(hero, monster, attackValue);
        Laya.SoundManager.playSound("musics/atk.mp3");
    };
    //设置车状态(0未停车/1在车位/2在跑道/3拖动)
    MonsterSprite.prototype.setStage = function (_stage) {
        var that = this;
        if (that.isLock())
            return;
        var imgCar = that.getChildByName('imgCar');
        if (imgCar) {
            imgCar.alpha = 1;
        }
        //carId
        var imgLevel = that.getChildByName('imgLevel');
        if (imgLevel) {
            imgLevel.visible = true;
            imgLevel.zOrder = 10;
            var txtLevel = imgLevel.getChildByName('txtLevel');
            if (txtLevel) {
                txtLevel.changeText('' + BattleManager.Instance.getLevel(that.monsterId));
            }
        }
        that.showCar(true);
        //状态处理
        if (_stage == 1) {
            if (that.monsterStage == 2) {
                // that.removeRunwayCar();
            }
        }
        else if (_stage == 2) {
            var imgCar_1 = that.getChildByName('imgCar');
            if (imgCar_1) {
                imgCar_1.alpha = 0.6;
            }
        }
        else if (_stage == 3) {
            var imgCar_2 = that.getChildByName('imgCar');
            if (imgCar_2) {
                imgCar_2.alpha = 0.4;
            }
        }
        else if (_stage == 4) {
            //宝箱
            that.showCar(false);
        }
        else {
            that.showCar(false);
        }
        that.monsterStage = _stage;
    };
    //显示或隐藏车
    MonsterSprite.prototype.showCar = function (_show) {
        if (_show === void 0) { _show = true; }
        this.visible = _show;
    };
    //已放入跑道
    MonsterSprite.prototype.isRunning = function () {
        return (this.monsterStage == 2);
    };
    //可使用
    MonsterSprite.prototype.isEnabled = function () {
        return (this.monsterStage == 1);
    };
    //是否空车位
    MonsterSprite.prototype.isEmpty = function () {
        return (this.monsterStage < 1);
    };
    //是否顶级
    MonsterSprite.prototype.isMaxLevel = function () {
        var that = this;
        return BattleManager.Instance.getLevel(that.monsterId) >= BattleManager.Instance.model.monsterMaxLevel;
    };
    //宝箱(不可交换/合并)
    MonsterSprite.prototype.isBox = function () {
        return (this.monsterStage == 4);
    };
    //设置锁
    MonsterSprite.prototype.setLock = function (_lock, index) {
        var that = this;
        var imgLock = that.getChildByName('imgLock');
        if (imgLock) {
            var unlockImg = that.getChildByName('txt_openLevel');
            imgLock.visible = unlockImg.visible = _lock;
            if (imgLock.visible) {
                if (unlockImg && index >= 10) {
                    unlockImg.text = that._level[index - 10] + "关";
                }
            }
        }
        that._isLock = _lock;
    };
    //是否上锁
    MonsterSprite.prototype.isLock = function () {
        return this._isLock;
    };
    //设置锁
    MonsterSprite.prototype.setLight = function (_light) {
        var that = this;
        var imgLight = that.getChildByName('imgLight');
        if (imgLight) {
            imgLight.visible = _light;
        }
        that._isLight = _light;
    };
    //是否上锁
    MonsterSprite.prototype.isLight = function () {
        return this._isLight;
    };
    //播放两车合并效果
    MonsterSprite.prototype.playMergeEffetc = function (_parentNode, _carId) {
        var that = this;
        //基础节点
        var effectNode = new Laya.Sprite();
        _parentNode.addChild(effectNode);
        var pos = that.localToGlobal(new Laya.Point(that.width / 2, that.height / 2));
        pos = _parentNode.globalToLocal(pos);
        effectNode.pos(pos.x, pos.y);
        that.showCar(false);
        var offsetX = 70;
        var parkcarLeftSp = ObjectPool.pop(MonsterSprite, "NewMonsterSprite");
        effectNode.addChild(parkcarLeftSp);
        parkcarLeftSp.setKind(_carId);
        parkcarLeftSp.anim.pos(0, 0);
        parkcarLeftSp.pos(0, 0);
        Laya.Tween.to(parkcarLeftSp, {
            x: -offsetX
        }, 300, Laya.Ease.elasticOut, Laya.Handler.create(that, function () {
            Laya.Tween.to(parkcarLeftSp, {
                x: 0
            }, 100, Laya.Ease.linearIn, Laya.Handler.create(that, function () {
                effectNode.removeChildren();
                EffectUtils.playCoinEffect(effectNode, 'images/star2.png', {
                    x: 0,
                    y: 0
                }, function () {
                    effectNode.removeSelf();
                });
                if (that.monsterId > 0) {
                    that.showCar(true);
                }
                Laya.Tween.clearTween(parkcarLeftSp);
                ObjectPool.push(parkcarLeftSp);
                parkcarLeftSp.removeSelf();
            }, null, true));
        }));
        //复制品
        var parkcarCopy = ObjectPool.pop(MonsterSprite, "NewMonsterSprite");
        parkcarLeftSp.addChild(parkcarCopy);
        parkcarCopy.setKind(_carId);
        parkcarCopy.anim.pos(0, 0);
        parkcarCopy.pos(0, 0);
        parkcarCopy.anim.scaleX = -1;
        Laya.Tween.to(parkcarCopy, {
            x: offsetX * 2
        }, 300, Laya.Ease.elasticOut, Laya.Handler.create(that, function () {
            Laya.Tween.to(parkcarCopy, {
                x: 0
            }, 100, Laya.Ease.linearIn, Laya.Handler.create(that, function () {
                Laya.Tween.clearTween(parkcarCopy);
                ObjectPool.push(parkcarCopy);
                parkcarCopy.removeSelf();
            }, null, true));
        }));
    };
    //掉落宝箱
    MonsterSprite.prototype.dropBoxEffect = function (_parentNode) {
        var that = this;
        //基础节点
        var effectNode = new Laya.Sprite();
        _parentNode.addChild(effectNode);
        var pos = that.localToGlobal(new Laya.Point(0, 0));
        pos = _parentNode.globalToLocal(pos);
        effectNode.pos(pos.x + that.width / 2, pos.y + that.height / 2 - 2);
        that.setStage(4);
        var parkcarSp = new MonsterSprite();
        effectNode.addChild(parkcarSp);
        parkcarSp.loadImage("images/drop_box.png", 0, 0, 60, 60);
        parkcarSp.pivot(parkcarSp.width / 2, parkcarSp.height / 2);
        EffectUtils.playBoxDropEffect(effectNode, function () {
            parkcarSp.frameOnce(60, that, function () {
                that.openBoxEffect();
            });
        });
        that._boxEffectNode = effectNode;
    };
    //打开宝箱
    MonsterSprite.prototype.openBoxEffect = function () {
        var that = this;
        var effectNode = that._boxEffectNode;
        if (effectNode) {
            EffectUtils.playBoxShakeEffect(effectNode, function () {
                effectNode.removeChildren();
                EffectUtils.playCoinEffect(effectNode, 'images/star2.png', {
                    x: 0,
                    y: 0
                }, function () {
                    effectNode.removeChildren();
                    effectNode.removeSelf();
                });
                that.setStage(1);
            });
            that._boxEffectNode = null;
        }
    };
    //获取车配置信息
    MonsterSprite.prototype.getBuyPrice = function () {
        var carInfo = BattleManager.Instance.getMonsterItem(this.monsterId);
        if (carInfo) {
            return carInfo.buyPrice;
        }
        return 0;
    };
    MonsterSprite.prototype.getSellPrice = function () {
        return this.getBuyPrice() * 0.8;
    };
    MonsterSprite.prototype.getIncomePerSecond = function () {
        // let carInfo = BattleManager.Instance.getMonsterItem(this.monsterId);
        // if (carInfo) {
        //     return carInfo.PerSecCoin;
        // }
        return 0;
    };
    //是否相同等级
    MonsterSprite.prototype.isSameLevel = function (_carId) {
        var that = this;
        var mLevel = BattleManager.Instance.getLevel(that.monsterId);
        if (mLevel > 0) {
            return mLevel == BattleManager.Instance.getLevel(_carId);
        }
        return false;
    };
    //显示血量(_hurtBlood:伤害血量, _maxBlood:总血量)
    MonsterSprite.prototype.updateBlood = function (_hurtBlood, _maxBlood, _isDoubleHurt) {
        if (_maxBlood === void 0) { _maxBlood = 0; }
        if (_isDoubleHurt === void 0) { _isDoubleHurt = false; }
        var self = this;
        var hurtBlood = _hurtBlood;
        if (_isDoubleHurt) {
            hurtBlood *= 2;
        }
        if (_maxBlood > 0) {
            self.maxBlood = _maxBlood;
            self.curBlood = self.maxBlood;
        }
        else {
            self.curBlood -= hurtBlood;
            if (self.curBlood < 0) {
                self.curBlood = 0;
            }
        }
        self.resetLeftBlood();
        var bloodBarKey = "bloodBar";
        var bloodBar = self.getChildByName(bloodBarKey);
        if (bloodBar == null) {
            bloodBar = new Laya.ProgressBar("images/game_blood.png");
            bloodBar.name = bloodBarKey;
            self.addChild(bloodBar);
            bloodBar.pos(-76 / 2, -200 / 2);
            bloodBar.width *= 0.8;
        }
        bloodBar.value = self.curBlood / self.maxBlood;
        bloodBar.visible = self.curBlood < self.maxBlood;
        var isDeath = self.curBlood <= 0;
        if (self._isDeath == false && isDeath) {
            //死亡状态切换
            self._isDeath = isDeath;
            self.stopMoveAction();
            self.clearBornDelayFun();
            self.showCar(false);
            DisplayUtils.removeFromArray(self, HallManager.Instance.hallData.monsterArray);
            self.dropMoneyFun && self.dropMoneyFun(self.money);
        }
        //飘数字
        if (hurtBlood > 0) {
            EffectUtils.playBloodTextEffect(self._parentNode, "-" + MathUtils.bytesToSize(hurtBlood, true), new Laya.Point(self.x, self.y - 60), _isDoubleHurt);
        }
        //被击效果
        // that.playBehitEffect();
    };
    //预扣血量,判断是否有剩余
    MonsterSprite.prototype.isLeftBlood = function (_hurtBlood) {
        var that = this;
        if (that.preHurtBlood > 0) {
            that.preHurtBlood -= _hurtBlood;
            return true;
        }
        return false;
    };
    MonsterSprite.prototype.resetLeftBlood = function () {
        var that = this;
        that.preHurtBlood = that.curBlood;
    };
    //显示冰冻减速
    MonsterSprite.prototype.reduceMoveSpeed = function (_ratio, _keepTime) {
        if (_keepTime === void 0) { _keepTime = 1; }
        var that = this;
        if (that._moveSpeedRatio < 1) {
            return;
        }
        that._moveSpeedRatio = _ratio;
        var effectKey = "iceKey";
        var effectSp = that.getChildByName(effectKey);
        if (effectSp == null) {
            effectSp = Laya.Pool.getItemByClass("layaImage", Laya.Image);
            effectSp.skin = "images/effect_water002.png";
            effectSp.name = effectKey;
            that.addChild(effectSp);
            effectSp.pos(-110 / 2, -120 / 2);
            effectSp.zOrder = -1;
        }
        effectSp.timerOnce(_keepTime * 1000, that, function () {
            Laya.Pool.recover("layaImage", effectSp);
            effectSp.removeSelf();
            that._moveSpeedRatio = 1;
        });
    };
    //显示中毒效果
    MonsterSprite.prototype.showDrug = function (_hurtValue, _hurtTimes) {
        var that = this;
        var effectKey = "drugKey";
        var effectSp = that.getChildByName(effectKey);
        if (effectSp == null) {
            effectSp = Laya.Pool.getItemByClass("layaImage", Laya.Image);
            effectSp.skin = "images/effect_drug002.png";
            effectSp.name = effectKey;
            that.addChild(effectSp);
            effectSp.pos(-75 / 2, -170 / 2);
            //特效
            var actionSp = effectSp;
            if (actionSp) {
                var timeLine_1 = Laya.Pool.getItemByClass("timeLine", Laya.TimeLine);
                timeLine_1.addLabel("tl1", 0).to(actionSp, {
                    alpha: 0.8
                }, 100, Laya.Ease.linearNone)
                    .addLabel("tl2", 100).to(actionSp, {
                    alpha: 1
                }, 200, Laya.Ease.linearNone);
                timeLine_1.once(Laya.Event.COMPLETE, actionSp, function () {
                    timeLine_1.destroy();
                    timeLine_1 = null;
                });
                timeLine_1.play(0, true);
            }
        }
        effectSp.timerOnce(1000, that, function (_hurtTimes2) {
            that.updateBlood(_hurtValue);
            Laya.Pool.recover("layaImage", effectSp);
            effectSp.removeSelf();
            if (_hurtTimes2 > 1) {
                that.showDrug(_hurtValue, _hurtTimes2);
            }
        }, [_hurtTimes - 1]);
    };
    //被击效果
    MonsterSprite.prototype.playBehitEffect = function () {
        var that = this;
        //特效
        var actionSp = that;
        if (actionSp) {
            var timeLine = Laya.Pool.getItemByClass("timeLine", Laya.TimeLine);
            timeLine.addLabel("tl1", 0).to(actionSp, {
                scaleX: 0.9
            }, 100, Laya.Ease.linearNone)
                .addLabel("tl2", 100).to(actionSp, {
                scaleX: 1
            }, 200, Laya.Ease.linearNone);
            timeLine.once(Laya.Event.COMPLETE, actionSp, function () {
                // actionSp.removeSelf();
            });
            timeLine.play(0, false);
        }
    };
    //是否活着
    MonsterSprite.prototype.isLiving = function () {
        var that = this;
        return (that.monsterId > 0) && (that.isDeath() == false);
    };
    //是否死亡
    MonsterSprite.prototype.isDeath = function () {
        var that = this;
        return that._isDeath;
    };
    MonsterSprite.prototype.getBloodValue = function () {
        var that = this;
        return that.curBlood;
    };
    MonsterSprite.prototype.getAtkValue = function () {
        var that = this;
        return that.atkValue;
    };
    MonsterSprite.prototype.isAtkEnabled = function () {
        var that = this;
        return (that.monsterId > 0 && that._isAtkEnabled);
    };
    MonsterSprite.prototype.getSkillId = function () {
        var that = this;
        return that.skillId;
    };
    //重置攻击频率
    MonsterSprite.prototype.setAtkSpeedValue = function (_value) {
        var that = this;
        that.atkSpeedValue = _value;
    };
    //清空状态数据
    MonsterSprite.prototype.clearStage = function () {
        this.setKind(0);
        this.setStage(0);
        this.showCar(false);
    };
    //设置拖动
    MonsterSprite.prototype.onStartDrag = function (_isUpRemove) {
        var _this = this;
        if (_isUpRemove === void 0) { _isUpRemove = false; }
        this.startDrag();
        if (_isUpRemove) {
            this.on(Laya.Event.MOUSE_UP, this, function (e) {
                if (e === void 0) { e = null; }
                _this.removeSelf();
            });
        }
    };
    //移动
    MonsterSprite.prototype.playMoveAction = function () {
        var that = this;
        var spPos = {
            x: that.x,
            y: that.y
        };
        var targetPosArray = [{
                x: spPos.x + 140,
                y: spPos.y
            },
            {
                x: spPos.x + 140,
                y: spPos.y + 470
            },
            {
                x: spPos.x + 700,
                y: spPos.y + 470
            },
            {
                x: spPos.x + 700,
                y: spPos.y - 230
            },
            {
                x: spPos.x + 300,
                y: spPos.y - 230
            },
            {
                x: spPos.x + 270,
                y: spPos.y - 400
            }
        ];
        //移动速度
        var moveSpeed = that._moveBaseSpeed * 0.04;
        that._targetIndex = 0;
        var zOrderTime = 60; //层刷新时间
        var moveTime = zOrderTime - 1; //移动时间
        that._moveLoopFun = function () {
            if (that._targetIndex >= targetPosArray.length)
                return;
            var targetPos = targetPosArray[that._targetIndex];
            var curPos = new Laya.Point(that.x, that.y);
            var disX = targetPos.x - curPos.x;
            var disY = targetPos.y - curPos.y;
            var distance = curPos.distance(targetPos.x, targetPos.y);
            var ratio = moveSpeed / distance * that._moveSpeedRatio * that._moveAccelerate;
            if (distance < (ratio + 1)) {
                that._targetIndex++;
                return;
            }
            switch (that._targetIndex) {
                case 0:
                case 1:
                case 2:
                    that.scaleX = -1;
                    that.changeBloodBarDir();
                    break;
                default:
                    that.scaleX = 1;
                    break;
            }
            var movePosX = disX * ratio;
            var movePosY = disY * ratio;
            that.pos(curPos.x + movePosX, curPos.y + movePosY);
            //zorder
            if (moveTime > zOrderTime) {
                moveTime = 0;
                that.zOrder = Math.floor(curPos.y);
            }
            else {
                moveTime++;
            }
        };
        that.timerLoop(10, that, that._moveLoopFun);
        //计算下一步移动坐标
        that.calcuteNextMovePosFun = function () {
            if (that._targetIndex >= targetPosArray.length) {
                return new Laya.Point(that.x, that.y);
            }
            var targetPos = targetPosArray[that._targetIndex];
            var curPos = new Laya.Point(that.x, that.y);
            var disX = targetPos.x - curPos.x;
            var disY = targetPos.y - curPos.y;
            var distance = curPos.distance(targetPos.x, targetPos.y);
            var ratio = moveSpeed / distance * that._moveSpeedRatio * that._moveAccelerate;
            var movePosX = disX * ratio;
            var movePosY = disY * ratio;
            return new Laya.Point(curPos.x + movePosX, curPos.y + movePosY);
        };
    };
    /** 更改血量的方向 */
    MonsterSprite.prototype.changeBloodBarDir = function () {
        var that = this;
        var bloodBar = that.getChildByName("bloodBar");
        bloodBar.scaleX = -1;
        bloodBar.x = (-76 / 2) + bloodBar.width;
    };
    //停止移动
    MonsterSprite.prototype.stopMoveAction = function () {
        var that = this;
        if (that._moveLoopFun) {
            that.clearTimer(that, that._moveLoopFun);
            that._moveLoopFun = null;
        }
        Laya.Pool.clearBySign(that.yun_key);
        Laya.Pool.clearBySign(that.yun_key_acce);
    };
    MonsterSprite.prototype.setMoveSpeedRatio = function (_value) {
        this._moveSpeedRatio = _value * 0.13;
    };
    MonsterSprite.prototype.setMoveAccelerate = function (_value) {
        var that = this;
        that._moveAccelerate = _value;
    };
    MonsterSprite.prototype.setAtkAccelerate = function (_value) {
        var that = this;
        that._atkAccelerate = 1.0 / _value;
    };
    MonsterSprite.prototype.setDropMoneyFun = function (_fun) {
        this.dropMoneyFun = _fun;
    };
    MonsterSprite.prototype.setDropMoney = function (_money) {
        this.money = _money;
    };
    Object.defineProperty(MonsterSprite.prototype, "monsterInfo", {
        get: function () {
            return this._monsterInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterSprite.prototype, "anim", {
        get: function () {
            return this.getChildByName(MonsterSprite.roleKey);
        },
        set: function (value) {
            var heroAnim = this.getChildByName(MonsterSprite.roleKey);
            heroAnim = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonsterSprite.prototype, "targetIndex", {
        get: function () {
            return this._targetIndex;
        },
        set: function (value) {
            this._targetIndex = value;
        },
        enumerable: true,
        configurable: true
    });
    //##贝塞尔曲线#################################
    // 以控制点cp计算曲线点
    MonsterSprite.prototype.CalculateBeizer = function (cp, numOfPoints) {
        var t = 1.0 / (numOfPoints - 1);
        var curve = [];
        for (var i = 0; i < numOfPoints; i++) {
            curve[i] = this.PointOnCubicBezier(cp, i * t);
        }
        return curve;
    };
    // 参数1: 4个点坐标(起点，控制点1，控制点2，终点)  
    // 参数2: 0 <= t <= 1   
    MonsterSprite.prototype.PointOnCubicBezier = function (cp, t) {
        var tPoint_x = this.MetaComputing(cp[0].x, cp[1].x, cp[2].x, cp[3].x, t);
        var tPoint_y = this.MetaComputing(cp[0].y, cp[1].y, cp[2].y, cp[3].y, t);
        return {
            x: tPoint_x,
            y: tPoint_y
        };
    };
    MonsterSprite.prototype.MetaComputing = function (p0, p1, p2, p3, t) {
        // 方法一:  
        var a, b, c;
        var tSquare, tCube;
        // 计算多项式系数
        c = 3.0 * (p1 - p0);
        b = 3.0 * (p2 - p1) - c;
        a = p3 - b - c - p0;
        // 计算t位置的点
        tSquare = t * t;
        tCube = t * tSquare;
        return (a * tCube) + (b * tSquare) + (c * t) + p0;
        // 方法二: 原始的三次方公式
        //  number n = 1.0 - t;
        //  return n*n*n*p0 + 3.0*p1*t*n*n + 3.0*p2*t*t*n + p3*t*t*t;
    };
    //模型
    MonsterSprite.roleKey = "role_key";
    MonsterSprite.standAnimKey = 'stand'; //站立动画key
    MonsterSprite.atkAnimKey = 'attack'; //攻击动画key
    return MonsterSprite;
}(Laya.Sprite));
var MONSTER_TYPE;
(function (MONSTER_TYPE) {
    MONSTER_TYPE[MONSTER_TYPE["HERO"] = 1] = "HERO";
    MONSTER_TYPE[MONSTER_TYPE["SUPER_HERO"] = 2] = "SUPER_HERO";
    MONSTER_TYPE[MONSTER_TYPE["MONSTER"] = 3] = "MONSTER";
    MONSTER_TYPE[MONSTER_TYPE["BOSS"] = 4] = "BOSS";
    MONSTER_TYPE[MONSTER_TYPE["BOSS_HERO"] = 5] = "BOSS_HERO";
})(MONSTER_TYPE || (MONSTER_TYPE = {}));
//# sourceMappingURL=Monster.js.map