
var BULLETS = {
	velocity : 10,
	friction : .70,
	color : '#FFFFFF',
	width : 6,
	height : 3
}

var Projectile = function() {
	this.p, this.v, this.angle;
	this.steps = [];
	this.step = function() {
		for(var i=0;i<this.steps.length;i++)
			this.steps[i].call(this);
	}
	this.draws = [];
	this.draw = function(g) {
		for(var i=0;i<this.draws.length;i++)
			this.draws[i].call(this,g);
	}
}

var Bullet = Projectile.extend(function() {
	this.init = function(position, angle, velocity) {
		this.p = position.clone();
		this.v = new Vector().addA(angle, velocity);
		this.angle = angle;
		return this;
	}
	this.steps.push(function() {
		this.p.add(this.v);
	});
	this.draws.push(function(g) {
		g.translate(this.p.x,this.p.y);
			g.rotate(this.angle);
				g.fillStyle = g.strokeStyle = "rgb(255,255,255)";
				g.fillRect(0,0,BULLETS.width,BULLETS.height);
				g.strokeRect(0,0,BULLETS.width,BULLETS.height);
			g.rotate(-this.angle);
		g.translate(-this.p.x,-this.p.y);
	});
});





