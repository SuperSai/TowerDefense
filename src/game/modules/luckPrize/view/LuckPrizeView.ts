/*
* TER0903-幸运抽奖;
*/
class LuckPrizeView extends ui.luckPrize.LuckPrizeViewUI {

    private costDiamond: number = 120;
    private freeTimes: number = 0; //免费次数
    private freeTime: number = 0; //免费时间
    private nextFreeTime: number = 0; //离下次免费时间
    private isTryAgain: boolean = false; //再来一次

    private isFreeDrawing: boolean = false; //是否正在免费抽奖
    private prizeItemTable: Array<any> = [
        { id: 1, name: "腾讯季卡", num: 1, imgUrl: "images/luckLottery/luck_prize_4.png" },
        { id: 2, name: "大量钻石", num: 300, imgUrl: "images/luckLottery/luck_prize_6.png" },
        { id: 3, name: "双倍加速", num: 1, imgUrl: "images/luckLottery/luck_prize_2.png" },
        { id: 4, name: "宝箱", num: 1, imgUrl: "images/luckLottery/luck_prize_3.png" },
        { id: 5, name: "再来一次", num: 1, imgUrl: "images/luckLottery/luck_prize_0.png" },
        { id: 6, name: "精华碎片", num: 1, imgUrl: "images/luckLottery/luck_prize_5.png" },
        { id: 7, name: "大量金币", num: 1, imgUrl: "images/core/coin_stack_01.png" },
        { id: 8, name: "游戏T恤", num: 1, imgUrl: "images/luckLottery/luck_prize_7.png" }
    ]; //奖励物品列表

