class WXSystemInfo {
    public SDKVersion: string;

    public canUseVersion(version: string): boolean {
        if (this.SDKVersion) {
            const curr: string[] = StringUtils.splitStringToArr(this.SDKVersion, ".");
            const comp: string[] = StringUtils.splitStringToArr(version, ".");

            if (parseInt(curr[0], 0) > parseInt(comp[0], 0)) {
                return true;
            } else {
                if (parseInt(curr[1], 0) >= parseInt(comp[1], 0)) {
                    return true;
                } else {
                    if (parseInt(curr[2], 0) >= parseInt(comp[2], 0)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}