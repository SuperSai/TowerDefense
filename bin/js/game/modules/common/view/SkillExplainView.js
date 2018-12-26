/*
* 技能说明界面;
*/
class SkillExplainView extends BaseView {
    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.common.view.SkillExplainViewUI);
    }
    //初始化
    initUI() {
        super.initUI();
    }
    addEvents() {
        super.addEvents();
        let self = this;
        self.ui.btnExit.on(Laya.Event.CLICK, self, self.onClickClose);
    }
    removeEvents() {
        super.removeEvents();
        let self = this;
        self.ui.btnExit.off(Laya.Event.CLICK, self, self.onClickClose);
    }
    onClickClose() {
        ViewMgr.Ins.close(ViewConst.SkillExplainView);
    }
}
//# sourceMappingURL=SkillExplainView.js.map