
var Menu = {
	TankStats : {
		hp : [0, 300],
		friction : [0.6, 1]
	},
	Tanks : [
		["NormalTank", "Normal Tank",
			"hp,Health,1;speed,0;friction,0;turnspeed,Handling,0;weight,0"],
		["Scout", "Scout",
			"hp,Health,1;speed,0;friction,0;turnspeed,Handling,0;weight,0"],
		["Heavy", "Heavy",
			"hp,Health,1;speed,0;friction,0;turnspeed,Handling,0;weight,0"],
		["ArmoredTank", "Armored Tank",
			"hp,Health,1;speed,0;friction,0;turnspeed,Handling,0;weight,0"],
		["SpikedTank", "Spiked Tank",
			"hp,Health,1;speed,0;friction,0;turnspeed,Handling,0;weight,0;When hit, sprays out spikes randomly that do 2.5x damage taken."]
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
	setInterval(function() {
		if (menu.status != "tanks") return;
		
	}, 25);
	function showInfo(i, ind) {
		var t = Menu.Tanks[ind];
		var p = ".p"+(i+1);
		var $el = $(".tanks "+p);
		$el.find("h3").html(t[1]);
		$(this).parent().find(".active").removeClass("active");
		$(this).addClass("active");
		menu["p"+i] = ind;
	}
	for(var i=0;i<2;i++) {
		var p = ".p"+(i+1);
		var $el = $(".tanks "+p);
		var div = $("<div></div>").addClass("classes");
		menutanks[i] = [];
		for(var tt=0;tt<Menu.Tanks.length;tt++) {
			var t = Menu.Tanks[tt];
			menutanks[i].push((new window[t[0]]()));
			console.log(tt);
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






