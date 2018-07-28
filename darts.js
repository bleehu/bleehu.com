/*
Michael Hedges
2/2/14

This javascript file runs animated nerf darts which fly around in the background
of index.php for the front page of my personal website.
*/

//encapsulation form prevents global variable leakage
"use strict";
(function() {
	
	
	var frames = 0;
	var dart1 = document.createElement("div");
	var dart2 = document.createElement("div");
	var dart3 = document.createElement("div");
	var dart4 = document.createElement("div");
	
	var dart5 = document.createElement("div");
	var dart6 = document.createElement("div");
	var dart7 = document.createElement("div");
	var dart8 = document.createElement("div");
	window.onload = function(){
		console.log("loading");
		setInterval(tick, 50);
		var dwindow = document.getElementById("dartWindow");
		
		dart1.style.top = "220px";
		dart1.style.left = "-200px";
		dart1.className = "dart";
		var img1 = document.createElement("img");
		img1.src = "images//dart_left.png";
		img1.alt = "dart goes here";
		
		
		dart2.style.left = "-300px";
		dart2.style.top = "410px";
		dart2.className = "dart";
		var img2 = document.createElement("img");
		img2.src = "images//dart_left.png";
		img2.alt = "dart goes here";
		
		dart3.style.left = "-400px";
		dart3.style.top = "620px";
		dart3.className = "dart";
		var img3 = document.createElement("img");
		img3.src = "images//dart_left.png";
		img3.alt = "dart goes here";
		
		dart4.style.left = "-350px";
		dart4.style.top = "660px";
		dart4.className = "dart";
		var img4 = document.createElement("img");
		img4.src = "images//dart_left.png";
		img4.alt = "dart goes here";
		
		var width = window.innerWidth;
		
		dart5.style.left = (width + 200)+ "px";
		dart5.style.top = "660px";
		dart5.className = "dart";
		var img5 = document.createElement("img");
		img5.src = "images//dart_right.png";
		img5.alt = "dart goes here";
		
		dart6.style.left = (width + 350)+ "px";
		dart6.style.top = "80px";
		dart6.className = "dart";
		var img6 = document.createElement("img");
		img6.src = "images//dart_right.png";
		img6.alt = "dart goes here";
		
		dart7.style.left = (width + 250)+ "px";
		dart7.style.top = "740px";
		dart7.className = "dart";
		var img7 = document.createElement("img");
		img7.src = "images//dart_right.png";
		img7.alt = "dart goes here";
		
		dart8.style.left = (width + 460)+ "px";
		dart8.style.top = "440px";
		dart8.className = "dart";
		var img8 = document.createElement("img");
		img8.src = "images//dart_right.png";
		img8.alt = "dart goes here";
		
		dart1.appendChild(img1);
		dart2.appendChild(img2);
		dart3.appendChild(img3);
		dart4.appendChild(img4);
		dart5.appendChild(img5);
		dart6.appendChild(img6);
		dart7.appendChild(img7);
		dart8.appendChild(img8);
		dwindow.appendChild(dart1);
		dwindow.appendChild(dart2);
		dwindow.appendChild(dart3);
		dwindow.appendChild(dart4);
		dwindow.appendChild(dart5);
		dwindow.appendChild(dart6);
		dwindow.appendChild(dart7);
		dwindow.appendChild(dart8);
	}
	
	//update every few ms.
	function tick(){
		frames++;
		//periodically, fire darts!
		if(frames % 280 == 0){
			fireLeft();
		}
		if(frames % 230 == 0){
			fireRight();
		}
		
		// dart speed
		var DARTSPEED = 18;
		//every frame, advance darts
		var x1 = parseInt(dart1.style.left);
		x1 += DARTSPEED;
		dart1.style.left = x1 + "px";
		var x2 = parseInt(dart2.style.left);
		x2 += DARTSPEED;
		dart2.style.left = x2 + "px";
		var x3 = parseInt(dart3.style.left);
		x3 += DARTSPEED;
		dart3.style.left = x3 + "px";
		var x4 = parseInt(dart4.style.left);
		x4 += DARTSPEED;
		dart4.style.left = x4 + "px";
		
		var x5 = parseInt(dart5.style.left);
		x5 -= DARTSPEED;
		dart5.style.left = x5 + "px";
		var x6 = parseInt(dart6.style.left);
		x6 -= DARTSPEED;
		dart6.style.left = x6 + "px";
		var x7 = parseInt(dart7.style.left);
		x7 -= DARTSPEED;
		dart7.style.left = x7 + "px";
		var x8 = parseInt(dart8.style.left);
		x8 -= DARTSPEED;
		dart8.style.left = x8 + "px";
		
	}
	
	//set the darts that come from the left to their starting positions
	function fireLeft(){
		console.log("firing");
		dart1.style.left = "-200px";
		dart2.style.left = "-400px";
		dart3.style.left = "-600px";
		dart4.style.left = "-550px";
	}
	
	function fireRight(){
		console.log("firing right side");
		var width = window.innerWidth;
		var rand = Math.floor((Math.random()*80)+100);
		dart5.style.left = (width + 100) + "px";
		dart5.style.top = rand + "px";
		dart6.style.left = (width + 150) + "px";
		rand = Math.floor((Math.random()*80)+400);
		dart6.style.top = rand + "px";
		dart7.style.left = (width + 200) + "px";
		rand = Math.floor((Math.random()*80));
		dart7.style.top = rand + "px";
		dart8.style.left = (width + 250) + "px";
		rand = Math.floor((Math.random()*80)+700);
		dart8.style.top = rand + "px";
	}
	
})();