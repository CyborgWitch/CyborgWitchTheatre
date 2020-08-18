
//Fiends, deviants, mysteries, wretched ones, 
//Enter softly into the Cyborg Witch Theatre. 
//Pass into the dimension of thresholds 
//inbetween flesh and screen, input and output
//
//This theatre is for 
//Reimagining recasting recalibrating 
//Our stories, our bodies, our words
//Let us gather in the woods of the web. 
//
//We call forth our code into this space and stage 
//We invite them to occupy and hold intersections
//Intersections of the Cyborg and the Witch. 
//Intersections of gender, race, sexuality. 

var screen = 1;
var numberOfPages = 6;

var colourX;
var colourY;
var R;

var l1 = 'Fiends, deviants, mysteries, wretched ones,\nEnter softly into the Cyborg Witch Theatre.\nParse into the dimension of thresholds\ninbetween flesh and screen, input and output';
var l2 = 'This theatre is for\nReimagining recasting recalibrating.\nOur stories, our bodies, our words.\nLet us gather in the woods of the web.';
var l3 = 'We call forth our code into this space and stage.\nWe invite them to occupy and hold intersections.\nIntersections of the Cyborg and the Witch.\nIntersections of gender, race, sexuality.';

//assets
var droulers;

var fiend;
var theatre;
var codeForth;

var fiendIsPlaying = false;
var theatreIsPlaying = false;
var codeForthIsPlaying = false;

function preload() {
    droulers = loadFont('assets/Droulers_TEST-Regular.otf');
    fiend = loadSound('assets/fiendx3.mp3');
    theatre = loadSound('assets/theatrex3.mp3');
    codeForth = loadSound('assets/code forthx3.mp3');
    

}

function setup() {
  // put setup code here
    createCanvas(1440, 900);
    background(0);
    
    textFont(droulers);
    textSize(28);
    textAlign(CENTER);
    textLeading(32);
    
    rectMode(CENTER);
    
    
}

function draw() {
  // put drawing code here
    
      colourX = map(mouseX, 0, 1440, 200, 255);
      colourY = map(mouseY, 0, 900, 180, 230);
      R = map(mouseX, 0, 1440, 230, 255);
      fill(0, colourX, colourY);
    
  if (screen==1) {
      background(R, 0, 0);
      push();
      stroke(0, 255, 0);
      strokeWeight(5);
      rect(width/2, height/2, 100, 50);
      pop();
      
      push();
      fill(R, 0, 0);
      noStroke();
      text('Enter', width/2, height/2+10);
      pop();
      
  }
  
  else if (screen==2) {
      background(R, 0, 0);
      text(l1, width/2, height/2-70);
      
    if (fiendIsPlaying == false) {
        fiendIsPlaying = true;
        fiend.play();
    }

  }
  
  else if (screen==3) {
      background(R, 0, 0);
      text(l2, width/2, height/2-70);
          
    if (theatreIsPlaying == false) {
        theatreIsPlaying = true;
        theatre.play();
    }   
    
  }
  
  else if (screen==4) {
      background(R, 0, 0);      
      text(l3, width/2, height/2-70);
      
    if (codeForthIsPlaying == false) {
        codeForthIsPlaying = true;
        codeForth.play();
    }
    
  }
  
  else if (screen==5) {
      background(R);
  }
    
  else if (screen==6) {
      background(R, 0, 0);

  }
    
   
}



function mousePressed() {
    
  if (screen==1) {
    if (670 < mouseX > 770 && 425 < mouseY > 475) {
        screen = screen + 1;
      }  
  }
  
  else if (screen==2) {
    if (fiend.currentTime() > 15.4){
        screen = screen + 1;
    }
  }
  
  else if (screen==3) {
    //draw third screen
    if (theatre.currentTime() > 12.7){
        screen = screen + 1;
    }
  }
  
  else if (screen==4) {
    //draw fourth screen
    if (codeForth.currentTime() > 15.7){
        screen = screen + 1;
    }
  }
  
  else if (screen==5) {
      screen = screen + 1;
  }
    
  else if (screen==6) {
      screen = screen + 1;
  }
    
   if(screen > numberOfPages){
    screen = 1;
   }
    
}
