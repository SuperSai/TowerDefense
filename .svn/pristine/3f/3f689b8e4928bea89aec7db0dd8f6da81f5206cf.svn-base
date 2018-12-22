/**
 * 字符串操作工具类
 */
class StringUtils {

    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    public static trimSpace(str: string): string {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    }

    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    public static getStringLength(str: string): number {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            } else {
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
    public static isChinese(str: string): boolean {
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
    public static splitStringToArr(
        source_str: string,
        lv1_str: string = ",",
        lv2_str?: string,
        lv3_str?: string
    ): string[] {
        let arrlv1: string[];
        let arrlv2s: string[];
        let arrlv3s: string[];
        arrlv1 = source_str.split(lv1_str);
        if (lv2_str) {
            arrlv2s = [];
            let i: number;
            for (i = 0; i < arrlv1.length; i++) {
                arrlv2s = arrlv2s.concat(arrlv1[i].split(lv2_str));
            }

            if (lv3_str) {
                arrlv3s = [];
                for (i = 0; i < arrlv2s.length; i++) {
                    arrlv3s = arrlv3s.concat(arrlv2s[i].split(lv3_str));
                }

                return arrlv3s;
            } else {
                return arrlv2s;
            }
        } else {
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
    public static splitStringToKV(source_str: string, lv1_str: string = "|", lv2_str: string = ","): KeyValue | KeyValue[] {
        const arrLv1: string[] = source_str.split(lv1_str);
        const result: KeyValue[] = [];
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
    public static splitStringToPoint(
        source_str: string,
        separator: string = ","
    ): Laya.Point {
        const result: Laya.Point = new Laya.Point();
        if (source_str) {
            const arr: string[] = StringUtils.splitStringToArr(source_str, separator);
            result.x = parseInt(arr[0], 0);
            result.y = parseInt(arr[1], 0);
        }
        return result;
    }

    /** 将两个数组的内容按照键值对应输出成字符串。输出的格式为{key1:value1, key2:value2, key3:value3, ...} */
    public static wrapValueObjects(keys: any[], values: any[]): string {
        let result: string = "{";
        for (let i: number = 0; i < keys.length; i++) {
            result += String(keys[i]) + ":" + String(values[i]) + ", ";
        }
        result = result.substr(0, result.length - 2);
        result += "}";
        return result;
    }

    /** 将给定的时间输出成电子时钟样式的时间字符串，如  01:29:05 */
    // prettier-ignore
    public static toTimeShort(date: Date, separator: string = ":"): string {
        let result: string = "";
        const hour: number = date.getHours();
        const minute: number = date.getMinutes();
        const second: number = date.getSeconds();

        result += (hour > 9 ? hour.toString() : "0" + hour.toString()) + separator;
        result += (minute > 9 ? minute.toString() : "0" + minute.toString()) + separator;
        result += second > 9 ? second.toString() : "0" + second.toString();
        return result;
    }

	/**
	 * 将给定的秒数输出成电子时钟样式的时间字符串，如  01:29:05，一般用于显示倒计时等, showLevel取值范围{1, 2, 3}，1 - 显示到秒，2 - 显示到分，3 - 显示到小时，默认取值3
	 */
    // prettier-ignore
    public static toTimeShortWithSec(seconds: number, separator: string = ":", showLevel: number = 3): string {
        let result: string = "";
        let hour: number;
        let minute: number;
        let second: number;
        if (showLevel === 1) {
            result += seconds > 9 ? seconds.toString() : "0" + seconds.toString();
        } else if (showLevel === 2) {
            minute = Math.floor(seconds / Time.MIN);
            second = Math.floor((seconds % Time.MIN) / Time.SEC);
            result += (minute > 9 ? minute.toString() : "0" + minute.toString()) + separator;
            result += second > 9 ? second.toString() : "0" + second.toString();
        } else if (showLevel === 3) {
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
    public static toTimeShortWithMinute(
        seconds: number,
        separator: string = ":"
    ): string {
        let result: string = "";

        const minute: number = Math.floor((seconds % Time.HOUR) / Time.MIN);
        const second: number = Math.floor((seconds % Time.MIN) / Time.SEC);

        result +=
            (minute > 9 ? minute.toString() : "0" + minute.toString()) + separator;
        result += second > 9 ? second.toString() : "0" + second.toString();

        return result;
    }

    /** 将给定的数值输出成按千位符分隔的 */
    // prettier-ignore
    public static toCurrencyString(value: number, separator: string = ","): string {
        let result: string = value.toString();
        result = result.replace(
            /\d{1,3}(?=(\d{3})+$)/g,
            (s): string => {
                return s + separator;
            }
        );
        return result;
    }

    // prettier-ignore
    public static toShortCurrencyString(value: number, radix: number = 2, units: string = ",K,M,B,T,A,C,D,E,F,G,H,J,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z"): string {
        if (!value) {
            console.log("StringTools.toShortCurrencyString => value:", value);
            value = 0
        }
        const k: number = 1000;
        let idx: number = 0;
        while (value > k) {
            value /= k;
            idx++;
        }

        if (value % 1 !== 0) {
            if (value && value.toFixed) {

            } else {
                console.log("StringTools.toShortCurrencyString => value:", value);
                return ""
            }
        }

        return (value % 1 === 0 ? value.toString() : value.toFixed(radix)) + units.split(",")[idx]
    }

    /** 格式化字符串，把object对象的各个字段和值转换为Url的query字符串，不带前面的问号 */
    public static toUrlQueryString(data: any): string {
        let result: string = "";
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
    public static formatString(str: string, ...args): string {
        let result: string = str.concat();
        for (let i = 0; i < args.length; i++) {
            const reg: string = "{" + i + "}";
            result = result.replace(reg, args[i].toString());
        }
        return result;
    }

    /** 将超出字符长度的字符串裁剪成按长度加上“...”的方式显示 */
    public static omitStringByCharLen(str: string, len: number = 7, omitSymbol: string = "..."): string {
        let result: string = str.concat();
        if (result.length > len) {
            result = result.substr(0, len - 1) + omitSymbol;
        }
        return result;
    }


    /**
     * 将超出字符存储长度的字符串裁剪成按存储长度加上“...”的方式显示，这里1个中文字符等于3个英文字符的Byte长度，但是一般文本显示的时候一个中文字符一般等于2个英文字符的宽度，故使用此方法时，传入的len参数应该按中文占两位长度来计算。
     */
    public static omitStringByByteLen(str: string, len: number = 14, omitSymbol: string = "..."): string {
        if (!str) return str;
        let result: string = str.concat();
        let resultLen: number = 0;
        let lastSymbolLen: number = 0;
        const bytes: Laya.Byte = new Laya.Byte();
        try {
            bytes.writeUTFBytes(result);
            bytes.pos = 0;
            while (bytes.bytesAvailable) {
                const byte: number = bytes.readByte();
                if (byte >= 0) {
                    lastSymbolLen = 1;
                    resultLen++;
                } else {
                    let loop = 2;
                    lastSymbolLen = 1;
                    while (bytes.bytesAvailable && loop) {
                        bytes.readByte();
                        resultLen++;
                        lastSymbolLen++;
                        loop--;
                    }
                }
                if (resultLen >= len) {
                    break;
                }
            }
            if (bytes.bytesAvailable > 0) {
                const end: number = bytes.length - bytes.bytesAvailable - lastSymbolLen;
                bytes.pos = 0;
                result = bytes.readUTFBytes(end) + omitSymbol;
            }
        } catch (e) {
            console.error("@FREEMAN: StringTools.omitStringByByteLen:", e);
        }
        return result;
    }
}