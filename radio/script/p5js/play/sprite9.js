//Dynamically drawn sprites
//sprite with a custom drawing function follows the mouse
//and changes shape according to its speed

var canvas;
var stretchy;
var face;

function setup() {
//   createCanvas(800, 400);
    
   //setup canvas
    canvas = createCanvas(windowWidth, windowHeight);
//    canvas.parent("animation");

  face = loadImage('img/face.png');

  //Sometimes image sequences are not enough and you may want to
  //use p5's drawing function while retaining the built-in features of the
  //sprite class
  stretchy = createSprite(100, 200, 10, 10);

  //To do so you can override (overwrite) the draw() function of the sprite
  //and make it display anything you want in its current position.
  //In javascript function and methods can be assigned like variables

  stretchy.draw = function() {

    //the center of the sprite will be point 0,0
    //"this" in this function will reference the sprite itself
    
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

function draw() {
//  background(255, 255, 255);
  clear();
  //mouse trailer, the speed is inversely proportional to the mouse distance
  stretchy.velocity.x = (mouseX-stretchy.position.x)/10;
  stretchy.velocity.y = (mouseY-stretchy.position.y)/10;

  drawSprites();
}


