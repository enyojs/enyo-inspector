enyo.kind({
	name: 'enyo.DebugExtension.DebugView',
	kind: 'FittableRows',
	classes: 'enyo-fit',
	published:{
		controller: {}
	},
	controllerChanged:function(){
		this.$.page.setController(this.controller);
	},
	components: [
	  {kind: "FittableColumns", fit:true,components: [
		 {classes:'sidePanel', components:[
			 {classes: 'menuButton active', kind:'enyo.Button', content: 'Debug Info'},
			 {classes: 'menuButton', kind:'enyo.Button', content: 'Storage Info'},
			 {classes: 'menuButton', kind:'enyo.Button', content: 'Tools'}
		 ]},
		 {fit:true, components:[
			 {kind: "enyo.Scroller", style:'height:100%', components:[
				{name:'page', kind:'enyo.DebugExtension.Pages.Info'}
			 ]}
		 ]}
	  ]}
	],
	rendered: function(){
		this.adjustHeight();
		this.inherited(arguments);
	},
	resizeHandler: function(){
		this.adjustHeight();
		this.inherited(arguments);
	},
	adjustHeight: function() {
		var height = window.innerHeight + "px";
		this.setStyle("height: " + height);
	}
});