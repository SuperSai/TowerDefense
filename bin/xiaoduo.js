

class WXIntegralWall {

    get valid(){
        return this._valid;
    }

    constructor(){
        if(wx){
            this._valid = true;
            this._activated = WXIntegralWallStatus.FALSE;
            // wx.onShow(({scene, referrerInfo:{appId, extraData:{fromIntegralWall}}})=>{
            wx.onShow((res)=>{
                if(Math.floor(res.scene) === WXIntegralWallScene.MINI_PROGRAM_TO_MINI_PROGRAM) {
                    if (res.referrerInfo && res.referrerInfo.extraData && res.referrerInfo.extraData.fromIntegralWall) {
                        if (this._activated === WXIntegralWallStatus.FALSE) {
                            this._activated = WXIntegralWallStatus.BUSY;
                            this.requestActivated({
                                referrerInfo:res.referrerInfo,
                                success:({valid}) => {
                                    if(valid){
                                        this._activated = WXIntegralWallStatus.TRUE;
                                        console.info("@WXIntegralWall: 积分墙启动成功！");
                                    } else {
                                        console.info("@WXIntegralWall: 积分墙启动失败！");
                                    }
                                },
                                fail:fres => {

                                },
                                complete:cres => {

                                }
                            })
                        }
                    }
                }
            });
            console.info("@WXIntegralWall: 积分墙初始化完成！");
        } else {
            this._valid = false;
            this.logInvalid();
        }
    }

    requestQuestList(object){
        !object && (object = {});
        if(this._valid){
            console.info("@WXIntegralWall: 发起积分墙任务拉取请求！");
            new WXIntegralWallHttpRequest().request({
                url:"https://www.baidu.com",
                success:(res)=>{
                    console.info("@WXIntegralWall: 积分墙任务拉取请求成功：", res);
                    object.success && object.success(res);
                },
                fail:object.fail,
                complete:object.complete
            });
        } else {
            this.logInvalid();
        }
    }

    requestQuestReward(object){
        !object && (object = {});
        if(this._valid){
            console.info("@WXIntegralWall: 发起积分墙任务奖励拉取请求！");
            new WXIntegralWallHttpRequest().request({
                url:"https://www.baidu.com",
                data:{
                    appId:object.appId,
                },
                success:(res)=>{
                    console.info("@WXIntegralWall: 积分墙任务奖励拉取请求成功：", res);
                    object.success && object.success(res);
                },
                fail:object.fail,
                complete:object.complete
            });
        } else {
            this.logInvalid();
        }
    }

    requestQuestClear(object){
        !object && (object = {});
        if(this._valid){
            console.info("@WXIntegralWall: 发起积分墙任务删除请求！");
            new WXIntegralWallHttpRequest().request({
                url:"https://www.baidu.com",
                data:{
                    appId:object.appId
                },
                success:(res)=>{
                    console.info("@WXIntegralWall: 积分墙任务删除请求成功：", res);
                    object.success && object.success(res);
                },
                fail:object.fail,
                complete:object.complete
            });
        } else {
            this.logInvalid();
        }
    }

    requestActivated(object){
        !object && (object = {});
        if(this._valid){
            console.info("@WXIntegralWall: 发起积分墙任务激活请求！");
            new WXIntegralWallHttpRequest().request({
                url:"https://www.baidu.com",
                data:{
                    appId:object.referrerInfo.appId
                },
                success:(res)=>{
                    console.info("@WXIntegralWall: 积分墙任务激活请求成功：", res);
                    object.success && object.success(res);
                },
                fail:object.fail,
                complete:object.complete
            });
        } else {
            this.logInvalid();
        }
    }

    logInvalid(){
        console.error("@WXIntegralWall: 非微信环境下，无法使用积分墙功能！");
    }
}

class WXIntegralWallQuest {
    constructor() {
        this.appId = "";
        this.appName = "";
        this.appIconUrl = "";
        this.questActivated = false;
        this.questTarget = 1;
        this.questProgress = 0;
        this.questProgressDesc = [];
    }
}

// class WXIntegralWallHandler{
//     constructor(caller, func, ...args){
//         this.caller = caller;
//         this.func = func;
//         this.args = args;
//     }
//
//     call(){
//         if(this.caller){
//             if(this.func){
//                 if(this.args && this.args.length){
//                     this.func.apply(this.caller, this.args);
//                 } else {
//                     this.func.apply(this.caller);
//                 }
//             }
//         } else {
//             if(this.func){
//                 this.func();
//             }
//         }
//     }
// }

class WXIntegralWallHttpRequest{
    request(object){
        !object && (object = {});
        wx.request({
            url:object.url,
            data:object.data,
            header: object.params && object.params.header ? object.params.header : null,
            success:object.success,
            fail:object.fail,
            complete:object.complete,
        })
    }
}

class WXIntegralWallStatus{
    static FALSE = 0;
    static TRUE = 1;
    static BUSY = 2;
}

class WXIntegralWallScene{
    static MINI_PROGRAM_TO_MINI_PROGRAM = 1037;
}

if(!window.xiaoduo){
    window.xiaoduo = {}
}

if(!window.xiaoduo.wxIntegralWall){
    window.xiaoduo.wxIntegralWall = new WXIntegralWall();
}