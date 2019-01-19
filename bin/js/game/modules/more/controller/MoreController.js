class MoreController extends Laya.EventDispatcher {
    static getInstance() {
        if (!this._instance) {
            this._instance = new MoreController();
        }
        return this._instance;
    }
    get model() {
        return this._model;
    }
    get noQuestMarket() {
        return this._noQuestMarket;
    }
    /** 本次登录后是否曾经打开 */
    get openedOnce() {
        return this._openedOnce;
    }
    constructor() {
        super();
        this.init();
    }
    init() {
        this._model = new MoreModel();
        this.addEvents();
        // 不是用任务集市的时候设置为true
        this._noQuestMarket = true;
    }
    addEvents() {
    }
    show() {
        if (this._view) {
            this._openedOnce = true;
            if (this._noQuestMarket) {
                this._noQuestMarketNavi();
            }
            else {
                xiaoduo.wxQuestMarket.requestQuestList({ success: (list) => {
                        this.event(MoreEvent.QUEST_MARKET_QUEST_LIST, [list]);
                    } });
            }
            M.layer.frameLayer.addChildWithMaskCall(this._view, this._view.removeSelf);
            Laya.timer.once(5 * Time.MIN_IN_MILI, this, this._showRemindHit);
        }
        else {
            const assets = [
                { url: "res/atlas/images/more.atlas", type: Laya.Loader.ATLAS }
            ];
            EffectUtils.showWaitEffect();
            Laya.loader.load(assets, Handler.create(this, () => {
                EffectUtils.stopWaitEffect();
                this._view = new MoreView(this, this._model);
                this.show();
            }));
        }
    }
    switchMute() {
        this._model.mute = !this._model.mute;
        this.applyMute(this._model.mute);
    }
    applyMute(mute) {
        if (!mute) {
            mute = this._model.mute;
        }
        Laya.SoundManager.musicMuted = mute;
        Laya.SoundManager.soundMuted = mute;
        if (!mute) {
            if (!this._bgChannel) {
                Laya.loader.load("musics/bgmusic.mp3", Laya.Handler.create(this, () => {
                    this._bgChannel = Laya.SoundManager.playMusic("musics/bgmusic.mp3", 0);
                    M.event.on(EventsType.BACK_GAME, this, this.applyMute);
                }));
            }
            else {
                this._bgChannel.play();
            }
        }
    }
    _noQuestMarketNavi() {
        const list = [
            {
                appName: "宝石俄罗斯方块",
                appId: "wx9daa52931f687adc",
                pageQuery: "/pages/index/index?source=yxtz",
                appIconUrl: PathConfig.RES_URL + "images/more/app_icon_bselsfk.png?v=" + Math.random(),
                questTargets: [
                    {
                        desc: "俄罗斯方块还有这种操作！？"
                    }
                ]
            },
            {
                appName: "怪兽连一连",
                appId: "wx94b4dad34766ec40",
                pageQuery: "/pages/index/index?source=yxtz",
                appIconUrl: PathConfig.RES_URL + "images/more/app_icon_gslyl.png?v=" + Math.random(),
                questTargets: [
                    {
                        desc: "小学生的作业你可能不会做！"
                    }
                ]
            },
            {
                appName: "鱼吃鱼",
                appId: "wxdd8545bd4910b134",
                pageQuery: "/pages/index/index",
                appIconUrl: PathConfig.RES_URL + "images/more/app_icon_ycy.png?v=" + Math.random(),
            },
            {
                appName: "经典雷电",
                appId: "wx5bf2e598a2acbb50",
                pageQuery: "/pages/index/index?originate=yxtz ",
                appIconUrl: PathConfig.RES_URL + "images/more/app_icon_jdld2.jpg?v=" + Math.random(),
                questTargets: [
                    {
                        desc: "好友都上天了，就差你！"
                    }
                ]
            },
            {
                appName: "全民爱消除",
                appId: "wx06f4827d100da314",
                pageQuery: "/pages/index/index?originate=yxtz",
                appIconUrl: PathConfig.RES_URL + "images/more/app_icon_qmaxc.png?v=" + Math.random(),
                questTargets: [
                    {
                        desc: "还在玩消消乐吗？"
                    },
                    {
                        desc: "试试这款不一样的消除！"
                    }
                ]
            },
            {
                appName: "吃个萌萌",
                appId: "wx5be8ad65c7c3dd03",
                pageQuery: "/pages/index/index?originate=yxtz",
                appIconUrl: PathConfig.RES_URL + "images/more/app_icon_cgmm.jpg?v=" + Math.random(),
                questTargets: [
                    {
                        desc: "忍心的话就把我吃掉，哼！"
                    }
                ]
            },
            {
                appName: "欢乐挪车",
                appId: "wx4397a973f1e05535",
                pageQuery: "/pages/index/index",
                appIconUrl: PathConfig.RES_URL + "images/more/app_icon_hlnc.gif?v=" + Math.random(),
                questTargets: [
                    {
                        desc: "帮女司机挪下车吧！受不了了！"
                    }
                ]
            }
        ];
        this.event(MoreEvent.QUEST_MARKET_QUEST_LIST, [list]);
    }
    _showRemindHit() {
        this._openedOnce = false;
        M.hall.resolveMoreRedPoint();
    }
}
//# sourceMappingURL=MoreController.js.map