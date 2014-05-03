function randomColor() {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for(var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 15)];
	}
	return color
}

var TANKS = {
	NORMAL : {
		hp : 100,
		friction : 0.85,
		speed : 10,
		size : 24,
	},
	TURNSPEED : 5 * Math.PI / 180
}

var Tank = function() {
	this.p = new Vector();
	this.v = new Vector();
	this.angle = 0;
	this.MAXHP, this.FRICTION, this.SPEED;
	this.keyb;
	this.init = function(keyBinding) {
		this.keyb = {};
		for(i in keyBinding) {
			for(var j=0;j<keys.length;j++)
				if (keys[j] == keyBinding[i])
					this.keyb[i] = j;
		}
	}
	this.setup = function(startPos, angle) {
		this.hp = this.MAXHP;
		this.p = startPos;
		this.angle = angle;
	}
	this.steps = [function() {
		if (keyv[this.keyb.left]) this.angle -= TANKS.TURNSPEED;
		if (keyv[this.keyb.right]) this.angle += TANKS.TURNSPEED;
		if (keyv[this.keyb.up] || keyv[this.keyb.down])  {
			var d = (keyv[this.keyb.up]?1:-1)*this.SPEED * 0.07;
			this.v.addA(this.angle, d);
		}
		{
			this.v.scale(this.FRICTION);
			this.p.add(this.v);
			var r = calculate(this.p, 30, 30, this.v);
			this.p.setC(r.x, r.y);
			this.v.setC(r.vx, r.vy);
		}
	}];
	this.step = function() {
		for(var i=0;i<this.steps.length;i++)
			this.steps[i].call(this);
	}
	this.draw = function(g) {
		g.translate(this.p.x+15, this.p.y+15);
			g.rotate(this.angle);
				g.fillStyle = "rgb(50,50,50)";
				g.strokeStyle = "rgb(255,255,255)";
				g.fillRect(-12,-12,TANKS.NORMAL.size,TANKS.NORMAL.size);
				g.strokeRect(-12,-12,TANKS.NORMAL.size,TANKS.NORMAL.size);
				g.fillRect(-16,-18,32,8);
				g.fillRect(-16,10,32,8);
				g.strokeRect(-16,-18,32,8);
				g.strokeRect(-16,10,32,8);
				var flowTurret = new Turret(this.p.x-12,this.p.y-12,"rgb(30,200,140)");
				flowTurret.draw(g);
			g.rotate(-this.angle);
		g.translate(-this.p.x-15, -this.p.y-15);
	}
}

var Turret = function(x,y,colorCode) {
	this.x = x; 
	this.y = y;
	this.color = colorCode;
	this.draw = function(g) {
		var r = 10;
		var coverPoints = [[r,0],
					  [r*Math.cos(Math.PI/3),r*Math.sin(Math.PI/3)],
					  [-r*Math.cos(Math.PI/3),r*Math.sin(Math.PI/3)],
					  [-r,0],
					  [-r*Math.cos(Math.PI/3),-r*Math.sin(Math.PI/3)],
					  [r*Math.cos(Math.PI/3),-r*Math.sin(Math.PI/3)],
					  [r,0]];
		g.moveTo(coverPoints[0][0],coverPoints[0][1]);
		for(var count = 1; count < 6; count++) {
			g.lineTo(coverPoints[count][0],coverPoints[count][1]);
		}
		g.closePath();
		g.fillStyle = this.color;
		g.strokeStyle = this.color;
		g.fill();
		g.fillRect(2,-3,18,6);
		g.strokeRect(2,-3,18,6);
	}
}


var NormalTank = Tank.extend(function() {
	this.MAXHP = TANKS.NORMAL.hp;
	this.FRICTION = TANKS.NORMAL.friction;
	this.SPEED = TANKS.NORMAL.speed;
	this.steps.push(function() {
		
	});
});

var World = function() {
	var worldFluid = [];
	var worldLasers = [];
	var worldMines = [];
	var worldMud = [];
	var worldStartP1 = [];
	var worldStartP2 = []; 
	var worldWalls = [];
	this.init = function(numberCode,colorCode) {
		for(var count = 0; count < maps.length; count++) {
		worldFluid.push(maps[count]["fluid"]);
		worldLasers.push(maps[count]["lasers"]);
		worldMines.push(maps[count]["mines"]);
		worldMud.push(maps[count]["mud"]);
		worldStartP1.push(maps[count]["startP1"]);
		worldStartP2.push(maps[count]["startP2"]);
		worldWalls.push(maps[count]["walls"]);
		}
		this.worldFluid = worldFluid;
		this.worldLasers = worldLasers;
		this.worldMines = worldMines;
		this.worldMud = worldMud;
		this.worldStartP1 = worldStartP1;
		this.worldStartP2 = worldStartP2;
		this.worldWalls = worldWalls;
		this.numberCode = numberCode;
		this.color = "rgb(80,160,240)";
	}
	
	this.draw = function(g) {
		g.fillStyle = "rgb(80,160,240)";
		if(this.numberCode == 0) {
			for(var count = 0; count < this.worldWalls[0].length; count++)
				g.fillRect(this.worldWalls[0][count][0],this.worldWalls[0][count][1],this.worldWalls[0][count][2],this.worldWalls[0][count][3]);
		}
	}
}





