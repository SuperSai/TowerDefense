/*
* TER0903-幸运抽奖;
*/
class LuckPrizeView extends BaseView {

    private costDiamond: number = 120;
    /** 免费抽奖次数 */
    private _freeCount: number = 0;
    /** 视频抽奖次数 */
    private _videoCount: number = 0;
    private _isRunning: boolean = false;
    private _currType: number = -1;

    private prizeItemTable: Array<any> = [
        { id: 1, name: "2倍奖励", num: 2, imgUrl: "images/luckLottery/luck_item_box.png" },
        { id: 2, name: "大量钻石", num: 888, imgUrl: "images/core/diamond_icon_more.png" },
        { id: 3, name: "少量金币", num: 1, imgUrl: "images/luckLottery/luck_prize_1.png" },
        { id: 4, name: "大量精华", num: 20, imgUrl: "images/luckLottery/luck_prize_2.png" },
        { id: 5, name: "8倍奖励", num: 8, imgUrl: "images/luckLottery/luck_item_box.png" },
        { id: 6, name: "少量钻石", num: 188, imgUrl: "images/luckLottery/luck_prize_4.png" },
        { id: 7, name: "大量金币", num: 1, imgUrl: "images/core/coin_stack_01.png" },
        { id: 8, name: "少量精华", num: 10, imgUrl: "images/luckLottery/luck_prize_3.png" }
    ]; //奖励物品列表

    constructor() {
        super(M.layer.frameLayer, ui.luckPrize.LuckPrizeViewUI);
        this.setResources(["luckLottery"]);
    }

    //初始化
    public initUI(): void {
        super.initUI();
        SDKManager.Instance.showBannerAd();
        this.startBtnEnabled(false);
        this.initPrizeInfo();
        this.onUpdateDiamond();
        this.onUpdateRollName();
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
        HttpManager.Instance.requestPrizeCount((data: any) => {
            if (!data) return;
            this._freeCount = MathUtils.parseInt(data.roulette_free_num);
            this._videoCount = MathUtils.parseInt(data.roulette_ad_num);
            HallManager.Instance.hallData.magnification = MathUtils.parseInt(data.reward_x);
            this.ui.imgLabel.skin = "images/luckLottery/luck_" + HallManager.Instance.hallData.magnification + ".png";
            this.refreshDiamondText();
        })
    }

