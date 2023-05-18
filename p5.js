var angle = 3.141592 / 4;//45 degrees
var firePower = 10;//10 meters / s
var gravity = -9.8;//-9.8 meters / s^2
var metersToPX = 30; //30 pixels in a simulated meter
var xDist = 0;
var yDist = 0;
var airTime = 0;
var initMillis = 0;
var yCom = 0;
var elasticity = 0.5;
var startX = 0;
var dT = 100; //milliseconds
const cannonPos = [];

function setup() {
  createCanvas(400, 400);
  frameRate(15);
  background(240);
  cannonPos.push(10,390);
}

function draw() {
  fill(255, 60, 100);
  circle(cannonPos[0] + startX + (metersToPX * xDist * (millis() - initMillis) / (airTime * 1000)),(400 - (metersToPX * getHeight(initMillis, millis()))) - (400 - cannonPos[1]),10);
  fill(0, 0, 0);
  circle(cannonPos[0],cannonPos[1],20);
}

function keyPressed(){
  if (key == ' '){
    background(240);
    fill(255, 60, 100);
    startX = 0;
    angle = abs(atan((mouseY - cannonPos[1]) / (mouseX - cannonPos[0])));
    fire(angle);
  } else if(key == 'ArrowUp') {
    firePower ++;
  } else if(key == 'ArrowDown') {
    firePower --;
  }
}

function fire(a, p) {
  var pos = 0;
  var xCom = firePower * cos(a);
  yCom = firePower * sin(a);
  airTime = - 2 * abs(yCom) / gravity
  xDist = xCom * airTime;
  yDist = -(yCom * yCom) / (2 * gravity);
  initMillis = millis();
}

function getHeight(start, current) {
  var x = (current - start) / 1000;
  var a = gravity;
  var vInitial = yCom;
  var y = ((x * x) * a / 2) + (vInitial * x);
  if(y < 0) {
    initMillis = millis();
    startX = metersToPX * xDist + startX;
  }
  return y;
}
