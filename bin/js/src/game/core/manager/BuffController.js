var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BuffController = /** @class */ (function (_super) {
    __extends(BuffController, _super);
    function BuffController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._buffValueList = [];
        return _this;
    }
    BuffController.getInstance = function () {
        if (!this._instance) {
            this._instance = new BuffController();
        }
        return this._instance;
    };
    BuffController.prototype.init = function (parent) {
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
    };
    BuffController.prototype.addBuffFromSkyDrop = function (sheet) {
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
    };
    BuffController.prototype.getBuffValueById = function (id) {
        if (!this._buffValueList[id]) {
            this._buffValueList[id] = 0;
        }
        return this._buffValueList[id];
    };
    BuffController.prototype.hasBuff = function () {
        var num = this._buffValueList.reduce(function (pre, curr, idx, arr) {
            return pre + curr;
        });
        console.log("@FREEMAN: Activated Buff Num:", num);
        return num > 0;
    };
    BuffController.prototype.activateBuff = function (id, sheet) {
        var _this = this;
        this._buffValueList[id] = sheet.num;
        this._buffContainer.boxBuffList.addChild(this._buffIconList[id]);
        Laya.timer.once(sheet.duration, this, function () {
            _this._buffValueList[id] = 0;
            _this._buffIconList[id].removeSelf();
        });
    };
    return BuffController;
}(Laya.EventDispatcher));
var BuffSheet = /** @class */ (function () {
    function BuffSheet() {
    }
    /** 攻击速度按百分比增加 */
    BuffSheet.ATTACK_SPEED_INCREASE = 0;
    /** 攻击力按百分比增加 */
    BuffSheet.ATTACK_VALUE_INCREASE = 1;
    /** 暴击率按百分比增加 */
    BuffSheet.CRIT_RATE_INCREASE = 2;
    /** 金币获得按百分比增加 */
    BuffSheet.COIN_OBTAIN_INCREASE = 3;
    return BuffSheet;
}());
//# sourceMappingURL=BuffController.js.map