class TabGroup extends Laya.EventDispatcher {
    constructor(buttons) {
        super();
        this._selectedIndex = -1;
        this._buttons = buttons;
        this.initButtons();
    }
    initButtons() {
        let i = 0;
        let len = this._buttons.length;
        let btn;
        for (i; i < len; i++) {
            btn = this._buttons[i];
            btn.on(Laya.Event.CLICK, this, this.onButtonClick);
        }
    }
    onButtonClick(event) {
        let button = event.target;
        this._selectedIndex = this._buttons.indexOf(button);
        this.updateButtons();
    }
    updateButtons() {
        for (let i = 0; i < this._buttons.length; i++) {
            this._buttons[i].selected = i == this._selectedIndex;
        }
        this.event(Laya.Event.CHANGE, this._selectedIndex);
    }
    get selectedIndex() {
        return this._selectedIndex;
    }
    set selectedIndex(value) {
        if (this._selectedIndex == value)
            return;
        this._selectedIndex = value;
        this.updateButtons();
    }
    getButtonByIndex(index) {
        if (this._buttons.length > index) {
            return this._buttons[index];
        }
        return null;
    }
}
//# sourceMappingURL=TabGroup.js.map