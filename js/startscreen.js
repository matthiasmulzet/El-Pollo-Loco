function showControls() {
    document.getElementById('controls').classList.remove('d-none');
    document.getElementById('startscreen-img').style = 'filter: grayscale(50%);';
}

function closeControls() {
    document.getElementById('controls').classList.add('d-none');
    document.getElementById('startscreen-img').style = 'filter: grayscale(0%);';
}