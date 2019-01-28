/*
* 推广位;
*/
class ExtensionItem extends ui.playCourtesy.ExtensionItemUI {

    private _data: any;
    /** 状态0没有玩过，1玩过15秒，没有领取奖励，2已经领取奖励 */
    private _playStatus: number = 0;

    constructor() {
        super();
    }

    public set dataSource(value: any) {
        this._data = value;
        if (this._data) {
            this._playStatus = this._data.play_status;
            this.initView();
            this.initReward();
            this.changeBtn(this._playStatus);
            this.btn_click.on(Laya.Event.CLICK, this, this.naviToApp);
        }
    }

    private initView(): void {
        this.imgItemIcon.skin = this._data.icon;
        this.txt_title.text = this._data.title;
        this.txt_des.text = this._data.describe;
    }

    private initReward(): void {
        let index: number = 0;
        for (const key in this._data.reward) {
            let vo: ItemVO = GlobleData.getData(GlobleData.ItemVO, parseInt(key));
            if (vo) {
                const value = this._data.reward[key];
                let path: string = PathConfig.ItemUrl.replace("{0}", vo.smallIcon);
                (this["imgIcon" + index] as Laya.Image).skin = path;
                (this["txt_num" + index] as Laya.Label).text = value;
                index++;
            }
        }
    }

    private changeBtn(playStatus): void {
        if (playStatus == 0) {//没有玩过
            this.btn_click.skin = "images/playCourtesy/playCourtesy_btn_3.png";
            this.btn_click.label = "立刻试玩";
            this.btn_click.strokeColors = "#306294";
        } else if (playStatus == 1) {//玩过15秒，没有领取奖励
            this.btn_click.skin = "images/playCourtesy/playCourtesy_btn_2.png";
            this.btn_click.label = "领取奖励";
            this.btn_click.strokeColors = "#946430";
        } else if (playStatus == 2) {//已经领取奖励
            this.btn_click.skin = "images/playCourtesy/playCourtesy_btn_1.png";
            this.btn_click.label = "开始游戏";
            this.btn_click.strokeColors = "#946430";
        }
    }

    private naviToApp() {
        switch (this._playStatus) {
            case 0:
                SDKManager.Instance.navigateToMiniProgram(this._data.appid, this._data.page_query);
                break;
            case 1:
                HttpManager.Instance.requestAdvertLog("reward", this._data.appid, () => {
                    this.changeBtn(2);
                    HttpManager.Instance.requestDiamondData();
                    HttpManager.Instance.requestEssenceData();
                })
                break;
            case 2:
                SDKManager.Instance.navigateToMiniProgram(this._data.appid, this._data.page_query);
                break;
        }
    }
}