/*
* name;
*/
var HttpManager = /** @class */ (function () {
    function HttpManager() {
    }
    /** 请求通关奖励 */
    HttpManager.prototype.requestStagePrizeDiamond = function (_stage, _diamond, _essence, _callback) {
        var that = this;
        var dataString = 'stage=' + _stage + '&diamond=' + _diamond + '&essence=' + _essence;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/stage/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestStagePrizeDiamond", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 请求奖励未领取的关卡 */
    HttpManager.prototype.requestStagePrizeData = function (_callback) {
        if (_callback === void 0) { _callback = null; }
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/stage/get/info',
            success: function (res) {
                console.log("requestStagePrizeData:", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 钻石购怪物 */
    HttpManager.prototype.requestDiamondBuy = function (_order_id, _callback) {
        console.log("钻石购怪物", _order_id);
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/diamond/buy_car/' + _order_id,
            success: function (res) {
                console.log("requestDiamondBuy", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 请求等级奖励钻石 */
    HttpManager.prototype.requestLevelPrizeDiamond = function (_level, _diamond, _callback) {
        var that = this;
        var dataString = 'level=' + _level + '&diamond=' + _diamond;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/upgrade_reward_diamond',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestLevelPrizeDiamond", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 钻石购怪物下单 */
    HttpManager.prototype.requestDiamondBuyOrder = function (_diamond, _callback, _kind) {
        if (_kind === void 0) { _kind = 0; }
        console.log("钻石购怪物订单", _diamond);
        var that = this;
        var strKind = 'buy_car';
        if (_kind == 1) {
            strKind = 'diamond_acce';
        }
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/diamond/order/' + _diamond + '/' + strKind,
            success: function (res) {
                console.log("requestDiamondBuyOrder", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 请求钻石升级 */
    HttpManager.prototype.requestUpdateKingLevel = function (_id, _level, _price, _callback) {
        if (_callback === void 0) { _callback = null; }
        var that = this;
        var dataString = 'type=' + _id + '&value=' + _level + '&price=' + _price + '&unit=' + "diamond";
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/intensify',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestUpdateKingLevel", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 每日任务 */
    HttpManager.prototype.requestDailyTaskData = function (_taskId) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/task/progress/' + _taskId,
            success: function (res) {
                console.log("requestDailyTaskData:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 新老版本清理回调 */
    HttpManager.prototype.requestVersionClear = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/clear/user_data',
            success: function (res) {
                console.log("requestVersionClear", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 新老版本更新检测（防止老数据覆盖） */
    HttpManager.prototype.requestVersionCheck = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    /** 分享广告完成 */
    HttpManager.prototype.requestShareAdFinish = function (_kind, shareId) {
        if (shareId === void 0) { shareId = 0; }
        var that = this;
        var dataString = 'type=' + _kind + '&share_id=' + shareId;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    /** 分享完成 */
    HttpManager.prototype.requestShareFinish = function (_shareId, _encryptedData, _iv, _callback) {
        if (_encryptedData === void 0) { _encryptedData = ''; }
        if (_iv === void 0) { _iv = ''; }
        if (_callback === void 0) { _callback = null; }
        var that = this;
        var dataString = 'share_id=' + _shareId + '&encryptedData=' + _encryptedData + '&iv=' + _iv;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    /** 获取分享主题 */
    HttpManager.prototype.requestShareSubject = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    /** 通知服务器已领取离线收益 */
    HttpManager.prototype.requestNotifyServerPrize = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    /** 技能强化 */
    HttpManager.prototype.requestSkillAddtionData = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/get/intensify',
            success: function (res) {
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
                EffectUtils.stopWaitEffect();
                MessageUtils.showMsgTips("网络异常");
            }
        });
    };
    /** 英雄商店数据 */
    HttpManager.prototype.requestCarshopData = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/shop/get',
            success: function (res) {
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
                EffectUtils.stopWaitEffect();
                MessageUtils.showMsgTips("网络异常");
            }
        });
    };
    /** 用户精华碎片 */
    HttpManager.prototype.requestEssenceData = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get_essence',
            success: function (res) {
                if (res) {
                    userData.essence = MathUtils.parseStringNum(res.essence);
                    if (EventsManager.Instance) {
                        EventsManager.Instance.event(EventsType.ESSENCE_CHANGE, res);
                    }
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 用户钻石 */
    HttpManager.prototype.requestDiamondData = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get_diamond',
            success: function (res) {
                if (res) {
                    userData.diamond = MathUtils.parseStringNum(res.diamond);
                    if (EventsManager.Instance) {
                        EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, res);
                    }
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 坑位数据 */
    HttpManager.prototype.requestCarparkData = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
                EffectUtils.stopWaitEffect();
                MessageUtils.showMsgTips("网络异常");
            }
        });
    };
    /** 分享/广告可点击次数(广告->ad; 分享免费得车->free_car; 买车金币不足得金币->no_money; 加速->acce;) */
    HttpManager.prototype.requestShareAdTimes = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/operational/get_num',
            success: function (res) {
                userData.shareAdTimes = res;
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 用户信息金币 */
    HttpManager.prototype.requestUserinfoData = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get',
            success: function (res) {
                console.log("requestUserinfoData:", res);
                if (res) {
                    userData.gold = MathUtils.parseStringNum(res.money);
                    console.log("获取服务器发送过来金币数量：" + userData.gold);
                    userData.carLevel = MathUtils.parseInt(res.car_level);
                    userData.level = MathUtils.parseInt(res.level);
                    userData.diamond = MathUtils.parseStringNum(res.diamond);
                    if (res.hasOwnProperty("essence")) {
                        userData.essence = MathUtils.parseInt(res.essence);
                    }
                    if (res.hasOwnProperty("stage")) {
                        userData.passStage = MathUtils.parseInt(res.stage);
                    }
                    if (res.hasOwnProperty("king_level")) {
                        userData.kingLevel = MathUtils.parseStringNum(res.king_level);
                    }
                    if (res.hasOwnProperty("evolution_level")) {
                        userData.evolutionLevel = MathUtils.parseStringNum(res.evolution_level);
                    }
                    if (res.tutorial) {
                        userData.noviceGroupId = parseInt(res.tutorial);
                    }
                    userData.userId = res.id;
                    console.log("@FREEMAN: UserId = {" + userData.userId + "}");
                    EventsManager.Instance.event(EventsType.UPDATE_HALL_DATA);
                    _callback && _callback(res);
                }
                else {
                    this.requestUserinfoData(_callback);
                }
            },
            fail: function (res) {
                console.log(res);
                EffectUtils.stopWaitEffect();
                MessageUtils.showMsgTips("网络异常");
                this.requestUserinfoData(_callback);
            }
        });
    };
    /** 提交用户名称位置等信息 */
    HttpManager.prototype.requestSaveWxUserinfoData = function (_nickName, _avatarUrl, _city, _gender) {
        var that = this;
        var dataString = 'nickName=' + _nickName + '&avatarUrl=' + _avatarUrl + '&city=' + _city + '&gender=' + _gender;
        console.log("requestSaveWxUserinfoData:", dataString);
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/update',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestSaveWxUserinfoData2", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 强化数据 */
    HttpManager.prototype.requestSaveSkillAdditionData = function () {
        var dataJson = JSON.stringify(userData.skillAdditionArray);
        var dataString = 'info=' + dataJson;
        console.log("requestSaveSkillAdditionData:", dataString);
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/update/intensify',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestSaveSkillAdditionData:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 用户基础数据 */
    HttpManager.prototype.requestSaveUserinfoData = function () {
        var that = this;
        var dataString = 'money=' + userData.gold + '&car_level=' + userData.carLevel;
        dataString += '&stage=' + userData.getPassStage();
        dataString += '&king_level=' + userData.getKingLevel();
        console.log("requestSaveUserinfoData:", dataString);
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("@FREEMAN: 请求心跳保存数据：", res);
                if (res) {
                    if (res.task_flag) {
                        EventsManager.Instance.event(EventsType.TASK_RED_POINT, "show");
                    }
                }
            },
            fail: function (res) {
                console.log("@FREEMAN: 请求心跳保存数据：", res);
            }
        });
    };
    /** 保存坑位数据 */
    HttpManager.prototype.requestSaveCarparkData = function () {
        var that = this;
        var dataJson = JSON.stringify(userData.parkcarInfoArray);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || userData.parkcarInfoArray.length < 1 || userData.carparkJsonRecord == dataJson) {
            return;
        }
        userData.carparkJsonRecord = dataJson;
        var dataString = 'info=' + dataJson;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/seat/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestSaveCarparkData2:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 保存英雄商店数据 */
    HttpManager.prototype.requestSaveCarshopData = function () {
        var that = this;
        var dataJson = JSON.stringify(userData.carBuyRecordArray);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || userData.carBuyRecordArray.length < 1 || userData.carshopJsonRecord == dataJson) {
            return;
        }
        userData.carshopJsonRecord = dataJson;
        var dataString = 'info=' + dataJson;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/shop/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestSaveCarshopData2:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 分享标志 */
    HttpManager.prototype.requestShareFlag = function () {
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/flag',
            success: function (res) {
                console.log("requestShareFlag", res);
                userData.shareSwitchOpen = res;
                if (EventsManager.Instance) {
                    EventsManager.Instance.event(EventsType.SHARE_SWITCH, res);
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 随机钻石奖励请求 */
    HttpManager.prototype.requestShowRandomRewardDiamond = function (callback) {
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/rand/diamond',
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 随机钻石奖励请求 */
    HttpManager.prototype.requestRandomRewardDiamond = function (diamond, callback) {
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/rand/diamond/reward/' + diamond,
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    /** 领取在线奖励 */
    HttpManager.prototype.requestGetOffLineReward = function (callback) {
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/online/reward',
            success: function (res) {
                callback && callback(res);
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