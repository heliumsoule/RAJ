
var arrBullets = [];

var World = function() {
	this.init = function() {
		this.F = new Fluid();
		this.FF;
		this.F.W = this;
		this.F.setResolution(120,80);
		this.F.setFade(0.971);
		this.sw = [];
	}
	this._t = function(p) {
		return Math.floor(p/6);
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
					x : Math.random() * (map.walls[i][2] - 10),
					y : Math.random() * (map.walls[i][3] - 10),
					w : 2 + Math.random () * 4,
					h : 2 + Math.random () * 4
				})
			}
			var path = false, paths, onPath = 0, patht = 0;
			if (map.walls[i][4]) {
				path = [], paths = [];
				var pathpoints = map.walls[i][4];
				var lastSpeed = 0;
				for(var j=0;j<pathpoints.length;j++) {
					var pp = pathpoints[j];
					if (!isNaN(pp)) {
						if (j == 0) onPath = pp;
						else patht = pp;
						continue;
					}
					if (pp.length == 3) lastSpeed = pp[2];
					path.push(new Point(pp[0], pp[1]));
					paths.push(lastSpeed);
				}
			}
			this.walls.push({
				OBJECT : "WALL",
				x : map.walls[i][0], ox : map.walls[i][0],
				y : map.walls[i][1], oy : map.walls[i][1],
				w : map.walls[i][2],
				h : map.walls[i][3],
				path : path,
				paths : paths,
				onPath : onPath,
				patht : patht,
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
		for(var i=0;i<map.tanks.length;i++) {
			/*this.tanks.push( ((i==1)?(new SpikedTank()):(new Scout()))
				.setup(this, new Point(map.tanks[i][0],map.tanks[i][1]), map.tanks[i][2],
					(i==1)?([new Laser(), new Minigun()]):
						([new Laser(), new Shotgun()])
				));*/
			this.tanks.push( (new window[Menu.Tanks[menu["p"+i]][0]]())
				.setup(this, new Point(map.tanks[i][0],map.tanks[i][1]), map.tanks[i][2],
					[new window[Menu.Weapons[menu["w"+i][0]][0]](), new window[Menu.Weapons[menu["w"+i][1]][0]]()]
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
	this.explode = function(x,y,dmg,opt) {
		if (!opt) opt = {};
		var o = { shockwave : true, ID : -1 };
		for(var i in opt) o[i] = opt[i];
		var r = 20 + 30 * Math.pow(((dmg > 20) ? (dmg/10) : 2) - 2, 0.5);
		for(var i in this.tanks) {
			var t = this.tanks[i];
			if (t.ID == o.ID) continue;
			var dist = Math.max(0, DBP(t.cp.x,t.cp.y,x,y) - (t.s.x+t.s.y)/4);
			if (dist > r) continue;
			var ratio = (r - dist) / r;
			t.hit(ratio * dmg);
		}
		if (opt.shockwave !== false) this.createShockwave(x, y, [255,255,255], r, dmg);
		for(var i in this.b) {
			var Wb = this.b[i];
			if (Wb.destroy) continue;
			if(col(Wb.p.x,Wb.p.y,Wb.s.x,Wb.s.y,x,y,r,r)) {
				var dist = Math.max(0, DBP(Wb.p.x,Wb.p.y,x,y) - (Wb.s.x+Wb.s.y)/4);
				console.log(dist + " " + r);
				if (dist > r) continue;
				var ratio = (r - dist) / r; 	
				Wb.hp -=  ratio * dmg;
				console.log(i + " " + Wb.hp);
			}
		}
	}
	this.createShockwave = function(x,y,color,r,p) {
		var pp = isNaN(p)?r:p
		this.sw.push({
			x : x,
			y : y,
			r : 10+p,
			color : color,
			prog : 0
		});
		for(var i in this.tanks) {
			var t = this.tanks[i];
			var dist = Math.max(0, DBP(t.cp.x,t.cp.y,x,y) - (t.s.x+t.s.y)/4);
			if (dist > r) continue;
			var ang = Math.atan2(t.cp.y-y, t.cp.x-x);
			var ratio = (r - dist) / r;
			t.v.addA(ang, ratio*pp * 0.66 / t.weight);
		}
	}
	this.step = function() {
		this.F.clearDisable();
		for(var i in this.walls) {
			var w = this.walls[i];
			this.F.disableBlock(this._t(w.x), this._t(w.y), this._t(w.w), this._t(w.h));
		}
		this.fcv = this.F.update();
		for(var i in this.tanks)
			this.tanks[i].step(i==0);
		for(var i=0;i<this.b.length;i++) {
			this.b[i].step();
			if (this.b[i].destroy) {
				this.b[i].kill();
				this.b.splice(i--, 1);
			}
		}
		for(var i in this.walls) {
			var w = this.walls[i];
			if (w.path !== false) {
				var a = w.path[w.onPath];
				var b = w.path[(w.onPath+1)%w.path.length];
				var dist = DBP(a.x, a.y, b.x, b.y);
				w.patht = Math.min(1, w.patht + w.paths[w.onPath] / dist);
				w.x = w.ox + a.x + (b.x - a.x) * w.patht;
				w.y = w.oy + a.y + (b.y - a.y) * w.patht;
				if (w.patht >= 1) {
					w.onPath = (w.onPath+1) % w.path.length;
					w.patht = 0;
				}
			}
		}
		for(var i=0;i<this.sw.length;i++) {
			var sw = this.sw[i];
			sw.prog = Math.min(sw.prog+0.08, 1);
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
		for(var count = 0; count < this.walls.length; count++) {
			var w = this.walls[count];
			g.translate(w.x, w.y);
				g.fillStyle = "rgb(60,60,60)";
				g.fillRect(0,0,w.w,w.h);
				g.fillStyle = "rgb(88,88,88)";
				for(var iter = 0; iter < w.wallSpots.length; iter++)
					g.fillRect(w.wallSpots[iter].x,w.wallSpots[iter].y,
							   w.wallSpots[iter].w,w.wallSpots[iter].h);
			g.translate(-w.x, -w.y);
		}
		for(var i in this.tanks) {
			this.tanks[i].draw(g);
		}
		for(var i in this.b) 
			this.b[i].draw(g);
		for(var i=0;i<this.sw.length;i++) {
			var sw = this.sw[i];
			g.fillStyle = "rgba("+sw.color.join(",")+","+(1-sw.prog)+")";
			g.beginPath();
			g.arc(sw.x,sw.y,sw.prog*sw.r,0,2*Math.PI);
			g.fill();
			if (sw.prog >= 1) this.sw.splice(i--, 1);
		}
	}
}









