/*
* 消息提示工具类;
*/
var MessageUtils = /** @class */ (function () {
    function MessageUtils() {
    }
    /**
     * 纯文本飘字 -- 屏幕中间提示
     * @param {string} content
     * @memberof MessageUtils
     */
    MessageUtils.showMsgTips = function (content) {
        var self = this;
        var msg = ObjectPool.pop(MessageTips, "MessageTips");
        msg.visible = false;
        msg.init(content);
        self._msgs.push(msg);
        AlignUtils.setToScreenGoldenPos(msg);
        M.layer.rollMessageLayer.addChild(msg);
        if (self._msgs.length > 0) {
            var time = self._msgTime * 250;
            TimerManager.Instance.doTimer(time, 1, function () {
                msg.visible = true;
                msg.zOrder = 999;
            }, msg);
            Laya.Tween.to(msg, { x: msg.x, y: msg.y - 100, alpha: 0 }, 2500, Laya.Ease.cubicInOut, Laya.Handler.create(self, function ($msg) {
                Laya.Tween.clearTween($msg);
                DisplayUtils.removeFromArray($msg, self._msgs);
                $msg.zOrder = 1;
                ObjectPool.push($msg);
                $msg.removeSelf();
                $msg.alpha = 1;
                if (self._msgs.length <= 0) {
                    self._msgTime = 0;
                }
            }, [msg]), time);
            self._msgTime++;
        }
    };
    /**
     * 根据对象位置来提示
     * @static
     * @param {Laya.Sprite} obj
     * @param {string} content
     * @param {number} [type=-1]
     * @memberof MessageUtils
     */
    MessageUtils.shopMsgByObj = function (obj, content, type) {
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
                    url = "images/core/coin_40x40.png";
                    break;
                case EFFECT_TYPE.DIAMOND:
                    url = "images/core/diamond.png";
                    break;
                case EFFECT_TYPE.ESSENCE:
                    url = "images/core/essence.png";
                    break;
                default:
                    break;
            }
            image.skin = url;
            hbox_1.addChild(image);
            hbox_1.addChild(label);
            hbox_1.align = "middle";
            var global = PointUtils.localToGlobal(obj);
            hbox_1.pos(global.x, global.y);
            M.layer.screenEffectLayer.addChild(hbox_1);
            hbox_1.x += (obj.width - hbox_1.width) / 2;
            Laya.Tween.to(hbox_1, { y: hbox_1.y - 50, alpha: 0 }, 1000, null, Laya.Handler.create(this, function () {
                Laya.Tween.clearTween(hbox_1);
                hbox_1.removeSelf();
            }, null, true));
        }
        else {
            var global = PointUtils.localToGlobal(obj);
            label.pos(global.x, global.y);
            M.layer.screenEffectLayer.addChild(label);
            label.x += (obj.width - label.width) / 2;
            Laya.Tween.to(label, { y: label.y - 50, alpha: 0 }, 1000, null, Laya.Handler.create(this, function () {
                Laya.Tween.clearTween(label);
                label.removeSelf();
                ObjectPool.push(label);
            }, null, true));
        }
    };
    MessageUtils._msgTime = 0;
    MessageUtils._msgs = [];
    return MessageUtils;
}());
//# sourceMappingURL=MessageUtils.js.map