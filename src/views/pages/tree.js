function __buildTree(type, parent, tree) {
	var currType = parent ? type : "$";
	parent = parent || enyo.master;
	tree = tree || [];
	var c = {
		name: parent.name,
		kind: parent.kindName,
		id: parent.id,
		isChrome: parent.isChrome || false
	};
	var childTree = [];
	for (var i in parent[currType]) {
		var child = parent[currType][i];
		__buildTree(type, child, childTree);
	}
	if (childTree.length) {
		c[type] = childTree;
	}
	tree.push(c);
	return tree;
}

enyo.kind({
	name: 'enyo.DebugExtension.Pages.ControlTree',
	components: [
		 {kind: "onyx.Groupbox", style:'margin-left: 5px;margin-right:5px;padding-top:5px;', components: [
			{kind: "onyx.GroupboxHeader", content: "Controls"},
			{kind: "Scroller", fit:true, name: "tree", onNodeTap: "nodeTap"}
		 ]},
	],
	create: function() {
		this.inherited(arguments);
		chrome.devtools.inspectedWindow.eval(
			__buildTree.toString(),
			enyo.bind(this, function(result, isException) {
				if (isException) {
					alert(chrome.runtime.lastError.message);
				}
			})
		);
		this.refershTrees();
	},
	refershTrees: function() {
		chrome.devtools.inspectedWindow.eval(
			"__buildTree('children')",
			enyo.bind(this, function(result, isException) {
				this.childrenTree = result;
				this.refreshTreeView("children");
			})
		);
	},
	refreshTreeView: function(type) {
		var tree = this[type + "Tree"];
		this.$.tree.destroyClientControls();
		this.addChildrenToTree(tree[0], type, this.$.tree);
		this.$.tree.render();
	},
	addChildrenToTree: function(parent, type, treeControl) {
		for (var i in parent[type]) {
			var t = parent[type][i];
			var c = treeControl.createComponent({
				kind: "Node",
				expandable: false,
				expanded: true,
				content: t.name + " (" + t.kind + ")",
				style: (t.isChrome ? "color: gray; font-weight: normal;" : "color: black; font-weight: bold;"),
				data: t
			});
			this.addChildrenToTree(t, type, c);
		}
	},
	nodeTap: function(inSender, inEvent) {
		var node = inEvent.originator;
		this.$.selection.select(node.id, node);
		return true;
	},
	select: function(inSender, inEvent) {
		inEvent.data.$.caption.applyStyle("background-color", "lightblue");
		var cmd = "inspect($('#" + inEvent.data.data.id + "'))";
		chrome.devtools.inspectedWindow.eval(cmd);
	},
	deselect: function(inSender, inEvent) {
		inEvent.data.$.caption.applyStyle("background-color", null);
	}
});