
var arrBullets = [];

var World = function() {
	this.initMap = function(map) {
		this.walls = [];
		this.lasers = [];
		this.tanks = [];
		this.fluids = [];
		this.mud = [];
		this.t = [];
		this.p = [];
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
			var t = new Tank();
			t.init(window["keyBindP"+i]);
			t.p = new Point(map.tanks[i][0], map.tanks[i][1]);
			t.angle = map.tanks[i][2];
			this.tanks.push(t)
		}
		for(var i in map.fluids) {
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
		for(var i in map.mud) {
			this.fluids.push({
				x : map.mud[i][0],
				y : map.mud[i][1],
				w : map.mud[i][2],
				h : map.mud[i][3]
			})
		}
	}
	this.init = function() {
		for(i in this.tanks) {
			this.t.push((new NormalTank()).setup(new Vector(this.tanks[i].x,this.tanks[i].y), this.tanks[i].angle));
		}
		// this.t[0].init(keyBindP1);
		// this.t[1].init(keyBindP2);
	}
	this.step = function() {
		
	}
	this.draw = function(g) {
		for(var i in this.tanks) {
			this.tanks[i].step();
			this.tanks[i].draw(g);
		}
		g.fillStyle = "rgb(0,0,255)";
		for(var count = 0; count < this.walls.length; count++) {
			g.fillRect(this.walls[count].x,this.walls[count].y,this.walls[count].w,this.walls[count].h);
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









