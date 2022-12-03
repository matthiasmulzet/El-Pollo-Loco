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
        }, 50);
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
     * bottle falls out of screen
     */
    bottleDisappearsFromScreen() {
        this.playAnimation(this.BOTTLE_IMAGES);
        if (this.otherDirection == true)
            this.x -= 20;
        else
            this.x += 20;
    }


    animateBottleBreak() {
        this.playAnimation(this.BOTTLE_SPLASH);
        this.speedY = 0; //when bottle collides with object, bottle should not move more on y axis
        setTimeout(() => {
            this.colliding = false;
        }, 1000);
    }
}