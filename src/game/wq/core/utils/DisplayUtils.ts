/*
* 显示对象工具类;
*/
class DisplayUtils {
    constructor() {

    }

    static mouseEnabled(display: Sprite, value: boolean): void {
        display.mouseEnabled = value;
        if (display.numChildren > 0) {
            for (let child of display._childs) {
                this.mouseEnabled(child, value);
            }
        }
    }

    /** 设置滤镜变灰 */
    static setFilters(component: Laya.Sprite): void {
        if (component) {
            //颜色矩阵数组
            var colorMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new Laya.ColorFilter(colorMatrix);
            component.filters = [colorFlilter];
        }
    }

    /** 颜色滤镜 */
    static createColorFilter(index: number = 0): Array<Laya.ColorFilter> {
        if (index == 1) {
            //变暗
            var colorV = 0.6;
            var colorMat =
                [
                    colorV, 0, 0, 0, 0, //R
                    0, colorV, 0, 0, 0, //G
                    0, 0, colorV, 0, 0, //B
                    0, 0, 0, 1, 0, //A
                ];
            //创建一个颜色滤镜对象
            var colorFilter = new Laya.ColorFilter(colorMat);
            return [colorFilter];
        } else if (index == 2) {
            //变黑
            var colorV = 0.6;
            var colorMat =
                [
                    0, 0, 0, 0, 0, //R
                    0, 0, 0, 0, 0, //G
                    0, 0, 0, 0, 0, //B
                    0, 0, 0, 1, 0, //A
                ];
            //创建一个颜色滤镜对象
            var colorFilter = new Laya.ColorFilter(colorMat);
            return [colorFilter];
        }
        return [];
    }

    /**
     * 设置文本颜色
     * @param component 字体
     * @param flag true 有钱的颜色  false 没钱的颜色
     */
    static setLabelColor(component: Laya.Label, flag: boolean): void {
        if (component) {
            if (flag) {
                component.color = "#FFFFFF";
            } else {
                component.color = "#FF802C";
            }
        }
    }

    static removeFromArray(target: any, array: any[]): any[] {
        let index = array.indexOf(target);
        if (index >= 0) array.splice(index, 1);
        return array;
    }

    /**
     * 从父级移除child
     * @param child
     */
    static removeFromParent(child: Laya.Node) {
        if (!child) return;
        if (child.parent) {
            child.parent.removeChild(child);
        }
        child = null;
    }

    /** 移除所有子对象并回收 */
    static removeAllChildren(container: any): void {
        if (!container) return;
        if (container && container.numChildren) {
            while (container.numChildren) {
                var node: any = container.getChildAt(0);
                if (node) {
                    if (node.parent) {
                        node.parent.removeChild(node);
                        ObjectPool.push(node);
                    }
                    node = null;
                }
            }
        }
    }
}