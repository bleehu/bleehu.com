/*
Authored by Michael Hedges and Daniel Reed.
This javascript page runs the loading of the contract records and previous disscussion
comments and controls the user-side submitting of new comments.
*/

"use strict";
(function() {

window.onload = function() {
		var random = Math.floor((Math.random()*1000)+1);
		//Requests the items from the contracts record
		var xhttp = new XMLHttpRequest();
		xhttp.onload = loadPast;
		xhttp.open("GET", "past.xml?n=" + random, true);
		xhttp.send();
		//Requests the comments for the discussion thread
		var request2 = new XMLHttpRequest();
		request2.onload = loadDiscussion;
		request2.open("GET", "discussion.txt?n=" + random, true);
		request2.send();
		
		//assigns the sendComment function to the submitComment button
		var button = document.getElementById("submitComment");
			button.onclick = sendComment;
	}
	
	//this function handles the loading of the record of bygone contracts.
	function loadPast() {
		var past = document.getElementById("past");
		past.style.display = "block";
		var xmlDoc = this.responseXML;
		var xmlPast = xmlDoc.getElementsByTagName("story");
		for (var x = xmlPast.length-1; x > 0; x--) {
			var thisContract = xmlPast[x];
			var div = document.createElement("div");
			div.className = "contract";
			
			var heading = document.createElement("h2");
			var monthP = document.createElement("p");
			var followerP = document.createElement("p");
			var resultP = document.createElement("p");
			
			var title = thisContract.querySelector("contract").textContent;
			var month = thisContract.getAttribute("month");
			var follower = thisContract.querySelector("follower").textContent;
			var result = thisContract.querySelector("result").textContent;
			
			heading.innerHTML = title;
			heading.className = "title";
			div.appendChild(heading);
			
			monthP.innerHTML = "Month: " + month;
			monthP.className = "monthNumber";
			div.appendChild(monthP);
			
			followerP.innerHTML = follower;
			followerP.className = "followerList";
			div.appendChild(followerP);
			
			resultP.innerHTML = result;
			div.appendChild(resultP);
			
			/* This is Daniel's old quick way of posting contract results to page
			var xmlInfo = xmlPast[x].childNodes; //this creates empty nodes
			for (var i = 0; i < xmlInfo.length; i++) {
				if(xmlInfo[i].textContent.trim() != ""){
					console.log(":" + xmlInfo[i].textContent);
					var text = document.createElement("p");
					text.innerHTML += xmlInfo[i].textContent;
					div.appendChild(text);
				}
			}
			*/
		past.appendChild(div);
		}
		console.log(text.innerHTML);
	}

	/*
	Sends the relevant information to the discussion-post routine, where it
	is appended to the information file. 
	*/
function sendComment(){
		var comment = document.getElementById("newComment").value;
		//http://webster.cs.washington.edu/params.php
		//or
		//discussion-submit.php
		post_to_url("discussion-submit.php", 
			{"comment":comment});
	}
	
	/*
	Loads past comments and pastes them on the thread.
	*/
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
})();