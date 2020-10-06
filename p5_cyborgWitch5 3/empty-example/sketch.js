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
var backdrop;
var stage1;
var stage2;
var liveCyborgWitch;
var speechBubble;
var samplePoemIllustration;

//variables to float in scene
var backdropMove = -999;      
var stage1Move = -1300;
var stage2Move = -1000;

var backdropOut, stage1Out, stage2Out;
var witchCursor;

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
let poems = ['// Fly through grass\n// playing like Summer\n// The moon worm is in\n// the rice mountain\n// Mould your love book\n// piece by piece', 

             '// The broken drink\n// of our young day\n// Drifting, leaves falling,\n// sometimes fragrant\n// Wild fields rising\n// Summer is waking', 

             '// Mouth is in the edge\n// in the smoke of incense\n// The butterfly is double\n// The mouth is in the fate,\n// there is no love,no love\n// a flower blooms', 
             
             '// Listen to gold\n// We swim in flowers\n// Peach leaves with love,\n// our joyous meeting\n// Poems do not understand\n// do not dare listen', 
             
             '// Oblique season\n// of wind and rain\n// It loves in its way,\n// from it the moon\n// Light and hot night\n// takes forever to break',

             '// A few moving days\n// in the third year\n// of small happiness\n// All the rich gold\n// has been drunk\n// So see you in sleep.',
             
             '// Calling dragonflies,\n// wind and rain\n// The flowers are in\n// the dust once more\n// Our small days,\n// a passion for eating.',
             
             '// Nourishing a flood\n// and letting in a dream\n// Lower a finger into\n// the spring youth,\n// while the night rains\n// into ocean pools',
            
             '// Incense calls from\n// the young and the old\n// Rain Road, the hands\n// awkward and sweet\n// It is better to show\n// your intentions',
                          
             '// Boil and boil,\n// white cloud nest\n// The window is hot\n// from the city noon\n// Where people are\n// entangled in the road',

             '// A round of leisured\n// beauty we see creep\n// I am still green here\n// in the daytime\n// Watch the moment\n// and give it away',

             '// The sweat of the season\n// fresh air without washing\n// Hot out of darkness\n// take the most strange\n// pond flowers in the south\n// and spit out the scent',

             '// See you do not need to\n// cut deep into the fog.\n// The day is in the shadow\n// of the highest hope\n// Go on tiptoe and run\n// carry with you the sun',

             '// Autumn song\n// No longer burn to the\n// moment of Summer.\n// Rain dance the bodies\n// The fevered hour is idle\n// and the wind is sung'];

let choosePoem = '';



