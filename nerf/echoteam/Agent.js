function switchTheme(){
	x=document.getElementById("style");
	theme1 = "echo.css";
	theme2 = "carlycamo.css";
	if(x.href.search("echo.css") == -1){
		x.href = theme1;
	} else {
		x.href = theme2;
	}
	//alert(x.href.search("W3Schools"));
}

function initialize(){
	var ticker = document.getElementById("ticker");
	ticker.style.height = "32px";
	ticker.style.overflow = "hidden";
	ticker.style.postition = "relative";
	var width = -900;
	var news = ["Get ready for Fall Zombies!",
				"If you're looking for a new gun for the new year, Try Nerf N' Turf!",
				"Have a great, safe summer!",
				"Tensions in Black Diamond are rising.",
				"Operation StormFront: Mission Sucessful!",
				"Operation Firestorm: Mission sucessful!",
				"Operation Maelstrom in developement.",
				"<a href=\"guns.php\">New Website update: Guns Section!</a>",
				"If you know someone who would enjoy playing with us next fall, say so!"];
	for(var i = 0; i < news.length; i++){
		var headline1 = document.createElement("div");
		headline1.className = "headline";
		headline1.innerHTML = news[i];
		headline1.style.color = "#FFFFFF";
		headline1.style.backgroundColor = "#005100";
		headline1.style.overflow = "hidden";
		headline1.style.whiteSpace = "nowrap";
		headline1.style.margin = "4px";
		headline1.style.padding = "3px";
		headline1.style.position = "absolute";
		headline1.style.left = width + "px";
		ticker.appendChild(headline1);
		width += 14 + parseInt(window.getComputedStyle(headline1).width);
	}
	
	setInterval(tick, 50);
}

function tick(){
	var headline = document.querySelectorAll(".headline");
	for(var i = 0; i < headline.length; i++){
		
		var style1 = window.getComputedStyle(headline[i]);
		//window.innerWidth caused issues when window was resized while ticker was
		//running
		if(parseInt(style1.left) < 2200){
				headline[i].style.left = (parseInt(style1.left) + 1) + "px";
			} else {
				headline[i].style.left = (-1 * 900) + "px";
			}
	}
}

window.onload = initialize;