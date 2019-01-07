class UserData {
    constructor() {
        /** 合成次数 */
        this.synthesisCount = 0;
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
        /** 福利 */
        this.every_day_into_rewards = false; //福利
        this.isOpenShareAd = false; //打开视频分享
        this.advert = []; //广告
        this.diamond_acce_num = 0; //每日元宝加速次数
        this.shareFailedTimes = 0; //分享失败保底
        this.carparkJsonRecord = ''; //防止提交相同数据给服务器
        this.carshopJsonRecord = ''; //防止提交相同数据给服务器
        this.skillStrengthenJsonRecord = ''; //防止提交相同数据给服务器
        this.lastHeartBeatQueryObj = {}; //防止提交相同心跳数据给服务器
        this.menuRedPointCount = 0;
        //初始化车位
        for (let index = 0; index < 20; index++) {
            this.parkcarInfoArray[index] = { id: index, carId: 0 };
        }
        //分享广告
        [this.shareAdStage[10], this.shareAdStage[11], this.shareAdStage[12]] = [true, true, true];
        this.cache = new CacheObject();
        this.cache.startCacheThread();
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
                break;
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
        this.cache.setCache(CacheKey.SHOP_DATA, this.carBuyRecordArray);
        Laya.timer.once(10 * Time.SEC_IN_MILI, this, HttpManager.Instance.requestSaveCarshopData);
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
                break;
            }
        }
        if (isNew) {
            that.skillAdditionArray.push({ skillId: _skillId, buyTimes: 1 });
        }
        this.cache.setCache(CacheKey.SKILL_DATA, this.skillAdditionArray);
        Laya.timer.once(10 * Time.SEC_IN_MILI, this, HttpManager.Instance.requestSaveSkillAdditionData);
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
                this.cache.setCache(CacheKey.MAX_SYNTHESIS_LEVEL, _level);
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
        if (!this.carLevel) {
            this.carLevel = 1;
            this.parkcarInfoArray.map((item) => {
                this.carLevel = Math.max(BattleManager.Instance.getLevel(item.carId), this.carLevel);
            });
        }
        return this.carLevel;
    }
    carLevelMax() {
        return BattleManager.Instance.model.monsterMaxLevel;
    }
    resetMonsterLevel() {
        this.carLevel = 1;
        this.cache.setCache(CacheKey.MAX_SYNTHESIS_LEVEL, this.carLevel);
        Laya.timer.callLater(this, this.saveLocal, [true]);
    }
    //设置金币并保存
    setMoney(value) {
        M.player.Info.userMoney = Math.floor(value);
        this.cache.setCache(CacheKey.GOLD, value);
    }
    /** 设置钻石 */
    setDiamond(value) {
        M.player.Info.userDiamond = Math.floor(value);
        this.cache.setCache(CacheKey.DIAMOND, value);
    }
    /** 设置精华 */
    setEssence(value) {
        M.player.Info.userEssence = Math.floor(value);
        this.cache.setCache(CacheKey.ESSENCE, value);
    }
    /** 升级森林王等级 */
    updateKingLevel(_level) {
        let that = this;
        if (that.kingLevel < that.kingLevelMax()) {
            if (that.kingLevel < _level) {
                that.kingLevel = _level;
                this.cache.setCache(CacheKey.GUARD_LEVEL, _level);
                Laya.timer.callLater(that, that.saveLocal, [true]);
                return true;
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
                this.cache.setCache(CacheKey.EVOLUTION_LEVEL, _level);
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
        this.parkcarInfoArray[_carParkSp.parkIndex].carId = _carParkSp.monsterId;
        _carParkSp2 && (this.parkcarInfoArray[_carParkSp2.parkIndex].carId = _carParkSp2.monsterId);
        this.cache.setCache(CacheKey.PET_LIST, this.parkcarInfoArray);
        Laya.timer.once(10 * Time.SEC_IN_MILI, this, HttpManager.Instance.requestSaveCarparkData);
    }
    //通关的游戏关卡
    updatePassStage(_value) {
        let that = this;
        that.passStage = _value;
        this.cache.setCache(CacheKey.STAGE_PASSED, _value);
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
    getAdTimes(type) {
        let that = this;
        if (that.shareAdTimes && that.hasVideoAd) {
            if (type == 10) {
                return that.shareAdTimes.ad_acce_num;
            }
            else if (type == 11) {
                return that.shareAdTimes.ad_free_car_num;
            }
            else if (type == 12) {
                return that.shareAdTimes.ad_no_money_num;
            }
        }
        return 0;
    }
    getShareTimes(type) {
        let that = this;
        if (that.shareAdTimes) {
            if (type == 10) {
                return that.shareAdTimes.share_acce_num;
            }
            else if (type == 11) {
                return that.shareAdTimes.share_shop_num;
            }
            else if (type == 12) {
                return that.shareAdTimes.share_no_money_num;
            }
        }
        return 0;
    }
    /** 减少观看视频的次数 */
    decreAdTimes(type) {
        let that = this;
        if (that.shareAdTimes) {
            if (type == 10) {
                that.shareAdTimes.ad_acce_num--;
            }
            else if (type == 11) {
                that.shareAdTimes.ad_free_car_num--;
            }
            else if (type == 12) {
                that.shareAdTimes.ad_no_money_num--;
            }
            else {
                that.shareAdTimes.ad_num--;
            }
        }
    }
    /** 减少分享广告的次数 */
    decreShareTimes(type) {
        let that = this;
        if (that.shareAdTimes) {
            if (type == 10) {
                that.shareAdTimes.share_acce_num--;
            }
            else if (type == 11) {
                that.shareAdTimes.share_shop_num--;
            }
            else if (type == 12) {
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
        this.menuRedPointCount--;
        EventsManager.Instance.event(EventsType.FOLLOW_RED_POINT, "remove");
    }
    //显示好友互助红点
    isShowFriendConcurRedPoint() {
        return this.showFriendConcurRedPoint;
    }
    //移除好友互助红点
    removeFriendConcurRedPoint() {
        this.showFriendConcurRedPoint = false;
        this.menuRedPointCount--;
        EventsManager.Instance.event(EventsType.FRIEND_CONCUR_RED_POINT, "remove");
    }
    /** 显示福利红点 */
    isShowEveryDayRewardRedPoint() {
        return this.every_day_into_rewards;
    }
    /** 移除福利红点 */
    removeEveryDayRewardRedPoint() {
        this.every_day_into_rewards = false;
        this.menuRedPointCount--;
        EventsManager.Instance.event(EventsType.EVERY_DAY_INTO_REWARD, "remove");
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
    saveLocal(_upload = false, saveOptions, forceRightNow = false) {
        if (this._isLoadStorage == false) {
            console.log("未同步本地/服务器数据");
            return;
        }
        if (_upload) {
            HttpManager.Instance.requestSaveUserinfoData(forceRightNow);
            saveOptions && saveOptions.petList && HttpManager.Instance.requestSaveCarparkData(forceRightNow);
            saveOptions && saveOptions.petShop && HttpManager.Instance.requestSaveCarshopData(forceRightNow);
            saveOptions && saveOptions.skill && HttpManager.Instance.requestSaveSkillAdditionData(forceRightNow);
        }
    }
    //取出本地数据
    loadStorage(_callback, dataType) {
        this._isLoadStorage = true;
        if (GlobalConfig.DEBUG) {
            // if (GlobalConfig.USER) {
            //     M.player.account = GlobalConfig.USER;
            // }
            if (!Laya.Browser.onMiniGame) {
                _callback && _callback(true);
                return;
            }
        }
        let serverDataProgress = 6;
        const status = {
            userInfo: dataType && dataType.userInfo,
            petList: dataType && dataType.petList,
            shopData: dataType && dataType.shopData,
            skillData: dataType && dataType.skillData,
            shareData: dataType && dataType.shareData,
            extraData: dataType && dataType.extraData,
        };
        if (!this.cache.hasCache(CacheKey.USER_ID) && !status.userInfo) {
            M.http.requestUserinfoData((res) => {
                status.userInfo = true;
                serverDataProgress--;
                if (serverDataProgress < 1) {
                    _callback && _callback(true);
                }
            });
        }
        else {
            serverDataProgress--;
            status.userInfo = true;
        }
        if (!this.cache.hasCache(CacheKey.PET_LIST) && !status.petList) {
            M.http.requestCarparkData((res) => {
                status.petList = true;
                serverDataProgress--;
                if (serverDataProgress < 1) {
                    _callback && _callback(true);
                }
            });
        }
        else {
            serverDataProgress--;
            status.petList = true;
        }
        if (!this.cache.hasCache(CacheKey.SHOP_DATA) && !status.shopData) {
            M.http.requestCarshopData((res) => {
                status.shopData = true;
                serverDataProgress--;
                if (serverDataProgress < 1) {
                    _callback && _callback(true);
                }
            });
        }
        else {
            serverDataProgress--;
            status.shopData = true;
        }
        if (!this.cache.hasCache(CacheKey.SKILL_DATA) && !status.skillData) {
            M.http.requestSkillAddtionData((res) => {
                status.skillData = true;
                serverDataProgress--;
                if (serverDataProgress < 1) {
                    _callback && _callback(true);
                }
            });
        }
        else {
            serverDataProgress--;
            status.skillData = true;
        }
        //请求分享开关
        if (!status.shareData) {
            M.http.requestShareFlag(() => {
                status.shareData = true;
                serverDataProgress--;
                if (serverDataProgress < 1) {
                    _callback && _callback(true);
                }
            });
        }
        //用户更多信息
        if (!status.extraData) {
            this.requestUserBaseData(() => {
                status.extraData = true;
                serverDataProgress--;
                if (serverDataProgress < 1) {
                    _callback && _callback(true);
                }
            });
        }
        if (serverDataProgress) {
            //超时尝试重新请求
            Laya.stage.timerOnce(5e3, this, () => {
                if (serverDataProgress > 0) {
                    console.log("@FREEMAN: 从服务器获取数据失败，当前状态", status);
                    this.loadStorage(_callback, status);
                }
            });
        }
        else {
            _callback && _callback(true);
        }
    }
    isLoadStorage() {
        return this._isLoadStorage;
    }
    clearLocalData() {
        let that = this;
        this.cache.clearCache();
        let storage = window.localStorage;
        if (storage) {
            storage.removeItem(M.player.account);
            console.log("@FREEMAN: 本地缓存{" + M.player.account + "}已清除。");
        }
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
                    that.shareFailedTimes = 0;
                    _callback && _callback(shareCfg.id);
                    HttpManager.Instance.requestShareFinish(shareCfg.id);
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
        console.log("@David 分享/视频 type:", type);
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
                }, isTask, isGroupShare, "stage");
                break;
            //分享无限次数
            default: {
                self.toShare((_res) => {
                    callback && callback();
                    HttpManager.Instance.requestShareAdFinish("share_other", _res);
                }, isTask, isGroupShare);
            }
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
                    console.log("@David 用户基础数据 operation：", self.shareAdTimes);
                    PlayerManager.Instance.Info.dayGetGoldCount = self.shareAdTimes.share_no_money_num;
                    self.showShareGiftRedPoint = res.share_reward_flag;
                    self.showDailySignRedPoint = res.sign_flag;
                    // that.showCarShopRedPoint = res.car_shop_flag;
                    self.showTaskRedPoint = res.task_flag;
                    self.showLuckPrizeRedPoint = res.roulette_flag;
                    self.showFollowRedPoint = res.subscribe_flag;
                    self.every_day_into_rewards = res.every_day_into_rewards;
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
                        if (self.isShowEveryDayRewardRedPoint()) {
                            self.menuRedPointCount++;
                            EventsManager.Instance.event(EventsType.EVERY_DAY_INTO_REWARD, "show");
                        }
                        EventsManager.Instance.event(EventsType.ACCE_CHANGE, "refresh");
                    }
                    _callback && _callback(res);
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    loadCache() {
        this.cache.setCacheKey("xd_" + M.player.account);
        this.cache.loadCache(Laya.Handler.create(this, (cache) => {
            // 有缓存才赋值
            cache.hasCache(CacheKey.PET_LIST) && (this.parkcarInfoArray = cache.getCache(CacheKey.PET_LIST));
            cache.hasCache(CacheKey.SHOP_DATA) && (this.carBuyRecordArray = cache.getCache(CacheKey.SHOP_DATA));
            cache.hasCache(CacheKey.SKILL_DATA) && (this.skillAdditionArray = cache.getCache(CacheKey.SKILL_DATA));
            cache.hasCache(CacheKey.CONCUR) && (HallManager.Instance.hallData.concurGoldDic.fromJsonObject(cache.getCache(CacheKey.CONCUR)));
            if (cache.hasCache(CacheKey.USER_ID)) {
                this.userId = cache.getCache(CacheKey.USER_ID);
                M.player.Info.userMoney = cache.getCache(CacheKey.GOLD);
                this.level = cache.getCache(CacheKey.LEVEL);
                // this.exp = cache.getCache(CacheKey.EXP);
                M.player.Info.userDiamond = cache.getCache(CacheKey.DIAMOND);
                this.carLevel = cache.getCache(CacheKey.MAX_SYNTHESIS_LEVEL);
                M.player.Info.userEssence = cache.getCache(CacheKey.ESSENCE);
                HallManager.Instance.hallData.passStage = this.passStage = cache.getCache(CacheKey.STAGE_PASSED);
                this.kingLevel = cache.getCache(CacheKey.GUARD_LEVEL);
                this.evolutionLevel = cache.getCache(CacheKey.EVOLUTION_LEVEL);
            }
        }));
        // 不管有没有缓存都需要赋值
        M.novice.currGroupId = this.cache.hasCache(CacheKey.NOVICE_GROUP_ID) ? this.cache.getCache(CacheKey.NOVICE_GROUP_ID) : 1;
        M.more.model.mute = this.cache.hasCache(CacheKey.SOUND_MUTE) ? this.cache.getCache(CacheKey.SOUND_MUTE) : false;
        userData.lastHeartBeatTime = this.cache.hasCache(CacheKey.LAST_HEART_BEAT_TIME) ? this.cache.getCache(CacheKey.LAST_HEART_BEAT_TIME) : 0;
    }
}
//# sourceMappingURL=UserData.js.map