function _getEnyoInfo() {
	return 'test';
}

// This one acts in the context of the panel in the Dev Tools
enyo.kind({
    name: 'enyo.DebugExtension',
    kind: 'enyo.Application',
    view: 'enyo.DebugExtension.DebugView',
    components: [
        {name:'stats', kind:'enyo.DebugExtension.StatsController'}
    ],
	create: function() {
		this.inherited(arguments);

		//insert our inspection script
		chrome.devtools.inspectedWindow.eval(
			_getEnyoInfo.toString(),
			enyo.bind(this, function(result, isException) {
				if (isException) {
					alert(chrome.runtime.lastError.message);
				}
			})
		);

		//execute the inserted script
		chrome.devtools.inspectedWindow.eval(
			'_getEnyoInfo()',
			enyo.bind(this, function(result, isException) {
				document.getElementsByTagName('html')[0].innerHTML  = JSON.stringify(result);
			})
		);
	},
    render: function(){
		if(this.hasEnyo){
			this.$.stats.versions = this.versions;
			this.$.stats.platform = this.platform;
			this.view.set('controller', this.$.stats);
			this.inherited(arguments);
		} else {
			document.getElementById('hello-msg').innerHTML = 'Unable to locate Enyo on the inspected page.';
			document.getElementsByTagName('html')[0].className += ' noEnyo';
		}
    }
});
