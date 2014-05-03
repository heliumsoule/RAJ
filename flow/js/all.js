

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
}






