class ResUtils {
    static loadGroup(group, onComplete, thisObject) {
        Laya.loader.load(this.combGroupList(group), Laya.Handler.create(thisObject, onComplete));
    }
    /** 组合资源组名 */
    static combGroupList(group) {
        let newGroup = [];
        for (let i = 0, len = group.length; i < len; i++) {
            newGroup.push({ url: "res/atlas/images/" + group[i] + ".atlas", type: Laya.Loader.ATLAS });
        }
        return newGroup;
    }
}
//# sourceMappingURL=ResUtils.js.map