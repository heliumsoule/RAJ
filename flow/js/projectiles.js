
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
	this.draw = function() {
		for(var i=0;i<this.draws.length;i++)
			this.draws[i].call(this);
	}
}

var Bullet = Projectile.extend(function() {
	this.init = function(position, angle) {
		this.p = new Vector(position.x + TANKS.NORMAL.size / 2 * Math.sin(angle),position.y + TANKS.NORMAL.size / 2 * Math.cos(angle));
		this.v = new Vector(BULLETS.speed * Math.cos(angle),BULLETS.speed * BULLETS.speed * Math.sin(angle));
		this.angle = angle;
	}
	this.steps.push(function() {
		this.p.add(this.v);
	});
	this.draws.push(function(g) {
		g.fillStyle = g.strokeStyle = BULLETS.color;
		g.fillRect(this.p.x,this.p.y,BULLETS.width,BULLETS.height);
		g.strokeRect(this.p.x,this.p.y,BULLETS.width,BULLETS.height);
	});
});





