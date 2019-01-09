/*
* 关卡配置表;
*/
class BarrierConfigVO {
    /** 单个怪物收益 */
    public earnings: number;
    /** 单个怪物血量 */
    public blood: number;
    /** 开放坑位 */
    public seatNum: number;
    /** 关卡 */
    public id: string;
    /** 关卡描述 */
    public name: string
    /** 怪物id */
    public mId1: number;
    /** cd时间 */
    public mEnterTime1: number;
    /** 怪物数量 */
    public mNum1: number;
    public mId2: number;
    public mEnterTime2: number;
    public mNum2: number;
    public mId3: number;
    public mEnterTime3: number;
    public mNum3: number;
    /** 图鉴解锁关卡 */
    public bossTuJian: number;
}