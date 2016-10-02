var ScoreboardScene = cc.Scene.extend({
    onEnter:function(){
    	this._super();
        var layer = new ScoreboardLayer();
        this.addChild(layer);
    }
});

var ScoreboardLayer = cc.Layer.extend({
	ctor:function(){
		this._super(); 
		this.init();  
		return true; 
    },
    init:function(){
    	scoreboard = ccs.load(res.scoreboardScene).node;
    	scoreboardLayer = ccs.load(res.scoreboardLayer).node;
    	cc.log("SCOREBOARD INIT");

    	this.initializeTouchListener();

    	this.initializeTextViews();

    	this.checkTextViewsIfNull();
    	this.loadPlayers();

    	this.addChild(scoreboardLayer,51);
    	this.addChild(scoreboard,50);
    },
    initializeButtonLayer:function(){  
    	btnEasy = scoreboardLayer.getChildByName("btnEasy");
    	btnNormal = scoreboardLayer.getChildByName("btnNormal");
    	btnAdvanced = scoreboardLayer.getChildByName("btnAdvance");

    	btnBack = scoreboardLayer.getChildByName("btnBack");   
    },    
    initializeTouchListener:function(){   
        this.initializeButtonLayer();       

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

                target.setScale(0.55,0.55);

                if(name=="btnEasy"){
                    main.initializeEasyTextViews();
                }
                else if(name=="btnNormal"){
                	main.initializeNormalTextViews();
                }
                else if(name=="btnAdvance"){
                	main.initializeAdvancedTextViews();
                }
                else if(name=="btnBack"){
                	main.goBack();
                }
            }
        });
        this.manageAllListeners(); 
    },
    manageAllListeners:function(){  
       cc.eventManager.addListener(this.touchListener.clone(),btnEasy);
       cc.eventManager.addListener(this.touchListener.clone(),btnNormal);
       cc.eventManager.addListener(this.touchListener.clone(),btnAdvanced);
       cc.eventManager.addListener(this.touchListener.clone(),btnBack);
    },
	goBack:function(){
		cc.director.popScene();
	},
	initializeEasyTextViews:function(){
		this.clearTextViews();
		this.loadPlayers();
	},
	initializeNormalTextViews:function(){
		var storage = cc.sys.localStorage;
		this.clearTextViews();
		txtPlayerOne.setString(storage.getItem("normalTxtPlayerOne"));
		txtPlayerTwo.setString(storage.getItem("normalTxtPlayerTwo"));
		txtPlayerThree.setString(storage.getItem("normalTxtPlayerThree"));

		txtScoreOne.setString(storage.getItem("normalTxtScoreOne"));
		txtScoreTwo.setString(storage.getItem("normalTxtScoreTwo"));
		txtScoreThree.setString(storage.getItem("normalTxtScoreThree"));


		txtOperationOne.setString(storage.getItem("normalTxtOperationOne"));
		txtOperationTwo.setString(storage.getItem("normalTxtOperationTwo"));
		txtOperationThree.setString(storage.getItem("normalTxtOperationThree"));

	},
	initializeAdvancedTextViews:function(){
		var storage = cc.sys.localStorage;
		this.clearTextViews();
		txtPlayerOne.setString(storage.getItem("advancedTxtPlayerOne"));
		txtPlayerTwo.setString(storage.getItem("advancedTxtPlayerTwo"));
		txtPlayerThree.setString(storage.getItem("advancedTxtPlayerThree"));

		txtScoreOne.setString(storage.getItem("advancedTxtScoreOne"));
		txtScoreTwo.setString(storage.getItem("advancedTxtScoreTwo"));
		txtScoreThree.setString(storage.getItem("advancedTxtScoreThree"));


		txtOperationOne.setString(storage.getItem("advancedTxtOperationOne"));
		txtOperationTwo.setString(storage.getItem("advancedTxtOperationTwo"));
		txtOperationThree.setString(storage.getItem("advancedTxtOperationThree"));

	},
	initializeTextViews:function(){
		txtPlayerOne = scoreboardLayer.getChildByName("txtPlayerOne");
    	txtPlayerTwo = scoreboardLayer.getChildByName("txtPlayerTwo");
    	txtPlayerThree = scoreboardLayer.getChildByName("txtPlayerThree");

    	txtScoreOne = scoreboardLayer.getChildByName("txtScoreOne");
    	txtScoreTwo = scoreboardLayer.getChildByName("txtScoreTwo");
    	txtScoreThree = scoreboardLayer.getChildByName("txtScoreThree");

    	txtOperationOne = scoreboardLayer.getChildByName("txtOperationOne");
    	txtOperationTwo = scoreboardLayer.getChildByName("txtOperationTwo");
    	txtOperationThree = scoreboardLayer.getChildByName("txtOperationThree");
	},
	clearTextViews:function(){
		txtPlayerOne.setString("");
    	txtPlayerTwo.setString("");
    	txtPlayerThree.setString("");

    	txtScoreOne.setString("");
    	txtScoreTwo.setString("");
    	txtScoreThree.setString("");

    	txtOperationOne.setString("");
    	txtOperationTwo.setString("");
    	txtOperationThree.setString("");
	},
	checkTextViewsIfNull:function(){
		var storage = cc.sys.localStorage;
            if(storage.getItem("easyTxtPlayerOne")==null)
                storage.setItem("easyTxtPlayerOne","");
            if(storage.getItem("easyTxtPlayerTwo")==null)
                storage.setItem("easyTxtPlayerTwo","");
            if(storage.getItem("easyTxtPlayerThree")==null)
                storage.setItem("easyTxtPlayerThree","");

            if(storage.getItem("easyTxtScoreOne")==null)
                storage.setItem("easyTxtScoreOne","");
            if(storage.getItem("easyTxtScoreTwo")==null)
                storage.setItem("easyTxtScoreTwo","");
            if(storage.getItem("easyTxtScoreThree")==null)
                storage.setItem("easyTxtScoreThree","");

            if(storage.getItem("easyTxtOperationOne")==null)
                storage.setItem("easyTxtOperationOne","");
            if(storage.getItem("easyTxtOperationTwo")==null)
                storage.setItem("easyTxtOperationTwo","");
            if(storage.getItem("easyTxtOperationThree")==null)
                storage.setItem("easyTxtOperationThree","");
    
            if(storage.getItem("normalTxtPlayerOne")==null)
                storage.setItem("normalTxtPlayerOne","");
            if(storage.getItem("normalTxtPlayerTwo")==null)
                storage.setItem("normalTxtPlayerTwo","");
            if(storage.getItem("normalTxtPlayerThree")==null)
                storage.setItem("normalTxtPlayerThree","");

            if(storage.getItem("normalTxtScoreOne")==null)
                storage.setItem("normalTxtScoreOne","");
            if(storage.getItem("normalTxtScoreTwo")==null)
                storage.setItem("normalTxtScoreTwo","");
            if(storage.getItem("normalTxtScoreThree")==null)
                storage.setItem("normalTxtScoreThree","");

            if(storage.getItem("normalTxtOperationOne")==null)
                storage.setItem("normalTxtOperationOne","");
            if(storage.getItem("normalTxtOperationTwo")==null)
                storage.setItem("normalTxtOperationTwo","");
            if(storage.getItem("normalTxtOperationThree")==null)
                storage.setItem("normalTxtOperationThree","");

            if(storage.getItem("advancedTxtPlayerOne")==null)
                storage.setItem("advancedTxtPlayerOne","");
            if(storage.getItem("advancedTxtPlayerTwo")==null)
                storage.setItem("advancedTxtPlayerTwo","");
            if(storage.getItem("advancedTxtPlayerThree")==null)
                storage.setItem("advancedTxtPlayerThree","");

            if(storage.getItem("advancedTxtScoreOne")==null)
                storage.setItem("advancedTxtScoreOne","");
            if(storage.getItem("advancedTxtScoreTwo")==null)
                storage.setItem("advancedTxtScoreTwo","");
            if(storage.getItem("advancedTxtScoreThree")==null)
                storage.setItem("advancedTxtScoreThree","");

            if(storage.getItem("advancedTxtOperationOne")==null)
                storage.setItem("advancedTxtOperationOne","");
            if(storage.getItem("advancedTxtOperationTwo")==null)
                storage.setItem("advancedTxtOperationTwo","");
            if(storage.getItem("advancedTxtOperationThree")==null)
                storage.setItem("advancedTxtOperationThree","");
	},
	loadPlayers:function(){
		var storage = cc.sys.localStorage;

		txtPlayerOne.setString(storage.getItem("easyTxtPlayerOne"));
		txtPlayerTwo.setString(storage.getItem("easyTxtPlayerTwo"));
		txtPlayerThree.setString(storage.getItem("easyTxtPlayerThree"));

		txtScoreOne.setString(storage.getItem("easyTxtScoreOne"));
		txtScoreTwo.setString(storage.getItem("easyTxtScoreTwo"));
		txtScoreThree.setString(storage.getItem("easyTxtScoreThree"));


		txtOperationOne.setString(storage.getItem("easyTxtOperationOne"));
		txtOperationTwo.setString(storage.getItem("easyTxtOperationTwo"));
		txtOperationThree.setString(storage.getItem("easyTxtOperationThree"));
	}
});