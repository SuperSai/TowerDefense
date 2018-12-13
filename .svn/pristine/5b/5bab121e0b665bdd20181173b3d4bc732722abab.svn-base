/*
* 显示对象工具类;
*/
var DisplayUtils = /** @class */ (function () {
    function DisplayUtils() {
    }
    DisplayUtils.mouseEnabled = function (display, value) {
        display.mouseEnabled = value;
        if (display.numChildren > 0) {
            for (var _i = 0, _a = display._childs; _i < _a.length; _i++) {
                var child = _a[_i];
                this.mouseEnabled(child, value);
            }
        }
    };
    /** 设置滤镜变灰 */
    DisplayUtils.setFilters = function (component) {
        if (component) {
            //颜色矩阵数组
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new Laya.ColorFilter(colorMatrix);
            component.filters = [colorFlilter];
        }
    };
    /** 颜色滤镜 */
    DisplayUtils.createColorFilter = function (index) {
        if (index === void 0) { index = 0; }
        if (index == 1) {
            //变暗
            var colorV = 0.6;
            var colorMat = [
                colorV, 0, 0, 0, 0,
                0, colorV, 0, 0, 0,
                0, 0, colorV, 0, 0,
                0, 0, 0, 1, 0,
            ];
            //创建一个颜色滤镜对象
            var colorFilter = new Laya.ColorFilter(colorMat);
            return [colorFilter];
        }
        else if (index == 2) {
            //变黑
            var colorV = 0.6;
            var colorMat = [
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 1, 0,
            ];
            //创建一个颜色滤镜对象
            var colorFilter = new Laya.ColorFilter(colorMat);
            return [colorFilter];
        }
        return [];
    };
    /**
     * 设置文本颜色
     * @param component 字体
     * @param flag true 有钱的颜色  false 没钱的颜色
     */
    DisplayUtils.setLabelColor = function (component, flag) {
        if (component) {
            if (flag) {
                component.color = "#FFFFFF";
            }
            else {
                component.color = "#FF802C";
            }
        }
    };
    DisplayUtils.removeFromArray = function (target, array) {
        var index = array.indexOf(target);
        if (index >= 0)
            array.splice(index, 1);
        return array;
    };
    /** 移除所有子对象并回收 */
    DisplayUtils.removeAllChildren = function (container) {
        if (!container)
            return;
        if (container && container.numChildren) {
            while (container.numChildren) {
                var node = container.getChildAt(0);
                if (node) {
                    if (node.parent) {
                        node.parent.removeChild(node);
                        ObjectPool.push(node);
                    }
                    node = null;
                }
            }
        }
    };
    return DisplayUtils;
}());
//# sourceMappingURL=DisplayUtils.js.map