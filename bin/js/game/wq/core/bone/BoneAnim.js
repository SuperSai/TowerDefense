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
        this.mFactory.on(Laya.Event.COMPLETE, this, this.parseComplete);
        this.mFactory.on(Laya.Event.ERROR, this, this.onError);
        this.mFactory.loadAni(this.mAniPath);
    }
    onError() {
        console.log("error");
    }
    parseComplete() {
        console.log("@David 龙骨动画加载完毕");
        //创建模式为1，可以启用换装
        this.mArmature = this.mFactory.buildArmature(1);
        this.addChild(this.mArmature);
        this.mArmature.on(Laya.Event.STOPPED, this, this.completeHandler);
        this.play();
    }
    completeHandler() {
        console.log("@David 龙骨动画播放");
        if (this.mArmature && !this._isLoop) {
            this.mArmature.stop();
            this.mArmature = null;
            this.removeChildren();
            this.removeSelf();
        }
    }
    play() {
        this.mCurrIndex++;
        if (this.mCurrIndex >= this.mArmature.getAnimNum()) {
            this.mCurrIndex = 0;
        }
        this.mArmature.play(this.mCurrIndex, this._isLoop);
    }
    removeBoneAnim() {
        if (this.mArmature) {
            this.mArmature.stop();
            this.mArmature = null;
            this.removeChildren();
            this.removeSelf();
        }
    }
}
//# sourceMappingURL=BoneAnim.js.map