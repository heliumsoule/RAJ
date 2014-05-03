
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
var tankSize = 20;
var maps =  [
	{
		startP1 : [20,20],
		startP2 : [680,440],
		walls : [[60,60,40,120],[60,260,200,40],[60,380,40,40],[150,380,40,40],[240,380,40,40],
	             [400,240,40,140],[540,240,40,140],[260,40,140,40],[330,140,140,40],[620,40,40,140],]
	},
	{
		startP1 : [30,30],
		startP2 : [660,420],
		walls : [[0,0,50,50],[500,300,30,30]]
	}
];

function Rectangle(x,y,width,height,colorCode,colorStyle,context) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = colorCode;
	this.context = context;
}

Rectangle.prototype.draw = function() {
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
	context.fillRect(this.x-3,this.y-6,6,32);
	context.fillRect(this.x+18,this.y-6,6,32);
	context.strokeRect(this.x-3,this.y-6,6,32);
	context.strokeRect(this.x+18,this.y-6,6,32);
	context.fillStyle = randomColor();
	context.fillRect(this.x,this.y,this.width,this.height);
	context.strokeRect(this.x,this.y,this.width,this.height);
	var flowTurret = new Turret(this.x+10,this.y+10,randomColor(),this.context);
	flowTurret.draw();

};

function Turret(x,y,colorCode,context) {
	this.x = x; 
	this.y = y;
	this.color = colorCode;
	this.context = context;
};

Turret.prototype.draw = function() {
	var r = 8;
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
	context.fillRect(this.x-3,this.y-18,6,18);
	context.strokeRect(this.x-3,this.y-18,6,18);
};

function World(numberCode,colorCode,context) {
	context.fillStyle = this.color;
	if(numberCode == 0) {
		for(var count = 0; count < maps[0]["walls"].length; count++) 
			context.fillRect(maps[0]["walls"][count][0],
							 maps[0]["walls"][count][1],
							 maps[0]["walls"][count][2],
							 maps[0]["walls"][count][3]);
		var flowTankP1 = new Tank(maps[0]["startP1"][0],maps[0]["startP1"][1],tankSize,tankSize,randomColor(),randomColor(),context);
		var flowTankP2 = new Tank(maps[0]["startP2"][0],maps[0]["startP2"][1],tankSize,tankSize,randomColor(),randomColor(),context);
		flowTankP1.draw();
		flowTankP2.draw();
	}

}

var flowWorld = new World(0,randomColor(),context);



