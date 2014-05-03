function terrain(canvas) {
	
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

	function randomNumber(min, max) {
		return Math.random() * (max - min) + min;
	}

	var c = document.getElementById("c");
	var context = c.getContext("2d");
	var circle = function(x,y,r,dx,dy,colorCode,colorStyle,context) {
		return {
			x:x,
			y:y,
			r:r,
			dx:dx,
			dy:dy,
			color:colorCode,
			colorStyle:colorStyle,
			context:context,
			draw: function() {
				context.beginPath();
				context.arc(this.x,this.y,this.r,0,2*Math.PI,false);
				console.log(this.color);
				context.fillStyle = this.color;
				context.fill();
				context.lineWidth = 2;
				context.strokeStyle = this.colorStyle;
				context.stroke();
			},
			move: function() {
				this.x = this.x + this.dx;
				if(this.x > 770 || this.x < 10) {
					this.dx = this.dx * -1;
				}
				this.y = this.y + this.dy;
				if(this.y > 550 || this.y < 20) {
					this.dy = this.dy * -1;
				}
			}
		}
	}

	var animloop = function() {
		context.fillStyle = "#ffffff";
		for(var i = 0; i < 28; i++) {
			b[i].move();
			b[i].draw();
		}
		window.requestAnimationFrame(animloop);
	}

	var b = [];
	for(var i = 0; i < 28; i++) {
		b[i] = circle(randomInteger(30,360),randomInteger(20,550),randomInteger(2,20),randomNumber(2,3),randomNumber(2,3),randomColor(),randomColor(),context);
		b[i].draw();
	}
	window.requestAnimationFrame(animloop);
}