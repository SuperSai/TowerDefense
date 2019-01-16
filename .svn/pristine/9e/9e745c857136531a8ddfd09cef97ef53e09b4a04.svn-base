/*
* 强化界面
*/
class StrengthenView extends BaseView {
    constructor() {
        super(LAYER_TYPE.FRAME_LAYER, ui.strengthen.StrengthenViewUI);
        this.indexArray = [10, 2, 1, 3];
        this.setResources(["strengthen"]);
    }
    //初始化
    initUI() {
        super.initUI();
        let self = this;
        SDKManager.Instance.showBannerAd();
        //界面初始化
        let imgBg = self.ui.mainView.getChildByName("imgBg");
        if (imgBg) {
            let btnExit = imgBg.getChildByName("btnExit");
            if (btnExit) {
                btnExit.offAll(Laya.Event.CLICK);
                btnExit.on(Laya.Event.CLICK, btnExit, () => {
                    ViewMgr.Ins.close(ViewConst.StrengthenView);
                });
            }
            let btnSkill = imgBg.getChildByName("btn_skill");
            if (btnSkill) {
                btnSkill.offAll(Laya.Event.CLICK);
                btnSkill.on(Laya.Event.CLICK, btnSkill, () => {
                    ViewMgr.Ins.open(ViewConst.SkillExplainView);
                });
            }
        }
        //box
        for (var index = 0; index < 4; index++) {
            let skillId = self.indexArray[index];
            self.refreshBoxUI(skillId);
        }
        //精华碎片刷新
        self.setEssence(M.player.Info.userEssence);
        EventsManager.Instance.on(EventsType.ESSENCE_CHANGE, self, (_data) => {
            self.setEssence(M.player.Info.userEssence);
        });
        HttpManager.Instance.requestEssenceData();
    }
    //刷新精华碎片数
    setEssence(_value) {
        let that = this;
        if (that.ui.txtEssence) {
            that.ui.txtEssence.changeText(MathUtils.bytesToSize(_value).toString());
        }
    }
    //设置强化数据
    refreshBoxUI($skillId) {
        let that = this;
        for (var index = 0; index < 4; index++) {
            let skillId = that.indexArray[index];
            if ($skillId == skillId) {
                let strengthenLevel = userData.querySkillAddition($skillId);
                let curProbability = SkillManager.Instance.getSkillStrengthenLevelProbability($skillId, strengthenLevel);
                // let probability: number = SkillManager.Instance.getSkillStrengthenProbability(skillId, 1);
                let price = SkillManager.Instance.getSkillStrengthenCost($skillId, strengthenLevel + 1);
                let imgBg = that.ui.mainView.getChildByName("imgBg");
                if (imgBg) {
                    let strBoxKey = "boxItem" + (index + 1);
                    let boxItem = imgBg.getChildByName(strBoxKey);
                    if (boxItem) {
                        let hbox = boxItem.getChildByName("hbox");
                        if (hbox) {
                            //加成
                            let txtAdd = hbox.getChildByName("txtAdd");
                            if (txtAdd) {
                                txtAdd.text = (MathUtils.numToPercent(curProbability));
                            }
                            hbox.refresh();
                        }
                        let txtLevel = boxItem.getChildByName("txtLevel");
                        if (txtLevel) {
                            txtLevel.text = "Lv" + strengthenLevel;
                        }
                        //按钮
                        let btnStrengthen = boxItem.getChildByName("btnStrengthen");
                        if (btnStrengthen) {
                            btnStrengthen.offAll(Laya.Event.CLICK);
                            btnStrengthen.on(Laya.Event.CLICK, that, (_btnObj, _btnInfo) => {
                                if (M.player.Info.userEssence < _btnInfo.price) {
                                    MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.17"));
                                    return;
                                }
                                if (userData.querySkillAddition(_btnInfo.skillId) >= 50) {
                                    return MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.16"));
                                }
                                HttpManager.Instance.requestSkillStrengthen(_btnInfo.skillId, 1, _btnInfo.price, 1, (_res) => {
                                    if (_res && _res.type) {
                                        userData.refreshSkillAddition(_btnInfo.skillId);
                                        that.refreshBoxUI(_btnInfo.skillId);
                                        let bone = new BoneAnim("qhcg");
                                        AlignUtils.setToScreenGoldenPos(bone);
                                        LayerMgr.Instance.addToLayer(bone, LAYER_TYPE.SCREEN_EFFECT_LAYER);
                                        // MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.18"));
                                        StrengthenManager.Instance.checkRedPoint();
                                        if (_res.hasOwnProperty("essence")) {
                                            userData.setEssence(MathUtils.parseInt(_res.essence));
                                            that.setEssence(M.player.Info.userEssence);
                                        }
                                    }
                                });
                            }, [btnStrengthen, { skillId: skillId, price: price }]);
                            let txtEssence = btnStrengthen.getChildByName("txtEssence");
                            if (txtEssence) {
                                txtEssence.text = ("" + price);
                            }
                        }
                    }
                }
            }
        }
    }
    close(...param) {
        super.close(param);
        EventsManager.Instance.offAll(EventsType.ESSENCE_CHANGE);
    }
}
//# sourceMappingURL=StrengthenView.js.map