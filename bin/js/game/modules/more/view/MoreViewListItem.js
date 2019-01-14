class MoreViewListItem extends Laya.Component {
    constructor() {
        super();
        this.ui = new ui.more.MoreItemUI();
        this.addChild(this.ui);
        this.addEvents();
    }
    set dataSource(value) {
        if (value) {
            this._vo = value;
            this.ui.imgAppIcon.skin = this._vo.appIconUrl;
            this.ui.lblNickname.changeText(this._vo.appName);
            this.updateAwardItems();
            this.updateDescs();
            this.updateBtnStatus();
        }
    }
    updateAwardItems() {
        const awardItems = [this.ui.boxAwardItem_1, this.ui.boxAwardItem_2];
        if (M.more.noQuestMarket) {
            awardItems.map((item) => {
                item.visible = false;
            });
        }
        else {
            for (let i = 0; i < awardItems.length; i++) {
                if (i <= this._vo.questAwards.length) {
                    awardItems[i].visible = true;
                    const icon = awardItems[i].getChildByName("imgAwardIcon");
                    icon && (icon.skin = "images/core/" + GlobleData.getData(GlobleData.ItemVO, this._vo.questAwards[i].awardId).smallIcon + ".png");
                    const label = awardItems[i].getChildByName("lblAwardNum");
                    label && label.changeText(MathUtils.bytesToSize(this._vo.questAwards[i].awardNum));
                }
                else {
                    awardItems[i].visible = false;
                }
            }
        }
    }
    updateDescs() {
        const descItems = [this.ui.hboxQuestDesc_1, this.ui.hboxQuestDesc_2];
        for (let k = 0; k < descItems.length; k++) {
            if (this._vo.questTargets && this._vo.questTargets.length) {
                if (k < this._vo.questTargets.length) {
                    descItems[k].visible = true;
                    const desc = descItems[k].getChildByName("lblDesc");
                    desc && desc.changeText(this._vo.questTargets[k].desc);
                    const progress = descItems[k].getChildByName("lblProgress");
                    if (this._vo.questTargets[k].target) {
                        progress && progress.changeText("(" + this._vo.questTargets[k].progress + "/" + this._vo.questTargets[k].target + ")");
                    }
                    else {
                        progress && progress.changeText("");
                    }
                }
                else {
                    descItems[k].visible = false;
                }
            }
            else {
                if (k < 1) {
                    descItems[k].visible = true;
                    const desc = descItems[k].getChildByName("lblDesc");
                    desc && desc.changeText("超好玩的游戏，美女都在玩！");
                    const progress = descItems[k].getChildByName("lblProgress");
                    progress && progress.changeText("");
                }
                else {
                    descItems[k].visible = false;
                }
            }
        }
        if (!this._vo.questTargets || (this._vo.questTargets && this._vo.questTargets.length === 1)) {
            const one = [{ x: 131, y: 76 }];
            descItems[0].pos(one[0].x, one[0].y);
        }
        else {
            const two = [{ x: 131, y: 59 }, { x: 131, y: 93 }];
            descItems[0].pos(two[0].x, two[0].y);
            descItems[1].pos(two[1].x, two[1].y);
        }
    }
    updateBtnStatus() {
        this.ui.btnTry.visible = (this._vo.questStatus === xiaoduo.wxQuestMarket.questStatus.NOT_YET_PLAY || this._vo.questStatus === undefined);
        this.ui.btnStartGame.visible = this._vo.questStatus === xiaoduo.wxQuestMarket.questStatus.PLAYING;
        this.ui.btnObtain.visible = this._vo.questStatus === xiaoduo.wxQuestMarket.questStatus.COMPLETE_PLAY;
        this.ui.imgObtained.visible = this._vo.questStatus === xiaoduo.wxQuestMarket.questStatus.AWARD_OBTAINED;
    }
    addEvents() {
        const e = Laya.Event.CLICK;
        this.ui.btnTry.on(e, this, this.naviToApp);
        this.ui.btnStartGame.on(e, this, this.naviToApp);
        this.ui.btnObtain.on(e, this, this.requestsMoreQuestAward);
    }
    naviToApp() {
        if (platform) {
            if (systemInfo.checkVersion(WXSDKVersion.NAVIGATE_TO_MINI_PROGRAM)) {
                if (M.more.noQuestMarket) {
                    platform.navigateToMiniProgram({
                        appId: this._vo.appId,
                        path: this._vo.pageQuery,
                    });
                }
                else {
                    platform.navigateToMiniProgram({
                        appId: this._vo.appId,
                        extraData: {
                            fromQuestMarket: true,
                            userId: userData.userId,
                            questId: this._vo.questId
                        },
                        envVersion: "develop"
                    });
                }
            }
            else {
                if (Laya.Browser.onMiniGame) {
                    Laya.Browser.window.wx.showModal({
                        title: '温馨提示',
                        content: '您当前微信版本过低，暂时使用该功能，请升级到最新微信版本后重试。'
                    });
                }
            }
        }
    }
    requestsMoreQuestAward() {
        if (xiaoduo) {
            xiaoduo.wxQuestMarket.requestQuestReward({ questId: this._vo.questId, success: (code) => {
                    if (code === 100) {
                        for (const item of this._vo.questAwards) {
                            if (item.awardId === ITEM_ID.DIAMOND) {
                                M.event.event(EventsType.DIAMOND_CHANGE, { diamond: M.player.Info.userDiamond + item.awardNum });
                            }
                            else if (item.awardId === ITEM_ID.ESSENCE) {
                                M.event.event(EventsType.ESSENCE_CHANGE, { essence: M.player.Info.userEssence + item.awardNum });
                            }
                            else {
                                console.log("@FREEMAN: 未处理的物品类型 @requestsMoreQuestAward");
                            }
                        }
                    }
                    else {
                        console.log("@FREEMAN: 领取任务集市奖励失败! code:", code);
                    }
                } });
        }
    }
}
//# sourceMappingURL=MoreViewListItem.js.map