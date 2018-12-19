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
    function AdditionalRewardView() {
        var _this = _super.call(this) || this;
        _this.addEvetns();
        _this.init();
        return _this;
    }
    //新建并添加到节点
    AdditionalRewardView.Create = function (_parentNode) {
        var resList = [
            { url: "res/atlas/images/randomReward.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                var nodeView = new AdditionalRewardView();
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
            }
        }));
    };
    //初始化
    AdditionalRewardView.prototype.init = function () {
        var self = this;
        self.txt_count.text = RandomUtils.rangeInt(5, 20) + "";
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
            self.requestReward(1, function (_res) {
                if (_res) {
                    if (_res.code === 1) {
                        MessageUtils.showMsgTips("奖励领取成功");
                        self.removeView();
                    }
                    else if (_res.code === 2) {
                        MessageUtils.showMsgTips("领取失败！");
                    }
                }
            });
        });
    };
    AdditionalRewardView.prototype.requestReward = function (itemId, callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/task/rewards/' + itemId,
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    AdditionalRewardView.prototype.removeView = function () {
        var self = this;
        self.removeSelf();
        self.removeEvents();
    };
    return AdditionalRewardView;
}(ui.randomReward.AdditionalRewardViewUI));
//# sourceMappingURL=AdditionalRewardView.js.map