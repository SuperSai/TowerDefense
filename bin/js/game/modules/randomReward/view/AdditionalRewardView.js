/*
* 额外奖励界面;
*/
class AdditionalRewardView extends BaseView {
    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.randomReward.AdditionalRewardViewUI);
        this.setResources(["randomReward"]);
    }
    //初始化
    initUI() {
        super.initUI();
        let self = this;
        self._tween = EffectUtils.objectRotate(self.ui.imgLight);
    }
    initData() {
        super.initData();
        let self = this;
        self.ui.txt_count.text = "x" + self.datas[0].diamond;
    }
    addEvents() {
        super.addEvents();
        let self = this;
        self.ui.btn_get.on(Laya.Event.CLICK, self, self.onGetReward);
    }
    removeEvents() {
        super.removeEvents();
        let self = this;
        self.ui.btn_get.off(Laya.Event.CLICK, self, self.onGetReward);
    }
    /** 领取奖励 */
    onGetReward() {
        let self = this;
        userData.toShareAd(() => {
            HttpManager.Instance.requestRandomRewardDiamond(Number(self.datas[0].diamond), (res) => {
                self.removeView();
                let point = PointUtils.localToGlobal(self.ui.btn_get);
                M.layer.screenEffectLayer.addChild(new FlyEffect().play("diamond", point.x, point.y, 38, 73));
                EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: userData.diamond = res.total_diamond });
                MessageUtils.showMsgTips("获得钻石:" + self.datas[0].diamond);
            });
        });
    }
    removeView() {
        let self = this;
        self._tween && (Laya.Tween.clear(self._tween));
        self._tween = null;
        ViewMgr.Ins.close(ViewConst.AdditionalRewardView);
    }
}
//# sourceMappingURL=AdditionalRewardView.js.map