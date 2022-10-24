class Coin extends MovableObject {
    height = 130;
    width = 130;

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.height = 130;
        this.width = 130;

        this.x = 200 + Math.random() * 6800;
        this.y = 50 + Math.random() * 250;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 400);
    }
}