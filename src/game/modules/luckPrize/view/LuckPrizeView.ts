/*
* TER0903-幸运抽奖;
*/
class LuckPrizeView extends BaseView {

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
        super(LAYER_TYPE.FRAME_LAYER, ui.luckPrize.LuckPrizeViewUI);
        this.setResources(["luckLottery"]);
    }

    //初始化
    public initUI(): void {
        super.initUI();
        var self = this;
        SDKManager.Instance.showBannerAd(true);
        self.initPrizeInfo();
        //移除红点
        if (userData) {
            userData.removeLuckPrizeRedPoint();
        }
        self.showMyDiamond(PlayerManager.Instance.Info.userDiamond);
    }

    public addEvents(): void {
        super.addEvents();
        this.ui.btnExit.on(Laya.Event.CLICK, this, this.onClickExit);
        this.ui.btnStart.on(Laya.Event.CLICK, this, this.onStart);
        EventsManager.Instance.on(EventsType.DIAMOND_CHANGE, this, this.onUpdateDiamond);
        EventsManager.Instance.on(EventsType.UPDATE_LUCK_PRIZE, this, this.initPrizeInfo);
    }

    public removeEvents(): void {
        super.removeEvents();
        this.ui.btnExit.off(Laya.Event.CLICK, this, this.onClickExit);
        this.ui.btnStart.off(Laya.Event.CLICK, this, this.onStart);
        EventsManager.Instance.off(EventsType.DIAMOND_CHANGE, this, this.onUpdateDiamond);
        EventsManager.Instance.off(EventsType.UPDATE_LUCK_PRIZE, this, this.initPrizeInfo);
    }

    private initPrizeInfo(): void {
        HttpManager.Instance.requestPrizeInfo((_res: any) => {
            if (!_res) return;
            if (this.isFreeDrawing == false) {
                this.freeTimes = MathUtils.parseInt(_res.free_num);
                this.freeTime = MathUtils.parseInt(_res.remain_time);
                this.nextFreeTime = MathUtils.parseInt(_res.next_free);
            }
            this.costDiamond = MathUtils.parseInt(_res.roulette_price);
            //免费次数已用完
            if (this.freeTimes < 1) {
                this.freeTime = 0;
            }
            this.refreshDiamondText();
        });
    }

    private onClickExit(): void {
        ViewMgr.Ins.close(ViewConst.LuckPrizeView);
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
        } else if (M.player.Info.userDiamond >= that.costDiamond) {
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
            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.04"));
            that.startBtnEnabled(false);
        }
    }
    private startBtnEnabled(_isEnabled: boolean = true): void {
        let that = this;
        if (that.ui.btnStart) {
            that.ui.btnStart.disabled = _isEnabled;
        }
    }

    //转盘
    private onRotation(_rotation: number, _itemId: number): void {
        let that = this;
        if (that.ui.imgBg) {
            let fAdd: number = 0.2;
            that.ui.imgBg.rotation = that.ui.imgBg.rotation % 360;
            if (that.ui.imgBg.rotation > _rotation) {
                fAdd = -fAdd;
            }
            let fAddLength: number = 0;
            let fTotalLength: number = Math.abs(_rotation - that.ui.imgBg.rotation);
            let animFun = () => {
                if (fAdd > 0) {
                    if (that.ui.imgBg.rotation < _rotation) {
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
                        that.ui.imgBg.rotation += fAdd;
                    } else {
                        that.ui.imgBg.rotation = _rotation;
                        that.ui.imgBg.clearTimer(that, animFun);
                        //显示奖励物品
                        that.showPrizeItem(_itemId);
                    }
                } else if (fAdd < 0) {
                    if (that.ui.imgBg.rotation > _rotation) {
                        that.ui.imgBg.rotation += fAdd;
                    } else {
                        that.ui.imgBg.rotation = _rotation;
                        that.ui.imgBg.clearTimer(that, animFun);
                        that.startBtnEnabled(true);
                    }
                }
            }
            that.ui.imgBg.timerLoop(10, that, animFun);
        }
    }

    //抽奖物品
    private showPrizeItem(_itemId: any = null): void {
        let that = this;
        that.isFreeDrawing = false;
        let itemDialog = new ui.luckPrize.LuckPrizeItemViewUI();
        AlignUtils.setToScreenGoldenPos(itemDialog);
        M.layer.subFrameLayer.addChildWithMaskCall(itemDialog, itemDialog.removeSelf);
        let bgView = itemDialog.getChildByName("bgView") as Laya.Image;
        if (bgView) {
            let tween = EffectUtils.objectRotate(itemDialog.imgLight);
            let btnExit = bgView.getChildByName("btnExit") as Laya.Button;
            if (btnExit) {
                btnExit.on(Laya.Event.CLICK, btnExit, () => {
                    Laya.Tween.clear(tween);
                    itemDialog.removeSelf();
                });
            }
            let itemData = that.prizeItemTable[_itemId - 1];
            if (itemData) {
                let imgItem = bgView.getChildByName("imgItem") as Laya.Image;
                if (imgItem && itemData.imgUrl) {
                    imgItem.visible = true;
                    imgItem.skin = itemData.imgUrl;
                }
                if (_itemId == 1 || _itemId == 8) {//T恤/腾讯卡
                    let txtItemName = bgView.getChildByName("txtItemName") as Laya.Label;
                    if (txtItemName) {
                        txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", itemData.name, itemData.num);
                    }
                    that.requestPrizeCensus(_itemId, 1);
                } else if (_itemId == 2) {//钻石
                    let txtItemName = bgView.getChildByName("txtItemName") as Laya.Label;
                    if (txtItemName) {
                        txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", itemData.name, itemData.num);
                    }
                    //刷新钻石数量
                    HttpManager.Instance.requestDiamondData();
                    that.requestPrizeCensus(_itemId, 1);
                } else if (_itemId == 3) {//加速
                    let txtItemName = bgView.getChildByName("txtItemName") as Laya.Label;
                    if (txtItemName) {
                        txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", itemData.name, 1);
                    }
                    if (EventsManager.Instance) {
                        EventsManager.Instance.event(EventsType.LUCK_PRIZE, { id: _itemId, num: 90 });
                    }
                    that.requestPrizeCensus(_itemId, 1);
                } else if (_itemId == 4) {//先知球
                    let txtItemName = bgView.getChildByName("txtItemName") as Laya.Label;
                    if (txtItemName) {
                        txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.22", itemData.name);
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
                        txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", itemData.name, itemData.num);
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
                        txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", itemData.name, MathUtils.bytesToSize(money));
                    }
                    if (EventsManager.Instance) {
                        EventsManager.Instance.event(EventsType.LUCK_PRIZE, { id: _itemId, num: money });
                    }
                    that.requestPrizeCensus(_itemId, money);
                } else {
                    let txtItemName = bgView.getChildByName("txtItemName") as Laya.Label;
                    if (txtItemName) {
                        txtItemName.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.21", itemData.name);
                    }
                    that.isTryAgain = true;
                    that.requestPrizeCensus(_itemId, 1);
                }
            }
            that.startBtnEnabled(false);
        }
    }

    private onUpdateDiamond(data: any): void {
        if (data && data.diamond) {
            this.showMyDiamond(data.diamond);
        } else {
            this.showMyDiamond(M.player.Info.userDiamond);
        }
    }

    private showMyDiamond(value: number): void {
        let self = this;
        self.ui.txt_diamond.text = value + "";
    }

    private refreshDiamondText(): void {
        let self = this;
        if (self.freeTime > 0 || self.isTryAgain) {
            self.ui.txtDiamond.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.24");
        } else {
            self.ui.txtDiamond.changeText('' + self.costDiamond);
        }
    }

    //转盘抽奖
    public requestDrawPrize(_itemId: number, _callback: any): void {
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
