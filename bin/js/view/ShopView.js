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
* terry 2018/10/26;
*/
var ShopView = /** @class */ (function (_super) {
    __extends(ShopView, _super);
    function ShopView(_kind) {
        var _this = _super.call(this) || this;
        _this.curSelectedIndex = -1;
        _this.btnBuyFun = null; //购买回调
        _this.btnFreeFun = null; //购买回调
        _this.btnDiamondFun = null; //购买回调
        _this.evolutionFun = null; //进化回调
        _this.isScroll = true;
        _this.init(_kind);
        return _this;
    }
    //新建并添加到节点
    ShopView.Create = function (_parentNode, _callback, _removeCallback, _kind) {
        if (_callback === void 0) { _callback = null; }
        if (_removeCallback === void 0) { _removeCallback = null; }
        if (_kind === void 0) { _kind = 0; }
        var resList = [
            { url: "res/atlas/images/shop.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            if (_parentNode) {
                var nodeView = new ShopView(_kind);
                AlignTools.setToScreenGoldenPos(nodeView);
                M.layer.frameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                // EffectUtils.viewScaleShow(nodeView);
                _callback && _callback(nodeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    };
    //初始化
    ShopView.prototype.init = function (_kind) {
        var that = this;
        //按钮事件
        that.btnExit.on(Laya.Event.CLICK, that, that.onClickExit);
        that.tabMain.selectHandler = new Laya.Handler(that, that.onSelecteTab);
        that.btnEvolution.on(Laya.Event.CLICK, that, that.onEvolution);
        if (_kind > 1) {
            //毒
            that.tabMain.selectedIndex = 2;
        }
        else if (_kind > 0) {
            //水
            that.tabMain.selectedIndex = 1;
        }
        else {
            //电
            that.tabMain.selectedIndex = 0;
            that.viewStackMain.selectedIndex = that.tabMain.selectedIndex;
            that.initList();
        }
    };
    //点击事件
    ShopView.prototype.onClickExit = function () {
        this.removeSelf();
    };
    ShopView.prototype.onEvolution = function () {
        var that = this;
        EvolutionShopView.Create(that, function (_nodeView) {
            _nodeView.refreshBoxUI(function (_evolutionLevel) {
                //进化成功关闭商店
                that.evolutionFun && that.evolutionFun.runWith([_evolutionLevel]);
                that.onClickExit();
            });
        });
    };
    ShopView.prototype.onSelecteTab = function (_index) {
        var that = this;
        if (!that.isScroll) {
            if (that.viewStackMain) {
                that.viewStackMain.selectedIndex = _index;
                that.initList();
            }
        }
        else {
            that.tabMain.selectedIndex = that.viewStackMain.selectedIndex;
        }
    };
    //刷新金币与钻石
    ShopView.prototype.refreshMoney = function (_money, _diamond) {
        var that = this;
        if (that.txtMoney) {
            that.txtMoney.changeText(CommonFun.bytesToSize(_money));
        }
        if (that.txtDiamond) {
            that.txtDiamond.changeText(CommonFun.bytesToSize(_diamond));
        }
    };
    //初始化列表
    ShopView.prototype.initList = function () {
        var that = this;
        var selectedIndex = that.viewStackMain.selectedIndex;
        //进化说明
        var txtEvolve = "攻击时有几率同时攻击2个怪物";
        if (selectedIndex > 1) {
            txtEvolve = "攻击时有几率造成减速效果";
        }
        else if (selectedIndex > 0) {
            txtEvolve = "攻击时有几率造成中毒效果";
        }
        if (that.txtEvolve) {
            that.txtEvolve.text = txtEvolve;
        }
        //商品列表
        var selectionView = that.viewStackMain.selection;
        var listView = null;
        if (selectionView) {
            listView = selectionView.getChildByName("itemList");
        }
        if (listView.array && listView.array.length > 0) {
            that.isScroll = false;
            if (!listView.visible)
                listView.visible = true;
            return;
        }
        var monsterType = selectedIndex + 1;
        if (userData.isEvolution()) {
            //进化设定
            monsterType = monsterType * 10;
        }
        var listDatas = getMonsterListConfig(monsterType);
        listView.vScrollBarSkin = '';
        listView.repeatY = 4;
        listView.array = listDatas;
        if (that.isScroll)
            listView.visible = false;
        var firstLockId = 0; //第一个被锁项目
        var shareFreeCarId = 0; //免费得车Id
        var shareFreeCarCfg = getPreMonsterConfig(monsterType * 100 + userData.getCarLevel(), -1);
        if (shareFreeCarCfg) {
            shareFreeCarId = shareFreeCarCfg.id;
        }
        var curBuyIndex = CommonFun.getLevel(shareFreeCarId) - 1; //滚屏位置
        var index = 1;
        var moveY = 50;
        listView.renderHandler = new Laya.Handler(that, function (cell, cellIndex) {
            if (cellIndex > listView.array.length)
                return;
            if (cellIndex >= curBuyIndex && that.isScroll) {
                if (!listView.visible)
                    listView.visible = true;
                moveY = cellIndex < 4 ? 150 : 50;
                Laya.Tween.from(cell, { y: cell.y + moveY * (cellIndex + 1) }, 100 * index, null, Laya.Handler.create(that, function () {
                    Laya.Tween.clearTween(cell);
                    if (cellIndex >= (curBuyIndex + 3)) {
                        that.isScroll = false;
                    }
                }));
                index++;
            }
            var carInfo = listDatas[cellIndex];
            if (carInfo) {
                var monsterType_1 = CommonFun.getType(carInfo.id);
                var monsterLevel = CommonFun.getLevel(carInfo.id);
                var imgModel = cell.getChildByName('imgModel');
                if (imgModel) {
                    if (imgModel && carInfo.imgUrl) {
                        imgModel.skin = "images/carImg/" + carInfo.imgUrl;
                        //变黑
                        if (userData.getCarLevel() < monsterLevel) {
                            if (!imgModel.filters) {
                                imgModel.filters = CommonFun.createColorFilter(2);
                            }
                        }
                        else {
                            imgModel.filters = [];
                        }
                    }
                }
                var txtLevel = cell.getChildByName('txtLevel');
                if (txtLevel) {
                    txtLevel.changeText('' + CommonFun.getLevel(carInfo.id));
                }
                var txtName = cell.getChildByName('txtName');
                if (txtName) {
                    txtName.text = carInfo.name;
                }
                var imgAtk = cell.getChildByName('imgAtk');
                if (imgAtk) {
                    var txtValue = imgAtk.getChildByName('txtAtk');
                    if (txtValue) {
                        txtValue.changeText('' + CommonFun.bytesToSize(carInfo.atk));
                    }
                }
                var imgSpeed = cell.getChildByName('imgSpeed');
                if (imgSpeed) {
                    var txtValue = imgSpeed.getChildByName('txtSpeed');
                    if (txtValue) {
                        txtValue.changeText('' + carInfo.ias);
                    }
                }
                var buyBtnLock = (userData.getCarLevel() < carInfo.unLockId);
                var btnBuy = cell.getChildByName('btnBuy');
                if (btnBuy) {
                    btnBuy.offAll(Laya.Event.CLICK);
                    btnBuy.on(Laya.Event.CLICK, that, function (_carInfo, _btnObj) {
                        if (_carInfo === void 0) { _carInfo = null; }
                        if (_btnObj === void 0) { _btnObj = null; }
                        that.btnBuyFun && that.btnBuyFun.runWith([_carInfo, _btnObj]);
                    }, [carInfo, btnBuy]);
                    btnBuy.visible = !buyBtnLock;
                    btnBuy.disabled = buyBtnLock;
                    that.updateMoney(carInfo, btnBuy);
                }
                var btnBuyLock_1 = cell.getChildByName('btnBuyLock');
                if (btnBuyLock_1) {
                    btnBuyLock_1.visible = buyBtnLock;
                    btnBuyLock_1.offAll(Laya.Event.CLICK);
                    btnBuyLock_1.on(Laya.Event.CLICK, that, function () {
                        EffectUtils.tipsLabelByObject(btnBuyLock_1, "升级守护解锁");
                    });
                    var imgPet = cell.getChildByName("imgPet");
                    if (imgPet) {
                        imgPet.visible = btnBuyLock_1.visible;
                        var monsterInfo2 = getMonsterConfig(monsterType_1 * 100 + carInfo.unLockId);
                        if (monsterInfo2) {
                            imgPet.skin = "images/carImg/" + monsterInfo2.imgUrl;
                        }
                        //变黑
                        if (!imgPet.filters) {
                            imgPet.filters = CommonFun.createColorFilter(2);
                        }
                        imgPet.alpha = 0.6;
                    }
                    var txtUnlockLevel = btnBuyLock_1.getChildByName('txtUnlockLevel');
                    if (txtUnlockLevel) {
                        txtUnlockLevel.text = "" + CommonFun.parseInt(carInfo.unLockId);
                        //最后4辆车铜钱禁售
                        if (carInfo.unLockId >= 1000) {
                            txtUnlockLevel.text = "?";
                        }
                    }
                }
                //视频分享
                var btnSharePrize = cell.getChildByName('btnSharePrize');
                if (btnSharePrize) {
                    btnSharePrize.visible = (shareFreeCarId == carInfo.id);
                    btnSharePrize.offAll(Laya.Event.CLICK);
                    btnSharePrize.on(Laya.Event.CLICK, that, function (_carInfo, _btnObj) {
                        if (_carInfo === void 0) { _carInfo = null; }
                        if (_btnObj === void 0) { _btnObj = null; }
                        that.btnFreeFun && that.btnFreeFun.runWith([_carInfo, _btnObj]);
                    }, [carInfo, btnSharePrize]);
                    //观看次数已用完
                    if (userData.getAdTimes(12) < 1 && userData.getShareTimes(11) < 1) {
                        btnSharePrize.visible = false;
                    }
                    else {
                        if (userData.isAdStage(12)) {
                            btnSharePrize.skin = "images/shop_free_video.png";
                        }
                        else {
                            btnSharePrize.skin = "images/shop_free_share.png";
                        }
                    }
                }
                //钻石购买
                if (carInfo.unLockId < 1000 && userData.getCarLevel() < carInfo.unLockId && firstLockId < 1) {
                    firstLockId = carInfo.unLockId;
                }
                var btnDiamondBuy = cell.getChildByName('btnDiamondBuy');
                if (btnDiamondBuy) {
                    if (firstLockId > 0) {
                        btnDiamondBuy.visible = (firstLockId == carInfo.unLockId);
                        if (btnDiamondBuy.visible) {
                            btnDiamondBuy.offAll(Laya.Event.CLICK);
                            btnDiamondBuy.on(Laya.Event.CLICK, that, function (_carInfo, _btnObj) {
                                if (_carInfo === void 0) { _carInfo = null; }
                                if (_btnObj === void 0) { _btnObj = null; }
                                that.btnDiamondFun && that.btnDiamondFun.runWith([_carInfo, _btnObj]);
                            }, [carInfo, btnDiamondBuy]);
                        }
                    }
                    else {
                        btnDiamondBuy.visible = false;
                    }
                }
            }
        });
        that.frameOnce(5, that, function () {
            if (listView && curBuyIndex > 0) {
                listView.scrollTo(curBuyIndex);
            }
        });
    };
    ShopView.prototype.updateMoney = function (carInfo, btnBuy) {
        var that = this;
        var curPrice = getMonsterPrice(carInfo.buyPrice, userData.queryBuyRecord(carInfo.id));
        var imgPrice = btnBuy.getChildByName('imgPrice');
        if (imgPrice) {
            var txtPrice = imgPrice.getChildByName('txtPrice');
            if (txtPrice) {
                txtPrice.text = CommonFun.bytesToSize(curPrice);
            }
        }
    };
    return ShopView;
}(ui.ShopUI));
//# sourceMappingURL=ShopView.js.map