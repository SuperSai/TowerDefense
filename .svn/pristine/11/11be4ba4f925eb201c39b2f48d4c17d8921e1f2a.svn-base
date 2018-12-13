/*
* 动画工具类;
*/
var AnimationUtils = /** @class */ (function () {
    function AnimationUtils() {
    }
    /** 锁定按钮n帧 */
    AnimationUtils.lockBtnStage = function (_btn, _delay) {
        if (_delay === void 0) { _delay = 10; }
        _btn.mouseEnabled = false;
        _btn.frameOnce(_delay, _btn, function () {
            _btn.mouseEnabled = true;
        });
    };
    /** 动画url数组 */
    AnimationUtils.aniUrls = function (_aniName, _frameCount, _url, _isReverse) {
        if (_url === void 0) { _url = ''; }
        if (_isReverse === void 0) { _isReverse = false; }
        var urls = [];
        for (var i = 0; i < _frameCount; i++) {
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push(_url + _aniName + (i + 1) + ".png");
        }
        if (_isReverse) {
            urls = urls.concat([].concat(urls).reverse());
        }
        return urls;
    };
    /** 英雄动画url数组 */
    AnimationUtils.heroAniUrls = function (aniName, startCount, endCount, url, isReverse) {
        if (url === void 0) { url = ''; }
        if (isReverse === void 0) { isReverse = false; }
        var urls = [];
        //动画资源路径要和动画图集打包前的资源命名对应起来
        for (var i = startCount; i < endCount; i++) {
            urls.push(url + aniName + (i + 1) + ".png");
        }
        if (isReverse) {
            urls = urls.concat([].concat(urls).reverse());
        }
        return urls;
    };
    return AnimationUtils;
}());
//# sourceMappingURL=AnimationUtils.js.map