class Bottle extends MovableObject {
    height = 70;
    width = 70;


    offset = {
        top: 0,
        left: 0,
        right: 0,
        botttom: 0
    }

    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
        this.y = 355;
        this.x = 500 + Math.random() * 6800;
    }
}