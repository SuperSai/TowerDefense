/*
* 奖励领取界面;
*/
class RewardGetView extends ui.common.view.RewardGetViewUI {
    constructor(values, items) {
        super();
        this._items = [1, 2];
        this._values = values;
        this._items = items;
        this.init();
    }
    //新建并添加到节点
    static Create(_parentNode, callback = null, values, items = [1, 2]) {
        let resList = [
            { url: "res/atlas/images.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                let nodeView = new RewardGetView(values, items);
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, () => {
                    callback && callback();
                    nodeView.removeView();
                });
            }
        }));
    }
    //初始化
    init() {
        let self = this;
        self._tween = EffectUtils.objectRotate(self.imgLight);
        for (let index = 0, len = this._values.length; index < len; index++) {
            let price = this._values[index];
            let itemInfo = GlobleData.getData(GlobleData.ItemVO, self._items[index]);
            let rewardItem = ObjectPool.pop(RewardItem, "RewardItem");
            let url = PathConfig.ItemUrl.replace("{0}", itemInfo.bigIcon);
            rewardItem.create(url, price);
            self.hbox.addChild(rewardItem);
        }
        self.hbox.refresh();
        self.addEvents();
    }
    addEvents() {
        let self = this;
        self.btn_get.on(Laya.Event.CLICK, self, self.removeSelf);
    }
    removeEvents() {
        let self = this;
        self.btn_get.off(Laya.Event.CLICK, self, self.removeSelf);
    }
    removeView() {
        let self = this;
        self._tween && (Laya.Tween.clear(self._tween));
        self._tween = null;
        self.removeSelf();
        self.removeEvents();
    }
}
//# sourceMappingURL=RewardGetView.js.map