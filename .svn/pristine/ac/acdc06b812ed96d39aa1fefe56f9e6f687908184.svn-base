/*
* TER0807-任务界面;
*/
class TaskView extends ui.task.TaskViewUI {

    static questData: any = null;
    static inviteData: any = null;

    private _tabGroup: TabGroup;

    constructor(_isTask: boolean) {
        super();

        var that = this;
        that.frameOnce(1, that, () => {
            that.visible = true;
            that.init(_isTask);
        });
        that.visible = false;
    }
    //新建并添加到节点
    static Create(_parentNode: Laya.Node, _callback: any = null, _isTask: boolean = false): void {
        let resList = [
            { url: "res/atlas/images.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/images/quest.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/images/component.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            let viewTag = _isTask ? "taskView" : "shareGiftView";
            if (_parentNode) {
                let nodeViewOld = _parentNode.getChildByName(viewTag);
                if (nodeViewOld) {
                    return
                }
            } else {
                let nodeView = new TaskView(_isTask);
                nodeView.name = viewTag;
                M.layer.frameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, _callback);
            }
        }));
    }

    //初始化
    private init(_isTask: boolean): void {
        var that = this;
        //按钮事件
        that.btnExit.on(Laya.Event.CLICK, that, that.onClickExit);
        that.blankView.on(Laya.Event.CLICK, that, that.onClickExit);

        that._tabGroup = new TabGroup(that.tabGroup._childs);
        that._tabGroup.on(Laya.Event.CHANGE, that, that.onTabChange);

        that._tabGroup.selectedIndex = _isTask ? QuestSubView.DAILY_QUEST : QuestSubView.INVITE_AWARD;
    }
    private onClickExit(): void {
        this.removeSelf();
    }

    private onTabChange(selectedIndex?: number): void {
        const index: number = this._tabGroup.selectedIndex;
        this.viewStackTask.selectedIndex = index;

        if (index === QuestSubView.DAILY_QUEST) {
            this.requestTaskInfo();
        } else if (index === QuestSubView.INVITE_AWARD) {
            this.requestShareInfo();
        }
    }

    private updateTabRetDot(subViewType: number, isShow: boolean) {
        const redDot: Laya.Image = this._tabGroup.getButtonByIndex(subViewType).getChildByName("imgRetDotHint") as Laya.Image;
        redDot && (redDot.visible = isShow);
    }

    //初始化list
    //任务
    private refreshTaskList(_data: any) {
        if (_data == null) {
            return
        }
        let that = this;
        let listData: any[] = _data; // [1,3,5,7,8,10];
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
            this.viewStackTask.selectedIndex = QuestSubView.EMPTY_QUEST;
            return;
        }

        that.taskItemList.vScrollBarSkin = '';
        that.taskItemList.repeatY = 5;
        that.taskItemList.array = listData;
        that.taskItemList.renderHandler = new Laya.Handler(that, (cell: Laya.Box, index: number) => {
            if (index > listData.length) {
                return;
            }
            // console.log(cell, index);
            let item = listData[index];
            if (!item) {
                return;
            }
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
                        // btnGet.disabled = true;
                        // btnGet.text.changeText("已领取");
                        btnGet.visible = false;
                    } else {
                        btnGet.disabled = false;
                        // btnGet.text.changeText("领取");
                        // btnGet.mouseEnabled = true;
                        btnGet.offAll(Laya.Event.CLICK);
                        btnGet.on(Laya.Event.CLICK, btnGet, (_item: any, _btnObj: Laya.Button) => {
                            // console.log("领取奖励")
                            that.requestTaskPrize(_item.id, (_res: any) => {
                                if (_res) {
                                    if (_res.code === 1) {
                                        CommonFun.showTip("奖励领取成功");
                                        EffectUtils.tipsLabelByObject(btnGet, "+" + awardNum, EFFECT_TYPE.DIAMOND);
                                        // userData.requestDiamondData();
                                        if (EventsManager.Instance) {
                                            EventsManager.Instance.event(EventsType.DIAMOND_CHANGE, _res);
                                        }

                                        _btnObj.visible = false;
                                        _item.task_status = 2;

                                        redPointNum--;

                                        this.updateTabRetDot(QuestSubView.DAILY_QUEST, redPointNum > 0);
                                        if (redPointNum < 1) {
                                            if (userData) {
                                                userData.removeTaskRedPoint();
                                            }
                                        }

                                        Laya.Tween.to(cell, { x: -cell.displayWidth }, 250, Laya.Ease.quadOut, Handler.create(that, () => {
                                            listData.splice(index, 1);
                                            Laya.timer.once(100, that, () => {
                                                that.requestTaskInfo();
                                            })
                                        }));

                                    } else if (_res.code === 2) {
                                        CommonFun.showTip("领取失败！");
                                    }
                                }
                            });
                        }, [item, btnGet]);
                    }
                } else {
                    btnGet.disabled = true;
                    // btnGet.text.changeText("领取");
                }
            }
        });
    }
    //分享
    private refreshShareList(_data: any) {
        if (_data == null) {
            return
        }
        let that = this;
        let finishNum = _data.share_num;
        let listDatas = _data.share_status; // [1,3,5,7,8,10];
        let redPointNum = 0;



        //排序红点提示
        // for (var key in listDatas) {
        //     var element = listDatas[key];
        //     if (element) {
        //         if (element.status ==1) {
        //             redPointNum ++; //统计红点
        //         }
        //     }
        // }
        listDatas.forEach((item, index, list) => {
            if (item.status === 1) {
                redPointNum++;
            }
        });

        this.updateTabRetDot(QuestSubView.INVITE_AWARD, redPointNum > 0);

        // listDatas = tempListDatas;

        that.shareItemList.vScrollBarSkin = '';
        that.shareItemList.repeatY = 3;
        that.shareItemList.array = listDatas;
        that.shareItemList.renderHandler = new Laya.Handler(that, (cell: Laya.Box, index: number) => {
            if (index > listDatas.length) {
                return;
            }
            // console.log(cell, index);
            let item = listDatas[index];
            if (item == null) {
                return;
            }
            let collectNum = item.num;
            let invitePeople = finishNum;

            let extraDiamond: number = item.extra_diamond;
            let boxStage = item.status;
            if (invitePeople >= collectNum) {
                invitePeople = collectNum;
            }
            let txtTitle = cell.getChildByName('txtTitle') as Laya.Label;
            if (txtTitle) {
                // txtTitle.changeText('邀请' +collectNum +'位好友 (' +(invitePeople +'/' +collectNum) +')');
                txtTitle.changeText('第' + collectNum + '个好友');
            }

            let awardNum: number;
            const imgAwardIcon: Laya.Image = cell.getChildByName('imgAwardIcon') as Laya.Image;
            if (imgAwardIcon) {
                switch (item.reward_type) {
                    case "essence":
                        awardNum = item.essence;
                        imgAwardIcon.skin = "images/core/essence.png";
                        break;
                    default:
                        awardNum = item.diamond;
                        imgAwardIcon.skin = "images/core/diamond.png";
                        break;
                }

                let txtDiamond = imgAwardIcon.getChildByName('txtAward') as Laya.Label;
                if (txtDiamond) {
                    txtDiamond.changeText('' + awardNum);
                }
            }

            const imgHead = cell.getChildByName('imgHead') as Laya.Image;
            if (imgHead) {
                imgHead.offAll(Laya.Event.CLICK);
                imgHead.on(Laya.Event.CLICK, imgHead, () => {
                    AnimationUtils.lockBtnStage(imgHead);
                    userData.toShareAd(null, 0, true);
                })
            }

            //领取
            let btnGet = cell.getChildByName('btnGet') as Laya.Button;
            const btnInvite = cell.getChildByName("btnInvite") as Laya.Button;
            if (btnGet) {
                btnGet.visible = true;
                if (boxStage > 0) {
                    btnInvite && (btnInvite.visible = false);
                    if (boxStage > 1) {
                        //已领取
                        btnGet.visible = false;
                    } else {
                        if (imgHead && item.avatarUrl) {
                            imgHead.skin = item.avatarUrl;
                            imgHead.offAll(Laya.Event.CLICK);
                        }
                        redPointNum++;
                        btnGet.disabled = false;
                        btnGet.offAll(Laya.Event.CLICK);
                        btnGet.on(Laya.Event.CLICK, btnGet, (_item: any, _btnObj: Laya.Button) => {
                            that.requestPrize(_item.id, (_res: any) => {
                                if (_res) {
                                    CommonFun.showTip("奖励领取成功");
                                    if (item.reward_type === "diamond") {
                                        EffectUtils.tipsLabelByObject(btnGet, "+" + awardNum, EFFECT_TYPE.DIAMOND);
                                    } else if (item.reward_type === "essence") {
                                        EffectUtils.tipsLabelByObject(btnGet, "+" + awardNum, EFFECT_TYPE.ESSENCE);
                                    }

                                    HttpManager.Instance.requestDiamondData();
                                    _btnObj.visible = false;
                                    _item.status = 2;
                                    redPointNum--;
                                    this.updateTabRetDot(QuestSubView.INVITE_AWARD, redPointNum > 0);
                                    if (redPointNum < 1) {
                                        //移除红点
                                        if (userData) {
                                            userData.removeShareGiftRedPoint();
                                        }
                                    }
                                }
                            });
                        }, [item, btnGet]);
                    }
                } else {
                    btnGet.visible = false;
                    if (btnInvite) {
                        btnInvite.visible = true;
                        btnInvite.offAll(Laya.Event.CLICK);
                        btnInvite.on(Laya.Event.CLICK, btnInvite, () => {
                            AnimationUtils.lockBtnStage(btnInvite);
                            userData.toShareAd(null, 0, true);
                        })
                    }
                }
            }
        });
    }

    //拉取任务信息
    public requestTaskInfo(_callback?: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/task/info',
            success: function (res) {
                console.log("@FREEMAN: requestTaskInfo =>", res);
                TaskView.questData = res;
                that.refreshTaskList(res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    //拉取奖励
    public requestTaskPrize(_itemId: number, _callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/task/rewards/' + _itemId,
            success: function (res) {
                console.log("requestTaskPrize", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    //拉取分享信息
    public requestShareInfo(_callback?: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/friend_num',
            success: function (res) {
                console.log("@FREEMAN: requestShareInfo =>", res);
                TaskView.inviteData = res;
                that.refreshShareList(res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    //拉取奖励
    public requestPrize(_itemId: number, _callback: any): void {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/share/friend_rewards/' + _itemId,
            success: function (res) {
                console.log("requestPrize", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
}

enum QuestSubView {
    DAILY_QUEST = 0,
    INVITE_AWARD = 1,
    EMPTY_QUEST = 2,
}
