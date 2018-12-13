"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = require("../../consts/Color");
const LayerManager_1 = require("../../managers/LayerManager");
const Layer_1 = require("./Layer");
const LayerEvent_1 = require("./LayerEvent");
class MaskLayer extends Layer_1.default {
    constructor(layerId, $name = null) {
        super(layerId, $name);
        this.initMask();
        this._handlers = [];
        this._maskEnabled = true;
    }
    set maskEnabled(value) {
        this._maskEnabled = value;
    }
    set maskAlpha(value) {
        this._mask.alpha = value;
    }
    /**
     * 添加的回调只会触发，一般用来关闭已打开的视图窗口
     * @param caller
     * @param listener
     * @param args
     *
     * @param maskAlpha
     */
    addChildWithMaskCall(caller, listener, args = null, maskAlpha = MaskLayer.DEFAULT_MASK_ALPHA) {
        this.maskEnabled = true;
        if (maskAlpha !== MaskLayer.DEFAULT_MASK_ALPHA) {
            this._mask.alpha = maskAlpha;
        }
        this.addChild(caller);
        this._handlers.push(Laya.Handler.create(caller, listener, args));
    }
    addChildWithCustomMask(customMask, caller, listener, args = null) {
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
    }
    addChild(node) {
        super.addChild(node);
        if (this._usingCustomMask && this._customMask) {
            super.addChildAt(this._customMask, 0);
        }
        if (this._maskEnabled) {
            super.addChildAt(this._mask, 0);
        }
        this.event(LayerEvent_1.default.CHILD_ADDED, this.numChildren);
        return node;
    }
    removeChild(node) {
        super.removeChild(node);
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
            super.removeChild(this._mask);
            this._mask.alpha = MaskLayer.DEFAULT_MASK_ALPHA;
        }
        this.event(LayerEvent_1.default.CHILD_REMOVED, this.numChildren);
        return node;
    }
    initMask() {
        this._mask = new Laya.Sprite();
        this._mask.graphics.clear();
        this._mask.graphics.drawRect(0, 0, LayerManager_1.default.stageDesignWidth, LayerManager_1.default.stageDesignHeight, Color_1.default.BLACK);
        this._mask.alpha = MaskLayer.DEFAULT_MASK_ALPHA;
        this._mask.size(LayerManager_1.default.stageDesignWidth, LayerManager_1.default.stageDesignHeight);
        this._mask.on(Laya.Event.CLICK, this, this.applyClick);
    }
    applyClick() {
        while (this._handlers.length) {
            this._handlers.pop().run();
        }
    }
}
MaskLayer.DEFAULT_MASK_ALPHA = 0.7;
exports.default = MaskLayer;
//# sourceMappingURL=MaskLayer.js.map