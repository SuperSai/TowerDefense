/*
* 奖励物品Item;
*/
class RewardItem extends ui.common.item.RewardItemUI {
    constructor() {
        super();
    }

    public create(url: string, count: number): void {
        let self = this;
        self.itemImg.skin = url;
        self.txt_count.text = "x" + MathUtils.bytesToSize(count);
    }
}