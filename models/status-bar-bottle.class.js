class StatusbarBottle extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];


    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        // this.loadImages(this.IMAGES);
        this.setCharacteristics();
    }


    setCharacteristics() {
        this.x = 130;
        this.y = 60;
        this.height = 55;
        this.width = 55;
    }
}