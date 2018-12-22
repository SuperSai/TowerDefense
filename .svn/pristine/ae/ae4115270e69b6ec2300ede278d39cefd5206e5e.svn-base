/*
* 通关获得奖励提示框;
*/
class ClearanceRewardView extends ui.settlement.ClearanceRewardViewUI {
    constructor(data = null, callback = null) {
        super();
        this._data = data;
        this._callback = callback;
        this.init();
    }
    //新建并添加到节点
    static Create(_parentNode, callback = null, _removeCallback = null, ...arge) {
        let resList = [
            { url: "res/atlas/images/ClearanceReward.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                let nodeView = new ClearanceRewardView(arge, callback);
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
            }
        }));
    }
    //初始化
    init() {
        let self = this;
        //关卡
        self.txtStage.text = self._data[0] + "";
        //当前奖励物品
        let stagePrizeCfg = GlobleData.getData(GlobleData.BarrierRewardVO, self._data[0]);
        if (stagePrizeCfg == null) {
            return;
        }
        let bossM = MathUtils.parseStringNum(stagePrizeCfg.bossM);
        let gold = BattleManager.Instance.getBarrierRewardToGold(self._data[0], MathUtils.parseStringNum(stagePrizeCfg.gold));
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
            self.hbox.addChild(rewardItem);
        }
        self._tween = EffectUtils.objectRotate(self.lightImg);
        self.addEvents();
    }
    addEvents() {
        let self = this;
        self.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    removeEvents() {
        let self = this;
        self.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    onCloseHandler() {
        let self = this;
        let rewardItem = self.hbox.getChildAt(0);
        if (rewardItem) {
            let pos = PointUtils.localToGlobal(rewardItem);
            LayerManager.getInstance().screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", pos.x, pos.y));
        }
        else {
            LayerManager.getInstance().screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
        }
        DisplayUtils.removeAllChildren(self.hbox);
        self.removeSelf();
    }
    removeView() {
        let self = this;
        if (self._tween)
            Laya.Tween.clear(self._tween);
        self.removeSelf();
        self.removeEvents();
    }
}
//# sourceMappingURL=ClearanceRewardView.js.map