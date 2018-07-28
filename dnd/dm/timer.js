(function() {

var MINUTES = 0;
var SECONDS = 0;
var go = false;

window.onload = function(){
	setInterval(tick,100);
	
	var startB = document.getElementById("start");
	startB.onclick = startClock;
	startB.onKeyPress = keyPressed;
	
	var stopB = document.getElementById("stop");
	stopB.onclick = stopClock;
	
	var reB = document.getElementById("reset");
	reB.onclick = reset;
}

function tick(){
	if(go && SECONDS > 0){
		SECONDS--;
	}
	var display = document.getElementById("display");
	if(go){
		display.innerHTML = ((SECONDS - (SECONDS % 60))/60) + " : " + (SECONDS % 60);
	}
	if(SECONDS == 0){
		var body = document.querySelector("body");
		body.style.backgroundColor = "#ff2222";
	}
}

function keyPressed(){
	if(this.Key == "space"){
		alert("Tada!");
	}
	alert(this);
}

function startClock(){
	var textBox = document.getElementById("duration");
	var value = textBox.value;
	var min = parseInt(value);
	if(value){
		MINUTES = min;
		SECONDS = min * 60;
	} else {
		textBox.value = "8";
	}
	go = true;
	var body = document.querySelector("body");
	body.style.backgroundColor = "#22eeee";
}

function stopClock(){
	go = false;
}

function reset(){
	var boxes = document.querySelectorAll("input");
	for (var i = 0; i < boxes.length; i++){
		boxes[i].checked = false;
		
	}
	go = false;
	var textBox = document.getElementById("duration");
	textBox.value = MINUTES;
	var display = document.getElementById("display");
	display.innerHTML = "";
	var body = document.querySelector("body");
	body.style.backgroundColor = "#22eeee";
	SECONDS = 1;
}


}());