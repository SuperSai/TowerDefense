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
* 大厅主场景
*/
var HallScene = /** @class */ (function (_super) {
    __extends(HallScene, _super);
    function HallScene() {
        var _this = _super.call(this) || this;
        _this.parkMonsterModelSp = null;
        _this.curMonsterSprite = null;
        _this.imgCarNumTimeLine = null; //兵营满席动画
        _this._giveCarTime = 0; //定时赠送怪物
        _this._giveTempTime = 0; //定时赠送怪物
        var self = _this;
        self.frameOnce(5, self, function () {
            self.addEvents();
            self.init();
        });
        return _this;
    }
    //新建并添加到节点
    HallScene.Create = function (_parentNode) {
        var resList = [
            { url: "res/atlas/images.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/images/component.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/images/core.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/images/novice.atlas", type: Laya.Loader.ATLAS },
            { url: "sheets/sheet.json", type: Laya.Loader.JSON }
        ];
        Laya.loader.load(resList, Handler.create(null, function () {
            EffectUtils.stopWaitEffect();
            if (_parentNode) {
                var viewTag = "HallScene";
                var nodeViewOld = _parentNode.getChildByName(viewTag);
                if (nodeViewOld) {
                    return;
                }
                var nodeView = new HallScene();
                nodeView.name = viewTag;
                _parentNode.addChild(nodeView);
            }
        }));
        //加载网络声音
        var resSoundList = [
            { url: "musics/unlock.mp3", type: Laya.Loader.SOUND },
            { url: "musics/makecar.mp3", type: Laya.Loader.SOUND },
            { url: "musics/cartorunway.mp3", type: Laya.Loader.SOUND },
            { url: "musics/accecar.mp3", type: Laya.Loader.SOUND },
            { url: "musics/drawcar.mp3", type: Laya.Loader.SOUND },
            { url: "musics/atk.mp3", type: Laya.Loader.SOUND },
            { url: "musics/kingUpdate.mp3", type: Laya.Loader.SOUND },
            { url: "musics/evolutions.mp3", type: Laya.Loader.SOUND }
        ];
        Laya.loader.load(resSoundList, Laya.Handler.create(null, function () {
            console.log("load music finish");
        }));
    };
    //初始化
    HallScene.prototype.init = function () {
        var self = this;
        self.btnMiniProgram.visible = false;
        if (self.btnMiniProgram && userData.miniImageUrl().length > 0) {
            Laya.loader.load(userData.miniImageUrl(), Laya.Handler.create(self, function (_imgTexture) {
                if (_imgTexture && _imgTexture.url) {
                    self.btnMiniProgram.skin = _imgTexture.url;
                }
            }));
        }
        self.carStoreBtnEnabled();
        self.progressBarPower.changeHandler = new Handler(self, self.powerAcceChangeHandler);
        self.powerAcceChangeHandler(self.progressBarPower.value);
        self.btnPower.visible = false; //加速炮台暂时屏蔽
        if (GlobalConfig.DEBUG) {
            DebugView.GameView = self;
            LayerManager.getInstance().debugLayer.addChild(new DebugView());
        }
        Sheet.initSheets(Laya.loader.getRes("sheets/sheet.json"));
        M.novice.init(userData.noviceGroupId);
        M.novice.saveFunc = function (groupId) {
            userData.saveNovice(groupId);
        };
        M.novice.start();
        BuffController.getInstance().init(self.viewBuffContainer);
        SkyDropController.getInstance().init(self.viewSkyDropContainer);
        M.more.initModel();
        Laya.timer.once(1e3, this, function () {
            if (Laya.Browser.window.wxUserInfo) {
                PlayerManager.Instance.Info.wxUserInfo = Laya.Browser.window.wxUserInfo;
            }
        });
        Laya.timer.once(2e3, this, function () {
            self.showDaySignView();
        });
        if (!NoviceManager.isComplete) {
            M.novice.on(NoviceEvent.ACTIVATE_TARGET, self, function (eventParam) {
                if (eventParam === NoviceTarget.QUICK_PURCHASE_MONSTER) {
                    M.novice.activateClickTarget(self.btnShopShortcut, eventParam, self.btnShopShortcut.parent);
                }
                else if (eventParam === NoviceTarget.FOREST_KING) {
                    M.novice.ui.btnReturnNovice2.visible = false;
                    M.novice.activateClickTarget(self.btnEvolution, eventParam, self.btnEvolution.parent, [{ target: self.spMountGuard, parent: self.spMountGuard.parent }]);
                }
                else if (eventParam === NoviceTarget.MONSTER_CELL_2) {
                    NoviceManager.cache.synthesiseComplete = function () {
                        M.novice.nextStep();
                    };
                }
            });
            M.novice.on(NoviceEvent.WAITING, self, function (_a) {
                var type = _a.type, value = _a.value;
                if (type === NoviceActivateType.LEVEL) {
                    NoviceManager.cache.checkLevel = function (level) {
                        if (level >= value) {
                            M.novice.nextGroup();
                            delete NoviceManager.cache.synthesiseComplete;
                        }
                    };
                }
                else if (type === NoviceActivateType.SYNTHESIS_LEVEL) {
                    NoviceManager.cache.checkPetSynthesisLevel = function (synthesisLevel) {
                        if (synthesisLevel >= value) {
                            M.novice.nextGroup();
                            delete NoviceManager.cache.checkPetSynthesisLevel;
                        }
                    };
                }
            });
        }
        /** 初始化用户数据 */
        self.initUserData();
        self.initCarUI();
        self.initCarparkList();
        //显示广告
        SDKManager.Instance.showBannerAd(false, self.mainView.y);
        //投诉建议
        if (self.btnFeedback) {
            var rect = LayerManager.getRealStageRect(self.btnFeedback);
            platform.createFeedbackButton({
                x: rect.x, y: rect.y,
                width: rect.width, height: rect.height
            });
        }
        //启动游戏出怪
        self.timerOnce(2000, self, function () {
            HallManager.Instance.hallData.gameStatus = 1;
            self.createMonster(HallManager.Instance.hallData.passStage, HallManager.Instance.hallData.passSection);
        });
        //守卫
        if (self.spMountGuard) {
            var bossId = userData.isEvolution() ? 100003 : 100002;
            self.spMountGuard.setKind(bossId);
        }
        //训练提示
        self.imgTrain.visible = false;
        self.gameTimeImg.visible = self.gameTimebg.visible = self.txtGameTime.visible = false;
        //检查守卫是否可以升级
        self.checkKingIsUpdate();
        StrengthenManager.Instance.checkRedPoint();
        self.showStagePrize(true);
    };
    /** 初始化用户数据 */
    HallScene.prototype.initUserData = function () {
        var self = this;
        //初始化用户数据
        if (userData) {
            HallManager.Instance.updateIncomePerSec(HallManager.Instance.hallData.userIncomePerSec);
            self.updateGold(userData.gold);
            self.updateDiamond(userData.diamond);
            HallManager.Instance.updateEssence(userData.essence);
            self.setPassStage(userData.getPassStage());
            self.setPassSection(userData.getPassSection());
            self.setKingLevel(userData.getKingLevel());
            self.refreshShortcutCreateBtn();
            //延迟处理
            self.frameOnce(50, self, function () {
                //离线收益
                if (userData && userData.hasOfflinePrize == false) {
                    userData.hasOfflinePrize = true;
                    userData.requestOfflinePrizeData();
                }
                else {
                    self.onOffLineRevenue();
                }
                self.showSurpassView();
                if (userData) {
                    var acceLeftTime = userData.getAcceLeftTime();
                    if (acceLeftTime > 0) {
                        var imgAcce = self.btnAcce.getChildByName("imgAcce");
                        if (imgAcce.visible == false) {
                            self.playAcceEffectView(acceLeftTime, false);
                        }
                    }
                }
                //先到后台拉取未领取的奖励
                HttpManager.Instance.requestStagePrizeData(function (_prizeList) {
                    if (_prizeList == null || _prizeList.length < 1)
                        return;
                    var prizeList = [];
                    var totalCount = _prizeList.length;
                    for (var index = 0; index < totalCount; index++) {
                        var element = _prizeList[totalCount - 1 - index];
                        if (element && element.stage < HallManager.Instance.hallData.passStage) {
                            if (element.stage < (HallManager.Instance.hallData.passStage - 5)) {
                                break; //最近5关
                            }
                            prizeList.push(element.stage); //过滤当前关卡
                            if (prizeList.length > 4) {
                                break; //最大5关
                            }
                        }
                    }
                    if (totalCount > 0) {
                        HallManager.Instance.hallData.stagePrizeList = prizeList.reverse();
                        self.showStagePrize(HallManager.Instance.hallData.stagePrizeList.length > 0);
                    }
                });
            });
            //获取钻石数据
            HttpManager.Instance.requestDiamondData();
            //获取精华碎片
            HttpManager.Instance.requestEssenceData();
            //每日签到红点
            if (userData.isShowDailySignRedPoint()) {
                self.showDailySignRedPoint();
            }
            //怪物商店红点
            if (userData.isShowCarShopRedPoint()) {
                self.showCarportRedPoint();
            }
            //任务红点
            if (userData.isShowTaskRedPoint()) {
                self.showTaskRedPoint();
            }
            //转盘红点
            if (userData.isShowLuckPrizeRedPoint()) {
                self.showLuckPrizeRedPoint();
            }
        }
    };
    HallScene.prototype.addEvents = function () {
        var self = this;
        self.btnRanking.on(Laya.Event.CLICK, self, self.onRanking);
        self.btnPower.on(Laya.Event.CLICK, self, self.onPowerAcce);
        self.btnShop.on(Laya.Event.CLICK, self, self.onShowCarport);
        self.btnCarStore.on(Laya.Event.CLICK, self, self.onCarStore);
        self.btnEvolution.on(Laya.Event.CLICK, self, self.onEvolution);
        self.btnAcce.on(Laya.Event.CLICK, self, self.onGameAccelerate);
        self.btnStrengthen.on(Laya.Event.CLICK, self, self.onStrengthen);
        self.btnStagePrize.on(Laya.Event.CLICK, self, self.onStagePrize);
        self.btnMiniProgram.on(Laya.Event.CLICK, self, self.onMiniProgram);
        self.btnDailyPrize.on(Laya.Event.CLICK, self, self.showDaySignView);
        self.btnLuckPrize.on(Laya.Event.CLICK, self, self.showLuckPrizeView);
        self.btn_fly.on(Laya.Event.CLICK, self, self.onClickMiniProgram);
        self.btn_block.on(Laya.Event.CLICK, self, self.onClickMiniProgram);
        self.btn_eliminate.on(Laya.Event.CLICK, self, self.onClickMiniProgram);
        this.btnMore.on(Laya.Event.CLICK, this, function () {
            M.more.show();
        });
        if (self.btnTask)
            self.btnTask.on(Laya.Event.CLICK, self, self.showTaskView);
        if (self.surpassView)
            self.surpassView.on(Laya.Event.CLICK, self, self.onFriendRanking);
        BattleManager.Instance.on(BattleEventsConst.BATTLE_CLEARANC, self, self.onBattleClearanc);
        BattleManager.Instance.on(BattleEventsConst.BATTLE_NO_CLEARANC, self, self.onBattleNoClearanc);
        EventsManager.Instance.on(EventsType.OFFLINE, self, self.onOffLineRevenue); //离线收益
        EventsManager.Instance.on(EventsType.DIAMOND_CHANGE, self, self.onRefreshDiamond); //钻石刷新
        EventsManager.Instance.on(EventsType.GLOD_CHANGE, self, self.onRefreshGold); //金币刷新
        EventsManager.Instance.on(EventsType.DAY_SIGN_RED_POINT, self, self.onUpdateSignRenPoint); //每日签到红点移除事件
        EventsManager.Instance.on(EventsType.TASK_RED_POINT, self, self.onUpdateTaskRedPoint); //任务红点移除事件
        EventsManager.Instance.on(EventsType.LUCK_PRIZED_RED_POINT, self, self.onUpdatePrizeRedPoint); //转盘红点移除事件
        EventsManager.Instance.on(EventsType.HERO_SHOP_RED_POINT, self, self.onUpdatePetShopRedPoint); //英雄商店红点事件
        EventsManager.Instance.on(EventsType.ACCE_CHANGE, self, self.onUpdateAccelerateBtnState); //加速按钮状态
        EventsManager.Instance.on(EventsType.LUCK_PRIZE, self, self.onUpdatePrizeState); //更新幸运抽奖状态
        EventsManager.Instance.on(EventsType.STRENGTHEN_RED_POINT, self, self.onUpdateStrengthenRedPoint); //强化红点移除事件
        EventsManager.Instance.on(EventsType.UPDATE_HALL_DATA, self, self.onUpdateHallData);
    };
    HallScene.prototype.onClickMiniProgram = function (evt) {
        var self = this;
        var appId = "";
        switch (evt.target) {
            case self.btn_fly:
                appId = "wx5bf2e598a2acbb50";
                break;
            case self.btn_block:
                appId = "wx9daa52931f687adc";
                break;
            case self.btn_eliminate:
                appId = "wx06f4827d100da314";
                break;
        }
        SDKManager.Instance.navigateToMiniProgram(appId);
    };
    HallScene.prototype.onUpdateHallData = function () {
        var self = this;
        self.updateGold(userData.gold);
        self.updateDiamond(userData.diamond);
    };
    /** 等级礼包 */
    HallScene.prototype.showStagePrize = function (value) {
        var self = this;
        if (self._levelReward == null && value) {
            self._levelReward = Laya.Pool.getItemByClass(userData.ANIMATION_POOL_NAME, Laya.Animation);
            self.btnStagePrize.addChild(self._levelReward);
            // 加载动画图集,加载成功后执行回调方法
            var aniAtlas = "images/effect/levelReward/levelReward.atlas";
            self._levelReward.loadAtlas(aniAtlas, Handler.create(self, function () {
                self._levelReward.interval = 77;
                self._levelReward.play();
            }));
        }
        self.btnStagePrize.visible = value;
    };
    //显示超越好友视窗
    HallScene.prototype.showSurpassView = function () {
        var that = this;
        if (userData) {
            userData.setUserCloudStorage();
        }
        var openDataContext = platform.getOpenDataContext();
        if (that.surpassView && openDataContext) {
            that.surpassView.visible = true;
            // openDataContext.postMessage({
            //   text: 'hello',
            //   year: (new Date()).getFullYear()
            // })
            // @ts-ignore
            var sharedCanvas = openDataContext.canvas;
            sharedCanvas.width = that.width;
            sharedCanvas.height = that.height;
            var rankSpName = "rank_sprite_key";
            var rankSprite = that.surpassView.getChildByName(rankSpName);
            if (rankSprite == null) {
                rankSprite = new Laya.Sprite();
                rankSprite.name = rankSpName;
                that.surpassView.addChild(rankSprite);
                rankSprite.zOrder = 1;
            }
            //添加本场景
            var rankTexture_1 = new Laya.Texture(sharedCanvas);
            rankTexture_1.bitmap.alwaysChange = true; //小游戏使用，非常费，每帧刷新
            rankSprite.graphics.clear();
            rankSprite.graphics.drawTexture(rankTexture_1, 0, 0, sharedCanvas.width, sharedCanvas.height);
            Laya.timer.once(200, that, function () {
                rankTexture_1.bitmap.alwaysChange = false; //关闭每帧刷新
            });
            //通知域刷新
            platform.postMessage({
                message: "showSurpassFriend"
            });
        }
    };
    HallScene.prototype.refreshShortcutCreateBtn = function (_buyType) {
        if (_buyType === void 0) { _buyType = 0; }
        var self = this;
        var monsterType = _buyType;
        monsterType = userData.isEvolution() ? 2 : 1;
        HallManager.Instance.hallData.buyMonsterType = monsterType;
        var monsterLevel = userData.getCarLevel();
        var monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, monsterLevel);
        var btnBuy = self.btnShopShortcut;
        if (monsterInfo && btnBuy) {
            if (HallManager.Instance.hallData.curNewMonsterId != monsterInfo.id) {
                HallManager.Instance.hallData.curNewMonsterId = monsterInfo.id;
                btnBuy.off(Laya.Event.CLICK, self, self.onBuyPet);
                btnBuy.on(Laya.Event.CLICK, self, self.onBuyPet, [monsterInfo, btnBuy]);
            }
            var curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
            var imgPrice = btnBuy.getChildByName("imgPrice");
            if (imgPrice) {
                var txtPrice = imgPrice.getChildByName("txtPrice");
                if (txtPrice) {
                    txtPrice.text = MathUtils.bytesToSize(curPrice);
                    //字体颜色提示
                    if (PlayerManager.Instance.Info.userMoney < curPrice) {
                        txtPrice.color = "#FF0000";
                    }
                    else {
                        txtPrice.color = "#fff1ba";
                    }
                }
                //当前购买怪物级别
                var txtLevel = btnBuy.getChildByName("txtLevel");
                if (txtLevel) {
                    txtLevel.text = ("英雄" + " Lv" + BattleManager.Instance.getLevel(monsterInfo.id));
                }
            }
        }
    };
    //离线收益
    HallScene.prototype.onOffLineRevenue = function () {
        var self = this;
        if (userData) {
            var offlinePrize = userData.offlinePrize();
            //离线超过10分钟才算奖励
            if (offlinePrize > 10 * 60 && HallManager.Instance.hallData.passStage > 0 && HallManager.Instance.isGuide() == false) {
                // 当前关卡收益*(挂机时间/180)*0.1 (挂机时间最大2小时)
                var prizeValue_1 = 0;
                var secondForHour = 60 * 60;
                var secHourMax = 2 * secondForHour;
                var stageIncome = BattleManager.Instance.getBarrierIncome(HallManager.Instance.hallData.passStage);
                if (offlinePrize > secHourMax) {
                    prizeValue_1 = (secHourMax / 180 * stageIncome) * 0.01;
                }
                else {
                    prizeValue_1 = (offlinePrize / 180 * stageIncome) * 0.01;
                }
                if (prizeValue_1 > 0) {
                    if (HallManager.Instance.hallData.passStage > 1) { //离线奖励
                        OfflineRewardsView.Create(self, null, function () {
                            self.updateGold(PlayerManager.Instance.Info.userMoney + prizeValue_1);
                        }, prizeValue_1);
                    }
                    else {
                        MessageUtils.showMsgTips("获得离线奖励:" + MathUtils.bytesToSize(prizeValue_1));
                    }
                }
            }
        }
    };
    //排行
    HallScene.prototype.onRanking = function () {
        var self = this;
        SDKManager.Instance.closeBannerAd(true);
        RankingView.Create(function () {
            //返回
            SDKManager.Instance.showBannerAd(true, self.mainView.y);
            self.showSurpassView();
        });
    };
    HallScene.prototype.onFriendRanking = function () {
        var that = this;
        SDKManager.Instance.closeBannerAd(true);
        RankingView.Create(function () {
            //返回
            SDKManager.Instance.showBannerAd(true, that.mainView.y);
            that.showSurpassView();
        }, true);
        //锁定按钮
        AnimationUtils.lockBtnStage(that.surpassView);
    };
    //金币购买英雄
    HallScene.prototype.onBuyPet = function (_carInfo, btnObj) {
        if (_carInfo === void 0) { _carInfo = null; }
        if (btnObj === void 0) { btnObj = null; }
        var self = this;
        var carPrice = BattleManager.Instance.getMonsterPrice(_carInfo.buyPrice, userData.queryBuyRecord(_carInfo.id));
        if (PlayerManager.Instance.Info.userMoney >= carPrice) {
            if (BattleManager.Instance.createPet(_carInfo.id) == null)
                return;
            self.updateGold(PlayerManager.Instance.Info.userMoney - carPrice);
            //刷新消费记录
            userData.refreshBuyRecord(_carInfo.id);
            var curPrice = BattleManager.Instance.getMonsterPrice(_carInfo.buyPrice, userData.queryBuyRecord(_carInfo.id));
            if (btnObj) {
                var imgPrice = btnObj.getChildByName("imgPrice");
                if (imgPrice) {
                    var txtPrice = imgPrice.getChildByName("txtPrice");
                    if (txtPrice) {
                        txtPrice.text = MathUtils.bytesToSize(curPrice);
                    }
                    MessageUtils.shopMsgByObj(btnObj, LanguageManager.Instance.getLanguageText("hallScene.label.txt.07"));
                }
            }
            self.refreshShortcutCreateBtn();
        }
        else {
            if (PlayerManager.Instance.Info.dayGetGoldCount > 0) {
                RewardGoldView.Create(self, function (money) {
                    PlayerManager.Instance.Info.dayGetGoldCount--;
                    self.updateGold(PlayerManager.Instance.Info.userMoney + money);
                    userData.saveLocal();
                });
            }
            else {
                MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.19"));
            }
        }
    };
    /** 钻石购买 */
    HallScene.prototype.onDiamondBuy = function (_carInfo) {
        if (_carInfo === void 0) { _carInfo = null; }
        var that = this;
        var carPrice = BattleManager.Instance.getMonsterDiamondPrice(_carInfo.id, userData.queryBuyRecord(_carInfo.id, true));
        DiamondBuyView.Create(that, function (carPriceInt) {
            HttpManager.Instance.requestDiamondBuyOrder(carPriceInt, function (_res) {
                if (_res) {
                    if (BattleManager.Instance.createPet(_carInfo.id) == null)
                        return;
                    HttpManager.Instance.requestDiamondBuy(_res.order_id, function (_res) {
                        MessageUtils.showMsgTips("购买成功");
                        HttpManager.Instance.requestDiamondData();
                        //刷新消费记录
                        userData.refreshBuyRecord(_carInfo.id, true);
                    });
                }
                else {
                    MessageUtils.showMsgTips("购买失败");
                }
            });
        }, null, DILOG_TYPE.PET, carPrice, _carInfo);
    };
    //强化
    HallScene.prototype.onStrengthen = function (_btnObj) {
        if (_btnObj === void 0) { _btnObj = null; }
        StrengthenView.Create();
    };
    //森林之王进化
    HallScene.prototype.onEvolution = function (_btnObj) {
        if (_btnObj === void 0) { _btnObj = null; }
        var that = this;
        if (userData.isEvolution() == false && userData.getKingLevel() >= 30) {
            //先进化
            EvolutionAdvancedView.Create(that, function (_nodeView) {
                _nodeView.refreshBoxUI(function (_evolutionLevel, _diamond, _essence) {
                    //进化成功
                    that.onEvolutionShop(_evolutionLevel);
                    //奖励
                    if (_diamond > 0) {
                        that.updateDiamond(_diamond);
                    }
                    if (_essence > 0) {
                        HallManager.Instance.updateEssence(_essence);
                    }
                    that.spMountGuard.setKind(100003);
                    that.playKingUpdateEffect();
                    Laya.SoundManager.playSound("musics/evolutions.mp3");
                    userData.saveLocal(true);
                });
            });
        }
        else {
            //升级
            EvolutionView.Create(null, function (_nodeView) {
                _nodeView.refreshBoxUI(function (_kingLevel, _money) {
                    if (_kingLevel > HallManager.Instance.hallData.userKingLevel) {
                        that.setKingLevel(_kingLevel);
                    }
                    //刷新钻石
                    if (_money >= 0) {
                        that.updateDiamond(_money);
                    }
                    that.playKingUpdateEffect();
                    Laya.SoundManager.playSound("musics/kingUpdate.mp3");
                    that.checkKingIsUpdate();
                });
            });
        }
    };
    //商店进化
    HallScene.prototype.onEvolutionShop = function (_level) {
        var that = this;
        if (HallManager.Instance.hallData.giveMonsterAllTime > 0)
            HallManager.Instance.hallData.giveMonsterAllTime = 1;
        //设置进化等级
        userData.updateEvolutionLevel(_level);
        //强行重置精灵等级为1
        userData.resetMonsterLevel();
        //重置快捷购买按钮
        that.refreshShortcutCreateBtn();
        //奖励三个高级精灵
        var prizeMonsterArray = [1001, 2001, 3001];
        if (that.carparkList) {
            for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
                var element = that.carparkList.getCell(index);
                if (element) {
                    var carParkSp = element.getChildByName("car");
                    if (carParkSp && carParkSp.monsterId > 0) {
                        if (index < 3) {
                            carParkSp.setKind(prizeMonsterArray[index]);
                        }
                        else {
                            carParkSp.clearStage();
                        }
                        userData.setCarparkSave(carParkSp);
                    }
                }
            }
        }
    };
    //未领取通关奖励
    HallScene.prototype.onStagePrize = function () {
        this.showPassStageResult(HallManager.Instance.hallData.passStage, null, true);
    };
    //敌方出怪
    HallScene.prototype.createMonster = function (_stage, _section) {
        var that = this;
        var stageSectionCfg = BattleManager.Instance.getBarrierSectionConfig(_stage, _section); // getStageSectionConfig(_stage, _section);
        if (stageSectionCfg) {
            var mBlood_1 = MathUtils.parseStringNum(stageSectionCfg["blood"]);
            var mMoney_1 = MathUtils.parseStringNum(stageSectionCfg["earnings"]);
            var _loop_1 = function (i) {
                var mId = stageSectionCfg["mId" + i];
                var mEnterTime = stageSectionCfg["mEnterTime" + i];
                var mNum = stageSectionCfg["mNum" + i];
                if (mId > 0) {
                    Laya.timer.once(mEnterTime * 1400, that, function () {
                        if (HallManager.Instance.hallData.gameStatus < 1 || HallManager.Instance.hallData.monsterArray.length > 10)
                            return;
                        var _loop_2 = function (k) {
                            var monsterSp = new MonsterSprite();
                            monsterSp.setBornDelayFun(that, 1200 * k, function () {
                                that.roadView.addChild(monsterSp);
                                monsterSp.setKind(mId);
                                monsterSp.pos(that.imgBorn.x, that.imgBorn.y + that.imgBorn.height / 2);
                                monsterSp.playMoveAction();
                                monsterSp.setDropMoney(mMoney_1); //收集金币
                                monsterSp.setDropMoneyFun(function (dropMoney) {
                                    if (dropMoney > 0) {
                                        var skyDropBuff = BuffController.getInstance().getBuffValueById(BuffSheet.COIN_OBTAIN_INCREASE);
                                        var skillBuff = userData.getSkillAdditionProbability(10);
                                        var resultCoin = dropMoney * (1 + skillBuff + skyDropBuff);
                                        var txtPos = new Laya.Point(monsterSp.x - 20, monsterSp.y - 50);
                                        EffectUtils.playImageTextEffect(that.roadView, "images/core/coin_40x40.png", "+" + MathUtils.bytesToSize(resultCoin), txtPos, monsterSp.zOrder + 100);
                                        that.updateGold(PlayerManager.Instance.Info.userMoney + resultCoin);
                                    }
                                });
                            });
                            //设置血量
                            monsterSp.updateBlood(0, mBlood_1);
                            //保存怪物列表
                            if (HallManager.Instance.hallData.monsterArray && monsterSp) {
                                HallManager.Instance.hallData.monsterArray.push(monsterSp);
                            }
                        };
                        for (var k = 0; k < mNum; k++) {
                            _loop_2(k);
                        }
                    });
                }
                else {
                    BattleManager.Instance.preloadingNextMonsters(HallManager.Instance.hallData.passStage, HallManager.Instance.hallData.passSection + 1);
                    return "break";
                }
            };
            for (var i = 1; i < 5; i++) {
                var state_1 = _loop_1(i);
                if (state_1 === "break")
                    break;
            }
        }
    };
    /** 钻石购买加速 */
    HallScene.prototype.onDiamondBuyAcce = function () {
        var self = this;
        var carPrice = 60;
        //钻石加速超过5次处理
        // let acceTimes = userData.diamondAcceTimes() - 5;
        // if (acceTimes > 0) {
        //     carPrice = carPrice * Math.pow(1.18, acceTimes);
        // }
        DiamondBuyView.Create(self, function (carPriceInt) {
            HttpManager.Instance.requestDiamondBuyOrder(carPriceInt, function (_res) {
                if (_res) {
                    HttpManager.Instance.requestDiamondBuy(_res.order_id, function (_res) {
                        self.playAcceEffectView();
                        HttpManager.Instance.requestDiamondData();
                        //钻石加速次数加1
                        userData.diamondAcceTimes(true);
                    });
                }
                else {
                    MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.05"));
                }
            }, 1);
        }, null, DILOG_TYPE.ACC, carPrice);
    };
    HallScene.prototype.onShareFreeCar = function (_carInfo, btnObj) {
        if (_carInfo === void 0) { _carInfo = null; }
        if (btnObj === void 0) { btnObj = null; }
        var that = this;
        //显示广告
        userData.toShareAd(function (_res) {
            if (userData) {
                var carParkSp = BattleManager.Instance.createPet(_carInfo.id, true);
                if (carParkSp == null) {
                    that.saveCarStore(_carInfo.id);
                }
                MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.03"));
                FreeGetPetView.Create(that, null, null, _carInfo);
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
                that.startShopRedpointTime();
            }
        }, 11, false, true);
    };
    HallScene.prototype.onShowCarport = function () {
        var that = this;
        ShopView.Create(that, function (_nodeView) {
            if (_nodeView) {
                _nodeView.name = "nodeShopView";
                _nodeView.btnBuyFun = Laya.Handler.create(that, that.onBuyPet, null, false);
                _nodeView.btnFreeFun = Laya.Handler.create(that, that.onShareFreeCar, null, false);
                _nodeView.btnDiamondFun = Laya.Handler.create(that, that.onDiamondBuy, null, false);
                _nodeView.evolutionFun = Laya.Handler.create(that, that.onEvolutionShop, null, false);
                _nodeView.refreshMoney(PlayerManager.Instance.Info.userMoney, PlayerManager.Instance.Info.userDiamond);
            }
        });
    };
    //能量加速
    HallScene.prototype.onPowerAcce = function () {
        var that = this;
        that.progressBarPower.value += 0.06;
        if (that.progressBarPower.value >= 1) {
            that.progressBarPower.value = 1;
            that.btnPower.disabled = true;
            that.btnPower.frameOnce(10, that, function () {
                that.playAcceEffectView(10);
                //加速次数统计
                HttpManager.Instance.requestShareAdFinish("manual_acce");
            });
            EffectUtils.playCoinEffect(that.imgPowerCar, "images/core/coin_40x40.png");
        }
        that.btnPower.timerLoop(100, that, that.powerAcceTime);
    };
    HallScene.prototype.powerAcceChangeHandler = function (_per) {
        var that = this;
        if (that.imgPowerCar) {
            that.imgPowerCar.x = 20 + that.progressBarPower.width * (1 - _per);
        }
        if (that.imgPowerBg) {
            if (that.imgPowerBg.visible == false && _per > 0) {
                that.imgPowerBg.scaleY = 0;
                var boxAnimation = function (target, onEvtFinish) {
                    if (onEvtFinish === void 0) { onEvtFinish = null; }
                    var timeLine = new Laya.TimeLine();
                    timeLine.addLabel("show1", 0).to(target, { scaleY: 1 }, 100);
                    if (onEvtFinish != null) {
                        timeLine.on(Laya.Event.COMPLETE, target, function () {
                            onEvtFinish();
                            timeLine.destroy();
                            timeLine = null;
                        });
                    }
                    timeLine.play(0);
                };
                boxAnimation(that.imgPowerBg);
            }
            that.imgPowerBg.visible = _per > 0;
        }
    };
    HallScene.prototype.powerAcceTime = function () {
        var that = this;
        that.progressBarPower.value -= 1.0 / 100;
        if (that.progressBarPower.value <= 0) {
            that.progressBarPower.value = 0;
            that.btnPower.clearTimer(that, that.powerAcceTime);
            that.btnPower.disabled = false;
        }
    };
    //显示怪物商店红点
    HallScene.prototype.showCarportRedPoint = function (_show) {
        if (_show === void 0) { _show = true; }
        var that = this;
        if (that.btnShop) {
            var imgRedPoint = that.btnShop.getChildByName("imgRedPoint");
            if (imgRedPoint) {
                imgRedPoint.visible = _show;
                var checkTime = userData.shiftShopRedpointTime(false);
                if (checkTime > 0) {
                    that.startShopRedpointTime(checkTime);
                    imgRedPoint.visible = false;
                }
            }
        }
    };
    // 30分钟后检测是否还有红点
    HallScene.prototype.startShopRedpointTime = function (_time) {
        if (_time === void 0) { _time = 1800; }
        var that = this;
        that.timerOnce(1000 * _time, that, function () {
            userData.shiftShopRedpointTime();
            if (userData.isShowCarShopRedPoint()) {
                that.showCarportRedPoint();
            }
        });
        userData.saveShopRedpointTime(_time);
    };
    //显示签到红点
    HallScene.prototype.showDailySignRedPoint = function (_show) {
        if (_show === void 0) { _show = true; }
        var that = this;
        if (that.btnDailyPrize) {
            var imgRedPoint = that.btnDailyPrize.getChildByName("imgRedPoint");
            if (imgRedPoint) {
                imgRedPoint.visible = _show;
            }
        }
    };
    /** 显示强化红点 */
    HallScene.prototype.showStrengthenRedPoint = function (show) {
        if (show === void 0) { show = true; }
        var self = this;
        self.strengthenRedPoint.visible = show;
    };
    //显示任务红点
    HallScene.prototype.showTaskRedPoint = function (_show) {
        if (_show === void 0) { _show = true; }
        var that = this;
        if (that.btnTask) {
            var imgRedPoint = that.btnTask.getChildByName("imgRedPoint");
            if (imgRedPoint) {
                imgRedPoint.visible = _show;
            }
        }
    };
    //显示转盘红点
    HallScene.prototype.showLuckPrizeRedPoint = function (_show) {
        if (_show === void 0) { _show = true; }
        var that = this;
        if (that.btnLuckPrize) {
            var imgRedPoint = that.btnLuckPrize.getChildByName("imgRedPoint");
            if (imgRedPoint) {
                imgRedPoint.visible = _show;
            }
        }
    };
    //初始化怪物/跑道
    HallScene.prototype.initCarUI = function () {
        var that = this;
        if (that.mainView) {
            that.mainView.on(Laya.Event.MOUSE_DOWN, that, function (e) {
                if (e === void 0) { e = null; }
                //只支持单选
                if (that.curMonsterSprite)
                    return;
                if (that.carparkList) {
                    for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
                        var element = that.carparkList.getCell(index);
                        if (element) {
                            var carParkSp = element.getChildByName("car");
                            if (carParkSp && carParkSp.visible && ObjectUtils.isHit(carParkSp)) {
                                if (carParkSp.isEnabled()) {
                                    carParkSp.setStage(3);
                                    that.curMonsterSprite = carParkSp;
                                    //复制模型
                                    that.parkMonsterModelSp = ObjectPool.pop(MonsterSprite, "NewMonsterSprite");
                                    that.parkMonsterModelSp.setKind(carParkSp.monsterId, index);
                                    that.parkMonsterModelSp.anim.pos(0, 0);
                                    that.parkMonsterModelSp.pos(that.mainView.mouseX, that.mainView.mouseY);
                                    that.mainView.addChild(that.parkMonsterModelSp);
                                    //高亮提示
                                    that.setCarparkLight(carParkSp);
                                }
                                else if (carParkSp.isRunning()) {
                                    that.curMonsterSprite = carParkSp;
                                }
                                else if (carParkSp.isBox()) {
                                    that.curMonsterSprite = carParkSp;
                                }
                                that.btnDelete.skin = "images/huishou_icon_1.png";
                                return;
                            }
                        }
                    }
                }
            });
            that.mainView.on(Laya.Event.MOUSE_MOVE, that, function (e) {
                if (e === void 0) { e = null; }
                if (that.parkMonsterModelSp) {
                    that.parkMonsterModelSp.pos(that.mainView.mouseX, that.mainView.mouseY);
                }
            });
            that.mainView.on(Laya.Event.MOUSE_UP, that, function (e) {
                if (e === void 0) { e = null; }
                //移除高亮提示
                that.setCarparkLight();
                if (that.parkMonsterModelSp && that.curMonsterSprite) {
                    if (that.btnDelete && ObjectUtils.isHit(that.btnDelete) && HallManager.Instance.isGuide() == false) {
                        var obtainMoney = that.curMonsterSprite.getSellPrice();
                        that.curMonsterSprite.clearStage();
                        var imgDest = that.btnDelete;
                        if (imgDest) {
                            //飘金币
                            EffectUtils.playCoinEffect(imgDest, "images/core/coin_40x40.png");
                            //飘数字
                            EffectUtils.playTextEffect(imgDest, "+" + MathUtils.bytesToSize(obtainMoney));
                        }
                        //刷新金币数
                        that.updateGold(PlayerManager.Instance.Info.userMoney + obtainMoney);
                        //本地保存
                        userData.setCarparkSave(that.curMonsterSprite);
                    }
                    else {
                        //恢复拖动状态
                        that.curMonsterSprite.setStage(1);
                        //判断是否合并或交换位置
                        if (that.carparkList) {
                            for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
                                var element = that.carparkList.getCell(index);
                                if (element) {
                                    var carParkSp = element.getChildByName("car");
                                    if (carParkSp && ObjectUtils.isHit(carParkSp) && carParkSp != that.curMonsterSprite) {
                                        if (!carParkSp.isBox() && !carParkSp.isLock()) {
                                            var carId = carParkSp.monsterId;
                                            var currPetLv = BattleManager.Instance.getLevel(carId);
                                            if (that.curMonsterSprite.isSameLevel(carId)) {
                                                //合并
                                                var monsterLevel = 0;
                                                if (userData.isEvolution()) {
                                                    monsterLevel = ((userData.getKingLevel() - 30) % 60) + 1;
                                                }
                                                else {
                                                    monsterLevel = ((userData.getKingLevel() - 1) % 30) + 1;
                                                }
                                                if (carParkSp.isMaxLevel()) {
                                                    MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.06"));
                                                }
                                                else if (currPetLv >= monsterLevel) {
                                                    MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.08"));
                                                }
                                                else {
                                                    var nextCardId = carId + 1;
                                                    if (carParkSp.isRunning()) {
                                                        carParkSp.setKind(nextCardId, index);
                                                        carParkSp.setStage(2);
                                                    }
                                                    else {
                                                        carParkSp.setKind(nextCardId, index);
                                                    }
                                                    if (NoviceManager.cache.synthesiseComplete) {
                                                        NoviceManager.cache.synthesiseComplete();
                                                    }
                                                    if (NoviceManager.cache.checkPetSynthesisLevel) {
                                                        NoviceManager.cache.checkPetSynthesisLevel(currPetLv + 1);
                                                    }
                                                    that.curMonsterSprite.clearStage();
                                                    carParkSp.playMergeEffetc(that.mainView, carId);
                                                    //检测等级刷新
                                                    if (userData.updateCarLevel(BattleManager.Instance.getLevel(nextCardId))) {
                                                        //显示红点
                                                        if (userData.isShowCarShopRedPoint() && userData.getCarLevel() == 6) {
                                                            that.showCarportRedPoint();
                                                        }
                                                        Laya.SoundManager.playSound("musics/unlock.mp3");
                                                    }
                                                    else {
                                                        Laya.SoundManager.playSound("musics/makecar.mp3");
                                                    }
                                                    //刷新快捷买怪物按钮
                                                    that.refreshShortcutCreateBtn();
                                                    HallManager.Instance.updateIncomePerSec(HallManager.Instance.getCalculateIncomePerSec(that.carparkList));
                                                    //本地保存
                                                    userData.setCarparkSave(carParkSp, that.curMonsterSprite);
                                                    //任务统计
                                                    HttpManager.Instance.requestDailyTaskData(1);
                                                    //检查守卫是否可以升级
                                                    that.checkKingIsUpdate();
                                                }
                                            }
                                            else if (!carParkSp.isRunning() && HallManager.Instance.isGuide() == false) {
                                                //交换
                                                var isEmpty = carParkSp.isEmpty();
                                                carParkSp.setKind(that.curMonsterSprite.monsterId);
                                                carParkSp.setStage(that.curMonsterSprite.monsterStage);
                                                if (isEmpty) {
                                                    that.curMonsterSprite.clearStage();
                                                }
                                                else {
                                                    that.curMonsterSprite.setKind(carId);
                                                }
                                                //本地保存
                                                userData.setCarparkSave(carParkSp, that.curMonsterSprite);
                                                Laya.SoundManager.playSound("musics/drawcar.mp3");
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    //移除模型
                    ObjectPool.push(that.parkMonsterModelSp);
                    that.parkMonsterModelSp.removeSelf();
                    that.curMonsterSprite = null;
                    that.btnDelete.skin = "images/huishou_icon_0.png";
                }
                else if (that.curMonsterSprite && HallManager.Instance.isGuide() == false) {
                    //取消选中状态
                    if (ObjectUtils.isHit(that.curMonsterSprite)) {
                        if (that.curMonsterSprite.isRunning()) {
                            that.curMonsterSprite.setStage(1);
                            //本地保存
                            userData.setCarparkSave(that.curMonsterSprite);
                        }
                        else if (that.curMonsterSprite.isBox()) {
                            that.curMonsterSprite.openBoxEffect();
                        }
                        return;
                    }
                }
            });
        }
        BattleManager.Instance.hallScene = that;
        BattleManager.Instance.startBattle();
    };
    //初始化兵营
    HallScene.prototype.initCarparkList = function () {
        var that = this;
        if (userData == null)
            return;
        var listDatas = userData.parkcarInfoArray;
        that.carparkList.vScrollBarSkin = "";
        that.carparkList.repeatY = HallManager.Instance.hallData.parkMonsterCount / 4;
        that.carparkList.array = listDatas;
        that.carparkList.renderHandler = new Laya.Handler(that, function (cell, index) {
            if (index > that.carparkList.array.length)
                return;
            var parkcarInfo = listDatas[index];
            var hero = cell.getChildByName("car");
            if (hero) {
                if (parkcarInfo && parkcarInfo.carId > 0) {
                    hero.setKind(parkcarInfo.carId, index);
                }
                else {
                    hero.setKind(-1, index);
                }
            }
        });
    };
    /** 更新金币数量 */
    HallScene.prototype.updateGold = function (_value) {
        var that = this;
        var isInitMoney = (PlayerManager.Instance.Info.userMoney == 0);
        PlayerManager.Instance.Info.userMoney = _value;
        if (that.txtMoney) {
            that.txtMoney.changeText(MathUtils.bytesToSize(PlayerManager.Instance.Info.userMoney));
        }
        if (that.imgMoney && !isInitMoney) {
            that.imgMoney.scale(1.2, 1.2);
            Laya.Tween.to(that.imgMoney, { scaleX: 1, scaleY: 1 }, 300, null, Laya.Handler.create(that, function () {
                Laya.Tween.clearTween(that.imgMoney);
            }, null, true));
        }
        //刷新快捷买怪物按钮
        that.refreshShortcutCreateBtn(HallManager.Instance.hallData.buyMonsterType);
        //本地保存
        userData.setGoldSave(PlayerManager.Instance.Info.userMoney);
    };
    /** 更新钻石数 */
    HallScene.prototype.updateDiamond = function (_value) {
        var that = this;
        PlayerManager.Instance.Info.userDiamond = _value;
        if (that.txtDiamond) {
            that.txtDiamond.changeText(MathUtils.bytesToSize(PlayerManager.Instance.Info.userDiamond).toString());
        }
        //本地保存
        userData.setDiamond(PlayerManager.Instance.Info.userDiamond);
    };
    //设置兵营高亮状态
    HallScene.prototype.setCarparkLight = function (_monsterSp) {
        if (_monsterSp === void 0) { _monsterSp = null; }
        var that = this;
        if (that.carparkList) {
            var monsterId = 0;
            if (_monsterSp) {
                monsterId = _monsterSp.monsterId;
            }
            for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
                var element = that.carparkList.getCell(index);
                if (element) {
                    var carParkSp = element.getChildByName("car");
                    if (carParkSp && carParkSp != _monsterSp) {
                        if (carParkSp.isSameLevel(monsterId)) {
                            carParkSp.setLight(true);
                        }
                        else if (carParkSp.isLight()) {
                            carParkSp.setLight(false);
                        }
                    }
                }
            }
        }
    };
    //设置关卡
    HallScene.prototype.setPassStage = function (_value) {
        var that = this;
        HallManager.Instance.hallData.passStage = Math.min(_value, BattleManager.Instance.maxBarrier);
        if (HallManager.Instance.hallData.passStage > BattleManager.Instance.maxBarrier) {
            HallManager.Instance.hallData.passStage = 1;
        }
        var stageCfgArray = BattleManager.Instance.getBarrierSectionConfig(HallManager.Instance.hallData.passStage);
        if (stageCfgArray) {
            HallManager.Instance.hallData.maxSection = stageCfgArray.length;
        }
        if (that.txtLevel) {
            that.txtLevel.changeText("" + HallManager.Instance.hallData.passStage);
        }
        if (NoviceManager.cache.checkLevel) {
            NoviceManager.cache.checkLevel(HallManager.Instance.hallData.passStage);
            delete NoviceManager.cache.checkLevel;
        }
        BattleManager.Instance.checkLandIsOpen(that.carparkList, BattleManager.Instance.getBarrierSeatNum(HallManager.Instance.hallData.passStage));
        userData.updatePassStage(HallManager.Instance.hallData.passStage);
    };
    //设置章节
    HallScene.prototype.setPassSection = function (_value) {
        var that = this;
        HallManager.Instance.hallData.passSection = _value;
        if (HallManager.Instance.hallData.passSection > HallManager.Instance.hallData.maxSection) {
            HallManager.Instance.hallData.passSection = HallManager.Instance.hallData.maxSection;
        }
        if (that.txtSection) {
            that.txtSection.changeText(HallManager.Instance.hallData.passSection + "/" + HallManager.Instance.hallData.maxSection);
        }
        if (that.progressBarExp) {
            that.progressBarExp.value = (1.0 * HallManager.Instance.hallData.passSection / HallManager.Instance.hallData.maxSection);
        }
    };
    //设置森林之王等级
    HallScene.prototype.setKingLevel = function (_value) {
        var that = this;
        HallManager.Instance.hallData.userKingLevel = _value;
        if (that.txtKingLevel) {
            that.txtKingLevel.changeText("" + HallManager.Instance.hallData.userKingLevel);
        }
        userData.updateKingLevel(HallManager.Instance.hallData.userKingLevel);
    };
    /** 赠送英雄中 */
    HallScene.prototype.handlerGiveMonster = function () {
        var self = this;
        if (HallManager.Instance.isGuide()) { //新手关闭赠送
            return;
        }
        HallManager.Instance.hallData.giveMonsterAllTime = 3 * 60 * 60;
        self.imgTrain.visible = HallManager.Instance.hallData.giveMonsterAllTime > 0;
        if (!self.gameTimeImg.visible)
            EffectUtils.showTrainingTimeEffect(self);
        self.gameTimeImg.visible = self.gameTimebg.visible = self.txtGameTime.visible = true;
        TimerManager.Instance.doFrame(1, 0, self.doGiveMonster, self);
    };
    /** 执行赠送英雄 */
    HallScene.prototype.doGiveMonster = function () {
        var self = this;
        if (HallManager.Instance.hallData.giveMonsterAllTime <= 0) {
            TimerManager.Instance.remove(self.doGiveMonster, self);
            self._giveCarTime = 0;
            self._giveTempTime = 0;
            self.imgTrain.visible = false;
            self.gameTimeImg.visible = self.gameTimebg.visible = self.txtGameTime.visible = false;
        }
        if (HallManager.Instance.hallData.giveMonsterAllTime > 0) {
            HallManager.Instance.hallData.giveMonsterAllTime--;
            var tempTime = Math.floor(HallManager.Instance.hallData.giveMonsterAllTime / 60);
            if (self._giveTempTime != tempTime) {
                self._giveTempTime = tempTime;
                var minute = Math.floor(self._giveTempTime / 60);
                var sec = self._giveTempTime % 60;
                if (self.txtGameTime) {
                    self.txtGameTime.text = (minute < 10 ? ("0" + minute) : minute) + ":" + (sec < 10 ? ("0" + sec) : sec);
                }
            }
        }
        //是否训练中
        if (HallManager.Instance.hallData.giveMonsterAllTime > 0 && self._giveCarTime > 60 * HallManager.Instance.hallData.dropTime) {
            self._giveCarTime = 0;
            // 1级：掉1级的怪物
            // 2-7级：掉落1、2级的怪物
            // 8级之后：随机掉落，最小值：当前金币最高解锁的等级-7，最大值=当前最高金币可购买怪物-4。
            var boxDropCfg = GlobleData.getData(GlobleData.TrainDropVO, userData.getCarLevel());
            var randCarId = 101;
            var curBuyIndex = 1;
            var dropId = 100;
            if (!boxDropCfg) { //先不走表的规则去掉落
                var dropCarArray = [boxDropCfg.dropHeroLevel3, boxDropCfg.dropHeroLevel2, boxDropCfg.dropHeroLevel1];
                var randIndex = Math.floor(Math.random() * 10) % 3;
                dropId = userData.isEvolution() ? 1000 : 100;
                randCarId = dropId + dropCarArray[randIndex];
            }
            else { // 默认掉落
                if (HallManager.Instance.hallData.passStage < 1) {
                    randCarId = 101;
                }
                else if (HallManager.Instance.hallData.passStage < 8) {
                    dropId = userData.isEvolution() ? 1000 : 100;
                    randCarId = dropId + (Math.random() < 0.5 ? 1 : 2);
                }
                else {
                    var monsterLevel = userData.getCarLevel();
                    var monsterInfo = BattleManager.Instance.getUnLockMonster(HallManager.Instance.hallData.buyMonsterType, monsterLevel);
                    randCarId = RandomUtils.rangeInt(monsterInfo.id - 6, monsterInfo.id - 4);
                }
                if (randCarId <= 100)
                    randCarId = 101;
                var carParkSp = BattleManager.Instance.createPet(randCarId, true);
                if (carParkSp) {
                    carParkSp.dropBoxEffect(self.mainView);
                }
            }
        }
        self._giveCarTime++;
    };
    /** 检查守护是否可以升级 */
    HallScene.prototype.checkKingIsUpdate = function () {
        var self = this;
        self.kingUpdateImg.visible = HallManager.Instance.getKingIsUpgrade();
    };
    //显示通关结果(_isManual:手动调用)
    HallScene.prototype.showPassStageResult = function (_stage, _callback, _isManual) {
        if (_callback === void 0) { _callback = null; }
        if (_isManual === void 0) { _isManual = false; }
        var that = this;
        if (M.novice.isRunning)
            return;
        if (_stage > 0) { //通关陈功
            ResultView.Create(function (_nodeView) {
                if (_nodeView) {
                    if (_stage > 0) {
                        if (_isManual == false) {
                            HallManager.Instance.hallData.stagePrizeList.push(_stage);
                            //只取最近5条
                            if (HallManager.Instance.hallData.stagePrizeList.length > 5) {
                                HallManager.Instance.hallData.stagePrizeList.shift();
                            }
                            if (that.btnStagePrize) {
                                that.showStagePrize(HallManager.Instance.hallData.stagePrizeList.length > 0);
                            }
                        }
                        _nodeView.showPrizeUI(HallManager.Instance.hallData.stagePrizeList, function (lastStage) {
                            if (that.btnStagePrize) {
                                that.showStagePrize(HallManager.Instance.hallData.stagePrizeList.length > 0);
                            }
                            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.09"));
                            Laya.timer.once(3000, that, function () {
                                if (userData) {
                                    //显示获得的奖品
                                    var stagePrizeCfg = GlobleData.getData(GlobleData.BarrierRewardVO, lastStage);
                                    if (stagePrizeCfg) {
                                        //发送奖励
                                        var bossM = MathUtils.parseStringNum(stagePrizeCfg.bossM);
                                        var gold = BattleManager.Instance.getBarrierRewardToGold(lastStage, MathUtils.parseStringNum(stagePrizeCfg.gold));
                                        var gem = MathUtils.parseStringNum(stagePrizeCfg.gem);
                                        HttpManager.Instance.requestStagePrizeDiamond(lastStage, gem, bossM, function (_res) {
                                            var stage = _res;
                                            if (stage > 0) {
                                                _nodeView.removeSelf();
                                                ClearanceRewardView.Create(that, null, function () {
                                                    if (that.btnStagePrize.visible) {
                                                        that.showPassStageResult(HallManager.Instance.hallData.passStage, null, true);
                                                    }
                                                }, stage);
                                                HttpManager.Instance.requestDiamondData();
                                                HttpManager.Instance.requestEssenceData();
                                            }
                                        });
                                        if (gold > 0) { //金币礼包
                                            that.updateGold(PlayerManager.Instance.Info.userMoney + gold);
                                        }
                                    }
                                }
                            });
                        });
                    }
                }
            }, _callback, _stage);
        }
        else { //通关失败
            ClearanceFail.Create(that, null, _callback);
        }
    };
    //任务界面
    HallScene.prototype.showTaskView = function () {
        var that = this;
        SDKManager.Instance.closeBannerAd(true);
        TaskView.Create(null, function () {
            //返回
            SDKManager.Instance.showBannerAd(true, that.mainView.y);
        }, true);
    };
    //每日签到界面
    HallScene.prototype.showDaySignView = function () {
        var _this = this;
        var that = this;
        DaySignView.Create(Laya.Handler.create(this, function (view) {
            if (view) {
                view.on(DaySignView.REMOVE_FROM_STAGE, _this, function () {
                    resolveDailyPrizeVisible();
                });
            }
            resolveDailyPrizeVisible();
            function resolveDailyPrizeVisible() {
                if (DaySignView.signData) {
                    that.btnDailyPrize.visible = DaySignView.signData.sign.status === 0;
                }
                else {
                    that.btnDailyPrize.visible = true;
                }
                // if(that.btnDailyPrize.visible){
                //     if (DaySignView.signData.sign.status) {
                //         that.showDailySignRedPoint();
                //     }
                // }
            }
        }));
    };
    //幸运抽奖界面
    HallScene.prototype.showLuckPrizeView = function () {
        // CommonFun.closeBannerAd(true);
        LuckPrizeView.Create(null, function () {
            //返回
            // CommonFun.showBannerAd(true);
        });
    };
    //跳转小程序
    HallScene.prototype.onMiniProgram = function () {
        platform.navigateToMiniProgram({
            // appId: 'wx10e1554b604d7568',
            appId: userData.miniCode(),
            path: userData.miniPagePath(),
            // extraData: {
            //     box: '1'
            // },
            // envVersion: 'develop',
            success: function (res) {
                console.log("mini跳转成功", res);
            }
        });
        //小程序跳转次数统计
        HttpManager.Instance.requestShareAdFinish("minipro_" + userData.miniCode());
    };
    //怪物储存箱
    HallScene.prototype.onCarStore = function () {
        var that = this;
        var carId = that.getCarStore();
        if (carId > 0) {
            var carParkSp = BattleManager.Instance.createPet(carId);
            if (carParkSp) {
                that.getCarStore(true);
                that.carStoreBtnEnabled();
            }
        }
    };
    HallScene.prototype.carStoreBtnEnabled = function () {
        var that = this;
        if (that.btnCarStore) {
            that.btnCarStore.visible = that.getCarStore() > 0;
        }
    };
    //保存怪物到本地
    HallScene.prototype.saveCarStore = function (_carId) {
        if (_carId < 1)
            return;
        var that = this;
        var carArray = [];
        var storage = window.localStorage;
        var dataJson = storage.getItem(HallManager.Instance.hallData.monsterStoreKey);
        if (dataJson) {
            var jsonObj = JSON.parse(dataJson);
            if (jsonObj) {
                carArray = jsonObj;
            }
        }
        if (carArray) {
            carArray.push(_carId);
            var dataJson_1 = JSON.stringify(carArray);
            if (dataJson_1) {
                console.log("@FREEMAN: 本地数据保存追踪 - car_store_key");
                storage.setItem(HallManager.Instance.hallData.monsterStoreKey, dataJson_1);
            }
        }
        that.carStoreBtnEnabled();
    };
    //本地取出怪物
    HallScene.prototype.getCarStore = function (_isRemove) {
        if (_isRemove === void 0) { _isRemove = false; }
        var that = this;
        var storage = window.localStorage;
        var dataJson = storage.getItem(HallManager.Instance.hallData.monsterStoreKey);
        if (dataJson) {
            var jsonObj = JSON.parse(dataJson);
            if (jsonObj) {
                var carId = jsonObj.shift();
                //保存移除
                if (_isRemove) {
                    var dataJson_2 = JSON.stringify(jsonObj);
                    if (dataJson_2) {
                        console.log("@FREEMAN: 本地数据保存追踪 - car_store_key 2");
                        storage.setItem(HallManager.Instance.hallData.monsterStoreKey, dataJson_2);
                    }
                }
                if (carId) {
                    return carId;
                }
            }
        }
        return 0;
    };
    //显示加速效果
    HallScene.prototype.playAcceEffectView = function (_acceTime, _isEffect) {
        if (_acceTime === void 0) { _acceTime = 90; }
        if (_isEffect === void 0) { _isEffect = true; }
        var that = this;
        if (HallManager.Instance.hallData.userAcceTime > 1) {
            HallManager.Instance.hallData.userAcceTime += _acceTime;
            return;
        }
        HallManager.Instance.hallData.userAcceTime += _acceTime;
        if (that.acceEffectView) {
            if (_isEffect) {
                that.acceEffectView.visible = true;
                if (that.ani2) {
                    that.ani2.play(0, false);
                }
                Laya.timer.frameOnce(90, that, function () {
                    that.acceEffectView.visible = false;
                });
            }
            //加速开始
            that.setCarAcce(2);
            that.refreshAcceTime();
            Laya.timer.loop(1000, that, that.refreshAcceTime);
            Laya.SoundManager.playSound("musics/accecar.mp3");
        }
    };
    HallScene.prototype.refreshAcceTime = function () {
        var that = this;
        //显示倒计时
        if (that.btnAcce) {
            var imgAcce = that.btnAcce.getChildByName("imgAcce");
            if (imgAcce) {
                imgAcce.visible = true;
                var txtAcceTime = imgAcce.getChildByName("txtAcceTime");
                if (txtAcceTime) {
                    var minute = Math.floor(HallManager.Instance.hallData.userAcceTime / 60);
                    var sec = HallManager.Instance.hallData.userAcceTime % 60;
                    txtAcceTime.text = (minute < 10 ? ("0" + minute) : minute) + ":" + (sec < 10 ? ("0" + sec) : sec);
                }
            }
            that.btnAcce.mouseEnabled = false;
        }
        if (HallManager.Instance.hallData.userAcceTime > 0) {
            HallManager.Instance.hallData.userAcceTime--;
            if (userData) {
                userData.saveAcceLeftTime(HallManager.Instance.hallData.userAcceTime);
            }
        }
        else {
            that.setCarAcce(1);
            Laya.timer.clear(that, that.refreshAcceTime);
            if (that.btnAcce) {
                var imgAcce = that.btnAcce.getChildByName("imgAcce");
                if (imgAcce) {
                    imgAcce.visible = false;
                }
                that.btnAcce.mouseEnabled = true;
            }
            return;
        }
        //金币雨
        if (HallManager.Instance.hallData.userAcceTime > 0) {
            EffectUtils.playCoinRainEffect("images/core/coin_40x40.png");
        }
    };
    HallScene.prototype.setCarAcce = function (_acceValue) {
        var self = this;
        HallManager.Instance.hallData.userAcceValue = _acceValue;
        //精灵加速
        BattleManager.Instance.doPetAccelerate(self.carparkList);
        //怪物加速
        BattleManager.Instance.doMonsterAccelerate();
        //更新每秒收益
        HallManager.Instance.updateIncomePerSec(HallManager.Instance.getCalculateIncomePerSec(self.carparkList));
    };
    HallScene.prototype.playBossEnterEffect = function () {
        var self = this;
        // 加载动画图集,加载成功后执行回调方法
        var aniPath = "bossEnter";
        var aniInterval = 120;
        var frameCount = 9;
        if (self._showBossIcon == null) {
            self._showBossIcon = Laya.Pool.getItemByClass(userData.ANIMATION_POOL_NAME, Laya.Animation);
            LayerManager.getInstance().screenEffectLayer.addChild(self._showBossIcon);
            var aniKey_1 = "dx_bosslx_";
            var aniAtlas = PathConfig.EffectUrl.replace("{0}", aniPath);
            self._showBossIcon.loadAtlas(aniAtlas, Handler.create(self, function () {
                //创建动画模板dizziness
                Laya.Animation.createFrames(AnimationUtils.aniUrls(aniKey_1, frameCount, aniPath + "/"), aniPath);
                //设置坐标
                var aniGraphics = self._showBossIcon.frames[1];
                if (aniGraphics) {
                    var aniBounds = aniGraphics.getBounds();
                    self._showBossIcon.pos((LayerManager.stageDesignWidth - aniBounds.width) / 2, LayerManager.stageDesignWidth * 0.35 - aniBounds.height * 0.5);
                }
                self._showBossIcon.interval = aniInterval;
                self._showBossIcon.play(0, false, aniPath);
            }));
        }
        else {
            self._showBossIcon.visible = true;
            self._showBossIcon.play(0, false, aniPath);
        }
        self._showBossIcon.timerOnce(aniInterval * frameCount, self, function () {
            self._showBossIcon.stop();
            self._showBossIcon.visible = false;
        });
    };
    /** king升级特效 */
    HallScene.prototype.playKingUpdateEffect = function () {
        var that = this;
        if (that.spMountGuard == null)
            return;
        var monsterAni = Laya.Pool.getItemByClass(userData.ANIMATION_POOL_NAME, Laya.Animation);
        that.spMountGuard.addChild(monsterAni);
        // 加载动画图集,加载成功后执行回调方法
        var aniPath = "kingUpdate";
        var aniKey = "sj_";
        var aniAtlas = PathConfig.EffectUrl.replace("{0}", aniPath);
        var aniInterval = 120;
        var frameCount = 5;
        monsterAni.loadAtlas(aniAtlas, Handler.create(that, function () {
            //创建动画模板dizziness
            Laya.Animation.createFrames(AnimationUtils.aniUrls(aniKey, frameCount, aniPath + "/"), aniPath);
            //设置坐标
            var aniGraphics = monsterAni.frames[1];
            if (aniGraphics) {
                var aniBounds = aniGraphics.getBounds();
                monsterAni.pos(-aniBounds.width * 0.4, -aniBounds.height * 0.6);
            }
            monsterAni.interval = aniInterval;
            monsterAni.play(0, false, aniPath);
        }));
        monsterAni.timerOnce(aniInterval * frameCount, that, function () {
            monsterAni.removeSelf();
            Laya.Pool.recover(userData.ANIMATION_POOL_NAME, monsterAni);
        });
    };
    /** 更新幸运抽奖状态 */
    HallScene.prototype.onUpdatePrizeState = function ($data) {
        var self = this;
        if ($data.id == 7) {
            if ($data.num > 0) {
                self.updateGold(PlayerManager.Instance.Info.userMoney + $data.num);
            }
        }
        else if ($data.id == 3) {
            if ($data.num > 0) {
                self.playAcceEffectView($data.num);
            }
        }
        else if ($data.id == 4) {
            var carId = $data.carId;
            if (carId) {
                var carParkSp = BattleManager.Instance.createPet(carId, true);
                if (carParkSp == null) {
                    //保存失败则防止储存箱
                    self.saveCarStore(carId);
                }
            }
        }
    };
    /** 更新加速按钮状态 */
    HallScene.prototype.onUpdateAccelerateBtnState = function () {
        var self = this;
        if (self.btnMiniProgram && userData.miniImageUrl().length > 0) {
            Laya.loader.load(userData.miniImageUrl(), Laya.Handler.create(self, function (_imgTexture) {
                if (_imgTexture && _imgTexture.url) {
                    self.btnMiniProgram.skin = _imgTexture.url;
                }
            }));
        }
    };
    /** 更新英雄商店红点 */
    HallScene.prototype.onUpdatePetShopRedPoint = function ($data) {
        var self = this;
        if ($data == "show") {
            self.showCarportRedPoint();
        }
        else {
            self.showCarportRedPoint(false);
        }
    };
    /** 更新转盘红点 */
    HallScene.prototype.onUpdatePrizeRedPoint = function ($data) {
        var self = this;
        if ($data == "show") {
            self.showLuckPrizeRedPoint();
        }
        else {
            self.showLuckPrizeRedPoint(false);
        }
    };
    /** 更新任务红点 */
    HallScene.prototype.onUpdateTaskRedPoint = function ($data) {
        var self = this;
        if ($data == "show") {
            self.showTaskRedPoint();
        }
        else {
            self.showTaskRedPoint(false);
        }
    };
    /** 更新签到红点 */
    HallScene.prototype.onUpdateSignRenPoint = function ($data) {
        var self = this;
        if ($data == "show") {
            self.showDailySignRedPoint();
        }
        else {
            self.showDailySignRedPoint(false);
        }
    };
    /** 更新强化红点 */
    HallScene.prototype.onUpdateStrengthenRedPoint = function ($data) {
        var self = this;
        if ($data == "show") {
            self.showStrengthenRedPoint();
        }
        else {
            self.showStrengthenRedPoint(false);
        }
    };
    /** 刷新金币 */
    HallScene.prototype.onRefreshGold = function () {
        var self = this;
        self.updateGold(userData.gold);
    };
    /** 刷新钻石 */
    HallScene.prototype.onRefreshDiamond = function ($data) {
        var self = this;
        if ($data && $data.diamond) {
            self.updateDiamond($data.diamond);
        }
        else {
            self.updateDiamond(userData.diamond);
        }
    };
    /** 游戏加速 */
    HallScene.prototype.onGameAccelerate = function () {
        var self = this;
        if (GlobalConfig.DEBUG) {
            self.playAcceEffectView();
        }
        else {
            //显示广告
            var adStage = userData.toShareAd(function (_res) {
                self.playAcceEffectView();
            }, 10, false, true);
            //无分享广告则显示钻石购买
            if (adStage > 0) {
                self.onDiamondBuyAcce();
            }
        }
    };
    /** 战斗通过 */
    HallScene.prototype.onBattleClearanc = function () {
        var self = this;
        if (HallManager.Instance.hallData.passSection >= HallManager.Instance.hallData.maxSection) {
            self.showPassStageResult(HallManager.Instance.hallData.passStage);
            //上传腾讯云
            userData.setUserCloudStorage();
        }
        else if (HallManager.Instance.hallData.passSection >= (HallManager.Instance.hallData.maxSection - 1)) {
            //是否进入boss关
            self.timerOnce(600, self, self.playBossEnterEffect);
        }
        self.timerOnce(2000, self, function () {
            HallManager.Instance.hallData.gameStatus = 1;
            //过关
            var curSection = HallManager.Instance.hallData.passSection;
            if (curSection < HallManager.Instance.hallData.maxSection) {
                curSection++;
            }
            else {
                curSection = 1;
                self.setPassStage(HallManager.Instance.hallData.passStage + 1);
            }
            self.setPassSection(curSection);
            //创建怪物
            self.createMonster(HallManager.Instance.hallData.passStage, HallManager.Instance.hallData.passSection);
        });
    };
    /** 战斗没有通过 */
    HallScene.prototype.onBattleNoClearanc = function () {
        var self = this;
        self.showPassStageResult(-1, function () {
            HallManager.Instance.hallData.gameStatus = 1;
            //未通关，重新开始
            self.setPassSection(1);
            //创建怪物
            self.createMonster(HallManager.Instance.hallData.passStage, HallManager.Instance.hallData.passSection);
            //定时赠送精灵
            if (!M.novice.isRunning) {
                self.handlerGiveMonster();
            }
        });
    };
    return HallScene;
}(ui.hall.HallSceneUI));
//# sourceMappingURL=HallScene.js.map