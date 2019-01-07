/*
* 钻石购买英雄界面;
*/
class DiamondBuyView extends BaseView {

    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.common.view.DiamondBuyViewUI);
    }

    //初始化
    public initUI(): void {
        super.initUI();
    }

    public initData(): void {
        super.initData();
        let self = this;
        switch (self.datas[0]) {
            case DILOG_TYPE.PET:
                self.ui.petTitleImg.visible = self.ui.imgMonster.visible = true;
                self.ui.accTitleImg.visible = self.ui.accIcon.visible = false;
                self.ui.imgMonster.skin = "images/carImg/" + self.datas[2].imgUrl;
                break;
            case DILOG_TYPE.ACC:
                SDKManager.Instance.showBannerAd();
                self.ui.petTitleImg.visible = self.ui.imgMonster.visible = false;
                self.ui.accTitleImg.visible = self.ui.accIcon.visible = true;
                break;
        }
        self.ui.txtDiamond.text = self.datas[1];
    }

    public addEvents(): void {
        super.addEvents();
        let self = this;
        self.ui.btnBuy.on(Laya.Event.CLICK, self, self.onBuyHandler);
        self.ui.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    public removeEvents(): void {
        super.removeEvents();
        let self = this;
        self.ui.btnBuy.off(Laya.Event.CLICK, self, self.onBuyHandler);
        self.ui.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private onBuyHandler(): void {
        let self = this;
        let carPriceInt = Math.floor(self.datas[1]);
        if (PlayerManager.Instance.Info.userDiamond >= carPriceInt) {
            HttpManager.Instance.requestDiamondBuyOrder(carPriceInt, (_res: any) => {
                if (_res) {
                    if (BattleManager.Instance.createPet(self.datas[2].id) == null) return;
                    HttpManager.Instance.requestDiamondBuy(_res.order_id, (_res: any) => {
                        MessageUtils.showMsgTips("购买成功");
                        HttpManager.Instance.requestDiamondData();
                        switch (self.datas[0]) {
                            case DILOG_TYPE.PET://刷新消费记录
                                userData.refreshBuyRecord(self.datas[2].id, true);
                                break;
                            case DILOG_TYPE.ACC://钻石加速次数加1
                                userData.diamondAcceTimes(true);
                                break;
                        }
                    });
                } else {
                    switch (self.datas[0]) {
                        case DILOG_TYPE.PET://刷新消费记录
                            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.37"));
                            break;
                        case DILOG_TYPE.ACC://钻石加速次数加1
                            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.05"));
                            break;
                    }
                }
            }, self.datas[0]);
        } else {
            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.04"));
        }
        self.onCloseHandler();
    }

    private onCloseHandler(): void {
        let self = this;
        ViewMgr.Ins.close(ViewConst.DiamondBuyView);
    }
}