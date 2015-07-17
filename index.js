var
    app = require('./src/app/app');

var 
    ready = require('enyo/ready');

ready(function(){

    new app().renderInto(document.body);
    
});