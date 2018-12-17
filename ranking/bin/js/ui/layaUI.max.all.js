var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var RankingUI = (function (_super) {
        __extends(RankingUI, _super);
        function RankingUI() {
            return _super.call(this) || this;
        }
        RankingUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.RankingUI.uiView);
        };
        return RankingUI;
    }(View));
    RankingUI.uiView = { "type": "View", "props": { "top": 0, "right": 0, "left": 0, "bottom": 0 }, "child": [{ "type": "View", "props": { "y": 0, "x": 0, "width": 680, "var": "mainView", "height": 960 }, "child": [{ "type": "List", "props": { "y": 248, "x": 30, "width": 643, "var": "rankingList", "spaceY": -1, "repeatY": 6, "repeatX": 1, "name": "rankingList", "height": 714 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 18, "width": 660, "visible": false, "renderType": "render", "height": 126 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "images/ranking/cell_bg_default.png", "name": "cellBar" } }, { "type": "Image", "props": { "y": 15, "x": 110, "width": 96, "skin": "images/ranking/headIcon.png", "name": "headIcon", "height": 96 } }, { "type": "Image", "props": { "y": 26, "x": 121, "width": 74, "name": "imgAvatar", "height": 74 } }, { "type": "Label", "props": { "y": 45, "x": 17, "width": 80, "text": "1", "name": "txtNo", "height": 30, "fontSize": 30, "color": "#aa540b", "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": 20, "x": 11, "visible": false, "skin": "images/ranking/icon_top_1.png", "name": "imgNo" } }, { "type": "Label", "props": { "y": 23, "x": 214, "width": 240, "text": "名字最多七个字", "name": "txtName", "height": 32, "fontSize": 32, "color": "#a17338", "bold": true, "align": "left" } }, { "type": "Image", "props": { "y": 66, "x": 216, "width": 180, "skin": "images/ranking/location_bg.png", "height": 40, "sizeGrid": "0,25,0,26" } }, { "type": "Label", "props": { "y": 72, "x": 251, "width": 96, "text": "火星", "name": "txtPosition", "height": 30, "fontSize": 24, "color": "#ffffff", "align": "left" } }, { "type": "Image", "props": { "y": 72, "x": 227, "skin": "images/ranking/location_mark.png" } }, { "type": "Label", "props": { "y": 47, "x": 468, "width": 130, "text": "0", "name": "txtScore", "fontSize": 30, "color": "#aa540b", "bold": true, "align": "center" } }] }] }, { "type": "Label", "props": { "y": 545, "x": 50, "width": 600, "visible": false, "var": "txtHint", "text": "暂无排名", "height": 80, "fontSize": 50, "color": "#ffffff", "align": "center" } }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 99, "visible": false, "var": "surpassFriendView", "renderType": "render", "name": "surpassFriendView", "height": 170, "cacheAs": "bitmap" }, "child": [{ "type": "Image", "props": { "y": 33, "x": 6, "width": 90, "skin": "images/ranking/surpass_bg.png", "name": "cellBar", "height": 110 } }, { "type": "Image", "props": { "y": 68, "x": 19, "width": 66, "name": "headIcon", "height": 66 } }, { "type": "Label", "props": { "y": 42, "x": 1, "width": 100, "text": "第1名", "strokeColor": "#3b1816", "stroke": 2, "name": "txtNo", "fontSize": 20, "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 141, "x": 3, "width": 100, "text": "即将超越", "strokeColor": "#3b1816", "stroke": 2, "name": "txtSurpass", "height": 18, "fontSize": 18, "color": "#ffffff", "align": "center" } }] }] }] };
    ui.RankingUI = RankingUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map