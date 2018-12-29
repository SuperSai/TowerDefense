/*
* terry 2018/7/16;
* 用户数据本地存储
*/

class CacheKey {
    static GOLD = "gold";
    static SOUND_MUTE = "sound_mute";
    /** 好友互助 */
    static CONCUR = "concur";
}

class UserData {

    private _cache: any;
    private _noviceGroupId: number = 1; // 新手节点

    get noviceGroupId(): number {
        return this._noviceGroupId;
    }

    set noviceGroupId(value: number) {
        this._noviceGroupId = value;
    }

    get dayGetGoldCount(): number {
        return PlayerManager.Instance.Info.dayGetGoldCount;
    }
    set dayGetGoldCount(value: number) {
        PlayerManager.Instance.Info.dayGetGoldCount = value;
    }

    /** 合成次数 */
    public synthesisCount: number = 0;
    /** 金币 */
    public gold: number = 2000; //拥有金币
    /** 钻石 */
    public diamond: number = 30; //拥有元宝
    /** 精华 */
    public essence: number = 0; //精华碎片
    /** 怪物缓存池的名字 */
    public MONSTER_POOL_NAME: string = "MONSTER_POOL_NAME";
    /** 怪物子弹 */
    public MONSTER_BULLET: string = "MONSTER_BULLET";
    public ANIMATION_POOL_NAME: string = "ANIMATION_POOL_NAME";
    public parkcarInfoArray: Array<any> = []; //车位信息({id: index, carId: 0, isRunning:false})
    public carBuyRecordArray: Array<any> = []; //车购买记录({carId: 1, buyTimes:0})
    public skillAdditionArray: Array<any> = []; //技能加成表({skillId: 1, buyTimes:0})

    public carLevel: number = 1; //当前车最高等级
    public level: number = 2; //玩家等级
    public kingLevel: number = 1; //森林王进化等级
    public evolutionLevel: number = 1; //商店进化等级

    public passStage: number = 1; //通关的游戏关卡
    private passSection: number = 1; //通过的游戏章节

    private s_user_old = 'user_data'; //保存本地v1.0
    private s_user: string = "user_storage"; //保存本地
    private s_offline_time = 's_offline_time'; //离线服务器时间
    private s_offlinePrize_time = 's_offlinePrize_time'; //离线奖励时间
    private s_version_clear = 's_version_clear'; //版本清理

    private s_shopRedPoint_time = 's_shopRedPoint_time'; //商城红点再次检测倒计时启动时间

    private s_acceLeft_time = 's_acceLeft_time'; //加速剩余时间

    private _isLoadStorage: boolean = false; //是否已加载本地数据
    private cs_time_diff: number = 0; //客户端与服务器时间差
    public hasOfflinePrize: boolean = false; //是否领取离线奖励

    public shareSwitchOpen: boolean = false; //分享开关打开

    public userId: number = 0; //用户id-用于分享奖励

    public shareAdTimes: any = {}; //分享广告可点击次数
    /** 在线奖励剩余次数 */
    public offlineRewardCount: number = 0;
    private shareAdStage: any = {}; //分享或广告状态
    private hasVideoAd: boolean = true; //是否有视频广告

    private showShareGiftRedPoint: boolean = false; //分享礼包红点
    private showDailySignRedPoint: boolean = false; //每日签到红点
    private showStrengthenRedPoint: boolean = false;//强化红点
    private showTaskRedPoint: boolean = false; //任务红点
    private showLuckPrizeRedPoint: boolean = false; //转盘红点
    private showFollowRedPoint: boolean = false; //关注奖励红点
    private showFriendConcurRedPoint: boolean = false;//好友互助红点
    /** 福利 */
    private every_day_into_rewards: boolean = false;//福利
    private isOpenShareAd: boolean = false; //打开视频分享
    private advert: Array<any> = []; //广告
    private diamond_acce_num: number = 0; //每日元宝加速次数
    private shareFailedTimes: number = 0; //分享失败保底

    public carparkJsonRecord: string = ''; //防止提交相同数据给服务器
    public carshopJsonRecord: string = ''; //防止提交相同数据给服务器
    public menuRedPointCount: number = 0;

