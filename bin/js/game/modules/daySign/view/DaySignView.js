/*
* TER0821-每日签到;
*/
class DaySignView extends ui.daySign.DaySignViewUI {
    constructor() {
        super();
        var that = this;
        that.frameOnce(1, that, () => {
            that.init();
        });
    }
    //新建并添加到节点
    static Create(onAddHandler) {
        let resList = [
            { url: "res/atlas/images/dailySign.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (!this._view) {
                this._view = new DaySignView();
                this._view.requestCompleteHandler = onAddHandler;
                AlignUtils.setToScreenGoldenPos(this._view);
            }
            else {
                M.layer.frameLayer.addChildWithMaskCall(this._view, this._view.removeSelf);
            }
        }));
    }
    //初始化
    init() {
        var that = this;
        if (DaySignView.signData) {
            that.refreshList(DaySignView.signData);
        }
        if (Laya.Browser.onMiniGame) {
            that.btnExit.on(Laya.Event.CLICK, that, that.removeSelf);
            that.btnGet.on(Laya.Event.CLICK, that, that.onClickGet);
            if (!M.novice.isRunning) {
                that.requestSignInfo((_data) => {
                    if (_data) {
                        DaySignView.signData = _data;
                        that.refreshList(_data);
                        if (_data.sign.status === 0) {
                            M.layer.frameLayer.addChildWithMaskCall(that, that.removeSelf);
                        }
                        if (that.requestCompleteHandler) {
                            that.requestCompleteHandler.runWith(that);
                        }
                    }
                });
            }
            else {
                Laya.timer.once(5 * 1000, that, that.init);
            }
        }
        else {
            console.log("@FREEMAN: 不在微信小游戏环境下，不请求签到数据！");
        }
    }
    removeSelf() {
        this.event(DaySignView.REMOVE_FROM_STAGE);
        return super.removeSelf();
    }
    onClickGet() {
        let that = this;
        AnimationUtils.lockBtnStage(that.btnGet);
        if (DaySignView.signData && DaySignView.signData.sign) {
            let day = DaySignView.signData.sign.day;
            that.requestPrize(day, (_res) => {
                if (_res) {
                    if (_res.code == 1) {
                        that.removeSelf();
                        MessageUtils.showMsgTips("今天签到奖励领取成功！");
                        MessageUtils.shopMsgByObj(that.btnGet, " +" + DaySignView.signData.prize['day_' + day]["diamond"], EFFECT_TYPE.DIAMOND);
                        const essenceNum = DaySignView.signData.prize['day_' + day]["essence"];
                        if (essenceNum) {
                            userData.setEssence(_res.essence);
                            Laya.timer.once(Time.SEC_IN_MILI, this, () => {
                                MessageUtils.shopMsgByObj(that.btnGet, " +" + essenceNum, EFFECT_TYPE.ESSENCE);
                            });
                        }
                        EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: _res.diamond });
                        DaySignView.signData.sign.status = 1;
                        userData.removeDailySignRedPoint();
                        that.refreshList(DaySignView.signData);
                    }
                    else if (_res.code == 2) {
                        MessageUtils.showMsgTips("今天签到奖励已领取！");
                    }
                    else {
                        MessageUtils.showMsgTips("今天签到奖励领取失败！");
                    }
                }
            });
        }
    }
    //初始化list
    refreshList(_data) {
        if (_data == null) {
            return;
        }
        let that = this;
        let dayIndex = _data.sign.day; //1~7
        let status = _data.sign.status; //0未领取,1已领取
        let prizeData = _data.prize;
        let listDatas = [1, 2, 3, 4, 5, 6]; //_data.prize;
        that.signItemList.vScrollBarSkin = '';
        that.signItemList.repeatY = 3;
        that.signItemList.array = listDatas;
        that.signItemList.renderHandler = new Laya.Handler(that, (cell, index) => {
            if (index > listDatas.length) {
                return;
            }
            // console.log(cell, index);
            let item = listDatas[index];
            if (item == null) {
                return;
            }
            let cellIndex = index + 1;
            let txtTitle = cell.getChildByName('txtTitle');
            if (txtTitle) {
                txtTitle.changeText('第' + cellIndex + '天');
            }
            const imgIcon = cell.getChildByName("imgIcon");
            if (imgIcon) {
                imgIcon.skin = "images/dailySign/icon_day_" + cellIndex + ".png";
            }
            let txtDiamond = cell.getChildByName('txtDiamond');
            if (txtDiamond) {
                txtDiamond.changeText('钻石x' + prizeData['day_' + cellIndex]["diamond"]);
            }
            // let imgGet = cell.getChildByName('imgGet') as Laya.Image;
            // if (imgGet) {
            //     imgGet.visible = cellIndex <dayIndex;
            //     if (cellIndex ==dayIndex) {
            //         imgGet.visible = (status==1);
            //         that.curGetIcon = imgGet;
            //     }
            // }
            // cell.gray = cellIndex >dayIndex;
            if (cellIndex < dayIndex) {
                // 已经领取的
                setObtainedState();
            }
            else if (cellIndex === dayIndex) {
                if (status === 0) {
                    const btnBox = cell.getChildByName('btnBox');
                    if (btnBox) {
                        btnBox.skin = "images/dailySign/item_bg_obtainable.png";
                    }
                }
                else {
                    setObtainedState();
                }
            }
            function setObtainedState() {
                // 已经领取的
                const obtainMark = cell.getChildByName('imgObtainedMark');
                obtainMark && (obtainMark.visible = true);
                const mask = cell.getChildByName('imgMask');
                mask && (mask.visible = true);
            }
        });
        let cell = that.lastItemBox;
        if (cell) {
            let cellIndex = 7;
            let txtTitle = cell.getChildByName('txtTitle');
            if (txtTitle) {
                txtTitle.changeText('第' + cellIndex + '天');
            }
            let txtDiamond = cell.getChildByName('txtDiamond');
            if (txtDiamond) {
                txtDiamond.changeText(prizeData['day_' + cellIndex]["diamond"]);
            }
            let lblEssense = cell.getChildByName('lblEssence');
            if (lblEssense) {
                lblEssense.changeText(prizeData['day_' + cellIndex]["essence"]);
            }
            if (cellIndex === dayIndex) {
                if (status === 1) {
                    // const btnBox = cell.getChildByName('btnBox') as Laya.Button;
                    // if(btnBox){
                    //     btnBox.skin = "images/dailySign/item_bg_obtainable.png"
                    // }
                    // } else {
                    // 已经领取的
                    const obtainMark = cell.getChildByName('imgObtainedMark');
                    obtainMark && (obtainMark.visible = true);
                    const mask = cell.getChildByName('imgMask');
                    mask && (mask.visible = true);
                }
            }
        }
    }
    //拉取签到信息
    requestSignInfo(_callback) {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/sign/info',
            success: function (res) {
                console.log("@FREEMAN: 请求签到数据:", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    //拉取奖励
    requestPrize(_itemId, _callback) {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/sign/commit/' + _itemId,
            success: function (res) {
                console.log("@FREEMAN: requestPrize:", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
}
DaySignView.REMOVE_FROM_STAGE = "REMOVE_FROM_STAGE";
DaySignView.signData = null;
//# sourceMappingURL=DaySignView.js.map