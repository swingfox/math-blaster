var LevelLayer = cc.Layer.extend({
    levelLayer:null,
	btnClose:null,
	ctor:function (level,description) {
        this._super();
        this.init(level,description);

        return true;
    },
    init:function (level,description) {
        this.levelLayer = ccs.load(res.levelLayer).node;
        var levelInfo = new cc.LabelTTF(level, "StrangeWorld", 60, cc.size(cc.winSize.width, 60), cc.TEXT_ALIGNMENT_LEFT);
        var description = new cc.LabelTTF(description, "StrangeWorld", 60, cc.size(cc.winSize.width, 130), cc.TEXT_ALIGNMENT_LEFT);
        levelInfo.x = 900;
        levelInfo.y = 470;
        levelInfo.setColor(cc.color(255,0,0,50));
        description.x = 820;
        description.y = 380;
        description.setColor(cc.color(0,0,0,50));
  
        this.addChild(levelInfo,100);
        this.addChild(description,100);
       	this.addChild(this.levelLayer);
    }
});

