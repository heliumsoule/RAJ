var Win = 0;

var TANKS = {
	NORMAL : {
		SIZE : 32,
		HP : 100,
		FRICTION : 0.85,
		SPEED : 10,
		TURNSPEED : 5 * Math.PI / 180,
		WATER : 0.3,
		WEIGHT : 1,
		COLOR : {
				 'body' : 'rgb(150,150,150)', 
				 'wheels' : 'rgb(100,100,100)'
				}
	},
	SCOUT : {
		SIZE : 28,
		HP : 75,
		FRICTION : 0.9,
		SPEED : 12,
		TURNSPEED : 7 * Math.PI / 180,
		WATER : 0.7,
		WEIGHT : 0.8,
		COLOR : {
				 'body' : 'rgb(160,160,160)', 
				 'wheels' : 'rgb(111,183,199)'
				}
	},
	HEAVY : {
		SIZE : 36,
		HP : 170,
		FRICTION : 0.8,
		SPEED : 10,
		TURNSPEED : 4 * Math.PI / 180,
		WATER : 0.2,
		WEIGHT : 1.2,
		COLOR : {
				 'body' : 'rgb(80,80,80)', 
				 'wheels' : 'rgb(50,50,50)'
				}
	},
	ARMORED : {
		SIZE : 40,
		HP : 250,
		FRICTION : 0.72	,
		SPEED : 10,
		TURNSPEED : 3 * Math.PI / 180,
		WATER : 0.1,
		WEIGHT : 1.4,
		COLOR : {
				 'body' : 'rgb(50,50,50)', 
				 'wheels' : 'rgb(30,30,30)'
				}
	},
	SPIKEDTANK : {
		SIZE : 35,
		HP : 200,
		FRICTION : 0.85,
		SPEED : 7.5,
		TURNSPEED : 3.3 * Math.PI / 180,
		WATER : 0.3,
		WEIGHT : 1.2,
		BULLETSPEED : 10,
		COLOR : {
				 'body' : 'rgb(150,150,150)', 
				 'wheels' : 'rgb(100,100,100)'
				}
	}
}

