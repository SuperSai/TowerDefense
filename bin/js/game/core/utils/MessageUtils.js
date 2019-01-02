/*
* 消息提示工具类;
*/
class MessageUtils {
    constructor() {
    }
    /**
     * 纯文本飘字 -- 屏幕中间提示
     * @param {string} content
     * @memberof MessageUtils
     */
    static showMsgTips(content) {
        let self = this;
        let msg = ObjectPool.pop(MessageTips, "MessageTips");
        msg.init(content);
        self._msgs.push(msg);
        msg.visible = content == "" ? false : true;
        msg.zOrder = 999;
        AlignUtils.setToScreenGoldenPos(msg);
        LayerMgr.Instance.addToLayer(msg, LAYER_TYPE.ROLL_MSG_LAYER);
        if (self._msgs.length > 0) {
            let time = self._msgTime * 250;
            Laya.Tween.to(msg, { x: msg.x, y: msg.y - 100, alpha: 0 }, 4000, Laya.Ease.cubicInOut, Laya.Handler.create(self, ($msg) => {
                Laya.Tween.clearTween($msg);
                DisplayUtils.removeFromArray($msg, self._msgs);
                $msg.zOrder = 1;
                ObjectPool.push($msg);
                $msg.removeSelf();
                $msg.alpha = 1;
                if (self._msgs.length <= 0) {
                    self._msgs = [];
                    self._msgTime = 0;
                }
            }, [msg]), time);
            self._msgTime++;
        }
    }
    /**
     * 根据对象位置来提示
     * @static
     * @param {Laya.Sprite} obj
     * @param {string} content
     * @param {number} [type=-1]
     * @memberof MessageUtils
     */
    static shopMsgByObj(obj, content, type = -1) {
        let label = ObjectPool.pop(Laya.Label, "TipsLabel");
        label.alpha = 1;
        label.text = content;
        label.y = -(obj.height / 2);
        label.fontSize = 30;
        label.color = "#FFFFFF";
        label.stroke = 4;
        label.strokeColor = "#946430";
        if (type != -1) {
            let image = new Laya.Image();
            let hbox = new Laya.HBox();
            let url = "";
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
            hbox.addChild(image);
            hbox.addChild(label);
            hbox.align = "middle";
            const global = PointUtils.localToGlobal(obj);
            hbox.pos(global.x, global.y);
            LayerMgr.Instance.addToLayer(hbox, LAYER_TYPE.SCREEN_EFFECT_LAYER);
            hbox.x += (obj.width - hbox.width) / 2;
            Laya.Tween.to(hbox, { y: hbox.y - 50, alpha: 0 }, 2000, null, Laya.Handler.create(this, () => {
                Laya.Tween.clearTween(hbox);
                hbox.removeSelf();
            }, null, true));
        }
        else {
            const global = PointUtils.localToGlobal(obj);
            label.pos(global.x, global.y);
            LayerMgr.Instance.addToLayer(label, LAYER_TYPE.SCREEN_EFFECT_LAYER);
            label.x += (obj.width - label.width) / 2;
            Laya.Tween.to(label, { y: label.y - 50, alpha: 0 }, 2000, null, Laya.Handler.create(this, () => {
                Laya.Tween.clearTween(label);
                label.removeSelf();
                ObjectPool.push(label);
            }, null, true));
        }
    }
}
MessageUtils._msgTime = 0;
MessageUtils._msgs = [];
//# sourceMappingURL=MessageUtils.js.map