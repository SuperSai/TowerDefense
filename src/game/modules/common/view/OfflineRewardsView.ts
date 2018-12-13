/*
* 离线奖励;
*/
class OfflineRewardsView extends ui.common.view.OfflineRewardsViewUI {

    private _data: any[];
    private _money: number;
    private _callback: Function;
    private _tween: Laya.Tween;

    constructor(data: any[] = null, callback: Function = null) {
        super();
        this._data = data;
        this._callback = callback;
        this.init();
    }

    //新建并添加到节点
    static Create(_parentNode: Laya.Node, callback: any = null, _removeCallback: any = null, ...arge): void {
        let resList = [
            { url: "res/atlas/images.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                let nodeView = new OfflineRewardsView(arge, callback);
                AlignUtils.setToScreenGoldenPos(nodeView);
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    }

    //初始化
    private init(): void {
        let self = this;
        self.btnShare.visible = false;
        self.txtMoney.text = "金币+" + MathUtils.bytesToSize(self._data[0]);
        self._tween = EffectUtils.objectRotate(self.lightImg);
        self.addEvents();
    }

    private addEvents(): void {
        let self = this;
        // self.btnShare.on(Laya.Event.CLICK, self, self.onShareHandler);
        self.btnVideo.on(Laya.Event.CLICK, self, self.onVideoHandler);
        self.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private removeEvents(): void {
        let self = this;
        // self.btnShare.off(Laya.Event.CLICK, self, self.onShareHandler);
        self.btnVideo.off(Laya.Event.CLICK, self, self.onVideoHandler);
        self.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private onShareHandler(): void {
        let self = this;
    }

    private onVideoHandler(): void {
        let self = this;
        //显示广告
        userData.toShareAd(() => {
            self.txtMoney.text = "金币+" + MathUtils.bytesToSize(self._data[0] * 2);
            self.btnVideo.visible = false;
            M.layer.screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
            CommonFun.showTip("获得金币:" + MathUtils.bytesToSize(self._data[0] * 2));
        }, 1);
    }

    private onCloseHandler(): void {
        let self = this;
        if (self.btnVideo.visible) {
            M.layer.screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
            CommonFun.showTip("获得金币:" + MathUtils.bytesToSize(self._data[0]));
        }
        self.removeView();
    }

    public removeView(): void {
        let self = this;
        self._tween && (Laya.Tween.clear(self._tween));
        self._tween = null;
        self.removeSelf();
        self.removeEvents();
    }
}