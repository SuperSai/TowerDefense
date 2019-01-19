class ManagerShortcuts {
    pool: PoolManager = PoolManager.getInstance();
    novice: NoviceManager = NoviceManager.getInstance();
    layer: LayerManager = LayerManager.getInstance();
    more: MoreController = MoreController.getInstance();
    player: PlayerManager = PlayerManager.Instance;
    hall: HallManager = HallManager.Instance;
    http: HttpManager = HttpManager.Instance;
    event: EventsManager = EventsManager.Instance;
    sdk: SDKManager = SDKManager.Instance;
    battle: BattleManager = BattleManager.Instance;
}