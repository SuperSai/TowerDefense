/*
* 获得免费英雄提示框;
*/
class FreeGetPetView extends BaseView {

    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.common.view.FreeGetPetViewUI);
    }

    public initData(): void {
        super.initData();
        let self = this;
        self.ui.imgPet.skin = "images/carImg/" + self.datas[0].imgUrl;
    }

    public addEvents(): void {
        let self = this;
        self.ui.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    public removeEvents(): void {
        let self = this;
        self.ui.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private onCloseHandler(): void {
        ViewMgr.Ins.close(ViewConst.FreeGetPetView);
    }
}