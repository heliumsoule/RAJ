

var World = function() {
	var worldColor = [];
	var worldFluid = [];
	var worldLasers = [];
	var worldMines = [];
	var worldMud = [];
	var worldStartP1 = [];
	var worldStartP2 = []; 
	var worldWalls = [];
	this.init = function(numberCode,colorCode) {
		for(var count = 0; count < maps.length; count++) {
		worldColor.push(maps[count]['color']);
		worldFluid.push(maps[count]['fluid']);
		worldLasers.push(maps[count]['lasers']);
		worldMines.push(maps[count]['mines']);
		worldMud.push(maps[count]['mud']);
		worldStartP1.push(maps[count]['startP1']);
		worldStartP2.push(maps[count]['startP2']);
		worldWalls.push(maps[count]['walls']);
		}
		this.worldColor = worldColor;
		this.worldFluid = worldFluid;
		this.worldLasers = worldLasers;
		this.worldMines = worldMines;
		this.worldMud = worldMud;
		this.worldStartP1 = worldStartP1;
		this.worldStartP2 = worldStartP2;
		this.worldWalls = worldWalls;
		this.numberCode = numberCode;
	}
	
	this.draw = function(g) {
		var Lasers = [];
		if (this.numberCode != 0) return;
		g.fillStyle = this.worldColor[0];
		for(var count = 0, tick = this.worldWalls[0].length; count < tick; count++) {
			g.fillRect(this.worldWalls[0][count][0],this.worldWalls[0][count][1],this.worldWalls[0][count][2],this.worldWalls[0][count][3]);
		}
		for(var count = 0, tick = this.worldLasers[0].length; count < tick; count++) {
			Lasers[count] = new Laser(this.worldLasers[0][count][0],this.worldLasers[0][count][1],this.worldLasers[0][count][2],this.worldLasers[0][count][3]);
		}
		if (!arrBullets.length) return;
		for(var count = 0, tick = arrBullets.length; count < tick; count++)
			if(arrBullets[count].p.x > 0 && arrBullets[count].p.x < 720 && 
			   arrBullets[count].p.y > 0 && arrBullets[count].p.y < 480) 
				arrBullets[count].draw(g);
			else {
				arrBullets.splice(count,1);
				tick = tick - 1;
				count = count - 1;
			}
	}

}




