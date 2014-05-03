
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

var tankSize = 20;
var maps =  [
	{
		fluid : [230,220],
		lasers : [40,70],
		mines : [20,60],
		mud : [40,50],
		startP1 : [20,20],
		startP2 : [680,440],
		walls : [[60,60,40,120],[60,260,200,40],[60,380,40,40],[150,380,40,40],[240,380,40,40],
	             [400,240,40,140],[540,240,40,140],[260,40,140,40],[330,140,140,40],[620,40,40,140]]
	    
	},
	{
		fluid : [200,250],
		lasers : [60,100],
		mines : [20,40],
		mud : [50,50],
		startP1 : [30,20],
		startP2 : [640,440],
		walls : [[60,60,40,120],[60,260,200,40],[60,380,40,40],[150,380,40,40],[240,380,40,40],
	             [400,240,40,140],[540,240,40,140],[260,40,140,40],[330,140,140,40],[620,40,40,140]]
	}
];

function Rectangle(x,y,width,height,colorCode,colorStyle) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = colorCode;
}

Rectangle.prototype.draw = function(context) {
	context.fillStyle = this.color;
	context.fillRect(this.x,this.y,this.width,this.height);
	context.lineWidth = 2;
};

function Tank(x,y,width,height,colorCode,colorStyle) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = colorCode;
};

Tank.prototype.draw = function(context) {
	context.fillStyle = this.color;
	context.fillRect(this.x-3,this.y-6,6,32);
	context.fillRect(this.x+18,this.y-6,6,32);
	context.strokeRect(this.x-3,this.y-6,6,32);
	context.strokeRect(this.x+18,this.y-6,6,32);
	context.fillStyle = randomColor();
	context.fillRect(this.x,this.y,this.width,this.height);
	context.strokeRect(this.x,this.y,this.width,this.height);
	var flowTurret = new Turret(this.x+10,this.y+10,randomColor());
	flowTurret.draw(context);

};

function Turret(x,y,colorCode) {
	this.x = x; 
	this.y = y;
	this.color = colorCode;
};

Turret.prototype.draw = function(context) {
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

function World(numberCode,colorCode) {
	var worldFluid = [];
	var worldLasers = [];
	var worldMines = [];
	var worldMud = [];
	var worldStartP1 = [];
	var worldStartP2 = []; 
	var worldWalls = [];
	for(var count = 0; count < maps.length; count++) {
		worldFluid.push(maps[count]["fluid"]);
		worldLasers.push(maps[count]["lasers"]);
		worldMines.push(maps[count]["mines"]);
		worldMud.push(maps[count]["mud"]);
		worldStartP1.push(maps[count]["startP1"]);
		worldStartP2.push(maps[count]["startP2"]);
		worldWalls.push(maps[count]["walls"]);
	}
	this.worldFluid = worldFluid;
	this.worldLasers = worldLasers;
	this.worldMines = worldMines;
	this.worldMud = worldMud;
	this.worldStartP1 = worldStartP1;
	this.worldStartP2 = worldStartP2;
	this.worldWalls = worldWalls;
	this.numberCode = numberCode;
	this.color = colorCode;
}

World.prototype.draw = function(context) {
	context.fillStyle = this.colorCode;
	console.log(this.numberCode);
	if(this.numberCode == 0) {
		for(var count = 0; count < this.worldWalls[0].length; count++) {
			context.fillRect(this.worldWalls[0][count][0],this.worldWalls[0][count][1],this.worldWalls[0][count][2],this.worldWalls[0][count][3]);
		}
		var flowTanksP1 = new Tank(this.worldStartP1[0][0],this.worldStartP1[0][1],tankSize,tankSize,randomColor(),randomColor(),context);
		var flowTanksP2 = new Tank(this.worldStartP2[0][0],this.worldStartP2[0][1],tankSize,tankSize,randomColor(),randomColor(),context);
		flowTanksP1.draw(context);
		flowTanksP2.draw(context);
	}
}




