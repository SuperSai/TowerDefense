/*
* 守卫进化界面
*/
class EvolutionAdvancedView extends ui.evolution.EvolutionAdvancedViewUI {
    constructor(_stage = -1) {
        super();
        this.indexArray = [10, 1, 3, 2];
        this.init(_stage);
    }
    //新建并添加到节点
    static Create(_parentNode, _callback = null, _removeCallback = null, _stage = -1) {
        let resList = [
            { url: "res/atlas/images/luckLottery.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                if (EvolutionAdvancedView.isOpen)
                    return;
                EvolutionAdvancedView.isOpen = true;
                let nodeView = new EvolutionAdvancedView(_stage);
                AlignUtils.setToScreenGoldenPos(nodeView);
                M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
                _callback && _callback(nodeView);
                nodeView.once(Laya.Event.REMOVED, nodeView, () => {
                    EvolutionAdvancedView.isOpen = false;
                    nodeView.removeUI();
                    _removeCallback && _removeCallback();
                });
            }
        }));
    }
    //初始化
    init(_stage) {
        let that = this;
        //界面初始化
        let imgBg = that.mainView.getChildByName("imgBg");
        if (imgBg) {
            let btnExit = imgBg.getChildByName("btnExit");
            if (btnExit) {
                btnExit.offAll(Laya.Event.CLICK);
                btnExit.on(Laya.Event.CLICK, btnExit, () => {
                    that.removeSelf();
                });
            }
        }
    }
    //移除界面
    removeUI() {
        EventsManager.Instance.offAll(EventsType.ESSENCE_CHANGE);
    }
    //设置强化数据
    refreshBoxUI(_callback) {
        let that = this;
        let kingLevel = userData.getKingLevel();
        let kingVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
        //界面初始化
        let imgBg = that.mainView.getChildByName("imgBg");
        if (imgBg && kingVO) {
            //升级条件
            let itemId1 = 130;
            let itemNum1 = userData.caculateMonsterCount(itemId1);
            let needItemNum1 = 3;
            //奖励
            let prizeDiamond = 500;
            let prizeEssence = 50;
            let btnUpdate = imgBg.getChildByName("btnUpdate");
            if (btnUpdate) {
                btnUpdate.offAll(Laya.Event.CLICK);
                btnUpdate.on(Laya.Event.CLICK, that, () => {
                    that.requestUpdateEvolutionLevel(2, prizeDiamond, prizeEssence, (_res) => {
                        if (_res) {
                            MessageUtils.showMsgTips("进化成功");
                            _callback && _callback(2, _res.diamond, _res.essence);
                            that.removeSelf();
                        }
                    });
                });
                btnUpdate.disabled = (itemNum1 < needItemNum1);
            }
            that.txtNeedItem1.text = Math.min(itemNum1, needItemNum1) + '/' + needItemNum1;
            that.txtItemPrize2.text = prizeDiamond + "";
            that.txtItemPrize3.text = prizeEssence + "";
        }
    }
    //请求进化
    requestUpdateEvolutionLevel(_level, _diamond, _essence, _callback = null) {
        let that = this;
        let dataString = 'level=' + _level + '&diamond=' + _diamond + '&essence=' + _essence;
        let HttpReqHelper = new HttpRequestHelper(PathConfig.AppUrl);
        HttpReqHelper.request({
            url: 'v1/evolution',
            method: 'Post',
            data: dataString,
            success: function (res) {
                console.log("requestUpdateEvolutionLevel", res);
                _callback && _callback(res);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    }
}
EvolutionAdvancedView.isOpen = false;
//# sourceMappingURL=EvolutionAdvancedView.js.map