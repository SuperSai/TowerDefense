class ViewRegisterMgr {
    /** 初始化注册界面 */
    initRegisterView() {
        ViewMgr.Ins.register(ViewConst.FollowRewardView, new FollowRewardView());
        ViewMgr.Ins.register(ViewConst.StrengthenView, new StrengthenView());
    }
    static get Instance() {
        if (!ViewRegisterMgr._instance) {
            ViewRegisterMgr._instance = new ViewRegisterMgr();
        }
        return ViewRegisterMgr._instance;
    }
}
//# sourceMappingURL=ViewRegisterMgr.js.map