/*
* 关注奖励;
*/
class FollowRewardView extends ui.follow.FollowRewardViewUI {
    constructor() {
        super();
        let self = this;
        self.frameOnce(5, self, () => {
            self.init();
        })
    }

    //新建并添加到节点
    static Create(_parentNode: Laya.Node, _callback: any = null): void {
        let resList = [
            { url: "res/atlas/images/followReward.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                let viewTag = "followRewardView";
                let nodeViewOld = _parentNode.getChildByName(viewTag);
                if (nodeViewOld) {
                    return
                }
                let nodeView = new FollowRewardView();
                nodeView.name = viewTag;
                M.layer.frameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                nodeView.once(Laya.Event.REMOVED, nodeView, _callback);
            }
        }));
    }

    //初始化
    private init(): void {
        var that = this;
        //按钮事件
        that.btnExit.on(Laya.Event.CLICK, that, that.onClickExit);
        that.btnGet.on(Laya.Event.CLICK, that, that.onClickGet);
        that.requestOfficialAccData((_res: any) => {
            if (that.imgBg && _res && _res.image) {
                that.imgBg.skin = _res.image;
            }
        });
    }
    private onClickExit(): void {
        this.removeSelf();
    }
    private onClickGet(): void {
        let that = this;
        that.requestPrize();
    }

    //拉取奖励
    public requestPrize(): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/subscription/rewards',
            success: function (res) {
                console.log("requestPrize", res);
                if (res.code == 1) {
                    MessageUtils.showMsgTips("奖励领取成功")
                    HttpManager.Instance.requestDiamondData()
                    //移除红点
                    if (userData) {
                        userData.removeFollowRedPoint();
                    }
                } else if (res.code == 2) {
                    MessageUtils.showMsgTips("未关注公众号")
                } else if (res.code == 3) {
                    MessageUtils.showMsgTips("奖励已领取")
                }
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }

    //拉取公众二维码
    public requestOfficialAccData(_callback: any): void {
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