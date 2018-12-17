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
/*
* 派发类;
*/
var EventsManager = /** @class */ (function (_super) {
    __extends(EventsManager, _super);
    function EventsManager() {
        return _super.call(this) || this;
    }
    Object.defineProperty(EventsManager, "Instance", {
        get: function () {
            if (!EventsManager._instance) {
                EventsManager._instance = new EventsManager();
            }
            return EventsManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return EventsManager;
}(Laya.EventDispatcher));
//# sourceMappingURL=EventsManager.js.map