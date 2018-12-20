var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 好友互助;
*/
var FriendConcurView = /** @class */ (function (_super) {
    __extends(FriendConcurView, _super);
    function FriendConcurView() {
        var _this = _super.call(this) || this;
        _this.addEvetns();
        _this.init();
        return _this;
    }
    //新建并添加到节点
    FriendConcurView.Create = function (_parentNode) {
        var resList = [
            { url: "res/atlas/images/friendConcur.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                var nodeView = new FriendConcurView();
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().frameLayer.addChildWithMaskCall(nodeView, nodeView.removeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
            }
        }));
    };
    //初始化
    FriendConcurView.prototype.init = function () {
        var self = this;
        self.rewardList.visible = false;
        self.rewardList.itemRender = FriendConcurItem;
        self.rewardList.vScrollBarSkin = "";
        HttpManager.Instance.requestFriendConcurList(function (res) {
            self.refreshRewarList(res);
        });
    };
    FriendConcurView.prototype.addEvetns = function () {
        var self = this;
        self.btn_exit.on(Laya.Event.CLICK, self, self.removeView);
        self.btn_send.on(Laya.Event.CLICK, self, self.onSendShareHandler);
        EventsManager.Instance.on(EventsType.FRIEND_CONCUR_GET_REWARD, self, self.onUpdateFriendList);
    };
    FriendConcurView.prototype.removeEvents = function () {
        var self = this;
        self.btn_exit.off(Laya.Event.CLICK, self, self.removeView);
        self.btn_send.off(Laya.Event.CLICK, self, self.onSendShareHandler);
        EventsManager.Instance.off(EventsType.FRIEND_CONCUR_GET_REWARD, self, self.onUpdateFriendList);
    };
    /** 发送分享 */
    FriendConcurView.prototype.onSendShareHandler = function () {
        userData.toShareAd(function () {
            MessageUtils.showMsgTips("分享成功");
        }, 14);
    };
    FriendConcurView.prototype.refreshRewarList = function (data) {
        var self = this;
        if (data == null)
            return console.log("好友互动 -- 拉取不到数据。。。");
        self.rewardList.visible = true;
        var listData = data;
        listData.sort(function (pre, next) {
            if (pre.static == 1 && next.static == 1) {
                return pre.p_status - next.p_status;
            }
            return pre.status - next.status;
        });
        listData.forEach(function (data, index, list) {
            if (data.uid == userData.userId) {
                FriendConcurView.redPointNum += (data.status == 0 ? 1 : 0);
            }
            else {
                FriendConcurView.redPointNum += (data.p_status == 0 ? 1 : 0);
            }
        });
        self.rewardList.repeatY = listData.length;
        self.rewardList.array = listData;
    };
    FriendConcurView.prototype.onUpdateFriendList = function () {
        var self = this;
        HttpManager.Instance.requestFriendConcurList(function (res) {
            if (res)
                self.refreshRewarList(res);
        });
    };
    FriendConcurView.prototype.removeView = function () {
        var self = this;
        self.removeSelf();
        self.removeEvents();
    };
    FriendConcurView.redPointNum = 0;
    return FriendConcurView;
}(ui.friendConcur.FriendConcurUI));
//# sourceMappingURL=FriendConcurView.js.map