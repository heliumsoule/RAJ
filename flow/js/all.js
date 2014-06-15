Function.prototype.extend = function(func) {
	return (function(f1, f2) {
		return function() {
			f1.call(this);
			f2.call(this);
		}
	})(this, func);
}


var Vector = Point = Dimension = function(x,y) {
	this.x = isNaN(x)?0:x;
	this.y = isNaN(y)?0:y;
	this.clone = function() {
		return new Vector(this.x,this.y);
	}
	this.add = function(v) {
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	this.addC = function(x, y) {
		this.x += x;
		this.y += y;
		return this;
	}
	this.addA = function(a, r) {
		this.x += Math.cos(a) * r;
		this.y += Math.sin(a) * r;
		return this;
	}
	this.plus = function(v) {
		return new Vector(this.x + v.x, this.y + v.y);
	}
	this.minus = function(v) {
		return new Vector(this.x - v.x, this.y - v.y);
	}
	this.scale = function(d) {
		this.x *= d;
		this.y *= d;
		return this;
	}
	this.times = function(d) {
		return new Vector(this.x * d, this.y * d);
	}
	this.set = function(v) {
		this.x = v.x;
		this.y = v.y;
	}
	this.setC = function(x,y) {
		this.x = x;
		this.y = y;
	}
	this.magnitude = function() {
		return Math.sqrt(this.x*this.x+this.y*this.y);
	}
	this.cross = function(v) {
		return this.x*v.y - this.y*v.x;
	}
}

function randomColor() {
	return '#'+Math.random().toString(16).substring(2, 8);
}

function LineLinePVPP(a, av, b, c) {
	return LineLine(a, av, b, c.plus(b.clone().scale(-1)));
}
function LineLine(p, r, q, s) {
	var qminusp = q.minus(p), rcrosss = r.cross(s)+0.00001;
	return [
		qminusp.cross(s) / rcrosss,
		qminusp.cross(r) / rcrosss
	];
}

function col(x1,y1,w1,h1,x2,y2,w2,h2) {
	return x1<=x2+w2&&x1+w1>=x2&&y1<=y2+h2&&y1+h1>=y2;
}
function DBP(x1,y1,x2,y2) {
	return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
}
function calculate(p,s,v,W,id) {
	var x = p.x, y = p.y, vx = v.x, vy = v.y, w = s.x, h = s.y, we = 0, pp, vv;
	if (x < 0) {x = 0; vx = Math.abs(vx) *we;}
	if (x > 720-w) {x = 720-w; vx = -Math.abs(vx) *we;}
	if (y > 480-h) {y = 480-h; vy = -Math.abs(vy) *we;}
	if (y < 0) {y = 0; vy = Math.abs(vy) *we;}
	for(j in W.walls) {
		var r = getResult(W.walls[j].x,W.walls[j].y,W.walls[j].w,W.walls[j].h,x,y,w,h,vx,vy);
		x = r[0]; y = r[1]; vx = r[2]; vy = r[3];
	}
	for(j in W.tanks) {
		if (id == W.tanks[j].ID) continue;
		var r = getResult(W.tanks[j].p.x,W.tanks[j].p.y,W.tanks[j].s.x,W.tanks[j].s.y,x,y,w,h,vx,vy);
		x = r[0]; y = r[1]; vx = r[2]; vy = r[3];
	}
	return {p:new Point(x,y),v:new Vector(vx,vy)};
}
function getResult(lx,ly,lw,lh,ox,oy,w,h,ovx,ovy) {
	var x=ox,y=oy,vx=ovx,vy=ovy, we = 0;
	if (col(lx,ly,lw,lh,x,y,w,h)) {col2=true;
		// GENERATE THE CLOSEST POINTS TO MOVE THE OBJECTS OUTSIDE
		pdes = [[lx-w/2,y+h/2,0],[lx+lw+w/2,y+h/2,2],
				[x+w/2,ly-h/2,1],[x+w/2,ly+lh+h/2,3]];
		dist=9999999; pdesi = -1;
		for(jkk in pdes) {
			pdis=DBP(x+w/2,y+h/2,pdes[jkk][0],pdes[jkk][1]);
			if (pdis < dist) {
				dist = pdis;
				pdesi = jkk;
			}
		}
		x = pdes[pdesi][0] - w/2;
		y = pdes[pdesi][1] - h/2;
		switch (pdes[pdesi][2]) {
			case 0: vx=-Math.abs(vx) *we; break;
			case 1: vy=-Math.abs(vy) *we; break;
			case 2: vx=Math.abs(vx) *we; break;
			case 3: vy=Math.abs(vy) *we; break;
		}
	}
	return [x,y,vx,vy];
}



