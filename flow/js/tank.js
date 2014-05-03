
var TANKS = {
	NORMAL : {
		friction : 0.92
	}
}

var Tank = function() {
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.angle = 0;
	this.maxhp = 100;
	this.friction = TANKS.NORMAL.friction;
	this.init = function(keyBinding) {
		
	}
	this.setup = function() {
		this.hp = this.maxhp;
	}
}


var HeavyTank = Tank.extend(function() {
	this.x = 30;
});


