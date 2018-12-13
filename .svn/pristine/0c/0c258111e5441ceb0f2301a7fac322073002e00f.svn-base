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
* terry 2018/10/29;
* 特效精灵
*/
var EffectSprite = /** @class */ (function (_super) {
    __extends(EffectSprite, _super);
    function EffectSprite() {
        var _this = _super.call(this) || this;
        _this.kind = 0; //类型
        return _this;
    }
    //设置车类型
    EffectSprite.prototype.setKind = function (_kind) {
        var that = this;
        that.kind = _kind;
        if (that.kind == 1) {
            //水
            that.loadImage("images/effect_water001.png");
        }
        else if (that.kind == 2) {
            //电
            that.loadImage("images/effect_electric001.png");
        }
        else if (that.kind == 3) {
            //毒
            that.loadImage("images/effect_drug001.png");
        }
        else if (that.kind == 4) {
            //森林之王
            that.loadImage("images/effect_king001.png");
        }
        else {
            //水
            that.loadImage("images/effect_water001.png");
        }
    };
    //攻击目标
    EffectSprite.prototype.attackTarget = function (_targetSp, _collionCallback) {
        if (_collionCallback === void 0) { _collionCallback = null; }
        var that = this;
        var effectSp = that;
        var targetPos = null;
        if (_targetSp.calcuteNextMovePosFun) {
            targetPos = _targetSp.calcuteNextMovePosFun();
        }
        else {
            targetPos = new Laya.Point(_targetSp.x, _targetSp.y);
        }
        //动画
        var timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).to(effectSp, { x: targetPos.x - 30, y: targetPos.y - 80 }, 300, Laya.Ease.linearNone);
        if (!timeLine.hasListener(Laya.Event.COMPLETE)) {
            var timeLineHandler = function () {
                //创建动画实例
                var aniData = EffectSprite.aniTable[that.kind - 1];
                if (aniData && effectSp.parent) {
                    var effectAni_1 = new Laya.Animation();
                    effectSp.parent.addChild(effectAni_1);
                    effectAni_1.zOrder = effectSp.zOrder;
                    // 加载动画图集,加载成功后执行回调方法
                    var aniPath_1 = aniData.aniPath;
                    var aniKey_1 = aniData.aniKey;
                    var aniAtlas = "images/effect/" + aniPath_1 + ".atlas";
                    var aniInterval_1 = 50;
                    var frameCount_1 = aniData.frameCount;
                    effectAni_1.loadAtlas(aniAtlas, Handler.create(that, function () {
                        //创建动画模板dizziness
                        Laya.Animation.createFrames(CommonFun.aniUrls(aniKey_1, frameCount_1, aniPath_1 + '/', true), aniPath_1);
                        //设置坐标
                        var aniGraphics = effectAni_1.frames[1];
                        if (aniGraphics) {
                            var aniBounds = aniGraphics.getBounds();
                            effectAni_1.pos(effectSp.x + (effectSp.width - aniBounds.width) / 2, effectSp.y + (effectSp.height - aniBounds.width) / 2);
                        }
                        effectAni_1.interval = aniInterval_1;
                        effectAni_1.play(0, false, aniPath_1);
                    }));
                    effectAni_1.timerOnce(aniInterval_1 * frameCount_1, that, function () {
                        effectAni_1.removeSelf();
                    });
                }
                ;
                effectSp.removeChildren();
                ObjectPool.push(effectSp);
                if (_collionCallback && _collionCallback(that.kind)) {
                    effectSp.removeSelf();
                }
                else {
                    effectSp.removeSelf();
                }
                timeLine.destroy();
                timeLine = null;
            };
            timeLine.once(Laya.Event.COMPLETE, effectSp, timeLineHandler);
            timeLine.play(0, false);
        }
    };
    //连接目标（雷电专用）
    EffectSprite.prototype.joinTarget = function (_targetPos, _collionCallback) {
        if (_collionCallback === void 0) { _collionCallback = null; }
        var that = this;
        var effectSp = that;
        effectSp.loadImage("images/effect_electric002.png");
        effectSp.pivotX = 8;
        effectSp.pivotY = effectSp.height / 2;
        effectSp.rotation = CommonFun.calulatePointAnagle(effectSp.x, effectSp.y, _targetPos.x, _targetPos.y);
        effectSp.scaleX = _targetPos.distance(effectSp.x, effectSp.y) / 100 + 0.1;
        //动画
        var timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).to(effectSp, { scaleY: -1 }, 50, Laya.Ease.linearNone)
            .addLabel("tl2", 0).to(effectSp, { scaleY: 1 }, 50, Laya.Ease.linearNone)
            .addLabel("tl3", 0).to(effectSp, { alpha: 0 }, 100, Laya.Ease.linearNone);
        timeLine.once(Laya.Event.COMPLETE, effectSp, function () {
            if (_collionCallback && _collionCallback(that.kind)) {
                effectSp.removeSelf();
            }
            else {
                effectSp.removeSelf();
            }
            timeLine.destroy();
            timeLine = null;
        });
        timeLine.play(0, false);
    };
    EffectSprite.aniTable = [
        {
            aniPath: "ice",
            aniKey: "s_",
            frameCount: 4
        },
        {
            aniPath: "electric",
            aniKey: "dian_",
            frameCount: 5
        },
        {
            aniPath: "drug",
            aniKey: "du_",
            frameCount: 4
        },
        {
            aniPath: "fireball",
            aniKey: "sw_jz",
            frameCount: 5
        }
    ];
    return EffectSprite;
}(Laya.Sprite));
//# sourceMappingURL=Effect.js.map