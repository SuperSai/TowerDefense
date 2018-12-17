/*
 * terry 2018/10/24;
 * 怪物精灵
 */
class MonsterSprite extends Laya.Sprite {
    public monsterId: number = 0;
    public monsterStage: number = 0; //0未停车/1在车位/2在跑道/3拖动/4宝箱
    public parkIndex: number = -1; //车位编号
    private _boxEffectNode: Laya.Node = null; //宝箱掉落效果
    private _isLock: boolean = false; //是否上锁
    private _isLight: boolean = false; //是否高亮
    //模型
    static roleKey: string = "role_key";
    static standAnimKey: string = 'stand'; //站立动画key
    static atkAnimKey: string = 'attack'; //攻击动画key
    private animPreKey: string = ''; //独立动作名前缀
    private _state: number = -1; //默认0步行，1为攻击

    private _moveLoopFun: any = null; //移动函数
    private _moveSpeedRatio: number = 1; //移动速度倍率
    private _moveAccelerate: number = 1; //移动速度加速
    private _moveBaseSpeed: number = 1; //基础移动速度
    private _atkAccelerate: number = 1; //攻击加速
    private _aniStandFrameStart: number = 0; //站立

    private yun_key: string = "yun_img"; //缓存池管理
    private yun_key_acce: string = "yun_img_acce"; //加速度

    private bornDelayFun: any = null; //出生延迟函数
    private curBlood: number = 1; //当前血量
    private maxBlood: number = 1; //最大血量
    private preHurtBlood: number = 0; //预扣血量，攻击时恢复为当前血量
    private _isDeath: boolean = false; //是否死亡
    private money: number = 0; //可掉落金钱

    private atkValue: number = 1; //攻击力
    private atkSpeedValue: number = 1; //攻击速度
    private skillId: number = 0; //技能id

    private _isAtkEnabled: boolean = true; //是否有攻击能力

    private dropMoneyFun: any = null; //掉落金币回调
    public calcuteNextMovePosFun: any = null; //计算下一步移动坐标
    private _parentNode: Laya.Node;
    private _monsterInfo: MonsterVO;
    private _level: number[] = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
    private _isLoadComplete: boolean = false;
    private _targetIndex: number;

    constructor() {
        super();
    }

