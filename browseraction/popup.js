window.onload = function() {
	
	document.getElementById("start").onclick = function() {
		chrome.extension.sendMessage({
	        type: "start-fun-crawler"
	    });
	    window.close();
	}

	document.getElementById("stop").onclick = function() {
		chrome.extension.sendMessage({
	        type: "stop-fun-crawler"
	    });
	    window.close();
	}

	// Bootstrap the funCrawler settings
	funCrawlerSettings = window.localStorage["funCrawlerSettings"];
	if(funCrawlerSettings == undefined) {
    	window.localStorage["funCrawlerSettings"] = JSON.stringify({ "waitForPageLoad": "checked" })
    	document.getElementById("waitForPageLoad").checked = true;
  	}
  	else
  	{
  		if(JSON.parse(window.localStorage["funCrawlerSettings"]).waitForPageLoad == "checked") {
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
	    	window.localStorage["funCrawlerSettings"] = JSON.stringify({ "waitForPageLoad": "checked" })
	    	document.getElementById("waitForPageLoad").checked = true;
  		}
  		else
  		{
  			chrome.extension.sendMessage({
	        	type: "wait-page-load-off"
	    	});
	    	window.localStorage["funCrawlerSettings"] = JSON.stringify({ "waitForPageLoad": "unchecked" })
	    	document.getElementById("waitForPageLoad").checked = false;
  		}
		
	}
}