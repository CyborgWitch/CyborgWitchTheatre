var screen = 1;
var numberOfPages = 11;

// fake code text — poem
var l1 = ' 1 //Fiends, mysteries, wretched ones,\n 2 //Enter, this Cyborg Witch Theatre.\n 3 //Parse the thresholds in-between\n 4 //Flesh and screen, input and output';
var l2 = ' 5 //\n 6 //Code walls, witch speak\n 7 //Setup and draw our bodies\n 8 //Into a cyborg witch becoming.\n 9 //Into the wilds of the web.';
var l3 = '10 //\n11 //We call forth this stage.\n12 //Where possibilities multiply\n13 //Becoming becomes viral.\n14 //Gender x race x sexuality\n15';
// fake code text — setup 
var l4 = '\n19\n20 incantation setup(CyborgWitchTheatre) {\n21\n22   dimensions.multiply();\n23   intersection(Cyborg*Witch);\n24   intersection(ofTheBody);\n25   intersection.declare(queerChineseAustralianWoman);\n26\n27 }';
var l5 = '28\n29 incantation draw(intersections) {\n30\n31   perspective(gridPlane);\n32   stage.set(2);\n33   stage.scenes(2);\n34\n\n\n\n\n\n40\n41 }\n';

// mouseSparkle, drawing sparkles when mouse is pressed
let totalPoints = 7;
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
let reverb;

// USERNAME
var userInput;
var userName = '';
var userEnter = false;
// checking if username has been entered
var keyEnter = 0;

// incantation enact — draw grid in, float code out. 
var grid = false;
var codeOut = -1;
var opacity = 0;

