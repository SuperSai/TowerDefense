/*
* terry 2018/11/1;
* 技能配置
*/
var SkillConfig = [
    {
        "id": 1,
        "triggerPro": 0.06,
        "qiangHua": 0.01,
        "qiangHuaSx": 0.44,
        "reduceSpeed": 0.8,
        "attackTwo": 0.0,
        "twoInjury": 0.0,
        "reduceSpeedTime": 5
    },
    {
        "id": 2,
        "triggerPro": 0.06,
        "qiangHua": 0.01,
        "qiangHuaSx": 0.44,
        "reduceSpeed": 0.0,
        "attackTwo": 2,
        "twoInjury": 0.0,
        "reduceSpeedTime": 0.0
    },
    {
        "id": 3,
        "triggerPro": 0.06,
        "qiangHua": 0.01,
        "qiangHuaSx": 0.44,
        "reduceSpeed": 0.0,
        "attackTwo": 0.0,
        "twoInjury": 2,
        "reduceSpeedTime": 0.0
    },
    {
        "id": 10,
        "triggerPro": 0,
        "qiangHua": 0.02,
        "qiangHuaSx": 1,
        "reduceSpeed": 0,
        "attackTwo": 0,
        "twoInjury": 0,
        "reduceSpeedTime": 0
    }
];
//获取生物配置(1水、2电、3毒、10金币)
var skillReord = {};
var getSkillConfig = function (_id) {
    // console.log("getSkillConfig", _id);
    if (skillReord[_id]) {
        return skillReord[_id]; //查询优化
    }
    for (var key in SkillConfig) {
        if (SkillConfig.hasOwnProperty(key)) {
            var element = SkillConfig[key];
            if (element.id == _id) {
                skillReord[_id] = element;
                return element;
            }
        }
    }
    return null;
};
//# sourceMappingURL=SkillConfig.js.map