class BuffController extends Laya.EventDispatcher {

    private static _instance: BuffController;

    public static getInstance(): BuffController {
        if (!this._instance) {
            this._instance = new BuffController();
        }
        return this._instance;
    }

    private _container: Laya.View;

    private _buffContainer: ui.hall.BuffIconListUI;
    private _buffIconList: Laya.Image[];
    private _buffValueList: number[] = [];

    public init(parent: Laya.View): void {
        this._container = parent;
        this._container.mouseThrough = true;
        this._buffContainer = new ui.hall.BuffIconListUI();
        this._container.addChild(this._buffContainer);

        this._buffIconList = [];
        this._buffIconList[BuffSheet.ATTACK_SPEED_INCREASE] = new Laya.Image("images/buff_1.png");
        this._buffIconList[BuffSheet.ATTACK_VALUE_INCREASE] = new Laya.Image("images/buff_2.png");
        this._buffIconList[BuffSheet.CRIT_RATE_INCREASE] = new Laya.Image("images/buff_3.png");
        this._buffIconList[BuffSheet.COIN_OBTAIN_INCREASE] = new Laya.Image("images/buff_4.png");

        this._buffValueList = [0, 0, 0, 0];
    }

    public addBuffFromSkyDrop(sheet: SkyDropSheet): void {
        let skillUrl: string = "";
        switch (sheet.id) {
            case SkyDropSheet.ATTACK_SPEED_INCREASE: {
                this.activateBuff(BuffSheet.ATTACK_SPEED_INCREASE, sheet);
                skillUrl = "images/buff_1.png";
                break;
            }
            case SkyDropSheet.ATTACK_VALUE_INCREASE: {
                this.activateBuff(BuffSheet.ATTACK_VALUE_INCREASE, sheet);
                skillUrl = "images/buff_2.png";
                break;
            }
            case SkyDropSheet.CRIT_RATE_INCREASE: {
                this.activateBuff(BuffSheet.CRIT_RATE_INCREASE, sheet);
                skillUrl = "images/buff_3.png";
                break;
            }
            case SkyDropSheet.COIN_OBTAIN_INCREASE: {
                this.activateBuff(BuffSheet.COIN_OBTAIN_INCREASE, sheet);
                skillUrl = "images/buff_4.png";
                break;
            }
        }
        let skill: SkillItem = new SkillItem();
        skill.initSkill(skillUrl);
        this.setSkillTime(skill, sheet.duration);
        this._buffContainer.boxBuffList.addChild(skill);
    }

    private setSkillTime(skillItem: any, time: number): void {
        let skillTime: number = time;
        let timeInt = setInterval(() => {
            skillTime -= 1000;
            skillItem.updateTime(TimeUtil.getTimeCD(skillTime));
            if (skillTime <= 0) {
                clearInterval(timeInt);
                skillItem.removeSelf();
                skillItem = null;
            }
        }, 1000);
    }

    public getBuffValueById(id: number): number {
        if (!this._buffValueList[id]) {
            this._buffValueList[id] = 0;
        }
        return this._buffValueList[id];
    }

    public hasBuff(): boolean {
        const num: number = this._buffValueList.reduce((pre, curr, idx, arr) => {
            return pre + curr;
        });
        console.log("@FREEMAN: Activated Buff Num:", num);
        return num > 0;
    }

    private activateBuff(id: number, sheet: SkyDropSheet): void {
        this._buffValueList[id] = sheet.num;
        // this._buffContainer.boxBuffList.addChild(this._buffIconList[id]);
        Laya.timer.once(sheet.duration, this, () => {
            this._buffValueList[id] = 0;
            // this._buffIconList[id].removeSelf();
        })
    }
}

class BuffSheet {
    /** 攻击速度按百分比增加 */
    public static ATTACK_SPEED_INCREASE: number = 0;
    /** 攻击力按百分比增加 */
    public static ATTACK_VALUE_INCREASE: number = 1;
    /** 暴击率按百分比增加 */
    public static CRIT_RATE_INCREASE: number = 2;
    /** 金币获得按百分比增加 */
    public static COIN_OBTAIN_INCREASE: number = 3;
}