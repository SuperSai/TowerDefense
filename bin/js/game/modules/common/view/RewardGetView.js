/*
* 奖励领取界面;
*/
class RewardGetView extends BaseView {
    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.common.view.RewardGetViewUI);
    }
    initData() {
        super.initData();
        let self = this;
        self._tween = EffectUtils.objectRotate(self.ui.imgLight);
        for (let index = 0, len = self.datas[0].length; index < len; index++) {
            let price = self.datas[0][index];
            let itemInfo = GlobleData.getData(GlobleData.ItemVO, self.datas[1][index]);
            let rewardItem = ObjectPool.pop(RewardItem, "RewardItem");
            let url = PathConfig.ItemUrl.replace("{0}", itemInfo.bigIcon);
            rewardItem.create(url, price);
            self.ui.hbox.addChild(rewardItem);
        }
        self.ui.hbox.refresh();
    }
    addEvents() {
        super.addEvents();
        let self = this;
        self.ui.btn_get.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    removeEvents() {
        super.removeEvents();
        let self = this;
        self.ui.btn_get.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    onCloseHandler() {
        ViewMgr.Ins.close(ViewConst.RewardGetView);
    }
    close(...param) {
        super.close(param);
        let self = this;
        self.ui.hbox.removeChildren();
        self._tween && (Laya.Tween.clear(self._tween));
        self._tween = null;
        self.callback && self.callback();
    }
}
//# sourceMappingURL=RewardGetView.js.map