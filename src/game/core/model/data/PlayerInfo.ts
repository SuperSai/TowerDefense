/*
* name;
*/
class PlayerInfo {
    /** 微信用户信息 */
    public wxUserInfo: { nickName: string, avatarUrl: string, gender: number, city: string, province: string, country: string, openId: string };
    /** 拥有金币 */
    public userMoney: number = 0;
    /** 拥有钻石 */
    public userDiamond: number = 0;
    /** 拥有精华碎片 */
    public userEssence: number = 0;
    /** 用户等级 */
    public userLevel: number = 0;
    /** 用户经验 */
    public userExp: number = 0;
    /** 等级增长的收益 */
    public userLevelExtraIncome: number = 1;
    /** 每天可以领取金币最多10次 */
    public dayGetGoldCount: number = 10;
    /** 关卡开放等级 */
    public levelOffect: number = 2;
    /** 是否从我的小程序进入游戏 */
    public isMySceneEnter:boolean = false;
}