/**
 * json数据解析类
 */
class GlobleData extends Laya.EventDispatcher {
    constructor() {
        super();
        /** json数据是否全部解析完毕 */
        this._hasParasComplete = false;
        this._needParseCount = 0;
        this._currParseCount = 0;
        this._jsonCount = 0;
    }
    setup(callback) {
        let self = this;
        self._callBack = callback;
        self._totalStepCsvList = new TSDictionary();
        GlobleData.AllCacheData = new TSDictionary();
        self.initModel();
        self.initStep();
    }
    initModel() {
        let self = this;
        self._totalStepCsvList.Add(GlobleData.MonsterVO, MonsterVO);
        self._totalStepCsvList.Add(GlobleData.BarrierRewardVO, BarrierRewardVO);
        self._totalStepCsvList.Add(GlobleData.BarrierConfigVO, BarrierConfigVO);
        self._totalStepCsvList.Add(GlobleData.KindLevelConfigVO, KindLevelConfigVO);
        self._totalStepCsvList.Add(GlobleData.SkillConfigVO, SkillConfigVO);
        self._totalStepCsvList.Add(GlobleData.SkillStrengthenVO, SkillStrengthenVO);
        self._totalStepCsvList.Add(GlobleData.TrainDropVO, TrainDropVO);
        self._totalStepCsvList.Add(GlobleData.ItemVO, ItemVO);
    }
    // 解析初始数据表
    initStep() {
        let self = this;
        self._needParseCount = self._totalStepCsvList.GetLenght();
        self.onEnterFrameLoader();
    }
    onEnterFrameLoader() {
        let self = this;
        if (self._currParseCount >= self._needParseCount) {
            TimerManager.Instance.remove(self.onEnterFrameLoader, self);
            this._hasParasComplete = true;
            if (self._callBack)
                self._callBack();
        }
        else {
            //一次解析两个文件
            self.getCsvFile();
            // self.getCsvFile();
        }
    }
    /** 开始逐个逐个解析JSON文件 */
    getCsvFile() {
        let self = this;
        if (self._jsonCount < self._needParseCount) {
            let key = self._totalStepCsvList.getKeyByIndex(self._jsonCount);
            key = "config/csvJson/" + key;
            key = key.replace('_', '.');
            key = PathConfig.RES_URL + key;
            Laya.loader.load(key, Laya.Handler.create(self, self.onLoaded, [key]), null, Laya.Loader.TEXT, 0, true);
            self._jsonCount++;
        }
    }
    onLoaded(key) {
        let self = this;
        let data = Laya.loader.getRes(key);
        try {
            let data_json = JSON.parse(data);
            let csvStr = JSON.stringify(data_json);
            self.starSingleParse(csvStr);
        }
        catch (error) {
            HttpManager.Instance.requestSaveLog(error);
            self._jsonCount--;
        }
        finally {
            this.onEnterFrameLoader();
        }
    }
    starSingleParse(csvStr) {
        let self = this;
        let key = self._totalStepCsvList.getKeyByIndex(self._currParseCount);
        let DataClass = self._totalStepCsvList.getValueByIndex(self._currParseCount);
        let dic = CSVParser.ParseJsonData(DataClass, csvStr);
        GlobleData.AllCacheData.Add(key, dic);
        self._currParseCount++;
    }
    /** 获取对应表的指定某条数据 */
    static getData(type, key) {
        let dic = GlobleData.AllCacheData.TryGetValue(type);
        return dic.TryGetValue(key);
    }
    /**
     * 获取对应表的某条数据中指定名字下的数据
     * @param type 那张表
     * @param filterType 某一项名字
     * @param filterValue 值
     * 例如：parseInt(GlobleVOData.getDataByFilter(GlobleVOData.ServerConfigVO, "id", "MAX_MAP_COUNT")[0].value)
     */
    static getDataByFilter(type, filterType, filterValue) {
        let dic = GlobleData.AllCacheData.TryGetValue(type);
        let filterd = dic.TryGetListByCondition((bean) => bean[filterType] == filterValue);
        return filterd;
    }
    /** 获取对应表的所有数据 */
    static getAllValue(type) {
        let dic = GlobleData.AllCacheData.TryGetValue(type);
        return dic.getValues();
    }
    /**
     * 查找对应条件的数据
     */
    static getDataByCondition(type, value) {
        let dic = GlobleData.AllCacheData.TryGetValue(type);
        let arr = dic.TryGetListByCondition(value);
        return arr;
    }
    /** json数据是否全部解析完毕 */
    get hasParasComplete() {
        return this._hasParasComplete;
    }
    static get Instance() {
        if (!this._instance) {
            this._instance = new GlobleData();
        }
        return this._instance;
    }
}
/** 怪物表 */
GlobleData.MonsterVO = "Monster_json";
/** 关卡奖励表 */
GlobleData.BarrierRewardVO = "BarrierReward_json";
/** 关卡配置表 */
GlobleData.BarrierConfigVO = "BarrierConfig_json";
/** 森林王等级配置 */
GlobleData.KindLevelConfigVO = "KindLevelConfig_json";
/** 技能配置 */
GlobleData.SkillConfigVO = "SkillConfig_json";
/** 技能强化配置 */
GlobleData.SkillStrengthenVO = "SkillStrengthen_json";
/** 训练时间掉落表 */
GlobleData.TrainDropVO = "TrainDrop_json";
/** 物品表 */
GlobleData.ItemVO = "Item_json";
//# sourceMappingURL=GlobleData.js.map