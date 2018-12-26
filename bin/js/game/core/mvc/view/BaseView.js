/**
 *  View基类，继承自Laya.Component
 */
class BaseView extends Laya.View {
    /**
     * 构造函数
     * @param $controller 所属模块
     * @param $parent 父级
    */
    constructor($layer, $class) {
        super();
        this._resources = null;
        this._myParent = LayerMgr.Instance.getLayerByType($layer);
        this._isInit = false;
        this._ui = $class;
    }
    /**
     * 获取我的父级
     * @returns {Laya.Node}
     */
    get myParent() {
        return this._myParent;
    }
    /**
     * 添加到父级
     */
    addToParent() {
        AlignUtils.setToScreenGoldenPos(this);
        this._myParent.addChild(this);
    }
    /** 初始化UI界面 */
    initUIView() {
        this._ui = new this._ui();
        this.addChild(this._ui);
        this.size(this.ui.width, this.ui.height);
    }
    /**
     * 从父级移除
     */
    removeFromParent() {
        DisplayUtils.removeFromParent(this);
    }
    /**
     *对面板进行显示初始化，用于子类继承
    */
    initUI() {
        this._isInit = true;
    }
    /**
     * 对面板数据的初始化，用于子类继承
     */
    initData() { }
    /**
     * 添加监听事件
     */
    addEvents() { }
    /**
     * 移除监听事件
     */
    removeEvents() { }
    /**
     * 是否已经初始化
     * @returns {boolean}
     */
    isInit() {
        return this._isInit;
    }
    /**
     * 面板是否显示
     */
    isShow() {
        return this.stage != null && this.visible && this._myParent.contains(this);
    }
    /**
     * 销毁
     */
    destroy() {
        this.removeEvents();
        this._myParent = null;
        this._ui.removeSelf();
        this._ui = null;
    }
    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    open(...param) { }
    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    close(...param) {
        this.removeEvents();
    }
    /**
     * 设置是否隐藏
     * @param value
     */
    setVisible(value) {
        this.visible = value;
    }
    /**
     * 设置初始加载资源
     * @param resources
     */
    setResources(resources) {
        this._resources = resources;
    }
    /**
     /**
     * 加载面板所需资源
     */
    loadResource(loadComplete, initComplete) {
        if (this._resources && this._resources.length > 0) {
            ResUtils.loadGroup(this._resources, () => {
                loadComplete && loadComplete();
                initComplete && initComplete();
            }, this);
        }
        else {
            loadComplete && loadComplete();
            initComplete && initComplete();
        }
    }
    get ui() { return this._ui; }
    set ui(value) { this._ui = value; }
}
//# sourceMappingURL=BaseView.js.map