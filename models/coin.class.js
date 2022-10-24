class Coin extends MovableObject {

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.height = 60;
        this.width = 60;

        this.x = 200 + Math.random() * 500;
        this.y = 100 + Math.random() * 1000;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 100);
    }
}