class Token {
    requestCreate(complete) {
        let launchOptions = Laya.Browser.window.wx.getLaunchOptionsSync();
        console.log("@FREEMAN: 启动参数：", launchOptions);
        // 获取⼴告id
        let aid = 0;
        let channel = "0_" + launchOptions.scene;
        if (launchOptions && launchOptions.query && launchOptions.query.channel) {
            let gdt_vid = launchOptions.query.gdt_vid;
            let weixinadinfo = launchOptions.query.weixinadinfo;
            if (weixinadinfo) {
                let weixinadinfoArr = weixinadinfo.split(".");
                aid = weixinadinfoArr[0];
            }
            channel = "" + launchOptions.query.channel + "_" + launchOptions.scene;
        }
        else if (launchOptions && launchOptions.referrerInfo) {
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
                    url: PathConfig.AppUrl + 'v5/token/user',
                    method: 'POST',
                    data: {
                        code: res.code,
                        channel: channel,
                        aid: aid
                    },
                    success: function (res1) {
                        let token = res1.data.token;
                        Laya.Browser.window.wx.setStorageSync('token', token);
                        complete && complete.runWith(token);
                    }
                });
            }
        });
    }
    //请求验证
    requestVerify(token, complete) {
        Laya.Browser.window.wx.request({
            url: PathConfig.AppUrl + 'v1/token/verify',
            method: 'POST',
            data: {
                token: token
            },
            success: (res) => {
                let valid = res.data.isValid;
                if (!valid) {
                    this.requestCreate(complete);
                }
                else {
                    complete && complete.runWith(token);
                }
            }
        });
    }
    //验证
    verify(complete) {
        let token = Laya.Browser.window.wx.getStorageSync('token');
        if (token) {
            this.requestVerify(token, complete);
        }
        else {
            this.requestCreate(complete);
        }
    }
}
//# sourceMappingURL=Token.js.map