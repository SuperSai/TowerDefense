
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.buff {
    export class BuffTipsViewUI extends View {
		public imgIcon:Laya.Image;
		public txt_des:Laya.Label;
		public txt_time:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":713,"height":628},"child":[{"type":"Box","props":{"y":0,"x":0,"width":713,"height":628},"child":[{"type":"Image","props":{"y":70,"x":0,"width":716,"skin":"images/component/frame_9calce_01.png","height":565,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":66,"x":632,"skin":"images/component/frame_close_btn.png"}},{"type":"Image","props":{"y":267,"x":281,"var":"imgIcon","skin":"images/buff/buff_1.png"}},{"type":"Label","props":{"y":452,"x":51,"width":613,"var":"txt_des","text":"恭喜您获得暴击加成","height":35,"fontSize":35,"font":"SimHei","color":"#884a00","bold":true,"align":"center"}},{"type":"HBox","props":{"y":518,"x":356,"anchorY":0.5,"anchorX":0.5,"align":"middle"},"child":[{"type":"Label","props":{"y":2,"x":196,"text":"秒","fontSize":35,"font":"SimHei","color":"#884a00","bold":true}},{"type":"Label","props":{"text":"持续","fontSize":35,"font":"SimHei","color":"#884a00","bold":true}},{"type":"Label","props":{"y":0,"x":81.5625,"var":"txt_time","text":"180","fontSize":35,"font":"SimHei","color":"#eb6626","bold":true,"align":"center"}}]},{"type":"Label","props":{"y":635,"x":267,"text":"点击空白处关闭","fontSize":26,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":-1,"x":60,"skin":"images/buff/buff_title_bg.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.buff.BuffTipsViewUI.uiView);

        }

    }
}

module ui.buff {
    export class SkillItemUI extends View {
		public imgIcon:Laya.Image;
		public txt_time:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":54,"height":68},"child":[{"type":"Box","props":{"y":0,"x":0,"width":55,"height":69},"child":[{"type":"Image","props":{"y":23,"x":27,"var":"imgIcon","skin":"images/buff_1.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":42,"x":-3,"skin":"images/component/skill_bg.png"}},{"type":"Label","props":{"y":45,"x":5,"width":43,"var":"txt_time","text":"30","fontSize":20,"color":"#ffffff","bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.buff.SkillItemUI.uiView);

        }

    }
}

module ui.common.item {
    export class RewardItemUI extends View {
		public itemImg:Laya.Image;
		public txt_count:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":130,"height":130},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":65,"x":65,"width":100,"var":"itemImg","height":100,"anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":92,"x":11,"width":109,"var":"txt_count","text":"x1","strokeColor":"#9e2d00","stroke":4,"height":28,"fontSize":26,"color":"#ffffff","align":"right"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.item.RewardItemUI.uiView);

        }

    }
}

module ui.common.view {
    export class DebugViewUI extends View {
		public viewRoot:View;
		public viewBtnContainer:View;
		public btnUid:Laya.Button;
		public btnShowStats:Laya.Button;
		public btnCompleteNovice:Laya.Button;
		public btnResetKingLevel:Laya.Button;
		public btnResetGold:Laya.Button;
		public btnAddGold:Laya.Button;
		public btnAddDiamond:Laya.Button;
		public btnCrearStorage:Laya.Button;
		public btnExitGame:Laya.Button;
		public viewStackArrow:Laya.ViewStack;
		public btnLow:Laya.Button;
		public btnHigh:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"mouseThrough":true,"mouseEnabled":true},"child":[{"type":"View","props":{"var":"viewRoot","mouseThrough":true,"mouseEnabled":true},"child":[{"type":"View","props":{"y":0,"x":0,"width":787,"visible":false,"var":"viewBtnContainer","mouseThrough":true,"mouseEnabled":true,"height":1094},"child":[{"type":"Box","props":{"y":629,"x":605,"width":178,"height":465,"alpha":0.5},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":178,"lineWidth":1,"height":465,"fillColor":"#000000"}}]},{"type":"Button","props":{"y":647,"x":620,"width":130,"var":"btnUid","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"UID: ","height":26}},{"type":"Button","props":{"y":697,"x":620,"width":130,"var":"btnShowStats","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"运行数据","height":26}},{"type":"Button","props":{"y":747,"x":620,"width":130,"var":"btnCompleteNovice","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"跳过新手","height":26}},{"type":"Button","props":{"y":797,"x":620,"width":130,"var":"btnResetKingLevel","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"重置王座","height":26}},{"type":"Button","props":{"y":849,"x":621,"width":130,"var":"btnResetGold","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"重置金币","height":26}},{"type":"Button","props":{"y":897,"x":620,"width":130,"var":"btnAddGold","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"添加金币","height":26}},{"type":"Button","props":{"y":947,"x":620,"width":130,"var":"btnAddDiamond","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"添加钻石","height":26}},{"type":"Button","props":{"y":997,"x":620,"width":130,"var":"btnCrearStorage","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"清空缓存","height":26}},{"type":"Button","props":{"y":1047,"x":620,"width":130,"var":"btnExitGame","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"退出游戏","height":26}}]},{"type":"ViewStack","props":{"y":1101,"x":633,"visible":false,"var":"viewStackArrow"},"child":[{"type":"Button","props":{"y":6,"x":17,"width":130,"name":"item0","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"▶▶","height":26}},{"type":"Button","props":{"y":6,"x":17,"width":130,"name":"item1","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","label":"◀◀","height":26}}]},{"type":"Button","props":{"width":80,"var":"btnLow","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","height":80}},{"type":"Button","props":{"y":8,"x":455,"width":70,"var":"btnHigh","labelSize":26,"labelFont":"SimHei","labelColors":"#FFFFFF","labelBold":true,"labelAlign":"center","height":70}}]}]};
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

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Image","props":{"y":-50,"x":-25,"width":650,"skin":"images/component/frame_9calce_04.png","name":"imgBg","height":500},"child":[{"type":"Image","props":{"y":26,"x":223,"var":"petTitleImg","skin":"images/fontImg/buy_title.png","name":"imgBg2"}},{"type":"Image","props":{"y":297,"x":277,"skin":"images/core/diamond.png"}},{"type":"Image","props":{"y":143,"x":252,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":208,"x":318,"var":"imgMonster","skin":"images/carImg/hero_d1_18.png","name":"imgMonster","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":27,"x":225,"var":"accTitleImg","skin":"images/fontImg/accelerate_title.png"}},{"type":"Image","props":{"y":159,"x":270,"var":"accIcon","skin":"images/hall/accelerate_icon.png"}},{"type":"Label","props":{"y":295,"x":319,"var":"txtDiamond","text":"0","name":"txtDiamond","fontSize":40,"color":"#731d0e","align":"left"}},{"type":"Label","props":{"y":496,"x":234,"text":"点击空白处关闭","fontSize":26,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":344,"x":162,"var":"btnBuy","stateNum":1,"skin":"images/component/yellow_btn.png","name":"btnBuy"},"child":[{"type":"Label","props":{"y":35,"x":83,"text":"点击购买","strokeColor":"#825321","stroke":2,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":-8,"x":564,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]}]};
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
		public txt_name:Laya.Label;
		public btn_get:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":587,"height":788},"child":[{"type":"Box","props":{"y":0,"x":0,"width":587,"height":788},"child":[{"type":"SkeletonPlayer","props":{"y":394,"x":295,"url":"images/effect/bone/bglight.sk"}},{"type":"Image","props":{"y":396,"x":175,"skin":"images/core/hero_bg.png"}},{"type":"Image","props":{"skin":"images/fontImg/font_gongxi.png"}},{"type":"Image","props":{"y":476,"x":295,"var":"imgPet","skin":"images/carImg/hero_d1_18.png","scaleY":2,"scaleX":2,"anchorY":1,"anchorX":0.5}},{"type":"Image","props":{"y":611,"x":143,"skin":"images/fontImg/getFreePet_title.png"}},{"type":"Label","props":{"y":798,"x":188,"text":"点击空白处关闭","fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":215,"x":46,"width":494,"var":"txt_name","text":"名字 Lv10","strokeColor":"#946430","stroke":2,"height":40,"fontSize":40,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":669,"x":130,"var":"btn_get","stateNum":1,"skin":"images/component/yellow_btn.png","labelStrokeColor":"#946430","labelStroke":2,"labelSize":50,"labelColors":"#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"领取"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);
			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.common.view.FreeGetPetViewUI.uiView);

        }

    }
}

module ui.common.view {
    export class MessageTipsUI extends View {
		public bg:Laya.Image;
		public txt_content:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"var":"bg","skin":"images/component/frame_tips_bg.png","sizeGrid":"34,62,36,71"}},{"type":"Image","props":{"y":18,"x":18,"skin":"images/core/core_tips_icon.png"}},{"type":"Label","props":{"y":20,"x":56,"var":"txt_content","text":"消息提示","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.view.MessageTipsUI.uiView);

        }

    }
}

module ui.common.view {
    export class NoticeViewUI extends View {
		public txt_content:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":725,"height":782},"child":[{"type":"Box","props":{"y":0,"x":0,"width":725,"height":782},"child":[{"type":"Image","props":{"y":217,"x":0,"width":716,"skin":"images/component/frame_9calce_01.png","height":565,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":213,"x":632,"skin":"images/component/frame_close_btn.png"}},{"type":"Image","props":{"y":0,"x":23,"skin":"images/fontImg/game_Notice_title.png"}},{"type":"Label","props":{"y":780,"x":257,"text":"点击空白处关闭","fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":413,"x":69,"wordWrap":true,"width":595,"var":"txt_content","text":"公告内容","height":317,"fontSize":28,"color":"#884a00"}},{"type":"Label","props":{"y":368,"x":32,"text":"亲爱的各位玩家：","fontSize":28,"color":"#884a00"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.common.view.NoticeViewUI.uiView);

        }

    }
}

module ui.common.view {
    export class OfflineRewardsViewUI extends View {
		public imgMoney:Laya.Image;
		public txtMoney:Laya.Label;
		public btnShare:Laya.Button;
		public btnVideo:Laya.Button;
		public btnExit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":724,"height":654},"child":[{"type":"Box","props":{"y":87,"x":0,"width":714,"height":564},"child":[{"type":"Image","props":{"y":0,"x":0,"width":716,"skin":"images/component/frame_9calce_01.png","height":567,"sizeGrid":"168,65,62,82"}},{"type":"SkeletonPlayer","props":{"y":248,"x":359,"url":"images/effect/bone/bglight.sk"}},{"type":"Image","props":{"y":-59,"x":63,"skin":"images/offlineReward/title.png"}},{"type":"Image","props":{"y":164,"x":290,"width":146,"skin":"images/component/frame_9calce_03.png","height":145,"sizeGrid":"26,31,23,28"}},{"type":"Label","props":{"y":502,"x":224,"text":"离线收益最多两个小时","fontSize":28,"color":"#f1774e","bold":true}},{"type":"Image","props":{"y":181,"x":307,"var":"imgMoney","skin":"images/core/coin_stack_01.png","name":"imgMoney"},"child":[{"type":"Label","props":{"y":150,"x":-196,"width":500,"var":"txtMoney","text":"264.78M","strokeColor":"#a86c42","stroke":4,"name":"txtMoney","fontSize":50,"color":"#fff4e1","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":390,"x":208,"var":"btnShare","stateNum":1,"skin":"images/component/normal_btn.png","name":"btnShare"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Label","props":{"y":28,"x":2,"width":304,"text":"免费领取x2","strokeColor":"#946430","stroke":5,"height":40,"fontSize":40,"color":"#fff4e1","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":389,"x":209,"var":"btnVideo","stateNum":1,"skin":"images/component/normal_btn.png","name":"btnVideo"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Label","props":{"y":28,"x":2,"width":262,"text":"视频领取x8","strokeColor":"#946430","stroke":5,"height":40,"fontSize":40,"color":"#fff4e1","bold":true,"align":"center"}},{"type":"Image","props":{"y":28,"x":246,"skin":"images/core/video_icon.png"}}]},{"type":"Button","props":{"y":0,"x":631,"visible":false,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);
			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.common.view.OfflineRewardsViewUI.uiView);

        }

    }
}

module ui.common.view {
    export class RewardGetViewUI extends View {
		public btn_get:Laya.Button;
		public hbox:Laya.HBox;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Box","props":{"y":10,"x":10,"width":587,"height":614},"child":[{"type":"SkeletonPlayer","props":{"y":318,"x":289,"url":"images/effect/bone/bglight.sk"}},{"type":"Image","props":{"skin":"images/fontImg/reward_get_title.png"}},{"type":"Label","props":{"y":621,"x":188,"text":"点击空白处关闭","fontSize":30,"color":"#ffffff"}},{"type":"Button","props":{"y":492,"x":129,"var":"btn_get","stateNum":1,"skin":"images/component/yellow_btn.png","labelStrokeColor":"#946430","labelStroke":2,"labelSize":40,"labelColors":"#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"领取"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"HBox","props":{"y":330,"x":293,"var":"hbox","space":5,"height":130,"anchorY":0.5,"anchorX":0.5,"align":"middle"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);
			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.common.view.RewardGetViewUI.uiView);

        }

    }
}

