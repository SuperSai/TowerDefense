/*
* 游戏公告;
*/
class NoticeView extends BaseView {

    constructor() {
        super(M.layer.noteLayer, ui.common.view.NoticeViewUI);
    }

    public initData(): void {
        super.initData();
        this.ui.txt_content.text = this.datas[0];
    }
}