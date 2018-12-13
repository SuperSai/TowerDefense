var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 通关获得奖励提示框;
*/
var ClearanceRewardView = /** @class */ (function (_super) {
    __extends(ClearanceRewardView, _super);
    function ClearanceRewardView(data, callback) {
        if (data === void 0) { data = null; }
        if (callback === void 0) { callback = null; }
        var _this = _super.call(this) || this;
        _this._data = data;
        _this._callback = callback;
        _this.init();
        return _this;
    }
    //新建并添加到节点
    ClearanceRewardView.Create = function (_parentNode, callback, _removeCallback) {
        if (callback === void 0) { callback = null; }
        if (_removeCallback === void 0) { _removeCallback = null; }
        var arge = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            arge[_i - 3] = arguments[_i];
        }
        var resList = [
            { url: "res/atlas/images.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                var nodeView = new ClearanceRewardView(arge, callback);
                AlignTools.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    };
    //初始化
    ClearanceRewardView.prototype.init = function () {
        var self = this;
        //关卡
        self.txtStage.text = self._data[0] + "";
        //当前奖励物品
        var stagePrizeCfg = getStagePrizeConfig(self._data[0]);
        if (stagePrizeCfg == null) {
            return;
        }
        var bossM = CommonFun.parseStringNum(stagePrizeCfg.bossM);
        var gold = getStagePrizeGold(self._data[0], CommonFun.parseStringNum(stagePrizeCfg.gold));
        var gem = CommonFun.parseStringNum(stagePrizeCfg.gem);
        var itemArray = [
            { img: "images/result_prize_item2.png", value: gold },
            { img: "images/result_prize_item3.png", value: gem },
            { img: "images/result_prize_item4.png", value: bossM }
        ];
        for (var index = 0, len = itemArray.length; index < len; index++) {
            var cfgData = itemArray[index];
            var rewardItem = ObjectPool.pop(RewardItem, "RewardItem");
            rewardItem.create(cfgData.img, cfgData.value);
            self.hbox.addChild(rewardItem);
        }
        self.addEvents();
    };
    ClearanceRewardView.prototype.addEvents = function () {
        var self = this;
        self.btnExit.on(Laya.Event.CLICK, self, self.onCloseHandler);
    };
    ClearanceRewardView.prototype.removeEvents = function () {
        var self = this;
        self.btnExit.off(Laya.Event.CLICK, self, self.onCloseHandler);
    };
    ClearanceRewardView.prototype.onCloseHandler = function () {
        var self = this;
        var rewardItem = self.hbox.getChildAt(0);
        if (rewardItem) {
            var pos = PointTools.localToGlobal(rewardItem);
            LayerManager.getInstance().screenEffectLayer.addChild(new CoinFly().play(pos.x, pos.y));
        }
        else {
            LayerManager.getInstance().screenEffectLayer.addChild(new CoinFly().play(LayerManager.mouseX, LayerManager.mouseY));
        }
        DisplayUtils.removeAllChildren(self.hbox);
        self.removeSelf();
        self.removeEvents();
    };
    return ClearanceRewardView;
}(ui.ClearanceRewardViewUI));
//# sourceMappingURL=ClearanceRewardView.js.map