module ui.common.view {
    export class RewardGoldViewUI extends View {
		public txt_gold:Laya.Label;
		public txt_close:Laya.Label;
		public txt_lastCount:Laya.Label;
		public btn_free:Laya.Button;
		public txt_share:Laya.Label;
		public advBox:Laya.Box;
		public btnExit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":723,"height":558},"child":[{"type":"Box","props":{"y":0,"x":0,"width":723,"height":558},"child":[{"type":"Image","props":{"y":0,"x":0,"width":718,"skin":"images/component/frame_9calce_04.png","sizeGrid":"178,120,101,152","name":"imgBg","height":564}},{"type":"Image","props":{"y":30,"x":256,"skin":"images/rewardGold/rewardGold_title.png","name":"imgBg2"}},{"type":"Image","props":{"y":148,"x":288,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":160,"x":299,"skin":"images/core/coin_stack_01.png"}},{"type":"Image","props":{"y":309,"x":269,"skin":"images/core/coin_big.png"}},{"type":"Image","props":{"y":375,"x":25,"width":665,"skin":"images/component/frame_line_01.png"}},{"type":"Label","props":{"y":313,"x":337,"var":"txt_gold","text":"0","fontSize":50,"color":"#884a00","bold":true,"align":"left"}},{"type":"Label","props":{"y":563,"x":271,"visible":false,"var":"txt_close","text":"点击空白处关闭","fontSize":26,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":502,"x":268,"var":"txt_lastCount","text":"今天剩余10次","fontSize":30,"color":"#d20000","bold":true}},{"type":"Button","props":{"y":388,"x":198,"var":"btn_free","stateNum":1,"skin":"images/component/yellow_btn.png"},"child":[{"type":"Label","props":{"y":32,"x":71,"var":"txt_share","text":"免费领取","strokeColor":"#825321","stroke":4,"fontSize":45,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}},{"type":"Box","props":{"y":34,"x":33,"var":"advBox"},"child":[{"type":"Label","props":{"y":1,"x":0,"text":"看视频领取x5","strokeColor":"#825321","stroke":4,"fontSize":35,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":2,"x":220,"skin":"images/core/video_icon.png"}}]}]},{"type":"Button","props":{"y":-11,"x":630,"visible":false,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]}]};
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

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"Box","props":{"y":-20,"x":-62},"child":[{"type":"Image","props":{"y":0,"width":718,"skin":"images/component/frame_9calce_04.png","sizeGrid":"178,120,101,152","height":589}},{"type":"Image","props":{"y":29,"x":256,"skin":"images/fontImg/skill_title_icon.png"}},{"type":"Image","props":{"y":142,"x":34,"width":653,"skin":"images/component/frame_9calce_02.png","sizeGrid":"25,32,32,36","height":407}},{"type":"Image","props":{"y":169,"x":61,"skin":"images/core/skill_01.png","scaleY":0.65,"scaleX":0.65}},{"type":"Image","props":{"y":293,"x":61,"skin":"images/core/skill_02.png","scaleY":0.65,"scaleX":0.65}},{"type":"Image","props":{"y":418,"x":61,"skin":"images/core/skill_03.png","scaleY":0.65,"scaleX":0.65}},{"type":"Label","props":{"y":587,"x":272,"text":"点击空白处关闭","fontSize":26,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":175,"x":180,"text":"雷神之怒：","fontSize":28,"color":"#9a2525"}},{"type":"Label","props":{"y":215,"x":180,"text":"攻击时有几率同时攻击2个怪物","fontSize":24,"color":"#8b6107","align":"left"}},{"type":"Label","props":{"y":300,"x":180,"text":"冰冻之触：","fontSize":28,"color":"#9a2525"}},{"type":"Label","props":{"y":340,"x":180,"text":"攻击时有几率造成20%减速效果持续5秒","fontSize":24,"color":"#8b6107","align":"left"}},{"type":"Label","props":{"y":426,"x":180,"text":"幽冥毒液：","fontSize":28,"color":"#9a2525"}},{"type":"Label","props":{"y":466,"x":180,"wordWrap":true,"width":429,"text":"攻击时有一定几率造成中毒效果对怪物造成单体持续性伤害","height":54,"fontSize":24,"color":"#8b6107","align":"left"}},{"type":"Button","props":{"y":-7,"x":634,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.common.view.SkillExplainViewUI.uiView);

        }

    }
}

module ui.common.view {
    export class SkyDropViewUI extends View {
		public btnClose:Laya.Button;
		public btnHelp:Laya.Button;
		public btnVideo:Laya.Button;
		public hbox2:Laya.HBox;
		public lblDuration:Laya.Label;
		public hbox1:Laya.HBox;
		public lblDesc:Laya.Label;
		public lblNum:Laya.Label;
		public txt_close:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":717,"height":634},"child":[{"type":"Box","props":{"y":0,"x":0,"width":717,"height":634},"child":[{"type":"Image","props":{"y":69,"width":716,"skin":"images/component/frame_9calce_01.png","height":565,"sizeGrid":"168,65,62,82"}},{"type":"Button","props":{"y":65,"x":632,"visible":false,"var":"btnClose","stateNum":1,"skin":"images/component/frame_close_btn.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Image","props":{"x":63,"skin":"images/skyDrop/title.png"}},{"type":"Button","props":{"y":468,"x":76,"var":"btnHelp","stateNum":1,"skin":"images/component/blue_btn.png","labelStrokeColor":"#306294","labelStroke":4,"labelSize":32,"labelColors":"#FFFFFF","labelBold":true,"label":"求助"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":468,"x":405,"width":240,"var":"btnVideo","stateNum":1,"skin":"images/component/normal_btn.png","sizeGrid":"40,77,43,84","labelStrokeColor":"#946430","labelStroke":4,"labelSize":32,"labelColors":"#FFFFFF","labelBold":true,"label":"领取","height":100},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"HBox","props":{"y":401,"x":358,"var":"hbox2","anchorY":0.5,"anchorX":0.5,"align":"middle"},"child":[{"type":"Label","props":{"y":2,"x":196,"text":"秒","fontSize":40,"font":"SimHei","color":"#884a00","bold":true}},{"type":"Label","props":{"text":"持续","fontSize":40,"font":"SimHei","color":"#884a00","bold":true}},{"type":"Label","props":{"y":0,"x":81.5625,"var":"lblDuration","text":"180","fontSize":44,"font":"SimHei","color":"#eb6626","bold":true,"align":"center"}}]},{"type":"HBox","props":{"y":314,"x":358,"var":"hbox1","anchorY":0.5,"anchorX":0.5,"align":"middle"},"child":[{"type":"Label","props":{"var":"lblDesc","text":"英雄攻击力增加","fontSize":40,"font":"SimHei","color":"#884a00","bold":true,"align":"right"}},{"type":"Label","props":{"y":3,"x":294,"var":"lblNum","text":"50%","fontSize":44,"font":"SimHei","color":"#eb6626","bold":true}}]},{"type":"Label","props":{"y":634,"x":281,"visible":false,"var":"txt_close","text":"点击空白处关闭","fontSize":26,"color":"#ffffff","align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.common.view.SkyDropViewUI.uiView);

        }

    }
}

module ui.common.view {
    export class VideoAdViewUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":723,"height":569},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/component/frame_9calce_04.png","name":"imgBg"},"child":[{"type":"Label","props":{"y":266,"x":320,"wordWrap":true,"text":"当前","fontSize":40,"color":"#6c4419","align":"center"}},{"type":"Button","props":{"y":-3,"x":630,"stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Label","props":{"y":327,"x":200,"text":"没有可观看的视频","fontSize":40,"color":"#6c4419","align":"center"}},{"type":"Label","props":{"y":564,"x":262,"text":"点击空白处关闭","fontSize":28,"color":"#ffffff","align":"center"}},{"type":"Image","props":{"y":33,"x":309,"skin":"images/fontImg/zhagao_title.png"}}]}]};
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

        public static  uiView:any ={"type":"View","props":{"width":715,"height":1014},"child":[{"type":"View","props":{"y":0,"width":715,"var":"mainView","name":"mainView","height":1014,"centerX":0},"child":[{"type":"Label","props":{"y":848,"x":270,"text":"点击空白处关闭","name":"txtExit","fontSize":30,"color":"#ffffff"}},{"type":"Image","props":{"y":0,"x":0,"width":715,"skin":"images/component/frame_9calce_01.png","sizeGrid":"158,62,69,62","name":"imgBg","height":1014},"child":[{"type":"Image","props":{"y":32,"x":259,"skin":"images/fontImg/evolution_shop_title.png"}},{"type":"Image","props":{"y":587,"x":36,"skin":"images/component/frame_line_01.png"}},{"type":"Image","props":{"y":216,"x":36,"skin":"images/component/frame_line_01.png"}},{"type":"Image","props":{"y":627,"x":32,"skin":"images/component/frame_9calce_05.png"}},{"type":"Image","props":{"y":286,"x":61,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":285,"x":295,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":285,"x":520,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":305,"x":94,"skin":"images/carImg/hero_d1_18.png"}},{"type":"Image","props":{"y":278,"x":509,"skin":"images/core/essence_icon.png"}},{"type":"Image","props":{"y":289,"x":299,"skin":"images/core/diamond_icon_more.png","scaleY":0.8,"scaleX":0.8}},{"type":"Label","props":{"y":437,"x":543,"text":"精华碎片","fontSize":24,"color":"#886300","align":"right"}},{"type":"Label","props":{"y":437,"x":338,"text":"钻石","fontSize":24,"color":"#886300","align":"right"}},{"type":"Label","props":{"y":437,"x":79,"text":"强•狄安娜","fontSize":24,"color":"#886300","align":"right"}},{"type":"Label","props":{"y":541,"x":68,"text":"进化条件","fontSize":32,"color":"#c83d33","align":"left"}},{"type":"Label","props":{"y":925,"x":177,"text":"注：进化后系统将收回未进化英雄","fontSize":24,"color":"#712f0f","align":"left"}},{"type":"Label","props":{"y":169,"x":68,"text":"进化后获得","fontSize":32,"color":"#c83d33","align":"left"}},{"type":"Label","props":{"y":373,"x":588,"var":"txtItemPrize3","text":"x30","strokeColor":"#946430","stroke":3,"name":"txtItemPrize3","fontSize":30,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":373,"x":149,"var":"txtItemPrize1","text":"x3","strokeColor":"#946430","stroke":3,"name":"txtItemPrize1","fontSize":30,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":373,"x":347,"var":"txtItemPrize2","text":"x500","strokeColor":"#946430","stroke":3,"name":"txtItemPrize2","fontSize":30,"color":"#ffffff","align":"right"}},{"type":"Label","props":{"y":639,"x":222,"var":"txtNeedItem1","text":"0/1","name":"txtNeedItem1","fontSize":28,"color":"#9a8d00","align":"left"}},{"type":"Label","props":{"y":636,"x":42,"var":"txtItemName1","text":"希芙 Lv30:","name":"txtItemName1","fontSize":30,"color":"#9a2525","align":"left"}},{"type":"Button","props":{"y":-4,"x":633,"stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":768,"x":194,"stateNum":1,"skin":"images/component/yellow_btn.png","name":"btnUpdate","labelStrokeColor":"#946430","labelStroke":2,"labelSize":60,"labelColors":"#ffffff","labelBold":true,"label":"进化","disabled":true},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.evolution.EvolutionAdvancedViewUI.uiView);

        }

    }
}

module ui.evolution {
    export class EvolutionLevelViewUI extends View {
		public effectLight:laya.ani.bone.Skeleton;
		public txt_name:Laya.Image;
		public txt_level:Laya.FontClip;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":500},"child":[{"type":"SkeletonPlayer","props":{"y":119,"x":378,"visible":false,"var":"effectLight","url":"images/effect/bone/bglight.sk"}},{"type":"Image","props":{"y":300,"x":245,"visible":false,"var":"txt_name","skin":"images/guardLevel/guardlevel_txt.png"}},{"type":"FontClip","props":{"y":373,"x":265,"width":220,"visible":false,"var":"txt_level","value":"0","skin":"images/guardLevel/guardlevel_num.png","sheet":"0123456789","height":86,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);

            super.createChildren();
            this.createView(ui.evolution.EvolutionLevelViewUI.uiView);

        }

    }
}

module ui.evolution {
    export class EvolutionViewUI extends View {
		public heroBox:Laya.Box;
		public nameHbox:Laya.HBox;
		public txtItemName:Laya.Label;
		public txtNeedItem0:Laya.Label;
		public txtNeedItem1:Laya.Label;
		public iconImg0:Laya.Image;
		public diamondBox:Laya.Box;
		public txtDiamondName:Laya.Label;
		public iconImg1:Laya.Image;
		public hboxDiamond:Laya.HBox;
		public txtNeedDiamond0:Laya.Label;
		public txtNeedDiamond1:Laya.Label;
		public btnExit:Laya.Button;
		public btnUpdate:Laya.Button;
		public txtSkillDes:Laya.Label;
		public txtDoubleAdd:Laya.Label;
		public txtKingLevel:Laya.Label;
		public txtAtkSpeed:Laya.Label;
		public txtAtkAdd:Laya.Label;
		public txtAtk:Laya.Label;
		public spMountGuard:MonsterSprite;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Box","props":{"y":0,"x":0,"width":713,"height":1050},"child":[{"type":"Image","props":{"y":6,"width":716,"skin":"images/component/frame_9calce_01.png","sizeGrid":"158,62,69,62","height":1044}},{"type":"Image","props":{"y":144,"x":31,"width":649,"skin":"images/component/frame_9calce_02.png","sizeGrid":"25,27,32,27","height":405}},{"type":"Image","props":{"y":178,"x":473,"skin":"images/component/frame_9calce_06.png"}},{"type":"Image","props":{"y":32,"x":249,"skin":"images/fontImg/king_title_icon.png"}},{"type":"Image","props":{"y":238,"x":473,"skin":"images/component/frame_9calce_06.png"}},{"type":"Image","props":{"y":297,"x":473,"skin":"images/component/frame_9calce_06.png"}},{"type":"Image","props":{"y":355,"x":473,"skin":"images/component/frame_9calce_06.png"}},{"type":"Image","props":{"y":413,"x":473,"skin":"images/component/frame_9calce_06.png"}},{"type":"Image","props":{"y":612,"x":36,"skin":"images/component/frame_line_01.png"}},{"type":"Box","props":{"y":630,"x":31,"var":"heroBox"},"child":[{"type":"Image","props":{"skin":"images/component/frame_9calce_05.png"}},{"type":"HBox","props":{"y":11,"x":32,"var":"nameHbox","space":5,"align":"bottom"},"child":[{"type":"Label","props":{"var":"txtItemName","text":"艾曼拉 Lv11:","fontSize":30,"color":"#9a2525","bold":true,"align":"left"}},{"type":"Label","props":{"y":3,"x":181.806640625,"var":"txtNeedItem0","text":"0","fontSize":28,"color":"#9a8d00","bold":true,"align":"left"}},{"type":"Label","props":{"y":3,"x":202.37890625,"var":"txtNeedItem1","text":"/1","fontSize":28,"color":"#9a8d00","bold":true,"align":"left"}}]},{"type":"Image","props":{"y":9,"x":540,"var":"iconImg0","skin":"images/hall/hall_gou.png"}}]},{"type":"Box","props":{"y":703,"x":31,"var":"diamondBox"},"child":[{"type":"Image","props":{"skin":"images/component/frame_9calce_05.png"}},{"type":"Image","props":{"y":13,"x":32,"skin":"images/core/diamond_icon.png","scaleY":0.6,"scaleX":0.6}},{"type":"Label","props":{"y":11,"x":73,"var":"txtDiamondName","text":"钻石:","fontSize":30,"color":"#9a2525","bold":true,"align":"left"}},{"type":"Image","props":{"y":11,"x":540,"var":"iconImg1","skin":"images/hall/hall_xx.png"}},{"type":"HBox","props":{"y":15,"x":156,"var":"hboxDiamond","align":"middle"},"child":[{"type":"Label","props":{"var":"txtNeedDiamond0","text":"0","fontSize":28,"color":"#9a8d00","bold":true,"align":"left"}},{"type":"Label","props":{"y":1,"x":19,"var":"txtNeedDiamond1","text":"/50","fontSize":28,"color":"#9a8d00","bold":true,"align":"left"}}]}]},{"type":"Button","props":{"x":634,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":827,"x":194,"var":"btnUpdate","stateNum":1,"skin":"images/component/yellow_btn.png","labelStrokeColor":"#946430","labelStroke":2,"labelSize":50,"labelColors":"#ffffff","labelBold":true,"label":"升级","disabled":true},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Label","props":{"y":566,"x":64,"text":"升级条件:","fontSize":32,"color":"#c83d33","bold":true,"align":"left"}},{"type":"Label","props":{"y":496,"x":102,"text":"技能效果:","fontSize":28,"color":"#9a2525","bold":true}},{"type":"Label","props":{"y":419,"x":350,"text":"暴击加成:","fontSize":28,"color":"#9a2525","bold":true}},{"type":"Label","props":{"y":360,"x":350,"text":"攻击加成:","fontSize":28,"color":"#9a2525","bold":true}},{"type":"Label","props":{"y":303,"x":407,"text":"速度:","fontSize":28,"color":"#9a2525","bold":true}},{"type":"Label","props":{"y":243,"x":407,"text":"攻击:","fontSize":28,"color":"#9a2525","bold":true}},{"type":"Label","props":{"y":497,"x":231,"width":400,"var":"txtSkillDes","text":"增加所有上阵英雄的攻击和暴击","fontSize":28,"color":"#8b6107","bold":true,"align":"left"}},{"type":"Label","props":{"y":418,"x":489,"var":"txtDoubleAdd","text":"0.8%","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":182,"x":489,"var":"txtKingLevel","text":"1","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":302,"x":489,"var":"txtAtkSpeed","text":"0.3s","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":361,"x":489,"var":"txtAtkAdd","text":"1.5%","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":244,"x":489,"var":"txtAtk","text":"10","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":183,"x":407,"text":"等级:","fontSize":28,"color":"#9a2525","bold":true}},{"type":"Label","props":{"y":1050,"x":260,"text":"点击空白处关闭","fontSize":30,"color":"#ffffff"}},{"type":"SkeletonPlayer","props":{"y":301,"x":180,"url":"images/effect/bone/bglight.sk","scaleY":0.5,"scaleX":0.5}},{"type":"Sprite","props":{"y":385,"x":197,"width":32,"var":"spMountGuard","scaleX":-1,"runtime":"MonsterSprite","height":32}},{"type":"Image","props":{"y":424,"x":88,"skin":"images/hall/hall_base.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);
			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);
			View.regComponent("MonsterSprite",MonsterSprite);

            super.createChildren();
            this.createView(ui.evolution.EvolutionViewUI.uiView);

        }

    }
}

module ui.evolution {
    export class LevelHeroViewUI extends View {
		public txt_name:Laya.Label;
		public txt_count:Laya.Label;
		public btn_exit:Laya.Button;
		public btn_sure:Laya.Button;
		public btn_next:Laya.Button;
		public txt_level:Laya.FontClip;
		public txt_uplevel:Laya.FontClip;
		public txt_diamond:Laya.Label;
		public spMountGuard:MonsterSprite;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Box","props":{"y":0,"x":0,"width":716,"height":567},"child":[{"type":"Image","props":{"y":5,"width":716,"skin":"images/component/frame_9calce_01.png","height":565,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":34,"x":167,"skin":"images/levelHero/levelHero_titel.png"}},{"type":"Image","props":{"y":191,"x":425,"skin":"images/levelHero/levelHero_arrow.png"}},{"type":"Image","props":{"y":146,"x":245,"skin":"images/levelHero/levelHero_level_bg.png"}},{"type":"Image","props":{"y":416,"x":24,"skin":"images/component/frame_line_02.png"}},{"type":"Image","props":{"y":146,"x":502,"skin":"images/levelHero/levelHero_level_bg.png"}},{"type":"Box","props":{"y":293,"x":246},"child":[{"type":"Image","props":{"y":0,"x":0,"width":430,"skin":"images/component/frame_9calce_05.png","height":50}},{"type":"Image","props":{"y":9,"x":139,"width":182,"skin":"images/levelHero/levelHero_name_bg.png","sizeGrid":"13,42,13,36","height":34}},{"type":"Label","props":{"y":14,"x":11,"text":"升级条件：","fontSize":26,"color":"#9a2525","bold":true,"align":"center"}},{"type":"Label","props":{"y":12,"x":139,"width":182,"var":"txt_name","text":"强•克瑞翁Lv30","height":26,"fontSize":26,"color":"#ad1c1c","bold":true,"align":"center"}},{"type":"Label","props":{"y":12,"x":324,"var":"txt_count","text":"x3","fontSize":26,"color":"#9a8d00","align":"center"}}]},{"type":"Label","props":{"y":569,"x":262,"text":"点击空白处关闭","fontSize":26,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"x":631,"var":"btn_exit","stateNum":1,"skin":"images/component/frame_close_btn.png"}},{"type":"Button","props":{"y":450,"x":390,"var":"btn_sure","stateNum":1,"skin":"images/component/frame_btn_small_yellow.png","labelStrokeColor":"#825321","labelStroke":2,"labelSize":30,"labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","label":"确定"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":451,"x":142,"width":183,"var":"btn_next","stateNum":1,"skin":"images/component/frame_btn_small_blue.png","sizeGrid":"-1,32,-6,34","labelStrokeColor":"#306294","labelStroke":2,"labelSize":30,"labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","label":"下次","height":65},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Image","props":{"y":237,"x":533,"skin":"images/levelHero/levelHero_next.png"}},{"type":"Image","props":{"y":238,"x":277,"skin":"images/levelHero/levelHero_curr.png"}},{"type":"Image","props":{"y":373,"x":43,"skin":"images/levelHero/levelHero_base.png"}},{"type":"FontClip","props":{"y":186,"x":289,"width":180,"var":"txt_level","value":"0","spaceX":-15,"skin":"images/levelHero/levelHero_num.png","sheet":"0123456789","scaleY":0.5,"scaleX":0.5,"height":86,"align":"center"}},{"type":"FontClip","props":{"y":186,"x":547,"width":180,"var":"txt_uplevel","value":"0","spaceX":-15,"skin":"images/levelHero/levelHero_num.png","sheet":"0123456789","scaleY":0.5,"scaleX":0.5,"height":86,"align":"center"}},{"type":"Box","props":{"y":349,"x":246},"child":[{"type":"Image","props":{"y":0,"x":0,"width":431,"skin":"images/component/frame_9calce_05.png","height":50}},{"type":"Image","props":{"y":7,"x":135,"skin":"images/core/diamond.png","scaleY":0.9,"scaleX":0.9}},{"type":"Label","props":{"y":11,"x":11,"text":"升级消耗：","fontSize":26,"color":"#9a2525","bold":true,"align":"center"}},{"type":"Label","props":{"y":10,"x":180,"var":"txt_diamond","text":"0/0","fontSize":26,"color":"#9a8d00","align":"left"}}]},{"type":"SkeletonPlayer","props":{"y":258,"x":136,"url":"images/effect/bone/bglight.sk","scaleY":0.5,"scaleX":0.5}},{"type":"Sprite","props":{"y":346,"x":149,"width":32,"var":"spMountGuard","scaleX":-1,"runtime":"MonsterSprite","height":32}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);
			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);
			View.regComponent("MonsterSprite",MonsterSprite);

            super.createChildren();
            this.createView(ui.evolution.LevelHeroViewUI.uiView);

        }

    }
}

