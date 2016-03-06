var PlayScene = cc.Scene.extend({
    difficulty:null,
    ctor:function(type){
        this._super();
        difficulty = type;
    },
    onEnter:function (type) {
        this._super();
        var layer = new PlayLayer(difficulty);
        this.addChild(layer);
         this.stopAllActions();
    }
});

var PlayLayer = cc.Layer.extend({
    scene:null,
    spritePlayBackground:null,
	background:null,
	firstLayer:null,
	homeSprite:null,
    menuLayer:null,
	nodeFirstBackground:null,
    sprite:null,
    /* Frog Sprite */
    froggySprite:null,
    frogAttackSprite:null,
    /* Text Views */
    txtScore:null,
    txtTarget:null,
    txtLevel:null,
    txtType:null,
    txtComputation:null,
    txtRightComputation:null,
    txtRightAnswer:null,
    /* Life Sprites */
    lifeSprite1:null,
    lifeSprite2:null,
    lifeSprite3:null,
    spriteFrameNamePrefix:null,
    spriteFrameIndex:null,
    /* Answer Sprites */
    answerSprite1:null,
    answerSprite2:null,
    answerSprite3:null,
    answerSprite4:null,
    answerSprite5:null,
    /* Text View for answers */
    txtAnswer1:null,
    txtAnswer2:null,
    txtAnswer3:null,
    txtAnswer4:null,
    txtAnswer5:null,
    /*Other Sprites*/
    fairySpriteSpeech:null,
    /*Difficulty*/
    mode:null,
    /*Node*/
    optionsNode:null,
    homeMenuSprite:null,
    home:null,
    pause:null,
    cancel:null,
    /*btn*/
    btn:null,
    /*others...*/
    correctAnswer:null,
    action:null,
    line:null,
	ctor:function(difficulty){
		this._super();
		this.init(difficulty);
	},
	init:function(difficulty){
		background = ccs.load(res.backgroundPlayLayer).node;
		firstLayer = ccs.load(res.firstLayer).node;
        menuLayer = ccs.load(res.menuLayer).node;

		this.addChild(background);
		this.addChild(firstLayer);
        this.addChild(menuLayer);
        this.runSprites();
        this.initializeSprites(difficulty);
		this.initializeListeners();

        cc.spriteFrameCache.removeSpriteFrames();

        line = new cc.DrawNode();
        line.drawSegment(cc.p(210,170), cc.p(answerSprite1.getPosition().x,answerSprite1.getPosition().y),2);
        line.setVisible(false);
        this.addChild(line);
        score = 0;
     //   this.playSong();

    //  if(!action.isDone())
       //         cc.log("IS RUNNING :!!!");
      /* var r = cc.CallFunc.create(function(node) {
        this.runSprites();
       },this);
       var s = cc.sequence(r);
       lifeSprite1.runAction(cc.sequence(r).repeatForever());*/
       
	},
    initializeListeners:function(){
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

                if (cc.rectContainsPoint(rect, locationInNode)) {            
                    line.clear();
                    cc.log("Sprite Name: " + name);  cc.log("Target Name: " + target.getParent().getName());
                   
                    if(name=="homeSprite"){
                        target.opacity = 180;
                        if(optionsNode.isVisible()){
                            optionsNode.setVisible(false);
                        }
                        else{
                            optionsNode.setVisible(true);
                        }
                    }
                    else if(name=="answerSprite1"){
                        var child = target.getChildByName("txtSprite1");
                        var ans = "" + correctAnswer;
                        if(ans==child.getString()){
                            score++;
                            txtScore.setString(score+"");
                             frogAttackSprite.setVisible(true);
                             line.drawSegment(cc.p(210,170), cc.p(answerSprite1.getPosition().x,answerSprite1.getPosition().y),2);
                            line.setLocalZOrder(100);
                            line.setVisible(true);

                        }
                        else{
                            if(lifeSprite3.isVisible())
                                lifeSprite3.setVisible(false);
                            else if(lifeSprite2.isVisible())
                                lifeSprite2.setVisible(false);
                            else if(lifeSprite1.isVisible())
                                lifeSprite1.setVisible(false);
                              fairySpriteSpeech.setVisible(true);
                        }
                    }
                    else if(name=="answerSprite2"){
                        var child = target.getChildByName("txtSprite2");
                        var ans = "" + correctAnswer;
                        if(ans==child.getString()){
                            score++;
                            txtScore.setString(score+"");
                             frogAttackSprite.setVisible(true);
                            line.drawSegment(cc.p(210,170), cc.p(answerSprite2.getPosition().x,answerSprite2.getPosition().y),2);
                            line.setLocalZOrder(100);
                            line.setVisible(true);

                        }
                        else{
                            if(lifeSprite3.isVisible())
                                lifeSprite3.setVisible(false);
                            else if(lifeSprite2.isVisible())
                                lifeSprite2.setVisible(false);
                            else if(lifeSprite1.isVisible())
                                lifeSprite1.setVisible(false);
                            fairySpriteSpeech.setVisible(true);
                        }
                        
                    }
                    else if(name=="answerSprite3"){
                        var child = target.getChildByName("txtSprite3");
                        var ans = "" + correctAnswer;
                        if(ans==child.getString()){
                            score++;
                            txtScore.setString(score+"");
                             frogAttackSprite.setVisible(true);
                               line.drawSegment(cc.p(210,170), cc.p(answerSprite3.getPosition().x,answerSprite3.getPosition().y),2);
                            line.setLocalZOrder(100);
                            line.setVisible(true);
                        }
                        else{
                            if(lifeSprite3.isVisible())
                                lifeSprite3.setVisible(false);
                            else if(lifeSprite2.isVisible())
                                lifeSprite2.setVisible(false);
                            else if(lifeSprite1.isVisible())
                                lifeSprite1.setVisible(false);
                              fairySpriteSpeech.setVisible(true);
                        }
                    }
                    else if(name=="answerSprite4"){
                        var child = target.getChildByName("txtSprite4");
                        var ans = "" + correctAnswer;
                        if(ans==child.getString()){
                            score++;
                            txtScore.setString(score+"");
                             frogAttackSprite.setVisible(true);
                               line.drawSegment(cc.p(210,170), cc.p(answerSprite4.getPosition().x,answerSprite4.getPosition().y),2);
                            line.setLocalZOrder(100);
                            line.setVisible(true);
                        }
                        else{
                            if(lifeSprite3.isVisible())
                                lifeSprite3.setVisible(false);
                            else if(lifeSprite2.isVisible())
                                lifeSprite2.setVisible(false);
                            else if(lifeSprite1.isVisible())
                                lifeSprite1.setVisible(false);
                            fairySpriteSpeech.setVisible(true);
                        }
                    }
                    else if(name=="answerSprite5"){
                        var child = target.getChildByName("txtSprite5");
                        var ans = "" + correctAnswer;
                        if(ans==child.getString()){
                            score++;
                            txtScore.setString(score+"");
                             frogAttackSprite.setVisible(true);
                            line.drawSegment(cc.p(210,170), cc.p(answerSprite5.getPosition().x,answerSprite5.getPosition().y),2);
                            line.setLocalZOrder(100);
                            line.setVisible(true);
                        }
                        else{
                            if(lifeSprite3.isVisible())
                                lifeSprite3.setVisible(false);
                            else if(lifeSprite2.isVisible())
                                lifeSprite2.setVisible(false);
                            else if(lifeSprite1.isVisible())
                                lifeSprite1.setVisible(false);
                            fairySpriteSpeech.setVisible(true);
                        }
                    }

                    return true;
                }

                return false;
            },
            //Trigger when moving touch
            onTouchMoved: function (touch, event) {         
                //Move the position of current button sprite
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
              //  target.x += delta.x;
              //  target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {         
                var target = event.getCurrentTarget();
                var name = target.getName();
                
                target.setOpacity(255);
                if(frogAttackSprite.isVisible())
                frogAttackSprite.setVisible(false);
            line.setVisible(false);

            var cloned = target.getParent();
            cloned.setComputations();
            cloned.initializeAnswerSpritesCoordinates();
            cloned.reRunAnswerSprites();
            cc.delayTime(1000);
            }
        });
        this.manageListeners();
    },
    homeScene:function(){
       
        cc.log("PAUSE ALL ACTIONS");
        this.stopAllActions();
        cc.log("STOP ALL ACTIONS");
        this.removeAllChildrenWithCleanup(true);
        var scene = new HomeScene();
        cc.log("HOME SCENE");
        cc.director.runScene(new cc.TransitionFade(1.2, scene));
    },
    pauseScene:function(){

    },
    cancelScene:function(){
        optionsNode.setVisible(false);
    },
    runSprites:function(){
        cc.spriteFrameCache.addSpriteFrames(res.fairySpriteSheetPLIST);
        this.sprite = cc.Sprite.create(cc.spriteFrameCache.getSpriteFrame("fairy1.png"));
        this.sprite.setScale(1,1);
        this.sprite.setPosition(new cc.Point(500,200)); 
        this.addChild(this.sprite,100);
        var animFrames = [];
        for (var i = 1; i < 3; i++) {
                var frame = cc.spriteFrameCache.getSpriteFrame("fairy"+i+".png");
                animFrames.push(frame);
        }
        
        var animation = new cc.Animation(animFrames, 0.5);
        var animate   = cc.animate(animation); 
        action =  this.sprite.runAction(animate.repeatForever());

    },
    reRunAnswerSprites:function(){
        var rotateAction = cc.repeatForever(cc.moveBy(1,cc.p(-30,-20)));
        var moveRight1 = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(750,40)));
        var moveRight2 = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(360,40)));
        var moveRight3 = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(750,40))); 
        var moveLeft4  = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(-750,80)));    
        var moveLeft5  = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(-750,-40)));
        

        var action1 = cc.sequence(moveRight1);
        var action2 = cc.sequence(moveRight2);
        var action3 = cc.sequence(moveRight3);
        var action4 = cc.sequence(moveLeft4);
        var action5 = cc.sequence(moveLeft5);

        answerSprite1.runAction(action1);
        answerSprite2.runAction(action2);
        answerSprite3.runAction(action3);
        answerSprite4.runAction(action4);
        answerSprite5.runAction(action5);
    },
    initializeLifeSprites:function(){
        lifeSprite1 = firstLayer.getChildByName("lifeSprite1");
        lifeSprite2 = firstLayer.getChildByName("lifeSprite2");
        lifeSprite3 = firstLayer.getChildByName("lifeSprite3");
    },
    initializeButtons:function(){
        optionsNode = menuLayer.getChildByName("menuLayer");
        home = menuLayer.getChildByName("btnHome");
        pause = menuLayer.getChildByName("btnPause");
        cancel = menuLayer.getChildByName("btnCancel");
    },
    initializeTextViews:function(){
        txtTarget = firstLayer.getChildByName("txtTarget");
        txtType = firstLayer.getChildByName("txtType");
        txtComputation = firstLayer.getChildByName("txtCompute");
        txtRightComputation = fairySpriteSpeech.getChildByName("txtRightComputation");
        txtRightAnswer = fairySpriteSpeech.getChildByName("txtRightAnswer");
        txtScore = firstLayer.getChildByName("txtScore");
        if(difficulty=="EASY"){
            txtTarget.setString("10");
            txtType.setString("Easy");
        }
        else if(difficulty=="ADVANCED"){
            txtTarget.setString("21");
            txtType.setString("Advanced");
        }
        else{
            txtTarget.setString("20");
            txtType.setString("Difficult");
        }
    },
    initializeMiscSprites:function(){
        homeSprite = firstLayer.getChildByName("homeSprite");
        froggySprite = firstLayer.getChildByName("froggySprite");
        frogAttackSprite = firstLayer.getChildByName("frogAttackSprite");
        fairySpriteSpeech = firstLayer.getChildByName("fairySpriteSpeech");
    },initializeAnswerSpritesCoordinates:function(){
        answerSprite1.setPosition(new cc.Point(100,500)); 
        answerSprite2.setPosition(new cc.Point(100,450)); 
        answerSprite3.setPosition(new cc.Point(100,400)); 
        answerSprite4.setPosition(new cc.Point(900,450)); 
        answerSprite5.setPosition(new cc.Point(900,400)); 
    },
    initializeSprites:function(difficulty){
        this.initializeLifeSprites();
        this.initializeMiscSprites();
        this.initializeTextViews();
        this.initializeButtons();

        frogAttackSprite.setVisible(false);
        fairySpriteSpeech.setVisible(false);
        optionsNode.setVisible(false);
        
    
        this.answerSpritesAnimation();
        this.setComputations();
    },
    setComputations:function(){
        var x = Math.floor((Math.random() * 10) + 1);
        var y = Math.floor((Math.random() * 10) + 1);
        txtComputation.setString(x + " + " +y + "  = ");
        correctAnswer = x + y;
        var randomAnswers = [correctAnswer,0,0,0,0];

        for(var i = 1; i < 5; i++){
            var random = this.getRandom();
            if(!this.contains(randomAnswers,random)){
                randomAnswers[i]= random;
            }
        }
        var random = this.shuffle(randomAnswers);
        txtAnswer1.setString(randomAnswers[0]);
        txtAnswer2.setString(randomAnswers[1]);
        txtAnswer3.setString(randomAnswers[2]);
        txtAnswer4.setString(randomAnswers[3]);
        txtAnswer5.setString(randomAnswers[4]);
        txtRightComputation.setString(x + "      " +y + " = ");
        txtRightAnswer.setString(correctAnswer);
    },
    contains:function(answers,number){
        var flag = false;

        for(var i = 0; i < answers.length; i++){
            if(answers[i]==number){
                flag = true;
                break;
            }
        }
        return flag;
    },
    getRandom:function(){
        return Math.floor((Math.random() * 10) + 1);
    },
    shuffle:function(o){
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    },
    manageListeners:function(){
        cc.eventManager.addListener(this.touchListener, homeSprite);
        cc.eventManager.addListener(this.touchListener.clone(), froggySprite);
        this.answerSpriteListener();
        
        pause.addTouchEventListener(this.pauseScene, this);
        cancel.addTouchEventListener(this.cancelScene, this);
    },
    answerSpriteListener:function(){
        cc.eventManager.addListener(this.touchListener.clone(), answerSprite1);
        cc.eventManager.addListener(this.touchListener.clone(), answerSprite2);
        cc.eventManager.addListener(this.touchListener.clone(), answerSprite3);
        cc.eventManager.addListener(this.touchListener.clone(), answerSprite4);
        cc.eventManager.addListener(this.touchListener.clone(), answerSprite5);
    },
    playSong:function(){
        cc.audioEngine.playMusic(res.playMusic, true);
    },
    stopSong:function(){
        cc.audioEngine.stopMusic();
    },
    answerSpritesAnimation:function(){
        var rotateAction = cc.repeatForever(cc.moveBy(1,cc.p(-30,-20)));
        var moveRight1 = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(750,40)));
        var moveRight2 = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(360,40)));
        var moveRight3 = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(750,40))); 
        var moveLeft4  = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(-750,80)));    
        var moveLeft5  = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(-750,-40)));
        

        var action1 = cc.sequence(moveRight1);
        var action2 = cc.sequence(moveRight2);
        var action3 = cc.sequence(moveRight3);
        var action4 = cc.sequence(moveLeft4);
        var action5 = cc.sequence(moveLeft5);

        cc.spriteFrameCache.addSpriteFrames(res.answerSpritesPLIST);
        

        var animFrames = [];
        for (var i = 1; i < 3; i++) {
                var frame = cc.spriteFrameCache.getSpriteFrame("answerSprite"+i+".png");
                animFrames.push(frame);
        }
        
        var animation = new cc.Animation(animFrames, 0.10);
        var animate   = cc.animate(animation); 

        answerSprite1 = cc.Sprite.create(cc.spriteFrameCache.getSpriteFrame("answerSprite1.png"));
        answerSprite1.setScale(1,1);
        answerSprite1.setLocalZOrder(100);
        answerSprite1.setPosition(new cc.Point(100,500)); 
        answerSprite1.setName("answerSprite1");
        this.addChild(answerSprite1,100);
        answerSprite1.runAction(action1);
        
        answerSprite2 = cc.Sprite.create(cc.spriteFrameCache.getSpriteFrame("answerSprite1.png"));
        answerSprite2.setScale(1,1);
        answerSprite2.setLocalZOrder(100);
        answerSprite2.setPosition(new cc.Point(100,450)); 
        answerSprite2.setName("answerSprite2");
        this.addChild(answerSprite2,100);
        answerSprite2.runAction(action2);

        answerSprite3 = cc.Sprite.create(cc.spriteFrameCache.getSpriteFrame("answerSprite1.png"));
        answerSprite3.setScale(1,1);
        answerSprite3.setLocalZOrder(100);
        answerSprite3.setPosition(new cc.Point(100,400)); 
        answerSprite3.setName("answerSprite3");
        this.addChild(answerSprite3,100);
        answerSprite3.runAction(action3);

        answerSprite4 = cc.Sprite.create(cc.spriteFrameCache.getSpriteFrame("answerSprite1.png"));
        answerSprite4.setScale(1,1);
        answerSprite4.setLocalZOrder(100);
        answerSprite4.setPosition(new cc.Point(900,450)); 
        answerSprite4.setName("answerSprite4");
        this.addChild(answerSprite4,100);
        answerSprite4.runAction(action4);

        answerSprite5 = cc.Sprite.create(cc.spriteFrameCache.getSpriteFrame("answerSprite1.png"));
        answerSprite5.setScale(1,1);
        answerSprite5.setLocalZOrder(100);
        answerSprite5.setPosition(new cc.Point(900,400)); 
        answerSprite5.setName("answerSprite5");
        this.addChild(answerSprite5,100);
        answerSprite5.runAction(action5);

        answerSprite1.runAction(animate.repeatForever());
        answerSprite2.runAction(animate.clone().repeatForever());
        answerSprite3.runAction(animate.clone().repeatForever());
        answerSprite4.runAction(animate.clone().repeatForever());
        answerSprite5.runAction(animate.clone().repeatForever());

        txtAnswer1 = new cc.LabelTTF("10", "Arial", 34, cc.size(50, 0), cc.TEXT_ALIGNMENT_CENTER );
        txtAnswer1.setName("txtSprite1");
        txtAnswer1.attr({
            x: 55,
            y: 53
        });

        txtAnswer1.setColor(cc.color(255,255,255,50));
        answerSprite1.addChild(txtAnswer1);

        txtAnswer2 = new cc.LabelTTF("10", "Arial", 34, cc.size(50, 0), cc.TEXT_ALIGNMENT_CENTER );
        txtAnswer2.setName("txtSprite2");
        txtAnswer2.attr({
            x: 55,
            y: 53
        });

        txtAnswer2.setColor(cc.color(255,255,255,50));
        answerSprite2.addChild(txtAnswer2);

        txtAnswer3 = new cc.LabelTTF("10", "Arial", 34, cc.size(50, 0), cc.TEXT_ALIGNMENT_CENTER );
        txtAnswer3.setName("txtSprite3");
        txtAnswer3.attr({
            x: 55,
            y: 53
        });

        txtAnswer3.setColor(cc.color(255,255,255,50));
        answerSprite3.addChild(txtAnswer3);

        txtAnswer4 = new cc.LabelTTF("10", "Arial", 34, cc.size(50, 0), cc.TEXT_ALIGNMENT_CENTER );
        txtAnswer4.setName("txtSprite4");
        txtAnswer4.attr({
            x: 55,
            y: 53
        });

        txtAnswer4.setColor(cc.color(255,255,255,50));
        answerSprite4.addChild(txtAnswer4);

        txtAnswer5 = new cc.LabelTTF("10", "Arial", 34, cc.size(50, 0), cc.TEXT_ALIGNMENT_CENTER );
        txtAnswer5.setName("txtSprite5");
        txtAnswer5.attr({
            x: 55,
            y: 53
        });

        txtAnswer5.setColor(cc.color(255,255,255,50));
        answerSprite5.addChild(txtAnswer5);
    }
});