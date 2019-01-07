/*
* 福利界面;
*/
class WelfareView extends BaseView {


    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.welfare.WelfareViewUI);
        this.setResources(["welfare"]);
    }

    public initUI(): void {
        super.initUI();
        if (userData.isShowEveryDayRewardRedPoint()) {
            this.ui.btn_get.label = "领取";
            this.ui.btn_get.disabled = false;
        } else {
            this.ui.btn_get.label = "已领取";
            this.ui.btn_get.disabled = true;
        }
    }

    public addEvents(): void {
        super.addEvents();
        this.ui.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_exit.on(Laya.Event.CLICK, this, this.onCloseView);
    }

    public removeEvents(): void {
        super.removeEvents();
        this.ui.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_exit.off(Laya.Event.CLICK, this, this.onCloseView);
    }

    private onGetReward(): void {
        let self = this;
        if (PlayerManager.Instance.Info.isMySceneEnter && userData.isShowEveryDayRewardRedPoint()) {
            HttpManager.Instance.requestWelfareReward((res) => {
                if (res.result) {
                    self.onCloseView();
                    userData.removeEveryDayRewardRedPoint();
                    ViewMgr.Ins.open(ViewConst.RewardGetView, () => {
                        M.layer.screenEffectLayer.addChild(new FlyEffect().play("diamond", LayerManager.mouseX, LayerManager.mouseY));
                        EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: M.player.Info.userDiamond += res.diamond });
                        M.player.Info.userEssence += res.essence;
                        HallManager.Instance.updateEssence(M.player.Info.userEssence);
                    }, [res.diamond, res.essence], [2, 3]);
                } else {
                    console.log("@David 领取福利奖励失败...");
                }
            });
        } else {
            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.39"));
        }
    }

    private onCloseView(): void {
        ViewMgr.Ins.close(ViewConst.WelfareView);
    }
}