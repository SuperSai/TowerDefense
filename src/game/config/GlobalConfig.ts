class GlobalConfig {
    public static get DEBUG():boolean{
        if(Laya.Browser.onPC 
        || Laya.Browser.onFreeman 
        || Laya.Browser.onDavid
        || Laya.Browser.onSong
        || Laya.Browser.onMing
        ){
            return true;
        }
        return false;
    };

    public static get NEW_ACCOUNT():boolean{
        return true;
    }

    public static get USER():string{
        return "DAVID";
        // return "FREEMAN";
        // return null;
    }
}