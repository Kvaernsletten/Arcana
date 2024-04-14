class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop(){
        const updateFrames = () =>{
            //Clear the canvas each frame
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //Establish the camera binding
            const camera = this.map.gameObjects.player;

            //Update all objects
            Object.values(this.map.gameObjects).forEach(object =>{
                object.update({
                    arrow: this.Inputs.direction
                });
            })

            //Draw lower layer
            this.map.drawLowerLayerImg(this.ctx, camera);

            //Draw game objects
            Object.values(this.map.gameObjects).forEach(object =>{ 
                object.sprite.draw(this.ctx, camera);
            })

            //Draw upper layer
            this.map.drawUpperLayerImg(this.ctx, camera);

            setTimeout(() => {
            requestAnimationFrame(() => {
            updateFrames();
            })
            }, 1000/60);



        }
        updateFrames();
    }

    init() {
        this.map = new WorldMap(window.WorldMaps.Overworld);

        this.Inputs = new Inputs();
        this.Inputs.init();

        let gameLoopRunning = false;
        document.addEventListener("keydown", e =>{
            if (!gameLoopRunning && e.key === " "){
                gameLoopRunning = true;
                this.startGameLoop();
            }else if(gameLoopRunning && e.key === " "){
                location.reload();
            }
        })
        //this.startGameLoop();
    } 
}    
