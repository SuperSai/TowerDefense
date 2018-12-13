/*
* 技能说明界面;
*/
class SkillExplainView extends ui.common.view.SkillExplainViewUI {

    private _data: any[];
    private _money: number;
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
                let nodeView = new SkillExplainView(arge, callback);
                AlignUtils.setToScreenGoldenPos(nodeView);
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    }

    //初始化
    private init(): void {
        let self = this;
        self.btnExit.offAll(Laya.Event.CLICK);
        self.btnExit.on(Laya.Event.CLICK, self, self.onClickClose);
    }

    private onClickClose(): any {
        this.removeSelf();
    }
}