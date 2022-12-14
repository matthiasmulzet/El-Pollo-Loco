class Endboss extends MovableObject {
    width = 300;
    height = 400;
    y = 50;
    speed = 10;
    increasedSpeed = 0; //gets higher when endboss gets hurt
    otherDirection = false;
    hadFirstContact = false; //will be true when endboss apperas the first time in the screen
    xDifference;
    characterIsDead = false;

    world;

    IMAGES_WATCHING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'

    ]


    endbossHurt = new Audio('audio/endboss-hurt.mp3');
    endbossDead = new Audio('audio/win.mp3');


    constructor() {
        super();
        this.loadImages(this.IMAGES_WATCHING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 6500; //starting value
        this.animate();
    }


    animate() {
        let i = 1; // i is only 1 till hadFirstContact will be true the first time in the world.js
        //only then the watching animation should be showed
        setInterval(() => {
            if (this.endbossAppearsFirstTime(i)) {
                this.playAnimation(this.IMAGES_WATCHING);
                setTimeout(() => {
                    i = 0;
                    this.hadFirstContact = false;
                }, 1000);
            } else
                this.animateDifferentSituations();
        }, 100);
    }


    endbossAppearsFirstTime(i) {
        return this.hadFirstContact == true && i > 0
    }


    animateDifferentSituations() {
        if (this.isDead())
            this.animateWin();
        else if (this.characterIsDead == true)
            this.playAnimation(this.IMAGES_WATCHING);
        else if (this.isHurt(0.5))
            this.animateHurtEndboss();
        else if (this.endbossShouldMoveLeft())
            this.endbossMoveLeft();
        else if (this.endbossShouldMoveRight())
            this.endbossMoveRight();
        else
            this.playAnimation(this.IMAGES_WALKING);
    }


    animateWin() {
        this.playAnimation(this.IMAGES_DEAD);
        this.stopCharacter();
        playOrStopSound(this.endbossDead);
        setTimeout(() => {
            this.letEndbossDisappear();
            this.world.character.walking_sound.pause();
            showGameOverOrWin('!!! WIN !!!');
        }, 2000);
        this.clearIntervalsAndRedirectToStartpage();
    }


    stopCharacter() {
        this.world.character.endbossIsDead = true; //can't collision with chicken
        this.world.keyboard = 0; // can't move with character
        this.world.character.energy = 50; //energy will be increased, that when character 
        //has low energy an gets hurt, he doesn't die immediately after endboss dies
        this.world.character.walking_sound.pause();
    }



    /**
    * when endboss is dead, endboss will disappear slowly
    */
    letEndbossDisappear() {
        setInterval(() => {
            this.y += 10;
        }, 100);
    }


    clearIntervalsAndRedirectToStartpage() {
        setTimeout(() => {
            this.endbossDead.pause();
            clearAllIntervals();
            setTimeout(() => {
                document.location.reload();
            }, 2000);
        }, 4000);
    }


    animateHurtEndboss() {
        this.speed = 0; //endboss stops briefly
        this.playAnimation(this.IMAGES_HURT);
        setTimeout(() => {
            this.increasedSpeed += 0.5;
            this.speed = 10 + this.increasedSpeed;
        }, 400);
    }


    endbossShouldMoveLeft() {
        return this.inScreen == true && this.otherDirection == false
    }


    endbossShouldMoveRight() {
        return this.otherDirection == true
    }


    endbossMoveLeft() {
        this.playAnimation(this.IMAGES_WALKING);
        this.x -= this.speed;
    }


    endbossMoveRight() {
        this.playAnimation(this.IMAGES_WALKING);
        this.x += this.speed;
    }


    /**
     * @param {number} indexEnemy index of enemy from level.enemies array
     * @returns indexEnemy == index of endboss
     */
    collidingWithEndboss(indexEnemy) {
        let endbossIndex = this.world.level.enemies.length - 1;
        return indexEnemy == endbossIndex
    }


    /**
     * @param {number} indexBottle index of the bottle which is colliding with endboss
     */
    endbossGetsHurt(indexBottle) {
        playOrStopSound(this.endbossHurt);
        setTimeout(() => {
            this.world.throwableObjects.splice(indexBottle, 1);
        }, 400);
        this.hit();
        this.world.statusbarEndboss.setPercentage(this.energy);
    }


    checkEndboss(characterXPosition) {
        this.xDifference = this.x - characterXPosition;
        if (this.endBossIsInScreen()) {
            this.hadFirstContact = true;
            this.inScreen = true;
            this.world.statusbarEndboss.inScreen = true; //statusbar appears
        }
        this.checkDirectionEndboss(characterXPosition);
    }


    endBossIsInScreen() {
        return this.xDifference < 580;
    }


    checkDirectionEndboss(characterXPosition) {
        if (this.characterIsBehindEndboss(characterXPosition))
            this.otherDirection = true;
        else
            this.otherDirection = false;
    }


    characterIsBehindEndboss(characterXPosition) {
        return this.x + 200 < characterXPosition;
    }
}