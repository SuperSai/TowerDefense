/*
* 技能Item;
*/
class SkillItem extends ui.buff.SkillItemUI {

    constructor() {
        super();
    }

    public initSkill(url: string): void {
        this.imgIcon.skin = url;
    }

    public updateTime(time: string): void {
        this.txt_time.text = time;
    }
}