var runners;
var trackImg;
var hurdle;
var database;

var game, gameState = 0;
var player;
var playerCount = 0;
var distance = 0;
var form;

var runner1, runner2;
var contestants = [];


var invisibleGround;
var invisibleGround2;

var allPlayers = [];

function preload(){
    runners = loadAnimation("images/b.png", "images/y.png", "images/p.png");
    trackImg = loadImage("images/pla.jpg");
    hurdle = loadImage("images/hurdle.png");
}
function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    database = firebase.database();

    game = new Game();
    game.getState();
    game.start()

}

function draw(){
    background(255);

    if(gameState === 1){
        clear();
        game.play();
    }

    if(playerCount === 2){
        game.update(1);
    }

    if(gameState === 2){
        game.end();
    }
}