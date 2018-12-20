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
* 关注奖励;
*/
var FollowRewardView = /** @class */ (function (_super) {
    __extends(FollowRewardView, _super);
    function FollowRewardView() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    //新建并添加到节点
    FollowRewardView.Create = function (_parentNode, callback, _removeCallback) {
        if (callback === void 0) { callback = null; }
        if (_removeCallback === void 0) { _removeCallback = null; }
        var arge = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            arge[_i - 3] = arguments[_i];
        }
        var resList = [
            { url: "res/atlas/images/followReward.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                var nodeView = new FollowRewardView();
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().frameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    };
    //初始化
    FollowRewardView.prototype.init = function () {
        var that = this;
        //按钮事件
        that.btnExit.on(Laya.Event.CLICK, that, that.onClickExit);
        that.btnGet.on(Laya.Event.CLICK, that, that.onClickGet);
        that.requestOfficialAccData(function (_res) {
            if (that.imgBg && _res && _res.image && (_res.image.indexOf(".png") || _res.image.indexOf(".jpg"))) {
                that.imgBg.skin = _res.image;
            }
        });
    };
    FollowRewardView.prototype.onClickExit = function () {
        this.removeSelf();
    };
    FollowRewardView.prototype.onClickGet = function () {
        var that = this;
        that.requestPrize();
    };
    //拉取奖励
    FollowRewardView.prototype.requestPrize = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/subscription/rewards',
            success: function (res) {
                console.log("requestPrize", res);
                if (res.code == 1) {
                    MessageUtils.showMsgTips("奖励领取成功");
                    HttpManager.Instance.requestDiamondData();
                    //移除红点
                    if (userData) {
                        userData.removeFollowRedPoint();
                    }
                }
                else if (res.code == 2) {
                    MessageUtils.showMsgTips("未关注公众号");
                }
                else if (res.code == 3) {
                    MessageUtils.showMsgTips("奖励已领取");
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //拉取公众二维码
    FollowRewardView.prototype.requestOfficialAccData = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/subscription/get_info',
            success: function (res) {
                console.log("requestOfficialAccData", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    return FollowRewardView;
}(ui.follow.FollowRewardViewUI));
//# sourceMappingURL=FollowRewardView.js.map