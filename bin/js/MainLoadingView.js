var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MainLoadingView = /** @class */ (function (_super) {
    __extends(MainLoadingView, _super);
    function MainLoadingView() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.login.LoginSceneUI();
        _this.addChild(_this.ui);
        _this.startCountDown();
        _this.tweenAd();
        return _this;
    }
    MainLoadingView.prototype.startCountDown = function () {
        var _this = this;
        Laya.timer.once(15e3, this, function () {
            _this.ui.btnRefresh.visible = true;
            _this.ui.btnRefresh.on(Laya.Event.CLICK, _this, function () {
                _this.prepareAccount();
            });
        });
    };
    MainLoadingView.prototype.prepareAccount = function () {
        if (Laya.Browser.onMiniGame) {
            this.checkAuthority();
        }
        else {
            this.loadCache();
        }
    };
    MainLoadingView.prototype.loadCache = function (complete) {
        var _this = this;
        userData.loadCache();
        GlobleData.Instance.setup(function () {
            userData.loadStorage(function () {
                _this.startToLoad();
            });
        });
    };
    MainLoadingView.prototype.startToLoad = function () {
        this.ui.lblLoadingDesc.visible = true;
        this.ui.progressBar.visible = true;
        this.ui.btnStart.visible = false;
        if (Laya.Browser.onMiniGame) {
            this.loadSubPackages();
        }
        else {
            this.loadRemoteRes();
        }
    };
    MainLoadingView.prototype.loadSubPackages = function () {
        var self = this;
        platform.startLoading(function (percentage) {
            self.updateLoadingProgress(percentage, 1);
            if (percentage >= 100) {
                self.loadRemoteRes();
            }
        });
    };
    // private _time:number = 0;
    MainLoadingView.prototype.loadRemoteRes = function () {
        // if(this._time == 0){
        //     this._time++;
        //     return;
        // }
        // let resList = BattleManager.Instance.getStartLoadPetData();
        // if(resList.length){
        // Laya.loader.load(resList,
        //     Handler.create(this, () => {
        //         GameView.Create(M.layer.renderLayer);
        //     }),
        //     Handler.create(this, (percentage: number) => {
        //         this.updateLoadingProgress(percentage * 100, 2);
        //     }, null, false));
        // } else {
        this.updateLoadingProgress(100, 2);
        HallScene.Create(M.layer.renderLayer);
        Laya.timer.clearAll(this);
        // }
    };
    MainLoadingView.prototype.checkAuthority = function () {
        var _this = this;
        var curStatus = 0;
        var rect = LayerManager.getRealStageRect(this.ui.btnStart);
        platform.authenticLogin(function (res) {
            if (res) {
                new Token().verify(Laya.Handler.create(_this, function () {
                    userData.versionCheck(function () {
                        if (res && res.userInfo) {
                            M.player.account = res.userInfo.nickName;
                            HttpManager.Instance.requestSaveWxUserinfoData(platform.encode(res.userInfo.nickName), res.userInfo.avatarUrl, res.userInfo.city, res.userInfo.gender);
                            _this.loadCache();
                        }
                    });
                }));
            }
        }, {
            x: rect.x, y: rect.y,
            width: rect.width, height: rect.height
        }, function (_status) {
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
    };
    MainLoadingView.prototype.updateLoadingProgress = function (percentage, type) {
        var percent = Math.floor(percentage);
        percent = percent < 0 ? 0 : percent > 100 ? 100 : percent;
        this.ui.lblProgress.visible = this.ui.progressBar.visible = this.ui.lblLoadingDesc.visible = percent < 100;
        this.ui.imgBar.width = 284 * percent / 100;
        this.ui.lblProgress.text = "" + percent + "%";
        if (type === 1) {
            // 加载小游戏分包
            this.ui.lblLoadingDesc.changeText("正在构建英雄世界... ");
        }
        else if (type === 2) {
            // 加载远程资源
            this.ui.lblLoadingDesc.changeText("正在召唤英雄... ");
        }
    };
    MainLoadingView.prototype.tweenAd = function () {
        var _this = this;
        if (this.ui.imgStart) {
            console.log("@FREEMAN：广告屏切换开始");
            this.ui.imgStart.visible = true;
            Laya.Tween.to(this.ui.imgStart, { alpha: 0 }, 300, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
                console.log("@FREEMAN：广告屏切换结束");
                _this.ui.imgStart.destroy();
                _this.prepareAccount();
            }), 1e3);
        }
    };
    return MainLoadingView;
}(Laya.Sprite));
//# sourceMappingURL=MainLoadingView.js.map