/*
* 游戏公告;
*/
class NoticeView extends BaseView {
    constructor() {
        super(LAYER_TYPE.NOTE_LAYER, ui.common.view.NoticeViewUI);
    }
    initData() {
        super.initData();
        this.ui.txt_content.text = this.datas[0];
    }
}
//# sourceMappingURL=NoticeView.js.map