

var Tank = function() {
	this.p = new Vector(), this.cp;
	this.v = new Vector();
	this.angle = 0;
	this.s = new Dimension(TANKS.NORMAL.size,TANKS.NORMAL.size);
	this.MAXHP, this.FRICTION, this.SPEED, this.TURNSPEED;
	this.keyb;
	this.bulletTimer = 0;
	this.init = function(keyBinding) {
		this.keyb = {};
		for(var i in keyBinding) {
			for(var j=0;j<keys.length;j++)
				if (keys[j] == keyBinding[i])
					this.keyb[i] = j;
		}
		this.FRICTION = TANKS.NORMAL.friction;
		this.SPEED = TANKS.NORMAL.speed;
	}
	this.setup = function(startPos, angle) {
		this.hp = this.MAXHP;
		this.p = startPos;
		this.angle = angle;
		return this;
	}
	this.steps = [];
	this.steps.push(function() {
		if (keyv[this.keyb.left]) this.angle -= TANKS.TURNSPEED;
		if (keyv[this.keyb.right]) this.angle += TANKS.TURNSPEED;
		if (keyv[this.keyb.up] || keyv[this.keyb.down])  {
			var d = (keyv[this.keyb.up]?1:-1)*this.SPEED * 0.07;
			this.v.addA(this.angle, d);
		}
		{
			this.v.scale(this.FRICTION);
			this.p.add(this.v);
			var r = calculate(this.p, this.s, this.v);
			this.p.set(r.p);
			this.v.set(r.v);
		}
		this.cp = this.p.plus(this.s.times(0.5));
	});
	this.step = function() {
		for(var i=0;i<this.steps.length;i++)
			this.steps[i].call(this);
	}
	this.fire = function() {
		if(keyv[this.keyb.shoot]) {
			if (this.bulletTimer-- <= 0 && (this.bulletTimer = 3)) {
				var newb = new Bullet();
				newb.init(this.p.clone().addC(16,16).addA(this.angle,15));
				newb.v = (new Vector()).addA(this.angle, BULLETS.velocity);
				arrBullets.push(newb);
			}
		}
	}
	this.draw = function(g) {
		g.save();
		g.translate(this.cp.x, this.cp.y);
			g.rotate(this.angle);
				g.scale(this.s.x/32,this.s.y/32);
					g.fillStyle = TANKS.NORMAL.color['body'];
					g.strokeStyle = TANKS.NORMAL.color['body'];
					g.fillRect(-12,-12,24,24);
					g.strokeRect(-12,-12,24,24);
					g.fillStyle = TANKS.NORMAL.color['wheels'];
					g.strokeStyle = TANKS.NORMAL.color['wheels'];
					g.fillRect(-16,-18,32,8);
					g.fillRect(-16,10,32,8);
					g.strokeRect(-16,-18,32,8);
					g.strokeRect(-16,10,32,8);
					var flowTurret = new Turret(this.p.x-12,this.p.y-12,TANKS.NORMAL.color['cover'],TANKS.NORMAL.color['turret']);
					flowTurret.draw(g);
		g.restore();
	}
}


var NormalTank = Tank.extend(function() {
	this.MAXHP = TANKS.NORMAL.hp;
	this.FRICTION = TANKS.NORMAL.friction;
	this.SPEED = TANKS.NORMAL.speed;
	this.steps.push(function() {
		
	});
});






