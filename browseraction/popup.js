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

	// Bootstrap the drifter settings
	drifterSettings = window.localStorage["drifterSettings"];
	if(drifterSettings == undefined) {
    	window.localStorage["drifterSettings"] = JSON.stringify({ "waitForPageLoad": "checked" })
    	document.getElementById("waitForPageLoad").checked = true;
  	}
  	else
  	{
  		if(JSON.parse(window.localStorage["drifterSettings"]).waitForPageLoad == "checked") {
  			document.getElementById("waitForPageLoad").checked = true;
  		}
  		else
  		{
  			document.getElementById("waitForPageLoad").checked = false;
  		}
  	}

  	// Toggle Wait For Page To Finish Loading
  	document.getElementById("waitForPageLoad").onclick = function() {
  		if(document.getElementById("waitForPageLoad").checked == true) {
  			chrome.extension.sendMessage({
	        	type: "wait-page-load-on"
	    	});
	    	window.localStorage["drifterSettings"] = JSON.stringify({ "waitForPageLoad": "checked" })
	    	document.getElementById("waitForPageLoad").checked = true;
  		}
  		else
  		{
  			chrome.extension.sendMessage({
	        	type: "wait-page-load-off"
	    	});
	    	window.localStorage["drifterSettings"] = JSON.stringify({ "waitForPageLoad": "unchecked" })
	    	document.getElementById("waitForPageLoad").checked = false;
  		}
		
	}
}