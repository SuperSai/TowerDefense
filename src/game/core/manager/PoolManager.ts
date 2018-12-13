class PoolManager {
	public static getInstance(): PoolManager {
		if (!this._instance) {
			this._instance = new PoolManager();
		}
		return this._instance;
	}

	private static _instance: PoolManager;

	private _instances: TSDictionary<string, any[]>;

	constructor() {
		this._instances = new TSDictionary<string, any[]>();
	}

	public get(classDefinition: any, name?: string): any {
		if (!name) {
			name = classDefinition.__className;
		}
		let instances: any[] = this._instances.TryGetValue(name);
		if (!instances) {
			instances = [];
			this._instances.SetDicValue(name, instances);
		}

		if (instances.length > 0) {
			return instances.pop();
		}

		return new classDefinition();
	}

	public return(instance: any, name?: string): any {
		if (!name) {
			name = instance.__proto__.__className;
		}
		let instances: any[] = this._instances.TryGetValue(name);
		if (!instances) {
			instances = [];
			this._instances.SetDicValue(name, instances);
		}
		instances.push(instance);
		return instance;
	}
}
