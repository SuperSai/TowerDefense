/*
* terry 2018/7/16;
* 用户数据本地存储
*/
var httpReq = null;
var UserData = /** @class */ (function () {
    function UserData() {
        this._noviceGroupId = 1; // 新手节点
        this.money = 2000; //拥有金币
        this.diamond = 100; //拥有元宝
        this.essence = 0; //精华碎片
        /** 怪物缓存池的名字 */
        this.MONSTER_POOL_NAME = "MONSTER_POOL_NAME";
        /** 怪物子弹 */
        this.MONSTER_BULLET = "MONSTER_BULLET";
        this.ANIMATION_POOL_NAME = "ANIMATION_POOL_NAME";
        // public runcarCountMax: number = 2; //跑道车数量最大值
        this.parkcarInfoArray = []; //车位信息({id: index, carId: 0, isRunning:false})
        this.carBuyRecordArray = []; //车购买记录({carId: 1, buyTimes:0})
        this.skillAdditionArray = []; //技能加成表({skillId: 1, buyTimes:0})
        this.carLevel = 1; //当前车最高等级
        this.level = 2; //玩家等级
        this.exp = 0; //玩家经验值
        this.kingLevel = 1; //森林王进化等级
        this.evolutionLevel = 1; //商店进化等级
        this.passStage = 1; //通关的游戏关卡
        this.passSection = 1; //通过的游戏章节
        // private httpDataList: Array<any> = []; //数据传输列表
        this.httpJsonData = null; //正在上传
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
        this.shareAdStage = {}; //分享或广告状态
        this.hasVideoAd = true; //是否有视频广告
        this.showShareGiftRedPoint = false; //分享礼包红点
        this.showDailySignRedPoint = false; //每日签到红点
        // private showCarShopRedPoint: boolean = false; //车商店红点
        this.showTaskRedPoint = false; //任务红点
        this.showLuckPrizeRedPoint = false; //转盘红点
        this.showFollowRedPoint = false; //关注奖励红点
        this.isOpenShareAd = false; //打开视频分享
        this.advert = []; //广告
        this.diamond_acce_num = 0; //每日元宝加速次数
        this.carparkJsonRecord = ''; //防止提交相同数据给服务器
        this.carshopJsonRecord = ''; //防止提交相同数据给服务器
        this.shareFailedTimes = 0; //分享失败保底
        //初始化车位
        for (var index = 0; index < 20; index++) {
            // if (index <1) {
            //     this.parkcarInfoArray[index] = {id: index, carId: 1, isRunning:true};
            // } else if (index <3) {
            //     this.parkcarInfoArray[index] = {id: index, carId: 1, isRunning:false};
            // } else {
            //     this.parkcarInfoArray[index] = {id: index, carId: 0, isRunning:false};
            // }
            this.parkcarInfoArray[index] = { id: index, carId: 0, isRunning: false };
        }
        //分享广告
        this.shareAdStage[10] = true;
        this.shareAdStage[11] = true;
        this.shareAdStage[12] = true;
        //读取本地数据
        // this.loadStorage();
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
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
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
    //刷新购买记录
    UserData.prototype.refreshBuyRecord = function (_carId, _isDiamond) {
        if (_isDiamond === void 0) { _isDiamond = false; }
        var that = this;
        var mLevel = CommonFun.getLevel(_carId);
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
        //保存数据
        // userData.saveLocal();
        Laya.timer.callLater(that, that.saveLocal, [true, { petShop: true }]);
    };
    //查询购买记录
    UserData.prototype.queryBuyRecord = function (_carId, _isDiamond) {
        if (_isDiamond === void 0) { _isDiamond = false; }
        var that = this;
        var mLevel = CommonFun.getLevel(_carId);
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
    //刷新技能加成
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
    //查询技能加成
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
    //获取技能加成或触发几率
    UserData.prototype.getSkillAdditionProbability = function (_skillId) {
        var that = this;
        var strengthenLevel = that.querySkillAddition(_skillId);
        var probability = getSkillStrengthenLevelProbability(_skillId, strengthenLevel);
        return probability;
    };
    //升级车辆等级
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
        return getMonsterMaxLevel();
    };
    UserData.prototype.resetMonsterLevel = function () {
        this.carLevel = 1;
    };
    //设置金币并保存
    UserData.prototype.setMoneySave = function (_money) {
        this.money = Math.floor(_money);
        // this.saveLocal();
        Laya.timer.callLater(this, this.saveLocal);
    };
    //设置元宝
    UserData.prototype.setDiamond = function (_value) {
        this.diamond = Math.floor(_value);
        Laya.timer.callLater(this, this.saveLocal);
    };
    //设置精华
    UserData.prototype.setEssence = function (_value) {
        this.essence = Math.floor(_value);
    };
    //升级森林王等级
    UserData.prototype.updateKingLevel = function (_level) {
        var that = this;
        if (that.kingLevel < that.kingLevelMax()) {
            if (that.kingLevel < _level) {
                that.kingLevel = _level;
                console.log("等级提升:", that.kingLevel);
                //保存数据
                // userData.saveLocal();
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
    //升级森林王等级
    UserData.prototype.updateEvolutionLevel = function (_level) {
        var that = this;
        if (that.evolutionLevel < that.evolutionLevelMax()) {
            if (that.evolutionLevel < _level) {
                that.evolutionLevel = _level;
                console.log("等级提升:", that.evolutionLevel);
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
        // console.log("setCarparkSave", _carParkSp.parkIndex, _carParkSp.carId, _carParkSp.isRunning());
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
        // this.saveLocal();
        Laya.timer.callLater(that, that.saveLocal);
        Laya.timer.callLater(that, that.requestSaveCarparkData);
    };
    //保存经验等级
    UserData.prototype.setLevelSave = function (_value) {
        this.level = Math.floor(_value);
        // this.saveLocal();
        Laya.timer.callLater(this, this.saveLocal);
    };
    //保存经验
    UserData.prototype.setExpSave = function (_value) {
        this.exp = Math.floor(_value);
        // this.saveLocal();
        Laya.timer.callLater(this, this.saveLocal);
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
        // if (that.shareAdTimes && that.shareAdTimes.ad_num >0) {
        //     that.shareAdTimes.ad_num --;
        // }
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
        console.log("decreAdTimes", that.shareAdTimes);
    };
    UserData.prototype.decreShareTimes = function (_kind) {
        var that = this;
        // if (that.shareAdTimes && that.shareAdTimes.ad_num >0) {
        //     that.shareAdTimes.ad_num --;
        // }
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
        // if (that.hasVideoAd && that.shareAdStage) {
        //     return that.shareAdStage[_kind] && (that.getAdTimes() >0);
        // }
        // return false;
        return (that.getAdTimes(_kind) > 0);
    };
    //显示分享礼包红点
    UserData.prototype.isShowShareGiftRedPoint = function () {
        return this.showShareGiftRedPoint;
    };
    //移除分享礼包红点
    UserData.prototype.removeShareGiftRedPoint = function () {
        this.showShareGiftRedPoint = false;
        if (eventCenter) {
            eventCenter.event(shareGiftRedPointEvt, "remove");
        }
    };
    //显示每日签到红点
    UserData.prototype.isShowDailySignRedPoint = function () {
        return this.showDailySignRedPoint;
    };
    //移除红点
    UserData.prototype.removeDailySignRedPoint = function () {
        this.showDailySignRedPoint = false;
        if (eventCenter) {
            eventCenter.event(dailySignRedPointEvt, "remove");
        }
    };
    //显示车商店红点
    UserData.prototype.isShowCarShopRedPoint = function () {
        // return this.showCarShopRedPoint;
        var that = this;
        return ((that.getAdTimes(11) + that.getShareTimes(11)) > 0) && (that.carLevel >= 6 && that.carLevel < 30);
    };
    //移除车商店红点
    UserData.prototype.removeCarShopRedPoin = function () {
        // this.showCarShopRedPoint = false;
        if (eventCenter) {
            eventCenter.event(showCarShopRedPointEvt, "remove");
        }
    };
    //显示任务红点
    UserData.prototype.isShowTaskRedPoint = function () {
        return this.showTaskRedPoint;
    };
    //移除红点
    UserData.prototype.removeTaskRedPoint = function () {
        this.showTaskRedPoint = false;
        if (eventCenter) {
            eventCenter.event(taskRedPointEvt, "remove");
        }
    };
    //显示转盘红点
    UserData.prototype.isShowLuckPrizeRedPoint = function () {
        return this.showLuckPrizeRedPoint;
    };
    //移除红点
    UserData.prototype.removeLuckPrizeRedPoint = function () {
        this.showLuckPrizeRedPoint = false;
        if (eventCenter) {
            eventCenter.event(luckPrizeRedPointEvt, "remove");
        }
    };
    //显示关注红点
    UserData.prototype.isShowFollowRedPoint = function () {
        return this.showFollowRedPoint;
    };
    //移除红点
    UserData.prototype.removeFollowRedPoint = function () {
        this.showFollowRedPoint = false;
        if (eventCenter) {
            eventCenter.event(followRedPointEvt, "remove");
        }
    };
    //是否新手
    UserData.prototype.isGuide = function () {
        var that = this;
        // return that.carLevel <3;
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
        // console.log("-----saveLocal-----");
        var localData = {};
        ["money", "diamond", "parkcarInfoArray", "carBuyRecordArray", "skillAdditionArray", "kingLevel", "evolutionLevel",
            "carLevel", "level", "exp", "userId", "shareAdStage", "passStage", "noviceGroupId", "dayGetGoldCount"].forEach(function (element) {
            localData[element] = that[element];
        });
        // let dataJson = JSON.stringify(that);
        var dataJson = JSON.stringify(localData);
        if (dataJson) {
            var storage = window.localStorage;
            // console.log("saveLocal:", dataJson);
            // console.log("@FREEMAN: 本地数据保存追踪 - s_user");
            storage.setItem(that.s_user, dataJson);
        }
        if (_upload) {
            that.requestSaveUserinfoData();
            saveOptions && saveOptions.petList && that.requestSaveCarparkData();
            saveOptions && saveOptions.petShop && that.requestSaveCarshopData();
            saveOptions && saveOptions.skill && that.requestSaveSkillAdditionData();
        }
    };
    //取出本地数据
    UserData.prototype.loadStorage = function (_callback) {
        var that = this;
        that._isLoadStorage = true;
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
                console.log("@FREEMAN: 本地缓存 {" + that.s_user + "}读取成功 =>", jsonObj);
                for (var key in jsonObj) {
                    if (jsonObj.hasOwnProperty(key)) {
                        // console.log(key, jsonObj[key]);
                        // if (key !="hasOfflinePrize" && key !="diamond" && key !="_isLoadStorage") {
                        //     that[key] = jsonObj[key];
                        // }
                        that[key] = jsonObj[key];
                    }
                }
            }
            _callback && _callback(true);
        }
        else if (Laya.Browser.onPC) {
            //测试
            _callback && _callback(true);
            return;
        }
        else {
            //从服务器同步数据
            var serverDataProgress_1 = 4;
            that.requestCarparkData(function (_res) {
                serverDataProgress_1--;
                if (serverDataProgress_1 < 1) {
                    _callback && _callback(true);
                }
            });
            that.requestCarshopData(function (_res) {
                serverDataProgress_1--;
                if (serverDataProgress_1 < 1) {
                    _callback && _callback(true);
                }
            });
            that.requestUserinfoData(function (_res) {
                serverDataProgress_1--;
                if (serverDataProgress_1 < 1) {
                    _callback && _callback(true);
                }
            });
            that.requestSkillAddtionData(function (_res) {
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
        that.requestShareFlag();
        //获取元宝数据
        // that.requestDiamondData();
        //获取分享广告可点击次数
        // that.requestShareAdTimes();
        //获取玩家信息
        // platform.getUserInfo().then(data=>{
        //   console.log("userInfo:", data)
        // });
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
        // console.log("-----offlinePrize-----");
        var storage = window.localStorage;
        var dataJson = storage.getItem(that.s_offlinePrize_time);
        var offlineTime = CommonFun.parseInt(dataJson);
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
        // console.log("@FREEMAN: 本地数据保存追踪 - s_offline_time");
        storage.setItem(that.s_offline_time, offlineServerTime.toString());
    };
    //保存加速剩余时间
    UserData.prototype.saveAcceLeftTime = function (_acceLeftTime) {
        // console.log("saveAcceLeftTime:", _acceLeftTime);
        var that = this;
        var storage = window.localStorage;
        if (_acceLeftTime > 0) {
            // console.log("@FREEMAN: 本地数据保存追踪 - s_acceLeft_time");
            storage.setItem(that.s_acceLeft_time, _acceLeftTime.toString());
        }
        else {
            // console.log("@FREEMAN: 本地数据保存追踪 - s_acceLeft_time 2");
            storage.removeItem(that.s_acceLeft_time);
        }
    };
    //获取加速剩余时间
    UserData.prototype.getAcceLeftTime = function () {
        var that = this;
        var storage = window.localStorage;
        var dataJson = storage.getItem(that.s_acceLeft_time);
        if (dataJson) {
            var acceLeftTime = CommonFun.parseInt(dataJson);
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
            var offlineServerTime = CommonFun.parseInt(dataJson); //上次离线时间
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
        // console.log("@FREEMAN: 本地数据保存追踪 - s_shopRedPoint_time");
        storage.setItem(that.s_shopRedPoint_time, nextCheckTime.toString());
    };
    UserData.prototype.shiftShopRedpointTime = function (_isRemove) {
        if (_isRemove === void 0) { _isRemove = true; }
        var that = this;
        var storage = window.localStorage;
        var dataJson = storage.getItem(that.s_shopRedPoint_time);
        var saveServerTime = CommonFun.parseInt(dataJson);
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
    UserData.prototype.toShare = function (_callback, _isTask, _isGroupShare) {
        if (_callback === void 0) { _callback = null; }
        if (_isTask === void 0) { _isTask = false; }
        if (_isGroupShare === void 0) { _isGroupShare = false; }
        var that = this;
        var isTask = _isTask;
        var isGroupShare = _isGroupShare;
        that.requestShareSubject(function (_res) {
            if (!_res) {
                CommonFun.showTip("今日分享次数已用完");
                return;
            }
            var shareCfg = { imageUrl: _res.image, content: _res.describe, id: _res.id }; // getRandShareConfig();
            // Laya.loader.load(shareCfg.imageUrl, Laya.Handler.create(that, (_imgTexture:Laya.Texture)=>{
            var queryData = null;
            if (isTask) {
                queryData = "userId=" + userData.userId + "&shareId=" + shareCfg.id + "&shareType=task";
            }
            else {
                queryData = "userId=" + userData.userId + "&shareId=" + shareCfg.id + "&shareType=share";
            }
            //重返游戏
            var curTime = (new Date()).getTime() / 1000;
            var isAutoShare = true;
            eventCenter.once(backGameEvt, that, function (_data) {
                var backTime = (new Date()).getTime() / 1000;
                var leaveTime = backTime - curTime;
                if (isAutoShare && leaveTime > 2.3) {
                    if (true) {
                        that.shareFailedTimes = 0;
                        _callback && _callback(shareCfg.id);
                        that.requestShareFinish(shareCfg.id);
                        CommonFun.showTip("分享成功");
                    }
                    else {
                        that.shareFailedTimes++;
                        CommonFun.showTip("分享失败，请尝试重新分享");
                    }
                }
            });
            platform.onShare({
                title: shareCfg.content,
                imageUrl: shareCfg.imageUrl,
                query: queryData,
                isGroupShare: isGroupShare,
                success: function (_res) {
                    // console.log("转发成功!!!");
                    // isAutoShare = false;
                    // that.shareFailedTimes = 0;
                    // if (isGroupShare) {
                    //     if (_res) {
                    //         console.log("群分享完成:", _res);
                    //         // Laya.stage.timerOnce(600, that, ()=>{
                    //         //     CommonFun.showTip("群分享完成");
                    //         // });
                    //         that.requestShareFinish(shareCfg.id, _res.encryptedData, _res.iv, (_res2)=>{
                    //             if (_res2.code ==1) {
                    //                 _callback && _callback(shareCfg.id);
                    //             } else if (_res2.code ==2) {
                    //                 CommonFun.showTip("分享同个群间隔时间过短");
                    //             }
                    //         });
                    //     } else {
                    //         that.requestShareFinish(shareCfg.id);
                    //         Laya.stage.timerOnce(600, that, ()=>{
                    //             CommonFun.showTip("只有群分享才有效哦");
                    //         });
                    //         return;
                    //     }
                    // } else {
                    //     _callback && _callback(shareCfg.id);
                    //     that.requestShareFinish(shareCfg.id);
                    // }
                },
                fail: function () {
                    console.log("转发失败!!!");
                }
            });
            // }))
        });
    };
    //请求分享/视频
    UserData.prototype.toShareAd = function (_callback, _kind, _isTask, _isGroupShare) {
        if (_callback === void 0) { _callback = null; }
        if (_kind === void 0) { _kind = 0; }
        if (_isTask === void 0) { _isTask = false; }
        if (_isGroupShare === void 0) { _isGroupShare = false; }
        var that = this;
        if (that.isOpenShareAd) {
            return 0;
        }
        that.isOpenShareAd = true;
        Laya.stage.timerOnce(1000, that, function () {
            that.isOpenShareAd = false;
        });
        //是否优先视频广告
        if (that.getAdTimes(_kind) > 0) {
            CommonFun.showVideoAd(function (_res) {
                if (_res && _res.isEnded || _res === undefined) {
                    that.decreAdTimes(_kind);
                    var adKey = "ad";
                    if (_kind == 10) {
                        adKey = "ad_acce";
                    }
                    else if (_kind == 11) {
                        adKey = "ad_free_car";
                    }
                    else if (_kind == 12) {
                        adKey = "ad_no_money";
                    }
                    that.requestShareAdFinish(adKey);
                    _callback && _callback();
                }
            }, function () {
                //无视频回调
                that.hasVideoAd = false;
                that.isOpenShareAd = false;
                that.toShareAd(_callback, _kind, _isTask, _isGroupShare);
            }, that.isShareEnable());
            return 0;
        }
        switch (_kind) {
            case 10: {
                //加速
                if (that.getShareTimes(_kind) < 1) {
                    // CommonFun.showTip("今日分享次数已用完");
                    return 1;
                }
                that.toShare(function (_res) {
                    that.decreShareTimes(_kind);
                    that.requestShareAdFinish("share_acce", _res);
                    _callback && _callback();
                }, _isTask, _isGroupShare);
                break;
            }
            case 11: {
                //免费的车
                if (that.getShareTimes(_kind) < 1) {
                    CommonFun.showTip("今日分享次数已用完");
                    return 1;
                }
                that.toShare(function (_res) {
                    that.decreShareTimes(_kind);
                    that.requestShareAdFinish("share_shop_car", _res);
                    _callback && _callback();
                }, _isTask, _isGroupShare);
                break;
            }
            case 12: {
                //无金币
                if (that.getShareTimes(_kind) < 1) {
                    CommonFun.showTip("今日分享次数已用完");
                    return 1;
                }
                that.toShare(function (_res) {
                    CommonFun.showTip("求助已发出");
                    Laya.timer.once(30000, that, function () {
                        _callback && _callback();
                    });
                    that.decreShareTimes(_kind);
                    that.requestShareAdFinish("share_no_money", _res);
                }, _isTask, _isGroupShare);
                break;
            }
            // case 20: {
            //     if (that.getAdTimes() <1) {
            //         CommonFun.showTip("暂无可观看的视频");
            //         return 2;
            //     }
            //     CommonFun.showVideoAd((_res:any)=>{
            //         if (_res && _res.isEnded || _res === undefined) {
            //             _callback && _callback();
            //             that.decreAdTimes();
            //             that.requestShareAdFinish("ad");
            //         }
            //     });
            //     break;
            // }
            //广告无限次数
            case 13: {
                // 天降惊喜礼包分享
                that.toShare(function (res) {
                    _callback && _callback();
                    that.requestShareAdFinish("share_sky_drop", res);
                }, _isTask, _isGroupShare);
                break;
            }
            case 1: {
                CommonFun.showVideoAd(function (_res) {
                    if (_res && _res.isEnded || _res === undefined) {
                        _callback && _callback();
                        that.requestShareAdFinish("ad_other", _res);
                    }
                }, function () {
                    //无视频回调
                    that.hasVideoAd = false;
                    that.isOpenShareAd = false;
                    that.toShareAd(_callback, 0, _isTask, _isGroupShare);
                });
                break;
            }
            //分享无限次数
            default: {
                that.toShare(function (_res) {
                    _callback && _callback();
                    that.requestShareAdFinish("share_other", _res);
                }, _isTask, _isGroupShare);
            }
        }
        if (!Laya.Browser.onMiniGame) {
            _callback && _callback();
        }
        return 0;
    };
    //计算车总资产（基础价格）
    UserData.prototype.parkcarAsset = function () {
        var that = this;
        var carAsset = 0;
        // if (this.parkcarInfoArray) {
        //     this.parkcarInfoArray.forEach(element => {
        //         if (element && element.carId >0) {
        //             let carCfg = getCarConfig(element.carId);
        //             if (carCfg) {
        //                 carAsset += getCarPrice(carCfg.BuyPrice, that.queryBuyRecord(carCfg.id));
        //             }
        //         }
        //     });
        // }
        return carAsset;
    };
    //计算精灵个数
    UserData.prototype.caculateMonsterCount = function (_id) {
        var that = this;
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
                value: (g_userInfo ? g_userInfo.city : '火星')
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
        that.requestVersionCheck(function (_res) {
            if (_res && _res.clear_flag) {
                //清理老数据
                // console.log("@FREEMAN: 本地数据保存追踪 - s_version_clear");
                storage.setItem(that.s_version_clear, 'true');
            }
        });
        //上一次记录清理
        var dataJson = storage.getItem(that.s_version_clear);
        if (dataJson) {
            //需要清理数据
            that.requestVersionClear(function (_res) {
                storage.removeItem(that.s_version_clear);
                that.clearLocalData();
                _callback && _callback();
            });
        }
        else {
            _callback && _callback();
        }
    };
    //保存数据##########
    //用户信息金币
    UserData.prototype.requestSaveUserinfoData = function () {
        var that = this;
        //let dataString = 'money=' + that.money + '&car_level=' + that.carLevel + '&level=' + that.level + '&exp=' + that.exp;
        // dataString += '&asset=' + Math.floor(that.money + that.parkcarAsset()) + '&stage=' + that.getPassStage();
        var dataString = 'money=' + that.money + '&car_level=' + that.carLevel;
        dataString += '&stage=' + that.getPassStage();
        dataString += '&king_level=' + that.getKingLevel();
        console.log("requestSaveUserinfoData:", dataString);
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/post',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestSaveUserinfoData2", res);
                // if (res) {
                //     that.showShareGiftRedPoint = res.share_reward_flag;
                //     if (eventCenter) {
                //         if (that.isShowShareGiftRedPoint()) {
                //             eventCenter.event(shareGiftRedPointEvt, "show");
                //         }
                //         if (that.isShowCarShopRedPoint()) {
                //             eventCenter.event(showCarShopRedPointEvt, "show");
                //         }
                //     }
                // }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //车位数据
    UserData.prototype.requestSaveCarparkData = function () {
        var that = this;
        var dataJson = JSON.stringify(that.parkcarInfoArray);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || that.parkcarInfoArray.length < 1) {
            return;
        }
        else if (that.carparkJsonRecord == dataJson) {
            console.log("carparkJsonRecord数据未刷新");
            return;
        }
        that.carparkJsonRecord = dataJson;
        var dataString = 'info=' + dataJson;
        console.log("requestSaveCarparkData:", dataString);
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
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
    //汽车商店数据
    UserData.prototype.requestSaveCarshopData = function () {
        var that = this;
        var dataJson = JSON.stringify(that.carBuyRecordArray);
        //非法数据过滤
        if (dataJson == null || dataJson.length < 1 || that.carBuyRecordArray.length < 1) {
            return;
        }
        else if (that.carshopJsonRecord == dataJson) {
            console.log("carshopJsonRecord数据未刷新");
            return;
        }
        that.carshopJsonRecord = dataJson;
        var dataString = 'info=' + dataJson;
        console.log("requestSaveCarshopData:", dataString);
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
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
    //强化数据
    UserData.prototype.requestSaveSkillAdditionData = function () {
        var dataJson = JSON.stringify(this.skillAdditionArray);
        var dataString = 'info=' + dataJson;
        console.log("requestSaveSkillAdditionData:", dataString);
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
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
    //提交用户名称位置等信息
    UserData.prototype.requestSaveWxUserinfoData = function (_nickName, _avatarUrl, _city, _gender) {
        var that = this;
        var dataString = 'nickName=' + _nickName + '&avatarUrl=' + _avatarUrl + '&city=' + _city + '&gender=' + _gender;
        console.log("requestSaveWxUserinfoData:", dataString);
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
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
    //获取数据##########
    //用户信息金币
    UserData.prototype.requestUserinfoData = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get',
            success: function (res) {
                console.log("requestUserinfoData:", res);
                if (res) {
                    that.money = CommonFun.parseStringNum(res.money);
                    that.carLevel = CommonFun.parseInt(res.car_level);
                    that.level = CommonFun.parseInt(res.level);
                    that.exp = CommonFun.parseStringNum(res.exp);
                    that.diamond = CommonFun.parseStringNum(res.diamond);
                    if (res.hasOwnProperty("essence")) {
                        that.essence = CommonFun.parseInt(res.essence);
                    }
                    if (res.hasOwnProperty("stage")) {
                        that.passStage = CommonFun.parseInt(res.stage);
                    }
                    if (res.hasOwnProperty("king_level")) {
                        that.kingLevel = CommonFun.parseStringNum(res.king_level);
                    }
                    if (res.hasOwnProperty("evolution_level")) {
                        that.evolutionLevel = CommonFun.parseStringNum(res.evolution_level);
                    }
                    if (res.tutorial) {
                        that.noviceGroupId = parseInt(res.tutorial);
                    }
                    that.userId = res.id;
                    console.log("@FREEMAN: UserId = {" + userData.userId + "}");
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
    //用户基础数据
    UserData.prototype.requestUserBaseData = function (_callback) {
        if (_callback === void 0) { _callback = null; }
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/user/info',
            success: function (res) {
                console.log("requestUserBaseData:", res);
                if (res) {
                    that.shareAdTimes = res.operation;
                    PlayerManager.Instance.Info.dayGetGoldCount = that.shareAdTimes.share_no_money_num;
                    that.showShareGiftRedPoint = res.share_reward_flag;
                    that.showDailySignRedPoint = res.sign_flag;
                    // that.showCarShopRedPoint = res.car_shop_flag;
                    that.showTaskRedPoint = res.task_flag;
                    that.showLuckPrizeRedPoint = res.roulette_flag;
                    that.showFollowRedPoint = res.follow_flag;
                    that.advert = res.advert;
                    that.diamond_acce_num = res.diamond_acce_num;
                    if (eventCenter) {
                        if (that.isShowShareGiftRedPoint()) {
                            eventCenter.event(shareGiftRedPointEvt, "show");
                        }
                        if (that.isShowDailySignRedPoint()) {
                            eventCenter.event(dailySignRedPointEvt, "show");
                        }
                        if (that.isShowCarShopRedPoint()) {
                            eventCenter.event(showCarShopRedPointEvt, "show");
                        }
                        if (that.isShowTaskRedPoint()) {
                            eventCenter.event(taskRedPointEvt, "show");
                        }
                        if (that.isShowLuckPrizeRedPoint()) {
                            eventCenter.event(luckPrizeRedPointEvt, "show");
                        }
                        if (that.isShowFollowRedPoint()) {
                            eventCenter.event(followRedPointEvt, "show");
                        }
                        eventCenter.event(acceBtnAdIconEvt, "refresh");
                    }
                }
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //用户元宝
    UserData.prototype.requestDiamondData = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get_diamond',
            success: function (res) {
                console.log("requestDiamondData:", res);
                // if (res && (typeof res != 'string')) {
                if (res) {
                    that.diamond = CommonFun.parseStringNum(res.diamond);
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
    //用户精华碎片
    UserData.prototype.requestEssenceData = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/userinfo/get_essence',
            success: function (res) {
                console.log("requestEssenceData:", res);
                if (res) {
                    that.essence = CommonFun.parseStringNum(res.essence);
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
    //车位数据
    UserData.prototype.requestCarparkData = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/seat/get',
            success: function (res) {
                console.log("requestCarparkData:", res);
                // if (res && (typeof res != 'string')) {
                if (res) {
                    // that.parkcarInfoArray = res;
                    for (var key in that.parkcarInfoArray) {
                        if (that.parkcarInfoArray.hasOwnProperty(key)) {
                            var element = res[key];
                            if (element) {
                                that.parkcarInfoArray[key] = element;
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
    //汽车商店数据
    UserData.prototype.requestCarshopData = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/shop/get',
            success: function (res) {
                console.log("requestCarshopData:", res);
                // if (res && (typeof res != 'string')) {
                if (res) {
                    that.carBuyRecordArray = res;
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
    // 技能强化
    UserData.prototype.requestSkillAddtionData = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/get/intensify',
            success: function (res) {
                console.log("requestSkillAddtionData:", res);
                // if (res && (typeof res != 'string')) {
                if (res) {
                    that.skillAdditionArray = res;
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
    //查询离线奖励
    UserData.prototype.requestOfflinePrizeData = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/login',
            success: function (res) {
                // console.log("requestOfflinePrizeData:",res);
                var offlineTime = CommonFun.parseInt(res.time); //离线时长
                var login_time = CommonFun.parseInt(res.login_time); //登录当前服务器时间
                var cur_time = (new Date()).getTime() / 1000;
                that.cs_time_diff = login_time - cur_time;
                var storage = window.localStorage;
                var dataJson = storage.getItem(that.s_offline_time);
                console.log("读取本地离线:", dataJson);
                if (dataJson) {
                    offlineTime = 0;
                    var last_logout_time = CommonFun.parseInt(dataJson); //上次离线时间
                    console.log(login_time, cur_time, last_logout_time, (login_time - last_logout_time), that.cs_time_diff);
                    if (!isNaN(last_logout_time) && login_time > last_logout_time) {
                        offlineTime = login_time - last_logout_time;
                    }
                    storage.removeItem(that.s_offline_time);
                }
                console.log("离线奖励:", offlineTime);
                if (offlineTime > 0) {
                    // console.log("@FREEMAN: 本地数据保存追踪 - s_offlinePrize_time");
                    storage.setItem(that.s_offlinePrize_time, offlineTime.toString());
                    if (eventCenter) {
                        eventCenter.event(offlineEvt, true);
                    }
                }
                that.requestNotifyServerPrize();
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //通知服务器已领取离线收益
    UserData.prototype.requestNotifyServerPrize = function () {
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
    UserData.prototype.requestShareAdTimes = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/operational/get_num',
            success: function (res) {
                console.log("requestShareAdTimes", res);
                that.shareAdTimes = res;
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //获取分享主题
    UserData.prototype.requestShareSubject = function (_callback) {
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
    UserData.prototype.requestShareFinish = function (_shareId, _encryptedData, _iv, _callback) {
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
    UserData.prototype.requestShareAdFinish = function (_kind, shareId) {
        if (shareId === void 0) { shareId = 0; }
        var that = this;
        var dataString = 'type=' + _kind + '&share_id=' + shareId;
        // console.log("requestShareAdFinish:", dataString);
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
    UserData.prototype.requestShareFlag = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/flag',
            success: function (res) {
                console.log("requestShareFlag", res);
                that.shareSwitchOpen = res;
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
    UserData.prototype.requestVersionCheck = function (_callback) {
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
    //新老版本清理回调
    UserData.prototype.requestVersionClear = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
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
    //每日任务
    UserData.prototype.requestDailyTaskData = function (_taskId) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
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
    return UserData;
}());
//# sourceMappingURL=UserData.js.map