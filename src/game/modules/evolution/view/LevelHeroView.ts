/*
* 英雄升级界面;
*/
class LevelHeroView extends ui.evolution.LevelHeroViewUI {

    private _callback: Function;
    private _cancenCallback: Function;

    constructor(callback: Function = null, cancenCallback: Function = null) {
        super();
        this._callback = callback;
        this._cancenCallback = cancenCallback;
        this.addEvents();
        this.init();
    }

    //新建并添加到节点
    static Create(_parentNode: Laya.Node, callback: any = null, cancenCallback: Function = null): void {
        let resList = [
            { url: "res/atlas/images/levelHero.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                let nodeView = new LevelHeroView(callback, cancenCallback);
                AlignUtils.setToScreenGoldenPos(nodeView);
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeView);
            }
        }));
    }

    private init(): void {
        let levelData: MonsterVO = EvolutionManager.Instance.getEvolutionLevelData();
        this.txt_name.text = levelData.name + "Lv" + EvolutionManager.Instance.getHeroLevel();
        this.txt_count.text = "x" + EvolutionManager.Instance.needHeroCount;
        this.txt_diamond.text = M.player.Info.userDiamond + "/" + EvolutionManager.Instance.getEvolutionLevelDiamond();
        this.txt_level.text = "Lv" + userData.getKingLevel();
        this.txt_uplevel.text = "Lv" + (userData.getKingLevel() + 1);
        this.btn_sure.disabled = !EvolutionManager.Instance.canEvolutionUpgrade();
    }

    private addEvents(): void {
        this.btn_sure.on(Laya.Event.CLICK, this, this.onClickSure);
        this.btn_next.on(Laya.Event.CLICK, this, this.removeView);
        this.btn_exit.on(Laya.Event.CLICK, this, this.removeView);
    }

    private removeEvents(): void {
        this.btn_sure.off(Laya.Event.CLICK, this, this.onClickSure);
        this.btn_next.off(Laya.Event.CLICK, this, this.removeView);
        this.btn_exit.off(Laya.Event.CLICK, this, this.removeView);
    }

    private onClickSure(): void {
        if (EvolutionManager.Instance.canEvolutionUpgrade()) {
            if (GlobalConfig.DEBUG) {
                MessageUtils.showMsgTips("升级成功");
                HallManager.Instance.hallData.isUpdate = false;
                this._callback && this._callback(userData.getKingLevel() + 1, M.player.Info.userDiamond - EvolutionManager.Instance.getEvolutionLevelDiamond());
            } else {
                HttpManager.Instance.requestUpdateKingLevel(EvolutionView.kingEvolutionType, userData.getKingLevel(), EvolutionManager.Instance.getEvolutionLevelDiamond(), (_res: any) => {
                    if (_res && _res.type) {
                        ViewMgr.Ins.open(ViewConst.EvolutionLevelView, () => {
                            MessageUtils.showMsgTips("升级成功");
                            HallManager.Instance.hallData.isUpdate = false;
                            this._callback && this._callback(userData.getKingLevel() + 1, _res.diamond);
                        }, userData.getKingLevel() + 1);
                    }
                });
            }
            this.removeEvents();
            this.removeSelf();
        }
    }

    private removeView(): void {
        this.removeEvents();
        this.removeSelf();
        this._cancenCallback && this._cancenCallback();
    }
}