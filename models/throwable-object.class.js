class ThrowableObject extends MovableObject {
    speedX = 20;


    BOTTLE_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        // this.loadImages(this.BOTTLE_IMAGES);
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
        }, 50);
    }
}