
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.common.item {
    export class RewardItemUI extends View {
		public itemImg:Laya.Image;
		public txt_count:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":130,"height":130},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":65,"x":65,"var":"itemImg","scaleY":0.8,"scaleX":0.8,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":92,"x":11,"width":109,"var":"txt_count","text":"x1","strokeColor":"#9e2d00","stroke":4,"height":28,"fontSize":26,"color":"#ffffff","align":"right"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.item.RewardItemUI.uiView);

        }

    }
}

module ui.common.view {
    export class DebugViewUI extends View {
		public viewBtnContainer:View;
		public btnUid:Laya.Button;
		public btnShowStats:Laya.Button;
		public btnCompleteNovice:Laya.Button;
		public btnResetKingLevel:Laya.Button;
		public btnAddGold:Laya.Button;
		public btnAddDiamond:Laya.Button;
		public btnCrearStorage:Laya.Button;
		public btnExitGame:Laya.Button;
		public viewStackArrow:Laya.ViewStack;

        public static  uiView:any ={"type":"View","props":{"mouseThrough":true,"mouseEnabled":true},"child":[{"type":"View","props":{"y":0,"x":0,"width":787,"var":"viewBtnContainer","mouseThrough":true,"mouseEnabled":true,"height":1094},"child":[{"type":"Box","props":{"y":680,"x":605,"alpha":0.5},"child":[{"type":"Rect","props":{"width":178,"lineWidth":1,"height":414,"fillColor":"#000000"}}]},{"type":"Button","props":{"y":697,"x":620,"width":130,"var":"btnUid","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"UID: ","height":26}},{"type":"Button","props":{"y":747,"x":620,"width":130,"var":"btnShowStats","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"运行数据","height":26}},{"type":"Button","props":{"y":797,"x":620,"width":130,"var":"btnCompleteNovice","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"跳过新手","height":26}},{"type":"Button","props":{"y":847,"x":620,"width":130,"var":"btnResetKingLevel","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"重置王座","height":26}},{"type":"Button","props":{"y":897,"x":620,"width":130,"var":"btnAddGold","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"添加金币","height":26}},{"type":"Button","props":{"y":947,"x":620,"width":130,"var":"btnAddDiamond","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"添加钻石","height":26}},{"type":"Button","props":{"y":997,"x":620,"width":130,"var":"btnCrearStorage","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"清空缓存","height":26}},{"type":"Button","props":{"y":1047,"x":620,"width":130,"var":"btnExitGame","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"退出游戏","height":26}}]},{"type":"ViewStack","props":{"y":1101,"x":633,"var":"viewStackArrow"},"child":[{"type":"Button","props":{"y":6,"x":17,"width":130,"name":"item0","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"▶▶","height":26}},{"type":"Button","props":{"y":6,"x":17,"width":130,"name":"item1","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"◀◀","height":26}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.view.DebugViewUI.uiView);

        }

    }
}

module ui.common.view {
    export class DiamondBuyViewUI extends View {
		public petTitleImg:Laya.Image;
		public imgMonster:Laya.Image;
		public accTitleImg:Laya.Image;
		public accIcon:Laya.Image;
		public txtDiamond:Laya.Label;
		public btnBuy:Laya.Button;
		public btnExit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":-50,"x":-25,"width":650,"skin":"images/component/frame_9calce_04.png","name":"imgBg","height":500},"child":[{"type":"Image","props":{"y":26,"x":223,"var":"petTitleImg","skin":"images/buy_title.png","name":"imgBg2"}},{"type":"Image","props":{"y":297,"x":277,"skin":"images/core/diamond.png"}},{"type":"Image","props":{"y":143,"x":252,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":162,"x":282,"var":"imgMonster","skin":"images/carImg/hero_d1_18.png","name":"imgMonster"}},{"type":"Image","props":{"y":31,"x":227,"var":"accTitleImg","skin":"images/accelerate_title.png"}},{"type":"Image","props":{"y":159,"x":267,"var":"accIcon","skin":"images/accelerate_icon.png"}},{"type":"Label","props":{"y":295,"x":319,"var":"txtDiamond","text":"0","name":"txtDiamond","fontSize":40,"color":"#731d0e","align":"left"}},{"type":"Label","props":{"y":496,"x":234,"text":"点击空白处关闭","fontSize":26,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":344,"x":162,"var":"btnBuy","stateNum":1,"skin":"images/component/yellow_btn.png","name":"btnBuy"},"child":[{"type":"Label","props":{"y":35,"x":83,"text":"点击购买","strokeColor":"#825321","stroke":2,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":-8,"x":564,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.common.view.DiamondBuyViewUI.uiView);

        }

    }
}

module ui.common.view {
    export class FreeGetPetViewUI extends View {
		public imgPet:Laya.Image;
		public btnExit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"width":650,"skin":"images/component/frame_9calce_04.png","name":"imgBg","height":500},"child":[{"type":"Image","props":{"y":26,"x":175,"skin":"images/getFreePet_title.png"}},{"type":"Image","props":{"y":218,"x":252,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":240,"x":284,"var":"imgPet","skin":"images/carImg/hero_d1_18.png"}},{"type":"Label","props":{"y":496,"x":234,"text":"点击空白处关闭","fontSize":26,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":-8,"x":564,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.common.view.FreeGetPetViewUI.uiView);

        }

    }
}

module ui.common.view {
    export class MessageTipsUI extends View {
		public bg:Laya.Image;
		public hbox:Laya.HBox;
		public txt_content:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"images/component/frame_tips_bg.png","sizeGrid":"34,62,36,71"}},{"type":"HBox","props":{"y":18,"x":19,"var":"hbox"},"child":[{"type":"Image","props":{"skin":"images/core/core_tips_icon.png"}},{"type":"Label","props":{"y":2,"x":38,"var":"txt_content","text":"消息提示","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.view.MessageTipsUI.uiView);

        }

    }
}

module ui.common.view {
    export class OfflineRewardsViewUI extends View {
		public lightImg:Laya.Image;
		public imgMoney:Laya.Image;
		public txtMoney:Laya.Label;
		public btnShare:Laya.Button;
		public btnVideo:Laya.Button;
		public btnExit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":724,"height":654},"child":[{"type":"Box","props":{"y":87,"x":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":716,"skin":"images/component/frame_9calce_01.png","height":567,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":231,"x":351,"var":"lightImg","skin":"images/core/light_01.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-59,"x":63,"skin":"images/offlineReward/title.png"}},{"type":"Image","props":{"y":164,"x":290,"width":146,"skin":"images/component/frame_9calce_03.png","height":145,"sizeGrid":"26,31,23,28"}},{"type":"Label","props":{"y":502,"x":224,"text":"离线收益最多两个小时","fontSize":28,"color":"#f1774e","bold":true}},{"type":"Image","props":{"y":181,"x":307,"var":"imgMoney","skin":"images/core/coin_stack_01.png","name":"imgMoney"},"child":[{"type":"Label","props":{"y":150,"x":-196,"width":500,"var":"txtMoney","text":"264.78M","strokeColor":"#a86c42","stroke":4,"name":"txtMoney","fontSize":50,"color":"#fff4e1","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":390,"x":208,"var":"btnShare","stateNum":1,"skin":"images/component/normal_btn.png","name":"btnShare"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Label","props":{"y":28,"x":2,"width":304,"text":"免费领取x2","strokeColor":"#946430","stroke":5,"height":40,"fontSize":40,"color":"#fff4e1","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":389,"x":209,"var":"btnVideo","stateNum":1,"skin":"images/component/normal_btn.png","name":"btnVideo"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Label","props":{"y":28,"x":2,"width":262,"text":"视频领取x2","strokeColor":"#946430","stroke":5,"height":40,"fontSize":40,"color":"#fff4e1","bold":true,"align":"center"}},{"type":"Image","props":{"y":28,"x":246,"skin":"images/core/video_icon.png"}}]},{"type":"Button","props":{"y":0,"x":631,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.common.view.OfflineRewardsViewUI.uiView);

        }

    }
}

module ui.common.view {
    export class RewardGoldViewUI extends View {
		public txt_gold:Laya.Label;
		public txt_lastCount:Laya.Label;
		public btn_free:Laya.Button;
		public txt_share:Laya.Label;
		public advBox:Laya.Box;
		public btnExit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":723,"height":600},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":718,"skin":"images/component/frame_9calce_04.png","sizeGrid":"178,120,101,152","name":"imgBg","height":564}},{"type":"Image","props":{"y":35,"x":266,"skin":"images/rewardGold/rewardGold_title.png","name":"imgBg2"}},{"type":"Image","props":{"y":148,"x":288,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":160,"x":299,"skin":"images/core/coin_stack_01.png"}},{"type":"Image","props":{"y":309,"x":269,"skin":"images/core/coin_big.png"}},{"type":"Image","props":{"y":375,"x":25,"width":665,"skin":"images/component/frame_line_01.png"}},{"type":"Label","props":{"y":313,"x":337,"var":"txt_gold","text":"0","fontSize":50,"color":"#884a00","bold":true,"align":"left"}},{"type":"Label","props":{"y":563,"x":271,"text":"点击空白处关闭","fontSize":26,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":502,"x":268,"var":"txt_lastCount","text":"今天剩余10次","fontSize":30,"color":"#d20000","bold":true}},{"type":"Button","props":{"y":388,"x":198,"var":"btn_free","stateNum":1,"skin":"images/component/yellow_btn.png"},"child":[{"type":"Label","props":{"y":32,"x":71,"var":"txt_share","text":"免费领取","strokeColor":"#825321","stroke":4,"fontSize":45,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}},{"type":"Box","props":{"y":34,"x":33,"var":"advBox"},"child":[{"type":"Label","props":{"text":"看视频领取","strokeColor":"#825321","stroke":4,"fontSize":40,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":2,"x":220,"skin":"images/core/video_icon.png"}}]}]},{"type":"Button","props":{"y":-11,"x":630,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.common.view.RewardGoldViewUI.uiView);

        }

    }
}

module ui.common.view {
    export class SkillExplainViewUI extends View {
		public btnExit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Box","props":{"y":-20,"x":-62},"child":[{"type":"Image","props":{"y":0,"width":718,"skin":"images/component/frame_9calce_04.png","sizeGrid":"178,120,101,152","height":589}},{"type":"Image","props":{"y":29,"x":256,"skin":"images/skill_title_icon.png"}},{"type":"Image","props":{"y":142,"x":34,"width":653,"skin":"images/component/frame_9calce_02.png","sizeGrid":"25,32,32,36","height":407}},{"type":"Image","props":{"y":169,"x":61,"skin":"images/core/skill_01.png","scaleY":0.65,"scaleX":0.65}},{"type":"Image","props":{"y":293,"x":61,"skin":"images/core/skill_02.png","scaleY":0.65,"scaleX":0.65}},{"type":"Image","props":{"y":418,"x":61,"skin":"images/core/skill_03.png","scaleY":0.65,"scaleX":0.65}},{"type":"Label","props":{"y":587,"x":272,"text":"点击空白处关闭","fontSize":26,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":175,"x":180,"text":"雷神之怒：","fontSize":28,"color":"#9a2525"}},{"type":"Label","props":{"y":215,"x":180,"text":"攻击时有几率同时攻击2个怪物","fontSize":24,"color":"#8b6107","align":"left"}},{"type":"Label","props":{"y":300,"x":180,"text":"冰冻之触：","fontSize":28,"color":"#9a2525"}},{"type":"Label","props":{"y":340,"x":180,"text":"攻击时有几率造成20%减速效果持续5秒","fontSize":24,"color":"#8b6107","align":"left"}},{"type":"Label","props":{"y":426,"x":180,"text":"幽冥毒液：","fontSize":28,"color":"#9a2525"}},{"type":"Label","props":{"y":466,"x":180,"wordWrap":true,"width":429,"text":"攻击时有一定几率造成中毒效果对怪物造成单体持续性伤害","height":54,"fontSize":24,"color":"#8b6107","align":"left"}},{"type":"Button","props":{"y":-7,"x":634,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.common.view.SkillExplainViewUI.uiView);

        }

    }
}

module ui.common.view {
    export class SkyDropObtainViewUI extends View {
		public imgMask:Laya.Image;
		public imgCloseBtn:Laya.Image;
		public imgIcon:Laya.Image;
		public imgHelp:Laya.Image;
		public imgVideo:Laya.Image;
		public lblDesc:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"var":"imgMask","top":0,"skin":"images/core/black.jpg","right":0,"left":0,"bottom":0,"alpha":0.7},"child":[{"type":"Label","props":{"y":940,"x":265,"text":"点击空白处关闭","fontSize":30,"font":"SimHei","color":"#ffffff"}}]},{"type":"Image","props":{"y":368,"x":32,"width":687,"skin":"images/component/frame_9calce_01.png","height":624,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":320,"x":621,"var":"imgCloseBtn","skin":"images/component/frame_close_btn.png"}},{"type":"Image","props":{"y":292,"x":100,"skin":"images/skyDrop/title.png"}},{"type":"Image","props":{"y":565,"x":309,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":628,"x":376,"var":"imgIcon","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":835,"x":125,"var":"imgHelp","skin":"images/wx_help.png"}},{"type":"Image","props":{"y":835,"x":426,"var":"imgVideo","skin":"images/wx_video.png"}},{"type":"Label","props":{"y":746,"x":93,"width":574,"var":"lblDesc","text":"免费获得英雄一只","height":63,"fontSize":36,"font":"SimHei","color":"#762706","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.view.SkyDropObtainViewUI.uiView);

        }

    }
}

