/*
* 龙骨动画;
*/
class BoneAnim extends Laya.Sprite {

    private _aniPath: string;
    private _factory: Laya.Templet;
    private _armature: Laya.Skeleton;
    public completeBack: Function;

    public get armature(): Laya.Skeleton {
        return this._armature;
    }
    public set armature(value: Laya.Skeleton) {
        this._armature = value;
    }
    private _currIndex: number = 0;
    private _isLoop: boolean = false;

    constructor(boneName: string, isLoop: boolean = false) {
        super();
        this._isLoop = isLoop;
        this._aniPath = "images/effect/bone/" + boneName + ".sk";
        this._factory = new Laya.Templet();
        this.addEvents();
        this._factory.loadAni(this._aniPath);
    }

    private addEvents(): void {
        this._factory.on(Laya.Event.COMPLETE, this, this.parseComplete);
        this._factory.on(Laya.Event.ERROR, this, this.onError);
    }

    private removeEvents(): void {
        this._factory.off(Laya.Event.COMPLETE, this, this.parseComplete);
        this._factory.off(Laya.Event.ERROR, this, this.onError);
        this._armature.off(Laya.Event.STOPPED, this, this.completeHandler);
    }

    private onError(): void {
        HttpManager.Instance.requestSaveLog("@David 龙骨动画路径：" + this._aniPath + " - 创建失败！");
    }

    private parseComplete(): void {
        //创建模式为1，可以启用换装
        this._armature = this._factory.buildArmature(1);
        this.addChild(this._armature);
        this._armature.on(Laya.Event.STOPPED, this, this.completeHandler);
        this.play();
    }

    private completeHandler(): void {
        if (this._armature && !this._isLoop) {
            this.completeBack && this.completeBack();
        }
    }

    private play(): void {
        this._currIndex++;
        if (this._currIndex >= this._armature.getAnimNum()) {
            this._currIndex = 0;
        }
        this._armature.play(this._currIndex, this._isLoop);
    }

    public destroy(): void {
        if (this._armature) {
            this._armature.stop();//停止龙骨动画播放
            this.removeEvents();
            this._armature.removeSelf();//从显示列表移除龙骨动画本身
            this._armature.removeChildren();//从显示列表移除龙骨动画子对象
            this._armature.destroy(true);//从显存销毁龙骨动画及其子对象
            this._factory.destroy();//释放动画模板类下的纹理数据
            this._factory.releaseResource(true);//释放龙骨资源
            this.removeChildren();
            this.removeSelf();
        }
    }
}