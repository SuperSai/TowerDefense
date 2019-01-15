class MaskLayer extends Layer {
    constructor(layerId, $name = null) {
        super(layerId, $name);
        this.initMask();
        this._handlers = [];
        this._maskEnabled = true;
        this._useAnimation = true;
    }
    set maskEnabled(value) {
        this._maskEnabled = value;
        if (value) {
            if (this.numChildren > 0) {
                super.addChildAt(this._mask, 0);
            }
        }
        else {
            this._mask.removeSelf();
        }
    }
    set maskAlpha(value) {
        this._mask.alpha = value;
    }
    set useAnimation(value) {
        this._useAnimation = value;
    }
    get animationComplete() {
        return this._animationComplete;
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
        this.superAddChild(node);
        if (this._usingCustomMask && this._customMask) {
            super.addChildAt(this._customMask, 0);
        }
        if (this._maskEnabled) {
            super.addChildAt(this._mask, 0);
        }
        this.event(LayerEvent.CHILD_ADDED, this.numChildren);
        return node;
    }
    removeChild(node) {
        super.removeChild(node);
        const sp = node;
        if (sp) {
            if (sp.layer_tween) {
                sp.layer_tween.complete();
                sp.scale(sp.layer_origin_scale.x, sp.layer_origin_scale.y);
                delete sp.layer_tween;
            }
        }
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
            this._animationComplete = false;
            this._mask.alpha = MaskLayer.DEFAULT_MASK_ALPHA;
        }
        this.event(LayerEvent.CHILD_REMOVED, this.numChildren);
        return node;
    }
    initMask() {
        this._mask = new Laya.Sprite();
        this._mask.graphics.clear();
        this._mask.graphics.drawRect(0, 0, LayerManager.stageDesignWidth, LayerManager.stageDesignHeight, Color.BLACK);
        this._mask.alpha = MaskLayer.DEFAULT_MASK_ALPHA;
        this._mask.size(LayerManager.stageDesignWidth, LayerManager.stageDesignHeight);
        this._mask.on(Laya.Event.CLICK, this, this.applyClick);
    }
    superAddChild(node, index) {
        if (this._useAnimation && !this._animationComplete) {
            const sp = node;
            if (sp && !sp.layer_tween) {
                if (!sp.layer_origin_scale) {
                    sp.layer_origin_scale = new Laya.Point(sp.scaleX, sp.scaleY);
                }
                const comp = sp;
                const size = new Laya.Point();
                if (comp) {
                    size.setTo(comp.displayWidth, comp.displayHeight);
                }
                else {
                    const rect = sp.getBounds();
                    size.setTo(rect.width, rect.height);
                }
                sp.layer_tween = Laya.Tween.from(node, { x: sp.x + (size.x >> 1), y: sp.y + (size.y >> 1), scaleX: 0, scaleY: 0 }, 300, Laya.Ease.backInOut, Handler.create(this, () => {
                    this._animationComplete = true;
                    this.event(LayerEvent.LAYER_ANIMATION_COMPLETE, this._animationComplete);
                }));
            }
        }
        this._mask.off(Laya.Event.CLICK, this, this.applyClick);
        Laya.timer.once(Time.SEC_IN_MILI * 2, this, () => {
            this._mask.on(Laya.Event.CLICK, this, this.applyClick);
        });
        if (index) {
            super.addChildAt(node, index);
        }
        else {
            super.addChild(node);
        }
        return node;
    }
    applyClick() {
        if (this._handlers.length) {
            this._handlers.pop().run();
        }
    }
}
MaskLayer.DEFAULT_MASK_ALPHA = 0.7;
//# sourceMappingURL=MaskLayer.js.map