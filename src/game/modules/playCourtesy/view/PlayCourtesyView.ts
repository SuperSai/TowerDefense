/*
* 试玩有礼界面;
*/
class PlayCourtesyView extends BaseView {

    constructor() {
        super(M.layer.subFrameLayer, ui.playCourtesy.PlayCourtesyViewUI);
        this.setResources(["playCourtesy"]);
    }

    public initUI(): void {
        super.initUI();
        this.ui.txt_uid.text = "UID: " + userData.userId;
        this.ui.list.itemRender = SmallItem;
        this.ui.list.vScrollBarSkin = "";
        this.ui.list.optimizeScrollRect = true;
        this.ui.list.visible = false;

        this.ui.list_extension.itemRender = ExtensionItem;
        this.ui.list_extension.vScrollBarSkin = "";
        this.ui.list_extension.optimizeScrollRect = true;

        HttpManager.Instance.requestPlayCourtesy((res) => {
            if (res.result && res.data) {
                this.ui.list.visible = true;
                this.ui.list_extension.array = res.data.top;
                this.ui.list.array = res.data.list;
            } else {
                console.log("@David 拉取积分墙数据失败", res);
            }
        });
    }

    public addEvents(): void {
        super.addEvents();
        this.ui.btnExit.on(Laya.Event.CLICK, this, this.onClickExit);
        this.ui.btn_change.on(Laya.Event.CLICK, this, this.onChangeGame);
        this.ui.btnCustomService.on(Laya.Event.CLICK, this, this.onCustomService);
        this.ui.btnSoundOpend.on(Laya.Event.CLICK, this, this.onSwitchMute);
        this.ui.btnSoundClosed.on(Laya.Event.CLICK, this, this.onSwitchMute);
    }

    public removeEvents(): void {
        super.removeEvents();
        this.ui.btnExit.off(Laya.Event.CLICK, this, this.onClickExit);
        this.ui.btn_change.off(Laya.Event.CLICK, this, this.onChangeGame);
        this.ui.btnCustomService.off(Laya.Event.CLICK, this, this.onCustomService);
        this.ui.btnSoundOpend.off(Laya.Event.CLICK, this, this.onSwitchMute);
        this.ui.btnSoundClosed.off(Laya.Event.CLICK, this, this.onSwitchMute);
    }

    /** 更换一批游戏 */
    private onChangeGame(): void {
        MessageUtils.showMsgTips("好玩游戏正在准备中...请客官稍等！");
    }

    private onSwitchMute() {
        M.more.switchMute();
        this.updateMuteImg();
    }

    private updateMuteImg(): void {
        this.ui.btnSoundOpend.visible = !M.more.model.mute;
        this.ui.btnSoundClosed.visible = M.more.model.mute;
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

    private onClickExit(): void {
        M.hall.resolveMoreRedPoint();
        ViewMgr.Ins.close(ViewConst.PlayCourtesyView);
    }
}