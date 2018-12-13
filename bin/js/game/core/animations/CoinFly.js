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
var CoinFly = /** @class */ (function (_super) {
    __extends(CoinFly, _super);
    function CoinFly() {
        var _this = _super.call(this) || this;
        _this._animationName = "rollingCoin";
        _this._anims = [];
        return _this;
    }
    CoinFly.prototype.play = function (fromX, fromY, toX, toY) {
        if (toX === void 0) { toX = 38; }
        if (toY === void 0) { toY = 42; }
        this._animNum = 0;
        this._animLen = 7;
        this.createAnim(fromX, fromY, toX, toY);
        Laya.timer.frameLoop(1, this, this.onLoop);
        return this;
    };
    CoinFly.prototype.createAnim = function (fromX, fromY, toX, toY) {
        // Laya.SoundManager.playSound(Sound.COPPER_GAIN);
        this._animNum++;
        var anim = PoolManager.getInstance().get(Laya.Animation, this._animationName);
        // @ts-ignore
        if (!anim.url_loaded) {
            // @ts-ignore
            anim.url_loaded = true;
            anim.loadAtlas("images/effect/" + this._animationName + ".json");
            anim.interval = 25;
        }
        var scale = Math.random() * 0.15 + 0.65;
        anim
            .pivot(30, 30)
            .pos(fromX + MathTools.rangeInt(5, 10), fromY + MathTools.rangeInt(5, 10))
            .scale(scale, scale);
        anim.play(0, true);
        anim.alpha = 1;
        var iX = fromX + Math.random() * (toX - fromX);
        var iY = fromY + Math.random() * (toY - fromY);
        var points = [];
        points.push(new Point(anim.x, anim.y));
        points.push(new Point(iX, iY));
        points.push(new Point(toX, toY));
        // prettier-ignore
        var path = PathTools.CreateBezierPoints(points, MathTools.rangeInt(25, 40));
        // @ts-ignore
        anim.path = path;
        // @ts-ignore
        anim.pathLength = path.length - 1;
        // @ts-ignore
        anim.pathIndex = 0;
        this.addChild(anim);
        this._anims.push(anim);
        if (this._animNum < this._animLen) {
            // prettier-ignore
            Laya.timer.frameOnce(MathTools.rangeInt(4, 12), this, this.createAnim, [fromX, fromY, toX, toY]);
        }
    };
    CoinFly.prototype.onLoop = function () {
        var len = this._anims.length;
        for (var i = 0; i < len; i++) {
            var anim = this._anims[i];
            // @ts-ignore
            var idx = anim.pathIndex++;
            // @ts-ignore
            if (idx === anim.pathLength) {
                this._anims.splice(i, 1);
                this.onAnimComplete(anim);
                i--;
                len--;
            }
            else {
                // @ts-ignore
                var point = anim.path[idx];
                anim.pos(point.x, point.y);
            }
        }
    };
    CoinFly.prototype.onAnimComplete = function (anim) {
        // Laya.SoundManager.playSound(Sound.COPPER_GAIN);
        if (anim) {
            anim.stop();
            anim.removeSelf();
            PoolManager.getInstance().return(anim, this._animationName);
        }
        if (this.numChildren <= 0) {
            Laya.timer.clear(this, this.onLoop);
            this.destroy(true);
        }
    };
    return CoinFly;
}(Sprite));
//# sourceMappingURL=CoinFly.js.map