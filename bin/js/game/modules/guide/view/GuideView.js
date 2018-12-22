/*
* TER0803-新手;
*/
class GuideView {
    constructor(_offsetPos = null) {
        // private cMask:Laya.Sprite;
        this.stage = 0; //新手步骤
        this.guideText = [
            "点击招募武将～",
            "移动武将上阵自动战斗",
            "再点击招募武将～",
            "同等级的武将可以合成高一级武将",
            "点击进入商城",
            "使用元宝直接招募更高级的武将"
        ]; //指引文字
        if (_offsetPos) {
            this.offsetPos = _offsetPos;
        }
        else {
            this.offsetPos = new Laya.Point(0, 0);
        }
    }
    setStage(_stage) {
        // console.log("stage",_stage)
        let that = this;
        if (_stage == 1) {
            //购买车
            let rect = new Laya.Rectangle(260, 1240, 220, 110);
            rect.x += that.offsetPos.x;
            rect.y += that.offsetPos.y;
            that.showMask(rect);
            that.showGuideText(0, rect.x + 10, rect.y - 300);
        }
        else if (_stage == 2) {
            //放车到跑道
            let rect = new Laya.Rectangle(5, 810, 150, 150);
            rect.x += that.offsetPos.x;
            rect.y += that.offsetPos.y;
            that.showMask(rect);
            that.showGuideText(1, rect.x + 10, rect.y - 390);
        }
        else if (_stage == 3) {
            //再次购买车
            let rect = new Laya.Rectangle(260, 1240, 220, 110);
            rect.x += that.offsetPos.x;
            rect.y += that.offsetPos.y;
            that.showMask(rect);
            that.showGuideText(2, rect.x + 10, rect.y - 300);
        }
        else if (_stage == 4) {
            //合并车
            let rect = new Laya.Rectangle(5, 810, 290, 150);
            rect.x += that.offsetPos.x;
            rect.y += that.offsetPos.y;
            that.showMask(rect);
            that.showGuideText(3, rect.x, rect.y - 300);
        }
        else if (_stage == 5) {
            //车店
            let rect = new Laya.Rectangle(480, 1240, 265, 110);
            rect.x += that.offsetPos.x;
            rect.y += that.offsetPos.y;
            that.showMask(rect);
            that.showGuideText(4, rect.x - 40, rect.y - 310);
        }
        else if (_stage == 6) {
            //元宝购车
            let rect = new Laya.Rectangle(295, 606, 98, 80);
            rect.x += that.offsetPos.x;
            rect.y += that.offsetPos.y;
            that.showMask(rect);
            that.showGuideText(5, rect.x - 50, rect.y - 300);
        }
        else {
            that.hideMask();
        }
        that.stage = _stage;
    }
    nextStage() {
        let that = this;
        that.setStage(that.stage + 1);
    }
    getStage() {
        return this.stage;
    }
    //显示遮罩
    showMask(_maskRect) {
        let that = this;
        if (that.mainNode == null) {
            that.mainNode = new Laya.View();
            Laya.stage.addChild(that.mainNode);
            that.mainNode.zOrder = 1001;
        }
        else {
            that.mainNode.removeChildren();
        }
        that.bgImg = new Laya.Sprite();
        // //获取图片资源，绘制到画布
        // that.bgImg.graphics.drawTexture(Laya.loader.getRes("images/guide_mask.png"),_maskRect.x-2, _maskRect.y-2,  _maskRect.width+4, _maskRect.height+4);
        // //周边黑色
        // that.bgImg.graphics.drawRect(0, 0, Laya.stage.width, _maskRect.y, "#000");
        // that.bgImg.graphics.drawRect(0, _maskRect.y+_maskRect.height, Laya.stage.width, Laya.stage.height, "#000");
        // that.bgImg.graphics.drawRect(0, _maskRect.y, _maskRect.x, _maskRect.height, "#000");
        // that.bgImg.graphics.drawRect(_maskRect.x+_maskRect.width, _maskRect.y, Laya.stage.width, _maskRect.height, "#000");
        // // //合并绘制结果
        // if (Laya.Browser.onIOS || Laya.Browser.onPC) {
        //     let canvas = that.bgImg.drawToCanvas(Laya.stage.width, Laya.stage.height,0,0);
        //     let rankTexture = new Laya.Texture(canvas);
        //     that.bgImg.graphics.clear();
        //     that.bgImg.graphics.drawTexture(rankTexture, 0, 0, Laya.stage.width, Laya.stage.height);
        // }
        //添加到舞台
        that.mainNode.addChild(that.bgImg);
        that.bgImg.alpha = 0.5;
        that.bgImg.on(Laya.Event.CLICK, that, () => {
            console.log("GuideView click");
            // that.nextStage();
        });
        //点击屏蔽
        let maskRect2 = [
            { x: 0, y: 0, width: Laya.stage.width, height: _maskRect.y },
            { x: 0, y: _maskRect.y + _maskRect.height, width: Laya.stage.width, height: Laya.stage.height },
            { x: 0, y: _maskRect.y, width: _maskRect.x, height: _maskRect.height },
            { x: _maskRect.x + _maskRect.width, y: _maskRect.y, width: Laya.stage.width, height: _maskRect.height },
        ];
        for (var index = 0; index < maskRect2.length; index++) {
            var element = maskRect2[index];
            if (element) {
                let maskView = new Laya.View();
                maskView.pos(element.x, element.y);
                maskView.size(element.width, element.height);
                that.bgImg.addChild(maskView);
                maskView.on(Laya.Event.CLICK, that, () => {
                    console.log("maskview prevent");
                });
                maskView.name = 'maskview_' + index;
            }
        }
        // //创建遮罩对象
        // this.cMask = new Laya.Sprite();
        // //画一个圆形的遮罩区域
        // this.cMask.graphics.drawCircle(80,80,50,"#fff");
        // //圆形所在的位置坐标
        // this.cMask.pos(120,50);
        // this.cMask.alpha = 0.5;
        // //实现img显示对象的遮罩效果
        // this.img.mask = this.cMask;
    }
    hideMask() {
        let that = this;
        if (that.mainNode) {
            that.mainNode.removeSelf();
            that.mainNode = null;
        }
    }
    //显示指引文本
    showGuideText(_guideId, _px, _py) {
        let that = this;
        if (that.mainNode) {
            let content = that.guideText[_guideId];
            let txtBox = new Laya.Sprite();
            that.mainNode.addChild(txtBox);
            txtBox.pos(_px, _py);
            let txtImg = new Laya.Image("images/guide_bhj.png");
            txtBox.addChild(txtImg);
            txtImg.anchorX = 0.2;
            txtImg.anchorY = 1.0;
            txtImg.pos(txtImg.width * txtImg.anchorX, txtImg.height * txtImg.anchorY);
            let timeLine = new Laya.TimeLine();
            timeLine.addLabel("tl1", 0).to(txtImg, { scaleX: 0.98, scaleY: 0.98 }, 800, Laya.Ease.sineInOut)
                .addLabel("tl2", 0).to(txtImg, { scaleX: 1.0, scaleY: 1.0 }, 800);
            timeLine.play(0, true);
            let txtLabel = new Laya.Label(content);
            txtImg.addChild(txtLabel);
            txtLabel.fontSize = 30;
            txtLabel.color = "#FFFFFF";
            txtLabel.width = 360;
            txtLabel.height = 120;
            // txtLabel.bgColor = "#000"
            txtLabel.wordWrap = true;
            txtLabel.valign = "middle";
            txtLabel.pos(txtImg.width * 0.12, txtImg.height * 0.25);
            //文本框缩小
            if (_guideId == 4) {
                timeLine.pause();
                txtImg.scaleX = 0.7;
                txtImg.scaleY = txtImg.scaleX;
                txtLabel.fontSize /= txtImg.scaleX;
            }
            if (_guideId == 0 || _guideId == 2) {
                let pointSp = new Laya.Image("images/shouzhi.png");
                txtBox.addChild(pointSp);
                pointSp.pos(txtImg.width * 0.35, txtImg.height + 20);
                let timeLine = new Laya.TimeLine();
                timeLine.addLabel("tl1", 0).to(pointSp, { x: pointSp.x + 30, y: pointSp.y + 30 }, 800)
                    .addLabel("tl2", 0).to(pointSp, { x: pointSp.x, y: pointSp.y }, 800, Laya.Ease.backInOut);
                timeLine.play(0, true);
            }
            else if (_guideId == 1) {
                let pointSp = new Laya.Image("images/shouzhi.png");
                txtBox.addChild(pointSp);
                pointSp.pos(65, txtImg.height + 150);
                let timeLine = new Laya.TimeLine();
                timeLine.addLabel("tl1", 0).to(pointSp, { x: pointSp.x + 120, y: pointSp.y - 220 }, 1000)
                    .addLabel("tl2", 0).to(pointSp, { x: pointSp.x, y: pointSp.y }, 200);
                timeLine.play(0, true);
            }
            else if (_guideId == 3) {
                // let arrSp = new Laya.Image("images/bhj3.png");
                // txtImg.addChild(arrSp);
                // arrSp.pos(txtImg.width*0.22, txtImg.height +120);
                // arrSp.alpha = 0.9;
                let pointSp = new Laya.Image("images/shouzhi.png");
                txtBox.addChild(pointSp);
                pointSp.pos(txtImg.width * 0.4, txtImg.height + 60);
                let timeLine = new Laya.TimeLine();
                timeLine.addLabel("tl1", 0).to(pointSp, { x: pointSp.x - 120, y: pointSp.y }, 800)
                    .addLabel("tl2", 0).to(pointSp, { x: pointSp.x, y: pointSp.y }, 800, Laya.Ease.backInOut);
                timeLine.play(0, true);
            }
            else if (_guideId == 4) {
                let pointSp = new Laya.Image("images/shouzhi.png");
                txtBox.addChild(pointSp);
                pointSp.pos(txtImg.width * 0.25, txtImg.height + 70);
                let timeLine = new Laya.TimeLine();
                timeLine.addLabel("tl1", 0).to(pointSp, { x: pointSp.x + 30, y: pointSp.y + 30 }, 800)
                    .addLabel("tl2", 0).to(pointSp, { x: pointSp.x, y: pointSp.y }, 800, Laya.Ease.backInOut);
                timeLine.play(0, true);
            }
            else if (_guideId == 5) {
                let pointSp = new Laya.Image("images/shouzhi.png");
                txtBox.addChild(pointSp);
                pointSp.pos(txtImg.width * 0.2, txtImg.height + 40);
                let timeLine = new Laya.TimeLine();
                timeLine.addLabel("tl1", 0).to(pointSp, { x: pointSp.x + 30, y: pointSp.y + 30 }, 800)
                    .addLabel("tl2", 0).to(pointSp, { x: pointSp.x, y: pointSp.y }, 800, Laya.Ease.backInOut);
                timeLine.play(0, true);
            }
        }
    }
    setTouchEnable(_enable = true) {
        let that = this;
        if (that.bgImg) {
            for (var index = 0; index < 4; index++) {
                var element = that.bgImg.getChildByName('maskview_' + index);
                if (element) {
                    element.mouseEnabled = _enable;
                }
            }
        }
    }
}
// module laya  {
// 	import Sprite = Laya.Sprite;
// 	import Stage = Laya.Stage;
// 	import HitArea = Laya.HitArea;
// 	import WebGL = Laya.WebGL;
// 	export class Sprite_Guide 
// 	{
// 		private red:Sprite;
// 		private guideContainer:Sprite;
// 		private tipContainer:Sprite;
// 		private guideSteps:Array<any> = 
// 		[
// 			{ x: 151, y: 575, radius:150, tip:"../../res/guide/help6.png", tipx:200, tipy:250 },
// 			{ x: 883, y: 620, radius:100, tip:"../../res/guide/help4.png", tipx:730, tipy:380 },
// 			{ x: 1128, y: 583, radius:110, tip:"../../res/guide/help3.png", tipx:900, tipy:300 }
// 		];
// 		private guideStep:number = 0;
// 		private hitArea:HitArea;
// 		private interactionArea:Sprite;
// 		constructor() 
// 		{
// 			Laya.init(1285, 727);
// 			Laya.stage.alignH = Stage.ALIGN_CENTER;
// 			Laya.stage.alignV = Stage.ALIGN_MIDDLE;
// 			//绘制一个蓝色方块，不被抠图
// 			var gameContainer:Sprite = new Sprite();
// 			gameContainer.loadImage("../../res/guide/crazy_snowball.png");
// 			Laya.stage.addChild(gameContainer);
// 			// 引导所在容器
// 			this.guideContainer = new Sprite();
// 			// 设置容器为画布缓存
// 			this.guideContainer.cacheAs = "bitmap";
// 			Laya.stage.addChild(this.guideContainer);
// 			gameContainer.on("click", this, this.nextStep);
// 			//绘制遮罩区，含透明度，可见游戏背景
// 			var maskArea:Sprite = new Sprite();
// 			maskArea.alpha = 0.5;
// 			maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
// 			this.guideContainer.addChild(maskArea);
// 			//绘制一个圆形区域，利用叠加模式，从遮罩区域抠出可交互区
// 			this.interactionArea = new Sprite();
// 			//设置叠加模式
// 			this.interactionArea.blendMode = "destination-out";
// 			this.guideContainer.addChild(this.interactionArea);
// 			this.hitArea = new HitArea();
// 			this.hitArea.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
// 			this.guideContainer.hitArea = this.hitArea;
// 			this.guideContainer.mouseEnabled = true;
// 			this.tipContainer = new Sprite();
// 			Laya.stage.addChild(this.tipContainer);
// 			this.nextStep();
// 		}
// 		private nextStep():void
// 		{
// 			if (this.guideStep == this.guideSteps.length)
// 			{
// 				Laya.stage.removeChild(this.guideContainer);
// 				Laya.stage.removeChild(this.tipContainer);
// 			}
// 			else
// 			{
// 				var step:any = this.guideSteps[this.guideStep++];
// 				this.hitArea.unHit.clear();
// 				this.hitArea.unHit.drawCircle(step.x, step.y, step.radius, "#000000");
// 				this.interactionArea.graphics.clear();
// 				this.interactionArea.graphics.drawCircle(step.x, step.y, step.radius, "#000000");
// 				this.tipContainer.graphics.clear();
// 				this.tipContainer.loadImage(step.tip);
// 				this.tipContainer.pos(step.tipx, step.tipy);
// 			}
// 		}
// 	}
// }
// new laya.Sprite_Guide();
//# sourceMappingURL=GuideView.js.map