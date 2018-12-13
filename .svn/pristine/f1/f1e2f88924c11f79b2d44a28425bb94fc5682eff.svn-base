/*
* 派发类;
*/
class EventsManager extends Laya.EventDispatcher {

    constructor() {
        super();
    }

    private static _instance: EventsManager;
    public static get Instance(): EventsManager {
        if (!EventsManager._instance) {
            EventsManager._instance = new EventsManager();
        }
        return EventsManager._instance;
    }
}