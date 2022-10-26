class DeadChicken extends MovableObject {
    height = 80;
    width = 80;
    y = 350;

    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
    }
}