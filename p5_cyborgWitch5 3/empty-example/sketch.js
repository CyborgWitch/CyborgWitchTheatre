/*var myVoice = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)*/

var screen = 1;
var numberOfPages = 6;

// fonts
var trickster;
var solide;
var droulers;
var droulersItalic;

// printing speechRec text positions
var textX = 0;
var textY = 0;

// IMAGE SCREENS
var cloudDiscotheque;
var altar2Intersections;
var ouijaBoard;
var liveCyborgWitch;
var speechBubble;

//variables to float in scene
var cloudMove = -600;      
var altarMove = -1300;
var ouijaMove = -1000;

var cloudOut, altarOut, ouijaOut;

// SOUND EFFECTS—FILES
var cyborgWitchXYZ;
var cyborgWitchXYZplayed = 0;
var thud1; 
var thud2; 
var thud3; 
var endCyborgWitchXYZ;
var endCyborgWitchXYZ_COUNT = 0;
//not currently used
//var angle = 0;

//USERNAME from invitation sketch
let userName = localStorage.getItem('userName');

// speech recognition variables
let lang = navigator.language || 'en-GB';
let speechRec = new p5.SpeechRec(lang, gotSpeech);
let continuous = true;
let interim = false;
// incantation is the recognised spoken string
let incantation = '';

// array of poems
let poems = ['// Fly through grass\n// playing like Summer\n// The moon worm is in\n// the rice mountain\n// Mould your love book\n// piece by piece', '\n// The broken drink\n// of our young day\n// Wild fields rising\n// Drifting, leaves falling\n// sometimes fragrant\n// Summer is waking\n// Rain Dance the bodies', '// Mouth is in the edge\n// In the incense\n// The butterfly is double\n// The mouth is in the fate\n// There is no love,no love\n// A flower blooms', '// Listen to gold\n// We swim in flowers\n// Peach leaves with love\n// Our joyous meeting\n// Poems do not understand\n// Do not listen', '// Oblique season\n// of wind and rain\n// It loves in its way\n// Love puppets\n// from it the moon\n// Cloud in a day'];
let choosePoem = '';



