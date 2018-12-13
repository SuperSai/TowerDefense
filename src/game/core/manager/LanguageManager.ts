/*
* name;
*/
class LanguageManager {
    /** 语言包数据是否加载完毕 */
    public static isLanguageLoadComplete: boolean = false;
    public static isOpenLanguage: boolean = true;
    private _languageMap: TSDictionary<string, string> = new TSDictionary<string, string>();
    private _reg: RegExp = new RegExp("\\{(\\d+)\\}");

    /** 加载语言包配置文件 */
    public loadLanguage(): void {
        let self = this;
        Laya.loader.load(PathConfig.Language, Laya.Handler.create(self, () => {
            self.init(Laya.Loader.getRes(PathConfig.Language));
        }, null, true), null, Laya.Loader.TEXT);
    }

    /**
     * 初始化数据
     */
    private init(data: string): void {
        let self = this;
        let languageArr: string[] = String(data).split("\r\n");
        if (languageArr.length) {
            for (var i = 0; i < languageArr.length; i++) {
                var obj = languageArr[i];
                if (obj == "#" || obj == "") {
                    continue;
                } else {
                    let strArr: string[] = obj.split(":");
                    if (self._languageMap.ContainsKey(strArr[0])) {
                        self._languageMap.Remove(strArr[0]);
                    }
                    if (strArr.length <= 2) {
                        self._languageMap.Add(strArr[0], strArr[1]);
                    } else {
                        self._languageMap.Add(strArr[0], strArr.slice(1).join(""));
                    }
                }
            }
            LanguageManager.isLanguageLoadComplete = true;
        }
    }

    public getLanguageMapData(): any {
        let self = this;
        return self._languageMap.getValues();
    }

    public getLanguageById(key: string): string {
        let self = this;
        return self._languageMap.TryGetValue(key);
    }

    /**
     * 设置容器语言
     * @param {Laya.Node} node
     */
    public setModuleLanguage(node: Laya.Node): void {
        let self = this;
        if (!node || node && !node.numChildren || !LanguageManager.isOpenLanguage) return;
        self.SearchAndModifyNodeLanguage(node);
    }

    private SearchAndModifyNodeLanguage(node: Laya.Node) {
        for (var i = 0; i < node.numChildren; i++) {
            var child: Laya.Node = node.getChildAt(i);
            if (child instanceof Laya.Node) {
                this.SearchAndModifyNodeLanguage(child);
            }

            if (child instanceof Laya.Label) {

                if (child.name != "") {
                    var name: string = child.name.split("@")[1];
                    if (name) {
                        child.text = this.getLanguageById(name);
                    }
                }
            } else if (child instanceof Laya.Button) {
                if (child.name != "") {
                    var name: string = child.name.split("@")[1];
                    if (name) {
                        child.label = this.getLanguageById(name);
                    }
                }
            }
        }
    }

    /**
    * 获取文本内容
    * @param {string} key
    * @returns {string}
    */
    public getLanguageText(key: string, ...arg): string {
        let self = this;
        return self.getTranslationWithArray(key, arg);
    }

    private getTranslationWithArray(key: string, argsArr: any[]): string {
        let self = this;
        if (self._languageMap.ContainsKey(key)) {
            return self.replaceStr(self._languageMap.TryGetValue(key), argsArr);
        }
    }

    public languageReplace(str: string, args: any[]): string {
        let self = this;
        return self.replaceStr(str, args);
    }
    /**
     * 根据正则表达式去替换内容
     */
    private replaceStr(repContent: string, argsArr: any[]): string {
        let self = this;
        if (argsArr && argsArr.length > 0) {
            let data: RegExpExecArray = self._reg.exec(repContent);
            while (data && argsArr.length > 0) {
                let id: number = Number(data[1]);
                let str: string = String(argsArr[id]);
                if (id >= 0 && id < argsArr.length) {
                    var idx: number = str.indexOf("$");
                    if (idx > -1) {
                        str = str.slice(0, idx) + "$" + str.slice(idx);
                    }
                    repContent = repContent.replace(self._reg, str);
                }
                else {
                    repContent = repContent.replace(self._reg, "{}");
                }
                data = self._reg.exec(repContent);
            }
        }
        return repContent;
    }

    private static _instance: LanguageManager;
    public static get Instance(): LanguageManager {
        let self = this;
        if (LanguageManager._instance == null) {
            LanguageManager._instance = new LanguageManager();
        }
        return LanguageManager._instance;
    }
}