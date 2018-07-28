(function() {
	var died_clicked = false;
	
	window.onload = function() {
		var time_of_death = document.getElementById("time_of_death");
		time_of_death.style.display = "none";
		var dead = document.getElementById("dead");
		dead.onclick = showDate;
	}
	
	function showDate() {
		var time_of_death = document.getElementById("time_of_death");
		if (!died_clicked) {
			time_of_death.style.display = "inline";
			died_clicked = true;
		} else {
			time_of_death.style.display = "none";
			died_clicked = false;
		}
	}
	
})();