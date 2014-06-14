var WEAPONS = {
	TURRET : {
		SPEED : 10,
		SIZE : [6,3],
		TIMER : 200,
		DAMAGE : 1,
		RANGE : 10,
		COLOR : {
			'turret' : 'rgb(65,62,67)', 
			'cover' : 'rgb(255,149,0)'
		}
	},
	TRIPLETURRET : {
		SPEED : 7,
		SIZE : [7,3],
		SPREAD : Math.PI / 20,
		TIMER : 300,
		DAMAGE : 1/3,
		RANGE : 15,
		COLOR : {
			'turret' : 'rgb(72,253,229)',
			'cover' : 'rgb(72,153,253)'
		}
	},
	SNIPERTURRET : {
		SPEED : 20,
		SIZE : [6,3],
		DELAY : 20,
		DAMAGE : 5,
		RANGE : 7,
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
	this.fire = function() {
		if ((this.timer-=25) <= 0 && (this.timer = WEAPONS.TURRET.TIMER)) {
			this.W.b.push((new Bullet()).init(this.T.cp.clone().addA(this.T.angle,15), this.T.angle, 
				WEAPONS.TURRET.SPEED, WEAPONS.TURRET.DAMAGE, WEAPONS.TURRET.RANGE).setVars(this.W,this.T,this));
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

var TripleTurret = Weapon.extend(function() {
	this.fire = function() {
		if((this.timer-=25) <= 0 && (this.timer = WEAPONS.TRIPLETURRET.TIMER)) {
			for(var i=-1;i<=1;i++)
				this.W.b.push((new Bullet()).init(this.T.cp.clone().addA(this.T.angle,15), this.T.angle + i*WEAPONS.TRIPLETURRET.SPREAD, 
					WEAPONS.TRIPLETURRET.SPEED, WEAPONS.TRIPLETURRET.DAMAGE, WEAPONS.TRIPLETURRET.RANGE).setVars(this.W,this.T,this));
		}
	}
	this.draw = function(g) {
		g.fillStyle = WEAPONS.TRIPLETURRET.COLOR['cover'];
		g.strokeStyle = WEAPONS.TRIPLETURRET.COLOR['turret'];
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


