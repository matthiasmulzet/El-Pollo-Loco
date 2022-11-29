/**
 * when you click on the Gameboy icon, this function shows the control to move the character and throw bottles
 */
function showControls() {
    document.getElementById('controls').classList.add('visible');
    document.getElementById('controls').classList.remove('hidden');
    document.getElementById('startscreen-img').classList.add('grayscale');
    document.getElementById('startscreen-img').classList.remove('no-grayscale');
}




/**
 * this function close the control overview for moving the character
 */
function closeControls() {
    document.getElementById('controls').classList.add('hidden');
    document.getElementById('controls').classList.remove('visible');
    document.getElementById('startscreen-img').classList.add('no-grayscale');
    document.getElementById('startscreen-img').classList.remove('grayscale');
}



/**
 * canvas and the startscreen container are now fullscreen
 */
function showFullScreen() {
    let startscreen = document.getElementById('startscreen');
    if (startscreen.requestFullscreen) {
        startscreen.requestFullscreen();
        document.getElementById('overlay-game-over-or-win').style = ' width: 100%; height: 100%;';
        document.getElementById('canvas').style = ' width: 100%; height: 100%;';
    }

    else if (startscreen.webkitRequestFullScreen) {
        startscreen.webkitRequestFullScreen();
        document.getElementById('overlay-game-over-or-win').style = ' width: 100%; height: 100%;';
        document.getElementById('canvas').style = ' width: 100%; height: 100%;';
    }
    document.getElementById('fullscreen').onclick = function () { closeFullScreen() };
}


function closeFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }

    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    document.getElementById('fullscreen').onclick = function () { showFullScreen() };
}


/**
 * when you lose a overlay with the text "game over" will appear
 * when you win a overlay with the text "win" will appear
 * @param {win or game over} text 
 */
function showGameOverOrWin(text) {
    document.getElementById('text-game-over-or-win').innerHTML = text;
    document.getElementById("overlay-game-over-or-win").style.display = "block";
}


