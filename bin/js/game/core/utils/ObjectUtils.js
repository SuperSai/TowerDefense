var ObjectUtils = /** @class */ (function () {
    function ObjectUtils() {
    }
    /** 替换数组中的数据 */
    ObjectUtils.replaceItemToArray = function (array, inde, item) {
        array.splice(inde, 1, item);
    };
    /** 把数据转换成一个Point */
    ObjectUtils.converToPoint = function (value, separater) {
        if (separater === void 0) { separater = ","; }
        if (value == null)
            return null;
        var sValue = String(value).split(separater);
        return new Laya.Point(parseFloat(sValue[0]), parseFloat(sValue[1]));
    };
    /** 把数据转换成number数组 */
    ObjectUtils.splitToNumber = function (value, sprelator) {
        if (sprelator === void 0) { sprelator = ","; }
        var result = [];
        var sArray = value.split(sprelator);
        for (var i = 0; i < sArray.length; i++) {
            result.push(parseInt(sArray[i]));
        }
        return result;
    };
    /** 把字符串转换成一个数组 */
    ObjectUtils.splitToString = function (value, sprelator) {
        if (sprelator === void 0) { sprelator = ","; }
        var result = [];
        var sArray = value.split(sprelator);
        for (var i = 0; i < sArray.length; i++) {
            result.push(sArray[i]);
        }
        return result;
    };
    /** 把数据转换成Point的数组 */
    ObjectUtils.splitToPoints = function (value, separater) {
        if (separater === void 0) { separater = "#"; }
        if (value == null)
            return [];
        var points = [];
        var sValue = ObjectUtils.splitToString(value);
        for (var i = 0; i < sValue.length; i++) {
            points.push(ObjectUtils.converToPoint(sValue[i]));
        }
        return points;
    };
    /** 移除数组中的指定元素 */
    ObjectUtils.removeFromArray = function (target, array) {
        var index = array.indexOf(target);
        if (index >= 0)
            array.splice(index, 1);
        return array;
    };
    /** 深度复制 */
    ObjectUtils.copyDataHandler = function (obj) {
        var newObj;
        if (obj instanceof Array) {
            newObj = [];
        }
        else if (obj instanceof Object) {
            newObj = {};
        }
        else {
            return obj;
        }
        var keys = Object.keys(obj);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            newObj[key] = this.copyDataHandler(obj[key]);
        }
        return newObj;
    };
    /**
     * 拷贝数据
     * @param newObj  需要赋值的对象
     * @param oldData  拥有数据的对象
     */
    ObjectUtils.copyData = function (newObj, oldData) {
        if (oldData == null)
            return;
        for (var key in newObj) {
            if (key == "__class__")
                continue;
            if (key == "__types__")
                continue;
            var attrValue = oldData[key];
            if (attrValue != undefined) {
                newObj[key] = oldData[key];
            }
        }
    };
    ObjectUtils.shuffle = function (arr) {
        var len = arr.length;
        var i = len;
        while (i--) {
            var ran = Math.floor(Math.random() * len);
            if (i != ran) {
                var tem = arr[i];
                arr[i] = arr[ran];
                arr[ran] = tem;
            }
        }
    };
    /** 点是否在区域中 */
    ObjectUtils.pointIsInArea = function (rect, x, y) {
        return rect.contains(x, y);
    };
    /** 是否被点击 */
    ObjectUtils.isHit = function (_checkSprite, _extW, _extH) {
        if (_extW === void 0) { _extW = 0; }
        if (_extH === void 0) { _extH = 0; }
        if (_checkSprite) {
            var touchPos = _checkSprite.getMousePoint();
            var touchArea = new Laya.Rectangle(0 - _extW / 2, 0 - _extH / 2, _checkSprite.width + _extW, _checkSprite.height + _extH);
            return touchArea.contains(touchPos.x, touchPos.y);
        }
        return false;
    };
    /** 求2对象之间的角度 */
    ObjectUtils.getAngle = function (starPos, endPos) {
        var vx = starPos.x - endPos.x;
        var vy = starPos.y - endPos.y;
        var hyp = Math.sqrt(Math.pow(vy, 2) + Math.pow(vx, 2));
        var rad = Math.acos(vy / hyp);
        var deg = 180 / (Math.PI / rad);
        //得到了一个角度“rad”，不过是以弧度为单位的
        //把它转换成角度 
        if (vx < 0) {
            deg = (-deg);
        }
        else if ((vx == 0) && (vy < 0)) {
            deg = 180;
        }
        return 180 - deg;
    };
    return ObjectUtils;
}());
//# sourceMappingURL=ObjectUtils.js.map