/*
* 幸运转盘奖励界面;
*/
class LuckPrizeItemView extends BaseView {
    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.luckPrize.LuckPrizeItemViewUI);
    }
    initData() {
        super.initData();
        this._tween = EffectUtils.objectRotate(this.ui.imgLight);
        if (this.datas[0]) {
            this.ui.imgItem.skin = this.datas[0].imgUrl;
            switch (this.datas[0].id) {
                case 2: //大量钻石
                    this.showDiamond(this.datas[0].name, this.datas[0].num);
                    break;
                case 3: //少量金币
                    this.showGold(this.getGold() * 0.8);
                    break;
                case 4: //大量精华
                    this.showEssence(this.datas[0].name, this.datas[0].num);
                    break;
                case 6: //少量钻石
                    this.showDiamond(this.datas[0].name, this.datas[0].num);
                    break;
                case 7: //大量金币
                    this.showGold(this.getGold() * 1.5);
                    break;
                case 8: //少量精华
                    this.showEssence(this.datas[0].name, this.datas[0].num);
                    break;
            }
            HttpManager.Instance.requestPrizeCensus(this.datas[0].id, 1);
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
        LayerManager.getInstance().screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
        EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: M.player.Info.userMoney += gold });
    }
    showDiamond(name, diamond) {
        diamond = diamond * HallManager.Instance.hallData.magnification;
        LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", name, diamond);
        LayerManager.getInstance().screenEffectLayer.addChild(new FlyEffect().play("diamond", LayerManager.mouseX, LayerManager.mouseY));
        HttpManager.Instance.requestDiamondData(); //刷新钻石数量
    }
    showEssence(name, essence) {
        essence = essence * HallManager.Instance.hallData.magnification;
        LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", name, essence);
        HttpManager.Instance.requestEssenceData();
    }
    getGold() {
        let monsterType = userData.isEvolution() ? 2 : 1;
        let monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, userData.getCarLevel());
        if (monsterInfo) {
            let curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
            return curPrice;
        }
        return 0;
    }
    onCloseHandler() {
        ViewMgr.Ins.close(ViewConst.LuckPrizeItemView);
    }
    close(...param) {
        super.close(param);
        Laya.Tween.clear(this._tween);
        HallManager.Instance.hallData.magnification = 1;
    }
}
//# sourceMappingURL=LuckPrizeItemView.js.map