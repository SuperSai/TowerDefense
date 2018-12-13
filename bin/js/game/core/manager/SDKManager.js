/*
* SDK;
*/
var SDKManager = /** @class */ (function () {
    function SDKManager() {
    }
    /** 登陆 */
    SDKManager.prototype.login = function (callBack) {
        var self = this;
    };
    Object.defineProperty(SDKManager, "Instance", {
        get: function () {
            if (!SDKManager._instance) {
                SDKManager._instance = new SDKManager();
            }
            return SDKManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return SDKManager;
}());
//# sourceMappingURL=SDKManager.js.map