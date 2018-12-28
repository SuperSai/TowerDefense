/*
* 奖励领取界面;
*/
class RewardGetView extends BaseView {

    private _tween: Laya.Tween;

    constructor() {
        super(LAYER_TYPE.SUB_FRAME_LAYER, ui.common.view.RewardGetViewUI);
    }

    public initData(): void {
        super.initData();
        let self = this;
        self._tween = EffectUtils.objectRotate(self.ui.imgLight);
        for (let index = 0, len: number = self.datas[0].length; index < len; index++) {
            let price = self.datas[0][index];
            let itemInfo: ItemVO = GlobleData.getData(GlobleData.ItemVO, self.datas[1][index]);
            let rewardItem: RewardItem = ObjectPool.pop(RewardItem, "RewardItem");
            let url = PathConfig.ItemUrl.replace("{0}", itemInfo.bigIcon);
            rewardItem.create(url, price);
            self.ui.hbox.addChild(rewardItem);
        }
        self.ui.hbox.refresh();
    }

    public addEvents(): void {
        super.addEvents();
        let self = this;
        self.ui.btn_get.on(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    public removeEvents(): void {
        super.removeEvents();
        let self = this;
        self.ui.btn_get.off(Laya.Event.CLICK, self, self.onCloseHandler);
    }

    private onCloseHandler(): void {
        ViewMgr.Ins.close(ViewConst.RewardGetView);
    }

    public close(...param: any[]): void {
        super.close(param);
        let self = this;
        self.ui.hbox.removeChildren();
        self._tween && (Laya.Tween.clear(self._tween));
        self._tween = null;
        self.callback && self.callback();
    }
}