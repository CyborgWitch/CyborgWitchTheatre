// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */
var screen = 1;
var numberOfPages = 5;

// resizing window size
var width, height;
var screen;

// webcam feed
let video;

// motion tracking
let poseNet;
let poses = [];

// preload materials/objects
var droulers;
var droulersItalic;
let hand;
let orchid;
var orchidYes = false;

// new stage
let backdrop;
let stage1, stage2;

//float in screens variables
let backdropMove = -600;
let stage1Move = -1300;
let stage2Move = -1000;

let grid = true;
let userName = localStorage.getItem('userName');

var angle = 0;

// Wrist x, y positions //mapped to margins
var leftWristX, leftWristY, rightWristX, rightWristY;

// mapped wrist positions to 255 colour values
var mappedLeftWristX, mappedLeftWristY, mappedRightWristX, mappedRightWristY;

//translating hands within translated keypoints
var translatedLeftHandX, translatedLeftHandY, translatedRightHandX, translatedRightHandY;

//checking if hands cross onto other side of the screen
var leftHandUP = false;
var rightHandUP = false;

// changing the scale according to distance apart
var handSize;
var distanceEyes;
var distanceHands;

var orchidSize = 1500;
var mappedOrchidCloseUp; 

//head position
var noseX, noseY;

let handsTogether = false;
let handsOn = 0;


// SOUND EFFECTS
// beginning
var spokenWord;
var thud1, thud2, thud3;
let reverb;

// interaction
var sczwhoop;
var orchidSoundEffect = 0;
var erhu;


//NEW SOUND:
var daluo;
var bangu;
var naobo;

var mic;
var soundLevel;

// soundLevel visualisation
var soundMapped = 0;

function preload() {
    
    droulers = loadFont('assets/Droulers-Regular.otf');
    droulersItalic = loadFont('assets/Droulers-Italic.otf');
    
    backdrop  = loadImage('assets/HandGestureScreen.jpg');    
    stage1 = loadImage('assets/Hands_sideStage.jpg');
    stage2 = loadImage('assets/Hands_sideStage2.png');
    
    spokenWord = loadSound('assets/CyborgWitch_scenes3 Mixdown 1.mp3');
    thud1 = loadSound('assets/whoop__ui-back-sound.mp3');
    thud2 = loadSound('assets/whoop__ui-back-sound.mp3');
    thud3 = loadSound('assets/whoop__ui-back-sound.mp3');
    
    sczwhoop = loadSound('assets/dizzyBoltSpell.mp3');
    erhu = loadSound('assets/erhuDistorted.mp3');
    
    daluo = loadSound('assets/daluo.mp3');
    bangu = loadSound('assets/Bangu.mp3');
    naobo = loadSound('assets/Naobo.mp3');

    
    hand = loadModel('assets/hand-free.obj');
    orchid = loadModel('assets/orchid.obj');
    
}
function setup() {
  setDimensions();
  createCanvas(width, height, WEBGL);
    
  //Clipping plane not specified (default?) where i think it sets the clipping plane in porportion to the window size. 
  ortho(-width/2, width/2,-height/2, height/2);
  //The clipping plane as defined by (width*, -height) below shows all the images, but don't layer in the correct order. 
  //ortho(-width/2, width/2, -height/2, height/2, width*2, -height);
  
  background(0, 255, 0);
  video = createCapture(VIDEO);
  video.hide();
    
  mic = new p5.AudioIn();
  mic.start();
    
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
    
  reverb = new p5.Reverb();

  imageMode(CENTER);
  angleMode(DEGREES);
  rectMode(CENTER);
    
  textSize(96);
  textAlign(LEFT, CENTER);
  textFont(droulers);
}

function windowResized() {
    setDimensions();
    resizeCanvas(width, height);
    
//    createCanvas(width, height, WEBGL);
//    ortho(-width/2, width/2,-height/2, height/2);
//    background(0, 255, 0);
//
//    imageMode(CENTER);
//    angleMode(DEGREES);
//    rectMode(CENTER);
//    
//    textSize(96);
//    textAlign(LEFT, CENTER);
//    textFont(droulers);

}
function setDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
}

function modelReady() {
  select('#status').html('Model Loaded');
}


