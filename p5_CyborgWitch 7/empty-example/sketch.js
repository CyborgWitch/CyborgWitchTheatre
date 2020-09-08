var screen = 1;
var numberOfPages = 9;

var colourX = 255;
var colourY = 255;
var G = 255;

var l1 = ' 1 //Fiends, mysteries, wretched ones,\n 2 //Enter, this Cyborg Witch Theatre.\n 3 //Parse the thresholds in-between\n 4 //Flesh and screen, input and output';
var l2 = ' 5 //\n 6 //Code walls, witch speak\n 7 //Setup and draw our bodies\n 8 //Into a cyborg witch becoming.\n 9 //Into the wilds of the web.';
var l3 = '10 //\n11 //We call forth this stage.\n12 //Where possibilities multiply\n13 //Becoming becomes viral.\n14 //Gender x race x sexuality\n15';

var l4 = '\n19\n20 incantation setup(CyborgWitchTheatre) {\n21\n22   dimensions.multiply();\n23   intersection(Cyborg*Witch);\n24   intersection(ofTheBody);\n25   intersection.declare(queerChineseAustralianWoman);\n26\n27 }';
var l5 = '28\n29 incantation draw(intersections) {\n30\n31   perspective(gridPlane);\n32   stage.set(2);\n33   stage.scenes(2);\n34\n\n\n\n\n\n40\n41 }\n';


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

//var speech = new p5.Speech(voiceReady);

// USERNAME !!!
var userInput;
var userName = '';
var userEnter = false;

var keyEnter = 0;

//incantation enact
var grid = false;
var codeOut = 0;


function preload() {
    droulers = loadFont('assets/Droulers_TEST-Regular.otf');
    trickster = loadFont('assets/Trickster-Reg.otf');
    
    fiend = loadSound('assets/FIENDS2.mp3');
    theatre = loadSound('assets/SETUP2.mp3');
    codeForth = loadSound('assets/STAGE2.mp3');
    

}
    
/*function voiceReady() {
  //console.log(speech.voices);
    speech.listVoices();
    speech.setVoice('Satu');
    speech.speak('fiends, mysteries, wretched ones');

} */

function setup() {
  // put setup code here
    createCanvas(1440, 900);
    background(0);

    
    textFont(droulers);
    textSize(21);
    textAlign(LEFT);
    textLeading(24);
    
    rectMode(CENTER);
    angleMode(DEGREES);
    
    reverb = new p5.Reverb();
    
    //username

        
    }


