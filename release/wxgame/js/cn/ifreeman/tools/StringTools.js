var StringTools = /** @class */ (function () {
    function StringTools() {
    }
    /**
     * 将字符串拆分到数组中，按照给定的层级字符串来分拆，返回的数组中，每个元素均为拆到最低层级的字符串。
     * @param source_str
     * @param lv1_str
     * @param lv2_str
     * @param lv3_str
     * @return
     *
     */
    StringTools.splitStringToArr = function (source_str, lv1_str, lv2_str, lv3_str) {
        if (lv1_str === void 0) { lv1_str = ","; }
        var arrlv1;
        var arrlv2s;
        var arrlv3s;
        arrlv1 = source_str.split(lv1_str);
        if (lv2_str) {
            arrlv2s = [];
            var i = void 0;
            for (i = 0; i < arrlv1.length; i++) {
                arrlv2s = arrlv2s.concat(arrlv1[i].split(lv2_str));
            }
            if (lv3_str) {
                arrlv3s = [];
                for (i = 0; i < arrlv2s.length; i++) {
                    arrlv3s = arrlv3s.concat(arrlv2s[i].split(lv3_str));
                }
                return arrlv3s;
            }
            else {
                return arrlv2s;
            }
        }
        else {
            return arrlv1;
        }
    };
    /**
     * 将字符串拆分到数组中，数组的每个元素均为键值对象，仅支持含二级或以下分隔符的字符串
     * @param source_str
     * @param lv1_str
     * @param lv2_str
     * @return
     *
     */
    StringTools.splitStringToKV = function (source_str, lv1_str, lv2_str) {
        if (lv1_str === void 0) { lv1_str = "|"; }
        if (lv2_str === void 0) { lv2_str = ","; }
        var arrLv1 = source_str.split(lv1_str);
        var result = [];
        for (var _i = 0, arrLv1_1 = arrLv1; _i < arrLv1_1.length; _i++) {
            var str = arrLv1_1[_i];
            var tempArr = str.split(lv2_str);
            result.push(new KeyValue(tempArr[0], tempArr[1]));
        }
        if (result.length === 1) {
            return result.pop();
        }
        return result;
    };
    /**
     * 将字符串拆分到数组中，数组的每个元素均为键值对象，仅支持含二级或以下分隔符的字符串
     * @param source_str
     * @param separator
     * @return
     *
     */
    StringTools.splitStringToPoint = function (source_str, separator) {
        if (separator === void 0) { separator = ","; }
        var result = new Laya.Point();
        if (source_str) {
            var arr = StringTools.splitStringToArr(source_str, separator);
            result.x = parseInt(arr[0], 0);
            result.y = parseInt(arr[1], 0);
        }
        return result;
    };
    /**
     * 将两个数组的内容按照键值对应输出成字符串。输出的格式为{key1:value1, key2:value2, key3:value3, ...}
     * @param keys 键
     * @param values 值
     * @return
     *
     */
    StringTools.wrapValueObjects = function (keys, values) {
        var result = "{";
        for (var i = 0; i < keys.length; i++) {
            result += String(keys[i]) + ":" + String(values[i]) + ", ";
        }
        result = result.substr(0, result.length - 2);
        result += "}";
        return result;
    };
    /**
     * 将给定的时间输出成电子时钟样式的时间字符串，如  01:29:05
     * @param date
     * @param separator
     * @return
     *
     */
    // prettier-ignore
    StringTools.toTimeShort = function (date, separator) {
        if (separator === void 0) { separator = ":"; }
        var result = "";
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        result += (hour > 9 ? hour.toString() : "0" + hour.toString()) + separator;
        result += (minute > 9 ? minute.toString() : "0" + minute.toString()) + separator;
        result += second > 9 ? second.toString() : "0" + second.toString();
        return result;
    };
    /**
     * 将给定的秒数输出成电子时钟样式的时间字符串，如  01:29:05，一般用于显示倒计时等, showLevel取值范围{1, 2, 3}，1 - 显示到秒，2 - 显示到分，3 - 显示到小时，默认取值3
     * @param seconds
     * @param separator
     * @param showLevel
     * @return
     *
     */
    // prettier-ignore
    StringTools.toTimeShortWithSec = function (seconds, separator, showLevel) {
        if (separator === void 0) { separator = ":"; }
        if (showLevel === void 0) { showLevel = 3; }
        var result = "";
        var hour;
        var minute;
        var second;
        if (showLevel === 1) {
            result += seconds > 9 ? seconds.toString() : "0" + seconds.toString();
        }
        else if (showLevel === 2) {
            minute = Math.floor(seconds / Time.MIN);
            second = Math.floor((seconds % Time.MIN) / Time.SEC);
            result += (minute > 9 ? minute.toString() : "0" + minute.toString()) + separator;
            result += second > 9 ? second.toString() : "0" + second.toString();
        }
        else if (showLevel === 3) {
            hour = Math.floor(seconds / Time.HOUR);
            minute = Math.floor((seconds % Time.HOUR) / Time.MIN);
            second = Math.floor((seconds % Time.MIN) / Time.SEC);
            result += (hour > 9 ? hour.toString() : "0" + hour.toString()) + separator;
            result += (minute > 9 ? minute.toString() : "0" + minute.toString()) + separator;
            result += second > 9 ? second.toString() : "0" + second.toString();
        }
        return result;
    };
    /**
     * 将给定的秒数输出成电子时钟样式的时间字符串，如  02:05，一般用于显示倒计时等
     * @param seconds
     * @param separator
     * @return
     *
     */
    StringTools.toTimeShortWithMinute = function (seconds, separator) {
        if (separator === void 0) { separator = ":"; }
        var result = "";
        var minute = Math.floor((seconds % Time.HOUR) / Time.MIN);
        var second = Math.floor((seconds % Time.MIN) / Time.SEC);
        result +=
            (minute > 9 ? minute.toString() : "0" + minute.toString()) + separator;
        result += second > 9 ? second.toString() : "0" + second.toString();
        return result;
    };
    /**
     * 将给定的数值输出成按千位符分隔的
     * @param value
     * @param separator
     * @return
     *
     */
    // prettier-ignore
    StringTools.toCurrencyString = function (value, separator) {
        if (separator === void 0) { separator = ","; }
        var result = value.toString();
        result = result.replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return s + separator;
        });
        return result;
    };
    // prettier-ignore
    StringTools.toShortCurrencyString = function (value, radix, units) {
        if (radix === void 0) { radix = 2; }
        if (units === void 0) { units = ",K,M,B,T,A,C,D,E,F,G,H,J,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z"; }
        if (!value) {
            console.log("StringTools.toShortCurrencyString => value:", value);
            value = 0;
        }
        var k = 1000;
        var idx = 0;
        while (value > k) {
            value /= k;
            idx++;
        }
        if (value % 1 !== 0) {
            if (value && value.toFixed) {
            }
            else {
                console.log("StringTools.toShortCurrencyString => value:", value);
                return "";
            }
        }
        return (value % 1 === 0 ? value.toString() : value.toFixed(radix)) + units.split(",")[idx];
    };
    /**
     * 格式化字符串，把object对象的各个字段和值转换为Url的query字符串，不带前面的问号
     * @return
     *
     */
    StringTools.toUrlQueryString = function (data) {
        var result = "";
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var key = _a[_i];
            result += key + "=" + data[key];
            result += "&";
        }
        if (result.length > 0) {
            result = result.substr(0, result.length - 1);
        }
        return result;
    };
    /**
     * 格式化字符串，把字符串中{0}、{1}、{2}……等结构替换成@args参数列表中的对应下标的字符串
     * @return
     *
     */
    StringTools.formatString = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var result = str.concat();
        for (var i = 0; i < args.length; i++) {
            var reg = "{" + i + "}";
            result = result.replace(reg, args[i].toString());
        }
        return result;
    };
    /**
     * 将超出字符长度的字符串裁剪成按长度加上“...”的方式显示
     * @str
     * @len
     * @omitSymbol
     * @return
     *
     */
    StringTools.omitStringByCharLen = function (str, len, omitSymbol) {
        if (len === void 0) { len = 7; }
        if (omitSymbol === void 0) { omitSymbol = "..."; }
        var result = str.concat();
        if (result.length > len) {
            result = result.substr(0, len - 1) + omitSymbol;
        }
        return result;
    };
    /**
     * 将超出字符存储长度的字符串裁剪成按存储长度加上“...”的方式显示，这里1个中文字符等于3个英文字符的Byte长度，但是一般文本显示的时候一个中文字符一般等于2个英文字符的宽度，故使用此方法时，传入的len参数应该按中文占两位长度来计算。
     * @str
     * @len
     * @omitSymbol
     * @return
     *
     */
    StringTools.omitStringByByteLen = function (str, len, omitSymbol) {
        if (len === void 0) { len = 14; }
        if (omitSymbol === void 0) { omitSymbol = "..."; }
        var result = str.concat();
        var resultLen = 0;
        var lastSymbolLen = 0;
        var bytes = new Laya.Byte();
        bytes.writeUTFBytes(result);
        bytes.pos = 0;
        while (bytes.bytesAvailable) {
            var byte = bytes.readByte();
            if (byte >= 0) {
                lastSymbolLen = 1;
                resultLen++;
            }
            else {
                bytes.readByte();
                bytes.readByte();
                lastSymbolLen = 3;
                resultLen += 2;
            }
            if (resultLen >= len) {
                break;
            }
        }
        if (bytes.bytesAvailable > 0) {
            var end = bytes.length - bytes.bytesAvailable - lastSymbolLen;
            bytes.pos = 0;
            result = bytes.readUTFBytes(end) + omitSymbol;
        }
        return result;
    };
    return StringTools;
}());
//# sourceMappingURL=StringTools.js.map