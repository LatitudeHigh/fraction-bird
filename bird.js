                                                    
                                                      
function Bird() {
  this.y = height/2;
  this.x = 64;

  this.gravity = 0.5;
  this.lift = -12;
  this.velocity = 0;

  //creates the bird
  this.show = function() {
    fill(0, 190, 200);
    ellipse(this.x, this.y, 32, 32);
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.teleport = function(fraction) {
    // will teleport bird to the canvas's height - the fraction from parameter
    this.y = height - fraction * height;
    this.velocity = -5;
  }

  this.update = function() {
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }

}
