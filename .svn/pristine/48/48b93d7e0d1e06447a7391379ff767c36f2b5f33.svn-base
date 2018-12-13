/*
* 强化界面
*/
class StrengthenView extends ui.strengthen.StrengthenViewUI {
    static isOpen: boolean = false;
    private indexArray: Array<number> = [10, 1, 3, 2];

    constructor(_stage: number = -1) {
        super();
        this.init(_stage);
    }
    //新建并添加到节点
    static Create(_parentNode?: Laya.Node, _callback: any = null, _removeCallback: any = null, _stage: number = -1): void {
        let resList = [
            { url: "res/atlas/images/strengthen.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                if (StrengthenView.isOpen) {
                    return;
                }
            } else {
                StrengthenView.isOpen = true;
                let nodeView = new StrengthenView(_stage);
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().frameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                _callback && _callback(nodeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, () => {
                    StrengthenView.isOpen = false;
                    nodeView.removeUI();
                    _removeCallback && _removeCallback();
                });
            }
        }));
    }

    //初始化
    private init(_stage: number): void {
        let that = this;
        //界面初始化
        let imgBg = that.mainView.getChildByName("imgBg") as Laya.Image;
        if (imgBg) {
            let btnExit = imgBg.getChildByName("btnExit") as Laya.Button;
            if (btnExit) {
                btnExit.offAll(Laya.Event.CLICK);
                btnExit.on(Laya.Event.CLICK, btnExit, () => {
                    that.removeSelf();
                });
            }
        }
        //box
        for (var index = 0; index < 4; index++) {
            let skillId: number = that.indexArray[index];
            that.refreshBoxUI(skillId);
        }
        //精华碎片刷新
        that.setEssence(userData.essence);
        EventsManager.Instance.on(EventsType.ESSENCE_CHANGE, that, (_data: any) => {
            that.setEssence(userData.essence);
        });

        HttpManager.Instance.requestEssenceData();
    }
    //移除界面
    private removeUI(): void {
        EventsManager.Instance.offAll(EventsType.ESSENCE_CHANGE);
    }

    //刷新精华碎片数
    public setEssence(_value: number): void {
        let that = this;
        if (that.txtEssence) {
            that.txtEssence.changeText(MathUtils.bytesToSize(_value).toString());
        }
    }
    //设置强化数据
    private refreshBoxUI($skillId: number): void {
        let that = this;
        for (var index = 0; index < 4; index++) {
            let skillId: number = that.indexArray[index];
            if ($skillId == skillId) {
                let strengthenLevel: number = userData.querySkillAddition($skillId);
                let curProbability: number = SkillManager.Instance.getSkillStrengthenLevelProbability($skillId, strengthenLevel);
                let probability: number = SkillManager.Instance.getSkillStrengthenProbability(skillId, 1);
                let price: number = SkillManager.Instance.getSkillStrengthenCost($skillId, strengthenLevel + 1);

                let imgBg = that.mainView.getChildByName("imgBg") as Laya.Image;
                if (imgBg) {
                    let strBoxKey = "boxItem" + (index + 1);
                    let boxItem = imgBg.getChildByName(strBoxKey) as Laya.Box;
                    if (boxItem) {
                        //加成
                        let txtAdd = boxItem.getChildByName("txtAdd") as Laya.Label;
                        if (txtAdd) {
                            txtAdd.text = (MathUtils.numToPercent(curProbability));
                        }

                        //价格
                        let imgEssence = boxItem.getChildByName("imgEssence") as Laya.Image;
                        if (imgEssence) {
                            let txtEssence = imgEssence.getChildByName("txtEssence") as Laya.Label;
                            if (txtEssence) {
                                txtEssence.text = ("" + price);
                            }
                        }
                        //按钮
                        let btnStrengthen = boxItem.getChildByName("btnStrengthen") as Laya.Button;
                        if (btnStrengthen) {
                            btnStrengthen.offAll(Laya.Event.CLICK);
                            btnStrengthen.on(Laya.Event.CLICK, that, (_btnObj: Laya.Button, _btnInfo: any) => {
                                if (userData.essence < _btnInfo.price) {
                                    CommonFun.showTip(LanguageManager.Instance.getLanguageText("hallScene.label.txt.17"));
                                    return;
                                }
                                if (userData.querySkillAddition(_btnInfo.skillId) >= 50) {
                                    return CommonFun.showTip(LanguageManager.Instance.getLanguageText("hallScene.label.txt.16"));
                                }
                                that.requestSkillStrengthen(_btnInfo.skillId, 1, _btnInfo.price, 1, (_res: any) => {
                                    if (_res && _res.type) {
                                        userData.refreshSkillAddition(_btnInfo.skillId);
                                        that.refreshBoxUI(_btnInfo.skillId);
                                        CommonFun.showTip(LanguageManager.Instance.getLanguageText("hallScene.label.txt.18"));
                                        StrengthenManager.Instance.checkRedPoint();
                                        if (_res.hasOwnProperty("essence")) {
                                            userData.setEssence(MathUtils.parseInt(_res.essence));
                                            that.setEssence(userData.essence);
                                        }
                                    }
                                });
                            }, [btnStrengthen, { skillId: skillId, price: price }]);

                            let txtAdd = btnStrengthen.getChildByName("txtAdd") as Laya.Label;
                            if (txtAdd) {
                                txtAdd.changeText(MathUtils.numToPercent(probability));
                            }
                        }
                    }
                }
            }
        }
    }

    //请求技能强化
    public requestSkillStrengthen(_id: number, _level: number, _price: number, _coinType: number, _callback: any = null): void {
        let that = this;
        let dataString = 'type=' + _id + '&value=' + _level + '&price=' + _price + '&unit=' + "essence";
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/intensify',
            method: 'Post',
            data: dataString,
            success: function (res) {
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
}