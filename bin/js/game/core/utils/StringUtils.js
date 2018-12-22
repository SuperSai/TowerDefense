/**
 * 字符串操作工具类
 */
class StringUtils {
    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    static trimSpace(str) {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    }
    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    static getStringLength(str) {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            }
            else {
                length += 1;
            }
        }
        return length;
    }
    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    static isChinese(str) {
        var reg = /^.*[\u4E00-\u9FA5]+.*$/;
        return reg.test(str);
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
    static splitStringToArr(source_str, lv1_str = ",", lv2_str, lv3_str) {
        let arrlv1;
        let arrlv2s;
        let arrlv3s;
        arrlv1 = source_str.split(lv1_str);
        if (lv2_str) {
            arrlv2s = [];
            let i;
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
    }
    /**
     * 将字符串拆分到数组中，数组的每个元素均为键值对象，仅支持含二级或以下分隔符的字符串
     * @param source_str
     * @param lv1_str
     * @param lv2_str
     * @return
     *
     */
    static splitStringToKV(source_str, lv1_str = "|", lv2_str = ",") {
        const arrLv1 = source_str.split(lv1_str);
        const result = [];
        for (const str of arrLv1) {
            const tempArr = str.split(lv2_str);
            result.push(new KeyValue(tempArr[0], tempArr[1]));
        }
        if (result.length === 1) {
            return result.pop();
        }
        return result;
    }
    /** 将字符串拆分到数组中，数组的每个元素均为键值对象，仅支持含二级或以下分隔符的字符串 */
    static splitStringToPoint(source_str, separator = ",") {
        const result = new Laya.Point();
        if (source_str) {
            const arr = StringUtils.splitStringToArr(source_str, separator);
            result.x = parseInt(arr[0], 0);
            result.y = parseInt(arr[1], 0);
        }
        return result;
    }
    /** 将两个数组的内容按照键值对应输出成字符串。输出的格式为{key1:value1, key2:value2, key3:value3, ...} */
    static wrapValueObjects(keys, values) {
        let result = "{";
        for (let i = 0; i < keys.length; i++) {
            result += String(keys[i]) + ":" + String(values[i]) + ", ";
        }
        result = result.substr(0, result.length - 2);
        result += "}";
        return result;
    }
    /** 将给定的时间输出成电子时钟样式的时间字符串，如  01:29:05 */
    // prettier-ignore
    static toTimeShort(date, separator = ":") {
        let result = "";
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        result += (hour > 9 ? hour.toString() : "0" + hour.toString()) + separator;
        result += (minute > 9 ? minute.toString() : "0" + minute.toString()) + separator;
        result += second > 9 ? second.toString() : "0" + second.toString();
        return result;
    }
    /**
     * 将给定的秒数输出成电子时钟样式的时间字符串，如  01:29:05，一般用于显示倒计时等, showLevel取值范围{1, 2, 3}，1 - 显示到秒，2 - 显示到分，3 - 显示到小时，默认取值3
     */
    // prettier-ignore
    static toTimeShortWithSec(seconds, separator = ":", showLevel = 3) {
        let result = "";
        let hour;
        let minute;
        let second;
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
    }
    /** 将给定的秒数输出成电子时钟样式的时间字符串，如  02:05，一般用于显示倒计时等 */
    static toTimeShortWithMinute(seconds, separator = ":") {
        let result = "";
        const minute = Math.floor((seconds % Time.HOUR) / Time.MIN);
        const second = Math.floor((seconds % Time.MIN) / Time.SEC);
        result +=
            (minute > 9 ? minute.toString() : "0" + minute.toString()) + separator;
        result += second > 9 ? second.toString() : "0" + second.toString();
        return result;
    }
    /** 将给定的数值输出成按千位符分隔的 */
    // prettier-ignore
    static toCurrencyString(value, separator = ",") {
        let result = value.toString();
        result = result.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => {
            return s + separator;
        });
        return result;
    }
    // prettier-ignore
    static toShortCurrencyString(value, radix = 2, units = ",K,M,B,T,A,C,D,E,F,G,H,J,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z") {
        if (!value) {
            console.log("StringTools.toShortCurrencyString => value:", value);
            value = 0;
        }
        const k = 1000;
        let idx = 0;
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
    }
    /** 格式化字符串，把object对象的各个字段和值转换为Url的query字符串，不带前面的问号 */
    static toUrlQueryString(data) {
        let result = "";
        for (const key of Object.keys(data)) {
            result += key + "=" + data[key];
            result += "&";
        }
        if (result.length > 0) {
            result = result.substr(0, result.length - 1);
        }
        return result;
    }
    /** 格式化字符串，把字符串中{0}、{1}、{2}……等结构替换成@args参数列表中的对应下标的字符串 */
    static formatString(str, ...args) {
        let result = str.concat();
        for (let i = 0; i < args.length; i++) {
            const reg = "{" + i + "}";
            result = result.replace(reg, args[i].toString());
        }
        return result;
    }
    /** 将超出字符长度的字符串裁剪成按长度加上“...”的方式显示 */
    static omitStringByCharLen(str, len = 7, omitSymbol = "...") {
        let result = str.concat();
        if (result.length > len) {
            result = result.substr(0, len - 1) + omitSymbol;
        }
        return result;
    }
    /**
     * 将超出字符存储长度的字符串裁剪成按存储长度加上“...”的方式显示，这里1个中文字符等于3个英文字符的Byte长度，但是一般文本显示的时候一个中文字符一般等于2个英文字符的宽度，故使用此方法时，传入的len参数应该按中文占两位长度来计算。
     */
    static omitStringByByteLen(str, len = 14, omitSymbol = "...") {
        let result = str.concat();
        let resultLen = 0;
        let lastSymbolLen = 0;
        const bytes = new Laya.Byte();
        bytes.writeUTFBytes(result);
        bytes.pos = 0;
        while (bytes.bytesAvailable) {
            const byte = bytes.readByte();
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
            const end = bytes.length - bytes.bytesAvailable - lastSymbolLen;
            bytes.pos = 0;
            result = bytes.readUTFBytes(end) + omitSymbol;
        }
        return result;
    }
}
//# sourceMappingURL=StringUtils.js.map