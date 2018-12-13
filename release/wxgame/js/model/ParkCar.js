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
* 车位上的车
*/
var ParkCarSprite = /** @class */ (function (_super) {
    __extends(ParkCarSprite, _super);
    function ParkCarSprite() {
        var _this = _super.call(this) || this;
        _this.carId = 0;
        _this.carStage = 0; //0未停车/1在车位/2在跑道/3拖动/4宝箱
        _this.runwayCarSprite = null;
        _this.parkIndex = -1; //车位编号
        _this.boxEffectNode = null; //宝箱掉落效果
        _this._isLock = false; //是否上锁
        _this._state = -1; //默认0步行，1为攻击
        _this._heroPath = ''; //英雄模型路径
        _this._atkAnimKey = 'attack'; //攻击动画key
        return _this;
    }
    //设置车类型
    ParkCarSprite.prototype.setKind = function (_kind, _index) {
        if (_index === void 0) { _index = -1; }
        var that = this;
        if (that.isLock()) {
            // console.log("已锁定");
            if (_kind < 1) {
                that.removeRunwayCar();
            }
            return;
        }
        var carId = that.carId;
        that.carId = _kind;
        if (_index >= 0) {
            that.parkIndex = _index; //-1默认不设置
        }
        var skinPath = "";
        var carImgInfo = getCarImgConfig(that.carId);
        if (carImgInfo) {
            skinPath = "images/carImg/" + carImgInfo.imgUrl;
        }
        // that.graphics.clear();
        // if (skinPath.length >0) {
        //     that.loadImage(skinPath);
        // }
        if (skinPath.length > 0) {
            // let imgCar = that.getChildByName('imgCar') as Laya.Image;
            // if (imgCar) {
            //     imgCar.skin = skinPath;
            // } else {
            //     imgCar = new Laya.Image(skinPath);
            //     that.addChild(imgCar);
            //     imgCar.name = 'imgCar';
            //     // imgCar.pos(that.width/2, that.height/2);
            // }
            var aniFrameKey_1 = "d9_";
            var maxFrameCount_1 = 27;
            var aniUrl_1 = "du/d9";
            var roleAni_1 = that.getChildByName('imgCar');
            if (roleAni_1 == null) {
                //创建动画实例
                roleAni_1 = new Laya.Animation();
                that.addChild(roleAni_1);
                roleAni_1.name = 'imgCar';
            }
            // 加载动画图集,加载成功后执行回调方法
            var aniAtlas = "images/anim/" + aniUrl_1 + ".atlas";
            roleAni_1.loadAtlas(aniAtlas, Handler.create(that, function () {
                //创建动画模板dizziness
                Laya.Animation.createFrames(that.aniUrls(aniFrameKey_1, 3, aniUrl_1 + '/', true), "stand");
                Laya.Animation.createFrames(that.aniUrls(aniFrameKey_1, maxFrameCount_1, aniUrl_1 + '/'), "attack");
                //循环播放动画
                roleAni_1.play(0, true, "stand");
                roleAni_1.interval = 100;
                // roleAni.play(0, false, "attack");
                // roleAni.interval = 100/3;
                var aniGraphics = roleAni_1.frames[1];
                if (aniGraphics) {
                    var aniBounds = aniGraphics.getBounds();
                    roleAni_1.pos((that.width - aniBounds.width) / 2, (that.height - aniBounds.width) / 2 - 26);
                }
            }));
        }
        if (that.carId > 0) {
            // 更新赛道上的车
            var runwayCarSp = that.getRunwayCar();
            if (runwayCarSp) {
                runwayCarSp.setKind(that.carId);
                //刷新速度
                var carInfo = getCarConfig(that.carId);
                if (carInfo) {
                    runwayCarSp.setMoveSpeedRatio(carInfo.Speed);
                }
            }
            else {
                that.setStage(1);
            }
        }
        else {
            that.setStage(0);
        }
    };
    ParkCarSprite.prototype.aniUrls = function (_aniName, _frameCount, _url, _isReverse) {
        if (_url === void 0) { _url = ''; }
        if (_isReverse === void 0) { _isReverse = false; }
        var urls = [];
        for (var i = 0; i < _frameCount; i++) {
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push(_url + _aniName + (i + 1) + ".png");
        }
        if (_isReverse) {
            urls = urls.concat([].concat(urls).reverse());
        }
        return urls;
    };
    //状态
    ParkCarSprite.prototype.playAnimation = function (_state, _callback) {
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
                    heroSp.play(animName, isLoop);
                });
            }
        }
        else {
            heroSp.play(animName, isLoop);
        }
    };
    //设置车状态(0未停车/1在车位/2在跑道/3拖动)
    ParkCarSprite.prototype.setStage = function (_stage) {
        var that = this;
        if (that.isLock()) {
            // console.log("已锁定");
            return;
        }
        // that.alpha = 1;
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
                txtLevel.changeText('' + that.carId);
            }
        }
        that.showCar(true);
        //状态处理
        if (_stage == 1) {
            if (that.carStage == 2) {
                that.removeRunwayCar();
            }
        }
        else if (_stage == 2) {
            // that.alpha = 0.6;
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
            // that.alpha = 0.4;
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
        that.carStage = _stage;
        // console.log("setStage:", this.carStage)
    };
    //显示或隐藏车
    ParkCarSprite.prototype.showCar = function (_show) {
        if (_show === void 0) { _show = true; }
        this.visible = _show;
    };
    //已放入跑道
    ParkCarSprite.prototype.isRunning = function () {
        return (this.carStage == 2);
    };
    //可使用
    ParkCarSprite.prototype.isEnabled = function () {
        return (this.carStage == 1);
    };
    //是否空车位
    ParkCarSprite.prototype.isEmpty = function () {
        return (this.carStage < 1);
    };
    //是否顶级
    ParkCarSprite.prototype.isMaxLevel = function () {
        // return this.carId >=30;
        return this.carId >= getCarMaxLevel();
    };
    //宝箱(不可交换/合并)
    ParkCarSprite.prototype.isBox = function () {
        return (this.carStage == 4);
    };
    //设置锁
    ParkCarSprite.prototype.setLock = function (_lock) {
        var that = this;
        var imgLock = that.getChildByName('imgLock');
        if (imgLock) {
            imgLock.visible = _lock;
        }
        that._isLock = _lock;
    };
    //是否上锁
    ParkCarSprite.prototype.isLock = function () {
        return this._isLock;
    };
    //播放两车合并效果
    ParkCarSprite.prototype.playMergeEffetc = function (_parentNode, _carId) {
        var that = this;
        //基础节点
        var effectNode = new Laya.Sprite();
        _parentNode.addChild(effectNode);
        var pos = that.localToGlobal(new Laya.Point(0, 0));
        pos = _parentNode.globalToLocal(pos);
        effectNode.pos(pos.x, pos.y);
        that.showCar(false);
        var offsetX = 70;
        var parkcarLeftSp = new ParkCarSprite();
        effectNode.addChild(parkcarLeftSp);
        parkcarLeftSp.setKind(_carId);
        Laya.Tween.to(parkcarLeftSp, { x: -offsetX }, 300, Laya.Ease.elasticOut, Laya.Handler.create(that, function () {
            Laya.Tween.to(parkcarLeftSp, { x: 0 }, 100, Laya.Ease.linearIn, Laya.Handler.create(that, function () {
                effectNode.removeChildren();
                CommonFun.playCoinEffect(effectNode, 'images/star2.png', { x: 52, y: 80 }, function () {
                    effectNode.removeSelf();
                });
                // effectNode.removeSelf();
                if (that.carId > 0) {
                    that.showCar(true);
                }
            }));
        }));
        //复制品
        var parkcarCopy = new ParkCarSprite();
        parkcarLeftSp.addChild(parkcarCopy);
        parkcarCopy.setKind(_carId);
        parkcarCopy.pos(0, 0);
        Laya.Tween.to(parkcarCopy, { x: offsetX * 2 }, 300, Laya.Ease.elasticOut, Laya.Handler.create(that, function () {
            Laya.Tween.to(parkcarCopy, { x: 0 }, 100, Laya.Ease.linearIn);
        }));
    };
    //掉落宝箱
    ParkCarSprite.prototype.dropBoxEffect = function (_parentNode) {
        var that = this;
        //基础节点
        var effectNode = new Laya.Sprite();
        _parentNode.addChild(effectNode);
        var pos = that.localToGlobal(new Laya.Point(0, 0));
        pos = _parentNode.globalToLocal(pos);
        effectNode.pos(pos.x + that.width / 2, pos.y + that.height / 2 - 2);
        that.setStage(4);
        var parkcarSp = new ParkCarSprite();
        effectNode.addChild(parkcarSp);
        parkcarSp.loadImage("images/box_001.png");
        parkcarSp.pivot(parkcarSp.width / 2, parkcarSp.height / 2);
        CommonFun.playBoxDropEffect(effectNode, function () {
            parkcarSp.frameOnce(60, that, function () {
                that.openBoxEffect();
            });
        });
        that.boxEffectNode = effectNode;
    };
    //打开宝箱
    ParkCarSprite.prototype.openBoxEffect = function () {
        var that = this;
        var effectNode = that.boxEffectNode;
        if (effectNode) {
            CommonFun.playBoxShakeEffect(effectNode, function () {
                effectNode.removeChildren();
                CommonFun.playCoinEffect(effectNode, 'images/star2.png', { x: 0, y: 0 }, function () {
                    effectNode.removeSelf();
                });
                that.setStage(1);
            });
            that.boxEffectNode = null;
        }
    };
    //提供跑道上的车
    ParkCarSprite.prototype.createRunwayCar = function (_parentNode, _startPos) {
        if (this.runwayCarSprite == null) {
            var carSp = new CarSprite();
            carSp.setKind(this.carId);
            // carSp.pivot(carSp.width/2, carSp.height/2);
            carSp.pivot(41, 35);
            if (_parentNode) {
                _parentNode.addChild(carSp);
                carSp.pos(_startPos.x, _startPos.y);
                var carInfo = getCarConfig(this.carId);
                if (carInfo) {
                    carSp.setMoveSpeedRatio(carInfo.Speed);
                }
                carSp.playMoveAction();
            }
            this.runwayCarSprite = carSp;
        }
        return this.runwayCarSprite;
    };
    //移除跑道上车辆
    ParkCarSprite.prototype.removeRunwayCar = function () {
        if (this.runwayCarSprite) {
            this.runwayCarSprite.removeAttackTarget();
            this.runwayCarSprite.stopMoveAction();
            this.runwayCarSprite.removeSelf();
            this.runwayCarSprite = null;
        }
    };
    //获取跑道车辆
    ParkCarSprite.prototype.getRunwayCar = function () {
        return this.runwayCarSprite;
    };
    ParkCarSprite.prototype.setRunwayCar = function (_runwayCarSp) {
        this.runwayCarSprite = _runwayCarSp;
    };
    //获取车配置信息
    ParkCarSprite.prototype.getBuyPrice = function () {
        var carInfo = getCarConfig(this.carId);
        if (carInfo) {
            return carInfo.BuyPrice;
        }
        return 0;
    };
    ParkCarSprite.prototype.getSellPrice = function () {
        return this.getBuyPrice() * 0.8;
    };
    ParkCarSprite.prototype.getIncome = function () {
        var carInfo = getCarConfig(this.carId);
        if (carInfo) {
            return carInfo.TotalCoin;
        }
        return 0;
    };
    ParkCarSprite.prototype.getIncomePerSecond = function () {
        var carInfo = getCarConfig(this.carId);
        if (carInfo) {
            return carInfo.PerSecCoin;
        }
        return 0;
    };
    //经验值
    ParkCarSprite.prototype.getExp = function () {
        var carInfo = getCarConfig(this.carId);
        if (carInfo) {
            return carInfo.SyntheticExp;
        }
        return 0;
    };
    //清空状态数据
    ParkCarSprite.prototype.clearStage = function () {
        this.setKind(0);
        this.setStage(0);
        this.showCar(false);
        this.removeRunwayCar();
    };
    //设置拖动
    ParkCarSprite.prototype.onStartDrag = function (_isUpRemove) {
        var _this = this;
        if (_isUpRemove === void 0) { _isUpRemove = false; }
        // this.mouseThrough = true;
        this.startDrag();
        if (_isUpRemove) {
            this.on(Laya.Event.MOUSE_UP, this, function (e) {
                if (e === void 0) { e = null; }
                _this.removeSelf();
            });
        }
    };
    ParkCarSprite.heroKey = "hero_key";
    ParkCarSprite.spineFactory = []; //骨骼动画模板
    return ParkCarSprite;
}(Laya.Sprite));
//# sourceMappingURL=ParkCar.js.map