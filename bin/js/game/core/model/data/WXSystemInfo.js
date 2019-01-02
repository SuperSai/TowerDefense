class WXSystemInfo {
    constructor() {
        this.SDKVersion = "1.0.0";
    }
    canUseVersion(version) {
        if (this.SDKVersion) {
            const curr = StringUtils.splitStringToArr(this.SDKVersion, ".");
            const comp = StringUtils.splitStringToArr(version, ".");
            if (parseInt(curr[0], 0) > parseInt(comp[0], 0)) {
                return true;
            }
            else {
                if (parseInt(curr[1], 0) >= parseInt(comp[1], 0)) {
                    return true;
                }
                else {
                    if (parseInt(curr[2], 0) >= parseInt(comp[2], 0)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
//# sourceMappingURL=WXSystemInfo.js.map