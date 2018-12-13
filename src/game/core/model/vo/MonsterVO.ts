/*
* 怪物模版表;
*/
class MonsterVO {
    public id: number;
    public type: number;
    public name: string;
    /** 图片 */
    public modelImgUrl: string;
    /** 前缀 */
    public modelImgKey: string;
    /** 图片数 */
    public modelImgAtk: number;
    public modelImgWait: number;
    /** 攻击 */
    public atk: string;
    /** 攻击速度 */
    public ias: number;
    /** 怪物移动速度(s) */
    public mMoveSpeed: number;
    /** 商城图片 */
    public imgUrl: string;
    /** 初始成本价 */
    public buyPrice: number;
    /** 图鉴解锁制造需求 */
    public unLockId: number;
    /** 技能 */
    public ability: number;
    /** 守卫 */
    public standFrame: number;
    /** 方向 */
    public monsterdir: number;
    /** 子弹名字 */
    public buttleName: string;
    public pivotX: number;
    public pivotY: number;
}