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
var MoreViewListItem = /** @class */ (function (_super) {
    __extends(MoreViewListItem, _super);
    function MoreViewListItem() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.more.MoreItemUI();
        _this.addChild(_this.ui);
        _this.addEvents();
        return _this;
    }
    Object.defineProperty(MoreViewListItem.prototype, "dataSource", {
        set: function (value) {
            if (value) {
                this._vo = value;
                this.ui.imgAppIcon.skin = this._vo.avatarUrl;
                this.ui.lblNickname.changeText(this._vo.nickName);
                this.ui.lblItemNum.changeText(MathUtils.bytesToSize(this._vo.itemNum));
                this.updateBtnStatus();
            }
        },
        enumerable: true,
        configurable: true
    });
    MoreViewListItem.prototype.updateBtnStatus = function () {
        this.ui.btnTry.visible = this._vo.completeStatus === MoreQuestCompleteStatus.NOT_YET_PLAY;
        this.ui.btnStartGame.visible = this._vo.completeStatus === MoreQuestCompleteStatus.PLAYING;
        this.ui.btnObtain.visible = this._vo.completeStatus === MoreQuestCompleteStatus.COMPLETE_PLAY;
        this.ui.imgObtained.visible = this._vo.completeStatus === MoreQuestCompleteStatus.AWARD_OBTAINED;
    };
    MoreViewListItem.prototype.addEvents = function () {
        var e = Laya.Event.CLICK;
        this.ui.btnTry.on(e, this, this.naviToApp);
        this.ui.btnStartGame.on(e, this, this.naviToApp);
        this.ui.btnObtain.on(e, this, this.requestsMoreQuestAward);
    };
    MoreViewListItem.prototype.naviToApp = function () {
        if (platform) {
            platform.navigateToMiniProgram(null);
        }
    };
    MoreViewListItem.prototype.requestsMoreQuestAward = function () {
        // 请求奖励
    };
    return MoreViewListItem;
}(Laya.Component));
//# sourceMappingURL=MoreViewListItem.js.map