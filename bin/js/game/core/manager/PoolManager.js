class PoolManager {
    static getInstance() {
        if (!this._instance) {
            this._instance = new PoolManager();
        }
        return this._instance;
    }
    constructor() {
        this._instances = new TSDictionary();
    }
    get(classDefinition, name) {
        if (!name) {
            name = classDefinition.__className;
        }
        let instances = this._instances.TryGetValue(name);
        if (!instances) {
            instances = [];
            this._instances.SetDicValue(name, instances);
        }
        if (instances.length > 0) {
            return instances.pop();
        }
        return new classDefinition();
    }
    return(instance, name) {
        if (!name) {
            name = instance.__proto__.__className;
        }
        let instances = this._instances.TryGetValue(name);
        if (!instances) {
            instances = [];
            this._instances.SetDicValue(name, instances);
        }
        instances.push(instance);
        return instance;
    }
}
//# sourceMappingURL=PoolManager.js.map