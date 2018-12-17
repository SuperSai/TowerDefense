/*
* TER;
*/
var CommonFun = /** @class */ (function () {
    function CommonFun() {
    }
    //文本提示
    CommonFun.showTip = function (_content) {
        var tipBarSp = ObjectPool.pop(Laya.Image, "SizeImage", "loading/tip_bg.png");
        tipBarSp.alpha = 1;
        Laya.stage.addChild(tipBarSp);
        tipBarSp.zOrder = CommonFun.viewZOrder;
        tipBarSp.pos(Laya.stage.width / 2, Laya.stage.height / 2);
        tipBarSp.width = 500;
        tipBarSp.height = 80;
        tipBarSp.pivot(tipBarSp.width / 2, tipBarSp.height / 2);
        tipBarSp.sizeGrid = "10,10,10,10";
        var coinLabel = Laya.Pool.getItemByClass("TipsLabel", Laya.Label);
        coinLabel.text = _content;
        coinLabel.fontSize = 40;
        coinLabel.color = "#ffffff";
        coinLabel.width = tipBarSp.width * 0.98;
        //设置文本水平居中
        coinLabel.align = "center";
        //设置文本垂直居中
        coinLabel.valign = "middle";
        //设置自动换行
        coinLabel.wordWrap = true;
        //重置背景高度
        tipBarSp.height = coinLabel.height + 20;
        tipBarSp.addChild(coinLabel);
        coinLabel.pos(tipBarSp.width / 2, tipBarSp.height / 2);
        coinLabel.pivot(coinLabel.width / 2, coinLabel.height / 2);
        Laya.Tween.to(tipBarSp, { x: tipBarSp.x, y: (tipBarSp.y - 100), alpha: 0 }, 3000, Laya.Ease.cubicInOut, Laya.Handler.create(this, function (tipBarSp) {
            Laya.Pool.recover("TipsLabel", coinLabel);
            tipBarSp.removeChildren();
            tipBarSp.removeSelf();
            Laya.Tween.clearTween(tipBarSp);
            ObjectPool.push(tipBarSp);
        }, [tipBarSp]));
    };
    CommonFun.viewZOrder = 1001;
    return CommonFun;
}());
//# sourceMappingURL=CommonFun.js.map