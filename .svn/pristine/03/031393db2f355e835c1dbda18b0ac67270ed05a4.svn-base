/*
* 消息提示工具类;
*/
class MessageUtils {

    private static _msgTime: number = 0;
    private static _msgs: any[] = [];

    constructor() {

    }

    /**
     * 纯文本飘字 -- 屏幕中间提示
     * @param {string} content
     * @memberof MessageUtils
     */
    public static showMsgTips(content: string): void {
        let self = this;
        let msg: MessageTips = ObjectPool.pop(MessageTips, "MessageTips");
        msg.visible = false;
        msg.init(content);
        self._msgs.push(msg);

        AlignUtils.setToScreenGoldenPos(msg);
        M.layer.rollMessageLayer.addChild(msg);

        if (self._msgs.length > 0) {
            let time: number = self._msgTime * 250;
            TimerManager.Instance.doTimer(time, 1, () => {
                msg.visible = true;
                msg.zOrder = 999;
            }, msg);
            Laya.Tween.to(msg, { x: msg.x, y: msg.y - 100, alpha: 0 }, 2500, Laya.Ease.cubicInOut, Laya.Handler.create(self, ($msg: MessageTips) => {
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
    }

    /**
     * 根据对象位置来提示
     * @static
     * @param {Laya.Sprite} obj
     * @param {string} content
     * @param {number} [type=-1]
     * @memberof MessageUtils
     */
    public static shopMsgByObj(obj: Laya.Sprite, content: string, type: number = -1): void {
        let label: Laya.Label = ObjectPool.pop(Laya.Label, "TipsLabel");
        label.alpha = 1;
        label.text = content;
        label.y = -(obj.height / 2);
        label.fontSize = 30;
        label.color = "#FFFFFF";
        label.stroke = 4;
        label.strokeColor = "#946430";
        if (type != -1) {
            let image: Laya.Image = new Laya.Image();
            let hbox: Laya.HBox = new Laya.HBox();
            let url: string = "";
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
            const global: Laya.Point = PointUtils.localToGlobal(obj);
            hbox.pos(global.x, global.y);
            M.layer.screenEffectLayer.addChild(hbox);
            hbox.x += (obj.width - hbox.width) / 2;
            Laya.Tween.to(hbox, { y: hbox.y - 50, alpha: 0 }, 1000, null, Laya.Handler.create(this, () => {
                Laya.Tween.clearTween(hbox);
                hbox.removeSelf();
            }, null, true));
        } else {
            const global: Laya.Point = PointUtils.localToGlobal(obj);
            label.pos(global.x, global.y);
            M.layer.screenEffectLayer.addChild(label);
            label.x += (obj.width - label.width) / 2;
            Laya.Tween.to(label, { y: label.y - 50, alpha: 0 }, 1000, null, Laya.Handler.create(this, () => {
                Laya.Tween.clearTween(label);
                label.removeSelf();
                ObjectPool.push(label);
            }, null, true));
        }
    }
}