    constructor() {
        //初始化车位
        for (let index = 0; index < 20; index++) {
            this.parkcarInfoArray[index] = { id: index, carId: 0, isRunning: false };
        }
        //分享广告
        this.shareAdStage[10] = true;
        this.shareAdStage[11] = true;
        this.shareAdStage[12] = true;
    }

    public getUserId() {
        let that = this;
        return ("user_" + that.userId);
    }

    public saveNovice(groupId: number): void {
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
    public refreshBuyRecord(_carId, _isDiamond: boolean = false): void {
        let that = this;
        let mLevel: number = BattleManager.Instance.getLevel(_carId);
        let isNew = true;
        for (let key in that.carBuyRecordArray) {
            let element = that.carBuyRecordArray[key];
            if (element && element.carId == mLevel) {
                if (_isDiamond) {
                    that.carBuyRecordArray[key].diamondBuyTimes++;
                } else {
                    that.carBuyRecordArray[key].buyTimes++;
                }

                isNew = false;
                return;
            }
        }
        if (isNew) {
            if (_isDiamond) {
                that.carBuyRecordArray.push({ carId: mLevel, buyTimes: 0, diamondBuyTimes: 1 });
            } else {
                that.carBuyRecordArray.push({ carId: mLevel, buyTimes: 1, diamondBuyTimes: 0 });
            }
        }
        Laya.timer.callLater(that, that.saveLocal, [true, { petShop: true }]);
    }

    /** 查询购买记录 */
    public queryBuyRecord(_carId: number, _isDiamond: boolean = false): number {
        let that = this;
        let mLevel: number = BattleManager.Instance.getLevel(_carId);
        for (let key in that.carBuyRecordArray) {
            let element = that.carBuyRecordArray[key];
            if (element) {
                if (element.carId == mLevel) {
                    if (_isDiamond) {
                        return that.carBuyRecordArray[key].diamondBuyTimes;
                    } else {
                        return that.carBuyRecordArray[key].buyTimes;
                    }
                }
            }
        }
        return 0;
    }

    /** 刷新技能加成 */
    public refreshSkillAddition(_skillId): void {
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
    public querySkillAddition(_skillId: number): number {
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
    public getSkillAdditionProbability(_skillId: number): number {
        let that = this;
        let strengthenLevel: number = that.querySkillAddition(_skillId);
        if (strengthenLevel == 0) return 0;
        let probability: number = SkillManager.Instance.getSkillStrengthenLevelProbability(_skillId, strengthenLevel);
        return probability;
    }

    /** 升级车辆等级 */
    public updateCarLevel(_level: number): boolean {
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
        } else {
            console.log("已达到最高等级")
        }
        return false;
    }

    public getCarLevel(): number {
        return this.carLevel;
    }

    public carLevelMax(): number {
        return BattleManager.Instance.model.monsterMaxLevel;
    }

    public resetMonsterLevel(): void {
        this.carLevel = 1;
    }

    //设置金币并保存
    public setGoldSave($gold: number): void {
        this.gold = Math.floor($gold);
        Laya.timer.callLater(this, this.saveLocal);
    }

    /** 设置钻石 */
    public setDiamond(_value: number): void {
        this.diamond = Math.floor(_value);
        Laya.timer.callLater(this, this.saveLocal);
    }

    /** 设置精华 */
    public setEssence(_value: number): void {
        this.essence = Math.floor(_value);
    }

    /** 升级森林王等级 */
    public updateKingLevel(_level: number): boolean {
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
        } else {
            console.log("已达到最高等级")
        }
        return false;
    }

    public getKingLevel(): number {
        return this.kingLevel;
    }

    public kingLevelMax(): number {
        return 60;
    }

    /** 升级森林王等级 */
    public updateEvolutionLevel(_level: number): boolean {
        let that = this;
        if (that.evolutionLevel < that.evolutionLevelMax()) {
            if (that.evolutionLevel < _level) {
                that.evolutionLevel = _level;
                Laya.timer.callLater(that, that.saveLocal, [true]);
                return true;
            }
        } else {
            console.log("已达到最高等级")
        }
        return false;
    }
    public getEvolutionLevel(): number {
        return this.evolutionLevel;
    }
    public evolutionLevelMax(): number {
        return 2;
    }
    //是否已进化
    public isEvolution(): boolean {
        return (this.evolutionLevel > 1);
    }

    //设置车位并保存
    public setCarparkSave(_carParkSp: MonsterSprite, _carParkSp2: MonsterSprite = null): void {
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
    public updatePassStage(_value: number): void {
        let that = this;
        that.passStage = _value;
        Laya.timer.callLater(that, that.saveLocal, [true]);
    }
    public getPassStage(): number {
        return this.passStage;
    }

    //通过的游戏章节
    public updatePassSection(_value: number): void {
        let that = this;
        that.passSection = _value;
        Laya.timer.callLater(that, that.saveLocal, [true]);
    }

    public getPassSection(): number {
        return this.passSection;
    }

    //分享广告可点击次数
    public getAdTimes(_kind: number): number {
        let that = this;
        if (that.shareAdTimes && that.hasVideoAd) {
            if (_kind == 10) {
                return that.shareAdTimes.ad_acce_num;
            } else if (_kind == 11) {
                return that.shareAdTimes.ad_free_car_num;
            } else if (_kind == 12) {
                return that.shareAdTimes.ad_no_money_num;
            }
        }
        return 0;
    }

    public getShareTimes(_kind: number): number {
        let that = this;
        if (that.shareAdTimes) {
            if (_kind == 10) {
                return that.shareAdTimes.share_acce_num;
            } else if (_kind == 11) {
                return that.shareAdTimes.share_free_car_num;
            } else if (_kind == 12) {
                return that.shareAdTimes.share_no_money_num;
            }
        }
        return 0;
    }

    /** 减少观看视频的次数 */
    public decreAdTimes(_kind: number): void {
        let that = this;
        if (that.shareAdTimes) {
            if (_kind == 10) {
                that.shareAdTimes.ad_acce_num--;
            } else if (_kind == 11) {
                that.shareAdTimes.ad_free_car_num--;
            } else if (_kind == 12) {
                that.shareAdTimes.ad_no_money_num--;
            } else {
                that.shareAdTimes.ad_num--;
            }
        }
    }

    /** 减少分享广告的次数 */
    public decreShareTimes(_kind: number): void {
        let that = this;
        if (that.shareAdTimes) {
            if (_kind == 10) {
                that.shareAdTimes.share_acce_num--;
            } else if (_kind == 11) {
                that.shareAdTimes.share_free_car_num--;
            } else if (_kind == 12) {
                that.shareAdTimes.share_no_money_num--;
            }
        }
        console.log("decreShareTimes", that.shareAdTimes)
    }

    //分享或广告开关
    public isAdStage(_kind: number): boolean {
        let that = this;
        return (that.getAdTimes(_kind) > 0);
    }

    //显示分享礼包红点
    public isShowShareGiftRedPoint(): boolean {
        return this.showShareGiftRedPoint;
    }
    //移除分享礼包红点
    public removeShareGiftRedPoint(): void {
        this.showShareGiftRedPoint = false;
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.SHARE_GIFT_RED_POINT, "remove");
        }
    }
    //显示每日签到红点
    public isShowDailySignRedPoint(): boolean {
        return this.showDailySignRedPoint;
    }
    //移除红点
    public removeDailySignRedPoint(): void {
        this.showDailySignRedPoint = false;
        if (EventsManager.Instance) {
            this.menuRedPointCount--;
            EventsManager.Instance.event(EventsType.DAY_SIGN_RED_POINT, "remove");
        }
    }

