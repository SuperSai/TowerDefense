class MoreModel extends Laya.EventDispatcher{

    public static MUSIC_MUTE_KEY:string = "music_mute";

    public get mute():boolean{
        return this._mute;
    }

    public set mute(value:boolean){
        this._mute = value;
        const storage = window.localStorage;
        if(storage){
            storage.setItem(MoreModel.MUSIC_MUTE_KEY, JSON.stringify(this._mute));
        }
    }

    public get itemList():MoreViewListItemVO[]{
        return this._itemList;
    }

    private _mute:boolean;

    private _itemList:MoreViewListItemVO[];

    constructor(){
        super();
        this.init();
    }

    private init():void{
        const storage = window.localStorage;
        if(storage){
            const musicMute:string = storage.getItem(MoreModel.MUSIC_MUTE_KEY);
            if(musicMute){
                this._mute = JSON.parse(musicMute);
            }
        }

        this._itemList = [];
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
    }
}