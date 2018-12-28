/*
* 获得免费英雄提示框;
*/
class FreeGetPetView extends BaseView {
    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.common.view.FreeGetPetViewUI);
    }
    initData() {
        super.initData();
        let self = this;
        self.ui.imgPet.skin = "images/carImg/" + self.datas[0].imgUrl;
    }
    addEvents() {
        let self = this;
        self.ui.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    removeEvents() {
        let self = this;
        self.ui.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    onCloseHandler() {
        ViewMgr.Ins.close(ViewConst.FreeGetPetView);
    }
}
//# sourceMappingURL=FreeGetPetView.js.map