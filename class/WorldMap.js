class WorldMap{
    constructor(config){
        this.gameObjects = config.gameObjects;
        
        this.lowerLayerImage = new Image();
        this.lowerLayerImage.src = config.lowerLayerSrc;
        
        this.upperLayerImage = new Image();
        this.upperLayerImage.src = config.upperLayerSrc;

    }

    drawLowerLayerImg(ctx, camera){
        ctx.drawImage(this.lowerLayerImage, 
            utils.withGrid(10.5) - camera.x, 
            utils.withGrid(6) - camera.y);
    }

    drawUpperLayerImg(ctx, camera){
        ctx.drawImage(this.upperLayerImage, 
            utils.withGrid(10.5) - camera.x, 
            utils.withGrid(6) - camera.y);
    }
}

window.WorldMaps = {
    Overworld: {
        lowerLayerSrc: "img/maps/map.png",
        upperLayerSrc: "img/maps/mapUL.png",
        gameObjects: {
            player: new Character({
                isPlayerControlled: true,
                x: utils.withGrid(15),
                y: utils.withGrid(15),
            }),
            npc: new Character({
                x: 5,
                y: 5,
                src: "favicon.ico",
            }),
        }
    },
    Overworld2: {
        lowerLayerSrc: "img/maps/test.png",
        upperLayerSrc: "img/maps/mapUL.png",
        gameObjects: {
            player: new Character({
                isPlayerControlled: true,
                x: utils.withGrid(2),
                y: utils.withGrid(4),
            }),
            npc2: new Character({
                x: utils.withGrid(2),
                y: utils.withGrid(4),
                src: "favicon.ico",
            }),
        }
    },
}