class MoreModel extends Laya.EventDispatcher {
    get mute() {
        return this._mute;
    }
    set mute(value) {
        this._mute = value;
        userData.cache.setCache(CacheKey.SOUND_MUTE, this._mute);
    }
    get subscribable() {
        return this._subscribable;
    }
    set subscribable(value) {
        this._subscribable = value;
    }
    constructor() {
        super();
        this.init();
    }
    init() {
    }
}
//# sourceMappingURL=MoreModel.js.map