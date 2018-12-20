var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 英雄升级;
*/
var HeroLevelView = /** @class */ (function (_super) {
    __extends(HeroLevelView, _super);
    function HeroLevelView(callBack, arg) {
        var _this = _super.call(this) || this;
        _this._callback = callBack;
        _this._arg = arg;
        _this.addEvetns();
        _this.init();
        return _this;
    }
    //新建并添加到节点
    HeroLevelView.Create = function (_parentNode, callBack, closeCallBack) {
        var arg = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            arg[_i - 3] = arguments[_i];
        }
        var resList = [
            { url: "res/atlas/images/randomReward.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                var nodeView_1 = new HeroLevelView(callBack, arg);
                AlignUtils.setToScreenGoldenPos(nodeView_1);
                LayerManager.getInstance().subFrameLayer.addChildWithMaskCall(nodeView_1, function () {
                    closeCallBack && closeCallBack();
                    nodeView_1.removeSelf();
                });
                nodeView_1.once(Laya.Event.REMOVED, nodeView_1, nodeView_1.removeView);
            }
        }));
    };
    //初始化
    HeroLevelView.prototype.init = function () {
        var self = this;
        var oldInfo = BattleManager.Instance.getMonsterItem(self._arg[0]);
        self.oldHero.skin = "images/carImg/" + oldInfo.imgUrl;
        self.txt_oldLevel.text = (userData.isEvolution() ? oldInfo.id - 1000 : oldInfo.id - 100) + "级";
        var newInfo = BattleManager.Instance.getMonsterItem(self._arg[1]);
        self.newHero.skin = "images/carImg/" + newInfo.imgUrl;
        self.txt_newLevel.text = (userData.isEvolution() ? newInfo.id - 1000 : newInfo.id - 100) + "级";
    };
    HeroLevelView.prototype.addEvetns = function () {
        var self = this;
        self.btn_level.on(Laya.Event.CLICK, self, self.onHeroLevel);
    };
    HeroLevelView.prototype.removeEvents = function () {
        var self = this;
        self.btn_level.off(Laya.Event.CLICK, self, self.onHeroLevel);
    };
    /** 英雄升级 */
    HeroLevelView.prototype.onHeroLevel = function () {
        var self = this;
        if (GlobalConfig.DEBUG) {
            if (self._callback)
                self._callback();
        }
        else {
            if (Math.random() < 0.5) {
                SDKManager.Instance.showVideoAd(function (_res) {
                    if (_res && _res.isEnded || _res === undefined) {
                        if (self._callback)
                            self._callback();
                        self.removeView();
                    }
                }, function () {
                    userData.toShareAd(function () {
                        if (self._callback)
                            self._callback();
                        self.removeView();
                    });
                });
            }
            else {
                userData.toShareAd(function () {
                    if (self._callback)
                        self._callback();
                    self.removeView();
                });
            }
        }
    };
    HeroLevelView.prototype.removeView = function () {
        var self = this;
        self.removeSelf();
        self.removeEvents();
    };
    return HeroLevelView;
}(ui.randomReward.HeroLevelViewUI));
//# sourceMappingURL=HeroLevelView.js.map