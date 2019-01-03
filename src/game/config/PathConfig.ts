/*
* 路径配置;
*/
class PathConfig {

    public static AppUrl: string = "https://pokemon.vuggame.com/api/";
    public static AppResUrl: string = "https://miniapp.vuggame.com/pokemon_vuggame_com_single/";
    public static Language: string = PathConfig.AppResUrl + "index/config/language.txt";
    public static MonsterUrl: string = PathConfig.AppResUrl + "images/anim/{0}.atlas";
    public static CSVUrl: string = PathConfig.AppResUrl + "index/";
    public static GameResUrl: string = "images/skill/{0}.png";
    public static EffectUrl: string = "images/effect/{0}.atlas";
    public static ItemUrl: string = "images/core/{0}.png";

}