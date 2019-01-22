
class MoreView extends Laya.Component {
    public ui: ui.more.MoreViewUI;

    private _controller: MoreController;
    private _model: MoreModel;

    constructor(controller: MoreController, model: MoreModel) {
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

    private initList() {
        this.ui.listMoreItem.itemRender = MoreViewListItem;
        this.ui.listMoreItem.vScrollBarSkin = "";
        this.ui.listMoreItem.optimizeScrollRect = true;
        this.ui.txt_uid.text = "UID: " + userData.userId;

        this.ui.lblNoneGameTips.visible = !0;
        this.ui.listMoreItem.visible = true;
    }

    private addEvents() {
        this.ui.btnCustomService.on(Laya.Event.CLICK, this, this.onCustomService);
        this.ui.btnSoundOpend.on(Laya.Event.CLICK, this, this.onSwitchMute);
        this.ui.btnSoundClosed.on(Laya.Event.CLICK, this, this.onSwitchMute);
        this.ui.imgClose.on(Laya.Event.CLICK, this, this.removeSelf);

        this._controller.on(MoreEvent.QUEST_MARKET_QUEST_LIST, this, this.__onQuestMarketQuestList);
    }

    private __onQuestMarketQuestList(list:WXQuestMarketQuest[]){
        this.ui.lblNoneGameTips.visible = !(list && list.length > 0);
        this.ui.listMoreItem.array = list;
    }

    private onSwitchMute() {
        this._controller.switchMute();
        this.updateMuteImg();
    }

    private updateMuteImg(): void {
        this.ui.btnSoundOpend.visible = !this._model.mute;
        this.ui.btnSoundClosed.visible = this._model.mute;
    }

    private onCustomService() {
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

    public removeSelf():Laya.Node{
        M.hall.resolveMoreRedPoint();
        return super.removeSelf();
    }
}