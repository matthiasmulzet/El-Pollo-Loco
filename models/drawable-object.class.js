class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y;
    height;
    width = 150;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken ||
            this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            if (this instanceof Character) {
                ctx.rect(this.x + 25, this.y + 115, this.width - 40, this.height - 125);
            }

            else if (this instanceof Coin) {
                ctx.rect(this.x + 45, this.y + 45, this.width - 90, this.height - 90);
            }

            else if (this instanceof Bottle) {
                ctx.rect(this.x + 30, this.y + 15, this.width - 40, this.height - 20);
            }

            else {
                ctx.rect(this.x, this.y, this.width, this.height);
            }
            ctx.stroke();
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}