module ui.follow {
    export class FollowRewardViewUI extends View {
		public mainView:View;
		public imgBg:Laya.Image;
		public btnExit:Laya.Button;
		public btnGet:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"View","props":{"y":0,"x":0,"width":750,"var":"mainView","name":"mainView","height":1334},"child":[{"type":"Image","props":{"y":294,"x":300,"width":750,"var":"imgBg","skin":"images/followReward/followReward_bg.jpg","rotation":0,"pivotY":294,"pivotX":300,"height":1334}},{"type":"Button","props":{"y":139,"x":587,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":556,"x":212,"var":"btnGet","stateNum":1,"skin":"images/followReward/followReward_btn.png","name":"btnGet"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.follow.FollowRewardViewUI.uiView);

        }

    }
}

module ui.friendConcur {
    export class FriendConcurUI extends View {
		public rewardList:Laya.List;
		public btn_send:Laya.Button;
		public btn_exit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":0,"x":0,"width":715,"skin":"images/component/frame_9calce_01.png","height":1015,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":35,"x":258,"skin":"images/friendConcur/friendConcur_title.png"}},{"type":"Image","props":{"y":137,"x":35,"width":646,"skin":"images/component/frame_9calce_02.png","height":668,"sizeGrid":"25,32,32,36"}},{"type":"Label","props":{"y":942,"x":116,"text":"好友点开互助链接，双方都能获得金币奖励","fontSize":26,"color":"#ff0000"}},{"type":"List","props":{"y":149,"x":49,"width":617,"var":"rewardList","spaceY":5,"repeatX":1,"height":636}},{"type":"Button","props":{"y":823,"x":200,"var":"btn_send","stateNum":1,"skin":"images/component/yellow_btn.png","labelStrokeColor":"#946430","labelStroke":2,"labelSize":40,"labelColors":"#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"发起好友互助"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":-6,"x":633,"var":"btn_exit","stateNum":1,"skin":"images/component/frame_close_btn.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.friendConcur.FriendConcurUI.uiView);

        }

    }
}

module ui.friendConcur {
    export class FriendConcurItemUI extends View {
		public txt_time:Laya.Label;
		public txt_gold:Laya.Label;
		public diamondBox:Laya.HBox;
		public txt_diamond:Laya.Label;
		public btn_get:Laya.Button;
		public hbox:Laya.HBox;
		public txt_des0:Laya.Label;
		public txt_des1:Laya.Label;
		public txt_des2:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":617,"height":140},"child":[{"type":"Box","props":{"y":0,"x":0,"renderType":"render"},"child":[{"type":"Image","props":{"x":1,"skin":"images/friendConcur/friendConcur_bg.png"}},{"type":"Image","props":{"y":7,"skin":"images/friendConcur/friendConcur_time_bg.png"}},{"type":"Label","props":{"y":12,"x":35,"width":227,"var":"txt_time","text":"2018-11-20 16:40","height":22,"fontSize":22,"color":"#ffffff"}},{"type":"Image","props":{"y":85,"x":46,"width":132,"skin":"images/component/frame_9scale_12.png","name":"imgGold","height":36},"child":[{"type":"Image","props":{"y":-3,"x":-13,"skin":"images/core/coin_40x40.png","name":"imgIcon"}},{"type":"Label","props":{"y":3,"x":30,"var":"txt_gold","text":"0","strokeColor":"#946430","stroke":4,"fontSize":26,"color":"#ffffff","bold":true,"align":"left"}}]},{"type":"HBox","props":{"y":84,"x":184,"var":"diamondBox","space":2},"child":[{"type":"Label","props":{"y":3,"text":"额外奖励","fontSize":24,"color":"#ff0000"}},{"type":"Image","props":{"x":101,"skin":"images/core/diamond.png","scaleY":0.8,"scaleX":0.8}},{"type":"Label","props":{"y":3,"x":135,"var":"txt_diamond","text":"+0","fontSize":24,"color":"#ff931f"}}]},{"type":"Button","props":{"y":39,"x":419,"var":"btn_get","stateNum":1,"skin":"images/component/frame_btn_small_yellow.png","labelStrokeColor":"#946430","labelStroke":2,"labelSize":32,"labelColors":"#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF","label":"领取"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"HBox","props":{"y":49,"x":29,"var":"hbox","align":"middle"},"child":[{"type":"Label","props":{"y":1,"var":"txt_des0","text":"您点击了","fontSize":22,"color":"#946430","align":"left"}},{"type":"Label","props":{"y":1,"x":89,"var":"txt_des1","text":"您点击了","fontSize":22,"color":"#6e9be0","align":"left"}},{"type":"Label","props":{"x":178,"var":"txt_des2","text":"您点击了","fontSize":22,"color":"#946430","align":"left"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.friendConcur.FriendConcurItemUI.uiView);

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
		public imgDialogCharacter:Laya.Box;
		public lblDialogScript:Laya.Label;
		public viewInteractArea:View;
		public viewClickTargetContainer:View;
		public imgFinger:Laya.Image;
		public imgClickCharacter:Laya.Box;
		public lblClickScript:Laya.Label;
		public btnReturnNovice:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"name":"NoviceViewUI","mouseThrough":true,"mouseEnabled":true},"child":[{"type":"View","props":{"y":0,"x":0,"width":750,"visible":false,"var":"viewInteract","name":"ViewInteract","mouseThrough":true,"mouseEnabled":true,"height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"width":750,"var":"imgTop","skin":"images/core/blank.png","mouseEnabled":true,"height":400}},{"type":"Image","props":{"y":400,"x":420,"width":330,"var":"imgRight","skin":"images/core/blank.png","mouseEnabled":true,"height":100}},{"type":"Image","props":{"y":500,"x":0,"width":750,"var":"imgBottom","skin":"images/core/blank.png","mouseEnabled":true,"height":834}},{"type":"Image","props":{"y":400,"x":0,"width":200,"var":"imgLeft","skin":"images/core/blank.png","mouseEnabled":true,"height":100}}]},{"type":"ViewStack","props":{"var":"viewStackNovice","selectedIndex":0,"name":"viewStackNovice"},"child":[{"type":"View","props":{"y":0,"x":0,"width":750,"name":"item0","height":1334},"child":[{"type":"Box","props":{"y":791,"x":10,"width":566,"var":"imgDialogCharacter","skin":"images/novice/character.png","height":330},"child":[{"type":"Image","props":{"y":145,"x":144,"skin":"images/novice/character_bg.png"}},{"type":"Label","props":{"y":176,"x":237,"wordWrap":true,"width":300,"var":"lblDialogScript","text":"文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本","overflow":"scroll","leading":10,"height":103,"fontSize":26,"color":"#a17338"}},{"type":"SkeletonPlayer","props":{"y":217,"x":113,"url":"images/effect/bone/xinshouyindao.sk"}}]}]},{"type":"View","props":{"width":750,"name":"item1","height":1334},"child":[{"type":"View","props":{"y":1256,"x":263,"var":"viewInteractArea","name":"ViewInteractArea"},"child":[{"type":"View","props":{"y":0,"x":0,"name":"ViewMASK","alpha":0.5},"child":[{"type":"Rect","props":{"y":-1299,"x":-750,"width":1500,"lineWidth":1,"height":1155,"fillColor":"#000000"}},{"type":"Rect","props":{"y":126,"x":-750,"width":1500,"lineWidth":1,"height":1155,"fillColor":"#000000"}},{"type":"Rect","props":{"y":-144,"x":-750,"width":615,"lineWidth":1,"height":270,"fillColor":"#000000"}},{"type":"Rect","props":{"y":-144,"x":135,"width":615,"lineWidth":1,"height":270,"fillColor":"#000000"}},{"type":"Image","props":{"y":-144,"x":-135,"width":270,"skin":"images/novice/interact_circle.png","height":270}}]},{"type":"View","props":{"y":0,"x":0,"var":"viewClickTargetContainer","name":"viewClickTargetContainer"}},{"type":"Image","props":{"y":30,"x":30,"var":"imgFinger","skin":"images/novice/finger.png"}}]},{"type":"Box","props":{"y":773,"x":88,"width":566,"var":"imgClickCharacter","skin":"images/novice/character.png","height":330},"child":[{"type":"Image","props":{"y":147,"x":145,"skin":"images/novice/character_bg.png"}},{"type":"Label","props":{"y":171,"x":236,"wordWrap":true,"width":300,"var":"lblClickScript","text":"文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本","overflow":"scroll","leading":10,"height":103,"fontSize":26,"color":"#a17338"}},{"type":"SkeletonPlayer","props":{"y":217,"x":113,"url":"images/effect/bone/xinshouyindao.sk"}}]}]}]},{"type":"Button","props":{"y":865,"x":491,"var":"btnReturnNovice","stateNum":1,"skin":"images/component/frame_btn_small_blue.png","labelStrokeColor":"#a17338","labelStroke":2,"labelSize":26,"labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":true,"label":"跳过","sizeGrid":"0,32,0,34"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);
			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.guide.NoviceViewUI.uiView);

        }

    }
}

module ui.hall {
    export class AccelerateTipsViewUI extends View {
		public spMountGuard:MonsterSprite;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":420},"child":[{"type":"Box","props":{"y":0,"x":0,"width":750,"height":420},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/accelerate/acc_bg.png"}},{"type":"Image","props":{"y":60,"x":436,"skin":"images/accelerate/acc_title.png"}},{"type":"Image","props":{"y":-4,"x":-29,"skin":"images/accelerate/acc_light.png"}},{"type":"Label","props":{"y":165,"x":390,"width":319,"text":"全场英雄攻击速度加倍！\\n技能触发几率翻倍！\\n获取金币收益更快！","strokeColor":"#a3760a","stroke":2,"leading":10,"height":110,"fontSize":26,"color":"#f3f3cf","bold":true,"align":"center"}},{"type":"Image","props":{"y":300,"x":56,"skin":"images/accelerate/acc_down_bg.png"}},{"type":"Sprite","props":{"y":250,"x":174,"width":32,"var":"spMountGuard","runtime":"MonsterSprite","height":32}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MonsterSprite",MonsterSprite);

            super.createChildren();
            this.createView(ui.hall.AccelerateTipsViewUI.uiView);

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
		public ani4:Laya.FrameAnimation;
		public navToMiniAni:Laya.FrameAnimation;
		public mainView:View;
		public imgUserInfo:Laya.Image;
		public progressBarExp:Laya.ProgressBar;
		public txtSection:Laya.Label;
		public txtLevel:Laya.Label;
		public imgGold:Laya.Image;
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
		public btnShopShortcut:Laya.Button;
		public btnShop:Laya.Button;
		public btnTask:Laya.Button;
		public btnStrengthen:Laya.Button;
		public strengthenRedPoint:Laya.Image;
		public btnEvolution:Laya.Button;
		public kingUpdateImg:Laya.Image;
		public btnStagePrize:Laya.Button;
		public btn_fly:Laya.Button;
		public btn_eliminate:Laya.Button;
		public menuBox:Laya.Box;
		public btn_arrow:Laya.Button;
		public btn_ranking:Laya.Button;
		public btn_follow:Laya.Button;
		public btn_concur:Laya.Button;
		public btn_sign:Laya.Button;
		public menuRedPoint:Laya.Image;
		public btn_welfare:Laya.Button;
		public btnLuckPrize:Laya.Button;
		public txt_prizeTime:Laya.Label;
		public btn_online:Laya.Button;
		public txt_diamondTime:Laya.Label;
		public btnFeedback:Laya.Button;
		public btnMore:Laya.Button;
		public btnAcce:Laya.Button;
		public imgAccIcon:Laya.Image;
		public btnInvitation:Laya.Box;
		public btnCarStore:Laya.Button;
		public surpassView:View;
		public viewBuffContainer:View;
		public viewSkyDropContainer:View;
		public viewNoviceContainer:View;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":750,"height":1334},"child":[{"type":"View","props":{"width":750,"var":"mainView","name":"mainView","height":1334,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/hall/bg.jpg","cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":68,"x":140,"skin":"images/effect/uiElectric/electric_4.png"},"compId":356}]},{"type":"Image","props":{"y":0,"x":375,"width":1,"var":"imgUserInfo","name":"imgUserInfo","height":1},"child":[{"type":"ProgressBar","props":{"y":31,"x":-120,"var":"progressBarExp","value":0,"skin":"images/hall/game_exp_pro.png","name":"progressBarExp"}},{"type":"Image","props":{"y":13,"x":-161,"skin":"images/core/game_exp_pro_head.png"},"child":[{"type":"Image","props":{"y":-4,"x":275,"skin":"images/hall/gicon_boss.png"}}]},{"type":"Label","props":{"y":38,"x":-52,"width":100,"var":"txtSection","text":"1/10","strokeColor":"#946430","stroke":3,"name":"txtSection","fontSize":24,"color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":32,"x":-198,"width":150,"var":"txtLevel","text":1,"strokeColor":"#946430","stroke":3,"name":"txtLevel","fontSize":30,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":17,"x":-347,"var":"imgGold","skin":"images/component/coin_frame.png","name":"imgMoney"},"child":[{"type":"Image","props":{"y":25,"x":10,"var":"imgMoney","skin":"images/core/coin_big.png","name":"imgMoney","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":15,"x":63,"width":200,"var":"txtMoney","text":1000,"name":"txtMoney","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}}]}]},{"type":"Image","props":{"y":76,"x":-341,"var":"imgDiamond","skin":"images/component/coin_frame.png","name":"imgDiamond"},"child":[{"type":"Image","props":{"y":-5,"x":-22,"skin":"images/core/diamond_icon.png"}},{"type":"Label","props":{"y":10,"x":43,"width":107,"var":"txtDiamond","text":0,"name":"txtDiamond","height":30,"fontSize":30,"color":"#ffffff","align":"left"}}]},{"type":"Label","props":{"y":208,"x":160,"width":80,"var":"txtKingLevel","text":1,"strokeColor":"#946430","stroke":3,"skewY":-10,"name":"txtKingLevel","fontSize":26,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":1083,"x":-90,"var":"imgTrain","skin":"images/component/frame_9calce_08.png","name":"imgTrain"},"child":[{"type":"Label","props":{"y":21,"x":31,"text":"训练中...","strokeColor":"#946430","stroke":3,"name":"txtTrain","fontSize":30,"color":"#ffffff","bold":true,"alpha":0.8,"align":"center"}}]},{"type":"Image","props":{"y":126,"x":-145,"var":"gameTimebg","skin":"images/hall/hall_time_bg.png"}},{"type":"Label","props":{"y":145,"x":-135,"width":80,"var":"txtGameTime","text":"00:00","strokeColor":"#ffffff","stroke":2,"name":"txtGameTime","fontSize":26,"color":"#3568fd","bold":true,"alpha":1,"align":"center"}},{"type":"Image","props":{"y":102,"x":-162,"var":"gameTimeImg","skin":"images/hall/game_gameLasttime.png","sizeGrid":"29,48,27,42"}}]},{"type":"Image","props":{"y":550,"x":1,"width":110,"visible":false,"var":"imgBorn","name":"imgBorn","mouseEnabled":false,"height":90,"cacheAs":"bitmap","anchorY":0.5,"anchorX":0.5,"alpha":0.5}},{"type":"Image","props":{"y":112,"x":220,"width":110,"visible":false,"var":"imgDestination","name":"imgDestination","mouseEnabled":false,"height":90,"alpha":0.5}},{"type":"Image","props":{"y":211,"x":240,"var":"btnDelete","skin":"images/hall/huishou_icon_0.png","name":"btnDelete"}},{"type":"List","props":{"y":320,"width":572,"var":"carparkList","spaceY":16,"spaceX":10,"repeatY":5,"repeatX":4,"name":"carparkList","mouseEnabled":false,"height":700,"centerX":45},"child":[{"type":"Box","props":{"y":80,"x":67,"width":100,"visible":false,"renderType":"render","height":100},"child":[{"type":"Sprite","props":{"y":-14,"x":-14,"width":128,"runtime":"MonsterSprite","name":"car","height":128},"child":[{"type":"Image","props":{"y":75,"x":64,"width":100,"visible":false,"skin":"images/hall/game_select_light.png","name":"imgLight","height":50,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":64,"x":64,"visible":false,"skin":"images/hall/game_lockIcon.png","name":"imgLock","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":87,"x":79,"width":31,"visible":false,"skin":"images/hall/lv_001.png","sizeGrid":"10,9,11,8","name":"imgLevel","height":25},"child":[{"type":"Label","props":{"y":3,"x":4,"width":23,"text":"0","name":"txtLevel","height":18,"fontSize":18,"color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":24,"x":34,"width":53,"text":"18关","strokeColor":"#83551a","stroke":2,"name":"txt_openLevel","height":18,"fontSize":18,"color":"#ffffff","align":"center"}},{"type":"Sprite","props":{"y":74,"x":62,"width":1,"name":"heroPos","height":1}}]}]}]},{"type":"Sprite","props":{"y":170,"x":535,"width":32,"var":"spMountGuard","runtime":"MonsterSprite","name":"spMountGuard","height":32}},{"type":"View","props":{"y":0,"x":0,"var":"roadView","name":"roadView"}},{"type":"View","props":{"y":10,"x":10,"name":"effectView"}},{"type":"View","props":{"y":1,"x":0,"var":"menuView","name":"menuView","cacheAs":"bitmap"},"child":[{"type":"Button","props":{"y":1163,"x":183,"var":"btnShopShortcut","stateNum":1,"skin":"images/hall/gbtn_shop.png","name":"btnShopShortcut"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":109,"x":30,"skin":"images/core/coin_40x40.png","name":"imgPrice","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Label","props":{"y":4,"x":45,"width":150,"text":1000,"strokeColor":"#946430","stroke":3,"name":"txtPrice","height":32,"fontSize":30,"color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":33,"x":13,"width":150,"text":"英雄 Lv1","strokeColor":"#ffe7b0","stroke":3,"name":"txtLevel","fontSize":28,"color":"#98592e","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":1163,"x":400,"var":"btnShop","stateNum":1,"skin":"images/hall/gbtn_shop.png","name":"btnShop"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":-12,"x":41,"skin":"images/hall/shop_btn_icon.png"}},{"type":"Label","props":{"y":91,"x":13,"width":150,"text":"酒馆","strokeColor":"#946430","stroke":3,"name":"txtPrice","fontSize":34,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Image","props":{"y":-3,"x":136,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRedPoint"}}]},{"type":"Button","props":{"y":273,"x":2,"var":"btnTask","stateNum":1,"skin":"images/hall/gbtn_task.png","name":"btnTask"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":4,"x":86,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRedPoint"}},{"type":"Image","props":{"y":-56,"x":35,"skin":"images/effect/uiBird/niao_1.png"},"compId":355}]},{"type":"Button","props":{"y":1109,"x":606,"var":"btnStrengthen","stateNum":1,"skin":"images/hall/gbtn_strengthen.png","name":"btnStrengthen"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":0,"x":71,"visible":false,"var":"strengthenRedPoint","skin":"images/core/red_dot_hint.png","name":"strengthenRedPoint"}}]},{"type":"Button","props":{"y":132,"x":497,"width":100,"var":"btnEvolution","name":"btnEvolution","height":100},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":1,"x":86,"skin":"images/hall/evolution_hint_frame.png"},"child":[{"type":"Image","props":{"y":10,"x":57,"visible":false,"skin":""}},{"type":"Label","props":{"y":28,"x":-3,"width":80,"text":"守卫","skewY":-20,"name":"txtKingLevel","height":30,"fontSize":26,"color":"#4f8d2d","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":12,"x":140,"var":"kingUpdateImg","skin":"images/core/red_dot_hint.png"}}]},{"type":"Button","props":{"y":555,"x":0,"width":88,"visible":false,"var":"btnStagePrize","name":"btnStagePrize","labelSize":30,"height":106},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":1212,"x":30,"var":"btn_fly","stateNum":1,"skin":"images/core/core_fly_icon.png","rotation":0},"compId":392},{"type":"Button","props":{"y":1209,"x":604,"var":"btn_eliminate","stateNum":1,"skin":"images/core/core_eliminate_icon.png","rotation":0},"compId":393},{"type":"Box","props":{"y":127,"width":457,"var":"menuBox","left":0,"height":109},"child":[{"type":"Image","props":{"width":457,"skin":"images/hall/hall_suofang_bg.png","sizeGrid":"45,44,50,0","mouseThrough":false,"mouseEnabled":false,"height":109}},{"type":"Button","props":{"y":54,"x":420,"var":"btn_arrow","stateNum":1,"skin":"images/hall/hall_arrow.png","scaleX":1,"anchorY":0.5,"anchorX":0.5}},{"type":"Button","props":{"y":11,"x":6,"var":"btn_ranking","stateNum":1,"skin":"images/hall/hall_rankBtn.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":10,"x":101,"var":"btn_follow","stateNum":1,"skin":"images/hall/hall_followBtn.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":3,"x":57,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRedPoint"}}]},{"type":"Button","props":{"y":11,"x":196,"var":"btn_concur","stateNum":1,"skin":"images/hall/hall_concurBtn.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":3,"x":57,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRedPoint"}}]},{"type":"Button","props":{"y":9,"x":291,"var":"btn_sign","stateNum":1,"skin":"images/hall/hall_dailySingBtn.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":2,"x":59,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRedPoint"}}]},{"type":"Image","props":{"y":-7,"x":425,"visible":false,"var":"menuRedPoint","skin":"images/core/red_dot_hint.png"}},{"type":"Button","props":{"y":10,"x":5,"var":"btn_welfare","stateNum":1,"skin":"images/hall/btn_welfare_icon.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":4,"x":60,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRedPoint"}}]}]},{"type":"Button","props":{"y":661,"x":0,"var":"btnLuckPrize","stateNum":1,"skin":"images/hall/gbtn_luck.png","name":"btnLuckPrize"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":3,"x":59,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRedPoint"}},{"type":"Label","props":{"y":57,"x":1,"width":86,"var":"txt_prizeTime","text":"05:00","strokeColor":"#8d5d2e","stroke":2,"height":26,"fontSize":22,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":751,"x":0,"var":"btn_online","stateNum":1,"skin":"images/hall/hall_online_reward.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Label","props":{"y":60,"x":2,"width":86,"var":"txt_diamondTime","text":"05:00","strokeColor":"#8d5d2e","stroke":2,"height":26,"fontSize":22,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":843,"x":0,"var":"btnFeedback","stateNum":1,"skin":"images/hall/gbtn_feedback.png","name":"btnFeedback"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":937,"x":0,"var":"btnMore","stateNum":1,"skin":"images/hall/more_icon.png","name":"btnMore"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":3,"x":59,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRedPoint"}}]},{"type":"Button","props":{"y":1101,"x":30,"var":"btnAcce","stateNum":1,"skin":"images/hall/gbtn_acce.png","scaleY":1,"scaleX":1,"name":"btnAcce"},"compId":11,"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":60,"x":75,"visible":false,"var":"imgAccIcon","skin":"images/core/video_icon.png"}},{"type":"Image","props":{"y":-19,"x":9,"visible":false,"skin":"images/hall/daojishi_di.png","name":"imgAcce"},"child":[{"type":"Label","props":{"y":8,"x":8,"width":80,"text":"00:00","name":"txtAcceTime","fontSize":28,"color":"#ffffff","align":"center"}}]}]},{"type":"Box","props":{"y":282,"x":652,"width":100,"var":"btnInvitation","height":100},"child":[{"type":"SkeletonPlayer","props":{"y":52,"x":50,"url":"images/effect/bone/yaoqing.sk"}},{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]},{"type":"Button","props":{"y":420,"x":12,"visible":false,"var":"btnCarStore","stateNum":1,"skin":"images/hall/box_001.png","name":"btnCarStore","labelSize":30},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"View","props":{"y":110,"x":654,"width":96,"visible":false,"var":"surpassView","name":"surpassView","height":160}}]},{"type":"View","props":{"y":10,"x":10,"var":"viewBuffContainer"}},{"type":"View","props":{"y":0,"x":0,"var":"viewSkyDropContainer"}},{"type":"View","props":{"y":10,"x":10,"var":"viewNoviceContainer"}}],"animations":[{"nodes":[{"target":11,"keyframes":{"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleY","index":0},{"value":0.96,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleY","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleY","index":30}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleX","index":0},{"value":0.96,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleX","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":11,"key":"scaleX","index":30}]}}],"name":"ani1","id":1,"frameRate":24,"action":0},{"nodes":[],"name":"ani3","id":3,"frameRate":24,"action":2},{"nodes":[{"target":355,"keyframes":{"skin":[{"value":"images/effect/uiBird/niao_1.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":0},{"value":"images/effect/uiBird/niao_2.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":3},{"value":"images/effect/uiBird/niao_3.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":6},{"value":"images/effect/uiBird/niao_4.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":9},{"value":"images/effect/uiBird/niao_5.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":12},{"value":"images/effect/uiBird/niao_6.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":15},{"value":"images/effect/uiBird/niao_7.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":18},{"value":"images/effect/uiBird/niao_1.png","tweenMethod":"linearNone","tween":false,"target":355,"key":"skin","index":35}]}},{"target":356,"keyframes":{"skin":[{"value":"images/effect/uiElectric/electric_1.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":0},{"value":"images/effect/uiElectric/electric_2.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":5},{"value":"images/effect/uiElectric/electric_3.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":10},{"value":"images/effect/uiElectric/electric_4.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":15},{"value":"images/effect/uiElectric/electric_1.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":20},{"value":"images/effect/uiElectric/electric_2.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":25},{"value":"images/effect/uiElectric/electric_3.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":30},{"value":"images/effect/uiElectric/electric_4.png","tweenMethod":"linearNone","tween":false,"target":356,"key":"skin","index":35}]}}],"name":"ani4","id":4,"frameRate":24,"action":2},{"nodes":[{"target":392,"keyframes":{"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":392,"key":"rotation","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":392,"key":"rotation","index":20},{"value":12,"tweenMethod":"linearNone","tween":true,"target":392,"key":"rotation","index":23},{"value":-12,"tweenMethod":"linearNone","tween":true,"target":392,"key":"rotation","index":29},{"value":8,"tweenMethod":"linearNone","tween":true,"target":392,"key":"rotation","index":35},{"value":-8,"tweenMethod":"linearNone","tween":true,"target":392,"key":"rotation","index":41},{"value":0,"tweenMethod":"linearNone","tween":true,"target":392,"key":"rotation","index":44},{"value":0,"tweenMethod":"linearNone","tween":true,"target":392,"key":"rotation","index":70}]}},{"target":393,"keyframes":{"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":393,"key":"rotation","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":393,"key":"rotation","index":70},{"value":12,"tweenMethod":"linearNone","tween":true,"target":393,"key":"rotation","index":73},{"value":-12,"tweenMethod":"linearNone","tween":true,"target":393,"key":"rotation","index":79},{"value":8,"tweenMethod":"linearNone","tween":true,"target":393,"key":"rotation","index":85},{"value":-8,"tweenMethod":"linearNone","tween":true,"target":393,"key":"rotation","index":91},{"value":0,"tweenMethod":"linearNone","tween":true,"target":393,"key":"rotation","index":94},{"value":0,"tweenMethod":"linearNone","tween":true,"target":393,"key":"rotation","index":210}]}}],"name":"navToMiniAni","id":5,"frameRate":24,"action":0}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("MonsterSprite",MonsterSprite);
			View.regComponent("ScaleAnimScript",ScaleAnimScript);
			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);

            super.createChildren();
            this.createView(ui.hall.HallSceneUI.uiView);

        }

    }
}

