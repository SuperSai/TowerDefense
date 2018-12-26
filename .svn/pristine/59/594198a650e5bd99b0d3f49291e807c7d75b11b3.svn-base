/*
* name;
*/
class HttpManager {
    constructor() {
    }
    /** 请求通关奖励 */
    requestStagePrizeDiamond(_stage, _diamond, _essence, _callback) {
        let that = this;
        let dataString = 'stage=' + _stage + '&diamond=' + _diamond + '&essence=' + _essence;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 请求奖励未领取的关卡 */
    requestStagePrizeData(_callback = null) {
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
    }
    /** 钻石购怪物 */
    requestDiamondBuy(_order_id, _callback) {
        console.log("钻石购怪物", _order_id);
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 请求等级奖励钻石 */
    requestLevelPrizeDiamond(_level, _diamond, _callback) {
        let that = this;
        let dataString = 'level=' + _level + '&diamond=' + _diamond;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 钻石购怪物下单 */
    requestDiamondBuyOrder(_diamond, _callback, _kind = 0) {
        console.log("钻石购怪物订单", _diamond);
        let that = this;
        let strKind = 'buy_car';
        if (_kind == 1) {
            strKind = 'diamond_acce';
        }
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 请求钻石升级 */
    requestUpdateKingLevel(_id, _level, _price, _callback = null) {
        let that = this;
        let dataString = 'type=' + _id + '&value=' + _level + '&price=' + _price + '&unit=' + "diamond";
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 每日任务 */
    requestDailyTaskData(_taskId) {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/task/progress/' + _taskId,
            success: function (res) {
                console.log("requestDailyTaskData:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 新老版本清理回调 */
    requestVersionClear(_callback) {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 新老版本更新检测（防止老数据覆盖） */
    requestVersionCheck(_callback) {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 分享广告完成 */
    requestShareAdFinish(_kind, shareId = 0) {
        let that = this;
        let dataString = 'type=' + _kind + '&share_id=' + shareId;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 分享完成 */
    requestShareFinish(_shareId, _encryptedData = '', _iv = '', _callback = null) {
        let that = this;
        let dataString = 'share_id=' + _shareId + '&encryptedData=' + _encryptedData + '&iv=' + _iv;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 获取分享主题 */
    requestShareSubject(type, _callback) {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/to?type=' + type,
            success: function (res) {
                console.log(res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 通知服务器已领取离线收益 */
    requestNotifyServerPrize() {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/reward',
            success: function (res) {
                console.log("requestNotifyServerPrize:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 技能强化 */
    requestSkillAddtionData(_callback) {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 英雄商店数据 */
    requestCarshopData(_callback) {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 用户精华碎片 */
    requestEssenceData() {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 用户钻石 */
    requestDiamondData() {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 坑位数据 */
    requestCarparkData(_callback) {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
                    _callback && _callback(res);
                }
            },
            fail: function (res) {
                console.log(res);
                EffectUtils.stopWaitEffect();
                MessageUtils.showMsgTips("网络异常");
            }
        });
    }
    /** 分享/广告可点击次数(广告->ad; 分享免费得车->free_car; 买车金币不足得金币->no_money; 加速->acce;) */
    requestShareAdTimes() {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/operational/get_num',
            success: function (res) {
                userData.shareAdTimes = res;
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 用户信息金币 */
    requestUserinfoData(_callback) {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get',
            success: function (res) {
                console.log("requestUserinfoData:", res);
                if (res) {
                    // @FREEMAN 金币默认读缓存，如果缓存没有读取成功就按服务器返回的结果
                    if (!userData.hasCache(CacheKey.GOLD)) {
                        userData.setMoneySave(MathUtils.parseStringNum(res.money));
                    }
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
    }
    /** 提交用户名称位置等信息 */
    requestSaveWxUserinfoData(_nickName, _avatarUrl, _city, _gender) {
        let that = this;
        let dataString = 'nickName=' + _nickName + '&avatarUrl=' + _avatarUrl + '&city=' + _city + '&gender=' + _gender;
        console.log("requestSaveWxUserinfoData:", dataString);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 强化数据 */
    requestSaveSkillAdditionData() {
        let dataJson = JSON.stringify(userData.skillAdditionArray);
        let dataString = 'info=' + dataJson;
        console.log("requestSaveSkillAdditionData:", dataString);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 用户基础数据 */
    requestSaveUserinfoData() {
        let that = this;
        let dataString = 'money=' + userData.gold + '&car_level=' + userData.carLevel;
        dataString += '&stage=' + userData.getPassStage();
        dataString += '&king_level=' + userData.getKingLevel();
        console.log("requestSaveUserinfoData:", dataString);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 保存坑位数据 */
    requestSaveCarparkData() {
        let that = this;
        let dataJson = JSON.stringify(userData.parkcarInfoArray);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || userData.parkcarInfoArray.length < 1 || userData.carparkJsonRecord == dataJson) {
            return;
        }
        userData.carparkJsonRecord = dataJson;
        let dataString = 'info=' + dataJson;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 保存英雄商店数据 */
    requestSaveCarshopData() {
        let that = this;
        let dataJson = JSON.stringify(userData.carBuyRecordArray);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || userData.carBuyRecordArray.length < 1 || userData.carshopJsonRecord == dataJson) {
            return;
        }
        userData.carshopJsonRecord = dataJson;
        let dataString = 'info=' + dataJson;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 分享标志 */
    requestShareFlag() {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    /** 随机钻石奖励请求 */
    requestShowRandomRewardDiamond(callback) {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/rand/diamond',
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 随机钻石奖励请求 */
    requestRandomRewardDiamond(diamond, callback) {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/rand/diamond/reward/' + diamond,
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 领取在线奖励 */
    requestGetOffLineReward(callback) {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/online/reward',
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 好友互助奖励领取 */
    requestReward(itemId, callback) {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/help/reward/' + itemId,
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 请求好友互助列表 */
    requestFriendConcurList(callback) {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/help/list',
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 请求是否获取通关奖励 */
    requestClearanceReward(encryptedData, iv, callback) {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/help/list?encryptedData=' + encryptedData + "&iv=" + iv,
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 请求好友互助 */
    requestFriendConcur(userId) {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: "v1/activity/help/click/" + userId,
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 分享礼包 */
    requestShareGift(param) {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: "v1/share/friend",
            method: "POST",
            data: {
                "userId": param.query.userId,
                "shareId": param.query.shareId,
                "shareType": param.query.shareType
            },
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 公众号 */
    requestPublicAddress(param) {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: "v1/subscription/attention",
            method: "POST",
            data: {
                "scene": param.scene,
                "appId": param.referrerInfo.appId
            },
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    /** 请求技能强化 */
    requestSkillStrengthen(id, level, price, coinType, callback = null) {
        let dataString = 'type=' + id + '&value=' + level + '&price=' + price + '&unit=' + "essence";
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/intensify',
            method: 'Post',
            data: dataString,
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    static get Instance() {
        if (HttpManager._instance == null) {
            HttpManager._instance = new HttpManager();
        }
        return HttpManager._instance;
    }
}
//# sourceMappingURL=HttpManager.js.map