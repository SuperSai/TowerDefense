/*
* name;
*/
class CommonManager {
    constructor() {

    }




    private static _instance: CommonManager;
    public static get Instance(): CommonManager {
        if (!CommonManager._instance) {
            CommonManager._instance = new CommonManager();
        }
        return CommonManager._instance;
    }
}

enum DILOG_TYPE {
    /** 英雄 */
    PET,
    /** 加速 */
    ACC,
}