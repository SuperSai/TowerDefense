/*
* 离线奖励;
*/
class OfflineRewardsView extends ui.common.view.OfflineRewardsViewUI {
    constructor(data = null) {
        super();
        this._price = 0;
        this._data = data;
        this.init();
    }
    //新建并添加到节点
    static Create(_parentNode, _removeCallback = null, ...arge) {
        if (_parentNode) {
            let nodeView = new OfflineRewardsView(arge);
            AlignUtils.setToScreenGoldenPos(nodeView);
            M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeView);
            nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
        }
    }
    //初始化
    init() {
        let self = this;
        self.btnShare.visible = false;
        self._price = self._data[0];
        self.txtMoney.text = "金币+" + MathUtils.bytesToSize(self._price);
        self._tween = EffectUtils.objectRotate(self.lightImg);
        self.addEvents();
    }
    addEvents() {
        let self = this;
        self.btnVideo.on(Laya.Event.CLICK, self, self.onVideoHandler);
        self.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    removeEvents() {
        let self = this;
        self.btnVideo.off(Laya.Event.CLICK, self, self.onVideoHandler);
        self.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    onVideoHandler() {
        let self = this;
        //显示广告
        userData.toShareAd(() => {
            self._price = self._price * 2;
            self.txtMoney.text = "金币+" + MathUtils.bytesToSize(self._price);
            self.btnVideo.visible = false;
            M.layer.screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
            MessageUtils.showMsgTips("获得金币:" + MathUtils.bytesToSize(self._price));
        }, 1);
    }
    onCloseHandler() {
        let self = this;
        if (self.btnVideo.visible) {
            M.layer.screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
            MessageUtils.showMsgTips("获得金币:" + MathUtils.bytesToSize(self._price));
        }
        self.removeView();
    }
    removeView() {
        let self = this;
        self._tween && (Laya.Tween.clear(self._tween));
        self._tween = null;
        self.removeSelf();
        self.removeEvents();
        EventsManager.Instance.event(EventsType.GLOD_CHANGE, { money: M.player.Info.userMoney + self._price });
    }
}
//# sourceMappingURL=OfflineRewardsView.js.map