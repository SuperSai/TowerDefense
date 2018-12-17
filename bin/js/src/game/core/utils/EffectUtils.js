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
* 特效工具类;
*/
var EffectUtils = /** @class */ (function (_super) {
    __extends(EffectUtils, _super);
    function EffectUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** 显示训练时间到了的特效 */
    EffectUtils.showTrainingTimeEffect = function (parentNode) {
        var self = this;
        var img = new Laya.Image("images/gameLastTimeTip.png");
        M.layer.screenEffectLayer.addChild(img);
        img.pos(0 - img.width, (LayerManager.stageDesignHeight - 260) / 2);
        Laya.Tween.to(img, { x: (LayerManager.stageDesignWidth - 260) / 2 }, 250, null, Laya.Handler.create(self, function () {
            Laya.Tween.clearTween(img);
            Laya.Tween.to(img, { x: LayerManager.stageDesignWidth + 260 }, 250, null, Laya.Handler.create(self, function () {
                Laya.Tween.clearTween(img);
                img.removeSelf();
                img = null;
            }, null, true), 850);
        }, null, true));
    };
    /** 对象360°旋转 */
    EffectUtils.objectRotate = function (parentNode) {
        var rotation = 0;
        if (parentNode.rotation >= 0) {
            rotation = parentNode.rotation + 360;
        }
        return Laya.Tween.to(parentNode, {
            rotation: rotation,
            complete: Handler.create(this, this.objectRotate, [parentNode]),
        }, 1800);
    };
    /** 界面缩放再展开 */
    EffectUtils.viewScaleShow = function (obj) {
        obj.anchorX = 0.5;
        obj.anchorY = 0.5;
        obj.x = obj.x + obj.width / 2;
        obj.y = obj.y + obj.height / 2;
        Laya.Tween.from(obj, { scaleX: 0.8, scaleY: 0.8 }, 300, Laya.Ease.sineIn, Laya.Handler.create(this, function () {
            Laya.Tween.clearTween(obj);
        }, null, true));
    };
    EffectUtils.playCoinEffect = function (_parentNode, _imgUrl, _offset, _callback) {
        var _this = this;
        if (_offset === void 0) { _offset = { x: 0, y: 0 }; }
        if (_callback === void 0) { _callback = null; }
        //飘金币
        for (var index = 0; index < 15; index++) {
            var coinSp = Laya.Pool.getItemByClass("p_coin", Laya.Image);
            coinSp.graphics.clear();
            coinSp.loadImage(_imgUrl);
            coinSp.scale(1, 1);
            coinSp.alpha = 1;
            coinSp.pivot(coinSp.width / 2, coinSp.height / 2);
            _parentNode.addChild(coinSp);
            var randX = Math.random() - 0.5;
            var randY = Math.random() - 0.5;
            var cicleX = 10 * Math.cos(index * Math.PI / 7) + 10 * randX;
            var cicleY = 10 * Math.sin(index * Math.PI / 7) + 10 * randY;
            coinSp.pos(_parentNode.width / 2 + cicleX + _offset.x, _parentNode.height / 2 + cicleY + _offset.y);
            var coinPos = { x: (coinSp.x + cicleX * 5), y: (coinSp.y + cicleY * 5) };
            Laya.Tween.to(coinSp, { x: coinPos.x, y: coinPos.y, scaleX: 0.8, scaleY: 0.8, rotation: (randX + randY) * 360 }, 500, Laya.Ease.expoOut);
            coinSp.frameOnce(5, this, function (_coinSp, _coinPos) {
                Laya.Tween.to(_coinSp, { scaleX: 0, scaleY: 0, alpha: 0.2, rotation: (randX + randY) * 360 }, 1000, Laya.Ease.linearNone, Laya.Handler.create(_this, function (_coinSp) {
                    _coinSp.removeSelf();
                    _callback && _callback();
                    Laya.Pool.recover("p_coin", _coinSp);
                    Laya.Tween.clearTween(_coinSp);
                }, [_coinSp]));
            }, [coinSp, coinPos]);
        }
    };
    /** 文本上飘特效 */
    EffectUtils.playTextEffect = function (_parentNode, _content, _pos, _fontColor) {
        if (_pos === void 0) { _pos = null; }
        if (_fontColor === void 0) { _fontColor = "#fff1ba"; }
        //飘文字
        var coinLabel = ObjectPool.pop(Laya.Label, "LabelColor");
        coinLabel.text = _content;
        coinLabel.fontSize = 30;
        coinLabel.color = _fontColor;
        coinLabel.anchorX = 0.5;
        coinLabel.anchorY = 0.5;
        _parentNode.addChild(coinLabel);
        if (_pos) {
            coinLabel.pos(_pos.x, _pos.y);
        }
        else {
            coinLabel.pos(_parentNode.width / 2, -_parentNode.height / 2);
        }
        Laya.Tween.to(coinLabel, { x: coinLabel.x, y: (coinLabel.y - 70), alpha: 0 }, 2000, Laya.Ease.cubicInOut, Laya.Handler.create(this, function (_coinLabel) {
            ObjectPool.push(_coinLabel);
            _coinLabel.removeSelf();
            Laya.Tween.clearTween(_coinLabel);
        }, [coinLabel]));
    };
    /** 血量特效 */
    EffectUtils.playBloodTextEffect = function (_parentNode, _content, _pos, _isDoubleHurt) {
        if (_pos === void 0) { _pos = null; }
        if (_isDoubleHurt === void 0) { _isDoubleHurt = false; }
        //飘文字
        if (Math.random() < 0.6)
            return;
        var bloodClip = ObjectPool.pop(Laya.FontClip, "BloodFontClip");
        bloodClip.skin = "images/blood_num.png";
        bloodClip.sheet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWSYZT";
        bloodClip.alpha = 1;
        bloodClip.value = _content;
        bloodClip.zOrder = _parentNode.zOrder + 1;
        if (_pos) {
            bloodClip.pos(_pos.x - 40, _pos.y);
        }
        else {
            bloodClip.pos(_parentNode.width / 2, -_parentNode.height / 2);
        }
        PointUtils.parentToParent(bloodClip, _parentNode, true);
        _parentNode.addChild(bloodClip);
        if (_isDoubleHurt) {
            bloodClip.skin = "images/crit_num.png";
            //缩放一下
            var timeLine_1 = new Laya.TimeLine();
            timeLine_1.addLabel("tl1", 0).from(bloodClip, { scaleX: 1.5, scaleY: 1.2 }, 200, Laya.Ease.linearNone)
                .addLabel("tl2", 200).to(bloodClip, { caleX: 1, scaleY: 1, alpha: 0 }, 500, Laya.Ease.cubicInOut);
            timeLine_1.on(Laya.Event.COMPLETE, bloodClip, function () {
                bloodClip.removeSelf();
                ObjectPool.push(bloodClip);
                timeLine_1.destroy();
                timeLine_1 = null;
            });
            timeLine_1.play(0, false);
        }
        else {
            Laya.Tween.to(bloodClip, { y: (bloodClip.y - 70), alpha: 0 }, 2000, Laya.Ease.cubicInOut, Laya.Handler.create(this, function (_bloodClip) {
                _bloodClip.removeSelf();
                ObjectPool.push(_bloodClip);
                Laya.Tween.clearTween(_bloodClip);
            }, [bloodClip]));
        }
    };
    /** 图片+文本上飘的特效 */
    EffectUtils.playImageTextEffect = function (_parentNode, _imgUrl, _content, _pos, _zOrder) {
        if (_pos === void 0) { _pos = null; }
        if (_zOrder === void 0) { _zOrder = 0; }
        //图片
        var coinImg = ObjectPool.pop(Laya.Image, "Image", _imgUrl);
        coinImg.alpha = 1;
        coinImg.anchorX = 0.5;
        coinImg.anchorY = 0.5;
        _parentNode.addChild(coinImg);
        if (_pos) {
            coinImg.pos(_pos.x, _pos.y);
        }
        else {
            coinImg.pos(_parentNode.width / 2, -_parentNode.height / 2);
        }
        if (_zOrder > 0) {
            coinImg.zOrder = _zOrder;
        }
        //飘文字
        var coinLabel = ObjectPool.pop(Laya.Label, "LabelEffect");
        coinLabel.text = _content;
        coinLabel.fontSize = 30;
        coinLabel.color = "#552233";
        coinLabel.anchorY = 0.5;
        coinImg.addChild(coinLabel);
        coinLabel.pos(coinImg.width, coinImg.height * 0.5);
        //动画
        var timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).from(coinImg, { scaleX: 0, scaleY: 0, y: (coinImg.y + 30) }, 300, Laya.Ease.linearNone)
            .addLabel("tl2", 500).to(coinImg, { x: coinImg.x, y: (coinImg.y - 50), alpha: 0 }, 1200, Laya.Ease.cubicInOut);
        timeLine.on(Laya.Event.COMPLETE, coinImg, function () {
            ObjectPool.push(coinLabel);
            coinImg.removeChildren();
            coinImg.removeSelf();
            ObjectPool.push(coinImg);
            timeLine.destroy();
            timeLine = null;
        });
        timeLine.play(0, false);
    };
    /** 人物自白弹框效果 */
    EffectUtils.playDialogueEffect = function (_parentNode, _imgUrl, _content, _pos, _zOrder, _isFlipX) {
        if (_pos === void 0) { _pos = null; }
        if (_zOrder === void 0) { _zOrder = 0; }
        if (_isFlipX === void 0) { _isFlipX = false; }
        //图片
        var coinImg = ObjectPool.pop(Laya.Image, "Image", _imgUrl);
        coinImg.alpha = 1;
        coinImg.anchorX = 0;
        coinImg.anchorY = 1;
        _parentNode.addChild(coinImg);
        if (_pos) {
            coinImg.pos(_pos.x, _pos.y);
        }
        else {
            coinImg.pos(_parentNode.width / 2, -_parentNode.height / 2);
        }
        if (_zOrder > 0) {
            coinImg.zOrder = _zOrder;
        }
        //飘文字
        var coinLabel = new Laya.Label();
        coinLabel.text = _content;
        coinLabel.fontSize = 22;
        coinLabel.color = "#000000";
        coinLabel.anchorX = 0.5;
        coinLabel.anchorY = 0.5;
        coinLabel.width = 220;
        coinLabel.height = 100;
        coinLabel.wordWrap = true;
        coinLabel.valign = "middle";
        coinImg.addChild(coinLabel);
        coinLabel.pos(coinImg.width * 0.5, coinImg.height * 0.46);
        //镜像
        if (_isFlipX) {
            coinImg.scaleX = -1;
            coinLabel.scaleX = -1;
        }
        //动画
        var timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).from(coinImg, { scaleX: 0, scaleY: 0 }, 300, Laya.Ease.linearNone)
            .addLabel("tl2", 300).to(coinImg, { alpha: 1 }, 1200, Laya.Ease.linearNone)
            .addLabel("tl3", 1500).to(coinImg, { alpha: 0 }, 1000, Laya.Ease.cubicInOut);
        timeLine.on(Laya.Event.COMPLETE, coinImg, function () {
            ObjectPool.push(coinImg);
            coinImg.removeSelf();
            timeLine.destroy();
            timeLine = null;
        });
        timeLine.play(0, false);
    };
    /** 金币雨 */
    EffectUtils.playCoinRainEffect = function (_imgUrl) {
        var _this = this;
        for (var index = 0; index < 5; index++) {
            Laya.timer.frameOnce(5, this, function () {
                var coinSp = Laya.Pool.getItemByClass("p_coin_rain", Laya.Image);
                coinSp.graphics.clear();
                coinSp.loadImage(_imgUrl);
                coinSp.pivot(coinSp.width / 2, coinSp.height / 2);
                LayerManager.getInstance().screenEffectLayer.addChild(coinSp);
                coinSp.pos(Math.random() * 8 * (LayerManager.stageDesignWidth / 8) + Math.random() * 100, Math.random() * 500 - 300);
                Laya.Tween.to(coinSp, { x: coinSp.x, y: LayerManager.stageDesignHeight + 300 }, 3000, Laya.Ease.linearNone, Handler.create(_this, function (_coinSp) {
                    _coinSp.removeSelf();
                    Laya.Pool.recover("p_coin_rain", _coinSp);
                }, [coinSp]));
            });
        }
    };
    //宝箱掉落动效
    EffectUtils.playBoxDropEffect = function (_effectNode, _callback) {
        if (_callback === void 0) { _callback = null; }
        var boxAnimation = function (target, onEvtFinish) {
            var timeLine = new Laya.TimeLine();
            var nodePos = { x: _effectNode.x, y: _effectNode.y };
            timeLine.addLabel("tl1", 0).from(target, { y: nodePos.y - 1000 }, 1000, Laya.Ease.cubicIn)
                .addLabel("tl2", 1100).to(target, { y: nodePos.y - 80 }, 100, Laya.Ease.circOut)
                .addLabel("tl3", 2100).to(target, { y: nodePos.y }, 500, Laya.Ease.bounceOut);
            if (onEvtFinish != null) {
                timeLine.on(Laya.Event.COMPLETE, target, function () {
                    onEvtFinish();
                    timeLine.destroy();
                    timeLine = null;
                });
            }
            timeLine.play(0, false);
        };
        boxAnimation(_effectNode, _callback);
    };
    //宝箱缩放效果
    EffectUtils.playBoxScaleEffect = function (_effectNode, _callback) {
        if (_callback === void 0) { _callback = null; }
        var boxAnimation = function (target, onEvtFinish) {
            var timeLine = new Laya.TimeLine();
            var dtime = 80;
            timeLine.addLabel("tl1", 0).to(target, { scaleX: 1.5, scaleY: 0.9 }, dtime, Laya.Ease.backInOut)
                .addLabel("tl2", 100).to(target, { scaleX: 1.1, scaleY: 1.0 }, dtime, Laya.Ease.backInOut)
                .addLabel("tl3", 200).to(target, { scaleX: 1.3, scaleY: 0.95 }, dtime, Laya.Ease.backInOut)
                .addLabel("tl4", 300).to(target, { scaleX: 1.0, scaleY: 1.0 }, dtime, Laya.Ease.backInOut);
            if (onEvtFinish != null) {
                timeLine.on(Laya.Event.COMPLETE, target, function () {
                    onEvtFinish();
                    timeLine.destroy();
                    timeLine = null;
                });
            }
            timeLine.play(0, false);
        };
        boxAnimation(_effectNode, _callback);
    };
    //宝箱抖动效果
    EffectUtils.playBoxShakeEffect = function (_effectNode, _callback) {
        if (_callback === void 0) { _callback = null; }
        var boxAnimation = function (target, onEvtFinish) {
            var timeLine = new Laya.TimeLine();
            var nodePos = { x: _effectNode.x, y: _effectNode.y };
            var dtime = 50;
            timeLine.addLabel("tl1", 0).to(target, { x: nodePos.x + 8, y: nodePos.y + 2 }, dtime, Laya.Ease.bounceInOut)
                .addLabel("tl2", dtime).to(target, { x: nodePos.x - 8, y: nodePos.y - 1 }, dtime, Laya.Ease.bounceInOut)
                .addLabel("tl3", 2 * dtime).to(target, { x: nodePos.x + 8, y: nodePos.y + 1 }, dtime, Laya.Ease.bounceInOut)
                .addLabel("tl4", 3 * dtime).to(target, { x: nodePos.x, y: nodePos.y }, dtime, Laya.Ease.bounceInOut)
                .addLabel("tl5", 4 * dtime).to(target, { x: nodePos.x, y: nodePos.y }, dtime, Laya.Ease.bounceInOut)
                .addLabel("hide1", 5 * dtime).to(target, { alpha: 0 }, dtime)
                .addLabel("show1", 6 * dtime).to(target, { alpha: 100 }, dtime);
            if (onEvtFinish != null) {
                timeLine.on(Laya.Event.COMPLETE, target, function () {
                    onEvtFinish();
                    timeLine.destroy();
                    timeLine = null;
                });
            }
            timeLine.play(0, false);
        };
        boxAnimation(_effectNode, _callback);
    };
    /** 闪烁效果 */
    EffectUtils.playTwinkleEffect = function (_effectNode, _callback, _loop) {
        if (_callback === void 0) { _callback = null; }
        if (_loop === void 0) { _loop = false; }
        var boxAnimation = function (target, onEvtFinish) {
            var timeLine = new Laya.TimeLine();
            timeLine.addLabel("hide1", 0).to(target, { alpha: 0 }, 100)
                .addLabel("show1", 100).to(target, { alpha: 100 }, 100)
                .addLabel("hide2", 200).to(target, { alpha: 0 }, 100)
                .addLabel("show2", 300).to(target, { alpha: 100 }, 100);
            if (onEvtFinish != null) {
                timeLine.on(Laya.Event.COMPLETE, target, function () {
                    onEvtFinish();
                    timeLine.destroy();
                    timeLine = null;
                });
            }
            timeLine.play(0, _loop);
        };
        boxAnimation(_effectNode, _callback);
    };
    //加载效果
    EffectUtils.showWaitEffect = function (content, useMask) {
        EffectUtils.stopWaitEffect();
        var waitNode = new Laya.View();
        waitNode.name = EffectUtils.waitEffectName;
        //定时自动移除
        waitNode.timerOnce(12000, this, EffectUtils.stopWaitEffect);
        //车
        var waittingBgSp = new Laya.Image("loading/loading02.png");
        waittingBgSp.visible = false;
        waittingBgSp.anchorX = 0.5;
        waittingBgSp.anchorY = 0.5;
        waitNode.addChild(waittingBgSp);
        waitNode.width = Math.max(waitNode.width, waittingBgSp.displayWidth);
        waitNode.height = Math.max(waitNode.height, waittingBgSp.displayHeight);
        //圈
        var waittingSp = new Laya.Image("loading/loading01.png");
        waittingSp.anchorX = 0.5;
        waittingSp.anchorY = 0.5;
        var timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).to(waittingSp, { rotation: 360 }, 800);
        timeLine.play(0, true);
        waitNode.addChild(waittingSp);
        waitNode.width = Math.max(waitNode.width, waittingSp.displayWidth);
        waitNode.height = Math.max(waitNode.height, waittingSp.displayHeight);
        //字
        if (content) {
            var txtLabel = new Laya.Label(content);
            txtLabel.fontSize = 32;
            txtLabel.color = "#FFFFFF";
            txtLabel.width = 320;
            txtLabel.height = 80;
            txtLabel.wordWrap = true;
            txtLabel.pos(waittingSp.x - txtLabel.width * 0.5, waittingSp.y + waittingSp.height * 0.5);
            txtLabel.align = "center";
            txtLabel.valign = "middle";
            waitNode.addChild(txtLabel);
        }
        AlignUtils.setToScreenGoldenPos(waitNode, 0, true);
        M.layer.smallLoadingLayer.maskAlpha = useMask ? MaskLayer.DEFAULT_MASK_ALPHA : 0;
        M.layer.smallLoadingLayer.addChild(waitNode);
    };
    EffectUtils.stopWaitEffect = function () {
        var waittingSp = M.layer.smallLoadingLayer.getChildByName(EffectUtils.waitEffectName);
        if (waittingSp) {
            waittingSp.clearTimer(this, EffectUtils.stopWaitEffect);
            waittingSp.removeSelf();
        }
    };
    EffectUtils.waitEffectName = "waitEffect";
    return EffectUtils;
}(Laya.Sprite));
var EFFECT_TYPE;
(function (EFFECT_TYPE) {
    /** 金币 */
    EFFECT_TYPE[EFFECT_TYPE["GOLD"] = 0] = "GOLD";
    /** 钻石 */
    EFFECT_TYPE[EFFECT_TYPE["DIAMOND"] = 1] = "DIAMOND";
    /** 精华 */
    EFFECT_TYPE[EFFECT_TYPE["ESSENCE"] = 2] = "ESSENCE";
})(EFFECT_TYPE || (EFFECT_TYPE = {}));
//# sourceMappingURL=EffectUtils.js.map