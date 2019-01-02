/*
* 商店界面
*/
class ShopView extends BaseView {
    constructor() {
        super(LAYER_TYPE.FRAME_LAYER, ui.shop.ShopViewUI);
        this.isScroll = true;
        this.setResources(["shop"]);
    }
    //初始化
    initUI() {
        super.initUI();
        let self = this;
        SDKManager.Instance.showBannerAd(true);
        self.initList();
        self.refreshMoney(PlayerManager.Instance.Info.userMoney, PlayerManager.Instance.Info.userDiamond);
    }
    addEvents() {
        super.addEvents();
        let self = this;
        self.ui.btnExit.on(Laya.Event.CLICK, self, self.onClickExit);
        self.ui.btn_skillExplain.on(Laya.Event.CLICK, self, self.onSkillExplain);
        EventsManager.Instance.on(EventsType.UPDATE_CURRENCY, self, self.onUpdateCurrency);
    }
    removeEvents() {
        super.removeEvents();
        let self = this;
        self.ui.btnExit.off(Laya.Event.CLICK, self, self.onClickExit);
        self.ui.btn_skillExplain.off(Laya.Event.CLICK, self, self.onSkillExplain);
        EventsManager.Instance.off(EventsType.UPDATE_CURRENCY, self, self.onUpdateCurrency);
    }
    onSkillExplain() {
        ViewMgr.Ins.open(ViewConst.SkillExplainView);
    }
    onUpdateCurrency() {
        this.refreshMoney(PlayerManager.Instance.Info.userMoney, PlayerManager.Instance.Info.userDiamond);
    }
    //点击事件
    onClickExit() {
        ViewMgr.Ins.close(ViewConst.ShopView);
    }
    //刷新金币与钻石
    refreshMoney(_money, _diamond) {
        let that = this;
        if (that.ui.txtMoney) {
            that.ui.txtMoney.changeText(MathUtils.bytesToSize(_money));
        }
        if (that.ui.txtDiamond) {
            that.ui.txtDiamond.changeText(MathUtils.bytesToSize(_diamond));
        }
    }
    //初始化列表
    initList() {
        let self = this;
        let monsterType = userData.isEvolution() ? 2 : 1;
        let heroesData = BattleManager.Instance.getAllMonsterByType(monsterType);
        self.ui.heroList.vScrollBarSkin = '';
        self.ui.heroList.repeatY = heroesData.length;
        self.ui.heroList.array = heroesData;
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
        self.ui.heroList.renderHandler = new Laya.Handler(self, (cell, index) => {
            if (index > self.ui.heroList.array.length)
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
            let carInfo = self.ui.heroList.array[index];
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
                        HallManager.Instance.goldBuyHero(_carInfo, _btnObj);
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
                        this.onShareFreeCar(_carInfo, _btnObj);
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
                            btnDiamondBuy.on(Laya.Event.CLICK, self, (_carInfo = null) => {
                                HallManager.Instance.onDiamondBuy(_carInfo);
                            }, [carInfo]);
                        }
                    }
                    else {
                        btnDiamondBuy.visible = false;
                    }
                }
            }
        });
        self.frameOnce(5, self, () => {
            if (self.ui.heroList && curBuyIndex > 0) {
                self.ui.heroList.scrollTo(curBuyIndex);
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
    /** 看广告或分享得英雄 */
    onShareFreeCar(_carInfo = null, btnObj = null) {
        let that = this;
        //显示广告
        userData.toShareAd((_res) => {
            if (userData) {
                let carParkSp = BattleManager.Instance.createPet(_carInfo.id, true);
                if (carParkSp == null) {
                    if (HallManager.Instance.hall)
                        HallManager.Instance.hall.saveCarStore(_carInfo.id);
                }
                MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.03"));
                ViewMgr.Ins.open(ViewConst.FreeGetPetView, null, _carInfo);
                if (btnObj) {
                    //观看次数已用完
                    if (userData.getAdTimes(11) < 1 && userData.getShareTimes(11) < 1) {
                        btnObj.visible = false;
                    }
                    else {
                        if (userData.isAdStage(11)) {
                            btnObj.skin = "images/core/shop_free_video.png";
                        }
                        else {
                            btnObj.skin = "images/core/shop_free_share.png";
                        }
                    }
                }
                userData.removeCarShopRedPoin();
                // 30分钟后检测是否还有红点
                M.hall.resolveShopRedPoint();
            }
        }, 11, false, true);
    }
}
//# sourceMappingURL=ShopView.js.map