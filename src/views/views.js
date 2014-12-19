enyo.kind({
    name: 'enyo.DebugExtension.DebugView',
    kind: 'FittableRows',
    classes: 'enyo-fit',
    published:{
        controller: {}
    },
	events: {
		onPageChanged: ''
	},
    controllerChanged:function(){
		var page = this.$.page || this.page;
        page.controller ? page.setController(this.controller) : null;
    },
	created: function(){
		this.inherited(arguments);
		this.page = this.$.page || {};
	},
    components: [
      {kind: "FittableColumns", fit:true,components: [
         {classes:'sidePanel', components:[
             {name:'button1', classes: 'menuButton active', kind:'enyo.Button', content: 'Debug Info', ontap: 'changePage', page:'enyo.DebugExtension.Pages.Info'},
             {name:'button2', classes: 'menuButton', kind:'enyo.Button', content: 'Control Tree', ontap: 'changePage', page:'enyo.DebugExtension.Pages.ControlTree'},
             {name:'button3', classes: 'menuButton', kind:'enyo.Button', content: 'Storage Info', ontap: 'changePage', page:'enyo.DebugExtension.Pages.Store'},
             {name:'button4', classes: 'menuButton', kind:'enyo.Button', content: 'Tools', ontap: 'changePage', page:'enyo.DebugExtension.Pages.Tools'}
         ]},
         {fit:true, components:[
			 {name:'scroller', kind: 'enyo.Scroller', style:'height:100%', components:[
				 //default startup page
			 	{name: 'page', kind: 'enyo.DebugExtension.Pages.Info'}
			 ]}
         ]}
      ]}
    ],
	updateActive: function(ctrl) {
		this.$.button1.removeClass('active');
		this.$.button2.removeClass('active');
		this.$.button3.removeClass('active');
		this.$.button4.removeClass('active');
		ctrl.addClass('active');
	},
	changePage: function(sender, event){
		var page = this.$.page || this.page;
		page.destroy();
		this.page = this.$.scroller.createComponent({
			kind: sender.page
		});
		this.$.scroller.render();
		this.updateActive(sender);
		this.doPageChanged(sender.page);
	},
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