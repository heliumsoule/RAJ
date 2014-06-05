

var Weapon = function() {
	this.fire;
}





var Turret = function(x,y,fillCode,strokeCode) {
	this.x = x; 
	this.y = y;
	this.fillCode = fillCode;
	this.strokeCode = strokeCode;
	this.draw = function(g) {
		// var r = 10;
		// var coverPoints = [[r,0],
		// 			  [r*Math.cos(Math.PI/3),r*Math.sin(Math.PI/3)],
		// 			  [-r*Math.cos(Math.PI/3),r*Math.sin(Math.PI/3)],
		// 			  [-r,0],
		// 			  [-r*Math.cos(Math.PI/3),-r*Math.sin(Math.PI/3)],
		// 			  [r*Math.cos(Math.PI/3),-r*Math.sin(Math.PI/3)],
		// 			  [r,0]];
		// g.moveTo(coverPoints[0][0],coverPoints[0][1]);
		// for(var count = 1; count < 6; count++) {
		// 	g.lineTo(coverPoints[count][0],coverPoints[count][1]);
		// }
		// g.closePath();
		// g.fillStyle = this.color;
		// g.strokeStyle = this.color;
		// g.fill();
		// g.stroke();
		// g.fillRect(2,-3,18,6);
		// g.strokeRect(2,-3,18,6);
		g.fillStyle = this.fillCode;
		g.strokeStyle = this.strokeCode;
		g.fillRect(2,-3,18,6);
		g.strokeRect(2,-3,18,6);
		g.beginPath();
		g.arc(0,0,10,0,Math.PI*2,true);
		g.fill();
	}
}
