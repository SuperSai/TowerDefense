var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SkyDropController = /** @class */ (function (_super) {
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
        this._container.mouseThrough = true;
        this._package = new Laya.Image("images/sk_package.png");
        this._package.pivot(34, 42);
        this._awardType = -1;
        Laya.timer.once(5 * 1000, this, this.requestSkyDropPackage);
    };
    SkyDropController.prototype.dropPackage = function (awardType) {
        this._awardType = awardType;
        this._package.pos(153, -80);
        if (this._container) {
            this._container.addChild(this._package);
            this.dropTween();
        }
    };
    SkyDropController.prototype.retrievePackage = function () {
        this._awardType = -1;
        this._package.removeSelf();
        Laya.Tween.clearTween(this._package);
    };
    Object.defineProperty(SkyDropController.prototype, "packageOnScreen", {
        get: function () {
            return Boolean(this._package.parent);
        },
        enumerable: true,
        configurable: true
    });
    SkyDropController.prototype.dropTween = function () {
        if (this._package) {
            Laya.Tween.to(this._package, { y: 430 }, 800, Laya.Ease.quadIn, Handler.create(this, this.onDropTweenComplete));
        }
    };
    SkyDropController.prototype.onDropTweenComplete = function () {
        this._package.on(Laya.Event.CLICK, this, this.onPackageClick);
        Laya.Tween.clearTween(this._package);
        this.bouncingUp();
    };
    SkyDropController.prototype.bouncingDown = function () {
        Laya.Tween.to(this._package, { scaleX: 1.1, scaleY: 0.85, y: 430 }, 400, Laya.Ease.quadIn, Handler.create(this, this.bouncingUp));
    };
    SkyDropController.prototype.bouncingUp = function () {
        Laya.Tween.to(this._package, { scaleX: 0.9, scaleY: 1.1, y: 400 }, 400, Laya.Ease.quadOut, Handler.create(this, this.bouncingDown));
    };
    SkyDropController.prototype.onPackageClick = function () {
        if (this._awardType < 100) {
            var sheet = SkyDropSheet.getSheetById(this._awardType);
            if (!this._skyDropFrame) {
                this._skyDropFrame = new SkyDropFrame();
                this._skyDropFrame.renew(sheet);
            }
            M.layer.subFrameLayer.addChildWithMaskCall(this._skyDropFrame, this._skyDropFrame.removeSelf);
        }
        else {
            if (!this._skyDropObtainFrame) {
                this._skyDropObtainFrame = new SkyDropObtainFrame();
                this._skyDropObtainFrame.renew("images/diamond_icon.png", "免费获得钻石X" + Math.round(Math.random() * 30));
            }
            this._container.addChild(this._skyDropObtainFrame);
        }
    };
    SkyDropController.prototype.activatePackageAward = function () {
        var sheet = SkyDropSheet.getSheetById(this._awardType);
        BuffController.getInstance().addBuffFromSkyDrop(sheet);
        this.retrievePackage();
    };
    SkyDropController.prototype.requestSkyDropPackage = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/skyDropPackage/status',
            success: function (res) {
                var bool = res.isShowPackage;
                if (bool) {
                    that.dropPackage(res.type);
                }
                else {
                    var timeSpan = res.nextPackageTimeSpan;
                    if (timeSpan > 0) {
                        Laya.timer.once(timeSpan * 1000, that, that.requestSkyDropPackage);
                    }
                    else {
                        Laya.timer.clear(that, that.requestSkyDropPackage);
                    }
                }
                console.log("@FREEMAN: 请求天降礼包数据:", res);
            },
            fail: function (res) {
                console.log("@FREEMAN: getSkyDropPackage: fail =>", res);
            }
        });
    };
    SkyDropController.prototype.postSkyDropPackage = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/skyDropPackage/open/' + this._awardType,
            success: function (_a) {
                var legal = _a.legal;
                if (legal) {
                    that.activatePackageAward();
                    Laya.timer.once(10 * 1000, that, that.requestSkyDropPackage);
                }
                else {
                    console.log("@FREEMAN: postSkyDropPackage:", "领取时间无效，您暂时无法领取天降惊喜礼包！");
                }
                console.log("@FREEMAN: postSkyDropPackage: legal =>", legal);
            },
            fail: function (res) {
                console.log("@FREEMAN: postSkyDropPackage: fail =>", res);
            }
        });
    };
    return SkyDropController;
}(Laya.EventDispatcher));
var SkyDropSheet = /** @class */ (function () {
    function SkyDropSheet(id, num, duration) {
        this.id = id;
        this.num = num;
        this.duration = duration;
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
    return SkyDropSheet;
}());
var SkyDropFrame = /** @class */ (function (_super) {
    __extends(SkyDropFrame, _super);
    function SkyDropFrame() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    SkyDropFrame.prototype.init = function () {
        this.ui = new ui.SkyDropFrameUI();
        this.addChild(this.ui);
        this.ui.imgCloseBtn.on(Laya.Event.CLICK, this, this.removeSelf);
        this.ui.btnHelp.on(Laya.Event.CLICK, this, this.onHelpBtnClick);
        this.ui.btnVideo.on(Laya.Event.CLICK, this, this.onVideoBtnClick);
    };
    SkyDropFrame.prototype.renew = function (sheet) {
        this.sheet = sheet;
        switch (sheet.id) {
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
        var numStr = (sheet.num * 100).toString() + "%";
        this.ui.lblNum.text = numStr;
        this.ui.lblDuration.text = (sheet.duration * 0.001).toString();
    };
    SkyDropFrame.prototype.onHelpBtnClick = function () {
        var _this = this;
        if (GlobalConfig.DEBUG) {
            this.success();
        }
        else {
            userData.toShareAd(function () {
                _this.success();
            });
        }
    };
    SkyDropFrame.prototype.onVideoBtnClick = function () {
        var _this = this;
        CommonFun.showVideoAd(function () {
            _this.success();
        }, function () {
            CommonFun.showTip("暂时没有可以观看的视频广告！");
        }, false);
    };
    SkyDropFrame.prototype.success = function () {
        this.removeSelf();
        SkyDropController.getInstance().postSkyDropPackage();
    };
    return SkyDropFrame;
}(Laya.View));
var SkyDropObtainFrame = /** @class */ (function (_super) {
    __extends(SkyDropObtainFrame, _super);
    function SkyDropObtainFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkyDropObtainFrame.prototype.init = function () {
        this.ui = new ui.SkyDropObtainFrameUI();
        this.addChild(this.ui);
        this.ui.imgCloseBtn.on(Laya.Event.CLICK, this, this.removeSelf);
        this.ui.btnHelp.on(Laya.Event.CLICK, this, this.onHelpBtnClick);
        this.ui.btnVideo.on(Laya.Event.CLICK, this, this.onVideoBtnClick);
    };
    // @ts-ignore
    SkyDropObtainFrame.prototype.renew = function (iconStr, desc) {
        this.ui.imgIcon.skin = iconStr;
        this.ui.lblDesc.text = desc;
    };
    return SkyDropObtainFrame;
}(SkyDropFrame));
//# sourceMappingURL=SkyDropController.js.map