/*
* 关注奖励;
*/
class FollowRewardView extends BaseView {
    constructor() {
        super(LAYER_TYPE.FRAME_LAYER, ui.follow.FollowRewardViewUI, false);
        this.setResources(["followReward"]);
    }
    //初始化
    initUI() {
        super.initUI();
        var that = this;
        //按钮事件
        that.ui.btnExit.on(Laya.Event.CLICK, that, that.onClickExit);
        that.ui.btnGet.on(Laya.Event.CLICK, that, that.onClickGet);
        // that.requestOfficialAccData((_res: any) => {
        //     if (that.ui.imgBg && _res && _res.image && (_res.image.indexOf(".png") || _res.image.indexOf(".jpg"))) {
        //         that.ui.imgBg.skin = _res.image;
        //     }
        // });
    }
    onClickExit() {
        ViewMgr.Ins.close(ViewConst.FollowRewardView);
    }
    onClickGet() {
        let that = this;
        that.requestPrize();
    }
    //拉取奖励
    requestPrize() {
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/subscription/rewards',
            success: function (res) {
                console.log("requestPrize", res);
                if (res.code == 1) {
                    MessageUtils.showMsgTips("奖励领取成功");
                    HttpManager.Instance.requestDiamondData();
                    //移除红点
                    if (userData) {
                        userData.removeFollowRedPoint();
                    }
                }
                else if (res.code == 2) {
                    MessageUtils.showMsgTips("未关注公众号");
                }
                else if (res.code == 3) {
                    MessageUtils.showMsgTips("奖励已领取");
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
    //拉取公众二维码
    requestOfficialAccData(_callback) {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/subscription/get_info',
            success: function (res) {
                console.log("requestOfficialAccData", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
}
//# sourceMappingURL=FollowRewardView.js.map