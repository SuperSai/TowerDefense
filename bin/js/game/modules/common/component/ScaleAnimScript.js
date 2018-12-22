/*
* name;
*/
class ScaleAnimScript {
    constructor() {
        this.isMouseDown = false; //按下
        this.isMouseOut = false; //移除
    }
    set owner(value) {
        this.scaleBox = value;
        //自定义的脚本会有时序问题，所以在此添加一个延时
        this.scaleBox.frameOnce(2, this, this.onLoaded);
    }
    onLoaded() {
        this.scaleOrginValue = new Laya.Point(this.scaleBox.scaleX, this.scaleBox.scaleY);
        this._originAnchor = new Laya.Point((this.scaleBox.anchorX ? this.scaleBox.anchorX : 0), (this.scaleBox.anchorY ? this.scaleBox.anchorY : 0));
        this._originPos = new Laya.Point(this.scaleBox.x, this.scaleBox.y);
        this.scaleBox.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        this.scaleBox.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        this.scaleBox.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        // this.scaleBox.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    }
    mouseDown() {
        this.isMouseDown = true;
        this.isMouseOut = false;
        this.scaleSmall();
    }
    mouseUp() {
        if (this.isMouseDown) {
            this.scaleNormal();
        }
        this.isMouseDown = false;
    }
    mouseOut() {
        if (this.isMouseDown) {
            this.scaleNormal();
        }
        this.isMouseDown = false;
        this.isMouseOut = true;
    }
    mouseMove() {
        if (this.isMouseOut) {
            if (this.isHit(this.scaleBox)) {
                this.scaleSmall();
            }
            else {
                this.scaleNormal();
            }
        }
    }
    scaleSmall() {
        if (this.scaleBox) {
            if (isNaN(this.scaleBox.left) && isNaN(this.scaleBox.right) && isNaN(this.scaleBox.top) &&
                isNaN(this.scaleBox.bottom) && isNaN(this.scaleBox.centerX) && isNaN(this.scaleBox.centerY)) {
                //居中处理
                this.scaleBox.anchorX = 0.5;
                this.scaleBox.anchorY = 0.5;
                this.scaleBox.pos(this.scaleBox.x + this.scaleBox.width * 0.5, this.scaleBox.y + this.scaleBox.height * 0.5);
            }
            this.scaleBox.scale(this.scaleOrginValue.x * 0.95, this.scaleOrginValue.y * 0.95);
            Laya.Tween.to(this.scaleBox, { scaleX: this.scaleOrginValue.x * 0.95, scaleY: this.scaleOrginValue.y * 0.95 }, 60, null, null);
            this.scaleBox.filters = DisplayUtils.createColorFilter(1);
        }
    }
    scaleNormal() {
        if (this.scaleBox) {
            this.scaleBox.scale(this.scaleOrginValue.x, this.scaleOrginValue.y);
            Laya.Tween.to(this.scaleBox, { scaleX: this.scaleOrginValue.x, scaleY: this.scaleOrginValue.y }, 60, null, Laya.Handler.create(null, () => {
                if (isNaN(this.scaleBox.left) && isNaN(this.scaleBox.right) && isNaN(this.scaleBox.top) &&
                    isNaN(this.scaleBox.bottom) && isNaN(this.scaleBox.centerX) && isNaN(this.scaleBox.centerY)) {
                    //居中处理
                    this.scaleBox.anchorX = this._originAnchor.x;
                    this.scaleBox.anchorY = this._originAnchor.y;
                    this.scaleBox.pos(this._originPos.x, this._originPos.y);
                }
            }));
            this.scaleBox.filters = [];
        }
    }
    //点击检测
    isHit(_checkBox, _extW = 0, _extH = 0) {
        if (_checkBox) {
            let touchPos = _checkBox.getMousePoint();
            let touchArea = new Laya.Rectangle(0 - _extW / 2, 0 - _extH / 2, _checkBox.width + _extW, _checkBox.height + _extH);
            return touchArea.contains(touchPos.x, touchPos.y);
        }
        return false;
    }
}
//# sourceMappingURL=ScaleAnimScript.js.map