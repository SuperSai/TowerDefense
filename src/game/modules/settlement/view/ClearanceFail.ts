/*
* 通关失败;
*/
class ClearanceFail extends ui.settlement.ClearanceFailUI {
    public removeCallback: any;
    private countdown: number = 3;

    constructor() {
        super();
        this.showFailedUI();
    }

    //新建并添加到节点
    static Create(_parentNode: Laya.Node, callback: any = null, _removeCallback: any = null, ...arge): void {
        if (_parentNode) {
            let nodeView = new ClearanceFail();
            nodeView.removeCallback = _removeCallback;
            AlignUtils.setToScreenGoldenPos(nodeView);
            M.layer.subFrameLayer.addChildWithMaskCall(nodeView, nodeView.removeSelf);
            nodeView.once(Laya.Event.REMOVED, nodeView, nodeView.removeView);
        }
    }

    //显示失败界面
    private showFailedUI(): void {
        let self = this;
        self.txtTime.changeText('' + self.countdown);
        TimerManager.Instance.doTimer(1000, 0, self.onFailTime, self);
    }

    private onFailTime(): void {
        let self = this;
        if (self.countdown > 0) {
            self.countdown--;
        } else {
            TimerManager.Instance.remove(self.onFailTime, self);
            self.removeSelf();
        }
        self.txtTime.changeText('' + self.countdown);
    }

    public removeView(): void {
        let self = this;
        TimerManager.Instance.remove(self.onFailTime, self);
        this.removeCallback && this.removeCallback();
        self.removeSelf();
    }
}