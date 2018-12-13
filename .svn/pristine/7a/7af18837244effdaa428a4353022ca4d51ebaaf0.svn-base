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
var MaskLayer = /** @class */ (function (_super) {
    __extends(MaskLayer, _super);
    function MaskLayer(layerId, $name) {
        if ($name === void 0) { $name = null; }
        var _this = _super.call(this, layerId, $name) || this;
        _this.initMask();
        _this._handlers = [];
        _this._maskEnabled = true;
        _this._useAnimation = true;
        return _this;
    }
    Object.defineProperty(MaskLayer.prototype, "maskEnabled", {
        set: function (value) {
            this._maskEnabled = value;
            if (value) {
                if (this.numChildren > 0) {
                    _super.prototype.addChildAt.call(this, this._mask, 0);
                }
            }
            else {
                this._mask.removeSelf();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskLayer.prototype, "maskAlpha", {
        set: function (value) {
            this._mask.alpha = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskLayer.prototype, "useAnimation", {
        set: function (value) {
            this._useAnimation = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskLayer.prototype, "animationComplete", {
        get: function () {
            return this._animationComplete;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 添加的回调只会触发，一般用来关闭已打开的视图窗口
     * @param caller
     * @param listener
     * @param args
     *
     * @param maskAlpha
     */
    MaskLayer.prototype.addChildWithMaskCall = function (caller, listener, args, maskAlpha) {
        if (args === void 0) { args = null; }
        if (maskAlpha === void 0) { maskAlpha = MaskLayer.DEFAULT_MASK_ALPHA; }
        this.maskEnabled = true;
        if (maskAlpha !== MaskLayer.DEFAULT_MASK_ALPHA) {
            this._mask.alpha = maskAlpha;
        }
        this.addChild(caller);
        this._handlers.push(Laya.Handler.create(caller, listener, args));
    };
    MaskLayer.prototype.addChildWithCustomMask = function (customMask, caller, listener, args) {
        if (args === void 0) { args = null; }
        if (!customMask) {
            return;
        }
        this.maskEnabled = true;
        this._usingCustomMask = true;
        this._customMask = customMask;
        if (this._customMask.parent) {
            this._customMaskParent = this._customMask.parent;
            this._customMaskIndex = this._customMask.parent.getChildIndex(this._customMask);
        }
        this._mask.alpha = 0;
        this.addChild(caller);
        this._handlers.push(Laya.Handler.create(caller, listener, args));
    };
    MaskLayer.prototype.addChild = function (node) {
        this.superAddChild(node);
        if (this._usingCustomMask && this._customMask) {
            _super.prototype.addChildAt.call(this, this._customMask, 0);
        }
        if (this._maskEnabled) {
            _super.prototype.addChildAt.call(this, this._mask, 0);
        }
        this.event(LayerEvent.CHILD_ADDED, this.numChildren);
        return node;
    };
    MaskLayer.prototype.removeChild = function (node) {
        _super.prototype.removeChild.call(this, node);
        if (this.numChildren === 2 && this._usingCustomMask) {
            if (this._customMask) {
                if (this._customMaskParent) {
                    this._customMaskParent.addChildAt(this._customMask, this._customMaskIndex);
                }
                this._usingCustomMask = false;
                this._customMask = null;
                this._customMaskParent = null;
                this._customMaskIndex = 0;
            }
        }
        if (this.numChildren === 1 && this.getChildAt(0) === this._mask) {
            _super.prototype.removeChild.call(this, this._mask);
            this._animationComplete = false;
            this._mask.alpha = MaskLayer.DEFAULT_MASK_ALPHA;
        }
        this.event(LayerEvent.CHILD_REMOVED, this.numChildren);
        return node;
    };
    MaskLayer.prototype.initMask = function () {
        this._mask = new Laya.Sprite();
        this._mask.graphics.clear();
        this._mask.graphics.drawRect(0, 0, LayerManager.stageDesignWidth, LayerManager.stageDesignHeight, Color.BLACK);
        this._mask.alpha = MaskLayer.DEFAULT_MASK_ALPHA;
        this._mask.size(LayerManager.stageDesignWidth, LayerManager.stageDesignHeight);
        this._mask.on(Laya.Event.CLICK, this, this.applyClick);
    };
    MaskLayer.prototype.superAddChild = function (node, index) {
        var _this = this;
        if (this._useAnimation && !this._animationComplete) {
            var sp = node;
            if (sp) {
                // @ts-ignore
                sp.layer_tween && Laya.Tween.clear(sp.layer_tween);
                // pivot = new Laya.Point(sp.pivotX, sp.pivotY);
                var comp = sp;
                var size = new Laya.Point();
                if (comp) {
                    size.setTo(comp.displayWidth, comp.displayHeight);
                }
                else {
                    var rect = sp.getBounds();
                    size.setTo(rect.width, rect.height);
                }
                // @ts-ignore
                sp.layer_tween = Laya.Tween.from(node, { x: sp.x + (size.x >> 1), y: sp.y + (size.y >> 1), scaleX: 0, scaleY: 0 }, 300, Laya.Ease.backInOut, Handler.create(this, function () {
                    _this._animationComplete = true;
                    _this.event(LayerEvent.LAYER_ANIMATION_COMPLETE, _this._animationComplete);
                }));
            }
        }
        if (index) {
            _super.prototype.addChildAt.call(this, node, index);
        }
        else {
            _super.prototype.addChild.call(this, node);
        }
        return node;
    };
    MaskLayer.prototype.applyClick = function () {
        while (this._handlers.length) {
            this._handlers.pop().run();
        }
    };
    MaskLayer.DEFAULT_MASK_ALPHA = 0.7;
    return MaskLayer;
}(Layer));
//# sourceMappingURL=MaskLayer.js.map