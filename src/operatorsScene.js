var OperatorScene = cc.Scene.extend({
    onEnter:function(){
    	this._super();
        var layer = new OperatorLayer();
        this.addChild(layer);
    }
});

var OperatorLayer = cc.Layer.extend({
	ctor:function(){
		this._super();   
		this.init();
		return true; 
    }, 
    init:function(){
    	this.operationLayer = ccs.load(res.operationLayer).node;
        this.operationScene =  ccs.load(res.operationScene).node;
        this.initializeButtonScene();
      	this.addChild(this.operationScene,20);
       	this.addChild(this.operationLayer,51);

    },
    initializeButtonScene:function(){     
        this.wood = this.operationLayer.getChildByName("wood");
        this.btnClose = this.wood.getChildByName("btnClose"); 

        this.btnAddition = this.wood.getChildByName("btnAddition"); 
        this.btnSubtraction = this.wood.getChildByName("btnSubtraction");
        this.btnMultiplication = this.wood.getChildByName("btnMultiplication");
        this.btnDivision = this.wood.getChildByName("btnDivision");
        this.btnAddition.setLocalZOrder(51);
        this.btnSubtraction.setLocalZOrder(51);

        this.btnMultiplication.setLocalZOrder(51);

        this.btnDivision.setLocalZOrder(51);


        cc.log("btnAddition: " + this.btnAddition);
        this.btnAddition.addTouchEventListener(this.nextScene,this);
        this.btnSubtraction.addTouchEventListener(this.nextScene,this);

        this.btnMultiplication.addTouchEventListener(this.nextScene,this);

        this.btnDivision.addTouchEventListener(this.nextScene,this);
        

    },    
    initializeTouchListener:function(){   
        cc.log("initializeTouchListener: ");

        this.initializeButtonScene(); 
        var main = this;   
        this.touchListeners = cc.EventListener.create({
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

                if(name=="btnAddition"){
                     //   var difficulty = new OperatorScene();
                     //   cc.director.pushScene(difficulty);
                }
                else if(name=="btnInstruction"){
                     //   var instruction = new InstructionScene();
                     //   cc.director.pushScene(instruction);
                }
                cc.log("TOUCH ENDED");	
            }
        });
        this.manageAllListeners(); 

        //this.btnAddition.addTouchEventListener(this.popScene,this);
    },
    nextScene:function(){
    	cc.log("NAKASUD");
        cc.director.pushScene(new DifficultyScene());
    },
    manageAllListeners:function(){  
        cc.log("btnAddition Listener: " + this.btnAddition);

       cc.eventManager.addListener(this.touchListeners.clone(),this.btnClose);
       cc.eventManager.addListener(this.touchListeners.clone(),this.btnAddition);

       cc.eventManager.addListener(this.touchListeners.clone(),this.btnSubtraction);
       cc.eventManager.addListener(this.touchListeners.clone(),this.btnMultiplication);
       cc.eventManager.addListener(this.touchListeners.clone(),this.btnDivision);
    }
});