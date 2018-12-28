/*
* 福利界面;
*/
class WelfareView extends BaseView {

    private _view: ui.welfare.WelfareViewUI;

    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.welfare.WelfareViewUI);
        this.setResources(["welfare"]);
        this._view = this.ui;
    }

    public initUI(): void {
        super.initUI();
        if (userData.isShowEveryDayRewardRedPoint()) {
            this._view.btn_get.label = "领取";
            this._view.btn_get.disabled = false;
        } else {
            this._view.btn_get.label = "已领取";
            this._view.btn_get.disabled = true;
        }
    }

    public addEvents(): void {
        super.addEvents();
        this._view.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
        this._view.btn_exit.on(Laya.Event.CLICK, this, this.onCloseView);
    }

    public removeEvents(): void {
        super.removeEvents();
        this._view.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
        this._view.btn_exit.off(Laya.Event.CLICK, this, this.onCloseView);
    }

    private onGetReward(): void {
        let self = this;
        if (PlayerManager.Instance.Info.isMySceneEnter && userData.isShowEveryDayRewardRedPoint()) {
            HttpManager.Instance.requestWelfareReward((res) => {
                let diamond: number = res.diamond;
                RewardGetView.Create(self, () => {
                    M.layer.screenEffectLayer.addChild(new FlyEffect().play("diamond", LayerManager.mouseX, LayerManager.mouseY));
                    EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: userData.diamond = diamond });
                }, [diamond, res.essence], [2, 3]);
            });
        } else {
            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.39"));
        }
    }

    private onCloseView(): void {
        ViewMgr.Ins.close(ViewConst.WelfareView);
    }
}