class LayerManager extends EventDispatcher {
    constructor() {
        super();
        this._layers = [];
    }
    get layers() {
        return this._layers;
    }
    /** 当前的鼠标位置 X */
    static get mouseX() {
        return Laya.stage.mouseX / LayerManager.adaptScaleX;
    }
    /** 当前的鼠标位置 Y */
    static get mouseY() {
        return Laya.stage.mouseY / LayerManager.adaptScaleY;
    }
    /** 获取对象的实际舞台变形数据 */
    static getRealStageRect(target) {
        const loc = PointUtils.localToGlobal(target);
        const rect = new Rectangle(loc.x * LayerManager.adaptScale + this.left, loc.y * LayerManager.adaptScale + this.top, target.width * LayerManager.adaptScale, target.height * LayerManager.adaptScale);
        // const scaleFactor: number = LayerManager.stageDesignWidth / LayerManager.clientWidth;
        const scaleFactor = Laya.stage.designWidth / Laya.Browser.clientWidth;
        rect.x = Math.round(rect.x / scaleFactor);
        rect.y = Math.round(rect.y / scaleFactor);
        rect.width = Math.round(rect.width / scaleFactor);
        rect.height = Math.round(rect.height / scaleFactor);
        return rect;
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new LayerManager();
        }
        return this._instance;
    }
    // prettier-ignore
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
        // console.log(StringTools.wrapValueObjects(["designWidth", "designHeight"],[designWidth, designHeight]));
        // console.log(StringTools.wrapValueObjects(["clientWidth", "clientHeight"],[clientWidth, clientHeight]));
        // console.log(StringTools.wrapValueObjects(["adaptScaleX", "adaptScaleY", "pixelRatio"],[adaptScaleX, adaptScaleY, pixelRatio]));
        // console.log(StringTools.wrapValueObjects(["top", "left"], [top, left]));
        let idx = 0;
        this.renderLayer = this.createLayer(idx++, "renderLayer", container);
        this.navLayer = this.createLayer(idx++, "navLayer", container);
        this.flyLayer = this.createLayer(idx++, "flyLayer", container);
        this.frameLayer = this.createMaskLayer(idx++, "frameLayer", container);
        this.subFrameLayer = this.createMaskLayer(idx++, "subFrameLayer", container);
        this.alertLayer = this.createMaskLayer(idx++, "alertLayer", container);
        this.screenEffectLayer = this.createLayer(idx++, "screenEffectLayer", container);
        this.rollMessageLayer = this.createLayer(idx++, "rollMessageLayer", container);
        this.guideLayer = this.createMaskLayer(idx++, "guideLayer", container);
        this.smallLoadingLayer = this.createMaskLayer(idx++, "smallLoadingLayer", container);
        this.noteLayer = this.createLayer(idx++, "noteLayer", container);
        this.debugLayer = this.createLayer(idx++, "debugLayer", container);
        for (const layer of this._layers) {
            layer.pos(left, top);
            layer.scale(adaptScale, adaptScale);
        }
    }
    createLayer(index, name, container) {
        this._layers.push(container.addChild(new Layer(index, name)));
        return this._layers[this._layers.length - 1];
    }
    createMaskLayer(index, name, container) {
        this._layers.push(container.addChild(new MaskLayer(index, name)));
        return this._layers[this._layers.length - 1];
    }
}
/** Laya.stage 的设计宽度，一般为人为设定 */
LayerManager.stageDesignWidth = 0;
/** Laya.stage 的设计高度，一般为人为设定 */
LayerManager.stageDesignHeight = 0;
/** Laya.stage 的设备宽度，一般根据机器自动设定 */
LayerManager.clientWidth = 0;
/** Laya.stage 的设备高度，一般根据机器自动设定 */
LayerManager.clientHeight = 0;
/** Laya.stage.width 针对设备的适应倍数 */
LayerManager.adaptScaleX = 0;
/** Laya.stage.height 针对设备的适应倍数 */
LayerManager.adaptScaleY = 0;
/** LayerManager._layers 针对设备的适应倍数 */
LayerManager.adaptScale = 0;
/** 设备像素倍率 */
LayerManager.pixelRatio = 1;
/** 对设备适应后，LayerManager._layers 距离屏幕顶部的距离 */
LayerManager.top = 0;
/** 对设备适应后，LayerManager._layers 距离屏幕左侧的距离 */
LayerManager.left = 0;
/** 设备Top，距离屏幕顶部的真实屏幕距离 */
LayerManager.clientTop = 0;
/** 设备Left，距离屏幕左侧的真实屏幕距离 */
LayerManager.clientLeft = 0;
//# sourceMappingURL=LayerManager.js.map