function randomColor() {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for(var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 15)];
	}
	return color
}

function fadeOutRectangle(x, y, w, h, context, r, g, b) {
    var steps = 50,
        dr = (255 - r) / steps,
        dg = (255 - g) / steps,
        db = (255 - b) / steps,
        i = 0,
        interval = setInterval(function() {
            context.fillStyle = 'rgb(' + Math.round(r + dr * i) + ','
                                   + Math.round(g + dg * i) + ','
                                   + Math.round(b + db * i) + ')';
            context.fillRect(x, y, w, h);
            i++;
            if(i === steps) {
                clearInterval(interval);
            }
        }, 30);
}

var TANKS = {
	NORMAL : {
		hp : 100,
		friction : 0.85,
		speed : 10,
		size : 24,
		color : {'body' : '#527A7A', 
				 'wheels' : "#336699", 
				 'turret' : '#0066CC', 
				 'cover' : '#3385D6' }
	},
	TURNSPEED : 5 * Math.PI / 180
}

var BULLETS = {
	velocity : 10,
	friction : .70,
	color : '#FFFFFF',
	width : 6,
	height : 3
}

var arrBullets = [];

var Bullets = function(position,angle) {
	this.p = new Vector(position.x,position.y);
	this.p = new Vector(position.x + TANKS.NORMAL.size / 2 * Math.sin(angle),position.y + TANKS.NORMAL.size / 2 * Math.cos(angle));
	this.v = new Vector(BULLETS.speed * Math.cos(angle),BULLETS.speed * BULLETS.speed * Math.sin(angle));
	this.angle = angle;
	this.draw = function(g) {
		g.fillStyle = BULLETS.color;
		g.strokeStyle = BULLETS.color;
		this.p.x = this.p.x + BULLETS.velocity * Math.cos(this.angle);
		this.p.y = this.p.y + BULLETS.velocity * Math.sin(this.angle);
		g.fillRect(this.p.x,this.p.y,BULLETS.width,BULLETS.height);
		g.strokeRect(this.p.x,this.p.y,BULLETS.width,BULLETS.height);
	}
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
	this.fire = function() {
		// var bulletArr = new Vector();
		// bulletArr.p.x = this.p.x + Math.cos(this.angle - Math.PI) * TANKS.NORMAL.size;
		// bulletArr.p.y = this.p.y + Math.sin(this.angle) * TANKS.NORMAL.size;
		if(keyv[this.keyb.shoot]) arrBullets.push(new Bullets(bulletArr.p,this.angle));
	}
	this.draw = function(g) {
		g.translate(this.p.x+15, this.p.y+15);
			g.rotate(this.angle);
				g.fillStyle = TANKS.NORMAL.color['body'];
				g.strokeStyle = TANKS.NORMAL.color['body'];
				g.fillRect(-12,-12,TANKS.NORMAL.size,TANKS.NORMAL.size);
				g.strokeRect(-12,-12,TANKS.NORMAL.size,TANKS.NORMAL.size);
				g.fillStyle = TANKS.NORMAL.color['wheels'];
				g.strokeStyle = TANKS.NORMAL.color['wheels'];
				g.fillRect(-16,-18,32,8);
				g.fillRect(-16,10,32,8);
				g.strokeRect(-16,-18,32,8);
				g.strokeRect(-16,10,32,8);
				var flowTurret = new Turret(this.p.x-12,this.p.y-12,TANKS.NORMAL.color['cover'],TANKS.NORMAL.color['turret']);
				flowTurret.draw(g);
			g.rotate(-this.angle);
		g.translate(-this.p.x-15, -this.p.y-15);
	}
}

