class StatusbarEndboss extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue100.png',
        'img/7_statusbars/2_statusbar_endboss/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue0.png'
    ]


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setCharacteristics();
        this.setPercentage(100);
    }

    setCharacteristics() {
        this.x = 500;
        this.y = 0;
        this.height = 60;
        this.width = 200;
    }
}