var keyBindP1 = {
	primary : 75,
	secondary : 76,
	up : 38,
	right : 39,
	down : 40,
	left : 37,
	/*up : 73,
	right : 76,
	down : 75,
	left : 74,*/
	shoot : 16
}
var keyBindP2 = {
	primary : 49,
	secondary : 50,
	up : 87,
	right : 68,
	down : 83,
	left : 65,
	shoot : 32
}

var keys = [16,49,50,87,68,83,65,75,76,38,39,40,37,32]; // 73,74,75,76   190,191
var keyv = [];
for(var i=0;i<keys.length;i++) keyv[i] = false;

$(function() {
	
	function checkKey(e, char, val) {
		for(var i=0;i<keys.length;i++)
			if (keys[i] == char) {
				e.preventDefault();
				keyv[i] = val;
			}
	}
	
	$(window).keydown(function(e) {
		checkKey(e, e.keyCode, true);
	});
	$(window).keyup(function(e) {
		checkKey(e, e.keyCode, false);
	});
	
});











