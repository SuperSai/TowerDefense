class ViewRegisterMgr {
    /** 初始化注册界面 */
    initRegisterView() {
        ViewMgr.Ins.register(ViewConst.FollowRewardView, new FollowRewardView());
        ViewMgr.Ins.register(ViewConst.StrengthenView, new StrengthenView());
        ViewMgr.Ins.register(ViewConst.RewardGoldView, new RewardGoldView());
        ViewMgr.Ins.register(ViewConst.FriendConcurView, new FriendConcurView());
        ViewMgr.Ins.register(ViewConst.ShopView, new ShopView());
        ViewMgr.Ins.register(ViewConst.DiamondBuyView, new DiamondBuyView());
        ViewMgr.Ins.register(ViewConst.SkillExplainView, new SkillExplainView());
        ViewMgr.Ins.register(ViewConst.AdditionalRewardView, new AdditionalRewardView());
        ViewMgr.Ins.register(ViewConst.FreeGetPetView, new FreeGetPetView());
        ViewMgr.Ins.register(ViewConst.EvolutionView, new EvolutionView());
    }
    static get Instance() {
        if (!ViewRegisterMgr._instance) {
            ViewRegisterMgr._instance = new ViewRegisterMgr();
        }
        return ViewRegisterMgr._instance;
    }
}
//# sourceMappingURL=ViewRegisterMgr.js.map