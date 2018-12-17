/*
* 金币不足奖励提示框;
*/
class RewardGoldView extends ui.common.view.RewardGoldViewUI {
    private _data: any[];
    private _money: number;
    private _callback: Function;

    constructor(data: any[] = null, callback: Function = null) {
        super();
        this._data = data;
        this._callback = callback;
        this.init();
    }

    //新建并添加到节点
    static Create(_parentNode: Laya.Node, callback: any = null, _removeCallback: any = null, ...arge): void {
        let resList = [
            { url: "res/atlas/images/rewardGold.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                let nodeView = new RewardGoldView(arge, callback);
                AlignUtils.setToScreenGoldenPos(nodeView);
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    }

    //初始化
    private init(): void {
        let self = this;
        SDKManager.Instance.showBannerAd(true);
        self.txt_share.visible = PlayerManager.Instance.Info.dayGetGoldCount != 6 && PlayerManager.Instance.Info.dayGetGoldCount != 2;
        self.advBox.visible = !self.txt_share.visible;
        self.txt_lastCount.text = "今天剩余" + PlayerManager.Instance.Info.dayGetGoldCount + "次";
        let monsterType: number = userData.isEvolution() ? 2 : 1;
        let monsterLevel: number = userData.getCarLevel();
        let monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, monsterLevel);
        if (monsterInfo) {
            let curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
            self._money = curPrice * 0.8;
        } else {
            console.log("精灵不存在");
        }
        self.txt_gold.text = MathUtils.bytesToSize(self._money);
        self.addEvents();
    }

    private addEvents(): void {
        let self = this;
        self.btn_free.on(Laya.Event.CLICK, self, self.onClickBtn);
        self.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private removeEvents(): void {
        let self = this;
        self.btn_free.off(Laya.Event.CLICK, self, self.onClickBtn);
        self.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private onClickBtn(): void {
        let self = this;
        if (GlobalConfig.DEBUG) {
            if (self._callback) self._callback(self._money);
        } else {
            if (self.txt_share.visible) {
                userData.toShareAd(() => {
                    if (self._callback) self._callback(self._money);
                });
            } else if (self.advBox.visible) {
                let adStage = userData.toShareAd(() => {
                    if (self._callback) self._callback(self._money);
                }, 12);
                //没有广告就走分享
                if (adStage > 0) {
                    MessageUtils.showMsgTips("广告看完了")
                    userData.toShareAd(() => {
                        if (self._callback) self._callback(self._money);
                    });
                }
            }
        }
        self.onCloseHandler();
    }

    private onCloseHandler(): void {
        let self = this;
        self.removeSelf();
        self.removeEvents();
    }
}