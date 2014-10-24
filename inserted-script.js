// This is included and executed in the inspected page
// chrome.devtools.*
// chrome.extension.*
;(function(){

	function run() {
		window.postMessage({
			type: 'enyoVersion',
			hasEnyo: true,
			versions: enyo.version,
			platform: enyo.platform
		}, '*');
	}

	function sendObjectToDevTools(message) {
		// The callback here can be used to execute something on receipt
		chrome.extension.sendMessage(message, function(message){});
	}

	var pollTimeOutTries = 5;
	var pollCounter = 0;
	var pollEnyo = function pollEnyo(){
		window.clearTimeout(pollEnyo);
		if(typeof window.enyo === "undefined"){
			pollCounter += 1;
			if(pollCounter < pollTimeOutTries){
				setTimeout(pollEnyo, 200);
			} else {
				window.postMessage({
					type: 'enyoVersion',
					hasEnyo: false,
				}, '*');
			}
		} else {
			run();
		}
	}

	pollEnyo();

}());