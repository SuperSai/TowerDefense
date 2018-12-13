import {Token} from 'token.js'

//数据缓存
var requestCache = {}

class HttpRequest {
	constructor(_url){
		this.baseUrl = _url;
    this.vToken = new Token(_url);
	}
	//http请求
	request(_params, _noToken) {
		var that = this;

		if (!_params.method) {
			_params.method = 'Get'
		};

		//仅缓存Get数据
		if (_params.cache && _params.method =='Get') {
			var res = requestCache[_params.url];
			if (res && _params.success) {
				console.log("cache:"+_params.url);
				_params.success(res)
				return;
			};
		};

	    wx.request({
        url: that.baseUrl+_params.url,
        method: _params.method,
        header: {
          'Content-Type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        data: _params.data,
        success: function(res) {
          var code = res.statusCode.toString();
          if (code =='401') {
            if (!_noToken) {
              if (that.vToken) {
                that.vToken.requestCreate((token)=>{
                  that.request(_params, true)
                })
              };
            };
          } else if (code =='500') {
            console.log("request-err: ",_params.url);
          } else if (_params.success) {
            requestCache[_params.url] = res;
            _params.success(res)
          };
        },
        fail: function(res) {
          if (_params.fail) {
            _params.fail(res)
          };
        },
        complete: function(res) {
          if (_params.complete) {
            _params.complete(res)
          };
        }
	    })
	}
	//文件上传
	uploadFile(_params, _noToken) {
		var that = this;
	    wx.uploadFile({
        url: that.baseUrl+_params.url,
        header: {
          'Content-Type': 'application/json',
          'token': wx.getStorageSync('token')
        },
            filePath: _params.filePath,
            name: _params.name,
            formData:_params.formData,
        success: function(res) {
          var code = res.statusCode.toString();
          if (code =='401') {
            if (!_noToken) {
              if (that.vToken) {
                that.vToken.requestCreate((token)=>{
                  that.uploadFile(_params, true)
                })
              };
            };
          } else if (_params.success) {
            _params.success(res)
          };
        }
	    })
	}
}

export {HttpRequest}
