enyo.kind({
	name: 'enyo.DebugExtension.Pages.Tools',
	components: [
		 {kind: "onyx.Groupbox", style:'margin-left: 5px;margin-right:5px;padding-top:5px;', components: [
			{kind: "onyx.GroupboxHeader", content: "Turn on RTL"},
			 {style:'margin-left: 10px; padding-top:5px;', components:[
				{kind:"onyx.ToggleButton", onChange:"toggleChanged", value: false}
			 ]}
		 ]},
	]
});