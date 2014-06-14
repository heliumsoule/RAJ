var WEAPONS = {
	TURRET : {
		SPEED : 10,
		SIZE : [6,3],
		DELAY : 3,
		COLOR : {
			'turret' : 'rgb(65,62,67)', 
			'cover' : 'rgb(255,149,0)'
		}
	},
	POWERTURRET : {
		SPEED : 7,
		SIZE : [7,3],
		SPREAD : Math.PI / 16,
		DELAY : 7,
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
	this.timer;
}


var Turret = Weapon.extend(function() {
	this.timer = 0;
	this.fire = function() {
		if (this.timer-- <= 0 && (this.timer = WEAPONS.TURRET.DELAY)) {
			this.W.b.push((new Bullet()).init(this.T.cp.clone().addA(this.T.angle,15), this.T.angle, WEAPONS.TURRET.SPEED).setVars(this.W,this.T,this));
		}
	}
	this.draw = function(g) {
		g.fillStyle = WEAPONS.TURRET.COLOR['cover'];
		g.strokeStyle = WEAPONS.TURRET.COLOR['turret'];
		g.fillRect(2,-3,18,6);
		g.strokeRect(2,-3,18,6);
		g.beginPath();
		g.arc(0,0,10,0,Math.PI*2,true);
		g.fill();
	}
});

var powerTurret = Weapon.extend(function() {
	this.timer = 0;
	this.fire = function() {
		if(this.timer-- <= 0 && (this.timer = WEAPONS.POWERTURRET.DELAY)) {
			this.W.b.push((new Bullet()).init(this.T.cp.clone().addA(this.T.angle,15), this.T.angle, WEAPONS.POWERTURRET.SPEED).setVars(this.W,this.T,this));
			this.W.b.push((new Bullet()).init(this.T.cp.clone().addA(this.T.angle,15), this.T.angle + WEAPONS.POWERTURRET.SPREAD, WEAPONS.POWERTURRET.SPEED).setVars(this.W,this.T,this));
			this.W.b.push((new Bullet()).init(this.T.cp.clone().addA(this.T.angle,15), this.T.angle - WEAPONS.POWERTURRET.SPREAD, WEAPONS.POWERTURRET.SPEED).setVars(this.W,this.T,this));
		}
	}
	this.draw = function(g) {
		g.fillStyle = WEAPONS.POWERTURRET.COLOR['cover'];
		g.strokeStyle = WEAPONS.POWERTURRET.COLOR['turret'];
		g.fillRect(2,-3,18,6);
		g.strokeRect(2,-3,18,6);
		g.beginPath();
		g.arc(0,0,10,0,Math.PI*2,true);
		g.fill();
	}
});

var sniperTurret = Weapon.extend(function() {
	this.timer = 0;
	this.fire = function(id) {
		if(this.timer-- <= 0 && (this.timer = WEAPONS.SNIPERTURRET.DELAY)) {
			this.W.b.push((new Bullet()).init(this.T.cp.clone().addA(this.T.angle,15), this.T.angle, WEAPONS.POWERTURRET.SPEED).setVars(this.W,this.T,this));
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