module ui.common.view {
    export class SkyDropViewUI extends View {
		public imgCloseBtn:Laya.Image;
		public btnHelp:Laya.Button;
		public btnVideo:Laya.Button;
		public lblDesc:Laya.Label;
		public lblNum:Laya.Label;
		public lblDuration:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":357,"x":17,"width":716,"skin":"images/component/frame_9calce_01.png","height":565,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":353,"x":649,"var":"imgCloseBtn","skin":"images/component/frame_close_btn.png"}},{"type":"Image","props":{"y":288,"x":80,"skin":"images/skyDrop/title.png"}},{"type":"Button","props":{"y":780,"x":159,"width":184,"var":"btnHelp","stateNum":1,"skin":"images/component/frame_btn_small_blue.png","labelStrokeColor":"#306294","labelStroke":4,"labelSize":32,"labelColors":"#FFFFFF","labelBold":true,"label":"求助","height":63,"sizeGrid":"0,32,0,34"}},{"type":"Button","props":{"y":780,"x":409,"width":184,"var":"btnVideo","stateNum":1,"skin":"images/component/frame_btn_small_yellow.png","labelStrokeColor":"#825321","labelStroke":4,"labelSize":32,"labelColors":"#FFFFFF","labelBold":true,"label":"领取","height":63}},{"type":"Label","props":{"y":583,"x":63,"width":406,"var":"lblDesc","text":"英雄攻击力增加","height":63,"fontSize":40,"font":"SimHei","color":"#884a00","bold":true,"align":"right"}},{"type":"Label","props":{"y":583,"x":475,"width":119,"var":"lblNum","text":"50%","height":37,"fontSize":44,"font":"SimHei","color":"#eb6626","bold":true}},{"type":"Label","props":{"y":667,"x":424,"width":325,"text":"秒","height":63,"fontSize":40,"font":"SimHei","color":"#884a00","bold":true}},{"type":"Label","props":{"y":667,"x":276,"width":325,"text":"持续","height":63,"fontSize":40,"font":"SimHei","color":"#884a00","bold":true}},{"type":"Label","props":{"y":668,"x":348,"width":78,"var":"lblDuration","text":"180","height":37,"fontSize":44,"font":"SimHei","color":"#eb6626","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.view.SkyDropViewUI.uiView);

        }

    }
}

module ui.common.view {
    export class VideoAdViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":723,"height":569},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/component/frame_9calce_04.png","name":"imgBg"},"child":[{"type":"Label","props":{"y":266,"x":320,"wordWrap":true,"text":"当前","fontSize":40,"color":"#6c4419","align":"center"}},{"type":"Button","props":{"y":-3,"x":630,"stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Label","props":{"y":327,"x":200,"text":"没有可观看的视频","fontSize":40,"color":"#6c4419","align":"center"}},{"type":"Label","props":{"y":564,"x":262,"text":"点击空白处关闭","fontSize":28,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":33,"x":309,"skin":"images/zhagao_title.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.common.view.VideoAdViewUI.uiView);

        }

    }
}

