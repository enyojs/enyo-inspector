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