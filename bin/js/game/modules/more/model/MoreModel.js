class MoreModel extends Laya.EventDispatcher {
    get mute() {
        return this._mute;
    }
    set mute(value) {
        this._mute = value;
        userData.setCache(CacheKey.SOUND_MUTE, this._mute);
    }
    get subscribable() {
        return this._subscribable;
    }
    set subscribable(value) {
        this._subscribable = value;
        this.event(MoreEvent.SUBSCRIBE_STATUS, value);
    }
    get itemList() {
        return this._itemList;
    }
    constructor() {
        super();
        this.init();
    }
    init() {
        this._itemList = [];
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
    }
}
//# sourceMappingURL=MoreModel.js.map