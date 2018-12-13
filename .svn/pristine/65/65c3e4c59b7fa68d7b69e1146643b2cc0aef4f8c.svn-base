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
var DebugView = /** @class */ (function (_super) {
    __extends(DebugView, _super);
    function DebugView() {
        var _this = _super.call(this) || this;
        _this.mouseThrough = true;
        _this.ui = new ui.common.view.DebugViewUI();
        _this.addChild(_this.ui);
        Laya.timer.once(3000, _this, function () {
            _this.ui.btnUid.label = "UID: " + userData.userId;
        });
        _this.ui.btnUid.on(Laya.Event.CLICK, _this, function () {
            _this.ui.btnUid.label = "UID: " + userData.userId;
            console.log("@FREEMAN: UserData =>", userData);
            Laya.Browser.onFreeman = !Laya.Browser.onFreeman;
            Laya.Browser.onDavid = !Laya.Browser.onDavid;
            HttpManager.Instance.requestUserinfoData(null);
        });
        var b = 0;
        _this.ui.btnShowStats.on(Laya.Event.CLICK, _this, function () {
            b ^= 1;
            b && Laya.Stat.show(LayerManager.left, LayerManager.top);
            !b && Laya.Stat.hide();
        });
        _this.ui.btnCompleteNovice.on(Laya.Event.CLICK, _this, function () {
            M.novice.complete();
        });
        _this.ui.btnResetKingLevel.on(Laya.Event.CLICK, _this, function () {
            DebugView.GameView.setKingLevel(1);
        });
        _this.ui.btnAddGold.on(Laya.Event.CLICK, _this, function () {
            EventsManager.Instance.event(EventsType.GLOD_CHANGE, { money: userData.gold += 9000000000000 });
        });
        _this.ui.btnAddDiamond.on(Laya.Event.CLICK, _this, function () {
            EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: userData.diamond += 1000 });
        });
        _this.ui.btnCrearStorage.on(Laya.Event.CLICK, _this, function () {
            userData.clearLocalData();
            Laya.stage.renderingEnabled = false;
            Laya.timer.clearAll(DebugView.GameView);
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window.wx.exitMiniProgram();
            }
        });
        _this.ui.btnExitGame.on(Laya.Event.CLICK, _this, function () {
            if (Laya.Browser.onMiniGame) {
                Laya.Browser.window.wx.exitMiniProgram();
            }
        });
        _this.ui.viewStackArrow.selectedIndex = 0;
        _this.ui.viewStackArrow._childs.forEach(function (child, index, children) {
            child.on(Laya.Event.CLICK, _this, function () {
                _this.ui.viewStackArrow.selectedIndex ^= 1;
                Laya.Tween.clearAll(_this.ui.viewBtnContainer);
                if (_this.ui.viewStackArrow.selectedIndex) {
                    Laya.Tween.to(_this.ui.viewBtnContainer, { x: 180 }, 500, Laya.Ease.quadOut);
                }
                else {
                    Laya.Tween.to(_this.ui.viewBtnContainer, { x: 0 }, 500, Laya.Ease.quadOut);
                }
            });
        });
        return _this;
    }
    DebugView.prototype.hide = function () {
    };
    return DebugView;
}(Laya.View));
//# sourceMappingURL=DebugView.js.map