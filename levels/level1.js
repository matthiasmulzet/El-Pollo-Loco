
let allCoins = [];

for (let i = 0; i < 30; i++) {
    let coin = new Coin();
    allCoins.push(coin);
}

const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
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
    ]
);
