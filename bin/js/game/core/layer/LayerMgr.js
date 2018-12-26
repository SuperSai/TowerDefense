class LayerMgr extends EventDispatcher {
    constructor() {
        super(...arguments);
        this._layerCount = 11;
        this._layers = [];
    }
    initLayer(container, designWidth, designHeight) {
        const pixelRatio = Laya.Browser.pixelRatio;
        const clientWidth = Laya.Browser.clientWidth * pixelRatio;
        const clientHeight = Laya.Browser.clientHeight * pixelRatio;
        const adaptScaleX = clientWidth / designWidth;
        const adaptScaleY = clientHeight / designHeight;
        const adaptScale = Math.min(adaptScaleX, adaptScaleY);
        const stageWidth = designWidth * adaptScaleX;
        const stageHeight = designHeight * adaptScaleY;
        let top = 0;
        let left = 0;
        if (adaptScale === adaptScaleX) {
            top = (stageHeight - designHeight * adaptScale) * 0.5;
        }
        else {
            left = (stageWidth - designWidth * adaptScale) * 0.5;
        }
        container.width = stageWidth;
        container.height = stageHeight;
        LayerManager.stageDesignWidth = designWidth;
        LayerManager.stageDesignHeight = designHeight;
        LayerManager.clientWidth = Laya.Browser.clientWidth;
        LayerManager.clientHeight = Laya.Browser.clientHeight;
        LayerManager.adaptScaleX = adaptScaleX;
        LayerManager.adaptScaleY = adaptScaleY;
        LayerManager.adaptScale = adaptScale;
        LayerManager.pixelRatio = pixelRatio;
        LayerManager.top = top;
        LayerManager.left = left;
        LayerManager.clientTop = (top / pixelRatio);
        LayerManager.clientLeft = (left / pixelRatio);
        this.createAllLayers();
        container.addChild(this.getLayerByType(LAYER_TYPE.RENDER_LAYER));
        container.addChild(this.getLayerByType(LAYER_TYPE.NAV_LAYER));
        container.addChild(this.getLayerByType(LAYER_TYPE.FRAME_LAYER));
        container.addChild(this.getLayerByType(LAYER_TYPE.SUB_FRAME_LAYER));
        container.addChild(this.getLayerByType(LAYER_TYPE.ALERT_LAYER));
        container.addChild(this.getLayerByType(LAYER_TYPE.SCREEN_EFFECT_LAYER));
        container.addChild(this.getLayerByType(LAYER_TYPE.ROLL_MSG_LAYER));
        container.addChild(this.getLayerByType(LAYER_TYPE.GUIDE_LAYER));
        container.addChild(this.getLayerByType(LAYER_TYPE.SMALL_LOADING_LAYER));
        container.addChild(this.getLayerByType(LAYER_TYPE.NOTE_LAYER));
        container.addChild(this.getLayerByType(LAYER_TYPE.DEBUG_LAYER));
        for (const layer of this._layers) {
            layer.pos(left, top);
            layer.scale(adaptScale, adaptScale);
        }
    }
    createAllLayers() {
        for (let i = 0; i < this._layerCount; i++) {
            this._layers.push(this.createOnLayer(i));
        }
    }
    createOnLayer(layerType) {
        let layer = new Layer(layerType);
        return layer;
    }
    addToLayer(display, layerType) {
        let layer = this.getLayerByType(layerType);
        layer.addChild(display);
    }
    getLayerByType(layerType) {
        for (let i = 0; i < this._layers.length; i++) {
            if (this._layers[i].layerId == layerType) {
                return this._layers[i];
            }
        }
    }
    static get Instance() {
        if (LayerMgr._instance == null) {
            LayerMgr._instance = new LayerMgr();
        }
        return LayerMgr._instance;
    }
}
var LAYER_TYPE;
(function (LAYER_TYPE) {
    LAYER_TYPE[LAYER_TYPE["RENDER_LAYER"] = 0] = "RENDER_LAYER";
    LAYER_TYPE[LAYER_TYPE["NAV_LAYER"] = 1] = "NAV_LAYER";
    LAYER_TYPE[LAYER_TYPE["FRAME_LAYER"] = 2] = "FRAME_LAYER";
    LAYER_TYPE[LAYER_TYPE["SUB_FRAME_LAYER"] = 3] = "SUB_FRAME_LAYER";
    LAYER_TYPE[LAYER_TYPE["ALERT_LAYER"] = 4] = "ALERT_LAYER";
    LAYER_TYPE[LAYER_TYPE["SCREEN_EFFECT_LAYER"] = 5] = "SCREEN_EFFECT_LAYER";
    LAYER_TYPE[LAYER_TYPE["ROLL_MSG_LAYER"] = 6] = "ROLL_MSG_LAYER";
    LAYER_TYPE[LAYER_TYPE["GUIDE_LAYER"] = 7] = "GUIDE_LAYER";
    LAYER_TYPE[LAYER_TYPE["SMALL_LOADING_LAYER"] = 8] = "SMALL_LOADING_LAYER";
    LAYER_TYPE[LAYER_TYPE["NOTE_LAYER"] = 9] = "NOTE_LAYER";
    LAYER_TYPE[LAYER_TYPE["DEBUG_LAYER"] = 10] = "DEBUG_LAYER";
})(LAYER_TYPE || (LAYER_TYPE = {}));
//# sourceMappingURL=LayerMgr.js.map