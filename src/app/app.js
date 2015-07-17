var
    kind = require('enyo/kind');

var
    Application = require('enyo/Application'),
    Control = require('enyo/Control');

var
    utils = require('enyo/utils');

var
    testView = require('../views/test');

//this function is eval inside the inspected page
function _getEnyoInfo() {

	var ret = {
		noEnyo: true
	}

    //cannot retrieve these from a global object anymore?
	if(typeof enyo == 'object') {
		ret = {
			noEnyo: false,
			versions: 'foo',
			platform: 'bar'
		};
	}

	return ret;
}

function insideDevTools() {
	return (chrome && chrome.devtools)
}

// This one acts in the context of the panel in the Dev Tools
module.exports = kind({
    name: 'enyo.DebugExtension',
    kind: Application,
    view: testView,
    components: [
        {name:'stats'}
    ],
	handlers: {
		onPageChanged: 'handlePageChange'
	},
	handlePageChange: function(e, page) {
		//this.view.set('controller', this.$.stats);
		//this.view.controllerChanged();
	},
	create: function() {
		this.inherited(arguments);
        
		if(!insideDevTools()) {
			//this path will cancel out of chrome tools
			var result = _getEnyoInfo();

			this.$.stats.setVersions(result.versions);
			this.$.stats.setPlatform(result.platform);
			this.view.set('controller', this.$.stats);

			this.canRender = true;
			this.render();
			return;
		}

		//insert our eval
		chrome.devtools.inspectedWindow.eval(
			_getEnyoInfo.toString(),
			function(result, isException) {
				if (isException) {
					alert(chrome.runtime.lastError.message);
				}
			}
		);

		chrome.devtools.inspectedWindow.eval(
			'_getEnyoInfo()',
			utils.bind(this, function(result, isException) {

				this.canRender = true;
				this.noEnyo = result.noEnyo;
				this.render();

				if(!result.noEnyo){
//					this.$.stats.set('versions', result.versions);
//					this.$.stats.set('platform', result.platform);
//					this.view.set('controller', this.$.stats);
				}
			})
		);

	},
    render: function(){
		if(this.canRender){
			if(!this.noEnyo){
				this.inherited(arguments);
			} else {
				document.getElementById('hello-msg').innerHTML = 'Unable to locate Enyo on the inspected page.';
				document.getElementsByTagName('html')[0].className += ' noEnyo';
			}
		}
    },
});
