class MoreViewListItem extends Laya.Component {

    public ui: ui.more.MoreItemUI;
    private _vo: MoreViewListItemVO;

    constructor() {
        super();
        this.ui = new ui.more.MoreItemUI();
        this.addChild(this.ui);

        this.addEvents();
    }

    public set dataSource(value: any) {
        if (value) {
            this._vo = value;

            this.ui.imgAppIcon.skin = this._vo.avatarUrl;
            this.ui.lblNickname.changeText(this._vo.nickName);
            this.ui.lblItemNum.changeText(MathUtils.bytesToSize(this._vo.itemNum));
            this.updateBtnStatus();
        }
    }

    private updateBtnStatus(): void {
        this.ui.btnTry.visible = this._vo.completeStatus === MoreQuestCompleteStatus.NOT_YET_PLAY;
        this.ui.btnStartGame.visible = this._vo.completeStatus === MoreQuestCompleteStatus.PLAYING;
        this.ui.btnObtain.visible = this._vo.completeStatus === MoreQuestCompleteStatus.COMPLETE_PLAY;
        this.ui.imgObtained.visible = this._vo.completeStatus === MoreQuestCompleteStatus.AWARD_OBTAINED;
    }

    private addEvents() {
        const e: string = Laya.Event.CLICK;
        this.ui.btnTry.on(e, this, this.naviToApp);
        this.ui.btnStartGame.on(e, this, this.naviToApp);
        this.ui.btnObtain.on(e, this, this.requestsMoreQuestAward);
    }

    private naviToApp() {
        if (platform) {
            platform.navigateToMiniProgram(null);
        }
    }

    private requestsMoreQuestAward() {
        // 请求奖励
    }
}