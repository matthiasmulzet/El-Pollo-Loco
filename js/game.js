let canvas;
let world;
let keyboard = new Keyboard();
level = level1;
let intervalIds = [];


function init() {
    canvas = document.getElementById('canvas');
    checkOrientation();
    initLevel();
    setTimeout(() => {
        world = new World(canvas, keyboard);
    }, 100);
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('test').classList.add('d-none');
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


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}



window.addEventListener('keydown', (e) => {
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener('keyup', (e) => {
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});
