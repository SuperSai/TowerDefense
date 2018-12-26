/*
* 守卫升级界面
*/
class EvolutionView extends ui.evolution.EvolutionViewUI {
    static isOpen: boolean = false;
    static kingEvolutionType: number = 101;

    constructor(_stage: number = -1) {
        super();
        this.init(_stage);
    }
    //新建并添加到节点
    static Create(_parentNode: Laya.Node, _callback: any = null, _removeCallback: any = null, _stage: number = -1): void {
        let resList = [
            { url: "res/atlas/images.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                if (EvolutionView.isOpen) {
                    return;
                }
            } else {
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
    private init(_stage: number): void {
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
                            M.novice.activateClickTarget(self.btnUpdate, eventParam, self.btnUpdate.parent as Sprite);
                        } else if (eventParam === NoviceTarget.FOREST_KING_CLOSE) {
                            M.novice.ui.btnReturnNovice2.visible = true;
                            M.novice.activateClickTarget(self.btnExit, eventParam, self.btnExit.parent as Sprite);
                        }
                    });
                }
                M.novice.manuallyEventOut();
            }
        });
    }

    //移除界面
    public removeUI(): void {
        EventsManager.Instance.offAll(EventsType.ESSENCE_CHANGE);
    }

    //设置强化数据
    public refreshBoxUI(_callback: any): void {
        let self = this;
        let kingLevel: number = userData.getKingLevel();
        let kingVO: KindLevelConfigVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
        //界面初始化
        if (kingVO) {
            //加成属性
            let atk: number = kingVO.attack;
            let atkSpeed: number = kingVO.interval;
            let atkAdd: number = kingVO.shatk * kingLevel;
            let doubleAdd: number = kingVO.crit * kingLevel;

            let heroData: any = BattleManager.Instance.getMonsterItem(EvolutionManager.Instance.getHeroId());
            let heroName: string = "英雄" + " Lv" + EvolutionManager.Instance.getHeroLevel() + ":";
            if (heroData) {
                heroName = heroData.name + " Lv" + EvolutionManager.Instance.getHeroLevel() + ":";
            }
            let currHeroCount: number = userData.caculateMonsterCount(EvolutionManager.Instance.getHeroId());
            let needHeroCount: number = 3;
            //需要钻石
            let diamond: number = userData.diamond;
            let needDiamond: number = MathUtils.parseInt(kingVO.gemxh.toString());
            if (kingLevel > 10) {
                self.btnUpdate.disabled = (diamond < needDiamond) || (currHeroCount < needHeroCount);
            } else {
                self.btnUpdate.disabled = diamond < needDiamond;
            }
            self.txtKingLevel.text = kingLevel + "";
            self.txtAtk.text = MathUtils.bytesToSize(atk);
            self.txtAtkAdd.text = MathUtils.numToPercent(atkAdd);
            self.txtAtkSpeed.text = MathUtils.bytesToSize(atkSpeed) + "s";
            self.txtDoubleAdd.text = MathUtils.numToPercent(doubleAdd);

            let isShow: boolean = kingLevel > 10;
            self.heroBox.visible = isShow;
            self.txtItemName.text = heroName;

            self.txtNeedItem.text = Math.min(currHeroCount, needHeroCount) + '/' + needHeroCount;
            self.txtNeedDiamond.text = Math.min(diamond, needDiamond) + '/' + needDiamond;

            if (isShow) {
                self.diamondBox.pos(32, 558);
            } else {
                self.diamondBox.pos(32, 507);
            }

            self.nameHbox.refresh();

            self.btnUpdate.on(Laya.Event.CLICK, self, () => {
                if (diamond >= needDiamond) {
                    HttpManager.Instance.requestUpdateKingLevel(EvolutionView.kingEvolutionType, kingLevel, needDiamond, (_res: any) => {
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
                } else {
                    MessageUtils.showMsgTips("钻石不足");
                }
            });
        }
    }
}