function draw() {
    
    background(0, 255, 50);
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
    
    
    // setting angle speed
    angle = angle + 1;
    
    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
    drawSkeleton();
    
    soundLevel = mic.getLevel();
    
    //click and float screens, start spoken word
    if (screen==1) {
        //USERNAME RETRIEVE. 
        push();
            fill(255, 0, 0);
            textLeading(84);
            text('Enter Stage 2,\n' + userName, -700, -320);
        pop();
    }
    
    //webcam popup
    else if (screen==2) {
        push();
            fill(255, 0, 0);
            textLeading(84);
            text('Enter Stage 2,\n' + userName, -700, -320);
        pop();
        
        stageScreens();

        // float in screens and sound effect
        if (backdropMove == -1.5) {
            backdropMove = 0;
            thud1.play();
        } else if (backdropMove < 0) {
            backdropMove = backdropMove + 1.5;
        }
        
        if (stage1Move == -4) {
            stage1Move = 0;
            thud2.play();
            print(thud2.isPlaying());
        } else if (stage1Move < 0) {
            stage1Move = stage1Move + 4;
        }
        
        if (stage2Move == -2) {
            stage2Move = 0;
            thud3.play();
        } else if (stage2Move < 0) {
            stage2Move = stage2Move + 2;
        }
    }
    // webcam
    else if (screen==3) {
        stageScreens();
        
    }
    
    //start motion/sound interactions
    else if (screen==4) {
        stageScreens();

        print(handsOn);
        if (handsOn >= 1) {
            
            // orchid model called in draw keypoints
            // orchid appear sound effect
            if (orchidSoundEffect==0 &&!sczwhoop.isPlaying()) {
                sczwhoop.play();
                orchidSoundEffect = 1;
            } 

            // start playing erhu melody
            if (orchidYes == true && !erhu.isPlaying()) {
                erhu.play();
            }

            //HANDS UP
            if (!bangu.isPlaying() && leftHandUP && rightHandUP) {
                bangu.play();

            } 
                //CLAP/SOUND
                else if (!daluo.isPlaying() && soundLevel >= 0.3) {
                    daluo.play();

                } 
                    //getting CLOSE to screen
                    else if (!naobo.isPlaying() && mappedOrchidCloseUpSize == 10) {
                        naobo.play();
                        orchidSize = 2500;

                        } else if (!naobo.isPlaying()) {
                            orchidSize = 1500;
                        }

        }
        
    }
    
    

}

function stageScreens() {
    // backdrop (main image)
    push();
        rotateX(30);
        rotateY(49);
        image(backdrop, 295, -185+backdropMove, 1080, 585);
    pop();    

    // Side screens and webcam
    push();
    rotateX(30);
    rotateY(-49);
        // webcam popup
        if (screen==3 || screen ==4) {
            image(video, -495, -460, 380, 180);
        }

    image(stage2, -535, -399+stage2Move, 620, 585);
    image(stage1, 550, 550+stage1Move, 620, 585);
    pop();
    
}


