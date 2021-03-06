/*
* 强化;
*/
class StrengthenManager {

    private skillArr: Array<number> = [10, 1, 3, 2];

    constructor() {

    }

    /** 检查是否需要出现强化红点 */
    public checkRedPoint(): void {
        let self = this;
        let value: boolean = false;
        for (let i: number = 0, len: number = self.skillArr.length; i < len; i++) {
            let skillId: number = self.skillArr[i];
            let strengthenLevel: number = userData.querySkillAddition(skillId);
            let price: number = SkillManager.Instance.getSkillStrengthenCost(skillId, strengthenLevel + 1);
            if (M.player.Info.userEssence >= price) {
                value = true;
                break;
            }
        }
        if (value) {
            EventsManager.Instance.event(EventsType.STRENGTHEN_RED_POINT, "show");
        } else {
            userData.removeStrengthenRedPoint();
        }
    }

    private static _instance: StrengthenManager;
    public static get Instance(): StrengthenManager {
        if (StrengthenManager._instance == null) {
            StrengthenManager._instance = new StrengthenManager();
        }
        return StrengthenManager._instance;
    }
}