
var Menu = {
	TankStats : {
		hp : [0, 300],
		speed : [4,16],
		friction : [0, 0.4],
		turnspeed : [2 * Math.PI / 180, 8 * Math.PI / 180],
		weight : [0.6,1.5]
	},
	Tanks : [
		["NormalTank", "Normal Tank",
			"hp/Health/1;speed/0;friction/0;turnspeed/Handling/0;weight/0"],
		["Scout", "Scout",
			"hp/Health/1;speed/0;friction/0;turnspeed/Handling/0;weight/0"],
		["Heavy", "Heavy",
			"hp/Health/1;speed/0;friction/0;turnspeed/Handling/0;weight/0"],
		["ArmoredTank", "Armored Tank",
			"hp/Health/1;speed/0;friction/0;turnspeed/Handling/0;weight/0"],
		["SpikedTank", "Spiked Tank",
			"hp/Health/1;speed/0;friction/0;turnspeed/Handling/0;weight/0;When hit, sprays out spikes randomly that do 2.5x damage taken."]
	]
};

var menu = {
	status : "map",
	map : 0,
	p0 : 0,
	p1 : 1
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
	$(".map .next").click();
	
	var menutanks = [];
	var tg = $(".tanks canvas")[0].getContext("2d");
	setInterval(function() {
		if (menu.status != "tanks") return;
		tg.clearRect(0,0,720,480);
		for(var i=0;i<2;i++) {
			var x = 0, y = 0;
			for(var j=0;j<menutanks[i].length;j++) {
				var t = menutanks[i][j];
				t.cp.x = 360*i + (x+0.5)*120;
				t.cp.y = (y+0.5)*80;
				if (menu["p"+i] == j) t.angle += Math.PI * 0.009;
				t.draw(tg);
				if (++x && x > 2 && ++y) x -= 3;
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
	function showInfo(i, ind) {
		var t = Menu.Tanks[ind];
		var p = ".p"+(i+1);
		var $el = $(".tanks "+p);
		$el.find("h3").html(t[1]);
		$(this).parent().find(".active").removeClass("active");
		$(this).addClass("active");
		$i = $el.find(".info").empty();
		var stats = t[2].split(";");
		for(var i=0;i<stats.length;i++) {
			var stat = stats[i].split("/");
			if (stat.length == 1) {
				
			} else {
				var name = stat[(stat.length==3)?1:0];
				name = name.charAt(0).toUpperCase() + name.substring(1);
				if (stat.length == 3) stat.splice(1,1);
				var value = TANKS[t[0].toUpperCase()][stat[0].toUpperCase()];
				var st = statBar.clone();
				if (stat[1] == "1") {
					st.addClass("number");
					st.find(".value").html(value);
				}
				var ts = Menu.TankStats[stat[0]];
				st.find(".green").css("width",(100*(value-ts[0])/(ts[1]-ts[0]))+"%");
				st.find(".label").html(name);
				$i.append(st);
			}
		}
		menu["p"+i] = ind;
	}
	for(var i=0;i<2;i++) {
		var p = ".p"+(i+1);
		var $el = $(".tanks "+p);
		var div = $("<div></div>").addClass("classes");
		menutanks[i] = [];
		for(var tt=0;tt<Menu.Tanks.length;tt++) {
			var t = Menu.Tanks[tt];
			var tank = (new window[t[0]]()).init();
			menutanks[i].push(tank);
			div.append(
				$("<div></div>").addClass("class").addClass("nopad"+(tt?"":" active")).attr("t",tt).attr("i",i)
				.addClass("tank"+tt)
				.click(function() {
					var t = parseInt($(this).attr("t"));
					var i = parseInt($(this).attr("i"));
					showInfo.call(this, i, t);
				})
				);
		}
		$el.prepend(div);
		showInfo(i, 0);
	}
	
	
	
});






