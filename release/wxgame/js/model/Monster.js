var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
        _this.maxFrameCount = 5; //动画最大帧数
        _this.standFrameCount = 3; //动画最大帧数
        _this._state = -1; //默认0步行，1为攻击
        //移动
        _this._isMoveAction = false; //是否在移动
        _this._moveLoopFun = null; //移动函数
        _this._moveSpeedRatio = 1; //移动速度倍率
        _this._moveAccelerate = 1; //移动速度加速
        _this._moveBaseSpeed = 1; //基础移动速度
        _this._atkAccelerate = 1; //攻击加速
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
    MonsterSprite.prototype.setKind = function (_kind, _index) {
        if (_index === void 0) { _index = -1; }
        var that = this;
        if (that.isLock())
            return;
        that.monsterId = _kind;
        if (_index >= 0) {
            that.parkIndex = _index; //-1默认不设置
        }
        var skinPath = "";
        that._monsterInfo = getMonsterConfig(that.monsterId);
        if (that._monsterInfo) {
            skinPath = "images/carImg/" + that._monsterInfo.imgUrl;
            //属性设置
            that.atkValue = CommonFun.parseStringNum(that._monsterInfo.atk);
            that.atkSpeedValue = CommonFun.parseStringNum(that._monsterInfo.ias);
            that.skillId = CommonFun.parseStringNum(that._monsterInfo.ability);
            that._moveBaseSpeed = CommonFun.parseStringNum(that._monsterInfo.mMoveSpeed);
            var aniPath_1 = that._monsterInfo.modelImgUrl;
            var aniFrameKey_1 = that._monsterInfo.modelImgKey;
            that.animPreKey = aniPath_1 + aniFrameKey_1;
            that.maxFrameCount = that._monsterInfo.modelImgNum;
            var standFrame = CommonFun.parseStringNum(that._monsterInfo.standFrame);
            if (standFrame > 0) {
                that.standFrameCount = standFrame;
            }
            var roleAni_1 = that.getChildByName(MonsterSprite.roleKey);
            if (roleAni_1 == null) {
                //创建动画实例
                roleAni_1 = Laya.Pool.getItemByClass(userData.ANIMATION_POOL_NAME, Laya.Animation);
                that.addChild(roleAni_1);
                roleAni_1.name = MonsterSprite.roleKey;
            }
            // 加载动画图集,加载成功后执行回调方法
            var aniAtlas = AppResUrl + "images/anim/" + aniPath_1 + ".atlas";
            roleAni_1.loadAtlas(aniAtlas, Handler.create(that, function () {
                //创建动画模板dizziness
                Laya.Animation.createFrames(CommonFun.aniUrls(aniFrameKey_1, that.standFrameCount, aniPath_1 + '/', true), (that.animPreKey + MonsterSprite.standAnimKey));
                Laya.Animation.createFrames(CommonFun.aniUrls(aniFrameKey_1, that.maxFrameCount, aniPath_1 + '/'), (that.animPreKey + MonsterSprite.atkAnimKey));
                //设置坐标
                if (roleAni_1.frames) {
                    var aniGraphics = roleAni_1.frames[1];
                    if (aniGraphics) {
                        var aniBounds = aniGraphics.getBounds();
                        roleAni_1.pos((that.width - aniBounds.width) / 2, (that.height - aniBounds.width) / 2 - 50);
                    }
                }
                //重置状态
                that._state = -1;
                //播放站立动画
                that.playAnimation(0);
            }));
        }
        if (that.monsterId > 0) {
            that.setStage(1);
        }
        else {
            that.setStage(0);
        }
    };
    //状态
    MonsterSprite.prototype.playAnimation = function (_state, _atkCallback) {
        if (_state === void 0) { _state = 0; }
        if (_atkCallback === void 0) { _atkCallback = null; }
        var that = this;
        if (that._state == _state) {
            return;
        }
        that._state = _state;
        var animName = (that.animPreKey + MonsterSprite.standAnimKey);
        var isLoop = true;
        var aniInterval = 100 * that._atkAccelerate;
        if (that._state == 1) {
            animName = (that.animPreKey + MonsterSprite.atkAnimKey);
            isLoop = false;
            aniInterval = aniInterval / 4;
            //自动复位站立
            that.timerOnce(aniInterval * that.maxFrameCount, that, function () {
                that.playAnimation(0);
            });
            //攻击回调
            if (_atkCallback) {
                that.timerOnce(aniInterval * 10, that, _atkCallback);
            }
            //暂停攻击能力
            if (that.atkSpeedValue > 0) {
                that._isAtkEnabled = false;
                var buff = 1 / (1 + BuffController.getInstance().getBuffValueById(BuffSheet.ATTACK_SPEED_INCREASE));
                that.timerOnce(that.atkSpeedValue * 1000 * (that._atkAccelerate * buff), that, function () {
                    //恢复攻击能力
                    that._isAtkEnabled = true;
                });
            }
        }
        //英雄
        var roleAni = that.getChildByName(MonsterSprite.roleKey);
        if (roleAni) {
            roleAni.interval = aniInterval;
            roleAni.play(0, isLoop, animName);
        }
    };
    //设置车状态(0未停车/1在车位/2在跑道/3拖动)
    MonsterSprite.prototype.setStage = function (_stage) {
        var that = this;
        if (that.isLock())
            return;
        var refreshIcon = that.getChildByName('refreshIcon');
        if (refreshIcon) {
            refreshIcon.visible = false;
            refreshIcon.alpha = 1;
            refreshIcon.zOrder = 10;
        }
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
                txtLevel.changeText('' + CommonFun.getLevel(that.monsterId));
            }
            var imgType = imgLevel.getChildByName('imgType');
            if (imgType) {
                var monsterType = CommonFun.getType(that.monsterId);
                if (monsterType == 1 || monsterType == 10) {
                    imgType.skin = "images/lv_electric.png";
                }
                else if (monsterType == 2 || monsterType == 20) {
                    imgType.skin = "images/lv_drug.png";
                }
                else if (monsterType == 3 || monsterType == 30) {
                    imgType.skin = "images/lv_water.png";
                }
                imgType.visible = monsterType > 0;
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
            if (refreshIcon) {
                refreshIcon.visible = true;
                refreshIcon.alpha = 0.6;
            }
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
        return CommonFun.getLevel(that.monsterId) >= getMonsterMaxLevel();
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
            imgLock.visible = _lock;
            var unlockImg = that.getChildByName('unlockImg');
            if (unlockImg)
                unlockImg.visible = _lock;
            if (imgLock.visible) {
                if (index < 15) {
                    unlockImg.skin = "images/game_level_20.png";
                }
                else {
                    unlockImg.skin = "images/game_level_30.png";
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
        parkcarLeftSp.pos(0, 0);
        Laya.Tween.to(parkcarLeftSp, { x: -offsetX }, 300, Laya.Ease.elasticOut, Laya.Handler.create(that, function () {
            Laya.Tween.to(parkcarLeftSp, { x: 0 }, 100, Laya.Ease.linearIn, Laya.Handler.create(that, function () {
                effectNode.removeChildren();
                CommonFun.playCoinEffect(effectNode, 'images/star2.png', { x: 0, y: 0 }, function () {
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
        parkcarCopy.pos(0, 0);
        Laya.Tween.to(parkcarCopy, { x: offsetX * 2 }, 300, Laya.Ease.elasticOut, Laya.Handler.create(that, function () {
            Laya.Tween.to(parkcarCopy, { x: 0 }, 100, Laya.Ease.linearIn, Laya.Handler.create(that, function () {
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
        parkcarSp.loadImage("images/box_001.png");
        parkcarSp.pivot(parkcarSp.width / 2, parkcarSp.height / 2);
        CommonFun.playBoxDropEffect(effectNode, function () {
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
            CommonFun.playBoxShakeEffect(effectNode, function () {
                effectNode.removeChildren();
                CommonFun.playCoinEffect(effectNode, 'images/star2.png', { x: 0, y: 0 }, function () {
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
        var carInfo = getMonsterConfig(this.monsterId);
        if (carInfo) {
            return carInfo.buyPrice;
        }
        return 0;
    };
    MonsterSprite.prototype.getSellPrice = function () {
        return this.getBuyPrice() * 0.8;
    };
    MonsterSprite.prototype.getIncomePerSecond = function () {
        var carInfo = getMonsterConfig(this.monsterId);
        if (carInfo) {
            return carInfo.PerSecCoin;
        }
        return 0;
    };
    //经验值
    MonsterSprite.prototype.getExp = function () {
        var carInfo = getMonsterConfig(this.monsterId);
        if (carInfo) {
            return carInfo.SyntheticExp;
        }
        return 0;
    };
    //是否相同等级
    MonsterSprite.prototype.isSameLevel = function (_carId) {
        var that = this;
        var mLevel = CommonFun.getLevel(that.monsterId);
        if (mLevel > 0) {
            return mLevel == CommonFun.getLevel(_carId);
        }
        return false;
    };
    //显示血量(_hurtBlood:伤害血量, _maxBlood:总血量)
    MonsterSprite.prototype.showBlood = function (_hurtBlood, _maxBlood, _isDoubleHurt) {
        if (_maxBlood === void 0) { _maxBlood = 0; }
        if (_isDoubleHurt === void 0) { _isDoubleHurt = false; }
        var that = this;
        var hurtBlood = _hurtBlood;
        if (_isDoubleHurt) {
            hurtBlood *= 2;
        }
        if (_maxBlood > 0) {
            that.maxBlood = _maxBlood;
            that.curBlood = that.maxBlood;
        }
        else {
            that.curBlood -= hurtBlood;
            if (that.curBlood < 0) {
                that.curBlood = 0;
            }
        }
        that.resetLeftBlood();
        var bloodBarKey = "bloodBar";
        var bloodBar = that.getChildByName(bloodBarKey);
        if (bloodBar == null) {
            bloodBar = new Laya.ProgressBar("images/game_blood.png");
            bloodBar.name = bloodBarKey;
            that.addChild(bloodBar);
            bloodBar.pos(-76 / 2, -200 / 2);
            bloodBar.width *= 0.8;
        }
        bloodBar.value = that.curBlood / that.maxBlood;
        bloodBar.visible = that.curBlood < that.maxBlood;
        var isDeath = that.curBlood <= 0;
        if (that._isDeath == false && isDeath) {
            //死亡状态切换
            that._isDeath = isDeath;
            that.stopMoveAction();
            that.clearBornDelayFun();
            that.showCar(false);
            DisplayUtils.removeFromArray(that, HallManager.Instance.hallData.monsterArray);
            that.dropMoneyFun && that.dropMoneyFun(that.money);
        }
        //飘数字
        if (hurtBlood > 0) {
            CommonFun.playBloodTextEffect(that._parentNode, "-" + CommonFun.bytesToSize(hurtBlood, true), new Laya.Point(that.x, that.y - 60), _isDoubleHurt);
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
            effectSp = Laya.Pool.getItemByClass("layaImage", Laya.Image); //new Laya.Image("images/effect_drug002.png");
            effectSp.skin = "images/effect_drug002.png";
            effectSp.name = effectKey;
            that.addChild(effectSp);
            effectSp.pos(-75 / 2, -170 / 2);
            //特效
            var actionSp = effectSp;
            if (actionSp) {
                var timeLine_1 = Laya.Pool.getItemByClass("timeLine", Laya.TimeLine);
                timeLine_1.addLabel("tl1", 0).to(actionSp, { alpha: 0.8 }, 100, Laya.Ease.linearNone)
                    .addLabel("tl2", 100).to(actionSp, { alpha: 1 }, 200, Laya.Ease.linearNone);
                timeLine_1.once(Laya.Event.COMPLETE, actionSp, function () {
                    timeLine_1.destroy();
                    timeLine_1 = null;
                });
                timeLine_1.play(0, true);
            }
        }
        effectSp.timerOnce(1000, that, function (_hurtTimes2) {
            that.showBlood(_hurtValue);
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
            timeLine.addLabel("tl1", 0).to(actionSp, { scaleX: 0.9 }, 100, Laya.Ease.linearNone)
                .addLabel("tl2", 100).to(actionSp, { scaleX: 1 }, 200, Laya.Ease.linearNone);
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
        that._isMoveAction = true;
        var spPos = { x: that.x, y: that.y };
        var targetPosArray = [
            { x: spPos.x + 140, y: spPos.y },
            { x: spPos.x + 140, y: spPos.y + 470 },
            { x: spPos.x + 700, y: spPos.y + 470 },
            { x: spPos.x + 700, y: spPos.y - 230 },
            { x: spPos.x + 300, y: spPos.y - 230 },
            { x: spPos.x + 270, y: spPos.y - 400 }
        ];
        //移动速度
        var moveSpeed = that._moveBaseSpeed * 0.04;
        var targetIndex = 0;
        var zOrderTime = 60; //层刷新时间
        var moveTime = zOrderTime - 1; //移动时间
        that._moveLoopFun = function () {
            if (targetIndex >= targetPosArray.length)
                return;
            var targetPos = targetPosArray[targetIndex];
            var curPos = new Laya.Point(that.x, that.y);
            var disX = targetPos.x - curPos.x;
            var disY = targetPos.y - curPos.y;
            var distance = curPos.distance(targetPos.x, targetPos.y);
            var ratio = moveSpeed / distance * that._moveSpeedRatio * that._moveAccelerate;
            if (distance < (ratio + 1)) {
                targetIndex++;
                return;
            }
            switch (targetIndex) {
                case 0:
                case 1:
                case 2:
                    if (parseInt(that._monsterInfo.monsterdir) == 0) {
                        that.scaleX = -1;
                        that.changeBloodBarDir();
                    }
                    else {
                        that.scaleX = 1;
                    }
                    break;
                default:
                    //0表示是小怪，大于0就是BOSS
                    if (parseInt(that._monsterInfo.monsterdir) == 0) {
                        that.scaleX = 1;
                    }
                    else {
                        that.scaleX = -1;
                        that.changeBloodBarDir();
                    }
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
            if (targetIndex >= targetPosArray.length) {
                return new Laya.Point(that.x, that.y);
            }
            var targetPos = targetPosArray[targetIndex];
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
        that._isMoveAction = false;
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
        // that._moveAccelerate = 1.0/_value;
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
        return { x: tPoint_x, y: tPoint_y };
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
//# sourceMappingURL=Monster.js.map