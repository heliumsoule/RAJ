var WEAPONS = {
	TURRET : {
		SPEED : 10,
		SIZE : [6,3],
		TIMER : 230,
		DAMAGE : 14,
		NUMBER : 1,
		COLOR : {
			'turret' : 'rgb(65,62,67)', 
			'cover' : 'rgb(255,149,0)'
		}
	},
	TRIPLETURRET : {
		SPEED : 7,
		SIZE : [7,3],
		TIMER : 300,
		DAMAGE : 4,
		NUMBER : 3,
		SPREAD : Math.PI / 20,
		COLOR : {
			'turret' : 'rgb(72,253,229)',
			'cover' : 'rgb(72,153,253)'
		}
	},
	SPREADTURRET : {
		SPEED : 12,
		SIZE : [3,2],
		TIMER : 300,
		DAMAGE : 2,
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
			'turret' : 'rgb(72,253,229)',
			'cover' : 'rgb(72,153,253)'
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
			'turret' : 'rgb(72,253,229)',
			'cover' : 'rgb(72,153,253)'
		}
	},
	SNIPERTURRET : {
		SPEED : 20,
		SIZE : [6,3],
		DELAY : 20,
		ACCURACY : 30,
		DAMAGE : 3,
		DAMAGE : 5,
		RANGE : 7,
		COLOR : {
			'turret' : 'rgb(252,65,109)',
			'cover' : 'rgb(251,155,177)'
		}
	},
	MINE : {
		SIZE : [4,4],
		DAMAGE : 15,
		COLOR : 'rgb(147,74,225)'
	}
};


var Weapon = function() {
	this.fire;
	this.draw;
	this.step = function() {};
	this.W, this.T;
	this.timer = 0;
	this.setVars = function(W,T) {
		this.W = W;
		this.T = T;
		return this;
	}
}


var Turret = Weapon.extend(function() {
	this.CONSTS = WEAPONS.TURRET;
	this.fire = function() {
		if (this.timer <= 0 && (this.timer = this.CONSTS.TIMER)) {
			var num = this.CONSTS.NUMBER;
			var rand_spread = isNaN(this.CONSTS.SPREAD_RANDOM)?0:this.CONSTS.SPREAD_RANDOM;
			var spread = isNaN(this.CONSTS.SPREAD)?0:this.CONSTS.SPREAD;
			for(var i=-(num-1)/2;i<=(num-1)/2;i++) {
				var speed = (!isNaN(this.CONSTS.SPEED))?this.CONSTS.SPEED:
					(this.CONSTS.SPEED[0]+Math.random()*(this.CONSTS.SPEED[1]-this.CONSTS.SPEED[0]));
				this.W.b.push((new Bullet()).init(this.T.ID, this.CONSTS.SIZE,
					this.T.cp.clone().addA(this.T.angle,15), this.T.angle + i*spread
						+(Math.random()*2-1)*rand_spread, 
					speed, this.CONSTS.DAMAGE).setVars(this.W,this.T,this));
			}
		}
	}
	this.step = function() {
		this.timer -= 25;
	}
	this.draw = function(g) {
		g.fillStyle = this.CONSTS.COLOR['cover'];
		g.strokeStyle = this.CONSTS.COLOR['turret'];
		g.fillRect(2,-3,18,6);
		g.strokeRect(2,-3,18,6);
		g.beginPath();
		g.arc(0,0,10,0,Math.PI*2,true);
		g.fill();
	}
});
var TripleTurret = Turret.extend(function() {
	this.CONSTS = WEAPONS.TRIPLETURRET;
});
var SpreadTurret = Turret.extend(function() {
	this.CONSTS = WEAPONS.SPREADTURRET;
});
var Minigun = Turret.extend(function() {
	this.CONSTS = WEAPONS.MINIGUN;
});
var Shotgun = Turret.extend(function() {
	this.CONSTS = WEAPONS.SHOTGUN;
});

var sniperTurret = Weapon.extend(function() {
	this.timer = 0;
	this.fire = function(id) {
		if(this.timer-- <= 0 && (this.timer = WEAPONS.SNIPERTURRET.DELAY)) {
			this.W.b.push((new Bullet()).init(this.T.cp.clone().addA(this.T.angle,15), this.T.angle, 
				WEAPONS.SNIPERTURRET.SPEED, WEAPONS.SNIPERTURRET.DAMAGE, WEAPONS.SNIPERTURRET.RANGE).setVars(this.W,this.T,this));
		}
	}
	this.draw = function(g) {
		g.fillStyle = WEAPONS.SNIPERTURRET.COLOR['cover'];
		g.strokeStyle = WEAPONS.SNIPERTURRET.COLOR['turret'];
		g.fillRect(2,-3,18,6);
		g.strokeRect(2,-3,18,6);
		g.beginPath();
		g.arc(0,0,10,0,Math.PI*2,true);
		g.fill();
	}
});


