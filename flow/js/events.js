var keyBindP1 = {
	shoot : 48,
	switch : 189,
	/*up : 38,
	right : 39,
	down : 40,
	left : 37,*/
	up : 73,
	right : 76,
	down : 75,
	left : 74
}
var keyBindP2 = {
	shoot : 16,
	switch : 90,
	up : 87,
	right : 68,
	down : 83,
	left : 65
}

var keys = [16,48,65,68,73,74,75,76,83,87,90,189];
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
	
	$(window).keydown(function(e) {//console.log(e.keyCode);
		checkKey(e, e.keyCode, true);
	});
	$(window).keyup(function(e) {
		checkKey(e, e.keyCode, false);
	});
	
});











