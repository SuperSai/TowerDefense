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
var M = new ManagerShortcuts();
var MainView = /** @class */ (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        var that = _this;
        that.initLoginUI();
        return _this;
    }
    MainView.prototype.initLoginUI = function () {
        var that = this;
        that.btnStart.on(Laya.Event.CLICK, that, that.onStart);
        that.btnStart.visible = false;
        that.onLoading(0);
        if (Laya.Browser.onPC && !Laya.Browser.onMiniGame) {
            console.log("MainView==>Laya.Browser.onPC");
            userData.loadStorage(function (_res) {
                that.onLoadRes(function (_res) {
                    HallScene.Create(that);
                });
            });
            return;
        }
        //显示开机界面ss
        if (that.imgStart) {
            that.imgStart.visible = true;
            //渐透
            var animImg_1 = that.imgStart;
            var timeLine_1 = new Laya.TimeLine();
            timeLine_1.addLabel("tl1", 0).to(animImg_1, { alpha: 1 }, 2000, Laya.Ease.linearNone)
                .addLabel("tl2", 2000).to(animImg_1, { alpha: 0 }, 200, Laya.Ease.linearNone);
            timeLine_1.on(Laya.Event.COMPLETE, animImg_1, function () {
                animImg_1.removeSelf();
                that.imgStart = null;
                timeLine_1.destroy();
                timeLine_1 = null;
            });
            timeLine_1.play(0, false);
        }
        //加载进入游戏
        platform.startLoading(function (_percent) {
            that.onLoading(_percent, 1);
            if (_percent >= 100) {
                that.authenticLogin();
                //初始隐藏
                Laya.timer.frameOnce(50, that, function () {
                    that.btnStart.visible = true;
                });
            }
        });
    };
    MainView.prototype.authenticLogin = function () {
        var self = this;
        var curStatus = 0;
        console.log("authenticLogin-----");
        var rect = LayerManager.getRealStageRect(self.btnStart);
        platform.authenticLogin(function (res) {
            if (res) { //正常登陆
                if (userData) {
                    userData.versionCheck(function () {
                        userData.loadStorage(function (_res) {
                            self.onLoadRes(function (_res) {
                                if (_res) {
                                    HallScene.Create(self);
                                }
                            });
                            //提交玩家信息
                            if (res.userInfo) {
                                PlayerManager.Instance.Info.wxUserInfo = res.userInfo;
                                var userInfo = PlayerManager.Instance.Info.wxUserInfo;
                                HttpManager.Instance.requestSaveWxUserinfoData(platform.encode(userInfo.nickName), userInfo.avatarUrl, userInfo.city, userInfo.gender);
                            }
                        });
                    });
                }
            }
        }, { x: rect.x, y: rect.y, width: rect.width, height: rect.height }, function (_status) {
            if (curStatus == _status) {
                return;
            }
            curStatus = _status;
            if (_status > 0 && _status < 3) {
                //微信授权登录
                EffectUtils.showWaitEffect("正在登录");
            }
            else if (_status == 3) {
                //进入游戏
                // CommonFun.showWaitEffect("正在进入游戏");
            }
        });
    };
    MainView.prototype.onStart = function () {
        var that = this;
        that.authenticLogin();
        AnimationUtils.lockBtnStage(that.btnStart, 1000);
    };
    MainView.prototype.onLoading = function (_percent, type) {
        var that = this;
        var percent = Math.floor(_percent);
        if (percent < 0) {
            percent = 0;
        }
        else if (percent >= 100) {
            percent = 100;
        }
        that.progressBar.visible = that.lblLoadingDesc.visible = percent < 100;
        that.imgBar.width = 284 * percent / 100;
        if (type) {
            if (type === 1) {
                // 加载小游戏
                that.lblLoadingDesc.changeText("正在构建英雄世界... " + percent + "%");
            }
            else if (type === 2) {
                // 加载资源
                that.lblLoadingDesc.changeText("正在召唤英雄... " + percent + "%");
            }
        }
    };
    //预加载模型资源
    MainView.prototype.onLoadRes = function (_callback) {
        var that = this;
        var resList = BattleManager.Instance.getStartLoadPetData();
        if (!resList || resList.length < 1)
            return _callback && _callback();
        Laya.loader.load(resList, Handler.create(null, function (_res) {
            _callback && _callback(_res);
        }), Handler.create(null, function (_value) {
            that.onLoading(_value * 100, 2);
        }, null, false));
    };
    return MainView;
}(ui.login.LoginSceneUI));
//初始化微信小游戏
Laya.MiniAdpter.init();
Laya.MiniAdpter['getUrlEncode'] = function (url, type) {
    if (url.indexOf(".fnt") != -1
        || url.indexOf("sheet.json") != -1
        || url.indexOf("language.txt") != -1
        || url.indexOf(".json") != -1) {
        return "utf8";
    }
    else if (type == "arraybuffer") {
        return "";
    }
    return "ascii";
};
//程序入口
Laya.init(750, 1334, Laya.WebGL);
//适配
Laya.stage.scaleMode = Laya.Stage.SCALE_NOSCALE;
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
function beginLoad() {
    Laya.loader.load(["loading/start_btn.png", "loading/tip_bg.png", "loading/loading01.png", "loading/loading02.png"], Handler.create(null, onLoaded));
}
function onLoaded() {
    //实例UI界面
    GlobleData.Instance.setup(function () {
        var mainView = new MainView();
        M.layer.initLayer(Laya.stage, Laya.stage.designWidth, Laya.stage.designHeight);
        M.layer.renderLayer.addChild(mainView);
    });
}
var userData = new UserData();
platform.onShow(function (e) {
    EventsManager.Instance.event(EventsType.BACK_GAME, true);
    MoreController.getInstance().applyMute();
    if (platform.isSharing())
        return;
    //离线收益
    if (userData && userData.isLoadStorage()) {
        userData.requestOfflinePrizeData();
    }
});
platform.onHide(function () {
    if (platform.isSharing())
        return;
    console.log("@FREEMAN: 尝试在离开小游戏的时候保存离线数据。。。");
    try {
        //保存数据
        if (userData && userData.isLoadStorage()) {
            userData.saveLocal(true, { petList: true, petShop: true, skill: true });
            userData.saveOfflineTime();
            //上传腾讯云
            userData.setUserCloudStorage();
        }
    }
    catch (e) {
        console.log("@FREEMAN: 在保存离线数据期间发生了错误：", e);
    }
    console.log("@FREEMAN: 保存离线数据完成。。。");
});
//# sourceMappingURL=LayaUISample.js.map