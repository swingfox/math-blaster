var DifficultyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new DifficultyLayer();
        this.addChild(layer);
    }
});


var DifficultyLayer = cc.Layer.extend({
	spriteBackground:null,
	difficultyLayer:null,
	wood:null,
	btnEasy:null,
	btnAdvanced:null,
	btnDifficult:null,
	btnClose:null,
	ctor:function () {
        this._super();
        this.init();

        return true;
    },
    init:function () {
        spriteBackground = ccs.load(res.difficultyScene).node;
        difficultyLayer =  ccs.load(res.difficultyLayer).node;
       	this.addChild(spriteBackground);
       	this.addChild(difficultyLayer);
       	this.initializeButtons();
    },
    initializeButtons:function(){
    	wood = difficultyLayer.getChildByName("wood");
    	btnEasy = wood.getChildByName("btnEasy");
    	btnDifficult = wood.getChildByName("btnDifficult");
    	btnAdvanced = wood.getChildByName("btnAdvanced");
    	btnClose = wood.getChildByName("btnClose");

    	btnClose.addTouchEventListener(this.popScene,this);
    	btnEasy.addTouchEventListener(this.easyButton,this);
        btnDifficult.addTouchEventListener(this.difficultButton,this);
        btnAdvanced.addTouchEventListener(this.advancedButton,this);
    },
    popScene:function(){
    	cc.director.popScene();
    },
    easyButton:function(touch,event){
    	cc.director.pushScene(new PlayerNameScene());
    },
    difficultButton:function(touch,event){
        cc.director.pushScene(new PlayScene("DIFFICULT"));
    },
    advancedButton:function(touch,event){
        cc.director.pushScene(new PlayScene("ADVANCED"));
    }
});

