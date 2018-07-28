"use strict";
(function() {
	window.onload = function() {
		
		//load adventures
		var random = Math.floor((Math.random()*1000)+1);
		var xhttp = new XMLHttpRequest();
		xhttp.onload = loadAdventures;
		xhttp.open("GET", "adventures.xml?n=" + random, true);
		xhttp.send();
		//load available dates
		var dxhttp = new XMLHttpRequest();
		dxhttp.onload = loadDays;
		dxhttp.open("GET", "days.xml?n=" + random, true);
		dxhttp.send();
		//suggestion submit button 
		var submitButton = document.getElementById("submit");
		submitButton.onclick = addSuggestion;
		
		//begin discussion requests and button wiring
		var request2 = new XMLHttpRequest();
			request2.onload = loadDiscussion;
			request2.open("GET", "discussion.txt?n=" + random, true);
			request2.send();
			
		var button = document.getElementById("submitComment");
			button.onclick = sendComment;
		//end discussion loading
		
		var loginButton = document.getElementById("logButton");
		if(loginButton){
			loginButton.onclick = login;
		}
	};
	
	function loadAdventures() {
		var adventures = document.getElementById("adventures");
		adventures.style.display = "block";
		var xmlDoc = this.responseXML;
		//get adventures
		var xmlAdventures = xmlDoc.getElementsByTagName("adventure");
		for (var i = 0; i < xmlAdventures.length; i++) {
			var adventure = xmlAdventures[i];
			//create relevant data holders
			var title = document.createElement("h3");
			var description = document.createElement("p");
			var size = document.createElement("p");
			var start = document.createElement("p");
			var div = document.createElement("div");
			//fill data holders
			div.className = "adventure";
			//assess type of adventure
			var solo = adventure.getAttribute("solo");
			if(solo == "true"){
				div.classList.add("solo");
			}
			//set title and size tags
			var adventureTitleTag = adventure.querySelector("name");
			var adventureTitle = adventureTitleTag.textContent;
			console.log(adventureTitle);
			title.innerHTML = adventureTitle;
			var sizeTag	= adventure.querySelector("size");
			var adventureSize = sizeTag.textContent;
			size.innerHTML = "<strong>Party Size:</strong> " + adventureSize;
			var startTag = adventure.querySelector("location");
			if(startTag){
				var adventureStart = startTag.textContent;
				start.innerHTML = "<strong>Starting Location:</strong> " + adventureStart;
			} else {
				start.innerHTML = "unknown location";
			}
			var descriptionTag = adventure.querySelector("description");
			var adventureD = descriptionTag.textContent;
			description.innerHTML = "<strong>Discription:</strong> " +adventureD;
			//append adventure
			div.appendChild(title);
			div.appendChild(size);
			div.appendChild(start);
			div.appendChild(description);
			adventures.appendChild(div);
		}
	}
	
	function loadDays() {
		var days = document.getElementById("days");
		days.style.display = "block";
		var xmlDoc = this.responseXML;
		//get DMs
		var xmlDMs = xmlDoc.getElementsByTagName("dm");
		for (var i = 0; i < xmlDMs.length; i++) {
			//create relevant data holders
			var name = document.createElement("h3");
			var available = document.createElement("p");
			var xmlInfo = xmlDMs[i].childNodes;
			//name first
			name.innerHTML = "Dungeon Master: " + xmlInfo[1].textContent + "<br>";
			//then available days
			available.innerHTML = "Days Available: " + xmlInfo[3].textContent + "<br>";
			//append days
			days.appendChild(name);
			days.appendChild(available);
		}
	}
	
	//author: Mike
	//This method sends the relevant data to the login-submit.php routine
	function login(){
		var user = document.getElementById("username").value;
		var pass = document.getElementById("passBox").value;
		var remember = document.getElementById("rememberme").checked;
		
		//for testing, send to http://webster.cs.washington.edu/params.php
		//post to login-submit.php
		post_to_url("login-submit.php", 
			{"user":user,"pass":pass,"remember":remember});
	}
	
	function addSuggestion() {
		//get data from the document
		var name = document.suggestion.name.value;
		var description = document.suggestion.description.value;
		post_to_url("adventures-submit.php", {"name":name, "description":description});
	}
	
	function sendComment(){
		var comment = document.getElementById("newComment").value;
	
		post_to_url("discussion-submit.php", 
			{"comment":comment});
	}
	
	function loadDiscussion(){
		var text = this.responseText.split("\n");
		var discussion = document.getElementById("discussion");
		
		for(var i = text.length - 1; i >= 0 ; i--){
			var line = text[i].split("|");
			//line[0] is the name of the person who posted, line[1] is the text of the post
			var newDiv = document.createElement("div");
			var strong = document.createElement("strong");
			var p = document.createElement("p");
			
			newDiv.className = "post";
			strong.innerHTML = line[0];
			p.appendChild(strong);
			p.innerHTML += ": " + line[1];
			newDiv.appendChild(p);
			discussion.appendChild(newDiv);
		}
	}

	function post_to_url(path, params, method) {
		method = method || "post"; // Set method to post by default if not specified.

		// The rest of this code assumes you are not using a library.
		// It can be made less wordy if you use one.
		var form = document.createElement("form");
		form.setAttribute("method", method);
		form.setAttribute("action", path);

		for(var key in params) {
			if(params.hasOwnProperty(key)) {
				var hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", key);
				hiddenField.setAttribute("value", params[key]);

				form.appendChild(hiddenField);
			 }
		}

		document.body.appendChild(form);
		form.submit();
	}
	
})();

	