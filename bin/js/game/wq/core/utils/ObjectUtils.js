class ObjectUtils {
    /** 替换数组中的数据 */
    static replaceItemToArray(array, inde, item) {
        array.splice(inde, 1, item);
    }
    /** 把数据转换成一个Point */
    static converToPoint(value, separater = ",") {
        if (value == null)
            return null;
        let sValue = String(value).split(separater);
        return new Laya.Point(parseFloat(sValue[0]), parseFloat(sValue[1]));
    }
    /** 把数据转换成number数组 */
    static splitToNumber(value, sprelator = ",") {
        let result = [];
        let sArray = value.split(sprelator);
        for (let i = 0; i < sArray.length; i++) {
            result.push(parseInt(sArray[i]));
        }
        return result;
    }
    /** 把字符串转换成一个数组 */
    static splitToString(value, sprelator = ",") {
        let result = [];
        let sArray = value.split(sprelator);
        for (let i = 0; i < sArray.length; i++) {
            result.push(sArray[i]);
        }
        return result;
    }
    /** 把数据转换成Point的数组 */
    static splitToPoints(value, separater = "#") {
        if (value == null)
            return [];
        let points = [];
        let sValue = ObjectUtils.splitToString(value);
        for (let i = 0; i < sValue.length; i++) {
            points.push(ObjectUtils.converToPoint(sValue[i]));
        }
        return points;
    }
    /** 移除数组中的指定元素 */
    static removeFromArray(target, array) {
        let index = array.indexOf(target);
        if (index >= 0)
            array.splice(index, 1);
        return array;
    }
    /** 深度复制 */
    static copyDataHandler(obj) {
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
    }
    /**
     * 拷贝数据
     * @param newObj  需要赋值的对象
     * @param oldData  拥有数据的对象
     */
    static copyData(newObj, oldData) {
        if (oldData == null)
            return;
        for (let key in newObj) {
            if (key == "__class__")
                continue;
            if (key == "__types__")
                continue;
            let attrValue = oldData[key];
            if (attrValue != undefined) {
                newObj[key] = oldData[key];
            }
        }
    }
    static assign(target, source, useTargetKeys) {
        if (target && source) {
            if (useTargetKeys) {
                for (let key in target) {
                    target[key] = source[key];
                }
            }
            else {
                for (let key in source) {
                    target[key] = source[key];
                }
            }
        }
    }
    static shuffle(arr) {
        let len = arr.length;
        let i = len;
        while (i--) {
            let ran = Math.floor(Math.random() * len);
            if (i != ran) {
                let tem = arr[i];
                arr[i] = arr[ran];
                arr[ran] = tem;
            }
        }
    }
    /** 点是否在区域中 */
    static pointIsInArea(rect, x, y) {
        return rect.contains(x, y);
    }
    /** 是否被点击 */
    static isHit(_checkSprite, _extW = 0, _extH = 0) {
        if (_checkSprite) {
            let touchPos = _checkSprite.getMousePoint();
            let touchArea = new Laya.Rectangle(0 - _extW / 2, 0 - _extH / 2, _checkSprite.width + _extW, _checkSprite.height + _extH);
            return touchArea.contains(touchPos.x, touchPos.y);
        }
        return false;
    }
    /** 求2对象之间的角度 */
    static getAngle(starPos, endPos) {
        let vx = starPos.x - endPos.x;
        let vy = starPos.y - endPos.y;
        let hyp = Math.sqrt(Math.pow(vy, 2) + Math.pow(vx, 2));
        let rad = Math.acos(vy / hyp);
        let deg = 180 / (Math.PI / rad);
        //得到了一个角度“rad”，不过是以弧度为单位的
        //把它转换成角度 
        if (vx < 0) {
            deg = (-deg);
        }
        else if ((vx == 0) && (vy < 0)) {
            deg = 180;
        }
        return 180 - deg;
    }
}
//# sourceMappingURL=ObjectUtils.js.map