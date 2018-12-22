//数据缓存
var requestCache = {};
class HttpRequestHelper {
    constructor(_url) {
        this.baseUrl = null;
        this.baseUrl = _url;
    }
    //http请求
    request(_params, _noToken = false) {
        console.log("http request==>>", _params.url);
        var that = this;
        if (!_params.method) {
            _params.method = 'Get';
        }
        ;
        //仅缓存Get数据
        if (_params.cache && _params.method == 'Get') {
            var res = requestCache[_params.url];
            if (res && _params.success) {
                console.log("cache:" + _params.url);
                _params.success(res);
                return;
            }
            ;
        }
        ;
        var hr = new HttpRequest();
        hr.on(Laya.Event.PROGRESS, that, (e) => {
            console.log(e);
        });
        hr.once(Laya.Event.ERROR, that, (e) => {
            console.log("Laya.Event.ERROR:", e);
            if (e.indexOf('401') > 0) {
                if (!_noToken) {
                    platform.httpToken(that.baseUrl, (_token) => {
                        that.request(_params, true);
                    }, true);
                }
            }
            else {
                var res = hr.data;
                if (_params && _params.fail) {
                    _params.fail(res);
                }
            }
        });
        hr.once(Laya.Event.COMPLETE, that, (e) => {
            // console.log("Laya.Event.COMPLETE:" + hr.data);
            var res = hr.data;
            if (res == '401') {
                if (!_noToken) {
                    platform.httpToken(that.baseUrl, (_token) => {
                        that.request(_params);
                    }, true);
                }
                ;
            }
            else if (res == '500') {
                console.log("request-err: ", _params.url);
            }
            else if (_params.success) {
                var dataJson = res;
                var jsonObj = dataJson;
                // console.log("jsonObj:", jsonObj);
                if (dataJson) {
                    jsonObj = JSON.parse(dataJson);
                }
                requestCache[_params.url] = jsonObj;
                _params.success(jsonObj);
            }
            ;
        });
        var token = platform.httpToken(that.baseUrl, (_token) => {
            // console.log("httpToken:", _token);
        }, false);
        var header = ["Content-Type", "application/x-www-form-urlencoded;charset=utf-8", "token", token];
        if (_params.method == 'Post') {
            // var header = ["Content-Type", "application/x-www-form-urlencoded", "token", token];
            // console.log("header---", header)
            hr.send(that.baseUrl + _params.url, _params.data, 'POST', 'jsonp', header);
        }
        else {
            // var header = ["Content-Type", "application/json", "token", token];
            // console.log("header---", header)
            hr.send(that.baseUrl + _params.url, null, 'GET', 'jsonp', header);
        }
    }
    //文件上传
    uploadFile(_params, _noToken) {
        // var that = this;
        // wx.uploadFile({
        // 	url: that.baseUrl+_params.url,
        // 	header: {
        // 		'Content-Type': 'application/json',
        // 		'token': wx.getStorageSync('token')
        // 	},
        //     filePath: _params.filePath,
        //     name: _params.name,
        //     formData:_params.formData,
        // 	success: function(res) {
        // 		var code = res.statusCode.toString();
        // 		if (code =='401') {
        // 			if (!_noToken) {
        // 				if (vToken) {
        // 					vToken.requestCreate((token)=>{
        // 						that.uploadFile(_params, true)
        // 					})
        // 				};
        // 			};
        // 		} else if (_params.success) {
        // 			_params.success(res)
        // 		};
        // 	}
        // })
    }
}
//# sourceMappingURL=HttpRequestHelper.js.map