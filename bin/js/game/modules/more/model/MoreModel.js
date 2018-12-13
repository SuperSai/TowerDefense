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
var MoreModel = /** @class */ (function (_super) {
    __extends(MoreModel, _super);
    function MoreModel() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Object.defineProperty(MoreModel.prototype, "mute", {
        get: function () {
            return this._mute;
        },
        set: function (value) {
            this._mute = value;
            var storage = window.localStorage;
            if (storage) {
                storage.setItem(MoreModel.MUSIC_MUTE_KEY, JSON.stringify(this._mute));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MoreModel.prototype, "itemList", {
        get: function () {
            return this._itemList;
        },
        enumerable: true,
        configurable: true
    });
    MoreModel.prototype.init = function () {
        var storage = window.localStorage;
        if (storage) {
            var musicMute = storage.getItem(MoreModel.MUSIC_MUTE_KEY);
            if (musicMute) {
                this._mute = JSON.parse(musicMute);
            }
        }
        this._itemList = [];
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
        // this._itemList.push(new MoreViewListItemVO());
    };
    MoreModel.MUSIC_MUTE_KEY = "music_mute";
    return MoreModel;
}(Laya.EventDispatcher));
//# sourceMappingURL=MoreModel.js.map