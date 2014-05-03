

Function.prototype.extend = function(func) {
	return (function(f1, f2) {
		return function() {
			f1.call(this);
			f2.call(this);
		}
	})(this, func);
}








