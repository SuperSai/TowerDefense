/**
 * CSV解析类
 */
class CSVParser {
    //用json替换csv,json解析文件
    static ParseJsonData(infoClass, sourceText) {
        let self = this;
        var result = new TSDictionary();
        sourceText = sourceText.trim();
        let obj = JSON.parse(sourceText);
        var keyList = null;
        var typeList = null;
        var dataList = null;
        var itemList = null;
        keyList = obj.titles;
        if (obj.data == null)
            return result; //空表不做处理
        dataList = obj.data; //数据是从0开始
        typeList = dataList[0];
        var i = 0;
        var dataLen = dataList.length;
        for (i = 0; i < dataLen; i++) {
            var record = new infoClass();
            itemList = dataList[i];
            self.ParseRecord(keyList, itemList, record);
            result.Add(parseInt(itemList[0]), record);
        }
        sourceText = null;
        return result;
    }
    static ParseRecord(keyList, itemList, record) {
        let self = this;
        var n = itemList.length;
        for (var i = 0; i < n; i++) {
            record[keyList[i]] = itemList[i];
        }
    }
}
//# sourceMappingURL=CSVParser.js.map