class Character extends MovableObject {
    height = 300;
    y = 135;
    speed = 6;


    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'

    ]

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    world;

    walking_sound = new Audio('audio/running.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    collisionChicken = new Audio('audio/collision-chicken.mp3');
    collisionCoin = new Audio('audio/collect-coin.mp3');
    collisionBottle = new Audio('audio/collect-bottle.mp3');
    gameOver = new Audio('audio/game-over.mp3');


    /**
     * the image of the character has a space all around it, when we check for collision 
     * that space is also taken into account and the character will collide with the other 
     * elements before they even touched the actual body. Offset reduces the distance to 
     * the characters actual body
     */
    offset = {
        top: 120,
        left: 40,
        right: 30,
        bottom: 30
    }


    constructor() {
        super();
        this.loadAllImages();
        this.applyGravity();
        this.animate();
    }


    loadAllImages() {
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
    }


    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            this.moveLeftOrRight();
            this.jumpOrNoJump();
            this.world.camera_x = -this.x + 100; //game environment moves with the character
        }, 1000 / 60);

        setInterval(() => {
            playOrStopSound(this.collisionChicken);
            this.animateCharacterImages();
        }, 100); //10 frames pro Sekunde
    }


    animateCharacterImages() {
        if (this.isDead()) {
            this.gameOverAnimation();
        } else if (this.isHurt(0.5)) {
            this.animateHurt();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.animateWalkingOrSleeping();
        }
    }


    gameOverAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        clearAllIntervals();
        this.gameOver.play();
        this.walking_sound.pause();
        this.letCharacterDisappearAndShowGameOver();
        this.redirectToStartpage();
    }


    letCharacterDisappearAndShowGameOver() {
        setTimeout(() => {
            setInterval(() => {
                this.y += 10;
            }, 100);
            showGameOverOrWin('GAME OVER');
        }, 2000);
    }


    redirectToStartpage() {
        setTimeout(() => {
            setTimeout(() => {
                document.location.reload();
            }, 3000);
        }, 5000);
    }


    animateWalkingOrSleeping() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }

        else {
            this.playAnimation(this.IMAGES_SLEEPING);
        }
    }


    animateHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (this.isHurt(0.5)) {
            playOrStopSound(this.collisionChicken);
        }
    }


    /**
     * proofs if character should go left or right
     */
    moveLeftOrRight() {
        if (this.shouldWalkToRight()) {
            this.walkRight();
        }

        if (this.shouldWalkToLeft()) {
            this.walkLeft();
        }
    }


    shouldWalkToRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }


    walkRight() {
        this.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) {//when character is not in air
            this.walking_sound.play();
        }
    }


    shouldWalkToLeft() {
        return this.world.keyboard.LEFT && this.x > 100;
    }


    walkLeft() {
        this.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround()) {
            this.walking_sound.play();
        }
    }



    jumpOrNoJump() {
        if (this.shouldJump()) {
            this.walking_sound.pause();
            this.jump();
            this.jump_sound.play();
        }

        if (this.noJump()) {
            this.speedY = 0;
        }
    }


    shouldJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround()
    }


    noJump() {
        return !this.world.keyboard.SPACE && !this.isAboveGround()
    }


    jump() {
        this.speedY = 30;
    }
}