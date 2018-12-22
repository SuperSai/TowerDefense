/**
 * 时间工具类
 */
class TimeUtil {
    /** 获取单一的当前时间 */
    static getTimeCD(times) {
        if (times < 0)
            return;
        let h = Math.floor(times / 1000 / 60 / 60).toString();
        let m = Math.floor(times % (1000 * 3600) / (1000 * 60)).toString();
        let s = Math.floor((times % (1000 * 60)) / 1000).toString();
        if (Number(h) > 0) {
            return h + "h";
        }
        else if (Number(m) > 0) {
            return m + "m";
        }
        else if (Number(s) > 0) {
            return s + "s";
        }
        return "0";
    }
    /**
     * 时间毫秒转成小时
     * @param sec
     * @returns {number}
     * @constructor
     */
    static S2H(times, symbol = ":", isH = true) {
        if (times < 0)
            return;
        let h = Math.floor(times / 1000 / 60 / 60).toString();
        let m = Math.floor(times % (1000 * 3600) / (1000 * 60)).toString();
        let s = Math.floor((times % (1000 * 60)) / 1000).toString();
        if (Number(h) < 10) {
            h = "0" + h;
        }
        if (Number(m) < 10) {
            m = "0" + m;
        }
        if (Number(s) < 10) {
            s = "0" + s;
        }
        if (isH) {
            var restult = h + symbol + m + symbol + s;
        }
        else {
            var restult = m + symbol + s;
        }
        return restult;
    }
    static conversionTime(times) {
        if (times <= 0)
            return "";
        if (times >= 60 * 60 * 24) {
            let day = Math.floor(times / (60 * 60 * 24));
            return day + "天";
        }
        else if (times >= 60 * 60) {
            let h = Math.floor(times / (60 * 60));
            return h + "小时";
        }
        else {
            return this.S2H(times * 1000);
        }
    }
    /** 获取小时 */
    static getHours(times) {
        if (times < 0)
            return;
        return Math.floor(times / 1000 / 60 / 60);
    }
    /**
     * 获取字符串格式化数据
     * @param str
     */
    static fornatStr(str) {
        let arr = str.split("|");
        let obj = {};
        if (arr && arr.length) {
            for (var i = 0; i < arr.length; i++) {
                let data = this.fornatStr1(arr[i]);
                let itemObj = {
                    "id": data[0],
                    "itemtType": data[1],
                    "num": data[2]
                };
                obj[data[0]] = itemObj;
            }
        }
        return obj;
    }
    static fornatStr1(str, symbol = "#") {
        let arr = str.split(symbol);
        return arr;
    }
    /**
     * 获取当前服务器时间
     * @returns {number}
     */
    static getCurServerTime() {
        let time = this._initializeSTime + Math.floor((new Date().getTime()) / 1000) - this._initializeCTime;
        return time;
    }
    /**
     * 获取结束时间
     * @returns {number}
     */
    static getEndTime(cdTime) {
        return this._firstSTime + cdTime;
    }
    /**
     * 获取cd时间
     * @returns {number}
     */
    static getCDTime(time) {
        let endTime = this.getEndTime(time);
        let nowTime = this.getCurServerTime();
        if (nowTime >= endTime) {
            return 0;
        }
        return endTime - nowTime;
    }
    static getCDTimes(endTime) {
        let curTimes = this.getCurServerTime();
        if (endTime <= curTimes) {
            return 0;
        }
        let result = endTime - curTimes;
        return result;
    }
    /**
     * 同步时间
     * @param {number} sTime 服务器时间
     * @param {number} cTime 客户端时间
     */
    static synctime(sTime, cTime) {
        this._initializeCTime = cTime;
        this._initializeSTime = sTime;
        if (!this._isLogin) {
            this._firstSTime = sTime;
            this._isLogin = true;
        }
    }
    /**
     * 时间戳和当前时间相差的毫秒数
     * @param longTypeDate
     */
    static calculationTimestamp(longTypeDate) {
        var datetimeType = "";
        let num = longTypeDate - this.getCurServerTime() * 1000;
        num = Math.floor(num);
        return num;
    }
    /**
     * 时间戳long转成number 返回秒数
     * @param longTypeDate
     */
    static fornateTimestamp(longTypeDate) {
        var datetimeType = "";
        var date = new Date();
        date.setTime(longTypeDate);
        let num = date.getTime();
        num = Math.floor(num / 1000);
        return num;
    }
    /** 获取多少天 */
    static getDay(times) {
        if (times <= 0)
            return;
        let date = new Date();
        date.setTime(times);
        return date.getDate() + "天";
    }
    /** 00:00:00格式时间 */
    static timeFormatStr(_time, _isHour = false) {
        let hour = Math.floor(_time / 3600);
        let minute = Math.floor(_time / 60) % 60;
        let sec = _time % 60;
        if (_isHour) {
            return (hour < 10 ? ('0' + hour) : hour) + ':' + (minute < 10 ? ('0' + minute) : minute) + ':' + (sec < 10 ? ('0' + sec) : sec);
        }
        else {
            return (minute < 10 ? ('0' + minute) : minute) + ':' + (sec < 10 ? ('0' + sec) : sec);
        }
    }
}
TimeUtil._initializeSTime = 0; //初始化服务器时间
TimeUtil._initializeCTime = 0; //初始化客户端时间
TimeUtil._firstSTime = 0; //服务器登录时间
TimeUtil._isLogin = false;
//# sourceMappingURL=TimeUtil.js.map