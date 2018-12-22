/*
* 大厅管理类
*/
class HallManager extends Laya.EventDispatcher {
    setup() {
        let self = this;
        self._model = new HallModel();
    }
    /** 创建英雄 */
    createPet(carparkList, iKind, isBackward = false) {
        let self = this;
        let curIndex = 0;
        let element = null;
        for (let index = 0; index < self._model.parkMonsterCount; index++) {
            curIndex = index;
            if (isBackward) {
                curIndex = self._model.parkMonsterCount - index - 1;
            }
            element = carparkList.getCell(curIndex);
            if (element) {
                let carParkSp = element.getChildByName('car');
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
    }
    /** 获取每秒收益 */
    getCalculateIncomePerSec(carparkList) {
        let self = this;
        let incomePerSec = 0;
        let element = null;
        if (carparkList) {
            for (let index = 0; index < self._model.parkMonsterCount; index++) {
                element = carparkList.getCell(index);
                if (element) {
                    let carParkSp = element.getChildByName('car');
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
    }
    /** 获取森林王是否可以升级 */
    getKingIsUpgrade() {
        let self = this;
        if (!HallManager.Instance.hallData.isUpdate) {
            let kingLevel = userData.getKingLevel();
            let kingVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
            //需要钻石
            let diamond = userData.diamond;
            let needDiamond = kingVO.gemxh;
            //升级条件
            let monsterLevel = 0;
            let itemId1 = 0;
            let itemId2 = 0;
            let itemId3 = 0;
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
            let itemNum1 = userData.caculateMonsterCount(itemId1);
            let itemNum2 = userData.caculateMonsterCount(itemId2);
            let itemNum3 = userData.caculateMonsterCount(itemId3);
            let needItemNum1 = 1;
            let needItemNum2 = 1;
            let needItemNum3 = 1;
            if (kingLevel > 10) {
                HallManager.Instance.hallData.isUpdate = !((diamond < needDiamond) || (itemNum1 < needItemNum1) || (itemNum2 < needItemNum2) || (itemNum3 < needItemNum3));
            }
            else {
                HallManager.Instance.hallData.isUpdate = !((diamond < needDiamond));
            }
        }
        return HallManager.Instance.hallData.isUpdate;
    }
    /** 更新精华碎片数 */
    updateEssence(value) {
        let that = this;
        PlayerManager.Instance.Info.userEssence = value;
        //本地保存
        userData.setEssence(PlayerManager.Instance.Info.userEssence);
    }
    /** 更新每秒收益 */
    updateIncomePerSec(value) {
        HallManager.Instance.hallData.userIncomePerSec = value;
    }
    /** 新手引导 */
    isGuide() {
        if (userData && userData.isGuide()) {
            return true;
        }
        return false;
    }
    set hallData(value) { this._model = value; }
    /** 大厅中的数据 */
    get hallData() { return this._model; }
    static get Instance() {
        if (HallManager._instance == null) {
            HallManager._instance = new HallManager();
        }
        return HallManager._instance;
    }
}
var ITEM_ID;
(function (ITEM_ID) {
    ITEM_ID[ITEM_ID["GOLD"] = 1] = "GOLD";
    ITEM_ID[ITEM_ID["DIAMOND"] = 2] = "DIAMOND";
})(ITEM_ID || (ITEM_ID = {}));
//# sourceMappingURL=HallManager.js.map