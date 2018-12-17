var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* terry 2018/7/14;
*/
var RankingView = (function (_super) {
    __extends(RankingView, _super);
    function RankingView() {
        var _this = _super.call(this) || this;
        _this.userKVDataList = {};
        _this.isShowSurpass = false; //是否显示好友超越
        _this.init();
        return _this;
    }
    //新建并添加到节点
    RankingView.Create = function (_parentNode) {
        var resList = [
            { url: "images/ranking/headIcon.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/surpass_bg.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/title.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/cell_bg_default.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/cell_bg_self.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/icon_top_1.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/icon_top_2.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/icon_top_3.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/location_bg.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/location_mark.png", type: Laya.Loader.IMAGE },
            { url: "images/ranking/seperate_line.png", type: Laya.Loader.IMAGE },
        ];
        var finishCount = 0;
        for (var index = 0; index < resList.length; index++) {
            Laya.loader.load(resList[index].url, Laya.Handler.create(null, function () {
                finishCount++;
                if (_parentNode && finishCount >= resList.length) {
                    _parentNode.addChild(new RankingView());
                }
            }));
        }
    };
    //初始化
    RankingView.prototype.init = function () {
        var that = this;
        //按钮事件
        // this.btnExit.on(Laya.Event.CLICK, this, this.onClickExit);
        // this.btnShare.on(Laya.Event.CLICK, this, this.onClickShare);
        //init data
        // that.initRankingList();
        wx.getUserCloudStorage({
            keyList: RankingView.keyList,
            success: function (res) {
                // console.log("getUserCloudStorage", res);
                that.userKVDataList = res.KVDataList;
                wx.getFriendCloudStorage({
                    keyList: RankingView.keyList,
                    success: function (res) {
                        var data = res.data;
                        // console.log("getFriendCloudStorage", res.data);
                        that.showSurpassFriendView(data);
                    }
                });
            }
        });
        that.showFriendRanking(false);
        //排行或超越切换
        wx.onMessage(function (data) {
            console.log(data);
            if (data.message == "showFriendRanking") {
                //好友排行
                that.showFriendRanking();
                wx.getFriendCloudStorage({
                    keyList: RankingView.keyList,
                    success: function (res) {
                        var data = res.data;
                        that.openRankingList(data);
                    }
                });
            }
            else if (data.message == "showSurpassFriend") {
                //好友超越
                that.showFriendRanking(false);
                // if (that.userKVDataList) {
                //     wx.getFriendCloudStorage({
                //         keyList: RankingView.keyList,
                //         success: res => {
                //             let data = res.data;
                //             that.showSurpassFriendView(data);
                //         }
                //     })
                // } else {
                console.log("重新拉取玩家云数据");
                wx.getUserCloudStorage({
                    keyList: RankingView.keyList,
                    success: function (res) {
                        // console.log("getUserCloudStorage", res);
                        that.userKVDataList = res.KVDataList;
                        wx.getFriendCloudStorage({
                            keyList: RankingView.keyList,
                            success: function (res) {
                                var data = res.data;
                                // console.log("getFriendCloudStorage", res.data);
                                that.showSurpassFriendView(data);
                            }
                        });
                    }
                });
            }
        });
    };
    //显示超越好友
    RankingView.prototype.showSurpassFriendView = function (_data) {
        var that = this;
        if (that.surpassFriendView) {
            that.surpassFriendView.visible = false; //不显示
            var listDatas = that.sortRankingData(_data);
            if (that.userKVDataList) {
                var userScore = RankingView.parseInt(that.getKeyVaule(that.userKVDataList, "score")) || 0;
                var userId = that.getKeyVaule(that.userKVDataList, "userId");
                var userNextItem = null;
                for (var index = 0; index < listDatas.length; index++) {
                    var element = listDatas[index];
                    // console.log("element: ", element, userScore);
                    if (element) {
                        var score = RankingView.parseInt(that.getKeyVaule(element.KVDataList, "score")) || 0;
                        var friendUserId = that.getKeyVaule(element.KVDataList, "userId");
                        // console.log("score: ", score, friendUserId, userScore, userId, index);
                        if (userScore >= score || userId == friendUserId) {
                            // console.log("surpassFriendView: ", userNextItem);
                            var cell = that.surpassFriendView;
                            that.surpassFriendView.visible = that.isShowSurpass; //显示
                            if (userNextItem) {
                                var txtNo = cell.getChildByName('txtNo');
                                if (txtNo) {
                                    txtNo.changeText("第" + (index) + "名");
                                }
                                var headIcon = cell.getChildByName('headIcon');
                                if (headIcon) {
                                    headIcon.skin = userNextItem.avatarUrl;
                                }
                                var txtSurpass = cell.getChildByName('txtSurpass');
                                if (txtSurpass) {
                                    txtSurpass.changeText("即将超越");
                                }
                            }
                            else {
                                // console.log("you are No1");
                                var txtNo = cell.getChildByName('txtNo');
                                if (txtNo) {
                                    txtNo.changeText("第1名");
                                }
                                var headIcon = cell.getChildByName('headIcon');
                                if (headIcon) {
                                    headIcon.skin = element.avatarUrl;
                                }
                                var txtSurpass = cell.getChildByName('txtSurpass');
                                if (txtSurpass) {
                                    txtSurpass.changeText("巅峰王者");
                                }
                            }
                            return;
                        }
                        userNextItem = element;
                    }
                }
                ;
            }
            else {
            }
        }
    };
    //排行与超越切换
    RankingView.prototype.showFriendRanking = function (_isFriendRanking) {
        if (_isFriendRanking === void 0) { _isFriendRanking = true; }
        // console.log("showFriendRanking", _isFriendRanking);
        var that = this;
        if (that.surpassFriendView) {
            that.surpassFriendView.visible = !_isFriendRanking;
        }
        if (that.rankingList) {
            that.rankingList.visible = _isFriendRanking;
        }
        that.isShowSurpass = !_isFriendRanking;
    };
    //初始化车库
    RankingView.prototype.initRankingList = function () {
        var that = this;
        var listDatas = [];
        that.rankingList.vScrollBarSkin = '';
        that.rankingList.repeatY = 7;
        that.rankingList.array = listDatas;
    };
    RankingView.prototype.openRankingList = function (_data) {
        var that = this;
        if (that.rankingList) {
            var listDatas = that.sortRankingData(_data);
            that.rankingList.vScrollBarSkin = '';
            that.rankingList.repeatY = 7;
            that.rankingList.array = listDatas;
            that.rankingList.renderHandler = new Laya.Handler(that, function (cell, index) {
                if (index > that.rankingList.array.length) {
                    return;
                }
                var item = that.rankingList.array[index];
                // console.log(item, index);
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
                        txtNo.changeText(index + 1);
                    }
                    var imgAvatar = cell.getChildByName('imgAvatar');
                    if (imgAvatar) {
                        imgAvatar.skin = item.avatarUrl;
                    }
                    var txtName = cell.getChildByName('txtName');
                    if (txtName) {
                        txtName.changeText(StringTools.omitStringByByteLen(item.nickname));
                    }
                    var txtPosition = cell.getChildByName('txtPosition');
                    if (txtPosition) {
                        var strPosition = that.getKeyVaule(item.KVDataList, "city") || '火星';
                        txtPosition.changeText(strPosition);
                    }
                    var txtScore = cell.getChildByName('txtScore');
                    if (txtScore) {
                        var score = RankingView.parseInt(that.getKeyVaule(item.KVDataList, "score"));
                        txtScore.changeText(RankingView.bytesToSize(score));
                    }
                }
            });
            if (that.txtHint) {
                that.txtHint.visible = that.rankingList.array.length < 1;
            }
        }
    };
    //排序
    RankingView.prototype.sortRankingData = function (_data) {
        var that = this;
        var listDatas = _data;
        for (var i = 0; i < listDatas.length - 1; i++) {
            var item = listDatas[i];
            if (item) {
                var score = RankingView.parseInt(that.getKeyVaule(item.KVDataList, "score")) || 0;
                // console.log("itemIndex", i, score);
                for (var j = i + 1; j < listDatas.length; j++) {
                    var item2 = listDatas[j];
                    if (item2 && item2 != item) {
                        var score2 = RankingView.parseInt(that.getKeyVaule(item2.KVDataList, "score")) || 0;
                        // console.log("-------", i, j, score, score2)
                        if (score2 > score) {
                            score = score2;
                            listDatas[j] = listDatas[i];
                            listDatas[i] = item2;
                        }
                    }
                }
            }
        }
        return listDatas;
    };
    //获取键值
    RankingView.prototype.getKeyVaule = function (_array, _key) {
        var value = null;
        _array.forEach(function (element) {
            if (element.key == _key) {
                value = element.value;
                return value;
            }
        });
        return value;
    };
    //字符串转整形
    RankingView.parseInt = function (_strNum) {
        var intNum = parseFloat(_strNum);
        if (intNum) {
            return Math.floor(intNum);
        }
        return 0;
    };
    //单位转换
    RankingView.bytesToSize = function (bytes) {
        if (bytes < 1000000) {
            return Math.floor(bytes).toString();
        }
        if (bytes === 0)
            return '0';
        var k = 1000, // or 1024
        sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'mm', 'nn', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'zz'], i = Math.floor(Math.log(bytes) / Math.log(k));
        var unit = '';
        if (i < sizes.length) {
            unit = sizes[i];
        }
        else {
            var numLenght = i - sizes.length;
            unit = String.fromCharCode(97 + numLenght % 26);
            for (var index = 0; index < 1 + Math.floor(numLenght / 65); index++) {
                unit = unit + unit;
            }
        }
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + unit;
    };
    return RankingView;
}(ui.RankingUI));
RankingView.keyList = ["score", "city", "userId"];
//# sourceMappingURL=RankingView.js.map