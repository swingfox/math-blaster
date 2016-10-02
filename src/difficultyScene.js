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
       	this.initializeTouchListener();
    },
    initializeButtons:function(){
    	wood = difficultyLayer.getChildByName("wood");
    	btnEasy = wood.getChildByName("btnEasy");
    	btnNormal = wood.getChildByName("btnNormal");
    	btnAdvanced = wood.getChildByName("btnAdvance");
    	btnClose = wood.getChildByName("btnClose");
    },    
    initializeTouchListener:function(){   
        this.initializeButtons();       
        main = this;
            this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) { 
                var target = event.getCurrentTarget();  

                var locationInNode = target.convertToNodeSpace(touch.getLocation());    
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                var name = target.getName();
                if (cc.rectContainsPoint(rect, locationInNode)) {       
                    target.setScale(0.4,0.4);
                    return true;
                }
                return false;
            },
            onTouchEnded: function (touch, event) {         
                var target = event.getCurrentTarget();
                var name = target.getName();

                target.setScale(0.5,0.5);

                if(name=="btnEasy"){
                        main.easyButton();
                }
                else if(name=="btnNormal"){
                        main.advancedButton();
                }
                else if(name=="btnAdvance"){
                        main.difficultButton();
                }
                else if(name=="btnClose"){
                        main.popScene();
                }
            }
        });
        this.manageAllListeners(); 
    },
    manageAllListeners:function(){  
       cc.eventManager.addListener(this.touchListener.clone(),btnEasy);
       cc.eventManager.addListener(this.touchListener.clone(),btnNormal);
       cc.eventManager.addListener(this.touchListener.clone(),btnAdvanced);
       cc.eventManager.addListener(this.touchListener.clone(),btnClose);
    }, 
    popScene:function(){
    	cc.director.popScene();
    },
    easyButton:function(){
    	cc.director.pushScene(new cc.TransitionFade(0.5,new PlayScene("EASY")));
    },
    difficultButton:function(){
        cc.director.pushScene(new cc.TransitionFade(0.5,new PlayScene("DIFFICULT")));
    },
    advancedButton:function(){
        cc.director.pushScene(new cc.TransitionFade(0.5,new PlayScene("ADVANCED")));
    }
});

