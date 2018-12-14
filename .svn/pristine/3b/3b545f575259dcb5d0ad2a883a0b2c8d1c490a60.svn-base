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
var MoreView = /** @class */ (function (_super) {
    __extends(MoreView, _super);
    function MoreView(controller, model) {
        var _this = _super.call(this) || this;
        _this._controller = controller;
        _this._model = model;
        _this.ui = new ui.more.MoreViewUI();
        _this.updateMuteImg();
        _this.size(_this.ui.width, _this.ui.height);
        _this.addChild(_this.ui);
        AlignUtils.setToScreenGoldenPos(_this);
        _this.initList();
        _this.addEvents();
        return _this;
    }
    MoreView.prototype.initList = function () {
        this.ui.listMoreItem.itemRender = MoreViewListItem;
        this.ui.listMoreItem.vScrollBarSkin = "";
        this.ui.listMoreItem.optimizeScrollRect = true;
        var len = this._model.itemList.length;
        this.ui.lblNoneGameTips.visible = len <= 0;
        this.ui.listMoreItem.visible = len > 0;
        if (len) {
            this.ui.listMoreItem.array = this._model.itemList;
        }
    };
    MoreView.prototype.addEvents = function () {
        this.ui.btnCustomService.on(Laya.Event.CLICK, this, this.onCustomService);
        this.ui.btnSoundOpend.on(Laya.Event.CLICK, this, this.onSwitchMute);
        this.ui.btnSoundClosed.on(Laya.Event.CLICK, this, this.onSwitchMute);
        this.ui.imgSubscribe.on(Laya.Event.CLICK, this, this.onSubscribe);
        this.ui.imgClose.on(Laya.Event.CLICK, this, this.removeSelf);
    };
    MoreView.prototype.onSwitchMute = function () {
        this._controller.switchMute();
        this.updateMuteImg();
    };
    MoreView.prototype.updateMuteImg = function () {
        this.ui.btnSoundOpend.visible = !this._model.mute;
        this.ui.btnSoundClosed.visible = this._model.mute;
    };
    MoreView.prototype.onCustomService = function () {
        platform.openCustomerService({
            sessionFrom: "",
            showMessageCard: false,
            sendMessageTitle: "wellcome",
            sendMessagePath: "",
            sendMessageImg: "",
            success: function (res) {
            },
            fail: function (res) {
            }
        });
    };
    MoreView.prototype.onSubscribe = function () {
        MessageUtils.showMsgTips("功能暂未开放");
    };
    return MoreView;
}(Laya.Component));
//# sourceMappingURL=MoreView.js.map