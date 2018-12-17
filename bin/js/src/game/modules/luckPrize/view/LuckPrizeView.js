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
* TER0903-幸运抽奖;
*/
var LuckPrizeView = /** @class */ (function (_super) {
    __extends(LuckPrizeView, _super);
    function LuckPrizeView() {
        var _this = _super.call(this) || this;
        _this.costDiamond = 120;
        _this.freeTimes = 0; //免费次数
        _this.freeTime = 0; //免费时间
        _this.nextFreeTime = 0; //离下次免费时间
        _this.isTryAgain = false; //再来一次
        _this.isFreeDrawing = false; //是否正在免费抽奖
        _this.prizeItemTable = [
            { id: 1, name: "腾讯季卡", num: 1, imgUrl: "images/luckLottery/luck_prize_4.png" },
            { id: 2, name: "大量钻石", num: 300, imgUrl: "images/luckLottery/luck_prize_6.png" },
            { id: 3, name: "双倍加速", num: 1, imgUrl: "images/luckLottery/luck_prize_2.png" },
            { id: 4, name: "宝箱", num: 1, imgUrl: "images/luckLottery/luck_prize_3.png" },
            { id: 5, name: "再来一次", num: 1, imgUrl: "images/luckLottery/luck_prize_0.png" },
            { id: 6, name: "精华碎片", num: 1, imgUrl: "images/luckLottery/luck_prize_5.png" },
            { id: 7, name: "大量金币", num: 1, imgUrl: "images/core/coin_stack_01.png" },
            { id: 8, name: "游戏T恤", num: 1, imgUrl: "images/luckLottery/luck_prize_7.png" }
        ]; //奖励物品列表
        var that = _this;
        that.frameOnce(1, that, function () {
            that.init();
        });
        return _this;
    }
    //新建并添加到节点
    LuckPrizeView.Create = function (_parentNode, _callback) {
        if (_callback === void 0) { _callback = null; }
        var resList = [
            { url: "res/atlas/images/luckLottery.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            var viewTag = "LuckPrizeView";
            if (_parentNode) {
                var nodeViewOld = _parentNode.getChildByName(viewTag);
                if (nodeViewOld) {
                    nodeViewOld.visible = true;
                    nodeViewOld.initPrizeInfo();
                    return;
                }
            }
            else {
                var nodeView = new LuckPrizeView();
                nodeView.name = viewTag;
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().frameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, _callback);
            }
        }));
    };
    //初始化
    LuckPrizeView.prototype.init = function () {
        var that = this;
        //按钮事件
        that.btnExit.on(Laya.Event.CLICK, that, that.onClickExit);
        that.btnStart.on(Laya.Event.CLICK, that, that.onStart);
        that.initPrizeInfo(function (_res) {
            if (that.txtTip1) {
                that.txtTip1.visible = true;
                that.txtTip1.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.23", that.costDiamond);
            }
            //消耗钻石
            var refreshDiamondText = function () {
                if (that.txtDiamond) {
                    if (that.freeTime > 0 || that.isTryAgain) {
                        that.txtDiamond.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.24");
                    }
                    else {
                        that.txtDiamond.changeText('' + that.costDiamond);
                    }
                }
            };
            refreshDiamondText();
            if (that.txtTip2) {
                that.txtTip2.visible = true;
                var loopFun = function () {
                    if (that.freeTime > 0) {
                        that.txtTip2.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.25", TimeUtil.timeFormatStr(that.freeTime, true));
                        that.txtTip2.color = "#66CD00";
                        that.freeTime--;
                    }
                    else if (that.nextFreeTime > 0) {
                        that.txtTip2.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.26", TimeUtil.timeFormatStr(that.nextFreeTime, true));
                        that.txtTip2.color = "#EE6363";
                        that.nextFreeTime--;
                        that.freeTimes = 0; //免费次数清零
                    }
                    else {
                        if (that.txtTip2.visible) {
                            that.initPrizeInfo();
                        }
                        that.txtTip2.visible = false;
                    }
                    //消耗钻石
                    refreshDiamondText();
                };
                loopFun();
                that.timerLoop(1000, that, loopFun);
            }
        });
        //移除红点
        if (userData) {
            userData.removeLuckPrizeRedPoint();
        }
        that.showMyDiamond(PlayerManager.Instance.Info.userDiamond);
        EventsManager.Instance.on(EventsType.DIAMOND_CHANGE, that, function (_data) {
            if (_data && _data.diamond) {
                that.showMyDiamond(_data.diamond);
            }
            else {
                that.showMyDiamond(userData.diamond);
            }
        });
    };
    LuckPrizeView.prototype.initPrizeInfo = function (_showCallback) {
        if (_showCallback === void 0) { _showCallback = null; }
        var that = this;
        that.requestPrizeInfo(function (_res) {
            if (!_res)
                return;
            if (that.isFreeDrawing == false) {
                that.freeTimes = MathUtils.parseInt(_res.free_num);
                that.freeTime = MathUtils.parseInt(_res.remain_time);
                that.nextFreeTime = MathUtils.parseInt(_res.next_free);
            }
            that.costDiamond = MathUtils.parseInt(_res.roulette_price);
            //免费次数已用完
            if (that.freeTimes < 1) {
                that.freeTime = 0;
            }
            _showCallback && _showCallback(_res);
        });
    };
    LuckPrizeView.prototype.onClickExit = function () {
        this.removeSelf();
    };
    //开始抽奖
    LuckPrizeView.prototype.onStart = function () {
        var that = this;
        that.startBtnEnabled(true);
        if (that.isTryAgain) {
            that.isTryAgain = false;
            //再来一次
            that.requestDrawPrize(2, function (_res) {
                if (!_res || _res.id == null) {
                    console.log("无法正常抽奖again");
                    that.startBtnEnabled(false);
                    return;
                }
                var itemId = _res.id;
                var rotation = (8 - itemId) * 360 / 8 + 360 / 16;
                that.onRotation(360 * 7 + rotation, itemId);
            });
        }
        else if (that.freeTimes > 0) {
            //免费抽奖
            that.requestDrawPrize(0, function (_res) {
                if (!_res || _res.id == null) {
                    console.log("无法正常抽奖free");
                    that.startBtnEnabled(false);
                    return;
                }
                that.isFreeDrawing = true;
                var itemId = _res.id;
                var rotation = (8 - itemId) * 360 / 8 + 360 / 16;
                that.onRotation(360 * 7 + rotation, itemId);
                that.freeTimes--;
                that.freeTime = 0;
                //移除红点
                if (userData) {
                    userData.removeLuckPrizeRedPoint();
                }
            });
        }
        else if (userData.diamond >= that.costDiamond) {
            //钻石抽奖
            that.requestDrawPrize(1, function (_res) {
                if (!_res || _res.id == null) {
                    console.log("无法正常抽奖diamond");
                    that.startBtnEnabled(false);
                    return;
                }
                var itemId = _res.id;
                var rotation = (8 - itemId) * 360 / 8 + 360 / 16;
                that.onRotation(360 * 7 + rotation, itemId);
                that.freeTimes--;
                that.freeTime = 0;
                //刷新钻石数量
                HttpManager.Instance.requestDiamondData();
            });
        }
        else {
            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.04"));
            that.startBtnEnabled(false);
        }
    };
    LuckPrizeView.prototype.startBtnEnabled = function (_isEnabled) {
        if (_isEnabled === void 0) { _isEnabled = true; }
        var that = this;
        if (that.btnStart) {
            that.btnStart.disabled = _isEnabled;
        }
    };
    //转盘
    LuckPrizeView.prototype.onRotation = function (_rotation, _itemId) {
        var that = this;
        if (that.imgBg) {
            var fAdd_1 = 0.2;
            that.imgBg.rotation = that.imgBg.rotation % 360;
            if (that.imgBg.rotation > _rotation) {
                fAdd_1 = -fAdd_1;
            }
            var fAddLength_1 = 0;
            var fTotalLength_1 = Math.abs(_rotation - that.imgBg.rotation);
            var animFun_1 = function () {
                if (fAdd_1 > 0) {
                    if (that.imgBg.rotation < _rotation) {
                        var progress = fAddLength_1 / fTotalLength_1;
                        //加速
                        if (progress < 0.2) {
                            fAdd_1 += 0.2;
                        }
                        else if (progress > 0.6) {
                            fAdd_1 -= 0.1;
                        }
                        if (fAdd_1 < 0.2) {
                            fAdd_1 = 0.2;
                        }
                        fAddLength_1 += fAdd_1;
                        that.imgBg.rotation += fAdd_1;
                    }
                    else {
                        that.imgBg.rotation = _rotation;
                        that.imgBg.clearTimer(that, animFun_1);
                        //显示奖励物品
                        that.showPrizeItem(_itemId);
                    }
                }
                else if (fAdd_1 < 0) {
                    if (that.imgBg.rotation > _rotation) {
                        that.imgBg.rotation += fAdd_1;
                    }
                    else {
                        that.imgBg.rotation = _rotation;
                        that.imgBg.clearTimer(that, animFun_1);
                        that.startBtnEnabled(true);
                    }
                }
            };
            that.imgBg.timerLoop(10, that, animFun_1);
        }
    };
    //抽奖物品
    LuckPrizeView.prototype.showPrizeItem = function (_itemId) {
        if (_itemId === void 0) { _itemId = null; }
        var that = this;
        that.isFreeDrawing = false;
        var itemDialog = new ui.luckPrize.LuckPrizeItemViewUI();
        AlignUtils.setToScreenGoldenPos(itemDialog);
        M.layer.subFrameLayer.addChildWithMaskCall(itemDialog, itemDialog.removeSelf);
        var bgView = itemDialog.getChildByName("bgView");
        if (bgView) {
            var tween_1 = EffectUtils.objectRotate(itemDialog.imgLight);
            var btnExit = bgView.getChildByName("btnExit");
            if (btnExit) {
                btnExit.on(Laya.Event.CLICK, btnExit, function () {
                    Laya.Tween.clear(tween_1);
                    itemDialog.removeSelf();
                });
            }
            var itemData = that.prizeItemTable[_itemId - 1];
            if (itemData) {
                var imgItemBg = bgView.getChildByName("imgItemBg");
                var imgItem = bgView.getChildByName("imgItem");
                if (imgItem && itemData.imgUrl) {
                    imgItem.visible = true;
                    imgItem.skin = itemData.imgUrl;
                }
                if (_itemId == 1 || _itemId == 8) { //T恤/腾讯卡
                    var txtItemName = bgView.getChildByName("txtItemName");
                    if (txtItemName) {
                        txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", itemData.name, itemData.num);
                    }
                    that.requestPrizeCensus(_itemId, 1);
                }
                else if (_itemId == 2) { //钻石
                    var txtItemName = bgView.getChildByName("txtItemName");
                    if (txtItemName) {
                        txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", itemData.name, itemData.num);
                    }
                    //刷新钻石数量
                    HttpManager.Instance.requestDiamondData();
                    that.requestPrizeCensus(_itemId, 1);
                }
                else if (_itemId == 3) { //加速
                    var txtItemName = bgView.getChildByName("txtItemName");
                    if (txtItemName) {
                        txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", itemData.name, 1);
                    }
                    if (EventsManager.Instance) {
                        EventsManager.Instance.event(EventsType.LUCK_PRIZE, { id: _itemId, num: 90 });
                    }
                    that.requestPrizeCensus(_itemId, 1);
                }
                else if (_itemId == 4) { //先知球
                    var txtItemName = bgView.getChildByName("txtItemName");
                    if (txtItemName) {
                        txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.22", itemData.name);
                    }
                    var skinPath = "";
                    var monsterType = 1;
                    var diamondPokemonId = 0; //钻石档英雄
                    var diamondPokemonCfg = BattleManager.Instance.getPreMonster(monsterType * 100 + userData.getCarLevel(), 1); // getPreMonsterConfig(monsterType * 100 + userData.getCarLevel(), 1);
                    if (diamondPokemonCfg) {
                        diamondPokemonId = diamondPokemonCfg.id;
                        skinPath = "images/carImg/" + diamondPokemonCfg.imgUrl;
                    }
                    var imgItem_1 = bgView.getChildByName("imgItem");
                    if (imgItem_1 && skinPath.length > 0) {
                        imgItem_1.skin = skinPath;
                        imgItem_1.scale(2, 2);
                        imgItem_1.anchorY = 0.65;
                        imgItem_1.anchorX = 0.51;
                    }
                    if (EventsManager.Instance) {
                        EventsManager.Instance.event(EventsType.LUCK_PRIZE, { id: _itemId, carId: diamondPokemonId });
                    }
                    that.requestPrizeCensus(_itemId, diamondPokemonId);
                }
                else if (_itemId == 6) { //精华碎片
                    var txtItemName = bgView.getChildByName("txtItemName");
                    if (txtItemName) {
                        txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", itemData.name, itemData.num);
                    }
                    HttpManager.Instance.requestEssenceData();
                    that.requestPrizeCensus(_itemId, 1);
                }
                else if (_itemId == 7) { //金币
                    var money = 0;
                    var monsterType = userData.isEvolution() ? 2 : 1;
                    var monsterLevel = userData.getCarLevel();
                    var monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, monsterLevel);
                    if (monsterInfo) {
                        var curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
                        if (_itemId == 7) {
                            money = curPrice * 0.8;
                        }
                        else {
                            money = curPrice * 0.2;
                        }
                    }
                    else {
                        console.log("精灵不存在");
                    }
                    var txtItemName = bgView.getChildByName("txtItemName");
                    if (txtItemName) {
                        LayerManager.getInstance().screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
                        txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", itemData.name, MathUtils.bytesToSize(money));
                    }
                    if (EventsManager.Instance) {
                        EventsManager.Instance.event(EventsType.LUCK_PRIZE, { id: _itemId, num: money });
                    }
                    that.requestPrizeCensus(_itemId, money);
                }
                else {
                    var txtItemName = bgView.getChildByName("txtItemName");
                    if (txtItemName) {
                        txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.21", itemData.name);
                    }
                    that.isTryAgain = true;
                    that.requestPrizeCensus(_itemId, 1);
                }
            }
        }
        that.startBtnEnabled(false);
    };
    LuckPrizeView.prototype.showMyDiamond = function (value) {
        var self = this;
        self.txt_diamond.text = value + "";
    };
    //获取抽奖信息
    LuckPrizeView.prototype.requestPrizeInfo = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/get/roulette',
            success: function (res) {
                console.log("requestPrizeInfo", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //转盘抽奖
    LuckPrizeView.prototype.requestDrawPrize = function (_itemId, _callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/roulette/' + _itemId,
            success: function (res) {
                console.log("requestDrawPrize", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
                _callback && _callback(false);
            }
        });
    };
    //统计
    LuckPrizeView.prototype.requestPrizeCensus = function (_itemId, _num) {
        var dataString = 'prizeId=' + _itemId + '&prizeNum=' + _num;
        console.log("requestPrizeCensus:", dataString);
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/roulette/log',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestPrizeCensus:", res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    return LuckPrizeView;
}(ui.luckPrize.LuckPrizeViewUI));
//# sourceMappingURL=LuckPrizeView.js.map