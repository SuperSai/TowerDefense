/*
* SDK;
*/
class SDKManager {
    constructor() {
    }
    /**
     * 显示banner广告
     * @param {boolean} [force=false]
     * @param {number} [offsetY=0]
     * @returns {*}
     * @memberof SDKManager
     */
    showBannerAd(force = false, offsetY = 0) {
        let self = this;
        if (self._isForbidBannerAd && force == false) {
            return;
        }
        self.closeBannerAd();
        let bannerAd = platform.createBannerAd({
            adUnitId: 'adunit-439fc3b5508c60cc',
            top: LayerManager.clientTop
        });
        if (bannerAd) {
            bannerAd.show();
        }
        self._bannerAd = bannerAd;
        return bannerAd;
    }
    /**
     *  关闭banner广告
     * @param {boolean} [forbid=false]
     * @memberof SDKManager
     */
    closeBannerAd(forbid = false) {
        let self = this;
        if (forbid) {
            self._isForbidBannerAd = true;
        }
        if (self._bannerAd) {
            self._bannerAd.hide();
            self._bannerAd.destroy();
            self._bannerAd = null;
        }
    }
    /**
     *  观看视频
     * @param {*} callback
     * @param {*} [noAdCallback=null]
     * @param {boolean} [shareEnabled=true]
     * @returns {void}
     * @memberof SDKManager
     */
    showVideoAd(callback, noAdCallback = null, shareEnabled = true) {
        let self = this;
        if (self._videoAd)
            return;
        let videoAd = platform.createRewardedVideoAd({
            adUnitId: 'adunit-d2cf9b98a2801c37'
        });
        if (videoAd) {
            self._videoAd = videoAd;
            videoAd.load().then(() => videoAd.show());
            let closeCallback = (res) => {
                callback && callback(res);
                videoAd.offClose(closeCallback);
                self._isForbidBannerAd = false;
                self._videoAd = null;
            };
            videoAd.onClose(closeCallback);
            let errCallback = (err) => {
                console.log(err);
                //无视频可看弹窗
                let hintDialog = new ui.common.view.VideoAdViewUI();
                AlignUtils.setToScreenGoldenPos(hintDialog);
                M.layer.subFrameLayer.addChildWithMaskCall(hintDialog, hintDialog.removeSelf);
                let imgBg = hintDialog.getChildByName("imgBg");
                if (imgBg) {
                    let btnExit = imgBg.getChildByName("btnExit");
                    if (btnExit) {
                        btnExit.on(Laya.Event.CLICK, btnExit, () => {
                            hintDialog.removeSelf();
                        });
                    }
                    let btnShare = imgBg.getChildByName("btnShare");
                    if (btnShare) {
                        btnShare.offAll(Laya.Event.CLICK);
                        btnShare.on(Laya.Event.CLICK, btnShare, () => {
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
                    hintDialog.once(Laya.Event.REMOVED, hintDialog, () => {
                        videoAd.offError(errCallback);
                        self._videoAd = null;
                    });
                }
            };
            videoAd.onError(errCallback);
            self._isForbidBannerAd = true;
        }
        if (!Laya.Browser.onMiniGame) {
            callback && callback();
        }
    }
    /**
     * 跳转小程序
     * @param {string} appId
     * @memberof SDKManager
     */
    navigateToMiniProgram(appId) {
        platform.navigateToMiniProgram({
            appId: appId,
            path: userData.miniPagePath(),
            success(res) {
                console.log("小程序跳转成功", res);
            }
        });
        //小程序跳转次数统计
        HttpManager.Instance.requestShareAdFinish("minipro_" + appId);
    }
    static get Instance() {
        if (!SDKManager._instance) {
            SDKManager._instance = new SDKManager();
        }
        return SDKManager._instance;
    }
}
//# sourceMappingURL=SDKManager.js.map