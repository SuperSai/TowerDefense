var DisplayTools = /** @class */ (function () {
    function DisplayTools() {
    }
    DisplayTools.mouseEnabled = function (display, value) {
        display.mouseEnabled = value;
        if (display.numChildren > 0) {
            for (var _i = 0, _a = display._childs; _i < _a.length; _i++) {
                var child = _a[_i];
                this.mouseEnabled(child, value);
            }
        }
    };
    return DisplayTools;
}());
//# sourceMappingURL=DisplayTools.js.map