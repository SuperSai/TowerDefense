/*
* SDK;
*/
class SDKManager {
    constructor() {

    }

    /** 登陆 */
    public login(callBack: Function): void {
        let self = this;
    }







    private static _instance: SDKManager;
    public static get Instance(): SDKManager {
        if (!SDKManager._instance) {
            SDKManager._instance = new SDKManager();
        }
        return SDKManager._instance;
    }
}