class SkyDropController extends Laya.EventDispatcher {
    static getInstance() {
        if (!this._instance) {
            this._instance = new SkyDropController();
        }
        return this._instance;
    }
    init(parent) {
        this._container = parent;
        this._container.mouseThrough = true;
        this._package = new Laya.Image("images/hall/miniProgram_icon.png");
        this._package.pivot(34, 42);
        this._awardType = -1;
        // this.dropPackage(1);
        Laya.timer.once(5 * 1000, this, this.requestSkyDropPackage);
    }
    dropPackage(awardType) {
        this._awardType = awardType;
        this._package.pos(153, -80);
        if (this._container) {
            this._container.addChild(this._package);
            this.dropTween();
        }
    }
    retrievePackage() {
        this._awardType = -1;
        this._package.removeSelf();
        Laya.Tween.clearTween(this._package);
    }
    get packageOnScreen() {
        return Boolean(this._package.parent);
    }
    dropTween() {
        if (this._package) {
            Laya.Tween.to(this._package, { y: 430 }, 800, Laya.Ease.quadIn, Handler.create(this, this.onDropTweenComplete));
        }
    }
    onDropTweenComplete() {
        this._package.on(Laya.Event.CLICK, this, this.onPackageClick);
        Laya.Tween.clearTween(this._package);
        this.bouncingUp();
    }
    bouncingDown() {
        Laya.Tween.to(this._package, { scaleX: 1.1, scaleY: 0.85, y: 430 }, 400, Laya.Ease.quadIn, Handler.create(this, this.bouncingUp));
    }
    bouncingUp() {
        Laya.Tween.to(this._package, { scaleX: 0.9, scaleY: 1.1, y: 400 }, 400, Laya.Ease.quadOut, Handler.create(this, this.bouncingDown));
    }
    onPackageClick() {
        if (this._awardType < 100) {
            const sheet = SkyDropSheet.getSheetById(this._awardType);
            ViewMgr.Ins.open(ViewConst.SkyDropView, null, sheet);
        }
        else {
            if (!this._skyDropObtainFrame) {
                this._skyDropObtainFrame = new SkyDropObtainView();
                this._skyDropObtainFrame.renew("images/core/diamond_icon.png", LanguageManager.Instance.getLanguageText("hallScene.label.txt.10", Math.round(Math.random() * 30)));
            }
            this._container.addChild(this._skyDropObtainFrame);
        }
    }
    activatePackageAward() {
        const sheet = SkyDropSheet.getSheetById(this._awardType);
        BuffController.getInstance().addBuffFromSkyDrop(sheet);
        this.retrievePackage();
        BuffTipsView.Create(sheet);
    }
    requestSkyDropPackage() {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/skyDropPackage/status',
            success: function (res) {
                const bool = res.isShowPackage;
                if (bool) {
                    that.dropPackage(res.type);
                }
                else {
                    const timeSpan = res.nextPackageTimeSpan;
                    if (timeSpan > 0) {
                        Laya.timer.once(timeSpan * 1000, that, that.requestSkyDropPackage);
                    }
                    else {
                        Laya.timer.clear(that, that.requestSkyDropPackage);
                    }
                }
                console.log("@FREEMAN: 请求天降礼包数据:", res);
            },
            fail: (res) => {
                console.log("@FREEMAN: getSkyDropPackage: fail =>", res);
            }
        });
    }
    postSkyDropPackage() {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/skyDropPackage/open/' + this._awardType,
            success: ({ legal }) => {
                if (legal) {
                    that.activatePackageAward();
                    Laya.timer.once(10 * 1000, that, that.requestSkyDropPackage);
                }
                else {
                    console.log("@FREEMAN: postSkyDropPackage:", "领取时间无效，您暂时无法领取天降惊喜礼包！");
                }
                console.log("@FREEMAN: postSkyDropPackage: legal =>", legal);
            },
            fail: (res) => {
                console.log("@FREEMAN: postSkyDropPackage: fail =>", res);
            }
        });
    }
}
class SkyDropSheet {
    constructor(id, num, duration) {
        this.id = id;
        this.num = num;
        this.duration = duration;
    }
    static getSheetById(id) {
        for (const sheet of this.sheets) {
            if (sheet.id === id) {
                return sheet;
            }
        }
        return null;
    }
}
/** 攻击速度按百分比增加 */
SkyDropSheet.ATTACK_SPEED_INCREASE = 0;
/** 攻击力按百分比增加 */
SkyDropSheet.ATTACK_VALUE_INCREASE = 1;
/** 暴击率按百分比增加 */
SkyDropSheet.CRIT_RATE_INCREASE = 2;
/** 金币获得按百分比增加 */
SkyDropSheet.COIN_OBTAIN_INCREASE = 3;
SkyDropSheet.sheets = [
    new SkyDropSheet(0, 0.5, 60 * 1000),
    new SkyDropSheet(1, 1, 30 * 1000),
    new SkyDropSheet(2, 0.5, 30 * 1000),
    new SkyDropSheet(3, 1, 120 * 1000),
];
class SkyDropObtainView extends SkyDropView {
    init() {
        this.ui = new ui.common.view.SkyDropObtainViewUI();
        this.addChild(this.ui);
        this.ui.imgCloseBtn.on(Laya.Event.CLICK, this, this.removeSelf);
        this.ui.btnHelp.on(Laya.Event.CLICK, this, this.onHelpBtnClick);
        this.ui.btnVideo.on(Laya.Event.CLICK, this, this.onVideoBtnClick);
    }
    // @ts-ignore
    renew(iconStr, desc) {
        this.ui.imgIcon.skin = iconStr;
        this.ui.lblDesc.text = desc;
    }
}
//# sourceMappingURL=SkyDropController.js.map