var tape = require('tape');
var Dummy = require('../');
var mongo = require('mongodb').MongoClient

var config = {databaseName: 'test_data', datadir: 'test_data/'};

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

// tape('check stats', function(test){
// 	test.plan(2)
// 	mongo.connect('mongodb://localhost:27017', function(err, db){
// 		db.stats(function(err, stats) {
// 		    test.equal(null, err);
// 	    	test.ok(stats != null);
// 	    	console.log(stats);
// 	    	db.close();
//   		});
// 	});
// });

tape('setup', function (test){
	
	var dummy = new Dummy(JSON.stringify(config));
	dummy.setup(function (err, db){
		if (err) { return console.error(err); }
		test.plan(2);
		test.equal(db.databaseName, config.databaseName, 'database created');
		
		test.test('destroy', function(t){
			t.plan(1);
		// 	t.end();
			dummy.destroy(db ,function(err){
				t.error(err, 'database destroyed');
				t.end();
			});
		});
	});

	// dummy.setup(function (err, db){
	// 	if (err) { return console.error(err); }
	// 	test.plan(1);
	// 	test.test('destroy with kill flag', function(t){
	// 		t.plan(1);
	// 		dummy.close(db, false ,function(err){
	// 			t.error(err, 'database closed');
	// 			mongo.connect('mongodb://127.0.0.1:27017/', function(err,db){
	// 				//console.log(err);
	// 				//console.log(db.getDatabaseNames());
	// 			});
	// 		});
	// 	});
	// });
});