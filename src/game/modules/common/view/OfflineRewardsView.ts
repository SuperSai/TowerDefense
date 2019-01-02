/*
* 离线奖励;
*/
class OfflineRewardsView extends ui.common.view.OfflineRewardsViewUI {

    private _data: any[];
    private _tween: Laya.Tween;
    private _price: number = 0;

    constructor(data: any[] = null) {
        super();
        this._data = data;
        this.init();
    }

    //新建并添加到节点
    static Create(_parentNode: Laya.Node, _removeCallback: any = null, ...arge): void {
        if (_parentNode) {
            let nodeView = new OfflineRewardsView(arge);
            AlignUtils.setToScreenGoldenPos(nodeView);
            M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeView);
            nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
        }
    }

    //初始化
    private init(): void {
        let self = this;
        self.btnShare.visible = false;
        self._price = self._data[0];
        self.txtMoney.text = "金币+" + MathUtils.bytesToSize(self._price);
        self._tween = EffectUtils.objectRotate(self.lightImg);
        self.addEvents();
    }

    private addEvents(): void {
        let self = this;
        self.btnVideo.on(Laya.Event.CLICK, self, self.onVideoHandler);
        self.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private removeEvents(): void {
        let self = this;
        self.btnVideo.off(Laya.Event.CLICK, self, self.onVideoHandler);
        self.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private onVideoHandler(): void {
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

    private onCloseHandler(): void {
        let self = this;
        if (self.btnVideo.visible) {
            M.layer.screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
            MessageUtils.showMsgTips("获得金币:" + MathUtils.bytesToSize(self._price));
        }
        self.removeView();
    }

    public removeView(): void {
        let self = this;
        self._tween && (Laya.Tween.clear(self._tween));
        self._tween = null;
        self.removeSelf();
        self.removeEvents();
        EventsManager.Instance.event(EventsType.GLOD_CHANGE, { money: M.player.Info.userMoney + self._price });
    }
}