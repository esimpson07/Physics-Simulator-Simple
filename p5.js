var angle = 3.141592 / 4;//45 degrees
var firePower = 10;//10 meters / s
var gravity = -9.8;//-9.8 meters / s^2
var metersToPX = 30; //30 pixels in a simulated meter
var xDist = 0; //the distance the current bounce will travel
var yDist = 0; //the height the current bounce will travel
var airTime = 0; //the air time of the current bounce in s
var initMillis = 0; // when the current bounce started
var xCom = 0; //x component of fire vector
var yCom = 0; //y component of fire vector
var elasticity = 0.8; // ratio of bounce vel / prev bounce vel
var startX = 0; // the starting x position of the current bounce
const cannonPos = []; //coordinates of cannon position

function setup() {
  createCanvas(400, 400); //400 x 400 window -> 30 PX = 1 meter
  frameRate(30); //X FPS -> X dots per second
  background(240); // set background to (240,240,240)
  cannonPos.push(10,390); //set cannon position to 10, 390 -> bottom left of the screen
}

function draw() {
    angle = abs(atan((mouseY - cannonPos[1]) / (mouseX - cannonPos[0]))); // give the cannon an angle
  fill(255, 60, 100); // sets the circle color to red
  var x = cannonPos[0] + startX + (metersToPX * xDist * (millis() - initMillis) / (airTime * 1000)); //finds function distance based on pixel: meter ratio and the distance traveled
  var y = (400 - (metersToPX * getHeight(initMillis, millis()))) - (400 - cannonPos[1]); //inverse because 0,0 is top left: finds function height based on time
  if(x >= cannonPos[0] && y <= cannonPos[1]) { //checks for inconsistencies: rounding errors could cause position to be slightly below the "ground"
    circle(x, y, 10);
  }
  fill(0, 0, 0); // draws a dot depending on how far the shot is
  circle(cannonPos[0],cannonPos[1],20); // draws cannon
}

function keyPressed(){
  if (key == ' '){ // if space pressed
    background(240); // clear canvas
    fill(255, 60, 100); // set the draw color
    startX = 0; // reset all the instance variables
    fire(angle); // run the math to fire a shot
  } else if(key == 'ArrowUp') {
    firePower ++; // increases firepower by 1 m / s each time the up arrow is pressed 
  } else if(key == 'ArrowDown') {
    firePower --; // decreases firepower by 1 m / s each time the down arrow is pressed
  }
}

function fire(a, p) {
  xCom = firePower * cos(a); //defining the x component of the fire vector
  yCom = firePower * sin(a); //defining the y component of the fire vector
  psuedoFire(); //doing the math to find all the values
  fill(0,0,0);
  circle(cannonPos[0] + 10 * cos(angle), cannonPos[1] - 10 * sin(angle), 20); // draws end of cannon pointing in fire direction
}

function psuedoFire() { // does the math to find time that the current bounce is in the air, the maximum height of the vertex, and the distance traveled in the x direction
  airTime = - 2 * abs(yCom) / gravity
  xDist = xCom * airTime;
  yDist = -(yCom * yCom) / (2 * gravity);
  initMillis = millis(); //sets the start of the bounce to now
}

function getHeight(start, current) { //returns the height of the ball at a given instant, based on when psuedoFire() was last called. If the height is less than 0, the function refires the ball but with less velocity.
  var x = (current - start) / 1000;
  var y = ((x * x) * gravity / 2) + (yCom * x);
  if(y < 0) {
    startX += metersToPX * xDist; //makes the bounce start further along the canvas
    yCom *= elasticity; //decreases the bounce height
    psuedoFire(); //recalculates
    y = ((x * x) * gravity / 2) + (yCom * x); //recalculates y value for bounce
  }
  return y;
}
