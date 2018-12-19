/*
* name;
*/
class HallModel {
    /** 游戏关卡 */
    public passStage: number = 1;
    /** 游戏章节 */
    public passSection: number = 1;
    /** 最大游戏章节 */
    public maxSection: number = 10;
    /** 游戏状态 */
    public gameStatus: number = 0;
    /** 森林之王等级 */
    public userKingLevel: number = 1;
    /** 当前购买类型 */
    public buyMonsterType: number = 0;
    /** 最大的怪物数量 */
    public parkMonsterCount = 20;
    /** 启动加速x2 */
    public userAcceValue: number = 1;
    /** 加速时间 */
    public userAcceTime: number = 0;
    /** 跑道怪物数量 */
    public userRunMonsterCount: number = 0;
    /** 跑道怪物数量最大值 */
    public userRunMonsterCountMax: number = 0;
    /** 每秒收益 */
    public userIncomePerSec: number = 0;
    /** 额外收益-怪物道满+10% */
    public userExtraIncome: number = 1;
    /** 视频广告观看次数上限 */
    public videoAdMaxTimes: number = 0;
    /** 定时赠送精灵 */
    public giveMonsterAllTime: number = 0;
    /** 赠送怪物的掉落时间 */
    public dropTime: number = 5;
    /** 当前最新怪物ID-快捷购怪物按钮 */
    public curNewMonsterId: number = 0;
    /** 本地保存兵营怪物 */
    public monsterStoreKey: string = "car_store_key";
    /** 怪物列表 */
    public monsterArray: Array<MonsterSprite> = [];
    /** 未领取的关卡奖励 */
    public stagePrizeList: Array<number> = [];
    /** 守卫是否可以升级 */
    public isUpdate: boolean = false;

    public offlineTotalTime: number = 5 * 60 * 1000;

    constructor() {

    }
}