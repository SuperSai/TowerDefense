class NoviceManager extends EventDispatcher {
    public static isComplete: boolean = false;

    public static cache: any = {};

    public static getInstance(): NoviceManager {
        if (!this._instance) {
            this._instance = new NoviceManager();
        }
        return this._instance;
    }

    private static _instance: NoviceManager;

    public ui: ui.guide.NoviceViewUI;

    private _saveFunc: (groupId: number) => void;

    private _container: Laya.Sprite;

    private _currGroupSheets: NoviceGuide[];
    private _currSheet: NoviceGuide;

    private _currGroupId: number;
    private _finalGroupId: number;

    private _currStepId: number;
    private _currStepType: number;

    private _activateTargets: { target: Sprite, parent: Sprite, childIdx?: number }[];

    public init(groupId?: number): void {
        this._currGroupId = groupId || this._currGroupId || 1;
        try {
            this._finalGroupId =
                NoviceGuide.dataArr[NoviceGuide.dataArr.length - 1].groupId;
            this._activateTargets = [];
        } catch (e) {
            console.error("@FREEMAN: 新手引导模块初始化完成节点发成错误：", e);

            this._finalGroupId = 1;
        }
    }

    public get isComplete(): boolean {
        return this._currGroupId > this._finalGroupId;
    }

    public get isRunning(): boolean {
        return this.ui && this.ui.parent && this.ui.visible
    }

    public get currGroupId(): number {
        return this._currGroupId;
    }

    public set currGroupId(value: number) {
        this._currGroupId = value;
    }

    public set saveFunc(func: (groupId: number) => void) {
        this._saveFunc = func;
    }

    public start(container?: Laya.Sprite): void {
        NoviceManager.isComplete = this.isComplete;
        if (!NoviceManager.isComplete) {
            if (container) {
                this._container = container;
            } else {
                this._container = LayerMgr.Ins.getLayerByType(LAYER_TYPE.GUIDE_LAYER);
            }

            this._currStepId = 0;
            this._currGroupSheets = [].concat(
                NoviceGuide.getSheetByFieldValue("groupId", this._currGroupId)
            );
            this.ui = new ui.guide.NoviceViewUI();
            this.ui.mouseEnabled = true;
            this.ui.mouseThrough = true;
            this.ui.viewStackNovice.selectedIndex = NoviceType.NONE;
            this.ui.visible = false;
            this.ui.btnReturnNovice.on(Laya.Event.CLICK, this, this.__onCompleteNovice);
            this.ui.btnReturnNovice.visible = false;
            this._container.addChild(this.ui);
            Laya.timer.frameOnce(10, this, this.nextStep);
        }
    }

    public nextGroup(): void {
        if (!NoviceManager.isComplete) {
            this._currGroupId++;
            this.saveGroupId(this._currGroupId);
            if (!this.isComplete) {
                this._currGroupSheets = [].concat(
                    NoviceGuide.getSheetByFieldValue("groupId", this._currGroupId)
                );
                this._currStepId = 0;
                this.nextStep();
            } else {
                this.complete();
            }
        }
    }

    public nextStep(): void {
        if (!NoviceManager.isComplete) {
            Laya.Tween.clearAll(this.ui.imgFinger);
            this.ui.visible = true;
            this.ui.viewInteract.visible = false;

            this._currStepId++;
            if (
                this._currGroupSheets &&
                this._currStepId <= this._currGroupSheets.length
            ) {
                const sheet: NoviceGuide = this._currGroupSheets[this._currStepId - 1];
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
                    this.saveGroupId(this._currGroupId + 1)
                }

                this._currStepType = sheet.type;
                const position: Point = StringUtils.splitStringToPoint(sheet.position);

                if (this._currStepType === NoviceType.DEFAULT) {
                    // 剧情对话
                    LayerMgr.Ins.getLayerByType(LAYER_TYPE.GUIDE_LAYER).maskEnabled = true;
                    this.ui.viewStackNovice.selectedIndex = NoviceType.DEFAULT - 1;
                    this.updateDisplay(sheet, position.x, position.y);
                    this.activateMaskClick();
                } else if (this._currStepType === NoviceType.CLICK) {
                    // 点击指引
                    LayerMgr.Ins.getLayerByType(LAYER_TYPE.GUIDE_LAYER).maskEnabled = false;
                    this.ui.mouseEnabled = true;
                    this.ui.viewStackNovice.selectedIndex = NoviceType.CLICK - 1;
                    this.ui.viewStackNovice.mouseEnabled = true;

                    this.updateDisplay(sheet, position.x, position.y);

                    // 手指位置更新，手指位置注册点是图片左上角，坐标系的零点是点击区域的中间
                    if (sheet.fingerPosition) {
                        const fingerPos = StringUtils.splitStringToPoint(sheet.fingerPosition);
                        this.ui.imgFinger.pos(fingerPos.x, fingerPos.y);
                    } else {
                        this.ui.imgFinger.pos(30, 30);
                    }
                    this.manuallyEventOut();
                } else if (this._currStepType === NoviceType.DRAG) {
                    // 拖拽指引
                    LayerMgr.Ins.getLayerByType(LAYER_TYPE.GUIDE_LAYER).maskEnabled = false;
                    this.ui.viewStackNovice.selectedIndex = NoviceType.CLICK - 1;
                    this.ui.viewStackNovice.mouseEnabled = false;
                    this.ui.viewInteract.visible = true;

                    this.updateDisplay(sheet, position.x, position.y);

                    this.updateSpecialInteractArea(sheet);

                    if (sheet.fingerPosition) {
                        const points: KeyValue[] = StringUtils.splitStringToKV(sheet.fingerPosition) as KeyValue[];
                        this.doDragAnimation(parseInt(points[0].key), parseInt(points[0].value), parseInt(points[1].key), parseInt(points[1].value));
                    }

                    this.manuallyEventOut();
                } else {
                    console.log("指引类型未实现！");
                }
                if (sheet.skipPos) {
                    this.ui.timerOnce(3000, this.ui, () => {
                        this.ui.btnReturnNovice.visible = true;
                    })
                    const skipPos: string[] = sheet.skipPos.split(",");
                    this.ui.btnReturnNovice.pos(parseInt(skipPos[0]), parseInt(skipPos[1]));
                }
            } else {
                this.nextGroup();
            }
        }
    }

    public manuallyEventOut(): void {
        if (!NoviceManager.isComplete && this._currSheet) {
            Laya.timer.once(Time.SEC_IN_MILI * 0.05, this, () => {
                this.event(NoviceEvent.ACTIVATE_TARGET, this._currSheet.eventParam);
            });
        }
    }

    public sendWaitingEvent(): void {
        if (!NoviceManager.isComplete && this._currSheet) {
            Laya.timer.once(Time.SEC_IN_MILI * 0.05, this, () => {
                this.event(NoviceEvent.WAITING, { type: this._currSheet.activateType, value: this._currSheet.activateValue });
            });
        }
    }

    public complete() {
        if (!NoviceManager.isComplete) {
            NoviceManager.isComplete = true;
            this.saveGroupId(this._currGroupId = 999)
            LayerMgr.Ins.getLayerByType(LAYER_TYPE.GUIDE_LAYER).off(Laya.Event.CLICK, this, this.onMaskClick);
            if (this.ui) {
                this.ui.btnReturnNovice.off(Laya.Event.CLICK, this, this.__onCompleteNovice);
                this.ui && Laya.Tween.clearAll(this.ui.imgFinger);
                this.ui.destroy();
            }
            this.offAll();
            this.recoverTargets();
            this._currGroupSheets && (this._currGroupSheets.length = 0);
            if (NoviceManager.cache) {
                for (const key in NoviceManager.cache) {
                    delete NoviceManager.cache[key];
                }
            }
        }
    }

    public activateTargets(targetObjs: { target: Sprite, parent: Sprite, childIdx?: number }[]): void {
        if (!NoviceManager.isComplete && targetObjs) {
            for (const targetObj of targetObjs) {
                const childIdx: number = targetObj.parent.getChildIndex(targetObj.target);
                targetObj.childIdx = childIdx;

                PointUtils.parentToParent(targetObj.target, this.ui.viewClickTargetContainer, true);
                this.ui.viewClickTargetContainer.addChild(targetObj.target);

                this._activateTargets.push(targetObj);
            }
        }
    }

    // prettier-ignore
    public activateClickTarget(target: Sprite, targetName: string, parent: Sprite, subTargets?: { target: Sprite, parent: Sprite, childIdx?: number }[]): void {
        if (!NoviceManager.isComplete) {
            this.activateTargets(subTargets);
            const childIdx: number = parent.getChildIndex(target);
            target.on(Laya.Event.CLICK, this, this.onTargetClick, [target, targetName, parent, childIdx, subTargets]);
            PointUtils.parentToParent(target, this.ui.viewClickTargetContainer, true);
            this.ui.viewClickTargetContainer.addChild(target);
            this._activateTargets.push({ target, parent, childIdx });
        }
    }

    private __onCompleteNovice(): void {
        this.complete();
    }

    // prettier-ignore
    private onTargetClick(target: Sprite, targetName: string, parent: Sprite, childIdx: number, subTargets?: { target: Sprite, parent: Sprite, childIdx?: number }[]): void {
        if (!NoviceManager.isComplete) {
            if (!this._currSheet || !this._currSheet.eventParam) return;
            if (targetName === this._currSheet.eventParam) {
                LayerMgr.Ins.getLayerByType(LAYER_TYPE.GUIDE_LAYER).maskEnabled = true;
                target.off(Laya.Event.CLICK, this, this.onTargetClick);
                this.recoverTargets();
                this.nextStep();
            }
        }
    }

    private recoverTargets(): void {
        while (this._activateTargets && this._activateTargets.length) {
            const targetObj = this._activateTargets.pop();
            targetObj.target.off(Laya.Event.CLICK, this, this.onTargetClick);
            PointUtils.parentToParent(targetObj.target, targetObj.parent, true);
            targetObj.parent.addChildAt(targetObj.target, targetObj.childIdx);
        }
    }

    private updateDisplay(sheet: NoviceGuide, sx: number, sy: number): void {
        if (!NoviceManager.isComplete) {
            // 对话位置，注册点是角色的左上角
            this.ui.imgDialogCharacter.pos(sx, sy);
            this.ui.imgClickCharacter.pos(sx, sy);

            // 对话文本
            this.ui.lblDialogScript.text = sheet.script;
            this.ui.lblClickScript.text = sheet.script;

            // 蒙板抠图位置更新
            if (sheet.interactPosition) {
                const maskPos = StringUtils.splitStringToPoint(sheet.interactPosition);
                this.ui.viewInteractArea.pos(maskPos.x, maskPos.y);
            } else {
                this.ui.viewInteractArea.pos(0, 0);
            }
        }
    }

    private updateSpecialInteractArea(sheet: NoviceGuide): void {
        if (!NoviceManager.isComplete && sheet && sheet.specialInteractArea) {
            const rect = StringUtils.splitStringToArr(sheet.specialInteractArea);
            this.ui.imgTop.pos(0, 0).size(LayerManager.stageDesignWidth, parseInt(rect[1]));
            this.ui.imgRight.pos(parseInt(rect[0]) + parseInt(rect[2]), parseInt(rect[1])).size((LayerManager.stageDesignWidth - (parseInt(rect[0]) + parseInt(rect[2]))), parseInt(rect[3]));
            this.ui.imgBottom.pos(0, parseInt(rect[1]) + parseInt(rect[3])).size(LayerManager.stageDesignWidth, (LayerManager.stageDesignHeight - (parseInt(rect[1]) + parseInt(rect[3]))));
            this.ui.imgLeft.pos(0, parseInt(rect[1])).size(parseInt(rect[0]), parseInt(rect[3]));
        }
    }

    private doDragAnimation(sx: number, sy: number, tx: number, ty: number): void {
        if (!NoviceManager.isComplete) {
            this.ui.imgFinger.pos(sx, sy);
            Laya.Tween.to(this.ui.imgFinger, { x: tx, y: ty }, 500, null, Laya.Handler.create(this, () => {
                Laya.timer.once(500, this, this.doDragAnimation, [sx, sy, tx, ty]);
            }), 500)
        }
    }

    private activateMaskClick(): void {
        Laya.timer.once(Time.SEC_IN_MILI * 0.05, this, () => {
            // prettier-ignore
            LayerMgr.Ins.getLayerByType(LAYER_TYPE.GUIDE_LAYER).on(Laya.Event.CLICK, this, this.onMaskClick);
        });
    }

    private onMaskClick() {
        if (this._currStepType === NoviceType.DEFAULT) {
            LayerMgr.Ins.getLayerByType(LAYER_TYPE.GUIDE_LAYER).off(Laya.Event.CLICK, this, this.onMaskClick);
            this.nextStep();
        }
    }

    private saveGroupId(groupId: number): void {
        if (this._saveFunc && groupId !== undefined) {
            this._saveFunc(groupId);
        }
    }
}

enum NoviceType {
    NONE = 0,
    DEFAULT = 1,
    CLICK = 2,
    DRAG = 3
}

enum NoviceActivateType {
    DEFAULT = 0,
    LEVEL = 1,
    SYNTHESIS_LEVEL = 2,
}

class NoviceTarget {
    static QUICK_PURCHASE_MONSTER = "QUICK_PURCHASE_MONSTER";
    static FOREST_KING = "FOREST_KING";
    static FOREST_KING_UPGRADE = "FOREST_KING_UPGRADE";
    static FOREST_KING_CLOSE = "FOREST_KING_CLOSE";
    static MONSTER_CELL_2 = "MONSTER_CELL_2";
}

class NoviceEvent {
    public static ACTIVATE_TARGET: string = "ACTIVATE_TARGET";
    public static WAITING: string = "WAITING";
    public static DEFAULT: string = "DEFAULT";
    public static CLICK: string = "CLICK";
}
