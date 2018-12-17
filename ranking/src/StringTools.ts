class StringTools {
    public static omitStringByByteLen(str:string, len:number = 14, omitSymbol:string = "..."):string{
        let result:string = str.concat();
        let resultLen:number = 0;
        let lastSymbolLen:number = 0;
        const bytes:Laya.Byte = new Laya.Byte();
        bytes.writeUTFBytes(result);
        bytes.pos = 0;
        while(bytes.bytesAvailable){
            const byte:number = bytes.readByte();
            if(byte >= 0){
                lastSymbolLen = 1;
                resultLen ++;
            } else {
                bytes.readByte();
                bytes.readByte();
                lastSymbolLen = 3;
                resultLen += 2;
            }
            if(resultLen >= len){
                break;
            }
        }
        if(bytes.bytesAvailable > 0){
            const end:number = bytes.length - bytes.bytesAvailable - lastSymbolLen;
            bytes.pos = 0;
            result = bytes.readUTFBytes(end) + omitSymbol;
        }
        return result;
    }
}
