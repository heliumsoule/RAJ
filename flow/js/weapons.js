var WEAPONS = {
	TURRET : {
		SPEED : 3,
		SIZE : [6,3]
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
		if (this.timer-- <= 0 && (this.timer = 3)) {
			this.W.b.push((new Bullet()).init(this.T.cp.clone().addA(this.T.angle,15), this.T.angle, WEAPONS.TURRET.SPEED).setVars(this.W,this.T,this));
		}
	}
	this.draw = function(g) {
		g.fillStyle = TANKS.NORMAL.color['cover'];
		g.strokeStyle = TANKS.NORMAL.color['turret'];
		g.fillRect(2,-3,18,6);
		g.strokeRect(2,-3,18,6);
		g.beginPath();
		g.arc(0,0,10,0,Math.PI*2,true);
		g.fill();
	}
});
