var NoviceGuide = /** @class */ (function () {
    function NoviceGuide() {
    }
    NoviceGuide.getSheetByIndex = function (index) { return NoviceGuide.dataArr[index]; };
    NoviceGuide.getSheetById = function (id) { return NoviceGuide.dataObj[id]; };
    NoviceGuide.getSheetByFieldValue = function (fieldName, value) { var result = []; for (var _i = 0, _a = NoviceGuide.dataArr; _i < _a.length; _i++) {
        var sheet = _a[_i];
        if (typeof value === 'string') {
            if (sheet[this._keys[fieldName]].trim() === value) {
                result.push(sheet);
            }
        }
        else {
            if (sheet[this._keys[fieldName]] === value) {
                result.push(sheet);
            }
        }
    } if (result.length === 1) {
        return result.pop();
    }
    else {
        return result;
    } };
    NoviceGuide.initData = function (data) { var sheetLen = data.length; for (var i = 0; i < sheetLen; i++) {
        NoviceGuide.dataArr[i] = new NoviceGuide();
        for (var _i = 0, _a = Object.keys(this._keys); _i < _a.length; _i++) {
            var key = _a[_i];
            NoviceGuide.dataArr[i][key] = data[i][this._keys[key]];
        }
        NoviceGuide.dataObj[data[i][this._keys.id]] = NoviceGuide.dataArr[i];
    } };
    Object.defineProperty(NoviceGuide.prototype, "id", {
        get: function () { return this.b; },
        set: function (value) { this.b = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceGuide.prototype, "groupId", {
        get: function () { return this.c; },
        set: function (value) { this.c = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceGuide.prototype, "stepId", {
        get: function () { return this.d; },
        set: function (value) { this.d = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceGuide.prototype, "completed", {
        get: function () { return this.e; },
        set: function (value) { this.e = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceGuide.prototype, "type", {
        get: function () { return this.f; },
        set: function (value) { this.f = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceGuide.prototype, "activateType", {
        get: function () { return this.g; },
        set: function (value) { this.g = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceGuide.prototype, "activateValue", {
        get: function () { return this.h; },
        set: function (value) { this.h = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceGuide.prototype, "eventName", {
        get: function () { return this.i; },
        set: function (value) { this.i = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceGuide.prototype, "eventParam", {
        get: function () { return this.j; },
        set: function (value) { this.j = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceGuide.prototype, "position", {
        get: function () { return this.k; },
        set: function (value) { this.k = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceGuide.prototype, "interactPosition", {
        get: function () { return this.l; },
        set: function (value) { this.l = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceGuide.prototype, "fingerPosition", {
        get: function () { return this.m; },
        set: function (value) { this.m = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceGuide.prototype, "specialInteractArea", {
        get: function () { return this.n; },
        set: function (value) { this.n = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceGuide.prototype, "script", {
        get: function () { return this.o; },
        set: function (value) { this.o = value; },
        enumerable: true,
        configurable: true
    });
    NoviceGuide.dataArr = [];
    NoviceGuide.dataObj = {};
    NoviceGuide._keys = { id: "b", groupId: "c", stepId: "d", completed: "e", type: "f", activateType: "g", activateValue: "h", eventName: "i", eventParam: "j", position: "k", interactPosition: "l", fingerPosition: "m", specialInteractArea: "n", script: "o" };
    return NoviceGuide;
}()); // prettier-ignore
var Sheet = /** @class */ (function () {
    function Sheet() {
    }
    Sheet.initSheets = function (data) { var classInstance = { NoviceGuide: NoviceGuide }; for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var sheet = data_1[_i];
        var sheetClass = classInstance[sheet.sheetName];
        if (!sheetClass) {
            console.error('找不到表{', sheet.sheetName + '}');
            continue;
        }
        sheetClass.initData(sheet.data);
    } };
    return Sheet;
}()); // prettier-ignore
//# sourceMappingURL=Sheet.js.map