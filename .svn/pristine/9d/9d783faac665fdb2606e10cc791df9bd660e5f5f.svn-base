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
var TabGroup = /** @class */ (function (_super) {
    __extends(TabGroup, _super);
    function TabGroup(buttons) {
        var _this = _super.call(this) || this;
        _this._selectedIndex = -1;
        _this._buttons = buttons;
        _this.initButtons();
        return _this;
    }
    TabGroup.prototype.initButtons = function () {
        var i = 0;
        var len = this._buttons.length;
        var btn;
        for (i; i < len; i++) {
            btn = this._buttons[i];
            btn.on(Laya.Event.CLICK, this, this.onButtonClick);
        }
    };
    TabGroup.prototype.onButtonClick = function (event) {
        var button = event.target;
        this._selectedIndex = this._buttons.indexOf(button);
        this.updateButtons();
    };
    TabGroup.prototype.updateButtons = function () {
        for (var i = 0; i < this._buttons.length; i++) {
            this._buttons[i].selected = i == this._selectedIndex;
        }
        this.event(Laya.Event.CHANGE, this._selectedIndex);
    };
    Object.defineProperty(TabGroup.prototype, "selectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            if (this._selectedIndex == value)
                return;
            this._selectedIndex = value;
            this.updateButtons();
        },
        enumerable: true,
        configurable: true
    });
    TabGroup.prototype.getButtonByIndex = function (index) {
        if (this._buttons.length > index) {
            return this._buttons[index];
        }
        return null;
    };
    return TabGroup;
}(Laya.EventDispatcher));
//# sourceMappingURL=TabGroup.js.map