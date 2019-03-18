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
            MoreController.getInstance().applyMute(false);
            SDKManager.Instance.handlerSceneValue(data);
            EventsManager.Instance.event(EventsType.BACK_GAME);
            if (platform.isSharing())
                return;
            //离线收益
            if (userData && userData.isLoadStorage()) {
                M.http.requestOfflinePrizeData();
            }
            // // 参数的query字段中可以获取到gdt_vid、weixinadinfo、channel等参数值
            // let query = data.query;
            // if (query) {
            //     let channel = query.channel;
            //     let gdt_vid = query.gdt_vid;
            //     let weixinadinfo = query.weixinadinfo;
            //     // 获取⼴告id
            //     let aid = 0;
            //     if (weixinadinfo) {
            //         let weixinadinfoArr = weixinadinfo.split(".");
            //         aid = weixinadinfoArr[0];
            //     }
            //     console.log("来源⼴告的⼴告id是：", aid, channel);
            //     HttpManager.Instance.requestInterfaces(aid, channel);
            // }
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
        platform.onShareAppMessage(() => {
            HttpManager.Instance.requestShareSubject("share", (res) => {
                let shareCfg = { imageUrl: res.image, content: res.describe, id: res.id };
                let queryData = "userId=" + userData.userId + "&shareId=" + shareCfg.id + "&shareType=index";
                console.log("@David 右上角分享数据", res, " --- query:", queryData);
                return {
                    title: shareCfg.content,
                    imageUrl: shareCfg.imageUrl,
                    query: queryData,
                    success: function (_res) {
                        console.log("@David 右上角转发成功!!!");
                    },
                    fail: function () {
                        console.log("@David 右上角转发失败!!!");
                    }
                };
            });
        });
    }
    showToast(param) {
        if (Laya.Browser.onMiniGame) {
            param && (param.icon || (param.icon = "none"));
            Laya.Browser.window.wx.showToast(param);
        }
        else {
            console.log("@FREEMAN: wx.showToast(param), param:", param);
        }
    }
    hideToast() {
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window.wx.hideToast();
        }
    }
    /** 显示banner广告 */
    showBannerAd() {
        let self = this;
        return;
        // if (!systemInfo.checkVersion("2.0.4")) {
        //     return;
        // }
        // self.createBanner();
        // return self._bannerAd;
    }
    /** 关闭banner广告 */
    closeBannerAd() {
        let self = this;
        // if (!systemInfo.checkVersion("2.0.4")) return;
        // self._isForbidBannerAd = true;
        // self.createBanner(false);
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
                noAdCallback && noAdCallback();
                return;
                //无视频可看弹窗
                // let hintDialog = new ui.common.view.VideoAdViewUI();
                // AlignUtils.setToScreenGoldenPos(hintDialog);
                // M.layer.subFrameLayer.addChildWithMaskCall(hintDialog, hintDialog.removeSelf);
                // let imgBg = hintDialog.getChildByName("imgBg") as Laya.Image;
                // if (imgBg) {
                //     let btnExit = imgBg.getChildByName("btnExit") as Laya.Button;
                //     if (btnExit) {
                //         btnExit.on(Laya.Event.CLICK, btnExit, () => {
                //             hintDialog.removeSelf();
                //         });
                //     }
                //     let btnShare = imgBg.getChildByName("btnShare") as Laya.Button;
                //     if (btnShare) {
                //         btnShare.offAll(Laya.Event.CLICK);
                //         btnShare.on(Laya.Event.CLICK, btnShare, () => {
                //             hintDialog.removeSelf();
                //             if (noAdCallback) {
                //                 noAdCallback();
                //             } else {
                //                 userData.toShareAd();
                //             }
                //         });
                //         //不开启分享
                //         btnShare.visible = shareEnabled;
                //     }
                //     hintDialog.once(Laya.Event.REMOVED, hintDialog, () => {
                //         videoAd.offError(errCallback);
                //         self._videoAd = null;
                //     });
                // }
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
    navigateToMiniProgram(appId, pageQuery = userData.miniPagePath(), callback = null) {
        if (systemInfo.checkVersion(WXSDKVersion.NAVIGATE_TO_MINI_PROGRAM)) {
            platform.navigateToMiniProgram({
                appId: appId,
                path: pageQuery,
                success(res) {
                    console.log("小程序跳转成功", res);
                    HttpManager.Instance.requestAdvertLog("into", appId);
                    callback && callback();
                }
            });
            //小程序跳转次数统计
            HttpManager.Instance.requestAdvertLog("click", appId);
        }
        else {
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window.wx.showModal({
                    title: '温馨提示',
                    content: '您当前微信版本过低，暂时使用该功能，请升级到最新微信版本后重试。'
                });
            }
        }
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
            case 1007:
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
        let groupId = data.prescene_note.split("@")[0];
        HttpManager.Instance.requestClearanceReward(userData.userId + "", groupId, HallManager.Instance.hallData.passStage, (result) => {
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