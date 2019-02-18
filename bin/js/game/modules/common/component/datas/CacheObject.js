class CacheObject {
    constructor(key = "FREEMAN") {
        this._key = key;
        this._cache = {};
        this._waitingCaches = {};
    }
    setCacheKey(key) {
        this._key = key;
        return this;
    }
    startCacheThread(interval = Time.SEC_IN_MILI) {
        Laya.timer.loop(interval, this, this.__save);
    }
    setCache(key, value) {
        this._waitingCaches[key] = value;
        Laya.timer.callLater(this, this.__save);
    }
    setCacheGroup(cacheObj) {
        for (let key in cacheObj) {
            this._waitingCaches[key] = cacheObj[key];
        }
        Laya.timer.callLater(this, this.__save);
    }
    getCache(key) {
        if (this._waitingCaches.hasOwnProperty(key)) {
            return this._waitingCaches[key];
        }
        return this._cache[key];
    }
    removeCache(key) {
        delete this._cache[key];
    }
    hasCache(key) {
        if (this._waitingCaches.hasOwnProperty(key)) {
            return true;
        }
        return this._cache.hasOwnProperty(key);
    }
    loadCache(success, fail) {
        let storage = window.localStorage;
        let b;
        if (storage) {
            let jsonStr = storage.getItem(this._key);
            if (jsonStr) {
                if (jsonStr) {
                    let cache = JSON.parse(jsonStr);
                    if (cache) {
                        b = true;
                        this._cache = cache;
                        success && success.runWith(this);
                    }
                }
            }
        }
        if (!b) {
            fail && fail.run();
            console.log("@FREEMAN: 缓存数据为空或有异常，缓存：{ " + this._key + " }");
        }
    }
    clearCache() {
        this._cache = {};
        this._waitingCaches = {};
        let storage = window.localStorage;
        if (storage) {
            storage.removeItem(this._key);
            console.log("@FREEMAN: 本地缓存{" + this._key + "}已清除。");
        }
    }
    __save() {
        if (Object.keys(this._waitingCaches).length) {
            for (let key in this._waitingCaches) {
                this._cache[key] = this._waitingCaches[key];
            }
            try {
                let storage = window.localStorage;
                if (storage) {
                    storage.setItem(this._key, JSON.stringify(this._cache));
                }
            }
            catch (e) {
                console.log("@FREEMAN: 缓存数据时出现错误：", e, " cache：", this._cache);
                MessageUtils.showMsgTips("缓存数据时出现错误!");
            }
            this._waitingCaches = {};
        }
    }
}
//# sourceMappingURL=CacheObject.js.map