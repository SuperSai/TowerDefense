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
/*
* 大厅管理类
*/
var HallManager = /** @class */ (function (_super) {
    __extends(HallManager, _super);
    function HallManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HallManager.prototype.setup = function () {
        var self = this;
        self._model = new HallModel();
    };
    /** 创建英雄 */
    HallManager.prototype.createPet = function (carparkList, iKind, isBackward) {
        if (isBackward === void 0) { isBackward = false; }
        var self = this;
        var curIndex = 0;
        var element = null;
        for (var index = 0; index < self._model.parkMonsterCount; index++) {
            curIndex = index;
            if (isBackward) {
                curIndex = self._model.parkMonsterCount - index - 1;
            }
            element = carparkList.getCell(curIndex);
            if (element) {
                var carParkSp = element.getChildByName('car');
                if (carParkSp && carParkSp.isEmpty() && !carParkSp.isBox() && !carParkSp.isLock()) {
                    carParkSp.setKind(iKind, curIndex);
                    carParkSp.setStage(1);
                    //本地保存
                    userData.setCarparkSave(carParkSp);
                    return carParkSp;
                }
            }
        }
        if (!isBackward) {
            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.01"));
            return null;
        }
    };
    /** 获取每秒收益 */
    HallManager.prototype.getCalculateIncomePerSec = function (carparkList) {
        var self = this;
        var incomePerSec = 0;
        var element = null;
        if (carparkList) {
            for (var index = 0; index < self._model.parkMonsterCount; index++) {
                element = carparkList.getCell(index);
                if (element) {
                    var carParkSp = element.getChildByName('car');
                    if (carParkSp && carParkSp.isRunning()) {
                        incomePerSec += carParkSp.getIncomePerSecond() *
                            self._model.userExtraIncome *
                            self._model.userAcceValue *
                            PlayerManager.Instance.Info.userLevelExtraIncome;
                    }
                }
            }
        }
        return incomePerSec;
    };
    /** 获取森林王是否可以升级 */
    HallManager.prototype.getKingIsUpgrade = function () {
        var self = this;
        if (!HallManager.Instance.hallData.isUpdate) {
            var kingLevel = userData.getKingLevel();
            var kingVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
            //需要钻石
            var diamond = userData.diamond;
            var needDiamond = kingVO.gemxh;
            //升级条件
            var monsterLevel = 0;
            var itemId1 = 0;
            var itemId2 = 0;
            var itemId3 = 0;
            //进化设定
            if (userData.isEvolution()) {
                monsterLevel = ((kingLevel - 30) % 60) + 1;
                itemId1 = 1000 + monsterLevel;
                itemId2 = 2000 + monsterLevel;
                itemId3 = 3000 + monsterLevel;
            }
            else {
                monsterLevel = ((kingLevel - 1) % 30) + 1;
                itemId1 = 100 + monsterLevel;
                itemId2 = 200 + monsterLevel;
                itemId3 = 300 + monsterLevel;
            }
            var itemNum1 = userData.caculateMonsterCount(itemId1);
            var itemNum2 = userData.caculateMonsterCount(itemId2);
            var itemNum3 = userData.caculateMonsterCount(itemId3);
            var needItemNum1 = 1;
            var needItemNum2 = 1;
            var needItemNum3 = 1;
            if (kingLevel > 10) {
                HallManager.Instance.hallData.isUpdate = !((diamond < needDiamond) || (itemNum1 < needItemNum1) || (itemNum2 < needItemNum2) || (itemNum3 < needItemNum3));
            }
            else {
                HallManager.Instance.hallData.isUpdate = !((diamond < needDiamond));
            }
        }
        return HallManager.Instance.hallData.isUpdate;
    };
    /** 更新精华碎片数 */
    HallManager.prototype.updateEssence = function (value) {
        var that = this;
        PlayerManager.Instance.Info.userEssence = value;
        //本地保存
        userData.setEssence(PlayerManager.Instance.Info.userEssence);
    };
    /** 更新每秒收益 */
    HallManager.prototype.updateIncomePerSec = function (value) {
        HallManager.Instance.hallData.userIncomePerSec = value;
    };
    /** 新手引导 */
    HallManager.prototype.isGuide = function () {
        if (userData && userData.isGuide()) {
            return true;
        }
        return false;
    };
    Object.defineProperty(HallManager.prototype, "hallData", {
        /** 大厅中的数据 */
        get: function () { return this._model; },
        set: function (value) { this._model = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HallManager, "Instance", {
        get: function () {
            if (HallManager._instance == null) {
                HallManager._instance = new HallManager();
            }
            return HallManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return HallManager;
}(Laya.EventDispatcher));
var ITEM_ID;
(function (ITEM_ID) {
    ITEM_ID[ITEM_ID["GOLD"] = 1] = "GOLD";
    ITEM_ID[ITEM_ID["DIAMOND"] = 2] = "DIAMOND";
})(ITEM_ID || (ITEM_ID = {}));
//# sourceMappingURL=HallManager.js.map