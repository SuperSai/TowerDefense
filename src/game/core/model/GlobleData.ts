/**
 * json数据解析类
 */
class GlobleData extends Laya.EventDispatcher {

    /** json数据是否全部解析完毕 */
    private _hasParasComplete: boolean = false;
    private _totalStepCsvList: TSDictionary<string, any>;
    private _needParseCount: number = 0;
    private _currParseCount: number = 0;
    private _jsonCount: number = 0;
    private _callBack: Function;
    private static AllCacheData: TSDictionary<string, TSDictionary<number, any>>;

    public setup(callback: Function): void {
        let self = this;
        self._callBack = callback;
        self._totalStepCsvList = new TSDictionary<string, any>();
        GlobleData.AllCacheData = new TSDictionary<string, TSDictionary<number, any>>();
        self.initModel();
        self.initStep();
    }

    /** 怪物表 */
    public static MonsterVO: string = "Monster_json";
    /** 关卡奖励表 */
    public static BarrierRewardVO: string = "BarrierReward_json";
    /** 关卡配置表 */
    public static BarrierConfigVO: string = "BarrierConfig_json";
    /** 森林王等级配置 */
    public static KindLevelConfigVO: string = "KindLevelConfig_json";
    /** 技能配置 */
    public static SkillConfigVO: string = "SkillConfig_json";
    /** 技能强化配置 */
    public static SkillStrengthenVO: string = "SkillStrengthen_json";
    /** 训练时间掉落表 */
    public static TrainDropVO: string = "TrainDrop_json";
    /** 物品表 */
    public static ItemVO: string = "Item_json";

    private initModel(): void {
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
    private initStep(): void {
        let self = this;
        self._needParseCount = self._totalStepCsvList.GetLenght();
        TimerManager.Instance.doFrame(1, 0, self.onEnterFrameLoader, self);
    }

    private onEnterFrameLoader(): void {
        let self = this;
        if (self._currParseCount >= self._needParseCount) {
            TimerManager.Instance.remove(self.onEnterFrameLoader, self);
            this._hasParasComplete = true;
            if (self._callBack) self._callBack();
        }
        else {
            //一次解析两个文件
            self.getCsvFile();
            // self.getCsvFile();
        }
    }

    /** 开始逐个逐个解析JSON文件 */
    private getCsvFile(): void {
        let self = this;
        if (self._jsonCount < self._needParseCount) {
            let key: string = self._totalStepCsvList.getKeyByIndex(self._jsonCount);
            key = "config/csvJson/" + key;
            key = key.replace('_', '.');
            Laya.loader.load(key, Laya.Handler.create(self, self.onLoaded, [key]), null, Laya.Loader.TEXT);
            self._jsonCount++;
        }
    }

    private onLoaded(key: string): void {
        let self = this;
        //替换一个看不见的特殊字符
        let data = Laya.loader.getRes(key);
        // data = data.replace(/[\ufeff]/, "");
        let data_json: any = JSON.parse(data);
        let csvStr: string = JSON.stringify(data_json);
        self.starSingleParse(csvStr);
    }

    private starSingleParse(csvStr: string): void {
        let self = this;
        let key: string = self._totalStepCsvList.getKeyByIndex(self._currParseCount);
        let DataClass: any = self._totalStepCsvList.getValueByIndex(self._currParseCount);
        let dic: TSDictionary<number, any> = CSVParser.ParseJsonData(DataClass, csvStr);
        GlobleData.AllCacheData.Add(key, dic);
        self._currParseCount++;
    }

    /** 获取对应表的指定某条数据 */
    public static getData(type: string, key: number): any {
        let dic: TSDictionary<number, any> = GlobleData.AllCacheData.TryGetValue(type);
        return dic.TryGetValue(key);
    }

    /**
     * 获取对应表的某条数据中指定名字下的数据
     * @param type 那张表
     * @param filterType 某一项名字
     * @param filterValue 值
     * 例如：parseInt(GlobleVOData.getDataByFilter(GlobleVOData.ServerConfigVO, "id", "MAX_MAP_COUNT")[0].value)
     */
    public static getDataByFilter(type: string, filterType: any, filterValue: any): any[] {
        let dic: TSDictionary<number, any> = GlobleData.AllCacheData.TryGetValue(type);
        let filterd: any[] = dic.TryGetListByCondition((bean) => bean[filterType] == filterValue);
        return filterd;
    }

    /** 获取对应表的所有数据 */
    public static getAllValue(type: string): Array<any> {
        let dic: TSDictionary<number, any> = GlobleData.AllCacheData.TryGetValue(type);
        let arr: any[] = dic.getValues();
        return arr ? arr : [];
    }
    /**
     * 查找对应条件的数据
     */
    public static getDataByCondition(type: string, value: (value: any) => boolean): Array<any> {
        let dic: TSDictionary<number, any> = GlobleData.AllCacheData.TryGetValue(type);
        let arr: any[] = dic.TryGetListByCondition(value);
        return arr;
    }















    /** json数据是否全部解析完毕 */
    public get hasParasComplete(): boolean {
        return this._hasParasComplete;
    }

    private static _instance: GlobleData;
    public constructor() { super(); }
    public static get Instance(): GlobleData {
        if (!this._instance) {
            this._instance = new GlobleData();
        }
        return this._instance;
    }
}