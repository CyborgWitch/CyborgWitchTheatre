var width, height;

var screen = 1;
var numberOfPages = 11;

// fake code text — poem
var l1 = ' 1 //Fiends, mysteries, wretched ones,\n 2 //Enter, this Cyborg Witch Theatre.\n 3 //Parse the thresholds in-between\n 4 //Flesh and screen, input and output';
var l2 = ' 5 //\n 6 //Code walls, witch speak\n 7 //Setup and draw our bodies\n 8 //Into a cyborg witch becoming.\n 9 //Into the wilds of the web.';
var l3 = '10 //\n11 //We call forth this stage.\n12 //Where dimensions multiply\n13 //Possibilities intersect\n14 //Becoming becomes viral.\n15';
// fake code text — setup 
var l4 = '  dimensions.multiply();\n  intersection(Cyborg*Witch);\n  intersection(ofTheBody);\n  intersection.declare(queerChineseAustralianWomxn);';
var l5 = '  perspective(gridPlane);\n  stage.set(2);\n  stage.scenes(2)';

var sideNumbers1 = '\n19\n20\n21\n22\n23\n24\n25\n26\n27\n28\n29\n30\n31\n32\n33\n34\n35\n36\n37\n38\n39\n40\n41';

// mouseSparkle, drawing sparkles when mouse is pressed
let totalPoints = 5;
let angle = 0;
let gap = 360/totalPoints;
let rInside  = 15;
let rOutside = 25;
var x1, y1;
var x2, y2;
// loading circle
let rInside2 = 15;
let rOutside2 = 45;
var x3, x4;
var y3, y4;

// fonts
var droulers;
var droulersItalic;
var trickster;

// sound files
var fiend;
var theatre;
var codeForth;
var fiendIsPlaying = false;
var theatreIsPlaying = false;
var codeForthIsPlaying = false;
var codeForthCount = 0;
var softWind;
var usernameSound;
var usernameSound2;

var usernameSoundCount = 0;
var portalSound;
var portalSoundCount = 0;
var incantationSound1, incantationSound2;
var incantationSound1Count = 0;
var incantationSound2Count = 0;
var MagicSound;
var MagicSoundCount = 0;
var thisWaySound;
var thisWaySoundCount = 0;

let reverb;

// USERNAME
var userInput;
var userName = '';
var userEnter = false;
var userNameIn = false;
var userNameBox = false;
// checking if username has been entered
var keyEnter = 0;

// incantation enact — draw grid in, float code out. 
var grid = false;
var codeOut = -1;
var opacity = 1;

function preload() {
    droulers = loadFont('assets/Droulers-Regular.otf');
    droulersItalic = loadFont('assets/Droulers-Italic.otf');

    trickster = loadFont('assets/Trickster-Reg.otf');
    
    //spoken word
    fiend = loadSound('assets/FIENDS2.mp3');
    theatre = loadSound('assets/SETUP2.mp3');
    codeForth = loadSound('assets/STAGE3.mp3');
    
    //sound effects;
    softWind = loadSound('assets/soft wind.mp3');
    usernameSound = loadSound('assets/tinkerbellishTimbre.mp3');
    userNameSound2 = loadSound('assets/MagicSound.mp3');
    portalSound = loadSound('assets/MagicalPortalOpen.mp3');
    incantationSound1 = loadSound('assets/MagicWand1.mp3');
    incantationSound2 = loadSound('assets/magicWand2.mp3');
    MagicSound = loadSound('assets/MagicSound.mp3');
    portalSound = loadSound('assets/MagicalPortalOpen.mp3');
    thisWaySound = loadSound('assets/this way_door.mp3');
}
    
/*function voiceReady() {
  //console.log(speech.voices);
    speech.listVoices();
    speech.setVoice('Satu');
    speech.speak('fiends, mysteries, wretched ones');

} */

function windowResized() {
    setDimensions();
    resizeCanvas(width, height);
    
    textFont(droulers);
    textSize(21);
    textAlign(LEFT);
    textLeading(24);
    
    rectMode(CENTER);
    angleMode(DEGREES);

}

function setDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
}

function setup() {
  // put setup code here
    setDimensions(); 
    createCanvas(width, height);
    background(0, 255, 0);
    
    textFont(droulers);
    textSize(21);
    textAlign(LEFT);
    textLeading(24);
    
    rectMode(CENTER);
    angleMode(DEGREES);
    
    reverb = new p5.Reverb();
    
    }


