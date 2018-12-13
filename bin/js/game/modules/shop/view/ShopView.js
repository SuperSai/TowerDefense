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
* 商店界面
*/
var ShopView = /** @class */ (function (_super) {
    __extends(ShopView, _super);
    function ShopView(_kind) {
        var _this = _super.call(this) || this;
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
                AlignUtils.setToScreenGoldenPos(nodeView);
                M.layer.frameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                _callback && _callback(nodeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    };
    //初始化
    ShopView.prototype.init = function (_kind) {
        var self = this;
        //按钮事件
        self.removeEvents();
        self.btnExit.on(Laya.Event.CLICK, self, self.onClickExit);
        self.btn_skillExplain.on(Laya.Event.CLICK, self, self.onSkillExplain);
        self.initList();
    };
    ShopView.prototype.removeEvents = function () {
        var self = this;
        self.btnExit.off(Laya.Event.CLICK, self, self.onClickExit);
        self.btn_skillExplain.off(Laya.Event.CLICK, self, self.onSkillExplain);
    };
    ShopView.prototype.onSkillExplain = function () {
        var self = this;
        SkillExplainView.Create(self);
    };
    //点击事件
    ShopView.prototype.onClickExit = function () {
        this.removeSelf();
    };
    //刷新金币与钻石
    ShopView.prototype.refreshMoney = function (_money, _diamond) {
        var that = this;
        if (that.txtMoney) {
            that.txtMoney.changeText(MathUtils.bytesToSize(_money));
        }
        if (that.txtDiamond) {
            that.txtDiamond.changeText(MathUtils.bytesToSize(_diamond));
        }
    };
    //初始化列表
    ShopView.prototype.initList = function () {
        var self = this;
        var monsterType = userData.isEvolution() ? 2 : 1;
        var heroesData = BattleManager.Instance.getAllMonsterByType(monsterType);
        self.heroList.vScrollBarSkin = '';
        self.heroList.repeatY = heroesData.length;
        self.heroList.array = heroesData;
        // if (self.isScroll) self.heroList.visible = false;
        var firstLockId = 0; //第一个被锁项目
        var shareFreeCarId = 0; //免费得车Id
        var shareFreeCarCfg = BattleManager.Instance.getPreMonster(monsterType * 100 + userData.getCarLevel(), -1);
        if (shareFreeCarCfg) {
            shareFreeCarId = shareFreeCarCfg.id;
        }
        var curBuyIndex = BattleManager.Instance.getLevel(shareFreeCarId) - 1; //滚屏位置
        var count = 1;
        var moveY = 50;
        self.heroList.renderHandler = new Laya.Handler(self, function (cell, index) {
            if (index > self.heroList.array.length)
                return;
            // if (index >= curBuyIndex && self.isScroll) {
            //     if (!self.heroList.visible) self.heroList.visible = true;
            //     moveY = index < 4 ? 150 : 50;
            //     Laya.Tween.from(cell, { y: cell.y + moveY * (count + 1) }, 100 * count, null, Laya.Handler.create(self, () => {
            //         Laya.Tween.clearTween(cell);
            //         if (count >= (curBuyIndex + 3)) {
            //             self.isScroll = false;
            //         }
            //     }));
            //     count++;
            // }
            var carInfo = self.heroList.array[index];
            if (carInfo) {
                var monsterType_1 = BattleManager.Instance.getType(carInfo.id);
                var monsterLevel = BattleManager.Instance.getLevel(carInfo.id);
                var imgModel = cell.getChildByName('imgModel');
                if (imgModel) {
                    if (imgModel && carInfo.imgUrl) {
                        imgModel.skin = "images/carImg/" + carInfo.imgUrl;
                        //变黑
                        if (userData.getCarLevel() < monsterLevel) {
                            if (!imgModel.filters) {
                                imgModel.filters = DisplayUtils.createColorFilter(2);
                            }
                        }
                        else {
                            imgModel.filters = [];
                        }
                    }
                }
                var txtLevel = cell.getChildByName('txtLevel');
                if (txtLevel) {
                    txtLevel.changeText('' + BattleManager.Instance.getLevel(carInfo.id));
                }
                var txtName = cell.getChildByName('txtName');
                if (txtName) {
                    txtName.text = carInfo.name;
                }
                var imgAtk = cell.getChildByName('imgAtk');
                if (imgAtk) {
                    var txtValue = imgAtk.getChildByName('txtAtk');
                    if (txtValue) {
                        txtValue.changeText('' + MathUtils.bytesToSize(Number(carInfo.atk)));
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
                    btnBuy.on(Laya.Event.CLICK, self, function (_carInfo, _btnObj) {
                        if (_carInfo === void 0) { _carInfo = null; }
                        if (_btnObj === void 0) { _btnObj = null; }
                        self.btnBuyFun && self.btnBuyFun.runWith([_carInfo, _btnObj]);
                    }, [carInfo, btnBuy]);
                    btnBuy.visible = !buyBtnLock;
                    btnBuy.disabled = buyBtnLock;
                    self.updateMoney(carInfo, btnBuy);
                }
                var btnBuyLock_1 = cell.getChildByName('btnBuyLock');
                if (btnBuyLock_1) {
                    btnBuyLock_1.visible = buyBtnLock;
                    btnBuyLock_1.offAll(Laya.Event.CLICK);
                    btnBuyLock_1.on(Laya.Event.CLICK, self, function () {
                        EffectUtils.tipsLabelByObject(btnBuyLock_1, LanguageManager.Instance.getLanguageText("hallScene.label.txt.02"));
                    });
                    var imgPet = cell.getChildByName("imgPet");
                    if (imgPet) {
                        imgPet.visible = btnBuyLock_1.visible;
                        var monsterInfo2 = BattleManager.Instance.getMonsterItem(monsterType_1 * 100 + carInfo.unLockId);
                        if (monsterInfo2) {
                            imgPet.skin = "images/carImg/" + monsterInfo2.imgUrl;
                        }
                        //变黑
                        if (!imgPet.filters) {
                            imgPet.filters = DisplayUtils.createColorFilter(2);
                        }
                        imgPet.alpha = 0.6;
                    }
                    var txtUnlockLevel = btnBuyLock_1.getChildByName('txtUnlockLevel');
                    if (txtUnlockLevel) {
                        txtUnlockLevel.text = "" + carInfo.unLockId;
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
                    btnSharePrize.on(Laya.Event.CLICK, self, function (_carInfo, _btnObj) {
                        if (_carInfo === void 0) { _carInfo = null; }
                        if (_btnObj === void 0) { _btnObj = null; }
                        self.btnFreeFun && self.btnFreeFun.runWith([_carInfo, _btnObj]);
                    }, [carInfo, btnSharePrize]);
                    //观看次数已用完
                    if (userData.getAdTimes(12) < 1 && userData.getShareTimes(11) < 1) {
                        btnSharePrize.visible = false;
                    }
                    else {
                        if (userData.isAdStage(12)) {
                            btnSharePrize.skin = "images/core/shop_free_video.png";
                        }
                        else {
                            btnSharePrize.skin = "images/core/shop_free_share.png";
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
                            btnDiamondBuy.on(Laya.Event.CLICK, self, function (_carInfo, _btnObj) {
                                if (_carInfo === void 0) { _carInfo = null; }
                                if (_btnObj === void 0) { _btnObj = null; }
                                self.btnDiamondFun && self.btnDiamondFun.runWith([_carInfo, _btnObj]);
                            }, [carInfo, btnDiamondBuy]);
                        }
                    }
                    else {
                        btnDiamondBuy.visible = false;
                    }
                }
            }
        });
        self.frameOnce(5, self, function () {
            if (self.heroList && curBuyIndex > 0) {
                self.heroList.scrollTo(curBuyIndex);
            }
        });
    };
    ShopView.prototype.updateMoney = function (carInfo, btnBuy) {
        var that = this;
        var curPrice = BattleManager.Instance.getMonsterPrice(carInfo.buyPrice, userData.queryBuyRecord(carInfo.id));
        var imgPrice = btnBuy.getChildByName('imgPrice');
        if (imgPrice) {
            var txtPrice = imgPrice.getChildByName('txtPrice');
            if (txtPrice) {
                txtPrice.text = MathUtils.bytesToSize(curPrice);
            }
        }
    };
    return ShopView;
}(ui.shop.ShopViewUI));
//# sourceMappingURL=ShopView.js.map