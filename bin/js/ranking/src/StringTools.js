var StringTools = /** @class */ (function () {
    function StringTools() {
    }
    StringTools.omitStringByByteLen = function (str, len, omitSymbol) {
        if (len === void 0) { len = 14; }
        if (omitSymbol === void 0) { omitSymbol = "..."; }
        var result = str.concat();
        var resultLen = 0;
        var lastSymbolLen = 0;
        var bytes = new Laya.Byte();
        bytes.writeUTFBytes(result);
        bytes.pos = 0;
        while (bytes.bytesAvailable) {
            var byte = bytes.readByte();
            if (byte >= 0) {
                lastSymbolLen = 1;
                resultLen++;
            }
            else {
                bytes.readByte();
                bytes.readByte();
                lastSymbolLen = 3;
                resultLen += 2;
            }
            if (resultLen >= len) {
                break;
            }
        }
        if (bytes.bytesAvailable > 0) {
            var end = bytes.length - bytes.bytesAvailable - lastSymbolLen;
            bytes.pos = 0;
            result = bytes.readUTFBytes(end) + omitSymbol;
        }
        return result;
    };
    return StringTools;
}());
//# sourceMappingURL=StringTools.js.map