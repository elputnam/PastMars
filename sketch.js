 var NORTH = 0;
 var EAST = 1;
 var SOUTH = 2;
 var WEST = 3;
 var direction = SOUTH;
 var col = 200;
 var x;
 var y;
 var dash = 15;

//  var speed = 50;
 var stepSize = 5;
 var minLength = 10;
 var diameter = 1;
 var angleCount = 7;
 var angle;
 var reachedBorder = false;
 
 var posX;
 var posY;
 var posXcross;
 var posYcross;
 
 function setup() {
   createCanvas(windowWidth, windowHeight);
   colorMode(HSB, 360, 100, 100, 100);
   background(100);
   x = random(width*5, width*.75);
   y = random(height*.25);
   angle = getRandomAngle(direction);
   posX = floor(random(width*.25, width-width*.25));
   posY = height*.25;
   posXcross = posX;
   posYcross = posY;
 }
 
 function draw() {
  background(255, 1)
  
  //frame
  strokeWeight(10);
  stroke(10);
  noFill();
  beginShape();
  vertex(width*.25, height*.25);
  vertex(width*.75, height*.25);
  vertex(width*.75, height*.75);
  vertex(width*.25, height*.75);
  endShape(CLOSE);

  wireframe();
  
  //bugs
  for (i = 0; i < 10; i++){
    // noFill();
    // stroke(random(70,120), random(100), random(100));
    push();
    translate(mouseX, mouseY);
    noStroke();
    fill(random(70,120), random(100), random(100));
    circle(x, y, 10);
    pop();
    
    
    //placement
    let toggle = floor(random(4));
    if (toggle == 0){
      x += dash;
    } 

    else if (toggle == 1){
      y += dash;
    }

    else if (toggle == 2){
      x -= dash;

    }else{
      y -= dash;
    }
    
    if (x <= 0){
      x = width;
    }
    if (x >= width){
      x = 0;
    }
    if (y <= 0){
      y = height;
    }
    if (y >= height){
      y = 0;
    }
    if (x > width*.25 && x < width*.75 && y > height*.25 && y < height*.75){
      x *= -1;
      y *= -1;
    }
  
  }
 }
 
 function wireframe(){
  //  var speed = int(map(mouseX, 0, width, 0, 20));
  var speed = 5;
  for (var i = 0; i <= speed; i++) {

    // ------ draw dot at current position ------
    strokeWeight(1);
    stroke(255);
    // stroke(10, 50, 100);
    point(posX, posY);

    // ------ make step ------
    posX += cos(radians(angle)) * stepSize;
    posY += sin(radians(angle)) * stepSize;

    // ------ check if agent is near one of the display borders ------
    reachedBorder = false;

    if (posY <= height*.25) {
      direction = SOUTH;
      reachedBorder = true;
    } else if (posX >= width - width*.25) {
      direction = WEST;
      reachedBorder = true;
    } else if (posY >= height - height*.25) {
      direction = NORTH;
      reachedBorder = true;
    } else if (posX <= width*.25) {
      direction = EAST;
      reachedBorder = true;
    }

    // ------ if agent is crossing his path or border was reached ------
    loadPixels();
    var currentPixel = get(floor(posX), floor(posY));
    if (
      reachedBorder ||
      (currentPixel[0] != 255 && currentPixel[1] != 255 && currentPixel[2] != 255)
    ) {
      angle = getRandomAngle(direction);

      var distance = dist(posX, posY, posXcross, posYcross);
      if (distance >= minLength) {
        strokeWeight(2);
        stroke(col, 100, 100);
        line(posX, posY, posXcross, posYcross);
      }

      posXcross = posX;
      posYcross = posY;
      col += 1;

      if (col == 360){
        col = 200;
      }
    }
  }
 }

 function getRandomAngle(currentDirection) {
   var a = (floor(random(-angleCount, angleCount)) + 0.5) * 90 / angleCount;
   if (currentDirection == NORTH) return a - 90;
   if (currentDirection == EAST) return a;
   if (currentDirection == SOUTH) return a + 90;
   if (currentDirection == WEST) return a + 180;
   return 0;
 }
 