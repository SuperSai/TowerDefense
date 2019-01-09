class TimerHandlers {
    /**执行间隔*/
    public delay: number = 0;
    /**是否重复执行*/
    public repeat: boolean;
    /**重复执行次数*/
    public repeatCount: number = 0;
    /**是否用帧率*/
    public userFrame: boolean;
    /**执行时间*/
    public exeTime: number = 0;
    /**处理函数*/
    public method: Function;
    /**处理函数所属对象*/
    public handerObj: any;
    /**完成处理函数*/
    public complateMethod: Function;
    /**完成处理函数所属对象*/
    public complateMethodObj: any;
    /**上次的执行时间*/
    public dealTime: number = 0;
    /**清理*/
    public clear(): void {
        this.method = null;
        this.handerObj = null;
        this.complateMethod = null;
        this.complateMethodObj = null;
    }
}