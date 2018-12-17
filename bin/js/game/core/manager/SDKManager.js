/*
* SDK;
*/
var SDKManager = /** @class */ (function () {
    function SDKManager() {
    }
    /**
     * 显示banner广告
     * @param {boolean} [force=false]
     * @param {number} [offsetY=0]
     * @returns {*}
     * @memberof SDKManager
     */
    SDKManager.prototype.showBannerAd = function (force, offsetY) {
        if (force === void 0) { force = false; }
        if (offsetY === void 0) { offsetY = 0; }
        var self = this;
        if (self._isForbidBannerAd && force == false) {
            return;
        }
        self.closeBannerAd();
        var bannerAd = platform.createBannerAd({
            adUnitId: 'adunit-439fc3b5508c60cc',
            top: (1334 + offsetY)
        });
        if (bannerAd) {
            bannerAd.show();
        }
        self._bannerAd = bannerAd;
        return bannerAd;
    };
    /**
     *  关闭banner广告
     * @param {boolean} [forbid=false]
     * @memberof SDKManager
     */
    SDKManager.prototype.closeBannerAd = function (forbid) {
        if (forbid === void 0) { forbid = false; }
        var self = this;
        if (forbid) {
            self._isForbidBannerAd = true;
        }
        if (self._bannerAd) {
            self._bannerAd.hide();
            self._bannerAd.destroy();
            self._bannerAd = null;
        }
    };
    /**
     *  观看视频
     * @param {*} callback
     * @param {*} [noAdCallback=null]
     * @param {boolean} [shareEnabled=true]
     * @returns {void}
     * @memberof SDKManager
     */
    SDKManager.prototype.showVideoAd = function (callback, noAdCallback, shareEnabled) {
        if (noAdCallback === void 0) { noAdCallback = null; }
        if (shareEnabled === void 0) { shareEnabled = true; }
        var self = this;
        if (self._videoAd)
            return;
        var videoAd = platform.createRewardedVideoAd({
            adUnitId: 'adunit-d2cf9b98a2801c37'
        });
        if (videoAd) {
            self._videoAd = videoAd;
            videoAd.load().then(function () { return videoAd.show(); });
            var closeCallback_1 = function (res) {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    callback && callback(res);
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    videoAd.offClose(closeCallback_1);
                }
                self._isForbidBannerAd = false;
                self._videoAd = null;
            };
            videoAd.onClose(closeCallback_1);
            var errCallback_1 = function (err) {
                console.log(err);
                //无视频可看弹窗
                var hintDialog = new ui.common.view.VideoAdViewUI();
                AlignUtils.setToScreenGoldenPos(hintDialog);
                M.layer.subFrameLayer.addChildWithMaskCall(hintDialog, hintDialog.removeSelf);
                var imgBg = hintDialog.getChildByName("imgBg");
                if (imgBg) {
                    var btnExit = imgBg.getChildByName("btnExit");
                    if (btnExit) {
                        btnExit.on(Laya.Event.CLICK, btnExit, function () {
                            hintDialog.removeSelf();
                        });
                    }
                    var btnShare = imgBg.getChildByName("btnShare");
                    if (btnShare) {
                        btnShare.offAll(Laya.Event.CLICK);
                        btnShare.on(Laya.Event.CLICK, btnShare, function () {
                            hintDialog.removeSelf();
                            if (noAdCallback) {
                                noAdCallback();
                            }
                            else {
                                userData.toShareAd();
                            }
                        });
                        //不开启分享
                        btnShare.visible = shareEnabled;
                    }
                    hintDialog.once(Laya.Event.REMOVED, hintDialog, function () {
                        videoAd.offError(errCallback_1);
                        self._videoAd = null;
                    });
                }
            };
            videoAd.onError(errCallback_1);
            self._isForbidBannerAd = true;
        }
        if (!Laya.Browser.onMiniGame) {
            callback && callback();
        }
    };
    /**
     * 跳转小程序
     * @param {string} appId
     * @memberof SDKManager
     */
    SDKManager.prototype.navigateToMiniProgram = function (appId) {
        platform.navigateToMiniProgram({
            appId: appId,
            path: userData.miniPagePath(),
            success: function (res) {
                console.log("小程序跳转成功", res);
            }
        });
        //小程序跳转次数统计
        HttpManager.Instance.requestShareAdFinish("minipro_" + appId);
    };
    Object.defineProperty(SDKManager, "Instance", {
        get: function () {
            if (!SDKManager._instance) {
                SDKManager._instance = new SDKManager();
            }
            return SDKManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return SDKManager;
}());
//# sourceMappingURL=SDKManager.js.map