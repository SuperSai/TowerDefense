/*
* 消息提示界面;
*/
class MessageTips extends ui.common.view.MessageTipsUI {

    constructor() {
        super();
    }

    //初始化
    public init(content: string): void {
        let self = this;
        self.txt_content.text = content;
        self.hbox.refresh();
        self.bg.width = self.hbox.displayWidth + 50;
        self.width = self.bg.width;
    }
}