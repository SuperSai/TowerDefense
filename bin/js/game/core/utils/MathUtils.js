/*
* 数值工具类;
*/
var MathUtils = /** @class */ (function () {
    function MathUtils() {
    }
    //计算两点角度
    MathUtils.calulatePointAnagle = function (_startX, _startY, _endX, _endY) {
        //除数不能为0
        var tanAngle = Math.atan(Math.abs((_endY - _startY) / (_endX - _startX))) * 180 / Math.PI;
        if (_endX > _startX && _endY > _startY) { //第一象限
            tanAngle = -tanAngle;
        }
        else if (_endX > _startX && _endY < _startY) { //第二象限
            tanAngle = tanAngle;
        }
        else if (_endX < _startX && _endY > _startY) { //第三象限
            tanAngle = tanAngle - 180;
        }
        else {
            tanAngle = 180 - tanAngle;
        }
        return -tanAngle;
    };
    //字符串转数字
    MathUtils.parseStringNum = function (_strNum) {
        var intNum = parseFloat(_strNum);
        if (intNum) {
            return intNum;
        }
        return 0;
    };
    //字符串转整形
    MathUtils.parseInt = function (_strNum) {
        var intNum = parseFloat(_strNum);
        if (intNum) {
            return Math.floor(intNum);
        }
        return 0;
    };
    //字符串转数字
    MathUtils.numToPercent = function (_num) {
        var perNum = _num * 100;
        var intBit = Math.floor(perNum); //取整数部分
        if (perNum > intBit) {
            return perNum.toFixed(1) + "%";
        }
        return intBit + "%";
    };
    //单位转换
    MathUtils.bytesToSize = function (bytes, isBlood) {
        if (isBlood === void 0) { isBlood = false; }
        if (bytes < 10000) {
            return Math.floor(bytes).toString();
        }
        if (bytes === 0)
            return '0';
        var k = 1000, // or 1024
        sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'mm', 'nn', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'zz'], i = Math.floor(Math.log(bytes) / Math.log(k));
        var unit = '';
        if (i < sizes.length) {
            unit = sizes[i];
        }
        else {
            var numLenght = i - sizes.length;
            unit = String.fromCharCode(97 + numLenght % 26);
            for (var index = 0; index < 1 + Math.floor(numLenght / 65); index++) {
                unit = unit + unit;
            }
        }
        if (isBlood) {
            return Math.abs(parseInt((bytes / Math.pow(k, i)).toPrecision(3))) + unit;
        }
        else {
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + unit;
        }
    };
    return MathUtils;
}());
//# sourceMappingURL=MathUtils.js.map