function preload() {
    trickster = loadFont('assets/Trickster-Reg.otf');
    solide = loadFont('assets/Solide.otf');
    droulers = loadFont('assets/Droulers-Regular.otf');
    droulersItalic = loadFont('assets/Droulers-Italic.otf');
    
    cloudDiscotheque = loadImage('assets/CodeDiscotheque2 copy.jpg');
    ouijaBoard = loadImage('assets/Poetry_sideStage.png');
    altar2Intersections = loadImage('assets/Poetry_sideStage2.jpg');
    speechBubble= loadImage('assets/speechBubble.png');
    
    // beginning poem
    cyborgWitchXYZ = loadSound('assets/CyborgWitch_scenes Mixdown 2.mp3');
    // end poem
    endCyborgWitchXYZ = loadSound('assets/CyborgWitch_scenes2 Mixdown 1.mp3');
    
    // image sound effects
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
    // previous window dimensions
    //createCanvas(1440, 900, WEBGL);
    
    //Clipping plane not specified (default?) where i think it sets the clipping plane in porportion to the window size. 
    ortho(-width/2, width/2,-height/2, height/2);
    //The clipping plane as defined by (width*, -height) below shows all the images, but don't layer in the correct order. 
    //ortho(-width/2, width/2, -height/2, height/2, width*2, -height);

    background(0, 255, 75);
    
    // webcam
    liveCyborgWitch = createCapture(VIDEO);
    liveCyborgWitch.hide();
    
    textFont(trickster);
    textSize(96);
    textAlign(CENTER, CENTER);
    translate(720, 450);
    angleMode(DEGREES);
    imageMode(CENTER);
    rectMode(CENTER);
    
    // start listening, continously picking up speech
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
    
    if (screen==1) {
        console.log(userName);
        push();
        fill(255, 0, 0);
        textAlign(LEFT, CENTER);
        textFont(droulers);
        text('Enter,' + userName, -700, -360);
        pop();
    }
    else if (screen==2) {
        push();
        fill(255, 0, 0);
        textAlign(LEFT, CENTER);
        textFont(droulers);
        text('Enter,' + userName, -700, -360);
        pop();
        
        print(cyborgWitchXYZ.isPlaying());
        print(cyborgWitchXYZplayed);
        if (!cyborgWitchXYZ.isPlaying() && cyborgWitchXYZplayed == 0) {         //if it's not playing and hasn't been played before
            cyborgWitchXYZ.play();
            cyborgWitchXYZplayed = 1;
        }
        
        //float in sceneScreens, play thud
        //if cloudMove is one increment before its final position, then it make it = 0, and play thud
        if (cloudMove == -0.75) {             
            cloudMove = 0;
            thud1.play();
            print(thud1.isPlaying());

        } else if (cloudMove < 0) {         // else if cloudMove is still negative, not in position, keep increasing it
            cloudMove = cloudMove + 0.75;
        }
        //if altarMove is one increment before its final position, then it make it = 0, and play thud
        if (altarMove == -2) {
            altarMove = 0;
            thud2.play();
            print(thud2.isPlaying());

        } else if (altarMove < 0){
            altarMove = altarMove + 2;
        }
        
        //if ouijaMove is one increment before its final position, then it make it = 0, and play thud
        if (ouijaMove == -1) {
            ouijaMove = 0;
            thud3.play();
            print(thud3.isPlaying());

        } else if (ouijaMove < 0){
            ouijaMove = ouijaMove + 1;
        }
        
        sceneScreens();

    }
  
    else if (screen==3) {
        // draw webcam feed
        sceneScreens();

    }
  
    else if (screen==4) {
        sceneScreens();
        // speechBubble and poem texts
        image(speechBubble, -500, 180, 450, 300);
        textFont(droulers);
        textAlign(LEFT);
        textSize(42);

        push();
            fill(0, 0, 255);
            text('Script', -680, 105);

            textSize(20);
            textLeading(22);
            text(choosePoem, -680, 205);
        pop();
    
    
    }
  
    else if (screen==5) {
        sceneScreens();
        
        // speechBubble and poem text
        image(speechBubble, -500, 180, 450, 300);
        textFont(droulers);
        textAlign(LEFT);
        textSize(42);

        push();
            fill(0, 0, 255);
            text('Script', -680, 105);
            textSize(20);
            textLeading(22);
            text(choosePoem, -680, 205);
        pop();
    
        // speechRec 'incantation' PRINT to stage   
        push();            
            rotateX(30);
            rotateY(49);
            textFont(trickster);
            textSize(64);
            fill(255, 0, 255);
            text(incantation, textX-200, textY+180);
        pop();
        
        button = createButton('Stage 2');
        button.position(19, 19);
        button.mousePressed(Stage2);
        
    }
    
  
    else if (screen==6) {
        sceneScreens();
        if (endCyborgWitchXYZ_COUNT==1 && !endCyborgWitchXYZ.isPlaying() && cloudMove < -800 && altarMove < 1300 && ouijaMove < 1000) {
            //if () endCyborgWitch is not playing and has played once, and all the screens are out of frame, replace the URL. 
            window.location.replace("https://cyborgwitch.github.io/CyborgWitchTheatre/p5_CyborgWitch%209%202/empty-example/");
        }
    }
    
    else if (screen==7) {
    }  
}

// DRAWING THE STAGE IMAGES/WALLS
function sceneScreens () {
    
    // draw main image backdrop
    push();
        rotateX(30);
        rotateY(49);        
        image(cloudDiscotheque, 295, -185+cloudMove, 1080, 585);
    pop();
    
        if (screen == 3 || screen == 4 || screen == 5) {
        // show webcam feed
        push();
            rotateX(30);
            rotateY(-49);
            image(liveCyborgWitch, -495, -460+ouijaMove, 380, 180);
        pop();
        
        }
    // draw side stage images 
    push();
        rotateX(30);
        rotateY(-49);
        image(ouijaBoard, -535, -399+ouijaMove, 620, 585);
        image(altar2Intersections, 525, 540+altarMove, 620, 585);
    pop();
    
    if (screen==6) {
        print('hello we r trying to float');
        cloudMove = cloudMove - 0.75;
        altarMove = altarMove - 2;
        ouijaMove = ouijaMove - 1;
    }

}

function mousePressed() {
    
    // click the mouse to shuffle through the poems
    choosePoem = random(poems);

    if (screen==1) {
        screen = screen + 1;
    }
    else if (screen==2) {
        // progress to the next screen if all the images are in place and the poem has has played
        if (cloudMove == 0 && altarMove == 0 && ouijaMove == 0 && cyborgWitchXYZplayed == 1) {
            screen = screen + 1;
        }
    }
  
    else if (screen==3) {
        screen = screen + 1;

    }
  
    else if (screen==4) {
        screen = screen + 1;

    }
  
    else if (screen==5) {

    }
  
    else if (screen==6) {
        //screen = screen + 1;

    }

    else if (screen==7) {
        //screen = screen + 1;

    }  

    
}

function Stage2() {
    
    screen = 6;
    
    if (endCyborgWitchXYZ_COUNT==0 && !endCyborgWitchXYZ.isPlaying()) {
        endCyborgWitchXYZ.play();
        endCyborgWitchXYZ_COUNT = 1;
    }
    
}
