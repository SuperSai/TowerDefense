/*
* 获得免费英雄提示框;
*/
class FreeGetPetView extends BaseView {

    constructor() {
        super(M.layer.subFrameLayer, ui.common.view.FreeGetPetViewUI);
    }

    public initData(): void {
        super.initData();
        let self = this;
        this.isRemoveBanner = false;
        let monsterLevel: number = BattleManager.Instance.getLevel(self.datas[0].id);
        self.ui.imgPet.skin = "images/carImg/" + self.datas[0].imgUrl;
        self.ui.txt_name.text = self.datas[0].name + " Lv" + monsterLevel;
    }

    public addEvents(): void {
        let self = this;
        self.ui.btn_get.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    public removeEvents(): void {
        let self = this;
        self.ui.btn_get.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private onCloseHandler(): void {
        ViewMgr.Ins.close(ViewConst.FreeGetPetView);
        MessageUtils.showMsgTips("领取成功!");
    }
}