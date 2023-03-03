let r;
let factor = 0;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  r = height / 2 - 16;

  // Create a grid of particles within the circle shape
  for (let x = -r; x <= r; x += 4) {
    for (let y = -r; y <= r; y += 4) {
      if (dist(x, y, 0, 0) < r) {
        particles.push(new Particle(x, y));
      }
    }
  }
}

function getVector(index, total) {
  const angle = map(index % total, 0, total, 0, TWO_PI);
  const v = p5.Vector.fromAngle(angle + PI);
  v.mult(r);
  return v;
}

function draw() {
  background(0);
  const total = 20;
  factor += 0.015;

  translate(width / 2, height / 2);

  // Draw the sand particles
  particles.forEach(particle => {
    particle.draw();
  });

  for (let i = 0; i < total; i++) {
    const a = getVector(i, total);
    const b = getVector(i * factor, total);

    const colorFrom = color(0, 100, 100);
    const colorTo = color(240, 100, 100);
    const colorAmount = i / total;
    const pointColor = lerpColor(colorFrom, colorTo, colorAmount);
    stroke(pointColor);

    // Draw a Bezier curve between the sand particles
    particles.forEach(particle => {
      const d1 = dist(particle.pos.x, particle.pos.y, a.x, a.y);
      const d2 = dist(particle.pos.x, particle.pos.y, -b.x, b.y + b.y);
      if (d1 < r && d2 < r) {
        particle.applyForce(createVector(-particle.pos.x, -particle.pos.y).normalize().mult(0.05));
      }
    });
  }
  
  // Update and apply forces to the sand particles
  particles.forEach(particle => {
    particle.update();
    particle.applyForce(createVector(0, 0.05));
  });
}

// Particle class
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  draw() {
    strokeWeight(1);
    point(this.pos.x, this.pos.y);
  }
}
