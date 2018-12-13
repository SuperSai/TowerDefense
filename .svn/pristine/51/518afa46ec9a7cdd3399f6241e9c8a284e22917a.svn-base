/*
* 技能管理类;
*/
class SkillManager {
    constructor() {

    }

    /** 获取对应技能强化消耗 */
    public getSkillStrengthenCost(skillId: number, strengthenLevel: number): number {
        let dataCfg: any = GlobleData.getData(GlobleData.SkillStrengthenVO, strengthenLevel);
        let cost: number = 0;
        if (dataCfg) {
            if (skillId == 1) {
                cost = MathUtils.parseInt(dataCfg.boss1Mxh);
            } else if (skillId == 2) {
                cost = MathUtils.parseInt(dataCfg.boss2Mxh);
            } else if (skillId == 3) {
                cost = MathUtils.parseInt(dataCfg.boss3Mxh);
            } else if (skillId == 10) {
                cost = MathUtils.parseInt(dataCfg.gold10jc);
            }
        }
        return cost;
    }

    /** 获取对应技能强化几率 */
    public getSkillStrengthenProbability(skillId: number, strengthenLevel: number = 0): number {
        let dataCfg: any = GlobleData.getData(GlobleData.SkillConfigVO, skillId);
        let probability: number = 0;
        if (dataCfg) {
            let qiangHuaSx: number = MathUtils.parseStringNum(dataCfg.qiangHuaSx);
            probability = Math.min(MathUtils.parseStringNum(dataCfg.qiangHua) * strengthenLevel, qiangHuaSx);
        }
        return probability;
    }

    /** 获取对应技能强化等级几率 */
    public getSkillStrengthenLevelProbability(skillId: number, strengthenLevel: number = 0): number {
        let dataCfg: any = GlobleData.getData(GlobleData.SkillConfigVO, skillId);
        let probability: number = 0;
        if (dataCfg) {
            probability = MathUtils.parseStringNum(dataCfg.triggerPro) + SkillManager.Instance.getSkillStrengthenProbability(skillId, strengthenLevel);
            probability += 0.0001; //小数偏差
        }
        return probability;
    }




    private static _instance: SkillManager;
    public static get Instance(): SkillManager {
        if (SkillManager._instance == null) {
            SkillManager._instance = new SkillManager();
        }
        return SkillManager._instance;
    }
}