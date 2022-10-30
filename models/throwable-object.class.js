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
        this.speedY = 25;
        this.applyGravity();
        setInterval(() => {
            this.x += 20;
            console.log('y position', this.y);
            // if (this.y < 80) {
            //     this.y = 80;
            //     this.speedY = 0;
            // }
            if (this.colliding == true) {
                this.playAnimation(this.BOTTLE_SPLASH);
                setTimeout(() => {
                    this.colliding = false;
                }, 1000);
            }
            else {
                this.playAnimation(this.BOTTLE_IMAGES);
            }
        }, 50);
    }
}