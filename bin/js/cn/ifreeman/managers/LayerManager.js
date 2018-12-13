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
var LayerManager = /** @class */ (function (_super) {
    __extends(LayerManager, _super);
    function LayerManager() {
        var _this = _super.call(this) || this;
        _this._layers = [];
        return _this;
    }
    Object.defineProperty(LayerManager.prototype, "layers", {
        get: function () {
            return this._layers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerManager, "mouseX", {
        /** 当前的鼠标位置 X */
        get: function () {
            return Laya.stage.mouseX / LayerManager.adaptScaleX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LayerManager, "mouseY", {
        /** 当前的鼠标位置 Y */
        get: function () {
            return Laya.stage.mouseY / LayerManager.adaptScaleY;
        },
        enumerable: true,
        configurable: true
    });
    /** 获取对象的实际舞台变形数据 */
    LayerManager.getRealStageRect = function (target) {
        var loc = PointTools.localToGlobal(target);
        var rect = new Rectangle(loc.x * LayerManager.adaptScale + this.left, loc.y * LayerManager.adaptScale + this.top, target.width * LayerManager.adaptScale, target.height * LayerManager.adaptScale);
        // const scaleFactor: number = LayerManager.stageDesignWidth / LayerManager.clientWidth;
        var scaleFactor = Laya.stage.designWidth / Laya.Browser.clientWidth;
        rect.x = Math.round(rect.x / scaleFactor);
        rect.y = Math.round(rect.y / scaleFactor);
        rect.width = Math.round(rect.width / scaleFactor);
        rect.height = Math.round(rect.height / scaleFactor);
        return rect;
    };
    LayerManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new LayerManager();
        }
        return this._instance;
    };
    // prettier-ignore
    LayerManager.prototype.initLayer = function (container, designWidth, designHeight) {
        var pixelRatio = Laya.Browser.pixelRatio;
        var clientWidth = Laya.Browser.clientWidth * pixelRatio;
        var clientHeight = Laya.Browser.clientHeight * pixelRatio;
        var adaptScaleX = clientWidth / designWidth;
        var adaptScaleY = clientHeight / designHeight;
        var adaptScale = Math.min(adaptScaleX, adaptScaleY);
        var stageWidth = designWidth * adaptScaleX;
        var stageHeight = designHeight * adaptScaleY;
        var top = 0;
        var left = 0;
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
        var idx = 0;
        this.renderLayer = this.createLayer(idx++, "renderLayer", container);
        this.navLayer = this.createLayer(idx++, "navLayer", container);
        this.frameLayer = this.createMaskLayer(idx++, "frameLayer", container);
        this.subFrameLayer = this.createMaskLayer(idx++, "subFrameLayer", container);
        this.alertLayer = this.createMaskLayer(idx++, "alertLayer", container);
        this.screenEffectLayer = this.createLayer(idx++, "screenEffectLayer", container);
        this.rollMessageLayer = this.createLayer(idx++, "rollMessageLayer", container);
        this.guideLayer = this.createMaskLayer(idx++, "guideLayer", container);
        this.smallLoadingLayer = this.createMaskLayer(idx++, "smallLoadingLayer", container);
        this.noteLayer = this.createLayer(idx++, "noteLayer", container);
        this.debugLayer = this.createLayer(idx++, "debugLayer", container);
        for (var _i = 0, _a = this._layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            layer.pos(left, top);
            layer.scale(adaptScale, adaptScale);
        }
    };
    LayerManager.prototype.createLayer = function (index, name, container) {
        this._layers.push(container.addChild(new Layer(index, name)));
        return this._layers[this._layers.length - 1];
    };
    LayerManager.prototype.createMaskLayer = function (index, name, container) {
        this._layers.push(container.addChild(new MaskLayer(index, name)));
        return this._layers[this._layers.length - 1];
    };
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
    return LayerManager;
}(EventDispatcher));
//# sourceMappingURL=LayerManager.js.map