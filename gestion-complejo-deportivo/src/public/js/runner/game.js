document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32){
        console.log('Personaje salta');
        playerJump();
    }
})
//-----------------CONSTANTES-----------------
const width = 1000;
const height = 600;
var character, ground, barrier, background;

window.onload = init;

function init () {
    console.log('Inicializando el juego');
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    loadSprites();
}


function loadSprites(){
    //width = 152, height = 496
    character = new Image();
    ground = new Image();
    barrier = new Image();
    background = new Image();

    character.src = '/img/game/character.png';
    barrier.src = '/img/game/barrier.png';
    background.src = '/img/game/hinchada.png';
    ground.src = '/img/game/ground.png';
}

var environment = {
    ground: 500,
    velocity: 10,
    score: 0,
}

var player = {
    positionY: environment.ground,
    speedY: 0,
    MaxSpeedY: 10,
    gforce: 1.5,
    jump: 28,
    jumping: false,

};

var barrierObj = {
    positionX: 300,
    positionY: width + 100,
}

var backgroundObj = {
    positionX: 0,
    positionY: 0,
    scrollVelocity: 2,
}

var groundObj = {
    positionX: 0,
    positionY: 0,
    scrollVelocity: 2,
}

//DIBUJA AL PERSONAJE PRINCIPAL
function drawCharacter() {
    ctx.drawImage(character, 0, 0, 152, 496, 100, player.positionY, 25, 50);
}

//DIBUJA LOS OBSTACULOS
function drawBarrier() {
    ctx.drawImage(barrier, 0, 0, 450, 490, barrierObj.positionX, environment.ground, 60, 60);
}

function spawnBarrier(){
    if(barrierObj.positionX < -100){
        barrierObj.positionX = width + 100;
    } else{
        barrierObj.positionX -= environment.velocity;
    }
}

function drawBackground() {
    ctx.drawImage(background, backgroundObj.positionX, 0, 3748, 377, 0, backgroundObj.positionY, 3748, 377);
    ctx.drawImage(ground, groundObj.positionX, 0, 823, 115, 0, environment.ground, 1646, 115);
}

function scrollBackground(){
    if(backgroundObj.positionX > width){
        backgroundObj.positionX = 0;
    } else{
        backgroundObj.positionX += environment.velocity-2;
    }
}

function scrollFloor(){
    if(groundObj.positionX > width){
        groundObj.positionX = 0;
    } else{
        groundObj.positionX += environment.velocity-3;
    }
}

var canvas,ctx;



function clearScreen() {
    canvas.width = width;
    canvas.height = height;
}

function playerJump() {
    player.jumping = true;
    player.speedY = player.jump;
}

function gravity() {
    if(player.jumping) {
        if(player.positionY > environment.ground){
            player.jumping = false;
            player.speedY = 0;
            player.positionY = environment.ground;
        } else{
            player.speedY -= player.gforce;
            player.positionY -= player.speedY;
        }
    }
}

/*-------------Main loop-------------*/
const FPS = 60;
setInterval(function() {
    mainLoop();
},1000/FPS);

function mainLoop() {
    clearScreen();
    gravity();
    spawnBarrier();
    drawBackground();
    drawBarrier();
    scrollBackground();
    scrollFloor();
    drawCharacter();
}