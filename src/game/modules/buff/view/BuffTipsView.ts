/*
* Buff获得界面;
*/
class BuffTipsView extends ui.buff.BuffTipsViewUI {

    private _data: any;

    constructor(data: any) {
        super();
        this._data = data;
        this.init();
    }

    //新建并添加到节点
    static Create(data: any): void {
        let resList = [
            { url: "res/atlas/images/buff.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            let nodeView = new BuffTipsView(data);
            AlignUtils.setToScreenGoldenPos(nodeView);
            M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
            nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeSelf);
        }));
    }

    private init(): void {
        let skillUrl: string = "";
        switch (this._data.id) {
            case SkyDropSheet.ATTACK_SPEED_INCREASE:
                this.txt_des.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.31");
                skillUrl = "images/buff/buff_1.png";
                break;
            case SkyDropSheet.ATTACK_VALUE_INCREASE:
                this.txt_des.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.32");
                skillUrl = "images/buff/buff_2.png";
                break;
            case SkyDropSheet.CRIT_RATE_INCREASE:
                this.txt_des.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.33");
                skillUrl = "images/buff/buff_3.png";
                break;
            case SkyDropSheet.COIN_OBTAIN_INCREASE:
                this.txt_des.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.34");
                skillUrl = "images/buff/buff_4.png";
                break;
        }
        this.imgIcon.skin = skillUrl;
        this.txt_time.text = (this._data.duration * 0.001).toString();
    }
}