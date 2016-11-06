var canvas;
//var canvas2;


//dots
var dotX = [80.89, 66.84, 182.42, 262.89, 412.7, 612.76, 776.09, 994.39, 1034.39, 1174.74, 1310.08, 1328.54, 1373.7, 1396.28, 1440];
var dotY = [632.91, 382.34, 404.11, 266.51, 162.66, 118.89, 138.06, 322.66, 169.74, 402.58, 263.32, 443.63, 498.29, 581.13, 401.26];
// var dotR = [19.78, 10.94, 8.15, 10.15, 9.2, 4.27, 5.26, 10.15, 5.26, 8.16, 5.26, 9.32, 5.26, 12.58, 16.5];
var dotR = [30, 15, 12, 15, 13.5, 6, 7.5, 15, 7.4, 12, 7.5, 13.5, 7.5, 18, 24];
var curDotX = [], curDotY = [], dotState = [];
var dotCoreX, dotCoreY, dotNum, dotColor = [236, 18, 91];

//lines or img
var lineState = [];
var lineOpa = [];
var lineNum;
var lineStartX = [0];
var lineStartY = [0];
var lineEndX = [550];
var lineEndY = [550];

//horns
var hornStartX = [140, 272.200, 446.830, 557.220, 860, 1081.748, 1280, 1256.545, 1100, 1035.606, 329.600];
var hornStartY = [630, 495.420, 479.560, 728.060, 749.952, 688.333, 660, 544.137, 540, 435.106, 667.670];
var hornEndX = [100, 258.112, 385.890, 472.880, 920, 1140, 1363.045, 1303.466, 1130, 1081.215, 258.112];
var hornEndY = [494.450, 434.09, 391.220, 551.240, 580, 570, 568.268, 475.797, 460, 333.988, 532.703];

// var hornStartR = [52.610, 30.235, 30.233, 83.622, 83.622, 83.622, 52.609, 40.011, 33.477, 32.393, 83.621];
var hornStartR = [85, 45.3525, 45.3495, 180, 180, 125.433, 78.9135, 60.0165, 50.2155, 48.5895, 125.4315];
var hornEndR = [6.374, 10.132, 5.523, 10.131, 10.132, 10.132, 6.374, 6.911, 6.910, 10.316, 10.316];
var hornStartColor = [236, 18, 91], hornEndColor = [0, 168, 160];
var hornCurX = [];
var hornCurY = [];
var hornState = [];
var hornNum;

//var face
var stretchy;
var face;


function setup() {
    //setup framerate
    frameRate(30);

    //setup canvas
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("animation");

    //setup dots
    dotCoreX = windowWidth / 2;
    dotCoreY = 460;
    dotNum = 15;
    for(var i = 0;i < dotNum;i++) {
        curDotX[i] = dotCoreX;
        curDotY[i] = dotCoreY;
        dotState[i] = true;
    }

    //setup lines
    lineNum = 1;
    for(var i = 0;i < lineNum;i++) {
        lineOpa[i] = 255;
        lineState[i] = true;
    }

    //setup horns
    hornNum = 11;
    for(var i = 0;i < hornNum;i++) {
        hornState[i] = 1;
        hornStartX[i] -= (1440 - windowWidth) / 2;
        hornEndX[i] -= (1440 - windowWidth) / 2;
        hornCurX[i] = hornStartX[i];
        hornCurY[i] = hornStartY[i];
    }


    //setup face
    
    face = loadImage('img/face.png');
    stretchy = createSprite(100, 200, 10, 10);
    stretchy.draw = function() {



        /*臉的顏色 fill(237, 205, 0)*/
        fill(237, 205, 0);

        //make the ellipse stretch in the sprite direction
        //proportionally to its speed
        push();
        rotate(radians(this.getDirection()));
        ellipse(0, 0, 100+this.getSpeed(), 100-this.getSpeed());
        pop();

        //this.deltaX and this.deltaY are the position increment
        //since the last frame, move the face image toward the direction
        image(face, this.deltaX*2, this.deltaY*2);
    };

    stretchy.maxSpeed = 10;
}

/*[0][1][2]桃紅色*/
function drawDots() {
    noStroke();
    fill(dotColor[110], dotColor[111], dotColor[12]);
    for(var i = 0;i < dotNum;i++) {
        var v = createVector(dotX[i] - dotCoreX, dotY[i] - dotCoreY);
        v.normalize();
        if(dotState[i] == true) {
            // going outward
            fill(dotColor[110], dotColor[111], dotColor[12]);
            curDotX[i] += v.x * 2;
            curDotY[i] += v.y * 2;
            ellipse(curDotX[i], curDotY[i], dotR[i], dotR[i]);
        }
        else {
            // going inward
            curDotX[i] -= v.x * 2;
            curDotY[i] -= v.y * 2;
            ellipse(curDotX[i], curDotY[i], dotR[i], dotR[i]);
        }
        if(dist(curDotX[i], curDotY[i], dotX[i], dotY[i]) < 1)
            dotState[i] = false;
        if(dist(curDotX[i], curDotY[i], dotCoreX, dotCoreY) < 1)
            dotState[i] = true;
    }
}


function draw() {
    clear();
    drawDots();


    //face
    //  background(255, 255, 255);

    //mouse trailer, the speed is inversely proportional to the mouse distance
    stretchy.velocity.x = (mouseX-stretchy.position.x)/10;
    stretchy.velocity.y = (mouseY-stretchy.position.y)/10;

    drawSprites();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}