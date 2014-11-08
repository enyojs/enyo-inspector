enyo.kind({
	name: 'enyo.DebugExtension.Pages.Info',
	published:{
		controller: {}
	},
	controllerChanged:function(){
		var s = this.controller.versions;
		var p = this.controller.platform;

		this.versionCollection = new enyo.Collection();
		this.platformCollection = new enyo.Collection();

		for(var skey in s) {
			this.versionCollection.add({name:skey, version: s[skey]});
		}

		for(var pkey in p) {
			this.platformCollection.add({name:pkey, version: p[pkey]});
		}

		this.$.versionRepeater.setCount(this.versionCollection.length);
		this.$.platformRepeater.setCount(this.platformCollection.length);

		this.render();
	},
	components: [
		 {kind: "onyx.Groupbox", style:'margin-left: 5px;margin-right:5px;padding-top:5px;', components: [
			{kind: "onyx.GroupboxHeader", content: "enyo.versions"},
			{name:'versionRepeater', kind: "Repeater", onSetupItem:"setupItem", components: [
				{name:"item", classes:"repeater-item", components: [
					{tag:"span", classes:"first-cell", name: "libName"},
					{tag:"span", name: "libVersion"}
				]}
			]}
		 ]},
		 {tag:'br'},
		 {kind: "onyx.Groupbox", style:'margin-left: 5px;margin-right:5px;padding-top:5px;', components: [
			{kind: "onyx.GroupboxHeader", content: "enyo.platform"},
			 {name:'platformRepeater', kind: "Repeater", onSetupItem:"setupItem", components: [
				{name:"item", classes:"repeater-item", components: [
					{tag:"span", classes:"first-cell", name: "libName"},
					{tag:"span", name: "libVersion"}
				]}
			]}
		 ]}
	  ],
	  setupItem: function(sender, event){
		var collections = {
				versionRepeater : 'versionCollection',
				platformRepeater: 'platformCollection'
		};

		var collection = collections[sender.name];
		if(collection){
			var index = event.index;
			var item = event.item;
			var model = this[collection].at(event.index);
			item.$.libName.setContent(model.get('name'));
			item.$.libVersion.setContent(model.get('version'));
		}
		return true;
	},
});