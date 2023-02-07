class MovableObject extends DrawableObject {
    speed = 0;
    speedY = 0;
    otherDirection = false;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    durationPlaySound = 0;

    /**
     * some images of objects have a space all around them, when we check for collision 
     * that space is also taken into account and the character will collide with the other 
     * elements before they even touched the actual body. Offset deletes the space arround
     * the objects
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }


    /**
     * when character is in air, function is there to get them back on ground
     */
    applyGravity() {
        setInterval(() => {
            if (this.isInAir()) {
                this.reduceY();
                if (this instanceof Character && this.y > 135) {
                    //character should never get lower than 135 on the y axis
                    this.y = 135;
                }
            }
        }, 45);
    }


    isInAir() {
        return this.isAboveGround() || this.speedY > 0
    }



    isAboveGround() {
        if (this instanceof ThrowableObject) { //throwable objects should always fall
            return true;
        } else {
            return this.y < 135;
        }
    }


    /**
     * makes character fall
     */
    reduceY() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
    }


    /**
     * iterates through the images array
     * @param {array of images} images 
     */
    playAnimation(images) {
        let i = this.currentImage % (images.length);
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * @param {movable object} mo 
     * @eturns the position, height and width of the actual object, to check a collision with
     * other objects
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }



    /**
     * @param {coins which can be collected} coin 
     * @returns the position, height and width of the coin, to check a collision
     * in the game it will be called by the character
     */
    isCollidingCoin(coin) {
        return (this.x + 25) + (this.width - 40) > (coin.x + 45) &&
            (this.y + 115) + (this.height - 125) > (coin.y + 45) &&
            (this.x + 25) < (coin.x + 45 + coin.width - 90) &&
            (this.y + 115) < (coin.y + 45) + (coin.height - 90)
    }


    /**
     * @param {bottles which can be collected} coin 
     * @returns the position, height and width of the bottle, to check a collision
     * in the game it will be called by the character
     */
    isCollidingBottle(bottle) {
        return (this.x + 25) + (this.width - 40) > (bottle.x + 30) &&
            (this.y + 115) + (this.height - 125) > (bottle.y + 15) &&
            (this.x + 25) < (bottle.x + 30 + bottle.width - 40) &&
            (this.y + 115) < (bottle.y + 15) + (bottle.height - 20)
    }



    /**
     * if character collision with chickens, his energy reduces
     * if endboss collision with throwable bottles, his energy reduces
     */
    hit() {
        this.energy -= 1.3;
        if (this.energy < 0) {
            this.energy = 0;
        } else { //time in ms when endboss or character collision 
            this.lastHit = new Date().getTime();
        }
    }


    isDead() {
        return this.energy == 0;
    }


    /**
     * @param {time how long sound and animation from character and enboss gets hurt should play} durationPlaySound 
     * @returns time passed smaller then sound should play
     */
    isHurt(durationPlaySound) {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < durationPlaySound;
    }
}