module ui.invitation {
    export class InvitationViewUI extends View {
		public shareItemList:Laya.List;
		public btnExit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":723,"height":1017},"child":[{"type":"View","props":{"visible":true,"name":"mainView"},"child":[{"type":"Image","props":{"y":4,"x":0,"width":713,"skin":"images/component/frame_9calce_01.png","height":1013,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":138,"x":33,"width":646,"skin":"images/component/frame_9calce_02.png","height":846,"sizeGrid":"25,32,32,36"}},{"type":"Image","props":{"y":155,"x":49,"skin":"images/invitation/banner.png"}},{"type":"Image","props":{"y":39,"x":256,"skin":"images/invitation/invitation_title.png"}},{"type":"List","props":{"y":392,"x":36,"width":640,"var":"shareItemList","spaceY":15,"repeatY":1,"repeatX":1,"height":541},"child":[{"type":"Box","props":{"y":5,"x":15,"width":609,"visible":false,"renderType":"render","height":138,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":0,"x":-3,"skin":"images/invitation/item_bg.png"}},{"type":"Image","props":{"y":80,"x":142,"skin":"images/invitation/reward_bg.png"}},{"type":"Image","props":{"y":23,"x":19,"skin":"images/invitation/empty_friend_icon.png","name":"imgHead"}},{"type":"Image","props":{"y":78,"x":126,"skin":"images/invitation/diamond.png","name":"imgAwardIcon"},"child":[{"type":"Label","props":{"y":5,"x":45,"width":83,"text":"200","name":"txtAward","height":30,"fontSize":30,"color":"#fcf4cd","align":"left"}}]},{"type":"Label","props":{"y":33,"x":127,"width":272,"text":"第1个好友","name":"txtTitle","height":30,"fontSize":26,"color":"#a17338","bold":true,"align":"left"}},{"type":"Label","props":{"y":83,"x":257,"width":220,"visible":false,"text":"额外奖励200","name":"txtExtra","fontSize":30,"color":"#cf0000","align":"left"}},{"type":"Image","props":{"y":45,"x":421,"skin":"images/component/frame_9scale_11.png","name":"txtGet"},"child":[{"type":"Label","props":{"y":9,"x":22,"width":120,"text":"已领取","fontSize":30,"color":"#fff4e1","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":42,"x":415,"stateNum":1,"skin":"images/invitation/btn_obtain.png","name":"btnGet","labelStrokeColor":"#946430","labelStroke":3,"labelSize":30,"labelColors":"#fff4e1","labelBold":true,"label":"领取"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":42,"x":415,"stateNum":1,"skin":"images/invitation/invite_btn.png","name":"btnInvite","labelStrokeColor":"#306294","labelStroke":3,"labelSize":30,"labelColors":"#fff4e1","labelBold":true,"label":"邀请"}}]}]},{"type":"Button","props":{"y":0,"x":630,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Label","props":{"y":945,"x":42,"width":638,"text":"邀请刚进入游戏的好友才有奖励领取哟~","strokeColor":"#7a572b","stroke":2,"height":24,"fontSize":24,"color":"#ffffff","bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.invitation.InvitationViewUI.uiView);

        }

    }
}

module ui.login {
    export class LoginUI extends View {
		public inputAccount:Laya.TextInput;
		public btnSubmit:Laya.Button;
		public inputPwd:Laya.TextInput;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Label","props":{"y":516,"x":209,"width":84,"text":"帐号：","height":32,"fontSize":32,"color":"#ffffff"}},{"type":"Rect","props":{"y":512,"x":296,"width":240,"lineWidth":2,"lineColor":"#ffffff","height":40,"fillColor":"#000000"}},{"type":"TextInput","props":{"y":512,"x":306,"width":220,"var":"inputAccount","valign":"middle","type":"text","promptColor":"#9a9a9a","prompt":"输入帐号","height":40,"fontSize":24,"color":"#ffffff"}},{"type":"Button","props":{"y":652,"x":311,"width":144,"var":"btnSubmit","labelSize":24,"labelColors":"#000000,#0000FF","label":"登  录","height":32},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":144,"lineWidth":1,"height":32,"fillColor":"#ffffff"}}]},{"type":"Label","props":{"y":576,"x":209,"width":84,"text":"密码：","height":32,"fontSize":32,"color":"#ffffff"}},{"type":"Rect","props":{"y":572,"x":296,"width":240,"lineWidth":2,"lineColor":"#ffffff","height":40,"fillColor":"#000000"}},{"type":"TextInput","props":{"y":572,"x":306,"width":220,"var":"inputPwd","valign":"middle","type":"password","promptColor":"#9a9a9a","prompt":"输入密码","height":40,"fontSize":24,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.login.LoginUI.uiView);

        }

    }
}

