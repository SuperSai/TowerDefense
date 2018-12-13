/*
* 玩家信息数据管理;
*/
class PlayerManager extends Laya.EventDispatcher {

    private _info: PlayerInfo;

    constructor() {
        super();
    }

    public setup(): void {
        let self = this;
        self._info = new PlayerInfo();
    }

    set Info(value: PlayerInfo) { this._info = value; }
    /** 玩家数据 */
    get Info(): PlayerInfo { return this._info; }


    private static _instance: PlayerManager;
    public static get Instance(): PlayerManager {
        if (!PlayerManager._instance) {
            PlayerManager._instance = new PlayerManager();
        }
        return PlayerManager._instance;
    }
}