function draw() {
      
      fill(colourX, 0, 0);
    
  if (screen==1) {
      background(0, G, 0);
    
      push();
      textSize(163);
      textLeading(150);
      text('Cyborg Witch\nTheatre', 50, 130);
      pop(); 

  }
  
  else if (screen==2) {
      background(0, G, 0);
      push();
      textSize(163);
      textLeading(150);
      text('Cyborg Witch\nTheatre', 50, 130);
      pop(); 
      
      crrnt1 = fiend.currentTime();
      print(crrnt1);
      
      text(l1, 50, 552);
      
    if (fiendIsPlaying == false) {
        fiendIsPlaying = true;
        fiend.play();
        reverb.process(fiend, 10, 5);
    } 
  }
  
  else if (screen==3) {
      background(0, G, 0);
      push();
      textSize(163);
      textLeading(150);
      text('Cyborg Witch\nTheatre', 50, 130);
      pop(); 
      
      crrnt2 = theatre.currentTime();
      print(crrnt2);
      
      text(l1, 50, 552);
      text(l2, 50, 648);
      
    if (theatreIsPlaying == false) {
        theatreIsPlaying = true;
        theatre.play();
        reverb.process(theatre, 10, 5);
    }   
    
  }
  
  else if (screen==4) {
      background(0, G, 0);
      push();
      textSize(163);
      textLeading(150);
      text('Cyborg Witch\nTheatre', 50, 130);
      pop(); 
      
      crrnt3 = codeForth.currentTime();
      print(crrnt3);
      
      text(l1, 50, 552);
      text(l2, 50, 648);
      text(l3, 50, 768);
      
    if (codeForthIsPlaying == false) {
        codeForthIsPlaying = true;
        codeForth.play();
        reverb.process(codeForth, 10, 5);
    }
  }
  
  else if (screen==5) {
      background(0, G, 0);
            
      text('16 let user = CyborgWitch;', 50, 50);
      text('17 input your CyborgWitch username', 50, 74);
      
      //username    
      userInput = createInput();
      userInput.position(520, 56+codeOut);
      userInput.changed(newText);

  }
    
  else if (screen==6) {
      background(0, G, 0);
      userInput.changed(newText);

      
      text('16 let user = CyborgWitch;', 50, 50);
      text('17 input your CyborgWitch username', 50, 74);
      text('18 Welcome,', 50, 98);
      text(userName, 205, 98);

  }  

  else if (screen==7) {
      background(0, G, 0);
                  
      text('16 let user = CyborgWitch;', 50, 50);
      text('17 input your CyborgWitch username', 50, 74);
      text('18 Welcome,', 50, 98);
      text(userName, 205, 98);
      text(l4, 50, 98);
      
  }
    
  else if (screen==8) {
      background(0, G, 0);
      userInput.changed(newText);

      text('16 let user = CyborgWitch;', 50, 50);
      text('17 input your CyborgWitch username', 50, 74);
      text('18 Welcome,', 50, 98);
      text(userName, 205, 98);
      text(l4, 50, 98);
      text(l5, 50, 338);
      
      text('35   ' + userName + '.pronouns();', 50, 506);
      text('36   ' + userName + '.body(engage);', 50, 530);
      text('37   ' + userName + '.voice(speak);', 50, 554);
      text('38   ' + userName + '.gesture(create);', 50, 578);
      text('39   ' + userName + '.enter(softly);', 50, 602);
      
  }  
    
  else if (screen==9) {
      background(0, G, 0);

                  
      text('16 let user = CyborgWitch;', 50, 50+codeOut);
      text('17 input your CyborgWitch username', 50, 74+codeOut);
      text('18 Welcome,', 50, 98+codeOut);
      text(userName, 205, 98+codeOut);
      text(l4, 50, 98+codeOut);
      text(l5, 50, 338+codeOut);
      
      text('35   ' + userName + '.pronouns();', 50, 506+codeOut);
      text('36   ' + userName + '.body(engage);', 50, 530+codeOut);
      text('37   ' + userName + '.voice(speak);', 50, 554+codeOut);
      text('38   ' + userName + '.gesture(create);', 50, 578+codeOut);
      text('39   ' + userName + '.enter(softly);', 50, 602+codeOut);
      
    //alternate isometric grid  
      push();
        translate(width/2, height/2);
        stroke(255, 0, 0);
        strokeWeight(0.5);
        
            push();
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
            pop();
       
      pop();

  if (codeOut <= 630) {
      codeOut = codeOut - 2;
      print(codeOut);
  } else {
        codeOut = 631;
        print(codeOut);
    }
}
}

function newText() {
    userName = userInput.value();
    console.log(userName);

}

function mousePressed() {
    
  if (screen==1) {
      screen = screen + 1
  }
  
  else if (screen==2) {
     
    if (fiend.currentTime() >= 13.5) {
        fiendIsPlaying = false;
        console.log(fiendIsPlaying);
        screen = screen + 1;
    }

  }
  
  else if (screen==3) {
      
    if (theatre.currentTime() >= 12.5) {
        theatreIsPlaying = false;
        console.log(theatreIsPlaying);
        screen = screen + 1;
    }
  }
  
  else if (screen==4) {
      
    if (codeForth.currentTime() >= 12.8) {
        codeForthIsPlaying = false;
        console.log(codeForthIsPlaying);
        screen = screen + 1;
    }
  }
  
  else if (screen==5) {
    screen = screen + 1;
    
  }
    
  else if (screen==6) {
    if (keyEnter >= 1) {
        screen = screen + 1;
    }
  }
    
  else if (screen==7) {
        screen = screen + 1;
  }
    
  else if (screen==8) {
      screen = screen + 1;
  }

  else if (screen==9) {
  }
    
//if (screen > numberOfPages){
//    screen = 1;
//}
    
}

function keyPressed() {
    if (keyCode == ENTER) {
        userEnter = true;
        keyEnter++;
        print(userEnter);
    } 
}
   
