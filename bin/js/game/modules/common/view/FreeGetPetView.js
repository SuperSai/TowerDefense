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
        let monsterLevel = BattleManager.Instance.getLevel(self.datas[0].id);
        self.ui.imgPet.skin = "images/carImg/" + self.datas[0].imgUrl;
        self.ui.txt_name.text = self.datas[0].name + " Lv" + monsterLevel;
    }
    addEvents() {
        let self = this;
        self.ui.btn_get.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    removeEvents() {
        let self = this;
        self.ui.btn_get.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    onCloseHandler() {
        ViewMgr.Ins.close(ViewConst.FreeGetPetView);
        MessageUtils.showMsgTips("领取成功!");
    }
}
//# sourceMappingURL=FreeGetPetView.js.map