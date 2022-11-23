class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y;
    height;
    width = 150;
    percentage = 100;
    inScreen = false;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this.instancesOfObjects) {
            this.setStats(ctx);
            if (this instanceof Character) {
                ctx.rect(this.x + 35, this.y + 115, this.width - 65, this.height - 125);
            }

            else if (this instanceof Coin) {
                ctx.rect(this.x + 45, this.y + 45, this.width - 90, this.height - 90);
            }

            else if (this instanceof Bottle) {
                ctx.rect(this.x + 30, this.y + 15, this.width - 40, this.height - 20);
            }

            else if (this instanceof Endboss) {
                ctx.rect(this.x + 40, this.y + 70, this.width - 50, this.height - 80)
            }

            else {
                ctx.rect(this.x, this.y, this.width, this.height);
            }
            ctx.stroke();
        }
    }


    setStats(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
    }


    instancesOfObjects() {
        return this instanceof Character || this instanceof Chicken || this instanceof SmallChicken ||
            this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}