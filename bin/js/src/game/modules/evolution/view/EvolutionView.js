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
* 守卫升级界面
*/
var EvolutionView = /** @class */ (function (_super) {
    __extends(EvolutionView, _super);
    function EvolutionView(_stage) {
        if (_stage === void 0) { _stage = -1; }
        var _this = _super.call(this) || this;
        _this.init(_stage);
        return _this;
    }
    //新建并添加到节点
    EvolutionView.Create = function (_parentNode, _callback, _removeCallback, _stage) {
        if (_callback === void 0) { _callback = null; }
        if (_removeCallback === void 0) { _removeCallback = null; }
        if (_stage === void 0) { _stage = -1; }
        var resList = [
            { url: "res/atlas/images.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                if (EvolutionView.isOpen) {
                    return;
                }
            }
            else {
                EvolutionView.isOpen = true;
                var nodeView_1 = new EvolutionView(_stage);
                M.layer.frameLayer.addChildWithMaskCall(nodeView_1, nodeView_1.removeSelf);
                _callback && _callback(nodeView_1);
                nodeView_1.once(Laya.Event.REMOVED, nodeView_1, function () {
                    EvolutionView.isOpen = false;
                    nodeView_1.removeUI();
                    _removeCallback && _removeCallback();
                });
            }
        }));
    };
    //初始化
    EvolutionView.prototype.init = function (_stage) {
        var self = this;
        //界面初始化
        self.btnUpdate.offAll(Laya.Event.CLICK);
        self.btnExit.offAll(Laya.Event.CLICK);
        self.btnExit.on(Laya.Event.CLICK, self, function () {
            self.removeSelf();
        });
        M.layer.frameLayer.on(LayerEvent.LAYER_ANIMATION_COMPLETE, this, function (complete) {
            if (complete) {
                if (!NoviceManager.isComplete) {
                    M.novice.on(NoviceEvent.ACTIVATE_TARGET, self, function (eventParam) {
                        if (eventParam === NoviceTarget.FOREST_KING_UPGRADE) {
                            M.novice.activateClickTarget(self.btnUpdate, eventParam, self.btnUpdate.parent);
                        }
                        else if (eventParam === NoviceTarget.FOREST_KING_CLOSE) {
                            M.novice.ui.btnReturnNovice2.visible = true;
                            M.novice.activateClickTarget(self.btnExit, eventParam, self.btnExit.parent);
                        }
                    });
                }
                M.novice.manuallyEventOut();
            }
        });
    };
    //移除界面
    EvolutionView.prototype.removeUI = function () {
        EventsManager.Instance.offAll(EventsType.ESSENCE_CHANGE);
    };
    //设置强化数据
    EvolutionView.prototype.refreshBoxUI = function (_callback) {
        var self = this;
        var kingLevel = userData.getKingLevel();
        var kingVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
        //界面初始化
        if (kingVO) {
            //加成属性
            var atk = kingVO.attack;
            var atkSpeed = kingVO.interval;
            var atkAdd = kingVO.shatk * kingLevel;
            var doubleAdd = kingVO.crit * kingLevel;
            //升级条件
            var monsterLevel = 0;
            var heroId = 0;
            //进化设定
            if (userData.isEvolution()) {
                monsterLevel = ((kingLevel - 30) % 60) + 1;
                heroId = 1000 + monsterLevel;
            }
            else {
                monsterLevel = ((kingLevel - 1) % 30) + 1;
                heroId = 100 + monsterLevel;
            }
            var heroData = BattleManager.Instance.getMonsterItem(heroId);
            var heroName = "英雄" + " Lv" + monsterLevel + ":";
            if (heroData) {
                heroName = heroData.name + " Lv" + monsterLevel + ":";
            }
            var currHeroCount = userData.caculateMonsterCount(heroId);
            var needHeroCount = 3;
            //需要钻石
            var diamond_1 = userData.diamond;
            var needDiamond_1 = MathUtils.parseInt(kingVO.gemxh.toString());
            if (kingLevel > 10) {
                self.btnUpdate.disabled = (diamond_1 < needDiamond_1) || (currHeroCount < needHeroCount);
            }
            else {
                self.btnUpdate.disabled = diamond_1 < needDiamond_1;
            }
            self.txtKingLevel.text = kingLevel + "";
            self.txtAtk.text = MathUtils.bytesToSize(atk);
            self.txtAtkAdd.text = MathUtils.numToPercent(atkAdd);
            self.txtAtkSpeed.text = MathUtils.bytesToSize(atkSpeed) + "s";
            self.txtDoubleAdd.text = MathUtils.numToPercent(doubleAdd);
            var isShow = kingLevel > 10;
            self.heroBox.visible = isShow;
            self.txtItemName.text = heroName;
            self.txtNeedItem.text = Math.min(currHeroCount, needHeroCount) + '/' + needHeroCount;
            self.txtNeedDiamond.text = Math.min(diamond_1, needDiamond_1) + '/' + needDiamond_1;
            if (isShow) {
                self.diamondBox.pos(32, 558);
            }
            else {
                self.diamondBox.pos(32, 507);
            }
            self.btnUpdate.on(Laya.Event.CLICK, self, function () {
                if (diamond_1 >= needDiamond_1) {
                    HttpManager.Instance.requestUpdateKingLevel(EvolutionView.kingEvolutionType, kingLevel, needDiamond_1, function (_res) {
                        if (_res && _res.type) {
                            MessageUtils.showMsgTips("升级成功");
                            HallManager.Instance.hallData.isUpdate = false;
                            _callback && _callback(kingLevel + 1, _res.diamond);
                            self.refreshBoxUI(_callback);
                        }
                    });
                    if (GlobalConfig.DEBUG) {
                        HallManager.Instance.hallData.isUpdate = false;
                        _callback && _callback(kingLevel + 1, userData.diamond - needDiamond_1);
                        self.refreshBoxUI(_callback);
                    }
                }
                else {
                    MessageUtils.showMsgTips("钻石不足");
                }
            });
        }
    };
    EvolutionView.isOpen = false;
    EvolutionView.kingEvolutionType = 101;
    return EvolutionView;
}(ui.evolution.EvolutionViewUI));
//# sourceMappingURL=EvolutionView.js.map