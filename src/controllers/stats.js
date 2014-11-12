//this function is eval inside the inspected page
function _getEnyoInfo() {

	var ret = {
		noEnyo: true
	}

	if(typeof enyo == 'object') {
		ret = {
			noEnyo: false,
			versions: enyo.version,
			platform: enyo.platform,
			store: enyo.store
		};
	}

	return ret;
}


enyo.kind({
    name: 'enyo.DebugExtension.StatsController',
    enyo: {},
	published: {
		versions: {},
		platform: {}
	},
	events: {
    	onVersionsUpdated:"",
    	onPlatformUpdated:""
	},
	create: function() {

		enyo.inherited(arguments);
	},
	versionsChanged: function() {
		var s = this.versions;
		this.versionCollection = new enyo.Collection();
		for(var skey in s) {
			this.versionCollection.add({name:skey, version: s[skey]});
		}
	},
	platformChanged: function() {
		var p = this.platform;
		this.platformCollection = new enyo.Collection();
		for(var pkey in p) {
			this.platformCollection.add({name:pkey, version: p[pkey]});
		}
	},
    getVersions: function(){
        return this.enyo.version;
    }
});