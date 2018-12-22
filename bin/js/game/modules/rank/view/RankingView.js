/*
* 排行榜界面
*/
class RankingView extends ui.rank.RankingUI {
    constructor(_isFriend) {
        super();
        this.curSelectedIndex = -1;
        this.init(_isFriend);
    }
    //新建并添加到节点
    static Create(_callback = null, _isFriend = false) {
        let resList = [
            { url: "images/ranking/headIcon.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/surpass_bg.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/title.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/cell_bg_top1.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/cell_bg_default.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/cell_bg_self.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/icon_top_1.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/icon_top_2.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/icon_top_3.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/location_bg.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/location_mark.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/seperate_line.png", type: Laya.Loader.IMAGE },
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            let nodeView = new RankingView(_isFriend);
            AlignUtils.setToScreenGoldenPos(nodeView);
            M.layer.frameLayer.addChildWithMaskCall(nodeView, () => {
                nodeView.removeSelf();
                _callback && _callback();
            });
        }));
    }
    //初始化
    init(_isFriend) {
        let that = this;
        this._tabGroup = new TabGroup(that.tabGroup._childs);
        this._tabGroup.on(Laya.Event.CHANGE, that, that.onTabChange);
        this._tabGroup.selectedIndex = _isFriend ? RankingSubView.FRIEND_RANKING : RankingSubView.WORLD_RANKING;
        //按钮事件
        this.btnExit.on(Laya.Event.CLICK, that, that.onClickExit);
        this.coverView.on(Laya.Event.CLICK, that, () => {
            console.log("coverView");
        });
    }
    //点击事件
    onClickExit() {
        this.removeSelf();
    }
    onTabChange(selectedIndex) {
        const index = this._tabGroup.selectedIndex;
        this.viewStackRanking.selectedIndex = index;
        if (index === RankingSubView.WORLD_RANKING) {
            this.requestWorldRankingData();
            this.requestMyWorldRankingData();
        }
        else if (index === RankingSubView.FRIEND_RANKING) {
            this.openFriendRankingView();
        }
    }
    openWorldRankingView(data) {
        var that = this;
        var listDatas = [];
        //移除收益为0或以下的数据
        if (data) {
            data.forEach(element => {
                let asset = MathUtils.parseStringNum(element.stage);
                if (asset > 0) {
                    listDatas.push(element);
                }
            });
        }
        that.worldRankingList.vScrollBarSkin = "";
        that.worldRankingList.repeatY = 5;
        that.worldRankingList.array = listDatas;
        that.worldRankingList.renderHandler = new Laya.Handler(that, (cell, index) => {
            if (index > that.worldRankingList.array.length)
                return;
            let item = that.worldRankingList.array[index];
            if (item) {
                const cellBar = cell.getChildByName("cellBar");
                if (cellBar) {
                    if (index < 1) {
                        cellBar.skin = "images/ranking/cell_bg_top1.png";
                    }
                    else {
                        cellBar.skin = "images/ranking/cell_bg_default.png";
                    }
                }
                let imgNo = cell.getChildByName('imgNo');
                if (imgNo) {
                    imgNo.visible = index < 3;
                    if (index < 1) {
                        imgNo.skin = "images/ranking/icon_top_1.png";
                    }
                    else if (index < 2) {
                        imgNo.skin = "images/ranking/icon_top_2.png";
                    }
                    else if (index < 3) {
                        imgNo.skin = "images/ranking/icon_top_3.png";
                    }
                }
                let txtNo = cell.getChildByName('txtNo');
                if (txtNo) {
                    txtNo.changeText((index + 1).toString());
                }
                let imgAvatar = cell.getChildByName('imgAvatar');
                if (imgAvatar) {
                    imgAvatar.skin = item.avatar_url;
                }
                let txtName = cell.getChildByName('txtName');
                if (txtName) {
                    txtName.text = StringUtils.omitStringByByteLen(platform.decode(item.nick_name));
                }
                let txtPosition = cell.getChildByName('txtPosition');
                if (txtPosition) {
                    txtPosition.text = (item.city ? item.city : '火星');
                }
                let txtScore = cell.getChildByName('txtScore');
                if (txtScore) {
                    let asset = MathUtils.parseStringNum(item.stage);
                    if (asset < 0) {
                        asset = 0;
                    }
                    txtScore.changeText(MathUtils.bytesToSize(asset));
                }
            }
        }, null, false);
        let txtHint = that.viewStackRanking.selection.getChildByName('txtHint');
        if (txtHint) {
            txtHint.visible = that.worldRankingList.array.length < 1;
        }
    }
    //好友排行
    openFriendRankingView() {
        let that = this;
        let openDataContext = platform.getOpenDataContext();
        if (openDataContext) {
            // openDataContext.postMessage({
            //   text: 'hello',
            //   year: (new Date()).getFullYear()
            // })
            let sharedCanvas = openDataContext.canvas;
            sharedCanvas.width = that.width;
            sharedCanvas.height = that.height;
            var rankSprite = new Laya.Sprite();
            that.viewStackRanking.selection.removeChildren();
            that.viewStackRanking.selection.addChild(rankSprite);
            rankSprite.zOrder = 1;
            Laya.timer.once(40, that, function () {
                var rankTexture = new Laya.Texture(sharedCanvas);
                rankTexture.bitmap.alwaysChange = true; //小游戏使用，非常费，每帧刷新
                rankSprite.graphics.drawTexture(rankTexture, 0, 0, sharedCanvas.width, sharedCanvas.height);
            });
            platform.postMessage({
                message: "showFriendRanking"
            });
        }
    }
    //我当前的世界排名
    showMyRankingView(_ranking, _stage) {
        let that = this;
        if (that.viewMyRanking) {
            let txtMyRanking = that.viewMyRanking.getChildByName('txtMyRanking');
            if (txtMyRanking) {
                txtMyRanking.changeText(_ranking.toString());
            }
            const wxUserInfo = PlayerManager.Instance.Info.wxUserInfo;
            if (wxUserInfo) {
                const imgAvatar = that.viewMyRanking.getChildByName('imgAvatar');
                if (imgAvatar) {
                    imgAvatar.skin = wxUserInfo.avatarUrl;
                }
                let txtName = that.viewMyRanking.getChildByName('txtName');
                if (txtName) {
                    txtName.changeText(wxUserInfo.nickName);
                }
                let txtPosition = that.viewMyRanking.getChildByName('txtPosition');
                if (txtPosition) {
                    txtPosition.changeText(wxUserInfo.city ? wxUserInfo.city : '火星');
                }
            }
            let txtScore = that.viewMyRanking.getChildByName('txtScore');
            if (txtScore) {
                txtScore.changeText(MathUtils.bytesToSize(_stage));
            }
        }
    }
    //请求周排行数据
    requestWorldRankingData(_callback = null) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/rank/stage',
            success: function (res) {
                console.log("requestWorldRankingData:", res);
                that.openWorldRankingView(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    //请求我的周排行数据
    requestMyWorldRankingData(_callback = null) {
        var that = this;
        var HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/rank/my_stage',
            success: function (res) {
                console.log("requestMyWorldRankingData:", res);
                that.showMyRankingView(res, userData.getPassStage());
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
}
var RankingSubView;
(function (RankingSubView) {
    RankingSubView[RankingSubView["WORLD_RANKING"] = 0] = "WORLD_RANKING";
    RankingSubView[RankingSubView["FRIEND_RANKING"] = 1] = "FRIEND_RANKING";
})(RankingSubView || (RankingSubView = {}));
//# sourceMappingURL=RankingView.js.map