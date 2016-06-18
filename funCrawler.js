function FunCrawler() {
	this.startingUrl = null;
	this.tabId = null;
	this.active = true;
	this.timeWaited = 0;
}

FunCrawler.prototype.start = function() {
	instance = this;

	chrome.tabs.query({active: true}, function(tab){
		instance.startingUrl = tab[0].url;
		instance.tabId = tab[0].id;
		instance.clickLink();
	});
}

FunCrawler.prototype.stop = function() {
	this.active = false;
}

FunCrawler.prototype.clickLink = function() {
	chrome.extension.getBackgroundPage().console.log('clickLink: ');

	instance = this;

	chrome.tabs.get(instance.tabId, function(tab){
		if((JSON.parse(window.localStorage["funCrawlerSettings"]).waitForPageLoad == "checked") && (tab.status != 'complete')) {
			instance.waitForPageLoad();
		}
		else {
			if(instance.active == true) {
				chrome.tabs.sendMessage(tab.id, {type: "click-link"}, function(response){
					try {
						instance.timeWaited = 0;
						if((JSON.parse(window.localStorage["funCrawlerSettings"]).waitForPageLoad != "checked")) {
							setTimeout(function() { instance.clickLink() }, 1000);	
						}
						else
						{
							instance.clickLink();
						}
					}
					catch(err) {
						chrome.tabs.sendMessage(tab.id, {type: "go-home"});
						funCrawler.timeWaited = 0;
						setTimeout(function() { instance.clickLink() }, 5000);
					}
				});
			}
		}
	});
}

FunCrawler.prototype.waitForPageLoad = function() {
	chrome.extension.getBackgroundPage().console.log('waitForPageLoad: ' + instance.timeWaited);

	instance = this;

	instance.timeWaited += 1;
	if(instance.timeWaited >= 10 && instance.active == true) {
		chrome.tabs.get(instance.tabId, function(tab){
			chrome.tabs.sendMessage(tab.id, {type: "click-link"}, function(response){
				try {
					instance.timeWaited = 0;
					setTimeout(function() { instance.clickLink() }, 2000);
				}
				catch(err) {
					chrome.tabs.sendMessage(tab.id, {type: "go-home"});
					funCrawler.timeWaited = 0;
					setTimeout(function() { instance.clickLink() }, 5000);
				}
			});
		});
	}
	else {
		setTimeout(function(){
			instance.clickLink();
		}, 1000);
	}
}

