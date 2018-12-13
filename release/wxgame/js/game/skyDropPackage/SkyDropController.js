var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SkyDropController = (function (_super) {
    __extends(SkyDropController, _super);
    function SkyDropController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkyDropController.getInstance = function () {
        if (!this._instance) {
            this._instance = new SkyDropController();
        }
        return this._instance;
    };
    SkyDropController.prototype.init = function (parent) {
        this._container = parent;
        this._package = new Laya.Image("images/sk_package.png");
        this._package.pivot(34, 42);
    };
    SkyDropController.prototype.dropPackage = function () {
        this._package.pos(153, -80);
        if (this._container) {
            this._container.addChild(this._package);
            this.dropTween();
        }
    };
    SkyDropController.prototype.dropTween = function () {
        if (this._package) {
            Laya.Tween.to(this._package, { y: 430 }, 800, Laya.Ease.quadIn, Handler.create(this, this.onDropTweenComplete));
        }
    };
    SkyDropController.prototype.onDropTweenComplete = function () {
        this._package.on(Laya.Event.CLICK, this, this.onPackageClick);
        this.bouncingUp();
    };
    SkyDropController.prototype.bouncingDown = function () {
        Laya.Tween.to(this._package, { scaleX: 1.1, scaleY: 0.85, y: 430 }, 400, Laya.Ease.quadIn, Handler.create(this, this.bouncingUp));
    };
    SkyDropController.prototype.bouncingUp = function () {
        Laya.Tween.to(this._package, { scaleX: 0.9, scaleY: 1.1, y: 400 }, 400, Laya.Ease.quadOut, Handler.create(this, this.bouncingDown));
    };
    SkyDropController.prototype.onPackageClick = function () {
        var rnd = Math.floor(Math.random() * 4);
        var sheet = SkyDropSheet.getSheetById(rnd);
        if (sheet.id < 100) {
            if (!this._skyDropFrame) {
                this._skyDropFrame = new SkyDropFrame();
            }
            this._skyDropFrame.renew(sheet.id, 0.5, 180);
            this._container.addChild(this._skyDropFrame);
        }
        else {
            if (!this._skyDropObtainFrame) {
                this._skyDropObtainFrame = new SkyDropObtainFrame();
            }
            this._skyDropObtainFrame.renew("images/diamond_icon.png", "免费获得钻石X" + Math.round(Math.random() * 30));
            this._container.addChild(this._skyDropObtainFrame);
        }
    };
    return SkyDropController;
}(Laya.EventDispatcher));
var SkyDropSheet = (function () {
    function SkyDropSheet() {
    }
    SkyDropSheet.getSheetById = function (id) {
        for (var _i = 0, _a = this.sheets; _i < _a.length; _i++) {
            var sheet = _a[_i];
            if (sheet.id === id) {
                return sheet;
            }
        }
        return null;
    };
    return SkyDropSheet;
}());
/** 攻击速度按百分比增加 */
SkyDropSheet.ATTACK_SPEED_INCREASE = 0;
/** 攻击力按百分比增加 */
SkyDropSheet.ATTACK_VALUE_INCREASE = 1;
/** 暴击率按百分比增加 */
SkyDropSheet.CRIT_RATE_INCREASE = 2;
/** 金币获得按百分比增加 */
SkyDropSheet.COIN_OBTAIN_INCREASE = 3;
SkyDropSheet.sheets = [
    { id: 0, num: 0.5, duration: 60 * 1000 },
    { id: 1, num: 1, duration: 30 * 1000 },
    { id: 2, num: 0.5, duration: 30 * 1000 },
    { id: 3, num: 1, duration: 120 * 1000 }
];
var SkyDropFrame = (function (_super) {
    __extends(SkyDropFrame, _super);
    function SkyDropFrame() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    SkyDropFrame.prototype.init = function () {
        this.ui = new ui.SkyDropFrameUI();
        this.addChild(this.ui);
        this.ui.imgCloseBtn.on(Laya.Event.CLICK, this, this.onClose);
        this.ui.imgMask.on(Laya.Event.CLICK, this, this.onClose);
        this.ui.imgHelp.on(Laya.Event.CLICK, this, this.onHelpBtnClick);
        this.ui.imgVideo.on(Laya.Event.CLICK, this, this.onVideoBtnClick);
    };
    SkyDropFrame.prototype.renew = function (dropType, num, duration) {
        switch (dropType) {
            case SkyDropSheet.ATTACK_SPEED_INCREASE: {
                this.ui.lblDesc.text = "宠物攻击速度增加";
                break;
            }
            case SkyDropSheet.ATTACK_VALUE_INCREASE: {
                this.ui.lblDesc.text = "宠物攻击力增加";
                break;
            }
            case SkyDropSheet.CRIT_RATE_INCREASE: {
                this.ui.lblDesc.text = "宠物暴击率增加";
                break;
            }
            case SkyDropSheet.COIN_OBTAIN_INCREASE: {
                this.ui.lblDesc.text = "金币获得增加";
                break;
            }
        }
        var numStr = (num * 100).toString() + "%";
        this.ui.lblNum.text = numStr;
        this.ui.lblDuration.text = duration.toString();
    };
    SkyDropFrame.prototype.onClose = function () {
        this.removeSelf();
    };
    SkyDropFrame.prototype.onHelpBtnClick = function () {
        userData.toShareAd(function () {
            CommonFun.showTip("天降惊喜礼包分享成功！");
        });
    };
    SkyDropFrame.prototype.onVideoBtnClick = function () {
        CommonFun.showVideoAd(function () {
            CommonFun.showTip("视频观看完毕！");
        }, function () {
            CommonFun.showTip("暂时没有可以观看的视频广告！");
        }, false);
    };
    return SkyDropFrame;
}(Laya.View));
var SkyDropObtainFrame = (function (_super) {
    __extends(SkyDropObtainFrame, _super);
    function SkyDropObtainFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkyDropObtainFrame.prototype.init = function () {
        this.ui = new ui.SkyDropObtainFrameUI();
        this.addChild(this.ui);
        this.ui.imgCloseBtn.on(Laya.Event.CLICK, this, this.onClose);
        this.ui.imgMask.on(Laya.Event.CLICK, this, this.onClose);
        this.ui.imgHelp.on(Laya.Event.CLICK, this, this.onHelpBtnClick);
        this.ui.imgVideo.on(Laya.Event.CLICK, this, this.onVideoBtnClick);
    };
    // @ts-ignore
    SkyDropObtainFrame.prototype.renew = function (iconStr, desc) {
        this.ui.imgIcon.skin = iconStr;
        this.ui.lblDesc.text = desc;
    };
    return SkyDropObtainFrame;
}(SkyDropFrame));
//# sourceMappingURL=SkyDropController.js.map