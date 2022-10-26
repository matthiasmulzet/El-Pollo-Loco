class World {
    character = new Character();
    level = level1;
    statusbarHealth = new StatusbarHealth();
    statusbarBottle = new StatusbarBottle();
    statusbarCoin = new StatusbarCoin();

    throwableObjects = [];
    deadChicken = new DeadChicken('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    deadSmallChicken = new DeadSmallChicken('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    contactChicken = 0;
    contactSmallChicken = 0;


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
            this.checkCollisionsCoins();
            this.checkCollisionsBottles();
        }, 100);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                let index = this.level.enemies.indexOf(enemy);

                if (this.character.y >= 105 && this.character.speedY <= -30 && this.level.enemies[index].height == 50) {
                    this.character.speedY = 0;
                    this.contactSmallChicken = new Date().getTime();
                    this.deadSmallChicken.x = this.level.enemies[index].x;
                    this.level.enemies.splice(index, 1);
                    this.level.enemies.forEach((enemy) => {
                        let xDifference = this.character.x - enemy.x;
                        if (xDifference < 75 && xDifference > -95) {
                            this.character.speedY = 0;
                            let index = this.level.enemies.indexOf(enemy);
                            // this.deadSmallChicken.x = this.level.enemies[index].x;
                            this.level.enemies.splice(index, 1);
                        }
                    });
                }

                else if (this.character.y >= 105 && this.character.speedY <= -30 && this.level.enemies[index].height == 70) {
                    let index = this.level.enemies.indexOf(enemy);
                    this.character.speedY = 0;
                    this.contactChicken = new Date().getTime();
                    this.deadChicken.x = this.level.enemies[index].x;
                    this.level.enemies.splice(index, 1);
                    this.level.enemies.forEach((enemy) => {
                        let xDifference = this.character.x - enemy.x;
                        if (xDifference < 75 && xDifference > -95) {
                            this.character.speedY = 0;
                            let index = this.level.enemies.indexOf(enemy);
                            // this.deadChicken.x = this.level.enemies[index].x;
                            this.level.enemies.splice(index, 1);
                        }
                    });
                }


                else {
                    this.character.hit();
                    console.log('enemy height', enemy.height);
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }



    checkCollisionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isCollidingCoin(coin)) {
                this.character.collisionCoin.play();
                let index = this.level.coins.indexOf(coin);
                this.level.coins.splice(index, 1);
                this.scoreCoins += 1;
            }
        })
    }


    checkCollisionsBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isCollidingBottle(bottle)) {
                this.character.collisionBottle.play();
                let index = this.level.bottles.indexOf(bottle);
                this.level.bottles.splice(index, 1);
                this.scoreBottles += 1;
            }
        })
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

        // if (this.contactChicken > 0) {
        //     this.addToMap(this.deadChicken);
        //     setTimeout(() => {
        //         this.contactChicken = 0;
        //     }, 100);
        // }

        // if (this.contactSmallChicken > 0) {
        //     this.addToMap(this.deadSmallChicken);
        //     setTimeout(() => {
        //         this.contactSmallChicken = 0;
        //     }, 100);
        // }

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