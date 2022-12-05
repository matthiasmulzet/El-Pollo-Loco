

function showControlsBottleOrD() {
    if (screen.width < 1368)
        showBottleAndArrowUpByControls();
}


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
    let actualWidth = startscreen.offsetWidth;
    let actualHeight = startscreen.offsetHeight;
    if (startscreen.requestFullscreen) {
        startscreen.requestFullscreen();
        showFullScreenCanvasAndGameOver();
    } else if (startscreen.webkitRequestFullscreen) {
        startscreen.webkitRequestFullscreen();
        showFullScreenCanvasAndGameOver();
    }
    document.getElementById('fullscreen').onclick = function () { closeFullScreen(actualWidth, actualHeight) };
    document.getElementById('fullscreen-in-canvas').onclick = function () { closeFullScreen(actualWidth, actualHeight) };
}


function showFullScreenCanvasAndGameOver() {
    document.getElementById('overlay-game-over-or-win').style = ' width: 100%; height: 100%;';
    document.getElementById('canvas').style = ' width: 100%; height: 100%;';
}


/**
 * 
 * @param {number} actualWidth of the startscreen
 * @param {number} actualHeight of the startscreen
 */
function closeFullScreen(actualWidth, actualHeight) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
        setNormalScreenCanvasAndGameOver(actualWidth, actualHeight);
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        setNormalScreenCanvasAndGameOver(actualWidth, actualHeight);
    }
    document.getElementById('fullscreen').onclick = function () { showFullScreen() };
    document.getElementById('fullscreen-in-canvas').onclick = function () { showFullScreen() };
}



function setNormalScreenCanvasAndGameOver(actualWidth, actualHeight) {
    document.getElementById('overlay-game-over-or-win').style = `width: ${actualWidth}px; height: ${actualHeight}px;`;
    document.getElementById('canvas').style = `width: ${actualWidth}px; height: ${actualHeight}px;`;
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


