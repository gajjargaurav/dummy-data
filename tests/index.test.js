var tape = require('tape');
var Dummy = require('../');

var config = {databaseName: 'testing_data'};

tape.skip('wrong config provided', function(t){
	t.plan(1);	
	t.throws(new Dummy(config)); //, 'throws SyntaxError');
});

tape('no config provided', function(t){
	t.plan(1);
	t.ok(new Dummy(), 'creates dummy');
});

tape('correct config provided', function(t){
	t.plan(1);
	t.ok(new Dummy(JSON.stringify(config)), 'creates dummy');
});

tape('setup', function (test){
	
	var dummy = new Dummy(JSON.stringify(config));
	
	dummy.setup(function (err, db){
		if (err) { return console.error(err); }
		test.plan(2);
		test.ok(db.databaseName, config.databaseName, 'database created');

		test.test('destroy', function(t){
			t.plan(1);
			dummy.destroy(db, function(err){
				t.error(err, 'database destroyed');
				t.end();
			});
		});
	});
});
