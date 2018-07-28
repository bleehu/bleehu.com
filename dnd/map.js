"use strict";
(function() {
	var COUNTRIES;
	/*
		These Array Constants are used with the tick function
	*/
	var MONTHS; //the index of the array coresponds to the 0-based number of the month
	var DAYS; //the index of the array corresponds to the 0-based number of the day of the week
	var DEADLINES; // the index of the array corresponds to the number of the month. 
					//The date object in that index corresponds to when the month should begin.
	
window.onload = function() {
	var random = Math.floor((Math.random()*1000)+1);
	var select = document.getElementById("plane");
	select.onchange = selectPlane;
	
	//set tick
	setInterval(tick, 1000);
	
	//countrieRequest retrieves XML containing the list of countries and pixels in
	//Jaroarfor.
	var request = new XMLHttpRequest();
		request.onload = loadJaroarfor;
		request.open("GET", "countries/jaroarfor.xml?n=" + random, true);
		request.send();
	
	var loginButton = document.getElementById("logButton");
	if(loginButton){
		loginButton.onclick = login;
	}
	
	//stitchMap();
	
	//Sets up the clickable areas on the map
	var tychicus = document.getElementById("tychicus");
	tychicus.onclick = viewCountry;
	var argonis = document.getElementById("argonis");
	argonis.onclick = viewCountry;
	var griv = document.getElementById("griv");
	griv.onclick = viewCountry;
	var utah = document.getElementById("united%20territories%20of%20harloh");
	utah.onclick = viewCountry;
	var ugk = document.getElementById("united%20goblin%20kingdoms");
	ugk.onclick = viewCountry;
	var tief = document.getElementById("realm%20of%20the%20tieflings");
	tief.onclick = viewCountry;
	var elven = document.getElementById("elven%20assembly");
	elven.onclick = viewCountry;
	var gnomerigon = document.getElementById("gnomerigon");
	gnomerigon.onclick = viewCountry;
	var dargeenbaron = document.getElementById("dargeenbaron");
	dargeenbaron.onclick = viewCountry;
	var eladrin = document.getElementById("eladrin%20republic");
	eladrin.onclick = viewCountry;
	var light = document.getElementById("empire%20of%20light");
	light.onclick = viewCountry;
	var htalftreen = document.getElementById("htalftreen");
	htalftreen.onclick = viewCountry;
	var dwargoric = document.getElementById("dwargoric");
	dwargoric.onclick = viewCountry;
	var dwarbic = document.getElementById("the%20dwarven%20republic");
	dwarbic.onclick = viewCountry;
	var university = document.getElementById("university%20capitol");
	university.onclick = viewCountry;
	
	//used for tick method
	MONTHS = new Array("January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December");
	DAYS = new Array("Sunday",
						"Monday",
						"Tuesday",
						"Wednesday",
						"Thursday",
						"Friday",
						"Saturday"
						);
	DEADLINES = new Array( null, //0
							null,
							null,
							null,
							null, //4
							null,
							null,
							null, //7
							null,
							null,
							null,
					new Date(2014, 2, 4, 0, 0, 0, 0), //11
					new Date(2014, 3, 12, 0, 0, 0, 0),
					new Date(2014, 5, 8, 0, 0, 0, 0), //13
					new Date(2015, 1, 8, 0, 0, 0, 0),
					new Date(2020, 6, 8, 0, 0, 0, 0), //15
					new Date(2030, 9, 8, 0, 0, 0, 0),
					new Date(2050, 11, 8, 0, 0, 0, 0)
					);
	};
	
	
	/*tick is the traditional name for an 'update' function. The
		SetInterval function in the loading method calls this method
		on the interval given.
		
		The current version of tick maintains the countdown to the next
		month
		*/
function tick(){
	console.log("tick");
	var today = new Date();
	var monthNo = 0;
	while(DEADLINES[monthNo] < today){
		monthNo++;
	}
	//TODO automate
	var countdown = new Date(DEADLINES[monthNo].getTime() - today.getTime());
	var title = document.getElementById("countdown");
	var date = countdown.getDate();
	var month = countdown.getMonth();
	var minute = countdown.getMinutes();
	title.innerHTML =  month + " months, " + date + " days," + minute + " minutes until Month " + 
		monthNo + "!";
	
}
	
	//used for switching between home, Jaroarfor, Underdark etc.
function selectPlane(){
		var select = document.getElementById("plane");
		//alert(select.value);
		var atlas = document.getElementById("atlas");
		if(select.value == "Home"){
			setTiles("none");
			atlas.style.display = "block";
		} else if (select.value == "Jaroarfor"){
			atlas.style.display = "none";
			setTiles("block");
		} else {
			atlas.style.display = "none";
			setTiles("none");
		}
	}
	
function loadJaroarfor(){
	//the XML document containing the info of Jaroarfor countries.
	var xml = this.responseXML;
	//list of countries in Jaroarfor, searchable by name attribute
	var countries = xml.getElementsByTagName("country");
	COUNTRIES = countries;
	//list of pixels to be displayed. Each pixel points to the country that owns it.
	var pixels = xml.getElementsByTagName("pixel");
	
	//tiles size is the length of a side of each tile in pixels
	var TILESIZE = 25;
	//tile pad is the amount of space between each tile in pixels
	var TILEPAD = 2;
	//the origional tile is at 0,0. The offset should be at least
	//  the magnitude of the lowest x or y so that the map appears
	//  all in the positive.
	var OFFSET = 8;
	
	var container = document.getElementById("container");
	
	for(var i = 0; i < pixels.length; i++){
		//get the current pixel
		var pixel = pixels[i];
		//the name of the pointer to the pixel's country
		var countryID = pixel.querySelector("country").textContent;
		var country = findCountry(countries, countryID);
		var color = country.getAttribute("color");
		
		//create div 
		var tile = document.createElement("div");
		tile.className = "tile";
		tile.style.width = TILESIZE + "px";
		tile.style.height = TILESIZE + "px";
		//place pixel
		tile.style.position = "absolute";
		// added 14 so that the origin tile is 0,0
		tile.style.left = ((parseInt(pixel.getAttribute("x") )+ OFFSET) * (TILESIZE + TILEPAD)) + "px";
		tile.style.top = ((parseInt(pixel.getAttribute("y") )+ OFFSET) * (TILESIZE + TILEPAD)) + "px";
		//color pixel
		tile.style.backgroundColor = "#" + color;
		//Add mouse-over name of country
		tile.title = country.querySelector("name").textContent;
		//create new variable in div element to hold pointer to the correct country
		tile.countryID = countryID;
		//wire onclick functionality. See viewCountryJaroarfor declaration.
		tile.onclick = viewCountryJaroarfor;
		//tiles hidden to begin with
		tile.style.display = "none";
		
		//load terrain icon
		var terrain = pixel.querySelector("terrain").textContent;
		var icon = null;
		if(terrain != ""){
		icon = document.createElement("img");
		icon.src = "images\/tiles\/" + terrain + ".png";
		icon.alt = "terrain";
		tile.appendChild(icon);
		}
		//icon = document.createElement("img");
		//icon.src = "images\\tiles\\mountain.png";
		
		//tile.appendChild(icon);
		
		container.appendChild(tile);
	}
}

	//helper method for switching planes. sets all elements with the class of tile
	// to display. recommend passing either "none" or "block" to make tiles appear
	// or disappear
function setTiles(to){
		var alltiles = document.querySelectorAll(".tile");
		for(var n = 0; n < alltiles.length; n++){
			alltiles[n].style.display = to;
		}
	}
	
	//author - Mike
	//returns the country who's nameID matches the passed toFind.
	//countries: an array of DOMElement objects representing countries to search.
	//toFind: the string containing the nameID of the country to return
function findCountry(countries, toFind){
		for(var i = 0; i < countries.length; i++){
			if(toFind == countries[i].getAttribute("name")){
				return countries[i];
			}
		}
	}
	
	//handles input from login bar.
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
	
	//handles clicking on countries on home plane
function viewCountry() {
	var id = this.id;
	var xhttp = new XMLHttpRequest();
	xhttp.onload = loadCountry;
	xhttp.open("GET", "countries/" + id + ".xml", true);
	xhttp.send();
	}
	
	//handles clicking on countries from Jaroarfor
function viewCountryJaroarfor(){
		//follow pixel's pointer to find correct country
		var country = findCountry(COUNTRIES, this.countryID);
		//find overview and cities panels on webpage
		var overview = document.getElementById("overview");
		overview.style.display = "block";
		var cities = document.getElementById("cities");
		cities.style.display = "block";
		//flush old readouts
		overview.innerHTML = "";
		cities.innerHTML = "";
		
		
		
		//generate and append country overview
		var heading = document.createElement("h1");
		heading.innerHTML = country.querySelector("name").textContent;
		var countryIntel = document.createElement("p");
		countryIntel.innerHTML = country.querySelector("body").textContent;
		overview.appendChild(heading);
		overview.appendChild(countryIntel);
		
		//generate and append city report
		var cityHeading = document.createElement("h1");
		cityHeading.innerHTML = "Cities";
		cities.appendChild(cityHeading);
		var myCities = country.querySelectorAll("city");
		
		console.log(myCities);
		for (var i = 0; i < myCities.length; i++){
			var cityName = myCities[i].getAttribute("name");
			var cityHeading = document.createElement("h2");
			cityHeading.innerHTML = cityName;
			
			var cityP = document.createElement("p");
			var cityDesc = myCities[i].querySelector("description").textContent;
			cityP.innerHTML = cityDesc;
			
			cities.appendChild(cityHeading);
			cities.appendChild(cityP);
		}
		//TODO
		
		//generate and append economy report
		var econHeading = document.createElement("h1");
		econHeading.innerHTML = "Economy";
		cities.appendChild(econHeading);
		
		//generate and append exports
		var expHeading = document.createElement("h2");
		expHeading.innerHTML = "Exports";
		cities.appendChild(expHeading);
		var exports = country.querySelectorAll("export");
		console.log(exports.length);
		var table = document.createElement("table");
		for(var i = 0; i < exports.length; i++){
			var item = exports[i];
			var name = item.textContent;
			var price = item.getAttribute("price");
			
			var row = document.createElement("tr");
			//var p = document.createElement("p");
			row.className = "econ" + (i % 2);
			//p.innerHTML = name + " : " + price + "gp";
			var listing = document.createElement("td");
			listing.innerHTML = name;
			listing.className = "listing";
			row.appendChild(listing);
			var pricing = document.createElement("td");
			pricing.innerHTML = price + "gp";
			pricing.className = "price";
			row.appendChild(pricing);
			table.appendChild(row);
		}
		cities.appendChild(table);
		//generate and append import reports
		var impHeading = document.createElement("h2");
		impHeading.innerHTML = "Imports";
		cities.appendChild(impHeading);
		var imports = country.querySelectorAll("import");
		var table2 = document.createElement("table");
		for(var i = 0; i < imports.length; i++){
			var item = imports[i];
			var name = item.textContent;
			var price = item.getAttribute("price");
			
			var row = document.createElement("tr");
			//var p = document.createElement("p");
			row.className = "econ" + (i % 2);
			//p.innerHTML = name + " : " + price + "gp";
			var listing = document.createElement("td");
			listing.innerHTML = name;
			listing.className = "listing";
			row.appendChild(listing);
			var pricing = document.createElement("td");
			pricing.innerHTML = price + "gp";
			pricing.className = "price";
			row.appendChild(pricing);
			table2.appendChild(row);
		}
		cities.appendChild(table2);
	}
	
	//handles display of countries from home plane
function loadCountry() {
	var overview = document.getElementById("overview");
	overview.style.display = "block";
	var cities = document.getElementById("cities");
	cities.style.display = "block";
	var xmlDoc = this.responseXML;
	var heading = document.createElement("h1");
	//Read Country name
	var xmlHead = xmlDoc.getElementsByTagName("name")[0];
	heading.innerHTML = xmlHead.textContent;
	//get body tag, assign to variable for readability
	var xmlBody = xmlDoc.getElementsByTagName("body")[0];
	//print xmlBody to console, for debugging
	console.log(xmlBody);
	var bodyP = document.createElement("p");
	//this is the line we were looking for.
	bodyP.innerHTML = xmlBody.textContent;
	//remove current kiddies
	overview.innerHTML = '';
	//append the kiddies.
	overview.appendChild(heading);
	overview.appendChild(bodyP);
	
	//Repeat above for the cities
	var bodyPC = document.createElement("p");
	//Cities have more formatting, so it gets a bit more complicated.
	var xmlCities = xmlDoc.getElementsByTagName("cities")[0].childNodes;  
	//When I get to it, the cities appearance will be better formatted, so I'll set it up for that now, so I just have to add code rather than change it
	for (var i = 0; i < xmlCities.length; i++) {
		var xmlInfo = xmlCities[i].childNodes; // gets elements of a given city.
		for (var x = 0; x < xmlInfo.length; x++) {
			bodyPC.innerHTML += xmlInfo[x].textContent + "<br>";
		}
		//logging for more debugging
		console.log(xmlInfo);
	}
	//remove kiddies
	cities.innerHTML = '';
	//append the kiddies again, well only one this time.
	cities.appendChild(bodyPC);
}
})();
