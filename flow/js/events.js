

var keyBindP1 = {
	primary : 49,
	secondary : 50,
	up : 87,
	right : 68,
	down : 83,
	left : 65
}

var keys = [49,50,87,68,83,65,190,191,38,39,40,37];
var keyv = [];
for(var i=0;i<keys.length;i++) keyv[i] = false;

$(function() {
	
	function checkKey(char, val) {
		for(var i=0;i<keys.length;i++)
			if (keys[i] == char) keyv[i] = val;
	}
	
	$(window).keydown(function(e) {
		checkKey(e.keyCode, true);
	});
	$(window).keyup(function(e) {
		checkKey(e.keyCode, false);
	});
	
});











