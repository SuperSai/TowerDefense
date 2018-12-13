var MathTools = /** @class */ (function () {
    function MathTools() {
    }
    /** 生成随机浮点数，随机数范围包含min值，但不包含max值 */
    MathTools.range = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    /** 生成随机整数，随机整数范围包含min值和max值 */
    MathTools.rangeInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    MathTools.trueOrFalse = function () {
        return Math.random() >= 0.5;
    };
    return MathTools;
}());
//# sourceMappingURL=MathTools.js.map