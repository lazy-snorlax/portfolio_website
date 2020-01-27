const particles = [];

// Set Canvas to parent element and sizes to parent width and height
function setup() {
  var width = document.getElementById('header-home').clientWidth;
  var height = document.getElementById('header-home').clientHeight;

  var canvas = createCanvas(width, height);
  canvas.parent('header-home');
  background(51, 51, 51);
  // background(255, 187, 0);

  const particlesLength = Math.floor(window.innerWidth / 10);

  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(51, 51, 51);
  // background(255, 187, 0);
  particles.forEach((p, index) => {
    p.update();
    p.draw();
    p.checkParticles(particles.slice(index));
  });
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.size = 5;
  }

  // Update movement by adding velocity
  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  // Draw single particle
  draw() {
    noStroke();
    fill('rgba(255, 187, 0, 1.0)');
    // fill('rgba(51, 51, 51, 1.0)');
    circle(this.pos.x, this.pos.y, this.size);
  }

  // Detect edges
  edges() {
    if (this.pos.x < 1 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 1 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  // Connect particles
  checkParticles(particles) {
    particles.forEach(particle => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

      if (d < 120) {
        stroke('rgba(255,187,0, 0.1)');
        // stroke('rgba(51, 51, 51, 0.1)');
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}
