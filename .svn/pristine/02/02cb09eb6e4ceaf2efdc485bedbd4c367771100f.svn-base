class NoviceGuide {
    static getSheetByIndex(index) { return NoviceGuide.dataArr[index]; }
    static getSheetById(id) { return NoviceGuide.dataObj[id]; }
    static getSheetByFieldValue(fieldName, value) { const result = []; for (const sheet of NoviceGuide.dataArr) {
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
    } }
    static initData(data) { const sheetLen = data.length; for (let i = 0; i < sheetLen; i++) {
        NoviceGuide.dataArr[i] = new NoviceGuide();
        for (const key of Object.keys(this._keys)) {
            NoviceGuide.dataArr[i][key] = data[i][this._keys[key]];
        }
        NoviceGuide.dataObj[data[i][this._keys.id]] = NoviceGuide.dataArr[i];
    } }
    get id() { return this.b; }
    set id(value) { this.b = value; }
    get groupId() { return this.c; }
    set groupId(value) { this.c = value; }
    get stepId() { return this.d; }
    set stepId(value) { this.d = value; }
    get completed() { return this.e; }
    set completed(value) { this.e = value; }
    get type() { return this.f; }
    set type(value) { this.f = value; }
    get activateType() { return this.g; }
    set activateType(value) { this.g = value; }
    get activateValue() { return this.h; }
    set activateValue(value) { this.h = value; }
    get eventName() { return this.i; }
    set eventName(value) { this.i = value; }
    get eventParam() { return this.j; }
    set eventParam(value) { this.j = value; }
    get position() { return this.k; }
    set position(value) { this.k = value; }
    get interactPosition() { return this.l; }
    set interactPosition(value) { this.l = value; }
    get fingerPosition() { return this.m; }
    set fingerPosition(value) { this.m = value; }
    get specialInteractArea() { return this.n; }
    set specialInteractArea(value) { this.n = value; }
    get skipPos() { return this.o; }
    set skipPos(value) { this.o = value; }
    get script() { return this.p; }
    set script(value) { this.p = value; }
} // prettier-ignore
NoviceGuide.dataArr = [];
NoviceGuide.dataObj = {};
NoviceGuide._keys = { id: "b", groupId: "c", stepId: "d", completed: "e", type: "f", activateType: "g", activateValue: "h", eventName: "i", eventParam: "j", position: "k", interactPosition: "l", fingerPosition: "m", specialInteractArea: "n", skipPos: "o", script: "p" };
class Sheet {
    static initSheets(data) { const classInstance = { NoviceGuide }; for (const sheet of data) {
        const sheetClass = classInstance[sheet.sheetName];
        if (!sheetClass) {
            console.error('找不到表{', sheet.sheetName + '}');
            continue;
        }
        sheetClass.initData(sheet.data);
    } }
} // prettier-ignore
//# sourceMappingURL=Sheet.js.map