module ui.daySign {
    export class DaySignViewUI extends View {
		public mainView:View;
		public signItemList:Laya.List;
		public lastItemBox:Laya.Box;
		public btnExit:Laya.Button;
		public btnGet:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0},"child":[{"type":"View","props":{"y":0,"x":0,"width":714,"visible":true,"var":"mainView","name":"mainView","height":1019},"child":[{"type":"Image","props":{"y":5,"x":0,"width":716,"skin":"images/component/frame_9calce_01.png","rotation":0,"height":1014,"sizeGrid":"168,65,62,82"},"child":[{"type":"Image","props":{"y":36,"x":250,"skin":"images/dailySign/title.png"}},{"type":"List","props":{"y":124,"x":37,"width":641,"var":"signItemList","spaceY":8,"spaceX":-12,"repeatY":2,"repeatX":3,"mouseEnabled":false,"height":506},"child":[{"type":"Box","props":{"y":26,"x":0,"width":223,"renderType":"render","height":228,"cacheAs":"bitmap"},"child":[{"type":"Button","props":{"y":0,"x":0,"stateNum":1,"skin":"images/dailySign/item_bg_normal.png","name":"btnBox","mouseEnabled":false},"child":[{"type":"Script","props":{"y":10,"x":10,"runtime":"ScaleAnimScript"}}]},{"type":"Image","props":{"y":111,"x":110,"skin":"images/dailySign/icon_day_1.png","name":"imgIcon","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":19,"x":21,"width":178,"text":"第七天","strokeColor":"#946430","stroke":4,"name":"txtTitle","height":36,"fontSize":28,"color":"#fff6e3","align":"center"}},{"type":"Label","props":{"y":162,"x":44,"width":135,"text":"钻石x20","name":"txtDiamond","height":30,"fontSize":30,"color":"#fe774e","bold":true,"align":"center"}},{"type":"Image","props":{"y":0,"x":0,"width":220,"visible":false,"skin":"images/dailySign/mask.png","name":"imgMask","height":230,"sizeGrid":"48,53,56,56"}},{"type":"Image","props":{"y":105,"x":63,"visible":false,"skin":"images/dailySign/obtained_mark.png","name":"imgObtainedMark"}}]}]},{"type":"Box","props":{"y":627,"x":36,"width":628,"var":"lastItemBox","renderType":"render","height":216,"cacheAs":"bitmap"},"child":[{"type":"Button","props":{"y":0,"x":0,"stateNum":1,"skin":"images/dailySign/item_bg_7th_day.png","name":"btnBox","mouseEnabled":false},"child":[{"type":"Script","props":{"y":10,"x":10,"runtime":"ScaleAnimScript"}}]},{"type":"Label","props":{"y":15,"x":17,"width":614,"text":"第七天","strokeColor":"#946430","stroke":4,"name":"txtTitle","height":34,"fontSize":34,"color":"#fff6e3","align":"center"}},{"type":"Label","props":{"y":161,"x":182,"width":61,"text":"300","name":"txtDiamond","height":32,"fontSize":28,"color":"#f1774e","bold":true,"align":"left"}},{"type":"Label","props":{"y":161,"x":97,"width":93,"text":"钻石x","height":32,"fontSize":28,"color":"#f1774e","bold":true,"align":"left"}},{"type":"Image","props":{"y":38,"x":39,"skin":"images/dailySign/desc_7days.png"}},{"type":"Image","props":{"y":68,"x":461,"skin":"images/dailySign/icon_day_7.png"}},{"type":"Image","props":{"y":78,"x":312,"skin":"images/dailySign/icon_day_6.png"}},{"type":"Label","props":{"y":127,"x":227,"width":47,"text":"8","name":"lblEssence","height":32,"fontSize":28,"color":"#f1774e","bold":true,"align":"left"}},{"type":"Label","props":{"y":127,"x":86,"width":146,"text":"精华碎片x","height":32,"fontSize":28,"color":"#f1774e","bold":true,"align":"left"}},{"type":"Image","props":{"y":-2,"x":-4,"width":648,"visible":false,"skin":"images/dailySign/mask.png","name":"imgMask","height":230,"sizeGrid":"48,53,56,56"}},{"type":"Image","props":{"y":60,"x":278,"visible":false,"skin":"images/dailySign/obtained_mark.png","name":"imgObtainedMark"}}]}]},{"type":"Button","props":{"y":0,"x":631,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":875,"x":205,"var":"btnGet","stateNum":1,"skin":"images/component/normal_btn.png","name":"btnGet"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Label","props":{"y":22,"x":2,"width":305,"text":"领取","strokeColor":"#946430","stroke":4,"height":59,"fontSize":50,"color":"#fff6e3","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":94,"x":654,"skin":"images/dailySign/left_link.png"}},{"type":"Image","props":{"y":94,"x":46,"skin":"images/dailySign/right_link.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.daySign.DaySignViewUI.uiView);

        }

    }
}

module ui.evolution {
    export class EvolutionAdvancedViewUI extends View {
		public mainView:View;
		public txtItemPrize3:Laya.Label;
		public txtItemPrize1:Laya.Label;
		public txtItemPrize2:Laya.Label;
		public txtNeedItem1:Laya.Label;
		public txtItemName1:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":715,"height":1014},"child":[{"type":"View","props":{"y":0,"width":715,"var":"mainView","name":"mainView","height":1014,"centerX":0},"child":[{"type":"Label","props":{"y":848,"x":270,"text":"点击空白处关闭","name":"txtExit","fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":0,"x":0,"width":715,"skin":"images/component/frame_9calce_01.png","sizeGrid":"158,62,69,62","name":"imgBg","height":1014},"child":[{"type":"Image","props":{"y":32,"x":259,"skin":"images/evolution_shop_title.png"}},{"type":"Image","props":{"y":587,"x":36,"skin":"images/component/frame_line_01.png"}},{"type":"Image","props":{"y":216,"x":36,"skin":"images/component/frame_line_01.png"}},{"type":"Image","props":{"y":627,"x":32,"skin":"images/component/frame_9calce_05.png"}},{"type":"Image","props":{"y":286,"x":61,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":285,"x":295,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":285,"x":520,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":305,"x":94,"skin":"images/carImg/hero_d1_18.png"}},{"type":"Image","props":{"y":301,"x":537,"skin":"images/luckLottery/luck_prize_5.png"}},{"type":"Image","props":{"y":310,"x":310,"skin":"images/luckLottery/luck_prize_6.png"}},{"type":"Label","props":{"y":437,"x":543,"text":"精华碎片","fontSize":24,"color":"#886300","align":"right"}},{"type":"Label","props":{"y":437,"x":338,"text":"钻石","fontSize":24,"color":"#886300","align":"right"}},{"type":"Label","props":{"y":437,"x":79,"text":"强•狄安娜","fontSize":24,"color":"#886300","align":"right"}},{"type":"Label","props":{"y":541,"x":68,"text":"进化条件","fontSize":32,"color":"#c83d33","align":"left"}},{"type":"Label","props":{"y":925,"x":177,"text":"注：进化后系统将收回未进化英雄","fontSize":24,"color":"#712f0f","align":"left"}},{"type":"Label","props":{"y":169,"x":68,"text":"进化后获得","fontSize":32,"color":"#c83d33","align":"left"}},{"type":"Label","props":{"y":373,"x":588,"var":"txtItemPrize3","text":"x30","strokeColor":"#946430","stroke":3,"name":"txtItemPrize3","fontSize":30,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":373,"x":149,"var":"txtItemPrize1","text":"x3","strokeColor":"#946430","stroke":3,"name":"txtItemPrize1","fontSize":30,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":373,"x":347,"var":"txtItemPrize2","text":"x500","strokeColor":"#946430","stroke":3,"name":"txtItemPrize2","fontSize":30,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":639,"x":222,"var":"txtNeedItem1","text":"0/1","name":"txtNeedItem1","fontSize":28,"color":"#9a8d00","align":"left"}},{"type":"Label","props":{"y":636,"x":68,"var":"txtItemName1","text":"希芙 Lv30:","name":"txtItemName1","fontSize":30,"color":"#9a2525","align":"left"}},{"type":"Button","props":{"y":-4,"x":633,"stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":768,"x":194,"stateNum":1,"skin":"images/component/yellow_btn.png","name":"btnUpdate","labelStrokeColor":"#946430","labelStroke":2,"labelSize":60,"labelColors":"#ffffff","labelBold":true,"label":"进化","disabled":true},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.evolution.EvolutionAdvancedViewUI.uiView);

        }

    }
}

module ui.evolution {
    export class EvolutionViewUI extends View {
		public mainView:View;
		public btnExit:Laya.Button;
		public btnUpdate:Laya.Button;
		public heroBox:Laya.Box;
		public txtNeedItem:Laya.Label;
		public txtItemName:Laya.Label;
		public diamondBox:Laya.Box;
		public txtNeedDiamond:Laya.Label;
		public txtDiamondName:Laya.Label;
		public txtDoubleAdd:Laya.Label;
		public txtAtkSpeed:Laya.Label;
		public txtAtkAdd:Laya.Label;
		public txtAtk:Laya.Label;
		public txtKingLevel:Laya.Label;
		public txtSkillDes:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"View","props":{"y":190,"x":0,"width":750,"var":"mainView","name":"mainView","height":826},"child":[{"type":"Image","props":{"y":-88,"x":18,"width":715,"skin":"images/component/frame_9calce_01.png","sizeGrid":"158,62,69,62","name":"imgBg","height":1014},"child":[{"type":"Image","props":{"y":33,"x":259,"skin":"images/king_title_icon.png"}},{"type":"Image","props":{"y":494,"x":36,"skin":"images/component/frame_line_01.png"}},{"type":"Label","props":{"y":449,"x":66,"text":"升级条件:","fontSize":32,"color":"#c83d33","align":"left"}},{"type":"Button","props":{"y":-8,"x":634,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":796,"x":197,"var":"btnUpdate","stateNum":1,"skin":"images/component/yellow_btn.png","labelStrokeColor":"#946430","labelStroke":2,"labelSize":50,"labelColors":"#ffffff","labelBold":true,"label":"升级","disabled":true},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Box","props":{"y":507,"x":32,"var":"heroBox"},"child":[{"type":"Image","props":{"skin":"images/component/frame_9calce_05.png"}},{"type":"Label","props":{"y":13,"x":218,"var":"txtNeedItem","text":"0/1","fontSize":28,"color":"#9a8d00","align":"left"}},{"type":"Label","props":{"y":11,"x":29,"var":"txtItemName","text":"刺王龙 Lv11:","fontSize":30,"color":"#9a2525","align":"left"}}]},{"type":"Box","props":{"y":558,"x":32,"var":"diamondBox"},"child":[{"type":"Image","props":{"skin":"images/component/frame_9calce_05.png"}},{"type":"Image","props":{"y":13,"x":32,"skin":"images/core/diamond_icon.png","scaleY":0.6,"scaleX":0.6}},{"type":"Label","props":{"y":13,"x":156,"var":"txtNeedDiamond","text":"0/50","fontSize":28,"color":"#9a8d00","align":"left"}},{"type":"Label","props":{"y":11,"x":73,"var":"txtDiamondName","text":"钻石:","fontSize":30,"color":"#9a2525","align":"left"}}]},{"type":"Box","props":{"y":140,"x":33},"child":[{"type":"Image","props":{"width":649,"skin":"images/component/frame_9calce_02.png","sizeGrid":"25,27,32,27","height":270}},{"type":"Image","props":{"y":90,"x":97,"skin":"images/component/frame_9calce_06.png"}},{"type":"Image","props":{"y":30,"x":97,"skin":"images/component/frame_9calce_07.png","sizeGrid":"0,31,0,33"}},{"type":"Image","props":{"y":148,"x":97,"skin":"images/component/frame_9calce_06.png"}},{"type":"Image","props":{"y":90,"x":429,"skin":"images/component/frame_9calce_06.png"}},{"type":"Image","props":{"y":148,"x":429,"skin":"images/component/frame_9calce_06.png"}},{"type":"Label","props":{"y":35,"x":33,"text":"等级:","fontSize":28,"color":"#9a2525"}},{"type":"Label","props":{"y":95,"x":33,"text":"攻击:","fontSize":28,"color":"#9a2525"}},{"type":"Label","props":{"y":154,"x":33,"text":"速度:","fontSize":28,"color":"#9a2525"}},{"type":"Label","props":{"y":95,"x":306,"text":"攻击加成:","fontSize":28,"color":"#9a2525"}},{"type":"Label","props":{"y":154,"x":306,"text":"暴击加成:","fontSize":28,"color":"#9a2525"}},{"type":"Label","props":{"y":215,"x":33,"text":"技能效果:","fontSize":28,"color":"#9a2525"}},{"type":"Label","props":{"y":154,"x":449,"var":"txtDoubleAdd","text":"0.8%","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":154,"x":114,"var":"txtAtkSpeed","text":"0.3s","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":95,"x":449,"var":"txtAtkAdd","text":"1.5%","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":96,"x":114,"var":"txtAtk","text":"10","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":35,"x":114,"var":"txtKingLevel","text":"1","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":215,"x":162,"width":400,"var":"txtSkillDes","text":"增加所有上阵英雄的攻击和暴击","fontSize":28,"color":"#8b6107","align":"left"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.evolution.EvolutionViewUI.uiView);

        }

    }
}

module ui.guide {
    export class NoviceViewUI extends View {
		public viewInteract:View;
		public imgTop:Laya.Image;
		public imgRight:Laya.Image;
		public imgBottom:Laya.Image;
		public imgLeft:Laya.Image;
		public viewStackNovice:Laya.ViewStack;
		public imgDialogCharacter:Laya.Image;
		public lblDialogScript:Laya.Label;
		public btnReturnNovice1:Laya.Button;
		public viewInteractArea:View;
		public viewClickTargetContainer:View;
		public imgFinger:Laya.Image;
		public imgClickCharacter:Laya.Image;
		public lblClickScript:Laya.Label;
		public btnReturnNovice2:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"name":"NoviceViewUI","mouseThrough":true,"mouseEnabled":true},"child":[{"type":"View","props":{"y":0,"x":0,"width":750,"visible":false,"var":"viewInteract","name":"ViewInteract","mouseThrough":true,"mouseEnabled":true,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"imgTop","skin":"images/core/blank.png","mouseEnabled":true,"height":400}},{"type":"Image","props":{"y":400,"x":420,"width":330,"var":"imgRight","skin":"images/core/blank.png","mouseEnabled":true,"height":100}},{"type":"Image","props":{"y":500,"x":0,"width":750,"var":"imgBottom","skin":"images/core/blank.png","mouseEnabled":true,"height":834}},{"type":"Image","props":{"y":400,"x":0,"width":200,"var":"imgLeft","skin":"images/core/blank.png","mouseEnabled":true,"height":100}}]},{"type":"ViewStack","props":{"var":"viewStackNovice","selectedIndex":0,"name":"viewStackNovice"},"child":[{"type":"View","props":{"y":0,"x":0,"width":750,"name":"item0","height":1334},"child":[{"type":"Image","props":{"y":791,"x":10,"var":"imgDialogCharacter","skin":"images/novice/character.png"},"child":[{"type":"Label","props":{"y":176,"x":236,"wordWrap":true,"width":300,"var":"lblDialogScript","text":"文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本","overflow":"scroll","leading":10,"height":103,"fontSize":26,"color":"#a17338"}},{"type":"Button","props":{"y":98,"x":409,"var":"btnReturnNovice1","stateNum":1,"skin":"images/component/frame_btn_small_blue.png","labelStrokeColor":"#a17338","labelStroke":2,"labelSize":26,"labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":true,"label":"跳过","sizeGrid":"0,32,0,34"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]},{"type":"View","props":{"width":750,"name":"item1","height":1334},"child":[{"type":"View","props":{"y":1256,"x":263,"var":"viewInteractArea","name":"ViewInteractArea"},"child":[{"type":"View","props":{"y":0,"x":0,"name":"ViewMASK","alpha":0.5},"child":[{"type":"Rect","props":{"y":-1299,"x":-750,"width":1500,"lineWidth":1,"height":1155,"fillColor":"#000000"}},{"type":"Rect","props":{"y":126,"x":-750,"width":1500,"lineWidth":1,"height":1155,"fillColor":"#000000"}},{"type":"Rect","props":{"y":-144,"x":-750,"width":615,"lineWidth":1,"height":270,"fillColor":"#000000"}},{"type":"Rect","props":{"y":-144,"x":135,"width":615,"lineWidth":1,"height":270,"fillColor":"#000000"}},{"type":"Image","props":{"y":-144,"x":-135,"width":270,"skin":"images/novice/interact_circle.png","height":270}}]},{"type":"View","props":{"y":0,"x":0,"var":"viewClickTargetContainer","name":"viewClickTargetContainer"}},{"type":"Image","props":{"y":30,"x":30,"var":"imgFinger","skin":"images/novice/finger.png"}}]},{"type":"Image","props":{"y":773,"x":88,"var":"imgClickCharacter","skin":"images/novice/character.png"},"child":[{"type":"Label","props":{"y":171,"x":225,"wordWrap":true,"width":300,"var":"lblClickScript","text":"文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本","overflow":"scroll","leading":10,"height":103,"fontSize":26,"color":"#a17338"}},{"type":"Button","props":{"y":96,"x":407,"var":"btnReturnNovice2","stateNum":1,"skin":"images/component/frame_btn_small_blue.png","labelStrokeColor":"#a17338","labelStroke":2,"labelSize":26,"labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":true,"label":"跳过","sizeGrid":"0,32,0,34"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.guide.NoviceViewUI.uiView);

        }

    }
}

module ui.hall {
    export class BuffIconListUI extends View {
		public boxBuffList:Laya.HBox;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"HBox","props":{"y":69,"x":313,"var":"boxBuffList"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.hall.BuffIconListUI.uiView);

        }

    }
}

module ui.hall {
    export class HallSceneUI extends View {
		public ani1:Laya.FrameAnimation;
		public ani2:Laya.FrameAnimation;
		public ani4:Laya.FrameAnimation;
		public mainView:View;
		public imgUserInfo:Laya.Image;
		public progressBarExp:Laya.ProgressBar;
		public txtSection:Laya.Label;
		public txtLevel:Laya.Label;
		public imgMoney:Laya.Image;
		public txtMoney:Laya.Label;
		public imgDiamond:Laya.Image;
		public txtDiamond:Laya.Label;
		public txtKingLevel:Laya.Label;
		public imgTrain:Laya.Image;
		public gameTimebg:Laya.Image;
		public txtGameTime:Laya.Label;
		public gameTimeImg:Laya.Image;
		public imgBorn:Laya.Image;
		public imgDestination:Laya.Image;
		public btnDelete:Laya.Image;
		public carparkList:Laya.List;
		public spMountGuard:MonsterSprite;
		public roadView:View;
		public menuView:View;
		public btnAcce:Laya.Button;
		public btnShopShortcut:Laya.Button;
		public btnShop:Laya.Button;
		public btnDailyPrize:Laya.Button;
		public btnRanking:Laya.Button;
		public btnTask:Laya.Button;
		public btnLuckPrize:Laya.Button;
		public btnFeedback:Laya.Button;
		public btnMore:Laya.Button;
		public btnStrengthen:Laya.Button;
		public strengthenRedPoint:Laya.Image;
		public btnPower:Laya.Button;
		public btnEvolution:Laya.Button;
		public kingUpdateImg:Laya.Image;
		public btnStagePrize:Laya.Button;
		public btn_fly:Laya.Button;
		public btn_eliminate:Laya.Button;
		public btn_block:Laya.Button;
		public settingView:View;
		public btnMiniProgram:Laya.Button;
		public btnCarStore:Laya.Button;
		public imgPowerBg:Laya.Image;
		public progressBarPower:Laya.ProgressBar;
		public imgPowerCar:Laya.Image;
		public surpassView:View;
		public viewBuffContainer:View;
		public viewSkyDropContainer:View;
		public acceEffectView:View;
		public viewNoviceContainer:View;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":750,"height":1334},"child":[{"type":"View","props":{"width":750,"var":"mainView","name":"mainView","height":1334,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/bg.jpg","cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":68,"x":140,"skin":"images/effect/uiElectric/electric_4.png"},"compId":356}]},{"type":"Image","props":{"y":0,"x":375,"width":1,"var":"imgUserInfo","name":"imgUserInfo","height":1},"child":[{"type":"ProgressBar","props":{"y":31,"x":-120,"var":"progressBarExp","value":0,"skin":"images/game_exp_pro.png","name":"progressBarExp"}},{"type":"Image","props":{"y":13,"x":-161,"skin":"images/core/game_exp_pro_head.png"},"child":[{"type":"Image","props":{"y":-4,"x":275,"skin":"images/gicon_boss.png"}}]},{"type":"Label","props":{"y":38,"x":-52,"width":100,"var":"txtSection","text":"1/10","strokeColor":"#946430","stroke":3,"name":"txtSection","fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":32,"x":-198,"width":150,"var":"txtLevel","text":1,"strokeColor":"#946430","stroke":3,"name":"txtLevel","fontSize":30,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":17,"x":-347,"skin":"images/coin_frame.png","name":"imgMoney"},"child":[{"type":"Image","props":{"y":25,"x":10,"var":"imgMoney","skin":"images/core/coin_big.png","name":"imgMoney","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":15,"x":63,"width":200,"var":"txtMoney","text":1000,"name":"txtMoney","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}}]}]},{"type":"Image","props":{"y":76,"x":-341,"var":"imgDiamond","skin":"images/coin_frame.png","name":"imgDiamond"},"child":[{"type":"Image","props":{"y":-5,"x":-22,"skin":"images/core/diamond_icon.png"}},{"type":"Label","props":{"y":10,"x":43,"width":107,"var":"txtDiamond","text":0,"name":"txtDiamond","height":30,"fontSize":30,"color":"#ffffff","align":"left"}}]},{"type":"Label","props":{"y":208,"x":160,"width":80,"var":"txtKingLevel","text":1,"strokeColor":"#946430","stroke":3,"skewY":-10,"name":"txtKingLevel","fontSize":26,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":1083,"x":-90,"var":"imgTrain","skin":"images/component/frame_9calce_08.png","name":"imgTrain"},"child":[{"type":"Label","props":{"y":21,"x":31,"text":"训练中...","strokeColor":"#946430","stroke":3,"name":"txtTrain","fontSize":30,"color":"#ffffff","bold":true,"alpha":0.8,"align":"center"}}]},{"type":"Image","props":{"y":126,"x":-145,"var":"gameTimebg","skin":"images/hall_time_bg.png"}},{"type":"Label","props":{"y":145,"x":-135,"width":80,"var":"txtGameTime","text":"00:00","strokeColor":"#ffffff","stroke":2,"name":"txtGameTime","fontSize":26,"color":"#3568fd","bold":true,"alpha":1,"align":"center"}},{"type":"Image","props":{"y":102,"x":-162,"var":"gameTimeImg","skin":"images/game_gameLasttime.png","sizeGrid":"29,48,27,42"}}]},{"type":"Image","props":{"y":550,"x":1,"width":110,"visible":false,"var":"imgBorn","name":"imgBorn","mouseEnabled":false,"height":90,"cacheAs":"bitmap","anchorY":0.5,"anchorX":0.5,"alpha":0.5}},{"type":"Image","props":{"y":112,"x":220,"width":110,"visible":false,"var":"imgDestination","name":"imgDestination","mouseEnabled":false,"height":90,"alpha":0.5}},{"type":"Image","props":{"y":211,"x":240,"var":"btnDelete","skin":"images/huishou_icon_0.png","name":"btnDelete"}},{"type":"List","props":{"y":320,"width":508,"var":"carparkList","spaceY":16,"spaceX":10,"repeatY":5,"repeatX":4,"name":"carparkList","mouseEnabled":false,"height":700,"centerX":45},"child":[{"type":"Box","props":{"y":80,"x":30,"width":100,"visible":false,"renderType":"render","height":100},"child":[{"type":"Sprite","props":{"y":-14,"x":-14,"width":128,"runtime":"MonsterSprite","name":"car","height":128},"child":[{"type":"Image","props":{"y":75,"x":64,"width":100,"visible":false,"skin":"images/game_select_light.png","name":"imgLight","height":50,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":64,"x":64,"visible":false,"skin":"images/game_lockIcon.png","name":"imgLock","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":87,"x":79,"width":31,"visible":false,"skin":"images/lv_001.png","sizeGrid":"10,9,11,8","name":"imgLevel","height":25},"child":[{"type":"Label","props":{"y":3,"x":4,"width":23,"text":"0","name":"txtLevel","height":18,"fontSize":18,"color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":24,"x":34,"width":53,"text":"18关","strokeColor":"#83551a","stroke":2,"name":"txt_openLevel","height":18,"fontSize":18,"color":"#ffffff","align":"center"}},{"type":"Sprite","props":{"y":74,"x":62,"width":1,"name":"heroPos","height":1}}]}]}]},{"type":"Sprite","props":{"y":170,"x":535,"width":32,"var":"spMountGuard","runtime":"MonsterSprite","name":"spMountGuard","height":32}},{"type":"View","props":{"y":0,"x":0,"var":"roadView","name":"roadView"}},{"type":"View","props":{"y":10,"x":10,"name":"effectView"}},{"type":"View","props":{"y":1,"x":0,"var":"menuView","name":"menuView","cacheAs":"bitmap"},"child":[{"type":"Button","props":{"y":1093,"x":30,"var":"btnAcce","stateNum":1,"skin":"images/gbtn_acce.png","scaleY":1,"scaleX":1,"name":"btnAcce"},"compId":11,"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":60,"x":75,"visible":false,"skin":"images/core/video_icon.png","name":"imgAd"}},{"type":"Image","props":{"y":-16,"x":0,"visible":false,"skin":"images/daojishi_di.png","name":"imgAcce"},"child":[{"type":"Label","props":{"y":8,"x":8,"width":80,"text":"00:00","name":"txtAcceTime","fontSize":28,"color":"#ffffff","align":"center"}}]}]},{"type":"Button","props":{"y":1163,"x":183,"var":"btnShopShortcut","stateNum":1,"skin":"images/gbtn_shop.png","name":"btnShopShortcut"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":109,"x":30,"skin":"images/core/coin_40x40.png","name":"imgPrice","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":4,"x":45,"width":150,"text":1000,"strokeColor":"#946430","stroke":3,"name":"txtPrice","height":32,"fontSize":30,"color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":33,"x":13,"width":150,"text":"英雄 Lv1","strokeColor":"#ffe7b0","stroke":3,"name":"txtLevel","fontSize":28,"color":"#98592e","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":1163,"x":400,"var":"btnShop","stateNum":1,"skin":"images/gbtn_shop.png","name":"btnShop"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":-12,"x":41,"skin":"images/shop_btn_icon.png"}},{"type":"Label","props":{"y":91,"x":13,"width":150,"text":"酒馆","strokeColor":"#946430","stroke":3,"name":"txtPrice","fontSize":34,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":-3,"x":136,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRedPoint"}}]},{"type":"Button","props":{"y":124,"x":0,"visible":false,"var":"btnDailyPrize","stateNum":1,"skin":"images/dailySingBtn.png","name":"btnDailyPrize","cacheAs":"bitmap"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":11,"x":66,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRedPoint"}}]},{"type":"Button","props":{"y":809,"x":-3,"var":"btnRanking","stateNum":1,"skin":"images/gbtn_ranking.png","name":"btnRanking","alpha":0.8},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":273,"x":2,"var":"btnTask","stateNum":1,"skin":"images/gbtn_task.png","name":"btnTask"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":4,"x":86,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRedPoint"}},{"type":"Image","props":{"y":-56,"x":35,"skin":"images/effect/uiBird/niao_1.png"},"compId":355}]},{"type":"Button","props":{"y":563,"x":-15,"var":"btnLuckPrize","stateNum":1,"skin":"images/gbtn_luck.png","name":"btnLuckPrize"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":10,"x":82,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRedPoint"}},{"type":"Image","props":{"y":-4,"x":-2,"skin":"images/effect/uiLight/dx_zpd_3.png"},"compId":357}]},{"type":"Button","props":{"y":898,"x":-3,"var":"btnFeedback","stateNum":1,"skin":"images/gbtn_feedback.png","name":"btnFeedback"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":988,"x":-3,"var":"btnMore","stateNum":1,"skin":"images/more_icon.png","name":"btnMore"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":1095,"x":606,"var":"btnStrengthen","stateNum":1,"skin":"images/gbtn_strengthen.png","name":"btnStrengthen"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":0,"x":71,"visible":false,"var":"strengthenRedPoint","skin":"images/core/red_dot_hint.png","name":"strengthenRedPoint"}}]},{"type":"Button","props":{"y":1079,"x":590,"visible":false,"var":"btnPower","stateNum":1,"skin":"images/gbtn_fire.png","name":"btnPower"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":132,"x":497,"width":100,"var":"btnEvolution","name":"btnEvolution","height":100},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":1,"x":86,"skin":"images/evolution_hint_frame.png"},"child":[{"type":"Image","props":{"y":10,"x":57,"visible":false,"skin":""}},{"type":"Label","props":{"y":28,"x":-3,"width":80,"text":"守卫","skewY":-20,"name":"txtKingLevel","height":30,"fontSize":26,"color":"#4f8d2d","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":12,"x":140,"var":"kingUpdateImg","skin":"images/core/red_dot_hint.png"}}]},{"type":"Button","props":{"y":700,"x":0,"width":88,"visible":false,"var":"btnStagePrize","name":"btnStagePrize","labelSize":30,"height":106},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":1200,"x":30,"var":"btn_fly","stateNum":1,"skin":"images/core/core_fly_icon.png"}},{"type":"Button","props":{"y":1200,"x":604,"var":"btn_eliminate","stateNum":1,"skin":"images/core/core_eliminate_icon.png"}},{"type":"Button","props":{"y":266,"x":638,"var":"btn_block","stateNum":1,"skin":"images/core/core_block_icon.png"}}]},{"type":"View","props":{"y":987,"x":-63,"width":157,"visible":false,"var":"settingView","rotation":0,"name":"settingView","height":120},"child":[{"type":"Image","props":{"y":9,"x":0,"skin":"images/game_menu2.png"}},{"type":"Button","props":{"y":55,"x":88,"stateNum":1,"skin":"images/game_menu1.png","name":"menuBtn","mouseEnabled":false,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":30,"x":4,"stateNum":1,"skin":"images/home_menu_server.png","name":"menuServerBtn","mouseEnabled":false},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":103,"x":4,"stateNum":1,"skin":"images/home_menu_music1.png","name":"menuMusicBtn","mouseEnabled":false},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]},{"type":"Button","props":{"y":1269,"x":654,"width":84,"visible":false,"var":"btnMiniProgram","stateNum":1,"skin":"images/miniProgram_icon.png","name":"btnMiniProgram","labelSize":30,"height":61,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":450,"x":92,"visible":false,"var":"btnCarStore","stateNum":1,"skin":"images/box_001.png","name":"btnCarStore","labelSize":30,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Image","props":{"y":1201,"x":725,"visible":false,"var":"imgPowerBg","skin":"images/gpro_powerBg.png","name":"imgPowerBg","anchorY":1,"anchorX":0.5},"child":[{"type":"ProgressBar","props":{"y":90,"x":11,"var":"progressBarPower","value":0,"skin":"images/gpro_power.png","rotation":-90,"name":"progressBarPower","anchorY":0.5}},{"type":"Image","props":{"y":80,"x":11,"visible":false,"var":"imgPowerCar","skin":"images/core/coin_40x40.png","name":"imgPowerCar","anchorY":0.5,"anchorX":0.5,"alpha":0.9}}]},{"type":"View","props":{"y":110,"x":654,"width":96,"visible":false,"var":"surpassView","name":"surpassView","height":160}}]},{"type":"View","props":{"y":10,"x":10,"var":"viewBuffContainer"}},{"type":"View","props":{"y":0,"x":0,"var":"viewSkyDropContainer"}},{"type":"View","props":{"width":750,"visible":false,"var":"acceEffectView","name":"acceEffectView","height":1334,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":565,"x":375,"skin":"images/acce_effect.png","anchorY":0.5,"anchorX":0.5},"compId":127}]},{"type":"View","props":{"y":10,"x":10,"var":"viewNoviceContainer"}}],"animations":[{"nodes":[{"target":11,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleY","index":0},{"value":0.96,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleY","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleY","index":30}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleX","index":0},{"value":0.96,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleX","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleX","index":30}]}}],"name":"ani1","id":1,"frameRate":24,"action":0},{"nodes":[{"target":127,"keyframes":{"y":[{"value":1500,"tweenMethod":"backOut","tween":true,"target":127,"key":"y","index":0},{"value":600,"tweenMethod":"linearNone","tween":true,"target":127,"key":"y","index":10},{"value":610,"tweenMethod":"backIn","tween":true,"target":127,"key":"y","index":20},{"value":-150,"tweenMethod":"linearNone","tween":true,"target":127,"key":"y","index":35}]}}],"name":"ani2","id":2,"frameRate":24,"action":0},{"nodes":[],"name":"ani3","id":3,"frameRate":24,"action":2},{"nodes":[{"target":355,"keyframes":{"skin":[{"value":"images/effect/uiBird/niao_1.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":0},{"value":"images/effect/uiBird/niao_2.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":3},{"value":"images/effect/uiBird/niao_3.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":6},{"value":"images/effect/uiBird/niao_4.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":9},{"value":"images/effect/uiBird/niao_5.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":12},{"value":"images/effect/uiBird/niao_6.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":15},{"value":"images/effect/uiBird/niao_7.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":18},{"value":"images/effect/uiBird/niao_1.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":35}]}},{"target":356,"keyframes":{"skin":[{"value":"images/effect/uiElectric/electric_1.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":0},{"value":"images/effect/uiElectric/electric_2.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":5},{"value":"images/effect/uiElectric/electric_3.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":10},{"value":"images/effect/uiElectric/electric_4.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":15},{"value":"images/effect/uiElectric/electric_1.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":20},{"value":"images/effect/uiElectric/electric_2.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":25},{"value":"images/effect/uiElectric/electric_3.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":30},{"value":"images/effect/uiElectric/electric_4.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":35}]}},{"target":357,"keyframes":{"skin":[{"value":"images/effect/uiLight/dx_zpd_1.png","tweenMethod":"linearNone","tween":false,"target":357,"key":"skin","index":0},{"value":"images/effect/uiLight/dx_zpd_2.png","tweenMethod":"linearNone","tween":false,"target":357,"key":"skin","index":12},{"value":"images/effect/uiLight/dx_zpd_3.png","tweenMethod":"linearNone","tween":false,"target":357,"key":"skin","index":25}]}}],"name":"ani4","id":4,"frameRate":24,"action":2}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MonsterSprite",MonsterSprite);
			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.hall.HallSceneUI.uiView);

        }

    }
}

module ui.login {
    export class LoginSceneUI extends View {
		public mainView:View;
		public btnStart:Laya.Button;
		public lblLoadingDesc:Laya.Label;
		public progressBar:Laya.Image;
		public imgBar:Laya.Image;
		public imgStart:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":750,"height":1334},"child":[{"type":"View","props":{"y":0,"x":0,"width":750,"var":"mainView","name":"mainView","height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"loading/loading_bg.jpg"}},{"type":"Button","props":{"y":932,"x":206,"var":"btnStart","stateNum":1,"skin":"loading/start_btn.png","name":"btnStart"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Label","props":{"y":1197,"x":309,"width":139,"text":"健康游戏公告","strokeColor":"#000000","stroke":2,"height":28,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":1237,"x":43,"width":571,"text":"抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。","strokeColor":"#000000","stroke":2,"height":28,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":1272,"x":43,"width":571,"text":"适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。","strokeColor":"#000000","stroke":2,"height":28,"fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":1100,"x":275,"width":199,"var":"lblLoadingDesc","text":"英雄准备中...","strokeColor":"#000000","stroke":2,"height":28,"fontSize":24,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":1059,"x":233,"var":"progressBar","skin":"loading/bar_bg.png"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":0,"var":"imgBar","skin":"loading/bar.png","sizeGrid":"0,16,0,15"}}]}]},{"type":"Image","props":{"visible":false,"var":"imgStart","top":0,"skin":"loading/start_bg.jpg","right":0,"name":"imgStart","left":0,"bottom":0}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.login.LoginSceneUI.uiView);

        }

    }
}

module ui.luckPrize {
    export class LuckPrizeItemViewUI extends View {
		public imgLight:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"View","props":{"width":748,"name":"bgView","height":519,"centerX":0},"child":[{"type":"Image","props":{"y":214,"x":376,"width":600,"var":"imgLight","skin":"images/common_bg_light.png","name":"imgLight","height":600,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":-182,"x":610,"stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Image","props":{"y":-195,"x":234,"skin":"images/luckLottery/luck_item_title.png"}},{"type":"Image","props":{"y":187,"x":374,"skin":"images/component/frame_9calce_03.png","name":"imgItemBg","anchorY":0.5,"anchorX":0.5,"sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":188,"x":374,"visible":false,"skin":"images/luckLottery/luck_prize_3.png","name":"imgItem","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":445,"x":124,"width":500,"text":"先知球x1","name":"txtItemName","fontSize":50,"color":"#ffffff","bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.luckPrize.LuckPrizeItemViewUI.uiView);

        }

    }
}

module ui.luckPrize {
    export class LuckPrizeViewUI extends View {
		public ani1:Laya.FrameAnimation;
		public mainView:View;
		public imgBg:Laya.Image;
		public txtTip1:Laya.Label;
		public txtTip2:Laya.Label;
		public btnExit:Laya.Button;
		public btnStart:Laya.Button;
		public txtDiamond:Laya.Label;
		public txt_diamond:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":750,"name":"rolledTIme","height":1092},"child":[{"type":"View","props":{"y":0,"x":0,"width":750,"var":"mainView","name":"mainView","height":1092},"child":[{"type":"Image","props":{"y":639,"x":371,"var":"imgBg","skin":"images/luckLottery/luck_huanpan.png","rotation":0,"name":"imgBg","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/luckLottery/luck_huanpan_light.png","name":"imgEffect1"},"compId":68},{"type":"Image","props":{"y":0,"x":0,"visible":false,"skin":"images/luck_huanpan_light.png","name":"imgEffect2"},"compId":69}]},{"type":"Image","props":{"y":0,"x":37,"skin":"images/luckLottery/luck_title.png"}},{"type":"Label","props":{"y":998,"x":167,"width":425,"visible":false,"var":"txtTip1","text":"单词抽奖将消耗钻石x120","name":"txtTip1","height":30,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":1045,"x":64,"width":621,"visible":false,"var":"txtTip2","text":"00:00之后免费抽奖一次","name":"txtTip2","height":30,"fontSize":30,"color":"#fff272","bold":true,"align":"center"}},{"type":"Button","props":{"y":-2,"x":634,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":510,"x":263,"var":"btnStart","stateNum":1,"skin":"images/luckLottery/luck_go.png","name":"btnStart"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":161,"x":83,"skin":"images/core/diamond.png","name":"imgDiamond","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":6,"x":41,"var":"txtDiamond","text":"120","strokeColor":"#000000","stroke":2,"name":"txtDiamond","fontSize":28,"color":"#f4d80d","bold":true,"align":"left"}}]}]},{"type":"Box","props":{"y":199,"x":267},"child":[{"type":"Image","props":{"skin":"images/luckLottery/luck_price_bg.png"}},{"type":"Image","props":{"y":15,"x":21,"skin":"images/core/diamond.png"}},{"type":"Label","props":{"y":19,"x":70,"var":"txt_diamond","text":"0","fontSize":30,"color":"#ffffff","bold":true}}]}]}],"animations":[{"nodes":[{"target":68,"keyframes":{"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":68,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":68,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":68,"key":"alpha","index":20}]}},{"target":69,"keyframes":{"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":69,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":69,"key":"alpha","index":10},{"value":0,"tweenMethod":"linearNone","tween":true,"target":69,"key":"alpha","index":20}]}}],"name":"ani1","id":1,"frameRate":24,"action":2}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.luckPrize.LuckPrizeViewUI.uiView);

        }

    }
}

module ui.more {
    export class MoreItemUI extends View {
		public imgAppIcon:Laya.Image;
		public lblNickname:Laya.Label;
		public imgItemIcon:Laya.Image;
		public lblItemNum:Laya.Label;
		public btnObtain:Laya.Button;
		public btnTry:Laya.Button;
		public btnStartGame:Laya.Button;
		public imgObtained:Laya.Image;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/more/item_bg.png"}},{"type":"Image","props":{"y":13,"x":16,"width":111,"skin":"images/component/frame_9scale_09.png","height":111,"sizeGrid":"22,18,20,20"},"child":[{"type":"Image","props":{"y":12,"x":12,"width":88,"var":"imgAppIcon","height":88}}]},{"type":"Label","props":{"y":22,"x":141,"var":"lblNickname","text":"暴打犬夜叉","fontSize":30,"color":"#a17338","align":"left"}},{"type":"Image","props":{"y":78,"x":147,"width":119,"skin":"images/component/frame_9calce_07.png","height":34,"sizeGrid":"0,31,0,33"}},{"type":"Image","props":{"y":75,"x":141,"var":"imgItemIcon","skin":"images/core/coin_40x40.png"}},{"type":"Label","props":{"y":81,"x":182,"var":"lblItemNum","text":"2784M","fontSize":24,"color":"#ffffff"}},{"type":"Button","props":{"y":35,"x":419,"var":"btnObtain","stateNum":1,"skin":"images/component/frame_btn_small_yellow.png"},"child":[{"type":"Label","props":{"y":14,"x":49,"width":85,"text":"领取","strokeColor":"#825321","stroke":3,"height":33,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":35,"x":420,"width":180,"var":"btnTry","stateNum":1,"skin":"images/component/frame_btn_small_blue.png","label":"label","height":60,"sizeGrid":"0,32,0,34"},"child":[{"type":"Label","props":{"y":13,"x":19,"width":144,"text":"立即试玩","strokeColor":"#306294","stroke":3,"height":33,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":41,"x":426,"var":"btnStartGame","stateNum":1,"skin":"images/component/frame_9scale_10.png"},"child":[{"type":"Label","props":{"y":9,"x":15,"width":137,"text":"开始游戏","strokeColor":"#8d5d2e","stroke":3,"height":30,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":41,"x":425,"var":"imgObtained","skin":"images/component/frame_9scale_11.png"},"child":[{"type":"Label","props":{"y":9,"x":22,"width":120,"text":"已领取","fontSize":30,"color":"#fff4e1","bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.more.MoreItemUI.uiView);

        }

    }
}

module ui.more {
    export class MoreViewUI extends View {
		public imgClose:Laya.Image;
		public btnCustomService:Laya.Button;
		public btnSoundClosed:Laya.Button;
		public btnSoundOpend:Laya.Button;
		public imgSubscribe:Laya.Image;
		public listMoreItem:Laya.List;
		public lblNoneGameTips:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":4,"x":0,"width":715,"skin":"images/component/frame_9calce_01.png","height":1015,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":40,"x":307,"skin":"images/more/title.png"}},{"type":"Image","props":{"y":0,"x":631,"var":"imgClose","skin":"images/component/frame_close_btn.png"}},{"type":"Image","props":{"y":144,"x":33,"width":649,"skin":"images/component/frame_9calce_02.png","height":153,"sizeGrid":"25,32,32,36"}},{"type":"Image","props":{"y":312,"x":33,"width":649,"skin":"images/component/frame_9calce_02.png","height":668,"sizeGrid":"25,32,32,36"}},{"type":"Image","props":{"y":322,"x":194,"skin":"images/component/sub_title_bg.png"}},{"type":"Label","props":{"y":331,"x":242,"width":228,"text":"更多好玩","height":45,"fontSize":40,"color":"#ab4c17","bold":true,"align":"center"}},{"type":"Label","props":{"y":405,"x":147,"width":418,"text":"完整体验一个游戏，可获得奖励","height":37,"fontSize":26,"color":"#845013","bold":true,"align":"center"}},{"type":"Image","props":{"y":426,"x":37,"skin":"images/component/seperate_line.png"}},{"type":"Button","props":{"y":166,"x":93,"var":"btnCustomService","stateNum":1,"skin":"images/more/custom_service.png"},"child":[{"type":"Label","props":{"y":81,"x":15,"text":"客服","strokeColor":"#8d5d2e","stroke":3,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":167,"x":302,"var":"btnSoundClosed","stateNum":1,"skin":"images/more/sound_closed.png"},"child":[{"type":"Label","props":{"y":79,"x":17,"text":"声音","strokeColor":"#8d5d2e","stroke":3,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":166,"x":301,"var":"btnSoundOpend","stateNum":1,"skin":"images/more/sound_opened.png"},"child":[{"type":"Label","props":{"y":80,"x":18,"text":"声音","strokeColor":"#8d5d2e","stroke":3,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":166,"x":536,"var":"imgSubscribe","skin":"images/more/subscribe.png"},"child":[{"type":"Label","props":{"y":80,"x":11,"text":"关注","strokeColor":"#8d5d2e","stroke":3,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"List","props":{"y":454,"x":49,"width":619,"var":"listMoreItem","spaceY":15,"repeatY":4,"repeatX":1,"height":511}},{"type":"Label","props":{"y":685,"x":147,"width":418,"var":"lblNoneGameTips","text":"暂时没有游戏体验哦","strokeColor":"#845013","stroke":3,"height":37,"fontSize":36,"color":"#e2e2e2","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.more.MoreViewUI.uiView);

        }

    }
}

module ui.rank {
    export class RankingUI extends View {
		public mainView:View;
		public coverView:View;
		public viewStackRanking:Laya.ViewStack;
		public worldRankingList:Laya.List;
		public viewMyRanking:View;
		public btnExit:Laya.Button;
		public tabGroup:View;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"View","props":{"y":0,"x":0,"width":715,"var":"mainView","height":1020},"child":[{"type":"View","props":{"y":110,"x":19,"width":680,"var":"coverView","mouseThrough":false,"height":903}},{"type":"View","props":{"y":5,"x":0,"width":705,"height":999},"child":[{"type":"Image","props":{"y":0,"x":0,"width":716,"skin":"images/component/frame_9calce_01.png","height":1013,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":32,"x":284,"skin":"images/ranking/title.png"}},{"type":"Image","props":{"y":230,"x":36,"width":647,"skin":"images/component/frame_9calce_02.png","height":752,"sizeGrid":"25,32,32,36"}},{"type":"ViewStack","props":{"var":"viewStackRanking"},"child":[{"type":"Box","props":{"y":0,"x":0,"name":"item0"},"child":[{"type":"List","props":{"y":253,"x":38,"width":639,"var":"worldRankingList","spaceY":-1,"repeatY":5,"repeatX":1,"height":582},"child":[{"type":"Box","props":{"y":-5,"x":10,"renderType":"render"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/ranking/cell_bg_default.png","name":"cellBar"}},{"type":"Image","props":{"y":15,"x":110,"width":96,"skin":"images/ranking/headIcon.png","name":"headIcon","height":96}},{"type":"Image","props":{"y":26,"x":121,"width":74,"name":"imgAvatar","height":74}},{"type":"Label","props":{"y":45,"x":17,"width":80,"text":"1","name":"txtNo","height":30,"fontSize":30,"color":"#aa540b","bold":true,"align":"center"}},{"type":"Image","props":{"y":20,"x":11,"visible":false,"skin":"images/ranking/icon_top_1.png","name":"imgNo"}},{"type":"Label","props":{"y":23,"x":214,"width":240,"text":"名字最多七个字","name":"txtName","height":32,"fontSize":32,"color":"#a17338","bold":true,"align":"left"}},{"type":"Image","props":{"y":66,"x":216,"width":180,"skin":"images/ranking/location_bg.png","height":40,"sizeGrid":"15,25,16,25"}},{"type":"Label","props":{"y":72,"x":251,"width":96,"text":"火星","name":"txtPosition","height":30,"fontSize":24,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":72,"x":227,"skin":"images/ranking/location_mark.png"}},{"type":"Label","props":{"y":47,"x":468,"width":130,"text":"0","name":"txtScore","fontSize":30,"color":"#aa540b","bold":true,"align":"center"}}]}]},{"type":"Label","props":{"y":440,"x":45,"width":600,"visible":false,"text":"暂无排名","name":"txtHint","height":80,"fontSize":50,"color":"#aa540b","bold":true,"align":"center"}},{"type":"Image","props":{"y":822,"x":36,"skin":"images/component/seperate_line.png"}},{"type":"View","props":{"var":"viewMyRanking"},"child":[{"type":"Image","props":{"y":847,"x":48,"skin":"images/ranking/cell_bg_self.png"}},{"type":"Label","props":{"y":893,"x":64,"width":80,"text":"1","name":"txtMyRanking","height":30,"fontSize":30,"color":"#aa540b","bold":true,"align":"center"}},{"type":"Image","props":{"y":861,"x":158,"width":96,"skin":"images/ranking/headIcon.png","name":"headIcon","height":96}},{"type":"Image","props":{"y":872,"x":169,"width":74,"name":"imgAvatar","height":74}},{"type":"Label","props":{"y":895,"x":517,"width":130,"text":"0","name":"txtScore","fontSize":30,"color":"#aa540b","bold":true,"align":"center"}},{"type":"Label","props":{"y":869,"x":261,"width":240,"text":"名字最多七个字","overflow":"hidden","name":"txtName","height":32,"fontSize":32,"color":"#a17338","bold":true,"align":"left"}},{"type":"Image","props":{"y":912,"x":263,"width":180,"skin":"images/ranking/location_bg.png","height":40,"sizeGrid":"15,25,16,25"}},{"type":"Label","props":{"y":918,"x":298,"width":189,"text":"Shenzhen","name":"txtPosition","height":30,"fontSize":24,"color":"#ffffff","align":"left"}},{"type":"Image","props":{"y":918,"x":274,"skin":"images/ranking/location_mark.png"}}]}]},{"type":"Box","props":{"y":0,"x":0,"width":716,"name":"item1","height":967}}]}]},{"type":"Image","props":{"y":111,"x":12,"width":690,"name":"imgBg","height":900}},{"type":"Button","props":{"y":0,"x":633,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"View","props":{"y":138,"x":112,"width":494,"var":"tabGroup","mouseThrough":true,"mouseEnabled":true,"height":103},"child":[{"type":"Button","props":{"y":10,"x":0,"strokeColors":"#998a4e,#a86c24","stateNum":2,"skin":"images/component/tab_01.png","selected":true,"labelStroke":5,"labelSize":36,"labelPadding":"0,0,13,0","labelColors":"#fff4e1,#fff4e1","labelBold":true,"labelAlign":"center","label":"世  界"}},{"type":"Button","props":{"y":10,"x":285,"strokeColors":"#998a4e,#a86c24","stateNum":2,"skin":"images/component/tab_01.png","selected":false,"labelStroke":5,"labelSize":36,"labelPadding":"0,0,13,0","labelColors":"#fff4e1,#fff4e1","labelBold":true,"labelAlign":"center","label":"好  友"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.rank.RankingUI.uiView);

        }

    }
}

module ui.settlement {
    export class ClearanceFailUI extends View {
		public txtTime:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":580,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/stageSummary/failure_title.png","name":"imgFailed","mouseThrough":true,"mouseEnabled":true},"child":[{"type":"Label","props":{"y":293,"x":36,"width":500,"var":"txtTime","text":"3","fontSize":190,"color":"#f1774e","align":"center"}},{"type":"Label","props":{"y":506,"x":38,"width":500,"text":"秒后重新开始","fontSize":54,"color":"#e5d6bc","bold":true,"align":"center"}},{"type":"Label","props":{"y":595,"x":202,"text":"点击空白处关闭","fontSize":25,"color":"#ffffff","bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.settlement.ClearanceFailUI.uiView);

        }

    }
}

module ui.settlement {
    export class ClearanceRewardViewUI extends View {
		public imgPrizeBg:Laya.Image;
		public lightImg:Laya.Image;
		public btnExit:Laya.Button;
		public txtDes:Laya.Label;
		public txtStage:Laya.Label;
		public hbox:Laya.HBox;

        public static  uiView:any ={"type":"View","props":{"width":680,"height":546},"child":[{"type":"Image","props":{"y":0,"x":0,"width":680,"var":"imgPrizeBg","name":"imgPrizeBg","height":546},"child":[{"type":"Image","props":{"y":273,"x":339,"var":"lightImg","skin":"images/common_bg_light.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":-111,"x":45,"skin":"images/ClearanceReward/result_win_title.png"}},{"type":"Button","props":{"y":-51,"x":585,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Label","props":{"y":450,"x":90,"width":500,"var":"txtDes","text":"恭喜获得第       关奖励","strokeColor":"#ab9004","stroke":2,"name":"txtDes","fontSize":40,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":445,"x":229,"width":300,"var":"txtStage","text":"1","strokeColor":"#ab9004","stroke":2,"name":"txtStage","fontSize":50,"color":"#f9e603","bold":true,"align":"center"}}]},{"type":"HBox","props":{"y":195,"x":145,"width":0,"var":"hbox","height":0,"align":"middle"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.settlement.ClearanceRewardViewUI.uiView);

        }

    }
}

module ui.settlement {
    export class ResultViewUI extends View {
		public mainView:View;
		public hbox:Laya.HBox;

        public static  uiView:any ={"type":"View","props":{"mouseThrough":true,"mouseEnabled":true},"child":[{"type":"View","props":{"y":244,"width":750,"var":"mainView","name":"mainView","mouseThrough":true,"mouseEnabled":true,"height":712},"child":[{"type":"Image","props":{"y":128,"x":17,"width":717,"visible":false,"name":"imgBg","mouseThrough":true,"mouseEnabled":true,"height":565},"child":[{"type":"Image","props":{"y":-25,"x":1,"width":716,"skin":"images/component/frame_9calce_01.png","mouseEnabled":true,"height":611,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":-229,"x":28,"skin":"images/stageSummary/success_title.png","mouseEnabled":true}},{"type":"Image","props":{"y":205,"x":34,"width":645,"skin":"images/component/frame_9calce_02.png","height":224,"sizeGrid":"25,32,32,36"}},{"type":"Button","props":{"y":438,"x":203,"strokeColors":"#946430","stateNum":1,"skin":"images/component/normal_btn.png","name":"btnShare","labelStroke":5,"labelSize":50,"labelColors":"#fff4e1","labelBold":true,"label":"炫耀领取"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":-24,"x":631,"stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Image","props":{"y":236,"x":355,"name":"imgItemBg"}},{"type":"HBox","props":{"y":258,"x":113,"var":"hbox","space":50,"name":"hbox","align":"middle"}}]},{"type":"Image","props":{"y":-87,"x":87,"visible":false,"skin":"images/stageSummary/failure_title.png","name":"imgFailed","mouseThrough":true,"mouseEnabled":true},"child":[{"type":"Label","props":{"y":293,"x":36,"width":500,"text":"3","name":"txtTime","fontSize":190,"color":"#f1774e","align":"center"}},{"type":"Label","props":{"y":506,"x":38,"width":500,"text":"秒后重新开始","fontSize":54,"color":"#e5d6bc","bold":true,"align":"center"}},{"type":"Label","props":{"y":595,"x":202,"text":"点击空白处关闭","fontSize":25,"color":"#ffffff","bold":true,"align":"center"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.settlement.ResultViewUI.uiView);

        }

    }
}

module ui.shop {
    export class ShopViewUI extends View {
		public mainView:View;
		public txtMoney:Laya.Label;
		public txtDiamond:Laya.Label;
		public heroList:Laya.List;
		public btn_skillExplain:Laya.Button;
		public btnExit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":726,"height":1030},"child":[{"type":"View","props":{"y":-2,"x":-1,"width":726,"var":"mainView","height":1017},"child":[{"type":"Image","props":{"width":713,"skin":"images/component/frame_9calce_01.png","sizeGrid":"158,62,69,62","name":"imgBg","height":1017},"child":[{"type":"Image","props":{"y":26,"x":256,"skin":"images/shop/shop_title_icon.png"},"child":[{"type":"Label","props":{"y":12,"x":-134,"width":600,"visible":false,"valign":"middle","text":"排行榜","strokeColor":"#5e2818","stroke":2,"name":"txtTitle","height":60,"fontSize":40,"color":"#fff4c0","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":172,"x":34,"width":644,"skin":"images/component/frame_9calce_02.png","sizeGrid":"59,56,54,51","height":778}},{"type":"Image","props":{"y":184,"x":41,"skin":"images/shop/shop_bg_01.png"}},{"type":"Image","props":{"y":85,"x":-15,"skin":"images/shop/shop_bg_04.png"}},{"type":"Image","props":{"y":199,"x":81,"skin":"images/shop/shop_bg_02.png","height":40},"child":[{"type":"Image","props":{"y":-10,"x":-14,"skin":"images/core/coin_big.png","name":"imgMoney"},"child":[{"type":"Label","props":{"y":13,"x":60,"var":"txtMoney","text":"0","strokeColor":"#946430","stroke":4,"name":"txtMoney","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}}]}]},{"type":"Image","props":{"y":198,"x":267,"skin":"images/shop/shop_bg_03.png"},"child":[{"type":"Image","props":{"y":-9,"x":-22,"skin":"images/core/diamond_icon.png","name":"imgDiamond"},"child":[{"type":"Label","props":{"y":12,"x":60,"var":"txtDiamond","text":"0","strokeColor":"#946430","stroke":4,"name":"txtDiamond","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}}]}]},{"type":"List","props":{"y":260,"x":46,"width":620,"var":"heroList","spaceY":15,"spaceX":0,"repeatY":1,"repeatX":1,"name":"heroList","height":659},"child":[{"type":"Box","props":{"y":190,"x":110,"width":620,"renderType":"render","height":150},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/shop/shop_item_bg.png"}},{"type":"Image","props":{"y":128,"x":90,"name":"imgModel","anchorY":1,"anchorX":0.5}},{"type":"Image","props":{"y":62,"x":499,"name":"imgPet","disabled":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":57,"x":167,"skin":"images/shop/shop_bg_03.png","name":"imgAtk"},"child":[{"type":"Label","props":{"y":6,"x":13,"text":"攻击:","strokeColor":"#946430","stroke":2,"fontSize":24,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":7,"x":71,"text":"0","strokeColor":"#946430","stroke":2,"name":"txtAtk","fontSize":24,"color":"#ffffff","bold":true}}]},{"type":"Image","props":{"y":98,"x":167,"skin":"images/shop/shop_bg_03.png","name":"imgSpeed"},"child":[{"type":"Label","props":{"y":6,"x":13,"text":"攻速:","strokeColor":"#946430","stroke":2,"fontSize":24,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":7,"x":71,"text":"0","strokeColor":"#946430","stroke":2,"name":"txtSpeed","fontSize":24,"color":"#ffffff","bold":true}}]},{"type":"Label","props":{"y":17,"x":176,"text":"大黄蜂","name":"txtName","fontSize":30,"color":"#d28a00","bold":true}},{"type":"Label","props":{"y":15,"x":9,"width":30,"text":"0","name":"txtLevel","fontSize":20,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":43,"x":422,"stateNum":1,"skin":"images/component/frame_btn_small_yellow.png","name":"btnBuy","labelSize":30},"child":[{"type":"Image","props":{"y":11,"x":19,"skin":"images/core/coin_40x40.png","name":"imgPrice"},"child":[{"type":"Label","props":{"y":5,"x":42,"text":"1000","strokeColor":"#946430","stroke":4,"name":"txtPrice","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":73,"x":422,"visible":false,"stateNum":1,"skin":"images/shop/shop_btn_03.png","name":"btnBuyLock","labelSize":30},"child":[{"type":"Label","props":{"y":-40,"x":63,"width":50,"text":"0","strokeColor":"#946430","stroke":4,"name":"txtUnlockLevel","fontSize":30,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":13,"x":37,"text":"待解锁","strokeColor":"#946430","stroke":4,"fontSize":35,"color":"#ffffff","bold":true}},{"type":"Script","props":{"y":-63,"x":-412,"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":26,"x":332,"visible":false,"stateNum":1,"skin":"images/core/shop_free_video.png","name":"btnSharePrize","labelSize":30},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":0,"x":55,"skin":"images/core/red_dot_hint.png","name":"imgRedPoint"}}]},{"type":"Button","props":{"y":26,"x":335,"visible":false,"stateNum":1,"skin":"images/shop_diamond_buy.png","name":"btnDiamondBuy","labelSize":30},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]},{"type":"Label","props":{"y":1016,"x":270,"text":"点击空白处关闭","name":"txtExit","fontSize":30,"color":"#ffffff"}},{"type":"Button","props":{"y":192,"x":505,"var":"btn_skillExplain","stateNum":1,"skin":"images/shop/shop_skill_btn.png"}},{"type":"Button","props":{"y":-13,"x":633,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.shop.ShopViewUI.uiView);

        }

    }
}

module ui.strengthen {
    export class StrengthenViewUI extends View {
		public mainView:View;
		public txtEssence:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":714,"height":1018},"child":[{"type":"View","props":{"var":"mainView","name":"mainView"},"child":[{"type":"Image","props":{"width":714,"skin":"images/component/frame_9calce_01.png","sizeGrid":"158,62,69,62","name":"imgBg","height":1018},"child":[{"type":"Image","props":{"y":205,"x":34,"width":645,"skin":"images/component/frame_9calce_02.png","sizeGrid":"32,27,32,29","height":744}},{"type":"Image","props":{"y":32,"x":259,"skin":"images/strengthen/strengthen_title.png"}},{"type":"Image","props":{"y":154,"x":81,"skin":"images/strengthen/strengthen_frame_bar.png","sizeGrid":"15,34,20,37","name":"imgEssence"}},{"type":"Image","props":{"y":151,"x":67,"skin":"images/strengthen/strengthen_item_shitou.png","name":"imgIcon"}},{"type":"Label","props":{"y":955,"x":216,"text":"技能强化只增加触发几率","name":"txtHint","fontSize":25,"color":"#d20000","bold":true,"align":"center"}},{"type":"Label","props":{"y":156,"x":115,"var":"txtEssence","text":"0","strokeColor":"#946430","stroke":4,"name":"txtEssence","fontSize":26,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":1011,"x":267,"text":"点击空白处关闭","fontSize":25,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Box","props":{"y":226,"x":73,"name":"boxItem1"},"child":[{"type":"Image","props":{"skin":"images/strengthen/strengthen_item_bg.png","name":"imgItemBg"}},{"type":"Image","props":{"y":69,"x":48,"skin":"images/strengthen/strengthen_item3.png","name":"imgItem","centerX":5}},{"type":"Label","props":{"y":13,"x":23,"text":"金币加成","name":"txtDes","fontSize":30,"color":"#b13c0e","bold":true,"align":"right"}},{"type":"Label","props":{"y":14,"x":157,"width":82,"text":"+0%","name":"txtAdd","fontSize":30,"color":"#b13c0e","bold":true,"align":"right"}},{"type":"Image","props":{"y":220,"x":52,"skin":"images/strengthen/strengthen_frame_bar.png","name":"imgEssence"},"child":[{"type":"Image","props":{"y":-3,"x":-13,"skin":"images/strengthen/strengthen_item_shitou.png","name":"imgIcon"}},{"type":"Label","props":{"y":3,"x":30,"text":"0","strokeColor":"#946430","stroke":4,"name":"txtEssence","fontSize":26,"color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Button","props":{"y":281,"x":39,"stateNum":1,"skin":"images/component/frame_btn_small_yellow.png","name":"btnStrengthen","labelStrokeColor":"#e5ad1e","labelStroke":2,"labelSize":30,"labelColors":"#ffffff","labelBold":true},"child":[{"type":"Label","props":{"y":18,"x":33,"text":"强化","strokeColor":"#946430","stroke":4,"name":"txtBtn","fontSize":28,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":18,"x":94,"text":"+2%","strokeColor":"#946430","stroke":4,"name":"txtAdd","fontSize":28,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]},{"type":"Box","props":{"y":224,"x":383,"name":"boxItem2"},"child":[{"type":"Image","props":{"skin":"images/strengthen/strengthen_item_bg.png","name":"imgItemBg"}},{"type":"Image","props":{"y":67,"x":48,"skin":"images/core/skill_01.png","name":"imgItem","centerX":2}},{"type":"Label","props":{"y":13,"x":21,"text":"雷神之怒","name":"txtDes","fontSize":30,"color":"#b13c0e","bold":true,"align":"right"}},{"type":"Label","props":{"y":13,"x":151,"width":82,"text":"+6%","name":"txtAdd","height":30,"fontSize":30,"color":"#b13c0e","bold":true,"align":"right"}},{"type":"Image","props":{"y":221,"x":56,"skin":"images/strengthen/strengthen_frame_bar.png","name":"imgEssence"},"child":[{"type":"Image","props":{"y":-5,"x":-14,"skin":"images/strengthen/strengthen_item_shitou.png","name":"imgIcon"}},{"type":"Label","props":{"y":4,"x":30,"text":"0","strokeColor":"#946430","stroke":4,"name":"txtEssence","fontSize":26,"color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Button","props":{"y":284,"x":39,"stateNum":1,"skin":"images/component/frame_btn_small_yellow.png","name":"btnStrengthen","labelStrokeColor":"#e5ad1e","labelStroke":2,"labelSize":30,"labelColors":"#ffffff","labelBold":true},"child":[{"type":"Label","props":{"y":17,"x":35,"text":"强化","strokeColor":"#946430","stroke":4,"name":"txtBtn","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":20,"x":100,"text":"+1%","strokeColor":"#946430","stroke":4,"name":"txtAdd","fontSize":24,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]},{"type":"Box","props":{"y":587,"x":71,"name":"boxItem3"},"child":[{"type":"Image","props":{"skin":"images/strengthen/strengthen_item_bg.png","name":"imgItemBg"}},{"type":"Image","props":{"y":66,"skin":"images/core/skill_02.png","name":"imgItem","centerX":-1}},{"type":"Label","props":{"y":13,"x":27,"text":"冰冻之触","name":"txtDes","fontSize":30,"color":"#b13c0e","bold":true,"align":"right"}},{"type":"Label","props":{"y":13,"x":156,"width":82,"text":"+6%","name":"txtAdd","fontSize":30,"color":"#b13c0e","bold":true,"align":"right"}},{"type":"Image","props":{"y":222,"x":49,"skin":"images/strengthen/strengthen_frame_bar.png","name":"imgEssence"},"child":[{"type":"Image","props":{"y":-1,"x":-15,"skin":"images/strengthen/strengthen_item_shitou.png","name":"imgIcon"}},{"type":"Label","props":{"y":3,"x":30,"text":"0","strokeColor":"#946430","stroke":4,"name":"txtEssence","fontSize":26,"color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Button","props":{"y":281,"x":39,"stateNum":1,"skin":"images/component/frame_btn_small_yellow.png","name":"btnStrengthen","labelStrokeColor":"#e5ad1e","labelStroke":2,"labelSize":30,"labelColors":"#ffffff","labelBold":true},"child":[{"type":"Label","props":{"y":17,"x":32,"text":"强化","strokeColor":"#946430","stroke":4,"name":"txtBtn","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":20,"x":97,"text":"+1%","strokeColor":"#946430","stroke":4,"name":"txtAdd","fontSize":24,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]},{"type":"Box","props":{"y":587,"x":384,"name":"boxItem4"},"child":[{"type":"Image","props":{"skin":"images/strengthen/strengthen_item_bg.png","name":"imgItemBg"}},{"type":"Image","props":{"y":65,"x":53,"skin":"images/core/skill_03.png","name":"imgItem","centerX":0}},{"type":"Label","props":{"y":13,"x":27,"text":"幽冥毒液","name":"txtDes","fontSize":30,"color":"#b13c0e","bold":true,"align":"right"}},{"type":"Label","props":{"y":13,"x":158,"width":82,"text":"+6%","name":"txtAdd","fontSize":30,"color":"#b13c0e","bold":true,"align":"right"}},{"type":"Image","props":{"y":220,"x":55,"skin":"images/strengthen/strengthen_frame_bar.png","name":"imgEssence"},"child":[{"type":"Image","props":{"y":-2,"x":-16,"skin":"images/strengthen/strengthen_item_shitou.png","name":"imgIcon"}},{"type":"Label","props":{"y":3,"x":30,"text":"0","strokeColor":"#946430","stroke":4,"name":"txtEssence","fontSize":26,"color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Button","props":{"y":279,"x":39,"stateNum":1,"skin":"images/component/frame_btn_small_yellow.png","name":"btnStrengthen","labelStrokeColor":"#e5ad1e","labelStroke":2,"labelSize":30,"labelColors":"#ffffff","labelBold":true},"child":[{"type":"Label","props":{"y":17,"x":31,"text":"强化","strokeColor":"#946430","stroke":4,"name":"txtBtn","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":17,"x":96,"text":"+1%","strokeColor":"#946430","stroke":4,"name":"txtAdd","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]},{"type":"Button","props":{"y":-6,"x":632,"stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.strengthen.StrengthenViewUI.uiView);

        }

    }
}

module ui.task {
    export class TaskViewUI extends View {
		public mainView:View;
		public blankView:View;
		public tabGroup:View;
		public viewStackTask:Laya.ViewStack;
		public taskItemList:Laya.List;
		public shareItemList:Laya.List;
		public btnExit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0},"child":[{"type":"View","props":{"width":750,"visible":true,"var":"mainView","name":"mainView","height":1334,"centerY":0,"centerX":0},"child":[{"type":"View","props":{"y":0,"x":0,"var":"blankView","top":0,"right":0,"name":"blankView","left":0,"bottom":0}},{"type":"View","props":{"y":124,"x":0,"width":750,"name":"coverView","mouseThrough":false,"mouseEnabled":true,"height":1050}},{"type":"Image","props":{"y":103,"x":19,"width":713,"skin":"images/component/frame_9calce_01.png","height":1013,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":140,"x":324,"skin":"images/quest/title.png"}},{"type":"Image","props":{"y":338,"x":52,"width":646,"skin":"images/component/frame_9calce_02.png","height":745,"sizeGrid":"25,32,32,36"}},{"type":"View","props":{"y":0,"x":0,"var":"tabGroup"},"child":[{"type":"Button","props":{"y":249,"x":144,"strokeColors":"#998a4e,#a86c24","stateNum":2,"skin":"images/component/tab_01.png","selected":true,"labelStroke":5,"labelSize":36,"labelPadding":"0,0,13,0","labelColors":"#fff4e1,#fff4e1","labelBold":true,"labelAlign":"center","label":"每日任务"},"child":[{"type":"Image","props":{"y":-10,"x":180,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRetDotHint"}}]},{"type":"Button","props":{"y":249,"x":418,"strokeColors":"#998a4e,#a86c24","stateNum":2,"skin":"images/component/tab_01.png","selected":false,"labelStroke":5,"labelSize":36,"labelPadding":"0,0,13,0","labelColors":"#fff4e1,#fff4e1","labelBold":true,"labelAlign":"center","label":"邀请好友"},"child":[{"type":"Image","props":{"y":-10,"x":180,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRetDotHint"}}]}]},{"type":"ViewStack","props":{"y":341,"width":750,"var":"viewStackTask","selectedIndex":0,"right":0,"name":"viewStackTask","left":0,"height":738},"child":[{"type":"Image","props":{"y":1,"x":56,"width":637,"name":"item0","height":736},"child":[{"type":"List","props":{"y":0,"x":0,"width":638,"var":"taskItemList","spaceY":15,"repeatY":1,"repeatX":1,"name":"taskItemList","height":690},"child":[{"type":"Box","props":{"y":0,"x":2,"visible":false,"right":2,"renderType":"render","left":2,"height":130,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":10,"x":6,"skin":"images/quest/item_bg.png"}},{"type":"Image","props":{"y":82,"x":45,"skin":"images/quest/reward_bg.png"}},{"type":"Image","props":{"y":81,"x":33,"skin":"images/core/diamond.png","name":"imgAwardIcon"}},{"type":"Label","props":{"y":28,"x":35,"width":350,"text":"完成车辆合成30次 (0/30)","name":"txtTitle","fontSize":32,"color":"#a17338","bold":true,"align":"left"}},{"type":"Label","props":{"y":85,"x":79,"width":100,"text":"100","name":"txtDiamond","fontSize":30,"color":"#fcf4cd","align":"left"}},{"type":"Image","props":{"y":52,"x":433,"skin":"images/component/frame_9scale_11.png","name":"txtGet"},"child":[{"type":"Label","props":{"y":9,"x":22,"width":120,"text":"已领取","fontSize":30,"color":"#fff4e1","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":44,"x":424,"stateNum":1,"skin":"images/quest/btn_obtain.png","name":"btnGet","labelStrokeColor":"#946430","labelStroke":3,"labelSize":30,"labelColors":"#fff4e1","labelBold":true,"label":"领取"}}]}]},{"type":"Label","props":{"y":699,"x":-1,"width":638,"text":"每天00:00时系统自动重置任务","strokeColor":"#7a572b","stroke":2,"height":24,"fontSize":24,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":0,"x":55,"width":639,"name":"item1","height":737},"child":[{"type":"Image","props":{"y":15,"x":13,"skin":"images/quest/banner.png"}},{"type":"List","props":{"y":252,"x":0,"width":640,"var":"shareItemList","spaceY":15,"repeatY":1,"repeatX":1,"name":"shareItemList","height":486},"child":[{"type":"Box","props":{"y":5,"x":15,"width":609,"visible":false,"renderType":"render","height":138,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":0,"x":-3,"skin":"images/quest/item_bg.png"}},{"type":"Image","props":{"y":80,"x":142,"skin":"images/quest/reward_bg.png"}},{"type":"Image","props":{"y":23,"x":19,"skin":"images/quest/empty_friend_icon.png","name":"imgHead"}},{"type":"Image","props":{"y":78,"x":126,"skin":"images/quest/diamond.png","name":"imgAwardIcon"},"child":[{"type":"Label","props":{"y":5,"x":45,"width":83,"text":"200","name":"txtAward","height":30,"fontSize":30,"color":"#fcf4cd","align":"left"}}]},{"type":"Label","props":{"y":33,"x":127,"width":272,"text":"第1个好友","name":"txtTitle","height":30,"fontSize":26,"color":"#a17338","bold":true,"align":"left"}},{"type":"Label","props":{"y":71,"x":-60,"width":220,"visible":false,"text":"额外奖励200","name":"txtExtra","fontSize":30,"color":"#cf0000","align":"left"}},{"type":"Image","props":{"y":45,"x":421,"skin":"images/component/frame_9scale_11.png","name":"txtGet"},"child":[{"type":"Label","props":{"y":9,"x":22,"width":120,"text":"已领取","fontSize":30,"color":"#fff4e1","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":42,"x":415,"stateNum":1,"skin":"images/quest/btn_obtain.png","name":"btnGet","labelStrokeColor":"#946430","labelStroke":3,"labelSize":30,"labelColors":"#fff4e1","labelBold":true,"label":"领取"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":42,"x":415,"stateNum":1,"skin":"images/quest/invite_btn.png","name":"btnInvite","labelStrokeColor":"#306294","labelStroke":3,"labelSize":30,"labelColors":"#fff4e1","labelBold":true,"label":"邀请"}}]}]}]},{"type":"Label","props":{"y":317,"x":193,"width":350,"text":"暂时没有任务","strokeColor":"#7a572b","name":"item2","fontSize":46,"color":"#d9d9d9","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":99,"x":649,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.task.TaskViewUI.uiView);

        }

    }
}