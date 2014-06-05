
var arrBullets = [];

var World = function() {
	this.init = function() {
		this.F = new Fluid();
		this.F.W = this;
		this.F.setResolution(120,80);
		this.F.setFade(0.971);
	}
	this.initMap = function(map) {
		this.walls = [];
		this.lasers = [];
		this.tanks = [];
		this.fluids = [];
		this.muds = [];
		for(var i in map.walls) {
			this.walls.push({
				x : map.walls[i][0],
				y : map.walls[i][1],
				w : map.walls[i][2],
				h : map.walls[i][3]
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
			this.tanks.push((new NormalTank()).setup(new Point(map.tanks[i][0],map.tanks[i][1]),
															   map.tanks[i][2],
															   new Turret()));
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
		this.F.setUICallback(function(field) {
			for(var i in this.W.fluids) {
				field.setBlockVRGB(this.W.fluids[i].x,this.W.fluids[i].y,this.W.fluids[i].w,this.W.fluids[i].h,
								   this.W.fluids[i].vx,this.W.fluids[i].vy,this.W.fluids[i].c);
			}
		});
		for(var i in map.mud) {
			this.muds.push({
				x : map.mud[i][0],
				y : map.mud[i][1],
				w : map.mud[i][2],
				h : map.mud[i][3]
			})
		}
	}
	this.step = function() {
		this.fcv = this.F.update();
	}
	this.draw = function(cv, g, hid, hidg) {	
		{
			g.clearRect(0,0,cv.width,cv.height);
			hidg.drawImage(this.fcv,0,0);
			g.save();
			g.scale(6,6);
			g.drawImage(hid,0,0);
			g.restore();
		}
		for(var i in this.tanks) {
			this.tanks[i].step();
			this.tanks[i].draw(g);
			this.tanks[i].fire();
		}
		for(var count = 0; count < this.walls.length; count++) {
			g.fillStyle = "rgb(0,0,255)";
			g.fillRect(this.walls[count].x,this.walls[count].y,this.walls[count].w,this.walls[count].h);
			// for(var count = 0; stop = Math.floor(Math.random() * 20); count < stop; count++) {
			// 	g.fillStyle = "rgb(0,0,240)";
			// 	g.fillRect(this.walls[count].x + Math.floor(Math.random() * this.walls[count].w - 10),
			// 			   this.walls[count].y + Math.floor(Math.random() * this.walls[count]h.h - 10),
			// 			   4,4);
			// }
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









