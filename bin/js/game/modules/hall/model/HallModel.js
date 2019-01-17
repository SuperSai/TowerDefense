/*
* name;
*/
class HallModel {
    constructor() {
        /** 游戏关卡 */
        this.passStage = 1;
        /** 游戏章节 */
        this.passSection = 1;
        /** 最大游戏章节 */
        this.maxSection = 10;
        /** 游戏状态 */
        this.gameStatus = 0;
        /** 森林之王等级 */
        this.userKingLevel = 1;
        /** 当前购买类型 */
        this.buyMonsterType = 0;
        /** 最大的怪物数量 */
        this.parkMonsterCount = 20;
        /** 启动加速x2 */
        this.userAcceValue = 1;
        /** 加速时间 */
        this.userAcceTime = 0;
        /** 跑道怪物数量 */
        this.userRunMonsterCount = 0;
        /** 跑道怪物数量最大值 */
        this.userRunMonsterCountMax = 0;
        /** 每秒收益 */
        this.userIncomePerSec = 0;
        /** 额外收益-怪物道满+10% */
        this.userExtraIncome = 1;
        /** 视频广告观看次数上限 */
        this.videoAdMaxTimes = 0;
        /** 定时赠送精灵 */
        this.giveMonsterAllTime = 0;
        /** 赠送怪物的掉落时间 */
        this.dropTime = 10;
        /** 当前最新怪物ID-快捷购怪物按钮 */
        this.curNewMonsterId = 0;
        /** 本地保存兵营怪物 */
        this.monsterStoreKey = "car_store_key";
        /** 怪物列表 */
        this.monsterArray = [];
        /** 未领取的关卡奖励 */
        this.stagePrizeList = [];
        /** 守卫是否可以升级 */
        this.isUpdate = false;
        /** 在线钻石领取时间 */
        this.offlineTotalTime = 5 * 60 * 1000;
        /** 转盘倍率 */
        this.magnification = 1;
        this.concurGoldDic = new TSDictionary();
    }
}
//# sourceMappingURL=HallModel.js.map