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
var NoviceManager = /** @class */ (function (_super) {
    __extends(NoviceManager, _super);
    function NoviceManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoviceManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new NoviceManager();
        }
        return this._instance;
    };
    // private _targetCircleAnim: Animation;
    NoviceManager.prototype.init = function (groupId) {
        if (groupId === void 0) { groupId = 1; }
        this._currGroupId = groupId;
        this._finalGroupId =
            NoviceGuide.dataArr[NoviceGuide.dataArr.length - 1].groupId;
        this._activateTargets = [];
    };
    Object.defineProperty(NoviceManager.prototype, "isComplete", {
        get: function () {
            return this._currGroupId > this._finalGroupId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceManager.prototype, "isRunning", {
        get: function () {
            return this.ui && this.ui.parent && this.ui.visible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceManager.prototype, "currGroupId", {
        get: function () {
            return this._currGroupId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NoviceManager.prototype, "saveFunc", {
        set: function (func) {
            this._saveFunc = func;
        },
        enumerable: true,
        configurable: true
    });
    NoviceManager.prototype.start = function (container) {
        NoviceManager.isComplete = this.isComplete;
        if (NoviceManager.isComplete) {
            return;
        }
        if (container) {
            this._container = container;
        }
        else {
            this._container = M.layer.guideLayer;
        }
        this._currStepId = 0;
        this._currGroupSheets = [].concat(NoviceGuide.getSheetByFieldValue("groupId", this._currGroupId));
        this.ui = new ui.guide.NoviceViewUI();
        this.ui.mouseEnabled = true;
        this.ui.mouseThrough = true;
        this.ui.viewStackNovice.selectedIndex = NoviceType.NONE;
        this.ui.visible = false;
        this.ui.btnReturnNovice1.on(Laya.Event.CLICK, this, this.onCompleteNovice);
        this.ui.btnReturnNovice2.on(Laya.Event.CLICK, this, this.onCompleteNovice);
        this._container.addChild(this.ui);
        Laya.timer.frameOnce(10, this, this.nextStep);
    };
    NoviceManager.prototype.onCompleteNovice = function () {
        M.novice.complete();
    };
    NoviceManager.prototype.nextGroup = function () {
        this._currGroupId++;
        this.saveGroupId(this._currGroupId);
        if (!this.isComplete) {
            this._currGroupSheets = [].concat(NoviceGuide.getSheetByFieldValue("groupId", this._currGroupId));
            this._currStepId = 0;
            this.nextStep();
        }
        else {
            NoviceManager.isComplete = true;
            // ButtonManager.ENABLED = true;
            this.offAll();
            if (this._activateTargets.length) {
                this.recoverTargets();
            }
            this._currGroupSheets.length = 0;
            this._currGroupSheets = null;
            this._currSheet = null;
            this.ui.destroy();
            this.ui = null;
        }
    };
    NoviceManager.prototype.nextStep = function () {
        Laya.Tween.clearAll(this.ui.imgFinger);
        this.ui.visible = true;
        this.ui.viewInteract.visible = false;
        this._currStepId++;
        if (this._currGroupSheets &&
            this._currStepId <= this._currGroupSheets.length) {
            var sheet = this._currGroupSheets[this._currStepId - 1];
            this._currSheet = sheet;
            if (sheet.activateType !== 0) {
                this._currStepId = 0;
                this.ui.removeSelf();
                this.sendWaitingEvent();
                return;
            }
            if (!this.ui.parent) {
                this._container.addChild(this.ui);
            }
            if (sheet.completed === 1) {
                // UserModel.novice.saveGroupId(this._currGroupId + 1);
                this.saveGroupId(this._currGroupId + 1);
            }
            this._currStepType = sheet.type;
            var position = StringUtils.splitStringToPoint(sheet.position);
            if (this._currStepType === NoviceType.DEFAULT) {
                // 剧情对话
                M.layer.guideLayer.maskEnabled = true;
                this.ui.viewStackNovice.selectedIndex = NoviceType.DEFAULT - 1;
                this.updateDisplay(sheet, position.x, position.y);
                this.activateMaskClick();
            }
            else if (this._currStepType === NoviceType.CLICK) {
                // 点击指引
                M.layer.guideLayer.maskEnabled = false;
                this.ui.mouseEnabled = true;
                this.ui.viewStackNovice.selectedIndex = NoviceType.CLICK - 1;
                this.ui.viewStackNovice.mouseEnabled = true;
                this.updateDisplay(sheet, position.x, position.y);
                // 手指位置更新，手指位置注册点是图片左上角，坐标系的零点是点击区域的中间
                if (sheet.fingerPosition) {
                    var fingerPos = StringUtils.splitStringToPoint(sheet.fingerPosition);
                    this.ui.imgFinger.pos(fingerPos.x, fingerPos.y);
                }
                else {
                    this.ui.imgFinger.pos(30, 30);
                }
                this.manuallyEventOut();
            }
            else if (this._currStepType === NoviceType.DRAG) {
                // 拖拽指引
                M.layer.guideLayer.maskEnabled = false;
                this.ui.viewStackNovice.selectedIndex = NoviceType.CLICK - 1;
                this.ui.viewStackNovice.mouseEnabled = false;
                this.ui.viewInteract.visible = true;
                this.updateDisplay(sheet, position.x, position.y);
                this.updateSpecialInteractArea(sheet);
                if (sheet.fingerPosition) {
                    var points = StringUtils.splitStringToKV(sheet.fingerPosition);
                    this.doDragAnimation(parseInt(points[0].key), parseInt(points[0].value), parseInt(points[1].key), parseInt(points[1].value));
                }
                this.manuallyEventOut();
            }
            else {
                console.log("指引类型未实现！");
            }
        }
        else {
            this.nextGroup();
        }
    };
    NoviceManager.prototype.manuallyEventOut = function () {
        var _this = this;
        if (this._currSheet) {
            Laya.timer.once(Time.SEC_IN_MILI * 0.05, this, function () {
                _this.event(NoviceEvent.ACTIVATE_TARGET, _this._currSheet.eventParam);
            });
        }
    };
    NoviceManager.prototype.sendWaitingEvent = function () {
        var _this = this;
        if (this._currSheet) {
            Laya.timer.once(Time.SEC_IN_MILI * 0.05, this, function () {
                _this.event(NoviceEvent.WAITING, { type: _this._currSheet.activateType, value: _this._currSheet.activateValue });
            });
        }
    };
    NoviceManager.prototype.complete = function () {
        if (!this.isComplete) {
            this._currGroupId = 999;
            this.nextStep();
        }
    };
    NoviceManager.prototype.activateTargets = function (targetObjs) {
        if (targetObjs) {
            for (var _i = 0, targetObjs_1 = targetObjs; _i < targetObjs_1.length; _i++) {
                var targetObj = targetObjs_1[_i];
                var childIdx = targetObj.parent.getChildIndex(targetObj.target);
                targetObj.childIdx = childIdx;
                PointUtils.parentToParent(targetObj.target, this.ui.viewClickTargetContainer, true);
                this.ui.viewClickTargetContainer.addChild(targetObj.target);
                this._activateTargets.push(targetObj);
            }
        }
    };
    // prettier-ignore
    NoviceManager.prototype.activateClickTarget = function (target, targetName, parent, subTargets) {
        this.activateTargets(subTargets);
        var childIdx = parent.getChildIndex(target);
        target.on(Laya.Event.CLICK, this, this.onTargetClick, [target, targetName, parent, childIdx, subTargets]);
        PointUtils.parentToParent(target, this.ui.viewClickTargetContainer, true);
        this.ui.viewClickTargetContainer.addChild(target);
        this._activateTargets.push({ target: target, parent: parent, childIdx: childIdx });
    };
    // prettier-ignore
    NoviceManager.prototype.onTargetClick = function (target, targetName, parent, childIdx, subTargets) {
        if (!this._currSheet || !this._currSheet.eventParam)
            return;
        if (targetName === this._currSheet.eventParam) {
            M.layer.guideLayer.maskEnabled = true;
            target.off(Laya.Event.CLICK, this, this.onTargetClick);
            this.recoverTargets();
            this.nextStep();
        }
    };
    NoviceManager.prototype.recoverTargets = function () {
        while (this._activateTargets.length) {
            var targetObj = this._activateTargets.pop();
            PointUtils.parentToParent(targetObj.target, targetObj.parent, true);
            targetObj.parent.addChildAt(targetObj.target, targetObj.childIdx);
        }
    };
    NoviceManager.prototype.updateDisplay = function (sheet, sx, sy) {
        // 对话位置，注册点是角色的左上角
        this.ui.imgDialogCharacter.pos(sx, sy);
        this.ui.imgClickCharacter.pos(sx, sy);
        // 对话文本
        this.ui.lblDialogScript.text = sheet.script;
        this.ui.lblClickScript.text = sheet.script;
        // 蒙板抠图位置更新
        if (sheet.interactPosition) {
            var maskPos = StringUtils.splitStringToPoint(sheet.interactPosition);
            this.ui.viewInteractArea.pos(maskPos.x, maskPos.y);
        }
        else {
            this.ui.viewInteractArea.pos(0, 0);
        }
    };
    NoviceManager.prototype.updateSpecialInteractArea = function (sheet) {
        if (sheet && sheet.specialInteractArea) {
            var rect = StringUtils.splitStringToArr(sheet.specialInteractArea);
            this.ui.imgTop.pos(0, 0).size(LayerManager.stageDesignWidth, parseInt(rect[1]));
            this.ui.imgRight.pos(parseInt(rect[0]) + parseInt(rect[2]), parseInt(rect[1])).size((LayerManager.stageDesignWidth - (parseInt(rect[0]) + parseInt(rect[2]))), parseInt(rect[3]));
            this.ui.imgBottom.pos(0, parseInt(rect[1]) + parseInt(rect[3])).size(LayerManager.stageDesignWidth, (LayerManager.stageDesignHeight - (parseInt(rect[1]) + parseInt(rect[3]))));
            this.ui.imgLeft.pos(0, parseInt(rect[1])).size(parseInt(rect[0]), parseInt(rect[3]));
        }
    };
    NoviceManager.prototype.doDragAnimation = function (sx, sy, tx, ty) {
        var _this = this;
        this.ui.imgFinger.pos(sx, sy);
        Laya.Tween.to(this.ui.imgFinger, { x: tx, y: ty }, 500, null, Laya.Handler.create(this, function () {
            Laya.timer.once(500, _this, _this.doDragAnimation, [sx, sy, tx, ty]);
        }), 500);
    };
    NoviceManager.prototype.activateMaskClick = function () {
        var _this = this;
        Laya.timer.once(Time.SEC_IN_MILI * 0.05, this, function () {
            // prettier-ignore
            M.layer.guideLayer.on(Laya.Event.CLICK, _this, _this.onMaskClick);
        });
    };
    NoviceManager.prototype.onMaskClick = function () {
        if (this._currStepType === NoviceType.DEFAULT) {
            M.layer.guideLayer.off(Laya.Event.CLICK, this, this.onMaskClick);
            this.nextStep();
        }
    };
    NoviceManager.prototype.saveGroupId = function (groupId) {
        if (this._saveFunc) {
            this._saveFunc(groupId);
        }
    };
    NoviceManager.isComplete = false;
    NoviceManager.cache = {};
    return NoviceManager;
}(EventDispatcher));
var NoviceType;
(function (NoviceType) {
    NoviceType[NoviceType["NONE"] = 0] = "NONE";
    NoviceType[NoviceType["DEFAULT"] = 1] = "DEFAULT";
    NoviceType[NoviceType["CLICK"] = 2] = "CLICK";
    NoviceType[NoviceType["DRAG"] = 3] = "DRAG";
})(NoviceType || (NoviceType = {}));
var NoviceActivateType;
(function (NoviceActivateType) {
    NoviceActivateType[NoviceActivateType["DEFAULT"] = 0] = "DEFAULT";
    NoviceActivateType[NoviceActivateType["LEVEL"] = 1] = "LEVEL";
    NoviceActivateType[NoviceActivateType["SYNTHESIS_LEVEL"] = 2] = "SYNTHESIS_LEVEL";
})(NoviceActivateType || (NoviceActivateType = {}));
var NoviceTarget = /** @class */ (function () {
    function NoviceTarget() {
    }
    NoviceTarget.QUICK_PURCHASE_MONSTER = "QUICK_PURCHASE_MONSTER";
    NoviceTarget.FOREST_KING = "FOREST_KING";
    NoviceTarget.FOREST_KING_UPGRADE = "FOREST_KING_UPGRADE";
    NoviceTarget.FOREST_KING_CLOSE = "FOREST_KING_CLOSE";
    NoviceTarget.MONSTER_CELL_2 = "MONSTER_CELL_2";
    return NoviceTarget;
}());
var NoviceEvent = /** @class */ (function () {
    function NoviceEvent() {
    }
    NoviceEvent.ACTIVATE_TARGET = "ACTIVATE_TARGET";
    NoviceEvent.WAITING = "WAITING";
    NoviceEvent.DEFAULT = "DEFAULT";
    NoviceEvent.CLICK = "CLICK";
    return NoviceEvent;
}());
//# sourceMappingURL=NoviceManager.js.map