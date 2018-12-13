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
* terry 2018/7/16;
* 车卡通
*/
var CarSprite = /** @class */ (function (_super) {
    __extends(CarSprite, _super);
    function CarSprite() {
        var _this = _super.call(this) || this;
        _this.carId = 0;
        _this._isInDestArea = false; //在终点区域，保证只进入一次
        _this._isRemove = false; //是否被移除界面
        _this._isMoveAction = false; //是否在移动
        _this._moveDir = 0; //移动方向(默认右,1为左)
        _this._delayMove = 5; //延迟移动时间
        _this._incomeTime = 0; //收益CD
        _this._isShowDialogue = false; //显示自白
        _this._dialogueList = []; //自白
        _this._moveLoopFun = null; //移动函数
        _this._moveSpeedRatio = 1; //移动速度倍率
        _this._moveAccelerate = 1; //移动速度加速
        _this.yun_key = "yun_img"; //缓存池管理
        _this.yun_key_acce = "yun_img_acce"; //加速度
        _this.yun_texture = Laya.loader.getRes("images/yawu.png"); //云纹理
        _this._state = -1; //默认0步行，1为攻击
        _this.attackSprite = null; //攻击对象
        _this._orginalX = 0; //初始位置x
        _this._isInPosition = false; //已经就位，可攻击
        _this._heroPath = ''; //英雄模型路径
        _this._horsePath = ''; //坐骑模型路径
        _this._atkAnimKey = 'attack'; //攻击动画key
        return _this;
        // this.on(Laya.Event.REMOVED, this, ()=>{
        //     this._isRemove = true;
        // });
    }
    //设置车类型
    CarSprite.prototype.setKind = function (_kind) {
        var that = this;
        that.carId = _kind;
        var skinPath = "images/car01.png";
        var carImgInfo = getCarImgConfig(that.carId);
        if (carImgInfo) {
            // skinPath = "images/carImg/" +carImgInfo.modelImgUrl;
            //设置独白
            that._dialogueList = [];
            [carImgInfo.dialogue, carImgInfo.dialogue2, carImgInfo.dialogue3].forEach(function (element) {
                if (element && element.length > 0) {
                    that._dialogueList.push(element);
                }
            });
            that._heroPath = carImgInfo.modelImgUrl;
            if (that._heroPath && that._heroPath.length > 0) {
                that._heroPath = "images/anim/" + that._heroPath + ".sk";
            }
            that._horsePath = carImgInfo.horse;
            if (that._horsePath && that._horsePath.length > 0) {
                that._horsePath = "images/anim/" + that._horsePath + ".sk";
            }
            if (carImgInfo.atkAnimKey && carImgInfo.atkAnimKey.length > 0) {
                that._atkAnimKey = carImgInfo.atkAnimKey;
            }
            //移除老模型
            that.removeChildByName(CarSprite.heroKey);
            that.removeChildByName(CarSprite.horseKey);
            that._state = -1;
        }
        // console.log("skinPath",skinPath);
        // that.graphics.clear();
        // if (skinPath.length >0) {
        //     that.loadImage(skinPath);
        // }
        //英雄/坐骑
        that.playAnimation();
    };
    CarSprite.prototype.createSpineTemplate = function (_url, _parseComplete) {
        if (_url == null) {
            return;
        }
        var that = this;
        var spineFactory = CarSprite.spineFactory[_url];
        if (spineFactory == null) {
            // console.log("createSpineTemplate11", _url);
            spineFactory = new Laya.Templet();
            spineFactory.on(Laya.Event.COMPLETE, that, function () {
                _parseComplete && _parseComplete(spineFactory);
                CarSprite.spineFactory[_url] = spineFactory;
            });
            spineFactory.loadAni(_url);
        }
        else {
            // console.log("createSpineTemplate22", _url);
            _parseComplete && _parseComplete(spineFactory);
        }
    };
    //状态
    CarSprite.prototype.playAnimation = function (_state, _callback) {
        if (_state === void 0) { _state = 0; }
        if (_callback === void 0) { _callback = null; }
        var that = this;
        if (that._state == _state) {
            return;
        }
        that._state = _state;
        var animName = 'walk';
        var isLoop = true;
        var frameRate = 0.7;
        if (that._state == 1) {
            animName = that._atkAnimKey;
            isLoop = false;
            //自动切回步行
            that.timerOnce(180, that, function () {
                that.playAnimation(0);
            });
        }
        // console.log("state", _state, animName);
        //英雄
        var spPos = new Laya.Point(50, 140);
        var heroSp = that.getChildByName(CarSprite.heroKey);
        if (heroSp == null) {
            if (that._heroPath && that._heroPath.length > 0) {
                that.createSpineTemplate(that._heroPath, function (_spineFactory) {
                    heroSp = _spineFactory.buildArmature(0);
                    heroSp.name = CarSprite.heroKey;
                    heroSp.zOrder = 1;
                    heroSp.playbackRate(frameRate);
                    that.addChild(heroSp);
                    heroSp.pos(spPos.x, spPos.y);
                    // heroSp.scale(0.8,0.8);
                    if (that._horsePath == null || that._horsePath.length < 1) {
                        //没坐骑,坐标下调
                        heroSp.pos(spPos.x, spPos.y + 50);
                    }
                    heroSp.play(animName, isLoop);
                });
            }
        }
        else {
            heroSp.play(animName, isLoop);
        }
        //坐骑
        var horseSp = that.getChildByName(CarSprite.horseKey);
        if (horseSp == null) {
            if (that._horsePath && that._horsePath.length > 0) {
                that.createSpineTemplate(that._horsePath, function (_spineFactory) {
                    horseSp = _spineFactory.buildArmature(0);
                    horseSp.name = CarSprite.horseKey;
                    horseSp.playbackRate(frameRate);
                    that.addChild(horseSp);
                    horseSp.pos(spPos.x, spPos.y);
                    // horseSp.scale(0.8,0.8);
                    horseSp.play(animName, isLoop);
                });
            }
        }
        else {
            horseSp.play(animName, isLoop);
        }
    };
    //移动
    CarSprite.prototype.playMoveAction = function () {
        var that = this;
        // that._isMoveAction = true;
        // let moveSp:Laya.Sprite = that;
        // if (that._moveLoopFun ==null) {
        //     let moveSpeedX:number = 1;
        //     let originPosY:number = moveSp.y;
        //     let jumpH:number = 3;
        //     let jumpDir:number = 0;
        //     let jumpSpeedY:number = 0.3;
        //     that._moveLoopFun = (e:any)=>{
        //         if (that._delayMove >0) {
        //             that._delayMove --;
        //             return;
        //         }
        //         if (that._moveDir >0) {
        //             //向左
        //             moveSp.x -= moveSpeedX;
        //             if (moveSp.x <0) {
        //                 that._moveDir = 0;
        //             }
        //         } else {
        //             //向右
        //             moveSp.x += moveSpeedX;
        //             if (moveSp.x >750/2) {
        //                 that._moveDir = 1;
        //             }
        //         }
        //         if (jumpDir >0) {
        //             //向下
        //             moveSp.y -= jumpSpeedY;
        //             if (moveSp.y <originPosY) {
        //                 jumpDir = 0;
        //             }
        //         } else {
        //             //向上
        //             moveSp.y += jumpSpeedY;
        //             if (moveSp.y >(originPosY +jumpH)) {
        //                 jumpDir = 1;
        //             }
        //         }
        //     };
        //     that.timerLoop(1, that, that._moveLoopFun);
        // }
        that._orginalX = that.x;
        if (that._orginalX > Laya.stage.width / 2) {
            //后退
            var actionSp = that;
            var timeLine = new Laya.TimeLine();
            that._orginalX = Laya.stage.width / 2 - Math.random() * 100;
            timeLine.addLabel("tl1", 0).to(actionSp, { x: that._orginalX }, Math.abs(actionSp.x - that._orginalX) * 15, Laya.Ease.linearNone);
            timeLine.on(Laya.Event.COMPLETE, actionSp, function () {
                // actionSp.removeSelf();
                that._isInPosition = true;
            });
            timeLine.play(0, false);
        }
        else {
            that._isInPosition = true;
        }
    };
    //停止移动
    CarSprite.prototype.stopMoveAction = function () {
        var that = this;
        that._isMoveAction = false;
        if (that._moveLoopFun) {
            that.clearTimer(that, that._moveLoopFun);
            that._moveLoopFun = null;
        }
        Laya.Pool.clearBySign(that.yun_key);
        Laya.Pool.clearBySign(that.yun_key_acce);
    };
    CarSprite.prototype.setMoveSpeedRatio = function (_value) {
        var that = this;
        // that._moveSpeedRatio = _value *0.13;
        that._moveSpeedRatio = _value;
        // that.setIncomeTime();
    };
    CarSprite.prototype.setMoveAccelerate = function (_value) {
        this._moveAccelerate = 1.0 / _value;
    };
    //标志在终点区域
    CarSprite.prototype.setInDestArea = function (_isIn) {
        this._isInDestArea = _isIn;
    };
    CarSprite.prototype.isInDestArea = function () {
        return this._isInDestArea;
    };
    //显示产出效果
    CarSprite.prototype.isMoveStop = function () {
        var that = this;
        return (that._delayMove > 0);
    };
    CarSprite.prototype.refreshIncomeTime = function (_actCallback) {
        if (_actCallback === void 0) { _actCallback = null; }
        var that = this;
        if (that._incomeTime > 0) {
            that._incomeTime -= 1 / that._moveAccelerate;
            //人物自白
            if (that._isShowDialogue == false && (that._incomeTime > 90 && that._incomeTime < 91)) {
                var dialogueIndex = Math.floor(Math.random() * 10) % (that._dialogueList.length);
                var dialogueText = that._dialogueList[dialogueIndex];
                if (Math.random() < 0.1 && dialogueText) {
                    that._isShowDialogue = true;
                    var isFlipX = that.x > Laya.stage.width * 0.8;
                    var txtPos = new Laya.Point(that.width / 2, 50);
                    //适配大将军
                    if (isFlipX == false) {
                        txtPos.x += 50;
                        if (that._horsePath == null || that._horsePath.length < 1) {
                            txtPos.y += 60;
                        }
                    }
                    CommonFun.playDialogueEffect(that, "images/game_dialogue_frame.png", dialogueText, txtPos, 1, isFlipX);
                }
            }
        }
        else {
            that._delayMove = 50; //停止动画
            //重置收益
            that.setIncomeTime();
            that._isShowDialogue = false;
            // that.playAnimation(1);
            //后退
            var actionSp_1 = that;
            var timeLine = new Laya.TimeLine();
            timeLine.addLabel("tl1", 0).to(actionSp_1, { x: (that._orginalX + 100) }, 500, Laya.Ease.linearNone);
            timeLine.on(Laya.Event.COMPLETE, actionSp_1, function () {
                // actionSp.removeSelf();
                that.playAnimation(1);
                _actCallback && _actCallback();
                //恢复初始位置
                var timeLine = new Laya.TimeLine();
                timeLine.addLabel("tl1", 0).to(actionSp_1, { x: that._orginalX }, Math.abs(actionSp_1.x - that._orginalX) * 15, Laya.Ease.linearNone);
                timeLine.play(0, false);
            });
            timeLine.play(0, false);
            return true;
        }
        return false;
    };
    //收益倒计时
    CarSprite.prototype.setIncomeTime = function () {
        var that = this;
        that._incomeTime = 60 * this._moveSpeedRatio;
    };
    CarSprite.prototype.getIncomeTime = function () {
        var that = this;
        return that._incomeTime;
    };
    //创建攻击对象
    CarSprite.prototype.createAttackTarget = function (_parentNode, _startPos) {
        var that = this;
        if (that.attackSprite == null) {
            var carSp_1 = new CarSprite();
            carSp_1.size(100, 100);
            carSp_1.pivot(50, 50);
            carSp_1.scaleX = -1;
            var enemyHeroPath = "images/anim/bubinglv.sk"; //that._heroPath;
            var enemyHorsePath_1 = ""; // that._horsePath;
            var enemyData = CarSprite.enemyModelUrlArray[Math.floor(Math.random() * 10) % CarSprite.enemyModelUrlArray.length];
            if (enemyData) {
                enemyHeroPath = enemyData.heroUrl;
                enemyHorsePath_1 = enemyData.horseUrl;
            }
            var animName_1 = 'walk';
            var isLoop_1 = true;
            var frameRate_1 = 0.7;
            //英雄
            var spPos_1 = new Laya.Point(50, 150);
            var heroSp_1 = carSp_1.getChildByName(CarSprite.heroKey);
            if (heroSp_1 == null) {
                if (enemyHeroPath && enemyHeroPath.length > 0) {
                    that.createSpineTemplate(enemyHeroPath, function (_spineFactory) {
                        heroSp_1 = _spineFactory.buildArmature(0);
                        heroSp_1.name = CarSprite.heroKey;
                        heroSp_1.zOrder = 1;
                        heroSp_1.playbackRate(frameRate_1);
                        carSp_1.addChild(heroSp_1);
                        heroSp_1.pos(spPos_1.x, spPos_1.y);
                        // heroSp.scale(0.8,0.8);
                        if (enemyHorsePath_1 == null || enemyHorsePath_1.length < 1) {
                            //没坐骑,坐标下调
                            heroSp_1.pos(spPos_1.x, spPos_1.y + 50);
                        }
                        heroSp_1.play(animName_1, isLoop_1);
                    });
                }
            }
            else {
                heroSp_1.play(animName_1, isLoop_1);
                // heroSp.stop();
            }
            //坐骑
            var horseSp_1 = carSp_1.getChildByName(CarSprite.horseKey);
            if (horseSp_1 == null) {
                if (enemyHorsePath_1 && enemyHorsePath_1.length > 0) {
                    that.createSpineTemplate(enemyHorsePath_1, function (_spineFactory) {
                        horseSp_1 = _spineFactory.buildArmature(0);
                        horseSp_1.name = CarSprite.horseKey;
                        horseSp_1.playbackRate(frameRate_1);
                        carSp_1.addChild(horseSp_1);
                        horseSp_1.pos(spPos_1.x, spPos_1.y);
                        // horseSp.scale(0.8,0.8);
                        horseSp_1.play(animName_1, isLoop_1);
                    });
                }
            }
            else {
                horseSp_1.play(animName_1, isLoop_1);
            }
            if (_parentNode) {
                _parentNode.addChild(carSp_1);
                carSp_1.pos(_startPos.x, _startPos.y);
                // console.log("sp:", that._moveSpeedRatio);
                // carSp.pos(that._orginalX +(60*that._moveSpeedRatio*2) +300, that.y);
                var carInfo = getCarConfig(that.carId);
                if (carInfo) {
                    carSp_1.setMoveSpeedRatio(carInfo.Speed);
                }
                carSp_1.zOrder = Math.floor(carSp_1.y);
            }
            that.attackSprite = carSp_1;
        }
        return that.attackSprite;
    };
    //移除攻击对象
    CarSprite.prototype.removeAttackTarget = function (_isKill) {
        if (_isKill === void 0) { _isKill = false; }
        var that = this;
        if (that.attackSprite) {
            that.attackSprite.stopMoveAction();
            // that.attackSprite.removeSelf();
            // that.attackSprite = null;
            if (_isKill) {
                var heroSp = that.attackSprite.getChildByName(CarSprite.heroKey);
                if (heroSp) {
                    heroSp.stop();
                }
                var horseSp = that.attackSprite.getChildByName(CarSprite.horseKey);
                if (horseSp) {
                    horseSp.stop();
                }
                //渐隐
                var actionSp_2 = that.attackSprite;
                var timeLine = new Laya.TimeLine();
                timeLine.addLabel("tl11", 0).from(actionSp_2, { alpha: 1 }, 200, Laya.Ease.linearNone)
                    .addLabel("tl1", 200).from(actionSp_2, { alpha: 0 }, 100, Laya.Ease.linearNone)
                    .addLabel("tl2", 100).to(actionSp_2, { alpha: 0.8 }, 200, Laya.Ease.linearNone)
                    .addLabel("tl3", 200).to(actionSp_2, { alpha: 0 }, 100, Laya.Ease.linearNone);
                timeLine.on(Laya.Event.COMPLETE, actionSp_2, function () {
                    actionSp_2.removeSelf();
                    that.attackSprite = null;
                });
                timeLine.play(0, false);
            }
            else {
                that.attackSprite.removeSelf();
                that.attackSprite = null;
            }
        }
    };
    //攻击对象
    CarSprite.prototype.getAttackTarget = function () {
        return this.attackSprite;
    };
    CarSprite.prototype.setAttackTarget = function (_attackSp) {
        this.attackSprite = _attackSp;
    };
    //是否攻击已就位
    CarSprite.prototype.isInPosition = function () {
        return this._isInPosition;
    };
    //获取初始位置x
    CarSprite.prototype.orginalX = function () {
        return this._orginalX;
    };
    //##贝塞尔曲线#################################
    // 以控制点cp计算曲线点
    CarSprite.prototype.CalculateBeizer = function (cp, numOfPoints) {
        var t = 1.0 / (numOfPoints - 1);
        var curve = [];
        for (var i = 0; i < numOfPoints; i++) {
            curve[i] = this.PointOnCubicBezier(cp, i * t);
        }
        return curve;
    };
    // 参数1: 4个点坐标(起点，控制点1，控制点2，终点)  
    // 参数2: 0 <= t <= 1   
    CarSprite.prototype.PointOnCubicBezier = function (cp, t) {
        var tPoint_x = this.MetaComputing(cp[0].x, cp[1].x, cp[2].x, cp[3].x, t);
        var tPoint_y = this.MetaComputing(cp[0].y, cp[1].y, cp[2].y, cp[3].y, t);
        return { x: tPoint_x, y: tPoint_y };
    };
    CarSprite.prototype.MetaComputing = function (p0, p1, p2, p3, t) {
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
    CarSprite.heroKey = "hero_key";
    CarSprite.horseKey = "horse_key";
    CarSprite.spineFactory = []; //骨骼动画模板
    CarSprite.enemyModelUrlArray = [
        { heroUrl: "images/anim/enemy/bubinglv.sk", horseUrl: "" },
        { heroUrl: "images/anim/enemy/gongbinglv.sk", horseUrl: "" },
        { heroUrl: "images/anim/enemy/qibinglv.sk", horseUrl: "images/anim/shibingzuoqi.sk" },
    ]; //敌军模型
    return CarSprite;
}(Laya.Sprite));
//# sourceMappingURL=Car.js.map