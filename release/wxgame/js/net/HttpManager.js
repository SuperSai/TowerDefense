/*
* HTTP数据请求管理类
*/
var HttpManager = /** @class */ (function () {
    function HttpManager() {
    }
    //商店数据
    HttpManager.prototype.requestSkillAddtionData = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/get/intensify',
            success: function (res) {
                console.log("requestSkillAddtionData:", res);
                if (res) {
                    userData.skillAdditionArray = res;
                }
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
                CommonFun.stopWaitEffect();
                CommonFun.showTip("网络异常");
            }
        });
    };
    //汽车商店数据
    HttpManager.prototype.requestCarshopData = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/shop/get',
            success: function (res) {
                console.log("requestCarshopData:", res);
                // if (res && (typeof res != 'string')) {
                if (res) {
                    userData.carBuyRecordArray = res;
                }
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
                CommonFun.stopWaitEffect();
                CommonFun.showTip("网络异常");
            }
        });
    };
    //车位数据
    HttpManager.prototype.requestCarparkData = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/seat/get',
            success: function (res) {
                console.log("requestCarparkData:", res);
                if (res) {
                    for (var key in userData.parkcarInfoArray) {
                        if (userData.parkcarInfoArray.hasOwnProperty(key)) {
                            var element = res[key];
                            if (element) {
                                userData.parkcarInfoArray[key] = element;
                            }
                        }
                    }
                }
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
                CommonFun.stopWaitEffect();
                CommonFun.showTip("网络异常");
            }
        });
    };
    //用户精华碎片
    HttpManager.prototype.requestEssenceData = function () {
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get_essence',
            success: function (res) {
                console.log("requestEssenceData:", res);
                if (res) {
                    userData.essence = CommonFun.parseStringNum(res.essence);
                    if (eventCenter) {
                        eventCenter.event(essenceChangeEvt, res);
                    }
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //用户元宝
    HttpManager.prototype.requestDiamondData = function () {
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get_diamond',
            success: function (res) {
                console.log("requestDiamondData:", res);
                // if (res && (typeof res != 'string')) {
                if (res) {
                    userData.diamond = CommonFun.parseStringNum(res.diamond);
                    if (eventCenter) {
                        eventCenter.event(diamondChangeEvt, res);
                    }
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //通知服务器已领取离线收益
    HttpManager.prototype.requestNotifyServerPrize = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/reward',
            success: function (res) {
                console.log("requestNotifyServerPrize:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //分享/广告可点击次数(广告->ad; 分享免费得车->free_car; 买车金币不足得金币->no_money; 加速->acce;)
    HttpManager.prototype.requestShareAdTimes = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/operational/get_num',
            success: function (res) {
                console.log("requestShareAdTimes", res);
                userData.shareAdTimes = res;
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //获取分享主题
    HttpManager.prototype.requestShareSubject = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/to',
            success: function (res) {
                console.log(res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //分享完成
    HttpManager.prototype.requestShareFinish = function (_shareId, _encryptedData, _iv, _callback) {
        if (_encryptedData === void 0) { _encryptedData = ''; }
        if (_iv === void 0) { _iv = ''; }
        if (_callback === void 0) { _callback = null; }
        var that = this;
        var dataString = 'share_id=' + _shareId + '&encryptedData=' + _encryptedData + '&iv=' + _iv;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/finish',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log(res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //分享广告完成
    HttpManager.prototype.requestShareAdFinish = function (_kind, shareId) {
        if (shareId === void 0) { shareId = 0; }
        var that = this;
        var dataString = 'type=' + _kind + '&share_id=' + shareId;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/operational/post_info',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //分享标志
    HttpManager.prototype.requestShareFlag = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/flag',
            success: function (res) {
                console.log("requestShareFlag", res);
                userData.shareSwitchOpen = res;
                if (eventCenter) {
                    eventCenter.event(shareSwitchEvt, res);
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //新老版本更新检测（防止老数据覆盖）
    HttpManager.prototype.requestVersionCheck = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/check/version',
            success: function (res) {
                console.log("requestVersionCheck", res);
                if (res && res.clear_flag) {
                    //清理老数据
                    // that.clearLocalData();
                }
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    Object.defineProperty(HttpManager, "Instance", {
        get: function () {
            if (HttpManager._instance == null) {
                HttpManager._instance = new HttpManager();
            }
            return HttpManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return HttpManager;
}());
//# sourceMappingURL=HttpManager.js.map