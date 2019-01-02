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
            let diamond = M.player.Info.userDiamond;
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
    /** 显示通关奖励礼包界面 */
    showClearanceRewardView(isDouble = false) {
        if (this._hall) {
            let lastStage = HallManager.Instance.hallData.stagePrizeList.pop();
            //显示获得的奖品
            let stagePrizeCfg = GlobleData.getData(GlobleData.BarrierRewardVO, lastStage);
            if (stagePrizeCfg) {
                //发送奖励
                let bossM = MathUtils.parseStringNum(stagePrizeCfg.bossM);
                let gold = BattleManager.Instance.getBarrierRewardToGold(lastStage, MathUtils.parseStringNum(stagePrizeCfg.gold));
                gold = isDouble ? gold * 2 : gold;
                let gem = MathUtils.parseStringNum(stagePrizeCfg.gem);
                HttpManager.Instance.requestStagePrizeDiamond(lastStage, gem, bossM, (_res) => {
                    let stage = _res;
                    if (stage > 0) {
                        ViewMgr.Ins.open(ViewConst.ClearanceRewardView, () => {
                            this._hall.showStagePrize(HallManager.Instance.hallData.stagePrizeList.length > 0);
                        }, stage, isDouble);
                        HttpManager.Instance.requestDiamondData();
                        HttpManager.Instance.requestEssenceData();
                    }
                });
                if (gold > 0) { //金币礼包
                    this._hall.updateGold(PlayerManager.Instance.Info.userMoney + gold);
                }
            }
        }
    }
    resolveShopRedPoint() {
        const showRedPoint = userData.isShowCarShopRedPoint();
        let imgRedPoint = this._hall.btnShop.getChildByName("imgRedPoint");
        imgRedPoint && (imgRedPoint.visible = showRedPoint);
        !showRedPoint && this._hall.timerOnce(5 * Time.MIN_IN_MILI, this, this.resolveShopRedPoint);
    }
    /** 钻石购买 */
    onDiamondBuy(heroInfo = null) {
        let carPrice = BattleManager.Instance.getMonsterDiamondPrice(heroInfo.id, userData.queryBuyRecord(heroInfo.id, true));
        ViewMgr.Ins.open(ViewConst.DiamondBuyView, null, DILOG_TYPE.PET, carPrice, heroInfo);
    }
    //金币购买英雄
    goldBuyHero(_carInfo = null, btnObj = null) {
        let carPrice = BattleManager.Instance.getMonsterPrice(_carInfo.buyPrice, userData.queryBuyRecord(_carInfo.id));
        if (PlayerManager.Instance.Info.userMoney >= carPrice) {
            if (BattleManager.Instance.createPet(_carInfo.id) == null)
                return;
            HallManager.Instance.hall.updateGold(PlayerManager.Instance.Info.userMoney - carPrice);
            //刷新消费记录
            userData.refreshBuyRecord(_carInfo.id);
            let curPrice = BattleManager.Instance.getMonsterPrice(_carInfo.buyPrice, userData.queryBuyRecord(_carInfo.id));
            if (btnObj) {
                let imgPrice = btnObj.getChildByName("imgPrice");
                if (imgPrice) {
                    let txtPrice = imgPrice.getChildByName("txtPrice");
                    if (txtPrice) {
                        txtPrice.text = MathUtils.bytesToSize(curPrice);
                    }
                    MessageUtils.shopMsgByObj(btnObj, LanguageManager.Instance.getLanguageText("hallScene.label.txt.07"));
                }
            }
            HallManager.Instance.hall.refreshShortcutCreateBtn();
        }
        else {
            if (PlayerManager.Instance.Info.dayGetGoldCount > 0) {
                ViewMgr.Ins.open(ViewConst.RewardGoldView);
            }
            else {
                MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.19"));
                ViewMgr.Ins.open(ViewConst.FriendConcurView);
            }
        }
    }
    showLuckPrizeTime() {
        HttpManager.Instance.requestPrizeInfo((res) => {
            if (!res)
                return;
            let freeTimes = MathUtils.parseInt(res.free_num); //免费次数
            let freeTime = MathUtils.parseInt(res.remain_time); //免费时间
            let nextFreeTime = MathUtils.parseInt(res.next_free); //离下次免费时间
            if (freeTimes > 0) {
                // this.hall.txt_luckPrize.text = "免费抽奖";
            }
            else {
            }
        });
    }
    set hallData(value) { this._model = value; }
    /** 大厅中的数据 */
    get hallData() { return this._model; }
    get hall() {
        return this._hall;
    }
    set hall(value) {
        this._hall = value;
    }
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