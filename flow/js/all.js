

Function.prototype.extend = function(func) {
	return (function(f1, f2) {
		function extended() {
			f1.call(this);
			f2.call(this);
		}
		return extended;
	})(this, func);
}








