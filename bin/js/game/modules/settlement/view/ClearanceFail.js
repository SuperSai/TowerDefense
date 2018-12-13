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
* 通关失败;
*/
var ClearanceFail = /** @class */ (function (_super) {
    __extends(ClearanceFail, _super);
    function ClearanceFail() {
        var _this = _super.call(this) || this;
        _this.countdown = 3;
        _this.showFailedUI();
        return _this;
    }
    //新建并添加到节点
    ClearanceFail.Create = function (_parentNode, callback, _removeCallback) {
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
                var nodeView = new ClearanceFail();
                nodeView.removeCallback = _removeCallback;
                AlignUtils.setToScreenGoldenPos(nodeView);
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
            }
        }));
    };
    //显示失败界面
    ClearanceFail.prototype.showFailedUI = function () {
        var self = this;
        self.txtTime.changeText('' + self.countdown);
        TimerManager.Instance.doTimer(1000, 0, self.onFailTime, self);
    };
    ClearanceFail.prototype.onFailTime = function () {
        var self = this;
        if (self.countdown > 0) {
            self.countdown--;
        }
        else {
            TimerManager.Instance.remove(self.onFailTime, self);
            self.removeSelf();
        }
        self.txtTime.changeText('' + self.countdown);
    };
    ClearanceFail.prototype.removeView = function () {
        var self = this;
        TimerManager.Instance.remove(self.onFailTime, self);
        this.removeCallback && this.removeCallback();
        self.removeSelf();
    };
    return ClearanceFail;
}(ui.settlement.ClearanceFailUI));
//# sourceMappingURL=ClearanceFail.js.map