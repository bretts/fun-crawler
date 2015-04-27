chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "start-drifter":
        	setMenuActive();
        	drifter = new Drifter();
        	drifter.start();
        	break;
        case "stop-drifter":
        	setMenuUnActive();
        	drifter.stop();
        	break;
        case "get-starting-url":
        	sendResponse({url: drifter.startingUrl});
        	break;
    }
    return true;
});

var setMenuUnActive = function() {
	chrome.browserAction.setBadgeText({"text": ""});
}

var setMenuActive = function() {
	chrome.browserAction.setBadgeText({"text": "ON"});
	chrome.browserAction.setBadgeBackgroundColor({"color": [0, 255, 0, 255]})
}