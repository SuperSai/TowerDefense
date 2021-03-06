class CacheObject {

    private _key:string;
    private _cache:any;
    private _waitingCaches:any;

    constructor(key:string = "FREEMAN") {
        this._key = key;
        this._cache = {};
        this._waitingCaches = {};
    }

    public setCacheKey(key:string):CacheObject{
        this._key = key;
        return this;
    }

    public startCacheThread(interval:number = Time.SEC_IN_MILI):void{
        Laya.timer.loop(interval, this, this.__save);
    }

    public setCache(key: string, value: any): void {
        this._waitingCaches[key] = value;
        Laya.timer.callLater(this, this.__save);
    }

    public setCacheGroup(cacheObj:any){
        for(let key in cacheObj){
            this._waitingCaches[key] = cacheObj[key];
        }
        Laya.timer.callLater(this, this.__save);
    }

    public getCache(key: string): any {
        if(this._waitingCaches.hasOwnProperty(key)){
            return this._waitingCaches[key];
        }
        return this._cache[key];
    }

    public removeCache(key: string):void{
        delete this._cache[key];
    }

    public hasCache(key: string):boolean{
        if(this._waitingCaches.hasOwnProperty(key)){
            return true;
        }
        return this._cache.hasOwnProperty(key);
    }

    public loadCache(success?:Laya.Handler, fail?:Laya.Handler):void{
        let storage = window.localStorage;
        let b:boolean;
        if (storage) {
            let jsonStr: string = storage.getItem(this._key);
            if(jsonStr){
                if (jsonStr) {
                    let cache = JSON.parse(jsonStr);
                    if(cache){
                        b = true;
                        this._cache = cache;
                        success && success.runWith(this);
                    }
                }
            }
        }

        if(!b){
            fail && fail.run();
            console.log("@FREEMAN: 缓存数据为空或有异常，缓存：{ " + this._key + " }");
        }
    }

    public clearCache(): void {
        this._cache = {};
        this._waitingCaches = {};
        let storage = window.localStorage;
        if (storage) {
            storage.removeItem(this._key);
            console.log("@FREEMAN: 本地缓存{" + this._key + "}已清除。");
        }
    }

    private __save():void{
        if(Object.keys(this._waitingCaches).length) {

            for(let key in this._waitingCaches){
                this._cache[key] = this._waitingCaches[key];
            }

            try{
                let storage = window.localStorage;
                if (storage) {
                    storage.setItem(this._key, JSON.stringify(this._cache));
                }
            } catch (e) {
                console.log("@FREEMAN: 缓存数据时出现错误：", e, " cache：", this._cache);
                MessageUtils.showMsgTips("缓存数据时出现错误!");
            }

            this._waitingCaches = {};
        }
    }
}