    constructor() {
        super();
        var that = this;
        that.frameOnce(1, that, () => {
            that.init();
        })
    }
    //新建并添加到节点
    static Create(_parentNode: Laya.Node, _callback: any = null): void {
        let resList = [
            { url: "res/atlas/images/luckLottery.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            let viewTag = "LuckPrizeView";
            if (_parentNode) {
                let nodeViewOld = _parentNode.getChildByName(viewTag) as LuckPrizeView;
                if (nodeViewOld) {
                    nodeViewOld.visible = true;
                    nodeViewOld.initPrizeInfo();
                    return
                }
            } else {
                let nodeView = new LuckPrizeView();
                nodeView.name = viewTag;
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().frameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, _callback);
            }
        }));
    }

    //初始化
    private init(): void {
        var that = this;
        //按钮事件
        that.btnExit.on(Laya.Event.CLICK, that, that.onClickExit);
        that.btnStart.on(Laya.Event.CLICK, that, that.onStart);
        that.initPrizeInfo((_res: any) => {
            if (that.txtTip1) {
                that.txtTip1.visible = true;
                that.txtTip1.changeText("单次抽奖将消耗钻石x" + that.costDiamond);
            }
            //消耗钻石
            let refreshDiamondText = () => {
                if (that.txtDiamond) {
                    if (that.freeTime > 0 || that.isTryAgain) {
                        that.txtDiamond.changeText("免费");
                    } else {
                        that.txtDiamond.changeText('' + that.costDiamond);
                    }
                }
            }
            refreshDiamondText();
            if (that.txtTip2) {
                that.txtTip2.visible = true;
                let loopFun = () => {
                    if (that.freeTime > 0) {
                        that.txtTip2.changeText("免费抽奖剩余时间: " + TimeUtil.timeFormatStr(that.freeTime, true));
                        that.txtTip2.color = "#66CD00";
                        that.freeTime--;
                    } else if (that.nextFreeTime > 0) {
                        that.txtTip2.changeText("下一次免费抽奖倒计时: " + TimeUtil.timeFormatStr(that.nextFreeTime, true));
                        that.txtTip2.color = "#EE6363";
                        that.nextFreeTime--;
                        that.freeTimes = 0; //免费次数清零
                    } else {
                        if (that.txtTip2.visible) {
                            that.initPrizeInfo();
                        }
                        that.txtTip2.visible = false;
                    }
                    //消耗钻石
                    refreshDiamondText();
                }
                loopFun();
                that.timerLoop(1000, that, loopFun);
            }
        });
        //移除红点
        if (userData) {
            userData.removeLuckPrizeRedPoint();
        }
        that.showMyDiamond(PlayerManager.Instance.Info.userDiamond);
        EventsManager.Instance.on(EventsType.DIAMOND_CHANGE, that, (_data: any) => {
            if (_data && _data.diamond) {
                that.showMyDiamond(_data.diamond);
            } else {
                that.showMyDiamond(userData.diamond);
            }
        });
    }
    public initPrizeInfo(_showCallback: any = null): void {
        let that = this;
        that.requestPrizeInfo((_res: any) => {
            if (!_res) return;
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
    }

    private onClickExit(): void {
        this.removeSelf();
    }

    //开始抽奖
    private onStart(): void {
        let that = this;
        that.startBtnEnabled(true);
        if (that.isTryAgain) {
            that.isTryAgain = false;
            //再来一次
            that.requestDrawPrize(2, (_res: any) => {
                if (!_res || _res.id == null) {
                    console.log("无法正常抽奖again");
                    that.startBtnEnabled(false);
                    return;
                }
                let itemId: number = _res.id;
                let rotation: number = (8 - itemId) * 360 / 8 + 360 / 16;
                that.onRotation(360 * 7 + rotation, itemId);
            });
        } else if (that.freeTimes > 0) {
            //免费抽奖
            that.requestDrawPrize(0, (_res: any) => {
                if (!_res || _res.id == null) {
                    console.log("无法正常抽奖free");
                    that.startBtnEnabled(false);
                    return;
                }
                that.isFreeDrawing = true;
                let itemId: number = _res.id;
                let rotation: number = (8 - itemId) * 360 / 8 + 360 / 16;
                that.onRotation(360 * 7 + rotation, itemId);
                that.freeTimes--;
                that.freeTime = 0;

                //移除红点
                if (userData) {
                    userData.removeLuckPrizeRedPoint();
                }
            });
        } else if (userData.diamond >= that.costDiamond) {
            //钻石抽奖
            that.requestDrawPrize(1, (_res: any) => {
                if (!_res || _res.id == null) {
                    console.log("无法正常抽奖diamond");
                    that.startBtnEnabled(false);
                    return;
                }
                let itemId: number = _res.id;
                let rotation: number = (8 - itemId) * 360 / 8 + 360 / 16;
                that.onRotation(360 * 7 + rotation, itemId);
                that.freeTimes--;
                that.freeTime = 0;
                //刷新钻石数量
                HttpManager.Instance.requestDiamondData();
            });
        } else {
            CommonFun.showTip("钻石不足，做任务领钻石");
            that.startBtnEnabled(false);
        }
    }
    private startBtnEnabled(_isEnabled: boolean = true): void {
        let that = this;
        if (that.btnStart) {
            that.btnStart.disabled = _isEnabled;
        }
    }

    //转盘
    private onRotation(_rotation: number, _itemId: number): void {
        let that = this;
        if (that.imgBg) {
            let fAdd: number = 0.2;
            that.imgBg.rotation = that.imgBg.rotation % 360;
            if (that.imgBg.rotation > _rotation) {
                fAdd = -fAdd;
            }
            let fAddLength: number = 0;
            let fTotalLength: number = Math.abs(_rotation - that.imgBg.rotation);
            let animFun = () => {
                if (fAdd > 0) {
                    if (that.imgBg.rotation < _rotation) {
                        let progress = fAddLength / fTotalLength;
                        //加速
                        if (progress < 0.2) {
                            fAdd += 0.2;
                        } else if (progress > 0.6) {
                            fAdd -= 0.1;
                        }
                        if (fAdd < 0.2) {
                            fAdd = 0.2;
                        }
                        fAddLength += fAdd;
                        that.imgBg.rotation += fAdd;
                    } else {
                        that.imgBg.rotation = _rotation;
                        that.imgBg.clearTimer(that, animFun);
                        //显示奖励物品
                        that.showPrizeItem(_itemId);
                    }
                } else if (fAdd < 0) {
                    if (that.imgBg.rotation > _rotation) {
                        that.imgBg.rotation += fAdd;
                    } else {
                        that.imgBg.rotation = _rotation;
                        that.imgBg.clearTimer(that, animFun);
                        that.startBtnEnabled(true);
                    }
                }
            }
            that.imgBg.timerLoop(10, that, animFun);
        }
    }

    //抽奖物品
    private showPrizeItem(_itemId: any = null): void {
        let that = this;
        that.isFreeDrawing = false;
        let itemDialog = new ui.luckPrize.LuckPrizeItemViewUI();
        itemDialog.popup();
        let bgView = itemDialog.getChildByName("bgView") as Laya.Image;
        if (bgView) {
            let tween = EffectUtils.objectRotate(itemDialog.imgLight);
            let btnExit = bgView.getChildByName("btnExit") as Laya.Button;
            if (btnExit) {
                btnExit.on(Laya.Event.CLICK, btnExit, () => {
                    Laya.Tween.clear(tween);
                    itemDialog.close("btnExit", false);
                });
            }
            let itemData = that.prizeItemTable[_itemId - 1];
            if (itemData) {
                let imgItemBg = bgView.getChildByName("imgItemBg") as Laya.Image;
                let imgItem = bgView.getChildByName("imgItem") as Laya.Image;
                if (imgItem && itemData.imgUrl) {
                    imgItem.visible = true;
                    imgItem.skin = itemData.imgUrl;
                }
                if (_itemId == 1 || _itemId == 8) {//T恤/腾讯卡
                    let txtItemName = bgView.getChildByName("txtItemName") as Laya.Label;
                    if (txtItemName) {
                        txtItemName.changeText("获得:" + itemData.name + "x" + itemData.num);
                    }
                    that.requestPrizeCensus(_itemId, 1);
                } else if (_itemId == 2) {//钻石
                    let txtItemName = bgView.getChildByName("txtItemName") as Laya.Label;
                    if (txtItemName) {
                        txtItemName.changeText("获得:" + itemData.name + "x" + itemData.num);
                    }
                    //刷新钻石数量
                    HttpManager.Instance.requestDiamondData();
                    that.requestPrizeCensus(_itemId, 1);
                } else if (_itemId == 3) {//加速
                    let txtItemName = bgView.getChildByName("txtItemName") as Laya.Label;
                    if (txtItemName) {
                        txtItemName.changeText("获得:" + itemData.name + "x1");
                    }
                    if (EventsManager.Instance) {
                        EventsManager.Instance.event(EventsType.LUCK_PRIZE, { id: _itemId, num: 90 });
                    }
                    that.requestPrizeCensus(_itemId, 1);
                } else if (_itemId == 4) {//先知球
                    let txtItemName = bgView.getChildByName("txtItemName") as Laya.Label;
                    if (txtItemName) {
                        txtItemName.changeText("获得:" + itemData.name);
                    }
                    let skinPath = "";
                    let monsterType: number = 1;
                    let diamondPokemonId: number = 0;//钻石档英雄
                    let diamondPokemonCfg = BattleManager.Instance.getPreMonster(monsterType * 100 + userData.getCarLevel(), 1);// getPreMonsterConfig(monsterType * 100 + userData.getCarLevel(), 1);
                    if (diamondPokemonCfg) {
                        diamondPokemonId = diamondPokemonCfg.id;
                        skinPath = "images/carImg/" + diamondPokemonCfg.imgUrl;
                    }
                    let imgItem = bgView.getChildByName("imgItem") as Laya.Image;
                    if (imgItem && skinPath.length > 0) {
                        imgItem.skin = skinPath;
                        imgItem.scale(2, 2);
                        imgItem.anchorY = 0.65;
                        imgItem.anchorX = 0.51;
                    }
                    if (EventsManager.Instance) {
                        EventsManager.Instance.event(EventsType.LUCK_PRIZE, { id: _itemId, carId: diamondPokemonId });
                    }
                    that.requestPrizeCensus(_itemId, diamondPokemonId);
                } else if (_itemId == 6) {//精华碎片
                    let txtItemName = bgView.getChildByName("txtItemName") as Laya.Label;
                    if (txtItemName) {
                        txtItemName.changeText("获得:" + itemData.name + "x" + itemData.num);
                    }
                    HttpManager.Instance.requestEssenceData();
                    that.requestPrizeCensus(_itemId, 1);
                } else if (_itemId == 7) {//金币
                    let money: number = 0;
                    let monsterType: number = userData.isEvolution() ? 2 : 1;
                    let monsterLevel: number = userData.getCarLevel();
                    let monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, monsterLevel);
                    if (monsterInfo) {
                        let curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
                        if (_itemId == 7) {
                            money = curPrice * 0.8;
                        } else {
                            money = curPrice * 0.2;
                        }
                    } else {
                        console.log("精灵不存在");
                    }
                    let txtItemName = bgView.getChildByName("txtItemName") as Laya.Label;
                    if (txtItemName) {
                        LayerManager.getInstance().screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
                        txtItemName.changeText("获得:" + itemData.name + "x" + MathUtils.bytesToSize(money));
                    }
                    if (EventsManager.Instance) {
                        EventsManager.Instance.event(EventsType.LUCK_PRIZE, { id: _itemId, num: money });
                    }
                    that.requestPrizeCensus(_itemId, money);
                } else {
                    let txtItemName = bgView.getChildByName("txtItemName") as Laya.Label;
                    if (txtItemName) {
                        txtItemName.changeText(itemData.name + "(免费)");
                    }
                    that.isTryAgain = true;
                    that.requestPrizeCensus(_itemId, 1);
                }
            }
        }
        that.startBtnEnabled(false);
    }

    private showMyDiamond(value: number): void {
        let self = this;
        self.txt_diamond.text = value + "";
    }

    //获取抽奖信息
    public requestPrizeInfo(_callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    //转盘抽奖
    public requestDrawPrize(_itemId: number, _callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
    //统计
    public requestPrizeCensus(_itemId: number, _num: number): void {
        let dataString = 'prizeId=' + _itemId + '&prizeNum=' + _num;
        console.log("requestPrizeCensus:", dataString);
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    }
}
