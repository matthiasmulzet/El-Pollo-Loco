class Coin extends MovableObject {
    height = 130;
    width = 130;


    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    offset = {
        top: 0,
        left: 0,
        right: 0,
        botttom: 0
    }

    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);

        this.x = 400 + Math.random() * 6800;
        this.y = 40 + Math.random() * 250;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 400);
    }
}