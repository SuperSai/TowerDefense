xiaoduo = window.xiaoduo;

const M = new ManagerShortcuts();
const userData: UserData = new UserData();

platform.onShow(function (e: any) {
    EventsManager.Instance.event(EventsType.BACK_GAME);
    M.more.applyMute();
    if (platform.isSharing()) return;
    //离线收益
    if (userData && userData.isLoadStorage()) {
        userData.requestOfflinePrizeData();
    }
});

platform.onHide(function () {
    if (platform.isSharing()) return;
    try {
        //保存数据
        if (userData && userData.isLoadStorage()) {
            userData.saveLocal(true, { petList: true, petShop: true, skill: true });
            userData.saveOfflineTime();
            //上传腾讯云
            userData.setUserCloudStorage();
        }
    } catch (e) {
        console.log("@FREEMAN: 在保存离线数据期间发生了错误：", e);
    }
});


class Main {
    private _loginView: LoginView;
    constructor() {
        Laya.MiniAdpter.init();
        Laya.MiniAdpter['getUrlEncode'] = (url: String, type: String): String => {
            if (url.indexOf(".fnt") != -1 || url.indexOf("sheet.json") != -1 || url.indexOf("language.txt") != -1 || url.indexOf(".json") != -1) {
                return "utf8";
            } else if (type == "arraybuffer") {
                return "";
            }
            return "ascii";
        };
        Laya.init(750, 1334, Laya.WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_NOSCALE;
        M.layer.initLayer(Laya.stage, 750, 1334);

        if (!Laya.Browser.onMiniGame) {
            if (GlobalConfig.DEBUG) {
                this.beginLoad();
                return;
            }
            this._loginView = new LoginView();
            this._loginView.ui.inputAccount.changeText("xdyx");
            this._loginView.ui.inputPwd.changeText("123456");
            this._loginView.on(LoginView.SUBMIT, this, this.onLoginSubmit);
            M.layer.renderLayer.addChild(this._loginView);

        } else {
            Laya.ResourceVersion.enable("version.json", Handler.create(null, this.beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
        }
    }

    private onLoginSubmit({ account, pwd }) {
        EffectUtils.showWaitEffect();
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/token/user',
            method: "Post",
            data: StringUtils.toUrlQueryString({ userName: account, password: pwd }),
            success: res => {
                console.log("@FREEMAN: 请求帐号密码登录:", { account, pwd }, res);
                M.player.account = account;
                M.player.token = res.token;
                Laya.ResourceVersion.enable("version.json", Handler.create(null, this.beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
            },
            fail: ({ error_code, msg }) => {
                console.log("@FREEMAN: 帐号或密码错误:", { error_code, msg });
                EffectUtils.stopWaitEffect();
                MessageUtils.showMsgTips(msg);
            }
        });
    }

    private beginLoad() {
        Laya.loader.load(["loading/start_bg.jpg", "loading/start_btn.png", "loading/tip_bg.png", "loading/loading01.png", "loading/loading02.png", "loading/tip_symbol_01.png"],
            Handler.create(this, () => {
                EffectUtils.stopWaitEffect();
                M.layer.renderLayer.addChild(new MainLoadingView());
            }));
    }
}

setTimeout(() => {
    new Main();
}, 1e3);
