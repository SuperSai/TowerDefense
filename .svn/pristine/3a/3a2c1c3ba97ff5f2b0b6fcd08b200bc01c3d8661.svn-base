class BuffController extends Laya.EventDispatcher {
    constructor() {
        super(...arguments);
        this._buffValueList = [];
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new BuffController();
        }
        return this._instance;
    }
    init(parent) {
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
    addBuffFromSkyDrop(sheet) {
        switch (sheet.id) {
            case SkyDropSheet.ATTACK_SPEED_INCREASE: {
                this.activateBuff(BuffSheet.ATTACK_SPEED_INCREASE, sheet);
                break;
            }
            case SkyDropSheet.ATTACK_VALUE_INCREASE: {
                this.activateBuff(BuffSheet.ATTACK_VALUE_INCREASE, sheet);
                break;
            }
            case SkyDropSheet.CRIT_RATE_INCREASE: {
                this.activateBuff(BuffSheet.CRIT_RATE_INCREASE, sheet);
                break;
            }
            case SkyDropSheet.COIN_OBTAIN_INCREASE: {
                this.activateBuff(BuffSheet.COIN_OBTAIN_INCREASE, sheet);
                break;
            }
        }
    }
    getBuffValueById(id) {
        if (!this._buffValueList[id]) {
            this._buffValueList[id] = 0;
        }
        return this._buffValueList[id];
    }
    hasBuff() {
        const num = this._buffValueList.reduce((pre, curr, idx, arr) => {
            return pre + curr;
        });
        console.log("@FREEMAN: Activated Buff Num:", num);
        return num > 0;
    }
    activateBuff(id, sheet) {
        this._buffValueList[id] = sheet.num;
        this._buffContainer.boxBuffList.addChild(this._buffIconList[id]);
        Laya.timer.once(sheet.duration, this, () => {
            this._buffValueList[id] = 0;
            this._buffIconList[id].removeSelf();
        });
    }
}
class BuffSheet {
}
/** 攻击速度按百分比增加 */
BuffSheet.ATTACK_SPEED_INCREASE = 0;
/** 攻击力按百分比增加 */
BuffSheet.ATTACK_VALUE_INCREASE = 1;
/** 暴击率按百分比增加 */
BuffSheet.CRIT_RATE_INCREASE = 2;
/** 金币获得按百分比增加 */
BuffSheet.COIN_OBTAIN_INCREASE = 3;
//# sourceMappingURL=BuffController.js.map