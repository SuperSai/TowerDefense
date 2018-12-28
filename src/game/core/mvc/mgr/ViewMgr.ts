
class ViewMgr {

    /** 已注册的UI */
    private _views: any;

    /** 开启中UI */
    private _opens: Array<number>;

    /** 构造函数 */
    public constructor() {
        this._views = {};
        this._opens = [];
    }

    /**
   * 面板注册
   * @param key 面板唯一标识
   * @param view 面板
   */
    public register(key: number, view: IBaseView): void {
        if (view == null) {
            return;
        }
        if (this._views[key]) {
            return;
        }
        this._views[key] = view;
    }

    /**
     * 面板解除注册
     * @param key
     */
    public unregister(key: number): void {
        if (!this._views[key]) {
            return;
        }
        this._views[key] = null;
        delete this._views[key];
    }

    /**
     * 开启面板
     * @param key 面板唯一标识
     * @param param 参数
     */
    public open(key: number, callback: Function = null, ...param: any[]): IBaseView {
        var view: IBaseView = this.getView(key);
        if (view == null) {
            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.36"));
            return;
        }
        if (view.isShow()) {
            view.callback = callback;
            view.initUI();
            view.open.apply(view, param);
            view.initData();
            return view;
        }

        if (view.isInit()) {
            view.addToParent();
            view.callback = callback;
            view.initUI();
            view.addEvents();
            view.open.apply(view, param);
            view.initData();
        }
        else {
            view.loadResource(function () {
                view.setVisible(false);
                view.initUIView();
                view.addToParent();
            }.bind(this), function () {
                view.callback = callback;
                view.initUI();
                view.addEvents();
                view.open.apply(view, param);
                view.initData();
                view.setVisible(true);
            }.bind(this));
        }

        this._opens.push(key);
        return view;
    }

    /**
     * 根据唯一标识获取一个UI对象
     * @param key
     * @returns {any}
     */
    public getView(key: number): IBaseView {
        return this._views[key];
    }

    /**
     * 关闭面板
     * @param key 面板唯一标识
     * @param param 参数
     *
     */
    public close(key: number, ...param: any[]): void {
        if (!this.isShow(key)) {
            return;
        }

        var view: IBaseView = this.getView(key);
        if (view == null) {
            return;
        }

        var viewIndex = this._opens.indexOf(key);
        if (viewIndex >= 0) {
            this._opens.splice(viewIndex, 1);
        }

        view.removeFromParent();
        view.close.apply(view, param);
    }

    /**
     * 检测一个UI是否开启中
     * @param key
     * @returns {boolean}
     */
    public isShow(key: number): boolean {
        return this._opens.indexOf(key) != -1;
    }

    /** 当前ui打开数量 */
    public currOpenNum(): number {
        return this._opens.length;
    }

    /** 清空处理 */
    public clear(): void {
        this.closeAll();
        this._views = {};
    }

    /** 关闭所有开启中的UI */
    public closeAll(): void {
        while (this._opens.length) {
            this.close(this._opens[0]);
        }
    }

    /**
     * 销毁一个面板
     * @param key 唯一标识
     * @param newView 新面板
     */
    public destroy(key: number, newView: IBaseView = null): void {
        var oldView: IBaseView = this.getView(key);
        if (oldView) {
            this.unregister(key);
            oldView.destroy();
            oldView = null;
        }
        this.register(key, newView);
    }


    private static _instance: ViewMgr;
    public static get Ins(): ViewMgr {
        if (ViewMgr._instance == null) {
            ViewMgr._instance = new ViewMgr();
        }
        return ViewMgr._instance;
    }
}