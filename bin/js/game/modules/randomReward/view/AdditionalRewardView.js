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
* 额外奖励界面;
*/
var AdditionalRewardView = /** @class */ (function (_super) {
    __extends(AdditionalRewardView, _super);
    function AdditionalRewardView(data) {
        var _this = _super.call(this) || this;
        _this._data = data;
        _this.addEvetns();
        _this.init();
        return _this;
    }
    //新建并添加到节点
    AdditionalRewardView.Create = function (_parentNode, data) {
        var resList = [
            { url: "res/atlas/images/randomReward.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                var nodeView = new AdditionalRewardView(data);
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeView);
                // nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
            }
        }));
    };
    //初始化
    AdditionalRewardView.prototype.init = function () {
        var self = this;
        self._tween = EffectUtils.objectRotate(self.imgLight);
        self.txt_count.text = "x" + self._data.diamond;
    };
    AdditionalRewardView.prototype.addEvetns = function () {
        var self = this;
        self.btn_get.on(Laya.Event.CLICK, self, self.onGetReward);
    };
    AdditionalRewardView.prototype.removeEvents = function () {
        var self = this;
        self.btn_get.off(Laya.Event.CLICK, self, self.onGetReward);
    };
    /** 领取奖励 */
    AdditionalRewardView.prototype.onGetReward = function () {
        var self = this;
        userData.toShareAd(function () {
            HttpManager.Instance.requestRandomRewardDiamond(self._data.diamond, function (res) {
                self.removeView();
                var point = PointUtils.localToGlobal(self.btn_get);
                M.layer.screenEffectLayer.addChild(new FlyEffect().play("diamond", point.x, point.y, 38, 73));
                EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: userData.diamond = res.total_diamond });
                MessageUtils.showMsgTips("获得钻石:" + self._data.diamond);
            });
        });
    };
    AdditionalRewardView.prototype.removeView = function () {
        var self = this;
        self._tween && (Laya.Tween.clear(self._tween));
        self._tween = null;
        self.removeSelf();
        self.removeEvents();
    };
    return AdditionalRewardView;
}(ui.randomReward.AdditionalRewardViewUI));
//# sourceMappingURL=AdditionalRewardView.js.map