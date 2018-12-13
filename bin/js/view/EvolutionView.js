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
        M.layer.frameLayer.on(LayerEvent.LAYER_ANIMATION_COMPLETE, this, function (complete) {
            if (complete) {
                if (!NoviceManager.isComplete) {
                    M.novice.on(NoviceEvent.ACTIVATE_TARGET, that, function (eventParam) {
                        if (eventParam === NoviceTarget.FOREST_KING_UPGRADE) {
                            var btnUpdate = imgBg.getChildByName("btnUpdate");
                            if (btnUpdate) {
                                M.novice.activateClickTarget(btnUpdate, eventParam, btnUpdate.parent);
                            }
                        }
                        else if (eventParam === NoviceTarget.FOREST_KING_CLOSE) {
                            var btnExit = imgBg.getChildByName("btnExit");
                            if (btnExit) {
                                M.novice.activateClickTarget(btnExit, eventParam, btnExit.parent);
                            }
                        }
                    });
                }
                M.novice.manuallyEventOut();
            }
        });
    };
    //移除界面
    EvolutionView.prototype.removeUI = function () {
        eventCenter.offAll(essenceChangeEvt);
    };
    //设置强化数据
    EvolutionView.prototype.refreshBoxUI = function (_callback) {
        var that = this;
        var kingLevel = userData.getKingLevel();
        var kingLevelCfg = getKingLevelConfig(kingLevel);
        //界面初始化
        var imgBg = that.mainView.getChildByName("imgBg");
        if (imgBg && kingLevelCfg) {
            //加成属性
            var atk = kingLevelCfg.shgjl;
            var atkSpeed = kingLevelCfg.shgjjg;
            var atkAdd = kingLevelCfg.shatk * kingLevel;
            var doubleAdd = kingLevelCfg.shbj * kingLevel;
            //升级条件
            var monsterLevel = 0;
            var itemId1 = 0;
            var itemId2 = 0;
            var itemId3 = 0;
            //进化设定
            if (userData.isEvolution()) {
                monsterLevel = ((kingLevel - 30) % 60) + 1;
                itemId1 = 1000 + monsterLevel;
                itemId2 = 2000 + monsterLevel;
                itemId3 = 3000 + monsterLevel;
            }
            else {
                monsterLevel = ((kingLevel - 1) % 30) + 1;
                itemId1 = 100 + monsterLevel;
                itemId2 = 200 + monsterLevel;
                itemId3 = 300 + monsterLevel;
            }
            var itemCfg1 = getMonsterConfig(itemId1);
            var itemName1 = "精灵1" + " Lv" + monsterLevel + ":";
            if (itemCfg1) {
                itemName1 = itemCfg1.name + " Lv" + monsterLevel + ":";
            }
            var itemCfg2 = getMonsterConfig(itemId2);
            var itemName2 = "精灵2:" + " Lv" + monsterLevel + ":";
            if (itemCfg2) {
                itemName2 = itemCfg2.name + " Lv" + monsterLevel + ":";
            }
            var itemCfg3 = getMonsterConfig(itemId3);
            var itemName3 = "精灵3:" + " Lv" + monsterLevel + ":";
            if (itemCfg3) {
                itemName3 = itemCfg3.name + " Lv" + monsterLevel + ":";
            }
            var itemNum1 = userData.caculateMonsterCount(itemId1);
            var itemNum2 = userData.caculateMonsterCount(itemId2);
            var itemNum3 = userData.caculateMonsterCount(itemId3);
            var needItemNum1 = 1;
            var needItemNum2 = 1;
            var needItemNum3 = 1;
            //需要钻石
            var diamond_1 = userData.diamond;
            var needDiamond_1 = CommonFun.parseInt(kingLevelCfg.gemxh);
            var btnUpdate = imgBg.getChildByName("btnUpdate");
            if (btnUpdate) {
                btnUpdate.offAll(Laya.Event.CLICK);
                btnUpdate.on(Laya.Event.CLICK, that, function () {
                    if (diamond_1 >= needDiamond_1) {
                        that.requestUpdateKingLevel(EvolutionView.kingEvolutionType, kingLevel, needDiamond_1, function (_res) {
                            if (_res && _res.type) {
                                CommonFun.showTip("升级成功");
                                HallManager.Instance.hallData.isUpdate = false;
                                _callback && _callback(kingLevel + 1, _res.diamond);
                                that.refreshBoxUI(_callback);
                            }
                        });
                        if (GlobalConfig.DEBUG) {
                            HallManager.Instance.hallData.isUpdate = false;
                            _callback && _callback(kingLevel + 1, userData.diamond - needDiamond_1);
                            that.refreshBoxUI(_callback);
                        }
                    }
                    else {
                        CommonFun.showTip("钻石不足");
                    }
                });
                if (kingLevel > 10) {
                    btnUpdate.disabled = (diamond_1 < needDiamond_1) || (itemNum1 < needItemNum1) || (itemNum2 < needItemNum2) || (itemNum3 < needItemNum3);
                }
                else {
                    btnUpdate.disabled = (diamond_1 < needDiamond_1);
                }
            }
            that.txtKingLevel.text = kingLevel + "";
            that.txtAtk.text = CommonFun.bytesToSize(atk);
            that.txtAtkAdd.text = CommonFun.numToPercent(atkAdd);
            that.txtAtkSpeed.text = CommonFun.bytesToSize(atkSpeed) + "s";
            that.txtDoubleAdd.text = CommonFun.numToPercent(doubleAdd);
            var isShow = kingLevel > 10;
            that.petBox0.visible = isShow;
            that.petBox1.visible = isShow;
            that.petBox2.visible = isShow;
            that.txtItemName1.text = itemName1;
            that.txtItemName2.text = itemName2;
            that.txtItemName3.text = itemName3;
            that.txtNeedItem1.text = Math.min(itemNum1, needItemNum1) + '/' + needItemNum1;
            that.txtNeedItem2.text = Math.min(itemNum2, needItemNum2) + '/' + needItemNum2;
            that.txtNeedItem3.text = Math.min(itemNum3, needItemNum3) + '/' + needItemNum3;
            that.txtNeedDiamond.text = Math.min(diamond_1, needDiamond_1) + '/' + needDiamond_1;
            if (isShow) {
                that.diamondBox.pos(32, 669);
            }
            else {
                that.diamondBox.pos(32, 507);
            }
        }
    };
    //请求钻石升级
    EvolutionView.prototype.requestUpdateKingLevel = function (_id, _level, _price, _callback) {
        if (_callback === void 0) { _callback = null; }
        var that = this;
        var dataString = 'type=' + _id + '&value=' + _level + '&price=' + _price + '&unit=' + "diamond";
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/intensify',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestUpdateKingLevel", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    EvolutionView.isOpen = false;
    EvolutionView.kingEvolutionType = 101;
    return EvolutionView;
}(ui.EvolutionViewUI));
//# sourceMappingURL=EvolutionView.js.map