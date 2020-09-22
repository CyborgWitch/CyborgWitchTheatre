/*var myVoice = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)*/

var screen = 1;
var numberOfPages = 6;


var trickster;
var solide;
var droulers;

var textX = 0;
var textY = 0;

// IMAGE SCREENS
var cloudDiscotheque;
var altar2Intersections;
var ouijaBoard;
var liveCyborgWitch;
var speechBubble;

//variables to float in scene
var cloudMove = -620;      
var altarMove = -1300;
var ouijaMove = -1000;

// SOUND EFFECTS—FILES
var cyborgWitchXYZ;
var cyborgWitchXYZplayed = false;
var thud1; 
var thud2; 
var thud3; 

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
    ouijaBoard = loadImage('assets/Poetry_sideStage.png');
    altar2Intersections = loadImage('assets/Poetry_sideStage2.jpg');
    speechBubble= loadImage('assets/speechBubble.png');
        
    cyborgWitchXYZ = loadSound('assets/CyborgWitch_scenes Mixdown 2.mp3');

    thud1 = loadSound('assets/whoop__ui-back-sound.mp3');
    thud2 = loadSound('assets/whoop__ui-back-sound.mp3');
    thud3 = loadSound('assets/whoop__ui-back-sound.mp3');
    
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
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    //createCanvas(1440, 900, WEBGL);
    ortho(-width/2, width/2, -height/2, height/2);
    //ortho(-width/2, width/2, -height/2, height/2, width*3, -height/2);

    //background(0, 0, 255);
    
    liveCyborgWitch = createCapture(VIDEO);
    liveCyborgWitch.hide();
    
    textFont(trickster);
    textSize(96);
    //textSize(300);
    textAlign(CENTER, CENTER);
    translate(720, 450);
    angleMode(DEGREES);
    imageMode(CENTER);
    rectMode(CENTER);
    
    speechRec.start(continuous, interim);
    

/*    myVoice.onResult = showResult; // bind callback function to trigger when speech is recognized
    myVoice.start(); // start listening
    */
    
}


function windowResized() {
    setDimensions();
    resizeCanvas(width, height);
}
function setDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
}

function draw() {
    background(0, 255, 75);
    noFill();
    stroke(255, 0, 0);
    strokeWeight(0.75);
    
    
  //alternate isometric grid
    for (let k = -1200; k < 1200; k += 40) {
        line(k, -1200, k, 1200);
    }
  
    push();
        rotate(60);
        for (let l = -1200; l < 1200; l += 40) {
            line(l, -1200, l, 1200);  
        }
    pop();
  
    push();
        rotate(-60);
        for (let m = -1200; m < 1200; m += 40) {
        line(m, -1200, m, 1200);
        }
    pop();
    
    print(cyborgWitchXYZ.isPlaying());
    print(cyborgWitchXYZplayed);
    if (!cyborgWitchXYZ.isPlaying() && cyborgWitchXYZplayed == false) {         //if it's not playing and hasn't been played before
        cyborgWitchXYZ.play();
        cyborgWitchXYZplayed = true;
    }

    
    if (screen==1) {
        

        
        //float in sceneScreens, play thud
        if (cloudMove == -0.75) {             //if cloudMove is one increment before its final position, then it make it = 0, and play thud

            cloudMove = 0;
            //if (!thud1.isPlaying()) {
                thud1.play();
                //print(cloudMove);
                print(thud1.isPlaying());

                //thud1.setLoop(false);
            //}
        } else if (cloudMove < 0) {         // else if cloudMove is still negative, not in position, keep increasing it
            cloudMove = cloudMove + 0.75;
        }
        
        if (altarMove == -2) {
            altarMove = 0;
            //if (!thud2.isPlaying()) {
                thud2.play();
                print(thud2.isPlaying());

                //thud2.setLoop(false);

            //}
        } else if (altarMove < 0){
            altarMove = altarMove + 2;
        }
        
        if (ouijaMove == -1) {
            ouijaMove = 0;
            //if (!thud3.isPlaying()) {
                thud3.play();
                print(thud3.isPlaying());

                //thud3.setLoop(false);

            //}
        } else if (ouijaMove < 0){
            ouijaMove = ouijaMove + 1;
        }
        
        sceneScreens();

    }
  
    else if (screen==2) {
        sceneScreens();

    }
  
    else if (screen==3) {
        sceneScreens();

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
    
    
    }
  
    else if (screen==4) {
        sceneScreens();
        
    
        image(speechBubble, -500, 120, 415, 300);
        textFont(droulers);
        textAlign(LEFT);
        textSize(42);

        push();
            fill(0, 0, 255);
            text('Script', -660, 50);

            textSize(20);
            textLeading(22);
            text(choosePoem, -660, 145);
        pop();
    
    // speechRec PRINT to stage   
    push();            
    rotateX(30);
    rotateY(49);
    textFont(trickster);
    textSize(64);
    fill(255, 0, 255);
    text(incantation, textX-200, textY+180);
    pop();


    }
    
  
    else if (screen==5) {


    }
    
    else if (screen==6) {

    }  
}

// DRAWING THE STAGE IMAGES/WALLS
function sceneScreens () {
    
    push();
        rotateX(30);
        rotateY(49);        
        //image(cloudDiscotheque, 295, -10+cloudMove, 1080, 935);
        image(cloudDiscotheque, 295, -185+cloudMove, 1080, 585);
    pop();

    
    if (screen == 2 || screen == 3 || screen == 4) {
        // webcam on bottom side
        push();
            rotateX(30);
            rotateY(-49);
            fill(255, 0, 255, 180);
            //rect(-535, 60, 620, 350);
            image(liveCyborgWitch, -495, -410, 380, 220);
        pop();
        
        //webcam as floor
//        push();
//            rotateX(236);
//            rotateZ(136);
//        
//            image(liveCyborgWitch, -385, 405, 1000, 585);
//            fill(255, 0, 255, 200);
//            rect(-385, 405, 1000, 585);
//
//        pop();  
    }
    
    push();
        rotateX(30);
        rotateY(-49);
        image(ouijaBoard, -535, -399+ouijaMove, 620, 585);
        image(altar2Intersections, 525, 540+altarMove, 620, 585);
    pop();
}

function mousePressed() {
    
    choosePoem = random(poems);

    
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

