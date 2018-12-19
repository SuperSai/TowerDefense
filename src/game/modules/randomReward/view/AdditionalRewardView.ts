/*
* 额外奖励界面;
*/
class AdditionalRewardView extends ui.randomReward.AdditionalRewardViewUI {
    constructor() {
        super();
        this.addEvetns();
        this.init();
    }

    //新建并添加到节点
    static Create(_parentNode: Laya.Node): void {
        let resList = [
            { url: "res/atlas/images/randomReward.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                let nodeView = new AdditionalRewardView();
                AlignUtils.setToScreenGoldenPos(nodeView);
                LayerManager.getInstance().subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
            }
        }));
    }

    //初始化
    private init(): void {
        let self = this;
        self.txt_count.text = RandomUtils.rangeInt(5, 20) + "";
    }

    private addEvetns(): void {
        let self = this;
        self.btn_get.on(Laya.Event.CLICK, self, self.onGetReward);
    }

    private removeEvents(): void {
        let self = this;
        self.btn_get.off(Laya.Event.CLICK, self, self.onGetReward);
    }

    /** 领取奖励 */
    private onGetReward(): void {
        let self = this;
        userData.toShareAd(() => {
            self.requestReward(1, (_res: any) => {
                if (_res) {
                    if (_res.code === 1) {
                        MessageUtils.showMsgTips("奖励领取成功");
                        self.removeView();
                    } else if (_res.code === 2) {
                        MessageUtils.showMsgTips("领取失败！");
                    }
                }
            });
        })
    }

    public requestReward(itemId: number, callback: any): void {
        let that = this;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/task/rewards/' + itemId,
            success: function (res) {
                callback && callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }



    private removeView(): void {
        let self = this;
        self.removeSelf();
        self.removeEvents();
    }
}