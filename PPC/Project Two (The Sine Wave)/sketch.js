let xspacing = 16; 
let w; 
let theta = 0.0; 
let amplitude = 75.0; 
let period = 500.0; 
let dx;  
let yvalues; 

function setup() {
  strokeWeight(1)
  createCanvas(windowWidth, 500);
  w = width + 16;
  dx = (TWO_PI / period) * xspacing
  yvalues = new Array(floor(w / xspacing))
}

 

function draw() {
  background(255); 
  calcWave()
  renderWave();
}


function calcWave(){
  theta += 0.02

  let x = theta;
  for(let i = 0; i < yvalues.length; i++){
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function calcWave2(){
  theta += 0.01

  let x = theta + 90;
  for(let i = 0; i < yvalues.length; i++){
    yvalues[i] = sin(x) * amplitude;
    x += dx;
  }
}

function renderWave(){
  noStroke()
  fill(0,0,0,60)
  for(let x = 0; x < yvalues.length; x++){
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16)
  }
}

function renderWave2(){
  noStroke()
  fill(0)
  for(let x = 0; x < yvalues.length; x++){
    ellipse(x * xspacing, height / 2 + yvalues[x], 16, 16)
  }
}
