// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        //初始化微信小游戏
        Laya.MiniAdpter.init(true, true);
        //程序入口
        Laya.init(750, 1334);
        //竖屏
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        //适配
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_AUTO;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        //调用性能统计面板方法，(0,0)为面板位置坐标
        // Laya.Stat.show(0,0);
        RankingView.Create(Laya.stage);
    }
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map