var MenuLayer = cc.Layer.extend({
    menuLayer:null,
	btnHome:null,
    btnPause:null,
    btnCancel:null,
    _isPaused:false,
    playSceneListener:null,
    _swallowTouches:false,
    _playScene:null,
    _playLayer:null,
	ctor:function (playLayer,scenePlay) {
        this._super();
        this.init();
        this._playLayer = playLayer;
        this._playScene = scenePlay;
        return true;
    },
    init:function () {
        menuLayer = ccs.load(res.menuLayer).node;
       	this.addChild(menuLayer);
       	this.initializeButtons();
    },
    initializeButtons:function(){
    	btnCancel = menuLayer.getChildByName("btnCancel");
        btnHome = menuLayer.getChildByName("btnHome");
        btnPause = menuLayer.getChildByName("btnPause");
    	this.initializeListeners();
    },
    initializeListeners:function(){
        btnHome.addTouchEventListener(this.homeScene,this);
        btnPause.addTouchEventListener(this.pause,this);
        btnCancel.addTouchEventListener(this.cancelScene,this);
    },
    stopSong:function(){
        cc.audioEngine.stopMusic();
    },
    homeScene:function(){
        if(cc.audioEngine.isMusicPlaying()){
            this.stopSong();
        }
    	cc.director.popToRootScene();
    },
    pause:function () {

        if(this._swallowTouches==false){
            if(this._isPaused == false){
                this._pausedTargets = cc.director.getActionManager().pauseAllRunningActions();
                this._isPaused = true;
                this._playScene.stopChangeColor();
                this._playLayer.removeListeners();
            }
            else{
                cc.director.getActionManager().resumeTargets(this._pausedTargets);
                this._isPaused = false;
                this._playScene.playChangeColor();
                this._playLayer.resumeListeners();
            }
            this._swallowTouches = true;
        }
        else 
            this._swallowTouches = false;
    },
    cancelScene:function(){
        this.setVisible(false); 
    }
});

