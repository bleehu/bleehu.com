"use strict";
(function() {
	window.onload = function()	{
		var xtoolbar = document.getElementById("toolbar");
		if(xtoolbar){
			xtoolbar.onmouseover = extend;
			xtoolbar.onmouseout = contract;
			xtoolbar.out = true;
			xtoolbar.style.left = "2px";
			setInterval(tick,20);
		} else {
			console.log(xtoolbar);
		}
	}

	function tick(){
		var xtoolbar = document.getElementById("toolbar");
		var style = window.getComputedStyle(xtoolbar);
		var x = parseInt(style.left);
		if(xtoolbar.out && x < 2){
			xtoolbar.style.left = (x + 3) + "px";
		}
		if(!xtoolbar.out && x > -144){
			xtoolbar.style.left = (x - 3) + "px";
		}
	}

	function extend(){
		var xtoolbar = document.getElementById("toolbar");
		console.log("Extend");
		xtoolbar.out = true;
	}

	function contract(){
		var xtoolbar = document.getElementById("toolbar");
		console.log("contract");
		xtoolbar.out = false;
	}

})();