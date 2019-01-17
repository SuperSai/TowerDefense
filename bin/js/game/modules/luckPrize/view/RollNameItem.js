/*
* name;
*/
class RollNameItem extends ui.luckPrize.RollNameItemUI {
    constructor() {
        super();
    }
    init(data) {
        this.txt_name.text = data.lotteryName;
        this.txt_reward.text = data.lotterydata;
        this.hbox.refresh();
    }
}
//# sourceMappingURL=RollNameItem.js.map