/*
* 成就奖励领取界面;
*/
class AchiRewardView extends BaseView {
    constructor() {
        super(M.layer.noteLayer, ui.task.AchiRewardViewUI, false);
        this._rewardName = "金币";
        this._awardNum = 0;
        this.myParent.maskEnabled = false;
        this.visible = false;
        this.y = LayerManager.stageDesignHeight - 350;
    }
    initUI() {
        super.initUI();
        this.x = LayerManager.stageDesignWidth;
        this.y = LayerManager.stageDesignHeight - 350;
        this.visible = true;
        Laya.Tween.to(this, { x: LayerManager.stageDesignWidth - this.width }, 500, null, Handler.create(this, () => {
            Laya.Tween.clearTween(this);
            TimerManager.Instance.doTimer(5000, 1, () => {
                Laya.Tween.to(this, { x: LayerManager.stageDesignWidth }, 500, null, Handler.create(this, () => {
                    Laya.Tween.clearTween(this);
                    this.visible = false;
                    ViewMgr.Ins.close(ViewConst.AchiRewardView);
                }));
            }, this);
        }));
    }
    initData() {
        super.initData();
        this._awardNum = this.datas[0].reward || 0;
        switch (this.datas[0].reward_type) {
            case "money":
                this._rewardName = "金币";
                this.ui.imgIcon.skin = "images/core/coin_40x40.png";
                this._awardNum = this.getGold() * this._awardNum;
                this.ui.txt_num.text = MathUtils.bytesToSize(this._awardNum);
                break;
            default:
                this._rewardName = "钻石";
                this.ui.imgIcon.skin = "images/core/diamond.png";
                this.ui.txt_num.text = this._awardNum + "";
                break;
        }
    }
    addEvents() {
        super.addEvents();
        this.on(Laya.Event.CLICK, this, this.onGetReward);
    }
    removeEvents() {
        super.removeEvents();
        this.off(Laya.Event.CLICK, this, this.onGetReward);
    }
    onGetReward() {
        this.off(Laya.Event.CLICK, this, this.onGetReward);
        HttpManager.Instance.requestTaskReward(this.datas[0].id, (res) => {
            if (res) {
                if (res.code == 1) {
                    ViewMgr.Ins.close(ViewConst.AchiRewardView);
                    if (res.reward_type == "diamond") {
                        MessageUtils.showMsgTips("成就奖励:钻石" + "x" + this._awardNum);
                        let point = PointUtils.localToGlobal(this.ui.imgIcon);
                        M.layer.screenEffectLayer.addChild(new FlyEffect().play("diamond", point.x, point.y));
                        EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: M.player.Info.userDiamond = res.sum });
                    }
                    else if (res.reward_type == "money") {
                        MessageUtils.showMsgTips("成就奖励:金币" + "x" + MathUtils.bytesToSize(this._awardNum));
                        let point = PointUtils.localToGlobal(this.ui.imgIcon);
                        M.layer.screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", point.x, point.y));
                        EventsManager.Instance.event(EventsType.GOLD_CHANGE, { money: M.player.Info.userMoney += this._awardNum });
                    }
                    else if (res.reward_type == "essence") {
                        MessageUtils.showMsgTips("成就奖励:精华" + "x" + MathUtils.bytesToSize(this._awardNum));
                        M.player.Info.userEssence = res.sum;
                    }
                }
                else if (res.code === 2) {
                    ViewMgr.Ins.close(ViewConst.AchiRewardView);
                    MessageUtils.showMsgTips("成就奖励领取失败！");
                }
            }
        }, 2);
    }
    getGold() {
        let stagePrizeCfg = GlobleData.getData(GlobleData.BarrierRewardVO, HallManager.Instance.hallData.passStage);
        if (stagePrizeCfg) {
            return BattleManager.Instance.getBarrierRewardToGold(HallManager.Instance.hallData.passStage, MathUtils.parseStringNum(stagePrizeCfg.gold));
        }
        return 0;
    }
}
//# sourceMappingURL=AchiRewardView.js.map