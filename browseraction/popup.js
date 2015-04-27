window.onload = function() {
	
	document.getElementById("start").onclick = function() {
		chrome.extension.sendMessage({
	        type: "start-drifter"
	    });
	    window.close();
	}

	document.getElementById("stop").onclick = function() {
		chrome.extension.sendMessage({
	        type: "stop-drifter"
	    });
	    window.close();
	}
}