var width, height;
var screen;

var screenNo = 1;

let capture;


function windowResized() {
    setDimensions();
    resizeCanvas(width, height);
}
function setDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
}

function setup() {

    setDimensions();
    createCanvas(width, height, WEBGL);
    //ortho(-width/2, width/2,-height/2, height/2);
    ortho(-width/2, width/2, -height/2, height/2, width*2, -height);

    background(0, 255, 0);
    
    capture = createCapture(VIDEO);
    capture.hide();
    
    imageMode(CENTER);

}

function draw() {
  // put drawing code here
        background(0, 255, 0);
        //translate(width/2, height/2);
        print(screenNo);

    if (screenNo == 1) {
        
    } else if (screenNo == 2) {
        image(capture, 0, 0, 550, 300);
    }

}

function mousePressed() {
    if (screenNo == 1) {
        screenNo = screenNo + 1;
    } else if (screenNo == 2) {

    }
}