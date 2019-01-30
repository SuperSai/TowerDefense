/*
* 大厅主场景
*/
import ShopViewUI = ui.shop.ShopViewUI;

class HallScene extends ui.hall.HallSceneUI {
  private parkMonsterModelSp: MonsterSprite = null;
  private curMonsterSprite: MonsterSprite = null;
  private _levelReward: Laya.Animation;//等级奖励
  private _giveCarTime: number = 0; //定时赠送怪物
  private _giveTempTime: number = 0; //定时赠送怪物
  /** boss来袭特效 */
  private _showBossIcon: Laya.Animation;

  constructor() {
    super();
    var self = this;
    self.frameOnce(5, self, () => {
      self.addEvents();
      self.init();
    });
  }

  //新建并添加到节点
  static Create(_parentNode: Laya.Node): void {
    let resList = [
      { url: "res/atlas/images/skill.atlas", type: Laya.Loader.ATLAS },
      { url: "res/atlas/images/fontImg.atlas", type: Laya.Loader.ATLAS },
      { url: "res/atlas/images/shop.atlas", type: Laya.Loader.ATLAS }
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
  private init(): void {
    let self = this;
    HallManager.Instance.hall = self;
    self.carStoreBtnEnabled();
    if (GlobalConfig.DEBUG) {
      DebugView.GameView = self;
      LayerManager.getInstance().debugLayer.addChild(new DebugView());
    }
    Sheet.initSheets(Laya.loader.getRes("sheets/sheet.json"));
    M.novice.init();
    M.novice.saveFunc = groupId => {
      M.http.requestSaveNovice(groupId);
    };
    M.novice.start();
    M.more.applyMute();
    BuffController.getInstance().init(self.viewBuffContainer);
    SkyDropController.getInstance().init(self.viewSkyDropContainer);

    Laya.timer.once(1000, this, () => {
      if (Laya.Browser.window.wxUserInfo) {
        PlayerManager.Instance.Info.wxUserInfo = Laya.Browser.window.wxUserInfo;
      }
    });

    if (!NoviceManager.isComplete) {
      M.novice.on(NoviceEvent.ACTIVATE_TARGET, self, (eventParam) => {
        if (eventParam === NoviceTarget.QUICK_PURCHASE_MONSTER) {
          M.novice.activateClickTarget(self.btnShopShortcut, eventParam, self.btnShopShortcut.parent as Sprite);
        } else if (eventParam === NoviceTarget.FOREST_KING) {
          M.novice.activateClickTarget(self.btnEvolution, eventParam, self.btnEvolution.parent as Sprite,
            [{ target: self.spMountGuard as Sprite, parent: self.spMountGuard.parent as Laya.Sprite }]
          );
        } else if (eventParam === NoviceTarget.MONSTER_CELL_2) {
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
        } else if (type === NoviceActivateType.SYNTHESIS_LEVEL) {
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
    if (systemInfo.checkVersion(WXSDKVersion.CREATE_FEEDBACK_BUTTON)) {
      if (self.btnFeedback) {
        const rect: Rectangle = LayerManager.getRealStageRect(self.btnFeedback);
        platform.createFeedbackButton({
          x: rect.x, y: rect.y,
          width: rect.width, height: rect.height
        });
      }
    } else {
      self.btnMore.pos(self.btnFeedback.x, self.btnFeedback.y);
      self.btnFeedback.destroy();
    }

    //启动游戏出怪
    const startCreateMonster = function () {
      if (!M.novice.isRunning) {
        M.hall.hallData.gameStatus = 1;
        self.createMonster(M.hall.hallData.passStage, M.hall.hallData.passSection);
        Laya.timer.clear(this, startCreateMonster);
      }
    };
    Laya.timer.loop(1000, this, startCreateMonster);

    //守卫
    if (self.spMountGuard) {
      let bossId: number = userData.isEvolution() ? 100003 : 100002;
      self.spMountGuard.setKind(bossId);
    }
    //训练提示
    self.imgTrain.visible = false;
    self.gameTimeImg.visible = self.gameTimebg.visible = self.txtGameTime.visible = false;
    //检查守卫是否可以升级
    self.checkKingIsUpdate();
    StrengthenManager.Instance.checkRedPoint();
    // self.showStagePrize(true);
    SDKManager.Instance.createBanner(false);
    //游戏公告
    HttpManager.Instance.requestAnnouncement();
    MessageUtils.showMsgTips("");
    HallManager.Instance.checkIsFreeLottery();

    this.showMenu(false);
  }

  /** 初始化用户数据 */
  private initUserData(): void {
    let self = this;
    //初始化用户数据
    if (userData) {
      HallManager.Instance.updateIncomePerSec(HallManager.Instance.hallData.userIncomePerSec);
      self.updateGold(M.player.Info.userMoney);
      self.updateDiamond(M.player.Info.userDiamond);
      HallManager.Instance.updateEssence(M.player.Info.userEssence);
      self.setPassStage(userData.getPassStage());
      self.setPassSection(userData.getPassSection());
      self.setKingLevel(userData.getKingLevel());
      self.refreshShortcutCreateBtn();
      //延迟处理
      self.frameOnce(50, self, () => {
        //离线收益， 离线超过10分钟才向服务器请求离线时间，否则没有离线奖励
        const now: number = new Date().getTime();
        if (now - userData.lastHeartBeatTime > 10 * Time.MIN) {
          M.http.requestOfflinePrizeData();
        }
        if (!M.novice.isRunning && userData.showPlayCourtesy) {
          ViewMgr.Ins.open(ViewConst.PlayCourtesyView);
        }
        //超越好友
        self.showSurpassView();
        if (userData) {
          const remainingTime: number = userData.cache.getCache(CacheKey.ACCELERATE_SEC_REMAINING);
          if (remainingTime > 0) {
            self.playAcceEffectView(remainingTime, false);
          } else {
            this.imgAccIcon.visible = true;
            if (M.player.Info.freeAcc > 0) {
              this.imgAccIcon.skin = "images/core/red_dot_hint.png";
            } else if (userData.getAdTimes(10) > 0) {
              this.imgAccIcon.skin = "images/core/video_icon.png";
            } else if (userData.getShareTimes(10) > 0) {
              this.imgAccIcon.skin = "images/core/fenxiang_icon.png";
            } else {
              this.imgAccIcon.visible = false;
            }
          }
        }
        //先到后台拉取未领取的奖励
        HttpManager.Instance.requestStagePrizeData((_prizeList: Array<any>) => {
          if (_prizeList == null || _prizeList.length < 1) return;
          let prizeList: Array<number> = [];
          let totalCount: number = _prizeList.length;
          for (var index = 0; index < totalCount; index++) {
            var element = _prizeList[totalCount - 1 - index];
            if (element && element.stage < HallManager.Instance.hallData.passStage) {
              if (element.stage < (HallManager.Instance.hallData.passStage - 5)) {
                break;//最近5关
              }
              prizeList.push(element.stage); //过滤当前关卡
              if (prizeList.length > 4) {
                break;//最大5关
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
      M.hall.resolveShopRedPoint();
      //怪物商店红点
      M.hall.resolveMoreRedPoint();
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
      self.updateDiamondTime(M.hall.hallData.offlineTotalTime);
    }
  }

  private addEvents(): void {
    let self = this;
    self.btnShop.on(Laya.Event.CLICK, self, self.onShowCarport);
    self.btnCarStore.on(Laya.Event.CLICK, self, self.onCarStore);
    self.btnEvolution.on(Laya.Event.CLICK, self, self.onEvolution);
    self.btnAcce.on(Laya.Event.CLICK, self, self.onGameAccelerate);
    self.btnStrengthen.on(Laya.Event.CLICK, self, self.onStrengthen);
    self.btnStagePrize.on(Laya.Event.CLICK, self, self.onStagePrize);
    self.btnLuckPrize.on(Laya.Event.CLICK, self, self.showLuckPrizeView);
    self.btn_fly.on(Laya.Event.CLICK, self, self.onClickMiniProgram);
    self.btn_eliminate.on(Laya.Event.CLICK, self, self.onClickMiniProgram);
    self.btn_arrow.on(Laya.Event.CLICK, self, self.onClickMenuHandler);
    self.btn_concur.on(Laya.Event.CLICK, self, self.onClickConcur);//好友互助
    self.btn_ranking.on(Laya.Event.CLICK, self, self.onRanking);//排行榜
    self.btn_sign.on(Laya.Event.CLICK, self, self.showDaySignView);//签到
    self.btn_follow.on(Laya.Event.CLICK, self, self.onClickFollow);//关注
    self.btn_online.on(Laya.Event.CLICK, self, self.onGetOffLineReward);//在线奖励
    self.btn_welfare.on(Laya.Event.CLICK, self, self.onShowWelfareView);//福利界面
    self.btnInvitation.on(Laya.Event.CLICK, self, self.onShowInvitation);//邀请界面
    this.btnMore.on(Laya.Event.CLICK, this, () => {
      // M.more.show();
      ViewMgr.Ins.open(ViewConst.PlayCourtesyView);
    });
    if (self.btnTask) self.btnTask.on(Laya.Event.CLICK, self, self.showTaskView);
    if (self.surpassView) self.surpassView.on(Laya.Event.CLICK, self, self.onFriendRanking);
    BattleManager.Instance.on(BattleEventsConst.BATTLE_CLEARANC, self, self.onBattleClearanc);
    BattleManager.Instance.on(BattleEventsConst.BATTLE_NO_CLEARANC, self, self.onBattleNoClearanc);
    EventsManager.Instance.on(EventsType.OFFLINE, self, self.onOffLineRevenue);//离线收益
    EventsManager.Instance.on(EventsType.DIAMOND_CHANGE, self, self.onRefreshDiamond);//钻石刷新
    EventsManager.Instance.on(EventsType.GOLD_CHANGE, self, self.onRefreshGold);//金币刷新
    EventsManager.Instance.on(EventsType.DAY_SIGN_RED_POINT, self, self.onUpdateSignRenPoint);//每日签到红点移除事件
    EventsManager.Instance.on(EventsType.TASK_RED_POINT, self, self.onUpdateTaskRedPoint);//任务红点移除事件
    EventsManager.Instance.on(EventsType.LUCK_PRIZED_RED_POINT, self, self.onUpdatePrizeRedPoint);//转盘红点移除事件
    EventsManager.Instance.on(EventsType.HERO_SHOP_RED_POINT, M.hall, M.hall.resolveShopRedPoint);//英雄商店红点事件
    EventsManager.Instance.on(EventsType.STRENGTHEN_RED_POINT, self, self.onUpdateStrengthenRedPoint);//强化红点移除事件
    EventsManager.Instance.on(EventsType.FOLLOW_RED_POINT, self, self.onFollowRewardRedPoint);//关注红点事件
    EventsManager.Instance.on(EventsType.FRIEND_CONCUR_RED_POINT, self, self.onFriendConcurRedPoint);//好友互助红点事件
    EventsManager.Instance.on(EventsType.EVERY_DAY_INTO_REWARD, self, self.onEveryDayRewardRedPoint);//福利红点事件
    EventsManager.Instance.on(EventsType.UPDATE_HALL_DATA, self, self.onUpdateHallData);
    EventsManager.Instance.on(EventsType.EVOLUTION_LEVEL_COMPLETE, self, self.onEvolutionLevelComplete);//守卫升级完毕
  }

  private onClickMiniProgram(evt: Laya.Event): void {
    let self = this;
    let appId: string = "";
    switch (evt.target) {
      case self.btn_fly:
        appId = "wx5bf2e598a2acbb50";
        break;
      case self.btn_eliminate:
        appId = "wx06f4827d100da314";
        break;
    }
    SDKManager.Instance.navigateToMiniProgram(appId);
  }

  private onUpdateHallData(): void {
    let self = this;
    self.updateGold(M.player.Info.userMoney);
    self.updateDiamond(M.player.Info.userDiamond);
  }

  /** 等级礼包 */
  public showStagePrize(value: boolean): void {
    let self = this;
    if (self._levelReward == null && value) {
      self._levelReward = Laya.Pool.getItemByClass(userData.ANIMATION_POOL_NAME, Laya.Animation);
      self.btnStagePrize.addChild(self._levelReward);
      // 加载动画图集,加载成功后执行回调方法
      let aniAtlas: string = PathConfig.RES_URL + "images/effect/levelReward/levelReward.atlas";
      self._levelReward.loadAtlas(aniAtlas, Handler.create(self, () => {
        self._levelReward.interval = 77;
        self._levelReward.play();
      }));
    }
    self.btnStagePrize.visible = value;
  }

  //显示超越好友视窗
  private showSurpassView() {
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
      let rankSpName: string = "rank_sprite_key";
      let rankSprite = that.surpassView.getChildByName(rankSpName) as Laya.Sprite;
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

  private _monsterLevel: number = 0;
  public refreshShortcutCreateBtn(isUpdateGold: boolean = false) {
    let self = this;
    let monsterType: number = userData.isEvolution() ? 2 : 1;
    HallManager.Instance.hallData.buyMonsterType = monsterType;
    let monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, userData.getCarLevel());
    let curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
    if (!isUpdateGold) {
      if (userData.getCarLevel() > 8) {
        if (this._monsterLevel <= Math.max(1, (userData.getCarLevel() - 3)) || M.player.Info.userMoney >= curPrice) {
          this._monsterLevel = userData.getCarLevel();
        } else {
          this._monsterLevel--;
        }
      } else {
        this._monsterLevel = userData.getCarLevel();
      }
    }
    monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, this._monsterLevel);
    let btnBuy = self.btnShopShortcut;
    if (monsterInfo && btnBuy) {
      if (HallManager.Instance.hallData.curNewMonsterId != monsterInfo.id) {
        HallManager.Instance.hallData.curNewMonsterId = monsterInfo.id;
        btnBuy.off(Laya.Event.CLICK, self, HallManager.Instance.goldBuyHero);
        btnBuy.on(Laya.Event.CLICK, self, HallManager.Instance.goldBuyHero, [monsterInfo, btnBuy]);
      }
      curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
      let imgPrice = btnBuy.getChildByName("imgPrice") as Laya.Image;
      if (imgPrice) {
        let txtPrice = imgPrice.getChildByName("txtPrice") as Laya.Label;
        if (txtPrice) {
          txtPrice.text = MathUtils.bytesToSize(curPrice);
          //字体颜色提示
          if (PlayerManager.Instance.Info.userMoney < curPrice) {
            txtPrice.color = "#FF0000";
          } else {
            txtPrice.color = "#fff1ba";
          }
        }
        //当前购买怪物级别
        let txtLevel = btnBuy.getChildByName("txtLevel") as Laya.Label;
        if (txtLevel) {
          txtLevel.text = ("英雄" + " Lv" + BattleManager.Instance.getLevel(monsterInfo.id));
        }
      }
    }
  }

  //离线收益
  private onOffLineRevenue(offlineTimeSpan: number): void {
    if (userData) {
      //离线超过10分钟才算奖励
      if (offlineTimeSpan > 10 * Time.MIN && HallManager.Instance.hallData.passStage > 1 && !M.novice.isRunning) {
        // 当前关卡收益*(挂机时间/180)*0.1 (挂机时间最大2小时)
        let stageIncome: number = BattleManager.Instance.getBarrierIncome(M.hall.hallData.passStage);
        let prizeValue: number = stageIncome * Math.min(Time.HOUR * 2, offlineTimeSpan) / 180 * 0.1;
        if (prizeValue > 0) {
          ViewMgr.Ins.open(ViewConst.OfflineRewardsView, null, prizeValue);
        }
      }
    }
  }

  private onFriendRanking(): void {
    let that = this;
    RankingView.Create(() => {
      that.showSurpassView();
    }, true);
    //锁定按钮
    AnimationUtils.lockBtnStage(that.surpassView);
  }

  //强化
  private onStrengthen(_btnObj: Laya.Button = null): void {
    ViewMgr.Ins.open(ViewConst.StrengthenView);
  }

  //森林之王进化
  private onEvolution(_btnObj: Laya.Button = null): void {
    let that = this;
    if (userData.isEvolution() == false && userData.getKingLevel() >= 30) {
      //先进化
      EvolutionAdvancedView.Create(that, (_nodeView: EvolutionAdvancedView) => {
        _nodeView.refreshBoxUI((_evolutionLevel: number, _diamond: number, _essence: number) => {
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
          Laya.timer.callLater(userData, userData.saveLocal, [true]);
        });
      });
    } else {
      //升级
      ViewMgr.Ins.open(ViewConst.EvolutionView);
    }
  }

  /** 守卫升级完毕 */
  private onEvolutionLevelComplete(): void {
    let self = this;
    self.playKingUpdateEffect();
    Laya.SoundManager.playSound("musics/kingUpdate.mp3");
    self.checkKingIsUpdate();
  }

  //商店进化
  private onEvolutionShop(_level: number): void {
    let that = this;
    if (HallManager.Instance.hallData.giveMonsterAllTime > 0) HallManager.Instance.hallData.giveMonsterAllTime = 1;
    //设置进化等级
    userData.updateEvolutionLevel(_level);
    //强行重置精灵等级为1
    userData.resetMonsterLevel();
    //重置快捷购买按钮
    // that.refreshShortcutCreateBtn();
    //奖励三个高级精灵
    let prizeMonsterArray: Array<number> = [1001, 1001, 1001];
    let count: number = 0;
    if (that.carparkList) {
      for (let index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
        var element = that.carparkList.getCell(index);
        if (element) {
          let carParkSp = element.getChildByName("car") as MonsterSprite;
          if (carParkSp && carParkSp.monsterId > 0) {
            if (count < 3) {
              carParkSp.setKind(prizeMonsterArray[count]);
              count++;
            } else {
              carParkSp.clearStage();
            }
            userData.setCarparkSave(carParkSp);
          }
        }
      }
    }
  }

  //未领取通关奖励
  private onStagePrize(): void {
    this.showPassStageResult(HallManager.Instance.hallData.passStage, null, true);
  }

  //敌方出怪
  private createMonster(_stage: number, _section: number): void {
    let that = this;
    let stageSectionCfg: any = BattleManager.Instance.getBarrierSectionConfig(_stage, _section);
    if (stageSectionCfg) {
      let mBlood: number = MathUtils.parseStringNum(stageSectionCfg["blood"]);
      let mMoney: number = MathUtils.parseStringNum(stageSectionCfg["earnings"]);
      for (let i: number = 1; i < 5; i++) {
        let mId: number = <number>stageSectionCfg["mId" + i];
        let mEnterTime: number = <number>stageSectionCfg["mEnterTime" + i];
        let mNum: number = <number>stageSectionCfg["mNum" + i];
        if (mId > 0) {
          Laya.timer.once(mEnterTime * 1800, that, () => {
            if (HallManager.Instance.hallData.gameStatus < 1 || HallManager.Instance.hallData.monsterArray.length > 10) return;
            for (let k: number = 0; k < mNum; k++) {
              let monsterSp: MonsterSprite = new MonsterSprite();
              monsterSp.setBornDelayFun(that, 1400 * k, () => {
                that.roadView.addChild(monsterSp);
                monsterSp.setKind(mId);
                monsterSp.pos(that.imgBorn.x, that.imgBorn.y + that.imgBorn.height / 2);
                monsterSp.playMoveAction();
                monsterSp.setDropMoney(mMoney); //收集金币
                monsterSp.setDropMoneyFun((dropMoney: number) => {
                  if (dropMoney > 0) {
                    let skyDropBuff: number = BuffController.getInstance().getBuffValueById(BuffSheet.COIN_OBTAIN_INCREASE);
                    let skillBuff: number = userData.getSkillAdditionProbability(10);
                    let resultCoin: number = dropMoney * (1 + skillBuff + skyDropBuff);
                    let txtPos = { x: monsterSp.x - 20, y: monsterSp.y - 50 }
                    let goldImg: Laya.Image = ObjectPool.pop(Laya.Image, "DropImage", "images/core/coin_40x40.png");
                    if (goldImg) {
                      goldImg.zOrder = monsterSp.zOrder - 2;
                      this.roadView.addChild(goldImg);
                      goldImg.pos(txtPos.x, txtPos.y);
                      this.timerOnce(1500, this, () => {
                        M.layer.flyLayer.addChild(goldImg);
                        let endPos: Laya.Point = PointUtils.localToGlobal(this.imgGold);
                        EffectUtils.doGoodsFlyEffect(goldImg, endPos, () => {
                          goldImg.removeSelf();
                          ObjectPool.push(goldImg);
                          that.updateGold(PlayerManager.Instance.Info.userMoney + resultCoin);
                        })
                      })
                    } else {
                      EffectUtils.playImageTextEffect(that.roadView, "images/core/coin_40x40.png", "+" + MathUtils.bytesToSize(resultCoin), txtPos, monsterSp.zOrder + 100);
                      that.updateGold(PlayerManager.Instance.Info.userMoney + resultCoin);
                    }
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
        } else {
          BattleManager.Instance.preloadingNextMonsters(HallManager.Instance.hallData.passStage, HallManager.Instance.hallData.passSection + 1);
          break;
        }
      }
    }
  }

  /** 钻石购买加速 */
  private onDiamondBuyAcce(): void {
    let diamond: number = userData.isEvolution() ? 30 : 60;
    ViewMgr.Ins.open(ViewConst.DiamondBuyView, null, DILOG_TYPE.ACC, diamond);
  }

  private onShowCarport(): void {
    ViewMgr.Ins.open(ViewConst.ShopView);
  }

  //显示签到红点
  private showDailySignRedPoint(_show: boolean = true): void {
    let that = this;
    if (that.btn_sign) {
      let imgRedPoint = that.btn_sign.getChildByName("imgRedPoint") as Laya.Image;
      if (imgRedPoint) {
        imgRedPoint.visible = _show;
      }
    }
  }

  /** 显示强化红点 */
  private showStrengthenRedPoint(show: boolean = true): void {
    let self = this;
    self.strengthenRedPoint.visible = show;
  }

  /** 显示关注奖励红点 */
  private showFollowRewardRedPoint(show: boolean = true): void {
    let self = this;
    if (self.btn_follow) {
      let imgRedPoint = self.btn_follow.getChildByName("imgRedPoint") as Laya.Image;
      if (imgRedPoint) {
        imgRedPoint.visible = show;
      }
    }
  }

  //显示任务红点
  private showTaskRedPoint(_show: boolean = true): void {
    let that = this;
    if (that.btnTask) {
      let imgRedPoint = that.btnTask.getChildByName("imgRedPoint") as Laya.Image;
      if (imgRedPoint) {
        imgRedPoint.visible = _show;
      }
    }
  }

  //显示转盘红点
  private showLuckPrizeRedPoint(_show: boolean = true): void {
    let that = this;
    if (that.btnLuckPrize) {
      let imgRedPoint = that.btnLuckPrize.getChildByName("imgRedPoint") as Laya.Image;
      if (imgRedPoint) {
        imgRedPoint.visible = _show;
      }
    }
  }

  //初始化怪物/跑道
  private initCarUI(): void {
    var that = this;
    if (that.mainView) {
      that.mainView.on(Laya.Event.MOUSE_DOWN, that, (e: Event = null) => {
        //只支持单选
        if (that.curMonsterSprite) return;
        if (that.carparkList) {
          for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
            var element = that.carparkList.getCell(index);
            if (element) {
              let carParkSp = element.getChildByName("car") as MonsterSprite;
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
                } else if (carParkSp.isRunning()) {
                  that.curMonsterSprite = carParkSp;
                } else if (carParkSp.isBox()) {
                  that.curMonsterSprite = carParkSp;
                }
                that.btnDelete.skin = "images/hall/huishou_icon_1.png";
                return;
              }
            }
          }
        }
      });
      that.mainView.on(Laya.Event.MOUSE_MOVE, that, (e: Event = null) => {
        if (that.parkMonsterModelSp) {
          that.parkMonsterModelSp.pos(that.mainView.mouseX, that.mainView.mouseY);
        }
      });
      that.mainView.on(Laya.Event.MOUSE_UP, that, (e: Event = null) => {
        //移除高亮提示
        that.setCarparkLight(null);
        if (that.parkMonsterModelSp && that.curMonsterSprite) {
          if (that.btnDelete && ObjectUtils.isHit(that.btnDelete) && !M.novice.isRunning) {
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
          } else {
            //恢复拖动状态
            that.curMonsterSprite.setStage(1);
            //判断是否合并或交换位置
            if (that.carparkList) {
              let flag: boolean = false;
              for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
                var element = that.carparkList.getCell(index);
                if (element) {
                  let heroItem = element.getChildByName("car") as MonsterSprite;
                  if (heroItem && ObjectUtils.isHit(heroItem) && heroItem != that.curMonsterSprite) {
                    if (!heroItem.isBox() && !heroItem.isLock()) {
                      flag = true;
                      let heroId = heroItem.monsterId;
                      const currHeroLevel: number = BattleManager.Instance.getLevel(heroId);
                      if (that.curMonsterSprite.isSameLevel(heroId)) {
                        //合并
                        if (heroItem.isMaxLevel()) {
                          MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.06"));
                        } else if (currHeroLevel >= EvolutionManager.Instance.getHeroLevel()) { //提示守卫是否可以升级
                          if (currHeroLevel > 10 || userData.isEvolution()) {
                            LevelHeroView.Create(this,
                              (kingLevel: number, money: number) => {
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
                                //移除高亮提示
                                that.setCarparkLight(null);
                              }, () => {
                                that.curMonsterSprite = null;
                              })
                          } else {
                            MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.02"));
                            that.curMonsterSprite = null;
                          }
                        } else { //英雄升级
                          this.handlerHeroLevel(heroItem, heroId, index, currHeroLevel);
                        }
                      } else if (!heroItem.isRunning() && !M.novice.isRunning) {
                        //交换
                        let isEmpty = heroItem.isEmpty();
                        heroItem.setKind(that.curMonsterSprite.monsterId);
                        heroItem.setStage(that.curMonsterSprite.monsterStage);
                        if (isEmpty) {
                          that.curMonsterSprite.clearStage();
                        } else {
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
              if (!flag) {
                that.curMonsterSprite = null;
              }
            }
          }
          //移除模型
          ObjectPool.push(that.parkMonsterModelSp);
          that.parkMonsterModelSp.removeSelf();
          that.btnDelete.skin = "images/hall/huishou_icon_0.png";
        } else if (that.curMonsterSprite && !M.novice.isRunning) {
          //取消选中状态
          if (ObjectUtils.isHit(that.curMonsterSprite)) {
            if (that.curMonsterSprite.isRunning()) {
              that.curMonsterSprite.setStage(1);
              //本地保存
              userData.setCarparkSave(that.curMonsterSprite);

            } else if (that.curMonsterSprite.isBox()) {
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
  private handlerHeroLevel(heroItem, heroId, index, currHeroLevel): void {
    let self = this;
    let nextCardId = heroId + 1;
    userData.statistics.synthesisNum++;
    userData.synthesisCount++;
    //随机奖励
    if (userData.synthesisCount % 28 == 0) {
      let randomNum: number = Math.random();
      if (randomNum < 0.4) {
        self.showRandomDiamondReward();
        heroItem.setKind(nextCardId, index);
      } else {
        let upLevel: number = nextCardId + 2;
        let kingLevel: number = userData.isEvolution() ? userData.getKingLevel() - 30 : userData.getKingLevel();
        let heroLv: number = BattleManager.Instance.getLevel(upLevel);
        if (heroLv > kingLevel) {
          self.showRandomDiamondReward();
          heroItem.setKind(nextCardId, index);
        } else {
          HeroLevelView.Create(self, () => {
            MessageUtils.showMsgTips("升级成功！");
            heroItem.setKind(upLevel, index);
          }, () => {
            MessageUtils.showMsgTips("升级失败！");
            heroItem.setKind(nextCardId, index);
          }, nextCardId, upLevel);
        }
      }
    } else {
      heroItem.setKind(nextCardId, index);
    }
    if (NoviceManager.cache.synthesiseComplete) {
      NoviceManager.cache.synthesiseComplete();
    }
    if (NoviceManager.cache.checkPetSynthesisLevel) {
      NoviceManager.cache.checkPetSynthesisLevel(currHeroLevel + 1);
    }
    if (self.curMonsterSprite) self.curMonsterSprite.clearStage();
    heroItem.playMergeEffetc(self.mainView, heroId);
    //检测等级刷新
    if (userData.updateCarLevel(BattleManager.Instance.getLevel(nextCardId))) {
      //检查商店红点
      if (userData.getCarLevel() == 6) {
        M.hall.resolveShopRedPoint();
      }
      Laya.SoundManager.playSound("musics/unlock.mp3");
    } else {
      Laya.SoundManager.playSound("musics/makecar.mp3");
    }
    //刷新快捷买怪物按钮
    // self.refreshShortcutCreateBtn();
    HallManager.Instance.updateIncomePerSec(HallManager.Instance.getCalculateIncomePerSec(self.carparkList));
    //本地保存
    if (self.curMonsterSprite) userData.setCarparkSave(heroItem, self.curMonsterSprite);
    //任务统计
    // HttpManager.Instance.requestDailyTaskData(1);
    //检查守卫是否可以升级
    self.checkKingIsUpdate();
    self.curMonsterSprite = null;
  }
  /** 随机钻石奖励界面 */
  private showRandomDiamondReward(): void {
    HttpManager.Instance.requestShowRandomRewardDiamond((res) => {
      ViewMgr.Ins.open(ViewConst.AdditionalRewardView, null, res);
    })
  }

  //初始化兵营
  private initCarparkList() {
    var that = this;
    if (userData == null) return;
    var listDatas = userData.parkcarInfoArray;
    that.carparkList.vScrollBarSkin = "";
    that.carparkList.repeatY = HallManager.Instance.hallData.parkMonsterCount / 4;
    that.carparkList.array = listDatas;
    that.carparkList.renderHandler = new Laya.Handler(that, (cell: Laya.Box, index: number) => {
      if (index > that.carparkList.array.length) return;
      let parkcarInfo = listDatas[index];
      let hero = <MonsterSprite>cell.getChildByName("car");
      if (hero) {
        if (parkcarInfo && parkcarInfo.carId > 0) {
          hero.setKind(parkcarInfo.carId, index);
        } else {
          hero.setKind(-1, index);
        }
      }
    });
  }

  /** 更新金币数量 */
  public updateGold(_value: number): void {
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
    EventsManager.Instance.event(EventsType.UPDATE_CURRENCY);
    //刷新快捷买怪物按钮
    that.refreshShortcutCreateBtn(true);
    //本地保存
    userData.setMoney(PlayerManager.Instance.Info.userMoney);
  }

  /** 更新钻石数 */
  public updateDiamond(_value: number): void {
    let that = this;
    PlayerManager.Instance.Info.userDiamond = _value;
    if (that.txtDiamond) {
      that.txtDiamond.changeText(MathUtils.bytesToSize(PlayerManager.Instance.Info.userDiamond).toString());
    }
    EventsManager.Instance.event(EventsType.UPDATE_CURRENCY);
    //本地保存
    userData.setDiamond(PlayerManager.Instance.Info.userDiamond);
  }

  //设置兵营高亮状态
  public setCarparkLight(monsterSp: MonsterSprite = null): void {
    let that = this;
    if (that.carparkList) {
      let monsterId: number = 0;
      if (monsterSp) {
        monsterId = monsterSp.monsterId;
      }
      for (var index = 0; index < HallManager.Instance.hallData.parkMonsterCount; index++) {
        var element = that.carparkList.getCell(index);
        if (element) {
          let carParkSp = element.getChildByName("car") as MonsterSprite;
          if (monsterSp == null && carParkSp) {
            carParkSp.setAlpha(1);
          } else if (carParkSp && carParkSp != monsterSp) {
            if (carParkSp.isSameLevel(monsterId)) {
              carParkSp.setAlpha(1);
            } else {
              carParkSp.setAlpha(0.1);
            }
          }
        }
      }
    }
  }

  //设置关卡
  public setPassStage(_value: number): void {
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
  public setPassSection(_value: number): void {
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
  public setKingLevel(_value: number): void {
    let that = this;
    HallManager.Instance.hallData.userKingLevel = _value;
    if (that.txtKingLevel) {
      that.txtKingLevel.changeText("" + HallManager.Instance.hallData.userKingLevel);
    }
    userData.updateKingLevel(HallManager.Instance.hallData.userKingLevel);
  }

  /** 赠送英雄中 */
  private handlerGiveMonster(): void {
    let self = this;
    //新手关闭赠送
    if (M.novice.isRunning) return;
    HallManager.Instance.hallData.giveMonsterAllTime = 3 * 60 * 60;
    self.imgTrain.visible = HallManager.Instance.hallData.giveMonsterAllTime > 0;
    if (!self.gameTimeImg.visible) EffectUtils.showTrainingTimeEffect(self);
    self.gameTimeImg.visible = self.gameTimebg.visible = self.txtGameTime.visible = true;
    this.frameLoop(1, self, self.doGiveMonster);
  }

  /** 执行赠送英雄 */
  private doGiveMonster(): void {
    let self = this;
    if (HallManager.Instance.hallData.giveMonsterAllTime <= 0) {
      this.clearTimer(self, this.doGiveMonster);
      self._giveCarTime = 0;
      self._giveTempTime = 0;
      self.imgTrain.visible = false;
      self.gameTimeImg.visible = self.gameTimebg.visible = self.txtGameTime.visible = false;
    }
    if (HallManager.Instance.hallData.giveMonsterAllTime > 0) {
      HallManager.Instance.hallData.giveMonsterAllTime--;
      let tempTime: number = Math.floor(HallManager.Instance.hallData.giveMonsterAllTime / 60);
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
      let randCarId: number = 101;
      let dropId: number = 100;
      if (HallManager.Instance.hallData.passStage < 1) { // 1级：掉1级的怪物
        randCarId = 101;
      } else if (HallManager.Instance.hallData.passStage < 8) { // 2-7级：掉落1、2级的怪物
        dropId = userData.isEvolution() ? 1000 : 100;
        randCarId = dropId + MathUtils.rangeInt(1, 2);
      } else { // 8级之后：随机掉落，最小值：当前金币最高解锁的等级-7，最大值=当前最高金币可购买怪物-4。
        let monsterLevel: number = userData.getCarLevel();
        let monsterInfo = BattleManager.Instance.getUnLockMonster(HallManager.Instance.hallData.buyMonsterType, monsterLevel);
        let minId: number = userData.isEvolution() ? 1001 : 101;
        randCarId = MathUtils.rangeInt(Math.max(minId, monsterInfo.id - 6), Math.max(minId, monsterInfo.id - 4));
      }
      let carParkSp: MonsterSprite = BattleManager.Instance.createPet(randCarId, true);
      if (carParkSp) {
        carParkSp.dropBoxEffect(self.mainView);
      }
    }
    self._giveCarTime++;
  }

  /** 检查守护是否可以升级 */
  private checkKingIsUpdate(): void {
    let self = this;
    self.kingUpdateImg.visible = EvolutionManager.Instance.canEvolutionUpgrade();
  }

  //显示通关结果(_isManual:手动调用)
  public showPassStageResult(_stage: number, _callback: any = null, _isManual: boolean = false): void {
    let that = this;
    if (M.novice.isRunning) return;
    if (_stage > 0) { //通关陈功
      ResultView.Create((_nodeView: ResultView) => {
        if (_nodeView) {
          if (_stage > 0) {
            if (_isManual == false) {
              HallManager.Instance.hallData.stagePrizeList.push(_stage);
              //只取最近5条
              if (HallManager.Instance.hallData.stagePrizeList.length > 5) {
                HallManager.Instance.hallData.stagePrizeList.shift();
              }
              if (that.btnStagePrize) {
                let isShow: boolean = HallManager.Instance.hallData.stagePrizeList
                  && HallManager.Instance.hallData.stagePrizeList.length > 0
                  && HallManager.Instance.hallData.stagePrizeList[0] > 0;
                that.showStagePrize(isShow);
              }
            }
            if (that.btnStagePrize && HallManager.Instance.hallData.stagePrizeList.length > 0) {
              _nodeView.showPrizeUI(HallManager.Instance.hallData.stagePrizeList, (lastStage: number) => {
                if (that.btnStagePrize) {
                  that.showStagePrize(HallManager.Instance.hallData.stagePrizeList.length > 0);
                }
                if (userData) {
                  //显示获得的奖品
                  let stagePrizeCfg: any = GlobleData.getData(GlobleData.BarrierRewardVO, lastStage);
                  if (stagePrizeCfg) {
                    //发送奖励
                    let bossM: number = MathUtils.parseStringNum(stagePrizeCfg.bossM);
                    let gold: number = BattleManager.Instance.getBarrierRewardToGold(lastStage, MathUtils.parseStringNum(stagePrizeCfg.gold));
                    let gem: number = MathUtils.parseStringNum(stagePrizeCfg.gem);
                    HttpManager.Instance.requestStagePrizeDiamond(lastStage, gem, bossM, (_res: any) => {
                      let stage = _res as number;
                      if (stage > 0) {
                        _nodeView.removeSelf();
                        ViewMgr.Ins.open(ViewConst.ClearanceRewardView, () => {
                          if (that.btnStagePrize.visible) {
                            if (HallManager.Instance.hallData.stagePrizeList.length > 0) {
                              that.showPassStageResult(HallManager.Instance.hallData.passStage, null, true);
                            } else {
                              that.showStagePrize(HallManager.Instance.hallData.stagePrizeList.length > 0);
                            }
                          }
                        }, stage, false);
                        HttpManager.Instance.requestDiamondData();
                        HttpManager.Instance.requestEssenceData();
                      }
                    });
                    if (gold > 0) {//金币礼包
                      that.updateGold(PlayerManager.Instance.Info.userMoney + gold);
                    }
                  }
                }
              });
            }
          }
        }
      }, _callback, _stage);
    } else {    //通关失败
      ClearanceFail.Create(that, null, _callback);
    }
  }

  //任务界面
  public showTaskView(): void {
    ViewMgr.Ins.open(ViewConst.TaskView);
  }

  //幸运抽奖界面
  public showLuckPrizeView(): void {
    ViewMgr.Ins.open(ViewConst.LuckPrizeView);
  }

  //怪物储存箱
  private onCarStore(): void {
    const store: number[] = M.hall.hallData.monsterStore;
    if (store && store.length) {
      const id: number = store.shift();
      if (id && id > 0) {
        M.battle.createPet(id);
      }
    }
    this.carStoreBtnEnabled();
  }

  private carStoreBtnEnabled(): void {
    if (this.btnCarStore) {
      this.btnCarStore.visible = M.hall.hallData.monsterStore.length > 0;
    }
  }

  //保存英雄到本地
  public saveCarStore(heroId: number): void {
    if (heroId && heroId > 0) {
      M.hall.hallData.monsterStore.push(heroId);
      userData.cache.setCache(CacheKey.PET_STORE, M.hall.hallData.monsterStore);
      this.carStoreBtnEnabled();
    }
  }

  //显示加速效果
  public playAcceEffectView(acceTime: number = 120, isEffect: boolean = true): void {
    let that = this;
    if (HallManager.Instance.hallData.userAcceTime > 1) {
      HallManager.Instance.hallData.userAcceTime += acceTime;
      return;
    }
    HallManager.Instance.hallData.userAcceTime += acceTime;
    if (isEffect) {
      let boneName: string = userData.isEvolution() ? "fennu2" : "fennu1";
      let bone: BoneAnim = new BoneAnim(boneName);
      bone.completeBack = () => {
        bone.destroy();
      }
      AlignUtils.setToScreenGoldenPos(bone);
      M.layer.screenEffectLayer.addChild(bone);
    }
    //加速开始
    that.setCarAcce(2);
    that.refreshAcceTime();
    this.timerLoop(1000, this, this.refreshAcceTime);
    Laya.SoundManager.playSound("musics/accecar.mp3");

  }

  /** 刷新加速时间 */
  private refreshAcceTime(): void {
    let that = this;
    //显示倒计时
    if (that.btnAcce) {
      let imgAcce = that.btnAcce.getChildByName("imgAcce") as Laya.Image;
      if (imgAcce) {
        this.imgAccIcon.visible = false;
        imgAcce.visible = true;
        let txtAcceTime = imgAcce.getChildByName("txtAcceTime") as Laya.Label;
        if (txtAcceTime) {
          let minute = Math.floor(HallManager.Instance.hallData.userAcceTime / 60);
          let sec = HallManager.Instance.hallData.userAcceTime % 60;
          txtAcceTime.text = (minute < 10 ? ("0" + minute) : minute) + ":" + (sec < 10 ? ("0" + sec) : sec);
        }
      }
      that.btnAcce.mouseEnabled = false;
    }
    let time: number = M.hall.hallData.userAcceTime;
    if (time > 0) {
      M.hall.hallData.userAcceTime = --time;
      userData.cache.setCache(CacheKey.ACCELERATE_SEC_REMAINING, time);
    } else {
      that.setCarAcce(1);
      this.clearTimer(this, this.refreshAcceTime);
      if (that.btnAcce) {
        let imgAcce = that.btnAcce.getChildByName("imgAcce") as Laya.Image;
        if (imgAcce) {
          imgAcce.visible = false;
        }
        that.btnAcce.mouseEnabled = true;
        this.imgAccIcon.visible = true;
        if (M.player.Info.freeAcc > 0) {
          this.imgAccIcon.skin = "images/core/red_dot_hint.png";
        } else if (userData.getAdTimes(10) > 0) {
          this.imgAccIcon.skin = "images/core/video_icon.png";
        } else if (userData.getShareTimes(10) > 0) {
          this.imgAccIcon.skin = "images/core/fenxiang_icon.png";
        } else {
          this.imgAccIcon.visible = false;
        }
      }
      userData.cache.removeCache(CacheKey.ACCELERATE_SEC_REMAINING);
      return;
    }
    //金币雨
    if (HallManager.Instance.hallData.userAcceTime > 0) {
      EffectUtils.playCoinRainEffect("images/core/coin_40x40.png");
    }
  }

  public setCarAcce(_acceValue: number): void {
    let self = this;
    HallManager.Instance.hallData.userAcceValue = _acceValue;
    //精灵加速
    BattleManager.Instance.doPetAccelerate(self.carparkList);
    //怪物加速
    BattleManager.Instance.doMonsterAccelerate();
    //更新每秒收益
    HallManager.Instance.updateIncomePerSec(HallManager.Instance.getCalculateIncomePerSec(self.carparkList));
  }

  /** 关卡BOSS出现的特效 */
  public playBossEnterEffect(): void {
    let self = this;
    // 加载动画图集,加载成功后执行回调方法
    let aniPath: string = "bossEnter";
    let aniInterval: number = 120;
    let frameCount: number = 9;
    if (self._showBossIcon == null) {
      self._showBossIcon = Laya.Pool.getItemByClass(userData.ANIMATION_POOL_NAME, Laya.Animation);
      LayerManager.getInstance().screenEffectLayer.addChild(self._showBossIcon);
      let aniKey: string = "dx_bosslx_";
      let aniAtlas: string = PathConfig.EffectUrl.replace("{0}", aniPath);
      self._showBossIcon.loadAtlas(aniAtlas, Handler.create(self, () => {
        //创建动画模板dizziness
        Laya.Animation.createFrames(AnimationUtils.aniUrls(aniKey, frameCount, aniPath + "/"), aniPath);
        //设置坐标
        let aniGraphics = self._showBossIcon.frames[1] as Laya.Graphics;
        if (aniGraphics) {
          let aniBounds = aniGraphics.getBounds() as Laya.Rectangle;
          self._showBossIcon.pos((LayerManager.stageDesignWidth - aniBounds.width) / 2, LayerManager.stageDesignWidth * 0.35 - aniBounds.height * 0.5);
        }
        self._showBossIcon.interval = aniInterval;
        self._showBossIcon.play(0, false, aniPath);
      }));
    } else {
      self._showBossIcon.visible = true;
      self._showBossIcon.play(0, false, aniPath);
    }
    self._showBossIcon.timerOnce(aniInterval * frameCount, self, () => {
      self._showBossIcon.stop();
      self._showBossIcon.visible = false;
    });
  }

  /** king升级特效 */
  public playKingUpdateEffect(): void {
    let that = this;
    if (that.spMountGuard == null) return;
    let aniPath: string = "kingUpdate";
    let poolData = ObjectPool.popObj(Laya.Animation, aniPath);
    let monsterAni: Laya.Animation = poolData.obj;
    that.spMountGuard.addChild(monsterAni);
    let aniInterval: number = 120;
    let frameCount: number = 5;
    if (!poolData.isPool) {
      // 加载动画图集,加载成功后执行回调方法
      let aniKey: string = "sj_";
      let aniAtlas: string = PathConfig.EffectUrl.replace("{0}", aniPath);
      monsterAni.loadAtlas(aniAtlas, Handler.create(that, () => {
        //创建动画模板dizziness
        Laya.Animation.createFrames(AnimationUtils.aniUrls(aniKey, frameCount, aniPath + "/"), aniPath);
        //设置坐标
        let aniGraphics = monsterAni.frames[1] as Laya.Graphics;
        if (aniGraphics) {
          let aniBounds = aniGraphics.getBounds() as Laya.Rectangle;
          monsterAni.pos(-aniBounds.width * 0.4, -aniBounds.height * 0.6);
        }
        monsterAni.interval = aniInterval;
        monsterAni.play(0, false, aniPath);
      }));
    } else {
      //设置坐标
      let aniGraphics = monsterAni.frames[1] as Laya.Graphics;
      if (aniGraphics) {
        let aniBounds = aniGraphics.getBounds() as Laya.Rectangle;
        monsterAni.pos(-aniBounds.width * 0.4, -aniBounds.height * 0.6);
      }
      monsterAni.play(0, false, aniPath);
    }
    monsterAni.timerOnce(aniInterval * frameCount, that, () => {
      monsterAni.removeSelf();
      ObjectPool.push(monsterAni);
    });
  }

  /** 更新转盘红点 */
  private onUpdatePrizeRedPoint($data: any): void {
    let self = this;
    if ($data == "show") {
      self.showLuckPrizeRedPoint();
    } else {
      self.showLuckPrizeRedPoint(false);
    }
  }

  /** 更新任务红点 */
  private onUpdateTaskRedPoint($data: any): void {
    let self = this;
    if ($data == "show") {
      self.showTaskRedPoint();
    } else {
      self.showTaskRedPoint(false);
    }
  }

  /** 更新签到红点 */
  private onUpdateSignRenPoint($data: any): void {
    let self = this;
    if ($data == "show") {
      self.showDailySignRedPoint();
    } else {
      self.showDailySignRedPoint(false);
    }
    self.menuRedPointIsShow();
  }

  /** 更新强化红点 */
  private onUpdateStrengthenRedPoint($data: any): void {
    let self = this;
    if ($data == "show") {
      self.showStrengthenRedPoint();
    } else {
      self.showStrengthenRedPoint(false);
    }
  }

  /** 更新关注红点 */
  private onFollowRewardRedPoint($data: any): void {
    let self = this;
    if ($data == "show") {
      self.showFollowRewardRedPoint();
    } else {
      self.showFollowRewardRedPoint(false);
    }
    self.menuRedPointIsShow();
  }

  /** 更新好友互助红点 */
  private onFriendConcurRedPoint($data: any): void {
    let self = this;
    if ($data == "show") {
      self.showFriendConcurRedPoint();
    } else {
      self.showFriendConcurRedPoint(false);
    }
    self.menuRedPointIsShow();
  }

  /** 显示好友互助红点 */
  private showFriendConcurRedPoint(show: boolean = true): void {
    let self = this;
    if (self.btn_concur) {
      let imgRedPoint = self.btn_concur.getChildByName("imgRedPoint") as Laya.Image;
      if (imgRedPoint) {
        imgRedPoint.visible = show;
      }
    }
  }

  /** 更新福利红点 */
  private onEveryDayRewardRedPoint($data: any): void {
    let self = this;
    if ($data == "show") {
      self.showEveryDayRewardRedPoint();
    } else {
      self.showEveryDayRewardRedPoint(false);
    }
    self.isShowWelfareBtn();
    self.menuRedPointIsShow();
  }

  /** 显示每日福利红点 */
  private showEveryDayRewardRedPoint(show: boolean = true): void {
    let self = this;
    if (self.btn_welfare) {
      let imgRedPoint = self.btn_welfare.getChildByName("imgRedPoint") as Laya.Image;
      if (imgRedPoint) {
        imgRedPoint.visible = show;
      }
    }
  }

  private isShowWelfareBtn(): void {
    let self = this;
    if (userData.isShowEveryDayRewardRedPoint()) {
      self.btn_ranking.visible = false;
      self.btn_welfare.visible = true;
    } else {
      self.btn_ranking.visible = true;
      self.btn_welfare.visible = false;
    }
  }

  /** 菜单红点是否显示 */
  private menuRedPointIsShow(): void {
    let self = this;
    self.menuRedPoint.visible = userData.menuRedPointCount > 0;
  }

  /** 刷新金币 */
  private onRefreshGold(): void {
    let self = this;
    self.updateGold(M.player.Info.userMoney);
  }

  /** 刷新钻石 */
  private onRefreshDiamond($data: any): void {
    let self = this;
    if ($data && $data.diamond) {
      self.updateDiamond($data.diamond);
    } else {
      self.updateDiamond(M.player.Info.userDiamond);
    }
  }

  /** 游戏加速 */
  private onGameAccelerate(): void {
    let self = this;
    if (GlobalConfig.DEBUG) {
      self.playAcceEffectView();
    } else {
      if (PlayerManager.Instance.Info.freeAcc > 0) {
        self.playAcceEffectView();
        PlayerManager.Instance.Info.freeAcc--;
        HttpManager.Instance.requestShareAdFinish("free_acce");
      } else {
        //显示广告
        let adStage = userData.toShareAd(() => {
          self.playAcceEffectView();
        }, 10, false, true);
        //无分享广告则显示钻石购买
        if (adStage > 0) {
          self.onDiamondBuyAcce();
        }
      }
    }
  }

  /** 战斗通过 */
  private onBattleClearanc(): void {
    let self = this;
    if (HallManager.Instance.hallData.passSection >= HallManager.Instance.hallData.maxSection) {
      self.showPassStageResult(HallManager.Instance.hallData.passStage);
      userData.setUserCloudStorage();//上传腾讯云
    } else if (HallManager.Instance.hallData.passSection >= (HallManager.Instance.hallData.maxSection - 1)) {
      self.timerOnce(600, self, self.playBossEnterEffect);//是否进入boss关
    }
    self.timerOnce(2000, self, () => {
      HallManager.Instance.hallData.gameStatus = 1;
      //过关
      let curSection: number = HallManager.Instance.hallData.passSection;
      if (curSection < HallManager.Instance.hallData.maxSection) {
        curSection++;
      } else {
        curSection = 1;
        self.setPassStage(HallManager.Instance.hallData.passStage + 1);
        //查询是否有成就任务完成
        HallManager.Instance.checkIsGetAchievementReward();
      }
      self.setPassSection(curSection);
      //创建怪物
      self.createMonster(HallManager.Instance.hallData.passStage, HallManager.Instance.hallData.passSection);
    });
  }

  /** 战斗没有通过 */
  private onBattleNoClearanc(): void {
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
  private _isShowMenu: boolean = true;
  private onClickMenuHandler(): void {
    let self = this;
    if (self._isShowMenu) {
      self.showMenu(false);
    } else {
      self.showMenu(true);
    }
  }

  private showMenu(isShowMenu: boolean): void {
    let self = this;
    self.btn_arrow.mouseEnabled = false;
    if (isShowMenu) {//显示
      self._isShowMenu = true;
      Laya.Tween.to(self.menuBox, { left: 0 }, 350, null, Laya.Handler.create(self, () => {
        Laya.Tween.clearTween(self.menuBox);
        self.btn_arrow.mouseEnabled = true;
        self.btn_arrow.scaleX = 1;
      }, null, true));
    } else {//隐藏
      self._isShowMenu = false;
      Laya.Tween.to(self.menuBox, { left: -390 }, 350, null, Laya.Handler.create(self, () => {
        Laya.Tween.clearTween(self.menuBox);
        self.btn_arrow.mouseEnabled = true;
        self.btn_arrow.scaleX = -1;
      }, null, true));
    }
  }

  /** 好友互助 */
  public onClickConcur(): void {
    ViewMgr.Ins.open(ViewConst.FriendConcurView);
  }

  /** 关注 */
  public onClickFollow(): void {
    ViewMgr.Ins.open(ViewConst.FollowRewardView);
  }

  //每日签到界面
  public showDaySignView(): void {
    const that = this;
    DaySignView.Create(Laya.Handler.create(this, (view: DaySignView) => {
      if (view) {
        view.on(DaySignView.REMOVE_FROM_STAGE, this, () => {
          resolveDailyPrizeVisible();
        });
      }
      resolveDailyPrizeVisible();
      function resolveDailyPrizeVisible(): void {
        // if (DaySignView.signData) {
        //   that.btnDailyPrize.visible = DaySignView.signData.sign.status === 0;
        // } else {
        //   that.btnDailyPrize.visible = true;
        // }
      }
    }));
  }

  //排行
  private onRanking(): void {
    let self = this;
    RankingView.Create(() => {
      self.showSurpassView();
    });
  }

  /** 更新在线奖励时间 */
  private _diamondTime: number = 0;
  private updateDiamondTime(time: number): void {
    let self = this;
    self._diamondTime = time;
    if (userData.offlineRewardCount > 0) {
      if (self._diamondTime > 0) {
        self.txt_diamondTime.text = TimeUtil.S2H(self._diamondTime, ":", false);
        this.timerLoop(1000, self, self.onUpdateTime);
      } else if (self._diamondTime <= 0) {
        self.txt_diamondTime.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.28");
      }
    } else {
      self.txt_diamondTime.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.29");
    }
  }

  private onUpdateTime(): void {
    let self = this;
    if (self._diamondTime > 0) {
      self._diamondTime -= 1000;
      self.txt_diamondTime.text = TimeUtil.S2H(self._diamondTime, ":", false);
    } else {
      this.clearTimer(self, self.onUpdateTime);
      self.txt_diamondTime.text = LanguageManager.Instance.getLanguageText("hallScene.label.txt.28");
    }
  }

  /** 领取在线奖励 */
  private onGetOffLineReward(): void {
    let self = this;
    if (self._diamondTime < 1 && userData.offlineRewardCount > 0) {
      HttpManager.Instance.requestGetOffLineReward((res) => {
        ViewMgr.Ins.open(ViewConst.RewardGetView, () => {
          M.layer.screenEffectLayer.addChild(new FlyEffect().play("diamond", LayerManager.mouseX, LayerManager.mouseY, 38, 83));
          MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.20", "钻石", res.diamond));
          EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, { diamond: M.player.Info.userDiamond = res.total_diamond });
          userData.offlineRewardCount = res.remain_online_num;
          self.updateDiamondTime(HallManager.Instance.hallData.offlineTotalTime);
        }, [res.diamond], [2])
      })
    } else {
      if (userData.offlineRewardCount <= 0) {
        MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.30"));
      } else {
        MessageUtils.showMsgTips(LanguageManager.Instance.getLanguageText("hallScene.label.txt.27"));
      }
    }
  }

  private onShowWelfareView(): void {
    ViewMgr.Ins.open(ViewConst.WelfareView);
  }

  private onShowInvitation(): void {
    ViewMgr.Ins.open(ViewConst.InvitationView);
  }

}