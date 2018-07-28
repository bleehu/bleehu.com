function getBunnies(){
	request = new XMLHttpRequest();
	request.onload = simulate;
	request.open("GET","bunnies/allBunnies.txt",true);
	request.send();
}

function simulate(){
	var raw = this.responseText;
	var bunnies = split('|',raw);
	for(var i = 0; i < bunnies.length; i++)
	{
		request = new XMLHttpRequest();
		request.onload = runSim;
		request.open("GET","bunnies/" + bunnies[i] + "/bunny.xml",true);
		request.send();
	}
}

function runSim(){
	response = this.responseXML;
	
	results = new XMLHttpRequest();
	
	results.open("POST", "sim.php", true);
	results.send();
	console.log(response);
}