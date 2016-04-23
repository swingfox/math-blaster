var HomeLayer = cc.Layer.extend({
    btnPlay:null,
    btnInstruction:null,
    btnQuit:null,
    sceneHome:null,
    backgroundLayer:null,
    buttonLayer:null,   
    ctor:function () {
        this._super();
        this.init();

        return true;
    },
    init:function () {
        backgroundLayer = (ccs.load(res.homeBackgroundLayer)).node;
        buttonLayer = (ccs.load(res.homeButtonLayer)).node;
        this.initializeTouchListener();  
        this.addChild(backgroundLayer);
        this.addChild(buttonLayer);
    },
    initializeButtonLayer:function(){     
        btnPlay = buttonLayer.getChildByName("btnPlay"); 
        btnInstruction = buttonLayer.getChildByName("btnInstruction");
        btnQuit = buttonLayer.getChildByName("btnQuit");
        
    },    
    initializeTouchListener:function(){   
        this.initializeButtonLayer();       
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
                    target.setScale(0.8,0.8);
                    return true;
                }
                return false;
            },
            onTouchEnded: function (touch, event) {         
                var target = event.getCurrentTarget();
                var name = target.getName();

                target.setScale(1.0,1.0);

                if(name=="btnPlay"){
                        var difficulty = new DifficultyScene();
                        cc.director.pushScene(difficulty);
                }
                else if(name=="btnInstruction"){
                        var instruction = new InstructionScene();
                        cc.director.pushScene(instruction);
                }
            }
        });
        this.manageAllListeners(); 
    },
    manageAllListeners:function(){  
       cc.eventManager.addListener(this.touchListener.clone(),btnPlay);
       cc.eventManager.addListener(this.touchListener.clone(),btnInstruction);
       cc.eventManager.addListener(this.touchListener.clone(),btnQuit);
    }, 
    playButton:function(touch,event){
        var difficulty = new DifficultyScene();
        cc.director.pushScene(difficulty);
    },
    instructionButton:function(touch,event){
        var instruction = new InstructionScene();
        cc.director.pushScene(instruction);
    }
});

var HomeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HomeLayer();
        this.addChild(layer);
    }
});
