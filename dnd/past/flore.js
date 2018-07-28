"use strict";
(function() {
	
	window.onload = function() {
		var random = Math.floor((Math.random()*1000)+1);
		//request player lore xml file
		var xhttp = new XMLHttpRequest();
		xhttp.onload = lore;
		xhttp.open("GET", "flore.xml?n=" + random, true);
		xhttp.send();
	}
	
	function lore(){
		var container = document.getElementById("character");
		var xml = this.responseXML;
		var followers = xml.querySelectorAll("follower");
		var sideBar = document.getElementById("sidebar");
		//for each follower
		for(var i = 0; i < followers.length; i++){
			var follower = followers[i];
			var followerDiv = document.createElement("div");
			followerDiv.className = "player";
			//get player name and class
			var name = follower.getAttribute("name");
			var followerClass = follower.getAttribute("class");
			followerDiv.id = name;
			followerDiv.classList.add(followerClass);
			var nameTitle = document.createElement("h2");
			nameTitle.innerHTML = name;
			followerDiv.appendChild(nameTitle);
			//list follower in sidebar
			var lineItem = document.createElement("li");
			var targetLink = document.createElement("a");
			targetLink.href = "#" + name;
			targetLink.innerHTML = name;
			lineItem.appendChild(targetLink);
			sideBar.appendChild(lineItem);
			//get origin story
				//origin title
			var advTitle = document.createElement("h3");
			advTitle.innerHTML = "Origin";
			followerDiv.appendChild(advTitle);
				//origin propper
			var origin = follower.querySelector("origin");
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
			followerDiv.appendChild(originDiv);
			//finally, add new info to panel
			container.appendChild(followerDiv);
		}
		
		var bottomLineItem = document.createElement("li");
		var anchor = document.createElement("a");
		anchor.href = "#toolbar";
		anchor.innerHTML = "To Link Bar";
		bottomLineItem.appendChild(anchor);
		sideBar.appendChild(bottomLineItem);
		
	}
	
})();