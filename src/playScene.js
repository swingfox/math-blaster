var PlayScene = cc.Scene.extend({
    difficulty:null,
    level:null,
    playLayer:null,
    ctor:function(type){
        this._super();
        difficulty = type;
    },
    onEnter:function (type) {
        this._super();
        this.playLayer = new PlayLayer(difficulty,this);
        var easyLevelOne = "0 to 4";
        var advancedLevelOne = "0 to 99";
        var difficultLevelOne = "0 to 999";
        var range;
        if(difficulty=="EASY")
            range = easyLevelOne;
        else if(difficulty == "ADVANCED")
            range = advancedLevelOne;
        else if(difficulty == "DIFFICULT")
            range = difficultLevelOne;

        this.level = new LevelLayer("Level 1", "Answers will be " + "\n"  +" from " + range);
        this.addChild(this.playLayer);
        this.addChild(this.level,100);
      //  this.scheduleUpdate();
        if(difficulty=="EASY"){

        }
        else if(difficulty=="ADVANCED"){
            this.schedule(this.advancedBoundarySpriteCheck,0.5);
            this.playChangeColor();
        }
        else if(difficulty=="DIFFICULT"){
            this.schedule(this.playLayer.difficultSpecialActions,5.5);
            this.playChangeColor();
        }
        this.pause();
        this.scheduleOnce(this.removeLevelLayer,3);
    },
    update:function(dt){
        var tongue = this.playLayer.getFrogTongue();


      //  tongue.clear();
    //    tongue.setVisible(false);
      //  tongue.drawSegment(cc.p(210,170), cc.p(answerSprite1.getPosition().x,answerSprite1.getPosition().y),2);
    }, 
    playChangeColor:function(){
        this.schedule(this.changeColor,2);
    },
    stopChangeColor:function(){
        this.unschedule(this.changeColor);
    },
    advancedBoundarySpriteCheck:function(){
        var runningSprites = [];
        var act;
        for(var i = 0; i < 5;i++){
            runningSprites[i] = this.playLayer.getAnswerSpriteByIndex(i);
        }

        for(var i = 0; i < 5; i++){
              this.boundaryCheck(runningSprites[i],900,i);
        }
        
    },
    changeColor:function(){
            this.playLayer.removeColorSprites();
            this.playLayer.shuffleColorSprites();
    },
    boundaryCheck:function(runningSprite,valueX,index){
        var act;
        if(runningSprite.getPositionX() >= valueX){
            runningSprite.setPositionX(0);
            act = this.playLayer.stopRunningActionByIndex(index);
            this.playLayer.stopAction(act);
            runningSprite.runAction(act);
        }
    },
    removeLevelLayer:function(dt){
       this.removeChild(this.level);
       this.resume();
       this.playLayer.initializeListeners();
       this.playLayer.setVisibleSprites(true);
    },
    pause:function() {
        this._pausedTargets = cc.director.getActionManager().pauseAllRunningActions();
    },
    resume:function() {
        cc.director.getActionManager().resumeTargets(this._pausedTargets);
    }
});

