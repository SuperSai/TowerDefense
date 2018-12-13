/*
* name;
*/
var ScaleAnimScript = /** @class */ (function () {
    // private isMouseOut:boolean = false; //移除
    function ScaleAnimScript() {
        this.isMouseDown = false; //按下
    }
    Object.defineProperty(ScaleAnimScript.prototype, "owner", {
        set: function (value) {
            this.scaleBox = value;
            //自定义的脚本会有时序问题，所以在此添加一个延时
            this.scaleBox.frameOnce(2, this, this.onLoaded);
        },
        enumerable: true,
        configurable: true
    });
    ScaleAnimScript.prototype.onLoaded = function () {
        // if (isNaN(this.scaleBox.left) && isNaN(this.scaleBox.right) && isNaN(this.scaleBox.top) &&
        //         isNaN(this.scaleBox.bottom) && isNaN(this.scaleBox.centerX) && isNaN(this.scaleBox.centerY)) {
        //     //居中处理
        //     this.scaleBox.anchorX = 0.5;
        //     this.scaleBox.anchorY = 0.5;
        //     this.scaleBox.pos(this.scaleBox.x+this.scaleBox.width*0.5, this.scaleBox.y+this.scaleBox.height*0.5);
        // }
        this.scaleOrginValue = new Laya.Point(this.scaleBox.scaleX, this.scaleBox.scaleY);
        this.scaleBox.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
        this.scaleBox.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
        this.scaleBox.on(Laya.Event.MOUSE_OUT, this, this.mouseOut);
        // this.scaleBox.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove);
    };
    ScaleAnimScript.prototype.mouseDown = function () {
        this.isMouseDown = true;
        // this.isMouseOut = false;
        this.scaleSmall();
    };
    ScaleAnimScript.prototype.mouseUp = function () {
        if (this.isMouseDown) {
            this.scaleNormal();
        }
        this.isMouseDown = false;
    };
    ScaleAnimScript.prototype.mouseOut = function () {
        if (this.isMouseDown) {
            this.scaleNormal();
        }
        this.isMouseDown = false;
        // this.isMouseOut = true;
    };
    // private mouseMove():void {
    //     if (this.isMouseOut) {
    //         if (this.isHit(this.scaleBox)) {
    //             this.scaleSmall();
    //         } else {
    //             this.scaleNormal();
    //         }
    //     }
    // }
    ScaleAnimScript.prototype.scaleSmall = function () {
        if (this.scaleBox) {
            // this.scaleBox.scale(this.scaleOrginValue.x *0.95, this.scaleOrginValue.y *0.95);
            // Laya.Tween.to(this.scaleBox, {scaleX:this.scaleOrginValue.x *0.95, scaleY: this.scaleOrginValue.y *0.95}, 60, null);
            this.scaleBox.filters = DisplayUtils.createColorFilter(1);
        }
    };
    ScaleAnimScript.prototype.scaleNormal = function () {
        if (this.scaleBox) {
            // this.scaleBox.scale(this.scaleOrginValue.x, this.scaleOrginValue.y);
            // Laya.Tween.to(this.scaleBox, {scaleX:this.scaleOrginValue.x, scaleY: this.scaleOrginValue.y}, 60, null);
            this.scaleBox.filters = [];
        }
    };
    //点击检测
    ScaleAnimScript.prototype.isHit = function (_checkBox, _extW, _extH) {
        if (_extW === void 0) { _extW = 0; }
        if (_extH === void 0) { _extH = 0; }
        if (_checkBox) {
            var touchPos = _checkBox.getMousePoint();
            var touchArea = new Laya.Rectangle(0 - _extW / 2, 0 - _extH / 2, _checkBox.width + _extW, _checkBox.height + _extH);
            return touchArea.contains(touchPos.x, touchPos.y);
        }
        return false;
    };
    return ScaleAnimScript;
}());
//# sourceMappingURL=ScaleAnimScript.js.map