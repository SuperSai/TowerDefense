
class ViewRegisterMgr {

    /** 初始化注册界面 */
    public initRegisterView(): void {
        ViewMgr.Ins.register(ViewConst.FollowRewardView, new FollowRewardView());
    }

    private static _instance: ViewRegisterMgr;
    public static get Instance(): ViewRegisterMgr {
        if (!ViewRegisterMgr._instance) {
            ViewRegisterMgr._instance = new ViewRegisterMgr();
        }
        return ViewRegisterMgr._instance;
    }
}