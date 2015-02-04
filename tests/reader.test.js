var tape = require('tape');
var path = require('path');

var Reader = require('../lib/reader');
var readerApp = new Reader(path.join( __dirname, '../test_data/'))
tape('read', function(t){
	t.plan(1);
	readerApp.read(function(err, result){
		console.log('============');
		if(err) return console.error(err);
		console.log(JSON.stringify(result));
		t.ok(result, 'data read success');
	});	
});