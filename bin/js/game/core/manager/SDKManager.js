/*
* SDK;
*/
class SDKManager {
    constructor() {
    }
    initWX() {
        platform.onShow(function (data) {
            console.log("@David onShow", data);
            if (data.scene == 1104 || data.scene == 1103 || data.scene == 1023) { //ios从我的小程序入口进
                PlayerManager.Instance.Info.isMySceneEnter = true;
            }
            SDKManager.Instance.handlerSceneValue(data);
            EventsManager.Instance.event(EventsType.BACK_GAME);
            if (platform.isSharing())
                return;
            //离线收益
            if (userData && userData.isLoadStorage()) {
                M.http.requestOfflinePrizeData();
            }
        });
        platform.onHide(function () {
            if (platform.isSharing())
                return;
            try {
                //保存数据
                if (userData) {
                    userData.saveLocal(true, { petList: true, petShop: true, skill: true });
                    userData.setUserCloudStorage();
                }
            }
            catch (e) {
                console.log("@FREEMAN: 在保存离线数据期间发生了错误：", e);
            }
        });
    }
    /** 显示banner广告 */
    showBannerAd() {
        let self = this;
        if (self._isForbidBannerAd || !systemInfo.canUseVersion("2.0.4")) {
            return;
        }
        self.createBanner();
        return self._bannerAd;
    }
    /** 关闭banner广告 */
    closeBannerAd() {
        let self = this;
        if (!systemInfo.canUseVersion("2.0.4"))
            return;
        self._isForbidBannerAd = true;
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
                if (noAdCallback) {
                    noAdCallback();
                    return;
                }
                else {
                    userData.toShareAd();
                    return;
                }
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
            case "stage":
                this.checkIsGetClearanceReward(data);
                break;
        }
    }
    /** 处理场景值 */
    handlerSceneValue(data) {
        switch (Math.floor(data.scene)) {
            case 1008:
            case 1044:
                HttpManager.Instance.requestShareGift(data);
                this.handlerShareType(data);
                break;
            case 1020:
            case 1035:
            case 1043:
                if (data.referrerInfo && data.referrerInfo.appId) {
                    console.log("@David 公众号开始给服务器发送协议");
                    HttpManager.Instance.requestPublicAddress(data);
                }
                break;
            case 1022:
        }
    }
    /** 检查是否可以领取通关奖励 */
    checkIsGetClearanceReward(data) {
        if (!data || !data.prescene_note)
            return;
        console.log("@David 检查是否可以领取通关奖励 -- start", data);
        let groupId = data.prescene_note.split("@")[0];
        HttpManager.Instance.requestClearanceReward(userData.userId + "", groupId, HallManager.Instance.hallData.passStage, (result) => {
            console.log("@David 检查是否可以领取通关奖励 返回结果 flag:", result);
            if (result == true) { //成功
                HallManager.Instance.showClearanceRewardView(true);
                return;
            }
            else if (result == false) { //失败
                MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.35"));
                return;
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