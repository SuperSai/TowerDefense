var PathTools = /** @class */ (function () {
    function PathTools() {
    }
    PathTools.CreateBezierPoints = function (anchorpoints, pointsAmount) {
        if (pointsAmount === void 0) { pointsAmount = 120; }
        var points = [];
        for (var i = 0; i < pointsAmount; i++) {
            var point = this.MultiPointBezier(anchorpoints, i / pointsAmount);
            points.push(point);
        }
        return points;
    };
    PathTools.MultiPointBezier = function (points, t) {
        var len = points.length;
        var x = 0;
        var y = 0;
        for (var i = 0; i < len; i++) {
            var point = points[i];
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
    };
    PathTools.erxiangshi = function (start, end) {
        var cs = 1;
        var bcs = 1;
        while (end > 0) {
            cs *= start;
            bcs *= end;
            start--;
            end--;
        }
        return cs / bcs;
    };
    return PathTools;
}());
//# sourceMappingURL=PathTools.js.map