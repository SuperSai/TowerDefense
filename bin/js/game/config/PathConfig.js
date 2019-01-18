/*
* 路径配置;
*/
class PathConfig {
}
// public static AppUrl: string = "https://yamdev.xiaoduogame.cn/api/"; //测试服地址
PathConfig.AppUrl = "https://pokemon.vuggame.com/api/"; //正式服地址
PathConfig.AppResUrl = "https://miniapp.vuggame.com/pokemon_vuggame_com_single/";
PathConfig.RES_URL = PathConfig.AppResUrl + "v3/";
PathConfig.Language = PathConfig.RES_URL + "config/language.txt";
PathConfig.MonsterUrl = PathConfig.RES_URL + "anim/{0}.atlas";
PathConfig.GameResUrl = "images/skill/{0}.png";
PathConfig.EffectUrl = "images/effect/{0}.atlas";
PathConfig.ItemUrl = "images/core/{0}.png";
//# sourceMappingURL=PathConfig.js.map