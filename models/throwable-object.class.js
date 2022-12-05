class ThrowableObject extends MovableObject {
    speedX = 20;
    colliding = false;

    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    bottleBreak = new Audio('audio/bottle-break.mp3');


    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.BOTTLE_IMAGES);
        this.loadImages(this.BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.throw();
    }


    throw() {
        this.checkDirectionThrowBottle();
        this.applyGravity();
        setInterval(() => {
            if (this.colliding == true)
                this.animateBottleBreak();
            else if (this.colliding == false)
                this.bottleDisappearsFromScreen();
        }, 80);
    }


    /**
     * which direction should bottle be thrown
     */
    checkDirectionThrowBottle() {
        if (this.otherDirection == true)
            this.speedY = -25;
        else
            this.speedY = 25;
    }


    /**
     * @param {array} throwableObjects of bottles who were thrown
     */
    setOrStopIntervalBottle(throwableObjects) {
        let intervalThrownBottle = setInterval(() => {
            throwableObjects.forEach((thrownBottle) => {
                if (thrownBottle.y > 1000) {
                    let index = (throwableObjects.indexOf(thrownBottle));
                    throwableObjects.splice(index, 1);
                    if (throwableObjects.length <= 0)
                        clearInterval(intervalThrownBottle);
                }
            });
        }, 2000);
    }


    /**
     * @param {object} bottle ThrowableObject
     * @param {number} indexBottle index of bottle which kills enemy and breaks
     * @param {array}  throwableObjects 
     */
    bottleBreaks(bottle, indexBottle, throwableObjects) {
        playOrStopSound(bottle.bottleBreak);
        this.colliding = true; //animates bottle break in throwable-object.class.js file
        bottle.y = throwableObjects[indexBottle].y;
    }


    /**
     * bottle falls out of screen
     */
    bottleDisappearsFromScreen() {
        this.playAnimation(this.BOTTLE_IMAGES);
        if (this.otherDirection == true)
            this.x -= 30;
        else
            this.x += 30;
    }


    animateBottleBreak() {
        this.playAnimation(this.BOTTLE_SPLASH);
        this.speedY = 0; //when bottle collides with object, bottle should not move more on y axis
        setTimeout(() => {
            this.colliding = false;
        }, 1300);
    }
}