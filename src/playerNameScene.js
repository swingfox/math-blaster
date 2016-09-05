var PlayerNameScene = cc.Scene.extend({
    onEnter:function(){
    	this._super();
        var layer = new PlayerNameLayer();
        this.addChild(layer);
    }
});

var PlayerNameLayer = cc.Layer.extend({
	playerName:null,
	name:null,
	ctor:function(){
		this._super(); 
		this.init();  
		return true; 
    },
    init:function(){
   // 	this.playerNameLayer = ccs.load(res.playerNameLayer).node;
    	this.playerNameScene = ccs.load(res.playerNameScene).node;

    	this.addChild(this.playerNameScene,20);

    	this.playerNameLayer = this.playerNameScene.getChildByName("playerNameLayer");

    //	this.addChild(this.playerNameLayer,50);
    	this.textField = new ccui.TextField();
		this.textField.setTouchEnabled(true);
		this.textField.fontName = "Deanna";
		this.textField.placeHolder = "YOUR NAME";
		this.textField.fontSize = 76;	
	//	this.textField.setTextColor();
		this.textField.x = 480;
		this.textField.y = 300;
		this.textField.setLocalZOrder(100);
		this.textField.setMaxLengthEnabled(true);
		this.textField.setMaxLength(7);
		this.textField.addEventListener(this.textFieldEvent,this);
		this.addChild(this.textField);

		this.btnNext = this.playerNameLayer.getChildByName("btnNext");
		this.btnNext.addTouchEventListener(this.play);
    },
	textFieldEvent:function(sender,type){
		switch(type){
			case ccui.TextField.EVENT_ATTACH_WITH_IME:
			cc.log("Activate");
			this.textField.string = "";
			break;
			case ccui.TextField.EVENT_DETACH_WITH_IME:
			cc.log("Deactivate");

			break;
			case ccui.TextField.EVENT_INSERT_TEXT:
			this.playerName = this.textField.string;
			cc.sys.localStorage.setItem("playerName",this.playerName);
			cc.log(this.playerName);

			break;
			case ccui.TextField.EVENT_DELETE_BACKWARD:
			this.playerName = this.textField.string;
			cc.sys.localStorage.setItem("playerName",this.playerName);
			cc.log(this.playerName);
			break;
		}
	},
	play:function(){
		cc.log("player name: " + this.playerName);
		//cc.sys.localStorage.setItem("playerName",this.playerName);
		cc.director.pushScene(new PlayScene("EASY"));
	}
});