class MainLoadingView extends Laya.Sprite {
    constructor() {
        super();
        this.ui = new ui.login.LoginSceneUI();
        this.ui.probox.visible = false;
        this.addChild(this.ui);
        this.tweenAd();
    }
    startCountDown() {
        Laya.timer.once(15e3, this, () => {
            this.ui.btnRefresh.visible = true;
            this.ui.btnRefresh.on(Laya.Event.CLICK, this, () => {
                this.prepareAccount();
            });
        });
    }
    prepareAccount() {
        if (Laya.Browser.onMiniGame) {
            this.checkAuthority();
        }
        else {
            this.loadCache();
        }
    }
    loadCache(complete) {
        GameEnterManager.Instance.init();
        SDKManager.Instance.initWX();
        userData.loadCache();
        GlobleData.Instance.setup(() => {
            userData.loadStorage(() => {
                this.startToLoad();
            });
        });
    }
    startToLoad() {
        this.ui.probox.visible = true;
        this.ui.btnStart.visible = false;
        let launch = platform.getLaunchOptionsSync();
        console.log("@David getLaunchOptionsSync:", launch);
        PlayerManager.Instance.Info.isMySceneEnter = false;
        if (launch) {
            if (launch.scene == 1104 || launch.scene == 1103 || launch.scene == 1023) { //ios从我的小程序入口进
                PlayerManager.Instance.Info.isMySceneEnter = true;
            }
            SDKManager.Instance.handlerSceneValue(launch);
        }
        this.startCountDown();
        // if (Laya.Browser.onMiniGame) {
        //     this.loadSubPackages();
        // } else {
        this.loadRemoteRes();
        // }
    }
    loadSubPackages() {
        const self = this;
        platform.startLoading((percentage) => {
            self.updateLoadingProgress(percentage);
            if (percentage >= 100) {
                self.loadRemoteRes();
            }
        });
    }
    // private _time:number = 0;
    loadRemoteRes() {
        // if(this._time == 0){
        //     this._time++;
        //     return;
        // }
        let resList = BattleManager.Instance.getStartLoadPetData();
        resList = resList.concat([
            { url: "res/atlas/images/component.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/images/core.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/images/novice.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/images/hall.atlas", type: Laya.Loader.ATLAS },
            { url: "images/bg.jpg", type: Laya.Loader.IMAGE }
        ]);
        if (resList.length) {
            console.log("@David 预加载英雄资源，数量：" + resList.length);
            Laya.loader.load(resList, Handler.create(this, () => {
                this.startGame();
            }), Handler.create(this, (percentage) => {
                this.updateLoadingProgress(percentage * 100);
            }, null, false));
        }
        else {
            this.startGame();
        }
    }
    checkAuthority() {
        let curStatus = 0;
        const rect = LayerManager.getRealStageRect(this.ui.btnStart);
        platform.authenticLogin((res) => {
            if (res) {
                new Token().verify(Laya.Handler.create(this, (token) => {
                    xiaoduo = window.xiaoduo;
                    xiaoduo.wxQuestMarket.init(PathConfig.AppUrl, {
                        token, success: (quest) => {
                            if (quest) {
                                for (const target of quest.questTargets) {
                                    target.progress = target.target;
                                }
                                xiaoduo.wxQuestMarket.requestSubmitQuestProgress({ quest });
                            }
                        }
                    });
                    userData.versionCheck(() => {
                        if (res && res.userInfo) {
                            M.player.account = res.userInfo.nickName;
                            HttpManager.Instance.requestSaveWxUserinfoData(platform.encode(res.userInfo.nickName), res.userInfo.avatarUrl, res.userInfo.city, res.userInfo.gender);
                            this.loadCache();
                        }
                    });
                }));
            }
        }, {
            x: rect.x, y: rect.y,
            width: rect.width, height: rect.height
        }, (_status) => {
            if (curStatus == _status) {
                return;
            }
            curStatus = _status;
            if (_status > 0 && _status < 3) {
                //微信授权登录
                EffectUtils.showWaitEffect("正在登录");
            }
            else if (_status == 3) {
                //进入游戏
                EffectUtils.stopWaitEffect();
            }
        });
    }
    updateLoadingProgress(percentage) {
        let percent = Math.floor(percentage);
        percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;
        if (this.ui) {
            if (this.ui.lblProgress && this.ui.progressBar && this.ui.lblLoadingDesc) {
                this.ui.lblProgress.visible = this.ui.progressBar.visible = this.ui.lblLoadingDesc.visible = percent < 100;
                this.ui.lblProgress.text = "" + percent + "%";
                this.ui.lblLoadingDesc.changeText("正在召唤英雄... ");
            }
            this.ui.imgBar && (this.ui.imgBar.width = 284 * percent / 100);
        }
    }
    tweenAd() {
        if (this.ui.imgStart) {
            console.log("@FREEMAN：广告屏切换开始");
            this.ui.imgStart.visible = true;
            Laya.Tween.to(this.ui.imgStart, { alpha: 0 }, 300, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
                console.log("@FREEMAN：广告屏切换结束");
                this.ui.imgStart.destroy();
                this.prepareAccount();
            }), 1e3);
        }
    }
    startGame() {
        HallScene.Create(M.layer.renderLayer);
        if (Laya.Browser.onMiniGame) {
            Laya.Browser.window.wx.postMessage({ message: "friendRank" });
        }
        Laya.timer.clearAll(this);
        this.destroy();
    }
}
//# sourceMappingURL=MainLoadingView.js.map