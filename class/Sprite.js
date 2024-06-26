class Sprite{
    constructor(config){

        //Set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () =>{
            this.isLoaded = true;
        }

        //Set up shadow
        this.shadow = new Image();
        this.useShadow = true; //config.useShadow || false;
        if(this.useShadow){
            this.shadow.src = "img/npc/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        //Configure animation and initial state
        this.animations = config.animations || {
            "idle-up": [ [2, 0] ],
            "idle-down": [ [0, 0] ],
            "idle-left": [ [3, 0] ],
            "idle-right": [ [1, 0] ],
            "walk-up": [ [2, 1], [2, 0], [2, 2], [2, 0], ],
            "walk-down": [ [0, 1], [0, 0], [0, 2], [0, 0], ],
            "walk-left": [ [3, 1], [3, 0], [3, 2], [3, 0], ],
            "walk-right": [ [1, 1], [1, 0], [1, 2], [1, 0], ],
    
        }
        this.currentAnimation = "idle-down";//config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 8;
        this.animationFrameProgress = this.animationFrameLimit;

        //Reference the game object
        this.gameObject = config.gameObject;
    }

    get frame(){
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key){
        if(this.currentAnimation !== key){
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationFrames(){
        //Tick down frame progress
        if(this.animationFrameProgress > 0){
            this.animationFrameProgress -= 1;
            return;
        }

        //Reset frame progress counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if(this.frame === undefined){
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx, camera){
        const x = this.gameObject.x - 8 + utils.withGrid(10.5) - camera.x;
        const y = this.gameObject.y - 16 + utils.withGrid(6) - camera.y;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

        const[frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            frameX * 32, frameY * 32,
            32, 32,
            x, y,
            32, 32,
        )

        this.updateAnimationFrames();
    }

}