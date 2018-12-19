require("weapp-adapter.js");
require("platform.js");
// require("loading.js");
require("code.js");

import {
  Token
} from 'utils/token.js';
import {
  HttpRequest
} from 'utils/httpRequest.js';

//token校验
// var AppUrl = 'https://mini.vuggame.cn/api/';
var AppUrl = 'https://pokemon.vuggame.com/api/';

var vToken = new Token(AppUrl);
if (vToken) {
  vToken.verify();
};
var httpReq = new HttpRequest(AppUrl);
//接收启动参数
wx.onShow(function (_param) {
  console.log("wx.onShow:", _param);
  if (_param) {
    //好友互助
    if (_param.query && _param.query.shareType == "friendConcur") {
      console.log("好友互助UID:", _param.query.userId);
      httpReq.request({
        url: "v1/friend/click/" + _param.query.userId,
        success: function (res) {
          console.log(res);
        },
        fail: function (res) {
          console.log(res);
        }
      })
    } else if (_param.query && _param.query.userId) {
      //分享礼包
      httpReq.request({
        url: "v1/share/friend",
        method: "POST",
        data: {
          "userId": _param.query.userId,
          "shareId": _param.query.shareId,
          "shareType": _param.query.shareType
        },
        success: function (res) {
          console.log(res);
        },
        fail: function (res) {
          console.log(res);
        }
      })
    } else if (_param.scene == "1020" || _param.scene == "1035" || _param.scene == "1043") {
      // _param.referrerInfo = { appId:"1001"};
      if (_param.referrerInfo && _param.referrerInfo.appId) {
        //公众号接入
        httpReq.request({
          url: "v1/subscription/attention",
          method: "POST",
          data: {
            "scene": _param.scene,
            "appId": _param.referrerInfo.appId
          },
          success: function (res) {
            console.log(res);
            // wx.showLoading({
            //   title: '奖励已发放',
            // });
            // setTimeout(function () {
            //   wx.hideLoading()
            // }, 2000);
          },
          fail: function (res) {
            console.log(res);
          }
        })
      }
    }
  }
})

//延迟启动分包下载
setTimeout(() => {
  // loading.onload();
  var curProgress = 0;
  var loadComplete = function () {
    wx.postMessage({
      message: "friendRank"
    });

    if (curProgress < 1) {
      console.log("dispense with loadSubpackage");
      if (window.platform.onLoading) {
        window.platform.onLoading(100);
      }
    }
  }

  //分包下载
  var nameList = ['images', 'res', 'musics'];
  var loadingProgressList = [0, 0, 0];
  var loadingCount = nameList.length;
  var finishCount = 0;
  var loadingFun = (_strRes, _index) => {
    //下载任务
    const loadTask = wx.loadSubpackage({
      name: _strRes, // name 可以填 name 或者 root
      success: function (res) {
        // 分包加载成功后通过 success 回调
        // console.log(res)
        finishCount++;
        if (finishCount >= loadingCount) {
          loadComplete();
        }
      },
      fail: function (res) {
        // 分包加载失败通过 fail 回调
        console.log(res)
      }
    })
    loadTask.onProgressUpdate(res => {
      // console.log('下载进度' + _strRes + _index, res.progress)
      // console.log('已经下载的数据长度', res.totalBytesWritten)
      // console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
      loadingProgressList[_index] = res.progress;
      curProgress = 0;
      for (var j = 0; j < loadingCount; j++) {
        curProgress += loadingProgressList[j];
      }
      curProgress = curProgress / loadingCount;
      if (window.platform.onLoading) {
        if (curProgress <= 1) {
          curProgress = curProgress * 100;
        }
        window.platform.onLoading(curProgress);
      }
    });
  }
  for (var i = 0; i < loadingCount; i++) {
    loadingFun(nameList[i], i);
  }
}, 3000);

//右上角menu转发
wx.showShareMenu({});
wx.onShareAppMessage(function () {
  return {
    title: '春宵苦短日高起，从此君王不早朝',
    imageUrl: 'loading/loading_bg.jpg'
  }
});