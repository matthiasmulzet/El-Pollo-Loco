

function showControls() {
    document.getElementById('controls').classList.add('visible');
    document.getElementById('controls').classList.remove('hidden');
    document.getElementById('startscreen-img').classList.add('grayscale');
    document.getElementById('startscreen-img').classList.remove('no-grayscale');
}


function closeControls() {
    document.getElementById('controls').classList.add('hidden');
    document.getElementById('controls').classList.remove('visible');
    document.getElementById('startscreen-img').classList.add('no-grayscale');
    document.getElementById('startscreen-img').classList.remove('grayscale');
}


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
        document.getElementById('overlay-game-over-or-win').style = ' width: 720px; height: 480px;';
        document.getElementById('canvas').style = ' width: 720px; height: 480px;';
    }

    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        document.getElementById('overlay-game-over-or-win').style = ' width: 720px; height: 480px;';
        document.getElementById('canvas').style = ' width: 720px; height: 480px;';
    }
    document.getElementById('fullscreen').onclick = function () { showFullScreen() };
}



function showGameOverOrWin(text) {
    document.getElementById('text-game-over-or-win').innerHTML = text;
    document.getElementById("overlay-game-over-or-win").style.display = "block";
}


