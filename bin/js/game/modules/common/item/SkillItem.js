/*
* 技能Item;
*/
class SkillItem extends ui.common.item.SkillItemUI {
    constructor() {
        super();
    }
    initSkill(url) {
        this.imgIcon.skin = url;
    }
    updateTime(time) {
        this.txt_time.text = time;
    }
}
//# sourceMappingURL=SkillItem.js.map