class WXSystemInfo {
    public SDKVersion: string = "1.0.0";

    public checkVersion(version: string): boolean {
        if (this.SDKVersion) {
            let curr: string[] = StringUtils.splitStringToArr(this.SDKVersion, ".");
            let comp: string[] = StringUtils.splitStringToArr(version, ".");
            let len = Math.max(curr.length, comp.length);

            while (curr.length < len) {
                curr.push('0')
            }
            while (comp.length < len) {
                comp.push('0')
            }

            for (let i = 0; i < len; i++) {
                let num1 = parseInt(curr[i]);
                let num2 = parseInt(comp[i]);
                if (num1 > num2) {
                    return true;
                } else if (num1 < num2) {
                    return false;
                }
            }
            return true
        }
        return false;
    }
}