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

        this.$.enyoVersionsJSON.set('content', JSON.stringify(s));
        this.$.enyoPlatformJSON.set('content', JSON.stringify(p));
    },
    components: [
      {kind: "FittableColumns", fit:true,components: [
         {classes:'sidePanel', components:[
             {classes: 'menuButton', kind:'enyo.Button', content: 'Debug Info'},
         ]},
         {fit:true, components:[
             {kind: "onyx.Groupbox", style:'margin-left: 5px;margin-right:5px;padding-top:5px;', components: [
                {kind: "onyx.GroupboxHeader", content: "enyo.versions"},
                {name: "enyoVersionsJSON", content: "", style: "padding: 8px;"}
             ]},
             {tag:'br'},
             {kind: "onyx.Groupbox", style:'margin-left: 5px;margin-right:5px;padding-top:5px;', components: [
                {kind: "onyx.GroupboxHeader", content: "enyo.platform"},
                {name: "enyoPlatformJSON", content: "", style: "padding: 8px;"}
             ]},
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