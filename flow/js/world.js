
var arrBullets = [];

var World = function() {
	this.init = function() {
		this.F = new Fluid();
		this.FF;
		this.F.W = this;
		this.F.setResolution(120,80);
		this.F.setFade(0.971);
	}
	this.initMap = function(map) {
		this.walls = [];
		this.wallSpots = [];
		this.lasers = [];
		this.tanks = [];
		this.fluids = [];
		this.muds = [];
		this.b = [];
		for(var i in map.walls) {
			var upperBound = (0.4+0.2*Math.random()) * (map.walls[i][2] * map.walls[i][3] / 400);
			var ws = [];
			for(var iter = 0; iter < upperBound; iter++) {
				ws.push({
					x : map.walls[i][0] + Math.random() * (map.walls[i][2] - 10),
					y : map.walls[i][1] + Math.random() * (map.walls[i][3] - 10),
					w : 2 + Math.random () * 4,
					h : 2 + Math.random () * 4
				})
			}
			this.walls.push({
				x : map.walls[i][0],
				y : map.walls[i][1],
				w : map.walls[i][2],
				h : map.walls[i][3],
				wallSpots : ws			
			})
		}
		for(var i in map.lasers) {
			this.lasers.push({
				x : map.lasers[i][0],
				y : map.lasers[i][1],
				w : map.lasers[i][2],
				h : map.lasers[i][3]
			})
		}
		for(var i in map.tanks) {
			this.tanks.push((new NormalTank()).setup(this, new Point(map.tanks[i][0],map.tanks[i][1]), map.tanks[i][2],
				(i==0)?(new TripleTurret()):
					(new Turret())
			));
		}
		this.tanks[0].init(keyBindP1);
		this.tanks[1].init(keyBindP2);
		for(var i in map.fluids) {
			this.fluids.push({
				x : map.fluids[i][0],
				y : map.fluids[i][1],
				w : map.fluids[i][2],
				h : map.fluids[i][3],
				vx : map.fluids[i][4],
				vy : map.fluids[i][5],
				c : map.fluids[i][6]
			});
		}
		for(var i in map.mud) {
			this.muds.push({
				x : map.mud[i][0],
				y : map.mud[i][1],
				w : map.mud[i][2],
				h : map.mud[i][3]
			})
		}
		this.F.setUICallback(function(field) {
			for(var i in this.W.fluids) {
				field.setBlockVRGB(this.W.fluids[i].x,this.W.fluids[i].y,this.W.fluids[i].w,this.W.fluids[i].h,
								   this.W.fluids[i].vx,this.W.fluids[i].vy,this.W.fluids[i].c);
			}
		});
	}
	this.col = function(opt, p, s) {
		var alive = true;
		var o = {
			walls : true
		};
		for(var i in opt) o[i] = opt[i];
		if (p.x < 0 || p.y < 0 || p.x + s.x >= 720 || p.y + s.y >= 480) alive = false;
		if (o.walls) for(var i in this.walls)
			if (col(this.walls[i].x,this.walls[i].y,this.walls[i].w,this.walls[i].h,p.x,p.y,s.x,s.y)) alive = false;
		return !alive;
	}
	this.step = function() {
		this.fcv = this.F.update();
		for(var i in this.tanks)
			this.tanks[i].step(i==0);
		for(var i=0;i<this.b.length;i++) {
			this.b[i].step();
			if (this.b[i].destroy) this.b.splice(i--, 1);
		}
	}
	this.draw = function(cv, g, hid, hidg) {	
		if (!VECTOR_DRAW) {
			g.clearRect(0,0,cv.width,cv.height);
			hidg.drawImage(this.fcv,0,0);
			g.save();
			g.scale(6,6);
			g.drawImage(hid,0,0);
			g.restore();
		}
		for(var i in this.tanks) {
			this.tanks[i].draw(g);
		}
		for(var i in this.b) 
			this.b[i].draw(g);
		for(var count = 0; count < this.walls.length; count++) {
			g.fillStyle = "rgb(116,116,116)";
			g.fillRect(this.walls[count].x,this.walls[count].y,this.walls[count].w,this.walls[count].h);
			g.fillStyle = "rgb(88,88,88)";

			for(var iter = 0; iter < this.walls[count].wallSpots.length; iter++) {
				g.fillRect(this.walls[count].wallSpots[iter].x,this.walls[count].wallSpots[iter].y,
						   this.walls[count].wallSpots[iter].w,this.walls[count].wallSpots[iter].h);
			}
		}
	}
}









