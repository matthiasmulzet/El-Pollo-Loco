class Draw extends World {
    statusbarHealth = new StatusbarHealth();
    statusbarBottle = new StatusbarBottle();
    statusbarCoin = new StatusbarCoin();
    statusbarEndboss = new StatusbarEndboss();


    draw() {
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawObjects();
        this.ctx.translate(-this.camera_x, 0);
        // draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    drawObjects() {
        this.drawBackgroundAndClouds();
        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusbars();
        this.drawScore();
        this.ctx.translate(this.camera_x, 0); //Forwards
        this.addToMap(this.character);
        this.drawEnemiesAndEndboss();
        this.drawCollectableObjects();
        this.addObjectsToMap(this.throwableObjects);
    }


    drawBackgroundAndClouds() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }


    drawStatusbars() {
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarCoin);
        if (this.statusbarEndboss.inScreen == true) {
            this.addToMap(this.statusbarEndboss);
        }
    }


    drawEnemiesAndEndboss() {
        this.addObjectsToMap(this.deadEnemies);
        for (let i = 0; i < this.level.enemies.length - 1; i++) {
            const actualEnemy = this.level.enemies[i];
            this.addToMap(actualEnemy);
        }
        this.addToMap(this.endboss());
    }


    endboss() {
        return this.level.enemies[this.level.enemies.length - 1]
    }


    drawCollectableObjects() {
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }


    /**
     * @param {array} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * @param {object} mo = moveable Object
     */
    addToMap(mo) {
        if (mo.otherDirection) //img turns to other side
            this.flipImage(mo);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection)
            this.flipImageBack(mo);
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    drawScore() {
        this.ctx.font = "34px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.fillText(this.scoreCoins, 80, 103);
        this.ctx.fillText(this.scoreBottles, 173, 103);
    }
}