function draw() {
      
  fill(255, 0, 0);
  print(screen);

  // big "cyborg witch theatre"    
  if (screen==1) {      
      background(0, 255, 0);
      mouseSparkle();

      push();
      textSize(163);
      textLeading(150);
      text('Cyborg Witch\nTheatre', 40, 130);
      pop(); 
      
      push();
      textSize(16);
      textLeading(20);
      text('Click to start the experience and sound.\n\nThis website was made for desktop and works best in Chrome at 1440 x 900 px,\non faster computers. You will be asked to grant camera and microphone access\nfor the interactions, but no data will be stored in the server.', 50, 330);
      pop();
      
      push();
      stroke(255, 0, 0);
      line(0, 130, width, 130);
      line(0, 280, width, 280);
      pop();
//      
  }
    
  // first stanza of poem, fiends. 
  else if (screen==2) {
      background(0, 255, 0);
      mouseSparkle();

      //TEXT
      push();
      textSize(163);
      textLeading(150);
      text('Cyborg Witch\nTheatre', 40, 130);
      pop(); 
      
      push();
      textSize(16);
      textLeading(20);
      text('Click to start the experience and sound.\n\nThis website was made for desktop and works best in Chrome at 1440 x 900 px,\non faster computers. You will be asked to grant camera and microphone access\nfor the interactions, but no data will be stored in the server.', 50, 330);
      pop();
      
      push();
      stroke(255, 0, 0);
      line(0, 130, width, 130);
      line(0, 280, width, 280);
      pop();
      
      text('Enter Cyborg Witches X, Y, & Z:', 108, 504);
      text(l1, 40, 552);


  }
  
  // second stanza of poem, 'theatre'
  else if (screen==3) {
      background(0, 255, 0);
      mouseSparkle();
      
      //TEXT
      push();
      textSize(163);
      textLeading(150);
      text('Cyborg Witch\nTheatre', 40, 130);
      pop(); 
      
      push();
      textSize(16);
      textLeading(20);
      text('Click to start the experience and sound.\n\nThis website was made for desktop and works best in Chrome at 1440 x 900 px,\non faster computers. You will be asked to grant camera and microphone access\nfor the interactions, but no data will be stored in the server.', 50, 330);
      pop();
    
      text('Enter Cyborg Witches X, Y, & Z:', 108, 504);
      text(l1, 40, 552);
      text(l2, 40, 648);
      
      push();
      stroke(255, 0, 0);
      line(0, 130, width, 130);
      line(0, 280, width, 280);
      pop();

    
  }
  
  // third stanza of poem, call/code forth. 
  else if (screen==4) {
      background(0, 255, 0);
      mouseSparkle();

      
      //TEXT
      push();
      textSize(163);
      textLeading(150);
      text('Cyborg Witch\nTheatre', 40, 130);
      pop(); 
      
      push();
      textSize(16);
      textLeading(20);
      text('Click to start the experience and sound.\n\nThis website was made for desktop and works best in Chrome at 1440 x 900 px,\non faster computers. You will be asked to grant camera and microphone access\nfor the interactions, but no data will be stored in the server.', 50, 330);
      pop();
      
      text('Enter Cyborg Witches X, Y, & Z:', 108, 504);
      text(l1, 40, 552);
      text(l2, 40, 648);
      text(l3, 40, 768);
      
      push();
      stroke(255, 0, 0);
      line(0, 130, width, 130);
      line(0, 280, width, 280);
      pop();
      
      if (!codeForth.isPlaying &&codeForthCount==1 && !softWind.isPlaying()){
          softWind.play();
          print('wind is blowing');
      }

  }

  // enter username 
  else if (screen==5) {
      background(0, 255, 0);
      mouseSparkle();
      userNameTextBox();
    
      text('16 let user = CyborgWitch;', 40, 50);
      text('17 input your CyborgWitch username', 40, 74);
      
      
      if (!softWind.isPlaying()){
          softWind.play();
          print('wind is blowing');
      }
  }
  // print username
  else if (screen==6) {
      background(0, 255, 0);
      mouseSparkle();
      userNameTextBox();

      
      text('16 let user = CyborgWitch;', 40, 50);
      text('17 input your CyborgWitch username', 40, 74);
      text('18 Welcome,', 40, 98);
      text(userName + ';', 205, 98);

      // username entered, sound effect plays and numbers appear
      if (keyEnter>=1 && userNameIn==true) {
          text(sideNumbers1, 40, 98);
          text('incantation setup(CyborgWitchTheatre) {\n\n\n\n\n\n\n}\n\nincantation draw(' + userName + ') {\n\n\n\n\n\n\n\n\n}', 80, 146)

          
//          if (!usernameSound.isPlaying() && usernameSoundCount==0) {
//              usernameSound.play();
//              usernameSoundCount = 1;
//          }
          if (!MagicSound.isPlaying() && MagicSoundCount==0) {
              MagicSound.play();
              MagicSoundCount = 1;
          }
          
          
      }
          
      if (!softWind.isPlaying()){
          softWind.play();
          print('wind is blowing');
      }

  }  
    
  // fake code SETUP, line 4
  else if (screen==7) {
      background(0, 255, 0);
      mouseSparkle();
      userNameTextBox();


                  
      text('16 let user = CyborgWitch;', 40, 50);
      text('17 input your CyborgWitch username', 40, 74);
      text('18 Welcome,', 40, 98);
      text(userName + ';', 205, 98);
      text(sideNumbers1, 40, 98);
      text('incantation setup(CyborgWitchTheatre) {\n\n\n\n\n\n\n}\n\nincantation draw(' + userName + ') {\n\n\n\n\n\n\n\n\n\n\n\n}', 80, 146);
      text(l4, 80, 194);
      
      if (!incantationSound2.isPlaying() && incantationSound2Count==0) {
          incantationSound2.play();
          //incantationSound2.volume(1);
          incantationSound2Count = 1; 
      }

  }
    
  // fake code DRAW, line 5
  else if (screen==8) {
      background(0, 255, 0);
      mouseSparkle();
      userNameTextBox();

      
      if (!incantationSound2.isPlaying() && incantationSound2Count==1) {
          incantationSound2.play();
          //incantationSound2.volume(1);
          incantationSound2Count = 2; 
      }

      text('16 let user = CyborgWitch;', 40, 50);
      text('17 input your CyborgWitch username', 40, 74);
      text('18 Welcome,', 40, 98);
      text(userName + ';', 205, 98);
      text(sideNumbers1, 40, 98);
      text('incantation setup(CyborgWitchTheatre) {\n\n\n\n\n\n\n}\n\nincantation draw(' + userName + ') {\n\n\n\n\n\n\n\n\n\n\n\n}', 80, 146);
      text(l4, 80, 194);
      text(l5, 80, 400);
      
      // fake code with USERNAME
      text('  ' + userName + '.pronouns();', 80, 506+codeOut);
      text('  ' + userName + '.body(engage);', 80, 530+codeOut);
      text('  ' + userName + '.voice(speak);', 80, 554+codeOut);
      text('  ' + userName + '.gesture(create);', 80, 578+codeOut);
      text('  ' + userName + '.enter(softly);', 80, 602+codeOut);

  }  
  else if (screen==9) {
      background(0, 255, 0);
      userNameTextBox();
      mouseSparkle();

      text('16 let user = CyborgWitch;', 40, 50+codeOut);
      text('17 input your CyborgWitch username', 40, 74+codeOut);
      text('18 Welcome,', 40, 98+codeOut);
      text(userName + ';', 205, 98+codeOut);
      text(sideNumbers1, 40, 98+codeOut);
      text('incantation setup(CyborgWitchTheatre) {\n\n\n\n\n\n\n}\n\nincantation draw(' + userName + ') {\n\n\n\n\n\n\n\n\n\n\n\n}', 80, 146+codeOut);
      text(l4, 80, 194+codeOut);
      text(l5, 80, 400+codeOut);
            
      // fake code with USERNAME
      text('  ' + userName + '.pronouns();', 80, 506+codeOut);
      text('  ' + userName + '.body(engage);', 80, 530+codeOut);
      text('  ' + userName + '.voice(speak);', 80, 554+codeOut);
      text('  ' + userName + '.gesture(create);', 80, 578+codeOut);
      text('  ' + userName + '.enter(softly);', 80, 602+codeOut);
      
      perspectiveGrid();
      //opacity = opacity + 1;
      
      if (codeOut > -750) {
          codeOut = codeOut -1;
          
          if (!portalSound.isPlaying() && portalSoundCount == 0) {
              portalSound.play();
              portalSoundCount = 1;
          }


          //print(codeOut);
      } else {
          codeOut = -751;
          
          push();
            //fill(255, 0, 0, opacity);
            stroke(255, 0, 0);
            textFont(droulers);
            textSize(141);
            textLeading(136);
            text('This way, \n'+ userName + '\n...stage_1', 50, 120);
          pop();
          
          if (!thisWaySound.isPlaying() && thisWaySoundCount==0) {
              thisWaySound.play();
              thisWaySoundCount = 1;
          }
          
      }
  }
      
  // new text, transition
  else if (screen==10) {
      background(0, 255, 75);
      mouseSparkle();
      //opacity = opacity + 1;
      perspectiveGrid();

      push();
      textSize(72);
      textLeading(150);
      text('invoking perspective(grid)', 50, 130);
      pop();
      
      push();
      textFont(droulersItalic);
      textSize(72);
      textLeading(68);
      text(userName + ',\nenter stage.Scene(1)', 50, 200);
      pop();
}
}


