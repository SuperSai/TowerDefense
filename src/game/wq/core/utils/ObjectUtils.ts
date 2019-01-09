
class ObjectUtils {

    /** 替换数组中的数据 */
    public static replaceItemToArray(array: any[], inde: number, item: any) {
        array.splice(inde, 1, item);
    }

    /** 把数据转换成一个Point */
    public static converToPoint(value: any, separater: string = ","): Laya.Point {
        if (value == null) return null;
        let sValue: string[] = String(value).split(separater);
        return new Laya.Point(parseFloat(sValue[0]), parseFloat(sValue[1]));
    }

    /** 把数据转换成number数组 */
    public static splitToNumber(value, sprelator: string = ","): number[] {
        let result: number[] = [];
        let sArray: string[] = value.split(sprelator);
        for (let i: number = 0; i < sArray.length; i++) {
            result.push(parseInt(sArray[i]));
        }
        return result;
    }

    /** 把字符串转换成一个数组 */
    public static splitToString(value, sprelator: string = ","): any[] {
        let result: string[] = [];
        let sArray: string[] = value.split(sprelator);
        for (let i: number = 0; i < sArray.length; i++) {
            result.push(sArray[i]);
        }
        return result;
    }

    /** 把数据转换成Point的数组 */
    public static splitToPoints(value: any, separater: string = "#"): Laya.Point[] {
        if (value == null) return [];
        let points: Laya.Point[] = [];
        let sValue: string[] = ObjectUtils.splitToString(value);
        for (let i: number = 0; i < sValue.length; i++) {
            points.push(ObjectUtils.converToPoint(sValue[i]));
        }
        return points;
    }

    /** 移除数组中的指定元素 */
    public static removeFromArray(target: any, array: any[]): any[] {
        let index = array.indexOf(target);
        if (index >= 0) array.splice(index, 1);
        return array;
    }

    /** 深度复制 */
    public static copyDataHandler(obj: any): any {
        var newObj;
        if (obj instanceof Array) {
            newObj = [];
        }
        else if (obj instanceof Object) {
            newObj = {};
        }
        else {
            return obj;
        }
        var keys = Object.keys(obj);
        for (var i: number = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            newObj[key] = this.copyDataHandler(obj[key]);
        }
        return newObj;
    }

    /**
     * 拷贝数据
     * @param newObj  需要赋值的对象
     * @param oldData  拥有数据的对象
     */
    public static copyData(newObj: Object, oldData: Object): void {
        if (oldData == null) return;
        for (let key in newObj) {
            if (key == "__class__") continue;
            if (key == "__types__") continue;
            const attrValue = oldData[key];
            if (attrValue != undefined) {
                newObj[key] = oldData[key];
            }
        }
    }

    static assign(target:any, source:any, useTargetKeys?:boolean):void{
        if(target && source){
            if(useTargetKeys){
                for(const key in target){
                    target[key] = source[key];
                }
            } else {
                for(const key in source){
                    target[key] = source[key];
                }
            }
        }
    }

    public static shuffle(arr: any[]): void {
        let len: number = arr.length;
        let i: number = len;
        while (i--) {
            let ran: number = Math.floor(Math.random() * len);
            if (i != ran) {
                let tem: any = arr[i];
                arr[i] = arr[ran];
                arr[ran] = tem;
            }
        }
    }

    /** 点是否在区域中 */
    public static pointIsInArea(rect: Laya.Rectangle, x: number, y: number): boolean {
        return rect.contains(x, y);
    }

    /** 是否被点击 */
    public static isHit(_checkSprite: Laya.Sprite, _extW: number = 0, _extH: number = 0) {
        if (_checkSprite) {
            let touchPos: Laya.Point = _checkSprite.getMousePoint();
            let touchArea: Laya.Rectangle = new Laya.Rectangle(0 - _extW / 2, 0 - _extH / 2,
                _checkSprite.width + _extW, _checkSprite.height + _extH);
            return touchArea.contains(touchPos.x, touchPos.y);
        }
        return false;
    }

    /** 求2对象之间的角度 */
    public static getAngle(starPos: Laya.Point, endPos: Laya.Point): number {
        let vx = starPos.x - endPos.x;
        let vy = starPos.y - endPos.y;
        let hyp = Math.sqrt(Math.pow(vy, 2) + Math.pow(vx, 2));
        let rad = Math.acos(vy / hyp);
        let deg = 180 / (Math.PI / rad);
        //得到了一个角度“rad”，不过是以弧度为单位的
        //把它转换成角度 
        if (vx < 0) {
            deg = (-deg);
        } else if ((vx == 0) && (vy < 0)) {
            deg = 180;
        }
        return 180 - deg;
    }

}