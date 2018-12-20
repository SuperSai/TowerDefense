declare let xiaoduo:Xiaoduo;

declare interface Xiaoduo{
    wxIntegralWall:WXIntegralWall
}

declare interface Window{
    xiaoduo:Xiaoduo
}

declare class WXIntegralWall{
    constructor();
    requestQuestList(object?:{success?:(list:null | WXIntegralWallQuest[])=>void, fail?, complete?}):void;
    requestQuestReward(object:{appId:string, success?, fail?, complete?}):void;
    requestQuestClear(object:{appId:string, success?, fail?, complete?}):void;
    requestActivated(object:{referrerInfo:{appId, extraData?:{}}, success?, fail?, complete?}):void;
}

declare class WXIntegralWallQuest{
    appId:string;
    appName:string;
    appIconUrl:string;
    questActivated:boolean;
    questTarget:number;
    questProgress:number;
    questProgressDesc:string[];
}