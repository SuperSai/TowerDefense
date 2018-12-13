/*
* name;
*/
var LanguageManager = /** @class */ (function () {
    function LanguageManager() {
        this._languageMap = new TSDictionary();
        this._reg = new RegExp("\\{(\\d+)\\}");
    }
    /** 加载语言包配置文件 */
    LanguageManager.prototype.loadLanguage = function () {
        var self = this;
        Laya.loader.load(PathConfig.Language, Laya.Handler.create(self, function () {
            self.init(Laya.Loader.getRes(PathConfig.Language));
        }, null, true), null, Laya.Loader.TEXT);
    };
    /**
     * 初始化数据
     */
    LanguageManager.prototype.init = function (data) {
        var self = this;
        var languageArr = String(data).split("\r\n");
        if (languageArr.length) {
            for (var i = 0; i < languageArr.length; i++) {
                var obj = languageArr[i];
                if (obj == "#" || obj == "") {
                    continue;
                }
                else {
                    var strArr = obj.split(":");
                    if (self._languageMap.ContainsKey(strArr[0])) {
                        self._languageMap.Remove(strArr[0]);
                    }
                    if (strArr.length <= 2) {
                        self._languageMap.Add(strArr[0], strArr[1]);
                    }
                    else {
                        self._languageMap.Add(strArr[0], strArr.slice(1).join(""));
                    }
                }
            }
            LanguageManager.isLanguageLoadComplete = true;
        }
    };
    LanguageManager.prototype.getLanguageMapData = function () {
        var self = this;
        return self._languageMap.getValues();
    };
    LanguageManager.prototype.getLanguageById = function (key) {
        var self = this;
        return self._languageMap.TryGetValue(key);
    };
    /**
     * 设置容器语言
     * @param {Laya.Node} node
     */
    LanguageManager.prototype.setModuleLanguage = function (node) {
        var self = this;
        if (!node || node && !node.numChildren || !LanguageManager.isOpenLanguage)
            return;
        self.SearchAndModifyNodeLanguage(node);
    };
    LanguageManager.prototype.SearchAndModifyNodeLanguage = function (node) {
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
    };
    /**
    * 获取文本内容
    * @param {string} key
    * @returns {string}
    */
    LanguageManager.prototype.getLanguageText = function (key) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        var self = this;
        return self.getTranslationWithArray(key, arg);
    };
    LanguageManager.prototype.getTranslationWithArray = function (key, argsArr) {
        var self = this;
        if (self._languageMap.ContainsKey(key)) {
            return self.replaceStr(self._languageMap.TryGetValue(key), argsArr);
        }
    };
    LanguageManager.prototype.languageReplace = function (str, args) {
        var self = this;
        return self.replaceStr(str, args);
    };
    /**
     * 根据正则表达式去替换内容
     */
    LanguageManager.prototype.replaceStr = function (repContent, argsArr) {
        var self = this;
        if (argsArr && argsArr.length > 0) {
            var data = self._reg.exec(repContent);
            while (data && argsArr.length > 0) {
                var id = Number(data[1]);
                var str = String(argsArr[id]);
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
    };
    Object.defineProperty(LanguageManager, "Instance", {
        get: function () {
            var self = this;
            if (LanguageManager._instance == null) {
                LanguageManager._instance = new LanguageManager();
            }
            return LanguageManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    /** 语言包数据是否加载完毕 */
    LanguageManager.isLanguageLoadComplete = false;
    LanguageManager.isOpenLanguage = true;
    return LanguageManager;
}());
//# sourceMappingURL=LanguageManager.js.map