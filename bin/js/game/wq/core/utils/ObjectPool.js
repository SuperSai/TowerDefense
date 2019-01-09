/*
* 对象池类;
*/
class ObjectPool {
    /**
     * 构造函数
     */
    constructor() {
        this._objs = new Array();
    }
    /**
     * 放回一个对象
     * @param obj
     */
    pushObj(obj) {
        this._objs.push(obj);
    }
    /**
     * 取出一个对象
     * @returns {*}
     */
    popObj() {
        if (this._objs.length > 0) {
            return this._objs.pop();
        }
        else {
            return null;
        }
    }
    /**
     * 清除所有缓存对象
     */
    clear() {
        while (this._objs.length > 0) {
            this._objs.pop();
        }
    }
    /**
     * 取出一个对象
     * @param classZ Class
     * @return Object
     *
     */
    static pop(classZ, classKey, ...args) {
        if (!ObjectPool._content[classKey]) {
            ObjectPool._content[classKey] = [];
        }
        var list = ObjectPool._content[classKey];
        if (list.length) {
            let item = list.pop();
            if ((item instanceof Laya.Image) && args.length > 0) {
                item.skin = args[0];
            }
            return item;
        }
        else {
            var argsLen = args.length;
            var obj;
            if (argsLen == 0) {
                obj = new classZ();
            }
            else if (argsLen == 1) {
                obj = new classZ(args[0]);
            }
            else if (argsLen == 2) {
                obj = new classZ(args[0], args[1]);
            }
            else if (argsLen == 3) {
                obj = new classZ(args[0], args[1], args[2]);
            }
            else if (argsLen == 4) {
                obj = new classZ(args[0], args[1], args[2], args[3]);
            }
            else if (argsLen == 5) {
                obj = new classZ(args[0], args[1], args[2], args[3], args[4]);
            }
            obj.ObjectPoolKey = classKey;
            return obj;
        }
    }
    /**
     * 取出一个对象
     * @param refKey Class
     * @param extraKey 标识值
     * @returns {any}
     */
    static popWithExtraKey(refKey, extraKey) {
        if (!ObjectPool._content[refKey]) {
            ObjectPool._content[refKey] = [];
        }
        var obj;
        var list = ObjectPool._content[refKey];
        if (list.length) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].extraKey == extraKey) {
                    obj = list[i];
                    list.splice(i, 1);
                    break;
                }
            }
        }
        if (!obj) {
            var classZ = refKey;
            obj = new classZ(extraKey);
            obj.extraKey = extraKey;
            obj.ObjectPoolKey = refKey;
        }
        return obj;
    }
    /**
     * 放入一个对象
     * @param obj
     *
     */
    static push(obj) {
        if (obj == null) {
            return false;
        }
        var refKey = obj.ObjectPoolKey;
        //保证只有pop出来的对象可以放进来，或者是已经清除的无法放入
        if (!ObjectPool._content[refKey]) {
            return false;
        }
        ObjectPool._content[refKey].push(obj);
        return true;
    }
    /**
     * 清除所有对象
     */
    static clear() {
        ObjectPool._content = {};
    }
    /**
     * 清除某一类对象
     * @param classZ Class
     * @param clearFuncName 清除对象需要执行的函数
     */
    static clearClass(classKey, clearFuncName = null) {
        var list = ObjectPool._content[classKey];
        while (list && list.length) {
            var obj = list.pop();
            if (clearFuncName) {
                obj[clearFuncName]();
            }
            obj = null;
        }
        ObjectPool._content[classKey] = null;
        delete ObjectPool._content[classKey];
    }
    /**
     * 缓存中对象统一执行一个函数
     * @param classZ Class
     * @param dealFuncName 要执行的函数名称
     */
    static dealFunc(refKey, dealFuncName) {
        var list = ObjectPool._content[refKey];
        if (list == null) {
            return;
        }
        var i = 0;
        var len = list.length;
        for (i; i < len; i++) {
            list[i][dealFuncName]();
        }
    }
}
ObjectPool._content = {};
//# sourceMappingURL=ObjectPool.js.map