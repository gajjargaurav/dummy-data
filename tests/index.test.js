var tape = require('tape');
var Dummy = require('../');

tape.skip('no config provided', function(t){
	t.plan(1);
	var config = {databaseName:'testing_data'};
	t.throws(new Dummy(config));
});

tape.skip('wrong config provided', function(t){
	t.plan(1);
	var config = {databaseName:'testing_data'};
	t.doesNotThrow(new Dummy(config));
});

tape('no databaseName provided', function(t){
	t.plan(1);
	var dummy = new Dummy();
	dummy.setup(function(err, db){
		if (err) { return console.error(err); }
		t.equal(db.databaseName, 'test_data', 'returned db using default vars');
		db.close();
	});
});

tape('databaseName provided', function(t){
	t.plan(1);
	var config = JSON.stringify({databaseName:'testing_data'});
	var dummy = new Dummy(config);
	dummy.setup(function(err, db){
		if (err) { return console.error(err); }
		t.equal(db.databaseName, 'testing_data', 'returned db using default vars');
		db.close();
	});
});

tape('read datafiles and create collections', function(t){
	t.plan(1);
	var config = JSON.stringify({databaseName:'testing_data'});
	var dummy = new Dummy(config);
	dummy.setup(function(err, db){
		if (err) { return console.error(err); }
		db.collection('system.namespaces')
			.find({ name: 'testing_data.users'}).toArray(function(err, docs) {
				if (err) { return console.error(err); }
				t.equals(docs.length, 1, 'users' + '...!');
				db.close();
		});
	});
});

tape('destroy', function(t){
	t.plan(1);
	var config = JSON.stringify({databaseName:'testing_data'});
	var dummy = new Dummy(config);
	dummy.setup(function(err, db){
		if (err) { return console.error(err); }
		dummy.destroy(db, function(err){
			t.error(err, 'database destroyed');
		});
	});
});