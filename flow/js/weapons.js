var WEAPONS = {
	TURRET : {
		SPEED : 10,
		SIZE : [6,3],
		TIMER : 200,
		DAMAGE : 14,
		NUMBER : 1,
		SPREAD : 0,
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
	FIVETURRET : {
		SPEED : 7,
		SIZE : [7,3],
		TIMER : 300,
		DAMAGE : 2.5,
		NUMBER : 5,
		SPREAD : Math.PI / 25,
		COLOR : {
			'turret' : 'rgb(72,253,229)',
			'cover' : 'rgb(72,153,253)'
		}
	},
	SNIPERTURRET : {
		SPEED : 8,
		SIZE : [6,3],
		DELAY : 20,
		ACCURACY : 30,
		DAMAGE : 3,
		COLOR : {
			'turret' : 'rgb(252,65,109)',
			'cover' : 'rgb(251,155,177)'
		}
	}
};


var Weapon = function() {
	this.fire;
	this.draw;
	this.W, this.T;
	this.timer = 0;
}


var Turret = Weapon.extend(function() {
	this.CONSTS = WEAPONS.TURRET;
	this.fire = function() {
		var num = this.CONSTS.NUMBER;
		if ((this.timer-=25) <= 0 && (this.timer = this.CONSTS.TIMER)) {
			for(var i=-(num-1)/2;i<=(num-1)/2;i++)
				this.W.b.push((new Bullet()).init(this.T.ID,
					this.T.cp.clone().addA(this.T.angle,15), this.T.angle + i*this.CONSTS.SPREAD, 
					this.CONSTS.SPEED, this.CONSTS.DAMAGE).setVars(this.W,this.T,this));
		}
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
var FiveTurret = Turret.extend(function() {
	this.CONSTS = WEAPONS.FIVETURRET;
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


