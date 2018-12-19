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
* 奖励领取界面;
*/
var RewardGetView = /** @class */ (function (_super) {
    __extends(RewardGetView, _super);
    function RewardGetView(values, items) {
        var _this = _super.call(this) || this;
        _this._items = [1, 2];
        _this._values = values;
        _this._items = items;
        _this.init();
        return _this;
    }
    //新建并添加到节点
    RewardGetView.Create = function (_parentNode, callback, values, items) {
        if (callback === void 0) { callback = null; }
        if (items === void 0) { items = [1, 2]; }
        var resList = [
            { url: "res/atlas/images.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                var nodeView_1 = new RewardGetView(values, items);
                AlignUtils.setToScreenGoldenPos(nodeView_1);
                LayerManager.getInstance().subFrameLayer.addChildWithMaskCall(nodeView_1, nodeView_1.removeSelf);
                nodeView_1.once(Laya.Event.REMOVED, nodeView_1, function () {
                    callback && callback();
                    nodeView_1.removeView();
                });
            }
        }));
    };
    //初始化
    RewardGetView.prototype.init = function () {
        var self = this;
        self._tween = EffectUtils.objectRotate(self.imgLight);
        for (var index = 0, len = this._values.length; index < len; index++) {
            var price = this._values[index];
            var itemInfo = GlobleData.getData(GlobleData.ItemVO, self._items[index]);
            var rewardItem = ObjectPool.pop(RewardItem, "RewardItem");
            var url = PathConfig.ItemUrl.replace("{0}", itemInfo.bigIcon);
            rewardItem.create(url, price);
            self.hbox.addChild(rewardItem);
        }
        self.hbox.refresh();
        self.addEvents();
    };
    RewardGetView.prototype.addEvents = function () {
        var self = this;
        self.btn_get.on(Laya.Event.CLICK, self, self.removeSelf);
    };
    RewardGetView.prototype.removeEvents = function () {
        var self = this;
        self.btn_get.off(Laya.Event.CLICK, self, self.removeSelf);
    };
    RewardGetView.prototype.removeView = function () {
        var self = this;
        self._tween && (Laya.Tween.clear(self._tween));
        self._tween = null;
        self.removeSelf();
        self.removeEvents();
    };
    return RewardGetView;
}(ui.common.view.RewardGetViewUI));
//# sourceMappingURL=RewardGetView.js.map