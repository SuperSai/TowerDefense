var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* terry 2018/11/07;
*/
var ResultView = /** @class */ (function (_super) {
    __extends(ResultView, _super);
    function ResultView(_stage) {
        if (_stage === void 0) { _stage = -1; }
        var _this = _super.call(this) || this;
        _this.prizeList = null;
        _this.curStage = 0;
        _this.lastStage = 0;
        _this.init(_stage);
        return _this;
    }
    //新建并添加到节点
    ResultView.Create = function (_callback, _removeCallback, _stage) {
        if (_callback === void 0) { _callback = null; }
        if (_removeCallback === void 0) { _removeCallback = null; }
        if (_stage === void 0) { _stage = -1; }
        var resList = [
            { url: "res/atlas/images/ClearanceReward.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            var nodeView = new ResultView(_stage);
            nodeView.removeCallback = _removeCallback;
            M.layer.frameLayer.addChildWithMaskCall(nodeView, function () {
                nodeView.removeSelf();
            });
            _callback && _callback(nodeView);
        }));
    };
    //初始化
    ResultView.prototype.init = function (_stage) {
        var that = this;
        that.curStage = _stage;
    };
    ResultView.prototype.removeSelf = function () {
        this.removeCallback && this.removeCallback();
        return _super.prototype.removeSelf.call(this);
    };
    //显示成功奖励界面
    ResultView.prototype.showPrizeUI = function (_prizeList, _callback) {
        var _this = this;
        if (_callback === void 0) { _callback = null; }
        var that = this;
        that.prizeList = _prizeList;
        var imgBg = that.mainView.getChildByName("imgBg");
        if (imgBg) {
            imgBg.visible = true;
            var btnExit = imgBg.getChildByName("btnExit");
            if (btnExit) {
                btnExit.offAll(Laya.Event.CLICK);
                btnExit.on(Laya.Event.CLICK, btnExit, function () {
                    DisplayUtils.removeAllChildren(_this.hbox);
                    that.removeSelf();
                });
            }
            var btnShare = imgBg.getChildByName("btnShare");
            if (btnShare) {
                btnShare.offAll(Laya.Event.CLICK);
                btnShare.on(Laya.Event.CLICK, btnShare, function () {
                    if (GlobalConfig.DEBUG) {
                        that.prizeList.pop(); //移除最后一个
                        _callback && _callback(that.lastStage);
                        if (that.prizeList.length > 0) {
                            that.showPrizeUI(that.prizeList, _callback);
                        }
                        else {
                            DisplayUtils.removeAllChildren(_this.hbox);
                            that.removeSelf();
                        }
                    }
                    else {
                        userData.toShareAd(function () {
                            that.prizeList.pop(); //移除最后一个
                            _callback && _callback(that.lastStage);
                            if (that.prizeList.length > 0) {
                                that.showPrizeUI(that.prizeList, _callback);
                            }
                            else {
                                DisplayUtils.removeAllChildren(_this.hbox);
                                that.removeSelf();
                            }
                        });
                    }
                });
            }
            var imgItemBg = imgBg.getChildByName("imgItemBg");
            if (imgItemBg) {
                this.hbox.removeChildren();
                imgItemBg.removeChildren();
                //可奖励关卡
                var prizeCount = _prizeList.length;
                for (var index = 0; index < prizeCount; index++) {
                    var stageValue = _prizeList[index];
                    var itemPos = { x: imgItemBg.width / 2 + (index - (prizeCount - 1) / 2) * 120, y: -70 };
                    var imgItemKey = "imgStage" + index;
                    var imgItem = imgItemBg.getChildByName(imgItemKey);
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
                        var txtStage = imgItem.addChild(new Laya.Label("images/component/frame_9calce_03.png"));
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
                var stagePrizeCfg = GlobleData.getData(GlobleData.BarrierRewardVO, that.lastStage);
                if (stagePrizeCfg == null)
                    return;
                var bossM = MathUtils.parseStringNum(stagePrizeCfg.bossM);
                var gold = BattleManager.Instance.getBarrierRewardToGold(that.lastStage, MathUtils.parseStringNum(stagePrizeCfg.gold));
                var gem = MathUtils.parseStringNum(stagePrizeCfg.gem);
                var itemArray = [
                    { img: "images/ClearanceReward/result_prize_item2.png", value: gold },
                    { img: "images/ClearanceReward/result_prize_item3.png", value: gem },
                    { img: "images/ClearanceReward/result_prize_item4.png", value: bossM }
                ];
                for (var index = 0, len = itemArray.length; index < len; index++) {
                    var cfgData = itemArray[index];
                    var rewardItem = ObjectPool.pop(RewardItem, "RewardItem");
                    rewardItem.create(cfgData.img, cfgData.value);
                    this.hbox.addChild(rewardItem);
                }
            }
        }
    };
    return ResultView;
}(ui.settlement.ResultViewUI));
//# sourceMappingURL=ResultView.js.map