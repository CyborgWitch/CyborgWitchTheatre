var screen = 1;
var numberOfPages = 6;

var colourX;
var colourY;
var G;

var l1 = ' 1 //Fiends, mysteries, wretched ones,\n 2 //Enter, this Cyborg Witch Theatre.\n 3 //Parse the thresholds in-between\n 4 //Flesh and screen, input and output';
var l2 = ' 5 //\n 6 //Code walls, witch speak\n 7 //Setup and draw our bodies\n 8 //Into a cyborg witch becoming.\n 9 //Into the wilds of the web.';
var l3 = '10 //\n11 //We call forth this stage.\n12 //Where dimensions multiply\n13 //Becoming becomes viral.\n14 //Gender x race x sexuality';

//assets
var droulers;
var trickster;

var fiend;
var theatre;
var codeForth;

var fiendIsPlaying = false;
var theatreIsPlaying = false;
var codeForthIsPlaying = false;

let reverb;

var crrnt1, crrnt2, crrnt3;

var speech = new p5.Speech(voiceReady);


function preload() {
    droulers = loadFont('assets/Droulers_TEST-Regular.otf');
    trickster = loadFont('assets/Trickster-Reg.otf');
    
    fiend = loadSound('assets/FIENDS2.mp3');
    theatre = loadSound('assets/SETUP2.mp3');
    codeForth = loadSound('assets/STAGE2.mp3');
    

}
    
function voiceReady() {
  //console.log(speech.voices);
    speech.listVoices();
    /*speech.setVoice('Satu');
    speech.speak('fiends, mysteries, wretched ones');*/

} 

function setup() {
  // put setup code here
    createCanvas(1440, 900);
    background(0);
    
    textFont(droulers);
    textSize(21);
    textAlign(LEFT);
    textLeading(24);
    
    rectMode(CENTER);
    
    reverb = new p5.Reverb();
        
    }



function draw() {
  // put drawing code here
    
      colourX = map(mouseX, 0, 1440, 200, 255);
      colourY = map(mouseY, 0, 900, 180, 230);
      G = map(mouseX, 0, 1440, 230, 255);
      fill(colourX, 0, 0);
    
  if (screen==1) {
      background(0, G, 0);

  }
  
  else if (screen==2) {
      background(0, G, 0);
      text(l1, 100, 50);

/*      crrnt1 = fiend.currentTime();
      print(crrnt1);*/
      
    if (fiendIsPlaying == false) {
        fiendIsPlaying = true;
        fiend.play();
        reverb.process(fiend, 10, 5);
    }

  }
  
  else if (screen==3) {
      background(0, G, 0);
      text(l1, 100, 50);
      text(l2, 100, 146);
      
/*      crrnt2 = theatre.duration();
      print(crrnt2);*/
          
    if (theatreIsPlaying == false) {
        theatreIsPlaying = true;
        theatre.play();
        reverb.process(theatre, 10, 5);
    }   
    
  }
  
  else if (screen==4) {
      background(0, G, 0);
      text(l1, 100, 50);
      text(l2, 100, 146);
      text(l3, 100, 266);
      
/*      crrnt3 = codeForth.currentTime();
      print(crrnt3);*/
      
    if (codeForthIsPlaying == false) {
        codeForthIsPlaying = true;
        codeForth.play();
        reverb.process(codeForth, 10, 5);

    }
    
/*    if(codeForth.currentTime() > 4.5) {
          //ortho(-width/2, width/2, -height/2, height/2);
          stroke(255, 0, 0);
          translate(width/2, height/2);
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
       }*/
    
  }
  
  else if (screen==5) {
      background(0, G, 0);
  }
    
  else if (screen==6) {
      background(0, G, 0);

  }  
}


function mousePressed() {
    
  if (screen==1) {
      screen = screen + 1

  }
  
 else if (screen==2) {
    screen = screen + 1;

/*    if (crrnt1 > 13.5){
        screen = screen + 1;
    }*/
  }
  
  else if (screen==3) {
    //draw third screen
      screen = screen + 1;

 /*   if (crrnt2 > 10.5){
        screen = screen + 1;
    }*/
  }
  
  else if (screen==4) {
    //draw fourth screen
      screen = screen + 1;

/*    if (crrnt3 > 11.5){
        screen = screen + 1;
    }*/
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