/*
* 守卫升级界面
*/
class EvolutionView extends BaseView {
    constructor() {
        super(M.layer.frameLayer, ui.evolution.EvolutionViewUI);
        this._diamond = 0;
        this._needDiamond = 0;
    }
    //初始化
    initUI() {
        super.initUI();
        let self = this;
        //界面初始化
        self.ui.btnUpdate.offAll(Laya.Event.CLICK);
        self.ui.btnExit.offAll(Laya.Event.CLICK);
        self.ui.btnExit.on(Laya.Event.CLICK, self, () => {
            ViewMgr.Ins.close(ViewConst.EvolutionView);
        });
        self.refreshBoxUI();
        M.layer.frameLayer.on(LayerEvent.LAYER_ANIMATION_COMPLETE, this, (complete) => {
            if (complete) {
                if (!NoviceManager.isComplete) {
                    M.novice.on(NoviceEvent.ACTIVATE_TARGET, self, (eventParam) => {
                        if (eventParam === NoviceTarget.FOREST_KING_UPGRADE) {
                            M.novice.activateClickTarget(self.ui.btnUpdate, eventParam, self.ui.btnUpdate.parent);
                        }
                        else if (eventParam === NoviceTarget.FOREST_KING_CLOSE) {
                            M.novice.activateClickTarget(self.ui.btnExit, eventParam, self.ui.btnExit.parent);
                        }
                    });
                }
                M.novice.manuallyEventOut();
            }
        });
        let bossId = userData.isEvolution() ? 100003 : 100002;
        this.ui.spMountGuard.setKind(bossId);
    }
    refreshBoxUI() {
        let self = this;
        let kingLevel = userData.getKingLevel();
        let kingVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
        //界面初始化
        if (kingVO) {
            //加成属性
            let atk = kingVO.attack;
            let atkSpeed = kingVO.interval;
            let atkAdd = kingVO.shatk * kingLevel;
            let doubleAdd = kingVO.crit * kingLevel;
            let heroData = BattleManager.Instance.getMonsterItem(EvolutionManager.Instance.getHeroId());
            let heroName = "英雄" + " Lv" + EvolutionManager.Instance.getHeroLevel() + ":";
            if (heroData) {
                heroName = heroData.name + " Lv" + EvolutionManager.Instance.getHeroLevel() + ":";
            }
            let currHeroCount = userData.caculateMonsterCount(EvolutionManager.Instance.getHeroId());
            let needHeroCount = 3;
            //需要钻石
            self._diamond = M.player.Info.userDiamond;
            self._needDiamond = MathUtils.parseInt(kingVO.gemxh.toString());
            self.ui.btnUpdate.disabled = !EvolutionManager.Instance.canEvolutionUpgrade();
            self.ui.txtKingLevel.text = kingLevel + "";
            self.ui.txtAtk.text = MathUtils.bytesToSize(atk);
            self.ui.txtAtkAdd.text = MathUtils.numToPercent(atkAdd);
            self.ui.txtAtkSpeed.text = MathUtils.bytesToSize(atkSpeed) + "s";
            self.ui.txtDoubleAdd.text = MathUtils.numToPercent(doubleAdd);
            let isShow = kingLevel > 10;
            self.ui.heroBox.visible = isShow;
            self.ui.txtItemName.text = heroName;
            self.ui.txtNeedItem0.text = Math.min(currHeroCount, needHeroCount);
            self.ui.txtNeedItem1.text = '/' + needHeroCount;
            if (currHeroCount >= needHeroCount) {
                self.ui.txtNeedItem0.color = "#9a8d00";
                self.ui.iconImg0.skin = "images/hall/hall_gou.png";
            }
            else {
                self.ui.txtNeedItem0.color = "#ea1010";
                self.ui.iconImg0.skin = "images/hall/hall_xx.png";
            }
            self.ui.txtNeedDiamond0.text = Math.min(self._diamond, self._needDiamond);
            self.ui.txtNeedDiamond1.text = '/' + self._needDiamond;
            if (self._diamond >= self._needDiamond) {
                self.ui.txtNeedDiamond0.color = "#9a8d00";
                self.ui.iconImg1.skin = "images/hall/hall_gou.png";
            }
            else {
                self.ui.txtNeedDiamond0.color = "#ea1010";
                self.ui.iconImg1.skin = "images/hall/hall_xx.png";
            }
            self.ui.hboxDiamond.refresh();
            if (isShow) {
                self.ui.diamondBox.pos(32, 703);
            }
            else {
                self.ui.diamondBox.pos(32, 630);
            }
            self.ui.nameHbox.refresh();
        }
    }
    addEvents() {
        super.addEvents();
        this.ui.btnUpdate.on(Laya.Event.CLICK, this, this.onEvolutionLevel);
    }
    removeEvents() {
        super.removeEvents();
        this.ui.btnUpdate.off(Laya.Event.CLICK, this, this.onEvolutionLevel);
    }
    onEvolutionLevel() {
        if (this._diamond >= this._needDiamond) {
            if (GlobalConfig.DEBUG) {
                this.evolutionLevelComplete(userData.getKingLevel() + 1, M.player.Info.userDiamond - this._needDiamond);
            }
            else {
                HttpManager.Instance.requestUpdateKingLevel(EvolutionView.kingEvolutionType, userData.getKingLevel(), this._needDiamond, (_res) => {
                    if (_res && _res.type) {
                        this.evolutionLevelComplete(userData.getKingLevel() + 1, _res.diamond);
                    }
                });
            }
        }
        else {
            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.04"));
        }
    }
    evolutionLevelComplete(kingLevel, diamond) {
        let self = this;
        ViewMgr.Ins.open(ViewConst.EvolutionLevelView, () => {
            HallManager.Instance.hallData.isUpdate = false;
            if (HallManager.Instance.hall && kingLevel > HallManager.Instance.hallData.userKingLevel) {
                HallManager.Instance.hall.setKingLevel(kingLevel);
            }
            if (diamond > 0)
                EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: M.player.Info.userDiamond = diamond });
            EventsManager.Instance.event(EventsType.EVOLUTION_LEVEL_COMPLETE, kingLevel);
            self.refreshBoxUI();
            self.ui.btnUpdate.disabled = !EvolutionManager.Instance.canEvolutionUpgrade();
        }, kingLevel);
    }
    close(...param) {
        super.close(param);
        EventsManager.Instance.offAll(EventsType.ESSENCE_CHANGE);
    }
}
EvolutionView.kingEvolutionType = 101;
//# sourceMappingURL=EvolutionView.js.map