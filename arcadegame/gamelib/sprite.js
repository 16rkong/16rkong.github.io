class Sprite{
    constructor(x=0,y=0,width=0,height=0,direction=90,image=new Image(),xv=0,yv=0){
        this.x = x;
        this.y = y; 
        this.width = width; 
        this.height = height;
        this.direction = direction;
        this.image = image;
        this.xv = xv;
        this.yv = yv;
        this.controls = {};
        this.active = true;

    }

    tick(){
        //function can be overriden in subclass
    }

    toscreen(ctx){
        ctx.save(); //save ctx
        ctx.translate(this.x+this.image.width/2, this.y+this.image.height/2);//translate,again w/ offset
        ctx.rotate(this.direction); //rotate the image 
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height); //draw img w/ offset of width & height
        ctx.restore(); //restore ctx

        // debug        
        /*
        ctx.fillStyle="#FF0000";
        ctx.strokeRect(this.x,this.y,this.width,this.height);\
        /* */
    }

    draw(){
        //must be overriden
    }

    // sprite utils

    setDirection(newDir){
        //newDir is in degrees
        this.direction = Math.PI / 180 * newDir;
    }

    dirToXY(destX,destY){
        return Math.atan2(destX-this.x,destY-this.y)//-(Math.atan((destX-this.x)/(destY-this.y))*180/Math.PI + (mouseY>this.y?0:180));
    }
    
}
