/*
* 消息提示界面;
*/
class MessageTips extends ui.common.view.MessageTipsUI {
    constructor() {
        super();
    }
    //初始化
    init(content) {
        let self = this;
        self.txt_content.text = content;
        self.bg.width = self.hbox.displayWidth + 50;
    }
}
//# sourceMappingURL=MessageTips.js.map