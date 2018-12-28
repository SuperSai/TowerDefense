/*
* 通关失败;
*/
class ClearanceFail extends ui.settlement.ClearanceFailUI {
    constructor() {
        super();
        this.countdown = 3;
        this.showFailedUI();
    }
    //新建并添加到节点
    static Create(_parentNode, callback = null, _removeCallback = null, ...arge) {
        if (_parentNode) {
            let nodeView = new ClearanceFail();
            nodeView.removeCallback = _removeCallback;
            AlignUtils.setToScreenGoldenPos(nodeView);
            M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
            nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
        }
    }
    //显示失败界面
    showFailedUI() {
        let self = this;
        self.txtTime.changeText('' + self.countdown);
        TimerManager.Instance.doTimer(1000, 0, self.onFailTime, self);
    }
    onFailTime() {
        let self = this;
        if (self.countdown > 0) {
            self.countdown--;
        }
        else {
            TimerManager.Instance.remove(self.onFailTime, self);
            self.removeSelf();
        }
        self.txtTime.changeText('' + self.countdown);
    }
    removeView() {
        let self = this;
        TimerManager.Instance.remove(self.onFailTime, self);
        this.removeCallback && this.removeCallback();
        self.removeSelf();
    }
}
//# sourceMappingURL=ClearanceFail.js.map