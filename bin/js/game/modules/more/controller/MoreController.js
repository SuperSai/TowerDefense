class MoreController extends Laya.EventDispatcher {
    static getInstance() {
        if (!this._instance) {
            this._instance = new MoreController();
        }
        return this._instance;
    }
    get model() {
        return this._model;
    }
    constructor() {
        super();
        this.init();
    }
    init() {
        this._model = new MoreModel();
        this.addEvents();
    }
    addEvents() {
        this.on(MoreEvent.SUBSCRIBE_STATUS, this, (flag) => {
            this._model.subscribable = flag;
        });
    }
    show() {
        if (this._view) {
            M.layer.frameLayer.addChildWithMaskCall(this._view, this._view.removeSelf);
        }
        else {
            const assets = [
                { url: "res/atlas/images/more.atlas", type: Laya.Loader.ATLAS }
            ];
            EffectUtils.showWaitEffect();
            Laya.loader.load(assets, Handler.create(this, () => {
                EffectUtils.stopWaitEffect();
                this._view = new MoreView(this, this._model);
                this.show();
            }));
        }
    }
    switchMute() {
        this._model.mute = !this._model.mute;
        this.applyMute(this._model.mute);
    }
    applyMute(mute) {
        if (!mute) {
            mute = this._model.mute;
        }
        Laya.SoundManager.musicMuted = mute;
        Laya.SoundManager.soundMuted = mute;
        if (!mute) {
            if (!this._bgChannel) {
                Laya.loader.load("musics/bgmusic.mp3", Laya.Handler.create(this, () => {
                    this._bgChannel = Laya.SoundManager.playMusic("musics/bgmusic.mp3", 0);
                    M.event.on(EventsType.BACK_GAME, this, this.applyMute);
                }));
            }
            else {
                this._bgChannel.play();
            }
        }
    }
}
//# sourceMappingURL=MoreController.js.map