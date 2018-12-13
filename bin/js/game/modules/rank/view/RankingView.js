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
* 排行榜界面
*/
var RankingView = /** @class */ (function (_super) {
    __extends(RankingView, _super);
    function RankingView(_isFriend) {
        var _this = _super.call(this) || this;
        _this.curSelectedIndex = -1;
        _this.init(_isFriend);
        return _this;
    }
    //新建并添加到节点
    RankingView.Create = function (_callback, _isFriend) {
        if (_callback === void 0) { _callback = null; }
        if (_isFriend === void 0) { _isFriend = false; }
        var resList = [
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
        Laya.loader.load(resList, Handler.create(null, function () {
            var nodeView = new RankingView(_isFriend);
            AlignUtils.setToScreenGoldenPos(nodeView);
            M.layer.frameLayer.addChildWithMaskCall(nodeView, function () {
                nodeView.removeSelf();
                _callback && _callback();
            });
        }));
    };
    //初始化
    RankingView.prototype.init = function (_isFriend) {
        var that = this;
        this._tabGroup = new TabGroup(that.tabGroup._childs);
        this._tabGroup.on(Laya.Event.CHANGE, that, that.onTabChange);
        this._tabGroup.selectedIndex = _isFriend ? RankingSubView.FRIEND_RANKING : RankingSubView.WORLD_RANKING;
        //按钮事件
        this.btnExit.on(Laya.Event.CLICK, that, that.onClickExit);
        this.coverView.on(Laya.Event.CLICK, that, function () {
            console.log("coverView");
        });
    };
    //点击事件
    RankingView.prototype.onClickExit = function () {
        this.removeSelf();
    };
    RankingView.prototype.onTabChange = function (selectedIndex) {
        var index = this._tabGroup.selectedIndex;
        this.viewStackRanking.selectedIndex = index;
        if (index === RankingSubView.WORLD_RANKING) {
            this.requestWorldRankingData();
            this.requestMyWorldRankingData();
        }
        else if (index === RankingSubView.FRIEND_RANKING) {
            this.openFriendRankingView();
        }
    };
    RankingView.prototype.openWorldRankingView = function (_data) {
        var that = this;
        var listDatas = [];
        //移除收益为0或以下的数据
        if (_data) {
            _data.forEach(function (element) {
                var asset = MathUtils.parseStringNum(element.stage);
                if (asset > 0) {
                    listDatas.push(element);
                }
            });
        }
        that.worldRankingList.vScrollBarSkin = null;
        that.worldRankingList.repeatY = 5;
        that.worldRankingList.array = listDatas;
        that.worldRankingList.renderHandler = new Laya.Handler(that, function (cell, index) {
            if (index > that.worldRankingList.array.length) {
                return;
            }
            var item = listDatas[index];
            if (item) {
                var imgNo = cell.getChildByName('imgNo');
                if (imgNo) {
                    imgNo.visible = index < 3;
                    if (index < 1) {
                        imgNo.skin = "images/ranking/icon_top_1.png";
                        var cellBar = cell.getChildByName("cellBar");
                        if (cellBar) {
                            cellBar.skin = "images/ranking/cell_bg_top1.png";
                        }
                    }
                    else if (index < 2) {
                        imgNo.skin = "images/ranking/icon_top_2.png";
                    }
                    else if (index < 3) {
                        imgNo.skin = "images/ranking/icon_top_3.png";
                    }
                }
                var txtNo = cell.getChildByName('txtNo');
                if (txtNo) {
                    txtNo.changeText((index + 1).toString());
                }
                var imgAvatar = cell.getChildByName('imgAvatar');
                if (imgAvatar) {
                    imgAvatar.skin = item.avatar_url;
                }
                var txtName = cell.getChildByName('txtName');
                if (txtName) {
                    txtName.text = StringUtils.omitStringByByteLen(platform.decode(item.nick_name));
                }
                var txtPosition = cell.getChildByName('txtPosition');
                if (txtPosition) {
                    txtPosition.text = (item.city ? item.city : '火星');
                }
                var txtScore = cell.getChildByName('txtScore');
                if (txtScore) {
                    var asset = MathUtils.parseStringNum(item.stage);
                    if (asset < 0) {
                        asset = 0;
                    }
                    txtScore.changeText(MathUtils.bytesToSize(asset));
                }
            }
        });
        var txtHint = that.viewStackRanking.selection.getChildByName('txtHint');
        if (txtHint) {
            txtHint.visible = that.worldRankingList.array.length < 1;
        }
    };
    //好友排行
    RankingView.prototype.openFriendRankingView = function () {
        var that = this;
        var openDataContext = platform.getOpenDataContext();
        if (openDataContext) {
            // openDataContext.postMessage({
            //   text: 'hello',
            //   year: (new Date()).getFullYear()
            // })
            var sharedCanvas_1 = openDataContext.canvas;
            sharedCanvas_1.width = that.width;
            sharedCanvas_1.height = that.height;
            var rankSprite = new Laya.Sprite();
            that.viewStackRanking.selection.removeChildren();
            that.viewStackRanking.selection.addChild(rankSprite);
            rankSprite.zOrder = 1;
            Laya.timer.once(40, that, function () {
                var rankTexture = new Laya.Texture(sharedCanvas_1);
                rankTexture.bitmap.alwaysChange = true; //小游戏使用，非常费，每帧刷新
                rankSprite.graphics.drawTexture(rankTexture, 0, 0, sharedCanvas_1.width, sharedCanvas_1.height);
            });
            platform.postMessage({
                message: "showFriendRanking"
            });
        }
    };
    //我当前的世界排名
    RankingView.prototype.showMyRankingView = function (_ranking, _stage) {
        var that = this;
        if (that.viewMyRanking) {
            var txtMyRanking = that.viewMyRanking.getChildByName('txtMyRanking');
            if (txtMyRanking) {
                txtMyRanking.changeText(_ranking.toString());
            }
            var wxUserInfo = PlayerManager.Instance.Info.wxUserInfo;
            if (wxUserInfo) {
                var imgAvatar = that.viewMyRanking.getChildByName('imgAvatar');
                if (imgAvatar) {
                    imgAvatar.skin = wxUserInfo.avatarUrl;
                }
                var txtName = that.viewMyRanking.getChildByName('txtName');
                if (txtName) {
                    txtName.changeText(wxUserInfo.nickName);
                }
                var txtPosition = that.viewMyRanking.getChildByName('txtPosition');
                if (txtPosition) {
                    txtPosition.changeText(wxUserInfo.city ? wxUserInfo.city : '火星');
                }
            }
            var txtScore = that.viewMyRanking.getChildByName('txtScore');
            if (txtScore) {
                txtScore.changeText(MathUtils.bytesToSize(_stage));
            }
        }
    };
    //请求周排行数据
    RankingView.prototype.requestWorldRankingData = function (_callback) {
        if (_callback === void 0) { _callback = null; }
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
    };
    //请求我的周排行数据
    RankingView.prototype.requestMyWorldRankingData = function (_callback) {
        if (_callback === void 0) { _callback = null; }
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
    };
    return RankingView;
}(ui.rank.RankingUI));
var RankingSubView;
(function (RankingSubView) {
    RankingSubView[RankingSubView["WORLD_RANKING"] = 0] = "WORLD_RANKING";
    RankingSubView[RankingSubView["FRIEND_RANKING"] = 1] = "FRIEND_RANKING";
})(RankingSubView || (RankingSubView = {}));
//# sourceMappingURL=RankingView.js.map