/*
* 福利界面;
*/
class WelfareView extends BaseView {
    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.welfare.WelfareViewUI);
        this.setResources(["welfare"]);
    }
    initUI() {
        super.initUI();
        if (userData.isShowEveryDayRewardRedPoint()) {
            this.ui.btn_get.label = "领取";
            this.ui.btn_get.disabled = false;
        }
        else {
            this.ui.btn_get.label = "已领取";
            this.ui.btn_get.disabled = true;
        }
    }
    addEvents() {
        super.addEvents();
        this.ui.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_exit.on(Laya.Event.CLICK, this, this.onCloseView);
    }
    removeEvents() {
        super.removeEvents();
        this.ui.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
        this.ui.btn_exit.off(Laya.Event.CLICK, this, this.onCloseView);
    }
    onGetReward() {
        let self = this;
        if (PlayerManager.Instance.Info.isMySceneEnter && userData.isShowEveryDayRewardRedPoint()) {
            HttpManager.Instance.requestWelfareReward((res) => {
                if (res.result) {
                    self.onCloseView();
                    userData.removeEveryDayRewardRedPoint();
                    ViewMgr.Ins.open(ViewConst.RewardGetView, () => {
                        M.layer.screenEffectLayer.addChild(new FlyEffect().play("diamond", LayerManager.mouseX, LayerManager.mouseY));
                        EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: userData.diamond += res.diamond });
                        userData.essence += res.essence;
                        HallManager.Instance.updateEssence(userData.essence);
                    }, [res.diamond, res.essence], [2, 3]);
                }
                else {
                    console.log("@David 领取福利奖励失败...");
                }
            });
        }
        else {
            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.39"));
        }
    }
    onCloseView() {
        ViewMgr.Ins.close(ViewConst.WelfareView);
    }
}
//# sourceMappingURL=WelfareView.js.map