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
* TER0807-公众号奖励;
*/
var OfficialAccountView = /** @class */ (function (_super) {
    __extends(OfficialAccountView, _super);
    function OfficialAccountView() {
        var _this = _super.call(this) || this;
        var that = _this;
        that.frameOnce(5, that, function () {
            that.init();
        });
        return _this;
    }
    //新建并添加到节点
    OfficialAccountView.Create = function (_parentNode, _callback) {
        if (_callback === void 0) { _callback = null; }
        var resList = [
            { url: "res/atlas/images.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                var viewTag = "officialAccountView";
                var nodeViewOld = _parentNode.getChildByName(viewTag);
                if (nodeViewOld) {
                    return;
                }
                var nodeView = new OfficialAccountView();
                nodeView.name = viewTag;
                _parentNode.addChild(nodeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, _callback);
            }
        }));
    };
    //初始化
    OfficialAccountView.prototype.init = function () {
        var that = this;
        //按钮事件
        that.btnExit.on(Laya.Event.CLICK, that, that.onClickExit);
        that.btnGet.on(Laya.Event.CLICK, that, that.onClickGet);
        that.requestOfficialAccData(function (_res) {
            if (that.imgBg && _res && _res.image) {
                that.imgBg.skin = _res.image;
            }
        });
    };
    OfficialAccountView.prototype.onClickExit = function () {
        this.removeSelf();
    };
    OfficialAccountView.prototype.onClickGet = function () {
        var that = this;
        that.requestPrize();
    };
    //拉取奖励
    OfficialAccountView.prototype.requestPrize = function () {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/subscription/rewards',
            success: function (res) {
                console.log("requestPrize", res);
                if (res.code == 1) {
                    CommonFun.showTip("奖励领取成功");
                    userData.requestDiamondData();
                    //移除红点
                    if (userData) {
                        userData.removeFollowRedPoint();
                    }
                }
                else if (res.code == 2) {
                    CommonFun.showTip("未关注公众号");
                }
                else if (res.code == 3) {
                    CommonFun.showTip("奖励已领取");
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    //拉取公众二维码
    OfficialAccountView.prototype.requestOfficialAccData = function (_callback) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
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
    return OfficialAccountView;
}(ui.OfficialAccountUI));
//# sourceMappingURL=OfficialAccountView.js.map