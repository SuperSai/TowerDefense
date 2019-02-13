/*
* 转盘宝箱中奖界面;
*/
class LuckPrizeBoxView extends BaseView {

    constructor() {
        super(M.layer.subFrameLayer, ui.luckPrize.LuckPrizeBoxViewUI);
        this.myParent.maskEnabled = false;
    }

    public initData(): void {
        super.initData();
        this.isRemoveBanner = false;
        if (this.datas[0]) {
            switch (this.datas[0].id) {
                case 1://2倍奖励
                    if (HallManager.Instance.hallData.magnification < 2) {
                        HallManager.Instance.hallData.magnification = 2;
                    }
                    break;
                case 5://8倍奖励
                    if (HallManager.Instance.hallData.magnification < 8) {
                        HallManager.Instance.hallData.magnification = 8;
                    }
                    break;
            }
            this.ui.imgTitle.skin = "images/luckLottery/luck_item_title_" + HallManager.Instance.hallData.magnification + ".png";
            this.ui.txt_des.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.40", this.datas[0].num);
        }
    }

    public addEvents(): void {
        super.addEvents();
        this.ui.btnExit.on(Laya.Event.CLICK, this, this.onCloseHandler);
        this.ui.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
    }

    public removeEvents(): void {
        super.removeEvents();
        this.ui.btnExit.off(Laya.Event.CLICK, this, this.onCloseHandler);
        this.ui.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
    }

    private onGetReward(): void {
        SDKManager.Instance.showVideoAd((_res: any) => {
            if (_res && _res.isEnded || _res == undefined) {
                this.updateMagnification();
            } else {
                userData.toShareAd(() => {
                    this.updateMagnification();
                });
            }
        }, () => {
            userData.toShareAd(() => {
                this.updateMagnification();
            });
        });
    }

    /** 更新倍率 */
    private updateMagnification(): void {
        this.callback && this.callback(true);
        this.onCloseHandler();
    }

    private onCloseHandler(): void {
        this.callback && this.callback(false);
        ViewMgr.Ins.close(ViewConst.LuckPrizeBoxView);
    }

    public close(...param: any[]): void {
        super.close(param);
    }
}