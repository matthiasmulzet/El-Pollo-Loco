class World {
    character = new Character();
    statusbarHealth = new StatusbarHealth();
    statusbarBottle = new StatusbarBottle();
    statusbarCoin = new StatusbarCoin();
    statusbarEndboss = new StatusbarEndboss();
    level = level1;
    endboss = this.level.enemies[this.level.enemies.length - 1];

    throwableObjects = []; //array where the bottles to throw are in
    deadEnemies = []; //array where the enemies who gets killed will be pushed in

    isInAir = false;

    canvas;
    ctx;
    keyboard;
    camera_x = 0; //position of the camera screen
    scoreCoins = 0; //counter which counts the collected coins
    scoreBottles = 0; //counter which counts the collected bottles


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorldEndboss();
        this.setWorldCharacter();
        this.run();
    }


    /**
     * due to this function we get access to this file in the character.class.js file
     */
    setWorldCharacter() {
        this.character.world = this;
    }


    /**
     * due to this function we get access to this file in the enboss.class.js file
     */
    setWorldEndboss() {
        this.endboss.world = this;
    }


    /**
     * runs the whole game
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBottleHit();
            this.endboss.checkEndboss(this.character.x);
        }, 1000 / 60);
    }


    checkCollisions() {
        this.checkCollision();
        this.checkCollectCoins();
        this.checkCollectBottles();
    }


    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                let index = this.level.enemies.indexOf(enemy); //checks the index of the enemy with which
                //the character is colliding
                this.killsEnemyOrGetsHurt(index);
            }
        });
    }


    killsEnemyOrGetsHurt(index) {
        let chickenIsJumpedOn = this.level.enemies[index];
        if (this.characterJumpsOnSmallChicken(chickenIsJumpedOn))
            this.animateDeadOfSmallChicken(index);
        else if (this.characterJumpsOnNormalChicken(chickenIsJumpedOn))
            this.animateDeadOfChicken(index);
        else {
            this.character.hit();
            this.statusbarHealth.setPercentage(this.character.energy);
        }
    }


    /**
     * @param {*object, enemy with which the character is colliding} chickenIsJumpedOn
     * @returns parametes that must be met
     */
    characterJumpsOnSmallChicken(chickenIsJumpedOn) {
        // character must be in air, character must be go to the ground and heigth of chicken he jumps on is the height of the small chicken
        return this.character.y >= 105 && this.character.speedY >= -30 && this.character.speedY < 0 && chickenIsJumpedOn.height == 50
    }


    characterJumpsOnNormalChicken(chickenIsJumpedOn) {
        // character must be in air, character must be go to the ground and heigth of chicken he jumps on is the height of the normal chicken
        return this.character.y >= 105 && this.character.speedY >= -30 && this.character.speedY < 0 && chickenIsJumpedOn.height == 70
    }


    /**
     * animates the dead of the small chicken
     * @param {*number, index of the enemy with which the character is colliding} index 
     */
    animateDeadOfSmallChicken(index) {
        this.character.speedY = 0;
        playOrStopSound(this.level.enemies[index].deadChickenSound);
        this.showDeadSmallChicken(index);
        this.characterEliminateNearbyEnemies();
    }


    animateDeadOfChicken(index) {
        this.character.speedY = 0;
        playOrStopSound(this.level.enemies[index].deadChickenSound);
        this.showDeadChicken(index);
        this.characterEliminateNearbyEnemies();
    }


    /**
     * when character is colliding with an enemy, function checks if other enemy are in close proximity to
     * then they also will be killed
     */
    characterEliminateNearbyEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.chickenIsNearby(enemy)) {
                this.character.speedY = 0;
                let index = this.level.enemies.indexOf(enemy); //index of enemy who is nearby
                this.collidingSmallOrNormalChicken(index);
            }
        });
    }


    /**
     * checks if small or normal chicken gets killed
     * @param {*number, index of the chicken who gets killed} indexEnemy 
     */
    collidingSmallOrNormalChicken(indexEnemy) {
        let chickenWhoGetsKilled = this.level.enemies[indexEnemy];
        if (chickenWhoGetsKilled.height == 70) //height of a normal chicken
            this.showDeadChicken(indexEnemy);
        else if (chickenWhoGetsKilled.height == 50) //height of a small chicken
            this.showDeadSmallChicken(indexEnemy);
    }


    /**
     * @param {*number, index of the small chicken who gets killed} index 
    */
    showDeadSmallChicken(index) {
        let smallChickenWhoGetsKilled = this.level.enemies[index];
        this.deadSmallChicken = new DeadSmallChicken(smallChickenWhoGetsKilled.x);
        //generates img of a dead small chicken on the position where you jumped on
        this.deadEnemies.push(this.deadSmallChicken);
        this.level.enemies.splice(index, 1);
        setTimeout(() => {
            this.deadEnemies.splice(0, 1);
        }, 2000);
    }


    /**
     * @param {*number, index of the chicken who gets killed} index 
     */
    showDeadChicken(index) {
        let chickenWhoGetsKilled = this.level.enemies[index];
        this.deadChicken = new DeadChicken(chickenWhoGetsKilled.x);
        //generates img of a dead chicken on the position where you jumped on
        this.deadEnemies.push(this.deadChicken);
        this.level.enemies.splice(index, 1);
        setTimeout(() => {
            this.deadEnemies.splice(0, 1);
        }, 2000);
    }


    checkCollectCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isCollidingCoin(coin)) {
                playOrStopSound(this.character.collisionCoin);
                this.removeCoin(coin);
                this.scoreCoins += 1;
            }
        })
    }


    removeCoin(coin) {
        let index = this.level.coins.indexOf(coin);
        this.level.coins.splice(index, 1);
    }


    checkCollectBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isCollidingBottle(bottle)) {
                playOrStopSound(this.character.collisionBottle);
                this.removeBottle(bottle);
                this.scoreBottles += 1;
            }
        })
    }


    removeBottle(bottle) {
        let index = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(index, 1);
    }


    /**
     * if you want to throw a bottle, function generates the throwable Object
     */
    checkThrowObjects() {
        if (this.wantThrowBottle()) {
            let bottle;
            this.isInAir = true;
            if (this.character.otherDirection == true) {
                bottle = new ThrowableObject(this.character.x, this.character.y + 100);
                bottle.otherDirection = true;
            } else
                bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.scoreBottles -= 1;
            bottle.setOrStopIntervalBottle(this.throwableObjects);
            this.throwNextBottle();
        }
    }


    /**
     * after 0.5s the next bottle can be thrown
     */
    throwNextBottle() {
        setTimeout(() => {
            this.isInAir = false;
        }, 800);
    }


    wantThrowBottle() {
        return this.keyboard.D && this.scoreBottles > 0 && !this.isInAir
    }


    checkBottleHit() {
        if (this.bottlesToThrow()) {
            this.level.enemies.forEach((enemy) => {
                this.throwableObjects.forEach((bottle) => {
                    if (bottle.isColliding(enemy)) {
                        let indexEnemy = this.level.enemies.indexOf(enemy);
                        let indexBottle = this.throwableObjects.indexOf(bottle);
                        bottle.bottleBreaks(bottle, indexBottle, this.throwableObjects);
                        this.hurtEndbossOrKillChicken(indexEnemy, indexBottle);
                    }
                })
            })
        }
    }


    bottlesToThrow() {
        return this.throwableObjects.length > 0
    }


    /**
     * @param {number} indexEnemy index of enemy who gets hit with bottle
     * @param {number} indexBottle index of bottle which hits chicken
     */
    hurtEndbossOrKillChicken(indexEnemy, indexBottle) {
        if (this.endboss.collidingWithEndboss(indexEnemy))
            this.endboss.endbossGetsHurt(indexBottle);
        else
            this.chickenGetsKilled(indexEnemy, indexBottle);
    }


    /**
     * @param {number} indexEnemy index of enemy from level.enemies array who gets killed
     * @param {number} indexBottle index of the bottle who kills the enemy
     */
    chickenGetsKilled(indexEnemy, indexBottle) {
        playOrStopSound(this.level.enemies[indexEnemy].deadChickenSound);
        setTimeout(() => {
            this.throwableObjects.splice(indexBottle, 1);
        }, 400);
        this.collidingSmallOrNormalChicken(indexEnemy);
        this.bottleEliminateNearbyEnemies(indexBottle);
    }


    /**
    * @param {number} indexBottle index of the bottle who kills the enemy
     */
    bottleEliminateNearbyEnemies(indexBottle) {
        this.level.enemies.forEach((enemy) => {
            let xDifference = this.throwableObjects[indexBottle].x - enemy.x;
            if (xDifference < 75 && xDifference > -80) {
                let index = this.level.enemies.indexOf(enemy);
                this.collidingSmallOrNormalChicken(index);
            }
        });
    }


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
        this.character.drawScore(this.ctx, this.scoreCoins, this.scoreBottles);
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
        this.addToMap(this.endboss);
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
}