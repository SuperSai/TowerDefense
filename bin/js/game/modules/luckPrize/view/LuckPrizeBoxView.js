/*
* 转盘宝箱中奖界面;
*/
class LuckPrizeBoxView extends BaseView {
    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.luckPrize.LuckPrizeBoxViewUI);
        this.myParent.maskEnabled = false;
    }
    initData() {
        super.initData();
        this._tween = EffectUtils.objectRotate(this.ui.imgLight);
        if (this.datas[0]) {
            this.ui.txt_des.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.40", this.datas[0].num);
            HttpManager.Instance.requestPrizeCensus(this.datas[0].id);
        }
    }
    addEvents() {
        super.addEvents();
        this.ui.btnExit.on(Laya.Event.CLICK, this, this.onCloseHandler);
        this.ui.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
    }
    removeEvents() {
        super.removeEvents();
        this.ui.btnExit.off(Laya.Event.CLICK, this, this.onCloseHandler);
        this.ui.btn_get.off(Laya.Event.CLICK, this, this.onGetReward);
    }
    onGetReward() {
        SDKManager.Instance.showVideoAd((_res) => {
            if (_res && _res.isEnded || _res == undefined) {
                this.updateMagnification();
            }
            else {
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
    updateMagnification() {
        if (this.datas[0]) {
            switch (this.datas[0].id) {
                case 1: //2倍奖励
                    if (HallManager.Instance.hallData.magnification < 2) {
                        HallManager.Instance.hallData.magnification = 2;
                    }
                    break;
                case 5: //4倍奖励
                    if (HallManager.Instance.hallData.magnification < 4) {
                        HallManager.Instance.hallData.magnification = 4;
                    }
                    break;
            }
            this.callback && this.callback();
            this.onCloseHandler();
        }
    }
    onCloseHandler() {
        ViewMgr.Ins.close(ViewConst.LuckPrizeBoxView);
    }
    close(...param) {
        super.close(param);
        Laya.Tween.clear(this._tween);
    }
}
//# sourceMappingURL=LuckPrizeBoxView.js.map