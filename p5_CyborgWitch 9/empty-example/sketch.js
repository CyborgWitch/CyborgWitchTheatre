// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

//preload materials/objects
let hand;
let chart;
let vase;
let fortune;
let leftTalon, rightTalon;

// new stage
let backdrop;
let stage1, stage2;

let grid = true;

var angle = 0;

// Wrist x, y positions //mapped to margins
var leftWristX, leftWristY, rightWristX, rightWristY;

// mapped wrist positions to 255 colour values
var mappedLeftWristX, mappedLeftWristY, mappedRightWristX, mappedRightWristY;

//translating hands within translated keypoints
var translatedLeftHandX, translatedLeftHandY, translatedRightHandX, translatedRightHandY;

// changing the scale according to distance apart
var handSize;
var distanceEyes;
var distanceHands;

//head position
var noseX, noseY;

function preload() {
    //hand = loadModel('assets/handModel.obj');
    
    chart = loadImage('assets/CyborgWitchTheatre001 copy.jpg');
    fortune = loadImage('assets/goodFortune.jpg');
    leftTalon = loadImage('assets/leftHandTalon.png');
    rightTalon = loadImage('assets/rightHandTalon.png');
    backdrop  = loadImage('assets/handClawWindow.jpg');
    
    stage1 = loadImage('assets/Hand_sideStage.jpg');
    stage2 = loadImage('assets/Hand_sideStage2.jpg');

    hand = loadModel('assets/hand-free.obj');
    vase = loadModel('assets/Vase_504.obj');
    
}
function setup() {
  createCanvas(1440, 900, WEBGL);
  perspective(45, width/height, 2000, 2000)
  ortho(-width/2, width/2, -height/2, height/2);

  background(0, 255, 0);
  video = createCapture(VIDEO);
  video.size(width, height);
  background(0, 255, 0);
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
  imageMode(CENTER);
  angleMode(DEGREES);
    
//translate(-width/2, -height/2);


}

function modelReady() {
  select('#status').html('Model Loaded');
}


function draw() {
    background(0, 255, 50);
    noFill();
    stroke(255, 0, 0);
    strokeWeight(0.75);
    
    // setting angle speed
    angle = angle + 1;
    
    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
    drawSkeleton();
    
//    push();
//    translate(-width/2, -height/2);
//    image(rightTalon, leftWristX, leftWristY, 200, 500);
//    image(leftTalon, rightWristX, rightWristY, 200, 500);
//    pop();
    
//     // left vase/hand
//        push();
//    
//            //translate(rightWristX-700, rightWristY-300);      //for keypoints
//            translate(-300, 0);
//
//            rotateX(160);
//            rotateY(90+angle);
//
//
//            scale(12);
//            ambientLight(255, 0, 50);
//            pointLight(0, 255, 0, mappedLeftWristX, mappedLeftWristY, 0);
//            pointLight(0, 0, 100, -400, -400, 200);
//
//            directionalLight(mappedLeftWristX, 0, mappedRightWristY, -200, -200, 0);
//            directionalLight(0, mappedRightWristX, mappedLeftWristY, 200, 200, 0);
//            specularColor(0, mappedLeftWristY, 0);
//            specularMaterial(mappedRightWristY, 255, 0);
//            model(hand);
//
//        pop();
//    
//       
//    // right vase/hand
//        push();
//    
//            //translate(leftWristX-700, leftWristY-300);
//            translate(200, 200);
//            rotateX(160);
//            rotateY(-90-angle);
//            rotateZ(180);
//
//            scale(12);
//            ambientLight(255, 0, 50);
//            pointLight(0, 255, 0, mappedRightWristX, mappedRightWristY, 0);
//            pointLight(100, 0, 0, -400, -400, 200);
//
//            directionalLight(mappedRightWristX, mappedLeftWristX, 0, -200, -200, 0);
//            directionalLight(mappedLeftWristY, 0, mappedRightWristY, 200, 200, 0);
//            specularColor(0, mappedRightWristX, 0);
//            specularMaterial(200, mappedLeftWristY, 0);   
//            model(hand);
//
//        pop();
////    

    // backdrop 
    push();
    rotateX(30);
    rotateY(49);
    //rotateZ(90);
    //image(chart, 0, 0, width/2, height/2);
//    image(video, 0, 0, width/4, height/4);
    image(backdrop, 295, -185, 1080, 585);
    pop();    
    
    // camera feed
    
    push();
    rotateX(30);
    rotateY(-49);
    image(video, -542, 60, 600, 350);
    image(stage1, -535, -399, 620, 585);
    image(stage2, 550, 550, 620, 585);


    //rotateZ(90);
    //image(chart, 0, 0, width/4, height/4);
    //image(video, 0, 0, width/4, height/4);
    pop();
    
    
  //alternate isometric grid
    if (grid){
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
        
    }
      

}

