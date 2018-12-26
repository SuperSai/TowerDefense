require("weapp-adapter.js");
require("platform.js");
require("xiaoduo.js");
require("code.js");
import {
    HttpRequest
} from 'utils/httpRequest.js';
const AppUrl = "https://pokemon.vuggame.com/api/";

const httpReq = new HttpRequest(AppUrl);

//右上角menu转发
wx.showShareMenu({
    withShareTicket: true,
    success() {
        console.log("@David -- showShareMenu成功！");
    }
})

wx.onShareAppMessage(function () {
    return {
        title: '心有千军万马，挥手一统天下，我是英雄挺住!',
        imageUrl: ShareImgUrl
    }
});

//接收启动参数
wx.onShow(function (_param) {
    console.log("wx.onShow:", _param);
    if (_param) {
        _param.scene = Math.floor(_param.scene);
        //好友互助
        if (_param.query && _param.query.shareType == "help") {
            console.log("好友互助UID:", _param.query.userId);
            httpReq.request({
                url: "v1/activity/help/click/" + _param.query.userId,
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
        } else if (_param.scene === 1020 || _param.scene === 1035 || _param.scene === 1043) {
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
                    },
                    fail: function (res) {
                        console.log(res);
                    }
                })
            }
        }
    }
})