class Knob {
    constructor(x, y, radius, minValue, maxValue, defaultValue, label) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.minValue = minValue;
      this.maxValue = maxValue;
      this.value = defaultValue;
      this.label = label;
  
      // Angular constraints for knob (start and end angles in radians)
      this.startAngle = radians(135); // Limit to 135 degrees (bottom-left)
      this.endAngle = radians(405); // Limit to 405 degrees (bottom-right)
  
      // Map the default value to the constrained angle range
      this.angle = map(defaultValue, minValue, maxValue, this.startAngle, this.endAngle);
      this.dragging = false;
    }
  
    update() {
      this.display();
      this.handleMouse();
    }
  
    display() {
      // Draw the knob
      push();
      translate(this.x, this.y);
      noFill();
      stroke(0);
      strokeWeight(2);
      ellipse(0, 0, this.radius * 2, this.radius * 2);
  
      // Draw the handle within the limited angle range
      let handleX = this.radius * cos(this.angle);
      let handleY = this.radius * sin(this.angle);
      line(0, 0, handleX, handleY);
  
      // Display label and value
      noStroke();
      fill(0);
      textAlign(CENTER, CENTER);
      text(this.label, 0, this.radius + 20);
      text(this.value.toFixed(2), 0, this.radius + 40);
      pop();
    }
  
    handleMouse() {
      let distance = dist(mouseX, mouseY, this.x, this.y);
      if (mouseIsPressed && distance < this.radius) {
        this.dragging = true;
      } else if (!mouseIsPressed) {
        this.dragging = false;
      }
  
      if (this.dragging) {
        let angle = atan2(mouseY - this.y, mouseX - this.x);
        // Constrain the angle between start and end angles
        this.angle = constrain(angle, this.startAngle, this.endAngle);
  
        // Map the constrained angle back to the value range
        this.value = map(this.angle, this.startAngle, this.endAngle, this.minValue, this.maxValue);
      }
    }
  }
  