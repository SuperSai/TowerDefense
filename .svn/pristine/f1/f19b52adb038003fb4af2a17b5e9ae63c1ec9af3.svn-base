/*
* 强化;
*/
class StrengthenManager {
    constructor() {
        this.skillArr = [10, 1, 3, 2];
    }
    /** 检查是否需要出现强化红点 */
    checkRedPoint() {
        let self = this;
        let value = false;
        for (let i = 0, len = self.skillArr.length; i < len; i++) {
            let skillId = self.skillArr[i];
            let strengthenLevel = userData.querySkillAddition(skillId);
            let price = SkillManager.Instance.getSkillStrengthenCost(skillId, strengthenLevel + 1);
            if (M.player.Info.userEssence >= price) {
                value = true;
                break;
            }
        }
        if (value) {
            EventsManager.Instance.event(EventsType.STRENGTHEN_RED_POINT, "show");
        }
        else {
            userData.removeStrengthenRedPoint();
        }
    }
    static get Instance() {
        if (StrengthenManager._instance == null) {
            StrengthenManager._instance = new StrengthenManager();
        }
        return StrengthenManager._instance;
    }
}
//# sourceMappingURL=StrengthenManager.js.map