function preload() {
    droulers = loadFont('assets/Droulers-Regular.otf');
    droulersItalic = loadFont('assets/Droulers-Italic.otf');

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
    background(0, 255, 75);
    
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
      background(0, 255, 75);
      mouseSparkle();

      push();
      textSize(163);
      textLeading(150);
      text('Cyborg Witch\nTheatre', 50, 130);
      pop(); 
      
      push();
      stroke(255, 0, 0);
      line(0, height/6+10, width, height/6+10);
      line(0, height/3+10, width, height/3+10);
      pop();
//      
  }
    
  // first stanza of poem, fiends. 
  else if (screen==2) {
      background(0, 255, 75);
      mouseSparkle();

      //TEXT
      push();
      textSize(163);
      textLeading(150);
      text('Cyborg Witch\nTheatre', 50, 130);
      pop(); 
      
      text(l1, 50, 552);

      push();
      stroke(255, 0, 0);
      line(0, height/6+10, width, height/6+10);
      line(0, height/3+10, width, height/3+10);
      pop();
  }
  
  // second stanza of poem, 'theatre'
  else if (screen==3) {
      background(0, 255, 75);
      mouseSparkle();
      
      //TEXT
      push();
      textSize(163);
      textLeading(150);
      text('Cyborg Witch\nTheatre', 50, 130);
      pop(); 
      
      text(l1, 50, 552);
      text(l2, 50, 648);
      
      push();
      stroke(255, 0, 0);
      line(0, height/6+10, width, height/6+10);
      line(0, height/3+10, width, height/3+10);
      pop();

    
  }
  
  // third stanza of poem, call/code forth. 
  else if (screen==4) {
      background(0, 255, 75);
      mouseSparkle();

      
      //TEXT
      push();
      textSize(163);
      textLeading(150);
      text('Cyborg Witch\nTheatre', 50, 130);
      pop(); 
      
      text(l1, 50, 552);
      text(l2, 50, 648);
      text(l3, 50, 768);
      
      push();
      stroke(255, 0, 0);
      line(0, height/6+10, width, height/6+10);
      line(0, height/3+10, width, height/3+10);
      pop();

  }

  // enter username 
  else if (screen==5) {
      background(0, 255, 75);
      mouseSparkle();

            
      text('16 let user = CyborgWitch;', 50, 50);
      text('17 input your CyborgWitch username', 50, 74);
      
      //username text box  
      userInput = createInput();
      userInput.position(520, 57+codeOut);
      userInput.changed(newText);

  }
  // print username
  else if (screen==6) {
      background(0, 255, 75);
      mouseSparkle();

      userInput.changed(newText);

      
      text('16 let user = CyborgWitch;', 50, 50);
      text('17 input your CyborgWitch username', 50, 74);
      text('18 Welcome,', 50, 98);
      text(userName + ';', 205, 98);

  }  
    
  // fake code SETUP, line 4
  else if (screen==7) {
      background(0, 255, 75);
      mouseSparkle();

      userInput.changed(newText);

                  
      text('16 let user = CyborgWitch;', 50, 50);
      text('17 input your CyborgWitch username', 50, 74);
      text('18 Welcome,', 50, 98);
      text(userName + ';', 205, 98);
      text(l4, 50, 98);
      
  }
    
  // fake code DRAW, line 5
  else if (screen==8) {
      background(0, 255, 75);
      mouseSparkle();

      userInput.changed(newText);

      text('16 let user = CyborgWitch;', 50, 50);
      text('17 input your CyborgWitch username', 50, 74);
      text('18 Welcome,', 50, 98);
      text(userName + ';', 205, 98);
      text(l4, 50, 98);
      text(l5, 50, 338);
      
      // fake code with USERNAME
      text('35   ' + userName + '.pronouns();', 50, 506);
      text('36   ' + userName + '.body(engage);', 50, 530);
      text('37   ' + userName + '.voice(speak);', 50, 554);
      text('38   ' + userName + '.gesture(create);', 50, 578);
      text('39   ' + userName + '.enter(softly);', 50, 602);
      
  }  
  else if (screen==9) {
      background(0, 255, 75);
      userInput.changed(newText);
      userInput.position(520, 57+codeOut);


      text('16 let user = CyborgWitch;', 50, 50+codeOut);
      text('17 input your CyborgWitch username', 50, 74+codeOut);
      text('18 Welcome,', 50, 98+codeOut);
      text(userName + ';', 205, 98+codeOut);
      text(l4, 50, 98+codeOut);
      text(l5, 50, 338+codeOut);
            
      // fake code with USERNAME
      text('35   ' + userName + '.pronouns();', 50, 506+codeOut);
      text('36   ' + userName + '.body(engage);', 50, 530+codeOut);
      text('37   ' + userName + '.voice(speak);', 50, 554+codeOut);
      text('38   ' + userName + '.gesture(create);', 50, 578+codeOut);
      text('39   ' + userName + '.enter(softly);', 50, 602+codeOut);
      
      if (codeOut > -1000) {
          codeOut = codeOut * 1.03;
          mouseSparkle();

          print(codeOut);
      } else {
          codeOut = -1001;
          perspectiveGrid();
          userInput.remove();
          
          push();
            //fill(255, 0, 0, opacity);
            stroke(255, 0, 0);
            textFont(droulers);
            textSize(141);
            textLeading(136);
            text('This way, \n'+ userName + '... \nStage 1', 50, 120);
          pop();
          
          for (let i = 0; i < 60; i++) {
               push();
               translate(775, 346);
               stroke(255, 0, 0);
               strokeWeight(4);
              
               angle = angle + i*gap;
               x3 = rInside2*cos(angle);
               y3 = rInside2*sin(angle);
               x4 = rOutside2*cos(angle);
               y4 = rOutside2*sin(angle);
               line(x3, y3, x4, y4);
               pop();
        }
      
//          push();
//            //fill(255, 0, 0, opacity);
//            textFont(droulers);
//            textSize(24);
//            textLeading(68);
//            //text('invoking perspective(gridPlane)', 50, 226);
//          pop();
      }
  }
      
  // new text, transition
  else if (screen==10) {
      background(0, 255, 75);
      mouseSparkle();
      perspectiveGrid();
      
      userInput.remove();
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

// for entering a new username
function newText() {
    //userInput.changed(newText+codeOut);
    userName = userInput.value();
    localStorage.setItem('userName', userName);
    //console.log(localStorage.getItem('userName'));
    //userInput.remove();
    //userInput.position(520, 57+codeOut);
    
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
    if (opacity > 255) {
        print('screen = 11, next link');
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

// to check whether the username has been entered
function keyPressed() {
    if (keyCode == ENTER) {
        userEnter = true;
        keyEnter++;
        print(userEnter);
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
    opacity = opacity + 1;
    print(opacity);
    push();
        translate(width/2, height/2);
        stroke(255, 0, 0, opacity);
        strokeWeight(0.5);

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
}
    
    