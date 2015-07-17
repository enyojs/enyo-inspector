var
    kind = require('enyo/kind');
    
var
    Control = require('enyo/Control');

module.exports = kind({
    kind: Control,
    components: [
        {content:'hello world'}
    ]
});