module ui.login {
    export class LoginSceneUI extends View {
		public mainView:View;
		public bg:Laya.Image;
		public probox:Laya.Box;
		public progressBar:Laya.Image;
		public imgBar:Laya.Image;
		public lblLoadingDesc:Laya.Label;
		public lblProgress:Laya.Label;
		public btn_enter:Laya.Label;
		public imgStart:Laya.Image;
		public btnRefresh:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":750,"height":1334},"child":[{"type":"View","props":{"y":0,"x":0,"width":750,"var":"mainView","name":"mainView","height":1334},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"loading/loading_bg.jpg"}},{"type":"Label","props":{"y":1197,"x":309,"text":"健康游戏公告","strokeColor":"#000000","stroke":2,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":1237,"x":43,"text":"抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。","strokeColor":"#000000","stroke":2,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":1272,"x":43,"text":"适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。","strokeColor":"#000000","stroke":2,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff","align":"center"}},{"type":"Box","props":{"y":996,"x":233,"visible":false,"var":"probox"},"child":[{"type":"Image","props":{"var":"progressBar","skin":"loading/bar_bg.png"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":0,"var":"imgBar","skin":"loading/bar.png","sizeGrid":"0,16,0,15"}}]},{"type":"Label","props":{"y":33,"x":42,"width":199,"var":"lblLoadingDesc","text":"英雄准备中...","strokeColor":"#000000","stroke":2,"height":28,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":1,"width":280,"visible":false,"var":"lblProgress","strokeColor":"#000000","stroke":3,"height":28,"fontSize":20,"color":"#ffffff","align":"center"}}]},{"type":"Label","props":{"y":1010,"x":375,"visible":false,"var":"btn_enter","text":"点击任意位置进入游戏","strokeColor":"#000000","stroke":2,"fontSize":28,"color":"#ffffff","anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"visible":false,"var":"imgStart","top":0,"skin":"loading/start_bg.jpg","right":0,"name":"imgStart","left":0,"bottom":0}},{"type":"View","props":{"y":1053,"x":507,"width":140,"height":53},"child":[{"type":"Button","props":{"y":4,"x":20,"width":99,"visible":false,"var":"btnRefresh","labelStrokeColor":"#000000","labelStroke":2,"labelSize":22,"labelColors":"#FFFFFF","labelBold":true,"label":"立即刷新","height":36}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.login.LoginSceneUI.uiView);

        }

    }
}

module ui.luckPrize {
    export class LuckPrizeBoxViewUI extends View {
		public imgTitle:Laya.Image;
		public btn_get:Laya.Button;
		public txt_des:Laya.Label;
		public btnExit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":608,"height":721},"child":[{"type":"Box","props":{"y":0,"x":0,"width":630,"height":721},"child":[{"type":"SkeletonPlayer","props":{"y":342,"x":302,"url":"images/effect/bone/bglight.sk"}},{"type":"Image","props":{"var":"imgTitle","skin":"images/luckLottery/luck_item_title_2.png"}},{"type":"Image","props":{"y":263,"x":225,"skin":"images/component/frame_9calce_03.png","scaleY":1.2,"scaleX":1.2,"sizeGrid":"26,31,23,28"}},{"type":"Button","props":{"y":597,"x":140,"var":"btn_get","stateNum":1,"skin":"images/component/yellow_btn.png","labelStrokeColor":"#946430","labelStroke":2,"labelSize":35,"labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":true,"label":"看视频免费抽1次"}},{"type":"Image","props":{"y":295,"x":252,"skin":"images/luckLottery/luck_item_box.png"}},{"type":"Label","props":{"y":483,"x":219,"text":"中大奖啦","strokeColor":"#946430","stroke":2,"fontSize":45,"color":"#ffebbc","bold":true,"align":"center"}},{"type":"Label","props":{"y":533,"x":131,"var":"txt_des","text":"下次转盘2倍奖励","strokeColor":"#946430","stroke":2,"fontSize":45,"color":"#ffebbc","bold":true,"align":"center"}},{"type":"Button","props":{"y":0,"x":536,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);
			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.luckPrize.LuckPrizeBoxViewUI.uiView);

        }

    }
}

module ui.luckPrize {
    export class LuckPrizeItemViewUI extends View {
		public btnExit:Laya.Button;
		public imgItem:Laya.Image;
		public txtItemName:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":600,"height":400},"child":[{"type":"View","props":{"width":748,"name":"bgView","height":519,"centerX":0},"child":[{"type":"SkeletonPlayer","props":{"y":207,"x":374,"url":"images/effect/bone/bglight.sk"}},{"type":"Button","props":{"y":-171,"x":596,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Image","props":{"y":-147,"x":84,"skin":"images/luckLottery/luck_item_title.png"}},{"type":"Image","props":{"y":209,"x":374,"skin":"images/component/frame_9calce_03.png","anchorY":0.5,"anchorX":0.5,"sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":210,"x":374,"var":"imgItem","skin":"images/luckLottery/luck_prize_3.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":445,"x":89,"width":578,"var":"txtItemName","text":"先知球x1","strokeColor":"#946430","stroke":2,"overflow":"visible","height":50,"fontSize":40,"color":"#ffebbc","bold":true,"align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);
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
		public btnExit:Laya.Button;
		public btnStart:Laya.Button;
		public imgIcon:Laya.Image;
		public txtDiamond:Laya.Label;
		public txt_diamond:Laya.Label;
		public imgLabel:Laya.Image;
		public maskImg:Laya.Image;
		public rollBg:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":750,"name":"rolledTIme","height":1011},"child":[{"type":"View","props":{"y":0,"x":0,"width":750,"var":"mainView","name":"mainView","height":1011},"child":[{"type":"Image","props":{"y":498,"x":371,"var":"imgBg","skin":"images/luckLottery/luck_huanpan.png","rotation":0,"name":"imgBg","anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/luckLottery/luck_huanpan_light.png","name":"imgEffect1"},"compId":68}]},{"type":"Image","props":{"y":-105,"x":37,"skin":"images/luckLottery/luck_title.png"}},{"type":"Button","props":{"y":6,"x":634,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":360,"x":263,"var":"btnStart","stateNum":1,"skin":"images/luckLottery/luck_go.png","name":"btnStart"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":161,"x":83,"var":"imgIcon","skin":"images/core/diamond.png","anchorY":0.5,"anchorX":0.5}},{"type":"Label","props":{"y":147,"x":102,"var":"txtDiamond","text":"120","strokeColor":"#000000","stroke":2,"name":"txtDiamond","fontSize":28,"color":"#f4d80d","bold":true,"align":"left"}}]},{"type":"Box","props":{"y":96,"x":267},"child":[{"type":"Image","props":{"skin":"images/luckLottery/luck_price_bg.png"}},{"type":"Image","props":{"y":15,"x":21,"skin":"images/core/diamond.png"}},{"type":"Label","props":{"y":19,"x":70,"var":"txt_diamond","text":"0","fontSize":30,"color":"#ffffff","bold":true}}]},{"type":"Image","props":{"y":808,"x":215,"skin":"images/luckLottery/luck_label_bg.png"}},{"type":"Image","props":{"y":821,"x":250,"var":"imgLabel","skin":"images/luckLottery/luck_1.png"}},{"type":"Image","props":{"y":897,"x":118,"width":514,"var":"maskImg","skin":"images/core/blank.png","height":107}},{"type":"Image","props":{"y":896,"x":118,"width":514,"var":"rollBg","skin":"images/luckLottery/luck_lottery_bg.png","sizeGrid":"38,61,44,94","height":107}}]}],"animations":[{"nodes":[{"target":68,"keyframes":{"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":68,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":68,"key":"alpha","index":10},{"value":1,"tweenMethod":"linearNone","tween":true,"target":68,"key":"alpha","index":20}]}}],"name":"ani1","id":1,"frameRate":24,"action":2}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.luckPrize.LuckPrizeViewUI.uiView);

        }

    }
}

