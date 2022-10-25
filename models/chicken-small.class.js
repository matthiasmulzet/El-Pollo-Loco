class SmallChicken extends MovableObject {
    y = 370;
    width = 50;
    height = 50;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    constructor() {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 7500;
        this.speed = 0.25 + Math.random() * 1;
        this.animate();
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