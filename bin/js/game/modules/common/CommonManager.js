/*
* name;
*/
class CommonManager {
    constructor() {
    }
    static get Instance() {
        if (!CommonManager._instance) {
            CommonManager._instance = new CommonManager();
        }
        return CommonManager._instance;
    }
}
var DILOG_TYPE;
(function (DILOG_TYPE) {
    /** 英雄 */
    DILOG_TYPE[DILOG_TYPE["PET"] = 0] = "PET";
    /** 加速 */
    DILOG_TYPE[DILOG_TYPE["ACC"] = 1] = "ACC";
})(DILOG_TYPE || (DILOG_TYPE = {}));
//# sourceMappingURL=CommonManager.js.map