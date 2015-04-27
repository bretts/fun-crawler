function Drifter() {
	this.startingUrl = null;
	this.tabId = null;
	this.active = true;
	this.timeWaited = 0;
}

Drifter.prototype.start = function() {
	instance = this;

	chrome.tabs.query({active: true}, function(tab){
		instance.startingUrl = tab[0].url;
		instance.tabId = tab[0].id;
		instance.clickLink();
	});
}

Drifter.prototype.stop = function() {
	this.active = false;
}

Drifter.prototype.clickLink = function() {
	instance = this;

	chrome.tabs.get(instance.tabId, function(tab){
		if(tab.status != 'complete') {
			instance.waitForPageLoad();
		}
		else {
			if(instance.active == true) {
				chrome.tabs.sendMessage(tab.id, {type: "click-link"}, function(response){
					try {
						instance.timeWaited = 0;
						instance.clickLink();
					}
					catch(err) {
						drifter.timeWaited = 0;
						instance.clickLink();
					}
				});
			}
		}
	});
}

Drifter.prototype.waitForPageLoad = function() {
	chrome.extension.getBackgroundPage().console.log("waitForPageLoad");
	instance = this;

	instance.timeWaited += 1;
	if(instance.timeWaited >= 15 && instance.active == true) {
		chrome.tabs.get(instance.tabId, function(tab){
			chrome.tabs.sendMessage(tab.id, {type: "go-home"}, function(response){
				try {
					instance.timeWaited = 0;
					setTimeout(function() { instance.clickLink() }, 3000);
				}
				catch(err) {
					instance.timeWaited = 0;
					setTimeout(function() { instance.clickLink() }, 3000);
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

