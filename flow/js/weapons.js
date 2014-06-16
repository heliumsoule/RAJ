Menu.WeaponsStats = {
	speed : [6,15],
	timer : [1200,0],
	damage : [0,20]
};
Menu.Weapons = [
	["Turret", "Turret",
		"speed/1;damage/1;timer/Firing/0"],
	["TripleTurret", "Triple Turret",
		"speed/1;damage/1;timer/Firing/0;Fires three bullets"],
	["SpreadTurret", "Spread Turret",
		"speed/1;damage/1;timer/Firing/0;Fires five bullets"],
	["Minigun", "Minigun",
		"speed/1;damage/1;timer/Firing/0;Rapid fire weapon with some spread"],
	["Shotgun", "Shotgun",
		"speed/1;damage/1;timer/Firing/0;Fires clump of bullets with spread"],
	["Laser", "Laser",
		"damage/1;timer/Firing/0;Line of fire, instant hit weapon"],
];


var WEAPONS = {
	TURRET : {
		SPEED : 10,
		SIZE : [6,3],
		TIMER : 270,
		DAMAGE : 14,
		NUMBER : 1,
		COLOR : {
			'turret' : 'rgb(137,40,255)', 
			'cover' : 'rgb(137,40,255)'
		}
	},
	TRIPLETURRET : {
		SPEED : 7,
		SIZE : [7,3],
		TIMER : 300,
		DAMAGE : 5,
		NUMBER : 3,
		SPREAD : Math.PI / 20,
		COLOR : {
			'turret' : 'rgb(255,130,140)',
			'cover' : 'rgb(255,130,140)'
		}
	},
	SPREADTURRET : {
		SPEED : 12,
		SIZE : [3,2],
		TIMER : 300,
		DAMAGE : 3,
		NUMBER : 5,
		SPREAD : Math.PI / 25,
		COLOR : {
			'turret' : 'rgb(72,253,229)',
			'cover' : 'rgb(72,153,253)'
		}
	},
	MINIGUN : {
		SPEED : 9,
		SIZE : [2,1],
		TIMER : 50,
		DAMAGE : 1.3,
		NUMBER : 1,
		SPREAD_RANDOM : Math.PI / 25,
		COLOR : {
			'turret' : 'rgb(95,92,97)',
			'cover' : 'rgb(26,26,26)'
		}
	},
	SHOTGUN : {
		SPEED : [9,11],
		SIZE : [3,2],
		TIMER : 700,
		DAMAGE : 3.5,
		NUMBER : 6,
		SPREAD : Math.PI / 70,
		SPREAD_RANDOM : Math.PI / 15,
		COLOR : {
			'cover' : 'rgb(245,177,16)',
			'turret' : 'rgb(139,113,52)'
		}
	},
	LASER : {
		TIMER : 1000,
		DAMAGE : 14,
		COLOR : {
			'base' : [80,80,80],
			'laser' : [255,0,0]
		}
	},
	RPG : {
		SPEED : 9,
		SIZE : [2,1],
		TIMER : 50,
		DAMAGE : 1.3,
		NUMBER : 1,
		SPREAD_RANDOM : Math.PI / 25,
		COLOR : {
			'turret' : 'rgb(95,92,97)',
			'cover' : 'rgb(26,26,26)'
		}
	},
	MINEDROPPER : {
		SIZE : [4,4],
		DAMAGE : 30,
		TIMER : 200,
		COLOR : 'rgb(147,74,225)'
	}
};


var Weapon = function() {
	this.OBJECT = "WEAPON";
	this.C;
	this.shoot;
	this.steps = [];
	this.step = function() {
		for(var i=0;i<this.steps.length;i++)
			this.steps[i].apply(this,arguments);
	}
	this.draws = [];
	this.draw = function(g) {
		for(var i=0;i<this.draws.length;i++)
			this.draws[i].call(this,g);
	}
	this.W, this.T;
	this.setVars = function(W,T) {
		this.W = W;
		this.T = T;
		return this;
	}
}

var TimedWeapon = Weapon.extend(function() {
	this.timer = 0;
	this.totalTimer = 100;
	this.fire;
	this.shoot = function() {
		if (this.timer <= 0 && (this.timer = this.C.TIMER))
			this.fire();
	}
	this.steps.push(function() {
		this.timer -= 25;
	});
});

var Turret = TimedWeapon.extend(function() {
	this.C = WEAPONS.TURRET;
	this.fire = function() {
		var num = this.C.NUMBER;
		var rand_spread = isNaN(this.C.SPREAD_RANDOM)?0:this.C.SPREAD_RANDOM;
		var spread = isNaN(this.C.SPREAD)?0:this.C.SPREAD;
		for(var i=-(num-1)/2;i<=(num-1)/2;i++) {
			var speed = (!isNaN(this.C.SPEED))?this.C.SPEED:
				(this.C.SPEED[0]+Math.random()*(this.C.SPEED[1]-this.C.SPEED[0]));
			this.W.b.push((new Bullet()).setVars(this.W,this.T,this)
				.init(this.C.SIZE, this.T.cp.clone().addA(this.T.angle,15),
					this.T.angle + i*spread + (Math.random()*2-1)*rand_spread, 
				speed, this.C.DAMAGE));
		}
	}
	this.draws.push(function(g) {
		g.fillStyle = this.C.COLOR.turret;
		g.fillRect(2,-3,18,6);
		g.fillStyle = this.C.COLOR.cover;
		g.beginPath();
		g.arc(0,0,10,0,Math.PI*2,true);
		g.fill();
	});
});
var TripleTurret = Turret.extend(function() {
	this.C = WEAPONS.TRIPLETURRET;
});
var SpreadTurret = Turret.extend(function() {
	this.C = WEAPONS.SPREADTURRET;
});
var Minigun = Turret.extend(function() {
	this.C = WEAPONS.MINIGUN;
});
var Shotgun = Turret.extend(function() {
	this.C = WEAPONS.SHOTGUN;
});

var Laser = TimedWeapon.extend(function() {
	this.C = WEAPONS.LASER;
	this.fire = function() {
		var ang = this.T.angle;
		var sp = this.T.cp.clone().addA(ang+Math.atan(2/17), Math.sqrt(17*17+2*2));
		this.W.b.push((new Ray()).setVars(this.W,this.T,this)
			.init(sp, ang, this.C.COLOR.laser, this.C.DAMAGE));
	}
	this.draws.push(function(g) {
		g.fillStyle = "rgb("+this.C.COLOR.base.join(",")+")";
		g.fillRect(-8,-8,16,16);
		g.fillRect(0,0,17,5);
		g.fillStyle = "rgb("+this.C.COLOR.laser.join(",")+")";
		g.fillRect(-5,-5,10,10);
		g.fillRect(0,2,17,1);
	});
});

var MineDropper = TimedWeapon.extend(function() {
	this.C = WEAPONS.MINEDROPPER;
	this.fire = function() {
		this.W.b.push(new Mine().setVars(this.W,this.T,this)
			.init(this.C.SIZE, this.T.cp.clone().addA(this.T.angle,-15), this.C.TIMER, this.C.DAMAGE));
	}
	this.draws.push(function(g) {
		g.fillStyle = this.C.COLOR;
		g.fillRect(2,-3,18,6);
		g.arc(0,0,10,0,Math.PI*2,true);
		g.fill()
	});
});

