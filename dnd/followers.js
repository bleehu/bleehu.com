(function() {
"use strict";
var CONTRACTS;

window.onload = function(){
		var random = Math.floor((Math.random()*1000)+1);
		var request = new XMLHttpRequest();
			request.onload = loadContracts;
			request.open("GET", "followers/contracts.xml?n=" + random, true);
			request.send();
			//request 2 retrieves the 
		var request2 = new XMLHttpRequest();
			request2.onload = loadDiscussion;
			request2.open("GET", "followers/discussion.txt?n=" + random, true);
			request2.send();
			
		var button = document.getElementById("submitComment");
			button.onclick = sendComment;
		
		var loginButton = document.getElementById("logButton");
		if(loginButton){
			loginButton.onclick = login;
		}
	};
	
	function loadContracts(){
		var random = Math.floor((Math.random()*1000)+1);
		var xml = this.responseXML;
		CONTRACTS = xml.querySelectorAll("contract");
		var aContracts = document.getElementById("assassinContracts");
		var mContracts = document.getElementById("MageContracts");
		var lContracts = document.getElementById("leaderContracts");
		var pContracts = document.getElementById("playerContracts");
		
		for (var n = 0; n < CONTRACTS.length; n++){
			var name = CONTRACTS[n].querySelector("name").textContent;
			var description = CONTRACTS[n].querySelector("description").textContent;
			var type = CONTRACTS[n].getAttribute("class");
			
			var div = document.createElement("div");
			div.className = "contract";
			var heading = document.createElement("h3");
			heading.innerHTML = name;
			var p = document.createElement("p");
			p.innerHTML = description;
			div.appendChild(heading);
			div.appendChild(p);
			
			if(type == "assassin"){
				aContracts.appendChild(div);
			} else if(type == "mage"){
				mContracts.appendChild(div);
			} else if(type == "leader"){
				lContracts.appendChild(div);
			} else if(type == "player"){
				pContracts.appendChild(div);
			}else {
				div.style.backgroundColor = "#ff0000";
				aContracts.appendChild(div);
			}
		}
		
		var request = new XMLHttpRequest();
		request.onload = list;
		request.open("GET", "followers/followers.xml?n=" + random, true);
		request.send();
	}
	
	function list(){
		var xml = this.responseXML;
		var followers = xml.querySelectorAll("follower");
		var table = document.getElementById("table");
		
		for (var n = 0; n < followers.length; n++){
			var className = followers[n].querySelector("class").textContent;
			
			var row = document.createElement("tr");
			var nameData = document.createElement("td");
			nameData.innerHTML = followers[n].getAttribute("name");
			nameData.id = "FollowerName" + n;
			nameData.style.textAlign = "center";
			nameData.style.backgroundColor = "#EFF291";
			row.appendChild(nameData);
			
			var classData = document.createElement("td");
			classData.innerHTML = className;
			classData.style.textAlign = "center";
			if(className == "mage"){
				classData.className = "mage";
			}
			if(className == "assassin"){
				classData.className = "assassin";
			}
			if(className == "leader"){
				classData.className = "leader";
			}
			if(className == "player"){
				classData.className = "player";
			}
			row.appendChild(classData);
			var missionData = document.createElement("td");
			missionData.style.backgroundColor = "#EFF291";
			var mission = followers[n].querySelector("mission").textContent;
			
			//dubug
			//console.log(followers[n].getAttribute("name") + ":" + mission);
			
			if(mission){
				missionData.innerHTML = mission;
			} else {
				missionData.innerHTML = missions(className,n);
			}
			row.appendChild(missionData);
			if(!mission){
				var sendButton = document.createElement("input");
				sendButton.value = "Send";
				sendButton.type = "button";
				sendButton.index = n;
				sendButton.onclick = sendFollower;
				var sendData = document.createElement("td");
				sendData.appendChild(sendButton);
				row.appendChild(sendData);
			}
			
			var stats = followers[n].querySelectorAll("stat");
			for(var j = 0; j < stats.length; j++){
				var statName = stats[j].getAttribute("name");
				var statScore = stats[j].textContent; //no need to cast, just displaying
				var statData = document.createElement("td");
				statData.innerHTML = statName + ": " + statScore;
				statData.style.backgroundColor = "#EFF291";
				row.appendChild(statData);
			}
			
			table.appendChild(row);
		}
	}
	
	//returns a select box with the missions appropriate for that class
	function missions(className, j){
		var returnMe = "<select id=\"mission" + j + "\">";
		for(var n = 0; n < CONTRACTS.length; n++){
			if(CONTRACTS[n].getAttribute("class") == className){
				returnMe += "<option>";
				returnMe += CONTRACTS[n].querySelector("name").textContent;
				returnMe += "</option>";
			}
		}
		return returnMe + "</select>";
	}
	
	function sendFollower(){
		var n = this.index; //purely for legibility
		var follower = document.getElementById("FollowerName" + n).innerHTML;
		var contract = document.getElementById("mission" + n).value;
		//for testing, send to http://webster.cs.washington.edu/params.php
		//post to followers-submit.php
		post_to_url("followers-submit.php", 
			{"follower":follower,"contract":contract});
	}
	
	function sendComment(){
		var comment = document.getElementById("newComment").value;
	
		post_to_url("followers/discussion-submit.php", 
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
	
	//plagerized from Stackoverflow
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
	
}());