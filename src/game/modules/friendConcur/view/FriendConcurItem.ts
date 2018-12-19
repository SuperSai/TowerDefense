/*
* 好友互助Item;
*/
class FriendConcurItem extends ui.friendConcur.FriendConcurItemUI {
    constructor() {
        super();
    }

    public set dataSource(value: any) {
        let self = this;
        if (value) {
            self.txt_time.text = value.create_time;
            self.btn_get.disabled = value.status != 0;
            if (self.btn_get.disabled) {
                self.btn_get.label = "已领取";
            } else {
                self.btn_get.label = "可领取";
            }
            if (value.uid == userData.userId) {
                self.txt_des.text = "有位好友为您助力!";
            } else {
                self.txt_des.text = "您点击了" + StringUtils.omitStringByByteLen(platform.decode(value.nick_name)) + "的分享链接";
            }
            this.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
        }
    }

    /** 领取奖励 */
    private onGetReward(): void {
        EventsManager.Instance.event(EventsType.FRIEND_CONCUR_GET_REWARD);
    }

}