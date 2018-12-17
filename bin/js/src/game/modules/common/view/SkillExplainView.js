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
* 技能说明界面;
*/
var SkillExplainView = /** @class */ (function (_super) {
    __extends(SkillExplainView, _super);
    function SkillExplainView(data, callback) {
        if (data === void 0) { data = null; }
        if (callback === void 0) { callback = null; }
        var _this = _super.call(this) || this;
        _this._data = data;
        _this._callback = callback;
        _this.init();
        return _this;
    }
    //新建并添加到节点
    SkillExplainView.Create = function (_parentNode, callback, _removeCallback) {
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
                var nodeView = new SkillExplainView(arge, callback);
                AlignUtils.setToScreenGoldenPos(nodeView);
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    };
    //初始化
    SkillExplainView.prototype.init = function () {
        var self = this;
        self.btnExit.offAll(Laya.Event.CLICK);
        self.btnExit.on(Laya.Event.CLICK, self, self.onClickClose);
    };
    SkillExplainView.prototype.onClickClose = function () {
        this.removeSelf();
    };
    return SkillExplainView;
}(ui.common.view.SkillExplainViewUI));
//# sourceMappingURL=SkillExplainView.js.map