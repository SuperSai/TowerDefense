class WXSystemInfo {
    constructor() {
        this.SDKVersion = "1.0.0";
    }
    checkVersion(version) {
        if (this.SDKVersion) {
            const curr = StringUtils.splitStringToArr(this.SDKVersion, ".");
            const comp = StringUtils.splitStringToArr(version, ".");
            const len = Math.max(curr.length, comp.length);
            while (curr.length < len) {
                curr.push('0');
            }
            while (comp.length < len) {
                comp.push('0');
            }
            for (let i = 0; i < len; i++) {
                const num1 = parseInt(curr[i]);
                const num2 = parseInt(comp[i]);
                if (num1 > num2) {
                    return true;
                }
                else if (num1 < num2) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=WXSystemInfo.js.map