// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */
var screen = 1;
var numberOfPages = 6;

// resizing window size
var width, height;

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
var popup1;
var popup2;

// new stage
let backdrop;
let stage1, stage2;

//float in screens variables
let backdropMove = -999;
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
var spokenWordCount = 0;
var thud1, thud2, thud3;
let reverb;
var endCyborgWitchXYZ2;
var endCyborgWitchXYZ2_COUNT = 0;
var webcamSound;
var popupByeSound;
var popupByeSound_COUNT = 0;
var popupByeSound2;


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

var button;
var button2; 
var button3;

// mouseSparkle, drawing sparkles when mouse is pressed
let totalPoints = 5;
let mouseSparkleAngle = 0;
let gap = 360/totalPoints;
let rInside  = 15;
let rOutside = 25;
var x1, y1;
var x2, y2;

function preload() {
    
    droulers = loadFont('assets/Droulers-Regular.otf');
    droulersItalic = loadFont('assets/Droulers-Italic.otf');
    
    backdrop  = loadImage('assets/HandGestureScreen.jpg');    
    stage1 = loadImage('assets/Hands_sideStage.jpg');
    stage2 = loadImage('assets/Hands_sideStage2.png');
    
    popup1 = loadImage('assets/OperaOfTheOrchid_POPUP1.png');
    popup2 = loadImage('assets/OperaOfTheOrchid_POPUP1.png');
    popupByeSound = loadSound('assets/magicWand2.mp3');
    popupByeSound2 = loadSound('assets/magicWand2.mp3');

    
    spokenWord = loadSound('assets/CyborgWitch_scenes3 Mixdown 1.mp3');
    endCyborgWitchXYZ2 = loadSound('assets/CyborgWitch_scenes4 Mixdown 1.mp3')
    thud1 = loadSound('assets/whoop__ui-back-sound.mp3');
    thud2 = loadSound('assets/whoop__ui-back-sound.mp3');
    thud3 = loadSound('assets/whoop__ui-back-sound.mp3');
    webcamSound = loadSound('assets/magicWand2.mp3');
    
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
  //ortho — near and far planes going from negative to positive. 
  ortho(-width/2, width/2, -height/2, height/2, -width*2, width*2);

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
    
  textSize(72);
  textLeading(68);
  textAlign(LEFT, CENTER);
  textFont(droulers);
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
    
    textSize(72);
    textLeading(68);
    textAlign(LEFT, CENTER);
    textFont(droulers);

}
function setDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
}

function modelReady() {
  select('#status').html('Model Loaded');
}


