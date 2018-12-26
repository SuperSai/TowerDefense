class MoreView extends Laya.Component {
    constructor(controller, model) {
        super();
        this._controller = controller;
        this._model = model;
        this.ui = new ui.more.MoreViewUI();
        this.updateMuteImg();
        this.size(this.ui.width, this.ui.height);
        this.addChild(this.ui);
        AlignUtils.setToScreenGoldenPos(this);
        this.initList();
        this.addEvents();
    }
    initList() {
        this.ui.listMoreItem.itemRender = MoreViewListItem;
        this.ui.listMoreItem.vScrollBarSkin = "";
        this.ui.listMoreItem.optimizeScrollRect = true;
        this.ui.txt_uid.text = "UID: " + userData.userId;
        const len = this._model.itemList.length;
        this.ui.lblNoneGameTips.visible = len <= 0;
        this.ui.listMoreItem.visible = len > 0;
        if (len) {
            this.ui.listMoreItem.array = this._model.itemList;
        }
    }
    addEvents() {
        this.ui.btnCustomService.on(Laya.Event.CLICK, this, this.onCustomService);
        this.ui.btnSoundOpend.on(Laya.Event.CLICK, this, this.onSwitchMute);
        this.ui.btnSoundClosed.on(Laya.Event.CLICK, this, this.onSwitchMute);
        this.ui.imgClose.on(Laya.Event.CLICK, this, this.removeSelf);
    }
    onSwitchMute() {
        this._controller.switchMute();
        this.updateMuteImg();
    }
    updateMuteImg() {
        this.ui.btnSoundOpend.visible = !this._model.mute;
        this.ui.btnSoundClosed.visible = this._model.mute;
    }
    onCustomService() {
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
    }
}
//# sourceMappingURL=MoreView.js.map