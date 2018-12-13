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
* terry 2018/11/08;
*/
var StrengthenView = /** @class */ (function (_super) {
    __extends(StrengthenView, _super);
    function StrengthenView(_stage) {
        if (_stage === void 0) { _stage = -1; }
        var _this = _super.call(this) || this;
        _this.indexArray = [10, 1, 3, 2];
        _this.init(_stage);
        return _this;
    }
    //新建并添加到节点
    StrengthenView.Create = function (_parentNode, _callback, _removeCallback, _stage) {
        if (_callback === void 0) { _callback = null; }
        if (_removeCallback === void 0) { _removeCallback = null; }
        if (_stage === void 0) { _stage = -1; }
        var resList = [
            { url: "res/atlas/images/strengthen.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                if (StrengthenView.isOpen) {
                    return;
                }
            }
            else {
                StrengthenView.isOpen = true;
                var nodeView_1 = new StrengthenView(_stage);
                AlignTools.setToScreenGoldenPos(nodeView_1);
                LayerManager.getInstance().frameLayer.addChildWithMaskCall(nodeView_1, nodeView_1.removeSelf);
                _callback && _callback(nodeView_1);
                nodeView_1.once(Laya.Event.REMOVED, nodeView_1, function () {
                    StrengthenView.isOpen = false;
                    nodeView_1.removeUI();
                    _removeCallback && _removeCallback();
                });
            }
        }));
    };
    //初始化
    StrengthenView.prototype.init = function (_stage) {
        var that = this;
        //界面初始化
        var imgBg = that.mainView.getChildByName("imgBg");
        if (imgBg) {
            var btnExit = imgBg.getChildByName("btnExit");
            if (btnExit) {
                btnExit.offAll(Laya.Event.CLICK);
                btnExit.on(Laya.Event.CLICK, btnExit, function () {
                    // that.close("btnExit", false);
                    that.removeSelf();
                });
            }
        }
        //box
        for (var index = 0; index < 4; index++) {
            var skillId = that.indexArray[index];
            that.refreshBoxUI(skillId);
        }
        //精华碎片刷新
        that.setEssence(userData.essence);
        eventCenter.on(essenceChangeEvt, that, function (_data) {
            that.setEssence(userData.essence);
        });
        userData.requestEssenceData();
    };
    //移除界面
    StrengthenView.prototype.removeUI = function () {
        eventCenter.offAll(essenceChangeEvt);
    };
    //刷新精华碎片数
    StrengthenView.prototype.setEssence = function (_value) {
        var that = this;
        if (that.txtEssence) {
            that.txtEssence.changeText(CommonFun.bytesToSize(_value).toString());
        }
    };
    //设置强化数据
    StrengthenView.prototype.refreshBoxUI = function (_skillId) {
        var that = this;
        for (var index = 0; index < 4; index++) {
            var skillId = that.indexArray[index];
            if (_skillId == skillId) {
                var strengthenLevel = userData.querySkillAddition(_skillId);
                var curProbability = getSkillStrengthenLevelProbability(_skillId, strengthenLevel);
                var probability = getSkillStrengthenProbability(skillId, 1);
                var price = getSkillStrengthenCost(_skillId, strengthenLevel + 1);
                var imgBg = that.mainView.getChildByName("imgBg");
                if (imgBg) {
                    var strBoxKey = "boxItem" + (index + 1);
                    var boxItem = imgBg.getChildByName(strBoxKey);
                    if (boxItem) {
                        //加成
                        var txtAdd = boxItem.getChildByName("txtAdd");
                        if (txtAdd) {
                            txtAdd.changeText(CommonFun.numToPercent(curProbability));
                        }
                        //价格
                        var imgEssence = boxItem.getChildByName("imgEssence");
                        if (imgEssence) {
                            var txtEssence = imgEssence.getChildByName("txtEssence");
                            if (txtEssence) {
                                txtEssence.changeText("" + price);
                            }
                        }
                        //按钮
                        var btnStrengthen = boxItem.getChildByName("btnStrengthen");
                        if (btnStrengthen) {
                            btnStrengthen.offAll(Laya.Event.CLICK);
                            btnStrengthen.on(Laya.Event.CLICK, that, function (_btnObj, _btnInfo) {
                                // console.log("btnStrengthen", _btnInfo);
                                if (userData.essence < _btnInfo.price) {
                                    CommonFun.showTip("精华碎片不足");
                                    return;
                                }
                                that.requestSkillStrengthen(_btnInfo.skillId, 1, _btnInfo.price, 1, function (_res) {
                                    if (_res && _res.type) {
                                        userData.refreshSkillAddition(_btnInfo.skillId);
                                        that.refreshBoxUI(_btnInfo.skillId);
                                        CommonFun.showTip("强化成功!");
                                        if (_res.hasOwnProperty("essence")) {
                                            userData.setEssence(CommonFun.parseInt(_res.essence));
                                            that.setEssence(userData.essence);
                                        }
                                    }
                                });
                            }, [btnStrengthen, { skillId: skillId, price: price }]);
                            var txtAdd_1 = btnStrengthen.getChildByName("txtAdd");
                            if (txtAdd_1) {
                                txtAdd_1.changeText(CommonFun.numToPercent(probability));
                            }
                        }
                    }
                }
            }
        }
    };
    //请求技能强化
    StrengthenView.prototype.requestSkillStrengthen = function (_id, _level, _price, _coinType, _callback) {
        if (_callback === void 0) { _callback = null; }
        var that = this;
        var dataString = 'type=' + _id + '&value=' + _level + '&price=' + _price + '&unit=' + "essence";
        var HttpReqHelper = new HttpRequestHelper(AppUrl);
        HttpReqHelper.request({
            url: 'v1/intensify',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestSkillStrengthen", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    };
    StrengthenView.isOpen = false;
    return StrengthenView;
}(ui.StrengthenViewUI));
//# sourceMappingURL=StrengthenView.js.map