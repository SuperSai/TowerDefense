class MoreViewListItem extends Laya.Component {
    constructor() {
        super();
        this.ui = new ui.more.MoreItemUI();
        this.addChild(this.ui);
        this.addEvents();
    }
    set dataSource(value) {
        if (value) {
            this._vo = value;
            this.ui.imgAppIcon.skin = this._vo.avatarUrl;
            this.ui.lblNickname.changeText(this._vo.nickName);
            this.ui.lblItemNum.changeText(MathUtils.bytesToSize(this._vo.itemNum));
            this.updateBtnStatus();
        }
    }
    updateBtnStatus() {
        this.ui.btnTry.visible = this._vo.completeStatus === MoreQuestCompleteStatus.NOT_YET_PLAY;
        this.ui.btnStartGame.visible = this._vo.completeStatus === MoreQuestCompleteStatus.PLAYING;
        this.ui.btnObtain.visible = this._vo.completeStatus === MoreQuestCompleteStatus.COMPLETE_PLAY;
        this.ui.imgObtained.visible = this._vo.completeStatus === MoreQuestCompleteStatus.AWARD_OBTAINED;
    }
    addEvents() {
        const e = Laya.Event.CLICK;
        this.ui.btnTry.on(e, this, this.naviToApp);
        this.ui.btnStartGame.on(e, this, this.naviToApp);
        this.ui.btnObtain.on(e, this, this.requestsMoreQuestAward);
    }
    naviToApp() {
        if (platform) {
            platform.navigateToMiniProgram(null);
        }
    }
    requestsMoreQuestAward() {
        // 请求奖励
    }
}
//# sourceMappingURL=MoreViewListItem.js.map