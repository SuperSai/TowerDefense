/*
* 派发类;
*/
class EventsManager extends Laya.EventDispatcher {
    constructor() {
        super();
    }
    static get Instance() {
        if (!EventsManager._instance) {
            EventsManager._instance = new EventsManager();
        }
        return EventsManager._instance;
    }
}
//# sourceMappingURL=EventsManager.js.map