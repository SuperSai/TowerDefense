var NoviceGuide = /** @class */ (function () {
    function NoviceGuide() {
    }
    NoviceGuide.getSheetByIndex = function (index) { return NoviceGuide.dataArr[index]; };
    NoviceGuide.getSheetById = function (id) { return NoviceGuide.dataObj[id]; };
    NoviceGuide.getSheetByFieldValue = function (fieldName, value) { var result = []; for (var _i = 0, _a = NoviceGuide.dataArr; _i < _a.length; _i++) {
        var sheet = _a[_i];
        if (typeof value === 'string') {
            if (sheet[fieldName].trim() === value) {
                result.push(sheet);
            }
        }
        else {
            if (sheet[fieldName] === value) {
                result.push(sheet);
            }
        }
    } if (result.length === 1) {
        return result.pop();
    }
    else {
        return result;
    } }; /** undefined */
    NoviceGuide.dataArr = [];
    NoviceGuide.dataObj = {};
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
        sheetClass.dataArr = sheet.data;
        var sheetLen = sheet.data.length;
        for (var i = 0; i < sheetLen; i++) {
            sheetClass.dataObj[sheet.data[i].id] = sheet.data[i];
        }
    } };
    return Sheet;
}()); // prettier-ignore
//# sourceMappingURL=Sheet.js.map