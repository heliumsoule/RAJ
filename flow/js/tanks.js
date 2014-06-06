var Win = 0;

var TANKS = {
	NORMAL : {
		SIZE : 32,
		HP : 100,
		FRICTION : 0.85,
		SPEED : 20,
		TURNSPEED : 5 * Math.PI / 180,
		color : {
				 'body' : 'rgb(32,120,140)', 
				 'wheels' : 'rgb(0,209,255)', 
				 'turret' : 'rgb(111,183,199)', 
				 'cover' : 'rgb(14,90,107)', 
				 'healthbar' : "rgb(204,11,11)"
				}
		// color : {
		// 	 'body' : 'rgb(32,120,140)', 
		// 	 'wheels' : 'rgb(0,209,255)', 
		// 	 'turret' : 'rgb(111,183,199)', 
		// 	 'cover' : 'rgb(14,90,107)', 
		// 	 'healthbar' : "rgb(204,11,11)"
		// 	}
	},
	TURNSPEED : 5 * Math.PI / 180
}

var Tank = function() {
	this.W;
	this.p = new Vector(), this.cp;
	this.v = new Vector();
	this.angle = 0;
	this.hp = 0;
	this.HP, this.FRICTION, this.SPEED, this.TURNSPEED, this.s;
	this.keyb;
	this.weapon;
	this.inits = [];
	this.init = function(keyBinding) {
		this.keyb = {};
		for(var i in keyBinding) {
			for(var j=0;j<keys.length;j++)
				if (keys[j] == keyBinding[i])
					this.keyb[i] = j;
		}
	}
	this.setup = function(W, startPos, angle, weapon) {
		this.W = W;
		this.p = startPos;
		this.angle = angle;
		this.weapon = weapon;
		this.weapon.T = this;
		this.weapon.W = W;
		return this;
	}
	this.steps = [];
	this.steps.push(function() {
		if (keyv[this.keyb.left]) this.angle -= this.TURNSPEED;
		if (keyv[this.keyb.right]) this.angle += this.TURNSPEED;
		if (keyv[this.keyb.up] || keyv[this.keyb.down])  {
			var d = (keyv[this.keyb.up]?1:-1)*this.SPEED * 0.07;
			this.v.addA(this.angle, d);
		}
		if(keyv[this.keyb.shoot]) {
			this.weapon.fire();
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
	this.health = function() {
		// if(this.HP == 0) {
		// 	Win = 1;
		// }
		// else {
			for(var i in arrBullets) {
			if(DBP(this.p.x,arrBullets[i].p.x,this.p.y,arrBullets[i].p.y) < 5) 
				this.HP--;
			}		
		// }
	}
	this.draws = [];
	this.draws.push(function(g) {
		g.save();
		g.translate(this.cp.x, this.cp.y);
		g.fillStyle = TANKS.NORMAL.color['healthbar'];
		g.strokeStyle = TANKS.NORMAL.color['healthbar'];
		g.fillRect(-16,-30, 32 * this.HP / 100, 7);
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
					this.weapon.draw(g);
		g.restore();
	});
	this.draw = function(g) {
		for(var i in this.draws);
			this.draws[i].call(this,g);
	}
}


var NormalTank = Tank.extend(function() {
	this.HP = TANKS.NORMAL.HP;
	this.FRICTION = TANKS.NORMAL.FRICTION;
	this.SPEED = TANKS.NORMAL.SPEED;
	this.TURNSPEED = TANKS.NORMAL.TURNSPEED;
	this.s = new Dimension(TANKS.NORMAL.SIZE,TANKS.NORMAL.SIZE);
});













