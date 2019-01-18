/*
* 动画工具类;
*/
class AnimationUtils {
    /** 锁定按钮n帧 */
    static lockBtnStage(_btn, _delay = 10) {
        _btn.mouseEnabled = false;
        _btn.frameOnce(_delay, _btn, () => {
            _btn.mouseEnabled = true;
        });
    }
    /** 动画url数组 */
    static aniUrls(_aniName, _frameCount, _url = '', _isReverse = false) {
        let urls = [];
        for (let i = 0; i < _frameCount; i++) {
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push(_url + _aniName + (i + 1) + ".png");
        }
        if (_isReverse) {
            urls = urls.concat([].concat(urls).splice(0, 1).reverse().splice(0, 1));
        }
        return urls;
    }
    /** 英雄动画url数组 */
    static heroAniUrls(aniName, startCount, endCount, url = '', isReverse = false) {
        let urls = [];
        //动画资源路径要和动画图集打包前的资源命名对应起来
        for (let i = startCount; i < endCount; i++) {
            urls.push(url + aniName + (i + 1) + ".png");
        }
        if (isReverse) {
            urls = urls.concat([].concat(urls).reverse());
        }
        return urls;
    }
}
//# sourceMappingURL=AnimationUtils.js.map