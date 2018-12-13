/**
 * 时间工具类
 */
var TimeUtil = /** @class */ (function () {
    function TimeUtil() {
    }
    /** 获取单一的当前时间 */
    TimeUtil.getTimeCD = function (times) {
        if (times < 0)
            return;
        var h = Math.floor(times / 1000 / 60 / 60).toString();
        var m = Math.floor(times % (1000 * 3600) / (1000 * 60)).toString();
        var s = Math.floor((times % (1000 * 60)) / 1000).toString();
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
    };
    /**
     * 时间毫秒转成小时
     * @param sec
     * @returns {number}
     * @constructor
     */
    TimeUtil.S2H = function (times, symbol, isH) {
        if (symbol === void 0) { symbol = ":"; }
        if (isH === void 0) { isH = true; }
        if (times < 0)
            return;
        var h = Math.floor(times / 1000 / 60 / 60).toString();
        var m = Math.floor(times % (1000 * 3600) / (1000 * 60)).toString();
        var s = Math.floor((times % (1000 * 60)) / 1000).toString();
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
    };
    TimeUtil.conversionTime = function (times) {
        if (times <= 0)
            return "";
        if (times >= 60 * 60 * 24) {
            var day = Math.floor(times / (60 * 60 * 24));
            return day + "天";
        }
        else if (times >= 60 * 60) {
            var h = Math.floor(times / (60 * 60));
            return h + "小时";
        }
        else {
            return this.S2H(times * 1000);
        }
    };
    /** 获取小时 */
    TimeUtil.getHours = function (times) {
        if (times < 0)
            return;
        return Math.floor(times / 1000 / 60 / 60);
    };
    /**
     * 获取字符串格式化数据
     * @param str
     */
    TimeUtil.fornatStr = function (str) {
        var arr = str.split("|");
        var obj = {};
        if (arr && arr.length) {
            for (var i = 0; i < arr.length; i++) {
                var data = this.fornatStr1(arr[i]);
                var itemObj = {
                    "id": data[0],
                    "itemtType": data[1],
                    "num": data[2]
                };
                obj[data[0]] = itemObj;
            }
        }
        return obj;
    };
    TimeUtil.fornatStr1 = function (str, symbol) {
        if (symbol === void 0) { symbol = "#"; }
        var arr = str.split(symbol);
        return arr;
    };
    /**
     * 获取当前服务器时间
     * @returns {number}
     */
    TimeUtil.getCurServerTime = function () {
        var time = this._initializeSTime + Math.floor((new Date().getTime()) / 1000) - this._initializeCTime;
        return time;
    };
    /**
     * 获取结束时间
     * @returns {number}
     */
    TimeUtil.getEndTime = function (cdTime) {
        return this._firstSTime + cdTime;
    };
    /**
     * 获取cd时间
     * @returns {number}
     */
    TimeUtil.getCDTime = function (time) {
        var endTime = this.getEndTime(time);
        var nowTime = this.getCurServerTime();
        if (nowTime >= endTime) {
            return 0;
        }
        return endTime - nowTime;
    };
    TimeUtil.getCDTimes = function (endTime) {
        var curTimes = this.getCurServerTime();
        if (endTime <= curTimes) {
            return 0;
        }
        var result = endTime - curTimes;
        return result;
    };
    /**
     * 同步时间
     * @param {number} sTime 服务器时间
     * @param {number} cTime 客户端时间
     */
    TimeUtil.synctime = function (sTime, cTime) {
        this._initializeCTime = cTime;
        this._initializeSTime = sTime;
        if (!this._isLogin) {
            this._firstSTime = sTime;
            this._isLogin = true;
        }
    };
    /**
     * 时间戳和当前时间相差的毫秒数
     * @param longTypeDate
     */
    TimeUtil.calculationTimestamp = function (longTypeDate) {
        var datetimeType = "";
        var num = longTypeDate - this.getCurServerTime() * 1000;
        num = Math.floor(num);
        return num;
    };
    /**
     * 时间戳long转成number 返回秒数
     * @param longTypeDate
     */
    TimeUtil.fornateTimestamp = function (longTypeDate) {
        var datetimeType = "";
        var date = new Date();
        date.setTime(longTypeDate);
        var num = date.getTime();
        num = Math.floor(num / 1000);
        return num;
    };
    /** 获取多少天 */
    TimeUtil.getDay = function (times) {
        if (times <= 0)
            return;
        var date = new Date();
        date.setTime(times);
        return date.getDate() + "天";
    };
    /** 00:00:00格式时间 */
    TimeUtil.timeFormatStr = function (_time, _isHour) {
        if (_isHour === void 0) { _isHour = false; }
        var hour = Math.floor(_time / 3600);
        var minute = Math.floor(_time / 60) % 60;
        var sec = _time % 60;
        if (_isHour) {
            return (hour < 10 ? ('0' + hour) : hour) + ':' + (minute < 10 ? ('0' + minute) : minute) + ':' + (sec < 10 ? ('0' + sec) : sec);
        }
        else {
            return (minute < 10 ? ('0' + minute) : minute) + ':' + (sec < 10 ? ('0' + sec) : sec);
        }
    };
    TimeUtil._initializeSTime = 0; //初始化服务器时间
    TimeUtil._initializeCTime = 0; //初始化客户端时间
    TimeUtil._firstSTime = 0; //服务器登录时间
    TimeUtil._isLogin = false;
    return TimeUtil;
}());
//# sourceMappingURL=TimeUtil.js.map