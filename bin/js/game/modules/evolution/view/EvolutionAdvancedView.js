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
/*
* 守卫进化界面
*/
var EvolutionAdvancedView = /** @class */ (function (_super) {
    __extends(EvolutionAdvancedView, _super);
    function EvolutionAdvancedView(_stage) {
        if (_stage === void 0) { _stage = -1; }
        var _this = _super.call(this) || this;
        _this.indexArray = [10, 1, 3, 2];
        _this.init(_stage);
        return _this;
    }
    //新建并添加到节点
    EvolutionAdvancedView.Create = function (_parentNode, _callback, _removeCallback, _stage) {
        if (_callback === void 0) { _callback = null; }
        if (_removeCallback === void 0) { _removeCallback = null; }
        if (_stage === void 0) { _stage = -1; }
        var resList = [
            { url: "res/atlas/images/luckLottery.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                if (EvolutionAdvancedView.isOpen)
                    return;
                EvolutionAdvancedView.isOpen = true;
                var nodeView_1 = new EvolutionAdvancedView(_stage);
                AlignUtils.setToScreenGoldenPos(nodeView_1);
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView_1, nodeView_1.removeSelf);
                _callback && _callback(nodeView_1);
                nodeView_1.once(Laya.Event.REMOVED, nodeView_1, function () {
                    EvolutionAdvancedView.isOpen = false;
                    nodeView_1.removeUI();
                    _removeCallback && _removeCallback();
                });
            }
        }));
    };
    //初始化
    EvolutionAdvancedView.prototype.init = function (_stage) {
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
    EvolutionAdvancedView.prototype.removeUI = function () {
        EventsManager.Instance.offAll(EventsType.ESSENCE_CHANGE);
    };
    //设置强化数据
    EvolutionAdvancedView.prototype.refreshBoxUI = function (_callback) {
        var that = this;
        var kingLevel = userData.getKingLevel();
        var kingVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
        //界面初始化
        var imgBg = that.mainView.getChildByName("imgBg");
        if (imgBg && kingVO) {
            //升级条件
            var itemId1 = 130;
            var itemNum1 = userData.caculateMonsterCount(itemId1);
            var needItemNum1 = 3;
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
                btnUpdate.disabled = (itemNum1 < needItemNum1);
            }
            that.txtNeedItem1.text = Math.min(itemNum1, needItemNum1) + '/' + needItemNum1;
            that.txtItemPrize2.text = prizeDiamond_1 + "";
            that.txtItemPrize3.text = prizeEssence_1 + "";
        }
    };
    //请求进化
    EvolutionAdvancedView.prototype.requestUpdateEvolutionLevel = function (_level, _diamond, _essence, _callback) {
        if (_callback === void 0) { _callback = null; }
        var that = this;
        var dataString = 'level=' + _level + '&diamond=' + _diamond + '&essence=' + _essence;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
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
    EvolutionAdvancedView.isOpen = false;
    return EvolutionAdvancedView;
}(ui.evolution.EvolutionAdvancedViewUI));
//# sourceMappingURL=EvolutionAdvancedView.js.map