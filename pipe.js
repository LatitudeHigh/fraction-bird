  function Pipe() {
  
  // pick a denominator for our fraction
  this.denominator = 4;
  this.numerator = ceil(random(1, this.denominator));
  this.spacing = height / this.denominator;

  // calculate the y-coordinate of the bottom of the top rectangle.
  this.top = height * (1 - (this.numerator / this.denominator));
  this.bottom = this.top + this.spacing;
  this.x = width;
  this.w = 80;
  this.speed = 6;

  this.highlight = false;

  this.hits = function(bird) {
    // if the bird's y is above the top, or the birds position is bellow the bottom - the height of the screen
    if (!(bird.y > this.top && bird.y < this.bottom)) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  // draws the pipe on the screen
  this.show = function() {
    // sets the color to white
    fill(255);
    // adds an outline
    strokeWeight(4);
    stroke(51);
    
    if (this.highlight) {
      fill(255, 0, 0);
    }
    
    var yCoordinate = 0;
    // from denominator/denomintor -> 1/denominator
    for(var i = this.denominator; i > 0; i--) {
      if(i != this.numerator) {
        rect(this.x, yCoordinate, this.w, this.spacing);
      }
      yCoordinate += this.spacing;
    } 
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }


}