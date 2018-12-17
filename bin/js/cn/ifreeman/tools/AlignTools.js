var AlignTools = /** @class */ (function () {
    function AlignTools() {
    }
    /**
     * 把现实对象设置到屏幕水平居中，垂直居中的位置上，使用前请确认<code>sprite</code>宽高不为0
     * @param sprite
     * @param delayFrames
     * @param useRegisterPoint
     *
     */
    AlignTools.setToScreenCenter = function (sprite, delayFrames, useRegisterPoint) {
        if (delayFrames) {
            Laya.timer.frameOnce(delayFrames, AlignTools, AlignTools.setToScreenCenter, [sprite], false);
        }
        if (useRegisterPoint) {
            sprite.x = LayerManager.stageDesignWidth * 0.5;
            sprite.y = LayerManager.stageDesignHeight * 0.5;
        }
        else {
            sprite.x = (LayerManager.stageDesignWidth - sprite.width) * 0.5;
            sprite.y = (LayerManager.stageDesignHeight - sprite.height) * 0.5;
        }
    };
    /**
     * 把现实对象设置到屏幕水平居中，垂直在0.618的黄金分割点位置上，使用前请确认<code>sprite</code>宽高不为0
     * @param sprite
     * @param delayFrames
     * @param useRegisterPoint
     *
     */
    AlignTools.setToScreenGoldenPos = function (sprite, delayFrames, useRegisterPoint) {
        if (delayFrames) {
            Laya.timer.frameOnce(delayFrames, AlignTools, AlignTools.setToScreenGoldenPos, [sprite], false);
        }
        if (useRegisterPoint) {
            sprite.x = LayerManager.stageDesignWidth * 0.5;
            sprite.y = LayerManager.stageDesignHeight * 0.382;
        }
        else {
            sprite.x = (LayerManager.stageDesignWidth - sprite.width) * 0.5;
            sprite.y = (LayerManager.stageDesignHeight - sprite.height) * 0.382;
        }
    };
    /**
     * 仅将目标对象target的x坐标和y坐标设置为到ref的中心。（注意，如果ref没有宽高可能会导致意外的问题）
     * @param target
     * @param ref
     *
     */
    AlignTools.setToSpriteCenter = function (target, ref) {
        if (!target || !ref) {
            throw new Error("Either target or ref is null.");
        }
        else {
            target.pos(ref.width * 0.5, ref.height * 0.5);
        }
    };
    /**
     * 仅将目标对象target根据对齐方式设置坐标。仅设置x坐标和y坐标，忽略目标对象target的宽高。（注意，如果ref没有宽高可能会导致意外的问题）
     * @param target
     * @param ref
     *
     */
    AlignTools.setTo = function (align, target, ref) {
        if (align === Align.CENTER) {
            AlignTools.setToSpriteCenter(target, ref);
        }
    };
    return AlignTools;
}());
//# sourceMappingURL=AlignTools.js.map