require("weapp-adapter.js");
require("platform.js");
require("xiaoduo.js");
require("./code.js");

//右上角menu转发
wx.showShareMenu({
    withShareTicket: true,
    success() {
        console.log("@David -- showShareMenu成功！");
    }
})
wx.updateShareMenu({
    withShareTicket: true,
    success() { 
        console.log("@David -- updateShareMenu成功！");
    }
  })
