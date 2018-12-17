/*
* name;
*/
class DiamondBuyView extends ui.common.view.DiamondBuyViewUI {

    private _data: any[];
    private _callback: Function;

    constructor(data: any[] = null, callback: Function = null) {
        super();
        this._data = data;
        this._callback = callback;
        this.init();
    }

    //新建并添加到节点
    static Create(_parentNode: Laya.Node, callback: any = null, _removeCallback: any = null, ...arge): void {
        let resList = [
            { url: "res/atlas/images.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                let nodeView = new DiamondBuyView(arge, callback);
                AlignUtils.setToScreenGoldenPos(nodeView);
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    }

    //初始化
    private init(): void {
        let self = this;
        switch (self._data[0]) {
            case DILOG_TYPE.PET:
                self.petTitleImg.visible = self.imgMonster.visible = true;
                self.accTitleImg.visible = self.accIcon.visible = false;
                self.imgMonster.skin = "images/carImg/" + self._data[2].imgUrl;
                break;
            case DILOG_TYPE.ACC:
                self.petTitleImg.visible = self.imgMonster.visible = false;
                self.accTitleImg.visible = self.accIcon.visible = true;
                break;
        }
        self.txtDiamond.text = self._data[1];
        self.addEvents();
    }

    private addEvents(): void {
        let self = this;
        self.btnBuy.on(Laya.Event.CLICK, self, self.onBuyHandler);
        self.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private removeEvents(): void {
        let self = this;
        self.btnBuy.off(Laya.Event.CLICK, self, self.onBuyHandler);
        self.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private onBuyHandler(): void {
        let self = this;
        let carPriceInt = Math.floor(self._data[1]);
        if (PlayerManager.Instance.Info.userDiamond >= carPriceInt) {
            if (this._callback) {
                this._callback(carPriceInt);
            }
        } else {
            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.04"));
        }
        self.onCloseHandler();
    }

    private onCloseHandler(): void {
        let self = this;
        self.removeSelf();
        self.removeEvents();
    }
}