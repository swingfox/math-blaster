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
    initializeTouchListener:function(){     // start of function initializeTouchListener
        this.initializeButtonLayer();       // initialize the Button Layer
        //Create a "one by one" touch event listener (processes one touch at a time)
            this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //onTouchBegan event callback function                      
            onTouchBegan: function (touch, event) { 
                // event.getCurrentTarget() returns the *listener's* sceneGraphPriority node.   
                var target = event.getCurrentTarget();  

                //Get the position of the current point relative to the button
                var locationInNode = target.convertToNodeSpace(touch.getLocation());    
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                var name = target.getName();
                //Check the click area
                if (cc.rectContainsPoint(rect, locationInNode)) {       
                    target.setScale(0.8,0.8);
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {         
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
            //    target.x += delta.x;
            //    target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {         
                var target = event.getCurrentTarget();
                var name = target.getName();
                cc.log("sprite onTouchesEnded.. ");

              //  target.setOpacity(255);
              target.setScale(1.0,1.0);

                if(name=="btnPlay"){
                        var difficulty = new DifficultyScene();
                        cc.director.pushScene(difficulty);
                }
                else if(name=="btnInstruction"){
                        var instruction = new InstructionScene();
                        cc.director.pushScene(instruction);
                }
                else if(name=="btnQuit"){

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
    },
    quitButton:function(touch,event){
    }
    
});

var HomeScene = cc.Scene.extend({
    ctor:function(){
        this._super();
        cc.log("HOME CTOR");
    },
    onEnter:function () {
        this._super();
        cc.log("HOME onEnter");
        var layer = new HomeLayer();
        this.addChild(layer);
    }
});

var BlackScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var blank = (ccs.load(res.scene)).node;
        this.addChild(blank);
    }
});

