class Chicken extends MovableObject {
    y = 355;
    width = 70;
    height = 70;
    pathImage = ['img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'];

    i = 0;

    constructor() {
        super().loadImage(this.pathImage[this.i]);

        this.x = 200 + Math.random() * 500; //Zahl zwischen 200 und 700
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 1;
        }, 1000 / 60);
    }
}