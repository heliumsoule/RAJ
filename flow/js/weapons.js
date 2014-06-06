

var Weapon = function() {
	this.fire;
	this.draw;
}




var Turret = Weapon.extend(function() {
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
