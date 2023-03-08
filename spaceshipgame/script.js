let canvas;
let ctx;

let player;
let keys = {
    KeyA:false,
    KeyD:false,
    KeyS:false,
    KeyW:false,
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false,
    Space:false,
  
};//fill w/ keys player presses

let playertexture = new Image();
playertexture.src = "textures\\player\\player.png";
let bullettexture = new Image();
bullettexture.src = "textures\\bullet.png";

let mouseX = 0;
let mouseY = 0;
window.onload = function(){
    canvas = canvas??document.getElementById("main");
    ctx = ctx??canvas.getContext("2d");
    player = new Player();
    window._1345 = setInterval(loop,30);

    document.addEventListener("keydown", e => {
        keys[e.code] = true;
      
    });
    
    document.addEventListener("keyup", e => {
        keys[e.code] = false;
    });
    
    document.addEventListener("mousemove", e => {
        let canvasrect = canvas.getBoundingClientRect();
        mouseX = e.clientX - canvasrect.left;
        mouseY = e.clientY - canvasrect.top;
        player.direction = -player.dirToXY(mouseX, mouseY) - Math.PI;
        console.log(player.dirToXY(mouseX, mouseY),mouseX, mouseY);
    });
}




let sprites = []

class Player extends Sprite{
    constructor(){
        super(canvas.width/2,canvas.height/2,20,20,0,playertexture);
        sprites.push(this);
        this.controls = {
            up:false,
            down:false,
            left:false,
            right:false,
            shoot:false
        };
        this.shootcd = 0;
    }
    getControls(){
        this.controls = {
            up:(keys.KeyW??false)||(keys.ArrowUp??false),
            down:(keys.KeyS??false)||(keys.ArrowDown??false),
            left:(keys.KeyA??false)||(keys.ArrowLeft??false),
            right:(keys.KeyD??false)||(keys.ArrowRight??false),
            shoot:(keys.Space??false)
        };
    }
    tick(){
        this.getControls()
        this.shootcd -= 1;
        this.xv += (this.controls.right - this.controls.left) * 1.5;
        this.yv += (this.controls.down - this.controls.up) * 1.5;
        this.xv *= 0.85;
        this.yv *= 0.85;
        this.x += this.xv;
        this.y += this.yv;
        // this.direction += 1;
        if (this.controls.shoot == 1 && this.shootcd <= 0){
            sprites.push(new PlayerBullet(this.x+Math.sin(this.direction)*5,this.y-Math.cos(this.direction)*5,this.direction));
            this.shootcd = 3;

        }
    }

    draw(){
        this.toscreen(ctx);
    }
}

class PlayerBullet extends Sprite{
    constructor(x,y,dir){
        super(x,y,10,30,dir,bullettexture)
        sprites.push(this);
    }
    
    tick(){
        //this.x += Math.sin(this.direction)*5;
        //this.y -= Math.cos(this.direction)*5;
        if (this.x < -30 || this.x > canvas.width + 30 || this.y < -30 || this.y > canvas.height + 30){
            this.active = false;
        }
    }
    
    draw(){
        this.toscreen(ctx)
    }
}


function loop(){
    sprites = sprites.filter((spr) => spr.active)
    //tick
    sprites.forEach(spr =>{
        spr.tick();
    });
    //draw
    ctx.clearRect(0,0,canvas.width,canvas.height);
    sprites.forEach(spr=>{
        spr.draw();
    });
    player.draw()
}

