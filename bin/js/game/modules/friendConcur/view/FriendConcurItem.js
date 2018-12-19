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
* 好友互助Item;
*/
var FriendConcurItem = /** @class */ (function (_super) {
    __extends(FriendConcurItem, _super);
    function FriendConcurItem() {
        return _super.call(this) || this;
    }
    Object.defineProperty(FriendConcurItem.prototype, "dataSource", {
        set: function (value) {
            var self = this;
            if (value) {
                self.txt_time.text = value.create_time;
                self.btn_get.disabled = value.status != 0;
                if (self.btn_get.disabled) {
                    self.btn_get.label = "已领取";
                }
                else {
                    self.btn_get.label = "可领取";
                }
                if (value.uid == userData.userId) {
                    self.txt_des.text = "有位好友为您助力!";
                }
                else {
                    self.txt_des.text = "您点击了" + StringUtils.omitStringByByteLen(platform.decode(value.nick_name)) + "的分享链接";
                }
                this.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
            }
        },
        enumerable: true,
        configurable: true
    });
    /** 领取奖励 */
    FriendConcurItem.prototype.onGetReward = function () {
        EventsManager.Instance.event(EventsType.FRIEND_CONCUR_GET_REWARD);
    };
    return FriendConcurItem;
}(ui.friendConcur.FriendConcurItemUI));
//# sourceMappingURL=FriendConcurItem.js.map