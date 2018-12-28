/*
* 大厅主场景
*/
class HallScene extends ui.hall.HallSceneUI {
    constructor() {
        super();
        this.parkMonsterModelSp = null;
        this.curMonsterSprite = null;
        this._giveCarTime = 0; //定时赠送怪物
        this._giveTempTime = 0; //定时赠送怪物
        /** 更新在线奖励时间 */
        this._diamondTime = 0;
        var self = this;
        self.frameOnce(5, self, () => {
            self.addEvents();
            self.init();
        });
    }
    //新建并添加到节点
    static Create(_parentNode) {
        let resList = [
            { url: "res/atlas/images/component.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/images/hall.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/images/core.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/images/skill.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/images/fontImg.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/images/novice.atlas", type: Laya.Loader.ATLAS },
            { url: "sheets/sheet.json", type: Laya.Loader.JSON }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            EffectUtils.stopWaitEffect();
            if (_parentNode) {
                let viewTag = "HallScene";
                let nodeViewOld = _parentNode.getChildByName(viewTag);
                if (nodeViewOld) {
                    return;
                }
                let nodeView = new HallScene();
                nodeView.name = viewTag;
                _parentNode.addChild(nodeView);
            }
        }));
        //加载网络声音
        let resSoundList = [
            { url: "musics/unlock.mp3", type: Laya.Loader.SOUND },
            { url: "musics/makecar.mp3", type: Laya.Loader.SOUND },
            { url: "musics/cartorunway.mp3", type: Laya.Loader.SOUND },
            { url: "musics/accecar.mp3", type: Laya.Loader.SOUND },
            { url: "musics/drawcar.mp3", type: Laya.Loader.SOUND },
            { url: "musics/atk.mp3", type: Laya.Loader.SOUND },
            { url: "musics/kingUpdate.mp3", type: Laya.Loader.SOUND },
            { url: "musics/evolutions.mp3", type: Laya.Loader.SOUND }
        ];
        Laya.loader.load(resSoundList, Laya.Handler.create(null, () => {
            console.log("load music finish");
        }));
    }
    //初始化
    init() {
        let self = this;
        HallManager.Instance.hall = self;
        self.btnMiniProgram.visible = false;
        if (self.btnMiniProgram && userData.miniImageUrl().length > 0) {
            Laya.loader.load(userData.miniImageUrl(), Laya.Handler.create(self, (_imgTexture) => {
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
        M.novice.saveFunc = groupId => {
            userData.saveNovice(groupId);
        };
        M.novice.start();
        BuffController.getInstance().init(self.viewBuffContainer);
        SkyDropController.getInstance().init(self.viewSkyDropContainer);
        Laya.timer.once(1e3, this, () => {
            if (Laya.Browser.window.wxUserInfo) {
                PlayerManager.Instance.Info.wxUserInfo = Laya.Browser.window.wxUserInfo;
            }
        });
        Laya.timer.once(2e3, this, () => {
            self.showDaySignView();
        });
        if (!NoviceManager.isComplete) {
            M.novice.on(NoviceEvent.ACTIVATE_TARGET, self, (eventParam) => {
                if (eventParam === NoviceTarget.QUICK_PURCHASE_MONSTER) {
                    M.novice.activateClickTarget(self.btnShopShortcut, eventParam, self.btnShopShortcut.parent);
                }
                else if (eventParam === NoviceTarget.FOREST_KING) {
                    M.novice.ui.btnReturnNovice2.visible = false;
                    M.novice.activateClickTarget(self.btnEvolution, eventParam, self.btnEvolution.parent, [{ target: self.spMountGuard, parent: self.spMountGuard.parent }]);
                }
                else if (eventParam === NoviceTarget.MONSTER_CELL_2) {
                    NoviceManager.cache.synthesiseComplete = () => {
                        M.novice.nextStep();
                    };
                }
            });
            M.novice.on(NoviceEvent.WAITING, self, ({ type, value }) => {
                if (type === NoviceActivateType.LEVEL) {
                    NoviceManager.cache.checkLevel = (level) => {
                        if (level >= value) {
                            M.novice.nextGroup();
                            delete NoviceManager.cache.synthesiseComplete;
                        }
                    };
                }
                else if (type === NoviceActivateType.SYNTHESIS_LEVEL) {
                    NoviceManager.cache.checkPetSynthesisLevel = (synthesisLevel) => {
                        if (synthesisLevel >= value) {
                            M.novice.nextGroup();
                            delete NoviceManager.cache.checkPetSynthesisLevel;
                        }
                    };
                }
            });
        }
        self.navToMiniAni.play(0, true);
        /** 初始化用户数据 */
        self.initUserData();
        self.initCarUI();
        self.initCarparkList();
        //投诉建议
        if (self.btnFeedback) {
            const rect = LayerManager.getRealStageRect(self.btnFeedback);
            platform.createFeedbackButton({
                x: rect.x, y: rect.y,
                width: rect.width, height: rect.height
            });
        }
        //启动游戏出怪
        self.timerOnce(2000, self, () => {
            HallManager.Instance.hallData.gameStatus = 1;
            self.createMonster(HallManager.Instance.hallData.passStage, HallManager.Instance.hallData.passSection);
        });
        //守卫
        if (self.spMountGuard) {
            let bossId = userData.isEvolution() ? 100003 : 100002;
            self.spMountGuard.setKind(bossId);
        }
        //训练提示
        self.imgTrain.visible = false;
        self.gameTimeImg.visible = self.gameTimebg.visible = self.txtGameTime.visible = false;
        //检查守卫是否可以升级
        self.checkKingIsUpdate();
        StrengthenManager.Instance.checkRedPoint();
        self.showStagePrize(true);
        SDKManager.Instance.createBanner(false);
    }
    /** 初始化用户数据 */
    initUserData() {
        let self = this;
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
            self.frameOnce(50, self, () => {
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
                    let acceLeftTime = userData.getAcceLeftTime();
                    if (acceLeftTime > 0) {
                        let imgAcce = self.btnAcce.getChildByName("imgAcce");
                        if (imgAcce.visible == false) {
                            self.playAcceEffectView(acceLeftTime, false);
                        }
                    }
                }
                //先到后台拉取未领取的奖励
                HttpManager.Instance.requestStagePrizeData((_prizeList) => {
                    if (_prizeList == null || _prizeList.length < 1)
                        return;
                    let prizeList = [];
                    let totalCount = _prizeList.length;
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
                HallManager.Instance.showCarportRedPoint();
            }
            //任务红点
            if (userData.isShowTaskRedPoint()) {
                self.showTaskRedPoint();
            }
            //转盘红点
            if (userData.isShowLuckPrizeRedPoint()) {
                self.showLuckPrizeRedPoint();
            }
            //关注红点
            if (userData.isShowFollowRedPoint()) {
                self.showFollowRewardRedPoint();
            }
            //好友互助红点
            if (userData.isShowFriendConcurRedPoint()) {
                self.showFriendConcurRedPoint();
            }
            //每日父类红点
            if (userData.isShowEveryDayRewardRedPoint()) {
                self.showEveryDayRewardRedPoint();
            }
            self.isShowWelfareBtn();
            self.menuRedPointIsShow();
            self.updateDiamondTime(HallManager.Instance.hallData.offlineTotalTime);
        }
    }
    addEvents() {
        let self = this;
        self.btnPower.on(Laya.Event.CLICK, self, self.onPowerAcce);
        self.btnShop.on(Laya.Event.CLICK, self, self.onShowCarport);
        self.btnCarStore.on(Laya.Event.CLICK, self, self.onCarStore);
        self.btnEvolution.on(Laya.Event.CLICK, self, self.onEvolution);
        self.btnAcce.on(Laya.Event.CLICK, self, self.onGameAccelerate);
        self.btnStrengthen.on(Laya.Event.CLICK, self, self.onStrengthen);
        self.btnStagePrize.on(Laya.Event.CLICK, self, self.onStagePrize);
        self.btnMiniProgram.on(Laya.Event.CLICK, self, self.onMiniProgram);
        self.btnLuckPrize.on(Laya.Event.CLICK, self, self.showLuckPrizeView);
        self.btn_fly.on(Laya.Event.CLICK, self, self.onClickMiniProgram);
        self.btn_block.on(Laya.Event.CLICK, self, self.onClickMiniProgram);
        self.btn_eliminate.on(Laya.Event.CLICK, self, self.onClickMiniProgram);
        self.btn_arrow.on(Laya.Event.CLICK, self, self.onClickMenuHandler);
        self.btn_concur.on(Laya.Event.CLICK, self, self.onClickConcur); //好友互助 
        self.btn_ranking.on(Laya.Event.CLICK, self, self.onRanking); //排行榜
        self.btn_sign.on(Laya.Event.CLICK, self, self.showDaySignView); //签到
        self.btn_follow.on(Laya.Event.CLICK, self, self.onClickFollow); //关注
        self.btn_online.on(Laya.Event.CLICK, self, self.onGetOffLineReward); //在线奖励
        self.btn_welfare.on(Laya.Event.CLICK, self, self.onShowWelfareView); //福利界面
        this.btnMore.on(Laya.Event.CLICK, this, () => {
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
        EventsManager.Instance.on(EventsType.FOLLOW_RED_POINT, self, self.onFollowRewardRedPoint); //关注红点事件
        EventsManager.Instance.on(EventsType.FRIEND_CONCUR_RED_POINT, self, self.onFriendConcurRedPoint); //好友互助红点事件
        EventsManager.Instance.on(EventsType.EVERY_DAY_INTO_REWARD, self, self.onEveryDayRewardRedPoint); //福利红点事件
        EventsManager.Instance.on(EventsType.UPDATE_HALL_DATA, self, self.onUpdateHallData);
        EventsManager.Instance.on(EventsType.EVOLUTION_LEVEL_COMPLETE, self, self.onEvolutionLevelComplete); //守卫升级完毕
    }
    onClickMiniProgram(evt) {
        let self = this;
        let appId = "";
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
    }
    onUpdateHallData() {
        let self = this;
        self.updateGold(userData.gold);
        self.updateDiamond(userData.diamond);
    }
    /** 等级礼包 */
    showStagePrize(value) {
        let self = this;
        if (self._levelReward == null && value) {
            self._levelReward = Laya.Pool.getItemByClass(userData.ANIMATION_POOL_NAME, Laya.Animation);
            self.btnStagePrize.addChild(self._levelReward);
            // 加载动画图集,加载成功后执行回调方法
            let aniAtlas = "images/effect/levelReward/levelReward.atlas";
            self._levelReward.loadAtlas(aniAtlas, Handler.create(self, () => {
                self._levelReward.interval = 77;
                self._levelReward.play();
            }));
        }
        self.btnStagePrize.visible = value;
    }
    //显示超越好友视窗
    showSurpassView() {
        let that = this;
        if (userData) {
            userData.setUserCloudStorage();
        }
        let openDataContext = platform.getOpenDataContext();
        if (that.surpassView && openDataContext) {
            that.surpassView.visible = true;
            // openDataContext.postMessage({
            //   text: 'hello',
            //   year: (new Date()).getFullYear()
            // })
            // @ts-ignore
            let sharedCanvas = openDataContext.canvas;
            sharedCanvas.width = that.width;
            sharedCanvas.height = that.height;
            let rankSpName = "rank_sprite_key";
            let rankSprite = that.surpassView.getChildByName(rankSpName);
            if (rankSprite == null) {
                rankSprite = new Laya.Sprite();
                rankSprite.name = rankSpName;
                that.surpassView.addChild(rankSprite);
                rankSprite.zOrder = 1;
            }
            //添加本场景
            let rankTexture = new Laya.Texture(sharedCanvas);
            rankTexture.bitmap.alwaysChange = true; //小游戏使用，非常费，每帧刷新
            rankSprite.graphics.clear();
            rankSprite.graphics.drawTexture(rankTexture, 0, 0, sharedCanvas.width, sharedCanvas.height);
            Laya.timer.once(200, that, function () {
                rankTexture.bitmap.alwaysChange = false; //关闭每帧刷新
            });
            //通知域刷新
            platform.postMessage({
                message: "showSurpassFriend"
            });
        }
    }
    refreshShortcutCreateBtn(_buyType = 0) {
        let self = this;
        let monsterType = _buyType;
        monsterType = userData.isEvolution() ? 2 : 1;
        HallManager.Instance.hallData.buyMonsterType = monsterType;
        let monsterLevel = userData.getCarLevel();
        let monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, monsterLevel);
        let btnBuy = self.btnShopShortcut;
        if (monsterInfo && btnBuy) {
            if (HallManager.Instance.hallData.curNewMonsterId != monsterInfo.id) {
                HallManager.Instance.hallData.curNewMonsterId = monsterInfo.id;
                btnBuy.off(Laya.Event.CLICK, self, HallManager.Instance.goldBuyHero);
                btnBuy.on(Laya.Event.CLICK, self, HallManager.Instance.goldBuyHero, [monsterInfo, btnBuy]);
            }
            let curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
            let imgPrice = btnBuy.getChildByName("imgPrice");
            if (imgPrice) {
                let txtPrice = imgPrice.getChildByName("txtPrice");
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
                let txtLevel = btnBuy.getChildByName("txtLevel");
                if (txtLevel) {
                    txtLevel.text = ("英雄" + " Lv" + BattleManager.Instance.getLevel(monsterInfo.id));
                }
            }
        }
    }
    //离线收益
    onOffLineRevenue() {
        let self = this;
        if (userData) {
            let offlinePrize = userData.offlinePrize();
            //离线超过10分钟才算奖励
            if (offlinePrize > 10 * 60 && HallManager.Instance.hallData.passStage > 0 && HallManager.Instance.isGuide() == false) {
                // 当前关卡收益*(挂机时间/180)*0.1 (挂机时间最大2小时)
                let prizeValue = 0;
                let secondForHour = 60 * 60;
                let secHourMax = 2 * secondForHour;
                let stageIncome = BattleManager.Instance.getBarrierIncome(HallManager.Instance.hallData.passStage);
                if (offlinePrize > secHourMax) {
                    prizeValue = (secHourMax / 180 * stageIncome) * 0.01;
                }
                else {
                    prizeValue = (offlinePrize / 180 * stageIncome) * 0.01;
                }
                if (prizeValue > 0) {
                    if (HallManager.Instance.hallData.passStage > 1) { //离线奖励
                        OfflineRewardsView.Create(self, null, () => {
                            self.updateGold(PlayerManager.Instance.Info.userMoney + prizeValue);
                        }, prizeValue);
                    }
                    else {
                        MessageUtils.showMsgTips("获得离线奖励:" + MathUtils.bytesToSize(prizeValue));
                    }
                }
            }
        }
    }
    onFriendRanking() {
        let that = this;
        RankingView.Create(() => {
            that.showSurpassView();
        }, true);
        //锁定按钮
        AnimationUtils.lockBtnStage(that.surpassView);
    }
    //强化
    onStrengthen(_btnObj = null) {
        ViewMgr.Ins.open(ViewConst.StrengthenView);
    }
    //森林之王进化
    onEvolution(_btnObj = null) {
        let that = this;
        if (userData.isEvolution() == false && userData.getKingLevel() >= 30) {
            //先进化
            EvolutionAdvancedView.Create(that, (_nodeView) => {
                _nodeView.refreshBoxUI((_evolutionLevel, _diamond, _essence) => {
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
            ViewMgr.Ins.open(ViewConst.EvolutionView);
        }
    }
    /** 守卫升级完毕 */
    onEvolutionLevelComplete(kingLevel) {
        let self = this;
        if (kingLevel > HallManager.Instance.hallData.userKingLevel) {
            self.setKingLevel(kingLevel);
        }
        self.playKingUpdateEffect();
        Laya.SoundManager.playSound("musics/kingUpdate.mp3");
        self.checkKingIsUpdate();
    }
    //商店进化
    onEvolutionShop(_level) {
        let that = this;
        if (HallManager.Instance.hallData.giveMonsterAllTime > 0)
            HallManager.Instance.hallData.giveMonsterAllTime = 1;
        //设置进化等级
        userData.updateEvolutionLevel(_level);
        //强行重置精灵等级为1
        userData.resetMonsterLevel();
        //重置快捷购买按钮
        that.refreshShortcutCreateBtn();
        //奖励三个高级精灵
        let prizeMonsterArray = [1001, 1001, 1001];
        if (that.carparkList) {
            for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
                var element = that.carparkList.getCell(index);
                if (element) {
                    let carParkSp = element.getChildByName("car");
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
    }
    //未领取通关奖励
    onStagePrize() {
        this.showPassStageResult(HallManager.Instance.hallData.passStage, null, true);
    }
    //敌方出怪
    createMonster(_stage, _section) {
        let that = this;
        let stageSectionCfg = BattleManager.Instance.getBarrierSectionConfig(_stage, _section); // getStageSectionConfig(_stage, _section);
        if (stageSectionCfg) {
            let mBlood = MathUtils.parseStringNum(stageSectionCfg["blood"]);
            let mMoney = MathUtils.parseStringNum(stageSectionCfg["earnings"]);
            for (let i = 1; i < 5; i++) {
                let mId = stageSectionCfg["mId" + i];
                let mEnterTime = stageSectionCfg["mEnterTime" + i];
                let mNum = stageSectionCfg["mNum" + i];
                if (mId > 0) {
                    Laya.timer.once(mEnterTime * 1400, that, () => {
                        if (HallManager.Instance.hallData.gameStatus < 1 || HallManager.Instance.hallData.monsterArray.length > 10)
                            return;
                        for (let k = 0; k < mNum; k++) {
                            let monsterSp = new MonsterSprite();
                            monsterSp.setBornDelayFun(that, 1200 * k, () => {
                                that.roadView.addChild(monsterSp);
                                monsterSp.setKind(mId);
                                monsterSp.pos(that.imgBorn.x, that.imgBorn.y + that.imgBorn.height / 2);
                                monsterSp.playMoveAction();
                                monsterSp.setDropMoney(mMoney); //收集金币
                                monsterSp.setDropMoneyFun((dropMoney) => {
                                    if (dropMoney > 0) {
                                        let skyDropBuff = BuffController.getInstance().getBuffValueById(BuffSheet.COIN_OBTAIN_INCREASE);
                                        let skillBuff = userData.getSkillAdditionProbability(10);
                                        let resultCoin = dropMoney * (1 + skillBuff + skyDropBuff);
                                        let txtPos = new Laya.Point(monsterSp.x - 20, monsterSp.y - 50);
                                        EffectUtils.playImageTextEffect(that.roadView, "images/core/coin_40x40.png", "+" + MathUtils.bytesToSize(resultCoin), txtPos, monsterSp.zOrder + 100);
                                        that.updateGold(PlayerManager.Instance.Info.userMoney + resultCoin);
                                    }
                                });
                            });
                            //设置血量
                            monsterSp.updateBlood(0, mBlood);
                            //保存怪物列表
                            if (HallManager.Instance.hallData.monsterArray && monsterSp) {
                                HallManager.Instance.hallData.monsterArray.push(monsterSp);
                            }
                        }
                    });
                }
                else {
                    BattleManager.Instance.preloadingNextMonsters(HallManager.Instance.hallData.passStage, HallManager.Instance.hallData.passSection + 1);
                    break;
                }
            }
        }
    }
    /** 钻石购买加速 */
    onDiamondBuyAcce() {
        ViewMgr.Ins.open(ViewConst.DiamondBuyView, DILOG_TYPE.ACC, 60);
    }
    onShowCarport() {
        ViewMgr.Ins.open(ViewConst.ShopView);
    }
    //能量加速
    onPowerAcce() {
        let that = this;
        that.progressBarPower.value += 0.06;
        if (that.progressBarPower.value >= 1) {
            that.progressBarPower.value = 1;
            that.btnPower.disabled = true;
            that.btnPower.frameOnce(10, that, () => {
                that.playAcceEffectView(10);
                //加速次数统计
                HttpManager.Instance.requestShareAdFinish("manual_acce");
            });
            EffectUtils.playCoinEffect(that.imgPowerCar, "images/core/coin_40x40.png");
        }
        that.btnPower.timerLoop(100, that, that.powerAcceTime);
    }
    powerAcceChangeHandler(_per) {
        let that = this;
        if (that.imgPowerCar) {
            that.imgPowerCar.x = 20 + that.progressBarPower.width * (1 - _per);
        }
        if (that.imgPowerBg) {
            if (that.imgPowerBg.visible == false && _per > 0) {
                that.imgPowerBg.scaleY = 0;
                let boxAnimation = (target, onEvtFinish = null) => {
                    let timeLine = new Laya.TimeLine();
                    timeLine.addLabel("show1", 0).to(target, { scaleY: 1 }, 100);
                    if (onEvtFinish != null) {
                        timeLine.on(Laya.Event.COMPLETE, target, () => {
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
    }
    powerAcceTime() {
        let that = this;
        that.progressBarPower.value -= 1.0 / 100;
        if (that.progressBarPower.value <= 0) {
            that.progressBarPower.value = 0;
            that.btnPower.clearTimer(that, that.powerAcceTime);
            that.btnPower.disabled = false;
        }
    }
    //显示签到红点
    showDailySignRedPoint(_show = true) {
        let that = this;
        if (that.btn_sign) {
            let imgRedPoint = that.btn_sign.getChildByName("imgRedPoint");
            if (imgRedPoint) {
                imgRedPoint.visible = _show;
            }
        }
    }
    /** 显示强化红点 */
    showStrengthenRedPoint(show = true) {
        let self = this;
        self.strengthenRedPoint.visible = show;
    }
    /** 显示关注奖励红点 */
    showFollowRewardRedPoint(show = true) {
        let self = this;
        if (self.btn_follow) {
            let imgRedPoint = self.btn_follow.getChildByName("imgRedPoint");
            if (imgRedPoint) {
                imgRedPoint.visible = show;
            }
        }
    }
    //显示任务红点
    showTaskRedPoint(_show = true) {
        let that = this;
        if (that.btnTask) {
            let imgRedPoint = that.btnTask.getChildByName("imgRedPoint");
            if (imgRedPoint) {
                imgRedPoint.visible = _show;
            }
        }
    }
    //显示转盘红点
    showLuckPrizeRedPoint(_show = true) {
        let that = this;
        if (that.btnLuckPrize) {
            let imgRedPoint = that.btnLuckPrize.getChildByName("imgRedPoint");
            if (imgRedPoint) {
                imgRedPoint.visible = _show;
            }
        }
    }
    //初始化怪物/跑道
    initCarUI() {
        var that = this;
        if (that.mainView) {
            that.mainView.on(Laya.Event.MOUSE_DOWN, that, (e = null) => {
                //只支持单选
                if (that.curMonsterSprite)
                    return;
                if (that.carparkList) {
                    for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
                        var element = that.carparkList.getCell(index);
                        if (element) {
                            let carParkSp = element.getChildByName("car");
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
                                that.btnDelete.skin = "images/hall/huishou_icon_1.png";
                                return;
                            }
                        }
                    }
                }
            });
            that.mainView.on(Laya.Event.MOUSE_MOVE, that, (e = null) => {
                if (that.parkMonsterModelSp) {
                    that.parkMonsterModelSp.pos(that.mainView.mouseX, that.mainView.mouseY);
                }
            });
            that.mainView.on(Laya.Event.MOUSE_UP, that, (e = null) => {
                //移除高亮提示
                that.setCarparkLight();
                if (that.parkMonsterModelSp && that.curMonsterSprite) {
                    if (that.btnDelete && ObjectUtils.isHit(that.btnDelete) && HallManager.Instance.isGuide() == false) {
                        let obtainMoney = that.curMonsterSprite.getSellPrice();
                        that.curMonsterSprite.clearStage();
                        let imgDest = that.btnDelete;
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
                        that.curMonsterSprite = null;
                    }
                    else {
                        //恢复拖动状态
                        that.curMonsterSprite.setStage(1);
                        //判断是否合并或交换位置
                        if (that.carparkList) {
                            for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
                                var element = that.carparkList.getCell(index);
                                if (element) {
                                    let heroItem = element.getChildByName("car");
                                    if (heroItem && ObjectUtils.isHit(heroItem) && heroItem != that.curMonsterSprite) {
                                        if (!heroItem.isBox() && !heroItem.isLock()) {
                                            let heroId = heroItem.monsterId;
                                            const currHeroLevel = BattleManager.Instance.getLevel(heroId);
                                            if (that.curMonsterSprite.isSameLevel(heroId)) {
                                                //合并
                                                if (heroItem.isMaxLevel()) {
                                                    MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.06"));
                                                }
                                                else if (currHeroLevel >= EvolutionManager.Instance.getHeroLevel()) { //提示守卫是否可以升级
                                                    if (currHeroLevel > 10 || userData.isEvolution()) {
                                                        LevelHeroView.Create(this, (kingLevel, money) => {
                                                            //英雄升级
                                                            this.handlerHeroLevel(heroItem, heroId, index, currHeroLevel);
                                                            if (kingLevel > HallManager.Instance.hallData.userKingLevel) {
                                                                that.setKingLevel(kingLevel);
                                                            }
                                                            if (money >= 0) { //刷新钻石
                                                                that.updateDiamond(money);
                                                            }
                                                            that.playKingUpdateEffect();
                                                            Laya.SoundManager.playSound("musics/kingUpdate.mp3");
                                                            that.checkKingIsUpdate();
                                                        }, () => {
                                                            that.curMonsterSprite = null;
                                                        });
                                                    }
                                                    else {
                                                        MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.02"));
                                                    }
                                                }
                                                else { //英雄升级
                                                    this.handlerHeroLevel(heroItem, heroId, index, currHeroLevel);
                                                }
                                            }
                                            else if (!heroItem.isRunning() && HallManager.Instance.isGuide() == false) {
                                                //交换
                                                let isEmpty = heroItem.isEmpty();
                                                heroItem.setKind(that.curMonsterSprite.monsterId);
                                                heroItem.setStage(that.curMonsterSprite.monsterStage);
                                                if (isEmpty) {
                                                    that.curMonsterSprite.clearStage();
                                                }
                                                else {
                                                    that.curMonsterSprite.setKind(heroId);
                                                }
                                                //本地保存
                                                userData.setCarparkSave(heroItem, that.curMonsterSprite);
                                                Laya.SoundManager.playSound("musics/drawcar.mp3");
                                                that.curMonsterSprite = null;
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
                    that.btnDelete.skin = "images/hall/huishou_icon_0.png";
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
    }
    /** 英雄升级 */
    handlerHeroLevel(heroItem, heroId, index, currHeroLevel) {
        let self = this;
        let nextCardId = heroId + 1;
        userData.synthesisCount++;
        //随机奖励
        if (userData.synthesisCount % 48 == 0) {
            let randomNum = Math.random();
            if (randomNum < 0.4) {
                self.showRandomDiamondReward();
                heroItem.setKind(nextCardId, index);
            }
            else {
                let upLevel = nextCardId + 2;
                let kingLevel = userData.isEvolution() ? userData.getKingLevel() - 30 : userData.getKingLevel();
                let heroLv = BattleManager.Instance.getLevel(upLevel);
                if (heroLv > kingLevel) {
                    self.showRandomDiamondReward();
                    heroItem.setKind(nextCardId, index);
                }
                else {
                    HeroLevelView.Create(self, () => {
                        MessageUtils.showMsgTips("升级成功！");
                        heroItem.setKind(upLevel, index);
                    }, () => {
                        MessageUtils.showMsgTips("升级失败！");
                        heroItem.setKind(nextCardId, index);
                    }, nextCardId, upLevel);
                }
            }
        }
        else {
            heroItem.setKind(nextCardId, index);
        }
        if (NoviceManager.cache.synthesiseComplete) {
            NoviceManager.cache.synthesiseComplete();
        }
        if (NoviceManager.cache.checkPetSynthesisLevel) {
            NoviceManager.cache.checkPetSynthesisLevel(currHeroLevel + 1);
        }
        self.curMonsterSprite.clearStage();
        heroItem.playMergeEffetc(self.mainView, heroId);
        //检测等级刷新
        if (userData.updateCarLevel(BattleManager.Instance.getLevel(nextCardId))) {
            //显示红点
            if (userData.isShowCarShopRedPoint() && userData.getCarLevel() == 6) {
                HallManager.Instance.showCarportRedPoint();
            }
            Laya.SoundManager.playSound("musics/unlock.mp3");
        }
        else {
            Laya.SoundManager.playSound("musics/makecar.mp3");
        }
        //刷新快捷买怪物按钮
        self.refreshShortcutCreateBtn();
        HallManager.Instance.updateIncomePerSec(HallManager.Instance.getCalculateIncomePerSec(self.carparkList));
        //本地保存
        userData.setCarparkSave(heroItem, self.curMonsterSprite);
        //任务统计
        HttpManager.Instance.requestDailyTaskData(1);
        //检查守卫是否可以升级
        self.checkKingIsUpdate();
        self.curMonsterSprite = null;
    }
    /** 随机钻石奖励界面 */
    showRandomDiamondReward() {
        HttpManager.Instance.requestShowRandomRewardDiamond((res) => {
            ViewMgr.Ins.open(ViewConst.AdditionalRewardView, res);
        });
    }
    //初始化兵营
    initCarparkList() {
        var that = this;
        if (userData == null)
            return;
        var listDatas = userData.parkcarInfoArray;
        that.carparkList.vScrollBarSkin = "";
        that.carparkList.repeatY = HallManager.Instance.hallData.parkMonsterCount / 4;
        that.carparkList.array = listDatas;
        that.carparkList.renderHandler = new Laya.Handler(that, (cell, index) => {
            if (index > that.carparkList.array.length)
                return;
            let parkcarInfo = listDatas[index];
            let hero = cell.getChildByName("car");
            if (hero) {
                if (parkcarInfo && parkcarInfo.carId > 0) {
                    hero.setKind(parkcarInfo.carId, index);
                }
                else {
                    hero.setKind(-1, index);
                }
            }
        });
    }
    /** 更新金币数量 */
    updateGold(_value) {
        let that = this;
        var isInitMoney = (PlayerManager.Instance.Info.userMoney == 0);
        PlayerManager.Instance.Info.userMoney = _value;
        if (that.txtMoney) {
            that.txtMoney.changeText(MathUtils.bytesToSize(PlayerManager.Instance.Info.userMoney));
        }
        if (that.imgMoney && !isInitMoney) {
            that.imgMoney.scale(1.2, 1.2);
            Laya.Tween.to(that.imgMoney, { scaleX: 1, scaleY: 1 }, 300, null, Laya.Handler.create(that, () => {
                Laya.Tween.clearTween(that.imgMoney);
            }, null, true));
        }
        //刷新快捷买怪物按钮
        that.refreshShortcutCreateBtn(HallManager.Instance.hallData.buyMonsterType);
        //本地保存
        userData.setGoldSave(PlayerManager.Instance.Info.userMoney);
    }
    /** 更新钻石数 */
    updateDiamond(_value) {
        let that = this;
        PlayerManager.Instance.Info.userDiamond = _value;
        if (that.txtDiamond) {
            that.txtDiamond.changeText(MathUtils.bytesToSize(PlayerManager.Instance.Info.userDiamond).toString());
        }
        //本地保存
        userData.setDiamond(PlayerManager.Instance.Info.userDiamond);
    }
    //设置兵营高亮状态
    setCarparkLight(_monsterSp = null) {
        let that = this;
        if (that.carparkList) {
            let monsterId = 0;
            if (_monsterSp) {
                monsterId = _monsterSp.monsterId;
            }
            for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
                var element = that.carparkList.getCell(index);
                if (element) {
                    let carParkSp = element.getChildByName("car");
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
    }
    //设置关卡
    setPassStage(_value) {
        let that = this;
        HallManager.Instance.hallData.passStage = Math.min(_value, BattleManager.Instance.maxBarrier);
        if (HallManager.Instance.hallData.passStage > BattleManager.Instance.maxBarrier) {
            HallManager.Instance.hallData.passStage = 1;
        }
        let stageCfgArray = BattleManager.Instance.getBarrierSectionConfig(HallManager.Instance.hallData.passStage);
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
    }
    //设置章节
    setPassSection(_value) {
        let that = this;
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
    }
    //设置森林之王等级
    setKingLevel(_value) {
        let that = this;
        HallManager.Instance.hallData.userKingLevel = _value;
        if (that.txtKingLevel) {
            that.txtKingLevel.changeText("" + HallManager.Instance.hallData.userKingLevel);
        }
        userData.updateKingLevel(HallManager.Instance.hallData.userKingLevel);
    }
    /** 赠送英雄中 */
    handlerGiveMonster() {
        let self = this;
        if (HallManager.Instance.isGuide()) { //新手关闭赠送
            return;
        }
        HallManager.Instance.hallData.giveMonsterAllTime = 3 * 60 * 60;
        self.imgTrain.visible = HallManager.Instance.hallData.giveMonsterAllTime > 0;
        if (!self.gameTimeImg.visible)
            EffectUtils.showTrainingTimeEffect(self);
        self.gameTimeImg.visible = self.gameTimebg.visible = self.txtGameTime.visible = true;
        TimerManager.Instance.doFrame(1, 0, self.doGiveMonster, self);
    }
    /** 执行赠送英雄 */
    doGiveMonster() {
        let self = this;
        if (HallManager.Instance.hallData.giveMonsterAllTime <= 0) {
            TimerManager.Instance.remove(self.doGiveMonster, self);
            self._giveCarTime = 0;
            self._giveTempTime = 0;
            self.imgTrain.visible = false;
            self.gameTimeImg.visible = self.gameTimebg.visible = self.txtGameTime.visible = false;
        }
        if (HallManager.Instance.hallData.giveMonsterAllTime > 0) {
            HallManager.Instance.hallData.giveMonsterAllTime--;
            let tempTime = Math.floor(HallManager.Instance.hallData.giveMonsterAllTime / 60);
            if (self._giveTempTime != tempTime) {
                self._giveTempTime = tempTime;
                let minute = Math.floor(self._giveTempTime / 60);
                let sec = self._giveTempTime % 60;
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
            let boxDropCfg = GlobleData.getData(GlobleData.TrainDropVO, userData.getCarLevel());
            let randCarId = 101;
            let dropId = 100;
            if (!boxDropCfg) { //先不走表的规则去掉落
                let dropCarArray = [boxDropCfg.dropHeroLevel3, boxDropCfg.dropHeroLevel2, boxDropCfg.dropHeroLevel1];
                let randIndex = Math.floor(Math.random() * 10) % 3;
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
                    let monsterLevel = userData.getCarLevel();
                    let monsterInfo = BattleManager.Instance.getUnLockMonster(HallManager.Instance.hallData.buyMonsterType, monsterLevel);
                    randCarId = RandomUtils.rangeInt(monsterInfo.id - 6, monsterInfo.id - 4);
                }
                if (randCarId <= 100 && !userData.isEvolution()) {
                    randCarId = 101;
                }
                else if (randCarId <= 1000 && userData.isEvolution()) {
                    randCarId = 1001;
                }
                let carParkSp = BattleManager.Instance.createPet(randCarId, true);
                if (carParkSp) {
                    carParkSp.dropBoxEffect(self.mainView);
                }
            }
        }
        self._giveCarTime++;
    }
    /** 检查守护是否可以升级 */
    checkKingIsUpdate() {
        let self = this;
        self.kingUpdateImg.visible = HallManager.Instance.getKingIsUpgrade();
    }
    //显示通关结果(_isManual:手动调用)
    showPassStageResult(_stage, _callback = null, _isManual = false) {
        let that = this;
        if (M.novice.isRunning)
            return;
        if (_stage > 0) { //通关陈功
            ResultView.Create((_nodeView) => {
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
                        _nodeView.showPrizeUI(HallManager.Instance.hallData.stagePrizeList, (lastStage) => {
                            if (that.btnStagePrize) {
                                that.showStagePrize(HallManager.Instance.hallData.stagePrizeList.length > 0);
                            }
                            // MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.09"));
                            // Laya.timer.once(3000, that, () => {
                            if (userData) {
                                //显示获得的奖品
                                let stagePrizeCfg = GlobleData.getData(GlobleData.BarrierRewardVO, lastStage);
                                if (stagePrizeCfg) {
                                    //发送奖励
                                    let bossM = MathUtils.parseStringNum(stagePrizeCfg.bossM);
                                    let gold = BattleManager.Instance.getBarrierRewardToGold(lastStage, MathUtils.parseStringNum(stagePrizeCfg.gold));
                                    let gem = MathUtils.parseStringNum(stagePrizeCfg.gem);
                                    HttpManager.Instance.requestStagePrizeDiamond(lastStage, gem, bossM, (_res) => {
                                        let stage = _res;
                                        if (stage > 0) {
                                            _nodeView.removeSelf();
                                            ClearanceRewardView.Create(that, null, () => {
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
                            // });
                        });
                    }
                }
            }, _callback, _stage);
        }
        else { //通关失败
            ClearanceFail.Create(that, null, _callback);
        }
    }
    //任务界面
    showTaskView() {
        let that = this;
        TaskView.Create(null, () => {
            SDKManager.Instance.closeBannerAd(true);
        }, true);
    }
    //幸运抽奖界面
    showLuckPrizeView() {
        LuckPrizeView.Create(null, () => {
            SDKManager.Instance.closeBannerAd(true);
        });
    }
    //跳转小程序
    onMiniProgram() {
        platform.navigateToMiniProgram({
            // appId: 'wx10e1554b604d7568',
            appId: userData.miniCode(),
            path: userData.miniPagePath(),
            // extraData: {
            //     box: '1'
            // },
            // envVersion: 'develop',
            success(res) {
                console.log("mini跳转成功", res);
            }
        });
        //小程序跳转次数统计
        HttpManager.Instance.requestShareAdFinish("minipro_" + userData.miniCode());
    }
    //怪物储存箱
    onCarStore() {
        let that = this;
        let carId = that.getCarStore();
        if (carId > 0) {
            let carParkSp = BattleManager.Instance.createPet(carId);
            if (carParkSp) {
                that.getCarStore(true);
                that.carStoreBtnEnabled();
            }
        }
    }
    carStoreBtnEnabled() {
        let that = this;
        if (that.btnCarStore) {
            that.btnCarStore.visible = that.getCarStore() > 0;
        }
    }
    //保存怪物到本地
    saveCarStore(_carId) {
        if (_carId < 1)
            return;
        let that = this;
        let carArray = [];
        let storage = window.localStorage;
        let dataJson = storage.getItem(HallManager.Instance.hallData.monsterStoreKey);
        if (dataJson) {
            let jsonObj = JSON.parse(dataJson);
            if (jsonObj) {
                carArray = jsonObj;
            }
        }
        if (carArray) {
            carArray.push(_carId);
            let dataJson = JSON.stringify(carArray);
            if (dataJson) {
                console.log("@FREEMAN: 本地数据保存追踪 - car_store_key");
                storage.setItem(HallManager.Instance.hallData.monsterStoreKey, dataJson);
            }
        }
        that.carStoreBtnEnabled();
    }
    //本地取出怪物
    getCarStore(_isRemove = false) {
        let storage = window.localStorage;
        let dataJson = storage.getItem(HallManager.Instance.hallData.monsterStoreKey);
        if (dataJson) {
            let jsonObj = JSON.parse(dataJson);
            if (jsonObj) {
                let carId = jsonObj.shift();
                //保存移除
                if (_isRemove) {
                    let dataJson = JSON.stringify(jsonObj);
                    if (dataJson) {
                        console.log("@FREEMAN: 本地数据保存追踪 - car_store_key 2");
                        storage.setItem(HallManager.Instance.hallData.monsterStoreKey, dataJson);
                    }
                }
                if (carId) {
                    return carId;
                }
            }
        }
        return 0;
    }
    //显示加速效果
    playAcceEffectView(_acceTime = 90, _isEffect = true) {
        let that = this;
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
                Laya.timer.frameOnce(90, that, () => {
                    that.acceEffectView.visible = false;
                });
            }
            //加速开始
            that.setCarAcce(2);
            that.refreshAcceTime();
            Laya.timer.loop(1000, that, that.refreshAcceTime);
            Laya.SoundManager.playSound("musics/accecar.mp3");
        }
    }
    refreshAcceTime() {
        let that = this;
        //显示倒计时
        if (that.btnAcce) {
            let imgAcce = that.btnAcce.getChildByName("imgAcce");
            if (imgAcce) {
                imgAcce.visible = true;
                let txtAcceTime = imgAcce.getChildByName("txtAcceTime");
                if (txtAcceTime) {
                    let minute = Math.floor(HallManager.Instance.hallData.userAcceTime / 60);
                    let sec = HallManager.Instance.hallData.userAcceTime % 60;
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
                let imgAcce = that.btnAcce.getChildByName("imgAcce");
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
    }
    setCarAcce(_acceValue) {
        let self = this;
        HallManager.Instance.hallData.userAcceValue = _acceValue;
        //精灵加速
        BattleManager.Instance.doPetAccelerate(self.carparkList);
        //怪物加速
        BattleManager.Instance.doMonsterAccelerate();
        //更新每秒收益
        HallManager.Instance.updateIncomePerSec(HallManager.Instance.getCalculateIncomePerSec(self.carparkList));
    }
    playBossEnterEffect() {
        let self = this;
        // 加载动画图集,加载成功后执行回调方法
        let aniPath = "bossEnter";
        let aniInterval = 120;
        let frameCount = 9;
        if (self._showBossIcon == null) {
            self._showBossIcon = Laya.Pool.getItemByClass(userData.ANIMATION_POOL_NAME, Laya.Animation);
            LayerManager.getInstance().screenEffectLayer.addChild(self._showBossIcon);
            let aniKey = "dx_bosslx_";
            let aniAtlas = PathConfig.EffectUrl.replace("{0}", aniPath);
            self._showBossIcon.loadAtlas(aniAtlas, Handler.create(self, () => {
                //创建动画模板dizziness
                Laya.Animation.createFrames(AnimationUtils.aniUrls(aniKey, frameCount, aniPath + "/"), aniPath);
                //设置坐标
                let aniGraphics = self._showBossIcon.frames[1];
                if (aniGraphics) {
                    let aniBounds = aniGraphics.getBounds();
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
        self._showBossIcon.timerOnce(aniInterval * frameCount, self, () => {
            self._showBossIcon.stop();
            self._showBossIcon.visible = false;
        });
    }
    /** king升级特效 */
    playKingUpdateEffect() {
        let that = this;
        if (that.spMountGuard == null)
            return;
        let monsterAni = Laya.Pool.getItemByClass(userData.ANIMATION_POOL_NAME, Laya.Animation);
        that.spMountGuard.addChild(monsterAni);
        // 加载动画图集,加载成功后执行回调方法
        let aniPath = "kingUpdate";
        let aniKey = "sj_";
        let aniAtlas = PathConfig.EffectUrl.replace("{0}", aniPath);
        let aniInterval = 120;
        let frameCount = 5;
        monsterAni.loadAtlas(aniAtlas, Handler.create(that, () => {
            //创建动画模板dizziness
            Laya.Animation.createFrames(AnimationUtils.aniUrls(aniKey, frameCount, aniPath + "/"), aniPath);
            //设置坐标
            let aniGraphics = monsterAni.frames[1];
            if (aniGraphics) {
                let aniBounds = aniGraphics.getBounds();
                monsterAni.pos(-aniBounds.width * 0.4, -aniBounds.height * 0.6);
            }
            monsterAni.interval = aniInterval;
            monsterAni.play(0, false, aniPath);
        }));
        monsterAni.timerOnce(aniInterval * frameCount, that, () => {
            monsterAni.removeSelf();
            Laya.Pool.recover(userData.ANIMATION_POOL_NAME, monsterAni);
        });
    }
    /** 更新幸运抽奖状态 */
    onUpdatePrizeState($data) {
        let self = this;
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
            let carId = $data.carId;
            if (carId) {
                let carParkSp = BattleManager.Instance.createPet(carId, true);
                if (carParkSp == null) {
                    //保存失败则防止储存箱
                    self.saveCarStore(carId);
                }
            }
        }
    }
    /** 更新加速按钮状态 */
    onUpdateAccelerateBtnState() {
        let self = this;
        if (self.btnMiniProgram && userData.miniImageUrl().length > 0) {
            Laya.loader.load(userData.miniImageUrl(), Laya.Handler.create(self, (_imgTexture) => {
                if (_imgTexture && _imgTexture.url) {
                    self.btnMiniProgram.skin = _imgTexture.url;
                }
            }));
        }
    }
    /** 更新英雄商店红点 */
    onUpdatePetShopRedPoint($data) {
        let self = this;
        if ($data == "show") {
            HallManager.Instance.showCarportRedPoint();
        }
        else {
            HallManager.Instance.showCarportRedPoint(false);
        }
    }
    /** 更新转盘红点 */
    onUpdatePrizeRedPoint($data) {
        let self = this;
        if ($data == "show") {
            self.showLuckPrizeRedPoint();
        }
        else {
            self.showLuckPrizeRedPoint(false);
        }
    }
    /** 更新任务红点 */
    onUpdateTaskRedPoint($data) {
        let self = this;
        if ($data == "show") {
            self.showTaskRedPoint();
        }
        else {
            self.showTaskRedPoint(false);
        }
    }
    /** 更新签到红点 */
    onUpdateSignRenPoint($data) {
        let self = this;
        if ($data == "show") {
            self.showDailySignRedPoint();
        }
        else {
            self.showDailySignRedPoint(false);
        }
        self.menuRedPointIsShow();
    }
    /** 更新强化红点 */
    onUpdateStrengthenRedPoint($data) {
        let self = this;
        if ($data == "show") {
            self.showStrengthenRedPoint();
        }
        else {
            self.showStrengthenRedPoint(false);
        }
    }
    /** 更新关注红点 */
    onFollowRewardRedPoint($data) {
        let self = this;
        if ($data == "show") {
            self.showFollowRewardRedPoint();
        }
        else {
            self.showFollowRewardRedPoint(false);
        }
        self.menuRedPointIsShow();
    }
    /** 更新好友互助红点 */
    onFriendConcurRedPoint($data) {
        let self = this;
        if ($data == "show") {
            self.showFriendConcurRedPoint();
        }
        else {
            self.showFriendConcurRedPoint(false);
        }
        self.menuRedPointIsShow();
    }
    /** 显示好友互助红点 */
    showFriendConcurRedPoint(show = true) {
        let self = this;
        if (self.btn_concur) {
            let imgRedPoint = self.btn_concur.getChildByName("imgRedPoint");
            if (imgRedPoint) {
                imgRedPoint.visible = show;
            }
        }
    }
    /** 更新福利红点 */
    onEveryDayRewardRedPoint($data) {
        let self = this;
        if ($data == "show") {
            self.showEveryDayRewardRedPoint();
        }
        else {
            self.showEveryDayRewardRedPoint(false);
        }
        self.isShowWelfareBtn();
        self.menuRedPointIsShow();
    }
    /** 显示每日福利红点 */
    showEveryDayRewardRedPoint(show = true) {
        let self = this;
        if (self.btn_welfare) {
            let imgRedPoint = self.btn_welfare.getChildByName("imgRedPoint");
            if (imgRedPoint) {
                imgRedPoint.visible = show;
            }
        }
    }
    isShowWelfareBtn() {
        let self = this;
        if (userData.isShowEveryDayRewardRedPoint()) {
            self.btn_ranking.visible = false;
            self.btn_welfare.visible = true;
        }
        else {
            self.btn_ranking.visible = true;
            self.btn_welfare.visible = false;
        }
    }
    /** 菜单红点是否显示 */
    menuRedPointIsShow() {
        let self = this;
        self.menuRedPoint.visible = userData.menuRedPointCount > 0;
    }
    /** 刷新金币 */
    onRefreshGold() {
        let self = this;
        self.updateGold(userData.gold);
    }
    /** 刷新钻石 */
    onRefreshDiamond($data) {
        let self = this;
        if ($data && $data.diamond) {
            self.updateDiamond($data.diamond);
        }
        else {
            self.updateDiamond(userData.diamond);
        }
    }
    /** 游戏加速 */
    onGameAccelerate() {
        let self = this;
        if (GlobalConfig.DEBUG) {
            self.playAcceEffectView();
        }
        else {
            //显示广告
            let adStage = userData.toShareAd((_res) => {
                self.playAcceEffectView();
            }, 10, false, true);
            //无分享广告则显示钻石购买
            if (adStage > 0) {
                self.onDiamondBuyAcce();
            }
        }
    }
    /** 战斗通过 */
    onBattleClearanc() {
        let self = this;
        if (HallManager.Instance.hallData.passSection >= HallManager.Instance.hallData.maxSection) {
            self.showPassStageResult(HallManager.Instance.hallData.passStage);
            //上传腾讯云
            userData.setUserCloudStorage();
        }
        else if (HallManager.Instance.hallData.passSection >= (HallManager.Instance.hallData.maxSection - 1)) {
            //是否进入boss关
            self.timerOnce(600, self, self.playBossEnterEffect);
        }
        self.timerOnce(2000, self, () => {
            HallManager.Instance.hallData.gameStatus = 1;
            //过关
            let curSection = HallManager.Instance.hallData.passSection;
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
    }
    /** 战斗没有通过 */
    onBattleNoClearanc() {
        let self = this;
        self.showPassStageResult(-1, () => {
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
    }
    /** 功能菜单 */
    onClickMenuHandler() {
        let self = this;
        self.btn_arrow.mouseEnabled = false;
        if (self.btn_arrow.scaleX == 1) {
            Laya.Tween.to(self.menuBox, { left: -390 }, 350, null, Laya.Handler.create(self, () => {
                Laya.Tween.clearTween(self.menuBox);
                self.btn_arrow.mouseEnabled = true;
                self.btn_arrow.scaleX = -1;
            }, null, true));
        }
        else {
            Laya.Tween.to(self.menuBox, { left: 0 }, 350, null, Laya.Handler.create(self, () => {
                Laya.Tween.clearTween(self.menuBox);
                self.btn_arrow.mouseEnabled = true;
                self.btn_arrow.scaleX = 1;
            }, null, true));
        }
    }
    /** 好友互助 */
    onClickConcur() {
        ViewMgr.Ins.open(ViewConst.FriendConcurView);
    }
    /** 关注 */
    onClickFollow() {
        ViewMgr.Ins.open(ViewConst.FollowRewardView);
    }
    //每日签到界面
    showDaySignView() {
        const that = this;
        DaySignView.Create(Laya.Handler.create(this, (view) => {
            if (view) {
                view.on(DaySignView.REMOVE_FROM_STAGE, this, () => {
                    resolveDailyPrizeVisible();
                });
            }
            resolveDailyPrizeVisible();
            function resolveDailyPrizeVisible() {
                // if (DaySignView.signData) {
                //   that.btnDailyPrize.visible = DaySignView.signData.sign.status === 0;
                // } else {
                //   that.btnDailyPrize.visible = true;
                // }
            }
        }));
    }
    //排行
    onRanking() {
        let self = this;
        RankingView.Create(() => {
            self.showSurpassView();
        });
    }
    updateDiamondTime(time) {
        let self = this;
        self._diamondTime = time;
        if (userData.offlineRewardCount > 0) {
            if (self._diamondTime > 0) {
                self.txt_diamondTime.text = TimeUtil.S2H(self._diamondTime, ":", false);
                TimerManager.Instance.doTimer(1000, 0, self.onUpdateTime, self);
            }
            else if (self._diamondTime <= 0) {
                self.txt_diamondTime.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.28");
            }
        }
        else {
            self.txt_diamondTime.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.29");
        }
    }
    onUpdateTime() {
        let self = this;
        if (self._diamondTime > 0) {
            self._diamondTime -= 1000;
            self.txt_diamondTime.text = TimeUtil.S2H(self._diamondTime, ":", false);
        }
        else {
            TimerManager.Instance.remove(self.onUpdateTime, self);
            self.txt_diamondTime.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.28");
        }
    }
    /** 领取在线奖励 */
    onGetOffLineReward() {
        let self = this;
        if (self._diamondTime < 1 && userData.offlineRewardCount > 0) {
            HttpManager.Instance.requestGetOffLineReward((res) => {
                RewardGetView.Create(self, () => {
                    M.layer.screenEffectLayer.addChild(new FlyEffect().play("diamond", LayerManager.mouseX, LayerManager.mouseY, 38, 83));
                    MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", "钻石", res.diamond));
                    EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: userData.diamond = res.total_diamond });
                    userData.offlineRewardCount = res.remain_online_num;
                    self.updateDiamondTime(HallManager.Instance.hallData.offlineTotalTime);
                }, [res.diamond], [2]);
            });
        }
        else {
            if (userData.offlineRewardCount <= 0) {
                MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.30"));
            }
            else {
                MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.27"));
            }
        }
    }
    onShowWelfareView() {
        ViewMgr.Ins.open(ViewConst.WelfareView);
    }
}
//# sourceMappingURL=HallScene.js.map