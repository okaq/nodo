// arcs - one big for bkgd
// grid 20x20 square, screen fill
function setup() {
  createCanvas(400, 400);
  noLoop();
  noStroke();
}

function draw() {
  background(220);
  c0 = random(255);
  fill(c0);
  arc(200,200,400,400,0,TWO_PI);
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
      x0 = x*20 + 10;
      y0 = y*20 + 10;
      c1 = random(255);
      fill(c1);
      arc(x0,y0,20,20,0,TWO_PI);
    }
  }
}


