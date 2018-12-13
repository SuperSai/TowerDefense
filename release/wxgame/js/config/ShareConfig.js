/*
* terry 2018/7/18;
* 分享文案配置
*/
var ShareConfig = [
    {
        "id": 1,
        "title": "分享",
        "content": "男子豪车无数，相亲女子却还要嫌弃！原因是…",
        "imageUrl": "images/share/share1.jpg"
    },
    {
        "id": 2,
        "title": "分享",
        "content": "风里，雨里，我在秋名山等你！",
        "imageUrl": "images/share/share2.jpg"
    },
    {
        "id": 3,
        "title": "分享",
        "content": "@所有人 出售家传名画—三英战吕布，价高者得！",
        "imageUrl": "images/share/share3.jpg"
    },
];
//获取分享配置
var shareReord = {};
var getShareConfig = function (_id) {
    if (shareReord[_id]) {
        return shareReord[_id]; //查询优化
    }
    for (var key in ShareConfig) {
        if (ShareConfig.hasOwnProperty(key)) {
            var element = ShareConfig[key];
            if (element.id == _id) {
                shareReord[_id] = element;
                return element;
            }
        }
    }
    return null;
};
//获取随机分享配置
var getRandShareConfig = function () {
    var randShareId = 1 + Math.floor(Math.random() * 10) % 3;
    console.log("share id ", randShareId);
    return getShareConfig(randShareId);
};
//# sourceMappingURL=ShareConfig.js.map