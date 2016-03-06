var HomeSprite = cc.Layer.extend({
	home:null,
	pause:null,
	cancel:null,
	nodeOptions:null,
	ctor:function(){
		this._super();
		nodeOptions = ccs.load(res.homeSprite).node;
		this.init();
		this.addChild(nodeOptions);
	},
	init:function(){
		home = nodeOptions.getChildByName("homeText");
		pause = nodeOptions.getChildByName("pauseText");
		cancel = nodeOptions.getChildByName("cancelText");
	}
});