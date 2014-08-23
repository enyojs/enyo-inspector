// This is included and executed in the inspected page
// chrome.devtools.*
// chrome.extension.*

var bugger = {
    hasEnyo: function(){
        return typeof enyo === "object"
    }
}

function run() {
    window.postMessage({
        type: 'enyoVersion',
        versions: enyo.version,
        platform: enyo.platform
    }, '*');
}

function sendObjectToDevTools(message) {
    // The callback here can be used to execute something on receipt
    chrome.extension.sendMessage(message, function(message){});
}

var pollEnyo = function pollEnyo(){
    window.clearTimeout(pollEnyo);
    if(typeof window.enyo === "undefined"){
        setTimeout(pollEnyo, 200);
    } else {
        run();
    }
}

pollEnyo();