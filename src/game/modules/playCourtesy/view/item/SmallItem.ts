/*
* 小推广位;
*/
class SmallItem extends ui.playCourtesy.SmallItemUI {

    private _data: any;

    constructor() {
        super();
    }

    public set dataSource(value: any) {
        this._data = value;
        if (this._data) {
            this.timer.callLater(this, () => {
                this.imgIcon.skin = this._data.icon;
            })
            this.txt_title.text = this._data.title;
            this.imgIcon.on(Laya.Event.CLICK, this, this.naviToApp);
        }
    }

    private naviToApp() {
        SDKManager.Instance.navigateToMiniProgram(this._data.appid, this._data.page_query);
    }
}