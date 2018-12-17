class Token {
    constructor(_url) {
        this.baseUrl = _url;
    }
    //请求创建一个token
    requestCreate(callback) {
        var that = this;

        const launchOptions = wx.getLaunchOptionsSync();
        console.log("FREEMAN@launchOptions:", launchOptions);

        let channel = "0_" + launchOptions.scene;

        if (launchOptions && launchOptions.query && launchOptions.query.channel) {
            channel = "" + launchOptions.query.channel + "_" + launchOptions.scene;
        }

        wx.login({
            success: function (res) {
                wx.request({
                    url: that.baseUrl + 'v1/token/user',
                    method: 'POST',
                    data: {
                        code: res.code,
                        channel
                    },
                    success: function (res1) {
                        var token = res1.data.token;
                        wx.setStorageSync('token', token);
                        callback && callback(token);
                    }
                })
            }
        })
    }
    //请求验证
    requestVerify(_token) {
        var that = this;
        wx.request({
            url: that.baseUrl + 'v1/token/verify',
            method: 'POST',
            data: {
                token: _token
            },
            success: function (res) {
                var valid = res.data.isValid;
                if (!valid) {
                    that.requestCreate();
                }
            }
        })
    }
    //验证
    verify() {
        var token = wx.getStorageSync('token');
        if (token) {
            this.requestVerify(token);
        } else {
            this.requestCreate();
        };
    }
}

export {
    Token
}