/*
* 龙骨动画;
*/
class BoneAnim extends Laya.Sprite {

    private mAniPath: string;
    private mFactory: Laya.Templet;
    private mArmature: Laya.Skeleton;
    private mCurrIndex: number = 0;
    private _isLoop: boolean = false;

    constructor(boneName: string, isLoop: boolean = false) {
        super();
        this._isLoop = isLoop;
        this.mAniPath = "images/effect/bone/" + boneName + ".sk";
        this.mFactory = new Laya.Templet();
        this.mFactory.on(Laya.Event.COMPLETE, this, this.parseComplete);
        this.mFactory.on(Laya.Event.ERROR, this, this.onError);
        this.mFactory.loadAni(this.mAniPath);
    }

    private onError(): void {
        console.log("error");
    }

    private parseComplete(): void {
        console.log("@David 龙骨动画加载完毕");
        //创建模式为1，可以启用换装
        this.mArmature = this.mFactory.buildArmature(1);
        this.addChild(this.mArmature);
        this.mArmature.on(Laya.Event.STOPPED, this, this.completeHandler);
        this.play();
    }

    private completeHandler(): void {
        console.log("@David 龙骨动画播放");
        if (this.mArmature && !this._isLoop) {
            this.mArmature.stop();
            this.mArmature = null;
            this.removeChildren();
            this.removeSelf();
        }
    }

    private play(): void {
        this.mCurrIndex++;
        if (this.mCurrIndex >= this.mArmature.getAnimNum()) {
            this.mCurrIndex = 0;
        }
        this.mArmature.play(this.mCurrIndex, this._isLoop);
    }

    public removeBoneAnim(): void {
        if (this.mArmature) {
            this.mArmature.stop();
            this.mArmature = null;
            this.removeChildren();
            this.removeSelf();
        }
    }
}