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
* 离线奖励;
*/
var OfflineRewardsView = /** @class */ (function (_super) {
    __extends(OfflineRewardsView, _super);
    function OfflineRewardsView(data, callback) {
        if (data === void 0) { data = null; }
        if (callback === void 0) { callback = null; }
        var _this = _super.call(this) || this;
        _this._data = data;
        _this._callback = callback;
        _this.init();
        return _this;
    }
    //新建并添加到节点
    OfflineRewardsView.Create = function (_parentNode, callback, _removeCallback) {
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
                var nodeView = new OfflineRewardsView(arge, callback);
                AlignUtils.setToScreenGoldenPos(nodeView);
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    };
    //初始化
    OfflineRewardsView.prototype.init = function () {
        var self = this;
        self.btnShare.visible = false;
        self.txtMoney.text = "金币+" + MathUtils.bytesToSize(self._data[0]);
        self._tween = EffectUtils.objectRotate(self.lightImg);
        self.addEvents();
    };
    OfflineRewardsView.prototype.addEvents = function () {
        var self = this;
        // self.btnShare.on(Laya.Event.CLICK, self, self.onShareHandler);
        self.btnVideo.on(Laya.Event.CLICK, self, self.onVideoHandler);
        self.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    };
    OfflineRewardsView.prototype.removeEvents = function () {
        var self = this;
        // self.btnShare.off(Laya.Event.CLICK, self, self.onShareHandler);
        self.btnVideo.off(Laya.Event.CLICK, self, self.onVideoHandler);
        self.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    };
    OfflineRewardsView.prototype.onShareHandler = function () {
        var self = this;
    };
    OfflineRewardsView.prototype.onVideoHandler = function () {
        var self = this;
        //显示广告
        userData.toShareAd(function () {
            self.txtMoney.text = "金币+" + MathUtils.bytesToSize(self._data[0] * 2);
            self.btnVideo.visible = false;
            M.layer.screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
            CommonFun.showTip("获得金币:" + MathUtils.bytesToSize(self._data[0] * 2));
        }, 1);
    };
    OfflineRewardsView.prototype.onCloseHandler = function () {
        var self = this;
        if (self.btnVideo.visible) {
            M.layer.screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
            CommonFun.showTip("获得金币:" + MathUtils.bytesToSize(self._data[0]));
        }
        self.removeView();
    };
    OfflineRewardsView.prototype.removeView = function () {
        var self = this;
        self._tween && (Laya.Tween.clear(self._tween));
        self._tween = null;
        self.removeSelf();
        self.removeEvents();
    };
    return OfflineRewardsView;
}(ui.common.view.OfflineRewardsViewUI));
//# sourceMappingURL=OfflineRewardsView.js.map