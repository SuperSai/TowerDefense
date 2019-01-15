/*
* TER0903-幸运抽奖;
*/
class LuckPrizeView extends BaseView {

    private costDiamond: number = 120;
    private freeTimes: number = 0; //免费次数
    private freeTime: number = 0; //免费时间
    private nextFreeTime: number = 0; //离下次免费时间
    private _isRunning: boolean = false;

    private isFreeDrawing: boolean = false; //是否正在免费抽奖
    private prizeItemTable: Array<any> = [
        { id: 1, name: "2倍奖励", num: 2, imgUrl: "images/luckLottery/luck_item_box.png" },
        { id: 2, name: "大量钻石", num: 888, imgUrl: "images/core/diamond_icon_more.png" },
        { id: 3, name: "少量金币", num: 1, imgUrl: "images/luckLottery/luck_prize_1.png" },
        { id: 4, name: "大量精华", num: 20, imgUrl: "images/luckLottery/luck_prize_2.png" },
        { id: 5, name: "4倍奖励", num: 4, imgUrl: "images/luckLottery/luck_item_box.png" },
        { id: 6, name: "少量钻石", num: 188, imgUrl: "images/luckLottery/luck_prize_4.png" },
        { id: 7, name: "大量金币", num: 1, imgUrl: "images/core/coin_stack_01.png" },
        { id: 8, name: "少量精华", num: 10, imgUrl: "images/luckLottery/luck_prize_3.png" }
    ]; //奖励物品列表

    constructor() {
        super(LAYER_TYPE.FRAME_LAYER, ui.luckPrize.LuckPrizeViewUI);
        this.setResources(["luckLottery"]);
    }

    //初始化
    public initUI(): void {
        super.initUI();
        var self = this;
        SDKManager.Instance.showBannerAd();
        self.startBtnEnabled(false);
        self.initPrizeInfo();
        //移除红点
        userData.removeLuckPrizeRedPoint();
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
                HallManager.Instance.hallData.magnification = MathUtils.parseInt(_res.reward_x);
                this.ui.imgLabel.skin = "images/luckLottery/luck_" + HallManager.Instance.hallData.magnification + ".png";
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
        if (!this._isRunning) {
            ViewMgr.Ins.close(ViewConst.LuckPrizeView);
        }
    }

    //开始抽奖
    private onStart(): void {
        let that = this;
        that.startBtnEnabled(true);
        if (that.freeTimes > 0) {   //免费抽奖
            this.handlerFreeLottery();
        } else if (M.player.Info.userDiamond >= that.costDiamond) { //钻石抽奖
            this.handlerDiamondLottery();
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
        this._isRunning = true;
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
                    if (_itemId != 1 && _itemId != 5) {
                        ViewMgr.Ins.open(ViewConst.LuckPrizeItemView, () => {
                            this.ui.imgLabel.skin = "images/luckLottery/luck_" + HallManager.Instance.hallData.magnification + ".png";
                            that.startBtnEnabled(false);
                        }, that.prizeItemTable[_itemId - 1]);
                    } else {
                        ViewMgr.Ins.open(ViewConst.LuckPrizeBoxView, (flag: boolean) => {
                            that.startBtnEnabled(false);
                            if (flag) {
                                this.ui.imgLabel.skin = "images/luckLottery/luck_" + HallManager.Instance.hallData.magnification + ".png";
                                this.handlerFreeLottery();
                            }
                        }, that.prizeItemTable[_itemId - 1]);
                    }
                    this._isRunning = false;
                    HallManager.Instance.showLuckPrizeTime(that.freeTimes);
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

    /** 免费抽奖 */
    private handlerFreeLottery(): void {
        HttpManager.Instance.requestDrawPrize(0, (_res: any) => {
            if (!_res || _res.id == null) {
                console.log("无法正常抽奖free");
                this.startBtnEnabled(false);
                return;
            }
            this.isFreeDrawing = true;
            let itemId: number = _res.id;
            let rotation: number = (8 - itemId) * 360 / 8 + 360 / 16;
            this.onRotation(360 * 7 + rotation, itemId);
            this.freeTimes--;
            this.freeTime = 0;
            //移除红点
            userData.removeLuckPrizeRedPoint();
            this.refreshDiamondText();
        });
    }

    /** 钻石抽奖 */
    private handlerDiamondLottery(): void {
        HttpManager.Instance.requestDrawPrize(1, (_res: any) => {
            if (!_res || _res.id == null) {
                console.log("无法正常抽奖diamond");
                this.startBtnEnabled(false);
                return;
            }
            let itemId: number = _res.id;
            let rotation: number = (8 - itemId) * 360 / 8 + 360 / 16;
            this.onRotation(360 * 7 + rotation, itemId);
            this.freeTimes--;
            this.freeTime = 0;
            //刷新钻石数量
            HttpManager.Instance.requestDiamondData();
        });
    }

    private refreshDiamondText(): void {
        let self = this;
        if (self.freeTime > 0) {
            self.ui.txtDiamond.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.24");
        } else {
            self.ui.txtDiamond.changeText('' + self.costDiamond);
        }
    }
}