// A function to draw ellipses over the detected keypoints, translating to get it in perspective. 
function drawKeypoints()  {
    
push();
    
    // getting the keypoints to draw from an orthographic perspective. 
    translate(-width/3, -height);
    rotateX(30);
    rotateY(49);

  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
        
          // VARIABLES CONTROLLED BY MOTION
          // trying to contain the movement of the hand model inside the window
          leftWristX = map(pose.leftWrist.x, 0, width, 200, width-200);
          leftWristY = map(pose.leftWrist.y, 0, height, 100, height-100);
          rightWristX = map(pose.rightWrist.x, 0, width, 200, width-200);
          rightWristY = map(pose.rightWrist.y, 0, height, 100, height-100);

          // mapping the wrist positions to (0, 255) for colour values
          mappedLeftWristX = map(pose.leftWrist.x, 0, width, 0, 255);
          mappedLeftWristY = map(pose.leftWrist.y, 0, height, 0, 255);
          mappedRightWristX = map(pose.rightWrist.x, 0, width, 0, 255);
          mappedRightWristY = map(pose.rightWrist.y, 0, height, 0, 255);
            
          noseX = pose.nose.x;
          noseY = pose.nose.y;

          // calculating distance between hands/eyes to change the scale of the hand model
          distanceEyes = dist(pose.leftEye.x, pose.leftEye.y, pose.rightEye.x, pose.rightEye.y);
          distanceHands = dist(pose.leftWrist.x,  pose.leftWrist.y, pose.rightWrist.x, pose.rightWrist.y);
          
          // when the models are LOADED, the opera has started, and user gets CLOSE UP 2 the screen
          mappedOrchidCloseUpSize = map(distanceEyes, 0, 150, 0, 10, true);

      // DRAWING KEYPOINTS. Only draw an ellipse is the pose probability is bigger than 0.2 
      if (screen==4 && keypoint.score > 0.2) {
          
          fill(255, 0, 0);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 40, 40);
          
          //interaction HANDS UP
          if (pose.leftWrist.y <= height/2) {
              leftHandUP = true;
          } else {
              leftHandUP = false;
          }

          if (pose.rightWrist.y <= height/2) {
              rightHandUP = true;
          } else {
              rightHandUP = false;
          }       
    
      }
    }
  }
    //if the stage interaction has started
    if (screen==4) {
        
            handSize = map(distanceEyes, 0, 100, 0, 10, true);
         // left hand
            push();
                translate(rightWristX, leftWristY);
                scale(handSize);  
                ambientLight(255, 0, 50);
                pointLight(255, 0, 0, -500, 300, 0);
                pointLight(0, 0, 100, -400, -400, 200);

                directionalLight(200, 0, 200, -200, -200, 0);
                directionalLight(0, 200, 200, 200, 200, 0);
                specularColor(150, 0, 150);
                specularMaterial(150, 0, 150);
                shininess(1);
                model(hand);
            pop();
        
        // right hand
            push();
                translate(leftWristX, leftWristY);
                rotateX(12);
                rotateZ(180);
                scale(handSize);    
                ambientLight(255, 0, 50);
                pointLight(255, 0, 0, -500, 300, 0);
                pointLight(0, 0, 100, -400, -400, 200);

                directionalLight(200, 0, 200, -200, -200, 0);
                directionalLight(0, 200, 200, 200, 200, 0);
                specularColor(150, 0, 150);
                specularMaterial(150, 0, 150);
                shininess(1);
                model(hand);
            pop();
        
      //if hands are "TOGETHER", turn on orchid and music with handsON
      if (distanceHands <= 50) {
          handsTogether = true;
          //print(handsTogether);
          handsOn = handsOn + 1;
      } else {
          handsTogether = false;
      }
        
          if (handsOn > 1) {
              soundMapped = map(soundLevel, 0, 0.3, 100, 255);
              push();
                  translate(width/2, 600);
                  rotateY(angle);
                  rotateX(-90);
                  scale(orchidSize);
                  specularColor(soundMapped, 0, soundMapped);
                  pointLight(0, soundMapped, 0, 0, -200, 0);
                  directionalLight(255, 0, 0, -width/3, 0);
                  pointLight(0, 0, soundMapped, width/3, 0, 0);

                  specularMaterial(255, 255, 255);
                  model(orchid);
                  orchidYes = true;
              pop();
          } 
    }    
    
pop();
    
}

// A function to draw the skeletons, translating to get it in perspective
function drawSkeleton() {
    if (screen==4 || screen==4) {
        push();

          // getting the skeleton to draw from an orthographic perspective. 
          translate(-width/3, -height);
          rotateX(30);
          rotateY(49);

          // Loop through all the skeletons detected
          for (let i = 0; i < poses.length; i++) {
            let skeleton = poses[i].skeleton;
            // For every skeleton, loop through all body connections
            for (let j = 0; j < skeleton.length; j++) {
              let partA = skeleton[j][0];
              let partB = skeleton[j][1];

              push();
              stroke(255, 0, 0);
              strokeWeight(10);


              line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
              pop();

          }

        }
        pop();
        
    }
}

function mousePressed() {
    //mousePress to trigger screens and spokenWord
    if (screen==1) {
        screen = screen + 1;
        
        if (!spokenWord.isPlaying()){
            spokenWord.play();
            reverb.process(spokenWord, 10, 5);
        }
    }
    
    else if (screen==2) {
        if (backdropMove == 0 && stage1Move == 0 && stage2Move ==0) {
            screen = screen + 1;
        }
    }
    
    else if (screen==3) {
        screen = screen + 1;

    }
    
    else if (screen==4) {
        
    }
}