/*
* 邀请奖励界面;
*/
class InvitationView extends BaseView {
    constructor() {
        super(LAYER_TYPE.FRAME_LAYER, ui.invitation.InvitationViewUI);
        this.setResources(["invitation"]);
    }
    initData() {
        super.initData();
        SDKManager.Instance.showBannerAd();
        HttpManager.Instance.requestShareInfo((res) => {
            this.refreshShareList(res);
        });
    }
    addEvents() {
        super.addEvents();
        this.ui.btnExit.on(Laya.Event.CLICK, this, this.onCloseHandler);
    }
    removeEvents() {
        super.removeEvents();
        this.ui.btnExit.off(Laya.Event.CLICK, this, this.onCloseHandler);
    }
    //分享
    refreshShareList(_data) {
        if (_data == null)
            return;
        let that = this;
        let finishNum = _data.share_num;
        let listDatas = _data.share_status; // [1,3,5,7,8,10];
        let redPointNum = 0;
        listDatas.forEach((item, index, list) => {
            if (item.status === 1) {
                redPointNum++;
            }
        });
        that.ui.shareItemList.vScrollBarSkin = '';
        that.ui.shareItemList.repeatY = 3;
        that.ui.shareItemList.array = listDatas;
        that.ui.shareItemList.renderHandler = new Laya.Handler(that, (cell, index) => {
            if (index > listDatas.length)
                return;
            let item = listDatas[index];
            if (item == null)
                return;
            let collectNum = item.num;
            let invitePeople = finishNum;
            let boxStage = item.status;
            if (invitePeople >= collectNum) {
                invitePeople = collectNum;
            }
            let txtTitle = cell.getChildByName('txtTitle');
            if (txtTitle) {
                txtTitle.changeText('第' + collectNum + '个好友');
            }
            let awardNum = 0;
            const imgAwardIcon = cell.getChildByName('imgAwardIcon');
            if (imgAwardIcon) {
                switch (item.reward_type) {
                    case "essence":
                        awardNum = item.essence;
                        imgAwardIcon.skin = "images/core/essence.png";
                        break;
                    default:
                        awardNum = item.diamond;
                        imgAwardIcon.skin = "images/core/diamond.png";
                        break;
                }
                let txtDiamond = imgAwardIcon.getChildByName('txtAward');
                if (txtDiamond) {
                    txtDiamond.changeText('' + awardNum);
                }
            }
            const imgHead = cell.getChildByName('imgHead');
            if (imgHead) {
                imgHead.offAll(Laya.Event.CLICK);
                imgHead.on(Laya.Event.CLICK, imgHead, () => {
                    AnimationUtils.lockBtnStage(imgHead);
                    userData.toShareAd(null, 0, true);
                });
            }
            //领取
            let btnGet = cell.getChildByName('btnGet');
            const btnInvite = cell.getChildByName("btnInvite");
            if (btnGet) {
                btnGet.visible = true;
                if (boxStage > 0) {
                    btnInvite && (btnInvite.visible = false);
                    if (boxStage > 1) {
                        //已领取
                        btnGet.visible = false;
                    }
                    else {
                        if (imgHead && item.avatarUrl) {
                            imgHead.skin = item.avatarUrl;
                            imgHead.offAll(Laya.Event.CLICK);
                        }
                        redPointNum++;
                        btnGet.disabled = false;
                        btnGet.offAll(Laya.Event.CLICK);
                        btnGet.on(Laya.Event.CLICK, btnGet, (_item, _btnObj) => {
                            that.requestPrize(_item.id, (_res) => {
                                if (_res) {
                                    MessageUtils.showMsgTips("奖励领取成功");
                                    if (item.reward_type === "diamond") {
                                        MessageUtils.shopMsgByObj(btnGet, "+" + awardNum, EFFECT_TYPE.DIAMOND);
                                    }
                                    else if (item.reward_type === "essence") {
                                        MessageUtils.shopMsgByObj(btnGet, "+" + awardNum, EFFECT_TYPE.ESSENCE);
                                    }
                                    HttpManager.Instance.requestDiamondData();
                                    _btnObj.visible = false;
                                    _item.status = 2;
                                    redPointNum--;
                                    if (redPointNum < 1) {
                                        //移除红点
                                        if (userData) {
                                            userData.removeShareGiftRedPoint();
                                        }
                                    }
                                }
                            });
                        }, [item, btnGet]);
                    }
                }
                else {
                    btnGet.visible = false;
                    if (btnInvite) {
                        btnInvite.visible = true;
                        btnInvite.offAll(Laya.Event.CLICK);
                        btnInvite.on(Laya.Event.CLICK, btnInvite, () => {
                            AnimationUtils.lockBtnStage(btnInvite);
                            userData.toShareAd(null, 0, true);
                        });
                    }
                }
            }
        });
    }
    onCloseHandler() {
        ViewMgr.Ins.close(ViewConst.InvitationView);
    }
    //拉取奖励
    requestPrize(_itemId, _callback) {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/friend_rewards/' + _itemId,
            success: function (res) {
                console.log("requestPrize", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
}
//# sourceMappingURL=InvitationView.js.map