class MoreController extends Laya.EventDispatcher {

    private static _instance: MoreController;

    public static getInstance(): MoreController {
        if (!this._instance) {
            this._instance = new MoreController();
        }
        return this._instance;
    }

    private _view: MoreView;
    private _model: MoreModel;
    private _bgChannel: Laya.SoundChannel;

    public init() {
        const assets = [
            { url: "res/atlas/images/more.atlas", type: Laya.Loader.ATLAS }
        ];
        EffectUtils.showWaitEffect();
        Laya.loader.load(assets, Handler.create(this, () => {
            EffectUtils.stopWaitEffect();
            if (!this._model) {
                this.initModel();
            }
            this._view = new MoreView(this, this._model);
            this.show();
        }));
    }


    public initModel(): void {
        if (!this._model) {
            this._model = new MoreModel();
        }
        this.applyMute();
    }

    public show(): void {
        if (this._view) {
            M.layer.frameLayer.addChildWithMaskCall(this._view, this._view.removeSelf);
        } else {
            this.init();
        }
    }

    public switchMute(): void {
        this._model.mute = !this._model.mute;
        this.applyMute();
    }

    public applyMute() {
        if (this._model) {
            Laya.SoundManager.musicMuted = this._model.mute;
            Laya.SoundManager.soundMuted = this._model.mute;
        } else {
            Laya.SoundManager.musicMuted = false;
            Laya.SoundManager.soundMuted = false;
        }
        if (!this._bgChannel) {
            Laya.loader.load("musics/bgmusic.mp3", Laya.Handler.create(this, () => {
                this._bgChannel = Laya.SoundManager.playMusic("musics/bgmusic.mp3", 0);
            }));
        } else {
            this._bgChannel.play();
        }
    }
}