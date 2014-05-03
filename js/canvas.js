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
	context.rect(this.x,this.y,this.width,this.height);
	console.log(this.color);
	context.fillStyle = this.color;
	context.fill();
	context.lineWidth = 2;
}

var terrainBoxes = [];
for(var i = 0; i < 2; i++) {
	terrainBoxes[i] = new Rectangle(randomInteger(0,40) + randomInteger(20,750), randomInteger(20,500), randomInteger(20,100), 
									randomInteger(20,200), randomColor(), randomColor(), context);
	terrainBoxes[i].draw();
}

var terrainTank = new Tank(randomInteger(0,40) + randomInteger(20,750), randomInteger(20,500), randomInteger(20,60),
 					   	   randomInteger(20,60), randomColor(), randomColor(), context);
terrainTank.draw();



