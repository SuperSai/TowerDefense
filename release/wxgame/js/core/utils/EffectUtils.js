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
* name;
*/
var EffectUtils = /** @class */ (function (_super) {
    __extends(EffectUtils, _super);
    function EffectUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** 显示训练时间到了的特效 */
    EffectUtils.showTrainingTimeEffect = function (parentNode) {
        var self = this;
        var img = new Laya.Image("images/gameLastTimeTip.png");
        LayerManager.getInstance().screenEffectLayer.addChild(img);
        img.pos(0 - img.width, (LayerManager.stageDesignHeight - 260) / 2);
        Laya.Tween.to(img, { x: (LayerManager.stageDesignWidth - 260) / 2 }, 250, null, Laya.Handler.create(self, function () {
            Laya.Tween.clearTween(img);
            Laya.Tween.to(img, { x: LayerManager.stageDesignWidth + 260 }, 250, null, Laya.Handler.create(self, function () {
                Laya.Tween.clearTween(img);
                img.removeSelf();
                img = null;
            }, null, true), 850);
        }, null, true));
    };
    /** 界面缩放再展开 */
    EffectUtils.viewScaleShow = function (obj) {
        obj.anchorX = 0.5;
        obj.anchorY = 0.5;
        obj.x = obj.x + obj.width / 2;
        obj.y = obj.y + obj.height / 2;
        Laya.Tween.from(obj, { scaleX: 0.8, scaleY: 0.8 }, 300, Laya.Ease.sineIn, Laya.Handler.create(this, function () {
            Laya.Tween.clearTween(obj);
        }, null, true));
    };
    EffectUtils.tipsLabelByObject = function (obj, content, type) {
        if (type === void 0) { type = -1; }
        var label = ObjectPool.pop(Laya.Label, "TipsLabel");
        label.alpha = 1;
        label.text = content;
        label.y = -(obj.height / 2);
        label.fontSize = 30;
        label.color = "#FFFFFF";
        label.stroke = 4;
        label.strokeColor = "#946430";
        if (type != -1) {
            var image = new Laya.Image();
            var hbox_1 = new Laya.HBox();
            var url = "";
            switch (type) {
                case EFFECT_TYPE.GOLD:
                    url = "images/coin.png";
                    break;
                case EFFECT_TYPE.DIAMOND:
                    url = "images/game_diamondIcon.png";
                    break;
                case EFFECT_TYPE.ESSENCE:
                    url = "images/game_essence_icon.png";
                    break;
                default:
                    break;
            }
            image.skin = url;
            hbox_1.addChild(image);
            hbox_1.addChild(label);
            hbox_1.align = "middle";
            var global = PointTools.localToGlobal(obj);
            hbox_1.pos(global.x, global.y);
            LayerManager.getInstance().screenEffectLayer.addChild(hbox_1);
            hbox_1.x += (obj.width - hbox_1.width) / 2;
            Laya.Tween.to(hbox_1, { y: hbox_1.y - 50, alpha: 0 }, 1000, null, Laya.Handler.create(this, function () {
                Laya.Tween.clearTween(hbox_1);
                hbox_1.removeSelf();
            }, null, true));
        }
        else {
            var global = PointTools.localToGlobal(obj);
            label.pos(global.x, global.y);
            LayerManager.getInstance().screenEffectLayer.addChild(label);
            label.x += (obj.width - label.width) / 2;
            Laya.Tween.to(label, { y: label.y - 50, alpha: 0 }, 1000, null, Laya.Handler.create(this, function () {
                Laya.Tween.clearTween(label);
                label.removeSelf();
                ObjectPool.push(label);
            }, null, true));
        }
    };
    return EffectUtils;
}(Laya.Sprite));
var EFFECT_TYPE;
(function (EFFECT_TYPE) {
    /** 金币 */
    EFFECT_TYPE[EFFECT_TYPE["GOLD"] = 0] = "GOLD";
    /** 钻石 */
    EFFECT_TYPE[EFFECT_TYPE["DIAMOND"] = 1] = "DIAMOND";
    /** 精华 */
    EFFECT_TYPE[EFFECT_TYPE["ESSENCE"] = 2] = "ESSENCE";
})(EFFECT_TYPE || (EFFECT_TYPE = {}));
//# sourceMappingURL=EffectUtils.js.map