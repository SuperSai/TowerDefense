class TabGroup extends Laya.EventDispatcher
{
    constructor(buttons:Laya.Button[])
    {
        super();
        this._buttons = buttons;
        this.initButtons();
    }

    private _buttons:Laya.Button[];
    private _selectedIndex:number = -1;

    private initButtons():void{
        let i:number = 0;
        const len:number = this._buttons.length;
        let btn:Laya.Button;
        for ( i ; i < len ; i ++){
            btn = this._buttons[i];
            btn.on(Laya.Event.CLICK, this, this.onButtonClick);
        }
    }

    private onButtonClick(event:Laya.Event):void
    {
        const button:Laya.Button = event.target as Laya.Button;
        this._selectedIndex = this._buttons.indexOf(button);
        this.updateButtons();
    }


    private updateButtons():void{
        for (let i:number = 0; i < this._buttons.length; i++)
        {
            this._buttons[i].selected = i == this._selectedIndex;
        }
        this.event(Laya.Event.CHANGE, this._selectedIndex);
    }

    public get selectedIndex():number{
        return this._selectedIndex;
    }

    public set selectedIndex(value:number){
        if(this._selectedIndex == value)return;
        this._selectedIndex = value;
        this.updateButtons();
    }

    public getButtonByIndex(index:number):Laya.Button{
        if(this._buttons.length > index){
            return this._buttons[index];
        }
        return null;
    }
}
