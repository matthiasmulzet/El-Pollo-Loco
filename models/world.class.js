class World {
    character = new Character();
    statusbarHealth = new StatusbarHealth();
    statusbarBottle = new StatusbarBottle();
    statusbarCoin = new StatusbarCoin();
    statusbarEndboss = new StatusbarEndboss();
    level = level1;

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
        let endboss = this.level.enemies[this.level.enemies.length - 1];
        endboss.world = this;
    }


    /**
     * runs the whole game
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBottleHit();
            this.checkEndboss();
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
                let chickenIsJumpedOn = this.level.enemies[index];
                if (this.characterJumpsOnSmallChicken(chickenIsJumpedOn)) {
                    this.animateDeadOfSmallChicken(index);
                } else if (this.characterJumpsOnNormalChicken(chickenIsJumpedOn)) {
                    this.animateDeadOfChicken(index);
                } else {
                    this.character.hit();
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }


    /**
     * @param {*enemy with which the character is colliding} chickenIsJumpedOn
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
     * @param {*index of the enemy with which the character is colliding} index 
     */
    animateDeadOfSmallChicken(index) {
        this.character.speedY = 0;
        this.level.enemies[index].deadChickenSound.play();
        this.showDeadSmallChicken(index);
        this.characterEliminateNearbyEnemies();
    }


    animateDeadOfChicken(index) {
        this.character.speedY = 0;
        this.level.enemies[index].deadChickenSound.play();
        this.showDeadChicken(index);
        this.characterEliminateNearbyEnemies();
    }


    /**
     * when character is colliding with an enemy, function checks if other enemy are in close proximity to
     * then they also will be killed
     */
    characterEliminateNearbyEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.chickenIsNearby(enemy)) {
                this.character.speedY = 0;
                let index = this.level.enemies.indexOf(enemy); //index of enemy who is nearby
                this.collidingSmallOrNormalChicken(index);
            }
        });
    }


    /**
     * @param {enemy of the level.enemies array} enemy 
     * @returns the value that checks if enemies are in the immediate vicinity
     */
    chickenIsNearby(enemy) {
        let xDifference = this.character.x - enemy.x;
        return xDifference < 75 && xDifference > -100
    }


    /**
     * checks if small or normal chicken gets killed
     * @param {index of the chicken who gets killed} indexEnemy 
     */
    collidingSmallOrNormalChicken(indexEnemy) {
        let chickenWhoGetsKilled = this.level.enemies[indexEnemy];
        if (chickenWhoGetsKilled.height == 70) //height of a normal chicken
            this.showDeadChicken(indexEnemy);
        else if (chickenWhoGetsKilled.height == 50) //height of a small chicken
            this.showDeadSmallChicken(indexEnemy);
    }



    /**
     * @param {index of the small chicken who gets killed} index 
    */
    showDeadSmallChicken(index) {
        let smallChickenWhoGetsKilled = this.level.enemies[index];
        this.deadSmallChicken = new DeadSmallChicken(smallChickenWhoGetsKilled.x);
        //generates img of a dead small chicken on the position where you jumped on
        this.deadEnemies.push(this.deadSmallChicken);
        this.level.enemies.splice(index, 1);
    }


    /**
     * @param {index of the chicken who gets killed} index 
     */
    showDeadChicken(index) {
        let chickenWhoGetsKilled = this.level.enemies[index];
        this.deadChicken = new DeadChicken(chickenWhoGetsKilled.x);
        //generates img of a dead chicken on the position where you jumped on
        this.deadEnemies.push(this.deadChicken);
        this.level.enemies.splice(index, 1);
    }



    checkEndboss() {
        let lastIndex = this.level.enemies.length - 1;
        let endboss = this.level.enemies[lastIndex];
        let xDifference = endboss.x - this.character.x;
        if (xDifference < 580) {
            endboss.hadFirstContact = true;
            endboss.inScreen = true;
            this.statusbarEndboss.inScreen = true;
        }

        if (endboss.x + 200 < this.character.x) {
            endboss.otherDirection = true;
        }

        else {
            endboss.otherDirection = false;
        }
    }


    checkBottleHit() {
        if (this.bottlesToThrow()) {
            let actualBottle = this.throwableObjects.length - 1;
            this.level.enemies.forEach((enemy) => {
                this.throwableObjects.forEach((bottle) => {
                    if (bottle.isColliding(enemy)) {
                        bottle.bottleBreak.play();
                        let indexEnemy = this.level.enemies.indexOf(enemy);
                        let indexBottle = this.throwableObjects.indexOf(bottle);
                        bottle.colliding = true;
                        bottle.y = this.throwableObjects[indexBottle].y;
                        if (this.collidingWithEndboss(indexEnemy)) {
                            this.level.enemies[indexEnemy].endbossHurt.play();
                            setTimeout(() => {
                                this.throwableObjects.splice(indexBottle, 1);
                            }, 400);
                            this.level.enemies[indexEnemy].hit();
                            this.statusbarEndboss.setPercentage(this.level.enemies[indexEnemy].energy);
                        }
                        else {
                            this.level.enemies[indexEnemy].deadChickenSound.play();
                            setTimeout(() => {
                                this.throwableObjects.splice(indexBottle, 1);
                            }, 400);
                            this.collidingSmallOrNormalChicken(indexEnemy);
                            this.bottleEliminateNearbyEnemies(actualBottle);
                        }
                    }
                })
            })
        }
    }


    collidingWithEndboss(indexEnemy) {
        return indexEnemy == (this.level.enemies.length - 1)
    }


    bottleEliminateNearbyEnemies(actualBottle) {
        this.level.enemies.forEach((enemy) => {
            let xDifference = this.throwableObjects[actualBottle].x - enemy.x;
            if (xDifference < 75 && xDifference > -95) {
                let index = this.level.enemies.indexOf(enemy);
                this.collidingSmallOrNormalChicken(index);
            }
        });
    }














    bottlesToThrow() {
        return this.throwableObjects.length > 0
    }


    checkThrowObjects() {
        if (this.wantThrowBottle()) {
            let bottle;
            this.isInAir = true;
            if (this.character.otherDirection == true) {
                bottle = new ThrowableObject(this.character.x, this.character.y + 100);
                bottle.otherDirection = true;
            }

            else {
                bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            }
            this.throwableObjects.push(bottle);
            this.scoreBottles -= 1;
            this.throwNextBottle();
        }
    }


    throwNextBottle() {
        setTimeout(() => {
            this.isInAir = false;
        }, 500);
    }


    wantThrowBottle() {
        return this.keyboard.D && this.scoreBottles > 0 && !this.isInAir
    }





    checkCollectCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isCollidingCoin(coin)) {
                this.character.collisionCoin.play();
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
                this.character.collisionBottle.play();
                this.removeBottle(bottle);
                this.scoreBottles += 1;
            }
        })
    }


    removeBottle(bottle) {
        let index = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(index, 1);
    }





    // Fügt alle Objekte zu unserem Canvas hinzu, zeichnet Hintergrund und Obejekte
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // ------- Space for fixed objects ------- 
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarCoin);
        if (this.statusbarEndboss.inScreen == true) {
            this.addToMap(this.statusbarEndboss);
        }
        this.drawScore();
        this.ctx.translate(this.camera_x, 0); //Forwards

        this.addToMap(this.character);

        this.addObjectsToMap(this.deadEnemies);
        for (let i = 0; i < this.level.enemies.length - 1; i++) {
            const actualEnemy = this.level.enemies[i];
            this.addToMap(actualEnemy);
        }
        this.addToMap(this.level.enemies[this.level.enemies.length - 1]);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        // draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {//img turns to other side
            this.flipImage(mo);
        }
        try {
            mo.draw(this.ctx);
        } catch (e) {
            console.log('Error loading image', e);
            console.log('Could not load image', mo);
        }
        mo.drawFrame(this.ctx);


        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
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