function preload() {
    trickster = loadFont('assets/Trickster-Reg.otf');
    solide = loadFont('assets/Solide.otf');
    droulers = loadFont('assets/Droulers-Regular.otf');
    droulersItalic = loadFont('assets/Droulers-Italic.otf');
    
    backdrop = loadImage('assets/PoetryMainStage.jpg');
    samplePoemIllustration = loadImage('assets/PoetryMainStage2.jpg');
    stage2 = loadImage('assets/Poetry_sideStage.png');
    stage1 = loadImage('assets/Poetry_sideStage2.jpg');
    speechBubble= loadImage('assets/speechBubble.png');
    witchCursor = loadImage('assets/WitchCursor.png');
    
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
  setDimensions();
  createCanvas(width, height, WEBGL);
  // ortho with near-far of the clipping plane going from negative to positive
  ortho(-width/2, width/2,-height/2, height/2, -width*2, width*2);
  background(0, 255, 75);
    
    // webcam
    liveCyborgWitch = createCapture(VIDEO);
    liveCyborgWitch.hide();
    
    textFont(droulers);
    textSize(96);
    textAlign(LEFT, CENTER);

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
    
    createCanvas(width, height, WEBGL);
    ortho(-width/2, width/2,-height/2, height/2, -width*2, width*2);

    background(0, 255, 0);

    imageMode(CENTER);
    angleMode(DEGREES);
    rectMode(CENTER);
    
    textFont(droulers);
    textSize(96);
    textAlign(LEFT, CENTER);
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
//    noCursor();
//    push();
//    translate(mouseX, mouseY);
//    image(witchCursor, 0, 0, 64, 64);
//    pop();
  //alternate isometric grid
    for (let k = -1400; k < 1400; k += 40) {
        line(k, -1400, k, 1400);
    }
  
    push();
        rotate(60);
        for (let l = -1400; l < 1400; l += 40) {
            line(l, -1400, l, 1400);  
        }
    pop();
  
    push();
        rotate(-60);
        for (let m = -1400; m < 1400; m += 40) {
        line(m, -1400, m, 1400);
        }
    pop();
    
    if (screen==1) {
        console.log(userName);
        push();
        fill(255, 0, 0);
        textAlign(LEFT, CENTER);
        text('Enter,' + userName, -700, -400);
        pop();
    }
    else if (screen==2) {
        push();
        fill(255, 0, 0);
        textAlign(LEFT, CENTER);
        text('Enter,' + userName, -700, -400);
        pop();
        
        print(cyborgWitchXYZ.isPlaying());
        print(cyborgWitchXYZplayed);
        if (!cyborgWitchXYZ.isPlaying() && cyborgWitchXYZplayed == 0) {         //if it's not playing and hasn't been played before
            cyborgWitchXYZ.play();
            cyborgWitchXYZplayed = 1;
        }
        
        //float in sceneScreens, play thud
        //if backdropMove is one increment before its final position, then it make it = 0, and play thud
        if (backdropMove == -0.75) {             
            backdropMove = 0;
            thud1.play();
            print(thud1.isPlaying());

        } else if (backdropMove < 0) {         // else if backdropMove is still negative, not in position, keep increasing it
            backdropMove = backdropMove + 0.75;
        }
        //if stage1Move is one increment before its final position, then it make it = 0, and play thud
        if (stage1Move == -2) {
            stage1Move = 0;
            thud2.play();
            print(thud2.isPlaying());

        } else if (stage1Move < 0){
            stage1Move = stage1Move + 2;
        }
        
        //if stage2Move is one increment before its final position, then it make it = 0, and play thud
        if (stage2Move == -1) {
            stage2Move = 0;
            thud3.play();
            print(thud3.isPlaying());

        } else if (stage2Move < 0){
            stage2Move = stage2Move + 1;
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
            textAlign(CENTER, CENTER);
            textSize(64);
            fill(255, 0, 255);
            text(incantation, textX-100, textY+180);
        pop();
        
        button = createButton('Stage 2');
        button.position(19, 19);
        button.mousePressed(Stage2);
        
    }
    
  
    else if (screen==6) {
        sceneScreens();
        if (endCyborgWitchXYZ_COUNT==1 && !endCyborgWitchXYZ.isPlaying() && backdropMove < -800 && stage1Move < 1300 && stage2Move < 1000) {
            //if () endCyborgWitch is not playing and has played once, and all the screens are out of frame, replace the URL. 
            window.location.replace("https://cyborgwitch.github.io/CyborgWitchTheatre/p5_CyborgWitch%209%203/empty-example/");
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
        rotateY(49.1);        
        image(backdrop, 305, -187+backdropMove, 1100, 586);
    pop();
    
        if (screen == 3 || screen == 4 || screen == 5) {
        // show webcam feed
        push();
            rotateX(30);
            rotateY(-49);
            image(liveCyborgWitch, -520, -440, 380, 180);
        pop();
        
        }
    // draw side stage images 
    push();
        rotateX(30);
        rotateY(-49);
        image(stage2, -549, -399+stage2Move, 610, 586);
        image(stage1, 549, 559+stage1Move, 610, 586);
    pop();
    
    if (screen==3 || screen==4 || screen==5) {
        backdropMove = 0;
        stage1Move = 0;
        stage2Move = 0;

    }
    
    if (screen==6) {
        print('hello we r trying to float');
        
        push();            
            rotateX(30);
            rotateY(49);
            textFont(trickster);
            textAlign(CENTER, CENTER);
            textSize(64);
            fill(255, 0, 255);
            text(incantation, textX-100, textY+180+backdropMove);
        pop();
        
        backdropMove = backdropMove - 1.5;
        stage1Move = stage1Move - 4;
        stage2Move = stage2Move - 2;
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
        if (backdropMove == 0 && stage1Move == 0 && stage2Move == 0 && cyborgWitchXYZplayed == 1) {
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
