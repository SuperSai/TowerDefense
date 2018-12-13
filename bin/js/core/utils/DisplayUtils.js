/*
* 显示对象工具类;
*/
var DisplayUtils = /** @class */ (function () {
    function DisplayUtils() {
    }
    /**
    * 设置滤镜变灰
    */
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
    return DisplayUtils;
}());
//# sourceMappingURL=DisplayUtils.js.map