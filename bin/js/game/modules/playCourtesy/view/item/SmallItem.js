/*
* 小推广位;
*/
class SmallItem extends ui.playCourtesy.SmallItemUI {
    constructor() {
        super();
    }
    set dataSource(value) {
        this._data = value;
        if (this._data) {
            this.imgIcon.skin = this._data.icon;
            this.txt_title.text = this._data.title;
            this.imgIcon.on(Laya.Event.CLICK, this, this.naviToApp);
        }
    }
    naviToApp() {
        SDKManager.Instance.navigateToMiniProgram(this._data.appid, this._data.page_query);
    }
}
//# sourceMappingURL=SmallItem.js.map