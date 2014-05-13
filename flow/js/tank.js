
var TANKS = {
	NORMAL : {
		hp : 100,
		friction : 0.85,
		speed : 10
	},
	TURNSPEED : 5 * Math.PI / 180
}

var BULLETS = {
	speed : 20
	friction : .70
	color : #CCFFFF
	width : 6
	height : 3
}

var arrBullets = [];

var Bullets = function(position,angle) {
	this.p = new Vector(position.x,position.y);
	this.v = new Vector(BULLETS.speed * Math.cos(angle),BULLETS.speed * BULLETS.speed * Math.sin(angle));
	this.angle = angle;
	this.draw = function(g) {
		g.fillStyle = BULLETS.color;
		g.strokeStyle = BULLETS.color;
		g.fillRect(this.p.x,this.p.y,BULLETS.width,BULLETS.height);
		g.strokeRect(this.p.x,this.p.y,BULLETS.width,BULLETS.height);
	}
}

var Tank = function() {
	this.p = new Vector();
	this.v = new Vector();
	this.angle = 0;
	this.MAXHP, this.FRICTION, this.SPEED;
	this.keyb;
	this.init = function(keyBinding) {
		this.keyb = {};
		for(i in keyBinding) {
			for(var j=0;j<keys.length;j++)
				if (keys[j] == keyBinding[i])
					this.keyb[i] = j;
		}
	}
	this.setup = function(startPos, angle) {
		this.hp = this.MAXHP;
		this.p = startPos;
		this.angle = angle;
	}
	this.steps = [function() {
		if (keyv[this.keyb.left]) this.angle -= TANKS.TURNSPEED;
		if (keyv[this.keyb.right]) this.angle += TANKS.TURNSPEED;
		if (keyv[this.keyb.up] || keyv[this.keyb.down])  {
			var d = (keyv[this.keyb.up]?1:-1)*this.SPEED * 0.07;
			this.v.addA(this.angle, d);
		}
		{
			this.v.scale(this.FRICTION);
			this.p.add(this.v);
			var r = calculate(this.p, 30, 30, this.v);
			this.p.setC(r.x, r.y);
			this.v.setC(r.vx, r.vy);
		}
	}];
	this.step = function() {
		for(var i=0;i<this.steps.length;i++)
			this.steps[i].call(this);
	}
	this.fire = function() {
		if(keyv[this.keyb.shoot]) arrBullets.push(new Bullets(this.p,this.angle));
	}
	this.draw = function(g) {
		g.translate(this.p.x+15, this.p.y+15);
			g.rotate(this.angle);
				g.fillStyle = "rgb(50,50,50)";
				g.strokeStyle = "rgb(255,255,255)";
				g.fillRect(-15,-15,30,30);
				g.strokeRect(-15,-15,30,30);
			g.rotate(-this.angle);
		g.translate(-this.p.x-15, -this.p.y-15);
	}
}


var NormalTank = Tank.extend(function() {
	this.MAXHP = TANKS.NORMAL.hp;
	this.FRICTION = TANKS.NORMAL.friction;
	this.SPEED = TANKS.NORMAL.speed;
	this.steps.push(function() {
		
	});
});



