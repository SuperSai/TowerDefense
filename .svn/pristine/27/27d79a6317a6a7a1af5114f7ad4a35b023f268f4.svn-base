/*
* 技能管理类;
*/
var SkillManager = /** @class */ (function () {
    function SkillManager() {
    }
    /** 获取对应技能强化消耗 */
    SkillManager.prototype.getSkillStrengthenCost = function (skillId, strengthenLevel) {
        var dataCfg = GlobleData.getData(GlobleData.SkillStrengthenVO, strengthenLevel);
        var cost = 0;
        if (dataCfg) {
            if (skillId == 1) {
                cost = MathUtils.parseInt(dataCfg.boss1Mxh);
            }
            else if (skillId == 2) {
                cost = MathUtils.parseInt(dataCfg.boss2Mxh);
            }
            else if (skillId == 3) {
                cost = MathUtils.parseInt(dataCfg.boss3Mxh);
            }
            else if (skillId == 10) {
                cost = MathUtils.parseInt(dataCfg.gold10jc);
            }
        }
        return cost;
    };
    /** 获取对应技能强化几率 */
    SkillManager.prototype.getSkillStrengthenProbability = function (skillId, strengthenLevel) {
        if (strengthenLevel === void 0) { strengthenLevel = 0; }
        var dataCfg = GlobleData.getData(GlobleData.SkillConfigVO, skillId);
        var probability = 0;
        if (dataCfg) {
            var qiangHuaSx = MathUtils.parseStringNum(dataCfg.qiangHuaSx);
            probability = Math.min(MathUtils.parseStringNum(dataCfg.qiangHua) * strengthenLevel, qiangHuaSx);
        }
        return probability;
    };
    /** 获取对应技能强化等级几率 */
    SkillManager.prototype.getSkillStrengthenLevelProbability = function (skillId, strengthenLevel) {
        if (strengthenLevel === void 0) { strengthenLevel = 0; }
        var dataCfg = GlobleData.getData(GlobleData.SkillConfigVO, skillId);
        var probability = 0;
        if (dataCfg) {
            probability = MathUtils.parseStringNum(dataCfg.triggerPro) + SkillManager.Instance.getSkillStrengthenProbability(skillId, strengthenLevel);
            probability += 0.0001; //小数偏差
        }
        return probability;
    };
    Object.defineProperty(SkillManager, "Instance", {
        get: function () {
            if (SkillManager._instance == null) {
                SkillManager._instance = new SkillManager();
            }
            return SkillManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return SkillManager;
}());
//# sourceMappingURL=SkillManager.js.map