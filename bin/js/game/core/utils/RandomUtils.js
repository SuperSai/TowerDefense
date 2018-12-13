/**
 * 随机数工具类
 */
var RandomUtils = /** @class */ (function () {
    function RandomUtils() {
    }
    /** 生成随机浮点数，随机数范围包含min值，但不包含max值 */
    RandomUtils.range = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    /** 生成随机整数，随机整数范围包含min值和max值 */
    RandomUtils.rangeInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    /**
     * 获取一个区间的随机数
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    RandomUtils.limit = function ($from, $end) {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range = $end - $from;
        return $from + Math.random() * range;
    };
    /**
     * 获取一个区间的随机数(帧数)
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    RandomUtils.limitInteger = function ($from, $end) {
        return Math.round(this.limit($from, $end));
    };
    /**
     * 在一个数组中随机获取一个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    RandomUtils.randomArray = function (arr) {
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    };
    /**
     * 在 start 与 stop之间取一个随机整数，可以用step指定间隔， 但不包括较大的端点（start与stop较大的一个）
     * 如
     * Random.randrange(1, 10, 3)
     * 则返回的可能是   1 或  4 或  7  , 注意 这里面不会返回10，因为是10是大端点
     * @return 假设 start < stop,  [start, stop) 区间内的随机整数
     */
    RandomUtils.randrange = function (start, stop, step) {
        if (step === void 0) { step = 1; }
        if (step == 0)
            throw new Error('step 不能为 0');
        var width = stop - start;
        if (width == 0)
            throw new Error('没有可用的范围(' + start + ',' + stop + ')');
        if (width < 0)
            width = start - stop;
        var n = Math.floor((width + step - 1) / step);
        return Math.floor(Math.random() * n) * step + Math.min(start, stop);
    };
    /**
     * 返回a 到 b直间的随机整数，包括 a 和 b
     * @param a
     * @param b
     * @return [a, b] 直接的随机整数
     *
     */
    RandomUtils.randint = function (a, b) {
        if (a > b)
            a++;
        else
            b++;
        return this.randrange(a, b);
    };
    return RandomUtils;
}());
//# sourceMappingURL=RandomUtils.js.map