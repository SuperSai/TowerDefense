/*
* 守卫升级动画界面;
*/
class EvolutionLevelView extends BaseView {

    private _effect: BoneAnim;
    constructor() {
        super(M.layer.screenEffectLayer, ui.evolution.EvolutionLevelViewUI);
        this.setResources(["guardLevel"]);
    }

    public initData(): void {
        super.initData();
        this._effect = new BoneAnim("shengji", false);
        this._effect.x = this.width - 370;
        this._effect.y = 120;
        this._effect.completeBack = () => {
            this._effect.armature.paused();
        }
        this.addChild(this._effect);
        this.ui.txt_level.value = this.datas[0];

        this.timerOnce(1000, this, () => {
            this.ui.effectLight.visible = true;
            this.ui.txt_name.visible = true;
            this.ui.txt_level.visible = true;
            this.timerOnce(3000, this, this.removeView);
        })
    }

    private removeView(): void {
        ViewMgr.Ins.close(ViewConst.EvolutionLevelView);
    }

    public close(...param: any[]): void {
        super.close(param);
        this.clearTimer(this, this.removeView);
        if (this._effect) this._effect.destroy();
        this._effect = null;
        this.ui.effectLight.visible = false;
        this.ui.txt_name.visible = false;
        this.ui.txt_level.visible = false;
        this.callback && this.callback();
    }
}