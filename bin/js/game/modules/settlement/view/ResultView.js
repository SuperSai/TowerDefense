/*
* terry 2018/11/07;
*/
class ResultView extends ui.settlement.ResultViewUI {
    constructor(_stage = -1) {
        super();
        this.prizeList = null;
        this.curStage = 0;
        this.lastStage = 0;
        this.init(_stage);
    }
    //新建并添加到节点
    static Create(_callback = null, _removeCallback = null, _stage = -1) {
        let resList = [
            { url: "res/atlas/images/ClearanceReward.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            let nodeView = M.layer.frameLayer.getChildByName("ResultView");
            if (!nodeView) {
                nodeView = new ResultView(_stage);
                nodeView.name = "ResultView";
                nodeView.removeCallback = _removeCallback;
                M.layer.frameLayer.addChildWithMaskCall(nodeView, () => {
                    nodeView.removeSelf();
                });
            }
            nodeView.btnExit.visible = false;
            _callback && _callback(nodeView);
        }));
    }
    //初始化
    init(_stage) {
        let that = this;
        that.curStage = _stage;
        this.timerOnce(2000, this, () => {
            this.btnExit.visible = true;
        });
    }
    removeSelf() {
        this.removeCallback && this.removeCallback();
        return super.removeSelf();
    }
    //显示成功奖励界面
    showPrizeUI(_prizeList, _callback = null) {
        let that = this;
        that.prizeList = _prizeList;
        let imgBg = that.mainView.getChildByName("imgBg");
        if (imgBg) {
            imgBg.visible = true;
            this.btnExit.offAll(Laya.Event.CLICK);
            this.btnExit.on(Laya.Event.CLICK, this, () => {
                DisplayUtils.removeAllChildren(this.hbox);
                that.removeSelf();
            });
            let btnGet = imgBg.getChildByName("btn_get");
            if (btnGet) {
                btnGet.offAll(Laya.Event.CLICK);
                btnGet.on(Laya.Event.CLICK, btnGet, () => {
                    that.prizeList.pop(); //移除最后一个
                    _callback && _callback(that.lastStage);
                    if (that.prizeList.length > 0) {
                        that.showPrizeUI(that.prizeList, _callback);
                    }
                    else {
                        DisplayUtils.removeAllChildren(this.hbox);
                        that.removeSelf();
                    }
                });
            }
            let btnShare = imgBg.getChildByName("btnShare");
            if (btnShare) {
                btnShare.offAll(Laya.Event.CLICK);
                btnShare.on(Laya.Event.CLICK, btnShare, () => {
                    if (GlobalConfig.DEBUG) {
                        that.prizeList.pop(); //移除最后一个
                        _callback && _callback(that.lastStage);
                        if (that.prizeList.length > 0) {
                            that.showPrizeUI(that.prizeList, _callback);
                        }
                        else {
                            DisplayUtils.removeAllChildren(this.hbox);
                            that.removeSelf();
                        }
                    }
                    else {
                        userData.toShareAd(() => {
                            // that.prizeList.pop();//移除最后一个
                            // _callback && _callback(that.lastStage);
                            // if (that.prizeList.length > 0) {
                            //     that.showPrizeUI(that.prizeList, _callback);
                            // } else {
                            //     DisplayUtils.removeAllChildren(this.hbox);
                            //     that.removeSelf();
                            // }
                            DisplayUtils.removeAllChildren(this.hbox);
                            that.removeSelf();
                            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.38"));
                        }, 15);
                    }
                });
            }
            let imgItemBg = imgBg.getChildByName("imgItemBg");
            if (imgItemBg) {
                imgItemBg.removeChildren();
                //可奖励关卡
                let prizeCount = _prizeList.length;
                for (var index = 0; index < prizeCount; index++) {
                    let stageValue = _prizeList[index];
                    let itemPos = { x: imgItemBg.width / 2 + (index - (prizeCount - 1) / 2) * 120, y: -70 };
                    let imgItemKey = "imgStage" + index;
                    let imgItem = imgItemBg.getChildByName(imgItemKey);
                    if (imgItem == null) {
                        imgItem = new Laya.Button("images/component/tab_02.png");
                        imgItem.stateNum = 2;
                        imgItemBg.addChild(imgItem);
                        imgItem.name = imgItemKey;
                        imgItem.pos(itemPos.x, itemPos.y);
                        imgItem.anchorX = 0.5;
                        imgItem.anchorY = 0.5;
                        imgItem.selected = true;
                        imgItem.mouseEnabled = false;
                        //关数
                        let txtStage = imgItem.addChild(new Laya.Label("images/component/frame_9calce_03.png"));
                        txtStage.text = '' + stageValue;
                        txtStage.bold = true;
                        txtStage.font = "SimHei";
                        txtStage.fontSize = 36;
                        txtStage.color = "#ffffff";
                        txtStage.stroke = 3;
                        txtStage.strokeColor = "#857536";
                        txtStage.pos(imgItem.width / 2, imgItem.height / 2.8);
                        txtStage.anchorX = 0.5;
                        txtStage.anchorY = 0.5;
                        //红点
                        if (index < prizeCount - 1) {
                            imgItem.selected = false;
                            txtStage.strokeColor = "#9d621c";
                        }
                    }
                    that.lastStage = stageValue;
                }
                //当前奖励物品
                let stagePrizeCfg = GlobleData.getData(GlobleData.BarrierRewardVO, that.lastStage);
                if (stagePrizeCfg == null)
                    return;
                this.hbox.removeChildren();
                let bossM = MathUtils.parseStringNum(stagePrizeCfg.bossM);
                let gold = BattleManager.Instance.getBarrierRewardToGold(that.lastStage, MathUtils.parseStringNum(stagePrizeCfg.gold));
                let gem = MathUtils.parseStringNum(stagePrizeCfg.gem);
                let itemArray = [
                    { img: "images/ClearanceReward/result_prize_item2.png", value: gold },
                    { img: "images/ClearanceReward/result_prize_item3.png", value: gem },
                    { img: "images/ClearanceReward/result_prize_item4.png", value: bossM }
                ];
                for (var index = 0, len = itemArray.length; index < len; index++) {
                    let cfgData = itemArray[index];
                    let rewardItem = ObjectPool.pop(RewardItem, "RewardItem");
                    rewardItem.create(cfgData.img, cfgData.value);
                    this.hbox.addChild(rewardItem);
                }
            }
        }
    }
}
//# sourceMappingURL=ResultView.js.map