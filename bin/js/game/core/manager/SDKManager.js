/*
* SDK;
*/
class SDKManager {
    constructor() {
    }
    initWX() {
        platform.onShow(function (data) {
            console.log("@David onShow", data);
            SDKManager.Instance.handlerShareType(data);
            SDKManager.Instance.handlerSceneValue(data);
            EventsManager.Instance.event(EventsType.BACK_GAME);
            M.more.applyMute();
            if (platform.isSharing())
                return;
            //离线收益
            if (userData && userData.isLoadStorage()) {
                userData.requestOfflinePrizeData();
            }
        });
        platform.onHide(function () {
            if (platform.isSharing())
                return;
            try {
                //保存数据
                if (userData && userData.isLoadStorage()) {
                    userData.saveLocal(true, { petList: true, petShop: true, skill: true });
                    userData.saveOfflineTime();
                    //上传腾讯云
                    userData.setUserCloudStorage();
                }
            }
            catch (e) {
                console.log("@FREEMAN: 在保存离线数据期间发生了错误：", e);
            }
        });
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
        self.createBanner();
        return self._bannerAd;
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
        self.createBanner(false);
    }
    createBanner(isShow = true) {
        let self = this;
        if (isShow && self._bannerAd) {
            self._bannerAd.show();
            return;
        }
        else if (!isShow || !self._bannerAd) {
            self._bannerAd && self._bannerAd.destroy();
            self._bannerAd = platform.createBannerAd({
                adUnitId: 'adunit-439fc3b5508c60cc',
                top: LayerManager.clientTop,
                height: LayerManager.clientHeight
            });
        }
        if (self._bannerAd) {
            self._bannerAd.onError(err => {
                console.log(err);
            });
            if (isShow) {
                self._bannerAd.show();
            }
            else {
                self._bannerAd.hide();
            }
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
    /** 处理分享类型 */
    handlerShareType(data) {
        if (!data)
            return;
        switch (data.query.shareType) {
            case "help":
                console.log("好友互助UID:", data.query.userId);
                HttpManager.Instance.requestFriendConcur(data.query.userId);
                break;
            case "clearanceReward":
                this.checkIsGetClearanceReward(data);
                break;
            default:
                HttpManager.Instance.requestShareGift(data);
                break;
        }
    }
    /** 处理场景值 */
    handlerSceneValue(data) {
        switch (Math.floor(data.scene)) {
            case 1008:
            case 1044:
                this.handlerShareType(data);
                break;
            case 1020:
            case 1035:
            case 1043:
                if (data.referrerInfo && data.referrerInfo.appId) {
                    HttpManager.Instance.requestPublicAddress(data);
                }
                break;
        }
    }
    /** 检查是否可以领取通关奖励 */
    checkIsGetClearanceReward(data) {
        if (!data || !data.prescene_note)
            return;
        let chatRoom = data.prescene_note.split("@")[1];
        let groupId = chatRoom.split(":")[1];
        HttpManager.Instance.requestClearanceReward(userData.userId + "", groupId, (res) => {
            if (res) { //成功
                HallManager.Instance.showClearanceRewardView();
            }
            else { //失败
                MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.35"));
            }
        });
    }
    static get Instance() {
        if (!SDKManager._instance) {
            SDKManager._instance = new SDKManager();
        }
        return SDKManager._instance;
    }
}
//# sourceMappingURL=SDKManager.js.map