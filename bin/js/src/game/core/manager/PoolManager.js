var PoolManager = /** @class */ (function () {
    function PoolManager() {
        this._instances = new TSDictionary();
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
        var instances = this._instances.TryGetValue(name);
        if (!instances) {
            instances = [];
            this._instances.SetDicValue(name, instances);
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
        var instances = this._instances.TryGetValue(name);
        if (!instances) {
            instances = [];
            this._instances.SetDicValue(name, instances);
        }
        instances.push(instance);
        return instance;
    };
    return PoolManager;
}());
//# sourceMappingURL=PoolManager.js.map