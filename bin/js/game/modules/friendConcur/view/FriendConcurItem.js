/*
* 好友互助Item;
*/
class FriendConcurItem extends ui.friendConcur.FriendConcurItemUI {
    constructor() {
        super();
    }
    set dataSource(value) {
        let self = this;
        if (value) {
            self._data = value;
            self._rewards = [];
            self.txt_time.text = value.create_time;
            self.rewardGold();
            if (value.uid == userData.userId) {
                self.txt_des0.text = "您帮助";
                self.txt_des1.text = StringUtils.omitStringByByteLen(platform.decode(value.p_nick_name), 10);
                self.txt_des2.text = "赢取了金币奖励";
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
                self.btn_get.label = "领取";
            }
            self.hbox.refresh();
            this.btn_get.on(Laya.Event.CLICK, this, this.onGetReward);
        }
    }
    rewardGold() {
        let self = this;
        let monsterType = userData.isEvolution() ? 2 : 1;
        let monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, userData.getCarLevel());
        if (monsterInfo) {
            if (HallManager.Instance.hallData.concurGoldDic.ContainsKey(self._data.id)) {
                self._gold = HallManager.Instance.hallData.concurGoldDic.TryGetValue(self._data.id);
            }
            else {
                let curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
                self._gold = curPrice * 0.4;
                HallManager.Instance.hallData.concurGoldDic.Add(self._data.id, self._gold);
                userData.cache.setCache(CacheKey.CONCUR, HallManager.Instance.hallData.concurGoldDic.toJsonObject());
            }
            self.txt_gold.text = MathUtils.bytesToSize(self._gold) + "";
            self._rewards.push(self._gold);
        }
    }
    rewardDiamond(diamond) {
        let self = this;
        self.diamondBox.visible = Number(diamond) > 0;
        if (self.diamondBox.visible) {
            self.txt_diamond.text = diamond;
            self._rewards.push(Number(diamond));
        }
    }
    /** 领取奖励 */
    onGetReward() {
        let self = this;
        if (self._data) {
            HttpManager.Instance.requestReward(self._data.id, (res) => {
                self.btn_get.disabled = true;
                FriendConcurView.redPointNum--;
                ViewMgr.Ins.open(ViewConst.RewardGetView, () => {
                    M.layer.screenEffectLayer.addChild(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY));
                    if (FriendConcurView.redPointNum < 1) {
                        userData.removeFriendConcurRedPoint();
                        FriendConcurView.redPointNum = 0;
                    }
                    EventsManager.Instance.event(EventsType.GLOD_CHANGE, { money: M.player.Info.userMoney += self._gold });
                    if (self.diamondBox.visible && self._rewards.length > 1) {
                        EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: M.player.Info.userDiamond += self._rewards[1] });
                    }
                    EventsManager.Instance.event(EventsType.FRIEND_CONCUR_GET_REWARD);
                }, self._rewards, [1, 2]);
            });
        }
    }
}
//# sourceMappingURL=FriendConcurItem.js.map