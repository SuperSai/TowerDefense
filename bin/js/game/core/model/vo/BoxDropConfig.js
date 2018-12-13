/*
* terry 2018/8/9;
* 宝箱掉落参数配置
*/
// UnlockNeedId dropCarLevel dropTime
var BoxDropConfig = [
    {
        "UnlockNeedId": 1,
        "dropCarLevel1": 1,
        "dropCarLevel2": 1,
        "dropCarLevel3": 1
    },
    {
        "UnlockNeedId": 2,
        "dropCarLevel1": 1,
        "dropCarLevel2": 1,
        "dropCarLevel3": 1
    },
    {
        "UnlockNeedId": 3,
        "dropCarLevel1": 1,
        "dropCarLevel2": 1,
        "dropCarLevel3": 1
    },
    {
        "UnlockNeedId": 4,
        "dropCarLevel1": 1,
        "dropCarLevel2": 1,
        "dropCarLevel3": 1
    },
    {
        "UnlockNeedId": 5,
        "dropCarLevel1": 1,
        "dropCarLevel2": 1,
        "dropCarLevel3": 1
    },
    {
        "UnlockNeedId": 6,
        "dropCarLevel1": 1,
        "dropCarLevel2": 1,
        "dropCarLevel3": 1
    },
    {
        "UnlockNeedId": 7,
        "dropCarLevel1": 1,
        "dropCarLevel2": 1,
        "dropCarLevel3": 1
    },
    {
        "UnlockNeedId": 8,
        "dropCarLevel1": 1,
        "dropCarLevel2": 1,
        "dropCarLevel3": 1
    },
    {
        "UnlockNeedId": 9,
        "dropCarLevel1": 1,
        "dropCarLevel2": 1,
        "dropCarLevel3": 1
    },
    {
        "UnlockNeedId": 10,
        "dropCarLevel1": 1,
        "dropCarLevel2": 1,
        "dropCarLevel3": 1
    },
    {
        "UnlockNeedId": 11,
        "dropCarLevel1": 1,
        "dropCarLevel2": 2,
        "dropCarLevel3": 3
    },
    {
        "UnlockNeedId": 12,
        "dropCarLevel1": 1,
        "dropCarLevel2": 2,
        "dropCarLevel3": 3
    },
    {
        "UnlockNeedId": 13,
        "dropCarLevel1": 1,
        "dropCarLevel2": 2,
        "dropCarLevel3": 3
    },
    {
        "UnlockNeedId": 14,
        "dropCarLevel1": 1,
        "dropCarLevel2": 2,
        "dropCarLevel3": 3
    },
    {
        "UnlockNeedId": 15,
        "dropCarLevel1": 1,
        "dropCarLevel2": 2,
        "dropCarLevel3": 3
    },
    {
        "UnlockNeedId": 16,
        "dropCarLevel1": 2,
        "dropCarLevel2": 3,
        "dropCarLevel3": 4
    },
    {
        "UnlockNeedId": 17,
        "dropCarLevel1": 2,
        "dropCarLevel2": 3,
        "dropCarLevel3": 4
    },
    {
        "UnlockNeedId": 18,
        "dropCarLevel1": 2,
        "dropCarLevel2": 3,
        "dropCarLevel3": 4
    },
    {
        "UnlockNeedId": 19,
        "dropCarLevel1": 2,
        "dropCarLevel2": 3,
        "dropCarLevel3": 4
    },
    {
        "UnlockNeedId": 20,
        "dropCarLevel1": 2,
        "dropCarLevel2": 3,
        "dropCarLevel3": 4
    },
    {
        "UnlockNeedId": 21,
        "dropCarLevel1": 3,
        "dropCarLevel2": 4,
        "dropCarLevel3": 5
    },
    {
        "UnlockNeedId": 22,
        "dropCarLevel1": 3,
        "dropCarLevel2": 4,
        "dropCarLevel3": 5
    },
    {
        "UnlockNeedId": 23,
        "dropCarLevel1": 3,
        "dropCarLevel2": 4,
        "dropCarLevel3": 5
    },
    {
        "UnlockNeedId": 24,
        "dropCarLevel1": 3,
        "dropCarLevel2": 4,
        "dropCarLevel3": 5
    },
    {
        "UnlockNeedId": 25,
        "dropCarLevel1": 4,
        "dropCarLevel2": 5,
        "dropCarLevel3": 6
    },
    {
        "UnlockNeedId": 26,
        "dropCarLevel1": 4,
        "dropCarLevel2": 5,
        "dropCarLevel3": 6
    },
    {
        "UnlockNeedId": 27,
        "dropCarLevel1": 4,
        "dropCarLevel2": 5,
        "dropCarLevel3": 6
    },
    {
        "UnlockNeedId": 28,
        "dropCarLevel1": 4,
        "dropCarLevel2": 5,
        "dropCarLevel3": 6
    },
    {
        "UnlockNeedId": 29,
        "dropCarLevel1": 4,
        "dropCarLevel2": 5,
        "dropCarLevel3": 6
    },
    {
        "UnlockNeedId": 30,
        "dropCarLevel1": 4,
        "dropCarLevel2": 5,
        "dropCarLevel3": 6
    }
];
//获取宝箱掉落配置
var boxDropReord = {};
var getBoxDropConfig = function (_id) {
    if (boxDropReord[_id]) {
        return boxDropReord[_id]; //查询优化
    }
    for (var key in BoxDropConfig) {
        if (BoxDropConfig.hasOwnProperty(key)) {
            var element = BoxDropConfig[key];
            if (element.UnlockNeedId == _id) {
                boxDropReord[_id] = element;
                return element;
            }
        }
    }
    return null;
};
//# sourceMappingURL=BoxDropConfig.js.map