/**
 * 震动
 */
class ShakeUtils {
    constructor() {
        this.MAP = 0;
        this.SPRITE = 1;
        this.mapPoss = [new Laya.Point(0, 3), new Laya.Point(0, 0), new Laya.Point(0, -2)];
        this.spritePoss = [new Laya.Point(5, 0), new Laya.Point(-5, 0), new Laya.Point(5, 0)];
        this._shockLength = 0;
        this._shockCount = 0;
        this._rx = 0;
        this._ry = 0;
        this._type = 0;
        this._repeatCount = 0;
    }
    destroy() {
        this.stop();
    }
    shock(type = 0, target = null, repeatCount = 3) {
        if (this._target) {
            return;
        }
        this._type = type;
        this._target = target;
        if (this._type == this.MAP) {
            this._shockPoss = this.mapPoss.concat();
            this._shockLength = this._shockPoss.length;
        }
        else if (this._type == this.SPRITE) {
            this._shockPoss = this.spritePoss.concat();
            this._shockLength = this._shockPoss.length;
        }
        this.start(repeatCount);
    }
    start(num = 1) {
        this.repeatCount = num;
        this._shockCount = 0;
        if (this._target) {
            if (this._type != this.MAP) {
                this._rx = this._target.x;
            }
            this._ry = this._target.y;
            Laya.timer.frameLoop(1, this, this.onShockEnter);
        }
    }
    stop() {
        if (this._target) {
            if (this._type != this.MAP) {
                this._target.x = this._rx;
            }
            this._target.y = this._ry;
            Laya.timer.clear(this, this.onShockEnter);
        }
        this._target = null;
    }
    onShockEnter(time) {
        var maxCount = this._shockLength * this._repeatCount;
        if (this._shockCount >= maxCount) {
            this.stop();
            return;
        }
        var index = this._shockCount % this._shockLength;
        var pos = this._shockPoss[index];
        if (this._target) {
            if (this._type != this.MAP) {
                this._target.x = this._rx + pos.x;
            }
            this._target.y = this._ry + pos.y;
        }
        this._shockCount++;
    }
    get repeatCount() {
        return this._repeatCount;
    }
    set repeatCount(value) {
        this._repeatCount = value;
    }
    static get Ins() {
        if (!ShakeUtils._instance) {
            ShakeUtils._instance = new ShakeUtils();
        }
        return ShakeUtils._instance;
    }
}
//# sourceMappingURL=ShakeUtils.js.map