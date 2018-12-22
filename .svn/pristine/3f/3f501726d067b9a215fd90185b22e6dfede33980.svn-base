/*
* 守卫升级界面
*/
class EvolutionView extends ui.evolution.EvolutionViewUI {
    constructor(_stage = -1) {
        super();
        this.init(_stage);
    }
    //新建并添加到节点
    static Create(_parentNode, _callback = null, _removeCallback = null, _stage = -1) {
        let resList = [
            { url: "res/atlas/images.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                if (EvolutionView.isOpen) {
                    return;
                }
            }
            else {
                EvolutionView.isOpen = true;
                let nodeView = new EvolutionView(_stage);
                M.layer.frameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                _callback && _callback(nodeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, () => {
                    EvolutionView.isOpen = false;
                    nodeView.removeUI();
                    _removeCallback && _removeCallback();
                });
            }
        }));
    }
    //初始化
    init(_stage) {
        let self = this;
        //界面初始化
        self.btnUpdate.offAll(Laya.Event.CLICK);
        self.btnExit.offAll(Laya.Event.CLICK);
        self.btnExit.on(Laya.Event.CLICK, self, () => {
            self.removeSelf();
        });
        M.layer.frameLayer.on(LayerEvent.LAYER_ANIMATION_COMPLETE, this, (complete) => {
            if (complete) {
                if (!NoviceManager.isComplete) {
                    M.novice.on(NoviceEvent.ACTIVATE_TARGET, self, (eventParam) => {
                        if (eventParam === NoviceTarget.FOREST_KING_UPGRADE) {
                            M.novice.activateClickTarget(self.btnUpdate, eventParam, self.btnUpdate.parent);
                        }
                        else if (eventParam === NoviceTarget.FOREST_KING_CLOSE) {
                            M.novice.ui.btnReturnNovice2.visible = true;
                            M.novice.activateClickTarget(self.btnExit, eventParam, self.btnExit.parent);
                        }
                    });
                }
                M.novice.manuallyEventOut();
            }
        });
    }
    //移除界面
    removeUI() {
        EventsManager.Instance.offAll(EventsType.ESSENCE_CHANGE);
    }
    //设置强化数据
    refreshBoxUI(_callback) {
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
            //升级条件
            let monsterLevel = 0;
            let heroId = 0;
            //进化设定
            if (userData.isEvolution()) {
                monsterLevel = ((kingLevel - 30) % 60) + 1;
                heroId = 1000 + monsterLevel;
            }
            else {
                monsterLevel = ((kingLevel - 1) % 30) + 1;
                heroId = 100 + monsterLevel;
            }
            let heroData = BattleManager.Instance.getMonsterItem(heroId);
            let heroName = "英雄" + " Lv" + monsterLevel + ":";
            if (heroData) {
                heroName = heroData.name + " Lv" + monsterLevel + ":";
            }
            let currHeroCount = userData.caculateMonsterCount(heroId);
            let needHeroCount = 3;
            //需要钻石
            let diamond = userData.diamond;
            let needDiamond = MathUtils.parseInt(kingVO.gemxh.toString());
            if (kingLevel > 10) {
                self.btnUpdate.disabled = (diamond < needDiamond) || (currHeroCount < needHeroCount);
            }
            else {
                self.btnUpdate.disabled = diamond < needDiamond;
            }
            self.txtKingLevel.text = kingLevel + "";
            self.txtAtk.text = MathUtils.bytesToSize(atk);
            self.txtAtkAdd.text = MathUtils.numToPercent(atkAdd);
            self.txtAtkSpeed.text = MathUtils.bytesToSize(atkSpeed) + "s";
            self.txtDoubleAdd.text = MathUtils.numToPercent(doubleAdd);
            let isShow = kingLevel > 10;
            self.heroBox.visible = isShow;
            self.txtItemName.text = heroName;
            self.txtNeedItem.text = Math.min(currHeroCount, needHeroCount) + '/' + needHeroCount;
            self.txtNeedDiamond.text = Math.min(diamond, needDiamond) + '/' + needDiamond;
            if (isShow) {
                self.diamondBox.pos(32, 558);
            }
            else {
                self.diamondBox.pos(32, 507);
            }
            self.nameHbox.refresh();
            self.btnUpdate.on(Laya.Event.CLICK, self, () => {
                if (diamond >= needDiamond) {
                    HttpManager.Instance.requestUpdateKingLevel(EvolutionView.kingEvolutionType, kingLevel, needDiamond, (_res) => {
                        if (_res && _res.type) {
                            MessageUtils.showMsgTips("升级成功");
                            HallManager.Instance.hallData.isUpdate = false;
                            _callback && _callback(kingLevel + 1, _res.diamond);
                            self.refreshBoxUI(_callback);
                        }
                    });
                    if (GlobalConfig.DEBUG) {
                        HallManager.Instance.hallData.isUpdate = false;
                        _callback && _callback(kingLevel + 1, userData.diamond - needDiamond);
                        self.refreshBoxUI(_callback);
                    }
                }
                else {
                    MessageUtils.showMsgTips("钻石不足");
                }
            });
        }
    }
}
EvolutionView.isOpen = false;
EvolutionView.kingEvolutionType = 101;
//# sourceMappingURL=EvolutionView.js.map