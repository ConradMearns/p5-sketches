function Boid(x, y){
  totalSpawns++;
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);

  this.size = 8;
  this.energy = 5;

  this.module = undefined;

  this.update = function(friction){
    var f = this.vel.copy();
    f.mult(-1);
    f.normalize();
    f.mult(friction);
    this.acc.add(f);

    this.vel.add(this.acc);
    // this.vel.limit(20);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if(this.module == undefined){
      this.applyForce(p5.Vector.random2D());
    }else{
      this.module.pos = this.pos;
      this.module.moduleCode(this);
    }
  }

  this.applyForce = function(force){
    this.energy -= force.mag()/500;
    if(this.energy <= 0){
      this.energy = 0;
      console.log("DEATH");
      if(this.module != undefined){
        this.module.success = true;
      }
    }else{
      this.acc.add(force);
    }
  }

  this.show = function(){
    stroke(255);
    strokeWeight(this.size);
    point(this.pos.x, this.pos.y);
    if(this.module != undefined){
      this.module.show();
    }
  }

  this.edges = function(){
    if(this.pos.x > width){
      var force = createVector(-10, 0);
      this.applyForce(force);
    }
    if(this.pos.x < 0) {
      var force = createVector(10, 0);
      this.applyForce(force);
    }
    if(this.pos.y > height){
      var force = createVector(0, -10);
      this.applyForce(force);
    }
    if(this.pos.y < 0){
      var force = createVector(0, 10);
      this.applyForce(force);
    }
  }
}
