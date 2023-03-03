let r;
let factor = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1); // Set color mode to HSB
  r = height / 2 - 16;
}

function getVector(index, total) {
  const angle = map(index % total, 0, total, 0, TWO_PI);
  const v = p5.Vector.fromAngle(angle + PI);
  v.mult(r);
  return v;
}

function draw() {
  background(0);
  const total = 200;
  factor += 0.015;
  
  translate(width / 2, height / 2);
  strokeWeight(1);
  noFill();
  ellipse(0, 0, r * 2);

  for (let i = 0; i < total; i++) {
    const a = getVector(i, total);
    const b = getVector(i * factor, total);

    // Generate a new color for each point using the lerpColor function
    const colorFrom = color(0, 100, 100); // Start color in HSB format (red)
    const colorTo = color(240, 100, 100); // End color in HSB format (blue)
    const colorAmount = i / total; // Progress through the total number of points
    const pointColor = lerpColor(colorFrom, colorTo, colorAmount); // Generate a new color

    stroke(pointColor); // Set the stroke color to the generated color
    bezier(a.x, a.y, a.x, -a.y, -b.x, b.y+b.y, -b.x, -b.y); // Draw a Bezier curve between the points
  }
}
