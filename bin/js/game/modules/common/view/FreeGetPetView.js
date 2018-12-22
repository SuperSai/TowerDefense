/*
* 获得免费英雄提示框;
*/
class FreeGetPetView extends ui.common.view.FreeGetPetViewUI {
    constructor(data = null) {
        super();
        this._data = data;
        this.init();
    }
    //新建并添加到节点
    static Create(_parentNode, callback = null, _removeCallback = null, ...arge) {
        let resList = [
            { url: "res/atlas/images.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                let nodeView = new FreeGetPetView(arge);
                AlignUtils.setToScreenGoldenPos(nodeView);
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    }
    //初始化
    init() {
        let self = this;
        self.imgPet.skin = "images/carImg/" + self._data[0].imgUrl;
        self.addEvents();
    }
    addEvents() {
        let self = this;
        self.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    removeEvents() {
        let self = this;
        self.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }
    onCloseHandler() {
        let self = this;
        self.removeSelf();
        self.removeEvents();
    }
}
//# sourceMappingURL=FreeGetPetView.js.map