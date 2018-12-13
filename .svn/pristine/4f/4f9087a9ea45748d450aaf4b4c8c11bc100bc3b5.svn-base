var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 大厅管理类
*/
var HallManager = /** @class */ (function (_super) {
    __extends(HallManager, _super);
    function HallManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HallManager.prototype.setup = function () {
        var self = this;
        self._model = new HallModel();
    };
    /** 创建宠物 */
    HallManager.prototype.createPet = function (carparkList, iKind, isBackward) {
        if (isBackward === void 0) { isBackward = false; }
        var self = this;
        var curIndex = 0;
        var element = null;
        for (var index = 0; index < self._model.parkMonsterCount; index++) {
            curIndex = index;
            if (isBackward) {
                curIndex = self._model.parkMonsterCount - index - 1;
            }
            element = carparkList.getCell(curIndex);
            if (element) {
                var carParkSp = element.getChildByName('car');
                if (carParkSp && carParkSp.isEmpty() && !carParkSp.isBox() && !carParkSp.isLock()) {
                    carParkSp.setKind(iKind, curIndex);
                    carParkSp.setStage(1);
                    Laya.SoundManager.playSound("musics/summonhero.mp3");
                    //本地保存
                    userData.setCarparkSave(carParkSp);
                    return carParkSp;
                }
            }
        }
        if (!isBackward) {
            CommonFun.showTip("位置不足");
            return null;
        }
    };
    /** 获取每秒收益 */
    HallManager.prototype.getCalculateIncomePerSec = function (carparkList) {
        var self = this;
        var incomePerSec = 0;
        var element = null;
        if (carparkList) {
            for (var index = 0; index < self._model.parkMonsterCount; index++) {
                element = carparkList.getCell(index);
                if (element) {
                    var carParkSp = element.getChildByName('car');
                    if (carParkSp && carParkSp.isRunning()) {
                        incomePerSec += carParkSp.getIncomePerSecond() *
                            self._model.userExtraIncome *
                            self._model.userAcceValue *
                            PlayerManager.Instance.Info.userLevelExtraIncome;
                    }
                }
            }
        }
        return incomePerSec;
    };
    Object.defineProperty(HallManager.prototype, "hallData", {
        /** 大厅中的数据 */
        get: function () { return this._model; },
        set: function (value) { this._model = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HallManager, "Instance", {
        get: function () {
            if (HallManager._instance == null) {
                HallManager._instance = new HallManager();
            }
            return HallManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    return HallManager;
}(Laya.EventDispatcher));
//# sourceMappingURL=HallManager.js.map