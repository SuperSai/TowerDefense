/*
* TER0903-幸运抽奖;
*/
class LuckPrizeView extends BaseView {
    constructor() {
        super(LAYER_TYPE.FRAME_LAYER, ui.luckPrize.LuckPrizeViewUI);
        this.costDiamond = 120;
        this.freeTimes = 0; //免费次数
        this.freeTime = 0; //免费时间
        this.nextFreeTime = 0; //离下次免费时间
        this.isFreeDrawing = false; //是否正在免费抽奖
        this.prizeItemTable = [
            { id: 1, name: "2倍奖励", num: 2, imgUrl: "images/luckLottery/luck_item_box.png" },
            { id: 2, name: "大量钻石x888", num: 888, imgUrl: "images/core/diamond_icon_more.png" },
            { id: 3, name: "少量金币", num: 1, imgUrl: "images/luckLottery/luck_prize_1.png" },
            { id: 4, name: "大量精华x20", num: 20, imgUrl: "images/luckLottery/luck_prize_2.png" },
            { id: 5, name: "4倍奖励", num: 4, imgUrl: "images/luckLottery/luck_item_box.png" },
            { id: 6, name: "少量钻石x188", num: 188, imgUrl: "images/luckLottery/luck_prize_4.png" },
            { id: 7, name: "大量金币", num: 1, imgUrl: "images/core/coin_stack_01.png" },
            { id: 8, name: "少量精华x10", num: 10, imgUrl: "images/luckLottery/luck_prize_3.png" }
        ]; //奖励物品列表
        this.setResources(["luckLottery"]);
    }
    //初始化
    initUI() {
        super.initUI();
        var self = this;
        SDKManager.Instance.showBannerAd();
        self.startBtnEnabled(false);
        self.initPrizeInfo();
        //移除红点
        userData.removeLuckPrizeRedPoint();
        self.showMyDiamond(PlayerManager.Instance.Info.userDiamond);
        this.ui.txt_des.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.41", HallManager.Instance.hallData.magnification);
    }
    addEvents() {
        super.addEvents();
        this.ui.btnExit.on(Laya.Event.CLICK, this, this.onClickExit);
        this.ui.btnStart.on(Laya.Event.CLICK, this, this.onStart);
        EventsManager.Instance.on(EventsType.DIAMOND_CHANGE, this, this.onUpdateDiamond);
        EventsManager.Instance.on(EventsType.UPDATE_LUCK_PRIZE, this, this.initPrizeInfo);
    }
    removeEvents() {
        super.removeEvents();
        this.ui.btnExit.off(Laya.Event.CLICK, this, this.onClickExit);
        this.ui.btnStart.off(Laya.Event.CLICK, this, this.onStart);
        EventsManager.Instance.off(EventsType.DIAMOND_CHANGE, this, this.onUpdateDiamond);
        EventsManager.Instance.off(EventsType.UPDATE_LUCK_PRIZE, this, this.initPrizeInfo);
    }
    initPrizeInfo() {
        HttpManager.Instance.requestPrizeInfo((_res) => {
            if (!_res)
                return;
            if (this.isFreeDrawing == false) {
                this.freeTimes = MathUtils.parseInt(_res.free_num);
                this.freeTime = MathUtils.parseInt(_res.remain_time);
                this.nextFreeTime = MathUtils.parseInt(_res.next_free);
                HallManager.Instance.hallData.magnification = MathUtils.parseInt(_res.reward_x);
            }
            this.costDiamond = MathUtils.parseInt(_res.roulette_price);
            //免费次数已用完
            if (this.freeTimes < 1) {
                this.freeTime = 0;
            }
            this.refreshDiamondText();
        });
    }
    onClickExit() {
        ViewMgr.Ins.close(ViewConst.LuckPrizeView);
    }
    //开始抽奖
    onStart() {
        let that = this;
        that.startBtnEnabled(true);
        if (that.freeTimes > 0) {
            //免费抽奖
            HttpManager.Instance.requestDrawPrize(0, (_res) => {
                if (!_res || _res.id == null) {
                    console.log("无法正常抽奖free");
                    that.startBtnEnabled(false);
                    return;
                }
                that.isFreeDrawing = true;
                let itemId = _res.id;
                let rotation = (8 - itemId) * 360 / 8 + 360 / 16;
                that.onRotation(360 * 7 + rotation, itemId);
                that.freeTimes--;
                that.freeTime = 0;
                //移除红点
                if (userData) {
                    userData.removeLuckPrizeRedPoint();
                }
            });
        }
        else if (M.player.Info.userDiamond >= that.costDiamond) {
            //钻石抽奖
            HttpManager.Instance.requestDrawPrize(1, (_res) => {
                if (!_res || _res.id == null) {
                    console.log("无法正常抽奖diamond");
                    that.startBtnEnabled(false);
                    return;
                }
                let itemId = _res.id;
                let rotation = (8 - itemId) * 360 / 8 + 360 / 16;
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
    }
    startBtnEnabled(_isEnabled = true) {
        let that = this;
        if (that.ui.btnStart) {
            that.ui.btnStart.disabled = _isEnabled;
        }
    }
    //转盘
    onRotation(_rotation, _itemId) {
        let that = this;
        let fAdd = 0.2;
        that.ui.imgBg.rotation = that.ui.imgBg.rotation % 360;
        if (that.ui.imgBg.rotation > _rotation) {
            fAdd = -fAdd;
        }
        let fAddLength = 0;
        let fTotalLength = Math.abs(_rotation - that.ui.imgBg.rotation);
        let animFun = () => {
            if (fAdd > 0) {
                if (that.ui.imgBg.rotation < _rotation) {
                    let progress = fAddLength / fTotalLength;
                    //加速
                    if (progress < 0.2) {
                        fAdd += 0.2;
                    }
                    else if (progress > 0.6) {
                        fAdd -= 0.1;
                    }
                    if (fAdd < 0.2) {
                        fAdd = 0.2;
                    }
                    fAddLength += fAdd;
                    that.ui.imgBg.rotation += fAdd;
                }
                else {
                    that.ui.imgBg.rotation = _rotation;
                    that.ui.imgBg.clearTimer(that, animFun);
                    //显示奖励物品
                    if (_itemId != 1 && _itemId != 5) {
                        ViewMgr.Ins.open(ViewConst.LuckPrizeItemView, () => {
                            this.ui.txt_des.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.41", HallManager.Instance.hallData.magnification);
                            that.startBtnEnabled(false);
                        }, that.prizeItemTable[_itemId - 1]);
                    }
                    else {
                        ViewMgr.Ins.open(ViewConst.LuckPrizeBoxView, () => {
                            this.ui.txt_des.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.41", HallManager.Instance.hallData.magnification);
                            that.startBtnEnabled(false);
                        }, that.prizeItemTable[_itemId - 1]);
                    }
                }
            }
            else if (fAdd < 0) {
                if (that.ui.imgBg.rotation > _rotation) {
                    that.ui.imgBg.rotation += fAdd;
                }
                else {
                    that.ui.imgBg.rotation = _rotation;
                    that.ui.imgBg.clearTimer(that, animFun);
                    that.startBtnEnabled(true);
                }
            }
        };
        that.ui.imgBg.timerLoop(10, that, animFun);
    }
    onUpdateDiamond(data) {
        if (data && data.diamond) {
            this.showMyDiamond(data.diamond);
        }
        else {
            this.showMyDiamond(M.player.Info.userDiamond);
        }
    }
    showMyDiamond(value) {
        let self = this;
        self.ui.txt_diamond.text = value + "";
    }
    refreshDiamondText() {
        let self = this;
        if (self.freeTime > 0) {
            self.ui.txtDiamond.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.24");
        }
        else {
            self.ui.txtDiamond.changeText('' + self.costDiamond);
        }
    }
}
//# sourceMappingURL=LuckPrizeView.js.map