    //开始抽奖
    private onStart(): void {
        this.startBtnEnabled(true);
        if (this._freeCount > 0) {   //免费抽奖
            this.doLotteryByType(LOTTERY_TYPE.FREE);
        } else if (this._videoCount > 0) { //看视频抽奖
            if (HallManager.Instance.isClickVideoTime()) {
                this.handlerLookVideoLottery();
            }
        } else if (M.player.Info.userDiamond >= this.costDiamond) { //钻石抽奖
            this.doLotteryByType(LOTTERY_TYPE.DIAMOND);
        } else {
            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.04"));
            this.startBtnEnabled(false);
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
        this._isRunning = true;
        let fAdd: number = 0.2;
        this.ui.imgBg.rotation = this.ui.imgBg.rotation % 360;
        if (this.ui.imgBg.rotation > _rotation) {
            fAdd = -fAdd;
        }
        let fAddLength: number = 0;
        let fTotalLength: number = Math.abs(_rotation - this.ui.imgBg.rotation);
        this.startBtnEnabled(true);
        let animFun = () => {
            if (fAdd > 0) {
                if (this.ui.imgBg.rotation < _rotation) {
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
                    this.ui.imgBg.rotation += fAdd;
                } else {
                    this.ui.imgBg.rotation = _rotation;
                    this.ui.imgBg.clearTimer(this, animFun);
                    //显示奖励物品
                    if (_itemId != 1 && _itemId != 5) {
                        ViewMgr.Ins.open(ViewConst.LuckPrizeItemView, () => {
                            this.ui.imgLabel.skin = "images/luckLottery/luck_" + HallManager.Instance.hallData.magnification + ".png";
                            this.startBtnEnabled(false);
                        }, this.prizeItemTable[_itemId - 1]);
                    } else {
                        ViewMgr.Ins.open(ViewConst.LuckPrizeBoxView, (flag: boolean) => {
                            this.startBtnEnabled(false);
                            this.ui.imgLabel.skin = "images/luckLottery/luck_" + HallManager.Instance.hallData.magnification + ".png";
                            if (flag) {
                                this.startBtnEnabled(true);
                                this.doLotteryByType(LOTTERY_TYPE.FREE_VIDEO);
                            }
                        }, this.prizeItemTable[_itemId - 1]);
                    }
                    this._isRunning = false;
                }
            } else if (fAdd < 0) {
                if (this.ui.imgBg.rotation > _rotation) {
                    this.ui.imgBg.rotation += fAdd;
                } else {
                    this.ui.imgBg.rotation = _rotation;
                    this.ui.imgBg.clearTimer(this, animFun);
                    this.startBtnEnabled(true);
                }
            }
        }
        this.ui.imgBg.timerLoop(10, this, animFun);
    }

    /** 更新钻石数量 */
    private onUpdateDiamond(data: any = null): void {
        if (data && data.diamond) {
            this.ui.txt_diamond.text = data.diamond + "";
        } else {
            this.ui.txt_diamond.text = M.player.Info.userDiamond + "";
        }
    }

    /** 抽奖 */
    private doLotteryByType(type: number): void {
        HttpManager.Instance.requestDrawPrize(type, (data: any) => {
            if (!data || data.id == null) {
                console.log("无法正常抽奖 type:", type);
                this.startBtnEnabled(false);
                return;
            }
            let itemId: number = data.id;
            let rotation: number = (8 - itemId) * 360 / 8 + 360 / 16;
            this.onRotation(360 * 3 + rotation, itemId);
            switch (type) {
                case LOTTERY_TYPE.FREE:
                    this._freeCount--;
                    this.refreshView(this._freeCount);
                    break;
                case LOTTERY_TYPE.VIDEO:
                    this._videoCount--;
                    this.refreshView(this._videoCount);
                    break;
                case LOTTERY_TYPE.DIAMOND:
                    EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: data.diamond_total });
                    break;
            }
        });
    }

    private refreshView(count: number): void {
        if (this._freeCount <= 0 && this._videoCount <= 0) {
            userData.removeLuckPrizeRedPoint();//移除红点
            HallManager.Instance.checkIsFreeLottery(count);
        }
        this.refreshDiamondText();
    }

    /** 看视频抽奖 */
    private handlerLookVideoLottery(): void {
        SDKManager.Instance.showVideoAd((_res: any) => {
            if (_res && _res.isEnded || _res == undefined) {
                this.doLotteryByType(LOTTERY_TYPE.VIDEO);
            } else {
                this.startBtnEnabled(false);
            }
        }, () => {
            userData.toShareAd(() => {
                this.doLotteryByType(LOTTERY_TYPE.VIDEO);
            });
        });
    }

    private refreshDiamondText(): void {
        let self = this;
        self.ui.imgIcon.visible = true;
        self.ui.txtDiamond.x = 102;
        if (self._freeCount > 0 || self._videoCount > 0) {
            self.ui.txtDiamond.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.24");
            if (self._freeCount <= 0 && self._videoCount > 0) {
                self.ui.imgIcon.skin = "images/core/video_icon.png";
            } else {
                self.ui.imgIcon.visible = false;
                self.ui.txtDiamond.x = 81;
            }
        } else {
            self.ui.txtDiamond.changeText('' + self.costDiamond);
            self.ui.imgIcon.skin = "images/core/diamond.png";
        }
    }

    /** 更新滚动的名字 */
    private onUpdateRollName(): void {
        this.ui.maskImg.mask = this.ui.rollBg;
        this.timerLoop(900, this, this.timeLoopRollName);
    }

    private timeLoopRollName(): void {
        let vo: LotteryRosterVO = GlobleData.getData(GlobleData.LotteryRosterVO, MathUtils.rangeInt(1, 100));
        let rollName: RollNameItem = ObjectPool.pop(RollNameItem, "RollNameItem");
        if (vo) rollName.init(vo);
        this.ui.rollBg.addChild(rollName);
        rollName.x = 63;// (this.ui.rollBg.width - rollName.width) / 2;
        rollName.y = this.ui.rollBg.height - rollName.height;
        Laya.Tween.to(rollName, { y: 0 }, 2500, Laya.Ease.linearNone, Handler.create(this, () => {
            Laya.Tween.clearTween(rollName);
            DisplayUtils.removeFromParent(rollName);
            ObjectPool.push(rollName);
        }));
    }

    private onClickExit(): void {
        if (!this._isRunning) {
            ViewMgr.Ins.close(ViewConst.LuckPrizeView);
        }
    }

    public close(...param: any[]): void {
        super.close(param);
        this.clearTimer(this, this.timeLoopRollName);
    }
}

enum LOTTERY_TYPE {
    /** 免费抽奖 */
    FREE = 0,
    /** 钻石抽奖 */
    DIAMOND = 1,
    /** 免费抽奖的看视频 */
    VIDEO = 2,
    /** 这个是比较特殊的，只有抽中多倍后观看视频就免费赠送一次抽奖 */
    FREE_VIDEO = 3,

}
