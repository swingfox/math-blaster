var InstructionScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new InstructionLayer();
        this.addChild(layer);
    }
});


var InstructionLayer = cc.Layer.extend({
    instructionLayer:null,
	btnClose:null,
	ctor:function () {
        this._super();
        this.init();

        return true;
    },
    init:function () {
        instructionLayer = ccs.load(res.instructionLayer).node;
       	this.addChild(instructionLayer);
       	this.initializeButtons();
    },
    initializeButtons:function(){
    	btnClose = instructionLayer.getChildByName("btnBack");

    	btnClose.addTouchEventListener(this.popScene,this);
    },
    popScene:function(){
    	cc.director.popScene();
    },
});

