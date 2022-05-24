var bird;
var pipes = [];
let button;
let button2;
let button3;
let retryscreen = false;
let homescreen = true;
const NEW_PIPE_DELAY = 150;


function drawHome(){
  createCanvas(windowWidth, windowHeight);
  image(home, 0, 0);
  home.resize(windowWidth, windowHeight);
  hideButtons();
  textSize(32);
  textAlign(CENTER);
  fill('rgb(0,500,0)')
  textFont('Georgia');
  text('press space to start', windowWidth / 2, 200)
}


  
function setup() {
  createCanvas(windowWidth, windowHeight);
  fractions();
  bird = new Bird();
  pipes.push(new  Pipe()); 
}



// create three different functions, one for each fourth

function jumpOneQuarter() {
  bird.teleport(3/8);
}

function jumpTwoQuarters() {
  bird.teleport(5/8);
}

function jumpThreeQuarters() {
  bird.teleport(7/8); 
}

// Adds buttons to the screen
function fractions(){
  textSize(30);
  text('press 1', 0, 85);
  button = createButton('press 1 for 1/4');
  // puts the first button at the left center
  button.position(width / 4 - 25, height - 50);
  button.mouseClicked(jumpOneQuarter);

  button2 = createButton('press 2 for 2/4');
  // puts the second button at the center of the screen
  button2.position(2*width / 4 - 25, height - 50);
  button2.mouseClicked(jumpTwoQuarters);

  button3 = createButton('press 3 for 3/4');
  // puts the third button at the right center of the screen
  button3.position(3*width / 4 - 25,height - 50);
  button3.mouseClicked(jumpThreeQuarters);
}

let img;
let home;
function preload(){
  img = loadImage('assets/gameover-0001.jpg');
  home = loadImage('assets/home.jpg'); 
  //homescreen = loadImage('');
}

function showButtons(){
  button.show();
  button2.show();
  button3.show();
}

function hideButtons(){
  button.hide();
  button2.hide();
  button3.hide();
}


// retry screen
function retry(){
  createCanvas(windowWidth, windowHeight);
  image(img, 0, 0);
  img.resize(windowWidth, windowHeight);
  hideButtons();
  
}

function keyPressed() {
      // if (key == ' ') {
      //   bird.up();
      // } 
    //console.log("SPACE");
      
      if(key == "1") {
        jumpOneQuarter();
      }
      if(key == "2") {
        jumpTwoQuarters();
      }
      if(key == "3") {
        jumpThreeQuarters();
      }
}

function resetGame() {
  pipes = [];
  bird = new Bird();
}

function keyReleased(){
  if (key == ' ') {
    if (homescreen){
      homescreen = false;
    } else if(retryscreen) {
      resetGame();
      retryscreen = false;
    }
  }
}

function over(){
  retryscreen = true;
}


// runs in an infinite loop
function draw() {
  if (homescreen){
    drawHome();
  } else if(retryscreen) {
    retry();
  } else {
    
    background(0);
    showButtons(); 

  // for every pipe
    for (var i = pipes.length-1; i >= 0; i--) {
    // draw the pipe on the screen
      pipes[i].show();
    // update the pipes position
      pipes[i].update();

    // check if we hit the pipe
      if (pipes[i].hits(bird)) {
        console.log("HIT");
        
      // stops the game when we hit a pipe
        retryscreen = true;
        over();
        
      }


    // get rid of the pipe if the pipe is offscreen
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

  

  // updating the bird's position and drawing it
    bird.update();
    bird.show();

  // every 85th frame, add a pipe
      if (frameCount % NEW_PIPE_DELAY == 0) {
        pipes.push(new Pipe());
      }
    
//bird jumps if space is pressed
    
  
  }
    
   
}