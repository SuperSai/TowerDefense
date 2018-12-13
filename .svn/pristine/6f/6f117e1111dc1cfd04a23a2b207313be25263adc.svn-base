var PoolManager = /** @class */ (function () {
    function PoolManager() {
        this._instances = new Map();
    }
    PoolManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new PoolManager();
        }
        return this._instance;
    };
    PoolManager.prototype.get = function (classDefinition, name) {
        if (!name) {
            name = classDefinition.__className;
        }
        var instances = this._instances.get(name);
        if (!instances) {
            instances = [];
            this._instances.set(name, instances);
        }
        if (instances.length > 0) {
            return instances.pop();
        }
        return new classDefinition();
    };
    PoolManager.prototype.return = function (instance, name) {
        if (!name) {
            name = instance.__proto__.__className;
        }
        var instances = this._instances.get(name);
        if (!instances) {
            instances = [];
            this._instances.set(name, instances);
        }
        instances.push(instance);
        return instance;
    };
    return PoolManager;
}());
//# sourceMappingURL=PoolManager.js.map