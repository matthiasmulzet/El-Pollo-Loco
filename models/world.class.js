class World {
    draw = new Draw();
    character = new Character();
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
        this.draw.draw();
        this.keyboard = keyboard;
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
            this.draw.statusbarHealth.setPercentage(this.character.energy);
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
            if (this.chickenIsNearby(enemy)) {
                this.character.speedY = 0;
                let index = this.level.enemies.indexOf(enemy); //index of enemy who is nearby
                this.collidingSmallOrNormalChicken(index);
            }
        });
    }


    /**
     * @param {*obejct, enemy from the level.enemies array} enemy 
     * @returns the value that checks if enemies are in the immediate vicinity
     */
    chickenIsNearby(enemy) {
        let xDifference = this.character.x - enemy.x;
        return xDifference < 75 && xDifference > -90
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
            this.setOrStopIntervalBottle();
            this.throwNextBottle();
        }
    }


    wantThrowBottle() {
        return this.keyboard.D && this.scoreBottles > 0 && !this.isInAir
    }


    setOrStopIntervalBottle() {
        let intervalThrownBottle = setInterval(() => {
            this.throwableObjects.forEach((thrownBottle) => {
                if (thrownBottle.y > 1000) {
                    let index = (this.throwableObjects.indexOf(thrownBottle));
                    this.throwableObjects.splice(index, 1);
                    if (this.throwableObjects.length <= 0)
                        clearInterval(intervalThrownBottle);
                }
            });
        }, 2000);
    }


    /**
     * after 0.5s the next bottle can be thrown
     */
    throwNextBottle() {
        setTimeout(() => {
            this.isInAir = false;
        }, 500);
    }


    checkBottleHit() {
        if (this.bottlesToThrow()) {
            this.level.enemies.forEach((enemy) => {
                this.throwableObjects.forEach((bottle) => {
                    if (bottle.isColliding(enemy)) {
                        let indexEnemy = this.level.enemies.indexOf(enemy);
                        let indexBottle = this.throwableObjects.indexOf(bottle);
                        this.bottleBreaks(bottle, indexBottle);
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
     * @param {object} bottle ThrowableObject
     * @param {number} indexBottle index of bottle which kills enemy and breaks
     */
    bottleBreaks(bottle, indexBottle) {
        playOrStopSound(bottle.bottleBreak);
        bottle.colliding = true; //animates bottle break in throwable-object.class.js file
        bottle.y = this.throwableObjects[indexBottle].y;
    }


    /**
     * @param {number} indexEnemy index of enemy who gets hit with bottle
     * @param {number} indexBottle index of bottle which hits chicken
     */
    hurtEndbossOrKillChicken(indexEnemy, indexBottle) {
        if (this.collidingWithEndboss(indexEnemy))
            this.endbossGetsHurt(indexEnemy, indexBottle);
        else
            this.chickenGetsKilled(indexEnemy, indexBottle);
    }


    /**
     * @param {number} indexEnemy index of enemy from level.enemies array
     * @returns indexEnemy == index of endboss
     */
    collidingWithEndboss(indexEnemy) {
        let endbossIndex = this.level.enemies.length - 1;
        return indexEnemy == endbossIndex
    }


    /**
     * @param {number} indexEnemy last index (is always the endboss) of the level.enemies array
     * @param {number} indexBottle index of the bottle which is colliding with endboss
     */
    endbossGetsHurt(indexEnemy, indexBottle) {
        let endboss = this.level.enemies[indexEnemy];
        playOrStopSound(endboss.endbossHurt);
        setTimeout(() => {
            this.throwableObjects.splice(indexBottle, 1);
        }, 400);
        endboss.hit();
        this.draw.statusbarEndboss.setPercentage(endboss.energy);
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
            if (xDifference < 75 && xDifference > -90) {
                let index = this.level.enemies.indexOf(enemy);
                this.collidingSmallOrNormalChicken(index);
            }
        });
    }


    checkEndboss() {
        let lastIndex = this.level.enemies.length - 1;
        let endboss = this.level.enemies[lastIndex];
        let xDifference = endboss.x - this.character.x;
        if (this.endBossIsInScreen(xDifference)) {
            endboss.hadFirstContact = true;
            endboss.inScreen = true;
            this.draw.statusbarEndboss.inScreen = true; //statusbar appears
        }
        this.checkDirectionEndboss(endboss);
    }


    endBossIsInScreen(xDifference) {
        return xDifference < 580;
    }


    characterIsBehindEndboss(endboss) {
        return endboss.x + 200 < this.character.x;
    }


    checkDirectionEndboss(endboss) {
        if (this.characterIsBehindEndboss(endboss))
            endboss.otherDirection = true;
        else
            endboss.otherDirection = false;
    }
}