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
                self._data = value;
                self._rewards = [];
                self.txt_time.text = value.create_time;
                if (value.uid == userData.userId) {
                    self.txt_des0.text = "您点击了";
                    self.txt_des1.text = StringUtils.omitStringByByteLen(platform.decode(value.p_nick_name), 10);
                    self.txt_des2.text = "的分享链接";
                    self.btn_get.disabled = value.status != 0;
                    self.rewardDiamond(self._data.diamond);
                }
                else {
                    self.txt_des0.text = "有位好友";
                    self.txt_des1.text = StringUtils.omitStringByByteLen(platform.decode(value.nick_name), 10);
                    self.txt_des2.text = "为我助力";
                    self.btn_get.disabled = value.p_status != 0;
                    self.rewardDiamond(self._data.p_diamond);
                }
                if (self.btn_get.disabled) {
                    self.btn_get.label = "已领取";
                }
                else {
                    self.btn_get.label = "可领取";
                }
                self.hbox.refresh();
                this.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
                self.rewardGold();
            }
        },
        enumerable: true,
        configurable: true
    });
    FriendConcurItem.prototype.rewardGold = function () {
        var self = this;
        var monsterType = userData.isEvolution() ? 2 : 1;
        var monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, userData.getCarLevel());
        if (monsterInfo) {
            var curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
            self._gold = curPrice * 0.4;
            self.txt_gold.text = MathUtils.bytesToSize(self._gold) + "";
            self._rewards.push(self._gold);
        }
    };
    FriendConcurItem.prototype.rewardDiamond = function (diamond) {
        var self = this;
        self.diamondBox.visible = Number(diamond) > 0;
        if (self.diamondBox.visible) {
            self.txt_diamond.text = diamond;
            self._rewards.push(Number(diamond));
        }
    };
    /** 领取奖励 */
    FriendConcurItem.prototype.onGetReward = function () {
        var self = this;
        if (self._data) {
            self.requestReward(self._data.id, function (res) {
                RewardGetView.Create(self, function () {
                    M.layer.screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
                    FriendConcurView.redPointNum--;
                    if (FriendConcurView.redPointNum < 1) {
                        if (userData) {
                            userData.removeFriendConcurRedPoint();
                        }
                        FriendConcurView.redPointNum = 0;
                    }
                    EventsManager.Instance.event(EventsType.GLOD_CHANGE, { money: userData.gold += self._gold });
                    EventsManager.Instance.event(EventsType.FRIEND_CONCUR_GET_REWARD);
                }, self._rewards);
            });
        }
    };
    FriendConcurItem.prototype.requestReward = function (itemId, callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/activity/friend/reward/' + itemId,
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    return FriendConcurItem;
}(ui.friendConcur.FriendConcurItemUI));
//# sourceMappingURL=FriendConcurItem.js.map