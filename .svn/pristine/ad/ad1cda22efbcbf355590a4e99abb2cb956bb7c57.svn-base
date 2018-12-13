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
/*
* name;
*/
var DiamondBuyView = /** @class */ (function (_super) {
    __extends(DiamondBuyView, _super);
    function DiamondBuyView(data, callback) {
        if (data === void 0) { data = null; }
        if (callback === void 0) { callback = null; }
        var _this = _super.call(this) || this;
        _this._data = data;
        _this._callback = callback;
        _this.init();
        return _this;
    }
    //新建并添加到节点
    DiamondBuyView.Create = function (_parentNode, callback, _removeCallback) {
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
                var nodeView = new DiamondBuyView(arge, callback);
                AlignUtils.setToScreenGoldenPos(nodeView);
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    };
    //初始化
    DiamondBuyView.prototype.init = function () {
        var self = this;
        switch (self._data[0]) {
            case DILOG_TYPE.PET:
                self.petTitleImg.visible = self.imgMonster.visible = true;
                self.accTitleImg.visible = self.accIcon.visible = false;
                self.imgMonster.skin = "images/carImg/" + self._data[2].imgUrl;
                break;
            case DILOG_TYPE.ACC:
                self.petTitleImg.visible = self.imgMonster.visible = false;
                self.accTitleImg.visible = self.accIcon.visible = true;
                break;
        }
        self.txtDiamond.text = self._data[1];
        self.addEvents();
    };
    DiamondBuyView.prototype.addEvents = function () {
        var self = this;
        self.btnBuy.on(Laya.Event.CLICK, self, self.onBuyHandler);
        self.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    };
    DiamondBuyView.prototype.removeEvents = function () {
        var self = this;
        self.btnBuy.off(Laya.Event.CLICK, self, self.onBuyHandler);
        self.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    };
    DiamondBuyView.prototype.onBuyHandler = function () {
        var self = this;
        var carPriceInt = Math.floor(self._data[1]);
        if (PlayerManager.Instance.Info.userDiamond >= carPriceInt) {
            if (this._callback) {
                this._callback(carPriceInt);
            }
        }
        else {
            CommonFun.showTip("钻石不足，做任务领钻石？");
        }
        self.onCloseHandler();
    };
    DiamondBuyView.prototype.onCloseHandler = function () {
        var self = this;
        self.removeSelf();
        self.removeEvents();
    };
    return DiamondBuyView;
}(ui.common.view.DiamondBuyViewUI));
//# sourceMappingURL=DiamondBuyView.js.map