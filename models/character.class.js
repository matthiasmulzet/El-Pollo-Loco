class Character extends MovableObject {
    height = 300;
    y = 135;
    speed = 6;
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

    walking_sound = new Audio('../audio/running.mp3');
    jump_sound = new Audio('../audio/jump.mp3');
    collisionChicken = new Audio('../audio/collision-chicken.mp3');
    collisionCoin = new Audio('../audio/collect-coin.mp3');
    collisionBottle = new Audio('../audio/collect-bottle.mp3');


    offset = {
        top: 120,
        left: 40,
        right: 30,
        bottom: 30
    }


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.LEFT && this.x > 100) {
                this.moveLeft();
                this.otherDirection = true;
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.walking_sound.pause();
                this.jump();
                this.jump_sound.play();
            }

            if (!this.world.keyboard.SPACE && !this.isAboveGround() && this.world.keyboard.RIGHT) {
                this.speedY = 0;
            }

            if (!this.world.keyboard.SPACE && !this.isAboveGround() && this.world.keyboard.LEFT) {
                this.speedY = 0;
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            this.collisionChicken.pause();
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt(0.5)) {
                this.playAnimation(this.IMAGES_HURT);
                if (this.isHurt(0.5)) {
                    this.collisionChicken.play();
                }
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                this.loadImage('img/2_character_pepe/2_walk/W-21.png');
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk Animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }

        }, 100); //10 frames pro Sekunde
    }

    jump() {
        this.speedY = 30;
    }
}