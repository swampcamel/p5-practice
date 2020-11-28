let systems

function setup() {
  createCanvas(windowWidth, windowHeight)
  systems = []
}

function draw() {
  background(0)
  for (i = 0; i < systems.length; i++) {
    if (Math.random()*10 <=5) {
      systems[i].addCircle()
    }
    systems[i].run()
  }
  if (systems.length == 0) {
    textAlign(CENTER)
    textSize(42)
    fill(255)
    text("CLICK", width / 2, height / 2)
  }
}

function mousePressed() {
  this.c = new CircleGenerator(createVector(mouseX, mouseY))
  systems.push(c)
  if (systems.length >= 5) {
    systems.shift()
  }
}

let XCircle = function(position) {
  this.position = position.copy()
  this.radius = 1
  this.lifespan = 255
  this.red = position.x / (width / 252)
  this.green = 0
  this.blue = position.y / (height / 253)
}

XCircle.prototype.run = function() {
  this.update()
  this.display()
}

XCircle.prototype.update = function() {
  this.lifespan -= 1.5
  this.radius = this.radius + 10
  this.red += 1
  this.green = Math.random()*128
  this.blue += 1
}

XCircle.prototype.display = function() {
  stroke(this.red, this.green, this.blue, this.lifespan)
  strokeWeight(4)
  noFill()
  circle(this.position.x, this.position.y, this.radius)
}

XCircle.prototype.isDead = function() {
  return this.lifespan < 0
}

let CircleGenerator = function(position) {
  this.origin = position.copy()
  this.circles = []
}

CircleGenerator.prototype.addCircle = function() {
  this.circles.push(new XCircle(this.origin))
}

CircleGenerator.prototype.run = function() {
  for (let i = this.circles.length-1; i >= 0; i--) {
    let c = this.circles[i]
    c.run()
    if (c.isDead() || c.radius > windowWidth) {
      this.circles.splice(i, 1)
    }
  }
}
