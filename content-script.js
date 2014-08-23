
// hook when the window is messaged from the inject script
window.addEventListener("message", receiveMessage, false);
function receiveMessage(event) {
  chrome.extension.sendMessage(event.data);
}

// inject JS into the page to check for an app on domready
var script = document.createElement('script');
script.type = "text/javascript";
script.src = chrome.extension.getURL("inserted-script.js");
if (document.body) {
    document.body.appendChild(script);
    script.onload = function() {
      document.body.removeChild(script);
    };
}