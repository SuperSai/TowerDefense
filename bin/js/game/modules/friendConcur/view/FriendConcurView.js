/*
* 好友互助;
*/
class FriendConcurView extends BaseView {
    constructor() {
        super(LAYER_TYPE.FRAME_LAYER, ui.friendConcur.FriendConcurUI);
        this.setResources(["friendConcur"]);
    }
    //初始化
    initUI() {
        super.initUI();
        let self = this;
        SDKManager.Instance.showBannerAd();
        self.ui.rewardList.visible = false;
        self.ui.rewardList.itemRender = FriendConcurItem;
        self.ui.rewardList.vScrollBarSkin = "";
        HttpManager.Instance.requestFriendConcurList((res) => {
            self.refreshRewarList(res);
        });
    }
    addEvents() {
        super.addEvents();
        let self = this;
        self.ui.btn_exit.on(Laya.Event.CLICK, self, self.onRemoveClose);
        self.ui.btn_send.on(Laya.Event.CLICK, self, self.onSendShareHandler);
        EventsManager.Instance.on(EventsType.FRIEND_CONCUR_GET_REWARD, self, self.onUpdateFriendList);
    }
    removeEvents() {
        super.removeEvents();
        let self = this;
        self.ui.btn_exit.off(Laya.Event.CLICK, self, self.onRemoveClose);
        self.ui.btn_send.off(Laya.Event.CLICK, self, self.onSendShareHandler);
        EventsManager.Instance.off(EventsType.FRIEND_CONCUR_GET_REWARD, self, self.onUpdateFriendList);
    }
    /** 发送分享 */
    onSendShareHandler() {
        userData.toShareAd(() => {
            MessageUtils.showMsgTips("分享成功");
        }, 14);
    }
    refreshRewarList(data) {
        let self = this;
        if (data == null)
            return console.log("好友互动 -- 拉取不到数据。。。");
        self.ui.rewardList.visible = true;
        let listData = data;
        // listData.sort((pre, next): number => {
        //     if (pre.static == 1 && next.static == 1) {
        //         return pre.p_status - next.p_status;
        //     }
        //     return pre.status - next.status;
        // });
        listData.forEach((data, index, list) => {
            if (data.uid == userData.userId) {
                FriendConcurView.redPointNum += (data.status == 0 ? 1 : 0);
            }
            else {
                FriendConcurView.redPointNum += (data.p_status == 0 ? 1 : 0);
            }
        });
        self.ui.rewardList.vScrollBarSkin = '';
        self.ui.rewardList.array = listData;
    }
    onUpdateFriendList() {
        let self = this;
        HttpManager.Instance.requestFriendConcurList((res) => {
            if (res)
                self.refreshRewarList(res);
        });
    }
    onRemoveClose() {
        ViewMgr.Ins.close(ViewConst.FriendConcurView);
    }
}
FriendConcurView.redPointNum = 0;
//# sourceMappingURL=FriendConcurView.js.map