

var Tank = function() {
	this.p = new Vector();
	this.v = new Vector();
	this.angle = 0;
	this.keyb;
	this.MAXHP, this.FRICTION, this.SPEED, this.TURNSPEED;
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
		if(keyv[this.keyb.shoot]) arrBullets.push(new Bullets(bulletArr.p,this.angle));
	}
	this.draw = function(g) {
		g.translate(this.p.x+15, this.p.y+15);
			g.rotate(this.angle);
				g.fillStyle = TANKS.NORMAL.color['body'];
				g.strokeStyle = TANKS.NORMAL.color['body'];
				g.fillRect(-12,-12,TANKS.NORMAL.size,TANKS.NORMAL.size);
				g.strokeRect(-12,-12,TANKS.NORMAL.size,TANKS.NORMAL.size);
				g.fillStyle = TANKS.NORMAL.color['wheels'];
				g.strokeStyle = TANKS.NORMAL.color['wheels'];
				g.fillRect(-16,-18,32,8);
				g.fillRect(-16,10,32,8);
				g.strokeRect(-16,-18,32,8);
				g.strokeRect(-16,10,32,8);
				var flowTurret = new Turret(this.p.x-12,this.p.y-12,TANKS.NORMAL.color['cover'],TANKS.NORMAL.color['turret']);
				flowTurret.draw(g);
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






