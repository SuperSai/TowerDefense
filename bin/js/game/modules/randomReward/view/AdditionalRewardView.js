/*
* 额外奖励界面;
*/
class AdditionalRewardView extends ui.randomReward.AdditionalRewardViewUI {
    constructor(data) {
        super();
        this._data = data;
        this.addEvetns();
        this.init();
    }
    //新建并添加到节点
    static Create(_parentNode, data) {
        let resList = [
            { url: "res/atlas/images/randomReward.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                let nodeView = new AdditionalRewardView(data);
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeView);
                // nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
            }
        }));
    }
    //初始化
    init() {
        let self = this;
        self._tween = EffectUtils.objectRotate(self.imgLight);
        self.txt_count.text = "x" + self._data.diamond;
    }
    addEvetns() {
        let self = this;
        self.btn_get.on(Laya.Event.CLICK, self, self.onGetReward);
    }
    removeEvents() {
        let self = this;
        self.btn_get.off(Laya.Event.CLICK, self, self.onGetReward);
    }
    /** 领取奖励 */
    onGetReward() {
        let self = this;
        userData.toShareAd(() => {
            HttpManager.Instance.requestRandomRewardDiamond(self._data.diamond, (res) => {
                self.removeView();
                let point = PointUtils.localToGlobal(self.btn_get);
                M.layer.screenEffectLayer.addChild(new FlyEffect().play("diamond", point.x, point.y, 38, 73));
                EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: userData.diamond = res.total_diamond });
                MessageUtils.showMsgTips("获得钻石:" + self._data.diamond);
            });
        });
    }
    removeView() {
        let self = this;
        self._tween && (Laya.Tween.clear(self._tween));
        self._tween = null;
        self.removeSelf();
        self.removeEvents();
    }
}
//# sourceMappingURL=AdditionalRewardView.js.map