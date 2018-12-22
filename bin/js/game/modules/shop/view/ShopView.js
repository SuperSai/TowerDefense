/*
* 商店界面
*/
class ShopView extends ui.shop.ShopViewUI {
    constructor(_kind) {
        super();
        this.btnBuyFun = null; //购买回调
        this.btnFreeFun = null; //购买回调
        this.btnDiamondFun = null; //购买回调
        this.evolutionFun = null; //进化回调
        this.isScroll = true;
        this.init(_kind);
    }
    //新建并添加到节点
    static Create(_parentNode, _callback = null, _removeCallback = null, _kind = 0) {
        let resList = [
            { url: "res/atlas/images/shop.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                let nodeView = new ShopView(_kind);
                AlignUtils.setToScreenGoldenPos(nodeView);
                M.layer.frameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                _callback && _callback(nodeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, _removeCallback);
            }
        }));
    }
    //初始化
    init(_kind) {
        let self = this;
        SDKManager.Instance.showBannerAd(true);
        //按钮事件
        self.removeEvents();
        self.btnExit.on(Laya.Event.CLICK, self, self.onClickExit);
        self.btn_skillExplain.on(Laya.Event.CLICK, self, self.onSkillExplain);
        self.initList();
    }
    removeEvents() {
        let self = this;
        self.btnExit.off(Laya.Event.CLICK, self, self.onClickExit);
        self.btn_skillExplain.off(Laya.Event.CLICK, self, self.onSkillExplain);
    }
    onSkillExplain() {
        let self = this;
        SkillExplainView.Create(self);
    }
    //点击事件
    onClickExit() {
        this.removeSelf();
    }
    //刷新金币与钻石
    refreshMoney(_money, _diamond) {
        let that = this;
        if (that.txtMoney) {
            that.txtMoney.changeText(MathUtils.bytesToSize(_money));
        }
        if (that.txtDiamond) {
            that.txtDiamond.changeText(MathUtils.bytesToSize(_diamond));
        }
    }
    //初始化列表
    initList() {
        let self = this;
        let monsterType = userData.isEvolution() ? 2 : 1;
        let heroesData = BattleManager.Instance.getAllMonsterByType(monsterType);
        self.heroList.vScrollBarSkin = '';
        self.heroList.repeatY = heroesData.length;
        self.heroList.array = heroesData;
        // if (self.isScroll) self.heroList.visible = false;
        let firstLockId = 0; //第一个被锁项目
        let shareFreeCarId = 0; //免费得车Id
        let shareFreeCarCfg = BattleManager.Instance.getPreMonster(monsterType * 100 + userData.getCarLevel(), -1);
        if (shareFreeCarCfg) {
            shareFreeCarId = shareFreeCarCfg.id;
        }
        let curBuyIndex = BattleManager.Instance.getLevel(shareFreeCarId) - 1; //滚屏位置
        let count = 1;
        let moveY = 50;
        self.heroList.renderHandler = new Laya.Handler(self, (cell, index) => {
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
            let carInfo = self.heroList.array[index];
            if (carInfo) {
                let monsterType = BattleManager.Instance.getType(carInfo.id);
                let monsterLevel = BattleManager.Instance.getLevel(carInfo.id);
                let imgModel = cell.getChildByName('imgModel');
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
                let txtLevel = cell.getChildByName('txtLevel');
                if (txtLevel) {
                    txtLevel.changeText('' + BattleManager.Instance.getLevel(carInfo.id));
                }
                let txtName = cell.getChildByName('txtName');
                if (txtName) {
                    txtName.text = carInfo.name;
                }
                let imgAtk = cell.getChildByName('imgAtk');
                if (imgAtk) {
                    let txtValue = imgAtk.getChildByName('txtAtk');
                    if (txtValue) {
                        txtValue.changeText('' + MathUtils.bytesToSize(Number(carInfo.atk)));
                    }
                }
                let imgSpeed = cell.getChildByName('imgSpeed');
                if (imgSpeed) {
                    let txtValue = imgSpeed.getChildByName('txtSpeed');
                    if (txtValue) {
                        txtValue.changeText('' + carInfo.ias);
                    }
                }
                let buyBtnLock = (userData.getCarLevel() < carInfo.unLockId);
                let btnBuy = cell.getChildByName('btnBuy');
                if (btnBuy) {
                    btnBuy.offAll(Laya.Event.CLICK);
                    btnBuy.on(Laya.Event.CLICK, self, (_carInfo = null, _btnObj = null) => {
                        self.btnBuyFun && self.btnBuyFun.runWith([_carInfo, _btnObj]);
                    }, [carInfo, btnBuy]);
                    btnBuy.visible = !buyBtnLock;
                    btnBuy.disabled = buyBtnLock;
                    self.updateMoney(carInfo, btnBuy);
                }
                let btnBuyLock = cell.getChildByName('btnBuyLock');
                if (btnBuyLock) {
                    btnBuyLock.visible = buyBtnLock;
                    btnBuyLock.offAll(Laya.Event.CLICK);
                    btnBuyLock.on(Laya.Event.CLICK, self, () => {
                        MessageUtils.shopMsgByObj(btnBuyLock, LanguageManager.Instance.getLanguageText("hallScene.label.txt.02"));
                    });
                    let imgPet = cell.getChildByName("imgPet");
                    if (imgPet) {
                        imgPet.visible = btnBuyLock.visible;
                        let monsterInfo2 = BattleManager.Instance.getMonsterItem(monsterType * 100 + carInfo.unLockId);
                        if (monsterInfo2) {
                            imgPet.skin = "images/carImg/" + monsterInfo2.imgUrl;
                        }
                        //变黑
                        if (!imgPet.filters) {
                            imgPet.filters = DisplayUtils.createColorFilter(2);
                        }
                        imgPet.alpha = 0.6;
                    }
                    let txtUnlockLevel = btnBuyLock.getChildByName('txtUnlockLevel');
                    if (txtUnlockLevel) {
                        txtUnlockLevel.text = "" + carInfo.unLockId;
                        //最后4辆车铜钱禁售
                        if (carInfo.unLockId >= 1000) {
                            txtUnlockLevel.text = "?";
                        }
                    }
                }
                //视频分享
                let btnSharePrize = cell.getChildByName('btnSharePrize');
                if (btnSharePrize) {
                    btnSharePrize.visible = (shareFreeCarId == carInfo.id);
                    btnSharePrize.offAll(Laya.Event.CLICK);
                    btnSharePrize.on(Laya.Event.CLICK, self, (_carInfo = null, _btnObj = null) => {
                        self.btnFreeFun && self.btnFreeFun.runWith([_carInfo, _btnObj]);
                    }, [carInfo, btnSharePrize]);
                    //观看次数已用完
                    if (userData.getAdTimes(11) < 1 && userData.getShareTimes(11) < 1) {
                        btnSharePrize.visible = false;
                    }
                    else {
                        if (userData.isAdStage(11)) {
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
                let btnDiamondBuy = cell.getChildByName('btnDiamondBuy');
                if (btnDiamondBuy) {
                    if (firstLockId > 0) {
                        btnDiamondBuy.visible = (firstLockId == carInfo.unLockId);
                        if (btnDiamondBuy.visible) {
                            btnDiamondBuy.offAll(Laya.Event.CLICK);
                            btnDiamondBuy.on(Laya.Event.CLICK, self, (_carInfo = null, _btnObj = null) => {
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
        self.frameOnce(5, self, () => {
            if (self.heroList && curBuyIndex > 0) {
                self.heroList.scrollTo(curBuyIndex);
            }
        });
    }
    updateMoney(carInfo, btnBuy) {
        let that = this;
        let curPrice = BattleManager.Instance.getMonsterPrice(carInfo.buyPrice, userData.queryBuyRecord(carInfo.id));
        let imgPrice = btnBuy.getChildByName('imgPrice');
        if (imgPrice) {
            let txtPrice = imgPrice.getChildByName('txtPrice');
            if (txtPrice) {
                txtPrice.text = MathUtils.bytesToSize(curPrice);
            }
        }
    }
}
//# sourceMappingURL=ShopView.js.map