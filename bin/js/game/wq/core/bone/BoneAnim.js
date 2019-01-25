/*
* 龙骨动画;
*/
class BoneAnim extends Laya.Sprite {
    constructor(boneName, isLoop = false) {
        super();
        this._currIndex = 0;
        this._isLoop = false;
        this._isLoop = isLoop;
        this._aniPath = "images/effect/bone/" + boneName + ".sk";
        this._factory = new Laya.Templet();
        this.addEvents();
        this._factory.loadAni(this._aniPath);
    }
    get armature() {
        return this._armature;
    }
    set armature(value) {
        this._armature = value;
    }
    addEvents() {
        this._factory.on(Laya.Event.COMPLETE, this, this.parseComplete);
        this._factory.on(Laya.Event.ERROR, this, this.onError);
    }
    removeEvents() {
        this._factory.off(Laya.Event.COMPLETE, this, this.parseComplete);
        this._factory.off(Laya.Event.ERROR, this, this.onError);
        this._armature.off(Laya.Event.STOPPED, this, this.completeHandler);
    }
    onError() {
        HttpManager.Instance.requestSaveLog("@David 龙骨动画路径：" + this._aniPath + " - 创建失败！");
    }
    parseComplete() {
        if (Laya.loader.getRes(this._aniPath)) {
            //创建模式为1，可以启用换装
            this._armature = this._factory.buildArmature(1);
            this.addChild(this._armature);
            this._armature.on(Laya.Event.STOPPED, this, this.completeHandler);
            this.play();
        }
        else {
            this.destroy();
        }
    }
    completeHandler() {
        if (this._armature && !this._isLoop) {
            this.completeBack && this.completeBack();
        }
    }
    play() {
        this._currIndex++;
        if (this._currIndex >= this._armature.getAnimNum()) {
            this._currIndex = 0;
        }
        this._armature.play(this._currIndex, this._isLoop);
    }
    destroy() {
        if (this._armature) {
            this._armature.stop(); //停止龙骨动画播放
            this.removeEvents();
            this._armature.removeSelf(); //从显示列表移除龙骨动画本身
            this._armature.removeChildren(); //从显示列表移除龙骨动画子对象
            this._armature.destroy(true); //从显存销毁龙骨动画及其子对象
            this._factory.destroy(); //释放动画模板类下的纹理数据
            this._factory.releaseResource(true); //释放龙骨资源
            this.removeChildren();
            this.removeSelf();
        }
    }
}
//# sourceMappingURL=BoneAnim.js.map