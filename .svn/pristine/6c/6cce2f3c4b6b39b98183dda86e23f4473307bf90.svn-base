/*
* 守卫管理类;
*/
class EvolutionManager {
    constructor() {
        /** 守卫升级需要的英雄数量 */
        this.needHeroCount = 3;
    }
    /** 获取守卫升级需要的条件信息 */
    getEvolutionLevelData() {
        return BattleManager.Instance.getMonsterItem(this.getHeroId());
    }
    /** 守卫升级需要的英雄ID */
    getHeroId() {
        return userData.isEvolution() ? (1000 + this.getHeroLevel()) : (100 + this.getHeroLevel());
    }
    /** 获取守卫升级的英雄需要的等级 */
    getHeroLevel() {
        let kingLevel = userData.getKingLevel();
        return userData.isEvolution() ? (((kingLevel - 30) % 60) + 1) : (((kingLevel - 1) % 30) + 1);
    }
    /** 获取守卫升级需要的钻石 */
    getEvolutionLevelDiamond() {
        let kingLevel = userData.getKingLevel();
        let kingVO = GlobleData.getData(GlobleData.KindLevelConfigVO, kingLevel);
        if (!kingVO)
            return 0;
        return MathUtils.parseInt(kingVO.gemxh.toString());
    }
    /** 守卫是否可以升级*/
    getIsEvolutionLevel() {
        let kingLevel = userData.getKingLevel();
        if (kingLevel > 10) {
            return !((M.player.Info.userDiamond < this.getEvolutionLevelDiamond()) || (userData.caculateMonsterCount(this.getHeroId()) < this.needHeroCount));
        }
        else {
            return !(M.player.Info.userDiamond < this.getEvolutionLevelDiamond());
        }
    }
    static get Instance() {
        if (EvolutionManager._instance == null) {
            EvolutionManager._instance = new EvolutionManager();
        }
        return EvolutionManager._instance;
    }
}
//# sourceMappingURL=EvolutionManager.js.map