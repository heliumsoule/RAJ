
var TANKS = {
	NORMAL : {
		hp : 100,
		friction : 0.92
	},
	TURNSPEED : 3 * Math.PI / 180
}

var Tank = function() {
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.angle = 0;
	this.MAXHP, this.FRICTION;
	this.keyb;
	this.init = function(keyBinding) {
		this.keyb = {};
		for(i in keyBinding) {
			for(var j=0;j<keys.length;j++)
				if (keys[j] == keyBinding[i])
					this.keyb[i] = j;
		}
	}
	this.setup = function(x, y) {
		this.hp = this.MAXHP;
		this.x = x;
		this.y = y;
	}
	this.steps = [function() {
		if (keyv[this.keyb.left]) this.angle -= TANKS.TURNSPEED;
		if (keyv[this.keyb.right]) this.angle += TANKS.TURNSPEED;
		{
			this.x += this.vx;
			this.y += this.vy;
			this.vx *= this.FRICTION;
			this.vy *= this.FRICTION;
		}
	}];
	this.step = function() {
		for(var i=0;i<this.steps.length;i++)
			this.steps[i].call(this);
	}
	this.draw = function(g) {
		g.translate(this.x+15, this.y+15);
			g.rotate(this.angle);
				g.fillStyle = "rgb(50,50,50)";
				g.strokeStyle = "rgb(255,255,255)";
				g.fillRect(-15,-15,30,30);
				g.strokeRect(-15,-15,30,30);
			g.rotate(-this.angle);
		g.translate(-this.x-15, -this.y-15);
	}
}


var NormalTank = Tank.extend(function() {
	this.MAXHP = TANKS.NORMAL.hp;
	this.FRICTION = TANKS.NORMAL.friction;
	this.steps.push(function() {
		
	});
});



