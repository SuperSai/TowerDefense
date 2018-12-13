/*
* 强化;
*/
var StrengthenManager = /** @class */ (function () {
    function StrengthenManager() {
        this.skillArr = [10, 1, 3, 2];
    }
    /** 检查是否需要出现强化红点 */
    StrengthenManager.prototype.checkRedPoint = function () {
        var self = this;
        var value = false;
        for (var i = 0, len = self.skillArr.length; i < len; i++) {
            var skillId = self.skillArr[i];
            var strengthenLevel = userData.querySkillAddition(skillId);
            var price = SkillManager.Instance.getSkillStrengthenCost(skillId, strengthenLevel + 1);
            if (userData.essence >= price) {
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
    };
    Object.defineProperty(StrengthenManager, "Instance", {
        get: function () {
            if (StrengthenManager._instance == null) {
                StrengthenManager._instance = new StrengthenManager();
            }
            return StrengthenManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return StrengthenManager;
}());
//# sourceMappingURL=StrengthenManager.js.map