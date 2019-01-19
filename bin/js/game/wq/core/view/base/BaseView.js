/**
 *  View基类，继承自Laya.Component
 */
class BaseView extends Laya.View {
    /** 构造函数 */
    constructor($layer, $class, isShowMask = true) {
        super();
        this.isRemoveBanner = true;
        this._resources = null;
        this._myParent = LayerMgr.Ins.getLayerByType($layer);
        this._isInit = false;
        this._isShowMask = isShowMask;
        this._ui = $class;
    }
    /** 获取我的父级 */
    get myParent() {
        return this._myParent;
    }
    /** 添加到父级 */
    addToParent() {
        AlignUtils.setToScreenGoldenPos(this);
        if (this._isShowMask) {
            this._myParent.maskEnabled = true;
            this._myParent.addChildWithMaskCall(this, () => {
                this.removeFromParent();
                this.close();
            });
        }
        else {
            this._myParent.maskEnabled = false;
            this._myParent.addChild(this);
        }
    }
    /** 初始化UI界面 */
    initUIView() {
        try {
            this._ui = new this._ui();
        }
        catch (error) {
        }
        finally {
            this.addChild(this._ui);
            this.size(this.ui.width, this.ui.height);
        }
    }
    /** 从父级移除 */
    removeFromParent() {
        DisplayUtils.removeFromParent(this);
    }
    /** 对面板进行显示初始化，用于子类继承 */
    initUI() {
        this._isInit = true;
    }
    /** 对面板数据的初始化，用于子类继承 */
    initData() {
        this._isInit = true;
    }
    /** 添加监听事件 */
    addEvents() { }
    /** 移除监听事件 */
    removeEvents() { }
    /** 是否已经初始化 */
    isInit() {
        return this._isInit;
    }
    /** 面板是否显示 */
    isShow() {
        return this.stage != null && this.visible && this._myParent.contains(this);
    }
    /** 面板开启执行函数，用于子类继承 */
    open(...param) {
        this._datas = param;
    }
    /** 设置是否隐藏 */
    setVisible(value) {
        this.visible = value;
    }
    /** 设置初始加载资源 */
    setResources(resources) {
        this._resources = resources;
    }
    /** 加载面板所需资源 */
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
    /** 面板关闭执行函数，用于子类继承 */
    close(...param) {
        this.removeEvents();
        if (this.isRemoveBanner) {
            SDKManager.Instance.closeBannerAd();
        }
    }
    /** 销毁 */
    destroy() {
        this.removeEvents();
        this._myParent = null;
        this._ui.removeSelf();
        this._ui = null;
        SDKManager.Instance.closeBannerAd();
    }
    get ui() { return this._ui; }
    set ui(value) { this._ui = value; }
    get datas() { return this._datas; }
    set datas(value) { this._datas = value; }
}
//# sourceMappingURL=BaseView.js.map