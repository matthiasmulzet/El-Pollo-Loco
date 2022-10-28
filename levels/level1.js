let allCoins = [];
let allBottles = [];

//create 30 coins and push them in Array
for (let i = 0; i < 30; i++) {
    let coin = new Coin();
    allCoins.push(coin);
}


//create 15 Bottles who looks to the left and push them in Array
for (let i = 0; i < 15; i++) {
    let bottle = new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    allBottles.push(bottle);
}


//create 15 Bottles who looks to the right and push them in Array
for (let i = 15; i < 30; i++) {
    let bottle = new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    allBottles.push(bottle);
}

//all Objects from the Game except Character
const level1 = new Level(
    [
        new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
        new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
        new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(),
        new SmallChicken(), new SmallChicken(), new SmallChicken(), new SmallChicken(),
        new SmallChicken(), new SmallChicken(), new SmallChicken(), new SmallChicken(),
        new SmallChicken(), new SmallChicken(), new SmallChicken(), new SmallChicken(),
        new SmallChicken(), new SmallChicken(), new SmallChicken(),
        new Endboss()
    ],
    [
        new Cloud('img/5_background/layers/4_clouds/1.png', 200),
        new Cloud('img/5_background/layers/4_clouds/1.png', 1000),
        new Cloud('img/5_background/layers/4_clouds/1.png', 2000),
        new Cloud('img/5_background/layers/4_clouds/1.png', 3000),
        new Cloud('img/5_background/layers/4_clouds/1.png', 4000),
        new Cloud('img/5_background/layers/4_clouds/1.png', 5000),
        new Cloud('img/5_background/layers/4_clouds/1.png', 6000),
        new Cloud('img/5_background/layers/4_clouds/1.png', 7000),
        new Cloud('img/5_background/layers/4_clouds/1.png', 8000),
        new Cloud('img/5_background/layers/4_clouds/1.png', 9000)
    ],
    [
        new BackgroundObject('img/5_background/first_half_background.png', 0),
        new BackgroundObject('img/5_background/second_half_background.png', 719),
        new BackgroundObject('img/5_background/first_half_background.png', 1439),
        new BackgroundObject('img/5_background/second_half_background.png', 2159),
        new BackgroundObject('img/5_background/first_half_background.png', 2879),
        new BackgroundObject('img/5_background/second_half_background.png', 3599),
        new BackgroundObject('img/5_background/first_half_background.png', 4319),
        new BackgroundObject('img/5_background/second_half_background.png', 5039),
        new BackgroundObject('img/5_background/first_half_background.png', 5759),
        new BackgroundObject('img/5_background/second_half_background.png', 6479),
        new BackgroundObject('img/5_background/first_half_background.png', 7199),
        new BackgroundObject('img/5_background/second_half_background.png', 7919),
        new BackgroundObject('img/5_background/first_half_background.png', 8639)
    ],
    [
        allCoins[0], allCoins[1], allCoins[2], allCoins[3], allCoins[4], allCoins[5], allCoins[6], allCoins[7],
        allCoins[8], allCoins[9], allCoins[10], allCoins[11], allCoins[12], allCoins[13], allCoins[14],
        allCoins[15], allCoins[16], allCoins[17], allCoins[18], allCoins[19], allCoins[20], allCoins[21],
        allCoins[22], allCoins[23], allCoins[24], allCoins[25], allCoins[26], allCoins[27], allCoins[28],
        allCoins[29]
    ],
    [
        allBottles[0], allBottles[1], allBottles[2], allBottles[3], allBottles[4], allBottles[5],
        allBottles[6], allBottles[7], allBottles[8], allBottles[9], allBottles[10], allBottles[11],
        allBottles[12], allBottles[13], allBottles[14], allBottles[15], allBottles[16], allBottles[17],
        allBottles[18], allBottles[19], allBottles[20], allBottles[21], allBottles[22], allBottles[23],
        allBottles[24], allBottles[25], allBottles[26], allBottles[27], allBottles[28], allBottles[29]
    ]
);
