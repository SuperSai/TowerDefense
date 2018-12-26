/*
* 大厅管理类
*/
class HallManager extends Laya.EventDispatcher {

    private _model: HallModel;
    private _hall: HallScene;

    public setup(): void {
        let self = this;
        self._model = new HallModel();
    }

    /** 创建英雄 */
    public createPet(carparkList: Laya.List, iKind: number, isBackward: boolean = false): MonsterSprite {
        let self = this;
        let curIndex: number = 0;
        let element: any = null;
        for (let index = 0; index < self._model.parkMonsterCount; index++) {
            curIndex = index;
            if (isBackward) {
                curIndex = self._model.parkMonsterCount - index - 1;
            }
            element = carparkList.getCell(curIndex);
            if (element) {
                let carParkSp: MonsterSprite = <MonsterSprite>element.getChildByName('car');
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
    public getCalculateIncomePerSec(carparkList: Laya.List): number {
        let self = this;
        let incomePerSec = 0;
        let element: any = null;
        if (carparkList) {
            for (let index = 0; index < self._model.parkMonsterCount; index++) {
                element = carparkList.getCell(index);
                if (element) {
                    let carParkSp = element.getChildByName('car') as MonsterSprite;
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
    public getKingIsUpgrade(): boolean {
        let self = this;
        if (!HallManager.Instance.hallData.isUpdate) {
            let kingLevel: number = userData.getKingLevel();
            let kingVO: KindLevelConfigVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
            //需要钻石
            let diamond: number = userData.diamond;
            let needDiamond: number = kingVO.gemxh;
            //升级条件
            let monsterLevel: number = 0;
            let itemId1: number = 0
            let itemId2: number = 0;
            let itemId3: number = 0;
            //进化设定
            if (userData.isEvolution()) {
                monsterLevel = ((kingLevel - 30) % 60) + 1;
                itemId1 = 1000 + monsterLevel;
                itemId2 = 2000 + monsterLevel;
                itemId3 = 3000 + monsterLevel;
            } else {
                monsterLevel = ((kingLevel - 1) % 30) + 1;
                itemId1 = 100 + monsterLevel;
                itemId2 = 200 + monsterLevel;
                itemId3 = 300 + monsterLevel;
            }
            let itemNum1: number = userData.caculateMonsterCount(itemId1);
            let itemNum2: number = userData.caculateMonsterCount(itemId2);
            let itemNum3: number = userData.caculateMonsterCount(itemId3);
            let needItemNum1: number = 1;
            let needItemNum2: number = 1;
            let needItemNum3: number = 1;
            if (kingLevel > 10) {
                HallManager.Instance.hallData.isUpdate = !((diamond < needDiamond) || (itemNum1 < needItemNum1) || (itemNum2 < needItemNum2) || (itemNum3 < needItemNum3));
            } else {
                HallManager.Instance.hallData.isUpdate = !((diamond < needDiamond));
            }
        }
        return HallManager.Instance.hallData.isUpdate;
    }

    /** 更新精华碎片数 */
    public updateEssence(value: number): void {
        let that = this;
        PlayerManager.Instance.Info.userEssence = value;
        //本地保存
        userData.setEssence(PlayerManager.Instance.Info.userEssence);
    }

    /** 更新每秒收益 */
    public updateIncomePerSec(value: number): void {
        HallManager.Instance.hallData.userIncomePerSec = value;
    }

    /** 新手引导 */
    public isGuide(): boolean {
        if (userData && userData.isGuide()) {
            return true;
        }
        return false;
    }

    /** 显示通关奖励礼包界面 */
    public showClearanceRewardView(): void {
        if (this._hall) {
            let lastStage = HallManager.Instance.hallData.stagePrizeList.pop();
            //显示获得的奖品
            let stagePrizeCfg: any = GlobleData.getData(GlobleData.BarrierRewardVO, lastStage);
            if (stagePrizeCfg) {
                //发送奖励
                let bossM: number = MathUtils.parseStringNum(stagePrizeCfg.bossM);
                let gold: number = BattleManager.Instance.getBarrierRewardToGold(lastStage, MathUtils.parseStringNum(stagePrizeCfg.gold));
                let gem: number = MathUtils.parseStringNum(stagePrizeCfg.gem);
                HttpManager.Instance.requestStagePrizeDiamond(lastStage, gem, bossM, (_res: any) => {
                    let stage = _res as number;
                    if (stage > 0) {
                        ClearanceRewardView.Create(this._hall, null, null, stage);
                        HttpManager.Instance.requestDiamondData();
                        HttpManager.Instance.requestEssenceData();
                    }
                });
                if (gold > 0) {//金币礼包
                    this._hall.updateGold(PlayerManager.Instance.Info.userMoney + gold);
                }
            }
        }
    }


    set hallData(value: HallModel) { this._model = value; }
    /** 大厅中的数据 */
    get hallData(): HallModel { return this._model; }
    public get hall(): HallScene {
        return this._hall;
    }
    public set hall(value: HallScene) {
        this._hall = value;
    }

    private static _instance: HallManager;
    public static get Instance(): HallManager {
        if (HallManager._instance == null) {
            HallManager._instance = new HallManager();
        }
        return HallManager._instance;
    }
}

enum ITEM_ID {
    GOLD = 1,
    DIAMOND = 2,
}