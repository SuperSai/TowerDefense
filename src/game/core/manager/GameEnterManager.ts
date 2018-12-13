/*
* Manager初始化类
*/
class GameEnterManager {

    public init(): void {
        HallManager.Instance.setup();
        PlayerManager.Instance.setup();
        BattleManager.Instance.setup();
    }


    private static _instance: GameEnterManager;
    public static get Instance(): GameEnterManager {
        if (!GameEnterManager._instance) {
            GameEnterManager._instance = new GameEnterManager();
        }
        return GameEnterManager._instance;
    }
}