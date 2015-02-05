var tape = require('tape');
var path = require('path');

var reader = require('../lib/reader');
var dir = path.join( __dirname, '../test_data/');

tape('read', function(t){
	t.plan(1);
	reader(dir, function(err, result){
		if(err) return console.error(err);
		t.ok(result, 'data read success');
	});	
});