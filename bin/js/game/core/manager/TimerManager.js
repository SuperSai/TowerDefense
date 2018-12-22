/**
 * Timer管理类
 */
class TimerManager {
    /**
     * 构造函数
     */
    constructor() {
        let self = this;
        self._handlers = new Array();
        self._delHandlers = new Array();
        self._currTime = new Date().getTime();
        self._currFrame = 0;
        self._count = 0;
        self._timeScale = 1;
        Laya.timer.frameLoop(1, self, self.onEnterFrame);
    }
    /**
     * 设置时间参数
     * @param timeScale
     */
    setTimeScale(timeScale) {
        this._timeScale = timeScale;
    }
    /**
     * 每帧执行函数
     * @param frameTime
     */
    onEnterFrame() {
        this._currFrame++;
        this._currTime = new Date().getTime();
        for (var i = 0; i < this._count; i++) {
            var handler = this._handlers[i];
            var t = handler.userFrame ? this._currFrame : this._currTime;
            if (t >= handler.exeTime) {
                handler.method.call(handler.handerObj, (this._currTime - handler.dealTime) * this._timeScale);
                handler.dealTime = this._currTime;
                handler.exeTime += handler.delay;
                if (!handler.repeat) {
                    if (handler.repeatCount > 1) {
                        handler.repeatCount--;
                    }
                    else {
                        if (handler.complateMethod) {
                            handler.complateMethod.apply(handler.complateMethodObj);
                        }
                        this._delHandlers.push(handler);
                    }
                }
            }
        }
        while (this._delHandlers.length) {
            var handler = this._delHandlers.pop();
            this.remove(handler.method, handler.handerObj);
        }
    }
    create(useFrame, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj) {
        //参数监测
        if (delay < 0 || repeatCount < 0 || method == null) {
            return;
        }
        //先删除相同函数的计时
        this.remove(method, methodObj);
        //创建
        var handler = Laya.Pool.getItemByClass("TimerHandlers", TimerHandlers);
        handler.userFrame = useFrame;
        handler.repeat = repeatCount == 0;
        handler.repeatCount = repeatCount;
        handler.delay = delay;
        handler.method = method;
        handler.handerObj = methodObj;
        handler.complateMethod = complateMethod;
        handler.complateMethodObj = complateMethodObj;
        handler.exeTime = delay + (useFrame ? this._currFrame : this._currTime);
        handler.dealTime = this._currTime;
        this._handlers.push(handler);
        this._count++;
    }
    /**
     *
     * 定时执行
     * @param delay 执行间隔:毫秒
     * @param repeatCount 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param complateMethod 完成执行函数
     * @param complateMethodObj 完成执行函数所属对象
     *
     */
    doTimer(delay, repeatCount, method, methodObj, complateMethod = null, complateMethodObj = null) {
        this.create(false, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    }
    /**
     *
     * 定时执行
     * @param delay 执行间隔:帧频
     * @param repeatCount 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param complateMethod 完成执行函数
     * @param complateMethodObj 完成执行函数所属对象
     *
     */
    doFrame(delay, repeatCount, method, methodObj, complateMethod = null, complateMethodObj = null) {
        this.create(true, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj);
    }
    /**
     * 定时器执行数量
     * @return
     *
     */
    get count() {
        return this._count;
    }
    /**
     * 清理
     * @param method 要移除的函数
     * @param methodObj 要移除的函数对应的对象
     */
    remove(method, methodObj) {
        for (var i = 0; i < this._count; i++) {
            var handler = this._handlers[i];
            if (handler.method == method && handler.handerObj == methodObj) {
                this._handlers.splice(i, 1);
                Laya.Pool.recover("TimerHandlers", handler);
                this._count--;
                break;
            }
        }
    }
    /**
     * 清理
     * @param methodObj 要移除的函数对应的对象
     */
    removeAll(methodObj) {
        for (var i = 0; i < this._count; i++) {
            var handler = this._handlers[i];
            if (handler.handerObj == methodObj) {
                this._handlers.splice(i, 1);
                Laya.Pool.recover("TimerHandlers", handler);
                this._count--;
                i--;
            }
        }
    }
    /**
     * 检测是否已经存在
     * @param method
     * @param methodObj
     *
     */
    isExists(method, methodObj) {
        for (var i = 0; i < this._count; i++) {
            var handler = this._handlers[i];
            if (handler.method == method && handler.handerObj == methodObj) {
                return true;
            }
        }
        return false;
    }
    static get Instance() {
        if (!this._instance) {
            this._instance = new TimerManager();
        }
        return this._instance;
    }
}
//# sourceMappingURL=TimerManager.js.map