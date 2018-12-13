var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MoreController = /** @class */ (function (_super) {
    __extends(MoreController, _super);
    function MoreController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoreController.getInstance = function () {
        if (!this._instance) {
            this._instance = new MoreController();
        }
        return this._instance;
    };
    MoreController.prototype.init = function () {
        var _this = this;
        var assets = [
            { url: "res/atlas/images/more.atlas", type: Laya.Loader.ATLAS }
        ];
        EffectUtils.showWaitEffect();
        Laya.loader.load(assets, Handler.create(this, function () {
            EffectUtils.stopWaitEffect();
            if (!_this._model) {
                _this.initModel();
            }
            _this._view = new MoreView(_this, _this._model);
            _this.show();
        }));
    };
    MoreController.prototype.initModel = function () {
        if (!this._model) {
            this._model = new MoreModel();
        }
        this.applyMute();
    };
    MoreController.prototype.show = function () {
        if (this._view) {
            M.layer.frameLayer.addChildWithMaskCall(this._view, this._view.removeSelf);
        }
        else {
            this.init();
        }
    };
    MoreController.prototype.switchMute = function () {
        this._model.mute = !this._model.mute;
        this.applyMute();
    };
    MoreController.prototype.applyMute = function () {
        var _this = this;
        if (!this._model)
            return;
        Laya.SoundManager.musicMuted = this._model.mute;
        Laya.SoundManager.soundMuted = this._model.mute;
        if (!this._model.mute) {
            Laya.loader.load("musics/bgmusic.mp3", Laya.Handler.create(this, function () {
                _this._bgChannel = Laya.SoundManager.playMusic("musics/bgmusic.mp3", 0);
            }));
        }
    };
    return MoreController;
}(Laya.EventDispatcher));
//# sourceMappingURL=MoreController.js.map