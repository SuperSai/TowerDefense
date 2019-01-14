/*
* 金币不足奖励提示框;
*/
class RewardGoldView extends BaseView {
    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.common.view.RewardGoldViewUI);
        this.setResources(["rewardGold"]);
    }
    //初始化
    initUI() {
        super.initUI();
        let self = this;
        SDKManager.Instance.showBannerAd();
        self.ui.txt_share.visible = false;
        self.ui.advBox.visible = !self.ui.txt_share.visible;
        self.ui.txt_lastCount.text = "今天剩余" + PlayerManager.Instance.Info.dayGetGoldCount + "次";
        let monsterType = userData.isEvolution() ? 2 : 1;
        let monsterLevel = userData.getCarLevel();
        let monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, monsterLevel);
        if (monsterInfo) {
            let curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
            self._money = curPrice * 5;
        }
        self.ui.txt_gold.text = MathUtils.bytesToSize(self._money);
    }
    addEvents() {
        super.addEvents();
        let self = this;
        self.ui.btn_free.on(Laya.Event.CLICK, self, self.onClickBtn);
        self.ui.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    removeEvents() {
        super.removeEvents();
        let self = this;
        self.ui.btn_free.off(Laya.Event.CLICK, self, self.onClickBtn);
        self.ui.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    onClickBtn() {
        let self = this;
        if (GlobalConfig.DEBUG) {
            self.onComplete();
        }
        else {
            if (userData.getAdTimes(12) > 0 && PlayerManager.Instance.Info.dayGetGoldCount > 0) {
                let adStage = userData.toShareAd(() => {
                    self.onComplete();
                }, 12);
                if (adStage > 0) {
                    MessageUtils.showMsgTips("今日广告已经观看完毕!");
                    ViewMgr.Ins.open(ViewConst.FriendConcurView);
                }
            }
            else {
                MessageUtils.showMsgTips("今日广告已经观看完毕!");
                ViewMgr.Ins.open(ViewConst.FriendConcurView);
            }
        }
        self.onCloseHandler();
    }
    onComplete() {
        PlayerManager.Instance.Info.dayGetGoldCount--;
        EventsManager.Instance.event(EventsType.GOLD_CHANGE, { money: M.player.Info.userMoney += this._money });
    }
    onCloseHandler() {
        ViewMgr.Ins.close(ViewConst.RewardGoldView);
    }
}
//# sourceMappingURL=RewardGoldView.js.map