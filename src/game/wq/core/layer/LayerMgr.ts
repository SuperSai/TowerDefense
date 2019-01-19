
class LayerMgr extends EventDispatcher {

    private _layerCount: number = 11;
    private _layers: Laya.Dictionary = new Laya.Dictionary();

    public initLayer(container: Laya.Stage, designWidth?: number, designHeight?: number): void {
        const pixelRatio: number = Laya.Browser.pixelRatio;

        const clientWidth: number = Laya.Browser.clientWidth * pixelRatio;
        const clientHeight: number = Laya.Browser.clientHeight * pixelRatio;

        const adaptScaleX: number = clientWidth / designWidth;
        const adaptScaleY: number = clientHeight / designHeight;

        const adaptScale: number = Math.min(adaptScaleX, adaptScaleY);

        const stageWidth: number = designWidth * adaptScaleX;
        const stageHeight: number = designHeight * adaptScaleY;

        let top: number = 0;
        let left: number = 0;
        if (adaptScale === adaptScaleX) {
            top = (stageHeight - designHeight * adaptScale) * 0.5;
        } else {
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

        for (const key in this._layers) {
            if (this._layers.indexOf(key) != -1) {
                const element = this._layers.get(key);
                element.pos(left, top);
                element.scale(adaptScale, adaptScale);
            }
        }
    }

    private createAllLayers(): void {
        for (let i: number = 0; i < this._layerCount; i++) {
            let layerObj = this.createOnLayer(i);
            this._layers.set(layerObj.layerId, layerObj);
        }
    }

    private createOnLayer(layerType: number): MaskLayer {
        let layer: MaskLayer = new MaskLayer(layerType);
        return layer;
    }

    public addToLayer(display: any, layerType: number): void {
        let layer: MaskLayer = this._layers.get(layerType);
        layer.maskEnabled = false;
        layer.addChild(display);
    }

    public getLayerByType(layerType: number): MaskLayer {
        return this._layers.get(layerType);
    }

    private static _ins: LayerMgr;
    public static get Ins(): LayerMgr {
        if (LayerMgr._ins == null) {
            LayerMgr._ins = new LayerMgr();
        }
        return LayerMgr._ins;
    }
}

enum LAYER_TYPE {
    RENDER_LAYER = 0,
    NAV_LAYER = 1,
    FRAME_LAYER = 2,
    SUB_FRAME_LAYER = 3,
    ALERT_LAYER = 4,
    SCREEN_EFFECT_LAYER = 5,
    ROLL_MSG_LAYER = 6,
    GUIDE_LAYER = 7,
    SMALL_LOADING_LAYER = 8,
    /** 公告层 */
    NOTE_LAYER = 9,
    DEBUG_LAYER = 10
}