class MovableObject {
    x = 120;
    y;
    img;
    height;
    width = 150;
    imageCache = [];


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = path;
        });
    }

    moveRight() {
        console.log('moving right');
    }

    moveLeft() {

    }
}