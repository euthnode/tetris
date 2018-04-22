//TO DO
//ROTATE THE PEICES
//LOTS OF REFACTORING(pretty much done)

const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

var size = 20;
var l = [];
var o = [];
var t = [];
var movingShape = [];
var oldShapes = [];
var game;
var pos = "up";

function newShape() {
    oldShapes = oldShapes.concat(movingShape);
    movingShape = setPeice();
}

function setPeice() {


    l[0] = {
        x: 10 * size,
        y: 3 * size,
        color: "orange"
    }
    l[1] = {
        x: 10 * size,
        y: 2 * size,
        color: "orange"
    }
    l[2] = {
        x: 10 * size,
        y: 1 * size,
        color: "orange"
    }
    l[3] = {
        x: 11 * size,
        y: 1 * size,
        color: "orange"
    }

    t[0] = {
        x: 11 * size,
        y: 2 * size,
        color: "purple"
    }
    t[1] = {
        x: 12 * size,
        y: 2 * size,
        color: "purple"
    }
    t[2] = {
        x: 13 * size,
        y: 2 * size,
        color: "purple"
    }
    t[3] = {
        x: 12 * size,
        y: 1 * size,
        color: "purple"
    }

    o[0] = {
        x: 11 * size,
        y: 2 * size,
        color: "yellow"
    }
    o[1] = {
        x: 12 * size,
        y: 1 * size,
        color: "yellow"
    }
    o[2] = {
        x: 11 * size,
        y: 1 * size,
        color: "yellow"
    }
    o[3] = {
        x: 12 * size,
        y: 2 * size,
        color: "yellow"
    }

    var randomShape = Math.floor(Math.random() * 3) + 1

    if (randomShape == 1) {
        return l;
    } else if (randomShape == 2) {
        return o;
    } else {
        return t;
    }
}

//create a timer to run the game
var init = (function() {
    newShape();
    game = setInterval(check, 100);
}());

//check if game is over
function check() {
    var gameOver = checkPeices();
    if (!gameOver) {
        newFrame();
    } else {
        clearInterval(game);
    }
}

//makes sure the game can go on
function checkPeices() {
    for (var t = 0; t < oldShapes.length; t++) {
        if (oldShapes[t].y <= 140) {
            return true;
            break;
        }
    }
}

//clear the canvas
function newFrame() {
    ctx.clearRect(0, 0, c.width, c.height);
    draw();
}

//make the peice
function draw() {
    for (var i = 0; i < movingShape.length; i++) {
        ctx.fillStyle = movingShape[i].color;
        ctx.fillRect(movingShape[i].x, movingShape[i].y, size, size);
    }
    for (var z = 0; z < oldShapes.length; z++) {
        ctx.fillStyle = oldShapes[z].color;
        ctx.fillRect(oldShapes[z].x, oldShapes[z].y, size, size);
    }
    moveShape();
}

//move the peice down
function moveShape() {

    for (var x = 0; x < oldShapes.length; x++) {
        for (var y = 0; y < movingShape.length; y++) {
            if ((oldShapes[x].x == movingShape[y].x) && (oldShapes[x].y - size == movingShape[y].y)) {
                newShape();
                break;
            }
        }
    }
    for (var z = 0; z < movingShape.length; z++) {
        if (movingShape[z].y != c.height - size) {
            movingShape[z].y += size;
        } else {
            newShape();
            break;
        }
    }
}

//check for key presses
document.addEventListener("keydown", function(event) {
    var key = event.keyCode;

    if (event.keyCode == '37') {
        moveX("left");
    } else if (event.keyCode == '39') {
        moveX("right");
    }
    else if(event.keyCode == '32'){
        rotate();
    }
});

//moves the peice along x axis
function moveX(direction) {
var block = false;

  for (var x = 0; x < oldShapes.length; x++) {
      for (var y = 0; y < movingShape.length; y++) {
          if (((oldShapes[x].x - size == movingShape[y].x) || (oldShapes[x].x + size == movingShape[y].x)) && (oldShapes[x].y == movingShape[y].y)) {
              block = true;
              break;
          }
      }
  }
  if(!block){
    tenders(direction);
  }
}

function tenders(direction){
    for (var i = 0; i < movingShape.length; i++) {
        if (direction == "left") {
            movingShape[i].x -= size;
        } else if (direction == "right") {
            movingShape[i].x += size;
        }
    }
}

function rotate(){
  var pointX = movingShape[0].x;
  var pointY = movingShape[0].y;
for(var i = 0; i <movingShape.length; i++){
movingShape[i].x -= pointX;
movingShape[i].y -= pointY;
var tempX = movingShape[i].x;
var tempY = movingShape[i].y;
movingShape[i].x = tempY * -1;
movingShape[i].y = tempX;
movingShape[i].x -= pointX;
movingShape[i].y -=pointY;
movingShape[i].x *= -1;
movingShape[i].y *= -1;
console.log(movingShape[i].x, movingShape[i].y);
}
}
