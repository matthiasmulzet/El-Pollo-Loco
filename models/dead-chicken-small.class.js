class DeadSmallChicken extends MovableObject {
    height = 80;
    width = 80;
    y = 350;

    DEAD_SMALL_CHICKEN = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    constructor(imagePath) {
        super();
        this.loadImage(imagePath);
    }
}