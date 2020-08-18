/*var myVoice = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)*/

var trickster;
var solide;
var droulers;

var textX = 0;
var textY = 0;

var cloudDiscotheque;
var altar2Intersections;
var ouijaBoard;
var liveCyborgWitch;

let l11 = 'Cyborg';
let l12 = 'Witch';
let l13 = 'Theatre';

var angle = 0;

let lang = navigator.language || 'en-GB';
let speechRec = new p5.SpeechRec(lang, gotSpeech);
let continuous = true;
let interim = false;
let incantation = '';

function preload() {
    trickster = loadFont('assets/Trickster-Reg.otf');
    solide = loadFont('assets/Solide.otf');
    droulers = loadFont('assets/Droulers_TEST-Italic.otf');
    
    cloudDiscotheque = loadImage('assets/CodeDiscotheque2.jpg');
    ouijaBoard = loadImage('assets/CyborgWitchOuijaBoard2.jpg');
    altar2Intersections = loadImage('assets/linoShrine.png');
    
}

function gotSpeech() {
    //console.log(speechRec);
    console.log(speechRec.resultString);
    if (speechRec.resultValue) {
        //createP(speechRec.resultString);
        incantation = speechRec.resultString;
        text(incantation, -width/2, -height/2);
        //speechText.hide();
    
    }
    textFont(solide);
    text(incantation, 100, 100);
}

function setup() {
    
    createCanvas(1440, 900, WEBGL);
    //background(0, 0, 255);
    
    liveCyborgWitch = createCapture(VIDEO);
    liveCyborgWitch.size(200, 130);
    liveCyborgWitch.hide();
    
    textFont(solide);
    textSize(121);
    //textSize(300);
    textAlign(CENTER, CENTER);
    translate(720, 450);
    angleMode(DEGREES);
    imageMode(CENTER);
    
    speechRec.start(continuous, interim);
    
/*    myVoice.onResult = showResult; // bind callback function to trigger when speech is recognized
    myVoice.start(); // start listening
    */
    
}

function draw() {
    background(0, 255, 75);
    noFill();
    stroke(255, 0, 0);
    strokeWeight(0.75);
    
    //ortho();
    ortho(-width/2, width/2, -height/2, height/2);
    //perspective();
    //ortho(width/2, height/2, 0, 0,-2000, 2000);
    
    push();
    rotateX(30);
    rotateY(49);
    //rotateZ(60);
    image(cloudDiscotheque, 295, -185, 1080, 585);
    
    pop();
    
    
  //alternate isometric grid
  for (let k = -800; k < 800; k += 40) {
  line(k, -850, k, 850);
  }
  
  push();
  rotate(60);
  for (let l = -800; l < 800; l += 40) {
  line(l, -850, l, 850);  
  }
  pop();
  
  push();
  rotate(-60);

  for (let m = -800; m < 800; m += 40) {
  line(m, -850, m, 850);
  }
  pop();
    
    
    push();
    rotateX(30);
    rotateY(-49);
    image(liveCyborgWitch, mouseX-720, mouseY-450, 600, 350);
    image(ouijaBoard, -535, -399, 620, 585);
    image(altar2Intersections, 500, 500, 620, 585);

    pop();
    

    //cyborg witch theatre
    push();
    fill(255, 0, 0);
    
    if (mouseIsPressed) {
        angle  = angle + 1;
    }
    if (keyIsDown(LEFT_ARROW)) {
        textX = textX-1;
        }
    if (keyIsDown(RIGHT_ARROW)) {
        textX = textX+1;
    }
    if (keyIsDown(UP_ARROW)) {
        textY = textY-1;
    }
    if (keyIsDown(DOWN_ARROW)) {
        textY = textY+1;
    }
    
    translate(textX, textY);
    rotateX(30);
    rotateY(49+angle);
    //3rd line +100 if trickster, +125 if solide
    /*text(l11, textX, textY-100);
    text(l12, textX, textY-0);
    text(l13, textX, textY+100);*/
    
    push();
    textFont(solide);
    textSize(64);
    fill(255, 0, 255);
    text(incantation, textX, textY);
    pop();

    pop();
    
    //text('hello', -width/2, -height/2);
    //text(incantation, -width/2, -height/2);

}

