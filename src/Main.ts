xiaoduo = window.xiaoduo;

const M = new ManagerShortcuts();
let userData: UserData;
let systemInfo: WXSystemInfo;

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
        Laya.URL.basePath = PathConfig.RES_URL;
        M.layer.initLayer(Laya.stage, 750, 1334);

        userData = new UserData();
        LayerMgr.Instance.initLayer(Laya.stage, 750, 1334);

        systemInfo = new WXSystemInfo();
        try {
            const infoSync = Laya.Browser.window.wx.getSystemInfoSync();
            ObjectUtils.assign(systemInfo, infoSync);
        } catch (e) {
            console.log("@FREEMAN: 获取系统信息失败");
        }

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
        const domain: string = PathConfig.RES_URL;
        Laya.loader.load([
            "loading/start_bg.jpg",
            "loading/loading_bg.jpg",
            "loading/bar.png",
            "loading/bar_bg.png",
            "loading/loading01.png",
            domain + "loading/start_btn.png",
            domain + "config/language.txt",
            domain + "sheets/sheet.json",
        ],
            Handler.create(this, () => {
                EffectUtils.stopWaitEffect();
                M.layer.renderLayer.addChild(new MainLoadingView());
                Laya.URL.basePath = domain;
            }));
    }
}

new Main();