    //显示强化红点
    public isShowStrengthenRedPoint(): boolean {
        return this.showStrengthenRedPoint;
    }

    //移除红点
    public removeStrengthenRedPoint(): void {
        this.showStrengthenRedPoint = false;
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.STRENGTHEN_RED_POINT, "remove");
        }
    }

    //显示车商店红点
    public isShowCarShopRedPoint(): boolean {
        let that = this;
        return ((that.getAdTimes(11) + that.getShareTimes(11)) > 0) && (that.carLevel >= 6 && that.carLevel < 30);
    }
    //移除车商店红点
    public removeCarShopRedPoin(): void {
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.HERO_SHOP_RED_POINT, "remove");
        }
    }

    //显示任务红点
    public isShowTaskRedPoint(): boolean {
        return this.showTaskRedPoint;
    }
    //移除红点
    public removeTaskRedPoint(): void {
        this.showTaskRedPoint = false;
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.TASK_RED_POINT, "remove");
        }
    }
    //显示转盘红点
    public isShowLuckPrizeRedPoint(): boolean {
        return this.showLuckPrizeRedPoint;
    }
    //移除红点
    public removeLuckPrizeRedPoint(): void {
        this.showLuckPrizeRedPoint = false;
        if (EventsManager.Instance) {
            EventsManager.Instance.event(EventsType.LUCK_PRIZED_RED_POINT, "remove");
        }
    }
    //显示关注红点
    public isShowFollowRedPoint(): boolean {
        return this.showFollowRedPoint;
    }
    //移除红点
    public removeFollowRedPoint(): void {
        this.showFollowRedPoint = false;
        this.menuRedPointCount--;
        EventsManager.Instance.event(EventsType.FOLLOW_RED_POINT, "remove");
    }

    //显示好友互助红点
    public isShowFriendConcurRedPoint(): boolean {
        return this.showFriendConcurRedPoint;
    }
    //移除好友互助红点
    public removeFriendConcurRedPoint(): void {
        this.showFriendConcurRedPoint = false;
        this.menuRedPointCount--;
        EventsManager.Instance.event(EventsType.FRIEND_CONCUR_RED_POINT, "remove");
    }

    /** 显示福利红点 */
    public isShowEveryDayRewardRedPoint(): boolean {
        return this.every_day_into_rewards;
    }
    /** 移除福利红点 */
    public removeEveryDayRewardRedPoint(): void {
        this.every_day_into_rewards = false;
        this.menuRedPointCount--;
        EventsManager.Instance.event(EventsType.EVERY_DAY_INTO_REWARD, "remove");
    }


    //是否新手
    public isGuide(): boolean {
        let that = this;
        return false;
    }

    //小程序跳转
    public miniCode(): string {
        let that = this;
        if (that.advert && that.advert[0]) {
            return that.advert[0].url;
        }
        return "wx57ab0ba00d80503a";
    }
    public miniPagePath(): string {
        let that = this;
        if (that.advert && that.advert[0]) {
            return that.advert[0].jump_path;
        }
        return "";
    }
    public miniImageUrl(): string {
        let that = this;
        if (that.advert && that.advert[0]) {
            return that.advert[0].icon;
        }
        return "";
    }
    //每日元宝加速次数
    public diamondAcceTimes(_isAdd: boolean = false): number {
        let that = this;
        let diamondAcceTimes = that.diamond_acce_num;
        if (_isAdd) {
            that.diamond_acce_num++;
        }
        return diamondAcceTimes;
    }

    //保存本地
    public saveLocal(_upload: boolean = false, saveOptions?: { petList: boolean, petShop: boolean, skill: boolean }): void {
        let that = this;
        if (that._isLoadStorage == false) {
            console.log("未同步本地/服务器数据");
            return;
        } else if (that.isGuide()) {
            console.log("新手引导不保存");
            return;
        }

        let localData: any = {};
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
    public loadStorage(_callback: any): void {
        let that = this;
        that._isLoadStorage = true;
        if (GlobalConfig.DEBUG) {
            // if (GlobalConfig.USER) {
            //     M.player.account = GlobalConfig.USER;
            // }
            if (!Laya.Browser.onMiniGame) {
                _callback && _callback(true);
                return;
            }
        }

        let storage = window.localStorage;
        let dataJson = null;// storage.getItem(M.player.account);
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
        HttpManager.Instance.requestCarparkData((_res: any) => {
            serverDataProgress--;
            if (serverDataProgress < 1) {
                _callback && _callback(true);
            }
        });

        HttpManager.Instance.requestCarshopData((_res: any) => {
            if (_res) that.carBuyRecordArray = _res;
            serverDataProgress--;
            if (serverDataProgress < 1) {
                _callback && _callback(true);
            }
        });

        HttpManager.Instance.requestUserinfoData((_res: any) => {
            serverDataProgress--;
            if (serverDataProgress < 1) {
                _callback && _callback(true);
            }
        });

        HttpManager.Instance.requestSkillAddtionData((_res: any) => {
            if (_res) that.skillAdditionArray = _res;
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

    public isLoadStorage(): boolean {
        return this._isLoadStorage;
    }

    public clearLocalData(): void {
        let that = this;
        let storage = window.localStorage;
        if (storage) {
            storage.removeItem(M.player.account);
            console.log("@FREEMAN: 本地缓存{" + M.player.account + "}已清除。");
        }
    }

    //离线奖励
    public offlinePrize(): number {
        let that = this;
        let storage = window.localStorage;
        let dataJson = storage.getItem(that.s_offlinePrize_time);
        let offlineTime: number = MathUtils.parseInt(dataJson);
        if (offlineTime > 0) {
            storage.removeItem(that.s_offlinePrize_time);
        }
        return offlineTime;
    }

    //保存离线时间
    public saveOfflineTime(): void {
        let that = this;
        let storage = window.localStorage;
        let offlineServerTime: number = that.serverTime();
        storage.setItem(that.s_offline_time, offlineServerTime.toString());
    }


    //保存加速剩余时间
    public saveAcceLeftTime(_acceLeftTime: number): void {
        let that = this;
        let storage = window.localStorage;
        if (_acceLeftTime > 0) {
            storage.setItem(that.s_acceLeft_time, _acceLeftTime.toString());
        } else {
            storage.removeItem(that.s_acceLeft_time);
        }
    }
    //获取加速剩余时间
    public getAcceLeftTime(): number {
        let that = this;
        let storage = window.localStorage;
        let dataJson = storage.getItem(that.s_acceLeft_time);
        if (dataJson) {
            let acceLeftTime: number = MathUtils.parseInt(dataJson);
            storage.removeItem(that.s_acceLeft_time);
            return acceLeftTime;
        }
        return 0;
    }

    //获取本地与服务器时间差(s减c)
    public csDiffTime(): number {
        let that = this;
        return that.cs_time_diff;
    }
    //获取服务器当前时间
    public serverTime(): number {
        let that = this;
        let cur_time: number = (new Date()).getTime() / 1000;
        return (cur_time + that.csDiffTime());
    }
    //获取上次离线服务器时间
    public offlineServerTime(): number {
        let that = this;
        let storage = window.localStorage;
        let dataJson = storage.getItem(that.s_offline_time);
        console.log("获取上次离线服务器时间:", dataJson);
        if (dataJson) {
            let offlineServerTime: number = MathUtils.parseInt(dataJson); //上次离线时间
            if (offlineServerTime > 0) {
                return offlineServerTime;
            }
        }
        return 0;
    }

    //保存商城红点开始时间
    public saveShopRedpointTime(_checkTime: number) {
        let that = this;
        let storage = window.localStorage;
        let nextCheckTime: number = that.serverTime() + _checkTime;
        storage.setItem(that.s_shopRedPoint_time, nextCheckTime.toString());
    }
    public shiftShopRedpointTime(_isRemove: boolean = true): number {
        let that = this;
        let storage = window.localStorage;
        let dataJson = storage.getItem(that.s_shopRedPoint_time);
        let saveServerTime: number = MathUtils.parseInt(dataJson);
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

    public isShareEnable(): boolean {
        return this.shareSwitchOpen;
    }
    //请求分享
    private toShare(_callback: any = null, _isTask: boolean = false, _isGroupShare: boolean = false, shareType: string = "share"): void {
        let that = this;
        let isTask: boolean = _isTask;
        let isGroupShare: boolean = _isGroupShare;
        HttpManager.Instance.requestShareSubject(shareType, (_res) => {
            if (!_res) {
                MessageUtils.showMsgTips("今日分享次数已用完");
                return;
            }
            let shareCfg = { imageUrl: _res.image, content: _res.describe, id: _res.id };
            let queryData: string = null;
            if (isTask) {
                queryData = "userId=" + userData.userId + "&shareId=" + shareCfg.id + "&shareType=task";
            } else {
                queryData = "userId=" + userData.userId + "&shareId=" + shareCfg.id + "&shareType=" + shareType;
            }

            //重返游戏
            let curTime: number = (new Date()).getTime() / 1000;
            let isAutoShare: boolean = true;
            EventsManager.Instance.once(EventsType.BACK_GAME, that, (_data: any) => {
                let backTime: number = (new Date()).getTime() / 1000;
                let leaveTime = backTime - curTime;
                if (isAutoShare && leaveTime > 2.3) {
                    if (true) {
                        that.shareFailedTimes = 0;
                        _callback && _callback(shareCfg.id);
                        HttpManager.Instance.requestShareFinish(shareCfg.id);
                    } else {
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
        })
    }
    //请求分享/视频
    public toShareAd(callback: any = null, type: number = 0, isTask: boolean = false, isGroupShare: boolean = false): number {
        let self = this;
        if (self.isOpenShareAd) return 0;
        self.isOpenShareAd = true;
        Laya.stage.timerOnce(1000, self, () => {
            self.isOpenShareAd = false;
        });
        console.log("@David 分享/视频 type:", type);
        //是否优先视频广告
        if (self.getAdTimes(type) > 0) {
            SDKManager.Instance.showVideoAd((_res: any) => {
                // 用户点击了【关闭广告】按钮
                // 小于 2.1.0 的基础库版本，res 是一个 undefined
                if (_res && _res.isEnded || _res === undefined) {
                    // 正常播放结束，可以下发游戏奖励
                    self.decreAdTimes(type);
                    let adKey: string = "ad";
                    if (type == 10) {
                        adKey = "ad_acce";
                    } else if (type == 11) {
                        adKey = "ad_free_car";
                    } else if (type == 12) {
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
                SDKManager.Instance.showVideoAd((_res: any) => {
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
                self.toShare((_res: any) => {
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
                self.toShare((_res: any) => {
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
                self.toShare((_res: any) => {
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
            case 14://好友互助分享
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
                self.toShare((_res: any) => {
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
    public caculateMonsterCount(_id: number): number {
        let num: number = 0;
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
    public setUserCloudStorage(): void {
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
    public versionCheck(_callback: any): void {
        let that = this;
        let storage = window.localStorage;
        HttpManager.Instance.requestVersionCheck((_res: any) => {
            if (_res && _res.clear_flag) {
                //清理老数据
                storage.setItem(that.s_version_clear, 'true');
            }
        });
        //上一次记录清理
        let dataJson = storage.getItem(that.s_version_clear);
        if (dataJson) {
            //需要清理数据
            HttpManager.Instance.requestVersionClear((_res: any) => {
                storage.removeItem(that.s_version_clear);
                that.clearLocalData();
                _callback && _callback();
            });
        } else {
            _callback && _callback();
        }
    }

    //用户基础数据
    public requestUserBaseData(_callback: any = null): void {
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
                }
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    //查询离线奖励
    public requestOfflinePrizeData(): void {
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

    public setCache(key: string, value: any): void {
        this._cache[key] = value;
        const storage = window.localStorage;
        if (storage) {
            storage.setItem("F_" + M.player.account, JSON.stringify(this._cache));
        }
    }

    public getCache(key: string): any {
        return this._cache[key];
    }

    public hasCache(key: string): boolean {
        return this._cache.hasOwnProperty(key);
    }

    public loadCache(): void {
        GameEnterManager.Instance.init();
        LanguageManager.Instance.loadLanguage();
        const storage = window.localStorage;
        if (storage) {
            const jsonStr: string = storage.getItem("F_" + M.player.account);
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
                        console.log("@David 声音开关 SOUND_MUTE：", cache[CacheKey.SOUND_MUTE], " ----- hasOwnProperty:", cache.hasOwnProperty(CacheKey.SOUND_MUTE));

                    }
                }
            }
        }

        if (!this._cache) {
            console.log("@FREEMAN: 缓存数据为空或有异常，缓存：{ " + "F_" + M.player.account + " }");
            this._cache = {};
        }
    }

    public clearCache(): void {
        this._cache = {};
        const storage = window.localStorage;
        if (storage) {
            storage.removeItem("F_" + M.player.account);
            console.log("@FREEMAN: 本地缓存{" + "F_" + M.player.account + "}已清除。");
        }
    }

    //设置金币并保存
    public setMoneySave(money: number): void {
        this.gold = Math.floor(money);
        this.setCache(CacheKey.GOLD, money);
        Laya.timer.callLater(this, this.saveLocal);
    }
}