var Turret = function(x,y,fillCode,strokeCode) {
	this.x = x; 
	this.y = y;
	this.fillCode = fillCode;
	this.strokeCode = strokeCode;
	this.draw = function(g) {
		// var r = 10;
		// var coverPoints = [[r,0],
		// 			  [r*Math.cos(Math.PI/3),r*Math.sin(Math.PI/3)],
		// 			  [-r*Math.cos(Math.PI/3),r*Math.sin(Math.PI/3)],
		// 			  [-r,0],
		// 			  [-r*Math.cos(Math.PI/3),-r*Math.sin(Math.PI/3)],
		// 			  [r*Math.cos(Math.PI/3),-r*Math.sin(Math.PI/3)],
		// 			  [r,0]];
		// g.moveTo(coverPoints[0][0],coverPoints[0][1]);
		// for(var count = 1; count < 6; count++) {
		// 	g.lineTo(coverPoints[count][0],coverPoints[count][1]);
		// }
		// g.closePath();
		// g.fillStyle = this.color;
		// g.strokeStyle = this.color;
		// g.fill();
		// g.stroke();
		// g.fillRect(2,-3,18,6);
		// g.strokeRect(2,-3,18,6);
		g.fillStyle = this.fillCode;
		g.strokeStyle = this.strokeCode;
		g.fillRect(2,-3,18,6);
		g.strokeRect(2,-3,18,6);
		g.beginPath();
		g.arc(0,0,10,0,Math.PI*2,true);
		g.fill();
	}
}

var Laser = function(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.fillCode = '#B20000';
	this.strokeCode = '#B20000';
	this.draw = function(g) {
		g.fillStyle = this.fillCode;
		g.strokeStyle = this.strokeStyle;
		g.fillRect(x,y,width,height);
		g.strokeRect(x,y,width,height);
		// fadeOutRectangle(x,y,width,height, context, 123,213,312);
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
	var worldColor = [];
	var worldFluid = [];
	var worldLasers = [];
	var worldMines = [];
	var worldMud = [];
	var worldStartP1 = [];
	var worldStartP2 = []; 
	var worldWalls = [];
	this.init = function(numberCode,colorCode) {
		for(var count = 0; count < maps.length; count++) {
		worldColor.push(maps[count]['color']);
		worldFluid.push(maps[count]['fluid']);
		worldLasers.push(maps[count]['lasers']);
		worldMines.push(maps[count]['mines']);
		worldMud.push(maps[count]['mud']);
		worldStartP1.push(maps[count]['startP1']);
		worldStartP2.push(maps[count]['startP2']);
		worldWalls.push(maps[count]['walls']);
		}
		this.worldColor = worldColor;
		this.worldFluid = worldFluid;
		this.worldLasers = worldLasers;
		this.worldMines = worldMines;
		this.worldMud = worldMud;
		this.worldStartP1 = worldStartP1;
		this.worldStartP2 = worldStartP2;
		this.worldWalls = worldWalls;
		this.numberCode = numberCode;
	}
	
	this.draw = function(g) {
		var Lasers = [];
		if (this.numberCode != 0) return;
		g.fillStyle = this.worldColor[0];
		for(var count = 0, tick = this.worldWalls[0].length; count < tick; count++) {
			g.fillRect(this.worldWalls[0][count][0],this.worldWalls[0][count][1],this.worldWalls[0][count][2],this.worldWalls[0][count][3]);
		}
		for(var count = 0, tick = this.worldLasers[0].length; count < tick; count++) {
			Lasers[count] = new Laser(this.worldLasers[0][count][0],this.worldLasers[0][count][1],this.worldLasers[0][count][2],this.worldLasers[0][count][3]);
		}
		if (!arrBullets.length) return;
		for(var count = 0, tick = arrBullets.length; count < tick; count++)
			if(arrBullets[count].p.x > 0 && arrBullets[count].p.x < 720 && 
			   arrBullets[count].p.y > 0 && arrBullets[count].p.y < 480) 
				arrBullets[count].draw(g);
			else {
				arrBullets.splice(count,1);
				tick = tick - 1;
				count = count - 1;
			}
	}

}





