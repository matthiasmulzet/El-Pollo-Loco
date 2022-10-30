class World {
    character = new Character();
    statusbarHealth = new StatusbarHealth();
    statusbarBottle = new StatusbarBottle();
    statusbarCoin = new StatusbarCoin();
    level = level1;

    throwableObjects = [];
    deadEnemies = [];

    isInAir = false;

    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    scoreCoins = 0;
    scoreBottles = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBottleHit();
        }, 1000 / 60);
    }


    checkBottleHit() {
        if (this.bottlesToThrow()) {
            let actualBottle = this.throwableObjects.length - 1;
            this.level.enemies.forEach((enemy) => {
                if (this.throwableObjects[actualBottle].isColliding(enemy)) {
                    let indexEnemy = this.level.enemies.indexOf(enemy);
                    this.throwableObjects[actualBottle].colliding = true;
                    this.throwableObjects[actualBottle].y = this.level.enemies[indexEnemy].y;
                    this.throwableObjects[actualBottle].x = this.level.enemies[indexEnemy].x;
                    this.level.enemies[indexEnemy].deadChickenSound.play();
                    this.collidingSmallOrNormalChicken(indexEnemy);
                    this.bottleEliminateNearbyEnemies(actualBottle);
                }
            })
        }
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


    removeDeadSmallChicken(index) {
        this.character.speedY = 0;
        this.level.enemies[index].deadChickenSound.play();
        this.deadSmallChicken = new DeadSmallChicken(this.level.enemies[index].x);
        this.deadEnemies.push(this.deadSmallChicken);
        this.level.enemies.splice(index, 1);
        this.characterEliminateNearbyEnemies();
    }


    removeDeadChicken(enemy) {
        let index = this.level.enemies.indexOf(enemy);
        this.character.speedY = 0;
        this.level.enemies[index].deadChickenSound.play();
        this.deadChicken = new DeadChicken(this.level.enemies[index].x);
        this.deadEnemies.push(this.deadChicken);
        this.level.enemies.splice(index, 1);
        this.characterEliminateNearbyEnemies();
    }


    characterEliminateNearbyEnemies() {
        this.level.enemies.forEach((enemy) => {
            let xDifference = this.character.x - enemy.x;
            if (xDifference < 80 && xDifference > -105) {
                this.character.speedY = 0;
                let index = this.level.enemies.indexOf(enemy);
                this.collidingSmallOrNormalChicken(index);
            }
        });
    }


    collidingSmallOrNormalChicken(indexEnemy) {
        if (this.level.enemies[indexEnemy].height == 70) {
            this.deadChicken = new DeadChicken(this.level.enemies[indexEnemy].x);
            this.deadEnemies.push(this.deadChicken);
        }
        else if (this.level.enemies[indexEnemy].height == 50) {
            this.deadSmallChicken = new DeadSmallChicken(this.level.enemies[indexEnemy].x);
            this.deadEnemies.push(this.deadSmallChicken);
        }
        this.level.enemies.splice(indexEnemy, 1);
    }


    bottlesToThrow() {
        return this.throwableObjects.length > 0
    }


    checkThrowObjects() {
        if (this.wantThrowBottle()) {
            this.isInAir = true;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
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


    checkCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                let index = this.level.enemies.indexOf(enemy);
                if (this.character.y >= 105 && this.character.speedY >= -30 && this.character.speedY < 0 && this.level.enemies[index].height == 50) {
                    this.removeDeadSmallChicken(index);
                } else if (this.character.y >= 105 && this.character.speedY >= -30 && this.character.speedY < 0 && this.level.enemies[index].height == 70) {
                    this.removeDeadChicken(enemy);
                } else {
                    this.character.hit();
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            }
        });
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


    checkCollisions() {
        this.checkCollision();
        this.checkCollectCoins();
        this.checkCollectBottles();
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
        this.drawScore();
        this.ctx.translate(this.camera_x, 0); //Forwards

        this.addToMap(this.character);

        this.addObjectsToMap(this.deadEnemies);
        this.addObjectsToMap(this.level.enemies);
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