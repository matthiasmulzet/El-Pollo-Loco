let canvas;
let world;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);


    console.log('My character is', world.character);
    console.log('My enemie is', world.enemies);
}

window.addEventListener('keypress', (event) => {
    console.log(event);
    let json = KeyboardEvent;
    console.log(json[key]);
})
