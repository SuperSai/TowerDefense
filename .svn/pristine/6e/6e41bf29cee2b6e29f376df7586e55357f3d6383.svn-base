require("weapp-adapter.js");
require("platform.js");
require("xiaoduo.js");
require("code.js");

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