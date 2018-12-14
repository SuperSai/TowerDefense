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
* 子弹
*/
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._skillId = 0; //类型
        return _this;
    }
    //设置子弹类型
    Bullet.prototype.setBulletType = function (monster) {
        var self = this;
        self._skillId = RandomUtils.rangeInt(1, 3);
        self._bulletImg = new Laya.Image();
        if (monster && monster.monsterInfo) {
            self._bulletImg.skin = PathConfig.GameResUrl.replace("{0}", monster.monsterInfo.buttleName);
        }
        else {
            self._bulletImg.skin = "images/effect_water001.png";
        }
        self.addChild(self._bulletImg);
    };
    //攻击目标
    Bullet.prototype.attackTarget = function (_targetSp, _collionCallback) {
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
                var aniData = Bullet.aniTable[that._skillId - 1];
                if (aniData && effectSp.parent) {
                    var effectAni_1 = new Laya.Animation();
                    effectSp.parent.addChild(effectAni_1);
                    effectAni_1.zOrder = effectSp.zOrder;
                    // 加载动画图集,加载成功后执行回调方法
                    var aniPath_1 = aniData.aniPath;
                    var aniKey_1 = aniData.aniKey;
                    var aniAtlas = PathConfig.EffectUrl.replace("{0}", aniPath_1);
                    var aniInterval_1 = 50;
                    var frameCount_1 = aniData.frameCount;
                    effectAni_1.loadAtlas(aniAtlas, Handler.create(that, function () {
                        //创建动画模板dizziness
                        Laya.Animation.createFrames(AnimationUtils.aniUrls(aniKey_1, frameCount_1, aniPath_1 + '/', true), aniPath_1);
                        //设置坐标
                        var aniGraphics = effectAni_1.frames[1];
                        if (aniGraphics) {
                            var aniBounds = aniGraphics.getBounds();
                            effectAni_1.pos(effectSp.x + (effectSp.width - aniBounds.width) / 2 + 20, effectSp.y + (effectSp.height - aniBounds.width) / 2 + 40);
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
                if (_collionCallback && _collionCallback(that._skillId)) {
                    effectSp.removeSelf();
                }
                else {
                    effectSp.removeSelf();
                }
                ObjectPool.push(effectSp);
                timeLine.destroy();
                timeLine = null;
            };
            timeLine.once(Laya.Event.COMPLETE, effectSp, timeLineHandler);
            timeLine.play(0, false);
        }
    };
    //连接目标（雷电专用）
    Bullet.prototype.joinTarget = function (_targetPos, _collionCallback) {
        if (_collionCallback === void 0) { _collionCallback = null; }
        var that = this;
        var effectSp = that;
        effectSp.loadImage("images/effect_electric002.png");
        effectSp.pivotX = 8;
        effectSp.pivotY = effectSp.height / 2;
        effectSp.rotation = MathUtils.calulatePointAnagle(effectSp.x, effectSp.y, _targetPos.x, _targetPos.y);
        effectSp.scaleX = _targetPos.distance(effectSp.x, effectSp.y) / 100 + 0.1;
        //动画
        var timeLine = new Laya.TimeLine();
        timeLine.addLabel("tl1", 0).to(effectSp, { scaleY: -1 }, 50, Laya.Ease.linearNone)
            .addLabel("tl2", 0).to(effectSp, { scaleY: 1 }, 50, Laya.Ease.linearNone)
            .addLabel("tl3", 0).to(effectSp, { alpha: 0 }, 100, Laya.Ease.linearNone);
        timeLine.once(Laya.Event.COMPLETE, effectSp, function () {
            effectSp.removeChildren();
            if (_collionCallback && _collionCallback(that._skillId)) {
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
    Bullet.aniTable = [
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
    return Bullet;
}(Laya.Sprite));
//# sourceMappingURL=Bullet.js.map