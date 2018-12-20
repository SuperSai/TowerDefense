var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LoginView = /** @class */ (function (_super) {
    __extends(LoginView, _super);
    function LoginView() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.login.LoginUI();
        _this.addChild(_this.ui);
        _this.addEvents();
        return _this;
    }
    LoginView.prototype.addEvents = function () {
        var _this = this;
        this.ui.btnSubmit.on(Laya.Event.CLICK, this, function () {
            var account = _this.ui.inputAccount.text;
            var pwd = _this.ui.inputPwd.text;
            if (!account || !pwd) {
                alert("帐号或密码不能为空！");
            }
            else {
                _this.event(LoginView.SUBMIT, { account: account, pwd: pwd });
            }
        });
    };
    LoginView.SUBMIT = "SUBMIT";
    return LoginView;
}(Laya.Component));
//# sourceMappingURL=LoginView.js.map