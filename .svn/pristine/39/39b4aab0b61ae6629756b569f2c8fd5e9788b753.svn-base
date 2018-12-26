/*
* terry 2018/7/16;
* 用户数据本地存储
*/
class CacheKey {
}
CacheKey.GOLD = "gold";
CacheKey.SOUND_MUTE = "sound_mute";
/** 好友互助 */
CacheKey.CONCUR = "concur";
class UserData {
    constructor() {
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
        for (let index = 0; index < 20; index++) {
            this.parkcarInfoArray[index] = { id: index, carId: 0, isRunning: false };
        }
        //分享广告
        this.shareAdStage[10] = true;
        this.shareAdStage[11] = true;
        this.shareAdStage[12] = true;
    }
    get noviceGroupId() {
        return this._noviceGroupId;
    }
    set noviceGroupId(value) {
        this._noviceGroupId = value;
    }
    get dayGetGoldCount() {
        return PlayerManager.Instance.Info.dayGetGoldCount;
    }
    set dayGetGoldCount(value) {
        PlayerManager.Instance.Info.dayGetGoldCount = value;
    }
    getUserId() {
        let that = this;
        return ("user_" + that.userId);
    }
    saveNovice(groupId) {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/novice/' + groupId,
            success: (res) => {
                console.log("@FREEMAN: saveNovice: success, currGroupId =>", groupId);
            },
            fail: (res) => {
                console.log("@FREEMAN: saveNovice: fail, currGroupId =>", groupId);
            }
        });
        this.noviceGroupId = groupId;
        this.saveLocal();
    }
    /** 刷新购买记录 */
    refreshBuyRecord(_carId, _isDiamond = false) {
        let that = this;
        let mLevel = BattleManager.Instance.getLevel(_carId);
        let isNew = true;
        for (let key in that.carBuyRecordArray) {
            let element = that.carBuyRecordArray[key];
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
    }
    /** 查询购买记录 */
    queryBuyRecord(_carId, _isDiamond = false) {
        let that = this;
        let mLevel = BattleManager.Instance.getLevel(_carId);
        for (let key in that.carBuyRecordArray) {
            let element = that.carBuyRecordArray[key];
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
    }
    /** 刷新技能加成 */
    refreshSkillAddition(_skillId) {
        let that = this;
        let isNew = true;
        for (let key in that.skillAdditionArray) {
            let element = that.skillAdditionArray[key];
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
    }
    /** 查询技能加成 */
    querySkillAddition(_skillId) {
        let that = this;
        for (let key in that.skillAdditionArray) {
            let element = that.skillAdditionArray[key];
            if (element) {
                if (element.skillId == _skillId) {
                    return that.skillAdditionArray[key].buyTimes;
                }
            }
        }
        return 0;
    }
    /** 获取技能加成或触发几率 */
    getSkillAdditionProbability(_skillId) {
        let that = this;
        let strengthenLevel = that.querySkillAddition(_skillId);
        if (strengthenLevel == 0)
            return 0;
        let probability = SkillManager.Instance.getSkillStrengthenLevelProbability(_skillId, strengthenLevel);
        return probability;
    }
    /** 升级车辆等级 */
    updateCarLevel(_level) {
        let that = this;
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
    }
    getCarLevel() {
        return this.carLevel;
    }
    carLevelMax() {
        return BattleManager.Instance.model.monsterMaxLevel;
    }
    resetMonsterLevel() {
        this.carLevel = 1;
    }
    //设置金币并保存
    setGoldSave($gold) {
        this.gold = Math.floor($gold);
        Laya.timer.callLater(this, this.saveLocal);
    }
    /** 设置钻石 */
    setDiamond(_value) {
        this.diamond = Math.floor(_value);
        Laya.timer.callLater(this, this.saveLocal);
    }
    /** 设置精华 */
    setEssence(_value) {
        this.essence = Math.floor(_value);
    }
    /** 升级森林王等级 */
    updateKingLevel(_level) {
        let that = this;
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
    }
    getKingLevel() {
        return this.kingLevel;
    }
    kingLevelMax() {
        return 60;
    }
    /** 升级森林王等级 */
    updateEvolutionLevel(_level) {
        let that = this;
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
    }
    getEvolutionLevel() {
        return this.evolutionLevel;
    }
    evolutionLevelMax() {
        return 2;
    }
    //是否已进化
    isEvolution() {
        return (this.evolutionLevel > 1);
    }
    //设置车位并保存
    setCarparkSave(_carParkSp, _carParkSp2 = null) {
        let that = this;
        if (that.parkcarInfoArray) {
            for (let key in that.parkcarInfoArray) {
                let element = that.parkcarInfoArray[key];
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
    }
    //通关的游戏关卡
    updatePassStage(_value) {
        let that = this;
        that.passStage = _value;
        Laya.timer.callLater(that, that.saveLocal, [true]);
    }
    getPassStage() {
        return this.passStage;
    }
    //通过的游戏章节
    updatePassSection(_value) {
        let that = this;
        that.passSection = _value;
        Laya.timer.callLater(that, that.saveLocal, [true]);
    }
    getPassSection() {
        return this.passSection;
    }
    //分享广告可点击次数
    getAdTimes(_kind) {
        let that = this;
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
    }
    getShareTimes(_kind) {
        let that = this;
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
    }
    //减少分享广告可点击次数
    decreAdTimes(_kind) {
        let that = this;
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
    }
    decreShareTimes(_kind) {
        let that = this;
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
    }
    //分享或广告开关
    isAdStage(_kind) {
        let that = this;
        return (that.getAdTimes(_kind) > 0);
    }
    //显示分享礼包红点
    isShowShareGiftRedPoint() {
        return this.showShareGiftRedPoint;
    }
    //移除分享礼包红点
    removeShareGiftRedPoint() {
        this.showShareGiftRedPoint = false;
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.SHARE_GIFT_RED_POINT, "remove");
        }
    }
    //显示每日签到红点
    isShowDailySignRedPoint() {
        return this.showDailySignRedPoint;
    }
    //移除红点
    removeDailySignRedPoint() {
        this.showDailySignRedPoint = false;
        if (EventsManager.Instance) {
            this.menuRedPointCount--;
            EventsManager.Instance.event(EventsType.DAY_SIGN_RED_POINT, "remove");
        }
    }
    //显示强化红点
    isShowStrengthenRedPoint() {
        return this.showStrengthenRedPoint;
    }
    //移除红点
    removeStrengthenRedPoint() {
        this.showStrengthenRedPoint = false;
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.STRENGTHEN_RED_POINT, "remove");
        }
    }
    //显示车商店红点
    isShowCarShopRedPoint() {
        let that = this;
        return ((that.getAdTimes(11) + that.getShareTimes(11)) > 0) && (that.carLevel >= 6 && that.carLevel < 30);
    }
    //移除车商店红点
    removeCarShopRedPoin() {
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.HERO_SHOP_RED_POINT, "remove");
        }
    }
    //显示任务红点
    isShowTaskRedPoint() {
        return this.showTaskRedPoint;
    }
    //移除红点
    removeTaskRedPoint() {
        this.showTaskRedPoint = false;
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.TASK_RED_POINT, "remove");
        }
    }
    //显示转盘红点
    isShowLuckPrizeRedPoint() {
        return this.showLuckPrizeRedPoint;
    }
    //移除红点
    removeLuckPrizeRedPoint() {
        this.showLuckPrizeRedPoint = false;
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.LUCK_PRIZED_RED_POINT, "remove");
        }
    }
    //显示关注红点
    isShowFollowRedPoint() {
        return this.showFollowRedPoint;
    }
    //移除红点
    removeFollowRedPoint() {
        this.showFollowRedPoint = false;
        if (EventsManager.Instance) {
            this.menuRedPointCount--;
            EventsManager.Instance.event(EventsType.FOLLOW_RED_POINT, "remove");
        }
    }
    //显示好友互助红点
    isShowFriendConcurRedPoint() {
        return this.showFriendConcurRedPoint;
    }
    //移除好友互助红点
    removeFriendConcurRedPoint() {
        this.showFriendConcurRedPoint = false;
        if (EventsManager.Instance) {
            this.menuRedPointCount--;
            EventsManager.Instance.event(EventsType.FRIEND_CONCUR_RED_POINT, "remove");
        }
    }
    //是否新手
    isGuide() {
        let that = this;
        return false;
    }
    //小程序跳转
    miniCode() {
        let that = this;
        if (that.advert && that.advert[0]) {
            return that.advert[0].url;
        }
        return "wx57ab0ba00d80503a";
    }
    miniPagePath() {
        let that = this;
        if (that.advert && that.advert[0]) {
            return that.advert[0].jump_path;
        }
        return "";
    }
    miniImageUrl() {
        let that = this;
        if (that.advert && that.advert[0]) {
            return that.advert[0].icon;
        }
        return "";
    }
    //每日元宝加速次数
    diamondAcceTimes(_isAdd = false) {
        let that = this;
        let diamondAcceTimes = that.diamond_acce_num;
        if (_isAdd) {
            that.diamond_acce_num++;
        }
        return diamondAcceTimes;
    }
    //保存本地
    saveLocal(_upload = false, saveOptions) {
        let that = this;
        if (that._isLoadStorage == false) {
            console.log("未同步本地/服务器数据");
            return;
        }
        else if (that.isGuide()) {
            console.log("新手引导不保存");
            return;
        }
        let localData = {};
        ["gold", "diamond", "parkcarInfoArray", "carBuyRecordArray", "skillAdditionArray", "kingLevel", "evolutionLevel",
            "carLevel", "level", "exp", "userId", "shareAdStage", "passStage", "noviceGroupId", "dayGetGoldCount"].forEach(element => {
            localData[element] = that[element];
        });
        let dataJson = JSON.stringify(localData);
        if (dataJson) {
            let storage = window.localStorage;
            storage.setItem(M.player.account, dataJson);
        }
        if (_upload) {
            HttpManager.Instance.requestSaveUserinfoData();
            saveOptions && saveOptions.petList && HttpManager.Instance.requestSaveCarparkData();
            saveOptions && saveOptions.petShop && HttpManager.Instance.requestSaveCarshopData();
            saveOptions && saveOptions.skill && HttpManager.Instance.requestSaveSkillAdditionData();
        }
    }
    //取出本地数据
    loadStorage(_callback) {
        let that = this;
        that._isLoadStorage = true;
        if (GlobalConfig.DEBUG) {
            if (GlobalConfig.USER) {
                M.player.account = GlobalConfig.USER;
            }
            if (!Laya.Browser.onMiniGame) {
                _callback && _callback(true);
                return;
            }
        }
        let storage = window.localStorage;
        let dataJson = null; // storage.getItem(M.player.account);
        if (dataJson) {
            let jsonObj = JSON.parse(dataJson);
            if (jsonObj) {
                console.log("@FREEMAN: 本地缓存 {" + M.player.account + "} 读取成功：{", jsonObj, "}");
                for (let key in jsonObj) {
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
        //从服务器同步数据
        let serverDataProgress = 4;
        HttpManager.Instance.requestCarparkData((_res) => {
            serverDataProgress--;
            if (serverDataProgress < 1) {
                _callback && _callback(true);
            }
        });
        HttpManager.Instance.requestCarshopData((_res) => {
            if (_res)
                that.carBuyRecordArray = _res;
            serverDataProgress--;
            if (serverDataProgress < 1) {
                _callback && _callback(true);
            }
        });
        HttpManager.Instance.requestUserinfoData((_res) => {
            serverDataProgress--;
            if (serverDataProgress < 1) {
                _callback && _callback(true);
            }
        });
        HttpManager.Instance.requestSkillAddtionData((_res) => {
            if (_res)
                that.skillAdditionArray = _res;
            serverDataProgress--;
            if (serverDataProgress < 1) {
                _callback && _callback(true);
            }
        });
        //超时尝试重新请求
        Laya.stage.timerOnce(12000, that, () => {
            console.log("serverDataProgress:", serverDataProgress);
            if (serverDataProgress > 0) {
                that.loadStorage(_callback);
            }
        });
        //请求分享开关
        HttpManager.Instance.requestShareFlag();
        that.requestUserBaseData();
    }
    isLoadStorage() {
        return this._isLoadStorage;
    }
    clearLocalData() {
        let that = this;
        let storage = window.localStorage;
        if (storage) {
            storage.removeItem(M.player.account);
            console.log("@FREEMAN: 本地缓存{" + M.player.account + "}已清除。");
        }
    }
    //离线奖励
    offlinePrize() {
        let that = this;
        let storage = window.localStorage;
        let dataJson = storage.getItem(that.s_offlinePrize_time);
        let offlineTime = MathUtils.parseInt(dataJson);
        if (offlineTime > 0) {
            storage.removeItem(that.s_offlinePrize_time);
        }
        return offlineTime;
    }
    //保存离线时间
    saveOfflineTime() {
        let that = this;
        let storage = window.localStorage;
        let offlineServerTime = that.serverTime();
        storage.setItem(that.s_offline_time, offlineServerTime.toString());
    }
    //保存加速剩余时间
    saveAcceLeftTime(_acceLeftTime) {
        let that = this;
        let storage = window.localStorage;
        if (_acceLeftTime > 0) {
            storage.setItem(that.s_acceLeft_time, _acceLeftTime.toString());
        }
        else {
            storage.removeItem(that.s_acceLeft_time);
        }
    }
    //获取加速剩余时间
    getAcceLeftTime() {
        let that = this;
        let storage = window.localStorage;
        let dataJson = storage.getItem(that.s_acceLeft_time);
        if (dataJson) {
            let acceLeftTime = MathUtils.parseInt(dataJson);
            storage.removeItem(that.s_acceLeft_time);
            return acceLeftTime;
        }
        return 0;
    }
    //获取本地与服务器时间差(s减c)
    csDiffTime() {
        let that = this;
        return that.cs_time_diff;
    }
    //获取服务器当前时间
    serverTime() {
        let that = this;
        let cur_time = (new Date()).getTime() / 1000;
        return (cur_time + that.csDiffTime());
    }
    //获取上次离线服务器时间
    offlineServerTime() {
        let that = this;
        let storage = window.localStorage;
        let dataJson = storage.getItem(that.s_offline_time);
        console.log("获取上次离线服务器时间:", dataJson);
        if (dataJson) {
            let offlineServerTime = MathUtils.parseInt(dataJson); //上次离线时间
            if (offlineServerTime > 0) {
                return offlineServerTime;
            }
        }
        return 0;
    }
    //保存商城红点开始时间
    saveShopRedpointTime(_checkTime) {
        let that = this;
        let storage = window.localStorage;
        let nextCheckTime = that.serverTime() + _checkTime;
        storage.setItem(that.s_shopRedPoint_time, nextCheckTime.toString());
    }
    shiftShopRedpointTime(_isRemove = true) {
        let that = this;
        let storage = window.localStorage;
        let dataJson = storage.getItem(that.s_shopRedPoint_time);
        let saveServerTime = MathUtils.parseInt(dataJson);
        if (saveServerTime > 0) {
            let leftTime = saveServerTime - that.serverTime();
            if (_isRemove) {
                storage.removeItem(that.s_shopRedPoint_time);
            }
            if (leftTime > 0) {
                return leftTime;
            }
        }
        return 0;
    }
    isShareEnable() {
        return this.shareSwitchOpen;
    }
    //请求分享
    toShare(_callback = null, _isTask = false, _isGroupShare = false, shareType = "share") {
        let that = this;
        let isTask = _isTask;
        let isGroupShare = _isGroupShare;
        HttpManager.Instance.requestShareSubject(shareType, (_res) => {
            if (!_res) {
                MessageUtils.showMsgTips("今日分享次数已用完");
                return;
            }
            let shareCfg = { imageUrl: _res.image, content: _res.describe, id: _res.id };
            let queryData = null;
            if (isTask) {
                queryData = "userId=" + userData.userId + "&shareId=" + shareCfg.id + "&shareType=task";
            }
            else {
                queryData = "userId=" + userData.userId + "&shareId=" + shareCfg.id + "&shareType=" + shareType;
            }
            //重返游戏
            let curTime = (new Date()).getTime() / 1000;
            let isAutoShare = true;
            EventsManager.Instance.once(EventsType.BACK_GAME, that, (_data) => {
                let backTime = (new Date()).getTime() / 1000;
                let leaveTime = backTime - curTime;
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
    }
    //请求分享/视频
    toShareAd(callback = null, type = 0, isTask = false, isGroupShare = false) {
        let self = this;
        if (self.isOpenShareAd)
            return 0;
        self.isOpenShareAd = true;
        Laya.stage.timerOnce(1000, self, () => {
            self.isOpenShareAd = false;
        });
        //是否优先视频广告
        if (self.getAdTimes(type) > 0) {
            SDKManager.Instance.showVideoAd((_res) => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (_res && _res.isEnded || _res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    self.decreAdTimes(type);
                    let adKey = "ad";
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
            }, () => {
                //无视频回调
                self.hasVideoAd = false;
                self.isOpenShareAd = false;
                self.toShareAd(callback, type, isTask, isGroupShare);
            }, self.isShareEnable());
            return 0;
        }
        switch (type) {
            case 1:
                SDKManager.Instance.showVideoAd((_res) => {
                    if (_res && _res.isEnded || _res === undefined) {
                        callback && callback();
                        HttpManager.Instance.requestShareAdFinish("ad_other", _res);
                    }
                }, () => {
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
                self.toShare((_res) => {
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
                self.toShare((_res) => {
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
                self.toShare((_res) => {
                    MessageUtils.showMsgTips("求助已发出");
                    Laya.timer.once(30000, self, () => {
                        callback && callback();
                    });
                    self.decreShareTimes(type);
                    HttpManager.Instance.requestShareAdFinish("share_no_money", _res);
                }, isTask, isGroupShare);
                break;
            case 13:
                // 天降惊喜礼包分享
                self.toShare((res) => {
                    callback && callback();
                    HttpManager.Instance.requestShareAdFinish("share_sky_drop", res);
                }, isTask, isGroupShare);
                break;
            case 14: //好友互助分享
                self.toShare((res) => {
                    callback && callback();
                    HttpManager.Instance.requestShareAdFinish("share_friend_concur", res);
                }, isTask, isGroupShare, "help");
                break;
            case 15: //通关奖励
                self.toShare((res) => {
                    callback && callback();
                    HttpManager.Instance.requestShareAdFinish("share_clearance_reward", res);
                }, isTask, isGroupShare, "clearanceReward");
                break;
            //分享无限次数
            default: {
                self.toShare((_res) => {
                    callback && callback();
                    HttpManager.Instance.requestShareAdFinish("share_other", _res);
                }, isTask, isGroupShare);
            }
        }
        if (!Laya.Browser.onMiniGame) {
            callback && callback();
        }
        return 0;
    }
    //计算精灵个数
    caculateMonsterCount(_id) {
        let num = 0;
        if (this.parkcarInfoArray) {
            this.parkcarInfoArray.forEach(element => {
                if (element && element.carId == _id) {
                    num++;
                }
            });
        }
        return num;
    }
    //上传腾讯云
    setUserCloudStorage() {
        let that = this;
        //上传微信云
        let money = Math.floor(that.getPassStage()).toString();
        let kvDataList = [{
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
    }
    //新老版本更新检测（防止老数据覆盖）
    versionCheck(_callback) {
        let that = this;
        let storage = window.localStorage;
        HttpManager.Instance.requestVersionCheck((_res) => {
            if (_res && _res.clear_flag) {
                //清理老数据
                storage.setItem(that.s_version_clear, 'true');
            }
        });
        //上一次记录清理
        let dataJson = storage.getItem(that.s_version_clear);
        if (dataJson) {
            //需要清理数据
            HttpManager.Instance.requestVersionClear((_res) => {
                storage.removeItem(that.s_version_clear);
                that.clearLocalData();
                _callback && _callback();
            });
        }
        else {
            _callback && _callback();
        }
    }
    //用户基础数据
    requestUserBaseData(_callback = null) {
        let self = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    //查询离线奖励
    requestOfflinePrizeData() {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/login',
            success: function (res) {
                let offlineTime = MathUtils.parseInt(res.time); //离线时长
                let login_time = MathUtils.parseInt(res.login_time); //登录当前服务器时间
                let cur_time = (new Date()).getTime() / 1000;
                that.cs_time_diff = login_time - cur_time;
                let storage = window.localStorage;
                let dataJson = storage.getItem(that.s_offline_time);
                console.log("读取本地离线:", dataJson);
                if (dataJson) {
                    offlineTime = 0;
                    let last_logout_time = MathUtils.parseInt(dataJson); //上次离线时间
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
    }
    setCache(key, value) {
        this._cache[key] = value;
        const storage = window.localStorage;
        if (storage) {
            storage.setItem("F_" + M.player.account, JSON.stringify(this._cache));
        }
    }
    getCache(key) {
        return this._cache[key];
    }
    hasCache(key) {
        return this._cache.hasOwnProperty(key);
    }
    loadCache() {
        GameEnterManager.Instance.init();
        LanguageManager.Instance.loadLanguage();
        const storage = window.localStorage;
        if (storage) {
            const jsonStr = storage.getItem("F_" + M.player.account);
            if (jsonStr) {
                if (jsonStr) {
                    const cache = JSON.parse(jsonStr);
                    if (cache) {
                        this._cache = cache;
                        // 有缓存才赋值
                        cache.hasOwnProperty(CacheKey.GOLD) && (this.gold = cache[CacheKey.GOLD]);
                        cache.hasOwnProperty(CacheKey.CONCUR) && (HallManager.Instance.hallData.concurGoldDic.fromJsonObject(cache[CacheKey.CONCUR]));
                        // 不管有没有缓存都需要赋值
                        M.more.model.mute = cache.hasOwnProperty(CacheKey.SOUND_MUTE) ? cache[CacheKey.SOUND_MUTE] : false;
                    }
                }
            }
        }
        if (!this._cache) {
            console.log("@FREEMAN: 缓存数据为空或有异常，缓存：{ " + "F_" + M.player.account + " }");
            this._cache = {};
        }
    }
    clearCache() {
        this._cache = {};
        const storage = window.localStorage;
        if (storage) {
            storage.removeItem("F_" + M.player.account);
            console.log("@FREEMAN: 本地缓存{" + "F_" + M.player.account + "}已清除。");
        }
    }
    //设置金币并保存
    setMoneySave(money) {
        this.gold = Math.floor(money);
        this.setCache(CacheKey.GOLD, money);
        Laya.timer.callLater(this, this.saveLocal);
    }
}
//# sourceMappingURL=UserData.js.map