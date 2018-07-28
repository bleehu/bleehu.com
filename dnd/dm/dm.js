(function() {
	window.onload = function(){
	//random added as a cheap fix to caching problem
	var random = Math.floor((Math.random()*1000)+1);
	//sends request for follower info
	var request = new XMLHttpRequest();
		request.onload = loadFollowers;
		request.open("GET", "../followers/followers.xml?n=" + random, true);
		request.send();
	//sends request for budget total info
	var budgetRequest = new XMLHttpRequest();
		budgetRequest.onload = loadBudget;
		budgetRequest.open("GET", "../tychicus/budgetReport.txt?n=" + random, true);
		budgetRequest.send();
	//sends request for budget month info
	var budgetMonthRequest = new XMLHttpRequest();
		budgetMonthRequest.onload = loadBudgetMonth;
		budgetMonthRequest.open("GET", "../tychicus/budget.xml?n=" + random, true);
		budgetMonthRequest.send();
	//sends request for contracts rolled for that need fiction written before being
	//posted to past actions
	var unwrittenRequest = new XMLHttpRequest();
		unwrittenRequest.onload = loadUnwritten;
		unwrittenRequest.open("GET", "unwritten.xml?n=" + random, true);
		unwrittenRequest.send();
	//wiring advance month routine to advance month button
	var budgetMonthButton = document.getElementById("budgetButton");
	budgetMonthButton.disabled = true;
	budgetMonthButton.onclick = advanceBudgetMonth;
	var budgetArm = document.getElementById("armBudgetMonth");
	budgetArm.onchange = armBudget;
	
	var newAdventureButton = document.getElementById("newAdventureButton");
	newAdventureButton.onclick = postNewAdventure;
	
	var rollButton = document.getElementById("rollButton");
	rollButton.disabled = true;
	rollButton.onclick = rollContracts;
	var contractArm = document.getElementById("armContracts");
	contractArm.onchange = armRoll;
	//wiring for new contract
	var newContractButton = document.getElementById("newContractButton");
	newContractButton.onclick = constructContract;
	}
	
	//author: Mike Hedges
	//loads the list of followers and adds them to the delete follower panel
	function loadFollowers(){
		var xml = this.responseXML;
		var followers = xml.querySelectorAll("follower");
		var mainDiv = document.getElementById("followers");
		for (var n = 0; n < followers.length; n++){
			var newDiv = document.createElement("div");
			newDiv.className = "follower";
			var nameData = document.createElement("p");
			nameData.innerHTML = followers[n].getAttribute("name");
			var delButton = document.createElement("input");
			delButton.type = "button";
			delButton.value = "Delete";
			delButton.follower = followers[n].getAttribute("name");
			//delButton.onclick = ;
			newDiv.appendChild(nameData);
			newDiv.appendChild(delButton);
			mainDiv.appendChild(newDiv);
		}
	}
	
	/*
	Loads the total budget
	*/
	function loadBudget(){
		var text = this.responseText;
		var array = text.split("|");
		var total = array[array.length - 1];
		
		var paragraph = document.getElementById("budgetTotal");
		paragraph.innerHTML += total;
	}
	
	
	function loadUnwritten(){
		var xml = this.responseXML;
		var contracts = xml.querySelectorAll("contract");
		var contractsDiv = document.getElementById("contracts");
		
		for(var n = 0; n < contracts.length; n++){
			var div = document.createElement("div");
			div.className = "contract";
			var title = contracts[n].getAttribute("title");
			var prompt = contracts[n].querySelector("prompt").textContent;
			var roll = contracts[n].getAttribute("roll");
			var followers = contracts[n].querySelector("followers").textContent;
			var dl = document.createElement("dl");
			//create and append title
			var h3 = document.createElement("h3");
			h3.innerHTML = title;
			div.appendChild(h3);
			//create and append followers
			var followt = document.createElement("dt");
			followt.innerHTML = "Attempted By:";
			dl.appendChild(followt);
			var followd = document.createElement("dd");
			followd.innerHTML = followers;
			dl.appendChild(followd);
			//create and append roll
			var rollt = document.createElement("dt");
			rollt.innerHTML = "Roll:";
			dl.appendChild(rollt);
			var rolld = document.createElement("dd");
			rolld.innerHTML = roll;
			dl.appendChild(rolld);
			//create and append prompt
			var promptt = document.createElement("dt");
			promptt.innerHTML = "Prompt:";
			dl.appendChild(promptt);
			var promptd = document.createElement("dd");
			promptd.innerHTML = prompt;
			dl.appendChild(promptd);
			//append definition list of details
			div.appendChild(dl);
			//create input controls
			var textArea = document.createElement("textarea");
			textArea.contractNumber = n;
			textArea.id = "contractResult" + n;
			div.appendChild(textArea);
			var button = document.createElement("input");
			button.value = "Finish Contract";
			button.type = "button";
			button.contractNumber = n;
			button.mission = title;
			button.followers = followers;
			button.onclick = finishContract;
			div.appendChild(button);
			//finally, append the div to the panel
			contractsDiv.appendChild(div);
		}
	}
	
	/*
	Author: Mike
	This method is triggered by clicking on the "Finish Contract" buttons. This submits
	the relevant information to a .php routine that posts the finalized contract to the
	records page.
	*/
	function finishContract(){
		var result = document.getElementById("contractResult" + this.contractNumber).value;
		var mission = this.mission;
		var followers = this.followers;
		//http://webster.cs.washington.edu/params.php
		post_to_url("finishContract.php",{"result":result,
			"mission":mission,"followers":followers});
	}
	
	/*
	Author: Mike
	the routine that runs when the deleteFollower button is pressed. Wired to the
	remove-followers.php rountine in the followers file. routine may not be written
	yet, since removing followers happens rarely and it is easy enough to do on the backend.
	*/
	function removeFollowers(followerToRemove){
		post_to_url("../followers/remove-followers.php", {"followers":followerToRemove});
	}
	
	/*
	Author: Mike
	the routine assigned to the advance budget month button. wired to .php file 
	in 
	*/
	function advanceBudgetMonth(){
		//http://webster.cs.washington.edu/params.php
		//../tychicus/advanceMonth.php
		post_to_url("../tychicus/advanceMonth.php", {"pass":"trinity"});
	}
	
	function armBudget(){
		var box = document.getElementById("armBudgetMonth");
		var button = document.getElementById("budgetButton");
		if(box.checked){
			button.disabled = false;
		} else {
			button.disabled = true;
		}
	}
	
	function rollContracts(){
		console.log("rolling contracts");
		post_to_url("rollContracts.php",{"pass":"smiley"});
	}
	
	function armRoll(){
		var box = document.getElementById("armContracts");
		var button = document.getElementById("rollButton");
		if(box.checked){
			button.disabled = false;
		} else {
			button.disabled = true;
		}
	}
	
	/*
	Author: Mike
	Collects input regarding new adventure and passes it to the
	Adventure update routine.
	*/
	function postNewAdventure(){
		//collect pointers to inputs
		var titleInput = document.getElementById("adventureTitle");
		var sizeInput = document.getElementById("adventureSize");
		var locationInput = document.getElementById("adventureStart");
		var descriptionInput = document.getElementById("adventureDiscription");
		//collect data
		var title = titleInput.value;
		var size = sizeInput.value;
		var start = locationInput.value;
		var description = descriptionInput.value;
		//validate data
		var valid = true;
		if(title.trim() == "")
			valid = false;
		if(size.trim() == "")
			size = "any size";
		if(start.trim() == "")
			start = "Unknown Start";
		if(description.trim() == "")
			valid = false;
		//post to routine
		if(valid)
		post_to_url("../adventures/postNewAdventure.php", 
			{"title":title,"size":size,"start":start,"description":description});
		else {
			var errorMessage = document.createElement("p");
			errorMessage.innerHTML = "Invalid data. Adventure not posted.";
			errorMessage.style.color="#cc0000";
			var div = document.getElementById("newAdventures");
			div.appendChild(errorMessage);
		}
	}
	
	/*
	Author: Mike
	will load months since the budget began acruing funds	
	*/
	function loadBudgetMonth(){
		var xml = this.responseXML;
		var month = xml.querySelector("root").getAttribute("month");
		var paragraph = document.getElementById("budgetMonth");
		
		paragraph.innerHTML += month;
	}
	
	/*
	Author: Mike
	function responsible for posting new contract to serverside helper method
	*/
	function constructContract(){
		var contractClass = document.getElementById("contractClass").selectedOptions[0].value; //this is not really safe
		if(contractClass != "Choose a Type"){
			var title = document.getElementById("contractTitle").value;
			var description = document.getElementById("contractDiscription").value;
			post_to_url("../followers/postNewContract.php",{"class":contractClass,
				"title":title,"description":description});
		} else {
			var option = document.getElementById("contractClass");
			option.focus();
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
}());