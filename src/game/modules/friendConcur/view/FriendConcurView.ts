/*
* 好友互助;
*/
class FriendConcurView extends ui.friendConcur.FriendConcurUI {
    constructor() {
        super();
        this.addEvetns();
        this.init();
    }

    //新建并添加到节点
    static Create(_parentNode: Laya.Node): void {
        let resList = [
            { url: "res/atlas/images/friendConcur.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                let nodeView = new FriendConcurView();
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().frameLayer.addChildWithMaskCall(nodeView, nodeView.removeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
            }
        }));
    }

    //初始化
    private init(): void {
        let self = this;
        self.rewardList.visible = false;
        self.rewardList.itemRender = FriendConcurItem;
        self.rewardList.vScrollBarSkin = "";
        self.rewardList.optimizeScrollRect = true;
        self.requestReward();
    }

    private addEvetns(): void {
        let self = this;
        self.btn_exit.on(Laya.Event.CLICK, self, self.removeView);
        self.btn_send.on(Laya.Event.CLICK, self, self.onSendShareHandler);
        EventsManager.Instance.on(EventsType.FRIEND_CONCUR_GET_REWARD, self, self.requestReward);
    }

    private removeEvents(): void {
        let self = this;
        self.btn_exit.off(Laya.Event.CLICK, self, self.removeView);
        self.btn_send.off(Laya.Event.CLICK, self, self.onSendShareHandler);
        EventsManager.Instance.off(EventsType.FRIEND_CONCUR_GET_REWARD, self, self.requestReward);
    }

    /** 发送分享 */
    private onSendShareHandler(): void {
        userData.toShareAd(() => {
            MessageUtils.showMsgTips("分享成功");
        }, 14);
    }

    private refreshRewarList(data: any): void {
        let self = this;
        if (data == null) return console.log("好友互动 -- 拉取不到数据。。。");
        self.rewardList.visible = true;
        let listData: any[] = data;
        listData.sort((pre, next): number => {
            return next.status - pre.status;
        });
        self.rewardList.array = listData;
    }

    private requestReward(): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/friend/help',
            success: function (res) {
                that.refreshRewarList(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    private removeView(): void {
        let self = this;
        self.removeSelf();
        self.removeEvents();
    }
}