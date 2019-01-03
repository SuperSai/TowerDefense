/*
* 天降惊喜界面;
*/
class SkyDropView extends BaseView {
    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.common.view.SkyDropViewUI);
    }
    initData() {
        super.initData();
        this.sheet = this.datas[0];
        switch (this.sheet.id) {
            case SkyDropSheet.ATTACK_SPEED_INCREASE: {
                this.ui.lblDesc.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.11");
                break;
            }
            case SkyDropSheet.ATTACK_VALUE_INCREASE: {
                this.ui.lblDesc.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.12");
                break;
            }
            case SkyDropSheet.CRIT_RATE_INCREASE: {
                this.ui.lblDesc.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.13");
                break;
            }
            case SkyDropSheet.COIN_OBTAIN_INCREASE: {
                this.ui.lblDesc.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.14");
                break;
            }
        }
        const numStr = (this.sheet.num * 100).toString() + "%";
        this.ui.lblNum.text = numStr;
        this.ui.lblDuration.text = (this.sheet.duration * 0.001).toString();
        this.ui.hbox1.refresh();
        this.ui.hbox2.refresh();
    }
    addEvents() {
        super.addEvents();
        this.ui.imgCloseBtn.on(Laya.Event.CLICK, this, this.onCloseHandler);
        this.ui.btnHelp.on(Laya.Event.CLICK, this, this.onHelpBtnClick);
        this.ui.btnVideo.on(Laya.Event.CLICK, this, this.onVideoBtnClick);
    }
    removeEvents() {
        super.removeEvents();
        this.ui.imgCloseBtn.off(Laya.Event.CLICK, this, this.onCloseHandler);
        this.ui.btnHelp.off(Laya.Event.CLICK, this, this.onHelpBtnClick);
        this.ui.btnVideo.off(Laya.Event.CLICK, this, this.onVideoBtnClick);
    }
    onHelpBtnClick() {
        if (GlobalConfig.DEBUG) {
            this.success();
        }
        else {
            userData.toShareAd(() => {
                this.success();
            });
        }
    }
    onVideoBtnClick() {
        SDKManager.Instance.showVideoAd(() => {
            this.success();
        }, () => {
            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.15"));
        }, false);
    }
    success() {
        this.removeSelf();
        SkyDropController.getInstance().postSkyDropPackage();
    }
    onCloseHandler() {
        ViewMgr.Ins.close(ViewConst.SkyDropView);
    }
}
//# sourceMappingURL=SkyDropView.js.map