var PlayLayer = cc.Layer.extend({

	ctor:function(difficulty,playScene){
		this._super();    
        this.scenePlay = playScene;
		this.init(difficulty);
        playScene.pause();

	},
	init:function(difficulty){
		background = ccs.load(res.backgroundPlayLayer).node;
		firstLayer = ccs.load(res.firstLayer).node;

        this.levelOfDifficulty = difficulty;
		this.addChild(background);
		this.addChild(firstLayer);
        this.runSprites();
        this.initializeSprites(difficulty);
        this.initColorSprites();
        cc.spriteFrameCache.removeSpriteFrames();

        this.line = [];
        for(var i = 0 ; i < 5; i++){
            this.line[i] = new cc.DrawNode();
            this.addChild(this.line[i]);
        }
        score = 0;

        this.playSong();
	},
    getFrogAttackSprite:function(){
        return frogAttackSprite;
    },
    getFrogTongue:function(){
        return this.line;
    },
    getAnswerSpriteByIndex:function(spriteIndex){
        var sprites = [answerSprite1,answerSprite2,answerSprite3,answerSprite4,answerSprite5];
        return sprites[spriteIndex];
    },
    stopRunningActionByIndex:function(runningActionIndex){
        return actionRunningHandler[runningActionIndex];
    },
    initColorSprites:function(){
        this.red = new cc.Sprite(res.redSprite);
        this.pink = new cc.Sprite(res.pinkSprite);
        this.purple = new cc.Sprite(res.lightPurpleSprite);
        this.lightGreen = new cc.Sprite(res.lightGreenSprite);
        this.black = new cc.Sprite(res.blackSprite);
        this.yellow = new cc.Sprite(res.yellowSprite);
        this.darkBlue = new cc.Sprite(res.darkBlueSprite);
        this.royalBlue = new cc.Sprite(res.royalBlueSprite);
        this.green = new cc.Sprite(res.lightGreenSprite);
        this.brown = new cc.Sprite(res.brownSprite);

        this.royalBlue.setPosition(cc.p(67,64));
        this.red.setPosition(cc.p(67,64));
        this.pink.setPosition(cc.p(67,64));
        this.purple.setPosition(cc.p(67,64));
        this.lightGreen.setPosition(cc.p(67,64));
        this.black.setPosition(cc.p(67,64));
        this.yellow.setPosition(cc.p(67,64));
        this.darkBlue.setPosition(cc.p(67,64));
        this.royalBlue.setPosition(cc.p(67,64));
        this.green.setPosition(cc.p(67,64));
        this.brown.setPosition(cc.p(67,64));

        this.royalBlue.setName("royalBlue");
        this.red.setName("red");
        this.pink.setName("pink");
        this.purple.setName("purple");
        this.lightGreen.setName("lightGreen");
        this.black.setName("black");
        this.yellow.setName("yellow");
        this.darkBlue.setName("darkBlue");
        this.royalBlue.setName("royalBlue");
        this.green.setName("green");
        this.brown.setName("brown");


        this.shuffleColorSprites();
    },
    setVisibleSprites:function(bool){
        answerSprite1.setVisible(bool);
        answerSprite2.setVisible(bool);
        answerSprite3.setVisible(bool);
        answerSprite4.setVisible(bool);
        answerSprite5.setVisible(bool);
    },
    removeListeners:function(){
            cc.eventManager.pauseTarget(answerSprite1);
            cc.eventManager.pauseTarget(answerSprite2);
            cc.eventManager.pauseTarget(answerSprite3);
            cc.eventManager.pauseTarget(answerSprite4);
            cc.eventManager.pauseTarget(answerSprite5);
    },
    resumeListeners:function(){
            cc.eventManager.resumeTarget(answerSprite1);
            cc.eventManager.resumeTarget(answerSprite2);
            cc.eventManager.resumeTarget(answerSprite3);
            cc.eventManager.resumeTarget(answerSprite4);
            cc.eventManager.resumeTarget(answerSprite5);
    },
    removeLevelLayer:function(dt){
       this.removeChild(this.level);
    },
    removeColorSprites:function(){
        answerSprite1.removeChild(this.colors[this.rands[0]]);
        answerSprite2.removeChild(this.colors[this.rands[1]]);
        answerSprite3.removeChild(this.colors[this.rands[2]]);
        answerSprite4.removeChild(this.colors[this.rands[3]]);
        answerSprite5.removeChild(this.colors[this.rands[4]]);
    },
    shuffleColorSprites:function(){
        this.colors =[this.yellow,this.black,this.pink,this.red,this.royalBlue,
                      this.purple,this.lightGreen,this.darkBlue,this.green,
                      this.brown];

        this.rands = [0,0,0,0,0];
        var n;
        for(var o = 0; o < 5; o++){
            do{
                n = this.getRandomByTwos() % 10;
            }while(this.randsContains(this.rands,n));
            this.rands[o] = n;
        }

        answerSprite1.addChild(this.colors[this.rands[0]],90);
        answerSprite2.addChild(this.colors[this.rands[1]],90);
        answerSprite3.addChild(this.colors[this.rands[2]],90);
        answerSprite4.addChild(this.colors[this.rands[3]],90);
        answerSprite5.addChild(this.colors[this.rands[4]],90);
    },
    randsContains:function(rands,number){
        var ok = false;
        for(var i = 0; i < 5; i++){
            if(rands[i] == number){
                ok = true;
                break;
            }
        }

        return ok;
    },
    checkConflictColors:function(color){ // one color only per computation
        var ok = false;
        var name = color.getName();
        for(var i = 0; i < 10; i+=2){
            if(name==this.colors[i].getName()){
                ok = true;
                break;
            }
        }
        return ok;
    },
    initializeListeners:function(){
            var main = this;

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
                    for(var i = 0 ; i < 5; i++){
                        main.line[i].clear();
                    }                   
                    if(name=="homeSprite"){
                        target.opacity = 180;
                        if(optionsSprite.isVisible()){
                            optionsSprite.setVisible(false);
                        }
                        else{
                            optionsSprite.setVisible(true);
                        }
                    }
                    else if(name=="answerSprite1"){
                        main.checkAnswer(answerSprite1,"txtSprite1",target);
                    }
                    else if(name=="answerSprite2"){
                        main.checkAnswer(answerSprite2,"txtSprite2",target);
                    }
                    else if(name=="answerSprite3"){
                        main.checkAnswer(answerSprite3,"txtSprite3",target);
                    }
                    else if(name=="answerSprite4"){
                        main.checkAnswer(answerSprite4,"txtSprite4",target);
                    }
                    else if(name=="answerSprite5"){
                        main.checkAnswer(answerSprite5,"txtSprite5",target);
                    }
                    return true;
                }
                return false;
            },
            onTouchEnded: function (touch, event) {         
                var target = event.getCurrentTarget();
                target.setOpacity(255);
            }
        });
        this.manageListeners();
    },
    goHome:function(){
        cc.director.popToRootScene();
    },
    showIfCorrect:function(){
        this.correct.setVisible(false);
        this.setComputations();
        this.removeColorSprites();
        this.shuffleColorSprites();
        this.currentTarget.removeChild(this.yellow);
        if(this.levelOfDifficulty=="EASY")
            this.easyModePostTransition();
        else if(this.levelOfDifficulty=="ADVANCED"){
            this.advancedModePostTransition();
        }
        else if(this.levelOfDifficulty=="DIFFICULT"){
            this.difficultModePostTransition();
        }
        this.resume();
        this.resumeListeners();
    },
    showIfIncorrect:function(){ 
        fairySpriteSpeech.setVisible(false);
        this.setComputations();
        this.removeColorSprites();
        this.shuffleColorSprites();
        if(this.levelOfDifficulty=="EASY")
            this.easyModePostTransition();
        else if(this.levelOfDifficulty=="ADVANCED"){
            this.advancedModePostTransition();
        }
        else if(this.levelOfDifficulty=="DIFFICULT"){
            this.difficultModePostTransition();
        }
        this.resume();
        this.resumeListeners();
    },
    pause:function() {
        this._pausedTargets = cc.director.getActionManager().pauseAllRunningActions();
    },
    resume:function() {
        cc.director.getActionManager().resumeTargets(this._pausedTargets);
    },
    checkAnswer:function(answerSprite,txtSprite,target){
        var child = target.getChildByName(txtSprite);
        var ans = "" + correctAnswer;
        this.currentTarget = target;

        this.playSwallow();

        this.removeListeners();
        this.pause();
      
        if(ans==child.getString()){
            this.correct.setVisible(true);
            target.addChild(this.yellow,91);
            score++;
            txtScore.setString(score+"");
            txtComputation.setString(answer);
            frogAttackSprite.setVisible(true);
            for(var i = 0 ; i < 5; i++){
                this.line[i].drawSegment(cc.p(210+(i+4),170), cc.p(answerSprite.getPosition().x+(i+4),answerSprite.getPosition().y),2);
                this.line[i].setLocalZOrder(100);
                this.line[i].setVisible(true);
            }
            this.scheduleOnce(this.showIfCorrect,2);
            this.scheduleOnce(this.frogClearAnimation,1.5);

        }
        else{
                if(lifeSprite3.isVisible())
                    lifeSprite3.setVisible(false);
                else if(lifeSprite2.isVisible())
                    lifeSprite2.setVisible(false);
                else if(lifeSprite1.isVisible())
                    lifeSprite1.setVisible(false);
            fairySpriteSpeech.setLocalZOrder(100);
            fairySpriteSpeech.setVisible(true);
            this.scheduleOnce(this.showIfIncorrect,2);
        }

        var numTarget = parseInt(txtTarget.getString());
        numTarget--;
        if(this.levelOfDifficulty == "EASY"){
            if(txtLevel.getString()=="Level 1  " && numTarget == 0){
                numTarget = 10;
                txtLevel.setString("Level 2");

                        this.level = new LevelLayer("Level 2","Answers will be " + "\n"  +" from 5 to 9");
                        this.level.setLocalZOrder(100);
                        this.addChild(this.level);
                        this.scheduleOnce(this.removeLevelLayer,3);
                    }
                    else if(numTarget == 0) // if level 2
                        numTarget = 0;
                }

                txtTarget.setString(numTarget);

                if(!lifeSprite1.isVisible()&&!lifeSprite2.isVisible()&&!lifeSprite3.isVisible()){
                     txtGameOver.setVisible(true);
                     this.removeChild(answerSprite1);
                     this.removeChild(answerSprite2);
                     this.removeChild(answerSprite3);
                     this.removeChild(answerSprite4);
                     this.removeChild(answerSprite5);
                     this.scheduleOnce(this.goHome,3);
                }
        
    }, 
    frogClearAnimation:function(){
         if(frogAttackSprite.isVisible())
            frogAttackSprite.setVisible(false);
        for(var i = 0 ; i < 5; i++){
            this.line[i].clear();
            this.line[i].setVisible(false);
        }
       
    },
    runSprites:function(){
        cc.spriteFrameCache.addSpriteFrames(res.fairySpriteSheetPLIST);
        this.sprite = cc.Sprite.create(cc.spriteFrameCache.getSpriteFrame("fairy1.png"));
        this.sprite.setScale(1,1);
        this.sprite.setPosition(new cc.Point(500,200)); 
        this.addChild(this.sprite,30);
        var animFrames = [];
        for (var i = 1; i < 3; i++) {
                var frame = cc.spriteFrameCache.getSpriteFrame("fairy"+i+".png");
                animFrames.push(frame);
        }
        
        var animation = new cc.Animation(animFrames, 0.5);
        animate = cc.animate(animation); 
        action  =  this.sprite.runAction(animate.repeatForever());
    },
    easyModePostTransition:function(){
        if(txtLevel.getString()=="Level 2"){
            if(txtTarget.getString()== "0"){
                this.setVisibleSprites(false);
                this.scheduleOnce(this.completedEasyMode,1);
            }
        }

        var move1 = cc.moveBy(1.5,cc.p(-230,-20));
        var move2 = cc.moveBy(1.5,cc.p(0,-220));
        var move3 = cc.moveBy(1.5,cc.p(-230,20));
        var move4 = cc.moveBy(1.5,cc.p(230,-20));
        var move5 = cc.moveBy(1.5,cc.p(230,20));
        answerSprite1.runAction(cc.sequence(new cc.EaseExponentialOut(move1),move1.reverse()));
        answerSprite2.runAction(cc.sequence(new cc.EaseExponentialOut(move2),move2.reverse()));
        answerSprite3.runAction(cc.sequence(new cc.EaseExponentialOut(move3),move3.reverse()));
        answerSprite4.runAction(cc.sequence(new cc.EaseExponentialOut(move4),move4.reverse()));
        answerSprite5.runAction(cc.sequence(new cc.EaseExponentialOut(move5),move5.reverse()));
    },
    advancedModePostTransition:function(){
        if(txtTarget.getString()== "0"){
            this.setVisibleSprites(false);
            this.scheduleOnce(this.completedAdvancedMode,1);
        }
    },
    difficultSpecialActions:function(){
        var action = [new cc.EaseExponentialOut(cc.moveBy(2,cc.p(0,-180))),new cc.EaseExponentialOut(cc.moveBy(2,cc.p(-500,0))),new cc.EaseExponentialOut(cc.moveBy(1.5,cc.p(500,180))),
                      new cc.EaseExponentialOut(cc.moveBy(2,cc.p(0,-180))),new cc.EaseExponentialOut(cc.moveBy(2,cc.p(400,10))),new cc.EaseExponentialOut(cc.moveBy(2,cc.p(-400,170))),
                      new cc.EaseExponentialOut(cc.moveBy(2,cc.p(-700,10))),new cc.EaseExponentialOut(cc.moveBy(2,cc.p(50,200))),new cc.EaseExponentialOut(cc.moveTo(2,cc.p(850,350))),
                      new cc.EaseExponentialOut(cc.moveBy(2,cc.p(300,0))),new cc.EaseExponentialOut(cc.moveTo(2,cc.p(50,200))),new cc.EaseExponentialOut(cc.moveTo(2,cc.p(150,550))),
                      new cc.EaseExponentialOut(cc.moveBy(2,cc.p(200,20))),new cc.EaseExponentialOut(cc.moveTo(2,cc.p(700,400))),new cc.EaseExponentialOut(cc.moveTo(2,cc.p(150,350)))

                    ];
        var difficultAction = [cc.sequence(action[0],action[1],action[2]),
                               cc.sequence(action[3],action[4],action[5]),
                               cc.sequence(action[6],action[7],action[8]),
                               cc.sequence(action[9],action[10],action[11]),
                               cc.sequence(action[12],action[13],action[14])
                              ];

        answerSprite1.runAction(difficultAction[0]);
        answerSprite2.runAction(difficultAction[1]);
        answerSprite3.runAction(difficultAction[2]);
        answerSprite4.runAction(difficultAction[3]);
        answerSprite5.runAction(difficultAction[4]);

    },
    difficultModePostTransition:function(){
        if(txtTarget.getString()== "0"){
            this.setVisibleSprites(false);
            this.scheduleOnce(this.completedDifficultMode,1);
        }
    },
    completedEasyMode:function(){
        var easy = ccs.load(res.easyModeComplete).node;
        this.addChild(easy);
        this.scheduleOnce(this.goHome,2);
    },
    completedAdvancedMode:function(){
        var advanced = ccs.load(res.advancedModeComplete).node;
        this.addChild(advanced);
        this.scheduleOnce(this.goHome,2);
    },
    completedDifficultMode:function(){
        var difficult = ccs.load(res.difficultModeComplete).node;
        this.addChild(difficult);
        this.scheduleOnce(this.goHome,2);
    },
    initializeLifeSprites:function(){
        lifeSprite1 = firstLayer.getChildByName("lifeSprite1");
        lifeSprite2 = firstLayer.getChildByName("lifeSprite2");
        lifeSprite3 = firstLayer.getChildByName("lifeSprite3");
    },
    initializeTextViews:function(){
        txtTarget = firstLayer.getChildByName("txtTarget");
        txtLevel = firstLayer.getChildByName("txtLevel");
        txtType = firstLayer.getChildByName("txtType");
        txtComputation = firstLayer.getChildByName("txtCompute");
        txtGameOver = firstLayer.getChildByName("txtGameOver");
        txtRightComputation = fairySpriteSpeech.getChildByName("txtRightComputation");
        txtRightAnswer = fairySpriteSpeech.getChildByName("txtRightAnswer");
        txtScore = firstLayer.getChildByName("txtScore");

        txtGameOver.setVisible(false);
        if(difficulty=="EASY"){
            txtTarget.setString("10");
            txtType.setString("Easy");
        }
        else if(difficulty=="ADVANCED"){
            txtTarget.setString("21");
            txtType.setString("Advanced");
        }
        else if(difficulty=="DIFFICULT"){
            txtTarget.setString("20");
            txtType.setString("Difficult"); 
        }
    },
    initializeMiscSprites:function(){
        homeSprite = firstLayer.getChildByName("homeSprite");
        froggySprite = firstLayer.getChildByName("froggySprite");
        frogAttackSprite = firstLayer.getChildByName("frogAttackSprite");
        fairySpriteSpeech = firstLayer.getChildByName("fairySpriteSpeech");
        this.correct = new cc.Sprite(res.correctSprite);
        this.correct.setPosition(cc.p(600,580));
        this.correct.setVisible(false);
        this.correct.setScale(0.5,0.5);
        this.addChild(this.correct);

        optionsSprite = new MenuLayer(this,this.scenePlay);
        this.addChild(optionsSprite);
        optionsSprite.setVisible(false);
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

        frogAttackSprite.setVisible(false);
        fairySpriteSpeech.setVisible(false);
        
        this.answerSpritesAnimation();
        this.setComputations();
    },
    setComputations:function(){
        var n = 0;
        switch(this.levelOfDifficulty){
            case "EASY":
                n = 1;
                break;
            case "ADVANCED":
                n = 2;
                break;
            case "DIFFICULT":
                n = 3;
                break;
        }

        do{ 
            var x;
            var y;
            switch(this.levelOfDifficulty){
                case "EASY":
                x = this.getRandomByOnes();
                y = this.getRandomByOnes();
                var a = x + y;
                if(txtLevel.getString() == "Level 1  "){ // 0 to 4 answers
                    while(a < 0 || a > 4){
                        x = this.getRandomByOnes();
                        y = this.getRandomByOnes();
                        a = x + y;
                    }
                }
                else{                                    // 5 to 9 answers
                     while(a < 5 || a > 9){
                        x = this.getRandomByOnes();
                        y = this.getRandomByOnes();
                        a = x + y;
                    }
                }
                break;
                case "ADVANCED":
                x = this.getRandomByTwos();
                y = this.getRandomByTwos();
                break;
                case "DIFFICULT":
                x = this.getRandomByThrees();
                y = this.getRandomByThrees();
                break;
            }
              
            txtComputation.setString(x + " + " +y + " = ");
            correctAnswer = x + y + "";
        }while(correctAnswer.length!=n);
     
        answer = x + " + " +y + " = " + correctAnswer;
        var randomAnswers = [correctAnswer,0,0,0,0];

        for(var i = 1; i < 5; i++){

            var random = 0;
            switch(this.levelOfDifficulty){
                case "EASY":
                random = this.getRandomByOnes();
                break;
                case "ADVANCED":
                random = this.getRandomByTwos();
                break;
                case "DIFFICULT":
                random = this.getRandomByThrees();
                break;
            }
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
    getAnswerLength:function(number){
        var n = parseInt(number);
            var x = 0;
            while(n>0){
                x++;
                n /= 10;
            }
            return x;
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
    getRandomByOnes:function(){
        return Math.floor((Math.random() * 10));
    },
    getRandomByTwos:function(){
        return Math.floor((Math.random() * 100));
    },
    getRandomByThrees:function(){
        return Math.floor((Math.random() * 1000));
    },
    shuffle:function(o){
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    },
    manageListeners:function(){
        cc.eventManager.addListener(this.touchListener, homeSprite);
        cc.eventManager.addListener(this.touchListener.clone(), froggySprite);
        this.answerSpriteListener();
    },
    answerSpriteListener:function(){
        cc.eventManager.addListener(this.touchListener.clone(), answerSprite1);
        cc.eventManager.addListener(this.touchListener.clone(), answerSprite2);
        cc.eventManager.addListener(this.touchListener.clone(), answerSprite3);
        cc.eventManager.addListener(this.touchListener.clone(), answerSprite4);
        cc.eventManager.addListener(this.touchListener.clone(), answerSprite5);
    },
    playSwallow:function(){
        cc.audioEngine.playEffect(res.playSwallow);
    },
    playSong:function(){
        cc.audioEngine.playMusic(res.playMusic, true);
    },
    stopSong:function(){
        cc.audioEngine.stopMusic();
    },
    initializePointsByDifficulties:function(){
        var answerSpriteAnimation = [];
        if(this.levelOfDifficulty=="EASY"){
            answerSpriteAnimation[0] = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(750,40)));
            answerSpriteAnimation[1] = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(360,40)));
            answerSpriteAnimation[2] = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(750,40))); 
            answerSpriteAnimation[3]  = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(-750,80)));    
            answerSpriteAnimation[4]  = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(-750,-40)));
        }

        else if(this.levelOfDifficulty=="ADVANCED"){
            answerSpriteAnimation[0] = cc.repeatForever(cc.moveTo(3,cc.p(1100,500)));
            answerSpriteAnimation[1] = cc.repeatForever(cc.moveTo(4,cc.p(1100,450)));
            answerSpriteAnimation[2] = cc.repeatForever(cc.moveTo(2,cc.p(1100,400)));
            answerSpriteAnimation[3] = cc.repeatForever(cc.moveTo(6,cc.p(1100,350)));
            answerSpriteAnimation[4] = cc.repeatForever(cc.moveTo(5,cc.p(1100,400)));
        }

        else if(this.levelOfDifficulty=="DIFFICULT"){
            answerSpriteAnimation[0] = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(750,40)));
            answerSpriteAnimation[1] = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(360,40)));
            answerSpriteAnimation[2] = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(750,-40))); 
            answerSpriteAnimation[3]  = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(-750,80)));    
            answerSpriteAnimation[4]  = new cc.EaseExponentialOut(cc.moveBy(2,cc.p(-750,-40)));
        }

        return answerSpriteAnimation;
    },
    answerSpritesAnimation:function(){
        var rotateAction = cc.repeatForever(cc.moveBy(1,cc.p(-30,-20)));
        var answerSpriteAnimation = this.initializePointsByDifficulties();
        
        var bounce = [];
        var bounce_sequence = [];
        var value = 0.5;
        for(var i = 0; i < 5; i++){
            bounce[i] = cc.moveBy(value,cc.p(0,20));
            value += 0.1;
        }
        for(var i = 0; i < 5; i++)
        bounce_sequence[i] = cc.sequence(bounce[i],bounce[i].reverse()).repeatForever();

        if(this.levelOfDifficulty!="DIFFICULT"){
        var action1 = cc.sequence(answerSpriteAnimation[0]);
        var action2 = cc.sequence(answerSpriteAnimation[1]);
        var action3 = cc.sequence(answerSpriteAnimation[2]);
        var action4 = cc.sequence(answerSpriteAnimation[3]);
        var action5 = cc.sequence(answerSpriteAnimation[4]);
        }
        else
        {
        var action1 = cc.sequence(answerSpriteAnimation[0]);
        var action2 = cc.sequence(answerSpriteAnimation[1]);
        var action3 = cc.sequence(answerSpriteAnimation[2]);
        var action4 = cc.sequence(answerSpriteAnimation[3]);
        var action5 = cc.sequence(answerSpriteAnimation[4]);
        }
      


        cc.spriteFrameCache.addSpriteFrames(res.answerSpritesPLIST);

        var animFrames = [];
        for (var i = 1; i < 3; i++) {
                var frame = cc.spriteFrameCache.getSpriteFrame("answerSprite"+i+".png");
                animFrames.push(frame);
        }
        
        var animation = new cc.Animation(animFrames, 0.10);
        var animate   = cc.animate(animation); 
        var easySpriteCoordinates = [cc.p(100,500),cc.p(100,450),cc.p(100,400),cc.p(900,450),cc.p(900,400)];
        var advancedSpriteCoordinates = [cc.p(0,500),cc.p(-50,450),cc.p(-100,400),cc.p(-150,450),cc.p(0,400)];
        var difficultSpriteCoordinates = [cc.p(100,500),cc.p(100,400),cc.p(100,400),cc.p(900,450),cc.p(900,400)];
        
        var point = [];
        if(this.levelOfDifficulty=="EASY"){
            for(var i = 0; i < 5; i++) point[i] = easySpriteCoordinates[i];
        }
        else if(this.levelOfDifficulty=="ADVANCED"){
            for(var i = 0; i < 5; i++) point[i] = advancedSpriteCoordinates[i];
        }
        else{
            for(var i = 0; i < 5; i++) point[i] = difficultSpriteCoordinates[i];
        }

        

        actionRunningHandler = [];
        actionBouncingHandler = [];

        answerSprite1 = this.getAnswerSprite("answerSprite1","answerSprite1.png",point[0]);
        this.addChild(answerSprite1,80);
        actionRunningHandler[0] = answerSprite1.runAction(action1);
        actionBouncingHandler[0] = answerSprite1.runAction(bounce_sequence[0]);
        
        answerSprite2 = this.getAnswerSprite("answerSprite2","answerSprite2.png",point[1]);
        this.addChild(answerSprite2,80);
        actionRunningHandler[1] = answerSprite2.runAction(action2);
        actionBouncingHandler[1] = answerSprite2.runAction(bounce_sequence[0].clone());

        answerSprite3 = this.getAnswerSprite("answerSprite3","answerSprite3.png",point[2]);
        this.addChild(answerSprite3,80);
        actionRunningHandler[2] = answerSprite3.runAction(action3);
        actionBouncingHandler[2] = answerSprite3.runAction(bounce_sequence[0].clone());

        answerSprite4 = this.getAnswerSprite("answerSprite4","answerSprite4.png",point[3]);
        this.addChild(answerSprite4,80);
        actionRunningHandler[3] = answerSprite4.runAction(action4);
        actionBouncingHandler[3] = answerSprite4.runAction(bounce_sequence[0].clone());

        answerSprite5 = this.getAnswerSprite("answerSprite5","answerSprite5.png",point[4]);
        this.addChild(answerSprite5,80);
        actionRunningHandler[4] = answerSprite5.runAction(action5);
        actionBouncingHandler[4] = answerSprite5.runAction(bounce_sequence[0].clone());


        answerSprite1.runAction(animate.repeatForever());
        answerSprite2.runAction(animate.clone().repeatForever());
        answerSprite3.runAction(animate.clone().repeatForever());
        answerSprite4.runAction(animate.clone().repeatForever());
        answerSprite5.runAction(animate.clone().repeatForever());

        var FONT_SIZE = 30;

        txtAnswer1 = this.getTextSprite("txtSprite1","Impact",FONT_SIZE);
        answerSprite1.addChild(txtAnswer1,95);

        txtAnswer2 = this.getTextSprite("txtSprite2","Impact",FONT_SIZE);
        answerSprite2.addChild(txtAnswer2,95);

        txtAnswer3 = this.getTextSprite("txtSprite3","Impact",FONT_SIZE);
        answerSprite3.addChild(txtAnswer3,95);

        txtAnswer4 = this.getTextSprite("txtSprite4","Impact",FONT_SIZE);
        answerSprite4.addChild(txtAnswer4,95);

        txtAnswer5 = this.getTextSprite("txtSprite5","Impact",FONT_SIZE);
        answerSprite5.addChild(txtAnswer5,95);

       

         //   this.difficultSpecialActions();
    },
    getAnswerSprite:function(answerSprite,answerSpritePNG,point){
        var sprite = cc.Sprite.create(cc.spriteFrameCache.getSpriteFrame(answerSpritePNG));
        sprite.setScale(1,1);
        sprite.setLocalZOrder(20);
        sprite.setPosition(point); 
        sprite.setName(answerSprite);
        sprite.setVisible(false);
        return sprite;
    },
    getTextSprite:function(txtSpriteName,fontType,fontSize){
        var txtSprite = new cc.LabelTTF("10", fontType, fontSize, cc.size(50, 0), cc.TEXT_ALIGNMENT_CENTER );
        txtSprite.setName(txtSpriteName);
        txtSprite.setDimensions(100,50);
        txtSprite.attr({
            x: 59,
            y: 51
        });
        txtSprite.setColor(cc.color(255,255,255,50));

        return txtSprite;
    }
});