/*
* 金币不足奖励提示框;
*/
class RewardGoldView extends BaseView {

    private _money: number;

    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.common.view.RewardGoldViewUI);
        this.setResources(["rewardGold"]);
    }

    //初始化
    public initUI(): void {
        super.initUI();
        let self = this;
        SDKManager.Instance.showBannerAd(true);
        self.ui.txt_share.visible = false;
        self.ui.advBox.visible = !self.ui.txt_share.visible;
        self.ui.txt_lastCount.text = "今天剩余" + PlayerManager.Instance.Info.dayGetGoldCount + "次";
        let monsterType: number = userData.isEvolution() ? 2 : 1;
        let monsterLevel: number = userData.getCarLevel();
        let monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, monsterLevel);
        if (monsterInfo) {
            let curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
            self._money = curPrice * 0.8;
        }
        self.ui.txt_gold.text = MathUtils.bytesToSize(self._money);
    }

    public addEvents(): void {
        super.addEvents();
        let self = this;
        self.ui.btn_free.on(Laya.Event.CLICK, self, self.onClickBtn);
        self.ui.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    public removeEvents(): void {
        super.removeEvents();
        let self = this;
        self.ui.btn_free.off(Laya.Event.CLICK, self, self.onClickBtn);
        self.ui.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private onClickBtn(): void {
        let self = this;
        if (GlobalConfig.DEBUG) {
            self.onComplete();
        } else {
            let adStage = userData.toShareAd(() => {
                self.onComplete();
            }, 12);
            if (adStage > 0) {
                MessageUtils.showMsgTips("今日广告已经观看完毕!");
                ViewMgr.Ins.open(ViewConst.FriendConcurView);
            }
        }
        self.onCloseHandler();
    }

    private onComplete(): void {
        PlayerManager.Instance.Info.dayGetGoldCount--;
        EventsManager.Instance.event(EventsType.GLOD_CHANGE, { money: userData.gold += this._money });
    }

    private onCloseHandler(): void {
        ViewMgr.Ins.close(ViewConst.RewardGoldView);
    }
}