declare let xiaoduo:Xiaoduo;

declare interface Xiaoduo{
    wxQuestMarket:WXQuestMarket
}

declare interface Window{
    xiaoduo:Xiaoduo
}

declare class WXQuestMarket{
    questStatus:{NOT_YET_PLAY:number, PLAYING:number, COMPLETE_PLAY:number, AWARD_OBTAINED:number};
    currQuest:WXQuestMarketQuest;

    constructor();
    init(target:string | Laya.Socket, params?:{token?:string, success?:(quest:WXQuestMarketQuest)=>void, fail?:()=>void}):void;
    requestQuestList(object?:{success?:(list:null | WXQuestMarketQuest[])=>void, fail?, complete?}):void;
    requestSubmitQuestProgress(object:{quest:WXQuestMarketQuest, success?, fail?, complete?}):void;
    requestQuestReward(object:{questId:number, success?:(code) => void, fail?, complete?}):void;
}

declare class WXQuestMarketQuest{
    questId:number;
    appId:string;
    appName:string;
    appIconUrl:string;
    pageQuery:string;
    questActivated:boolean;
    questStatus:number;
    questTargets:{targetId:number, questId:number, progress:number, target:number, desc:string}[];
    questAwards:{awardId:number, awardNum:number}[];
}
