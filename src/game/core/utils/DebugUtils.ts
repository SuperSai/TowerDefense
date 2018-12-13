/**
 * Debuf调试工具
 */
class DebugUtils {
    private static _isOpen: boolean;
    private static _startTimes: any;
    private static _threshold: number = 3;

    public constructor() {
        DebugUtils._startTimes = {};
    }

    /**
     * 设置调试是否开启
     * @param flag
     *
     */
    public static isOpen(flag: boolean): void {
        this._isOpen = flag;
    }

    /**
     * 是否是调试模式
     * @returns {boolean}
     */
    public static isDebug(): boolean {
        return this._isOpen;
    }

    /**
     * 开始
     * @param key 标识
     * @param minTime 最小时间
     *
     */
    public static start(key: string): void {
        if (!this._isOpen) {
            return;
        }

        this._startTimes[key] = new Date().getTime();
    }

    /**
     * 停止
     */
    public static stop(key): number {
        if (!this._isOpen) {
            return 0;
        }

        if (!this._startTimes[key]) {
            return 0;
        }

        var cha: number = new Date().getTime() - this._startTimes[key];
        if (cha > this._threshold) {
            // Log.trace(key + ": " + cha);
        }
        return cha;
    }

    /**
     * 设置时间间隔阈值
     * @param value
     */
    public static setThreshold(value: number): void {
        this._threshold = value;
    }
}