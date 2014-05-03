

Function.prototype.extend = function(func) {
	return (function(f1, f2) {
		return function() {
			f1.call(this);
			f2.call(this);
		}
	})(this, func);
}


var Vector = function(x,y) {
	this.x = isNaN(x)?0:x;
	this.y = isNaN(y)?0:y;
	this.add = function(v) {
		this.x += v.x;
		this.y += v.y;
	}
	this.addC = function(x, y) {
		this.x += x;
		this.y += y;
	}
	this.addA = function(a, r) {
		this.x += Math.cos(a) * r;
		this.y += Math.sin(a) * r;
	}
	this.plus = function(v) {
		return new Vector(this.x + v.x, this.y + v.y);
	}
	this.scale = function(d) {
		this.x *= d;
		this.y *= d;
	}
	this.setC = function(x,y) {
		this.x = x;
		this.y = y;
	}
}


function calculate(p,w,h,v,W) {
	var x = p.x, y = p.y, vx = v.x, vy = v.y, we = 0;
	if (x < 0) {x = 0; vx = Math.abs(vx) *we;}
	if (x > 720-w) {x = 720-w; vx = -Math.abs(vx) *we;}
	if (y > 480-h) {y = 480-h; vy = -Math.abs(vy) *we;}
	if (y < 0) {y = 0; vy = Math.abs(vy) *we;}
	/*for(j in land) {
		var r = getResult(land[j][0],land[j][1],land[j][2],land[j][3],x,y,w,h,vx,vy);
		x = r[0]; y = r[1]; vx = r[2]; vy = r[3];
	}*/
	return {x:x,y:y,vx:vx,vy:vy};
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



