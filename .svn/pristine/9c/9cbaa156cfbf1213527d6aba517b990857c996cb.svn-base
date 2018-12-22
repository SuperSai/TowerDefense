/*
* 玩家信息数据管理;
*/
class PlayerManager extends Laya.EventDispatcher {
    constructor() {
        super();
        this.account = "default_player";
    }
    setup() {
        let self = this;
        self._info = new PlayerInfo();
    }
    set Info(value) { this._info = value; }
    /** 玩家数据 */
    get Info() { return this._info; }
    static get Instance() {
        if (!PlayerManager._instance) {
            PlayerManager._instance = new PlayerManager();
        }
        return PlayerManager._instance;
    }
}
//# sourceMappingURL=PlayerManager.js.map