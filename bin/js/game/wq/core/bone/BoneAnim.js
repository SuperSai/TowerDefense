/*
* 龙骨动画;
*/
class BoneAnim extends Laya.Sprite {
    constructor(boneName, isLoop = false) {
        super();
        this.mCurrIndex = 0;
        this._isLoop = false;
        this._isLoop = isLoop;
        this.mAniPath = "images/effect/bone/" + boneName + ".sk";
        this.mFactory = new Laya.Templet();
        this.addEvents();
        this.mFactory.loadAni(this.mAniPath);
    }
    addEvents() {
        this.mFactory.on(Laya.Event.COMPLETE, this, this.parseComplete);
        this.mFactory.on(Laya.Event.ERROR, this, this.onError);
    }
    removeEvents() {
        this.mFactory.off(Laya.Event.COMPLETE, this, this.parseComplete);
        this.mFactory.off(Laya.Event.ERROR, this, this.onError);
        this.mArmature.off(Laya.Event.STOPPED, this, this.completeHandler);
    }
    onError() {
        HttpManager.Instance.requestSaveLog("@David 龙骨动画路径：" + this.mAniPath + " - 创建失败！");
    }
    parseComplete() {
        //创建模式为1，可以启用换装
        this.mArmature = this.mFactory.buildArmature(1);
        this.addChild(this.mArmature);
        this.mArmature.on(Laya.Event.STOPPED, this, this.completeHandler);
        this.play();
    }
    completeHandler() {
        if (this.mArmature && !this._isLoop) {
            this.destroy();
        }
    }
    play() {
        this.mCurrIndex++;
        if (this.mCurrIndex >= this.mArmature.getAnimNum()) {
            this.mCurrIndex = 0;
        }
        this.mArmature.play(this.mCurrIndex, this._isLoop);
    }
    destroy() {
        if (this.mArmature) {
            this.mArmature.stop(); //停止龙骨动画播放
            this.removeEvents();
            this.mArmature.removeSelf(); //从显示列表移除龙骨动画本身
            this.mArmature.removeChildren(); //从显示列表移除龙骨动画子对象
            this.mArmature.destroy(true); //从显存销毁龙骨动画及其子对象
            this.mFactory.destroy(); //释放动画模板类下的纹理数据
            this.mFactory.releaseResource(true); //释放龙骨资源
            this.removeChildren();
            this.removeSelf();
        }
    }
}
//# sourceMappingURL=BoneAnim.js.map