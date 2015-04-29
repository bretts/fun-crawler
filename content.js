chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "click-link":
			console.log('click-link');
			clickLink();
			break;
		case "go-home":
			console.log('go-home');
			navHome();
			break;
	}
	sendResponse({message: 'recieved: ' + message.type });
});

var clickLink = function() {	
	var link = getLinkInDomain(window.location.href);
	window.location = link;
}

var getLinkInDomain = function(uri) {
	domain = getHostName(uri);
	var links = document.links;
	
	linksInDomain = [];
	for (i = 0; i < links.length; i++) {
	    if(getHostName(links[i]) == domain) {
			linksInDomain.push(links[i]);
		}
	}

	if(linksInDomain.length == 0) {
		navHome();
	}
	
	var u = linksInDomain[Math.floor(Math.random()*linksInDomain.length)];
	return u;
}

var navHome = function() {
	chrome.runtime.sendMessage({type: 'get-starting-url'}, function(response){
		window.location = response.url;
	});
}

var getHostName = function(uri) {
	var u = document.createElement('a');
	u.href = uri;
	return u.hostname;
}