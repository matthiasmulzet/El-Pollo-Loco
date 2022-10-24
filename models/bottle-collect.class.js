class Bottle extends MovableObject {
    height = 70;
    width = 70;


    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
        this.y = 355;
        this.x = 500 + Math.random() * 6800;
    }
}