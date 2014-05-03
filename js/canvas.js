
function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomColor() {
	var letters = "0123456789ABCDEF";
	var color = "#";
	for(var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 15)];
	}
	return color
}

function randomNumber(min,max) {
	return Math.random() * (max - min) + min;
}

var c = document.getElementById("c");
var context = c.getContext("2d");

function Rectangle(x,y,width,height,colorCode,colorStyle,context) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = colorCode;
	this.context = context;
}

Rectangle.prototype.draw = function() {
	console.log(this.color);
	context.fillStyle = this.color;
	context.fillRect(this.x,this.y,this.width,this.height);
	context.lineWidth = 2;
};

function Tank(x,y,width,height,colorCode,colorStyle,context) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = colorCode;
	this.context = context;
};

Tank.prototype.draw = function() {
	context.fillStyle = this.color;
	context.fillRect(this.x-5,this.y-7,10,44);
	context.fillRect(this.x+25,this.y-7,10,44);
	context.strokeRect(this.x-5,this.y-7,10,44);
	context.strokeRect(this.x+25,this.y-7,10,44);
	context.fillStyle = randomColor();
	context.fillRect(this.x,this.y,this.width,this.height);
	context.strokeRect(this.x,this.y,this.width,this.height);
	var terrainTurret = new Turret(this.x+15,this.y+15,randomColor(),this.context);
	terrainTurret.draw();

};

function Turret(x,y,colorCode,context) {
	this.x = x; 
	this.y = y;
	this.color = colorCode;
	this.context = context;
};

Turret.prototype.draw = function() {
	var r = 12;
	var coverPoints = [[r,0],
				  [r*Math.cos(Math.PI/3),r*Math.sin(Math.PI/3)],
				  [-r*Math.cos(Math.PI/3),r*Math.sin(Math.PI/3)],
				  [-r,0],
				  [-r*Math.cos(Math.PI/3),-r*Math.sin(Math.PI/3)],
				  [r*Math.cos(Math.PI/3),-r*Math.sin(Math.PI/3)],
				  [r,0]];
	context.moveTo(this.x+coverPoints[0][0],this.y+coverPoints[0][1]);
	for(var count = 1; count < 6; count++) {
		context.lineTo(this.x+coverPoints[count][0],this.y+coverPoints[count][1]);
	}
	context.closePath();
	context.fillStyle = this.color;
	context.fill();
	context.strokeStyle = randomColor();
	context.stroke();
	context.fillStyle = randomColor();
	context.fillRect(this.x-5,this.y-27,10,24);
	context.strokeRect(this.x-5,this.y-27,10,24);
};


var terrainTank = new Tank(randomInteger(20,700), randomInteger(20,460), 30, 30, randomColor(), randomColor(), context);
terrainTank.draw();



