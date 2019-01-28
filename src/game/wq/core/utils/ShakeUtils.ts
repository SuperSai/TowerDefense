/**
 * 震动
 */
class ShakeUtils {

	public constructor() {
	}

	public MAP: number = 0;
	public SPRITE: number = 1;
	private mapPoss: Array<any> = [new Laya.Point(0, 3), new Laya.Point(0, 0), new Laya.Point(0, -2)];
	private spritePoss: Array<any> = [new Laya.Point(5, 0), new Laya.Point(-5, 0), new Laya.Point(5, 0)];
	private _shockPoss: Array<any>;
	private _shockLength: number = 0;
	private _shockCount: number = 0;
	private _target: Laya.View;
	private _rx: number = 0;
	private _ry: number = 0;
	private _type: number = 0;

	private _repeatCount: number = 0;

	public destroy(): void {
		this.stop();
	}

	public shock(type: number = 0, target: Laya.View = null, repeatCount: number = 3): void {
		if (this._target) {
			return;
		}

		this._type = type;
		this._target = target;

		if (this._type == this.MAP) {
			this._shockPoss = this.mapPoss.concat();
			this._shockLength = this._shockPoss.length;
		}
		else if (this._type == this.SPRITE) {
			this._shockPoss = this.spritePoss.concat();
			this._shockLength = this._shockPoss.length;
		}

		this.start(repeatCount);
	}

	private start(num: number = 1): void {
		this.repeatCount = num;
		this._shockCount = 0;
		if (this._target) {
			if (this._type != this.MAP) {
				this._rx = this._target.x;
			}
			this._ry = this._target.y;
			Laya.timer.frameLoop(1, this, this.onShockEnter);
		}
	}

	private stop(): void {
		if (this._target) {
			if (this._type != this.MAP) {
				this._target.x = this._rx;
			}
			this._target.y = this._ry;
			Laya.timer.clear(this, this.onShockEnter);
		}
		this._target = null;
	}

	private onShockEnter(time: number): void {
		var maxCount: number = this._shockLength * this._repeatCount;
		if (this._shockCount >= maxCount) {
			this.stop();
			return;
		}
		var index: number = this._shockCount % this._shockLength;
		var pos: Laya.Point = this._shockPoss[index];
		if (this._target) {
			if (this._type != this.MAP) {
				this._target.x = this._rx + pos.x;
			}
			this._target.y = this._ry + pos.y;
		}
		this._shockCount++;
	}

	public get repeatCount(): number {
		return this._repeatCount;
	}

	public set repeatCount(value: number) {
		this._repeatCount = value;
	}

	private static _instance: ShakeUtils;
	public static get Ins(): ShakeUtils {
		if (!ShakeUtils._instance) {
			ShakeUtils._instance = new ShakeUtils();
		}
		return ShakeUtils._instance;
	}
}