/*
* name;
*/
class BattleModel {

    /** 定时上传数据时间 */
    public saveTime: number = 0;
    /** 刷新广告时间 */
    public refreshAdvTime: number = 0;
    /** 活着的怪物数 */
    public livingCount: number = 0;
    /** 活着的怪物数 */
    public livingIndex: number = 0;
    /** 暴击加成 */
    public kingDoubleAdd: number = 0;
    /** 英雄的伤害值 */
    public petAttackValue: number = 0;
    /** BUFF攻击伤害值 */
    public attackValueBuff: number;
    /** 暴击数值范围 */
    public critRateBuff: number = 0;
    /** 最大等级 */
    public monsterMaxLevel: number = 30;
    /** 钻石初始消费价格 */
    public monsterBaseDiamondPrice: number = 36;
    /** 关卡配置表信息字典 */
    public barrierConfigDic: TSDictionary<string, any>;
    /** 获取每关最大收益 */
    public barrierIncomeReordDic: TSDictionary<number, any>;
}