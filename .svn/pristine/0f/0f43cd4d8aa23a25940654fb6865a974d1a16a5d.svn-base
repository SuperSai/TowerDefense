/*
* TER;
*/
class CommonFun {

    static viewZOrder: number = 1001;
    static bannerAd: any; //bannerAd
    static isForbidBannerAd: boolean; //是否禁止播放bannerAd
    static videoAd: any; //videoAd

    constructor() {

    }

    //文本提示
    static showTip(_content: string): void {
        var tipBarSp: Laya.Image = ObjectPool.pop(Laya.Image, "SizeImage", "loading/tip_bg.png");
        tipBarSp.alpha = 1;
        Laya.stage.addChild(tipBarSp);
        tipBarSp.zOrder = CommonFun.viewZOrder;
        tipBarSp.pos(Laya.stage.width / 2, Laya.stage.height / 2);
        tipBarSp.width = 500;
        tipBarSp.height = 80;
        tipBarSp.pivot(tipBarSp.width / 2, tipBarSp.height / 2);
        tipBarSp.sizeGrid = "10,10,10,10";

        var coinLabel = Laya.Pool.getItemByClass("TipsLabel", Laya.Label);
        coinLabel.text = _content;
        coinLabel.fontSize = 40;
        coinLabel.color = "#ffffff";
        coinLabel.width = tipBarSp.width * 0.98;
        //设置文本水平居中
        coinLabel.align = "center";
        //设置文本垂直居中
        coinLabel.valign = "middle";
        //设置自动换行
        coinLabel.wordWrap = true;
        //重置背景高度
        tipBarSp.height = coinLabel.height + 20;
        tipBarSp.addChild(coinLabel);
        coinLabel.pos(tipBarSp.width / 2, tipBarSp.height / 2);
        coinLabel.pivot(coinLabel.width / 2, coinLabel.height / 2);
        Laya.Tween.to(tipBarSp, { x: tipBarSp.x, y: (tipBarSp.y - 100), alpha: 0 }, 3000,
            Laya.Ease.cubicInOut, Laya.Handler.create(this, (tipBarSp: Laya.Node) => {
                Laya.Pool.recover("TipsLabel", coinLabel);
                tipBarSp.removeChildren();
                tipBarSp.removeSelf();
                Laya.Tween.clearTween(tipBarSp);
                ObjectPool.push(tipBarSp);
            }, [tipBarSp]));
    }

    //显示banner广告
    static showBannerAd(_force: boolean = false, _offsetY: number = 0): any {
        console.log("@FREEMAN: 暂时未有banner广告权限，功能已注释");
        return;
        // if (CommonFun.isForbidBannerAd && _force == false) {
        //     return;
        // }
        // CommonFun.closeBannerAd();

        // let bannerAd = platform.createBannerAd({
        //     adUnitId: 'adunit-a8c13c9b0cb17e96',
        //     top: (1334 + _offsetY)
        // });
        // if (bannerAd) {
        //     bannerAd.show();
        // }
        // CommonFun.bannerAd = bannerAd;

        // return bannerAd;
    }
    static closeBannerAd(_forbid: boolean = false): void {
        if (_forbid) {
            CommonFun.isForbidBannerAd = true;
        }
        if (CommonFun.bannerAd) {
            CommonFun.bannerAd.hide();
            CommonFun.bannerAd.destroy();
            CommonFun.bannerAd = null;
        }
    }
    static showVideoAd(_callback: any, _noAdCallback: any = null, _shareEnabled: boolean = true): void {
        if (CommonFun.videoAd) return;
        let videoAd = platform.createRewardedVideoAd({
            adUnitId: 'adunit-c82707765582eb45'
        });
        if (videoAd) {
            CommonFun.videoAd = videoAd;

            videoAd.load().then(() => videoAd.show());
            let closeCallback = (res) => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (res && res.isEnded || res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                }
                else {
                    // 播放中途退出，不下发游戏奖励
                }
                CommonFun.isForbidBannerAd = false;
                _callback && _callback(res);

                videoAd.offClose(closeCallback);
                CommonFun.videoAd = null;
            }
            videoAd.onClose(closeCallback);

            let errCallback = (err) => {
                console.log(err);
                //无视频可看弹窗
                let hintDialog = new ui.common.view.VideoAdViewUI();
                hintDialog.popup();
                let imgBg = hintDialog.getChildByName("imgBg") as Laya.Image;
                if (imgBg) {
                    let btnExit = imgBg.getChildByName("btnExit") as Laya.Button;
                    if (btnExit) {
                        btnExit.on(Laya.Event.CLICK, btnExit, () => {
                            hintDialog.close("btnExit", false);
                        });
                    }
                    let btnShare = imgBg.getChildByName("btnShare") as Laya.Button;
                    if (btnShare) {
                        btnShare.offAll(Laya.Event.CLICK);
                        btnShare.on(Laya.Event.CLICK, btnShare, () => {
                            hintDialog.close("btnExit", false);
                            if (_noAdCallback) {
                                _noAdCallback();
                            } else {
                                userData.toShareAd();
                            }
                        });

                        //不开启分享
                        btnShare.visible = _shareEnabled;
                    }
                    hintDialog.once(Laya.Event.REMOVED, hintDialog, () => {
                        videoAd.offError(errCallback);
                        CommonFun.videoAd = null;
                    });
                }
            };
            videoAd.onError(errCallback);
            CommonFun.isForbidBannerAd = true;
        }

        if (!Laya.Browser.onMiniGame) {
            _callback && _callback();
        }
    }
}