module ui.luckPrize {
    export class RollNameItemUI extends View {
		public hbox:Laya.HBox;
		public txt_name:Laya.Label;
		public txt_reward:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"HBox","props":{"y":0,"x":0,"var":"hbox","space":5,"mouseThrough":false,"mouseEnabled":false,"align":"middle"},"child":[{"type":"Label","props":{"y":0,"x":0,"text":"恭喜玩家","strokeColor":"#946430","stroke":2,"fontSize":22,"color":"#fefefe"}},{"type":"Label","props":{"y":0,"x":92,"var":"txt_name","text":"\"虚拟代位\"","strokeColor":"#946430","stroke":2,"fontSize":22,"color":"#fff272"}},{"type":"Label","props":{"y":0,"x":197,"text":"抽中","strokeColor":"#946430","stroke":2,"fontSize":22,"color":"#fefefe"}},{"type":"Label","props":{"y":0,"x":243,"var":"txt_reward","text":"大量钻石x888","strokeColor":"#946430","stroke":2,"fontSize":22,"color":"#fff272"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.luckPrize.RollNameItemUI.uiView);

        }

    }
}

module ui.more {
    export class MoreItemUI extends View {
		public imgAppIcon:Laya.Image;
		public lblNickname:Laya.Label;
		public boxAwardItem_1:Laya.Box;
		public boxAwardItem_2:Laya.Box;
		public btnObtain:Laya.Button;
		public btnTry:Laya.Button;
		public btnStartGame:Laya.Button;
		public imgObtained:Laya.Image;
		public hboxQuestDesc_1:Laya.HBox;
		public hboxQuestDesc_2:Laya.HBox;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/more/item_bg.png"}},{"type":"Image","props":{"y":13,"x":16,"width":111,"skin":"images/component/frame_9scale_09.png","height":111,"sizeGrid":"22,18,20,20"},"child":[{"type":"Image","props":{"y":12,"x":12,"width":88,"var":"imgAppIcon","height":88}}]},{"type":"Label","props":{"y":21,"x":130,"var":"lblNickname","text":"暴打犬夜叉","fontSize":24,"color":"#a17338","bold":true,"align":"left"}},{"type":"Box","props":{"y":19,"x":341,"var":"boxAwardItem_1"},"child":[{"type":"Image","props":{"skin":"images/core/coin_40x40.png","scaleY":0.7,"scaleX":0.7,"name":"imgAwardIcon"}},{"type":"Label","props":{"y":2,"x":30,"text":"999","strokeColor":"#a17338","stroke":3,"name":"lblAwardNum","fontSize":22,"color":"#ffffff"}}]},{"type":"Box","props":{"y":19,"x":272,"var":"boxAwardItem_2"},"child":[{"type":"Image","props":{"skin":"images/core/coin_40x40.png","scaleY":0.7,"scaleX":0.7,"name":"imgAwardIcon"}},{"type":"Label","props":{"y":2,"x":30,"text":"999","strokeColor":"#a17338","stroke":3,"name":"lblAwardNum","fontSize":22,"color":"#ffffff"}}]},{"type":"Button","props":{"y":35,"x":419,"var":"btnObtain","stateNum":1,"skin":"images/component/frame_btn_small_yellow.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Label","props":{"y":14,"x":49,"width":85,"text":"领取","strokeColor":"#825321","stroke":3,"height":33,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":35,"x":420,"width":180,"var":"btnTry","stateNum":1,"skin":"images/component/frame_btn_small_blue.png","height":60,"sizeGrid":"0,32,0,34"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Label","props":{"y":13,"x":19,"width":144,"text":"立即试玩","strokeColor":"#306294","stroke":3,"height":33,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":41,"x":426,"var":"btnStartGame","stateNum":1,"skin":"images/component/frame_9scale_10.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Label","props":{"y":9,"x":15,"width":137,"text":"开始游戏","strokeColor":"#8d5d2e","stroke":3,"height":30,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":41,"x":425,"var":"imgObtained","skin":"images/component/frame_9scale_11.png"},"child":[{"type":"Label","props":{"y":9,"x":22,"width":120,"text":"已领取","fontSize":30,"color":"#fff4e1","bold":true,"align":"center"}}]},{"type":"HBox","props":{"y":59,"x":131,"var":"hboxQuestDesc_1"},"child":[{"type":"Label","props":{"text":"任务描述一共十一个字啦","name":"lblDesc","fontSize":22,"color":"#a17338","align":"left"}},{"type":"Label","props":{"visible":false,"text":"(0/1)","name":"lblProgress","fontSize":22,"color":"#FF6800","align":"left"}}]},{"type":"HBox","props":{"y":93,"x":131,"var":"hboxQuestDesc_2"},"child":[{"type":"Label","props":{"text":"任务描述一共十一个字啦","name":"lblDesc","fontSize":22,"color":"#a17338","align":"left"}},{"type":"Label","props":{"visible":false,"text":"(0/1)","name":"lblProgress","fontSize":22,"color":"#FF6800","align":"left"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

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
		public listMoreItem:Laya.List;
		public lblNoneGameTips:Laya.Label;
		public txt_uid:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":4,"x":0,"width":715,"skin":"images/component/frame_9calce_01.png","height":1015,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":32,"x":252,"skin":"images/more/title.png"}},{"type":"Image","props":{"y":0,"x":631,"var":"imgClose","skin":"images/component/frame_close_btn.png"}},{"type":"Image","props":{"y":234,"x":33,"width":649,"skin":"images/component/frame_9calce_02.png","height":693,"sizeGrid":"25,32,32,36"}},{"type":"Label","props":{"y":930,"x":215,"text":"欢迎您体验更多好玩的游戏","fontSize":26,"color":"#845013","bold":true,"align":"center"}},{"type":"Button","props":{"y":138,"x":186,"var":"btnCustomService","stateNum":1,"skin":"images/more/custom_service.png","scaleY":0.8,"scaleX":0.8},"child":[{"type":"Label","props":{"y":81,"x":15,"text":"客服","strokeColor":"#8d5d2e","stroke":3,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":138,"x":466,"var":"btnSoundClosed","stateNum":1,"skin":"images/more/sound_closed.png","scaleY":0.8,"scaleX":0.8},"child":[{"type":"Label","props":{"y":79,"x":17,"text":"声音","strokeColor":"#8d5d2e","stroke":3,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":136,"x":465,"var":"btnSoundOpend","stateNum":1,"skin":"images/more/sound_opened.png","scaleY":0.8,"scaleX":0.8},"child":[{"type":"Label","props":{"y":80,"x":18,"text":"声音","strokeColor":"#8d5d2e","stroke":3,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"List","props":{"y":251,"x":49,"width":619,"var":"listMoreItem","spaceY":15,"repeatX":1,"height":656}},{"type":"Label","props":{"y":648,"x":136,"width":418,"var":"lblNoneGameTips","text":"暂时没有游戏体验哦","strokeColor":"#845013","stroke":3,"height":37,"fontSize":36,"color":"#e2e2e2","bold":true,"align":"center"}},{"type":"Label","props":{"y":962,"x":72,"width":585,"var":"txt_uid","text":"UID：0","height":30,"fontSize":26,"color":"#FF6800","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.more.MoreViewUI.uiView);

        }

    }
}

module ui.playCourtesy {
    export class ExtensionItemUI extends View {
		public imgItemIcon:Laya.Image;
		public txt_title:Laya.Label;
		public txt_des:Laya.Label;
		public imgIcon0:Laya.Image;
		public txt_num0:Laya.Label;
		public imgIcon1:Laya.Image;
		public txt_num1:Laya.Label;
		public btn_click:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":200,"height":360},"child":[{"type":"Box","props":{"y":0,"x":0,"width":200,"height":360},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/playCourtesy/playCourtesy_bg.png"}},{"type":"Image","props":{"y":109,"x":40,"skin":"images/playCourtesy/playCourtesy_icon_bg1.png"}},{"type":"Image","props":{"y":114,"x":46,"width":108,"var":"imgItemIcon","height":108}},{"type":"Label","props":{"y":30,"x":15,"width":170,"var":"txt_title","text":"暴打犬夜叉","height":24,"fontSize":24,"font":"SimHei","color":"#845013","bold":true,"align":"center"}},{"type":"Label","props":{"y":58,"x":15,"wordWrap":true,"width":170,"var":"txt_des","text":"暴打犬夜叉暴打犬夜叉","fontSize":20,"font":"SimHei","color":"#946414","bold":true,"align":"center"}},{"type":"HBox","props":{"y":252,"x":100,"space":5,"anchorY":0.5,"anchorX":0.5,"align":"middle"},"child":[{"type":"Box","props":{},"child":[{"type":"Image","props":{"var":"imgIcon0","skin":"images/core/coin_40x40.png","scaleY":0.7,"scaleX":0.7}},{"type":"Label","props":{"y":2,"x":30,"var":"txt_num0","text":"999","strokeColor":"#a17338","stroke":3,"fontSize":22,"color":"#ffffff"}}]},{"type":"Box","props":{"x":69},"child":[{"type":"Image","props":{"var":"imgIcon1","skin":"images/core/coin_40x40.png","scaleY":0.7,"scaleX":0.7}},{"type":"Label","props":{"y":2,"x":30,"var":"txt_num1","text":"999","strokeColor":"#a17338","stroke":3,"fontSize":22,"color":"#ffffff"}}]}]},{"type":"Button","props":{"y":262,"x":21,"var":"btn_click","stateNum":1,"skin":"images/playCourtesy/playCourtesy_btn_3.png","labelStrokeColor":"#306294","labelStroke":2,"labelSize":24,"labelFont":"SimHei","labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","label":"立刻试玩"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.playCourtesy.ExtensionItemUI.uiView);

        }

    }
}

module ui.playCourtesy {
    export class PlayCourtesyViewUI extends View {
		public btnExit:Laya.Button;
		public btnCustomService:Laya.Button;
		public btnSoundClosed:Laya.Button;
		public btnSoundOpend:Laya.Button;
		public txt_uid:Laya.Label;
		public btn_change:Laya.Button;
		public list:Laya.List;
		public list_extension:Laya.List;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":89,"x":19,"width":715,"skin":"images/component/frame_9calce_01.png","height":1167,"sizeGrid":"168,65,62,82"}},{"type":"Button","props":{"y":85,"x":649,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":220,"x":220,"var":"btnCustomService","stateNum":1,"skin":"images/playCourtesy/custom_service.png","scaleY":0.8,"scaleX":0.8},"child":[{"type":"Label","props":{"y":81,"x":15,"text":"客服","strokeColor":"#8d5d2e","stroke":3,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":224,"x":462,"var":"btnSoundClosed","stateNum":1,"skin":"images/playCourtesy/sound_closed.png","scaleY":0.8,"scaleX":0.8},"child":[{"type":"Label","props":{"y":79,"x":17,"text":"声音","strokeColor":"#8d5d2e","stroke":3,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":222,"x":461,"var":"btnSoundOpend","stateNum":1,"skin":"images/playCourtesy/sound_opened.png","scaleY":0.8,"scaleX":0.8},"child":[{"type":"Label","props":{"y":80,"x":18,"text":"声音","strokeColor":"#8d5d2e","stroke":3,"fontSize":30,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":315,"x":51,"width":649,"skin":"images/component/frame_9calce_02.png","height":847,"sizeGrid":"25,32,32,36"}},{"type":"Image","props":{"y":111,"x":211,"skin":"images/playCourtesy/playCourtesy_title.png"}},{"type":"Image","props":{"y":700,"x":191,"skin":"images/playCourtesy/playCourtesy_title_bg.png"}},{"type":"Label","props":{"y":1164,"x":169,"text":"体验游戏15秒以上，可获得奖励噢~","fontSize":26,"color":"#845013","bold":true,"align":"center"}},{"type":"Label","props":{"y":1195,"x":90,"width":585,"var":"txt_uid","text":"UID：0","fontSize":26,"color":"#FF6800","bold":true,"align":"center"}},{"type":"Label","props":{"y":706,"x":322,"text":"猜你喜欢","strokeColor":"#845013","stroke":2,"fontSize":26,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Button","props":{"y":1071,"x":286,"var":"btn_change","stateNum":1,"skin":"images/component/frame_btn_small_yellow.png","labelStrokeColor":"#946430","labelStroke":3,"labelSize":30,"labelFont":"SimHei","labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","label":"换一换"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"List","props":{"y":755,"x":74,"width":611,"var":"list","spaceY":23,"spaceX":14,"height":295}},{"type":"List","props":{"y":334,"x":77,"width":599,"var":"list_extension","height":360}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.playCourtesy.PlayCourtesyViewUI.uiView);

        }

    }
}

module ui.playCourtesy {
    export class SmallItemUI extends View {
		public txt_title:Laya.Label;
		public imgIcon:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":110,"height":132},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/playCourtesy/playCourtesy_icon_bg.png"}},{"type":"Label","props":{"y":112,"x":0,"width":110,"var":"txt_title","text":"英雄挺住","height":20,"fontSize":20,"font":"SimHei","color":"#946430","bold":true,"align":"center"}},{"type":"Image","props":{"y":5,"x":5,"width":100,"var":"imgIcon","height":100}},{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.playCourtesy.SmallItemUI.uiView);

        }

    }
}

module ui.randomReward {
    export class AdditionalRewardViewUI extends View {
		public txt_close:Laya.Label;
		public txt_count:Laya.Label;
		public btn_get:Laya.Button;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Box","props":{"y":0,"x":0,"width":587,"height":614},"child":[{"type":"SkeletonPlayer","props":{"y":327,"x":295,"url":"images/effect/bone/bglight.sk"}},{"type":"Image","props":{"skin":"images/randomReward/randomReward_title_02.png"}},{"type":"Image","props":{"y":267,"x":232,"skin":"images/component/frame_9calce_03.png","sizeGrid":"26,31,23,28"}},{"type":"Image","props":{"y":287,"x":252,"skin":"images/core/diamond_icon.png","scaleY":1.5,"scaleX":1.5}},{"type":"Label","props":{"y":621,"x":188,"visible":false,"var":"txt_close","text":"点击空白处关闭","fontSize":30,"color":"#ffffff"}},{"type":"Label","props":{"y":361,"x":253,"width":98,"var":"txt_count","text":"x100","strokeColor":"#946430","stroke":2,"height":24,"fontSize":24,"color":"#ffffff","align":"right"}},{"type":"Button","props":{"y":492,"x":129,"var":"btn_get","stateNum":1,"skin":"images/component/yellow_btn.png","labelStrokeColor":"#946430","labelStroke":2,"labelSize":40,"labelPadding":"0,0,0,-30","labelColors":"#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"领取"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":33,"x":186,"skin":"images/randomReward/randomReward_share.png"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);
			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.randomReward.AdditionalRewardViewUI.uiView);

        }

    }
}

module ui.randomReward {
    export class HeroLevelViewUI extends View {
		public oldHero:Laya.Image;
		public newHero:Laya.Image;
		public btn_exit:Laya.Button;
		public txt_oldLevel:Laya.Label;
		public btn_level:Laya.Button;
		public txt_newLevel:Laya.Label;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Box","props":{"y":0,"x":0,"width":638,"height":758},"child":[{"type":"SkeletonPlayer","props":{"y":390,"x":466,"url":"images/effect/bone/bglight.sk","scaleY":0.8,"scaleX":0.8}},{"type":"Image","props":{"x":25,"skin":"images/randomReward/randomReward_title_01.png"}},{"type":"Image","props":{"y":374,"x":61,"skin":"images/core/hero_bg.png"}},{"type":"Image","props":{"y":374,"x":346,"skin":"images/core/hero_bg.png"}},{"type":"Image","props":{"y":337,"x":361,"skin":"images/randomReward/randomReward_arrow.png","rotation":90}},{"type":"Image","props":{"y":454,"x":177,"var":"oldHero","skin":"images/carImg/hero_d1_18.png","scaleY":1.5,"scaleX":1.5,"anchorY":1,"anchorX":0.5}},{"type":"Image","props":{"y":454,"x":463,"var":"newHero","skin":"images/carImg/hero_d1_18.png","scaleY":1.5,"scaleX":1.5,"anchorY":1,"anchorX":0.5}},{"type":"Button","props":{"y":55,"x":558,"visible":false,"var":"btn_exit","stateNum":1,"skin":"images/component/frame_close_btn.png","labelStrokeColor":"#946430","labelStroke":2,"labelSize":30,"labelColors":"#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Label","props":{"y":258,"x":50,"width":251,"var":"txt_oldLevel","text":"名字 Lv0","strokeColor":"#946430","stroke":2,"height":30,"fontSize":30,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":635,"x":156,"var":"btn_level","stateNum":1,"skin":"images/component/yellow_btn.png","labelStrokeColor":"#946430","labelStroke":2,"labelSize":50,"labelColors":"#FFFFFF,#FFFFFF,#FFFFFF,#FFFFFF","labelBold":true,"label":"升级"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Label","props":{"y":258,"x":332,"width":251,"var":"txt_newLevel","text":"名字 Lv0","strokeColor":"#946430","stroke":2,"height":30,"fontSize":30,"color":"#ffffff","align":"center"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);
			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.randomReward.HeroLevelViewUI.uiView);

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
		public btnExit:Laya.Button;
		public txtDes:Laya.Label;
		public txtStage:Laya.Label;
		public hbox:Laya.HBox;

