enyo.kind({
    name: 'enyo.DebugExtension.DebugView',
    kind: 'FittableRows',
    classes: 'enyo-fit',
    published:{
        controller: {}
    },
    controllerChanged:function(){
        var s = this.controller.versions;
        var p = this.controller.platform;

		this.versionCollection = new enyo.Collection();
		this.platformCollection = new enyo.Collection();

		for(key in s) {
			this.versionCollection.add({name:key, version: s[key]});
		}

		for(key in p) {
			this.platformCollection.add({name:key, version: p[key]});
		}

		this.$.versionRepeater.setCount(this.versionCollection.length);
		this.$.platformRepeater.setCount(this.platformCollection.length);

		this.render();
    },
	setupItem: function(sender, event){
		var collections = {
				versionRepeater : 'versionCollection',
				platformRepeater: 'platformCollection'
		}
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
    components: [
      {kind: "FittableColumns", fit:true,components: [
         {classes:'sidePanel', components:[
             {classes: 'menuButton active', kind:'enyo.Button', content: 'Debug Info'},
             {classes: 'menuButton', kind:'enyo.Button', content: 'Storage Info'},
         ]},
         {fit:true, components:[
			 {kind: "enyo.Scroller", style:'height:100%', components:[
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
				 ]},
		  	]}
         ]}
      ]}
    ],
    rendered: function(){
        this.adjustHeight();
        this.inherited(arguments);
    },
    resizeHandler: function(){
        this.adjustHeight()
        this.inherited(arguments);
    },
    adjustHeight: function() {
        var height = window.innerHeight + "px";
        this.setStyle("height: " + height);
    }
});