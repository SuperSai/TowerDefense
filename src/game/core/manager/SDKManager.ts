/*
* SDK;
*/
class SDKManager {

    private _videoAd: any; //videoAd
    private _bannerAd: any; //bannerAd
    /** 是否禁止播放bannerAd */
    private _isForbidBannerAd: boolean;

    constructor() {

    }

    /**
     * 显示banner广告
     * @param {boolean} [force=false]
     * @param {number} [offsetY=0]
     * @returns {*}
     * @memberof SDKManager
     */
    public showBannerAd(force: boolean = false, offsetY: number = 0): any {
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
    public closeBannerAd(forbid: boolean = false): void {
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
    public showVideoAd(callback: any, noAdCallback: any = null, shareEnabled: boolean = true): void {
        let self = this;
        if (self._videoAd) return;
        let videoAd = platform.createRewardedVideoAd({
            adUnitId: 'adunit-d2cf9b98a2801c37'
        });
        if (videoAd) {
            self._videoAd = videoAd;
            videoAd.load().then(() => videoAd.show());
            let closeCallback = (res) => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    callback && callback(res);
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                    videoAd.offClose(closeCallback);
                }
                self._isForbidBannerAd = false;
                self._videoAd = null;
            }
            videoAd.onClose(closeCallback);
            let errCallback = (err) => {
                console.log(err);
                //无视频可看弹窗
                let hintDialog = new ui.common.view.VideoAdViewUI();
                AlignUtils.setToScreenGoldenPos(hintDialog);
                M.layer.subFrameLayer.addChildWithMaskCall(hintDialog, hintDialog.removeSelf);
                let imgBg = hintDialog.getChildByName("imgBg") as Laya.Image;
                if (imgBg) {
                    let btnExit = imgBg.getChildByName("btnExit") as Laya.Button;
                    if (btnExit) {
                        btnExit.on(Laya.Event.CLICK, btnExit, () => {
                            hintDialog.removeSelf();
                        });
                    }
                    let btnShare = imgBg.getChildByName("btnShare") as Laya.Button;
                    if (btnShare) {
                        btnShare.offAll(Laya.Event.CLICK);
                        btnShare.on(Laya.Event.CLICK, btnShare, () => {
                            hintDialog.removeSelf();
                            if (noAdCallback) {
                                noAdCallback();
                            } else {
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
    public navigateToMiniProgram(appId: string): void {
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




    private static _instance: SDKManager;
    public static get Instance(): SDKManager {
        if (!SDKManager._instance) {
            SDKManager._instance = new SDKManager();
        }
        return SDKManager._instance;
    }
}