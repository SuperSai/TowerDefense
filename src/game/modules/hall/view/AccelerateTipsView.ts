/*
* 加速提示界面;
*/
class AccelerateTipsView extends BaseView {
    constructor() {
        super(LAYER_TYPE.NOTE_LAYER, ui.hall.AccelerateTipsViewUI);
        this.setResources(["accelerate"]);
    }

    public initUI(): void {
        super.initUI();
        //守卫
        if (this.ui.spMountGuard) {
            let bossId: number = userData.isEvolution() ? 100003 : 100002;
            this.ui.spMountGuard.setKind(bossId);
            this.ui.spMountGuard.scaleX = -1;
        }
        this.timerOnce(8000, this, () => {
            ViewMgr.Ins.close(ViewConst.AccelerateTipsView);
        })
    }
}