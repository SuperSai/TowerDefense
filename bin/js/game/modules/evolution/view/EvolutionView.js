/*
* 守卫升级界面
*/
class EvolutionView extends BaseView {
    constructor() {
        super(LAYER_TYPE.FRAME_LAYER, ui.evolution.EvolutionViewUI);
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
        LayerMgr.Instance.getLayerByType(LAYER_TYPE.FRAME_LAYER).on(LayerEvent.LAYER_ANIMATION_COMPLETE, this, (complete) => {
            if (complete) {
                if (!NoviceManager.isComplete) {
                    M.novice.on(NoviceEvent.ACTIVATE_TARGET, self, (eventParam) => {
                        if (eventParam === NoviceTarget.FOREST_KING_UPGRADE) {
                            M.novice.activateClickTarget(self.ui.btnUpdate, eventParam, self.ui.btnUpdate.parent);
                        }
                        else if (eventParam === NoviceTarget.FOREST_KING_CLOSE) {
                            M.novice.ui.btnReturnNovice2.visible = true;
                            M.novice.activateClickTarget(self.ui.btnExit, eventParam, self.ui.btnExit.parent);
                        }
                    });
                }
                M.novice.manuallyEventOut();
            }
        });
    }
    //设置强化数据
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
            let diamond = M.player.Info.userDiamond;
            let needDiamond = MathUtils.parseInt(kingVO.gemxh.toString());
            if (kingLevel > 10) {
                self.ui.btnUpdate.disabled = (diamond < needDiamond) || (currHeroCount < needHeroCount);
            }
            else {
                self.ui.btnUpdate.disabled = diamond < needDiamond;
            }
            self.ui.txtKingLevel.text = kingLevel + "";
            self.ui.txtAtk.text = MathUtils.bytesToSize(atk);
            self.ui.txtAtkAdd.text = MathUtils.numToPercent(atkAdd);
            self.ui.txtAtkSpeed.text = MathUtils.bytesToSize(atkSpeed) + "s";
            self.ui.txtDoubleAdd.text = MathUtils.numToPercent(doubleAdd);
            let isShow = kingLevel > 10;
            self.ui.heroBox.visible = isShow;
            self.ui.txtItemName.text = heroName;
            self.ui.txtNeedItem.text = Math.min(currHeroCount, needHeroCount) + '/' + needHeroCount;
            self.ui.txtNeedDiamond.text = Math.min(diamond, needDiamond) + '/' + needDiamond;
            if (isShow) {
                self.ui.diamondBox.pos(32, 558);
            }
            else {
                self.ui.diamondBox.pos(32, 507);
            }
            self.ui.nameHbox.refresh();
            self.ui.btnUpdate.on(Laya.Event.CLICK, self, () => {
                if (diamond >= needDiamond) {
                    if (GlobalConfig.DEBUG) {
                        this.evolutionLevelComplete(kingLevel + 1, M.player.Info.userDiamond - needDiamond);
                    }
                    else {
                        HttpManager.Instance.requestUpdateKingLevel(EvolutionView.kingEvolutionType, kingLevel, needDiamond, (_res) => {
                            if (_res && _res.type) {
                                this.evolutionLevelComplete(kingLevel + 1, _res.diamond);
                            }
                        });
                    }
                }
                else {
                    MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.04"));
                }
            });
        }
    }
    evolutionLevelComplete(kingLevel, diamond) {
        let self = this;
        MessageUtils.showMsgTips("升级成功");
        HallManager.Instance.hallData.isUpdate = false;
        if (diamond > 0)
            EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: M.player.Info.userDiamond = diamond });
        EventsManager.Instance.event(EventsType.EVOLUTION_LEVEL_COMPLETE, kingLevel);
        self.refreshBoxUI();
    }
    close(...param) {
        super.close(param);
        EventsManager.Instance.offAll(EventsType.ESSENCE_CHANGE);
    }
}
EvolutionView.kingEvolutionType = 101;
//# sourceMappingURL=EvolutionView.js.map