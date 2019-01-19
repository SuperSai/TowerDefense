/*
* 特效工具类;
*/
class EffectUtils extends Laya.Sprite {
    /** 显示训练时间到了的特效 */
    static showTrainingTimeEffect(parentNode) {
        let self = this;
        let img = new Laya.Image("images/hall/gameLastTimeTip.png");
        M.layer.screenEffectLayer.addChild(img);
        img.pos(0 - img.width, (LayerManager.stageDesignHeight - 260) / 2);
        Laya.Tween.to(img, { x: (LayerManager.stageDesignWidth - 260) / 2 }, 250, null, Laya.Handler.create(self, () => {
            Laya.Tween.clearTween(img);
            Laya.Tween.to(img, { x: LayerManager.stageDesignWidth + 260 }, 250, null, Laya.Handler.create(self, () => {
                Laya.Tween.clearTween(img);
                img.removeSelf();
                img = null;
            }, null, true), 850);
        }, null, true));
    }
    /** 对象360°旋转 */
    static objectRotate(parentNode) {
        let rotation = 0;
        if (parentNode.rotation >= 0) {
            rotation = parentNode.rotation + 360;
        }
        return Laya.Tween.to(parentNode, {
            rotation: rotation,
            complete: Handler.create(this, this.objectRotate, [parentNode]),
        }, 1800);
    }
    /** 界面缩放再展开 */
    static viewScaleShow(obj) {
        obj.anchorX = 0.5;
        obj.anchorY = 0.5;
        obj.x = obj.x + obj.width / 2;
        obj.y = obj.y + obj.height / 2;
        Laya.Tween.from(obj, { scaleX: 0.8, scaleY: 0.8 }, 300, Laya.Ease.sineIn, Laya.Handler.create(this, () => {
            Laya.Tween.clearTween(obj);
        }, null, true));
    }
    static playCoinEffect(_parentNode, _imgUrl, _offset = { x: 0, y: 0 }, _callback = null) {
        //飘金币
        for (var index = 0; index < 15; index++) {
            let coinSp = Laya.Pool.getItemByClass("p_coin", Laya.Image);
            coinSp.mouseEnabled = false;
            coinSp.mouseThrough = false;
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
            coinSp.frameOnce(5, this, (_coinSp, _coinPos) => {
                Laya.Tween.to(_coinSp, { scaleX: 0, scaleY: 0, alpha: 0.2, rotation: (randX + randY) * 360 }, 1000, Laya.Ease.linearNone, Laya.Handler.create(this, (_coinSp) => {
                    _coinSp.removeSelf();
                    _callback && _callback();
                    Laya.Pool.recover("p_coin", _coinSp);
                    Laya.Tween.clearTween(_coinSp);
                }, [_coinSp]));
            }, [coinSp, coinPos]);
        }
    }
    /** 文本上飘特效 */
    static playTextEffect(_parentNode, _content, _pos = null, _fontColor = "#fff1ba") {
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
        Laya.Tween.to(coinLabel, { x: coinLabel.x, y: (coinLabel.y - 70), alpha: 0 }, 2000, Laya.Ease.cubicInOut, Laya.Handler.create(this, (_coinLabel) => {
            ObjectPool.push(_coinLabel);
            _coinLabel.removeSelf();
            Laya.Tween.clearTween(_coinLabel);
        }, [coinLabel]));
    }
    /** 血量特效 */
    static playBloodTextEffect(parentNode, content, pos, isDoubleHurt = false) {
        if (Math.random() < 0.5)
            return;
        let poolData = ObjectPool.popObj(Laya.FontClip, "BloodFontClip");
        let bloodClip = poolData.obj;
        if (!poolData.isPool) {
            bloodClip.mouseEnabled = bloodClip.mouseThrough = false;
            bloodClip.skin = "images/fontImg/blood_num.png";
            bloodClip.sheet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWSYZT";
            bloodClip.zOrder = parentNode.zOrder + 1;
        }
        bloodClip.alpha = 1;
        bloodClip.value = content;
        if (pos) {
            bloodClip.pos(pos.x - 40, pos.y);
        }
        else {
            bloodClip.pos(parentNode.width / 2, -parentNode.height / 2);
        }
        PointUtils.parentToParent(bloodClip, parentNode, true);
        parentNode.addChild(bloodClip);
        if (isDoubleHurt) {
            bloodClip.skin = "images/fontImg/crit_num.png";
            Laya.Tween.from(bloodClip, { scaleX: 1.2, scaleY: 1.2 }, 200).to(bloodClip, { scaleX: 1, scaleY: 1, alpha: 0 }, 500, Laya.Ease.cubicInOut, Handler.create(this, () => {
                Laya.Tween.clearTween(bloodClip);
                bloodClip.removeSelf();
                ObjectPool.push(bloodClip);
            }), 200);
        }
        else {
            Laya.Tween.to(bloodClip, { y: (bloodClip.y - 70), alpha: 0 }, 2000, Laya.Ease.cubicInOut, Laya.Handler.create(this, (_bloodClip) => {
                _bloodClip.removeSelf();
                ObjectPool.push(_bloodClip);
                Laya.Tween.clearTween(_bloodClip);
            }, [bloodClip]));
        }
    }
    /** 图片+文本上飘的特效 */
    static playImageTextEffect(_parentNode, _imgUrl, _content, _pos = null, _zOrder = 0) {
        let coinImg = ObjectPool.pop(Laya.Image, "Image", _imgUrl);
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
        let coinLabel = ObjectPool.pop(Laya.Label, "LabelEffect");
        coinLabel.text = _content;
        coinLabel.fontSize = 30;
        coinLabel.color = "#552233";
        coinLabel.anchorY = 0.5;
        coinImg.addChild(coinLabel);
        coinLabel.pos(coinImg.width, coinImg.height * 0.5);
        Laya.Tween.from(coinImg, { y: (coinImg.y + 30) }, 300)
            .to(coinImg, { x: coinImg.x, y: (coinImg.y - 50), alpha: 0 }, 1200, Laya.Ease.cubicInOut, Handler.create(this, () => {
            Laya.Tween.clearTween(coinImg);
            ObjectPool.push(coinLabel);
            coinImg.removeChildren();
            coinImg.removeSelf();
            ObjectPool.push(coinImg);
        }), 500);
    }
    /** 人物自白弹框效果 */
    static playDialogueEffect(_parentNode, _imgUrl, _content, _pos = null, _zOrder = 0, _isFlipX = false) {
        //图片
        let coinImg = ObjectPool.pop(Laya.Image, "Image", _imgUrl);
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
        let timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).from(coinImg, { scaleX: 0, scaleY: 0 }, 300, Laya.Ease.linearNone)
            .addLabel("tl2", 300).to(coinImg, { alpha: 1 }, 1200, Laya.Ease.linearNone)
            .addLabel("tl3", 1500).to(coinImg, { alpha: 0 }, 1000, Laya.Ease.cubicInOut);
        timeLine.on(Laya.Event.COMPLETE, coinImg, () => {
            ObjectPool.push(coinImg);
            coinImg.removeSelf();
            timeLine.destroy();
            timeLine = null;
        });
        timeLine.play(0, false);
    }
    /** 金币雨 */
    static playCoinRainEffect(_imgUrl) {
        for (var index = 0; index < 5; index++) {
            Laya.timer.frameOnce(5, this, () => {
                let poolData = ObjectPool.popObj(Laya.Image, "p_coin_rain");
                let coinSp = poolData.obj;
                if (!poolData.isPool) {
                    coinSp.graphics.clear();
                    coinSp.loadImage(_imgUrl);
                    coinSp.pivot(coinSp.width / 2, coinSp.height / 2);
                }
                LayerManager.getInstance().screenEffectLayer.addChild(coinSp);
                coinSp.pos(Math.random() * 8 * (LayerManager.stageDesignWidth / 8) + Math.random() * 100, Math.random() * 500 - 300);
                Laya.Tween.to(coinSp, { x: coinSp.x, y: LayerManager.stageDesignHeight + 300 }, 3000, Laya.Ease.linearNone, Handler.create(this, (_coinSp) => {
                    Laya.Tween.clearTween(_coinSp);
                    _coinSp.removeSelf();
                    ObjectPool.push(_coinSp);
                }, [coinSp]));
            });
        }
    }
    //宝箱掉落动效
    static playBoxDropEffect(_effectNode, _callback = null) {
        let boxAnimation = (target, onEvtFinish) => {
            let timeLine = new Laya.TimeLine();
            let nodePos = { x: _effectNode.x, y: _effectNode.y };
            timeLine.addLabel("tl1", 0).from(target, { y: nodePos.y - 1000 }, 1000, Laya.Ease.cubicIn)
                .addLabel("tl2", 1100).to(target, { y: nodePos.y - 80 }, 100, Laya.Ease.circOut)
                .addLabel("tl3", 2100).to(target, { y: nodePos.y }, 500, Laya.Ease.bounceOut);
            if (onEvtFinish != null) {
                timeLine.on(Laya.Event.COMPLETE, target, () => {
                    onEvtFinish();
                    timeLine.destroy();
                    timeLine = null;
                });
            }
            timeLine.play(0, false);
        };
        boxAnimation(_effectNode, _callback);
    }
    //宝箱缩放效果
    static playBoxScaleEffect(_effectNode, _callback = null) {
        let boxAnimation = (target, onEvtFinish) => {
            let timeLine = new Laya.TimeLine();
            let dtime = 80;
            timeLine.addLabel("tl1", 0).to(target, { scaleX: 1.5, scaleY: 0.9 }, dtime, Laya.Ease.backInOut)
                .addLabel("tl2", 100).to(target, { scaleX: 1.1, scaleY: 1.0 }, dtime, Laya.Ease.backInOut)
                .addLabel("tl3", 200).to(target, { scaleX: 1.3, scaleY: 0.95 }, dtime, Laya.Ease.backInOut)
                .addLabel("tl4", 300).to(target, { scaleX: 1.0, scaleY: 1.0 }, dtime, Laya.Ease.backInOut);
            if (onEvtFinish != null) {
                timeLine.on(Laya.Event.COMPLETE, target, () => {
                    onEvtFinish();
                    timeLine.destroy();
                    timeLine = null;
                });
            }
            timeLine.play(0, false);
        };
        boxAnimation(_effectNode, _callback);
    }
    //宝箱抖动效果
    static playBoxShakeEffect(_effectNode, _callback = null) {
        let boxAnimation = (target, onEvtFinish) => {
            let timeLine = new Laya.TimeLine();
            let nodePos = { x: _effectNode.x, y: _effectNode.y };
            let dtime = 50;
            timeLine.addLabel("tl1", 0).to(target, { x: nodePos.x + 8, y: nodePos.y + 2 }, dtime, Laya.Ease.bounceInOut)
                .addLabel("tl2", dtime).to(target, { x: nodePos.x - 8, y: nodePos.y - 1 }, dtime, Laya.Ease.bounceInOut)
                .addLabel("tl3", 2 * dtime).to(target, { x: nodePos.x + 8, y: nodePos.y + 1 }, dtime, Laya.Ease.bounceInOut)
                .addLabel("tl4", 3 * dtime).to(target, { x: nodePos.x, y: nodePos.y }, dtime, Laya.Ease.bounceInOut)
                .addLabel("tl5", 4 * dtime).to(target, { x: nodePos.x, y: nodePos.y }, dtime, Laya.Ease.bounceInOut)
                .addLabel("hide1", 5 * dtime).to(target, { alpha: 0 }, dtime)
                .addLabel("show1", 6 * dtime).to(target, { alpha: 100 }, dtime);
            if (onEvtFinish != null) {
                timeLine.on(Laya.Event.COMPLETE, target, () => {
                    onEvtFinish();
                    timeLine.destroy();
                    timeLine = null;
                });
            }
            timeLine.play(0, false);
        };
        boxAnimation(_effectNode, _callback);
    }
    /** 闪烁效果 */
    static playTwinkleEffect(_effectNode, _callback = null, _loop = false) {
        let boxAnimation = (target, onEvtFinish) => {
            let timeLine = new Laya.TimeLine();
            timeLine.addLabel("hide1", 0).to(target, { alpha: 0 }, 100)
                .addLabel("show1", 100).to(target, { alpha: 100 }, 100)
                .addLabel("hide2", 200).to(target, { alpha: 0 }, 100)
                .addLabel("show2", 300).to(target, { alpha: 100 }, 100);
            if (onEvtFinish != null) {
                timeLine.on(Laya.Event.COMPLETE, target, () => {
                    onEvtFinish();
                    timeLine.destroy();
                    timeLine = null;
                });
            }
            timeLine.play(0, _loop);
        };
        boxAnimation(_effectNode, _callback);
    }
    //加载效果
    static showWaitEffect(content, useMask) {
        EffectUtils.stopWaitEffect();
        let waitNode = new Laya.View();
        waitNode.name = EffectUtils.waitEffectName;
        //定时自动移除
        waitNode.timerOnce(12000, this, EffectUtils.stopWaitEffect);
        //车
        let waittingBgSp = new Laya.Image("loading/loading02.png");
        waittingBgSp.visible = false;
        waittingBgSp.anchorX = 0.5;
        waittingBgSp.anchorY = 0.5;
        waitNode.addChild(waittingBgSp);
        waitNode.width = Math.max(waitNode.width, waittingBgSp.displayWidth);
        waitNode.height = Math.max(waitNode.height, waittingBgSp.displayHeight);
        //圈
        let waittingSp = new Laya.Image("loading/loading01.png");
        waittingSp.anchorX = 0.5;
        waittingSp.anchorY = 0.5;
        let timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).to(waittingSp, { rotation: 360 }, 800);
        timeLine.play(0, true);
        waitNode.addChild(waittingSp);
        waitNode.width = Math.max(waitNode.width, waittingSp.displayWidth);
        waitNode.height = Math.max(waitNode.height, waittingSp.displayHeight);
        //字
        if (content) {
            let txtLabel = new Laya.Label(content);
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
    }
    static stopWaitEffect() {
        let waittingSp = M.layer.smallLoadingLayer.getChildByName(EffectUtils.waitEffectName);
        if (waittingSp) {
            waittingSp.clearTimer(this, EffectUtils.stopWaitEffect);
            waittingSp.removeSelf();
        }
    }
    /**
     *垂直抛物线轨迹
     * @static
     * @param {Laya.Node} obj 抛物线的对象
     * @param {*} thisObject 添加addChild的父类
     * @param {{ x: number, y: number }} startPos 起始点
     * @param {{ x: number, y: number }} endPos 终点
     * @param {number} vertex 顶点的X高度
     * @param {number} angle 角度，正数右抛物，负数左抛物
     * @param {number} time 飞行时间
     * @param {Function} callBack 结束后的回调函数
     * @memberof EffectUtils
     */
    static verticalParabola(obj, thisObject, startPos, endPos, vertex, angle, time, callBack = null) {
        let sprite = new Laya.Sprite();
        sprite.x = startPos.x;
        sprite.y = startPos.y;
        sprite.addChild(obj);
        thisObject.addChild(sprite);
        Laya.Tween.to(obj, { x: vertex }, time / 2, Laya.Ease.quadOut);
        Laya.Tween.to(obj, { x: -vertex }, time / 2, Laya.Ease.sineIn, null, time / 2);
        Laya.Tween.to(obj, { rotation: angle }, time, Laya.Ease.linearNone);
        Laya.Tween.to(obj, { scaleX: 1, scaleY: 1 }, time, Laya.Ease.linearNone);
        Laya.Tween.to(sprite, { x: endPos.x, y: endPos.y }, time, Laya.Ease.linearNone, Handler.create(this, () => {
            Laya.Tween.clearTween(obj);
            Laya.Tween.clearTween(sprite);
            DisplayUtils.removeFromParent(obj);
            DisplayUtils.removeFromParent(sprite);
            obj = null;
            sprite = null;
            callBack && callBack();
        }));
    }
}
EffectUtils.waitEffectName = "waitEffect";
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