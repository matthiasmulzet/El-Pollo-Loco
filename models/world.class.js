class World {
    character = new Character();
    level = level1;
    statusbarHealth = new StatusbarHealth();
    statusbarBottle = new StatusbarBottle();
    statusbarCoin = new StatusbarCoin();

    throwableObjects = [];

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
                if (this.character.y >= 105 && this.character.speedY <= -30) {
                    this.level.enemies[index].img.src = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
                    console.log('character y', this.character.y);
                    console.log('speed y', this.character.speedY);
                    this.character.speedY = 0;
                    // setTimeout(() => {
                    this.level.enemies.splice(index, 1);
                    // }, 1000);
                }

                // else if (enemy.height == 70 && this.character.y == 77.5) {
                //     let index = this.level.enemies.indexOf(enemy);
                //     console.log('x enemy', this.level.enemies[index].x);
                //     console.log('y enemy', this.level.enemies[index].y);
                //     console.log('x character', this.character.x);
                //     console.log('y character', this.character.y);
                //     debugger;
                // }

                else {
                    this.character.hit();
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

    enemyDead(enemy) {
        let index = this.level.enemies.indexOf(enemy);
        return this.level.enemies[index].img.src == 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    }

    showEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.enemyDead(enemy)) {
                this.level.enemies[enemy].loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
            }
            else {
                this.addObjectsToMap(this.level.enemies);
            }
        });
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

        this.showEnemy();
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

        mo.draw(this.ctx);
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