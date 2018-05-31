var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var y = 190;
var dy = 0;
var w = 50;
var h = 100;
var jump=false;
var inAir=false;
var duck=false;
var obstacles=[];

function randInt(a, b){
    var r = Math.floor(Math.random() * b) + a;
    return r;
}
function drawDino(){
    //prepare canvas
    ctx.beginPath();
    ctx.fillStyle="grey";
    
    //jumping
    if (jump && y>30 && !duck) {
        dy = -6;
        inAir=true;
        console.log("2");
    }
    if (y<30) {
        jump=false;
        dy = 6;
        console.log("3");
    }
    if (!jump && y==190 || !jump && y==240){
        dy=0;
        inAir=false;
        console.log("ok");
    }
    
    //ducking
    if (duck) {
        h = 50;
        if (y==190){
            y = 240;
        }
        if (y<190){
            dy=10;
        }
        jump=false;
    }
    if (!duck && !inAir) {
        h = 100;
        y = 190;
    }
    if (y>240){
        y=240;
        dy=0;
    }
    //draw
    y+=dy;
    ctx.fillRect(10, y, w, h);
}

function keyDown(event){
    if (event.keyCode==32){
        if (!inAir){
            jump=true;
            console.log("1");
        }
    }
    if (event.keyCode==40){
        duck=true;
    }
}

function keyUp(event){
    if (event.keyCode==40){
        duck=false;
    }
}

function updateObs(obs){
    if (obs.x<0){
        obstacles.splice(0, 1);
    }
    obs.x -= 5;
}

function drawObs(obs){
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
}

function checkDeath(obs){
    
}
function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    if (obstacles.length == 0) {
        var obs = {
            w: randInt(20, 75),
            x: 1000-this.w,
            y: 240,
            h: 50
        };
        console.log("newrect");
        obstacles.push(obs);
    }
    var i=0;
    while (i<obstacles.length){
        updateObs(obstacles[i]);
        drawObs(obstacles[i]);
        i+=1;
    }
}
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.setInterval(update, 10);