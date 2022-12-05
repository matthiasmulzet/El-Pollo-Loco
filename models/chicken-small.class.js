class SmallChicken extends MovableObject {
    y = 370;
    width = 50;
    height = 50;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];


    deadChickenSound = new Audio('audio/chicken-dead.mp3');


    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.placeChicken();
        this.setSpeedChicken();
        this.animate();
    }


    /**
     * Chickens will randomly placed in map
     */
    placeChicken() {
        this.x = 300 + Math.random() * 7500;
    }


    /**
     * every chicken gets a random speed
     */
    setSpeedChicken() {
        this.speed = 3 + Math.random() * 3;
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