/*
* 英雄升级界面;
*/
class LevelHeroView extends ui.evolution.LevelHeroViewUI {

    private _callback: Function;
    private _cancenCallback: Function;
    private _isSuccess: boolean = false;

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
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeHeroView);
            }
        }));
    }

    private init(): void {
        let levelData: MonsterVO = EvolutionManager.Instance.getEvolutionLevelData();
        this.txt_name.text = levelData.name + "Lv" + EvolutionManager.Instance.getHeroLevel();
        this.txt_count.text = "x" + EvolutionManager.Instance.needHeroCount;
        this.txt_diamond.text = M.player.Info.userDiamond + "/" + EvolutionManager.Instance.getEvolutionLevelDiamond();
        this.txt_level.value = userData.getKingLevel() + "";
        this.txt_uplevel.value = (userData.getKingLevel() + 1) + "";
        this.btn_sure.disabled = !EvolutionManager.Instance.canEvolutionUpgrade();

        let bossId: number = userData.isEvolution() ? 100003 : 100002;
        this.spMountGuard.setKind(bossId);
    }

    private addEvents(): void {
        this.btn_sure.on(Laya.Event.CLICK, this, this.onClickSure);
        this.btn_next.on(Laya.Event.CLICK, this, this.removeHeroView);
        this.btn_exit.on(Laya.Event.CLICK, this, this.removeHeroView);
    }

    private removeEvents(): void {
        this.btn_sure.off(Laya.Event.CLICK, this, this.onClickSure);
        this.btn_next.off(Laya.Event.CLICK, this, this.removeHeroView);
        this.btn_exit.off(Laya.Event.CLICK, this, this.removeHeroView);
    }

    private onClickSure(): void {
        if (EvolutionManager.Instance.canEvolutionUpgrade()) {
            if (GlobalConfig.DEBUG) {
                this._isSuccess = true;
                MessageUtils.showMsgTips("升级成功");
                HallManager.Instance.hallData.isUpdate = false;
                this._callback && this._callback(userData.getKingLevel() + 1, M.player.Info.userDiamond - EvolutionManager.Instance.getEvolutionLevelDiamond());
            } else {
                HttpManager.Instance.requestUpdateKingLevel(EvolutionView.kingEvolutionType, userData.getKingLevel(), EvolutionManager.Instance.getEvolutionLevelDiamond(), (_res: any) => {
                    if (_res && _res.type) {
                        this._isSuccess = true;
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

    private removeHeroView(): void {
        this.removeEvents();
        this.removeSelf();
        if (!this._isSuccess) {
            this._cancenCallback && this._cancenCallback();
        }
    }
}