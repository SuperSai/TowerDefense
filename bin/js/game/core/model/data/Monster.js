/*
 * terry 2018/10/24;
 * 怪物精灵
 */
class MonsterSprite extends Laya.Sprite {
    constructor() {
        super();
        this.monsterId = 0;
        this.monsterStage = 0; //0未停车/1在车位/2在跑道/3拖动/4宝箱
        this.parkIndex = -1; //车位编号
        this._boxEffectNode = null; //宝箱掉落效果
        this._isLock = false; //是否上锁
        this._isLight = false; //是否高亮
        this.animPreKey = ''; //独立动作名前缀
        this._state = -1; //默认0步行，1为攻击
        this._moveLoopFun = null; //移动函数
        this._moveSpeedRatio = 1; //移动速度倍率
        this._moveAccelerate = 1; //移动速度加速
        this._moveBaseSpeed = 1; //基础移动速度
        this._atkAccelerate = 1; //攻击加速
        this._aniStandFrameStart = 0; //站立
        this.yun_key = "yun_img"; //缓存池管理
        this.yun_key_acce = "yun_img_acce"; //加速度
        this.bornDelayFun = null; //出生延迟函数
        this.curBlood = 1; //当前血量
        this.maxBlood = 1; //最大血量
        this.preHurtBlood = 0; //预扣血量，攻击时恢复为当前血量
        this._isDeath = false; //是否死亡
        this.money = 0; //可掉落金钱
        this.atkValue = 1; //攻击力
        this.atkSpeedValue = 1; //攻击速度
        this.skillId = 0; //技能id
        this._isAtkEnabled = true; //是否有攻击能力
        this.dropMoneyFun = null; //掉落金币回调
        this.calcuteNextMovePosFun = null; //计算下一步移动坐标
        this._level = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
        this._isLoadComplete = false;
    }
    //出生
    setBornDelayFun(parentNode, _delayTime, _callback) {
        let that = this;
        if (that.bornDelayFun == null) {
            that._parentNode = parentNode;
            that.bornDelayFun = () => {
                _callback && _callback();
                if (that.bornDelayFun) {
                    that.bornDelayFun = null;
                }
            };
            that.timerOnce(_delayTime, that, that.bornDelayFun);
        }
    }
    clearBornDelayFun() {
        let that = this;
        if (that.bornDelayFun) {
            that.clearTimer(that, that.bornDelayFun);
            that.bornDelayFun = null;
        }
    }
    //设置车类型
    setKind(id, $index = -1) {
        let self = this;
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
            let aniPath = self._monsterInfo.modelImgUrl;
            let aniFrameKey = self._monsterInfo.modelImgKey;
            self.animPreKey = aniPath + "/" + aniFrameKey;
            let anim = self.getChildByName(MonsterSprite.roleKey);
            if (anim == null) {
                //创建动画实例
                anim = Laya.Pool.getItemByClass(userData.ANIMATION_POOL_NAME, Laya.Animation);
                anim.name = MonsterSprite.roleKey;
                anim.pivot(self._monsterInfo.pivotX, self._monsterInfo.pivotY);
                self.addChild(anim);
            }
            // 加载动画图集,加载成功后执行回调方法
            let aniAtlas = PathConfig.MonsterUrl.replace("{0}", aniPath);
            self._isLoadComplete = false;
            anim.loadAtlas(aniAtlas, Handler.create(self, () => {
                //创建动画模板dizziness
                if (!self._monsterInfo)
                    return;
                self._aniStandFrameStart = self._monsterInfo.modelImgWait - (self._monsterInfo.modelImgWait - self._monsterInfo.modelImgAtk);
                if (self._monsterInfo.type == MONSTER_TYPE.MONSTER || self._monsterInfo.type == MONSTER_TYPE.BOSS) {
                    self._aniStandFrameStart = 0;
                }
                Laya.Animation.createFrames(AnimationUtils.heroAniUrls(aniFrameKey, self._aniStandFrameStart, self._monsterInfo.modelImgWait, aniPath + '/', true), (self.animPreKey + MonsterSprite.standAnimKey));
                Laya.Animation.createFrames(AnimationUtils.heroAniUrls(aniFrameKey, 0, self._monsterInfo.modelImgAtk, aniPath + '/'), (self.animPreKey + MonsterSprite.atkAnimKey));
                //设置坐标
                if (anim.frames) {
                    let aniGraphics = anim.frames[1];
                    if (aniGraphics) {
                        let aniBounds = aniGraphics.getBounds();
                        if (self._monsterInfo.type == MONSTER_TYPE.HERO || self._monsterInfo.type == MONSTER_TYPE.SUPER_HERO) { //英雄
                            anim.scaleX = -1;
                            let heroPos = self.getChildByName('heroPos');
                            if (heroPos) {
                                anim.pos(heroPos.x, heroPos.y);
                            }
                        }
                        else if (self._monsterInfo.type == MONSTER_TYPE.BOSS_HERO) { //守护
                            anim.pos((self.width - aniBounds.width) / 2, (self.height - aniBounds.width) / 2 - 60);
                        }
                        else { //敌人
                            anim.pos(0, 0);
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
    }
    //状态
    playAnimation(state = 0, hero = null, monster = null, attackValue = 0) {
        let self = this;
        if (self._state == state || !self._isLoadComplete) {
            return;
        }
        self._state = state;
        let animName = (self.animPreKey + MonsterSprite.standAnimKey);
        let isLoop = true;
        let aniInterval = 100 * self._atkAccelerate;
        if (self._state == 1) {
            animName = (self.animPreKey + MonsterSprite.atkAnimKey);
            isLoop = false;
            aniInterval = aniInterval / 4;
            //自动复位站立
            if (hero) {
                self.timerOnce(aniInterval * hero.monsterInfo.modelImgAtk, self, () => {
                    self.playAnimation(0);
                });
                //攻击回调
                self.timerOnce(aniInterval * 10, self, self.onAttack, [hero, monster, attackValue]);
            }
            //暂停攻击能力
            if (self.atkSpeedValue > 0) {
                self._isAtkEnabled = false;
                let buff = 1 / (1 + BuffController.getInstance().getBuffValueById(BuffSheet.ATTACK_SPEED_INCREASE));
                self.timerOnce(self.atkSpeedValue * 1000 * (self._atkAccelerate * buff), self, () => {
                    //恢复攻击能力
                    self._isAtkEnabled = true;
                });
            }
        }
        //英雄
        let roleAni = self.getChildByName(MonsterSprite.roleKey);
        if (roleAni) {
            roleAni.interval = aniInterval;
            roleAni.play(0, isLoop, animName);
        }
    }
    onAttack(hero, monster, attackValue) {
        BattleManager.Instance.doPetAttack(hero, monster, attackValue);
        Laya.SoundManager.playSound("musics/atk.mp3");
    }
    //设置车状态(0未停车/1在车位/2在跑道/3拖动)
    setStage(_stage) {
        let that = this;
        if (that.isLock())
            return;
        let imgCar = that.getChildByName('imgCar');
        if (imgCar) {
            imgCar.alpha = 1;
        }
        //carId
        let imgLevel = that.getChildByName('imgLevel');
        if (imgLevel) {
            imgLevel.visible = true;
            imgLevel.zOrder = 10;
            let txtLevel = imgLevel.getChildByName('txtLevel');
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
            let imgCar = that.getChildByName('imgCar');
            if (imgCar) {
                imgCar.alpha = 0.6;
            }
        }
        else if (_stage == 3) {
            let imgCar = that.getChildByName('imgCar');
            if (imgCar) {
                imgCar.alpha = 0.4;
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
    }
    //显示或隐藏车
    showCar(_show = true) {
        this.visible = _show;
    }
    //已放入跑道
    isRunning() {
        return (this.monsterStage == 2);
    }
    //可使用
    isEnabled() {
        return (this.monsterStage == 1);
    }
    //是否空车位
    isEmpty() {
        return (this.monsterStage < 1);
    }
    //是否顶级
    isMaxLevel() {
        let that = this;
        return BattleManager.Instance.getLevel(that.monsterId) >= BattleManager.Instance.model.monsterMaxLevel;
    }
    //宝箱(不可交换/合并)
    isBox() {
        return (this.monsterStage == 4);
    }
    //设置锁
    setLock(_lock, index) {
        let that = this;
        let imgLock = that.getChildByName('imgLock');
        if (imgLock) {
            let unlockImg = that.getChildByName('txt_openLevel');
            imgLock.visible = unlockImg.visible = _lock;
            if (imgLock.visible) {
                if (unlockImg && index >= 10) {
                    unlockImg.text = that._level[index - 10] + "关";
                }
            }
        }
        that._isLock = _lock;
    }
    //是否上锁
    isLock() {
        return this._isLock;
    }
    setAlpha(alphaNum) {
        if (this.isLock() || this.monsterStage == 0)
            return;
        let roleAni = this.getChildByName(MonsterSprite.roleKey);
        if (roleAni) {
            roleAni.alpha = alphaNum;
        }
    }
    //是否上锁
    isLight() {
        return this._isLight;
    }
    //播放两车合并效果
    playMergeEffetc(_parentNode, _carId) {
        var that = this;
        //基础节点
        let effectNode = new Laya.Sprite();
        _parentNode.addChild(effectNode);
        let pos = that.localToGlobal(new Laya.Point(that.width / 2, that.height / 2));
        pos = _parentNode.globalToLocal(pos);
        effectNode.pos(pos.x, pos.y);
        that.showCar(false);
        let offsetX = 70;
        let parkcarLeftSp = ObjectPool.pop(MonsterSprite, "NewMonsterSprite");
        effectNode.addChild(parkcarLeftSp);
        parkcarLeftSp.setKind(_carId);
        parkcarLeftSp.anim.pos(0, 0);
        parkcarLeftSp.pos(0, 0);
        Laya.Tween.to(parkcarLeftSp, {
            x: -offsetX
        }, 300, Laya.Ease.elasticOut, Laya.Handler.create(that, () => {
            Laya.Tween.to(parkcarLeftSp, {
                x: 0
            }, 100, Laya.Ease.linearIn, Laya.Handler.create(that, () => {
                effectNode.removeChildren();
                EffectUtils.playCoinEffect(effectNode, 'images/hall/star2.png', {
                    x: 0,
                    y: 0
                }, () => {
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
        let parkcarCopy = ObjectPool.pop(MonsterSprite, "NewMonsterSprite");
        parkcarLeftSp.addChild(parkcarCopy);
        parkcarCopy.setKind(_carId);
        parkcarCopy.anim.pos(0, 0);
        parkcarCopy.pos(0, 0);
        parkcarCopy.anim.scaleX = -1;
        Laya.Tween.to(parkcarCopy, {
            x: offsetX * 2
        }, 300, Laya.Ease.elasticOut, Laya.Handler.create(that, () => {
            Laya.Tween.to(parkcarCopy, {
                x: 0
            }, 100, Laya.Ease.linearIn, Laya.Handler.create(that, () => {
                Laya.Tween.clearTween(parkcarCopy);
                ObjectPool.push(parkcarCopy);
                parkcarCopy.removeSelf();
            }, null, true));
        }));
    }
    //掉落宝箱
    dropBoxEffect(_parentNode) {
        var that = this;
        //基础节点
        let effectNode = new Laya.Sprite();
        effectNode.visible = false;
        _parentNode.addChild(effectNode);
        let pos = that.localToGlobal(new Laya.Point(0, 0));
        pos = _parentNode.globalToLocal(pos);
        effectNode.pos(pos.x + that.width / 2, pos.y + that.height / 2 - 2);
        that.setStage(4);
        let img = new Laya.Image("images/hall/drop_box.png");
        img.pivot(30, 30);
        img.scale(0, 0);
        let starPos = PointUtils.localToGlobal(HallManager.Instance.hall.imgTrain);
        starPos = _parentNode.globalToLocal(starPos);
        let parkcarSp = new MonsterSprite();
        effectNode.addChild(parkcarSp);
        parkcarSp.loadImage("images/hall/drop_box.png", 0, 0, 60, 60);
        parkcarSp.pivot(parkcarSp.width / 2, parkcarSp.height / 2);
        EffectUtils.verticalParabola(img, _parentNode, { x: starPos.x, y: starPos.y }, { x: effectNode.x + that.width / 2, y: effectNode.y + that.height / 2 - 2 }, 120, 360, 1000, () => {
            effectNode.visible = true;
            parkcarSp.frameOnce(60, that, () => {
                that.openBoxEffect();
            });
        });
        // EffectUtils.playBoxDropEffect(effectNode, () => {
        //     parkcarSp.frameOnce(60, that, () => {
        //         that.openBoxEffect();
        //     })
        // });
        that._boxEffectNode = effectNode;
    }
    //打开宝箱
    openBoxEffect() {
        var that = this;
        var effectNode = that._boxEffectNode;
        if (effectNode) {
            EffectUtils.playBoxShakeEffect(effectNode, () => {
                effectNode.removeChildren();
                EffectUtils.playCoinEffect(effectNode, 'images/hall/star2.png', { x: 0, y: 0 }, () => {
                    effectNode.removeChildren();
                    effectNode.removeSelf();
                });
                that.setStage(1);
            });
            that._boxEffectNode = null;
        }
    }
    //获取车配置信息
    getBuyPrice() {
        let carInfo = BattleManager.Instance.getMonsterItem(this.monsterId);
        if (carInfo) {
            return carInfo.buyPrice;
        }
        return 0;
    }
    getSellPrice() {
        return this.getBuyPrice() * 0.8;
    }
    getIncomePerSecond() {
        // let carInfo = BattleManager.Instance.getMonsterItem(this.monsterId);
        // if (carInfo) {
        //     return carInfo.PerSecCoin;
        // }
        return 0;
    }
    //是否相同等级
    isSameLevel(_carId) {
        let that = this;
        let mLevel = BattleManager.Instance.getLevel(that.monsterId);
        if (mLevel > 0) {
            return mLevel == BattleManager.Instance.getLevel(_carId);
        }
        return false;
    }
    //显示血量(_hurtBlood:伤害血量, _maxBlood:总血量)
    updateBlood(_hurtBlood, _maxBlood = 0, _isDoubleHurt = false) {
        let self = this;
        let hurtBlood = _hurtBlood;
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
        let bloodBarKey = "bloodBar";
        let bloodBar = self.getChildByName(bloodBarKey);
        if (bloodBar == null) {
            bloodBar = new Laya.ProgressBar("images/hall/game_blood.png");
            bloodBar.name = bloodBarKey;
            self.addChild(bloodBar);
            bloodBar.pos(-76 / 2, -200 / 2);
            bloodBar.width *= 0.8;
        }
        bloodBar.value = self.curBlood / self.maxBlood;
        bloodBar.visible = self.curBlood < self.maxBlood;
        bloodBar.zOrder = this.zOrder + 1;
        let isDeath = self.curBlood <= 0;
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
            EffectUtils.playBloodTextEffect(self._parentNode, "-" + MathUtils.bytesToSize(hurtBlood, true), { x: self.x, y: self.y - 60 }, _isDoubleHurt);
        }
        //被击效果
        // that.playBehitEffect();
    }
    //预扣血量,判断是否有剩余
    isLeftBlood(_hurtBlood) {
        let that = this;
        if (that.preHurtBlood > 0) {
            that.preHurtBlood -= _hurtBlood;
            return true;
        }
        return false;
    }
    resetLeftBlood() {
        let that = this;
        that.preHurtBlood = that.curBlood;
    }
    //显示冰冻减速
    reduceMoveSpeed(_ratio, _keepTime = 1) {
        if (this._moveSpeedRatio < 1)
            return;
        this._moveSpeedRatio = _ratio;
        let effectKey = "iceKey";
        let effectSp = this.getChildByName(effectKey);
        if (effectSp == null) {
            effectSp = Laya.Pool.getItemByClass("layaImage", Laya.Image);
            effectSp.skin = "images/skill/effect_water002.png";
            effectSp.name = effectKey;
            this.addChild(effectSp);
            effectSp.pos(-110 / 2, -120 / 2);
            effectSp.zOrder = -1;
        }
        effectSp.timerOnce(_keepTime * 1000, this, () => {
            Laya.Pool.recover("layaImage", effectSp);
            effectSp.removeSelf();
            this._moveSpeedRatio = 1;
        });
    }
    /** 显示中毒效果 */
    showDrug(_hurtValue, _hurtTimes) {
        let effectKey = "drugKey";
        let effectSp = this.getChildByName(effectKey);
        if (effectSp == null) {
            effectSp = Laya.Pool.getItemByClass("layaImage", Laya.Image);
            effectSp.skin = "images/skill/effect_drug002.png";
            effectSp.name = effectKey;
            this.addChild(effectSp);
            effectSp.pos(-75 / 2, -170 / 2);
            //特效
            let actionSp = effectSp;
            if (actionSp) {
                Laya.Tween.to(actionSp, { alpha: 0.8 }, 100).to(actionSp, { alpha: 1 }, 200, Laya.Ease.linearNone, Handler.create(this, () => {
                    Laya.Tween.clearTween(actionSp);
                }));
            }
        }
        effectSp.timerOnce(1000, this, (_hurtTimes2) => {
            this.updateBlood(_hurtValue);
            Laya.Pool.recover("layaImage", effectSp);
            effectSp.removeSelf();
            if (_hurtTimes2 > 1) {
                this.showDrug(_hurtValue, _hurtTimes2);
            }
        }, [_hurtTimes - 1]);
    }
    //是否活着
    isLiving() {
        let that = this;
        return (that.monsterId > 0) && (that.isDeath() == false);
    }
    //是否死亡
    isDeath() {
        let that = this;
        return that._isDeath;
    }
    getBloodValue() {
        let that = this;
        return that.curBlood;
    }
    getAtkValue() {
        let that = this;
        return that.atkValue;
    }
    isAtkEnabled() {
        let that = this;
        return (that.monsterId > 0 && that._isAtkEnabled);
    }
    getSkillId() {
        let that = this;
        return that.skillId;
    }
    //重置攻击频率
    setAtkSpeedValue(_value) {
        let that = this;
        that.atkSpeedValue = _value;
    }
    //清空状态数据
    clearStage() {
        this.setKind(0);
        this.setStage(0);
        this.showCar(false);
    }
    //设置拖动
    onStartDrag(_isUpRemove = false) {
        this.startDrag();
        if (_isUpRemove) {
            this.on(Laya.Event.MOUSE_UP, this, (e = null) => {
                this.removeSelf();
            });
        }
    }
    //移动
    playMoveAction() {
        let spPos = {
            x: this.x,
            y: this.y
        };
        let targetPosArray = [{
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
        let moveSpeed = this._moveBaseSpeed * 0.04;
        this._targetIndex = 0;
        let zOrderTime = 60; //层刷新时间
        let moveTime = zOrderTime - 1; //移动时间
        this._moveLoopFun = () => {
            if (this._targetIndex >= targetPosArray.length)
                return;
            let targetPos = targetPosArray[this._targetIndex];
            let curPos = new Laya.Point(this.x, this.y);
            let disX = targetPos.x - curPos.x;
            let disY = targetPos.y - curPos.y;
            let distance = curPos.distance(targetPos.x, targetPos.y);
            let ratio = moveSpeed / distance * this._moveSpeedRatio * this._moveAccelerate;
            if (distance < (ratio + 1)) {
                this._targetIndex++;
                return;
            }
            switch (this._targetIndex) {
                case 0:
                case 1:
                case 2:
                    this.scaleX = -1;
                    this.changeBloodBarDir();
                    break;
                default:
                    this.scaleX = 1;
                    break;
            }
            let movePosX = disX * ratio;
            let movePosY = disY * ratio;
            this.pos(curPos.x + movePosX, curPos.y + movePosY);
            if (moveTime > zOrderTime) {
                moveTime = 0;
                this.zOrder = Math.floor(curPos.y);
            }
            else {
                moveTime++;
            }
        };
        this.timerLoop(10, this, this._moveLoopFun);
        //计算下一步移动坐标
        this.calcuteNextMovePosFun = () => {
            if (this._targetIndex >= targetPosArray.length) {
                return { x: this.x, y: this.y };
            }
            let targetPos = targetPosArray[this._targetIndex];
            let curPos = new Laya.Point(this.x, this.y);
            let disX = targetPos.x - curPos.x;
            let disY = targetPos.y - curPos.y;
            let distance = curPos.distance(targetPos.x, targetPos.y);
            let ratio = moveSpeed / distance * this._moveSpeedRatio * this._moveAccelerate;
            let movePosX = disX * ratio;
            let movePosY = disY * ratio;
            return { x: curPos.x + movePosX, y: curPos.y + movePosY };
        };
    }
    /** 更改血量的方向 */
    changeBloodBarDir() {
        let that = this;
        let bloodBar = that.getChildByName("bloodBar");
        bloodBar.scaleX = -1;
        bloodBar.x = (-76 / 2) + bloodBar.width;
    }
    //停止移动
    stopMoveAction() {
        let that = this;
        if (that._moveLoopFun) {
            that.clearTimer(that, that._moveLoopFun);
            that._moveLoopFun = null;
        }
        Laya.Pool.clearBySign(that.yun_key);
        Laya.Pool.clearBySign(that.yun_key_acce);
    }
    setMoveSpeedRatio(_value) {
        this._moveSpeedRatio = _value * 0.13;
    }
    setMoveAccelerate(_value) {
        let that = this;
        that._moveAccelerate = _value;
    }
    setAtkAccelerate(_value) {
        let that = this;
        that._atkAccelerate = 1.0 / _value;
    }
    setDropMoneyFun(_fun) {
        this.dropMoneyFun = _fun;
    }
    setDropMoney(_money) {
        this.money = _money;
    }
    get monsterInfo() {
        return this._monsterInfo;
    }
    get anim() {
        return this.getChildByName(MonsterSprite.roleKey);
    }
    set anim(value) {
        let heroAnim = this.getChildByName(MonsterSprite.roleKey);
        heroAnim = value;
    }
    get targetIndex() {
        return this._targetIndex;
    }
    set targetIndex(value) {
        this._targetIndex = value;
    }
    //##贝塞尔曲线#################################
    // 以控制点cp计算曲线点
    CalculateBeizer(cp, numOfPoints) {
        var t = 1.0 / (numOfPoints - 1);
        var curve = [];
        for (var i = 0; i < numOfPoints; i++) {
            curve[i] = this.PointOnCubicBezier(cp, i * t);
        }
        return curve;
    }
    // 参数1: 4个点坐标(起点，控制点1，控制点2，终点)  
    // 参数2: 0 <= t <= 1   
    PointOnCubicBezier(cp, t) {
        var tPoint_x = this.MetaComputing(cp[0].x, cp[1].x, cp[2].x, cp[3].x, t);
        var tPoint_y = this.MetaComputing(cp[0].y, cp[1].y, cp[2].y, cp[3].y, t);
        return {
            x: tPoint_x,
            y: tPoint_y
        };
    }
    MetaComputing(p0, p1, p2, p3, t) {
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
    }
}
//模型
MonsterSprite.roleKey = "role_key";
MonsterSprite.standAnimKey = 'stand'; //站立动画key
MonsterSprite.atkAnimKey = 'attack'; //攻击动画key
var MONSTER_TYPE;
(function (MONSTER_TYPE) {
    MONSTER_TYPE[MONSTER_TYPE["HERO"] = 1] = "HERO";
    MONSTER_TYPE[MONSTER_TYPE["SUPER_HERO"] = 2] = "SUPER_HERO";
    MONSTER_TYPE[MONSTER_TYPE["MONSTER"] = 3] = "MONSTER";
    MONSTER_TYPE[MONSTER_TYPE["BOSS"] = 4] = "BOSS";
    MONSTER_TYPE[MONSTER_TYPE["BOSS_HERO"] = 5] = "BOSS_HERO";
})(MONSTER_TYPE || (MONSTER_TYPE = {}));
//# sourceMappingURL=Monster.js.map