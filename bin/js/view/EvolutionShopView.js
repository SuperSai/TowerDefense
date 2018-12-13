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
* terry 2018/11/09;
*/
var EvolutionShopView = /** @class */ (function (_super) {
    __extends(EvolutionShopView, _super);
    function EvolutionShopView(_stage) {
        if (_stage === void 0) { _stage = -1; }
        var _this = _super.call(this) || this;
        _this.indexArray = [10, 1, 3, 2];
        _this.init(_stage);
        return _this;
    }
    //新建并添加到节点
    EvolutionShopView.Create = function (_parentNode, _callback, _removeCallback, _stage) {
        if (_callback === void 0) { _callback = null; }
        if (_removeCallback === void 0) { _removeCallback = null; }
        if (_stage === void 0) { _stage = -1; }
        var resList = [
            { url: "res/atlas/images/luckLottery.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                if (EvolutionShopView.isOpen) {
                    return;
                }
                EvolutionShopView.isOpen = true;
                var nodeView_1 = new EvolutionShopView(_stage);
                AlignTools.setToScreenGoldenPos(nodeView_1);
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView_1, nodeView_1.removeSelf);
                _callback && _callback(nodeView_1);
                nodeView_1.once(Laya.Event.REMOVED, nodeView_1, function () {
                    EvolutionShopView.isOpen = false;
                    nodeView_1.removeUI();
                    _removeCallback && _removeCallback();
                });
            }
        }));
    };
    //初始化
    EvolutionShopView.prototype.init = function (_stage) {
        var that = this;
        //界面初始化
        var imgBg = that.mainView.getChildByName("imgBg");
        if (imgBg) {
            var btnExit = imgBg.getChildByName("btnExit");
            if (btnExit) {
                btnExit.offAll(Laya.Event.CLICK);
                btnExit.on(Laya.Event.CLICK, btnExit, function () {
                    that.removeSelf();
                });
            }
        }
    };
    //移除界面
    EvolutionShopView.prototype.removeUI = function () {
        eventCenter.offAll(essenceChangeEvt);
    };
    //设置强化数据
    EvolutionShopView.prototype.refreshBoxUI = function (_callback) {
        var that = this;
        var kingLevel = userData.getKingLevel();
        var kingLevelCfg = getKingLevelConfig(kingLevel);
        //界面初始化
        var imgBg = that.mainView.getChildByName("imgBg");
        if (imgBg && kingLevelCfg) {
            //升级条件
            var itemId1 = 130;
            var itemId2 = 230;
            var itemId3 = 330;
            var itemNum1 = userData.caculateMonsterCount(itemId1);
            var itemNum2 = userData.caculateMonsterCount(itemId2);
            var itemNum3 = userData.caculateMonsterCount(itemId3);
            var needItemNum1 = 1;
            var needItemNum2 = 1;
            var needItemNum3 = 1;
            //奖励
            var prizeDiamond_1 = 500;
            var prizeEssence_1 = 50;
            var btnUpdate = imgBg.getChildByName("btnUpdate");
            if (btnUpdate) {
                btnUpdate.offAll(Laya.Event.CLICK);
                btnUpdate.on(Laya.Event.CLICK, that, function () {
                    that.requestUpdateEvolutionLevel(2, prizeDiamond_1, prizeEssence_1, function (_res) {
                        if (_res) {
                            CommonFun.showTip("进化成功");
                            _callback && _callback(2, _res.diamond, _res.essence);
                            that.removeSelf();
                        }
                    });
                });
                btnUpdate.disabled = (itemNum1 < needItemNum1) || (itemNum2 < needItemNum2) || (itemNum3 < needItemNum3);
            }
            that.txtNeedItem1.text = Math.min(itemNum1, needItemNum1) + '/' + needItemNum1;
            that.txtNeedItem2.text = Math.min(itemNum2, needItemNum2) + '/' + needItemNum2;
            that.txtNeedItem3.text = Math.min(itemNum3, needItemNum3) + '/' + needItemNum3;
            that.txtItemPrize4.text = prizeDiamond_1 + "";
            that.txtItemPrize5.text = prizeEssence_1 + "";
        }
    };
    //请求进化
    EvolutionShopView.prototype.requestUpdateEvolutionLevel = function (_level, _diamond, _essence, _callback) {
        if (_callback === void 0) { _callback = null; }
        var that = this;
        var dataString = 'level=' + _level + '&diamond=' + _diamond + '&essence=' + _essence;
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/evolution',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestUpdateEvolutionLevel", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    EvolutionShopView.isOpen = false;
    return EvolutionShopView;
}(ui.EvolutionShopViewUI));
//# sourceMappingURL=EvolutionShopView.js.map