var Tank = function() {
	this.OBJECT = "TANK";
	this.W;
	this.ID = Math.floor(Math.random()*10000);
	this.p = new Vector(), this.cp = new Vector();
	this.v = new Vector();
	this.angle = 0;
	this.hp = 0;
	this.HP, this.FRICTION, this.SPEED, this.TURNSPEED, this.WATER, this.COLOR, this.weight, this.s;
	this.keyb;
	this.weapons, this.weapon, this.weaponST = 0;
	this.inits = [];
	this.init = function(keyBinding) {
		this.keyb = {};
		for(var i in keyBinding) {
			for(var j=0;j<keys.length;j++)
				if (keys[j] == keyBinding[i])
					this.keyb[i] = j;
		}
		for(var i=0;i<this.inits.length;i++)
			this.inits[i].apply(this);
	}
	this.setupData = function(TDATA) {
		this.hp = this.HP = TDATA.HP;
		this.FRICTION = TDATA.FRICTION;
		this.SPEED = TDATA.SPEED;
		this.TURNSPEED = TDATA.TURNSPEED;
		this.WATER = TDATA.WATER;
		this.COLOR = TDATA.COLOR;
		this.weight = TDATA.WEIGHT;
		this.s = new Dimension(TDATA.SIZE,TDATA.SIZE);
	}
	this.setup = function(W, startPos, angle, weapon) {
		this.W = W;
		this.p = startPos;
		this.angle = angle;
		this.weapons = weapon;
		for(i in this.weapons) {
			this.weapons[i].T = this;
			this.weapons[i].W = W;
		}
		this.weapon = this.weapons[0];
		return this;
	}
	this.steps = [];
	this.steps.push(function(debug) {
		this.cp = this.p.plus(this.s.times(0.5));
		if (keyv[this.keyb.left]) this.angle -= this.TURNSPEED;
		if (keyv[this.keyb.right]) this.angle += this.TURNSPEED;
		if (keyv[this.keyb.up] || keyv[this.keyb.down])  {
			var d = (keyv[this.keyb.up]?1:-1)*this.SPEED * 0.07;
			this.v.addA(this.angle, d);
		}
		this.weaponST--;
		if(keyv[this.keyb.switch] && this.weaponST <= 0 && (this.weaponST=8)) {
			this.weapon = this.weapons[(this.weapons.indexOf(this.weapon) + 1) % 2];
		}
		if(keyv[this.keyb.shoot]) {
			this.weapon.shoot();
		}
		this.v.addC(this.W.FF.getXVelocity(Math.floor(this.cp.x/6),Math.floor(this.cp.y/6))*this.WATER,
		 			this.W.FF.getYVelocity(Math.floor(this.cp.x/6),Math.floor(this.cp.y/6))*this.WATER);
		{
			this.v.scale(this.FRICTION);
			this.p.add(this.v);
			var r = calculate(this.p, this.s, this.v, this.W);
			this.p.set(r.p);
			this.v.set(r.v);
		}
		this.cp = this.p.plus(this.s.times(0.5));
		this.hp = Math.max(this.hp, 0);
	});
	this.step = function() {
		for(var i=0;i<this.steps.length;i++)
			this.steps[i].apply(this,arguments);
		this.weapon.step();
	}
	this.hit = function(dmg) {
		this.hp -= dmg;
	}
	this.draws = [];
	this.draws.push(function(g) {
		g.save();
			g.translate(this.cp.x, this.cp.y);
			
			if (this.cp.y < 30) g.translate(0,50);
			g.fillStyle = "rgb(251,68,68)";
			g.fillRect(-17,-27, 34, 4);
			g.fillStyle = "rgb(58,201,22)";
			g.fillRect(-17,-27, 34 * this.hp / this.HP, 4);
			if (this.cp.y < 30) g.translate(0,-50);
			
			g.rotate(this.angle);
				g.scale(this.s.x/32,this.s.y/32);
					g.fillStyle = this.COLOR['body'];
					g.strokeStyle = this.COLOR['body'];
					g.fillRect(-12,-12,24,24);
					g.strokeRect(-12,-12,24,24);
					g.fillStyle = this.COLOR['wheels'];
					g.strokeStyle = this.COLOR['wheels'];
					g.fillRect(-16,-18,32,8);
					g.fillRect(-16,10,32,8);
					g.strokeRect(-16,-18,32,8);
					g.strokeRect(-16,10,32,8);
					this.weapon.draw(g);
		g.restore();
	});
	this.draw = function(g) {
		for(var i in this.draws)
			this.draws[i].call(this,g);
	}
}

var NormalTank = Tank.extend(function() {
	this.setupData(TANKS.NORMAL);
});

var Scout = Tank.extend(function() {
	this.setupData(TANKS.SCOUT);
});

var Heavy = Tank.extend(function() {
	this.setupData(TANKS.HEAVY);
});

var ArmoredTank = Tank.extend(function() {
	this.setupData(TANKS.ARMORED);
});

var SpikedTank = Tank.extend(function() {
	this.setupData(TANKS.SPIKEDTANK);
	this.hit = function(dmg) {
		this.hp -= dmg;
		for(var i=0;i<=dmg;i+=1) {
			this.W.b.push((new Bullet()).init(this.ID, [2,2],
					this.cp.clone(), Math.random()*2*Math.PI, 
					TANKS.SPIKEDTANK.BULLETSPEED, 2.5).setVars(this.W,this,this.T)
					.options({color:[255,255,0]}) );
		}
	}
	this.inits.push(function() {
		this.spikes = [];
		for(var i=0;i<2;i++) {
			var sy = -18 + 28 * i;
			for(var j=0;j<15;j++) {
				this.spikes.push({
					x : -16 + Math.random()*31,
					y : sy + Math.random()*7,
					w : 1+Math.random()*1,
					h : 1+Math.random()*1
				});
			}
		}
	});
	this.draws.push(function() {
		g.save();
			g.translate(this.cp.x, this.cp.y);
				g.rotate(this.angle);
					g.scale(this.s.x/32,this.s.y/32);
						g.fillStyle="rgb(255,255,0)";
						for(var i in this.spikes)
							g.fillRect(this.spikes[i].x,this.spikes[i].y,this.spikes[i].w,this.spikes[i].h);
		g.restore();
	});
});













