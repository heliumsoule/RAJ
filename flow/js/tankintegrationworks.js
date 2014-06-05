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
		size : 32,
		hp : 100,
		friction : 0.85,
		speed : 20,
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

var Projectile = function() {
	this.p = new Point();
	this.v = new Vector();

	this.hasCollision = function(x,y,w,h) {

	}
	this.init = function(p) {
		this.p = p.clone();
	}
	this.step;
	this.draw;

}
var Bullet = Projectile.extend(function() {
	this.step = function(g) {

	}
	this.draw = function(g) {
		g.fillStyle = BULLETS.color;
		g.strokeStyle = BULLETS.color;
		this.p.add(this.v);
		var angle = Math.atan2(this.v.y, this.v.x);
		g.translate(this.p.x, this.p.y);
			g.rotate(angle);
				g.strokeRect(-2,-2,8,4);
			g.rotate(-angle);
		g.translate(-this.p.x,-this.p.y);
	}
	this.hasCollision = function(g) {

	}
});

var Tank = function() {
	this.p = new Point();
	this.v = new Vector();
	this.s = new Dimension(TANKS.NORMAL.size,TANKS.NORMAL.size);
	this.cp;
	this.angle = 0;
	this.MAXHP, this.FRICTION, this.SPEED;
	this.keyb;
	this.bulletTimer = 0;
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
	this.steps = [];
	this.steps.push(function() {
		if (keyv[this.keyb.left]) this.angle -= TANKS.TURNSPEED;
		if (keyv[this.keyb.right]) this.angle += TANKS.TURNSPEED;
		if (keyv[this.keyb.up] || keyv[this.keyb.down])  {
			var d = (keyv[this.keyb.up]?1:-1)*this.SPEED * 0.07;
			this.v.addA(this.angle, d);
		}
		{
			this.v.scale(this.FRICTION);
			this.p.add(this.v);
			var r = calculate(this.p, this.s, this.v);
			this.p.set(r.p);
			this.v.set(r.v);
		}
		this.cp = this.p.plus(this.s.times(0.5));
	});
	this.step = function() {
		for(var i=0;i<this.steps.length;i++)
			this.steps[i].call(this);
	}
	this.fire = function() {
		if(keyv[this.keyb.shoot]) {
			if (this.bulletTimer-- <= 0 && (this.bulletTimer = 3)) {
				var newb = new Bullet();
				newb.init(this.p.clone().addC(16,16).addA(this.angle,15));
				newb.v = (new Vector()).addA(this.angle, BULLETS.velocity);
				arrBullets.push(newb);
			}
		}
	}
	this.draw = function(g) {
		g.save();
		g.translate(this.cp.x, this.cp.y);
			g.rotate(this.angle);
				g.scale(this.s.x/32,this.s.y/32);
					g.fillStyle = TANKS.NORMAL.color['body'];
					g.strokeStyle = TANKS.NORMAL.color['body'];
					g.fillRect(-12,-12,24,24);
					g.strokeRect(-12,-12,24,24);
					g.fillStyle = TANKS.NORMAL.color['wheels'];
					g.strokeStyle = TANKS.NORMAL.color['wheels'];
					g.fillRect(-16,-18,32,8);
					g.fillRect(-16,10,32,8);
					g.strokeRect(-16,-18,32,8);
					g.strokeRect(-16,10,32,8);
					var flowTurret = new Turret(this.p.x-12,this.p.y-12,TANKS.NORMAL.color['cover'],TANKS.NORMAL.color['turret']);
					flowTurret.draw(g);
		g.restore();
	}
}

var Turret = function(x,y,fillCode,strokeCode) {
	this.x = x; 
	this.y = y;
	this.fillCode = fillCode;
	this.strokeCode = strokeCode;
	this.draw = function(g) {
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
	this.initMap = function(map) {
		this.walls = [];
		this.lasers = [];
		this.tanks = [];
		this.fluids = [];
		this.mud = [];
		this.t = [];
		this.p = [];
		for(i in map.walls) {
			this.walls.push({
				x : map.walls[i][0],
				y : map.walls[i][1],
				w : map.walls[i][2],
				h : map.walls[i][3]
			})
		}
		for(i in map.lasers) {
			this.lasers.push({
				x : map.lasers[i][0],
				y : map.lasers[i][1],
				w : map.lasers[i][2],
				h : map.lasers[i][3]
			})
		}
		for(i in map.tanks) {
			this.tanks.push({
				x : map.tanks[i][0],
				y : map.tanks[i][1],
				angle : map.tanks[i][2]
			})
		}
		for(i in map.fluids) {
			this.fluids.push({
				x : map.fluids[i][0],
				y : map.fluids[i][1],
				w : map.fluids[i][2],
				h : map.fluids[i][3],
				vx : map.fluids[i][4],
				vy : map.fluids[i][5],
				c : map.fluids[i][6]
			})
		}
		for(i in map.mud) {
			this.fluids.push({
				x : map.mud[i][0],
				y : map.mud[i][1],
				w : map.mud[i][2],
				h : map.mud[i][3]
			})
		}
	}
	this.init = function() {
		var F = new Fluid();
		F.setResolution(120,80);
		F.setFade(0.971);

		for(i in this.fluids)
		F.setUICallback(function(field) {
			field.setBlockVRGB(this.fluids[i].x,this.fluids[i].y,this.fluids[[i].w,this.fluids[i].h,
							   this.fluids[i].vx,this.fluids[i].vy,this.fluids[i].c);
		});
		
		for(i in this.tanks) {
			this.t.push((new NormalTank()).setup(new Vector(this.tanks[i].x,this.tanks[i].y), this.tanks[i].angle));
		}
		this.t[0].init(keyBindP1);
		this.t[1].init(keyBindP2);
	}

	this.draw = function(g) {
		var Lasers = [];
		if (this.numberCode != 0) return;
		g.fillStyle = this.worldColor[0];
		for(var count = 0; count < this.tanks.length; count++) {
			this.tanks[count].step();
			this.tanks[count].draw(g);
			this.tanks[count].fire();
		}
		for(var count = 0; count < this.walls.length; count++) {
			g.fillRect(this.walls[count].x,this.walls[count].y,this.walls[count].w,this.walls.[count].h);
		}
		if (!arrBullets.length) return;
		for(var count = 0; count < arrBullets.length; count++)
			if(arrBullets[count].p.x > 0 && arrBullets[count].p.x < 720 && 
			   arrBullets[count].p.y > 0 && arrBullets[count].p.y < 480) 
				arrBullets[count].draw(g);
			else {
				arrBullets.splice(count--,1);
			}
	}
}

