var Token = /** @class */ (function () {
    function Token() {
    }
    Token.prototype.requestCreate = function (complete) {
        var launchOptions = Laya.Browser.window.wx.getLaunchOptionsSync();
        console.log("@FREEMAN: 启动参数：", launchOptions);
        var channel = "0_" + launchOptions.scene;
        if (launchOptions && launchOptions.query && launchOptions.query.channel) {
            channel = "" + launchOptions.query.channel + "_" + launchOptions.scene;
        }
        if (launchOptions && launchOptions.referrerInfo) {
            if (launchOptions.referrerInfo.extraData && launchOptions.referrerInfo.extraData.channel) {
                channel = "" + launchOptions.referrerInfo.extraData.channel + "_" + launchOptions.scene;
            }
            else {
                if (launchOptions.referrerInfo.appId) {
                    channel = launchOptions.referrerInfo.appId + "_" + launchOptions.scene;
                }
            }
        }
        Laya.Browser.window.wx.login({
            success: function (res) {
                Laya.Browser.window.wx.request({
                    url: PathConfig.AppUrl + 'v1/token/user',
                    method: 'POST',
                    data: {
                        code: res.code,
                        channel: channel
                    },
                    success: function (res1) {
                        var token = res1.data.token;
                        Laya.Browser.window.wx.setStorageSync('token', token);
                        complete && complete.runWith(token);
                    }
                });
            }
        });
    };
    //请求验证
    Token.prototype.requestVerify = function (token, complete) {
        var _this = this;
        Laya.Browser.window.wx.request({
            url: PathConfig.AppUrl + 'v1/token/verify',
            method: 'POST',
            data: {
                token: token
            },
            success: function (res) {
                var valid = res.data.isValid;
                if (!valid) {
                    _this.requestCreate(complete);
                }
                else {
                    complete && complete.runWith(token);
                }
            }
        });
    };
    //验证
    Token.prototype.verify = function (complete) {
        var token = Laya.Browser.window.wx.getStorageSync('token');
        if (token) {
            this.requestVerify(token, complete);
        }
        else {
            this.requestCreate(complete);
        }
    };
    return Token;
}());
//# sourceMappingURL=Token.js.map