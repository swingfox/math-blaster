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
        this.initializeTouchListener();
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
        this.btnClose.addTouchEventListener(this.popScene,this);


    },    
    initializeTouchListener:function(){   

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
                    target.setScale(0.4,0.4);
                    return true;
                }
                return false;
            },
            onTouchEnded: function (touch, event) {         
                var target = event.getCurrentTarget();
                var name = target.getName();

                target.setScale(0.5,0.5);

                if(name=="btnClose"){
                    main.popScene();
                }
                else if(name=="btnAddition"){
                    main.addition();
                }
                else if(name=="btnSubtraction"){
                    main.subtraction();
                }
                else if(name=="btnMultiplication"){
                    main.multiplication();
                }
                else if(name=="btnDivision"){
                    main.division();
                }
                cc.log("TOUCH ENDED");	
            }
        });
        this.manageAllListeners(); 

        //this.btnAddition.addTouchEventListener(this.popScene,this);
    },
    addition:function(){
        cc.sys.localStorage.setItem("operation","addition");
        cc.director.pushScene(new cc.TransitionFade(0.5,new DifficultyScene()));
    },
    subtraction:function(){
        cc.sys.localStorage.setItem("operation","subtraction");
        cc.director.pushScene(new cc.TransitionFade(0.5,new DifficultyScene()));
    },
    multiplication:function(){
        cc.sys.localStorage.setItem("operation","multiplication");
        cc.director.pushScene(new cc.TransitionFade(0.5,new DifficultyScene()));
    },
    division:function(){
        cc.sys.localStorage.setItem("operation","division");
        cc.director.pushScene(new cc.TransitionFade(0.5,new DifficultyScene()));
    },
    nextScene:function(){
        cc.sys.localStorage.setItem("operation","");
        cc.director.pushScene(new cc.TransitionFade(0.5,new DifficultyScene()));
    },
    popScene:function(){
        cc.log("operation popScene");
        cc.director.popScene();
    },
    manageAllListeners:function(){  
        cc.log("btnAddition Listener: " + this.btnAddition);

//       cc.eventManager.addListener(this.touchListeners.clone(),this.btnClose);
       cc.eventManager.addListener(this.touchListeners.clone(),this.btnAddition);

       cc.eventManager.addListener(this.touchListeners.clone(),this.btnSubtraction);
       cc.eventManager.addListener(this.touchListeners.clone(),this.btnMultiplication);
       cc.eventManager.addListener(this.touchListeners.clone(),this.btnDivision);
    }
});