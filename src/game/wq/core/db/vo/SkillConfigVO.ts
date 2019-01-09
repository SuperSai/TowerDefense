/*
* 技能配置;
*/
class SkillConfigVO {
    /** 技能类型（1水2电3毒10金币加成） */
    public id: number;
    /** 触发几率 */
    public triggerPro: number;
    /** 每次强化增加 */
    public qiangHua: number;
    /** 强化上限 */
    public qiangHuaSx: number;
    /** 减少移动速度 */
    public reduceSpeed: number;
    /** 雷属性攻击 */
    public attackTwo: number;
    /** 二段伤害 */
    public twoInjury: number;
    /** 技能影响时长(s) */
    public reduceSpeedTime: number;
}