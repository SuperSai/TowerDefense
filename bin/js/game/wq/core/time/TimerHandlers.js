class TimerHandlers {
    constructor() {
        /**执行间隔*/
        this.delay = 0;
        /**重复执行次数*/
        this.repeatCount = 0;
        /**执行时间*/
        this.exeTime = 0;
        /**上次的执行时间*/
        this.dealTime = 0;
    }
    /**清理*/
    clear() {
        this.method = null;
        this.handerObj = null;
        this.complateMethod = null;
        this.complateMethodObj = null;
    }
}
//# sourceMappingURL=TimerHandlers.js.map