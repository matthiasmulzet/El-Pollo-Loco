class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
    speed = 0.60;


    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 300);
    }
}