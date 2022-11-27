class StatusbarCoin extends DrawableObject {

    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.setCharacteristics();
    }



    /**
     * places the bottle next to the number of the collected coins
     */
    setCharacteristics() {
        this.x = -20;
        this.y = 20;
        this.height = 140;
        this.width = 140;
    }
}