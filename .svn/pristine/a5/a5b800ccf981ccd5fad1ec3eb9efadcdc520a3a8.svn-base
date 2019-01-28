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
        if (!HallManager.Instance.hallData.isUpdate) {
            let kingLevel: number = userData.getKingLevel();
            let kingVO: KindLevelConfigVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
            if (!kingVO) return false;
            //需要钻石
            let diamond: number = M.player.Info.userDiamond;
            let needDiamond: number = MathUtils.parseInt(kingVO.gemxh + "");
            let itemNum: number = userData.caculateMonsterCount(EvolutionManager.Instance.getHeroId());
            let needItemNum: number = 3;
            if (kingLevel > 10) {
                HallManager.Instance.hallData.isUpdate = !((diamond < needDiamond) || (itemNum < needItemNum));
            } else {
                HallManager.Instance.hallData.isUpdate = !((diamond < needDiamond));
            }
        }
        return HallManager.Instance.hallData.isUpdate;
    }

    /** 更新精华碎片数 */
    public updateEssence(value: number): void {
        PlayerManager.Instance.Info.userEssence = value;
        //本地保存
        userData.setEssence(PlayerManager.Instance.Info.userEssence);
    }

    /** 更新每秒收益 */
    public updateIncomePerSec(value: number): void {
        HallManager.Instance.hallData.userIncomePerSec = value;
    }

    /** 显示通关奖励礼包界面 */
    public showClearanceRewardView(isDouble: boolean = false): void {
        if (this._hall) {
            let lastStage = HallManager.Instance.hallData.stagePrizeList.pop();
            //显示获得的奖品
            let stagePrizeCfg: any = GlobleData.getData(GlobleData.BarrierRewardVO, lastStage);
            if (stagePrizeCfg) {
                //发送奖励
                let diamond: number = MathUtils.parseStringNum(stagePrizeCfg.gem);
                let essence: number = MathUtils.parseStringNum(stagePrizeCfg.bossM);
                let gold: number = BattleManager.Instance.getBarrierRewardToGold(lastStage, MathUtils.parseStringNum(stagePrizeCfg.gold));
                gold = isDouble ? gold * 2 : gold;
                HttpManager.Instance.requestStagePrizeDiamond(lastStage, diamond, essence, (_res: any) => {
                    let stage = _res as number;
                    if (stage > 0) {
                        ViewMgr.Ins.open(ViewConst.ClearanceRewardView, null, stage, isDouble);
                        this._hall.showStagePrize(HallManager.Instance.hallData.stagePrizeList.length > 0);
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

    public resolveShopRedPoint() {
        const showRedPoint: boolean = userData.isShowCarShopRedPoint();
        let imgRedPoint = this._hall.btnShop.getChildByName("imgRedPoint") as Laya.Image;
        imgRedPoint && (imgRedPoint.visible = showRedPoint);
        !showRedPoint && this._hall.timerOnce(5 * Time.MIN_IN_MILI, this, this.resolveShopRedPoint);
    }

    public resolveMoreRedPoint() {
        const showRedPoint: boolean = !M.more.openedOnce;
        let imgRedPoint = this._hall.btnMore.getChildByName("imgRedPoint") as Laya.Image;
        imgRedPoint && (imgRedPoint.visible = showRedPoint);
    }

    /** 钻石购买 */
    public onDiamondBuy(heroInfo: any = null): void {
        let carPrice = BattleManager.Instance.getMonsterDiamondPrice(heroInfo.id, userData.queryBuyRecord(heroInfo.id, true));
        ViewMgr.Ins.open(ViewConst.DiamondBuyView, null, DILOG_TYPE.PET, carPrice, heroInfo);
    }

    //金币购买英雄
    public goldBuyHero(_carInfo: any = null, btnObj: Laya.Button = null): void {
        let carPrice = BattleManager.Instance.getMonsterPrice(_carInfo.buyPrice, userData.queryBuyRecord(_carInfo.id));
        if (PlayerManager.Instance.Info.userMoney >= carPrice) {
            if (BattleManager.Instance.createPet(_carInfo.id) == null) return;
            HallManager.Instance.hall.updateGold(PlayerManager.Instance.Info.userMoney - carPrice);
            //刷新消费记录
            userData.refreshBuyRecord(_carInfo.id);
            let curPrice = BattleManager.Instance.getMonsterPrice(_carInfo.buyPrice, userData.queryBuyRecord(_carInfo.id));
            if (btnObj) {
                let imgPrice = btnObj.getChildByName("imgPrice") as Laya.Image;
                if (imgPrice) {
                    let txtPrice = imgPrice.getChildByName("txtPrice") as Laya.Label;
                    if (txtPrice) {
                        txtPrice.text = MathUtils.bytesToSize(curPrice);
                    }
                    MessageUtils.shopMsgByObj(btnObj, LanguageManager.Instance.getLanguageText("hallScene.label.txt.07"));
                }
            }
            HallManager.Instance.hall.refreshShortcutCreateBtn();
        } else {
            if (userData.getAdTimes(12) > 0 && PlayerManager.Instance.Info.dayGetGoldCount > 0) {
                ViewMgr.Ins.open(ViewConst.RewardGoldView);
            } else {
                MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.19"));
                ViewMgr.Ins.open(ViewConst.FriendConcurView);
            }
        }
    }

    /** 检查轮盘是否可以免费抽奖 */
    public checkIsFreeLottery($freeTime: number = -1): void {
        this.hall.txt_prizeTime.text = "大转盘";
        if ($freeTime > 0 || userData.isShowLuckPrizeRedPoint()) {
            this.hall.txt_prizeTime.text = "免费抽奖";
            EventsManager.Instance.event(EventsType.LUCK_PRIZED_RED_POINT, "show");
        }
    }

    /** 查询是否可以领取的成就任务 */
    public checkIsGetAchievementReward(): void {
        HttpManager.Instance.requestAchievementInfo((data) => {
            let listData: any[] = data;
            if (!listData || listData.length < 1) return;
            let taskInfo: any = null;
            for (let index = 0; index < listData.length; index++) {
                const element = listData[index];
                //task_status 0为完成  1可领取 2已领取
                if (element.task_status == 1) {
                    taskInfo = element;
                    break;
                }
            }
            if (taskInfo != null) {
                ViewMgr.Ins.open(ViewConst.AchiRewardView, null, taskInfo);
            }
        });
    }

    /** 是否超过10秒后点击视频 */
    private _isClickVideo: boolean = true;
    public isClickVideoTime(): boolean {
        if (this._isClickVideo) {
            this._isClickVideo = false;
            this.hall.timerOnce(25 * 1000, this, () => {
                this._isClickVideo = true;
            })
            return true;
        }
        return false;
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
    ESSENCE = 3,
}