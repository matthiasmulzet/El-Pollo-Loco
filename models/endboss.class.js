class Endboss extends MovableObject {
    width = 300;
    height = 400;
    y = 50;
    speed = 10;
    increasedSpeed = 0;
    otherDirection = false;


    IMAGES_WATCHING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    endbossHurt = new Audio('../audio/endboss-hurt.mp3');

    constructor() {
        super();
        this.loadImages(this.IMAGES_WATCHING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.x = 2000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.inScreen == true && this.otherDirection == false) {
                this.playAnimation(this.IMAGES_WALKING);
                this.x -= this.speed;
            }

            else {
                this.playAnimation(this.IMAGES_WATCHING);
            }

            if (this.otherDirection == true) {
                this.playAnimation(this.IMAGES_WALKING);
                this.x += this.speed;
            }

            if (this.isHurt(0.5)) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_HURT);
                setTimeout(() => {
                    this.increasedSpeed += 1;
                    this.speed = 10 + this.increasedSpeed;
                }, 400);
            }
        }, 100);
    }
}