class ViewMgr {
    /** 构造函数 */
    constructor() {
        this._views = {};
        this._opens = [];
    }
    /**
   * 面板注册
   * @param key 面板唯一标识
   * @param view 面板
   */
    register(key, view) {
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
    unregister(key) {
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
    open(key, ...param) {
        var view = this.getView(key);
        if (view == null) {
            return;
        }
        if (view.isShow()) {
            view.initUI();
            view.open.apply(view, param);
            view.initData();
            return view;
        }
        if (view.isInit()) {
            view.addToParent();
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
    getView(key) {
        return this._views[key];
    }
    /**
     * 关闭面板
     * @param key 面板唯一标识
     * @param param 参数
     *
     */
    close(key, ...param) {
        if (!this.isShow(key)) {
            return;
        }
        var view = this.getView(key);
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
    isShow(key) {
        return this._opens.indexOf(key) != -1;
    }
    /** 当前ui打开数量 */
    currOpenNum() {
        return this._opens.length;
    }
    /** 清空处理 */
    clear() {
        this.closeAll();
        this._views = {};
    }
    /** 关闭所有开启中的UI */
    closeAll() {
        while (this._opens.length) {
            this.close(this._opens[0]);
        }
    }
    /**
     * 销毁一个面板
     * @param key 唯一标识
     * @param newView 新面板
     */
    destroy(key, newView = null) {
        var oldView = this.getView(key);
        if (oldView) {
            this.unregister(key);
            oldView.destroy();
            oldView = null;
        }
        this.register(key, newView);
    }
    static get Ins() {
        if (ViewMgr._instance == null) {
            ViewMgr._instance = new ViewMgr();
        }
        return ViewMgr._instance;
    }
}
//# sourceMappingURL=ViewMgr.js.map