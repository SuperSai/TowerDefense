/*
* name;
*/
class HttpManager {
    constructor() {

    }

    /** 向服务器记录前端日志，如果传的是一个错误，则存的是错误堆栈，否则会尝试调用error的toString()，如果error对象没有toString()方法，则直接记录该对象 */
    public requestSaveLog(error: Error | string): void {
        if (!error) return;
        try {
            let log: string = "";
            if (typeof error !== "string") {
                log = error.stack;
                !log && (log = error.name + ": " + error.message);
            } else {
                log = error;
            }

            if (log) {
                const HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
                HttpReqHelper.request({
                    url: 'v1/tool/log',
                    method: "POST",
                    data: {
                        info: log
                    }
                });
            }
        } catch (e) {
            const HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
            HttpReqHelper.request({
                url: 'v1/tool/log',
                method: "POST",
                data: {
                    info: e.stack
                }
            });
        }
    }

    public requestSaveNovice(groupId: number): void {
        if (userData.cache.hasCache(CacheKey.NOVICE_GROUP_ID)) {
            const cacheGroupId = userData.cache.getCache(CacheKey.NOVICE_GROUP_ID);
            if (cacheGroupId === groupId) {
                console.log("color:#336699", "%c@FREEMAN: 新手节点进度没有变化，不需要保存，当前节点：" + groupId);
                return;
            }
        }

        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/novice/' + groupId,
            success: () => {
                console.log("@FREEMAN: 新手节点进度保存成功，当前节点：", groupId);
            },
            fail: () => {
                console.error("@FREEMAN: 新手节点进度保存失败，当前节点：", groupId);
            }
        });
        userData.cache.setCache(CacheKey.NOVICE_GROUP_ID, groupId);
    }

    /** 请求通关奖励 */
    public requestStagePrizeDiamond(_stage: number, _diamond: number, _essence: number, _callback: any): void {
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
    public requestStagePrizeData(_callback: any = null): void {
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
    public requestDiamondBuy(_order_id: number, _callback: any): void {
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
    public requestLevelPrizeDiamond(_level: number, _diamond: number, _callback: any): void {
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
    public requestDiamondBuyOrder(diamond: number, callback: any, type: number = 0): void {
        console.log("钻石购怪物订单", diamond);
        let strKind: string = 'buy_car';
        if (type == 1) {
            strKind = 'diamond_acce';
        }
        console.log("@David 钻石购怪物下单 type:", type);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/diamond/order/' + diamond + '/' + strKind,
            success: function (res) {
                console.log("requestDiamondBuyOrder", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }


    /** 请求钻石升级 */
    public requestUpdateKingLevel(_id: number, _level: number, _price: number, _callback: any = null): void {
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
    public requestDailyTaskData(_taskId: number): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v2/task/progress/' + _taskId,
            success: function (res) {
                console.log("requestDailyTaskData:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 新老版本清理回调 */
    public requestVersionClear(_callback: any): void {
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
    public requestVersionCheck(_callback: any): void {
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
    public requestShareAdFinish(_kind: string, shareId: number = 0): void {
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
    public requestShareFinish(_shareId: number, _encryptedData: string = '', _iv: string = '', _callback: any = null): void {
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
    public requestShareSubject(type: string, _callback: any): void {
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

    //查询离线奖励
    public requestOfflinePrizeData(): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/login',
            success: res => {
                let offlineTimeSpan = MathUtils.parseInt(res.time); //离线时长
                // let login_time = MathUtils.parseInt(res.login_time); //登录当前服务器时间
                if (offlineTimeSpan >= 10 * Time.MIN) {
                    M.event.event(EventsType.OFFLINE, offlineTimeSpan);
                    this.requestNotifyServerPrize();
                }
                userData.cache.setCache(CacheKey.LAST_HEART_BEAT_TIME, new Date().getTime());
                //
                // let cur_time = (new Date()).getTime() / 1000;
                //
                // userData.cs_time_diff = login_time - cur_time;
                // let storage = window.localStorage;
                // let dataJson = storage.getItem(userData.s_offline_time);
                // console.log("读取本地离线:", dataJson);
                // if (dataJson) {
                //     offlineTime = 0;
                //     let last_logout_time = MathUtils.parseInt(dataJson); //上次离线时间
                //     // console.log(login_time, cur_time, last_logout_time, (login_time - last_logout_time), userData.cs_time_diff);
                //     if (!isNaN(last_logout_time) && login_time > last_logout_time) {
                //         offlineTime = login_time - last_logout_time;
                //     }
                //     storage.removeItem(userData.s_offline_time);
                // }
                // if (offlineTime > 0) {
                //     storage.setItem(userData.s_offlinePrize_time, offlineTime.toString());
                //     if (EventsManager.Instance) {
                //         EventsManager.Instance.event(EventsType.OFFLINE, true);
                //     }
                // }

            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 通知服务器已领取离线收益 */
    public requestNotifyServerPrize(): void {
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
    public requestSkillAddtionData(_callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/get/intensify',
            success: res => {
                console.log("requestSkillAddtionData:", res);
                if (res) {
                    userData.skillAdditionArray = res;
                    userData.cache.setCache(CacheKey.SKILL_DATA, res);
                    _callback && _callback(res);
                }
            },
            fail: function (res) {
                console.log(res);
                EffectUtils.stopWaitEffect();
                MessageUtils.showMsgTips("@FREEMAN: 获取技能强化数据时发生网络异常，请检查网络！");
            }
        });
    }

    /** 英雄商店数据 */
    public requestCarshopData(_callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/shop/get',
            success: res => {
                console.log("requestCarshopData:", res);
                if (res) {
                    userData.carBuyRecordArray = res;
                    userData.cache.setCache(CacheKey.SHOP_DATA, res);
                    _callback && _callback(res);
                }
            },
            fail: function (res) {
                console.log(res);
                EffectUtils.stopWaitEffect();
                MessageUtils.showMsgTips("@FREEMAN: 获取商店数据时发生网络异常，请检查网络！");
            }
        });
    }

    /** 用户精华碎片 */
    public requestEssenceData(): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get_essence',
            success: function (res) {
                if (res) {
                    userData.setEssence(MathUtils.parseStringNum(res.essence));
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
    public requestDiamondData(): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get_diamond',
            success: function (res) {
                console.log("requestDiamondData:", res);
                if (res) {
                    M.player.Info.userDiamond = MathUtils.parseStringNum(res.diamond);
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
    public requestCarparkData(_callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/seat/get',
            success: res => {
                console.log("requestCarparkData:", res);
                if (res) {
                    if (res.length) {
                        userData.parkcarInfoArray.map((item, index) => {
                            for (const key in item) {
                                item[key] = res[index][key];
                            }
                        });
                    }
                    userData.cache.setCache(CacheKey.PET_LIST, userData.parkcarInfoArray);
                    _callback && _callback(res);
                }
            },
            fail: function (res) {
                console.log(res);
                EffectUtils.stopWaitEffect();
                MessageUtils.showMsgTips("@FREEMAN: 获取英雄列表时发生网络异常，请检查网络！");
            }
        });

    }

    /** 分享/广告可点击次数(广告->ad; 分享免费得车->free_car; 买车金币不足得金币->no_money; 加速->acce;) */
    public requestShareAdTimes(): void {
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
    public requestUserinfoData(_callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get',
            success: function (res) {
                console.log("requestUserinfoData:", res);
                if (res) {

                    const group: any = {};
                    group[CacheKey.USER_ID] = userData.userId = res.id;

                    userData.setMoney(MathUtils.parseStringNum(res.money));
                    userData.setDiamond(MathUtils.parseStringNum(res.diamond));

                    group[CacheKey.LEVEL] = userData.level = MathUtils.parseInt(res.level);
                    // group[CacheKey.EXP] = userData.exp = MathUtils.parseStringNum(res.exp);

                    group[CacheKey.MAX_SYNTHESIS_LEVEL] = userData.carLevel = MathUtils.parseInt(res.car_level);

                    if (res.essence) {
                        userData.setEssence(MathUtils.parseInt(res.essence));
                    }
                    if (res.stage) {
                        group[CacheKey.STAGE_PASSED] = M.hall.hallData.passStage = userData.passStage = MathUtils.parseInt(res.stage);
                    }
                    if (res.king_level) {
                        group[CacheKey.GUARD_LEVEL] = userData.kingLevel = MathUtils.parseStringNum(res.king_level);
                    }
                    if (res.evolution_level) {
                        group[CacheKey.EVOLUTION_LEVEL] = userData.evolutionLevel = MathUtils.parseStringNum(res.evolution_level);
                    }
                    if (res.tutorial) {
                        group[CacheKey.NOVICE_GROUP_ID] = M.novice.currGroupId = parseInt(res.tutorial);
                    }

                    userData.cache.setCacheGroup(group);
                    EventsManager.Instance.event(EventsType.UPDATE_HALL_DATA);
                    _callback && _callback(res);
                } else {
                    that.requestUserinfoData(_callback);
                }
            },
            fail: function (res) {
                console.log(res);
                EffectUtils.stopWaitEffect();
                MessageUtils.showMsgTips("网络异常");
                that.requestUserinfoData(_callback);
            }
        });
    }

    /** 提交用户名称位置等信息 */
    public requestSaveWxUserinfoData(_nickName: string, _avatarUrl: string, _city: string, _gender: number): void {
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
    public requestSaveSkillAdditionData(forceRightNow: boolean = false): void {
        let dataJson = JSON.stringify(userData.skillAdditionArray);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || userData.skillAdditionArray.length < 1) {
            return;
        }
        if (userData.skillStrengthenJsonRecord == dataJson && !forceRightNow) {
            console.log("@FREEMAN: 技能强化数据距上次上传时未有变化，无需再次上传");
            return;
        }

        let dataString = 'info=' + dataJson;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/update/intensify',
            method: 'Post',
            data: dataString,
            success: res => {
                console.log("@FREEMAN: 技能强化数据上传成功：", userData.skillAdditionArray);
            },
            fail: res => {
                console.log("@FREEMAN: 技能强化数据上传时发生服务器异常：", res);
            }
        });
    }

    /** 用户基础数据 */
    public requestSaveUserinfoData(forceRightNow: boolean = false): void {
        const data = {
            money: M.player.Info.userMoney,
            car_level: userData.getCarLevel(),
            stage: userData.getPassStage(),
            king_level: userData.getKingLevel(),
            synthesis_num: userData.statistics.synthesisNum
        };

        if (!forceRightNow) {
            const notUpload: boolean = ["car_level", "stage", "king_level"].every((key) => {
                return data[key] === userData.lastHeartBeatQueryObj[key];
            });
            if (notUpload) return;
        }

        userData.cache.setCache(CacheKey.LAST_HEART_BEAT_TIME, new Date().getTime());
        userData.lastHeartBeatQueryObj = data;
        const dataString = StringUtils.toUrlQueryString(data);
        console.log("@FREEMAN: 请求心跳保存数据：", data);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v2/userinfo/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("@FREEMAN: 请求心跳保存数据成功：", res);
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
        userData.statistics.synthesisNum = 0;
    }

    /** 保存坑位数据 */
    public requestSaveCarparkData(forceRightNow: boolean = false): void {
        let dataJson = JSON.stringify(userData.parkcarInfoArray);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || userData.parkcarInfoArray.length < 1) {
            return;
        }
        if (userData.carparkJsonRecord == dataJson && !forceRightNow) {
            console.log("@FREEMAN: 参战宠物列表距上次上传时未有变化，无需再次上传");
            return;
        }

        userData.carparkJsonRecord = dataJson;
        let dataString = 'info=' + dataJson;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/seat/post',
            method: 'Post',
            data: dataString,
            success: res => {
                console.log("@FREEMAN: 参战宠物列表上传成功：", userData.parkcarInfoArray);
            },
            fail: res => {
                console.log("@FREEMAN: 参战宠物列表数据上传时发生服务器异常：", res);
            }
        });
    }

    /** 保存英雄商店数据 */
    public requestSaveCarshopData(forceRightNow: boolean = false): void {
        let dataJson = JSON.stringify(userData.carBuyRecordArray);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || userData.carBuyRecordArray.length < 1) {
            return;
        }
        if (userData.carshopJsonRecord == dataJson && !forceRightNow) {
            console.log("@FREEMAN: 商店购买数据距上次上传时未有变化，无需再次上传");
            return;
        }

        userData.carshopJsonRecord = dataJson;

        let dataString = 'info=' + dataJson;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/shop/post',
            method: 'Post',
            data: dataString,
            success: res => {
                console.log("@FREEMAN: 商店购买数据上传成功：", userData.carBuyRecordArray);
            },
            fail: res => {
                console.log("@FREEMAN: 商店购买数据上传时发生服务器异常：", res);
            }
        });
    }

    /** 分享标志 */
    public requestShareFlag(callback?: Function): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/flag',
            success: function (res) {
                console.log("requestShareFlag", res);
                userData.shareSwitchOpen = res;
                if (EventsManager.Instance) {
                    EventsManager.Instance.event(EventsType.SHARE_SWITCH, res);
                }
                callback && callback();
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 随机钻石奖励请求 */
    public requestShowRandomRewardDiamond(callback: Function): void {
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
    public requestRandomRewardDiamond(diamond: number, callback: Function): void {
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
    public requestGetOffLineReward(callback: Function): void {
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
    public requestReward(itemId: number, callback: any): void {
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
    public requestFriendConcurList(callback: any): void {
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
    public requestClearanceReward(uid: string, group_id: string, stage: number, callback: any): void {
        console.log("@David 请求是否获取通关奖励 uid:", uid, " -- group_id:", group_id, " -- stage:", stage);
        let dataString = 'uid=' + uid + '&group_id=' + group_id + '&stage=' + stage;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/stage',
            method: "Post",
            data: dataString,
            success: function (res) {
                callback && callback(res.result);
                return;
            },
            fail: function (res) {
                console.log("请求是否获取通关奖励 未录入成功！");
            }
        });
    }

    /** 请求好友互助 */
    public requestFriendConcur(userId: any): void {
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
    public requestShareGift(param: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        console.log("@David 点击分享卡牌进入游戏的参数：", param);
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
    public requestPublicAddress(param: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: "v1/subscription/attention",
            method: "POST",
            data: {
                "scene": param.scene,
                "appId": param.referrerInfo.appId
            },
            success: function (res) {
                console.log("@David 公众号给服务器发送完毕！", res);
            },
            fail: function (res) {
                console.log("@David 公众号给服务器发送错误！", res);
            }
        });
    }

    /** 请求技能强化 */
    public requestSkillStrengthen(id: number, level: number, price: number, coinType: number, callback: any = null): void {
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

    /** 领取福利奖励 */
    public requestWelfareReward(callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/into/reward',
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 游戏公告 */
    public requestAnnouncement(): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/announcement',
            success: function (res) {
                if (res.result) {
                    ViewMgr.Ins.open(ViewConst.NoticeView, null, res.content);
                } else {
                    console.log("@David 显示游戏公告错误!!!!!!!!!!!!");
                }
            },
            fail: function (res) {
                console.log("@David 显示游戏公告异常!!!!!!!!!!!!");
            }
        });
    }

    /** 获取抽奖信息 */
    public requestPrizeInfo(callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v2/activity/get/roulette',
            success: function (res) {
                console.log("requestPrizeInfo", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 转盘信息统计 废弃没用*/
    public requestPrizeCensus(itemId: number): void {
        let dataString = 'prizeId=' + itemId;
        console.log("requestPrizeCensus:", dataString);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v2/activity/roulette/log',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestPrizeCensus:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 转盘抽奖 */
    public requestDrawPrize(itemId: number, _callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v3/activity/roulette/' + itemId,
            success: function (res) {
                console.log("requestDrawPrize", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
                _callback && _callback(false);
            }
        });
    }

    /** 获取转盘抽奖次数 */
    public requestPrizeCount(callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v3/activity/num/roulette',
            success: function (res) {
                console.log("requestPrizeCount", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 邀请好友数据信息 */
    public requestShareInfo(callback?: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/friend_num',
            success: function (res) {
                console.log("@FREEMAN: requestShareInfo =>", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    //拉取任务信息
    public requestTaskInfo(handler: Laya.Handler): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/task/info',
            success: res => {
                console.log("@FREEMAN: 拉取每日任务列表成功：", res);
                handler && handler.runWith([res]);
            },
            fail: res => {
                console.error("@FREEMAN: 拉取每日任务列表失败：", res);
            }
        });
        userData.statistics.synthesisNum = 0;
    }

    //拉取成就任务信息
    public requestAchievementInfo(callback?: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v2/task/success/list',
            success: function (res) {
                console.log("@FREEMAN: requestAchievementInfo =>", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 拉取任务奖励 */
    public requestTaskReward(itemId: number, callback: any, type: number): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v2/task/rewards/' + itemId + "?type=" + type,
            success: function (res) {
                console.log("requestTaskReward", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 互推位操作日志 */
    public requestAdvertLog(type: string, appId: string, callback: Function = null): void {
        let dataString = 'type=' + type + "&appId=" + appId;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v4/advert/log',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log(res);
                if (res.result) {
                    callback && callback(res);
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    /** 拉取积分墙数据 */
    public requestPlayCourtesy(callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v4/advert/info',
            success: function (res) {
                console.log("@David 拉取积分墙数据", res);
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    private static _instance: HttpManager;
    public static get Instance(): HttpManager {
        if (HttpManager._instance == null) {
            HttpManager._instance = new HttpManager();
        }
        return HttpManager._instance;
    }
}