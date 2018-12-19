/*
* terry 2018/7/16;
* 用户数据本地存储
*/
var UserData = /** @class */ (function () {
    function UserData() {
        this._noviceGroupId = 1; // 新手节点
        /** 合成次数 */
        this.synthesisCount = 0;
        /** 金币 */
        this.gold = 2000; //拥有金币
        /** 钻石 */
        this.diamond = 30; //拥有元宝
        /** 精华 */
        this.essence = 0; //精华碎片
        /** 怪物缓存池的名字 */
        this.MONSTER_POOL_NAME = "MONSTER_POOL_NAME";
        /** 怪物子弹 */
        this.MONSTER_BULLET = "MONSTER_BULLET";
        this.ANIMATION_POOL_NAME = "ANIMATION_POOL_NAME";
        this.parkcarInfoArray = []; //车位信息({id: index, carId: 0, isRunning:false})
        this.carBuyRecordArray = []; //车购买记录({carId: 1, buyTimes:0})
        this.skillAdditionArray = []; //技能加成表({skillId: 1, buyTimes:0})
        this.carLevel = 1; //当前车最高等级
        this.level = 2; //玩家等级
        this.kingLevel = 1; //森林王进化等级
        this.evolutionLevel = 1; //商店进化等级
        this.passStage = 1; //通关的游戏关卡
        this.passSection = 1; //通过的游戏章节
        this.s_user_old = 'user_data'; //保存本地v1.0
        this.s_user = "user_storage"; //保存本地
        this.s_offline_time = 's_offline_time'; //离线服务器时间
        this.s_offlinePrize_time = 's_offlinePrize_time'; //离线奖励时间
        this.s_version_clear = 's_version_clear'; //版本清理
        this.s_shopRedPoint_time = 's_shopRedPoint_time'; //商城红点再次检测倒计时启动时间
        this.s_acceLeft_time = 's_acceLeft_time'; //加速剩余时间
        this._isLoadStorage = false; //是否已加载本地数据
        this.cs_time_diff = 0; //客户端与服务器时间差
        this.hasOfflinePrize = false; //是否领取离线奖励
        this.shareSwitchOpen = false; //分享开关打开
        this.userId = 0; //用户id-用于分享奖励
        this.shareAdTimes = {}; //分享广告可点击次数
        /** 在线奖励剩余次数 */
        this.offlineRewardCount = 0;
        this.shareAdStage = {}; //分享或广告状态
        this.hasVideoAd = true; //是否有视频广告
        this.showShareGiftRedPoint = false; //分享礼包红点
        this.showDailySignRedPoint = false; //每日签到红点
        this.showStrengthenRedPoint = false; //强化红点
        this.showTaskRedPoint = false; //任务红点
        this.showLuckPrizeRedPoint = false; //转盘红点
        this.showFollowRedPoint = false; //关注奖励红点
        this.showFriendConcurRedPoint = false; //好友互助红点
        this.isOpenShareAd = false; //打开视频分享
        this.advert = []; //广告
        this.diamond_acce_num = 0; //每日元宝加速次数
        this.shareFailedTimes = 0; //分享失败保底
        this.carparkJsonRecord = ''; //防止提交相同数据给服务器
        this.carshopJsonRecord = ''; //防止提交相同数据给服务器
        this.menuRedPointCount = 0;
        //初始化车位
        for (var index = 0; index < 20; index++) {
            this.parkcarInfoArray[index] = { id: index, carId: 0, isRunning: false };
        }
        //分享广告
        this.shareAdStage[10] = true;
        this.shareAdStage[11] = true;
        this.shareAdStage[12] = true;
    }
    Object.defineProperty(UserData.prototype, "noviceGroupId", {
        get: function () {
            return this._noviceGroupId;
        },
        set: function (value) {
            this._noviceGroupId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserData.prototype, "dayGetGoldCount", {
        get: function () {
            return PlayerManager.Instance.Info.dayGetGoldCount;
        },
        set: function (value) {
            PlayerManager.Instance.Info.dayGetGoldCount = value;
        },
        enumerable: true,
        configurable: true
    });
    UserData.prototype.getUserId = function () {
        var that = this;
        return ("user_" + that.userId);
    };
    UserData.prototype.saveNovice = function (groupId) {
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/novice/' + groupId,
            success: function (res) {
                console.log("@FREEMAN: saveNovice: success, currGroupId =>", groupId);
            },
            fail: function (res) {
                console.log("@FREEMAN: saveNovice: fail, currGroupId =>", groupId);
            }
        });
        this.noviceGroupId = groupId;
        this.saveLocal();
    };
    /** 刷新购买记录 */
    UserData.prototype.refreshBuyRecord = function (_carId, _isDiamond) {
        if (_isDiamond === void 0) { _isDiamond = false; }
        var that = this;
        var mLevel = BattleManager.Instance.getLevel(_carId);
        var isNew = true;
        for (var key in that.carBuyRecordArray) {
            var element = that.carBuyRecordArray[key];
            if (element && element.carId == mLevel) {
                if (_isDiamond) {
                    that.carBuyRecordArray[key].diamondBuyTimes++;
                }
                else {
                    that.carBuyRecordArray[key].buyTimes++;
                }
                isNew = false;
                return;
            }
        }
        if (isNew) {
            if (_isDiamond) {
                that.carBuyRecordArray.push({ carId: mLevel, buyTimes: 0, diamondBuyTimes: 1 });
            }
            else {
                that.carBuyRecordArray.push({ carId: mLevel, buyTimes: 1, diamondBuyTimes: 0 });
            }
        }
        Laya.timer.callLater(that, that.saveLocal, [true, { petShop: true }]);
    };
    /** 查询购买记录 */
    UserData.prototype.queryBuyRecord = function (_carId, _isDiamond) {
        if (_isDiamond === void 0) { _isDiamond = false; }
        var that = this;
        var mLevel = BattleManager.Instance.getLevel(_carId);
        for (var key in that.carBuyRecordArray) {
            var element = that.carBuyRecordArray[key];
            if (element) {
                if (element.carId == mLevel) {
                    if (_isDiamond) {
                        return that.carBuyRecordArray[key].diamondBuyTimes;
                    }
                    else {
                        return that.carBuyRecordArray[key].buyTimes;
                    }
                }
            }
        }
        return 0;
    };
    /** 刷新技能加成 */
    UserData.prototype.refreshSkillAddition = function (_skillId) {
        var that = this;
        var isNew = true;
        for (var key in that.skillAdditionArray) {
            var element = that.skillAdditionArray[key];
            if (element && element.skillId == _skillId) {
                that.skillAdditionArray[key].buyTimes++;
                isNew = false;
                return;
            }
        }
        if (isNew) {
            that.skillAdditionArray.push({ skillId: _skillId, buyTimes: 1 });
        }
        //保存数据
        // userData.saveLocal();
        Laya.timer.callLater(that, that.saveLocal, [true, { skill: true }]);
    };
    /** 查询技能加成 */
    UserData.prototype.querySkillAddition = function (_skillId) {
        var that = this;
        for (var key in that.skillAdditionArray) {
            var element = that.skillAdditionArray[key];
            if (element) {
                if (element.skillId == _skillId) {
                    return that.skillAdditionArray[key].buyTimes;
                }
            }
        }
        return 0;
    };
    /** 获取技能加成或触发几率 */
    UserData.prototype.getSkillAdditionProbability = function (_skillId) {
        var that = this;
        var strengthenLevel = that.querySkillAddition(_skillId);
        if (strengthenLevel == 0)
            return 0;
        var probability = SkillManager.Instance.getSkillStrengthenLevelProbability(_skillId, strengthenLevel);
        return probability;
    };
    /** 升级车辆等级 */
    UserData.prototype.updateCarLevel = function (_level) {
        var that = this;
        if (that.carLevel < that.carLevelMax()) {
            if (that.carLevel < _level) {
                that.carLevel = _level;
                console.log("等级提升:", that.carLevel);
                //保存数据
                // userData.saveLocal();
                Laya.timer.callLater(that, that.saveLocal, [true]);
                return true;
            }
        }
        else {
            console.log("已达到最高等级");
        }
        return false;
    };
    UserData.prototype.getCarLevel = function () {
        return this.carLevel;
    };
    UserData.prototype.carLevelMax = function () {
        return BattleManager.Instance.model.monsterMaxLevel;
    };
    UserData.prototype.resetMonsterLevel = function () {
        this.carLevel = 1;
    };
    //设置金币并保存
    UserData.prototype.setGoldSave = function ($gold) {
        this.gold = Math.floor($gold);
        Laya.timer.callLater(this, this.saveLocal);
    };
    /** 设置钻石 */
    UserData.prototype.setDiamond = function (_value) {
        this.diamond = Math.floor(_value);
        Laya.timer.callLater(this, this.saveLocal);
    };
    /** 设置精华 */
    UserData.prototype.setEssence = function (_value) {
        this.essence = Math.floor(_value);
    };
    /** 升级森林王等级 */
    UserData.prototype.updateKingLevel = function (_level) {
        var that = this;
        if (that.kingLevel < that.kingLevelMax()) {
            if (that.kingLevel < _level) {
                that.kingLevel = _level;
                Laya.timer.callLater(that, that.saveLocal, [true]);
                return true;
            }
            if (GlobalConfig.DEBUG) {
                that.kingLevel = _level;
                Laya.timer.callLater(that, that.saveLocal);
            }
        }
        else {
            console.log("已达到最高等级");
        }
        return false;
    };
    UserData.prototype.getKingLevel = function () {
        return this.kingLevel;
    };
    UserData.prototype.kingLevelMax = function () {
        return 60;
    };
    /** 升级森林王等级 */
    UserData.prototype.updateEvolutionLevel = function (_level) {
        var that = this;
        if (that.evolutionLevel < that.evolutionLevelMax()) {
            if (that.evolutionLevel < _level) {
                that.evolutionLevel = _level;
                Laya.timer.callLater(that, that.saveLocal, [true]);
                return true;
            }
        }
        else {
            console.log("已达到最高等级");
        }
        return false;
    };
    UserData.prototype.getEvolutionLevel = function () {
        return this.evolutionLevel;
    };
    UserData.prototype.evolutionLevelMax = function () {
        return 2;
    };
    //是否已进化
    UserData.prototype.isEvolution = function () {
        return (this.evolutionLevel > 1);
    };
    //设置车位并保存
    UserData.prototype.setCarparkSave = function (_carParkSp, _carParkSp2) {
        if (_carParkSp2 === void 0) { _carParkSp2 = null; }
        var that = this;
        if (that.parkcarInfoArray) {
            for (var key in that.parkcarInfoArray) {
                var element = that.parkcarInfoArray[key];
                if (_carParkSp) {
                    if (element && element.id == _carParkSp.parkIndex) {
                        element.carId = _carParkSp.monsterId;
                        element.isRunning = _carParkSp.isRunning();
                    }
                }
                //交换车辆
                if (_carParkSp2) {
                    if (element && element.id == _carParkSp2.parkIndex) {
                        element.carId = _carParkSp2.monsterId;
                        element.isRunning = _carParkSp2.isRunning();
                    }
                }
            }
        }
        Laya.timer.callLater(that, that.saveLocal);
        Laya.timer.once(3e3, that, HttpManager.Instance.requestSaveCarparkData);
    };
    //通关的游戏关卡
    UserData.prototype.updatePassStage = function (_value) {
        var that = this;
        that.passStage = _value;
        Laya.timer.callLater(that, that.saveLocal, [true]);
    };
    UserData.prototype.getPassStage = function () {
        return this.passStage;
    };
    //通过的游戏章节
    UserData.prototype.updatePassSection = function (_value) {
        var that = this;
        that.passSection = _value;
        Laya.timer.callLater(that, that.saveLocal, [true]);
    };
    UserData.prototype.getPassSection = function () {
        return this.passSection;
    };
    //分享广告可点击次数
    UserData.prototype.getAdTimes = function (_kind) {
        var that = this;
        if (that.shareAdTimes && that.hasVideoAd) {
            if (_kind == 10) {
                return that.shareAdTimes.ad_acce_num;
            }
            else if (_kind == 11) {
                return that.shareAdTimes.ad_free_car_num;
            }
            else if (_kind == 12) {
                return that.shareAdTimes.ad_no_money_num;
            }
        }
        return 0;
    };
    UserData.prototype.getShareTimes = function (_kind) {
        var that = this;
        if (that.shareAdTimes) {
            if (_kind == 10) {
                return that.shareAdTimes.share_acce_num;
            }
            else if (_kind == 11) {
                return that.shareAdTimes.share_shop_num;
            }
            else if (_kind == 12) {
                return that.shareAdTimes.share_no_money_num;
            }
        }
        return 0;
    };
    //减少分享广告可点击次数
    UserData.prototype.decreAdTimes = function (_kind) {
        var that = this;
        if (that.shareAdTimes) {
            if (_kind == 10) {
                that.shareAdTimes.ad_acce_num--;
            }
            else if (_kind == 11) {
                that.shareAdTimes.share_shop_num--;
            }
            else if (_kind == 12) {
                that.shareAdTimes.ad_no_money_num--;
            }
            else {
                that.shareAdTimes.ad_num--;
            }
        }
    };
    UserData.prototype.decreShareTimes = function (_kind) {
        var that = this;
        if (that.shareAdTimes) {
            if (_kind == 10) {
                that.shareAdTimes.share_acce_num--;
            }
            else if (_kind == 11) {
                that.shareAdTimes.share_shop_num--;
            }
            else if (_kind == 12) {
                that.shareAdTimes.share_no_money_num--;
            }
        }
        console.log("decreShareTimes", that.shareAdTimes);
    };
    //分享或广告开关
    UserData.prototype.isAdStage = function (_kind) {
        var that = this;
        return (that.getAdTimes(_kind) > 0);
    };
    //显示分享礼包红点
    UserData.prototype.isShowShareGiftRedPoint = function () {
        return this.showShareGiftRedPoint;
    };
    //移除分享礼包红点
    UserData.prototype.removeShareGiftRedPoint = function () {
        this.showShareGiftRedPoint = false;
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.SHARE_GIFT_RED_POINT, "remove");
        }
    };
    //显示每日签到红点
    UserData.prototype.isShowDailySignRedPoint = function () {
        return this.showDailySignRedPoint;
    };
    //移除红点
    UserData.prototype.removeDailySignRedPoint = function () {
        this.showDailySignRedPoint = false;
        if (EventsManager.Instance) {
            this.menuRedPointCount--;
            EventsManager.Instance.event(EventsType.DAY_SIGN_RED_POINT, "remove");
        }
    };
    //显示强化红点
    UserData.prototype.isShowStrengthenRedPoint = function () {
        return this.showStrengthenRedPoint;
    };
    //移除红点
    UserData.prototype.removeStrengthenRedPoint = function () {
        this.showStrengthenRedPoint = false;
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.STRENGTHEN_RED_POINT, "remove");
        }
    };
    //显示车商店红点
    UserData.prototype.isShowCarShopRedPoint = function () {
        var that = this;
        return ((that.getAdTimes(11) + that.getShareTimes(11)) > 0) && (that.carLevel >= 6 && that.carLevel < 30);
    };
    //移除车商店红点
    UserData.prototype.removeCarShopRedPoin = function () {
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.HERO_SHOP_RED_POINT, "remove");
        }
    };
    //显示任务红点
    UserData.prototype.isShowTaskRedPoint = function () {
        return this.showTaskRedPoint;
    };
    //移除红点
    UserData.prototype.removeTaskRedPoint = function () {
        this.showTaskRedPoint = false;
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.TASK_RED_POINT, "remove");
        }
    };
    //显示转盘红点
    UserData.prototype.isShowLuckPrizeRedPoint = function () {
        return this.showLuckPrizeRedPoint;
    };
    //移除红点
    UserData.prototype.removeLuckPrizeRedPoint = function () {
        this.showLuckPrizeRedPoint = false;
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.LUCK_PRIZED_RED_POINT, "remove");
        }
    };
    //显示关注红点
    UserData.prototype.isShowFollowRedPoint = function () {
        return this.showFollowRedPoint;
    };
    //移除红点
    UserData.prototype.removeFollowRedPoint = function () {
        this.showFollowRedPoint = false;
        if (EventsManager.Instance) {
            this.menuRedPointCount--;
            EventsManager.Instance.event(EventsType.FOLLOW_RED_POINT, "remove");
        }
    };
    //显示好友互助红点
    UserData.prototype.isShowFriendConcurRedPoint = function () {
        return this.showFriendConcurRedPoint;
    };
    //移除好友互助红点
    UserData.prototype.removeFriendConcurRedPoint = function () {
        this.showFriendConcurRedPoint = false;
        if (EventsManager.Instance) {
            this.menuRedPointCount--;
            EventsManager.Instance.event(EventsType.FRIEND_CONCUR_RED_POINT, "remove");
        }
    };
    //是否新手
    UserData.prototype.isGuide = function () {
        var that = this;
        return false;
    };
    //小程序跳转
    UserData.prototype.miniCode = function () {
        var that = this;
        if (that.advert && that.advert[0]) {
            return that.advert[0].url;
        }
        return "wx57ab0ba00d80503a";
    };
    UserData.prototype.miniPagePath = function () {
        var that = this;
        if (that.advert && that.advert[0]) {
            return that.advert[0].jump_path;
        }
        return "";
    };
    UserData.prototype.miniImageUrl = function () {
        var that = this;
        if (that.advert && that.advert[0]) {
            return that.advert[0].icon;
        }
        return "";
    };
    //每日元宝加速次数
    UserData.prototype.diamondAcceTimes = function (_isAdd) {
        if (_isAdd === void 0) { _isAdd = false; }
        var that = this;
        var diamondAcceTimes = that.diamond_acce_num;
        if (_isAdd) {
            that.diamond_acce_num++;
        }
        return diamondAcceTimes;
    };
    //保存本地
    UserData.prototype.saveLocal = function (_upload, saveOptions) {
        if (_upload === void 0) { _upload = false; }
        var that = this;
        if (that._isLoadStorage == false) {
            console.log("未同步本地/服务器数据");
            return;
        }
        else if (that.isGuide()) {
            console.log("新手引导不保存");
            return;
        }
        var localData = {};
        ["gold"].forEach(function (element) {
            localData[element] = that[element];
        });
        var dataJson = JSON.stringify(localData);
        if (dataJson) {
            var storage = window.localStorage;
            storage.setItem(that.s_user, dataJson);
        }
        if (_upload) {
            HttpManager.Instance.requestSaveUserinfoData();
            saveOptions && saveOptions.petList && HttpManager.Instance.requestSaveCarparkData();
            saveOptions && saveOptions.petShop && HttpManager.Instance.requestSaveCarshopData();
            saveOptions && saveOptions.skill && HttpManager.Instance.requestSaveSkillAdditionData();
        }
    };
    //取出本地数据
    UserData.prototype.loadStorage = function (_callback) {
        var that = this;
        that._isLoadStorage = true;
        GameEnterManager.Instance.init();
        LanguageManager.Instance.loadLanguage();
        if (GlobalConfig.DEBUG) {
            if (GlobalConfig.USER) {
                that.s_user = GlobalConfig.USER;
            }
            if (GlobalConfig.NEW_ACCOUNT) {
                _callback && _callback(true);
                return;
            }
        }
        var storage = window.localStorage;
        var dataJson = storage.getItem(that.s_user);
        if (dataJson) {
            var jsonObj = JSON.parse(dataJson);
            if (jsonObj) {
                console.log("@FREEMAN: 本地缓存 {" + that.s_user + "} 读取成功：{", jsonObj, "}");
                that["gold"] = jsonObj["gold"];
                // for (let key in jsonObj) {
                //     if (jsonObj.hasOwnProperty(key)) {
                //         that[key] = jsonObj[key];
                //     }
                // }
            }
        }
        if (Laya.Browser.onPC) {
            //测试
            _callback && _callback(true);
            return;
        }
        else {
            //从服务器同步数据
            var serverDataProgress_1 = 4;
            HttpManager.Instance.requestCarparkData(function (_res) {
                serverDataProgress_1--;
                if (serverDataProgress_1 < 1) {
                    _callback && _callback(true);
                }
            });
            HttpManager.Instance.requestCarshopData(function (_res) {
                if (_res)
                    that.carBuyRecordArray = _res;
                serverDataProgress_1--;
                if (serverDataProgress_1 < 1) {
                    _callback && _callback(true);
                }
            });
            HttpManager.Instance.requestUserinfoData(function (_res) {
                serverDataProgress_1--;
                if (serverDataProgress_1 < 1) {
                    _callback && _callback(true);
                }
            });
            HttpManager.Instance.requestSkillAddtionData(function (_res) {
                if (_res)
                    that.skillAdditionArray = _res;
                serverDataProgress_1--;
                if (serverDataProgress_1 < 1) {
                    _callback && _callback(true);
                }
            });
            //超时尝试重新请求
            Laya.stage.timerOnce(12000, that, function () {
                console.log("serverDataProgress:", serverDataProgress_1);
                if (serverDataProgress_1 > 0) {
                    that.loadStorage(_callback);
                }
            });
        }
        //请求分享开关
        HttpManager.Instance.requestShareFlag();
        that.requestUserBaseData();
    };
    UserData.prototype.isLoadStorage = function () {
        return this._isLoadStorage;
    };
    UserData.prototype.clearLocalData = function () {
        var that = this;
        var storage = window.localStorage;
        if (storage) {
            storage.removeItem(that.s_user_old);
            storage.removeItem(that.s_user);
            console.log("@FREEMAN: 本地缓存{" + that.s_user + "}已清除。");
        }
    };
    //离线奖励
    UserData.prototype.offlinePrize = function () {
        var that = this;
        var storage = window.localStorage;
        var dataJson = storage.getItem(that.s_offlinePrize_time);
        var offlineTime = MathUtils.parseInt(dataJson);
        if (offlineTime > 0) {
            storage.removeItem(that.s_offlinePrize_time);
        }
        return offlineTime;
    };
    //保存离线时间
    UserData.prototype.saveOfflineTime = function () {
        var that = this;
        var storage = window.localStorage;
        var offlineServerTime = that.serverTime();
        storage.setItem(that.s_offline_time, offlineServerTime.toString());
    };
    //保存加速剩余时间
    UserData.prototype.saveAcceLeftTime = function (_acceLeftTime) {
        var that = this;
        var storage = window.localStorage;
        if (_acceLeftTime > 0) {
            storage.setItem(that.s_acceLeft_time, _acceLeftTime.toString());
        }
        else {
            storage.removeItem(that.s_acceLeft_time);
        }
    };
    //获取加速剩余时间
    UserData.prototype.getAcceLeftTime = function () {
        var that = this;
        var storage = window.localStorage;
        var dataJson = storage.getItem(that.s_acceLeft_time);
        if (dataJson) {
            var acceLeftTime = MathUtils.parseInt(dataJson);
            storage.removeItem(that.s_acceLeft_time);
            return acceLeftTime;
        }
        return 0;
    };
    //获取本地与服务器时间差(s减c)
    UserData.prototype.csDiffTime = function () {
        var that = this;
        return that.cs_time_diff;
    };
    //获取服务器当前时间
    UserData.prototype.serverTime = function () {
        var that = this;
        var cur_time = (new Date()).getTime() / 1000;
        return (cur_time + that.csDiffTime());
    };
    //获取上次离线服务器时间
    UserData.prototype.offlineServerTime = function () {
        var that = this;
        var storage = window.localStorage;
        var dataJson = storage.getItem(that.s_offline_time);
        console.log("获取上次离线服务器时间:", dataJson);
        if (dataJson) {
            var offlineServerTime = MathUtils.parseInt(dataJson); //上次离线时间
            if (offlineServerTime > 0) {
                return offlineServerTime;
            }
        }
        return 0;
    };
    //保存商城红点开始时间
    UserData.prototype.saveShopRedpointTime = function (_checkTime) {
        var that = this;
        var storage = window.localStorage;
        var nextCheckTime = that.serverTime() + _checkTime;
        storage.setItem(that.s_shopRedPoint_time, nextCheckTime.toString());
    };
    UserData.prototype.shiftShopRedpointTime = function (_isRemove) {
        if (_isRemove === void 0) { _isRemove = true; }
        var that = this;
        var storage = window.localStorage;
        var dataJson = storage.getItem(that.s_shopRedPoint_time);
        var saveServerTime = MathUtils.parseInt(dataJson);
        if (saveServerTime > 0) {
            var leftTime = saveServerTime - that.serverTime();
            if (_isRemove) {
                storage.removeItem(that.s_shopRedPoint_time);
            }
            if (leftTime > 0) {
                return leftTime;
            }
        }
        return 0;
    };
    UserData.prototype.isShareEnable = function () {
        return this.shareSwitchOpen;
    };
    //请求分享
    UserData.prototype.toShare = function (_callback, _isTask, _isGroupShare, shareType) {
        if (_callback === void 0) { _callback = null; }
        if (_isTask === void 0) { _isTask = false; }
        if (_isGroupShare === void 0) { _isGroupShare = false; }
        if (shareType === void 0) { shareType = "share"; }
        var that = this;
        var isTask = _isTask;
        var isGroupShare = _isGroupShare;
        HttpManager.Instance.requestShareSubject(function (_res) {
            if (!_res) {
                MessageUtils.showMsgTips("今日分享次数已用完");
                return;
            }
            var shareCfg = { imageUrl: _res.image, content: _res.describe, id: _res.id };
            var queryData = null;
            if (isTask) {
                queryData = "userId=" + userData.userId + "&shareId=" + shareCfg.id + "&shareType=task";
            }
            else {
                queryData = "userId=" + userData.userId + "&shareId=" + shareCfg.id + "&shareType=" + shareType;
            }
            //重返游戏
            var curTime = (new Date()).getTime() / 1000;
            var isAutoShare = true;
            EventsManager.Instance.once(EventsType.BACK_GAME, that, function (_data) {
                var backTime = (new Date()).getTime() / 1000;
                var leaveTime = backTime - curTime;
                if (isAutoShare && leaveTime > 2.3) {
                    if (true) {
                        that.shareFailedTimes = 0;
                        _callback && _callback(shareCfg.id);
                        HttpManager.Instance.requestShareFinish(shareCfg.id);
                    }
                    else {
                        // that.shareFailedTimes++;
                        // MessageUtils.showMsgTips("分享失败，请尝试重新分享");
                    }
                }
            });
            platform.onShare({
                title: shareCfg.content,
                imageUrl: shareCfg.imageUrl,
                query: queryData,
                isGroupShare: isGroupShare,
                success: function (_res) {
                },
                fail: function () {
                    console.log("转发失败!!!");
                }
            });
            // }))
        });
    };
    //请求分享/视频
    UserData.prototype.toShareAd = function (callback, type, isTask, isGroupShare) {
        if (callback === void 0) { callback = null; }
        if (type === void 0) { type = 0; }
        if (isTask === void 0) { isTask = false; }
        if (isGroupShare === void 0) { isGroupShare = false; }
        var self = this;
        if (self.isOpenShareAd)
            return 0;
        self.isOpenShareAd = true;
        Laya.stage.timerOnce(1000, self, function () {
            self.isOpenShareAd = false;
        });
        //是否优先视频广告
        if (self.getAdTimes(type) > 0) {
            SDKManager.Instance.showVideoAd(function (_res) {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (_res && _res.isEnded || _res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    self.decreAdTimes(type);
                    var adKey = "ad";
                    if (type == 10) {
                        adKey = "ad_acce";
                    }
                    else if (type == 11) {
                        adKey = "ad_free_car";
                    }
                    else if (type == 12) {
                        adKey = "ad_no_money";
                    }
                    HttpManager.Instance.requestShareAdFinish(adKey);
                    callback && callback();
                }
            }, function () {
                //无视频回调
                self.hasVideoAd = false;
                self.isOpenShareAd = false;
                self.toShareAd(callback, type, isTask, isGroupShare);
            }, self.isShareEnable());
            return 0;
        }
        switch (type) {
            case 1:
                SDKManager.Instance.showVideoAd(function (_res) {
                    if (_res && _res.isEnded || _res === undefined) {
                        callback && callback();
                        HttpManager.Instance.requestShareAdFinish("ad_other", _res);
                    }
                }, function () {
                    //无视频回调
                    self.hasVideoAd = false;
                    self.isOpenShareAd = false;
                    self.toShareAd(callback, 0, isTask, isGroupShare);
                });
                break;
            case 10:
                //加速
                if (self.getShareTimes(type) < 1) {
                    return 1;
                }
                self.toShare(function (_res) {
                    self.decreShareTimes(type);
                    HttpManager.Instance.requestShareAdFinish("share_acce", _res);
                    callback && callback();
                }, isTask, isGroupShare);
                break;
            case 11:
                //免费的车
                if (self.getShareTimes(type) < 1) {
                    MessageUtils.showMsgTips("今日分享次数已用完");
                    return 1;
                }
                self.toShare(function (_res) {
                    self.decreShareTimes(type);
                    HttpManager.Instance.requestShareAdFinish("share_shop_car", _res);
                    callback && callback();
                }, isTask, isGroupShare);
                break;
            case 12:
                //无金币
                if (self.getShareTimes(type) < 1) {
                    MessageUtils.showMsgTips("今日分享次数已用完");
                    return 1;
                }
                self.toShare(function (_res) {
                    MessageUtils.showMsgTips("求助已发出");
                    Laya.timer.once(30000, self, function () {
                        callback && callback();
                    });
                    self.decreShareTimes(type);
                    HttpManager.Instance.requestShareAdFinish("share_no_money", _res);
                }, isTask, isGroupShare);
                break;
            case 13:
                // 天降惊喜礼包分享
                self.toShare(function (res) {
                    callback && callback();
                    HttpManager.Instance.requestShareAdFinish("share_sky_drop", res);
                }, isTask, isGroupShare);
                break;
            case 14: //好友互助分享
                self.toShare(function (res) {
                    callback && callback();
                    HttpManager.Instance.requestShareAdFinish("share_friend_concur", res);
                }, isTask, isGroupShare, "friendConcur");
                break;
            //分享无限次数
            default: {
                self.toShare(function (_res) {
                    callback && callback();
                    HttpManager.Instance.requestShareAdFinish("share_other", _res);
                }, isTask, isGroupShare);
            }
        }
        if (!Laya.Browser.onMiniGame) {
            callback && callback();
        }
        return 0;
    };
    //计算精灵个数
    UserData.prototype.caculateMonsterCount = function (_id) {
        var num = 0;
        if (this.parkcarInfoArray) {
            this.parkcarInfoArray.forEach(function (element) {
                if (element && element.carId == _id) {
                    num++;
                }
            });
        }
        return num;
    };
    //上传腾讯云
    UserData.prototype.setUserCloudStorage = function () {
        var that = this;
        //上传微信云
        var money = Math.floor(that.getPassStage()).toString();
        var kvDataList = [{
                key: "score",
                value: money
            }, {
                key: "city",
                value: (PlayerManager.Instance.Info.wxUserInfo ? PlayerManager.Instance.Info.wxUserInfo.city : '火星')
            }, {
                key: "userId",
                value: that.getUserId()
            }];
        platform.setUserCloudStorage(kvDataList);
    };
    //新老版本更新检测（防止老数据覆盖）
    UserData.prototype.versionCheck = function (_callback) {
        var that = this;
        var storage = window.localStorage;
        HttpManager.Instance.requestVersionCheck(function (_res) {
            if (_res && _res.clear_flag) {
                //清理老数据
                storage.setItem(that.s_version_clear, 'true');
            }
        });
        //上一次记录清理
        var dataJson = storage.getItem(that.s_version_clear);
        if (dataJson) {
            //需要清理数据
            HttpManager.Instance.requestVersionClear(function (_res) {
                storage.removeItem(that.s_version_clear);
                that.clearLocalData();
                _callback && _callback();
            });
        }
        else {
            _callback && _callback();
        }
    };
    //用户基础数据
    UserData.prototype.requestUserBaseData = function (_callback) {
        if (_callback === void 0) { _callback = null; }
        var self = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/user/info',
            success: function (res) {
                console.log("requestUserBaseData:", res);
                if (res) {
                    self.offlineRewardCount = res.remain_online_num;
                    self.shareAdTimes = res.operation;
                    PlayerManager.Instance.Info.dayGetGoldCount = self.shareAdTimes.share_no_money_num;
                    self.showShareGiftRedPoint = res.share_reward_flag;
                    self.showDailySignRedPoint = res.sign_flag;
                    self.showTaskRedPoint = res.task_flag;
                    self.showLuckPrizeRedPoint = res.roulette_flag;
                    self.showFollowRedPoint = res.subscribe_flag;
                    self.showFriendConcurRedPoint = res.friend_help_flag;
                    self.advert = res.advert;
                    self.diamond_acce_num = res.diamond_acce_num;
                    if (EventsManager.Instance) {
                        if (self.isShowShareGiftRedPoint()) {
                            EventsManager.Instance.event(EventsType.SHARE_GIFT_RED_POINT, "show");
                        }
                        if (self.isShowDailySignRedPoint()) {
                            self.menuRedPointCount++;
                            EventsManager.Instance.event(EventsType.DAY_SIGN_RED_POINT, "show");
                        }
                        if (self.isShowCarShopRedPoint()) {
                            EventsManager.Instance.event(EventsType.HERO_SHOP_RED_POINT, "show");
                        }
                        if (self.isShowTaskRedPoint()) {
                            EventsManager.Instance.event(EventsType.TASK_RED_POINT, "show");
                        }
                        if (self.isShowLuckPrizeRedPoint()) {
                            EventsManager.Instance.event(EventsType.LUCK_PRIZED_RED_POINT, "show");
                        }
                        if (self.isShowFollowRedPoint()) {
                            self.menuRedPointCount++;
                            EventsManager.Instance.event(EventsType.FOLLOW_RED_POINT, "show");
                        }
                        if (self.isShowFriendConcurRedPoint()) {
                            self.menuRedPointCount++;
                            EventsManager.Instance.event(EventsType.FRIEND_CONCUR_RED_POINT, "show");
                        }
                        EventsManager.Instance.event(EventsType.ACCE_CHANGE, "refresh");
                    }
                }
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //查询离线奖励
    UserData.prototype.requestOfflinePrizeData = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/login',
            success: function (res) {
                var offlineTime = MathUtils.parseInt(res.time); //离线时长
                var login_time = MathUtils.parseInt(res.login_time); //登录当前服务器时间
                var cur_time = (new Date()).getTime() / 1000;
                that.cs_time_diff = login_time - cur_time;
                var storage = window.localStorage;
                var dataJson = storage.getItem(that.s_offline_time);
                console.log("读取本地离线:", dataJson);
                if (dataJson) {
                    offlineTime = 0;
                    var last_logout_time = MathUtils.parseInt(dataJson); //上次离线时间
                    console.log(login_time, cur_time, last_logout_time, (login_time - last_logout_time), that.cs_time_diff);
                    if (!isNaN(last_logout_time) && login_time > last_logout_time) {
                        offlineTime = login_time - last_logout_time;
                    }
                    storage.removeItem(that.s_offline_time);
                }
                if (offlineTime > 0) {
                    storage.setItem(that.s_offlinePrize_time, offlineTime.toString());
                    if (EventsManager.Instance) {
                        EventsManager.Instance.event(EventsType.OFFLINE, true);
                    }
                }
                HttpManager.Instance.requestNotifyServerPrize();
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    return UserData;
}());
//# sourceMappingURL=UserData.js.map