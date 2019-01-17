/*
* 离线奖励;
*/
class OfflineRewardsView extends BaseView {
    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.common.view.OfflineRewardsViewUI);
        this._price = 0;
    }
    //初始化
    initData() {
        super.initData();
        let self = this;
        self.ui.btnShare.visible = false;
        self._price = self.datas[0];
        self.ui.txtMoney.text = "金币+" + MathUtils.bytesToSize(self._price);
    }
    addEvents() {
        super.addEvents();
        let self = this;
        self.ui.btnVideo.on(Laya.Event.CLICK, self, self.onVideoHandler);
        self.ui.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    removeEvents() {
        super.removeEvents();
        let self = this;
        self.ui.btnVideo.off(Laya.Event.CLICK, self, self.onVideoHandler);
        self.ui.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    onVideoHandler() {
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
    onCloseHandler() {
        ViewMgr.Ins.close(ViewConst.OfflineRewardsView);
    }
    close(...param) {
        super.close(param);
        let self = this;
        if (self.ui.btnVideo.visible) {
            M.layer.screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
            MessageUtils.showMsgTips("获得金币:" + MathUtils.bytesToSize(self._price));
        }
        EventsManager.Instance.event(EventsType.GOLD_CHANGE, { money: M.player.Info.userMoney + self._price });
    }
}
//# sourceMappingURL=OfflineRewardsView.js.map