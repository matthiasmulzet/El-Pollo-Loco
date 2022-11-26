class DeadChicken extends MovableObject {
    height = 80;
    width = 80;
    y = 350;


    /**
    * @param {the place of the chicken who was killed} x 
    */
    constructor(x) {
        super();
        //when Chicken was killed by bottle or character, image of a dead chicken will be shown
        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.x = x;
    }
}