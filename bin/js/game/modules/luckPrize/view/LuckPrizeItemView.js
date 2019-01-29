/*
* 幸运转盘奖励界面;
*/
class LuckPrizeItemView extends BaseView {
    constructor() {
        super(M.layer.subFrameLayer, ui.luckPrize.LuckPrizeItemViewUI);
    }
    initData() {
        super.initData();
        this.isRemoveBanner = false;
        if (this.datas[0]) {
            this.ui.imgItem.skin = this.datas[0].imgUrl;
            switch (this.datas[0].id) {
                case 2: //大量钻石
                    this.showDiamond(this.datas[0].name, this.datas[0].num);
                    break;
                case 3: //少量金币
                    this.showGold(this.getGold() * 2);
                    break;
                case 4: //大量精华
                    this.showEssence(this.datas[0].name, this.datas[0].num);
                    break;
                case 6: //少量钻石
                    this.showDiamond(this.datas[0].name, this.datas[0].num);
                    break;
                case 7: //大量金币
                    this.showGold(this.getGold() * 5);
                    break;
                case 8: //少量精华
                    this.showEssence(this.datas[0].name, this.datas[0].num);
                    break;
            }
        }
    }
    addEvents() {
        super.addEvents();
        this.ui.btnExit.on(Laya.Event.CLICK, this, this.onCloseHandler);
    }
    removeEvents() {
        super.removeEvents();
        this.ui.btnExit.off(Laya.Event.CLICK, this, this.onCloseHandler);
    }
    showGold(gold) {
        gold = gold * HallManager.Instance.hallData.magnification;
        this.ui.txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", this.datas[0].name, MathUtils.bytesToSize(gold));
        let point = PointUtils.localToGlobal(this.ui.imgItem);
        M.layer.screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", point.x, point.y));
        EventsManager.Instance.event(EventsType.GOLD_CHANGE, { money: M.player.Info.userMoney += gold });
    }
    showDiamond(name, diamond) {
        diamond = diamond * HallManager.Instance.hallData.magnification;
        this.ui.txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", name, diamond);
        let point = PointUtils.localToGlobal(this.ui.imgItem);
        M.layer.screenEffectLayer.addChild(new FlyEffect().play("diamond", point.x, point.y));
        HttpManager.Instance.requestDiamondData(); //刷新钻石数量
    }
    showEssence(name, essence) {
        essence = essence * HallManager.Instance.hallData.magnification;
        this.ui.txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", name, essence);
        HttpManager.Instance.requestEssenceData();
    }
    getGold() {
        // let monsterType: number = userData.isEvolution() ? 2 : 1;
        // let monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, userData.getCarLevel());
        // if (monsterInfo) {
        //     let curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
        //     return curPrice;
        // }
        let stagePrizeCfg = GlobleData.getData(GlobleData.BarrierRewardVO, HallManager.Instance.hallData.passStage);
        if (stagePrizeCfg) {
            return BattleManager.Instance.getBarrierRewardToGold(HallManager.Instance.hallData.passStage, MathUtils.parseStringNum(stagePrizeCfg.gold));
        }
        return 0;
    }
    onCloseHandler() {
        ViewMgr.Ins.close(ViewConst.LuckPrizeItemView);
    }
    close(...param) {
        super.close(param);
        HallManager.Instance.hallData.magnification = 1;
        this.callback && this.callback();
    }
}
//# sourceMappingURL=LuckPrizeItemView.js.map