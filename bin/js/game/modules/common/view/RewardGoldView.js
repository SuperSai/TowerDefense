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
* 金币不足奖励提示框;
*/
var RewardGoldView = /** @class */ (function (_super) {
    __extends(RewardGoldView, _super);
    function RewardGoldView(data, callback) {
        if (data === void 0) { data = null; }
        if (callback === void 0) { callback = null; }
        var _this = _super.call(this) || this;
        _this._data = data;
        _this._callback = callback;
        _this.init();
        return _this;
    }
    //新建并添加到节点
    RewardGoldView.Create = function (_parentNode, callback, _removeCallback) {
        if (callback === void 0) { callback = null; }
        if (_removeCallback === void 0) { _removeCallback = null; }
        var arge = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            arge[_i - 3] = arguments[_i];
        }
        var resList = [
            { url: "res/atlas/images/rewardGold.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                var nodeView = new RewardGoldView(arge, callback);
                AlignUtils.setToScreenGoldenPos(nodeView);
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    };
    //初始化
    RewardGoldView.prototype.init = function () {
        var self = this;
        self.txt_share.visible = PlayerManager.Instance.Info.dayGetGoldCount != 6 && PlayerManager.Instance.Info.dayGetGoldCount != 2;
        self.advBox.visible = !self.txt_share.visible;
        self.txt_lastCount.text = "今天剩余" + PlayerManager.Instance.Info.dayGetGoldCount + "次";
        var monsterType = userData.isEvolution() ? 2 : 1;
        var monsterLevel = userData.getCarLevel();
        var monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, monsterLevel);
        if (monsterInfo) {
            var curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
            self._money = curPrice * 0.8;
        }
        else {
            console.log("精灵不存在");
        }
        self.txt_gold.text = MathUtils.bytesToSize(self._money);
        self.addEvents();
    };
    RewardGoldView.prototype.addEvents = function () {
        var self = this;
        self.btn_free.on(Laya.Event.CLICK, self, self.onClickBtn);
        self.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    };
    RewardGoldView.prototype.removeEvents = function () {
        var self = this;
        self.btn_free.off(Laya.Event.CLICK, self, self.onClickBtn);
        self.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    };
    RewardGoldView.prototype.onClickBtn = function () {
        var self = this;
        if (GlobalConfig.DEBUG) {
            if (self._callback)
                self._callback(self._money);
        }
        else {
            if (self.txt_share.visible) {
                userData.toShareAd(function () {
                    if (self._callback)
                        self._callback(self._money);
                });
            }
            else if (self.advBox.visible) {
                var adStage = userData.toShareAd(function () {
                    if (self._callback)
                        self._callback(self._money);
                }, 1);
                //没有广告就走分享
                if (adStage > 0) {
                    CommonFun.showTip("广告看完了");
                    userData.toShareAd(function () {
                        if (self._callback)
                            self._callback(self._money);
                    });
                }
            }
        }
        self.onCloseHandler();
    };
    RewardGoldView.prototype.onCloseHandler = function () {
        var self = this;
        self.removeSelf();
        self.removeEvents();
    };
    return RewardGoldView;
}(ui.common.view.RewardGoldViewUI));
//# sourceMappingURL=RewardGoldView.js.map