var tape = require('tape');
var path = require('path');

var reader = require('../lib/reader');
//var readerApp = new Reader(path.join( __dirname, '../test_data/'))
var dir = path.join( __dirname, '../test_data/');
tape('read', function(t){
	t.plan(1);
	reader(dir, function(err, result){
		console.log('============');
		if(err) return console.error(err);
		console.log(result);
		t.ok(result, 'data read success');
	});	
});