/*
* 英雄升级;
*/
class HeroLevelView extends ui.randomReward.HeroLevelViewUI {
    constructor(callBack, arg) {
        super();
        this._callback = callBack;
        this._arg = arg;
        this.addEvetns();
        this.init();
    }
    //新建并添加到节点
    static Create(_parentNode, callBack, closeCallBack, ...arg) {
        let resList = [
            { url: "res/atlas/images/randomReward.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                let nodeView = new HeroLevelView(callBack, arg);
                nodeView._closeCallback = closeCallBack;
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().subFrameLayer.addChild(nodeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
            }
        }));
    }
    //初始化
    init() {
        let self = this;
        let oldInfo = BattleManager.Instance.getMonsterItem(self._arg[0]);
        self.oldHero.skin = "images/carImg/" + oldInfo.imgUrl;
        self.txt_oldLevel.text = (userData.isEvolution() ? oldInfo.id - 1000 : oldInfo.id - 100) + "级";
        let newInfo = BattleManager.Instance.getMonsterItem(self._arg[1]);
        self.newHero.skin = "images/carImg/" + newInfo.imgUrl;
        self.txt_newLevel.text = (userData.isEvolution() ? newInfo.id - 1000 : newInfo.id - 100) + "级";
    }
    addEvetns() {
        let self = this;
        self.btn_level.on(Laya.Event.CLICK, self, self.onHeroLevel);
        self.btn_exit.on(Laya.Event.CLICK, self, self.onCancelHandler);
    }
    removeEvents() {
        let self = this;
        self.btn_level.off(Laya.Event.CLICK, self, self.onHeroLevel);
        self.btn_exit.off(Laya.Event.CLICK, self, self.onCancelHandler);
    }
    /** 英雄升级 */
    onHeroLevel() {
        let self = this;
        if (GlobalConfig.DEBUG) {
            if (self._callback)
                self._callback();
        }
        else {
            if (Math.random() < 0.5) {
                SDKManager.Instance.showVideoAd((_res) => {
                    if (_res && _res.isEnded || _res === undefined) {
                        if (self._callback)
                            self._callback();
                        self.removeView();
                    }
                }, () => {
                    userData.toShareAd(() => {
                        if (self._callback)
                            self._callback();
                        self.removeView();
                    });
                });
            }
            else {
                userData.toShareAd(() => {
                    if (self._callback)
                        self._callback();
                    self.removeView();
                });
            }
        }
    }
    onCancelHandler() {
        let self = this;
        self._closeCallback && self._closeCallback();
        self.removeSelf();
    }
    removeView() {
        let self = this;
        self.removeSelf();
        self.removeEvents();
    }
}
//# sourceMappingURL=HeroLevelView.js.map