/*
* TER0807-任务界面;
*/
class TaskView extends BaseView {

    private _tabGroup: TabGroup;

    constructor() {
        super(LAYER_TYPE.FRAME_LAYER, ui.task.TaskViewUI);
        this.setResources(["quest", "component"])
    }

    //初始化
    public initData(): void {
        super.initData();
        var self = this;
        SDKManager.Instance.showBannerAd();
        self._tabGroup = new TabGroup(this.ui.tabGroup._childs);
        this._tabGroup.on(Laya.Event.CHANGE, this, this.onTabChange);
        self._tabGroup.selectedIndex = QuestSubView.DAILY_QUEST;
    }

    public addEvents(): void {
        super.addEvents();
        this.ui.btnExit.on(Laya.Event.CLICK, this, this.onClickExit);
        this.ui.blankView.on(Laya.Event.CLICK, this, this.onClickExit);
    }

    public removeEvents(): void {
        super.removeEvents();
        this.ui.btnExit.off(Laya.Event.CLICK, this, this.onClickExit);
        this.ui.blankView.off(Laya.Event.CLICK, this, this.onClickExit);
        this._tabGroup.off(Laya.Event.CHANGE, this, this.onTabChange);
    }

    private onTabChange(): void {
        const index: number = this._tabGroup.selectedIndex;
        this.ui.viewStackTask.selectedIndex = index;
        if (index == QuestSubView.DAILY_QUEST) {//每日任务
            M.http.requestTaskInfo(Laya.Handler.create(this, (list)=>{
                this.refreshTaskList(list);
            }))
        } else {//成就任务
            HttpManager.Instance.requestAchievementInfo((res) => {
                this.refreshAchievementList(res);
            });
        }
    }

    private updateTabRetDot(subViewType: number, isShow: boolean) {
        const redDot: Laya.Image = this._tabGroup.getButtonByIndex(subViewType).getChildByName("imgRetDotHint") as Laya.Image;
        redDot && (redDot.visible = isShow);
    }

