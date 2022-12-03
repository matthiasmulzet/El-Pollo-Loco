let canvas;
let world;
let keyboard = new Keyboard();
level = level1;
let playSound = true;

function init() {
    canvas = document.getElementById('canvas');
    if (screen.width < 1368)
        showResponsiveControlButtons();
    initLevel(); //creates all Elements in the game, except character
    setTimeout(() => {
        world = new World(canvas, keyboard);
    }, 100);
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startscreen-without-canvas').classList.add('d-none');
    showControlsInCanvas();
}


function showResponsiveControlButtons() {
    document.getElementById('controls-responsive').classList.remove('d-none');
    //buttons to go, jump and throw with character will be shown
}


/**
 * if you have a Problem with the Opera Browser, this function should fix it
 */
function checkOrientation() {
    if (window.matchMedia("(orientation: landscape)").matches) {
        if (window.innerHeight < 480) {
            newHeight = window.innerHeight;
            document.getElementById('canvas').style.height = `${newHeight}px`;
        }
    }
    else {
        document.getElementById('canvas').style.height = `100%`;
    }
}


function showControlsInCanvas() {
    document.getElementById('buttons-in-canvas').classList.remove('d-none');
    let controls = document.getElementById('controls');
    document.getElementById('startscreen').appendChild(controls);
    document.getElementById('controls').classList.add('center-controls');
}


function showBottleAndArrowUpByControls() {
    document.getElementById('controls-space-up').style.display = 'none';
    document.getElementById('controls-d').style.display = 'none';
    document.getElementById('controls-arrow-up').style.display = 'unset';
    document.getElementById('controls-bottle').style.display = 'unset';
}



/**
 * at the end of the game all intervals will be cleared
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}


/**
 * function for the responsive buttons to move the character
 */
function responsivePressEvents() {
    responsiveGoLeft();
    responsiveGoRight();
    responsiveJumpUp();
    responsiveThrowBottle();
}


/**
 * when you click on the left arrow, the background from the arrow truns yellow and
 * character moves to left, if you move your finger from the arrow, character stops
 */
function responsiveGoLeft() {
    document.getElementById('go-left').addEventListener('touchstart', () => {
        keyboard.LEFT = true;
        document.getElementById('go-left').classList.add('bg-yellow');
    });

    document.getElementById('go-left').addEventListener('touchend', () => {
        keyboard.LEFT = false;
        document.getElementById('go-left').classList.remove('bg-yellow');
    });
}


function responsiveGoRight() {
    document.getElementById('go-right').addEventListener('touchstart', () => {
        keyboard.RIGHT = true;
        document.getElementById('go-right').classList.add('bg-yellow');
    });

    document.getElementById('go-right').addEventListener('touchend', () => {
        keyboard.RIGHT = false;
        document.getElementById('go-right').classList.remove('bg-yellow');
    });
}


function responsiveJumpUp() {
    document.getElementById('jump-up').addEventListener('touchstart', () => {
        keyboard.SPACE = true;
        document.getElementById('jump-up').classList.add('bg-yellow');
    });

    document.getElementById('jump-up').addEventListener('touchend', () => {
        keyboard.SPACE = false;
        document.getElementById('jump-up').classList.remove('bg-yellow');
    });
}


function responsiveThrowBottle() {
    document.getElementById('throw-bottle').addEventListener('touchstart', () => {
        keyboard.D = true;
        document.getElementById('throw-bottle').classList.add('bg-yellow');
    });

    document.getElementById('throw-bottle').addEventListener('touchend', () => {
        keyboard.D = false;
        document.getElementById('throw-bottle').classList.remove('bg-yellow');
    });
}


function setSoundImg() {
    let soundImgStartScreen = document.getElementById('sound-img');
    let soundImgCanvas = document.getElementById('sound-in-canvas-img');
    if (soundOnImg(soundImgStartScreen, soundImgCanvas))
        setSoundOffImg(soundImgStartScreen, soundImgCanvas);
    else
        setSoundOnImg(soundImgStartScreen, soundImgCanvas);
}


function soundOnImg(soundImgStartScreen, soundImgCanvas) {
    return soundImgStartScreen.getAttribute('src') == 'img/9_intro_outro_screens/start/sound-on-icon.svg' ||
        soundImgCanvas.getAttribute('src') == 'img/9_intro_outro_screens/start/sound-on-icon.svg'
}


function setSoundOffImg(soundImgStartScreen, soundImgCanvas) {
    soundImgStartScreen.src = 'img/9_intro_outro_screens/start/sound-off-icon.svg';
    soundImgCanvas.src = 'img/9_intro_outro_screens/start/sound-off-icon.svg';
    playSound = false;
}


function setSoundOnImg(soundImgStartScreen, soundImgCanvas) {
    soundImgStartScreen.src = 'img/9_intro_outro_screens/start/sound-on-icon.svg';
    document.getElementById('sound-in-canvas-img').src = 'img/9_intro_outro_screens/start/sound-on-icon.svg';
    // soundImgCanvas.src = 'img/9_intro_outro_screens/start/sound-on-icon.svg';
    playSound = true;
}


function playOrStopSound(sound) {
    if (playSound) {
        sound.play();
    } else {
        sound.pause();
    }
}



/**
 * when the Content in the DOM is loaded, the responsive arrows and bottle are ready for touch
 */
document.addEventListener("DOMContentLoaded", responsivePressEvents);



/**
 * keyCodes to move the character with the keyboard
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 38)
        keyboard.UP = true;
    if (e.keyCode == 39)
        keyboard.RIGHT = true;
    if (e.keyCode == 37)
        keyboard.LEFT = true;
    if (e.keyCode == 40)
        keyboard.DOWN = true;
    if (e.keyCode == 32)
        keyboard.SPACE = true;
    if (e.keyCode == 68)
        keyboard.D = true;
});


/**
 * when you go up with your finger from the button on the keyboard, character stops his move
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 38)
        keyboard.UP = false;
    if (e.keyCode == 39)
        keyboard.RIGHT = false;
    if (e.keyCode == 37)
        keyboard.LEFT = false;
    if (e.keyCode == 40)
        keyboard.DOWN = false;
    if (e.keyCode == 32)
        keyboard.SPACE = false;
    if (e.keyCode == 68)
        keyboard.D = false;
});
