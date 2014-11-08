// This creates and maintains the communication channel between
// the inspectedPage and the dev tools panel.
;(function() {

	enyo.ready(function(){
		new enyo.DebugExtension().renderInto(document.body);
	});

}());