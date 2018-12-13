/*
* Manager初始化类
*/
var GameEnterManager = /** @class */ (function () {
    function GameEnterManager() {
    }
    GameEnterManager.prototype.init = function () {
        HallManager.Instance.setup();
        PlayerManager.Instance.setup();
    };
    Object.defineProperty(GameEnterManager, "Instance", {
        get: function () {
            if (!GameEnterManager._instance) {
                GameEnterManager._instance = new GameEnterManager();
            }
            return GameEnterManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return GameEnterManager;
}());
//# sourceMappingURL=GameEnterManager.js.map