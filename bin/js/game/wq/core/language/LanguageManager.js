/*
* name;
*/
class LanguageManager {
    constructor() {
        this._map = new Laya.Dictionary();
        this._reg = new RegExp("\\{(\\d+)\\}");
    }
    /** 加载语言包配置文件 */
    loadLanguage() {
        let self = this;
        Laya.loader.load(PathConfig.Language, Laya.Handler.create(self, () => {
            self.init(Laya.Loader.getRes(PathConfig.Language));
        }, null, true), null, Laya.Loader.TEXT);
    }
    /**
     * 初始化数据
     */
    init(data) {
        if (!data) {
            data = Laya.Loader.getRes(PathConfig.Language);
        }
        let self = this;
        let languageArr = String(data).split("\n");
        if (languageArr.length <= 1) {
            languageArr = String(data).split("\r\n");
        }
        if (languageArr.length) {
            for (var i = 0; i < languageArr.length; i++) {
                var obj = languageArr[i];
                if (obj == "#" || obj == "") {
                    continue;
                }
                else {
                    let strArr = obj.split(":");
                    if (self._map.indexOf(strArr[0]) != -1) {
                        self._map.remove(strArr[0]);
                    }
                    if (strArr.length <= 2) {
                        self._map.set(strArr[0], strArr[1]);
                    }
                    else {
                        self._map.set(strArr[0], strArr.slice(1).join(""));
                    }
                }
            }
            LanguageManager.isLanguageLoadComplete = true;
        }
    }
    getLanguageById(key) {
        return this._map.get(key);
    }
    /**
     * 设置容器语言
     * @param {Laya.Node} node
     */
    setModuleLanguage(node) {
        let self = this;
        if (!node || node && !node.numChildren || !LanguageManager.isOpenLanguage)
            return;
        self.SearchAndModifyNodeLanguage(node);
    }
    SearchAndModifyNodeLanguage(node) {
        for (var i = 0; i < node.numChildren; i++) {
            var child = node.getChildAt(i);
            if (child instanceof Laya.Node) {
                this.SearchAndModifyNodeLanguage(child);
            }
            if (child instanceof Laya.Label) {
                if (child.name != "") {
                    var name = child.name.split("@")[1];
                    if (name) {
                        child.text = this.getLanguageById(name);
                    }
                }
            }
            else if (child instanceof Laya.Button) {
                if (child.name != "") {
                    var name = child.name.split("@")[1];
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
    getLanguageText(key, ...arg) {
        let self = this;
        return self.getTranslationWithArray(key, arg);
    }
    getTranslationWithArray(key, argsArr) {
        let self = this;
        if (self._map.indexOf(key) != -1) {
            return self.replaceStr(self._map.get(key), argsArr);
        }
    }
    languageReplace(str, args) {
        let self = this;
        return self.replaceStr(str, args);
    }
    /**
     * 根据正则表达式去替换内容
     */
    replaceStr(repContent, argsArr) {
        let self = this;
        if (argsArr && argsArr.length > 0) {
            let data = self._reg.exec(repContent);
            while (data && argsArr.length > 0) {
                let id = Number(data[1]);
                let str = String(argsArr[id]);
                if (id >= 0 && id < argsArr.length) {
                    var idx = str.indexOf("$");
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
    static get Instance() {
        let self = this;
        if (LanguageManager._instance == null) {
            LanguageManager._instance = new LanguageManager();
        }
        return LanguageManager._instance;
    }
}
/** 语言包数据是否加载完毕 */
LanguageManager.isLanguageLoadComplete = false;
LanguageManager.isOpenLanguage = true;
//# sourceMappingURL=LanguageManager.js.map