/*
* name;
*/
var CommonManager = /** @class */ (function () {
    function CommonManager() {
    }
    Object.defineProperty(CommonManager, "Instance", {
        get: function () {
            if (!CommonManager._instance) {
                CommonManager._instance = new CommonManager();
            }
            return CommonManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return CommonManager;
}());
var DILOG_TYPE;
(function (DILOG_TYPE) {
    /** 英雄 */
    DILOG_TYPE[DILOG_TYPE["PET"] = 0] = "PET";
    /** 加速 */
    DILOG_TYPE[DILOG_TYPE["ACC"] = 1] = "ACC";
})(DILOG_TYPE || (DILOG_TYPE = {}));
//# sourceMappingURL=CommonManager.js.map