/**
 *  View基类，继承自Laya.Component
 */
class BaseView extends Laya.View implements IBaseView {

    private _myParent: Laya.Node;
    private _isInit: boolean;
    private _resources: string[] = null;
    private _ui: any;

    /**
     * 构造函数
     * @param $controller 所属模块
     * @param $parent 父级
    */
    public constructor($layer: number, $class: any) {
        super();
        this._myParent = LayerMgr.Instance.getLayerByType($layer);
        this._isInit = false;
        this._ui = $class;
    }

    /**
     * 获取我的父级
     * @returns {Laya.Node}
     */
    public get myParent(): Laya.Node {
        return this._myParent;
    }

    /**
     * 添加到父级
     */
    public addToParent(): void {
        AlignUtils.setToScreenGoldenPos(this);
        this._myParent.addChild(this);
    }

    /** 初始化UI界面 */
    public initUIView(): void {
        this._ui = new this._ui();
        this.addChild(this._ui);
        this.size(this.ui.width, this.ui.height);
    }

    /**
     * 从父级移除
     */
    public removeFromParent(): void {
        DisplayUtils.removeFromParent(this);
    }

    /**
     *对面板进行显示初始化，用于子类继承
    */
    public initUI(): void {
        this._isInit = true;
    }

    /**
     * 对面板数据的初始化，用于子类继承
     */
    public initData(): void { }

    /**
     * 添加监听事件
     */
    public addEvents(): void { }

    /**
     * 移除监听事件
     */
    public removeEvents(): void { }

    /**
     * 是否已经初始化
     * @returns {boolean}
     */
    public isInit(): boolean {
        return this._isInit;
    }

    /**
     * 面板是否显示
     */
    public isShow(): boolean {
        return this.stage != null && this.visible && this._myParent.contains(this);
    }

    /**
     * 销毁
     */
    public destroy(): void {
        this.removeEvents();
        this._myParent = null;
        this._ui.removeSelf();
        this._ui = null;
    }

    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    public open(...param: any[]): void { }

    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    public close(...param: any[]): void {
        this.removeEvents();
    }

    /**
     * 设置是否隐藏
     * @param value
     */
    public setVisible(value: boolean): void {
        this.visible = value;
    }

    /**
     * 设置初始加载资源
     * @param resources
     */
    public setResources(resources: string[]): void {
        this._resources = resources;
    }

    /**
     /**
     * 加载面板所需资源
     */
    public loadResource(loadComplete: Function, initComplete: Function): void {
        if (this._resources && this._resources.length > 0) {
            ResUtils.loadGroup(this._resources, () => {
                loadComplete && loadComplete();
                initComplete && initComplete();
            }, this);
        } else {
            loadComplete && loadComplete();
            initComplete && initComplete();
        }
    }

    public get ui(): any { return this._ui; }
    public set ui(value: any) { this._ui = value; }
}