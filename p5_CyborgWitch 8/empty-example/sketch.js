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
let hand;
let chart;
let vase;
let fortune;

let grid = true;

var angle = 0;

// mapped wrist positions to 255 colour values
var leftWristX, leftWristY, rightWristX, rightWristY;

function preload() {
    //hand = loadModel('assets/handModel.obj');
    
    chart = loadImage('assets/CyborgWitchTheatre001 copy.jpg');
    fortune = loadImage('assets/goodFortune.jpg');
    
    hand = loadModel('assets/hand-free.obj');
    vase = loadModel('assets/Vase_504.obj');
    
    
}
function setup() {
  createCanvas(1440, 900, WEBGL);
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
    
    // left vase/hand
        push();
    
        translate(-300, 50)
        rotateX(160);
        rotateY(angle);
        texture(chart);
        scale(3);
        model(vase);
    
        scale(12);
        shininess(0);
        ambientLight(255, 0, 50);
        pointLight(0, 255, 0, leftWristX, leftWristY, 0);
        pointLight(0, 0, 100, -400, -400, 200);

        directionalLight(leftWristX, 0, rightWristY, -200, -200, 0);
        directionalLight(0, rightWristX, leftWristY, mouseX, mouseY, 0);
        specularColor(0, leftWristY, 0);
        specularMaterial(rightWristY, 255, 0);
        push();
        //rotateX(angle/4);
        model(hand);
        pop();
        pop();
    
        // left fortune
        push();
        translate(-300, -325)
        rotateZ(45);
        //rotateX(160);
        //rotateY(angle);
        image(fortune, 0, 0, 100, 100);
        pop();
    
    // right vase/hand
        push();
    
        translate(300, 300)
        rotateX(160);
        rotateY(-angle);
        texture(chart);
        scale(3);
        model(vase);
    
        scale(12);
        shininess(0);
        ambientLight(255, 0, 50);
        pointLight(0, 255, 0, rightWristX, rightWristY, 0);
        pointLight(100, 0, 0, -400, -400, 200);

        directionalLight(rightWristX, leftWristX, 0, -200, -200, 0);
        directionalLight(leftWristY, 0, rightWristY, 200, 200, 0);
        specularColor(0, rightWristX, 0);
        specularMaterial(200, leftWristY, 0);        
        push();
        //rotateX(angle/4);
        model(hand);
        pop();
        pop();
    
        // right fortune
        push();
        translate(300, -75);
        //rotateX(160);
        rotateZ(45);
        //rotateY(-angle);
        image(fortune, 0, 0, 100, 100);
        pop();
    

    // webcam feed
    push();
    console.log(angle);
    rotateX(30);
    rotateY(49);
    //rotateZ(90);
    image(video, 0, 0, width/4, height/4);
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
    
    translate(-width/3, -width/5*2);
    rotateX(30);
    rotateY(49);

  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
        
      leftWristX = map(pose.leftWrist.x, 0, width, 0, 255);
      leftWristY = map(pose.leftWrist.y, 0, height, 0, 255);
      rightWristX = map(pose.rightWrist.x, 0, width, 0, 255);
      rightWristY = map(pose.rightWrist.y, 0, height, 0, 255);
        
      console.log(leftWristY);
      console.log(leftWristX);
        
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();

        //ellipse(keypoint.position.x, keypoint.position.y, 40, 40);
     

      }
    }
  }

pop();
    
}

// A function to draw the skeletons, translating to get it in perspective
function drawSkeleton() {
    
push();
    
  translate(-width/3, -width/5*2);
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

        
      //line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      pop();

  }
      
}
pop();
}
