class Chicken extends MovableObject {
    y = 355;
    width = 70;
    height = 70;


    IMAGES_WALKING = ['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'];


    deadChickenSound = new Audio('audio/chicken-dead.mp3');


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.placeChicken();
        this.setSpeed();
        this.animate();
    }


    /**
    * Chickens will randomly placed in map
    */
    placeChicken() {
        this.x = 500 + Math.random() * 7500;
    }


    /**
     * every chicken gets a random speed
    */
    setSpeed() {
        this.speed = 2.5 + Math.random() * 2.5;
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 100);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }
}