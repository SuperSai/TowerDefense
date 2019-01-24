/*
* 离线奖励;
*/
class OfflineRewardsView extends BaseView {

    private _price: number = 0;

    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.common.view.OfflineRewardsViewUI);
    }

    //初始化
    public initData(): void {
        super.initData();
        let self = this;
        self.ui.btnShare.visible = false;
        self._price = self.datas[0];
        self.ui.txtMoney.text = "金币+" + MathUtils.bytesToSize(self._price);
        this.timerOnce(2000, this, () => {
            this.ui.btnExit.visible = true;
        })
    }

    public addEvents(): void {
        super.addEvents();
        let self = this;
        self.ui.btnVideo.on(Laya.Event.CLICK, self, self.onVideoHandler);
        self.ui.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    public removeEvents(): void {
        super.removeEvents();
        let self = this;
        self.ui.btnVideo.off(Laya.Event.CLICK, self, self.onVideoHandler);
        self.ui.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private onVideoHandler(): void {
        let self = this;
        //显示广告
        userData.toShareAd(() => {
            self._price = self._price * 8;
            self.ui.txtMoney.text = "金币+" + MathUtils.bytesToSize(self._price);
            self.ui.btnVideo.visible = false;
            M.layer.screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
            MessageUtils.showMsgTips("获得金币:" + MathUtils.bytesToSize(self._price));
        }, 1);
    }

    private onCloseHandler(): void {
        ViewMgr.Ins.close(ViewConst.OfflineRewardsView);
    }

    public close(...param: any[]): void {
        super.close(param);
        let self = this;
        this.ui.btnExit.visible = false;
        if (self.ui.btnVideo && self.ui.btnVideo.visible == true) {
            M.layer.screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
            MessageUtils.showMsgTips("获得金币:" + MathUtils.bytesToSize(self._price));
        }
        EventsManager.Instance.event(EventsType.GOLD_CHANGE, { money: M.player.Info.userMoney += self._price });
    }
}