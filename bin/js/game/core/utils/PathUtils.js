class PathUtils {
    static CreateBezierPoints(anchorpoints, pointsAmount = 120) {
        const points = [];
        for (let i = 0; i < pointsAmount; i++) {
            const point = this.MultiPointBezier(anchorpoints, i / pointsAmount);
            points.push(point);
        }
        return points;
    }
    static MultiPointBezier(points, t) {
        const len = points.length;
        let x = 0;
        let y = 0;
        for (let i = 0; i < len; i++) {
            const point = points[i];
            x +=
                point.x *
                    Math.pow(1 - t, len - 1 - i) *
                    Math.pow(t, i) *
                    this.erxiangshi(len - 1, i);
            y +=
                point.y *
                    Math.pow(1 - t, len - 1 - i) *
                    Math.pow(t, i) *
                    this.erxiangshi(len - 1, i);
        }
        return new Point(x, y);
    }
    static erxiangshi(start, end) {
        let cs = 1;
        let bcs = 1;
        while (end > 0) {
            cs *= start;
            bcs *= end;
            start--;
            end--;
        }
        return cs / bcs;
    }
}
//# sourceMappingURL=PathUtils.js.map