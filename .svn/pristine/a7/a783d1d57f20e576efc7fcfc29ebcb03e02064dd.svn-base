/*
* 守卫进化界面
*/
class EvolutionAdvancedView extends ui.evolution.EvolutionAdvancedViewUI {
    static isOpen: boolean = false;
    private indexArray: Array<number> = [10, 1, 3, 2];

    constructor(_stage: number = -1) {
        super();
        this.init(_stage);
    }
    //新建并添加到节点
    static Create(_parentNode: Laya.Node, _callback: any = null, _removeCallback: any = null, _stage: number = -1): void {
        let resList = [
            { url: "res/atlas/images/luckLottery.atlas", type: Laya.Loader.ATLAS }
        ];
        Laya.loader.load(resList, Handler.create(null, () => {
            if (_parentNode) {
                if (EvolutionAdvancedView.isOpen) return;
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
    private init(_stage: number): void {
        let that = this;
        //界面初始化
        let imgBg = that.mainView.getChildByName("imgBg") as Laya.Image;
        if (imgBg) {
            let btnExit = imgBg.getChildByName("btnExit") as Laya.Button;
            if (btnExit) {
                btnExit.offAll(Laya.Event.CLICK);
                btnExit.on(Laya.Event.CLICK, btnExit, () => {
                    that.removeSelf();
                });
            }
        }
    }
    //移除界面
    private removeUI(): void {
        EventsManager.Instance.offAll(EventsType.ESSENCE_CHANGE);
    }

    //设置强化数据
    public refreshBoxUI(_callback: any): void {
        let that = this;
        let kingLevel: number = userData.getKingLevel();
        let kingVO: KindLevelConfigVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
        //界面初始化
        let imgBg = that.mainView.getChildByName("imgBg") as Laya.Image;
        if (imgBg && kingVO) {
            //升级条件
            let itemId1: number = 130;
            let itemId2: number = 230;
            let itemId3: number = 330;
            let itemNum1: number = userData.caculateMonsterCount(itemId1);
            let itemNum2: number = userData.caculateMonsterCount(itemId2);
            let itemNum3: number = userData.caculateMonsterCount(itemId3);
            let needItemNum1: number = 1;
            let needItemNum2: number = 1;
            let needItemNum3: number = 1;
            //奖励
            let prizeDiamond: number = 500;
            let prizeEssence: number = 50;

            let btnUpdate = imgBg.getChildByName("btnUpdate") as Laya.Button;
            if (btnUpdate) {
                btnUpdate.offAll(Laya.Event.CLICK);
                btnUpdate.on(Laya.Event.CLICK, that, () => {
                    that.requestUpdateEvolutionLevel(2, prizeDiamond, prizeEssence, (_res: any) => {
                        if (_res) {
                            CommonFun.showTip("进化成功");
                            _callback && _callback(2, _res.diamond, _res.essence);
                            that.removeSelf();
                        }
                    });
                });
                btnUpdate.disabled = (itemNum1 < needItemNum1) || (itemNum2 < needItemNum2) || (itemNum3 < needItemNum3);
            }
            that.txtNeedItem1.text = Math.min(itemNum1, needItemNum1) + '/' + needItemNum1;
            that.txtNeedItem2.text = Math.min(itemNum2, needItemNum2) + '/' + needItemNum2;
            that.txtNeedItem3.text = Math.min(itemNum3, needItemNum3) + '/' + needItemNum3;
            that.txtItemPrize4.text = prizeDiamond + "";
            that.txtItemPrize5.text = prizeEssence + "";
        }
    }

    //请求进化
    public requestUpdateEvolutionLevel(_level: number, _diamond: number, _essence: number, _callback: any = null): void {
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