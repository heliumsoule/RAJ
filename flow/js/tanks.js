var Win = 0;

var TANKS = {
	NORMAL : {
		SIZE : 32,
		HP : 100,
		FRICTION : 0.85,
		SPEED : 10,
		TURNSPEED : 5 * Math.PI / 180,
		WATER : 0.3,
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
		COLOR : {
				 'body' : 'rgb(50,50,50)', 
				 'wheels' : 'rgb(30,30,30)'
				}
	}
}

var Tank = function() {
	this.W;
	this.ID = Math.floor(Math.random()*10000);
	this.p = new Vector(), this.cp = new Vector();
	this.v = new Vector();
	this.angle = 0;
	this.hp = 0;
	this.HP, this.FRICTION, this.SPEED, this.TURNSPEED, this.WATER, this.COLOR, this.s;
	this.keyb;
	this.weapon;
	this.currWeapon;
	this.inits = [];
	this.init = function(keyBinding) {
		this.keyb = {};
		for(var i in keyBinding) {
			for(var j=0;j<keys.length;j++)
				if (keys[j] == keyBinding[i])
					this.keyb[i] = j;
		}
	}
	this.setupData = function(TDATA) {
		this.hp = this.HP = TDATA.HP;
		this.FRICTION = TDATA.FRICTION;
		this.SPEED = TDATA.SPEED;
		this.TURNSPEED = TDATA.TURNSPEED;
		this.WATER = TDATA.WATER;
		this.COLOR = TDATA.COLOR;
		this.s = new Dimension(TDATA.SIZE,TDATA.SIZE);
	}
	this.setup = function(W, startPos, angle, weapon) {
		this.W = W;
		this.p = startPos;
		this.angle = angle;
		this.weapon = weapon;
		this.currWeapon = weapon[0];
		this.currWeapon.T = this;
		this.currWeapon.W = W;
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
		if(keyv[this.keyb.switch]) {
			console.log(this.weapon.indexOf(this.currWeapon));
			console.log((this.weapon.indexOf(this.currWeapon) + 1) % 2);
			this.currWeapon = this.weapon[(this.weapon.indexOf(this.currWeapon) + 1) % 2];
		}
		if(keyv[this.keyb.shoot]) {
			this.currWeapon.fire();
		}
		this.v.addC(this.W.FF.getXVelocity(Math.floor(this.cp.x/6),Math.floor(this.cp.y/6))*this.WATER,
		 			this.W.FF.getYVelocity(Math.floor(this.cp.x/6),Math.floor(this.cp.y/6))*this.WATER);
		{
			this.v.scale(this.FRICTION);
			this.p.add(this.v);
			var r = calculate(this.p, this.s, this.v);
			this.p.set(r.p);
			this.v.set(r.v);
		}
		this.cp = this.p.plus(this.s.times(0.5));
		this.hp = Math.max(this.hp, 0);
	});
	this.step = function() {
		for(var i=0;i<this.steps.length;i++)
			this.steps[i].apply(this,arguments);
		this.currWeapon.step();
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
					this.currWeapon.draw(g);
		g.restore();
	});
	this.draw = function(g) {
		for(var i in this.draws);
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













