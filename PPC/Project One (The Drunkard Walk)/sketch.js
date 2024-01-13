let x;
let y;

function setup() {
  createCanvas(500, 500);
  background(220);
  x = width / 2;
  y = height / 2;
}

function draw() {
  stroke(0);
  strokeWeight(1);
  point(x, y);

  let choice = floor(random(4));

  if (choice === 0) {
    x++;
  } else if (choice === 1) {
    x--;
  } else if (choice === 2) {
    y++;
  } else if (choice === 3) {
    y--;
  }

  x = constrain(x, 0, width - 1);
  y = constrain(y, 0, height - 1);
}