function mousePressed() {
    
  if (screen==1) {
      screen = screen + 1
        
      //start playing FIEND
      fiendIsPlaying = true;
      fiend.play();
      reverb.process(fiend, 10, 5);
 
  }
  
  else if (screen==2) {
     
    if (!fiend.isPlaying()) {
        fiendIsPlaying = false;
        console.log(fiendIsPlaying);
        
        //play THEATRE
        theatreIsPlaying = true;
        theatre.play();
        reverb.process(theatre, 10, 5); 
        
        screen = screen + 1;
    }

  }
  
  else if (screen==3) {
      
    if (!theatre.isPlaying()) {
        theatreIsPlaying = false;
        console.log(theatreIsPlaying);
              
        // play CODE FORTH
        codeForth.play();
        codeForthIsPlaying = true;
        reverb.process(codeForth, 10, 5);
        codeForthCount = 1;
        screen = screen + 1;
    }
  }
  
  else if (screen==4) {
      
    if (!codeForth.isPlaying()) {
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
    //screen = screen + 1;
    if (opacity > 255 && codeOut  == -751) {
        print('screen = 9, next link');
        window.location.replace("https://cyborgwitch.github.io/CyborgWitchTheatre/p5_cyborgWitch5%203/empty-example/");
    }
  }
  else if (screen==10) {
    screen = screen + 1;
  }

  else if (screen==11) {
    print('screen = 11, next link');
    window.location.replace("https://cyborgwitch.github.io/CyborgWitchTheatre/p5_cyborgWitch5%203/empty-example/");
      
    // start floating the code out of screen. 
//    if (codeOut < -1000) {
//        codeOut = -999
//        screen = screen +1;
//    }
  }
  else if (screen==12) {

  }

}

function userNameTextBox() {
        // screen == 5-9 AND userNameIn ==false
    if (userNameBox==false){
     //username text box  
      userInput = createInput('');
      userInput.position(520, 57);
      userInput.changed(newText);
      userNameBox = true;
    } else if (userNameBox==true && screen==9) {
      //userInput.remove();
      userInput.position(520, 57+codeOut);
      console.log(codeOut);

    }
     
//     } else if (screen==5 || screen==6 || screen==7 || screen==8 || screen==9 && userNameIn==true){
//       userInput.remove();
//     }
    
//        if (screen==5 || screen==6 || screen==7 || screen==8 && userNameBox==false){
//     //username text box  
//      userInput = createInput('');
//      userInput.position(520, 57+codeOut);
//      userInput.changed(newText);
//      userNameBox = true;
//
//     
//     } else if (screen==5 || screen==6 || screen==7 || screen==8 || screen==9 && userNameIn==true){
//       userInput.remove();
//     }
    
}
// for entering a new username
function newText() {
    userName = userInput.value();
    userNameIn = true;
    localStorage.setItem('userName', userName);
    
}

// to check whether the username has been entered
function keyPressed() {
    if (keyCode == ENTER) {
        userEnter = true;
        keyEnter++;
        print(userEnter);
        text(sideNumbers1, 50, 98);
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
            angle = i*gap
      
            x1 = rInside*cos(angle);
            y1 = rInside*sin(angle);
            x2 = rOutside*cos(angle);
            y2 = rOutside*sin(angle);
    
            line(x1, y1, x2, y2);
        }
  pop();
        
    }
    
}

function perspectiveGrid() {
    // isometric grid    
    opacity = opacity * 1.015;
    print(opacity);
    push();
        translate(width/2, height/2);
        stroke(255, 0, 0, opacity);
        strokeWeight(0.5);

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

    pop();
}
    
    
