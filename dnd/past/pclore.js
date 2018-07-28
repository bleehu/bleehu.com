"use strict";
(function() {
	
	window.onload = function() {
		var random = Math.floor((Math.random()*1000)+1);
		//request player lore xml file
		var xhttp = new XMLHttpRequest();
		xhttp.onload = lore;
		xhttp.open("GET", "plore.xml?n=" + random, true);
		xhttp.send();
		//set up sidebar
		var xtoolbar = document.getElementById("sidebar");
		if(xtoolbar){
			xtoolbar.onmouseover = extend;
			xtoolbar.onmouseout = contract;
			xtoolbar.out = true;
			xtoolbar.style.left = "2px";
			setInterval(tick,20);
		} else {
			console.log(xtoolbar);
		}
		
		setInterval(tick,50);
	}
	
	/*
	Authored by Mike.
	this function handles the time-dependant functions of the
	page. At present, this only runs the smooth extending and 
	retracting the sidebar
	*/
	function tick(){
		var xtoolbar = document.getElementById("sidebar");
		var style = window.getComputedStyle(xtoolbar);
		var x = parseInt(style.left);
		if(xtoolbar.out && x < 2){
			xtoolbar.style.left = (x + 3) + "px";
		}
		if(!xtoolbar.out && x > -100){
			xtoolbar.style.left = (x - 3) + "px";
		}
	}
	
	function extend(){
		var xtoolbar = document.getElementById("sidebar");
		console.log("Extend");
		xtoolbar.out = true;
	}

	function contract(){
		var xtoolbar = document.getElementById("sidebar");
		console.log("contract");
		xtoolbar.out = false;
	}
	
	function lore(){
		var container = document.getElementById("character");
		var xml = this.responseXML;
		var players = xml.querySelectorAll("player");
		var sidebar = document.getElementById("sidebar");
		for(var i = 0; i < players.length; i++){
			var player = players[i];
			var playerDiv = document.createElement("div");
			playerDiv.className = "player";
			//get player name
			var name = player.getAttribute("name");
			var nameTitle = document.createElement("h2");
			nameTitle.innerHTML = name;
			playerDiv.appendChild(nameTitle);
			//add target link to sidebar
			var ptag = document.createElement("p");
			var atag = document.createElement("a");
			atag.href = "#" + name + "div";
			playerDiv.id = name + "div";
			atag.innerHTML = name;
			ptag.appendChild(atag);
			sidebar.appendChild(ptag);
			//get origin story
				//origin title
			var advTitle = document.createElement("h3");
			advTitle.innerHTML = "Origin";
			playerDiv.appendChild(advTitle);
				//origin propper
			var origin = player.querySelector("origin");
			var story = origin.querySelectorAll("p");
			console.log("paragraphs: " + story.length);
			var originDiv = document.createElement("div");
			for(var j = 0; j < story.length; j++){
				var p = story[j].textContent;
				var paragraph = document.createElement("p");
				paragraph.innerHTML = p;
				originDiv.appendChild(paragraph);
			}
			originDiv.className = "origin";
			playerDiv.appendChild(originDiv);
			//Assemble adventures
				//adventure title
			var advTitle = document.createElement("h3");
			advTitle.innerHTML = "Adventures";
			playerDiv.appendChild(advTitle);
				//adventure list
			var adventures = player.querySelectorAll("adventure");
			var advList = document.createElement("ul");
			for(var j = 0; j < adventures.length; j++){
				var li = adventures[j].textContent;
				var item = document.createElement("li");
				item.innerHTML = li;
				advList.appendChild(item);
			}
			playerDiv.appendChild(advList);
			//finally, add new info to panel
			container.appendChild(playerDiv);
		}
	}
})();