// A function to draw ellipses over the detected keypoints, translating to get it in perspective. 
function drawKeypoints()  {
    
push();
    

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
        
      leftWristX = map(pose.leftWrist.x, 0, width, 200, width-200);
      leftWristY = map(pose.leftWrist.y, 0, height, 100, height-100);
      rightWristX = map(pose.rightWrist.x, 0, width, 200, width-200);
      rightWristY = map(pose.rightWrist.y, 0, height, 100, height-100);
        
      mappedLeftWristX = map(pose.leftWrist.x, 0, width, 0, 255);
      mappedLeftWristY = map(pose.leftWrist.y, 0, height, 0, 255);
      mappedRightWristX = map(pose.rightWrist.x, 0, width, 0, 255);
      mappedRightWristY = map(pose.rightWrist.y, 0, height, 0, 255);
        
      noseX = pose.nose.x;
      noseY = pose.nose.y;
        
      // calculating distance between hands/eyes to change scale
      distanceEyes = dist(pose.leftEye.x, pose.leftEye.y, pose.rightEye.x, pose.rightEye.y);
      distanceHands = dist(pose.leftWrist.x,  pose.leftWrist.y, pose.rightWrist.x, pose.rightWrist.y);
      handSize = map(distanceEyes, 0, 250, 0, 20);
        
        
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();

        ellipse(keypoint.position.x, keypoint.position.y, 40, 40);
    
      }
    }
  }
    

    
        //left vase/hand
        push();
    
            translate(rightWristX, rightWristY);
            rotateX(0);
            rotateY(distanceHands);
            //rotateY(angle);


            scale(handSize);
            ambientLight(255, 0, 50);
            pointLight(0, 255, 0, mappedLeftWristX, mappedLeftWristY, 0);
            pointLight(0, 0, 100, -400, -400, 200);

            directionalLight(mappedLeftWristX, 0, mappedRightWristY, -200, -200, 0);
            directionalLight(0, mappedRightWristX, mappedLeftWristY, 200, 200, 0);
            specularColor(0, mappedLeftWristY, 0);
            specularMaterial(mappedRightWristY, 255, 0);
            model(hand);

        pop();
    
       
    // right vase/hand
        push();
    
            translate(leftWristX, leftWristY);
            rotateX(0);
            rotateY(distanceHands);
            rotateZ(180);
            //rotateY(-angle);
        
            scale(handSize);
            ambientLight(255, 0, 50);
            pointLight(0, 255, 0, mappedRightWristX, mappedRightWristY, 0);
            pointLight(100, 0, 0, -400, -400, 200);

            directionalLight(mappedRightWristX, mappedLeftWristX, 0, -200, -200, 0);
            directionalLight(mappedLeftWristY, 0, mappedRightWristY, 200, 200, 0);
            specularColor(0, mappedRightWristX, 0);
            specularMaterial(200, mappedLeftWristY, 0);   
            model(hand);

        pop();

pop();
    
}

// A function to draw the skeletons, translating to get it in perspective
function drawSkeleton() {
    
push();


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
