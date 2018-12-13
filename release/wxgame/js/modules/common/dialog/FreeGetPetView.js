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
/*
* 获得免费宠物提示框;
*/
var FreeGetPetView = /** @class */ (function (_super) {
    __extends(FreeGetPetView, _super);
    function FreeGetPetView(data) {
        if (data === void 0) { data = null; }
        var _this = _super.call(this) || this;
        _this._data = data;
        _this.init();
        return _this;
    }
    //新建并添加到节点
    FreeGetPetView.Create = function (_parentNode, callback, _removeCallback) {
        if (callback === void 0) { callback = null; }
        if (_removeCallback === void 0) { _removeCallback = null; }
        var arge = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            arge[_i - 3] = arguments[_i];
        }
        var resList = [
            { url: "res/atlas/images.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                var nodeView = new FreeGetPetView(arge);
                AlignTools.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    };
    //初始化
    FreeGetPetView.prototype.init = function () {
        var self = this;
        self.imgPet.skin = "images/carImg/" + self._data[0].imgUrl;
        self.addEvents();
    };
    FreeGetPetView.prototype.addEvents = function () {
        var self = this;
        self.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    };
    FreeGetPetView.prototype.removeEvents = function () {
        var self = this;
        self.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    };
    FreeGetPetView.prototype.onCloseHandler = function () {
        var self = this;
        self.removeSelf();
        self.removeEvents();
    };
    return FreeGetPetView;
}(ui.FreeGetPetViewUI));
//# sourceMappingURL=FreeGetPetView.js.map