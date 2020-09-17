/*var myVoice = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)*/
var screen = 1;
var numberOfPages = 6;


var trickster;
var solide;
var droulers;

var textX = 0;
var textY = 0;

var cloudDiscotheque;
var altar2Intersections;
var ouijaBoard;
var liveCyborgWitch;
var speechBubble;

//variables to float in scene
var cloudMove = -600;      
var altarMove = -1300;
var ouijaMove = -1000;

let l11 = 'Cyborg';
let l12 = 'Witch';
let l13 = 'Theatre';

var angle = 0;

let lang = navigator.language || 'en-GB';
let speechRec = new p5.SpeechRec(lang, gotSpeech);
let continuous = true;
let interim = false;
let incantation = '';

let poems = ['// Fly through grass\n// playing like Summer\n// The moon worm is in\n// the rice mountain\n// Mould your love book\n// piece by piece', '\n// The broken drink\n// of our young day\n// Wild fields rising\n// Drifting, leaves falling\n// sometimes fragrant\n// Summer is waking\n// Rain Dance the bodies', '// Mouth is in the edge\n// In the incense\n// The butterfly is double\n// The mouth is in the fate\n// There is no love,no love\n// A flower blooms', '// Listen to gold\n// We swim in flowers\n// Peach leaves with love\n// Our joyous meeting\n// Poems do not understand\n// Do not listen', '// Oblique season\n// of wind and rain\n// It loves in its way\n// Love puppets\n// from it the moon\n// Cloud in a day'];

let choosePoem = '';

function preload() {
    trickster = loadFont('assets/Trickster-Reg.otf');
    solide = loadFont('assets/Solide.otf');
    droulers = loadFont('assets/Droulers_TEST-Italic.otf');
    
    cloudDiscotheque = loadImage('assets/CodeDiscotheque2 copy.jpg');
    ouijaBoard = loadImage('assets/CyborgWitchOuijaBoard2.jpg');
    altar2Intersections = loadImage('assets/linoShrine.png');
    speechBubble= loadImage('assets/speechBubble.png');
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
//    textFont(droulers);
//    text(incantation, 100, 100);
}

function setup() {
    
    createCanvas(1440, 900, WEBGL);
    ortho(-width/2, width/2, -height/2, height/2);

    //background(0, 0, 255);
    
    liveCyborgWitch = createCapture(VIDEO);
    liveCyborgWitch.size(200, 130);
    liveCyborgWitch.hide();
    
    textFont(trickster);
    textSize(96);
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
    


    
    if (screen==1) {
        
        if (cloudMove == 0) {
            cloudMove = 0;
        } else {
            cloudMove = cloudMove + 1.5;

        }
        if (altarMove == 0) {
            altarMove = 0;
        } else {
            altarMove = altarMove + 4;

        }
        if (ouijaMove == 0) {
            ouijaMove = 0;
        } else {
            ouijaMove = ouijaMove + 2;

        }
        
        push();
            rotateX(30);
            rotateY(49);
            //rotateZ(60);
            image(cloudDiscotheque, 295, -185+cloudMove, 1080, 585);

        pop();

        push();
            rotateX(30);
            rotateY(-49);
            image(ouijaBoard, -535, -399+ouijaMove, 620, 585);
            image(altar2Intersections, 500, 500+altarMove, 640, 600);

        pop();
    }
  
    else if (screen==2) {
        push();
            rotateX(30);
            rotateY(49);
            //rotateZ(60);
            image(cloudDiscotheque, 295, -185+cloudMove, 1080, 585);

        pop();

        push();
            rotateX(30);
            rotateY(-49);
            image(ouijaBoard, -535, -399+ouijaMove, 620, 585);
            image(altar2Intersections, 500, 500+altarMove, 640, 600);

        pop();
        
        push();
        rotateX(35);
        rotateY(-45);
        image(liveCyborgWitch, -500, 60, 560, 350);
        pop();
        
    }
  
    else if (screen==3) {
        push();
            rotateX(30);
            rotateY(49);
            //rotateZ(60);
            image(cloudDiscotheque, 295, -185+cloudMove, 1080, 585);

        pop();

        push();
            rotateX(30);
            rotateY(-49);
            image(ouijaBoard, -535, -399+ouijaMove, 620, 585);
            image(altar2Intersections, 500, 500+altarMove, 640, 600);

        pop();
        
        push();
        rotateX(35);
        rotateY(-45);
        image(liveCyborgWitch, -500, 60, 560, 350);
        pop();
        
    push();
    image(speechBubble, -500, 120, 415, 300);
    textFont(droulers);
    textAlign(LEFT);
    textSize(42);

        push();
        fill(0, 0, 255);
        text('Script', -660, 20);

        textSize(20);
        textLeading(22);
        text(choosePoem, -660, 115);
        pop();
    
    pop();
    
    }
  
    else if (screen==4) {
            push();
            rotateX(30);
            rotateY(49);
            //rotateZ(60);
            image(cloudDiscotheque, 295, -185+cloudMove, 1080, 585);

        pop();

        push();
            rotateX(30);
            rotateY(-49);
            image(ouijaBoard, -535, -399+ouijaMove, 620, 585);
            image(altar2Intersections, 500+altarMove, 500, 640, 600);

        pop();
        
        push();
        rotateX(35);
        rotateY(-45);
        image(liveCyborgWitch, -500, 60, 560, 350);
        pop();
        
    push();
    image(speechBubble, -500, 120, 415, 300);
    textFont(droulers);
    textAlign(LEFT);
    textSize(42);

        push();
        fill(0, 0, 255);
        text('Script', -660, 20);

        textSize(20);
        textLeading(22);
        text(choosePoem, -660, 115);
        pop();
    
    pop();
        
    push();            
    rotateX(30);
    rotateY(49);
    textFont(trickster);
    textSize(64);
    fill(255, 0, 255);
    text(incantation, textX-50, textY+180);
    pop();

    pop();

    }
  
    else if (screen==5) {


    }
    
    else if (screen==6) {

    }  


    
  
    

    


    //cyborg witch theatre
//    push();
//
//    }
//    if (keyIsDown(LEFT_ARROW)) {
//        textX = textX-1;
//        }
//    if (keyIsDown(RIGHT_ARROW)) {
//        textX = textX+1;
//    }
//    if (keyIsDown(UP_ARROW)) {
//        textY = textY-1;
//    }
//    if (keyIsDown(DOWN_ARROW)) {
//        textY = textY+1;
//    }
//
//    pop();
    
//
//    if (970 < mouseX < 1320 && 50 < mouseY < 400) {
//        print('here');
//    } else {
//        print('nope');
//    }
}

function mousePressed() {
    
    if (970 < mouseX < 1320 && 50 < mouseY < 400) {
        choosePoem = random(poems);
    }
    
    if (screen==1) {
        if (cloudMove == 0 && altarMove == 0 && ouijaMove == 0) {
            screen = screen + 1;
        }
    }
  
    else if (screen==2) {
        screen = screen + 1;

    }
  
    else if (screen==3) {
        screen = screen + 1;


    
    }
  
    else if (screen==4) {

    }
  
    else if (screen==5) {
        screen = screen + 1;

    }

    else if (screen==6) {
        screen = screen + 1;

    }  

    
}
