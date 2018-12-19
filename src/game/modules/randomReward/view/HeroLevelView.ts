/*
* 英雄升级;
*/
class HeroLevelView extends ui.randomReward.HeroLevelViewUI {

    private _callback: Function;
    private _arg: any[];

    constructor(callBack: Function, arg: any[]) {
        super();
        this._callback = callBack;
        this._arg = arg;
        this.addEvetns();
        this.init();
    }

    //新建并添加到节点
    static Create(_parentNode: Laya.Node, callBack: Function, closeCallBack: Function, ...arg): void {
        let resList = [
            { url: "res/atlas/images/randomReward.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                let nodeView = new HeroLevelView(callBack, arg);
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().subFrameLayer.addChildWithMaskCall(nodeView, () => {
                    closeCallBack && closeCallBack();
                    nodeView.removeSelf();
                });
                nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
            }
        }));
    }

    //初始化
    private init(): void {
        let self = this;
        let oldInfo: MonsterVO = BattleManager.Instance.getMonsterItem(self._arg[0]);
        self.oldHero.skin = "images/carImg/" + oldInfo.imgUrl;
        self.txt_oldLevel.text = (userData.isEvolution() ? oldInfo.id - 1000 : oldInfo.id - 100) + "级";
        let newInfo = BattleManager.Instance.getMonsterItem(self._arg[1]);
        self.newHero.skin = "images/carImg/" + newInfo.imgUrl;
        self.txt_newLevel.text = (userData.isEvolution() ? newInfo.id - 1000 : newInfo.id - 100) + "级";
    }

    private addEvetns(): void {
        let self = this;
        self.btn_level.on(Laya.Event.CLICK, self, self.onHeroLevel);
    }

    private removeEvents(): void {
        let self = this;
        self.btn_level.off(Laya.Event.CLICK, self, self.onHeroLevel);
    }

    /** 英雄升级 */
    private onHeroLevel(): void {
        let self = this;
        if (GlobalConfig.DEBUG) {
            if (self._callback) self._callback();
        } else {
            let adStage = userData.toShareAd(() => {
                if (self._callback) self._callback();
            }, 12);
            //没有广告就走分享
            if (adStage > 0) {
                userData.toShareAd(() => {
                    if (self._callback) self._callback();
                });
            }
        }
        self.removeView();
    }

    private removeView(): void {
        let self = this;
        self.removeSelf();
        self.removeEvents();
    }
}