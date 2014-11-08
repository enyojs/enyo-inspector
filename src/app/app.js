function _getEnyoInfo() {
	var e = {
		versions: enyo.version,
		platform: enyo.platform
	};

	return e;
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

		//insert our
		chrome.devtools.inspectedWindow.eval(
			_getEnyoInfo.toString(),
			enyo.bind(this, function(result, isException) {
				if (isException) {
					alert(chrome.runtime.lastError.message);
				}
			})
		);

		chrome.devtools.inspectedWindow.eval(
			'_getEnyoInfo()',
			enyo.bind(this, function(result, isException) {
				this.$.stats.versions = result.versions;
				this.$.stats.platform = result.platform;
				this.view.set('controller', this.$.stats);
			})
		);
	},
    render: function(){
		if(this.hasEnyo){
			this.inherited(arguments);
		} else {
			document.getElementById('hello-msg').innerHTML = 'Unable to locate Enyo on the inspected page.';
			document.getElementsByTagName('html')[0].className += ' noEnyo';
		}
    }
});
