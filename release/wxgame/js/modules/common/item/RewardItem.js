var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 奖励物品Item;
*/
var RewardItem = /** @class */ (function (_super) {
    __extends(RewardItem, _super);
    function RewardItem() {
        return _super.call(this) || this;
    }
    RewardItem.prototype.create = function (url, count) {
        var self = this;
        self.itemImg.skin = url;
        self.txt_count.text = "x" + count;
    };
    return RewardItem;
}(ui.RewardItemUI));
//# sourceMappingURL=RewardItem.js.map