class Chicken extends MovableObject {
    y = 355;
    width = 70;
    height = 70;


    IMAGES_WALKING = ['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'];


    deadChickenSound = new Audio('../audio/chicken-dead.mp3');


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.placeChicken();
        this.setSpeed();
        this.animate();
    }


    placeChicken() {
        this.x = 500 + Math.random() * 7500;
    }


    setSpeed() {
        this.speed = 0.25 + Math.random() * 0.50;
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }
}