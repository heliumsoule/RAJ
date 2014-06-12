var Win = 0;

var TANKS = {
	NORMAL : {
		SIZE : 32,
		HP : 100,
		FRICTION : 0.85,
		SPEED : 20,
		TURNSPEED : 5 * Math.PI / 180,
		WATER : 1,
		color : {
				 'body' : 'rgb(94,92,92)', 
				 'wheels' : 'rgb(111,183,199)', 
				 'turret' : 'rgb(65,62,67)', 
				 'cover' : 'rgb(255,149,0)', 
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
	this.p = new Vector(), this.cp = new Vector();
	this.v = new Vector();
	this.angle = 0;
	this.hp = 0;
	this.HP, this.FRICTION, this.SPEED, this.TURNSPEED, this.WATER, this.s;
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
	this.setupData = function(TDATA) {
		this.HP = TDATA.HP;
		this.FRICTION = TDATA.FRICTION;
		this.SPEED = TDATA.SPEED;
		this.TURNSPEED = TDATA.TURNSPEED;
		this.WATER = TDATA.WATER;
		this.s = new Dimension(TDATA.SIZE,TDATA.SIZE);
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
		this.cp = this.p.plus(this.s.times(0.5));
		if (keyv[this.keyb.left]) this.angle -= this.TURNSPEED;
		if (keyv[this.keyb.right]) this.angle += this.TURNSPEED;
		if (keyv[this.keyb.up] || keyv[this.keyb.down])  {
			var d = (keyv[this.keyb.up]?1:-1)*this.SPEED * 0.07;
			this.v.addA(this.angle, d);
		}
		if(keyv[this.keyb.shoot]) {
			this.weapon.fire();
		}
		// $("#d").html(this.v.y);
		// var mult = 5000;
		// this.v.addC(this.W.FF.getXVelocity(Math.floor(this.cp.x/6),Math.floor(this.cp.y/6))*mult,
		// 			this.W.FF.getYVelocity(Math.floor(this.cp.x/6),Math.floor(this.cp.y/6))*mult);
		// $("#d").css("width",200+Math.round(this.W.FF.getYVelocity(Math.floor(this.cp.x/6),Math.floor(this.cp.y/6))*mult*500)+"px");
		// $("#d").append("<br>"+this.v.y);
		{
			this.v.scale(this.FRICTION);
			this.p.add(this.v);
			var r = calculate(this.p, this.s, this.v);
			this.p.set(r.p);
			this.v.set(r.v);
		}
		this.cp = this.p.plus(this.s.times(0.5));
		$("#d").append("<br>"+this.v.y);
	});
	this.step = function() {
		for(var i=0;i<this.steps.length;i++)
			this.steps[i].call(this);
	}
	this.health = function(b) {
		// if(this.HP == 0) {
		// 	Win = 1;
		// }
		// else {
			for(i in b) {
				console.log(DBP(this.cp.x + 16, b[i].p.x,this.cp.y + 16,b[i].p.y));
				if(DBP(this.cp.x + 16, b[i].p.x,this.cp.y + 16,b[i].p.y) < 20) {
					this.HP--;
				}
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
	this.setupData(TANKS.NORMAL);
});













