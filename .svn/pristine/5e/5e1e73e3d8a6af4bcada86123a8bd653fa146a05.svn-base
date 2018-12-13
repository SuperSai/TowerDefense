var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * json数据解析类
 */
var GlobleData = /** @class */ (function (_super) {
    __extends(GlobleData, _super);
    function GlobleData() {
        var _this = _super.call(this) || this;
        /** json数据是否全部解析完毕 */
        _this._hasParasComplete = false;
        _this._needParseCount = 0;
        _this._currParseCount = 0;
        _this._jsonCount = 0;
        return _this;
    }
    GlobleData.prototype.setup = function (callback) {
        var self = this;
        self._callBack = callback;
        self._totalStepCsvList = new TSDictionary();
        GlobleData.AllCacheData = new TSDictionary();
        self.initModel();
        self.initStep();
    };
    GlobleData.prototype.initModel = function () {
        var self = this;
        self._totalStepCsvList.Add(GlobleData.MonsterVO, MonsterVO);
        self._totalStepCsvList.Add(GlobleData.BarrierRewardVO, BarrierRewardVO);
        self._totalStepCsvList.Add(GlobleData.BarrierConfigVO, BarrierConfigVO);
        self._totalStepCsvList.Add(GlobleData.KindLevelConfigVO, KindLevelConfigVO);
        self._totalStepCsvList.Add(GlobleData.SkillConfigVO, SkillConfigVO);
        self._totalStepCsvList.Add(GlobleData.SkillStrengthenVO, SkillStrengthenVO);
        self._totalStepCsvList.Add(GlobleData.TrainDropVO, TrainDropVO);
    };
    // 解析初始数据表
    GlobleData.prototype.initStep = function () {
        var self = this;
        self._needParseCount = self._totalStepCsvList.GetLenght();
        TimerManager.Instance.doFrame(1, 0, self.onEnterFrameLoader, self);
    };
    GlobleData.prototype.onEnterFrameLoader = function () {
        var self = this;
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
    };
    /** 开始逐个逐个解析JSON文件 */
    GlobleData.prototype.getCsvFile = function () {
        var self = this;
        if (self._jsonCount < self._needParseCount) {
            var key = self._totalStepCsvList.getKeyByIndex(self._jsonCount);
            key = "config/csvJson/" + key;
            key = key.replace('_', '.');
            Laya.loader.load(key, Laya.Handler.create(self, self.onLoaded, [key]), null, Laya.Loader.TEXT);
            self._jsonCount++;
        }
    };
    GlobleData.prototype.onLoaded = function (key) {
        var self = this;
        //替换一个看不见的特殊字符
        var data = Laya.loader.getRes(key);
        // data = data.replace(/[\ufeff]/, "");
        var data_json = JSON.parse(data);
        var csvStr = JSON.stringify(data_json);
        self.starSingleParse(csvStr);
    };
    GlobleData.prototype.starSingleParse = function (csvStr) {
        var self = this;
        var key = self._totalStepCsvList.getKeyByIndex(self._currParseCount);
        var DataClass = self._totalStepCsvList.getValueByIndex(self._currParseCount);
        var dic = CSVParser.ParseJsonData(DataClass, csvStr);
        GlobleData.AllCacheData.Add(key, dic);
        self._currParseCount++;
    };
    /** 获取对应表的指定某条数据 */
    GlobleData.getData = function (type, key) {
        var dic = GlobleData.AllCacheData.TryGetValue(type);
        return dic.TryGetValue(key);
    };
    /**
     * 获取对应表的某条数据中指定名字下的数据
     * @param type 那张表
     * @param filterType 某一项名字
     * @param filterValue 值
     * 例如：parseInt(GlobleVOData.getDataByFilter(GlobleVOData.ServerConfigVO, "id", "MAX_MAP_COUNT")[0].value)
     */
    GlobleData.getDataByFilter = function (type, filterType, filterValue) {
        var dic = GlobleData.AllCacheData.TryGetValue(type);
        var filterd = dic.TryGetListByCondition(function (bean) { return bean[filterType] == filterValue; });
        return filterd;
    };
    /** 获取对应表的所有数据 */
    GlobleData.getAllValue = function (type) {
        var dic = GlobleData.AllCacheData.TryGetValue(type);
        return dic.getValues();
    };
    /**
     * 查找对应条件的数据
     */
    GlobleData.getDataByCondition = function (type, value) {
        var dic = GlobleData.AllCacheData.TryGetValue(type);
        var arr = dic.TryGetListByCondition(value);
        return arr;
    };
    Object.defineProperty(GlobleData.prototype, "hasParasComplete", {
        /** json数据是否全部解析完毕 */
        get: function () {
            return this._hasParasComplete;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobleData, "Instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new GlobleData();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
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
    return GlobleData;
}(Laya.EventDispatcher));
//# sourceMappingURL=GlobleData.js.map