    //出生
    public setBornDelayFun(parentNode: Laya.Node, _delayTime: number, _callback: any): void {
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
    public clearBornDelayFun(): void {
        let that = this;
        if (that.bornDelayFun) {
            that.clearTimer(that, that.bornDelayFun);
            that.bornDelayFun = null;
        }
    }

    //设置车类型
    public setKind(id: number, $index: number = -1): void {
        let self = this;
        if (self.isLock()) return;
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
            let aniPath: string = self._monsterInfo.modelImgUrl;
            let aniFrameKey: string = self._monsterInfo.modelImgKey;
            self.animPreKey = aniPath + "/" + aniFrameKey;
            let anim: Laya.Animation = <Laya.Animation>self.getChildByName(MonsterSprite.roleKey);
            if (anim == null) {
                //创建动画实例
                anim = Laya.Pool.getItemByClass(userData.ANIMATION_POOL_NAME, Laya.Animation);
                anim.name = MonsterSprite.roleKey;
                anim.pivot(self._monsterInfo.pivotX, self._monsterInfo.pivotY);
                self.addChild(anim);
            }
            // 加载动画图集,加载成功后执行回调方法
            let aniAtlas: string = PathConfig.MonsterUrl.replace("{0}", aniPath);
            self._isLoadComplete = false;
            anim.loadAtlas(aniAtlas, Handler.create(self, () => {
                //创建动画模板dizziness
                self._aniStandFrameStart = self._monsterInfo.modelImgWait - (self._monsterInfo.modelImgWait - self._monsterInfo.modelImgAtk);
                if (self._monsterInfo.type == MONSTER_TYPE.MONSTER || self._monsterInfo.type == MONSTER_TYPE.BOSS) {
                    self._aniStandFrameStart = 0;
                }
                Laya.Animation.createFrames(AnimationUtils.heroAniUrls(aniFrameKey, self._aniStandFrameStart, self._monsterInfo.modelImgWait, aniPath + '/', true), (self.animPreKey + MonsterSprite.standAnimKey))
                Laya.Animation.createFrames(AnimationUtils.heroAniUrls(aniFrameKey, 0, self._monsterInfo.modelImgAtk, aniPath + '/'), (self.animPreKey + MonsterSprite.atkAnimKey))
                //设置坐标
                if (anim.frames) {
                    let aniGraphics = anim.frames[1] as Laya.Graphics;
                    if (aniGraphics) {
                        let aniBounds = aniGraphics.getBounds() as Laya.Rectangle;
                        if (self._monsterInfo.type == MONSTER_TYPE.HERO || self._monsterInfo.type == MONSTER_TYPE.SUPER_HERO) { //英雄
                            anim.scaleX = -1;
                            let heroPos: Laya.Sprite = self.getChildByName('heroPos') as Laya.Sprite;
                            if (heroPos) {
                                anim.pos(heroPos.x, heroPos.y);
                            }
                        } else if (self._monsterInfo.type == MONSTER_TYPE.BOSS_HERO) { //守护
                            anim.pos((self.width - aniBounds.width) / 2, (self.height - aniBounds.width) / 2 - 60);
                        } else { //敌人
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
        } else {
            self.setStage(0);
        }
    }

    //状态
    public playAnimation(state: number = 0, hero: MonsterSprite = null, monster: MonsterSprite = null, attackValue: number = 0): void {
        let self = this;
        if (self._state == state || !self._isLoadComplete) {
            return;
        }
        self._state = state;
        let animName: string = (self.animPreKey + MonsterSprite.standAnimKey);
        let isLoop: boolean = true;
        let aniInterval: number = 100 * self._atkAccelerate;
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
                const buff: number = 1 / (1 + BuffController.getInstance().getBuffValueById(BuffSheet.ATTACK_SPEED_INCREASE))
                self.timerOnce(self.atkSpeedValue * 1000 * (self._atkAccelerate * buff), self, () => {
                    //恢复攻击能力
                    self._isAtkEnabled = true;
                });
            }
        }
        //英雄
        let roleAni = <Laya.Animation>self.getChildByName(MonsterSprite.roleKey);
        if (roleAni) {
            roleAni.interval = aniInterval;
            if (animName == (self.animPreKey + MonsterSprite.standAnimKey)) {
                roleAni.play(self._aniStandFrameStart, isLoop, animName);
            } else {
                roleAni.play(0, isLoop, animName);
            }
        }
    }

    private onAttack(hero, monster, attackValue): void {
        BattleManager.Instance.doPetAttack(hero, monster, attackValue);
        Laya.SoundManager.playSound("musics/atk.mp3");
    }

    //设置车状态(0未停车/1在车位/2在跑道/3拖动)
    public setStage(_stage: number): void {
        let that = this;
        if (that.isLock()) return;
        let imgCar = that.getChildByName('imgCar') as Laya.Image;
        if (imgCar) {
            imgCar.alpha = 1;
        }
        //carId
        let imgLevel = that.getChildByName('imgLevel') as Laya.Image;
        if (imgLevel) {
            imgLevel.visible = true;
            imgLevel.zOrder = 10;
            let txtLevel = imgLevel.getChildByName('txtLevel') as Laya.Label;
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
        } else if (_stage == 2) {
            let imgCar = that.getChildByName('imgCar') as Laya.Image;
            if (imgCar) {
                imgCar.alpha = 0.6;
            }
        } else if (_stage == 3) {
            let imgCar = that.getChildByName('imgCar') as Laya.Image;
            if (imgCar) {
                imgCar.alpha = 0.4;
            }
        } else if (_stage == 4) {
            //宝箱
            that.showCar(false);
        } else {
            that.showCar(false);
        }
        that.monsterStage = _stage;
    }
    //显示或隐藏车
    private showCar(_show: boolean = true): void {
        this.visible = _show;
    }
    //已放入跑道
    public isRunning(): boolean {
        return (this.monsterStage == 2);
    }
    //可使用
    public isEnabled(): boolean {
        return (this.monsterStage == 1);
    }
    //是否空车位
    public isEmpty(): boolean {
        return (this.monsterStage < 1);
    }
    //是否顶级
    public isMaxLevel(): boolean {
        let that = this;
        return BattleManager.Instance.getLevel(that.monsterId) >= BattleManager.Instance.model.monsterMaxLevel;
    }
    //宝箱(不可交换/合并)
    public isBox(): boolean {
        return (this.monsterStage == 4);
    }

    //设置锁
    public setLock(_lock: boolean, index: number): void {
        let that = this;
        let imgLock = that.getChildByName('imgLock') as Laya.Image;
        if (imgLock) {
            let unlockImg: Laya.Label = that.getChildByName('txt_openLevel') as Laya.Label;
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
    public isLock(): boolean {
        return this._isLock;
    }

    //设置锁
    public setLight(_light: boolean): void {
        let that = this;
        let imgLight = that.getChildByName('imgLight') as Laya.Image;
        if (imgLight) {
            imgLight.visible = _light;
        }
        that._isLight = _light;
    }
    //是否上锁
    public isLight(): boolean {
        return this._isLight;
    }

    //播放两车合并效果
    public playMergeEffetc(_parentNode: any, _carId: number): void {
        var that = this;
        //基础节点
        let effectNode: Laya.Sprite = new Laya.Sprite();
        _parentNode.addChild(effectNode);
        let pos = that.localToGlobal(new Laya.Point(that.width / 2, that.height / 2));
        pos = _parentNode.globalToLocal(pos);
        effectNode.pos(pos.x, pos.y);
        that.showCar(false);

        let offsetX = 70;
        let parkcarLeftSp: MonsterSprite = ObjectPool.pop(MonsterSprite, "NewMonsterSprite");
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
                EffectUtils.playCoinEffect(effectNode, 'images/star2.png', {
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
        let parkcarCopy: MonsterSprite = ObjectPool.pop(MonsterSprite, "NewMonsterSprite");
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
    dropBoxEffect(_parentNode: any): void {
        var that = this;
        //基础节点
        let effectNode: Laya.Sprite = new Laya.Sprite();
        _parentNode.addChild(effectNode);
        let pos = that.localToGlobal(new Laya.Point(0, 0));
        pos = _parentNode.globalToLocal(pos);
        effectNode.pos(pos.x + that.width / 2, pos.y + that.height / 2 - 2);
        that.setStage(4);

        let parkcarSp: MonsterSprite = new MonsterSprite();
        effectNode.addChild(parkcarSp);
        parkcarSp.loadImage("images/drop_box.png", 0, 0, 60, 60);
        parkcarSp.pivot(parkcarSp.width / 2, parkcarSp.height / 2);
        EffectUtils.playBoxDropEffect(effectNode, () => {
            parkcarSp.frameOnce(60, that, () => {
                that.openBoxEffect();
            })
        });
        that._boxEffectNode = effectNode;
    }
    //打开宝箱
    public openBoxEffect() {
        var that = this;
        var effectNode = that._boxEffectNode;
        if (effectNode) {
            EffectUtils.playBoxShakeEffect(effectNode, () => {
                effectNode.removeChildren();
                EffectUtils.playCoinEffect(effectNode, 'images/star2.png', {
                    x: 0,
                    y: 0
                }, () => {
                    effectNode.removeChildren();
                    effectNode.removeSelf();
                });
                that.setStage(1);
            });
            that._boxEffectNode = null;
        }
    }

    //获取车配置信息
    public getBuyPrice(): number {
        let carInfo = BattleManager.Instance.getMonsterItem(this.monsterId);
        if (carInfo) {
            return carInfo.buyPrice;
        }
        return 0;
    }
    public getSellPrice(): number {
        return this.getBuyPrice() * 0.8;
    }

    public getIncomePerSecond(): number {
        // let carInfo = BattleManager.Instance.getMonsterItem(this.monsterId);
        // if (carInfo) {
        //     return carInfo.PerSecCoin;
        // }
        return 0;
    }

    //是否相同等级
    public isSameLevel(_carId: number): boolean {
        let that = this;
        let mLevel: number = BattleManager.Instance.getLevel(that.monsterId);
        if (mLevel > 0) {
            return mLevel == BattleManager.Instance.getLevel(_carId);
        }
        return false;
    }

    //显示血量(_hurtBlood:伤害血量, _maxBlood:总血量)
    public updateBlood(_hurtBlood: number, _maxBlood: number = 0, _isDoubleHurt: boolean = false): void {
        let self = this;
        let hurtBlood: number = _hurtBlood;
        if (_isDoubleHurt) {
            hurtBlood *= 2;
        }
        if (_maxBlood > 0) {
            self.maxBlood = _maxBlood;
            self.curBlood = self.maxBlood;
        } else {
            self.curBlood -= hurtBlood;
            if (self.curBlood < 0) {
                self.curBlood = 0;
            }
        }
        self.resetLeftBlood();
        let bloodBarKey: string = "bloodBar";
        let bloodBar = <Laya.ProgressBar>self.getChildByName(bloodBarKey);
        if (bloodBar == null) {
            bloodBar = new Laya.ProgressBar("images/game_blood.png");
            bloodBar.name = bloodBarKey;
            self.addChild(bloodBar);
            bloodBar.pos(-76 / 2, -200 / 2);
            bloodBar.width *= 0.8;
        }
        bloodBar.value = self.curBlood / self.maxBlood;
        bloodBar.visible = self.curBlood < self.maxBlood;

        let isDeath: boolean = self.curBlood <= 0;
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
    }
    //预扣血量,判断是否有剩余
    public isLeftBlood(_hurtBlood: number): boolean {
        let that = this;
        if (that.preHurtBlood > 0) {
            that.preHurtBlood -= _hurtBlood;
            return true;
        }
        return false;
    }
    public resetLeftBlood(): void {
        let that = this;
        that.preHurtBlood = that.curBlood;
    }

    //显示冰冻减速
    public reduceMoveSpeed(_ratio: number, _keepTime: number = 1): void {
        let that = this;
        if (that._moveSpeedRatio < 1) {
            return;
        }
        that._moveSpeedRatio = _ratio;
        let effectKey: string = "iceKey";
        let effectSp = <Laya.Image>that.getChildByName(effectKey);
        if (effectSp == null) {
            effectSp = Laya.Pool.getItemByClass("layaImage", Laya.Image);
            effectSp.skin = "images/effect_water002.png";
            effectSp.name = effectKey;
            that.addChild(effectSp);
            effectSp.pos(-110 / 2, -120 / 2);
            effectSp.zOrder = -1;
        }
        effectSp.timerOnce(_keepTime * 1000, that, () => {
            Laya.Pool.recover("layaImage", effectSp);
            effectSp.removeSelf();
            that._moveSpeedRatio = 1;
        });
    }

    //显示中毒效果
    public showDrug(_hurtValue: number, _hurtTimes: number): void {
        let that = this;
        let effectKey: string = "drugKey";
        let effectSp = <Laya.Image>that.getChildByName(effectKey);
        if (effectSp == null) {
            effectSp = Laya.Pool.getItemByClass("layaImage", Laya.Image);
            effectSp.skin = "images/effect_drug002.png";
            effectSp.name = effectKey;
            that.addChild(effectSp);
            effectSp.pos(-75 / 2, -170 / 2);
            //特效
            let actionSp = <Laya.Image>effectSp;
            if (actionSp) {
                let timeLine: Laya.TimeLine = Laya.Pool.getItemByClass("timeLine", Laya.TimeLine);
                timeLine.addLabel("tl1", 0).to(actionSp, {
                    alpha: 0.8
                }, 100, Laya.Ease.linearNone)
                    .addLabel("tl2", 100).to(actionSp, {
                        alpha: 1
                    }, 200, Laya.Ease.linearNone)
                timeLine.once(Laya.Event.COMPLETE, actionSp, () => {
                    timeLine.destroy();
                    timeLine = null;
                });
                timeLine.play(0, true);
            }
        }
        effectSp.timerOnce(1000, that, (_hurtTimes2: number) => {
            that.updateBlood(_hurtValue);
            Laya.Pool.recover("layaImage", effectSp);
            effectSp.removeSelf();
            if (_hurtTimes2 > 1) {
                that.showDrug(_hurtValue, _hurtTimes2);
            }
        }, [_hurtTimes - 1]);
    }

    //被击效果
    public playBehitEffect(): void {
        let that = this;
        //特效
        let actionSp = that as MonsterSprite;
        if (actionSp) {
            let timeLine = Laya.Pool.getItemByClass("timeLine", Laya.TimeLine);
            timeLine.addLabel("tl1", 0).to(actionSp, {
                scaleX: 0.9
            }, 100, Laya.Ease.linearNone)
                .addLabel("tl2", 100).to(actionSp, {
                    scaleX: 1
                }, 200, Laya.Ease.linearNone)
            timeLine.once(Laya.Event.COMPLETE, actionSp, () => {
                // actionSp.removeSelf();
            });
            timeLine.play(0, false);
        }
    }

    //是否活着
    public isLiving(): boolean {
        let that = this;
        return (that.monsterId > 0) && (that.isDeath() == false);
    }
    //是否死亡
    public isDeath(): boolean {
        let that = this;
        return that._isDeath;
    }
    public getBloodValue(): number {
        let that = this;
        return that.curBlood;
    }
    public getAtkValue(): number {
        let that = this;
        return that.atkValue;
    }
    public isAtkEnabled(): boolean {
        let that = this;
        return (that.monsterId > 0 && that._isAtkEnabled);
    }
    public getSkillId(): number {
        let that = this;
        return that.skillId;
    }
    //重置攻击频率
    public setAtkSpeedValue(_value: number): void {
        let that = this;
        that.atkSpeedValue = _value;
    }

    //清空状态数据
    public clearStage(): void {
        this.setKind(0);
        this.setStage(0);
        this.showCar(false);
    }

    //设置拖动
    public onStartDrag(_isUpRemove: boolean = false): void {
        this.startDrag();
        if (_isUpRemove) {
            this.on(Laya.Event.MOUSE_UP, this, (e: Event = null) => {
                this.removeSelf();
            });
        }
    }

    //移动
    public playMoveAction(): void {
        let that = this;
        let spPos = {
            x: that.x,
            y: that.y
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
        let moveSpeed: number = that._moveBaseSpeed * 0.04;
        that._targetIndex = 0;
        let zOrderTime: number = 60; //层刷新时间
        let moveTime: number = zOrderTime - 1; //移动时间
        that._moveLoopFun = () => {
            if (that._targetIndex >= targetPosArray.length) return;
            let targetPos: any = targetPosArray[that._targetIndex];
            let curPos: Laya.Point = new Laya.Point(that.x, that.y);
            let disX: number = targetPos.x - curPos.x;
            let disY: number = targetPos.y - curPos.y;
            let distance: number = curPos.distance(targetPos.x, targetPos.y);
            let ratio: number = moveSpeed / distance * that._moveSpeedRatio * that._moveAccelerate;
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
            let movePosX: number = disX * ratio;
            let movePosY: number = disY * ratio;
            that.pos(curPos.x + movePosX, curPos.y + movePosY);
            //zorder
            if (moveTime > zOrderTime) {
                moveTime = 0;
                that.zOrder = Math.floor(curPos.y);
            } else {
                moveTime++;
            }
        };
        that.timerLoop(10, that, that._moveLoopFun);
        //计算下一步移动坐标
        that.calcuteNextMovePosFun = () => {
            if (that._targetIndex >= targetPosArray.length) {
                return new Laya.Point(that.x, that.y);
            }
            let targetPos: any = targetPosArray[that._targetIndex];
            let curPos: Laya.Point = new Laya.Point(that.x, that.y);
            let disX: number = targetPos.x - curPos.x;
            let disY: number = targetPos.y - curPos.y;
            let distance: number = curPos.distance(targetPos.x, targetPos.y);
            let ratio: number = moveSpeed / distance * that._moveSpeedRatio * that._moveAccelerate;
            let movePosX: number = disX * ratio;
            let movePosY: number = disY * ratio;
            return new Laya.Point(curPos.x + movePosX, curPos.y + movePosY);
        };
    }

    /** 更改血量的方向 */
    private changeBloodBarDir(): void {
        let that = this;
        let bloodBar: Laya.ProgressBar = (<Laya.ProgressBar>that.getChildByName("bloodBar"));
        bloodBar.scaleX = -1;
        bloodBar.x = (-76 / 2) + bloodBar.width;
    }

    //停止移动
    public stopMoveAction(): void {
        let that = this;
        if (that._moveLoopFun) {
            that.clearTimer(that, that._moveLoopFun);
            that._moveLoopFun = null;
        }
        Laya.Pool.clearBySign(that.yun_key);
        Laya.Pool.clearBySign(that.yun_key_acce);
    }
    public setMoveSpeedRatio(_value: number): void {
        this._moveSpeedRatio = _value * 0.13;
    }
    public setMoveAccelerate(_value: number): void {
        let that = this;
        that._moveAccelerate = _value;
    }
    public setAtkAccelerate(_value: number): void {
        let that = this;
        that._atkAccelerate = 1.0 / _value;
    }
    public setDropMoneyFun(_fun: any): void {
        this.dropMoneyFun = _fun;
    }
    public setDropMoney(_money: number): void {
        this.money = _money;
    }

    public get monsterInfo(): MonsterVO {
        return this._monsterInfo;
    }

    public get anim(): Laya.Animation {
        return this.getChildByName(MonsterSprite.roleKey) as Laya.Animation;
    }

    public set anim(value: Laya.Animation) {
        let heroAnim = (this.getChildByName(MonsterSprite.roleKey) as Laya.Animation);
        heroAnim = value;
    }

    public get targetIndex(): number {
        return this._targetIndex;
    }
    public set targetIndex(value: number) {
        this._targetIndex = value;
    }

    //##贝塞尔曲线#################################
    // 以控制点cp计算曲线点
    public CalculateBeizer(cp: Array<any>, numOfPoints: number): Array<any> {
        var t = 1.0 / (numOfPoints - 1);
        var curve = [];
        for (var i = 0; i < numOfPoints; i++) {
            curve[i] = this.PointOnCubicBezier(cp, i * t);
        }
        return curve;
    }
    // 参数1: 4个点坐标(起点，控制点1，控制点2，终点)  
    // 参数2: 0 <= t <= 1   
    private PointOnCubicBezier(cp: Array<any>, t: number): any {
        var tPoint_x = this.MetaComputing(cp[0].x, cp[1].x, cp[2].x, cp[3].x, t);
        var tPoint_y = this.MetaComputing(cp[0].y, cp[1].y, cp[2].y, cp[3].y, t);
        return {
            x: tPoint_x,
            y: tPoint_y
        };
    }

    private MetaComputing(p0: number, p1: number, p2: number, p3: number, t: number): number {
        // 方法一:  
        var a: number, b: number, c: number;
        var tSquare: number, tCube: number;
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
    //##贝塞尔曲线#################################
}

enum MONSTER_TYPE {
    HERO = 1,
    SUPER_HERO = 2,
    MONSTER = 3,
    BOSS = 4,
    BOSS_HERO = 5,
}