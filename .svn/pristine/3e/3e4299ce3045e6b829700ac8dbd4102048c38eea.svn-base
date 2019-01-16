/*
* 通关获得奖励提示框;
*/
class ClearanceRewardView extends BaseView {
    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.settlement.ClearanceRewardViewUI);
        this.setResources(["ClearanceReward"]);
    }
    //初始化
    initData() {
        super.initData();
        let self = this;
        //关卡
        self.ui.txtStage.text = self.datas[0] + "";
        //当前奖励物品
        let stagePrizeCfg = GlobleData.getData(GlobleData.BarrierRewardVO, self.datas[0]);
        if (stagePrizeCfg == null) {
            return;
        }
        let bossM = MathUtils.parseStringNum(stagePrizeCfg.bossM);
        let gold = BattleManager.Instance.getBarrierRewardToGold(self.datas[0], MathUtils.parseStringNum(stagePrizeCfg.gold));
        gold = self.datas[1] == true ? gold * 2 : gold;
        let gem = MathUtils.parseStringNum(stagePrizeCfg.gem);
        let itemArray = [
            { img: "images/ClearanceReward/result_prize_item2.png", value: gold },
            { img: "images/ClearanceReward/result_prize_item3.png", value: gem },
            { img: "images/ClearanceReward/result_prize_item4.png", value: bossM }
        ];
        for (var index = 0, len = itemArray.length; index < len; index++) {
            let cfgData = itemArray[index];
            let rewardItem = ObjectPool.pop(RewardItem, "RewardItem");
            rewardItem.create(cfgData.img, cfgData.value);
            self.ui.hbox.addChild(rewardItem);
        }
    }
    addEvents() {
        super.addEvents();
        let self = this;
        self.ui.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    removeEvents() {
        super.removeEvents();
        let self = this;
        self.ui.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    onCloseHandler() {
        let self = this;
        let rewardItem = self.ui.hbox.getChildAt(0);
        if (rewardItem) {
            let pos = PointUtils.localToGlobal(rewardItem);
            LayerManager.getInstance().screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", pos.x, pos.y));
        }
        else {
            LayerManager.getInstance().screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
        }
        ViewMgr.Ins.close(ViewConst.ClearanceRewardView);
    }
    close(...param) {
        super.close(param);
        let self = this;
        DisplayUtils.removeAllChildren(self.ui.hbox);
        self.callback && self.callback();
    }
}
//# sourceMappingURL=ClearanceRewardView.js.map