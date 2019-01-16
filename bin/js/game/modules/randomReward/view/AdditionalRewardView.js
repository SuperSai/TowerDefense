/*
* 额外奖励界面;
*/
class AdditionalRewardView extends BaseView {
    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.randomReward.AdditionalRewardViewUI);
        this.setResources(["randomReward"]);
    }
    initData() {
        super.initData();
        let self = this;
        self.isRemoveBanner = false;
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
                EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: M.player.Info.userDiamond = res.total_diamond });
                console.log("@David 随机奖励获得钻石:", res.total_diamond);
                MessageUtils.showMsgTips("获得钻石:" + self.datas[0].diamond);
            });
        });
    }
    removeView() {
        ViewMgr.Ins.close(ViewConst.AdditionalRewardView);
    }
}
//# sourceMappingURL=AdditionalRewardView.js.map