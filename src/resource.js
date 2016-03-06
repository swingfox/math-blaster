var res = {
    home_jpg : "res/home.jpg",
    homeScene : "res/MainScene.json",
    homeBackgroundLayer : "res/homeBackgroundLayer.json",
    homeButtonLayer : "res/homeButtonLayer.json",
    difficultyScene : "res/DifficultyScene.json",
    difficultyLayer : "res/difficultyLayer.json",
    instructionLayer : "res/layerInstruction.json",
    firstLayer : "res/firstLayer.json",
    backgroundPlayLayer: "res/layerBackgroundPlay.json",
    playMusic : "res/media/sounds/bitOfFun.mp3",
    playSwallow : "res/media/sounds/swallowing.mp3",
    homeSprite : "res/nodeOptions.json",
    menuLayer: "res/MenuLayer.json",
    fairySpriteSheet : "res/media/graphics/sprites.png",
    fairySpriteSheetXML : "res/media/graphics/fairySpritesheet.xml",
    fairySpriteSheetPLIST : "res/media/graphics/sprites.plist",
    fairy : "res/media/graphics/fairy",
    scene : "res/Scene.json",
    answerSpritesPLIST : "res/media/graphics/answerSprites.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
