let r;
let factor = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
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

    const colorFrom = color(0, 100, 100);
    const colorTo = color(240, 100, 100);
    const colorAmount = i / total;
    const pointColor = lerpColor(colorFrom, colorTo, colorAmount);
    stroke(pointColor);

    // Constrain the x and y coordinates of the Bezier curve points to the bounds of the circle
    const x1 = constrain(a.x, -r, r);
    const y1 = constrain(a.y, -r, r);
    const x2 = constrain(a.x, -r, r);
    const y2 = constrain(-a.y, -r, r);
    const x3 = constrain(-b.x, -r, r);
    const y3 = constrain(b.y + b.y, -r, r);
    const x4 = constrain(-b.x, -r, r);
    const y4 = constrain(-b.y, -r, r);

    bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  }
}
