class DrawableObject {
    img;
    imageCache = []; //array in which the images from the image-arrays are added
    currentImage = 0;
    x = 120;
    y;
    height;
    width = 150;
    percentage = 100; //live of character and endboss in percent
    inScreen = false;


    /**
     * this function creates an image and will mostly be called in the constructor function in every class
     * @param {path from the image } path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * will be called in the world.js file and draw the backgound and the objects
     * @param {context} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * 
     * @param {canvas.getContext('2d');} ctx 
     */
    drawFrame(ctx) {
        if (this.instancesOfObjects) {
            // this.setStats(ctx);
            if (this instanceof Character)  //rect creates a rectangle around the objects
                //the + and - deletes the space around the picture of the objects and place the rectangle right
                ctx.rect(this.x + 35, this.y + 115, this.width - 65, this.height - 125);
            else if (this instanceof Coin)
                ctx.rect(this.x + 45, this.y + 45, this.width - 90, this.height - 90);
            else if (this instanceof Bottle)
                ctx.rect(this.x + 30, this.y + 15, this.width - 40, this.height - 20);
            else if (this instanceof Endboss)
                ctx.rect(this.x + 40, this.y + 70, this.width - 50, this.height - 80);
            else
                ctx.rect(this.x, this.y, this.width, this.height);
            // ctx.stroke(); //draw the rectangle
        }
    }



    drawScore(ctx, scoreCoins, scoreBottles) {
        ctx.font = "34px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(scoreCoins, 80, 103);
        ctx.fillText(scoreBottles, 173, 103);
    }


    /**
     * creates a blue outline about the objects
     * @param {canvas.getContext('2d');} ctx 
     */
    setStats(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
    }


    instancesOfObjects() {
        return this instanceof Character || this instanceof Chicken || this instanceof SmallChicken ||
            this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject
    }


    /**
     * loads all images from an image array
     * @param {array with images} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * animates the health character and live endboss statusbar, gets called in world.js file
     * @param {*live of character and endboss in percent} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * @returns the index of the statusbar image ro be displayed
     */
    resolveImageIndex() {
        if (this.percentage == 100)
            return 5;
        else if (this.percentage > 80)
            return 4;
        else if (this.percentage > 60)
            return 3;
        else if (this.percentage > 40)
            return 2;
        else if (this.percentage > 20)
            return 1;
        else {
            return 0;
        }
    }
}