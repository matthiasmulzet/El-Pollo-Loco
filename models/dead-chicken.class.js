class DeadChicken extends MovableObject {
    height = 80;
    width = 80;
    y = 350;

    constructor(x) {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.x = x;
    }
}