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
* 消息提示界面;
*/
var MessageTips = /** @class */ (function (_super) {
    __extends(MessageTips, _super);
    function MessageTips() {
        return _super.call(this) || this;
    }
    //初始化
    MessageTips.prototype.init = function (content) {
        var self = this;
        self.txt_content.text = content;
        self.bg.width = self.hbox.displayWidth + 50;
    };
    return MessageTips;
}(ui.common.view.MessageTipsUI));
//# sourceMappingURL=MessageTips.js.map