        public static  uiView:any ={"type":"View","props":{"width":680,"height":546},"child":[{"type":"Image","props":{"y":0,"x":0,"width":680,"var":"imgPrizeBg","name":"imgPrizeBg","height":546},"child":[{"type":"SkeletonPlayer","props":{"y":273,"x":339,"url":"images/effect/bone/bglight.sk"}},{"type":"Image","props":{"y":-111,"x":45,"skin":"images/ClearanceReward/result_win_title.png"}},{"type":"Button","props":{"y":-51,"x":585,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Label","props":{"y":450,"x":90,"width":500,"var":"txtDes","text":"恭喜获得第       关奖励","strokeColor":"#ab9004","stroke":2,"name":"txtDes","fontSize":40,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":445,"x":229,"width":300,"var":"txtStage","text":"1","strokeColor":"#ab9004","stroke":2,"name":"txtStage","fontSize":50,"color":"#f9e603","bold":true,"align":"center"}}]},{"type":"HBox","props":{"y":195,"x":145,"width":0,"var":"hbox","height":0,"align":"middle"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("SkeletonPlayer",laya.ani.bone.Skeleton);
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
		public btnExit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"mouseThrough":true,"mouseEnabled":true},"child":[{"type":"View","props":{"y":244,"width":750,"var":"mainView","name":"mainView","mouseThrough":true,"mouseEnabled":true,"height":712},"child":[{"type":"Image","props":{"y":128,"x":17,"width":717,"visible":false,"name":"imgBg","mouseThrough":true,"mouseEnabled":true,"height":565},"child":[{"type":"Image","props":{"y":-25,"x":1,"width":716,"skin":"images/component/frame_9calce_01.png","mouseEnabled":true,"height":611,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":-229,"x":28,"skin":"images/stageSummary/success_title.png","mouseEnabled":true}},{"type":"Image","props":{"y":201,"x":34,"width":645,"skin":"images/component/frame_9calce_02.png","height":170,"sizeGrid":"25,32,32,36"}},{"type":"Image","props":{"y":232,"x":355,"name":"imgItemBg"}},{"type":"HBox","props":{"y":220,"x":113,"var":"hbox","space":50,"name":"hbox","align":"middle"}},{"type":"Label","props":{"y":382,"x":133,"visible":false,"text":"分享到群，点击分享链接即可领取","fontSize":30,"color":"#ff0400"}},{"type":"Button","props":{"y":-24,"x":631,"visible":false,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":433,"x":412,"strokeColors":"#946430","stateNum":1,"skin":"images/component/btn_yellow_yuan.png","name":"btnShare","labelStroke":2,"labelSize":30,"labelPadding":"-10,0,0,0","labelColors":"#fff4e1","labelBold":true,"label":"多领一点"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":58,"x":186,"skin":"images/core/video_icon.png"}},{"type":"Label","props":{"y":59,"x":77,"text":"(金币x2)","strokeColor":"#946430","stroke":2,"fontSize":22,"color":"#ffffff"}}]},{"type":"Button","props":{"y":433,"x":84,"stateNum":1,"skin":"images/component/btn_blue_yuan.png","name":"btn_get","labelStrokeColor":"#306294","labelStroke":2,"labelSize":30,"labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","labelBold":true,"label":"领取"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Image","props":{"y":-215,"x":70,"visible":false,"skin":"images/stageSummary/failure_title.png","name":"imgFailed","mouseThrough":true,"mouseEnabled":true},"child":[{"type":"Label","props":{"y":293,"x":36,"width":500,"text":"3","name":"txtTime","fontSize":190,"color":"#f1774e","align":"center"}},{"type":"Label","props":{"y":506,"x":38,"width":500,"text":"秒后重新开始","fontSize":54,"color":"#e5d6bc","bold":true,"align":"center"}},{"type":"Label","props":{"y":595,"x":202,"text":"点击空白处关闭","fontSize":25,"color":"#ffffff","bold":true,"align":"center"}}]}]}]}]};
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

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":726,"height":1030},"child":[{"type":"View","props":{"y":-2,"x":-1,"width":726,"var":"mainView","height":1017},"child":[{"type":"Image","props":{"width":713,"skin":"images/component/frame_9calce_01.png","sizeGrid":"158,62,69,62","name":"imgBg","height":1017},"child":[{"type":"Image","props":{"y":26,"x":301,"skin":"images/shop/shop_title_icon.png"},"child":[{"type":"Label","props":{"y":12,"x":-134,"width":600,"visible":false,"valign":"middle","text":"排行榜","strokeColor":"#5e2818","stroke":2,"name":"txtTitle","height":60,"fontSize":40,"color":"#fff4c0","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":172,"x":34,"width":644,"skin":"images/component/frame_9calce_02.png","sizeGrid":"59,56,54,51","height":778}},{"type":"Image","props":{"y":184,"x":41,"skin":"images/shop/shop_bg_01.png"}},{"type":"Image","props":{"y":85,"x":-15,"skin":"images/shop/shop_bg_04.png"}},{"type":"Image","props":{"y":199,"x":81,"skin":"images/shop/shop_bg_02.png","height":40},"child":[{"type":"Image","props":{"y":-10,"x":-14,"skin":"images/core/coin_big.png","name":"imgMoney"},"child":[{"type":"Label","props":{"y":13,"x":60,"var":"txtMoney","text":"0","strokeColor":"#946430","stroke":4,"name":"txtMoney","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}}]}]},{"type":"Image","props":{"y":198,"x":267,"skin":"images/shop/shop_bg_03.png"},"child":[{"type":"Image","props":{"y":-9,"x":-22,"skin":"images/core/diamond_icon.png","name":"imgDiamond"},"child":[{"type":"Label","props":{"y":12,"x":60,"var":"txtDiamond","text":"0","strokeColor":"#946430","stroke":4,"name":"txtDiamond","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}}]}]},{"type":"List","props":{"y":260,"x":46,"width":620,"var":"heroList","spaceY":15,"spaceX":0,"repeatY":1,"repeatX":1,"name":"heroList","height":659},"child":[{"type":"Box","props":{"width":620,"renderType":"render","height":150},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/shop/shop_item_bg.png"}},{"type":"Image","props":{"y":128,"x":90,"name":"imgModel","anchorY":1,"anchorX":0.5}},{"type":"Image","props":{"y":62,"x":499,"name":"imgPet","disabled":true,"anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":57,"x":167,"skin":"images/shop/shop_bg_03.png","name":"imgAtk"},"child":[{"type":"Label","props":{"y":6,"x":13,"text":"攻击:","strokeColor":"#946430","stroke":2,"fontSize":24,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":7,"x":71,"text":"0","strokeColor":"#946430","stroke":2,"name":"txtAtk","fontSize":24,"color":"#ffffff","bold":true}}]},{"type":"Image","props":{"y":98,"x":167,"skin":"images/shop/shop_bg_03.png","name":"imgSpeed"},"child":[{"type":"Label","props":{"y":6,"x":13,"text":"攻速:","strokeColor":"#946430","stroke":2,"fontSize":24,"color":"#ffffff","bold":true}},{"type":"Label","props":{"y":7,"x":71,"text":"0","strokeColor":"#946430","stroke":2,"name":"txtSpeed","fontSize":24,"color":"#ffffff","bold":true}}]},{"type":"Label","props":{"y":17,"x":176,"text":"大黄蜂","name":"txtName","fontSize":30,"color":"#d28a00","bold":true}},{"type":"Label","props":{"y":15,"x":9,"width":30,"text":"0","name":"txtLevel","fontSize":20,"color":"#ffffff","align":"center"}},{"type":"Button","props":{"y":43,"x":422,"stateNum":1,"skin":"images/component/frame_btn_small_yellow.png","name":"btnBuy","labelSize":30},"child":[{"type":"Image","props":{"y":11,"x":19,"skin":"images/core/coin_40x40.png","name":"imgPrice"},"child":[{"type":"Label","props":{"y":5,"x":42,"text":"1000","strokeColor":"#946430","stroke":4,"name":"txtPrice","fontSize":30,"color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":73,"x":422,"visible":false,"stateNum":1,"skin":"images/shop/shop_btn_03.png","name":"btnBuyLock","labelSize":30},"child":[{"type":"Label","props":{"y":-40,"x":63,"width":50,"text":"0","strokeColor":"#946430","stroke":4,"name":"txtUnlockLevel","fontSize":30,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Label","props":{"y":13,"x":37,"text":"待解锁","strokeColor":"#946430","stroke":4,"fontSize":35,"color":"#ffffff","bold":true}},{"type":"Script","props":{"y":-63,"x":-412,"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":26,"x":332,"visible":false,"stateNum":1,"skin":"images/core/shop_free_video.png","name":"btnSharePrize","labelSize":30},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":0,"x":55,"skin":"images/core/red_dot_hint.png","name":"imgRedPoint"}}]},{"type":"Button","props":{"y":26,"x":335,"visible":false,"stateNum":1,"skin":"images/shop/shop_diamond_buy.png","name":"btnDiamondBuy","labelSize":30},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]},{"type":"Label","props":{"y":1016,"x":251,"text":"点击空白处关闭","name":"txtExit","fontSize":30,"color":"#ffffff"}},{"type":"Button","props":{"y":192,"x":505,"var":"btn_skillExplain","stateNum":1,"skin":"images/shop/shop_skill_btn.png"}},{"type":"Button","props":{"y":-13,"x":633,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]}]};
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

        public static  uiView:any ={"type":"View","props":{"width":714,"height":1018},"child":[{"type":"View","props":{"var":"mainView","name":"mainView"},"child":[{"type":"Image","props":{"width":714,"skin":"images/component/frame_9calce_01.png","sizeGrid":"158,62,69,62","name":"imgBg","height":1018},"child":[{"type":"Image","props":{"y":205,"x":34,"width":645,"skin":"images/component/frame_9calce_02.png","sizeGrid":"32,27,32,29","height":744}},{"type":"Image","props":{"y":32,"x":259,"skin":"images/strengthen/strengthen_title.png"}},{"type":"Image","props":{"y":154,"x":81,"skin":"images/strengthen/strengthen_frame_bar.png","sizeGrid":"15,34,20,37","name":"imgEssence"}},{"type":"Image","props":{"y":151,"x":67,"skin":"images/strengthen/strengthen_item_shitou.png","name":"imgIcon"}},{"type":"Label","props":{"y":955,"x":216,"text":"技能强化只增加触发几率","name":"txtHint","fontSize":25,"color":"#d20000","bold":true,"align":"center"}},{"type":"Label","props":{"y":156,"x":115,"var":"txtEssence","text":"0","strokeColor":"#946430","stroke":4,"name":"txtEssence","fontSize":26,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Label","props":{"y":1011,"x":267,"text":"点击空白处关闭","fontSize":25,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Box","props":{"y":226,"x":73,"name":"boxItem1"},"child":[{"type":"Image","props":{"skin":"images/strengthen/strengthen_item_bg.png","name":"imgItemBg"}},{"type":"Image","props":{"y":57,"x":71,"skin":"images/strengthen/strengthen_item3.png","scaleY":0.85,"scaleX":0.85,"name":"imgItem"}},{"type":"Label","props":{"y":11,"x":46,"text":"金币加成","strokeColor":"#9b5000","stroke":2,"name":"txtDes","fontSize":28,"color":"#ffffff","bold":true,"align":"right"}},{"type":"Button","props":{"y":281,"x":39,"stateNum":1,"skin":"images/component/frame_btn_small_yellow.png","name":"btnStrengthen","labelStrokeColor":"#e5ad1e","labelStroke":2,"labelSize":30,"labelColors":"#ffffff","labelBold":true},"child":[{"type":"Label","props":{"y":16,"x":22,"text":"强化","strokeColor":"#946430","stroke":2,"name":"txtBtn","fontSize":28,"color":"#f0f7f7","bold":true,"align":"left"}},{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":16,"x":83,"skin":"images/strengthen/strengthen_item_shitou.png","scaleY":0.7,"scaleX":0.7,"name":"imgIcon"}},{"type":"Label","props":{"y":16,"x":115,"text":"0","strokeColor":"#946430","stroke":4,"name":"txtEssence","fontSize":26,"color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":12,"x":166,"text":"Lv0","name":"txtLevel","fontSize":28,"color":"#a0880e","bold":true}},{"type":"Label","props":{"y":193,"x":38,"text":"击杀怪物后金币收益","fontSize":21,"color":"#a43601","bold":true,"align":"right"}},{"type":"HBox","props":{"y":229,"x":134,"space":5,"name":"hbox","anchorY":0.5,"anchorX":0.5,"align":"middle"},"child":[{"type":"Label","props":{"y":1,"x":86,"text":"6%","name":"txtAdd","fontSize":21,"color":"#af9801","bold":true,"align":"right"}},{"type":"Label","props":{"text":"提升","fontSize":21,"color":"#a43601","bold":true,"align":"right"}}]}]},{"type":"Box","props":{"y":224,"x":383,"width":271,"name":"boxItem2","height":346},"child":[{"type":"Image","props":{"skin":"images/strengthen/strengthen_item_bg.png","name":"imgItemBg"}},{"type":"Image","props":{"y":56,"x":71,"skin":"images/core/skill_01.png","scaleY":0.85,"scaleX":0.85,"name":"imgItem"}},{"type":"Label","props":{"y":11,"x":46,"text":"雷神之怒","strokeColor":"#9b5000","stroke":2,"name":"txtDes","fontSize":28,"color":"#ffffff","bold":true,"align":"right"}},{"type":"Button","props":{"y":284,"x":39,"stateNum":1,"skin":"images/component/frame_btn_small_yellow.png","name":"btnStrengthen","labelStrokeColor":"#e5ad1e","labelStroke":2,"labelSize":30,"labelColors":"#ffffff","labelBold":true},"child":[{"type":"Label","props":{"y":16,"x":22,"text":"强化","strokeColor":"#946430","stroke":2,"name":"txtBtn","fontSize":30,"color":"#ffffff","align":"left"}},{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}},{"type":"Label","props":{"y":16,"x":119,"text":"0","strokeColor":"#946430","stroke":4,"name":"txtEssence","fontSize":26,"color":"#ffffff","bold":true,"align":"left"}},{"type":"Image","props":{"y":16,"x":87,"skin":"images/strengthen/strengthen_item_shitou.png","scaleY":0.7,"scaleX":0.7,"name":"imgIcon"}}]},{"type":"Label","props":{"y":12,"x":166,"text":"Lv0","name":"txtLevel","fontSize":28,"color":"#a0880e","bold":true}},{"type":"Label","props":{"y":219,"x":75,"text":"攻击2个怪物","fontSize":21,"color":"#a43601","bold":true,"align":"right"}},{"type":"HBox","props":{"y":203,"x":134,"space":5,"name":"hbox","anchorY":0.5,"anchorX":0.5,"align":"middle"},"child":[{"type":"Label","props":{"y":1,"x":86,"text":"6%","name":"txtAdd","fontSize":21,"color":"#af9801","bold":true,"align":"right"}},{"type":"Label","props":{"text":"攻击时有","fontSize":21,"color":"#a43601","bold":true,"align":"right"}},{"type":"Label","props":{"y":1,"x":112,"text":"几率同时","fontSize":21,"color":"#a43601","bold":true,"align":"right"}}]}]},{"type":"Box","props":{"y":587,"x":71,"width":271,"name":"boxItem3","height":343},"child":[{"type":"Image","props":{"skin":"images/strengthen/strengthen_item_bg.png","name":"imgItemBg"}},{"type":"Image","props":{"y":56,"x":71,"skin":"images/core/skill_02.png","scaleY":0.85,"scaleX":0.85,"name":"imgItem","centerX":-2}},{"type":"Label","props":{"y":11,"x":46,"text":"冰冻之触","strokeColor":"#9b5000","stroke":2,"name":"txtDes","fontSize":28,"color":"#ffffff","bold":true,"align":"right"}},{"type":"Button","props":{"y":281,"x":39,"stateNum":1,"skin":"images/component/frame_btn_small_yellow.png","name":"btnStrengthen","labelStrokeColor":"#e5ad1e","labelStroke":2,"labelSize":30,"labelColors":"#ffffff","labelBold":true},"child":[{"type":"Label","props":{"y":16,"x":22,"text":"强化","strokeColor":"#946430","stroke":2,"name":"txtBtn","fontSize":30,"color":"#f0f7f7","bold":true,"align":"left"}},{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":16,"x":86,"skin":"images/strengthen/strengthen_item_shitou.png","scaleY":0.7,"scaleX":0.7,"name":"imgIcon"}},{"type":"Label","props":{"y":16,"x":118,"text":"0","strokeColor":"#946430","stroke":4,"name":"txtEssence","fontSize":26,"color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":12,"x":166,"text":"Lv0","name":"txtLevel","fontSize":28,"color":"#a0880e","bold":true,"align":"right"}},{"type":"Label","props":{"y":219,"x":32,"text":"20%减速效果,持续5秒","fontSize":21,"color":"#a43601","bold":true}},{"type":"HBox","props":{"y":203,"x":135,"space":5,"name":"hbox","anchorY":0.5,"anchorX":0.5,"align":"middle"},"child":[{"type":"Label","props":{"y":1,"x":86,"text":"6%","name":"txtAdd","fontSize":21,"color":"#af9801","bold":true,"align":"right"}},{"type":"Label","props":{"text":"攻击时有","fontSize":21,"color":"#a43601","bold":true,"align":"right"}},{"type":"Label","props":{"y":1,"x":112,"text":"几率造成","fontSize":21,"color":"#a43601","bold":true,"align":"right"}}]}]},{"type":"Box","props":{"y":587,"x":384,"width":271,"name":"boxItem4","height":341},"child":[{"type":"Image","props":{"skin":"images/strengthen/strengthen_item_bg.png","name":"imgItemBg"}},{"type":"Image","props":{"y":56,"x":71,"skin":"images/core/skill_03.png","scaleY":0.85,"scaleX":0.85,"name":"imgItem","centerX":1}},{"type":"Label","props":{"y":12,"x":46,"text":"幽冥毒液","strokeColor":"#9b5000","stroke":2,"name":"txtDes","fontSize":28,"color":"#ffffff","bold":true}},{"type":"Button","props":{"y":279,"x":39,"stateNum":1,"skin":"images/component/frame_btn_small_yellow.png","name":"btnStrengthen","labelStrokeColor":"#e5ad1e","labelStroke":2,"labelSize":30,"labelColors":"#ffffff","labelBold":true},"child":[{"type":"Label","props":{"y":16,"x":22,"text":"强化","strokeColor":"#946430","stroke":2,"name":"txtBtn","fontSize":30,"color":"#f0f7f7","bold":true,"align":"left"}},{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}},{"type":"Image","props":{"y":16,"x":85,"skin":"images/strengthen/strengthen_item_shitou.png","scaleY":0.7,"scaleX":0.7,"name":"imgIcon"}},{"type":"Label","props":{"y":16,"x":117,"text":"0","strokeColor":"#946430","stroke":4,"name":"txtEssence","fontSize":26,"color":"#ffffff","bold":true,"align":"left"}}]},{"type":"Label","props":{"y":11,"x":166,"text":"Lv0","name":"txtLevel","fontSize":28,"color":"#a0880e","bold":true}},{"type":"Label","props":{"y":219,"x":74,"text":"中毒伤害效果","fontSize":21,"color":"#a43601","bold":true,"align":"right"}},{"type":"HBox","props":{"y":203,"x":144,"space":5,"name":"hbox","anchorY":0.5,"anchorX":0.5,"align":"middle"},"child":[{"type":"Label","props":{"y":1,"x":86,"text":"6%","name":"txtAdd","fontSize":21,"color":"#af9801","bold":true,"align":"right"}},{"type":"Label","props":{"text":"攻击时有","fontSize":21,"color":"#a43601","bold":true,"align":"right"}},{"type":"Label","props":{"y":1,"x":112,"text":"几率造成","fontSize":21,"color":"#a43601","bold":true,"align":"right"}}]}]},{"type":"Button","props":{"y":140,"x":514,"stateNum":1,"skin":"images/shop/shop_skill_btn.png","name":"btn_skill"}},{"type":"Button","props":{"y":-6,"x":632,"stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"y":0,"x":0,"runtime":"ScaleAnimScript"}}]}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.strengthen.StrengthenViewUI.uiView);

        }

    }
}

module ui.task {
    export class AchiRewardViewUI extends View {
		public imgIcon:Laya.Image;
		public txt_num:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":266,"height":143},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"images/hall/hall_task_bg.png"}},{"type":"Label","props":{"y":46,"x":121,"text":"成就任务完成","strokeColor":"#584200","stroke":2,"fontSize":22,"color":"#fff263"}},{"type":"Label","props":{"y":75,"x":114,"text":"奖励:","strokeColor":"#8d5d2e","stroke":2,"fontSize":22,"color":"#ffffff"}},{"type":"Image","props":{"y":72,"x":166,"var":"imgIcon","skin":"images/core/diamond.png","scaleY":0.8,"scaleX":0.8}},{"type":"Label","props":{"y":76,"x":199,"var":"txt_num","text":"1000","strokeColor":"#8d5d2e","stroke":2,"fontSize":22,"color":"#ffffff"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.task.AchiRewardViewUI.uiView);

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
		public achiItemList:Laya.List;
		public btnExit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0},"child":[{"type":"View","props":{"width":750,"visible":true,"var":"mainView","name":"mainView","height":1334,"centerY":0,"centerX":0},"child":[{"type":"View","props":{"y":0,"x":0,"var":"blankView","top":0,"right":0,"name":"blankView","left":0,"bottom":0}},{"type":"View","props":{"y":124,"x":0,"width":750,"name":"coverView","mouseThrough":false,"mouseEnabled":true,"height":1050}},{"type":"Image","props":{"y":103,"x":19,"width":713,"skin":"images/component/frame_9calce_01.png","height":1013,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":140,"x":324,"skin":"images/quest/title.png"}},{"type":"Image","props":{"y":338,"x":52,"width":646,"skin":"images/component/frame_9calce_02.png","height":745,"sizeGrid":"25,32,32,36"}},{"type":"View","props":{"y":239,"x":137,"var":"tabGroup"},"child":[{"type":"Button","props":{"y":10,"x":0,"strokeColors":"#998a4e,#a86c24","stateNum":2,"skin":"images/component/tab_01.png","selected":true,"labelStroke":5,"labelSize":36,"labelPadding":"0,0,13,0","labelColors":"#fff4e1,#fff4e1","labelBold":true,"labelAlign":"center","label":"每日任务"},"child":[{"type":"Image","props":{"y":-10,"x":180,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRetDotHint"}}]},{"type":"Button","props":{"y":10,"x":274,"strokeColors":"#998a4e,#a86c24","stateNum":2,"skin":"images/component/tab_01.png","selected":false,"labelStroke":5,"labelSize":36,"labelPadding":"0,0,13,0","labelColors":"#fff4e1,#fff4e1","labelBold":true,"labelAlign":"center","label":"成就任务"},"child":[{"type":"Image","props":{"y":-10,"x":180,"visible":false,"skin":"images/core/red_dot_hint.png","name":"imgRetDotHint"}}]}]},{"type":"ViewStack","props":{"y":341,"width":750,"var":"viewStackTask","selectedIndex":0,"right":0,"name":"viewStackTask","left":0,"height":738},"child":[{"type":"Image","props":{"y":1,"x":56,"width":637,"name":"item0","height":736},"child":[{"type":"List","props":{"y":0,"x":0,"width":638,"var":"taskItemList","spaceY":10,"repeatX":1,"name":"taskItemList","height":690},"child":[{"type":"Box","props":{"y":0,"x":2,"visible":false,"right":2,"renderType":"render","left":2,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":10,"x":6,"skin":"images/quest/item_bg.png"}},{"type":"Image","props":{"y":82,"x":45,"skin":"images/quest/reward_bg.png"}},{"type":"Image","props":{"y":81,"x":33,"skin":"images/core/diamond.png","name":"imgAwardIcon"}},{"type":"Label","props":{"y":28,"x":35,"width":350,"text":"完成车辆合成30次 (0/30)","name":"txtTitle","fontSize":32,"color":"#a17338","bold":true,"align":"left"}},{"type":"Label","props":{"y":85,"x":79,"width":100,"text":"100","name":"txtDiamond","fontSize":30,"color":"#fcf4cd","align":"left"}},{"type":"Image","props":{"y":52,"x":433,"skin":"images/component/frame_9scale_11.png","name":"txtGet"},"child":[{"type":"Label","props":{"y":9,"x":22,"width":120,"text":"已领取","fontSize":30,"color":"#fff4e1","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":44,"x":424,"stateNum":1,"skin":"images/quest/btn_obtain.png","name":"btnGet","labelStrokeColor":"#946430","labelStroke":3,"labelSize":30,"labelColors":"#fff4e1","labelBold":true,"label":"领取"}}]}]},{"type":"Label","props":{"y":699,"x":-1,"width":638,"text":"每天00:00时系统自动重置任务","strokeColor":"#7a572b","stroke":2,"height":24,"fontSize":24,"color":"#ffffff","bold":true,"align":"center"}}]},{"type":"Image","props":{"y":1,"x":56,"width":637,"name":"item1","height":736},"child":[{"type":"List","props":{"y":0,"x":0,"width":638,"var":"achiItemList","spaceY":10,"repeatX":1,"height":690},"child":[{"type":"Box","props":{"y":0,"x":2,"visible":false,"right":2,"renderType":"render","left":2,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":10,"x":6,"skin":"images/quest/item_bg_1.png"}},{"type":"Label","props":{"y":28,"x":35,"width":350,"text":"完成车辆合成30次","name":"txtTitle","fontSize":32,"color":"#a17338","bold":true,"align":"left"}},{"type":"Image","props":{"y":79,"x":433,"skin":"images/component/frame_9scale_11.png","name":"txtGet"},"child":[{"type":"Label","props":{"y":9,"x":22,"width":120,"text":"已领取","fontSize":30,"color":"#fff4e1","bold":true,"align":"center"}}]},{"type":"Label","props":{"y":28,"x":425,"width":185,"text":"(0/30)","name":"txtNum","height":32,"fontSize":32,"color":"#a17338","bold":true,"align":"center"}},{"type":"Image","props":{"y":82,"x":45,"width":144,"skin":"images/quest/reward_bg.png","sizeGrid":"15,24,19,26","height":40}},{"type":"Image","props":{"y":81,"x":33,"skin":"images/core/diamond.png","name":"imgAwardIcon"}},{"type":"Label","props":{"y":85,"x":79,"width":103,"text":"100","name":"txtDiamond","height":30,"fontSize":30,"color":"#fcf4cd","align":"left"}},{"type":"Button","props":{"y":71,"x":424,"stateNum":1,"skin":"images/quest/btn_obtain.png","name":"btnGet","labelStrokeColor":"#946430","labelStroke":3,"labelSize":30,"labelColors":"#fff4e1","labelBold":true,"label":"领取"}}]}]}]},{"type":"Label","props":{"y":317,"x":193,"width":350,"text":"暂时没有任务","strokeColor":"#7a572b","name":"item2","fontSize":46,"color":"#d9d9d9","bold":true,"align":"center"}}]},{"type":"Button","props":{"y":99,"x":649,"var":"btnExit","stateNum":1,"skin":"images/component/frame_close_btn.png","name":"btnExit"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.task.TaskViewUI.uiView);

        }

    }
}

module ui.welfare {
    export class WelfareViewUI extends View {
		public btn_exit:Laya.Button;
		public btn_get:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":718,"height":1016},"child":[{"type":"Box","props":{"y":0,"x":0,"width":718,"height":1016},"child":[{"type":"Image","props":{"y":5,"width":716,"skin":"images/component/frame_9calce_01.png","height":1017,"sizeGrid":"168,65,62,82"}},{"type":"Image","props":{"y":144,"x":34,"width":649,"skin":"images/component/frame_9calce_02.png","sizeGrid":"32,27,32,29","height":750}},{"type":"Image","props":{"y":36,"x":297,"skin":"images/welfare/welfare_title.png"}},{"type":"Image","props":{"y":163,"x":50,"skin":"images/welfare/banner.png"}},{"type":"Image","props":{"y":412,"x":51,"skin":"images/welfare/welfare_bg.png"}},{"type":"Image","props":{"y":529,"x":51,"skin":"images/welfare/welfare_bg.png"}},{"type":"Image","props":{"y":647,"x":51,"skin":"images/welfare/welfare_bg.png"}},{"type":"Image","props":{"y":765,"x":51,"skin":"images/welfare/welfare_bg.png"}},{"type":"Box","props":{"y":431,"x":83},"child":[{"type":"Image","props":{"skin":"images/welfare/welfare_icon_bg.png"}},{"type":"Label","props":{"y":13,"x":23,"text":"1","strokeColor":"#884f1e","stroke":3,"fontSize":40,"color":"#fff4e1"}}]},{"type":"Label","props":{"y":450,"x":167,"text":"点击","fontSize":30,"color":"#6c4234"}},{"type":"Label","props":{"y":450,"x":239,"text":"\"右上角三个点\"","fontSize":30,"color":"#ff7e00"}},{"type":"Image","props":{"y":436,"x":483,"skin":"images/welfare/welfare_icon.png"}},{"type":"Box","props":{"y":548,"x":83},"child":[{"type":"Image","props":{"skin":"images/welfare/welfare_icon_bg.png"}},{"type":"Label","props":{"y":13,"x":23,"text":"2","strokeColor":"#884f1e","stroke":3,"fontSize":40,"color":"#fff4e1"}}]},{"type":"Label","props":{"y":567,"x":167,"text":"点击","fontSize":30,"color":"#6c4234"}},{"type":"Label","props":{"y":567,"x":239,"text":"\"添加我的小程序\"","fontSize":30,"color":"#ff7e00"}},{"type":"Box","props":{"y":667,"x":83},"child":[{"type":"Image","props":{"skin":"images/welfare/welfare_icon_bg.png"}},{"type":"Label","props":{"y":13,"x":23,"text":"3","strokeColor":"#884f1e","stroke":3,"fontSize":40,"color":"#fff4e1"}}]},{"type":"Label","props":{"y":686,"x":167,"text":"点击","fontSize":30,"color":"#6c4234"}},{"type":"Label","props":{"y":686,"x":239,"text":"\"关闭圆圈\"","fontSize":30,"color":"#ff7e00"}},{"type":"Image","props":{"y":672,"x":483,"skin":"images/welfare/welfare_icon.png"}},{"type":"Box","props":{"y":786,"x":83},"child":[{"type":"Image","props":{"skin":"images/welfare/welfare_icon_bg.png"}},{"type":"Label","props":{"y":13,"x":23,"text":"4","strokeColor":"#884f1e","stroke":3,"fontSize":40,"color":"#fff4e1"}}]},{"type":"Label","props":{"y":786,"x":166,"text":"点击我的小程序","fontSize":30,"color":"#6c4234"}},{"type":"Label","props":{"y":822,"x":166,"text":"\"英雄挺住\" 开始游戏","fontSize":30,"color":"#ff7e00"}},{"type":"Label","props":{"y":929,"x":123,"text":"从“我的小程序”登入领取大礼包！","fontSize":32,"color":"#ef4f00"}},{"type":"Label","props":{"y":1016,"x":269,"text":"点击空白处关闭","fontSize":25,"color":"#ffffff","bold":true,"align":"center"}},{"type":"Button","props":{"x":634,"var":"btn_exit","stateNum":1,"skin":"images/component/frame_close_btn.png"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]},{"type":"Button","props":{"y":308,"x":125,"var":"btn_get","stateNum":1,"skin":"images/welfare/welfare_btn.png","labelStrokeColor":"#946430","labelStroke":2,"labelSize":35,"labelColors":"#ffffff,#ffffff,#ffffff,#ffffff","label":"领取"},"child":[{"type":"Script","props":{"runtime":"ScaleAnimScript"}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("ScaleAnimScript",ScaleAnimScript);

            super.createChildren();
            this.createView(ui.welfare.WelfareViewUI.uiView);

        }

    }
}
