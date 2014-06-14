var Projectile = function() {
	this.OBJECT = "PROJECTILE";
	this.destroy = false;
	this.p, this.v, this.angle, this.damage;
	this.steps = [];
	this.step = function() {
		if (this.destroy) return;
		for(var i=0;i<this.steps.length;i++)
			this.steps[i].call(this);
	}
	this.draws = [];
	this.draw = function(g) {
		if (this.destroy) return;
		for(var i=0;i<this.draws.length;i++)
			this.draws[i].call(this,g);
	}
	this.kill = function() {}
	this.setVars = function(W,T,w) {
		this.W = W;
		this.T = T;
		this.ID = this.T.ID;
		this.w = w;
		return this;
	}
}

var Ray = Projectile.extend(function() {
	this.fade = 1;
	this.init = function(p, ang, color, damage) {
		this.color = color;
		this.p = p;
		var pv = (new Vector()).addA(ang, 1000),
			objCol;
		
		return this;
	}
	this.draws.push(function() {
		this.fade = Math.max(this.fade - 0.4, 0);
		if (this.fade <= 0) return this.destroy = true;
		g.strokeStyle = "rgba("+this.color.join(",")+","+this.fade+")";
		g.lineWidth = 2;
		g.beginPath();
			g.moveTo(this.p.x, this.p.y);
			//g.lineTo(this.e.x, this.e.y);
		g.stroke();
	});
});

var Mine = Projectile.extend(function() {
	this.s = new Dimension(4,4);
	this.init = function(size, position, damage) {
		this.s = new Dimension(size[0],size[1]);
		this.p = position.clone();
		this.damage = damage;
		return this;
	}
	this.explode = function(r) {
		
	}
	this.steps.push(function() {
		for(i in this.W.tanks) {
			var t = this.W.tanks[i];
			if (t.ID == this.ID) continue;
			if(col(t.p.x,t.p.y,t.s.x,t.s.y,this.p.x,this.p.y,this.s.x,this.s.y)) {
				t.hit(this.damage);
				this.destroy = true;
				break;
			}
		}
	});
	this.draws.push(function(g) {
		g.beginPath();
		g.fillStyle = "rgb(255,255,255)";
		g.arc(this.p.x,this.p.y,this.s.x,0,Math.PI * 2, true);
		g.fill();
	});
	this.kill = function() {
		this.W.createShockwave(this.p.x,this.p.y,[255,255,255],15+this.damage,this.damage);
	}
});

var Bullet = Projectile.extend(function() {
	this.WATER = 2.5;
	this.s = new Dimension(2,2);
	this.color = [255,255,255];
	this.options = function(o) {
		if (o.color) this.color = o.color;
		return this;
	}
	this.init = function(size, position, angle, velocity, damage) {
		this.s = new Dimension(size[0],size[1]);
		this.p = position.clone();
		this.v = new Vector().addA(angle, velocity);
		this.angle = angle;
		this.damage = damage;
		return this;
	}
	this.steps.push(function() {
		this.v.addC(this.W.FF.getXVelocity(Math.floor(this.p.x/6),Math.floor(this.p.y/6))*this.WATER,
					this.W.FF.getYVelocity(Math.floor(this.p.x/6),Math.floor(this.p.y/6))*this.WATER);
		this.p.add(this.v);
		if (this.W.col(0, this.p, this.s))
			this.destroy = true;
		for(i in this.W.tanks) {
			var t = this.W.tanks[i];
			if (t.ID == this.ID) continue;
			if(col(t.p.x,t.p.y,t.s.x,t.s.y, this.p.x,this.p.y,this.s.x,this.s.y)) {
				this.W.tanks[i].hit(this.damage);
				this.destroy = true;
				break;
			}
		}
	});
	this.kill = function() {
		this.W.createShockwave(this.p.x,this.p.y,this.color,10+this.damage,this.damage);
	}
	this.draws.push(function(g) {
		g.translate(this.p.x,this.p.y);
			g.rotate(this.angle);
				g.fillStyle = g.strokeStyle = "rgb("+this.color.join(",")+")";
				g.fillRect(0,0,this.s.x,this.s.y);
				g.strokeRect(0,0,this.s.x,this.s.y);
			g.rotate(-this.angle);
		g.translate(-this.p.x,-this.p.y);
	});
});