    /** 每日任务 */
    private refreshTaskList(_data: any) {
        if (_data == null) return;
        let self = this;
        let listData: any[] = _data;
        let redPointNum = 0;
        listData.sort((pre, next): number => {
            if (pre.task_status !== next.task_status) {
                return next.task_status - pre.task_status;
            }
            return pre.id - next.id;
        });
        listData.forEach((data, index, list) => {
            redPointNum += (data.task_status === 1 ? 1 : 0);
        });
        this.updateTabRetDot(QuestSubView.DAILY_QUEST, redPointNum > 0);
        if (listData.length <= 0) {
            this.ui.viewStackTask.selectedIndex = QuestSubView.EMPTY_QUEST;
            return;
        }
        self.ui.taskItemList.vScrollBarSkin = '';
        self.ui.taskItemList.repeatY = 4;
        self.ui.taskItemList.array = listData;
        self.ui.taskItemList.refresh();
        self.ui.taskItemList.renderHandler = new Laya.Handler(self, (cell: Laya.Box, index: number) => {
            if (index > listData.length) return;
            let item = listData[index];
            if (!item) return;
            let itemTitle: string = item.title;
            let awardNum: number = item.reward || 0;
            let totalNum: number = item.num || 0;
            let finishNum: number = item.task_num || 0;
            let boxStage = item.task_status;
            let txtTitle = cell.getChildByName('txtTitle') as Laya.Label;
            if (txtTitle) {
                if (finishNum > totalNum) {
                    finishNum = totalNum;
                }
                txtTitle.changeText(itemTitle + ' (' + finishNum + '/' + totalNum + ')');
            }
            const imgAwardIcon: Laya.Image = cell.getChildByName('imgAwardIcon') as Laya.Image;
            if (imgAwardIcon) {
                switch (item.reward_type) {
                    case "essence":
                        imgAwardIcon.skin = "images/core/essence.png";
                        break;
                    default:
                        imgAwardIcon.skin = "images/core/diamond.png";
                        break;
                }

                const txtDiamond = cell.getChildByName('txtDiamond') as Laya.Label;
                if (txtDiamond) {
                    txtDiamond.changeText('' + awardNum);
                }
            }
            //领取
            let btnGet = cell.getChildByName('btnGet') as Laya.Button;
            if (btnGet) {
                btnGet.visible = true;
                if (boxStage > 0) {
                    if (boxStage > 1) {
                        //已领取
                        btnGet.visible = false;
                    } else {
                        btnGet.disabled = false;
                        btnGet.offAll(Laya.Event.CLICK);
                        btnGet.on(Laya.Event.CLICK, btnGet, (_item: any, _btnObj: Laya.Button) => {
                            // console.log("领取奖励")
                            HttpManager.Instance.requestTaskReward(_item.id, (_res: any) => {
                                if (_res) {
                                    if (_res.code === 1) {
                                        MessageUtils.showMsgTips("奖励领取成功");
                                        MessageUtils.shopMsgByObj(btnGet, "+" + awardNum, EFFECT_TYPE.DIAMOND);
                                        EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, _res);
                                        _btnObj.visible = false;
                                        _item.task_status = 2;
                                        redPointNum--;
                                        this.updateTabRetDot(QuestSubView.DAILY_QUEST, redPointNum > 0);
                                        if (redPointNum < 1) {
                                            if (userData) {
                                                userData.removeTaskRedPoint();
                                            }
                                        }

                                        Laya.Tween.to(cell, { x: -cell.displayWidth }, 200, Laya.Ease.quadOut, Handler.create(self, () => {
                                            listData.splice(index, 1);

                                            M.http.requestTaskInfo(Laya.Handler.create(this, (list)=>{
                                                this.refreshTaskList(list);
                                            }))

                                        }));
                                    } else if (_res.code === 2) {
                                        MessageUtils.showMsgTips("领取失败！");
                                    }
                                }
                            }, 1);
                        }, [item, btnGet]);
                    }
                } else {
                    btnGet.disabled = true;
                }
            }
        });
    }

    /** 成就任务 */
    private refreshAchievementList(data: any) {
        if (data == null) return;
        let self = this;
        let listData: any[] = data;
        let redPointNum = 0;
        //task_status 0为完成  1可领取 2已领取
        listData.sort((pre, next): number => {
            if (pre.task_status !== next.task_status) {
                return next.task_status - pre.task_status;
            }
            return pre.id - next.id;
        });
        listData.forEach((data, index, list) => {
            redPointNum += (data.task_status === 1 ? 1 : 0);
        });
        this.updateTabRetDot(QuestSubView.ACHIEVE_QUEST, redPointNum > 0);
        if (listData.length <= 0) {
            this.ui.viewStackTask.selectedIndex = QuestSubView.EMPTY_QUEST;
            return;
        }
        self.ui.achiItemList.vScrollBarSkin = '';
        self.ui.achiItemList.repeatY = 4;
        self.ui.achiItemList.array = listData;
        self.ui.achiItemList.refresh();
        self.ui.achiItemList.renderHandler = new Laya.Handler(self, (cell: Laya.Box, index: number) => {
            if (index > listData.length) return;
            let item = listData[index];
            if (!item) return;
            let itemTitle: string = item.title;
            let awardNum: number = item.reward || 0;
            let totalNum: number = item.num || 0;
            let finishNum: number = item.task_num || 0;
            let boxStage = item.task_status;
            let txtTitle = cell.getChildByName('txtTitle') as Laya.Label;
            if (txtTitle) {
                txtTitle.changeText(itemTitle);
            }
            let txtNum = cell.getChildByName('txtNum') as Laya.Label;
            if (txtNum) {
                if (finishNum > totalNum) {
                    finishNum = totalNum;
                }
                if (item.category == 19) {//世界排名特殊处理
                    if (item.task_status == 0) {
                        txtNum.changeText('(' + 0 + '/' + 1 + ')');
                    } else if (item.task_status == 1) {
                        txtNum.changeText('(' + 1 + '/' + 1 + ')');
                    }
                } else {
                    txtNum.changeText('(' + finishNum + '/' + totalNum + ')');
                }
            }
            const imgAwardIcon: Laya.Image = cell.getChildByName('imgAwardIcon') as Laya.Image;
            if (imgAwardIcon) {
                const txtDiamond = cell.getChildByName('txtDiamond') as Laya.Label;
                switch (item.reward_type) {
                    case "money":
                        imgAwardIcon.skin = "images/core/coin_40x40.png";
                        awardNum = this.getGold() * awardNum;
                        if (txtDiamond) {
                            txtDiamond.changeText('' + MathUtils.bytesToSize(awardNum));
                        }
                        break;
                    default:
                        imgAwardIcon.skin = "images/core/diamond.png";
                        if (txtDiamond) {
                            txtDiamond.changeText('' + awardNum);
                        }
                        break;
                }
            }
            //领取
            let btnGet = cell.getChildByName('btnGet') as Laya.Button;
            if (btnGet) {
                btnGet.visible = true;
                if (boxStage > 0) {
                    if (boxStage > 1) {
                        //已领取
                        btnGet.visible = false;
                    } else {
                        btnGet.disabled = false;
                        btnGet.offAll(Laya.Event.CLICK);
                        btnGet.on(Laya.Event.CLICK, btnGet, (_item: any, _btnObj: Laya.Button) => {
                            // console.log("领取奖励")
                            HttpManager.Instance.requestTaskReward(_item.id, (res: any) => {
                                if (res) {
                                    if (res.code == 1) {
                                        ViewMgr.Ins.close(ViewConst.AchiRewardView);
                                        MessageUtils.showMsgTips("奖励领取成功");
                                        if (item.reward_type == "money") {
                                            MessageUtils.shopMsgByObj(btnGet, "+" + MathUtils.bytesToSize(awardNum), EFFECT_TYPE.GOLD);
                                            LayerMgr.Ins.addToLayer(new FlyEffect().play("rollingCoin", LayerManager.mouseX, LayerManager.mouseY), LAYER_TYPE.SCREEN_EFFECT_LAYER);
                                            EventsManager.Instance.event(EventsType.GOLD_CHANGE, { money: M.player.Info.userMoney += awardNum });
                                        } else {
                                            MessageUtils.shopMsgByObj(btnGet, "+" + awardNum, EFFECT_TYPE.DIAMOND);
                                            LayerMgr.Ins.addToLayer(new FlyEffect().play("diamond", LayerManager.mouseX, LayerManager.mouseY), LAYER_TYPE.SCREEN_EFFECT_LAYER);
                                            EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, res);
                                        }
                                        _btnObj.visible = false;
                                        _item.task_status = 2;
                                        redPointNum--;
                                        this.updateTabRetDot(QuestSubView.ACHIEVE_QUEST, redPointNum > 0);
                                        if (redPointNum < 1) {
                                            if (userData) {
                                                userData.removeTaskRedPoint();
                                            }
                                        }
                                        Laya.Tween.to(cell, { x: -cell.displayWidth }, 250, Laya.Ease.quadOut, Handler.create(self, () => {
                                            listData.splice(index, 1);
                                            Laya.timer.once(100, self, () => {
                                                HttpManager.Instance.requestAchievementInfo((res) => {
                                                    this.refreshAchievementList(res);
                                                });
                                            })
                                        }));
                                    } else if (res.code == 2) {
                                        MessageUtils.showMsgTips("领取失败！");
                                    }
                                }
                            }, 2);
                        }, [item]);
                    }
                } else {
                    btnGet.disabled = true;
                }
            }
        });
    }

    private getGold(): number {
        let monsterType: number = userData.isEvolution() ? 2 : 1;
        let monsterInfo = BattleManager.Instance.getUnLockMonster(monsterType, userData.getCarLevel());
        if (monsterInfo) {
            let curPrice = BattleManager.Instance.getMonsterPrice(monsterInfo.buyPrice, userData.queryBuyRecord(monsterInfo.id));
            return curPrice;
        }
        return 0;
    }

    private onClickExit(): void {
        ViewMgr.Ins.close(ViewConst.TaskView);
    }
}

enum QuestSubView {
    /** 每日任务 */
    DAILY_QUEST = 0,
    /** 成就任务 */
    ACHIEVE_QUEST = 1,
    /** 空任务 */
    EMPTY_QUEST = 2,
}
