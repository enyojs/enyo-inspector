// This creates and maintains the communication channel between
// the inspectedPage and the dev tools panel.
;(function createChannel() {

    //Create a port with background page for continous message communication
    var port = chrome.extension.connect({
        name: "Enyo Communication" //Given a Name
    });

	// Holds instances of Enyo that are debugging
	var apps = [];

    // Listen to messages from the background page
    port.onMessage.addListener(function (message) {
	  //create performance hooks and stuff stuff here


    });

	enyo.ready(function(){
		new enyo.DebugExtension({
			hasEnyo: true,
			versions: [],
			platform: []
		}).renderInto(document.body);
	});

}());

// This sends an object to the background page
// where it can be relayed to the inspected page
function sendObjectToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.extension.sendMessage(message);
}