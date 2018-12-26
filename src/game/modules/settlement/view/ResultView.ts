/*
* terry 2018/11/07;
*/
class ResultView extends ui.settlement.ResultViewUI {
    private prizeList: Array<number> = null;
    private curStage: number = 0;
    private lastStage: number = 0;

    public removeCallback: any;

    constructor(_stage: number = -1) {
        super();
        this.init(_stage);
    }

    //新建并添加到节点
    static Create(_callback: any = null, _removeCallback: any = null, _stage: number = -1): void {
        let resList = [
            { url: "res/atlas/images/ClearanceReward.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            let nodeView = new ResultView(_stage);
            nodeView.removeCallback = _removeCallback;
            M.layer.frameLayer.addChildWithMaskCall(nodeView, () => {
                nodeView.removeSelf();
            });
            _callback && _callback(nodeView);
        }));
    }

    //初始化
    private init(_stage: number): void {
        let that = this;
        that.curStage = _stage;
    }

    public removeSelf(): laya.display.Node {
        this.removeCallback && this.removeCallback();
        return super.removeSelf() as laya.display.Node;
    }

    //显示成功奖励界面
    public showPrizeUI(_prizeList: Array<number>, _callback: any = null): void {
        let that = this;
        that.prizeList = _prizeList;
        let imgBg = that.mainView.getChildByName("imgBg") as Laya.Image;
        if (imgBg) {
            imgBg.visible = true;
            let btnExit = imgBg.getChildByName("btnExit") as Laya.Button;
            if (btnExit) {
                btnExit.offAll(Laya.Event.CLICK);
                btnExit.on(Laya.Event.CLICK, btnExit, () => {
                    DisplayUtils.removeAllChildren(this.hbox);
                    that.removeSelf();
                });
            }
            let btnShare = imgBg.getChildByName("btnShare") as Laya.Button;
            if (btnShare) {
                btnShare.offAll(Laya.Event.CLICK);
                btnShare.on(Laya.Event.CLICK, btnShare, () => {
                    if (GlobalConfig.DEBUG) {
                        that.prizeList.pop();//移除最后一个
                        _callback && _callback(that.lastStage);
                        if (that.prizeList.length > 0) {
                            that.showPrizeUI(that.prizeList, _callback);
                        } else {
                            DisplayUtils.removeAllChildren(this.hbox);
                            that.removeSelf();
                        }
                    } else {
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
                        }, 15);
                    }
                });
            }

            let imgItemBg = imgBg.getChildByName("imgItemBg") as Laya.Image;
            if (imgItemBg) {
                this.hbox.removeChildren();
                imgItemBg.removeChildren();
                //可奖励关卡
                let prizeCount: number = _prizeList.length;
                for (var index = 0; index < prizeCount; index++) {
                    let stageValue: number = _prizeList[index];
                    let itemPos = { x: imgItemBg.width / 2 + (index - (prizeCount - 1) / 2) * 120, y: -70 };
                    let imgItemKey: string = "imgStage" + index;
                    let imgItem: Laya.Button = imgItemBg.getChildByName(imgItemKey) as Laya.Button;
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
                        let txtStage = imgItem.addChild(new Laya.Label("images/component/frame_9calce_03.png")) as Laya.Label;
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
                let stagePrizeCfg: any = GlobleData.getData(GlobleData.BarrierRewardVO, that.lastStage);
                if (stagePrizeCfg == null) return;
                let bossM: number = MathUtils.parseStringNum(stagePrizeCfg.bossM);
                let gold: number = BattleManager.Instance.getBarrierRewardToGold(that.lastStage, MathUtils.parseStringNum(stagePrizeCfg.gold));
                let gem: number = MathUtils.parseStringNum(stagePrizeCfg.gem);
                let itemArray = [
                    { img: "images/ClearanceReward/result_prize_item2.png", value: gold },
                    { img: "images/ClearanceReward/result_prize_item3.png", value: gem },
                    { img: "images/ClearanceReward/result_prize_item4.png", value: bossM }
                ];
                for (var index = 0, len: number = itemArray.length; index < len; index++) {
                    let cfgData = itemArray[index];
                    let rewardItem: RewardItem = ObjectPool.pop(RewardItem, "RewardItem");
                    rewardItem.create(cfgData.img, cfgData.value);
                    this.hbox.addChild(rewardItem);
                }
            }
        }
    }
}