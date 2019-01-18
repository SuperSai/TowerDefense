/*
* 子弹
*/
class Bullet extends Laya.Sprite {
    constructor() {
        super(...arguments);
        this._skillId = 0; //类型
    }
    //设置子弹类型
    setBulletType(monster) {
        let self = this;
        self._skillId = RandomUtils.rangeInt(1, 3);
        if (monster && monster.monsterInfo) {
            let poolData = ObjectPool.popObj(Laya.Image, monster.monsterInfo.buttleName);
            self._bulletImg = poolData.obj;
            if (!poolData.isPool) {
                self._bulletImg.skin = PathConfig.GameResUrl.replace("{0}", monster.monsterInfo.buttleName);
            }
            self.addChild(self._bulletImg);
        }
    }
    //攻击目标
    attackTarget(targetMonster, collionCallback = null) {
        this._callBack = collionCallback;
        let targetPos = null;
        if (targetMonster.calcuteNextMovePosFun) {
            targetPos = targetMonster.calcuteNextMovePosFun();
        }
        else {
            targetPos = { x: targetMonster.x, y: targetMonster.y };
        }
        Laya.Tween.to(this, { x: targetPos.x - 30, y: targetPos.y - 80 }, 300, Laya.Ease.linearNone, Handler.create(this, this.buttetBomeEffect));
    }
    /** 子弹爆炸特效 */
    buttetBomeEffect() {
        Laya.Tween.clearTween(this);
        //创建动画实例
        let aniData = Bullet.aniTable[this._skillId - 1];
        if (aniData && this.parent) {
            let poolData = ObjectPool.popObj(Laya.Animation, aniData.aniPath);
            let effectAni = poolData.obj;
            this.parent.addChild(effectAni);
            effectAni.zOrder = this.zOrder;
            if (!poolData.isPool) {
                effectAni.loadAtlas(PathConfig.EffectUrl.replace("{0}", aniData.aniPath), Handler.create(this, () => {
                    //创建动画模板dizziness
                    Laya.Animation.createFrames(AnimationUtils.aniUrls(aniData.aniKey, aniData.frameCount, aniData.aniPath + '/', true), aniData.aniPath);
                    if (effectAni && effectAni.frames && effectAni.frames.length) {
                        let aniGraphics = effectAni.frames[1]; //设置坐标
                        if (aniGraphics) {
                            let aniBounds = aniGraphics.getBounds();
                            effectAni.pos(this.x + (this.width - aniBounds.width) / 2 + 20, this.y + (this.height - aniBounds.width) / 2 + 40);
                        }
                        effectAni.interval = 50;
                        effectAni.play(0, false, aniData.aniPath);
                    }
                }));
            }
            else {
                if (effectAni && effectAni.frames && effectAni.frames.length) {
                    let aniGraphics = effectAni.frames[1];
                    if (aniGraphics) {
                        let aniBounds = aniGraphics.getBounds();
                        effectAni.pos(this.x + (this.width - aniBounds.width) / 2 + 20, this.y + (this.height - aniBounds.width) / 2 + 40);
                    }
                    effectAni.play(0, false, aniData.aniPath);
                }
            }
            effectAni.timerOnce(50 * aniData.frameCount, this, () => {
                effectAni.removeSelf();
                ObjectPool.push(effectAni);
            });
        }
        ;
        this._callBack && this._callBack(this._skillId);
        this.reset();
        ObjectPool.push(this._bulletImg);
        ObjectPool.push(this);
    }
    //连接目标（雷电专用）
    joinTarget(targetPos) {
        this.loadImage("images/skill/effect_electric002.png");
        this.pivotX = 8;
        this.pivotY = this.height / 2;
        this.rotation = MathUtils.calulatePointAnagle(this.x, this.y, targetPos.x, targetPos.y);
        this.scaleX = targetPos.distance(this.x, this.y) / 100 + 0.1;
        Laya.Tween.to(this, { scaleY: -1 }, 50).to(this, { scaleY: 1 }, 50).to(this, { alpha: 0 }, 100, Laya.Ease.linearNone, Handler.create(this, () => {
            this.removeChildren();
            this.removeSelf();
        }));
    }
    reset() {
        DisplayUtils.removeFromParent(this._bulletImg);
        this.removeChildren();
        this.removeSelf();
    }
}
Bullet.aniTable = [
    {
        aniPath: "ice",
        aniKey: "s_",
        frameCount: 4
    },
    {
        aniPath: "electric",
        aniKey: "dian_",
        frameCount: 5
    },
    {
        aniPath: "drug",
        aniKey: "du_",
        frameCount: 4
    },
    {
        aniPath: "fireball",
        aniKey: "sw_jz",
        frameCount: 5
    }
];
//# sourceMappingURL=Bullet.js.map