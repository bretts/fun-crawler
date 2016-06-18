chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "start-fun-crawler":
        	setMenuActive();
        	funCrawler = new FunCrawler();
        	funCrawler.start();
        	break;
        case "stop-fun-crawler":
        	setMenuUnActive();
        	funCrawler.stop();
        	break;
        case "get-starting-url":
        	sendResponse({url: funCrawler.startingUrl});
        	break;
    }
    return true;
});

var setMenuUnActive = function() {
	chrome.browserAction.setBadgeText({"text": "OFF"});
    chrome.browserAction.setBadgeBackgroundColor({"color": [255, 0, 0, 255]})
}

var setMenuActive = function() {
	chrome.browserAction.setBadgeText({"text": "ON"});
	chrome.browserAction.setBadgeBackgroundColor({"color": [0, 255, 0, 255]})
}