function draw() {
    background(0, 255, 0);
    noFill();
    stroke(255, 0, 0);
    strokeWeight(0.75);
    print(screen);
    
    mouseSparkle();
    
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
            text('Enter scene_2,\n' + userName, -700, -375);
        pop();
    }
    
    //webcam popup
    else if (screen==2) {
        push();
            fill(255, 0, 0);
            text('Enter scene_2,\n' + userName, -700, -375);
        pop();
        
        if (!spokenWord.isPlaying() && spokenWordCount==0){
            print('hello yes the witches r speaking');
            spokenWord.play();
            reverb.process(spokenWord, 10, 5);
            spokenWordCount = 1;
        }
        
        stageScreens();

        // float in screens and sound effect
        if (backdropMove == -0.75) {
            backdropMove = 0;
            thud1.play();
        } else if (backdropMove < 0) {
            backdropMove = backdropMove + 0.75;
        }
        
        if (stage1Move == -2) {
            stage1Move = 0;
            thud2.play();
            print(thud2.isPlaying());
        } else if (stage1Move < 0) {
            stage1Move = stage1Move + 2;
        }
        
        if (stage2Move == -1) {
            stage2Move = 0;
            thud3.play();
        } else if (stage2Move < 0) {
            stage2Move = stage2Move + 1;
        }
    }
    // webcam
    else if (screen==3) {
        push();
            fill(255, 0, 0);
            text('Enter scene_2,\n' + userName, -700, -375);
        pop();
        
        stageScreens();
        
    }
    
    // get hands and keypoints to appear
    else if (screen==4) {
        stageScreens();
    }
    //explainer boxes to give context
    else if (screen==5) {
        
        // popup explainer 1, turn on orchid and music
        push();
            fill(175, 0, 0);            

            if (mouseX > 860 && mouseY > 70 && mouseX < 1340 && mouseY < 230) {
                image(popup1, 440, -300, 425, 250);
                push();
                textSize(26);
                text('Opera of the Orchid', 265, -385);
                pop();
                
                push();
                textSize(16);
                textLeading(19.2);
                text('MOVE your hands! Scene 2 is for\ngestural play, inspired by the\norchid hand speak of Chinese opera.\nHighly stylised hand gestures were\ndeveloped to express emotion and\nperform/subvert gender roles.', 265, -285);
                pop();
                
            } else {
                image(popup1, 440, -300, 400, 225);
                
                push();
                textSize(25);
                text('Opera of the Orchid', 270, -375);
                pop();
                
                push();
                textSize(15);
                textLeading(18);
                text('MOVE your hands! Scene 2 is for\ngestural play, inspired by the\norchid hand speak of Chinese opera.\nHighly stylised hand gestures were\ndeveloped to express emotion and\nperform/subvert gender roles.', 270, -285);
                pop();
            }
            
        pop();
        
        stageScreens();

        //print(handsOn);
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

            // next screen if the orchid is there and the sczwhoop is done playing
            if (orchidYes==true && orchidSoundEffect==1 && !sczwhoop.isPlaying()) {
                // popup gone sound effect
                if (!popupByeSound.isPlaying() &&popupByeSound_COUNT==0) {
                    popupByeSound.play();
                    popupByeSound_COUNT = 1;
                }
                screen = 6;
                
            }
        }
        
    }
    
    // percussion parts 
    else if (screen==6) {
        
        stageScreens();
            push();
            fill(175, 0, 0);            
            print(mouseX, mouseY);
            if (mouseX > 70 && mouseY > 620 && mouseX < 370 && mouseY < 780) {
                image(popup2, -480, 250, 425, 220);
                push();
                textSize(26);
                text('hand_XY_Movement', -660, 180);
                pop();
                
                push();
                textSize(16);
                textLeading(19.2);
                text('Orchestrate your own interactive\nopera. We invite you to embody\nthrough gesture: try clapping your\nhands, bring them up? Perhaps even\ncome a little closer…', -660, 265);
                pop();
                
            } else {
                image(popup2, -480, 250, 400, 195);
                
                push();
                textSize(25);
                text('hand_XY_Movement', -650, 190);
                pop();
                
                push();
                textSize(15);
                textLeading(18);
                text('Orchestrate your own interactive\nopera. We invite you to embody\nthrough gesture: try clapping your\nhands, bring them up? Perhaps even\ncome a little closer…', -650, 270);
                pop();
            }
            
        pop();
        
            //keep playing the erhu melody
            if (orchidYes == true && !erhu.isPlaying()) {
                erhu.play();
            }
        
         // start interactive opera with percussion instruments
         if (handsOn >= 1 && orchidYes==true) {
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
    
    //full interaction(all instruments, no boxes, add end button)
    else if (screen==7) {
        
        stageScreens();
        //keep playing the erhu melody
        if (orchidYes == true && !erhu.isPlaying()) {
            erhu.play();
        }
        
         // start interactive opera with percussion instruments
         if (handsOn >= 1 && orchidYes==true) {
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
        
        //create button to float out
        //create function endScene_2
        button = createButton('End scene_2');
        button.position(19, 19);
        button.mousePressed(endScene_2);
        
    }
    
    else if (screen==8) {
        
        print(mouseX, mouseY);
        
        button2 = createButton('Back to setup');
        button2.position(160, 19);
        button2.mousePressed(Setup_Link);
        
        button3 = createButton('Back to scene_1');
        button3.position(320, 19);
        button3.mousePressed(scene_1Link);


        push();
            fill(255, 0, 0);
//            textSize(64);
//            textLeading(68);
            text('// For whatever’s yet to input\n// Your futures are afoot\n// And all that’s left unsaid\n// Your choices be not bled', -700, -275);
        pop();
        
        stageScreens();
        
        if (erhu.isPlaying()) {
            erhu.stop();
        }

    }
    
}

function stageScreens() {
    // backdrop (main image)
    push();
        rotateX(30);
        rotateY(49.1);
        image(backdrop, 305, -187+backdropMove, 1100, 586);
    pop();    

    // Side screens and webcam
    push();
        rotateX(30);
        rotateY(-49);
        // webcam popup
//        if (screen==3 || screen ==4) {
//            push();
//                tint(255, 0, 0);
//                image(video, -525, -445, 320, 173);
//            pop();
//        }
    image(stage2, -549, -399+stage2Move, 610, 586);
    pop();
    
    push();
        rotateX(30);
        rotateY(-49);
        image(stage1, 549, 559+stage1Move, 610, 586);
    pop();
    
    if (screen==3 || screen==4 || screen==5 || screen==6 || screen==7) {
        backdropMove = 0;
        stage1Move = 0;
        stage2Move = 0;
        
        push();
            rotateX(30);
            rotateY(-49);
            // webcam popup
            tint(255, 0, 0);
            image(video, -525, -445, 320, 173);
        pop();

    }
    
    // float DOWN ? !!
    if (screen==8) {
        print('hello we r trying to float');
        
        backdropMove = backdropMove + 1.5;
        stage1Move = stage1Move + 4;
        stage2Move = stage2Move + 2;
    }
}


// A function to draw ellipses over the detected keypoints, translating to get it in perspective. 
function drawKeypoints()  {
    
push();
    
    // getting the keypoints to draw from an orthographic perspective. 
    translate(-width/3, -height/2);
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
          mappedOrchidCloseUpSize = map(distanceEyes, 0, 100, 0, 10, true);

      // DRAWING KEYPOINTS. Only draw an ellipse is the pose probability is bigger than 0.2 
      if (screen==4 || screen==5 || screen==6 || screen==7 && keypoint.score > 0.2) {
          
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
    if (screen==4 || screen==5 || screen==6 ||screen==7) {
        
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
      if (distanceHands <= 50 && screen==5 || screen==6 || screen==7) {
          handsTogether = true;
          handsOn = handsOn + 1;
      } else {
          handsTogether = false;
      }
        
          if (handsOn > 1) {
              soundMapped = map(soundLevel, 0, 0.3, 100, 255);
              push();
                  translate(width/2, height/3);
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
    if (screen==4 || screen==5 || screen==6 || screen==7) {
        push();

          // getting the skeleton to draw from an orthographic perspective. 
          translate(-width/3, -height/2);
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

function endScene_2() {
    screen = 8;
    //play end CyborgWitchXYZ 2
    
    if (endCyborgWitchXYZ2_COUNT==0 && !endCyborgWitchXYZ2.isPlaying()) {
        endCyborgWitchXYZ2.play();
        reverb.process(endCyborgWitchXYZ2, 10, 5);
        endCyborgWitchXYZ_COUNT2 = 1;
    }

}

function Setup_Link() {
    window.location.replace("https://cyborgwitch.github.io/CyborgWitchTheatre/enterUser/setup/");

}

function scene_1Link() {
    window.location.replace("https://cyborgwitch.github.io/CyborgWitchTheatre/scene_1/Cyborg_Love_Poems/");
    
}

function mousePressed() {
    //mousePress to trigger screens and spokenWord
    if (screen==1) {
        screen = screen + 1;

    }
    
    else if (screen==2) {
        if (backdropMove == 0 && stage1Move == 0 && stage2Move ==0) {
            screen = screen + 1;
            
        }
    }
    
    else if (screen==3) {
        screen = screen + 1;
        webcamSound.play();

    }
    
    else if (screen==4) {
        screen = screen + 1;

    }
    
    else if (screen==5) {
        
    }
    
    else if (screen==6) {
          if (mouseX > 70 && mouseY > 560 && mouseX < 370 && mouseY < 740) {
              screen = screen + 1;
              //popupByeSound2.play();
          }
        
    }
    
    else if (screen==7) {
        
    }
}

function mouseSparkle() {
    // if mouse is pressed, then draw a "wand"
    if (mouseIsPressed) {
        push();
        stroke(255, 0, 0);
        fill(255, 0, 0);
        translate(mouseX+2,mouseY+4);

        for (let i = 0; i < totalPoints; i++) {
            mouseSparkleAngle = i*gap
      
            x1 = rInside*cos(mouseSparkleAngle);
            y1 = rInside*sin(mouseSparkleAngle);
            x2 = rOutside*cos(mouseSparkleAngle);
            y2 = rOutside*sin(mouseSparkleAngle);
    
            line(x1, y1, x2, y2);
        }
  pop();
        
    }
    
}
