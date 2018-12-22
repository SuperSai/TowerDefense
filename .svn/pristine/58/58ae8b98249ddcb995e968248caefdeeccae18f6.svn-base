/**
 * Debuf调试工具
 */
class DebugUtils {
    constructor() {
        DebugUtils._startTimes = {};
    }
    /**
     * 设置调试是否开启
     * @param flag
     *
     */
    static isOpen(flag) {
        this._isOpen = flag;
    }
    /**
     * 是否是调试模式
     * @returns {boolean}
     */
    static isDebug() {
        return this._isOpen;
    }
    /**
     * 开始
     * @param key 标识
     * @param minTime 最小时间
     *
     */
    static start(key) {
        if (!this._isOpen) {
            return;
        }
        this._startTimes[key] = new Date().getTime();
    }
    /**
     * 停止
     */
    static stop(key) {
        if (!this._isOpen) {
            return 0;
        }
        if (!this._startTimes[key]) {
            return 0;
        }
        var cha = new Date().getTime() - this._startTimes[key];
        if (cha > this._threshold) {
            // Log.trace(key + ": " + cha);
        }
        return cha;
    }
    /**
     * 设置时间间隔阈值
     * @param value
     */
    static setThreshold(value) {
        this._threshold = value;
    }
}
DebugUtils._threshold = 3;
//# sourceMappingURL=DebugUtils.js.map