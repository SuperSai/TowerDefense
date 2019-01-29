/*
* 英雄升级;
*/
class HeroLevelView extends ui.randomReward.HeroLevelViewUI {

    private _callback: Function;
    private _closeCallback: Function;
    private _arg: any[];

    constructor(callBack: Function, arg: any[]) {
        super();
        this._callback = callBack;
        this._arg = arg;
        this.addEvents();
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
                nodeView.btn_exit.visible = false;
                nodeView._closeCallback = closeCallBack;
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().subFrameLayer.addChild(nodeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
            }
        }));
    }

    //初始化
    private init(): void {
        let self = this;
        let oldInfo: MonsterVO = BattleManager.Instance.getMonsterItem(self._arg[0]);
        self.oldHero.skin = "images/carImg/" + oldInfo.imgUrl;
        self.txt_oldLevel.text = oldInfo.name + " Lv" + (userData.isEvolution() ? oldInfo.id - 1000 : oldInfo.id - 100);
        let newInfo = BattleManager.Instance.getMonsterItem(self._arg[1]);
        self.newHero.skin = "images/carImg/" + newInfo.imgUrl;
        self.txt_newLevel.text = newInfo.name + " Lv" + (userData.isEvolution() ? newInfo.id - 1000 : newInfo.id - 100);
        this.timerOnce(2000, this, () => {
            this.btn_exit.visible = true;
        })
    }

    private addEvents(): void {
        let self = this;
        self.btn_level.on(Laya.Event.CLICK, self, self.onHeroLevel);
        self.btn_exit.on(Laya.Event.CLICK, self, self.onCancelHandler);
    }

    private removeEvents(): void {
        let self = this;
        self.btn_level.off(Laya.Event.CLICK, self, self.onHeroLevel);
        self.btn_exit.off(Laya.Event.CLICK, self, self.onCancelHandler);
    }

    /** 英雄升级 */
    private onHeroLevel(): void {
        let self = this;
        if (GlobalConfig.DEBUG) {
            if (self._callback) self._callback();
            self.removeView();
        } else {
            // if (Math.random() < 0.5) {
            //     SDKManager.Instance.showVideoAd((_res: any) => {
            //         if (_res && _res.isEnded || _res === undefined) {
            //             if (self._callback) self._callback();
            //             self.removeView();
            //         }
            //     }, () => {
            //         userData.toShareAd(() => {
            //             if (self._callback) self._callback();
            //             self.removeView();
            //         });
            //     });
            // } else {
            //     userData.toShareAd(() => {
            //         if (self._callback) self._callback();
            //         self.removeView();
            //     });
            // }
            userData.toShareAd(() => {
                if (self._callback) self._callback();
                self.removeView();
            });
        }
    }

    private onCancelHandler(): void {
        let self = this;
        self._closeCallback && self._closeCallback();
        self.removeSelf();
    }

    private removeView(): void {
        let self = this;
        self.removeSelf();
        self.removeEvents();
    }
}