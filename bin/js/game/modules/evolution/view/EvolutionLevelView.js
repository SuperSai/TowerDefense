/*
* 守卫升级动画界面;
*/
class EvolutionLevelView extends BaseView {
    constructor() {
        super(M.layer.subFrameLayer, ui.evolution.EvolutionLevelViewUI);
        this.setResources(["guardLevel"]);
    }
    initData() {
        super.initData();
        this._effect = new BoneAnim("shengji", false);
        this._effect.x = this.width - 370;
        this._effect.y = 120;
        this._effect.completeBack = () => {
            this._effect.armature.paused();
        };
        this.addChild(this._effect);
        this.ui.txt_level.value = this.datas[0];
        this.timerOnce(1000, this, () => {
            this.ui.effectLight.visible = true;
            this.ui.txt_name.visible = true;
            this.ui.txt_level.visible = true;
        });
    }
    close(...param) {
        super.close(param);
        if (this._effect)
            this._effect.destroy();
        this._effect = null;
        this.ui.effectLight.visible = false;
        this.ui.txt_name.visible = false;
        this.ui.txt_level.visible = false;
        this.callback && this.callback();
    }
}
//# sourceMappingURL=EvolutionLevelView.js.map