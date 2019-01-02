class MoreModel extends Laya.EventDispatcher{

    public get mute():boolean{
        return this._mute;
    }

    public set mute(value:boolean){
        this._mute = value;
        userData.cache.setCache(CacheKey.SOUND_MUTE, this._mute);
    }
    public get subscribable():boolean{
        return this._subscribable;
    }

    public set subscribable(value:boolean){
        this._subscribable = value;
    }

    public get itemList():MoreViewListItemVO[]{
        return this._itemList;
    }

    private _mute:boolean;
    private _subscribable:boolean;

    private _itemList:MoreViewListItemVO[];

    constructor(){
        super();
        this.init();
    }

    private init():void{
        this._itemList = [];
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
    }
}