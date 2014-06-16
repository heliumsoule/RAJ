
var Menu = {
	
};

var menu = {
	status : "map",
	map : 0,
	p0 : 0,
	p1 : 0,
	w0 : [-1,-1],
	w1 : [-1,-1]
};

$(function() {
	$(".map .button").click(function() {
		if (menu.status != "map") return;
		if ($(this).hasClass("next")) {
			menu.status = "tanks";
			$("#sel").animate({
				left:"-100%"
			},500);
		} else {
			var change = $(this).hasClass("left")?-1:1;
			menu.map = (menu.map + change + maps.length) % maps.length;
			$(".map h2").html("Map "+(1+menu.map));
		}
	});
	
	var menustuff = [
		[120,80,3],
		[90,60,4]
	];
	for(var boxes = 0; boxes < 2; boxes++) {
		(function(){
			var B = boxes?"weapons":"tanks";
			var BC = B.charAt(0).toUpperCase() + B.substring(1);
			var BCC = B.toUpperCase();
			var WW = !!boxes;
			var MS = menustuff[boxes];
			var menuboxes = [];
			var tg = $("."+B+" canvas")[0].getContext("2d");
			setInterval(function() {
				if (menu.status != B) return;
				tg.clearRect(0,0,720,480);
				for(var i=0;i<2;i++) {
					var x = 0, y = 0;
					for(var j=0;j<menuboxes[i].length;j++) {
						var t = menuboxes[i][j];
						tg.save();
							tg.translate(360*i + (x+0.5)*MS[0], (y+0.5)*MS[1]);
								if ((WW && (menu["w"+i][0] == j || menu["w"+i][1] == j)) ||
									(!WW && (menu["p"+i] == j))) t.fangle += Math.PI * 0.009;
								tg.rotate(t.fangle);
									t.draw(tg);
						tg.restore();
						if (++x && x > MS[2]-1 && ++y) x -= MS[2];
					}
				}
			}, 25);
			var statBar = $("<div></div>").addClass("stat").append(
				$("<div></div>").addClass("label"),
				$("<div></div>").addClass("bar").append(
					$("<div></div>").addClass("green")
				),
				$("<div></div>").addClass("value")
			)
			function showInfo(i, ind, wind) {
				var t = Menu[BC][ind];
				var p = ".p"+(i+1);
				var $el = $("."+B+" "+p);
				var letter = "";
				if (WW) {
					var wi = isNaN(wind)?0:wind;
					if (isNaN(wind) && (menu["w"+i][0] == ind || menu["w"+i][1] == ind)) return;
					if (isNaN(wind) && menu["w"+i][0] >= 0) showInfo(i, menu["w"+i][0], 1);
					menu["w"+i][wi] = ind;
					letter = wi?".b":".a";
				} else
					menu["p"+i] = ind;
				$(this).parent().find(".active, .active1, .active0").removeClass("active active1 active0");
				if (WW) {
					for(var j in menu["w"+i])
						$(this).parent().find("."+B+""+menu["w"+i][j]).addClass("active"+j);
				} else $(this).addClass("active");
				$el.find("h3"+letter).html(t[1]);
				$i = $el.find(".info"+letter).empty();
				var stats = t[2].split(";");
				for(var i=0;i<stats.length;i++) {
					var stat = stats[i].split("/");
					if (stat.length == 1) {
						$i.append(
							$("<div></div>").addClass("blurb").html(stat)
						);
					} else {
						var name = stat[(stat.length==3)?1:0];
						name = name.charAt(0).toUpperCase() + name.substring(1);
						if (stat.length == 3) stat.splice(1,1);
						var value = window[BCC][t[0].toUpperCase()][stat[0].toUpperCase()];
						if (isNaN(value)) value = (value[0] + value[1]) / 2;
						var st = statBar.clone();
						if (stat[1] == "1") {
							st.addClass("number");
							st.find(".value").html(value);
						}
						var ts = Menu[BC+"Stats"][stat[0]];
						st.find(".green").css("width",(100*(value-ts[0])/(ts[1]-ts[0]))+"%");
						st.find(".label").html(name);
						$i.append(st);
					}
				}
			}
			for(var i=0;i<2;i++) {
				var p = ".p"+(i+1);
				var $el = $("."+B+" "+p);
				var div = $("<div></div>").addClass("classes");
				menuboxes[i] = [];
				for(var tt=0;tt<Menu[BC].length;tt++) {
					var t = Menu[BC][tt];
					var box = (new window[t[0]]());
					if (box.init) box.init();
					box.fangle = 0;
					box.p = new Point(0,100);
					box.drawHealthbar = false;
					menuboxes[i].push(box);
					div.append(
						$("<div></div>").addClass("class").addClass("nopad"+(((WW&&tt>1)||(!WW&&tt))?"":" active"+(WW?tt:""))).attr("t",tt).attr("i",i)
						.addClass(B+tt)
						.click(function() {
							var t = parseInt($(this).attr("t"));
							var i = parseInt($(this).attr("i"));
							showInfo.call(this, i, t);
						})
						);
				}
				$el.prepend(div);
				if (WW) {
					showInfo(i, 0, 0);
					showInfo(i, 1, 1);
				} else
					showInfo(i, 0);
			}
		})();
	}
	$(".tanks .next").click(function() {
		menu.status = "weapons";
		$("#sel").clearQueue().animate({
			left:"-200%"
		},500);
	});
	$(".weapons .next").click(function() {
		menu.status = "weapons";
		$("#sel").clearQueue().animate({
			opacity:0
		},500);
		startGame();
	});
	
	
});






