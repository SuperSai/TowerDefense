/*
* 守卫管理类;
*/
class EvolutionManager {

    /** 守卫升级需要的英雄数量 */
    public needHeroCount: number = 3;

    constructor() {

    }


    /** 获取守卫升级需要的条件信息 */
    public getEvolutionLevelData(): MonsterVO {
        return BattleManager.Instance.getMonsterItem(this.getHeroId());
    }

    /** 守卫升级需要的英雄ID */
    public getHeroId(): number {
        return userData.isEvolution() ? (1000 + this.getHeroLevel()) : (100 + this.getHeroLevel());
    }

    /** 获取守卫升级的英雄需要的等级 */
    public getHeroLevel(): number {
        let kingLevel: number = userData.getKingLevel();
        return userData.isEvolution() ? (((kingLevel - 30) % 60) + 1) : (((kingLevel - 1) % 30) + 1);
    }

    /** 获取守卫升级需要的钻石 */
    public getEvolutionLevelDiamond(): number {
        let kingLevel: number = userData.getKingLevel();
        let kingVO: KindLevelConfigVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
        if (!kingVO) return 0;
        return MathUtils.parseInt(kingVO.gemxh.toString());
    }

    /** 守卫是否可以升级*/
    public getIsEvolutionLevel(): boolean {
        let kingLevel: number = userData.getKingLevel();
        if (kingLevel > 10) {

            return !((M.player.Info.userDiamond < this.getEvolutionLevelDiamond()) || (userData.caculateMonsterCount(this.getHeroId()) < this.needHeroCount));

        } else {
            return !(M.player.Info.userDiamond < this.getEvolutionLevelDiamond());
        }
    }





    private static _instance: EvolutionManager;
    public static get Instance(): EvolutionManager {
        if (EvolutionManager._instance == null) {
            EvolutionManager._instance = new EvolutionManager();
        }
        return EvolutionManager._instance;
    }
}