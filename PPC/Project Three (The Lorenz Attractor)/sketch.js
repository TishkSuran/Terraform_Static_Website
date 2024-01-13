let x = 0.01;
let y = 0;
let z = 0;

const sigma = 10;
const rho = 28;
const beta = 8.0 / 3.0;

let pVector = [];

function setup() {
  createCanvas(windowWidth, 600, WEBGL);
  background(0);
  camera(0, 0, 150);
}

function draw() {
  const dt = 0.01;

  const dx = (sigma * (y - x)) * dt;
  const dy = (x * (rho - z) - y) * dt;
  const dz = (x * y - beta * z) * dt;

  x += dx;
  y += dy;
  z += dz;

  pVector.push(createVector(x, y, z));

  background(0);

  rotateX(frameCount * 0.005);
  rotateY(frameCount * 0.005);

  beginShape();
  noFill();
  strokeWeight(1);

  for (let i = 0; i < pVector.length; i++) {
    //const gradient = i / pVector.length;
    //const grayValue = 255 - 250 * gradient; 

    //stroke(greyValue);

    stroke(255)

    const v = pVector[i];
    vertex(v.x, v.y, v.z);
  }

  endShape();
}
