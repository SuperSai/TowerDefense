class LoginView extends Laya.Component {
    constructor() {
        super();
        this.ui = new ui.login.LoginUI();
        this.addChild(this.ui);
        this.addEvents();
    }
    addEvents() {
        this.ui.btnSubmit.on(Laya.Event.CLICK, this, () => {
            const account = this.ui.inputAccount.text;
            const pwd = this.ui.inputPwd.text;
            if (!account || !pwd) {
                alert("帐号或密码不能为空！");
            }
            else {
                this.event(LoginView.SUBMIT, { account, pwd });
            }
        });
    }
}
LoginView.SUBMIT = "SUBMIT";
//# sourceMappingURL=LoginView.js.map